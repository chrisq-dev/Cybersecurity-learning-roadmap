---
title: "Playbook: Cuenta Comprometida (Insider Threat)"
---
# Playbook: Cuenta Comprometida (Insider Threat)

Una cuenta corporativa ha sido comprometida. Lo más peligroso es que no hace ruido. Es momento de actuar siguiendo el protocolo establecido.

## Objetivo de esta Guía

Aprender la letalidad silenciosa de un ataque cuando el enemigo ya tiene las llaves de la puerta principal.

Un ataque de Ransomware hace mucho ruido. Destruye archivos y activa alarmas rojas. Una **Cuenta Comprometida (Business Email Compromise)** no hace ningún ruido. El atacante (El Espía) obtuvo la contraseña de un empleado legítimo, inició sesión normalmente, y ahora camina por los pasillos del castillo leyendo información clasificada sin que ninguna alarma se dispare.

---

## Fases de Respuesta a Incidentes (El Ciclo PICERL)

### Escenario (La Alarma Silenciosa)
**Jueves 2:00 PM:** El Analista SOC Nivel 1 nota una anomalía en el SIEM. La cuenta del `Director de Recursos Humanos` inició sesión en la VPN corporativa desde Miami, y 5 minutos después inició sesión en Microsoft 365 desde China (Viaje Imposible). Es matemáticamente imposible viajar de Miami a China en 5 minutos. La cuenta está comprometida.

### Detección y Análisis Inicial

**Reglas de Detección en SIEM:**

**Splunk - Detección de Viaje Imposible:**
```splunk
index=authentication action=success
| eval LocationPrev = lag(Location), TimePrev = lag(_time)
| where Location != LocationPrev AND (_time - TimePrev) < 3600
| eval Distance = geo_distance(Location, LocationPrev)
| where Distance > 500
| table user, src_ip, Location, LocationPrev, _time
```

**KQL (Azure Sentinel) - Viaje Imposible:**
```kql
SigninLogs
| where ResultType == 0
| where Location != ""
| sort by UserPrincipalName, TimeGenerated asc
| extend prevLocation = prev(Location), prevTime = prev(TimeGenerated)
| where Location != prevLocation
| extend TimeDiff = datetime_diff('second', TimeGenerated, prevTime)
| where TimeDiff < 3600
| extend Distance = geo_distance(Location, prevLocation)
| where Distance > 500
| project UserPrincipalName, IPAddress, Location, prevLocation, TimeGenerated, TimeDiff
```

**KQL - Inicios de Sesión desde IPs Anómalas:**
```kql
SigninLogs
| where ResultType == 0
| where RiskLevelDuringSignIn in ("medium", "high")
| where IPAddress !in (dynamic(["192.168.0.0/16", "10.0.0.0/8"]))
| summarize count() by UserPrincipalName, IPAddress, RiskLevelDuringSignIn
| where count_ > 1
```

**Eventos de Windows a Monitorear:**

| Event ID | Descripción | Relevancia |
|----------|-------------|------------|
| 4624 | Inicio de sesión exitoso | Geolocalización, IP inusual |
| 4625 | Inicio de sesión fallido | Fuerza bruta previa al compromiso |
| 4648 | Inicio de sesión con credenciales explícitas | Movimiento lateral |
| 4672 | Privilegios especiales asignados | Escalada de privilegios |
| 4720 | Cuenta de usuario creada | Shadow admin |
| 4726 | Cuenta de usuario eliminada | Destrucción de evidencia |
| 4738 | Cuenta de usuario modificada | Cambio de miembros de grupo |
| 4776 | Validación de credenciales | Fallos de autenticación |

---

### Paso 1: Contención (El Corte Silencioso)
La regla de oro contra un Espía es **no dejar que se entere de que ya lo descubriste** hasta que hayas bloqueado todas sus puertas de salida al mismo tiempo. es como cuando escuchas un ruido en casa y apagas la luz para que el intruso no sepa que lo escuchaste.

1. **Congelar el Acceso:** En lugar de apagar el servidor o enviarle un correo al usuario (el espía podría estar leyendo el correo), el Blue Team desactiva la cuenta de Active Directory. Esto congela al espía en su lugar.

   **Comando PowerShell:**
   ```powershell
   Disable-ADAccount -Identity "usuario.comprometido"
   Get-ADUser usuario.comprometido | Set-ADUser -AccountNotDelegated $true
   ```

