---
title: "Playbook: Fuga de Datos y Extorsión"
level: "intermedio"
content_type: "playbook"
updated: "2026-06-29"
reviewed: "2026-06-29"
reviewed_against: "Guías oficiales de ICO, ANPD, HHS, SEC, OFAC, FBI y CISA consultadas el 2026-06-29"
official_sources:
  - title: "ICO — Notificación de brechas"
    url: "https://ico.org.uk/for-organisations/advice-for-small-organisations/personal-data-breaches/72-hours-how-to-respond-to-a-personal-data-breach/"
  - title: "ANPD — Comunicación de incidentes"
    url: "https://www.gov.br/anpd/pt-br/canais_atendimento/agente-de-tratamento/comunicado-de-incidente-de-seguranca-cis"
  - title: "HHS — HIPAA Breach Notification"
    url: "https://www.hhs.gov/hipaa/for-professionals/breach-notification/index.html"
  - title: "SEC — Divulgación de incidentes materiales"
    url: "https://www.sec.gov/newsroom/press-releases/2023-139"
  - title: "FBI — Ransomware"
    url: "https://www.fbi.gov/how-we-can-help-you/scams-and-safety/common-frauds-and-scams/ransomware"
  - title: "U.S. Treasury — Riesgo de sanciones en pagos de ransomware"
    url: "https://home.treasury.gov/news/press-releases/sm1142"
---
# Playbook: Fuga de Datos y Extorsión

Los datos ya salieron del edificio. No hay backup que pueda recuperarlos. Es momento de actuar siguiendo el protocolo establecido.

## Objetivo de esta Guía

Aprender qué hacer cuando la solución tecnológica ("Restaurar un Backup") es completamente inútil.

En el Ransomware tradicional, el hacker destruye tus servidores y te cobra por arreglarlos. Si tienes buenos Backups, simplemente los ignoras y te recuperas solo.
Pero la mafia cibernética evolucionó hacia la **Doble Extorsión (Data Breach)**.

---

## Fases de Respuesta a Incidentes (El Ciclo PICERL)

### Escenario (La Alarma)
**Lunes 9:00 AM:** El CEO recibe un correo electrónico. No hay ningún virus en la empresa. Los servidores funcionan perfectamente. Pero el correo tiene un enlace de la Dark Web (Red Tor) que muestra los nombres, direcciones y tarjetas de crédito de 5 millones de clientes de la empresa.
El mensaje dice: *"Paga 5 millones de dólares en Bitcoin, o le venderemos esta Base de Datos a la competencia y la haremos pública en Twitter"*.

*¡Los Backups no te sirven de nada aquí! Los datos ya salieron del edificio.* cuando los datos ya están afuera, todo cambia. Ya no es un problema técnico, es un problema legal.

### Detección Temprana de Exfiltración

Antes de recibir la extorsión, hay señales técnicas de que una fuga está ocurriendo:

**Splunk - Detección de Tráfico Saliente Anómalo:**
```splunk
index=network bytes_out > 100000000
| stats sum(bytes_out) by src_ip, dest_ip, dest_port
| where sum(bytes_out) > 1000000000
| eval severity = if(sum(bytes_out) > 5000000000, "CRITICAL", "HIGH")

# Detección de DNS Tunneling
index=dns query_length > 50
| stats count by src_ip, query
| where count > 1000
```

**KQL - Detección de Exfiltración Masiva en Azure:**
```kql
AzureNetworkAnalytics_CL
| where TimeGenerated > ago(4h)
| where FlowType_s == "Outbound"
| summarize TotalBytes = sum(FlowSizeInBytes_l) by PublicIP_s, DestinationIP_s, L4Protocol_s, DestinationPort_d
| where TotalBytes > 500000000
| project PublicIP_s, DestinationIP_s, DestinationPort_d, TotalBytes
```

**DLP Alerts - Eventos a Monitorear:**

| Alerta DLP | Descripción | Acción |
|------------|-------------|--------|
| Mass File Copy | Usuario copió >100 archivos a USB | Bloquear y alertar |
| Unusual Upload | Carga de datos a cloud externo no autorizado | Bloquear y alertar |
| Email Forwarding | Regla de reenvío automático creada | Revisar y deshabilitar |
| Database Export | Exportación masiva desde SQL Server | Alertar al DBA |
| Sensitive Data Email | Email con PII/PCI saliente | Cuarentena automática |
| Cloud Share | Archivos compartidos con externos | Revisar permisos |

