---
title: "Playbook: Compromiso por Phishing"
level: "intermedio"
content_type: "playbook"
updated: "2026-06-29"
---
# Playbook: Compromiso por Phishing

Alguien ya hizo clic donde no debía. El atacante está adentro del buzón leyendo correos que no debería. Es momento de actuar siguiendo el protocolo establecido.

## Objetivo de esta Guía

Aprender el protocolo de emergencia militar cuando las barreras psicológicas han fallado.

Anteriormente aprendimos cómo el atacante crea el "Espejismo". Anteriormente configuramos los Gateways (SEG) para detenerlo.
Pero el Riesgo Nunca es Cero. Un usuario de Finanzas hizo clic en el enlace, escribió su contraseña, y el atacante ya está adentro de la cuenta de correo corporativa.

Saca tu manual de emergencia. Es hora de operar.

---

## Fases de Respuesta a Incidentes (El Ciclo PICERL)

### Escenario (La Alarma)
**10:15 AM:** Un analista de Nivel 1 del SOC ve una alerta: *"Se ha detectado un inicio de sesión exitoso en la cuenta de Microsoft 365 de `jefe.finanzas@empresa.com`. La dirección IP proviene de Nigeria"*.

### Análisis del Correo Phishing (Triage Forense)

Cuando se identifica un correo sospechoso reportado por el usuario:

**Análisis de Cabeceras de Correo (Email Headers):**

```text
SPF Check: pass/fail (dominio autorizado a enviar?)
DKIM Signature: valid/invalid (firma criptográfica del dominio)
DMARC Policy: p=reject/quarantine/none (política de manejo de fallos)
Reply-To: Diferente del From (indicador de phishing)
Return-Path: Diferente del From (redirección de rebote)
Received: Cadena de servidores SMTP (identificar servidor real de origen)
Message-ID: Identificador único (puede estar alterado)
X-PHP-Originating-Script: Si el servidor web ejecutó PHP
Authentication-Results: Resultados de autenticación del servidor receptor
```

**Comandos para Extraer Cabeceras:**
```bash
# Usando swaks o curl
swaks --dump EMAIL_FILE.eml | grep -E "Received-SPF|DKIM|DMARC"
# Extraer URLs del correo
urlextract EMAIL_FILE.eml | sort -u
# Extraer archivos adjuntos
munpack EMAIL_FILE.eml
```

**Splunk - Detección de Phishing (Post-Click):**
```splunk
index=proxy
| search url IN ("*login*", "*verify*", "*account*", "*secure*")
| search referer IN ("*mail*", "*outlook*", "*webmail*")
| stats count by src_ip, url, dest_ip
| search count > 1
| eval risk = if(match(url, "(?i)(confirm|verify|reset|security|alert|unusual)"), "HIGH", "MEDIUM")
```

**KQL - Detección de Reglas de Reenvío Maliciosas:**
```kql
AuditLogs
| where TimeGenerated > ago(24h)
| where OperationName == "Set-Mailbox" or OperationName == "New-InboxRule"
| where ResultStatus == "Success"
| extend RuleDetail = parse_json(tostring(TargetResources[0].modifiedProperties))
| where RuleDetail contains "ForwardTo" or RuleDetail contains "RedirectTo"
| project TimeGenerated, UserPrincipalName = InitiatedBy.user.userPrincipalName, OperationName, TargetResources[0].displayName, IPAddress = InitiatedBy.user.ipAddress
```

### Tipos de Phishing

| Tipo | Descripción | Indicadores |
|------|-------------|-------------|
| **Credential Harvesting** | Página falsa que roba usuario/contraseña | URL similar al dominio real (typosquatting) |
| **Spear Phishing** | Dirigido a una persona específica con contexto | Muy personalizado, menciona datos internos |
| **Whaling** | Dirigido a ejecutivos (CEO, CFO) | Suplanta a otro ejecutivo, urgencia |
| **Business Email Compromise (BEC)** | Suplantación de identidad sin enlace | Solo texto pidiendo transferencia bancaria |
| **Phishing con Malware** | Adjunto malicioso (macro, ISO, HTA) | Archivo .docm, .xlsm, .iso, .lnk |
| **SMS Phishing (Smishing)** | Por SMS con enlace malicioso | Dominio acortado, urgencia, número desconocido |
| **Voice Phishing (Vishing)** | Llamada telefónica suplantando soporte | Número spoofeado, pide credenciales |
| **QR Phishing (Quishing)** | Código QR que redirige a sitio malicioso | QR en PDF adjunto sin texto del link |

---