2. **Revocar Tokens:** Matar todas las sesiones activas (Oauth Tokens) en todas las aplicaciones en la Nube (AWS, Office 365, Salesforce). Esto expulsa al espía a mitad de cualquier descarga de archivos que estuviera haciendo.

   **Revocación en Azure AD (Entra ID):**
   ```powershell
   Revoke-AzureADUserAllRefreshToken -ObjectId "usuario@dominio.com"
   Get-AzureADUser -ObjectId "usuario@dominio.com" | Revoke-AzureADSignedInUserSession
   ```

   **Revocación en AWS:**
   ```bash
   aws iam delete-access-key --user-name usuario.comprometido --access-key-id AKIA...
   # Rotar claves inmediatamente
   aws iam create-access-key --user-name usuario.comprometido
   ```

3. **Aislamiento de Dispositivo:** Bloquear el acceso a la red de la laptop del Director de Recursos Humanos por si el robo de la contraseña ocurrió por un Malware (Keylogger) en su máquina física.

   **Comando EDR (Ejemplo con CrowdStrike/SentinelOne):**
   A través de la API o consola del EDR, ejecutar "Contain Host" para el dispositivo del usuario.

---

### Paso 2: Erradicación (Buscar la Puerta Trasera)
El espía fue expulsado del castillo. Pero, ¿dejó la ventana abierta para volver a entrar mañana?

1. **Revisión de Delegaciones y Permisos:** Los espías suelen crear nuevas cuentas de administrador ocultas ("Shadow Admin") mientras están adentro, para poder regresar si pierden la cuenta principal. El equipo debe revisar y borrar cualquier usuario nuevo creado en las últimas 24 horas.

   **KQL para Detectar Creación de Usuarios Administradores:**
   ```kql
   AuditLogs
   | where OperationName == "Add member to role"
   | where TimeGenerated > ago(24h)
   | where TargetResources[0].modifiedProperties[0].newValue contains "Global Administrator"
   | project TimeGenerated, InitiatedBy.user.userPrincipalName, TargetResources[0].displayName
   ```

2. **Limpieza de Reglas de Correo:** (Igual que en el Playbook de Phishing). Buscar reglas automáticas de reenvío para evitar la Fuga de Datos continua.

   **Comando Exchange Online para Listar Reglas de Reenvío:**
   ```powershell
   Get-Mailbox -Identity usuario.comprometido | Get-InboxRule | Where-Object {$_.ForwardTo -ne $null}
   Get-Mailbox -Identity usuario.comprometido | Select-Object ForwardingAddress, ForwardingSmtpAddress
   ```

3. **Auditoría de API Keys:** Si el usuario tenía acceso a infraestructura en la nube, el atacante pudo haber robado las "Llaves de API" para conectarse programáticamente en el futuro sin usar contraseña. Hay que rotar (cambiar) todas esas llaves inmediatamente.

   **AWS IAM - Rotación de TODAS las claves:**
   ```bash
   aws iam list-access-keys --user-name usuario.comprometido
   aws iam update-access-key --access-key-id AKIA... --status Inactive
   aws iam delete-access-key --user-name usuario.comprometido --access-key-id AKIA...
   ```

### Indicadores de Compromiso (IoCs) a Recolectar

| Categoría | IoC | Fuente |
|-----------|-----|--------|
| **IP** | Direcciones IP de origen del atacante | Logs de autenticación, logs de red |
| **User-Agent** | User-Agent del navegador del atacante | Logs HTTP, logs de Exchange |
| **Device ID** | ID de dispositivo utilizado por el atacante | Entra ID sign-in logs |
| **Session ID** | IDs de sesión OAuth/token | Audit logs |
| **Timestamp** | Marcas de tiempo exactas de cada acción | Correlación de logs |
| **Archivos accedidos** | Documentos, correos, archivos descargados | Exchange Audit, SharePoint Audit |
| **IPs de destino** | Dónde se exfiltraron los datos | Logs de firewall/proxy |
| **Eventos de red** | Conexiones salientes hacia IPs desconocidas | Logs de firewall |

---

### Paso 3: Recuperación (Devolver las Llaves)
Una vez que las ventanas traseras están cerradas y el espía no tiene forma de volver a entrar, procedemos a devolver el acceso al usuario legítimo.

