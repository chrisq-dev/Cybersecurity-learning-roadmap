---
title: "Playbook: Fuga de Datos y Extorsión"
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
La contención en una Fuga de Datos no es técnica, es **Legal y de Relaciones Públicas (GRC)**.

1. **Involucrar a los Abogados:** Llamar inmediatamente al equipo legal. En Europa (GDPR) y California (CCPA), la empresa tiene exactamente **72 horas legales** para notificar al gobierno sobre la fuga de datos. Si el equipo técnico oculta el ataque, las multas gubernamentales quebrarán a la empresa.

   **Plazos de Notificación por Regulación:**

   | Regulación | Plazo | Multa Máxima |
   |------------|-------|--------------|
   | GDPR (UE) | 72 horas desde conocimiento | 20M EUR o 4% factura global |
   | CCPA (California) | Sin plazo específico, pero "sin demora injustificada" | $2,500 por incidente por violación |
   | LGPD (Brasil) | 72 horas | 2% factura anual (máx 50M BRL) |
   | PCI-DSS | Inmediato al adquiriente | Multas contractuales + pérdida de licencia |
   | HIPAA (Salud EE.UU.) | 60 días | $1.5M por violación por año |
   | SOX (Empresas públicas) | Depende de materialidad | Multas SEC + penas de cárcel |

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

3. **No Pagar (Aún):** Pagar a terroristas o carteles sancionados por la OFAC (EE. UU.) es un delito federal grave. Los abogados deben verificar quién es el grupo atacante antes de siquiera pensar en negociar.

   **Consideraciones Legales sobre Pago de Rescate:**
   * OFAC (Office of Foreign Assets Control) de EE.UU. sanciona a personas y organizaciones. Pagar a una entidad sancionada (como ciertos grupos de ransomware) puede resultar en multas millonarias.
   * El FBI y CISA recomiendan NO pagar. Pagar no garantiza que los datos no se publiquen (solo el 4% de las víctimas que pagan recuperan todos sus datos según estudios).
   * En España, la Ley de Seguridad Nacional no prohíbe explícitamente el pago, pero puede ser ilegal si el grupo atacante está en la lista de la ONU o UE.
   * En caso de pago, se requiere reporte al FINCEN (EE.UU.) si supera $10,000.

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

   # Azure - Revocar sesiones
   Revoke-AzureADUserAllRefreshToken -ObjectId "admin@empresa.com"
   ```

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
// Azure Sentinel - Identificar Inyección SQL en logs de aplicación
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