---

### Paso 1: Contención (El Control de Daños Legal)
La contención de una fuga de datos combina acciones técnicas, legales, regulatorias y de comunicación. Deben avanzar en paralelo bajo un responsable de incidente.

1. **Activar asesoría legal y privacidad:** Preservar el privilegio jurídico cuando corresponda, identificar jurisdicciones, contratos y categorías de datos, y documentar cuándo la organización tuvo conocimiento del incidente. No existe un plazo universal de 72 horas.

   **Referencias de notificación (resumen, no asesoría legal):**

   | Régimen | Regla general relevante |
   |---------|-------------------------|
   | GDPR (UE) | Notificar a la autoridad competente sin dilación indebida y, cuando sea posible, en 72 horas si la brecha puede implicar riesgo; hay excepciones y requisitos separados para titulares. |
   | CCPA/leyes de California | La CCPA no impone una regla general de 72 horas. Revisa las leyes de notificación de brechas de California, el contrato y las obligaciones sectoriales aplicables. |
   | LGPD/ANPD (Brasil) | La Resolución CD/ANPD 15/2024 establece tres días hábiles para incidentes que puedan ocasionar riesgo o daño relevante, salvo plazo específico distinto. |
   | PCI DSS y marcas de pago | Seguir el plan de respuesta, los contratos y las instrucciones del adquirente y de las marcas; PCI DSS es un estándar, no una ley general. |
   | HIPAA (EE. UU.) | Para brechas de PHI no asegurada, la regla depende del destinatario y del número de afectados; ciertos avisos deben realizarse sin demora injustificada y como máximo en 60 días. |
   | SEC (emisores de EE. UU.) | Un incidente determinado como material se divulga generalmente en Form 8-K dentro de cuatro días hábiles desde esa determinación, sujeto a excepciones. |

   La obligación concreta depende del lugar, sector, afectados, materialidad y contratos. El equipo legal debe validar la versión vigente de cada norma.

2. **Identificar el "Agujero":** Aislar el servidor específico por el cual se robaron los datos (Contención de Red) para evitar que el hacker siga descargando más información mientras ocurre la negociación.

   **Investigación del Vector de Exfiltración:**
   ```bash
   # Buscar procesos de compresión de archivos grandes (pre-exfiltración)
   # Los atacantes comprimen datos antes de exfiltrarlos
   lastcomm | grep -E "zip|gzip|bzip2|tar|rar|7z"
   find / -name "*.zip" -mmin -60 -size +100M

   # Buscar conexiones salientes a IPs sospechosas
   lsof -i @185.130.5.0/24
   ss -tunap | grep ESTAB | awk '{print $4,$5,$6}'

   # Identificar transferencias de archivos por protocolos
   tcpdump -i eth0 -nn -s0 -w exfiltration.pcap port 443 or port 21
   ```

3. **No improvisar un pago:** Congelar cualquier decisión financiera hasta involucrar a dirección, legal, aseguradora y autoridades competentes. Una transacción con una persona o entidad bloqueada puede infringir sanciones de OFAC; la atribución suele ser incierta y exige análisis especializado.

   **Consideraciones legales y operativas sobre un rescate:**
   * OFAC advierte sobre el riesgo de sanciones al facilitar pagos vinculados con personas bloqueadas y recomienda reportar el incidente a las autoridades.
   * FBI y CISA no apoyan el pago: no garantiza recuperación ni que los datos dejen de publicarse, y financia la actividad criminal.
   * Las prohibiciones, obligaciones de reporte y efectos sobre el seguro dependen de la jurisdicción y de las partes de la transacción. No uses un umbral monetario genérico como regla.
   * Preserva comunicaciones, billeteras, direcciones, muestras y comprobantes para la investigación; coordina cualquier contacto con autoridades a través del proceso aprobado.

### Identificación del Tipo de Datos Filtrados

**Clasificación de Datos:**