1. **Restablecimiento Fuerte:** El usuario legítimo debe presentarse con IT (Físicamente o por videollamada verificada) para recibir su nueva contraseña temporal. No se debe enviar por correo ni SMS sin verificar identidad.

2. **Análisis Forense Rápido:** Escanear la computadora del Director de Recursos Humanos para asegurar que el compromiso de la cuenta no provino de un malware persistente.

3. **Post-Mortem (Lecturas Aprendidas):** El CISO investiga por qué la Autenticación Multi-Factor (MFA) falló en detener al atacante en China, descubriendo posiblemente un ataque de *MFA Fatigue* (Ingeniería Social avanzada).

### Técnicas de Bypass de MFA

| Técnica | Descripción | Defensa |
|---------|-------------|---------|
| **MFA Fatigue** | El atacante envía decenas de notificaciones push MFA al usuario hasta que este acepta por cansancio. | Límite de intentos MFA, número de aprobación requerido. |
| **Token Theft** | El atacante roba el token de sesión después de que el usuario ya completó MFA. | Short token lifetimes, Conditional Access policies. |
| **AITM (Adversary-in-the-Middle)** | Proxy que captura credenciales + cookie de sesión MFA en tiempo real (EvilGinx, Modlishka). | FIDO2/WebAuthn, dispositivos registrados. |
| **SIM Swap** | El atacante engaña al operador móvil para transferir el número SMS del usuario. | Evitar SMS como MFA primario, usar app authenticator. |
| **Legacy Auth Bypass** | Usar protocolos antiguos (POP, IMAP, SMTP) que no soportan MFA. | Bloquear legacy authentication en el tenant. |

---

### Análisis Forense de Cuenta Comprometida

**Cadena de Custodia para Incidentes BEC:**

1. **Preservación de evidencias:**
   - Exportar logs de autenticación del SIEM (últimos 7-30 días).
   - Obtener copia de los audit logs de Office 365 (Unified Audit Log).
   - Capturar mailboxes del usuario comprometido (eDiscovery hold).
   - Preservar firewalls logs del perímetro de red.
   - Documentar la línea de tiempo exacta (Timeline).

2. **Blast Radius Analysis (Radio de Explosión):**
   - Identificar a qué sistemas accedió el atacante.
   - Determinar qué correos leyó (Exchange audit logging).
   - Verificar si configuró reglas de reenvío.
   - Comprobar descargas de SharePoint/OneDrive.
   - Revisar actividad en aplicaciones SaaS (Salesforce, Workday, etc.).

3. **Informe de Incidente (Estructura):**
   - Resumen ejecutivo.
   - Timeline del ataque (detección → contención → erradicación).
   - IoCs encontrados.
   - Sistemas afectados y datos comprometidos.
   - Acciones de contención tomadas.
   - Lecciones aprendidas y recomendaciones.
   - Evidencia digital preservada (hash de archivos, logs exportados).

---

## 4. Criterio de Dominio (Autoevaluación)

Revisa si puedes atrapar al espía corporativo:

1. El Analista SOC recibe una alerta de "Viaje Imposible" en la cuenta del CEO. Entra en pánico y decide enviarle un correo al CEO diciéndole: *"Alerta: Creemos que un Hacker en China está usando su cuenta en este momento"*. Explica el enorme riesgo táctico de enviar este mensaje antes de ejecutar la fase de **Contención**.
2. Explica la diferencia principal de detección entre un ataque de Ransomware (Malware) y un ataque de "Cuenta Comprometida" (Insider Threat/BEC). ¿Por qué los Antivirus EDR tradicionales suelen ser ciegos ante el robo de credenciales legítimas?
3. Durante la **Erradicación**, ¿Por qué es fundamental revisar la creación de nuevas cuentas ("Shadow Admins") o Llaves de API, además de simplemente cambiar la contraseña del usuario original?
4. El análisis *Post-Mortem* de este incidente determinó que el ataque fue exitoso a pesar de que la empresa exigía MFA en el celular del usuario. Investiga qué es el ataque **"MFA Fatigue" (Fatiga de MFA)** y cómo un Hacker moderno evade la Autenticación Multi-Factor explotando la psicología humana.
5. ¿Qué es un "Blast Radius" y por qué es importante determinarlo en un incidente de cuenta comprometida?