### Paso 1: Contención (Cortar el Acceso)
El hacker está adentro del buzón leyendo correos confidenciales. Tienes que sacarlo a patadas inmediatamente. cada minuto que pasa, el tipo está leyendo correos que no debería.

1. **Revocar sesiones y contener la identidad:** Deshabilitar temporalmente la cuenta cuando el riesgo lo justifique e invalidar tokens de actualización y cookies de sesión mediante Microsoft Graph. La revocación fuerza una nueva autenticación, pero algunos tokens de acceso pueden seguir siendo válidos hasta expirar; verifica el resultado en los registros.

   **Microsoft Entra ID con Microsoft Graph PowerShell:**
   ```powershell
   Connect-MgGraph -Scopes "User.RevokeSessions.All", "User.EnableDisableAccount.All", "User.ReadWrite.All"
   $userId = "jefe.finanzas@empresa.com"

   Revoke-MgUserSignInSession -UserId $userId
   Update-MgUser -UserId $userId -AccountEnabled:$false
   ```

   Fuente: [Microsoft Graph — revokeSignInSessions](https://learn.microsoft.com/en-us/graph/api/user-revokesigninsessions?view=graph-rest-1.0).

2. **Restablecer la contraseña:** Si la cuenta utiliza contraseña, asignar una temporal generada mediante el proceso seguro de la organización y exigir cambio en el siguiente inicio. No envíes el secreto por el buzón comprometido.

   ```powershell
   $passwordProfile = @{
     Password = "<contraseña-temporal-generada-de-forma-segura>"
     ForceChangePasswordNextSignIn = $true
   }

   Update-MgUser -UserId $userId -PasswordProfile $passwordProfile
   ```

3. **Aislar la Computadora:** Aunque fue un ataque a la Nube (Correo), existe el riesgo de que el Phishing incluyera la descarga de un Malware. Por precaución, usar el EDR para aislar la computadora física de la red de la oficina (Visto en el Playbook de Malware).

### Análisis de Post-Click en el Endpoint

Si el usuario hizo clic en un enlace o abrió un adjunto:

**Procesos a Investigar en el Endpoint:**
```powershell
# Buscar procesos PowerShell ejecutados recientemente
Get-WinEvent -FilterHashtable @{LogName='Windows PowerShell'; ID=4104} | Where-Object {$_.TimeCreated -gt (Get-Date).AddHours(-4)}

# Buscar descargas de Internet
Get-WinEvent -LogName 'Microsoft-Windows-Sysmon/Operational' | Where-Object {$_.Id -eq 3 -and $_.TimeCreated -gt (Get-Date).AddHours(-4)} | Select-Object TimeCreated, Message

# Buscar archivos descargados recientemente
Get-ChildItem -Path "$env:USERPROFILE\Downloads" -Recurse | Where-Object {$_.LastWriteTime -gt (Get-Date).AddHours(-4)}
```

**Indicadores de Carga de Malware Post-Phishing:**
| Artifact | Descripción |
|----------|-------------|
| Process Tree | `OUTLOOK.EXE` → `cmd.exe` → `powershell.exe` → `mshta.exe` |
| PowerShell encoded command | `-EncodedCommand SQBFAFgA...` (base64) |
| WebDAV payload | `\\live.sysinternals.com\...` (carga remota) |
| .LNK file execution | Atajo malicioso que ejecuta comando |
| ISO/VHD mounted | Archivo ISO adjunto montado como unidad |

---

### Paso 2: Erradicación (Limpiar el Daño Interno)
El hacker fue expulsado. Pero en los 10 minutos que estuvo adentro, ¿Qué hizo?

1. **Buscar Reglas de Reenvío (Forwarding Rules):** Los hackers siempre dejan una "puerta trasera". Crean una regla en Outlook que dice: *"Reenviar una copia oculta de todos los correos entrantes a `hacker@gmail.com`"*. Si el Analista no revisa y borra esta regla, el hacker seguirá robando información durante meses aunque ya no tenga la contraseña.

   **Comandos para Detectar y Eliminar Reglas de Reenvío:**
   ```powershell
   # Listar todas las reglas de la bandeja de entrada
   Get-Mailbox -Identity "jefe.finanzas@empresa.com" | Get-InboxRule | Format-List Name, ForwardTo, ForwardAsAttachmentTo, RedirectTo

   # Verificar reenvío a nivel de buzón (Server-side forwarding)
   Get-Mailbox -Identity "jefe.finanzas@empresa.com" | Select-Object ForwardingAddress, ForwardingSmtpAddress, DeliverToMailboxAndForward

   # Verificar reglas de transporte (a nivel de organización)
   Get-TransportRule | Where-Object {$_.State -eq 'Enabled'} | Format-List Name, Description, FromMemberOf, SentTo

   # Eliminar regla maliciosa
   Get-Mailbox -Identity "jefe.finanzas@empresa.com" | Get-InboxRule -Name "MaliciousRule" | Remove-InboxRule

   # Deshabilitar reenvío
   Set-Mailbox -Identity "jefe.finanzas@empresa.com" -ForwardingSmtpAddress $null -DeliverToMailboxAndForward $false
   ```

2. **Buscar correos enviados:** El hacker pudo haber usado la cuenta del `jefe.finanzas` para enviarle un correo de Phishing al `CEO`, aprovechando la confianza interna (Movimiento Lateral).

   ```powershell
   # Buscar envíos masivos sospechosos (BEC/Phishing interno)
   Get-Mailbox -Identity "jefe.finanzas@empresa.com" |
       Search-Mailbox -SearchQuery "sent:>=$((Get-Date).AddDays(-1))" -TargetMailbox "forensic@empresa.com" -TargetFolder "PhishingInvestigation"

   # Identificar correos enviados a destinatarios externos
   Get-MessageTrace -SenderAddress "jefe.finanzas@empresa.com" -StartDate (Get-Date).AddDays(-1) |
       Where-Object {$_.RecipientAddress -notlike "*empresa.com"}
   ```

3. **Auditoría de Acciones (Logs):** Revisar los logs para determinar exactamente qué documentos de SharePoint o OneDrive descargó el atacante. ¿Se robaron la fórmula secreta de la empresa? (Impacto de Negocio).

   **KQL para Auditoría de SharePoint/OneDrive:**
   ```kql
   AuditLogs
   | where TimeGenerated > ago(24h)
   | where OperationName in ("FileDownloaded", "FileDownload", "FileAccessed", "FileModified")
   | where UserId == "jefe.finanzas@empresa.com"
   | where ClientIPAddress !in ("192.168.0.0/16", "10.0.0.0/8")
   | project TimeGenerated, OperationName, ObjectId, SiteUrl, ClientIPAddress
   ```

**Acciones Específicas a Revisar en Logs:**

| Acción del Atacante | Log Source | Query |
|--------------------|------------|-------|
| Lectura de correos | Exchange Audit | `Search-Mailbox -Identity user -SearchQuery "read"` |
| Descarga de attach | Exchange Audit | `Get-MessageTrace -SenderAddress user` |
| Acceso a SharePoint | SharePoint Audit | Access denied logs, descargas |
| Descarga OneDrive | OneDrive Audit | FileDownloaded events |
| Teams Messages | Teams Audit | TeamsSessionStarted, MessageSent |
| Modificó reglas | Microsoft Entra ID | Set-Mailbox, New-InboxRule |

---

### Paso 3: Recuperación (El Regreso Controlado)
La amenaza ha sido neutralizada y el buzón está limpio.

1. **Auditoría con el Usuario:** Llamar por teléfono al Jefe de Finanzas. Preguntarle exactamente qué vio, en qué hizo clic y cómo ocurrió el ataque. Esta información servirá para la reunión forense (Purple Team).

2. **Devolver el Acceso:** Entregar la credencial temporal mediante un canal aprobado y verificado o utilizar un Temporary Access Pass cuando el entorno lo permita.

3. **Revisar autenticadores:** Examinar los métodos registrados, eliminar únicamente los que no pertenezcan al usuario y aplicar el procedimiento de recuperación de identidad. Borrar todos los métodos sin validar puede bloquear al usuario y destruir evidencia útil.

   ```powershell
   Connect-MgGraph -Scopes "UserAuthenticationMethod.ReadWrite.All"
   Get-MgUserAuthenticationMethod -UserId $userId
   ```

   La eliminación usa un cmdlet específico para cada tipo de método. Consulta [Microsoft Graph Identity SignIns](https://learn.microsoft.com/en-us/powershell/module/microsoft.graph.identity.signins/).

### Análisis Avanzado: Phishing Kit Analysis

Cuando se identifica la página de phishing (el sitio donde el usuario ingresó sus credenciales):

```bash
# Descargar el phishing kit
wget -r -np http://malicious-site.com/login/

# Buscar archivos de configuración
cat malicious-site.com/login/config.php
cat malicious-site.com/login/.env

# Identificar el destino de las credenciales
grep -r "mail(" phishing-site/
grep -r "file_put_contents" phishing-site/
grep -r "telegram" phishing-site/

# Analizar el código ofuscado
# (muchos kits usan base64_encode, str_rot13, gzinflate)
php -r "echo base64_decode('cGFzc3dvcmQ=');"
```

---

### Defensa Post-Incidente: Implementación de SEG y DMARC

**Registros DNS a Configurar:**

```dns
; SPF - qué IPs pueden enviar correo como tu dominio
empresa.com IN TXT "v=spf1 ip4:203.0.113.0/24 include:spf.protection.outlook.com -all"

; DKIM - firma criptográfica de los correos
; (Generar par de claves en Exchange Online / Google Workspace)
empresa.com IN TXT "v=DKIM1; k=rsa; p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC..."

; DMARC - política de manejo de fallos
_dmarc.empresa.com IN TXT "v=DMARC1; p=reject; rua=mailto:dmarc@empresa.com; pct=100"

; BIMI - logo de marca en clientes de correo (opcional)
default._bimi.empresa.com IN TXT "v=BIMI1; l=https://empresa.com/logo.svg; a=https://empresa.com/VMC.pem"
```

---

### Lecciones Aprendidas: Purple Team Exercise

Después del incidente, el Purple Team se reúne para:
1. **Revisar el timeline** del ataque: detección, contención, erradicación.
2. **Identificar gaps** en la detección: ¿Por qué el SEG no bloqueó el correo?
3. **Mejorar reglas de detección:**
   - Nuevas reglas SIEM para detección de reglas de reenvío.
   - Alertas de inicios de sesión desde ubicaciones geográficas anómalas.
   - Detección de creación de transport rules por no-administradores.
4. **Actualizar el playbook** con las lecciones aprendidas.
5. **Realizar simulacro de mesa (tabletop exercise)** trimestral.

**Estructura de Reporte Post-Mortem:**
```markdown
# Post-Mortem: Incidente de Phishing
**ID:** PHISH-2026-001
**Fecha del incidente:** YYYY-MM-DD
**Severidad:** ALTA

## Resumen
Usuario de Finanzas recibió un correo de spear phishing que suplantaba al CFO.
El usuario ingresó sus credenciales en una página falsa de Microsoft 365.

## Timeline
- 10:15 AM: Alerta de inicio de sesión desde Nigeria
- 10:17 AM: Contención iniciada (cuenta deshabilitada)
- 10:20 AM: Sesiones revocadas
- 10:25 AM: Contraseña reseteada
- 10:35 AM: Reglas de reenvío identificadas y eliminadas
- 10:45 AM: Endpoint aislado por EDR
- 11:00 AM: Usuario contactado telefónicamente
- 11:30 AM: Acceso restaurado con nueva contraseña + MFA forzado

## Datos Accedidos
- 23 correos leídos (audit log)
- 2 documentos de SharePoint descargados (no críticos)
- Sin reglas de reenvío maliciosas persistentes

## Acciones Correctivas
1. Implementar bloqueo geográfico de inicios de sesión (Conditional Access)
2. Desplegar entrenamiento de phishing para el departamento de Finanzas
3. Mejorar regla SIEM para detección de reglas de reenvío
4. Implementar FIDO2 keys para ejecutivos
```

---

## 4. Criterio de Dominio (Autoevaluación)

Revisa si puedes asegurar las comunicaciones:

1. ¿Por qué el paso 1 de Contención debe ser "Forzar el cierre de todas las sesiones activas" (Revocar Tokens) *antes* de resetear la contraseña? Si solo cambias la contraseña en el panel de administración, ¿Qué pasará con la conexión en vivo que el hacker ya tiene establecida en su navegador?
2. Explica la importancia vital de buscar "Reglas de Reenvío" (Forwarding Rules) en la fase de Erradicación. Usando el concepto de "Persistencia", justifica por qué un analista inexperto que omite este paso dejará a la empresa vulnerable a espionaje permanente.
3. Si el atacante utilizó la cuenta comprometida de Finanzas para enviarle un correo malicioso al CEO de la empresa, ¿A qué fase de la cadena de ataque militar (Cyber Kill Chain) corresponde esta acción y cómo se relaciona con el "Movimiento Lateral"?
4. Después de resolver el incidente, el **Purple Team** se reúne. Como resultado de esta crisis, recomiendan instalar un **Secure Email Gateway (SEG)** para escanear y reescribir las URLs antes de que lleguen a los buzones. ¿A qué fase del Ciclo de Vida de Respuesta a Incidentes (PICERL) corresponde implementar nuevas defensas para evitar que el mismo error vuelva a suceder en el futuro? (Lecturas Aprendidas).
5. Explica qué son SPF, DKIM y DMARC y cómo estos registros DNS ayudan a prevenir la suplantación de dominio en ataques de phishing.