| Categoría | Ejemplos | Regulación Aplicable |
|-----------|----------|---------------------|
| **PII (Personally Identifiable Information)** | Nombre, DNI, email, teléfono, dirección | GDPR, CCPA, LGPD |
| **PHI (Protected Health Information)** | Historial médico, diagnósticos, recetas | HIPAA |
| **PCI (Payment Card Industry)** | Números de tarjeta, CVV, fecha expiración | PCI-DSS |
| **Datos Financieros** | Cuentas bancarias, saldos, transacciones | SOX, GLBA |
| **Propiedad Intelectual** | Código fuente, patentes, secretos comerciales | Leyes de propiedad intelectual |

---

### Paso 2: Erradicación (Cerrar la Tubería)
Tenemos que tapar el agujero por el que el hacker sacó (Exfiltró) los 5 Terabytes de datos.

1. **Cierre de Accesos (Zero Trust):** Revocar todas las contraseñas de los administradores de Base de Datos y forzar Autenticación Multi-Factor (MFA) para todos.

   **Comandos de Contención de Acceso a Base de Datos:**
   ```sql
   -- MySQL: Revocar accesos remotos
   REVOKE ALL PRIVILEGES ON *.* FROM 'app_user'@'%';
   DROP USER IF EXISTS 'compromised_user'@'%';
   FLUSH PRIVILEGES;

   -- Cambiar puerto por defecto temporalmente
   SET GLOBAL port = 3307;

   -- Activar general_log para auditoría
   SET GLOBAL general_log = ON;
   ```

   **Revocación de Accesos en Cloud:**
   ```bash
   # AWS IAM - Desactivar claves de acceso
   aws iam update-access-key --access-key-id AKIA... --status Inactive --user-name admin-data

   # Microsoft Entra ID - Revocar sesiones mediante Microsoft Graph
   Connect-MgGraph -Scopes "User.RevokeSessions.All"
   Revoke-MgUserSignInSession -UserId "admin@empresa.com"
   ```

   Fuente: [Microsoft Graph — revokeSignInSessions](https://learn.microsoft.com/en-us/graph/api/user-revokesigninsessions?view=graph-rest-1.0).

2. **Parchear la Vulnerabilidad:** Si el hacker entró por una Inyección SQL en la página web, el equipo de programación debe reescribir ese código en las próximas horas antes de volver a encender la página web de ventas.

   **Vectores Comunes de Exfiltración:**

   | Vector | Cómo ocurre | Mitigación |
   |--------|-------------|------------|
   | SQL Injection | Consultas dinámicas sin parametrizar | Prepared statements, WAF |
   | SSRF (Server Side Request Forgery) | El servidor web accede a metadatos cloud | Restringir metadatos endpoint |
   | Backup Comprometido | Atacante accede a backups no cifrados | Cifrado de backups, MFA en backup system |
   | API Insegura | Endpoints sin autenticación | API gateway, OAuth2 |
   | S3 Misconfiguration | Bucket público sin ACL | S3 Block Public Access, IAM policies |
   | VPN Compromise | Credenciales VPN robadas | MFA, device compliance |
   | Third-party Breach | Proveedor externo comprometido con acceso | Revisar acceso de terceros |

**Análisis de Logs Forenses para Determinar el Vector:**
```kql
// Microsoft Sentinel - Identificar Inyección SQL en logs de aplicación
AppServiceHTTPLogs
| where TimeGenerated > ago(7d)
| where csUriQuery contains "'" or csUriQuery contains "--" or csUriQuery contains "union"
| where scStatus == 200
| project TimeGenerated, csUsername, cIP, csUriQuery, csUriStem
| summarize count() by cIP, csUriStem
| where count_ > 10

// AWS CloudTrail - Actividad de S3 inusual
CloudTrail
| where EventSource == "s3.amazonaws.com"
| where EventName in ("GetObject", "ListBucket")
| where UserIdentityType == "IAMUser"
| where SourceIPAddress not in ("10.0.0.0/8", "172.16.0.0/12")
| project EventTime, UserName, SourceIPAddress, RequestParameters
```

---

### Paso 3: Recuperación (La Disculpa Pública)
La "Recuperación" en este escenario significa recuperar la confianza del cliente, no recuperar servidores.

1. **Comunicado de Prensa (PR):** Publicar un comunicado transparente admitiendo el error. *Regla de Oro:* Las empresas que ocultan un hackeo (Ej. Caso Uber) terminan con Directivos en la cárcel. Las empresas que lo admiten el Día 1 sobreviven. Y eso no es broma, ha pasado.

   **Estructura de Comunicado de Incidente:**
   ```
   [Fecha] - [Empresa] informa sobre un incidente de seguridad

   1. Qué ocurrió: Descripción del incidente sin detalles técnicos explotables
   2. Cuándo ocurrió: Línea de tiempo del descubrimiento
   3. Qué datos están afectados: Categorías de datos, NO volúmenes exactos
   4. Qué estamos haciendo: Acciones de contención y mitigación
   5. Qué deben hacer los clientes: Cambiar contraseñas, monitorear cuentas
   6. Contacto: Email/hotline para consultas
   ```

2. **Monitoreo Crediticio:** Ofrecer a los 5 millones de clientes afectados un servicio de monitoreo de tarjetas de crédito gratuito por 12 meses pagado por la empresa. (Estrategia de mitigación de demandas colectivas).

3. **Auditoría Externa:** Contratar a una empresa forense externa (Mandiant, CrowdStrike) para que certifique públicamente que el hacker ya no está en el edificio.

### Investigación en Dark Web

Una vez que se detecta la fuga, el equipo de Threat Intelligence debe:

1. **Monitorear foros de la Dark Web** (RaidForums, Breached, Exploit.in) para detectar la publicación de los datos.
2. **Usar servicios de monitoreo** como Digital Shadows, Flare, ZeroFox.
3. **Verificar si los datos son reales** comparando una muestra de datos proporcionada por el extorsionador contra la base de datos real.
4. **Solicitar la eliminación** si los datos se publican en plataformas legítimas (Pastebin, GitHub).

### Checklist de Respuesta a Fuga de Datos

```
[ ] 1. Confirmar que los datos filtrados son reales (muestra vs producción).
[ ] 2. Preservar el email de extorsión como evidencia (cadena de custodia).
[ ] 3. Determinar el vector de entrada (log analysis, forensic analysis).
[ ] 4. Identificar el alcance: qué datos, cuántos registros, qué sistemas.
[ ] 5. Contener: cerrar el vector de exfiltración inmediatamente.
[ ] 6. Notificar a los abogados y al equipo de compliance.
[ ] 7. Activar el equipo de relaciones públicas.
[ ] 8. Preparar la notificación regulatoria (GDPR, CCPA, etc.) dentro del plazo legal.
[ ] 9. Notificar a las fuerzas de seguridad (Policía Cibernética, FBI, Europol).
[ ]10. Contratar forense externo para certificación independiente.
[ ]11. Notificar a los clientes afectados.
[ ]12. Implementar mejoras de seguridad (lessons learned).
[ ]13. Preparar informe post-mortem ejecutivo.
```

---

## 4. Criterio de Dominio (Autoevaluación)

Revisa si puedes manejar la peor crisis del mundo corporativo:

1. Un Director Técnico (CISO) recibe una amenaza de extorsión por el robo de la Base de Datos. El CISO decide borrar el correo y no avisarle a nadie porque "tiene Backups y puede restaurar el sistema sin problema". Explica la falla catastrófica de lógica del CISO al confundir un ataque de Ransomware tradicional con un ataque de **Fuga de Datos (Data Breach)**.
2. Basado en el concepto de "Gobierno, Riesgo y Cumplimiento" (GRC), explica por qué ocultarle a los clientes (y al gobierno) que sus tarjetas de crédito fueron robadas generará un impacto financiero legal infinitamente mayor que el costo de la extorsión original.
3. Explica el concepto de **Doble Extorsión (Double Extortion)**. ¿Por qué los grupos de Ransomware modernos ya no se conforman con cifrar tus datos localmente, sino que ahora siempre los descargan a sus propios servidores *antes* de encriptar los tuyos?
4. Durante la fase de **Recuperación** de una fuga masiva de datos, ¿Por qué la acción principal recae en el equipo de "Relaciones Públicas y Legal" en lugar del equipo de "Ingeniería de Sistemas"?
5. ¿Qué es el DLP (Data Loss Prevention) y cómo podría haber detectado una exfiltración masiva de datos antes de que el atacante contactara al CEO con la extorsión?
