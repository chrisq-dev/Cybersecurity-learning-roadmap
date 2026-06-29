---
title: "Logs vs Alertas: Separando la Basura del Fuego"
level: "intermedio"
content_type: "guia"
updated: "2026-06-29"
---

# Logs vs Alertas: Separando la Basura del Fuego

## Objetivo de esta Guía

Aprender la diferencia crítica entre tener un dato guardado en un disco duro (log) y tener una llamada de emergencia a las 3:00 AM (alerta). El mayor problema del SOC no es que no puedan ver al atacante. Es que ven demasiado. Un banco mediano genera terabytes de registos todos los días. Encontrar al atacante ahí es peor que buscar una aguja en un pajar: es buscar una aguja específica en una pila de 10 millones de agujas donde la mayoría son idénticas.

Esta guía te enseña a distinguir entre ruido y señal, a construir alertas efectivas, a entender por qué la fatiga de alertas es el enemigo silencioso del SOC, y a diseñar sistemas de detección que no ahoguen a los analistas en información inútil. Trabajaras con ejemplos reales de logs, reglas de alerta, y escenarios de tuning que enfrentaras en tu primer mes como analista.

## El Log: La Bitácora Aburrida

Un log es una línea de texto que registra que algo ocurrió en un sistema. Cada computadora genera miles de logs por segundo sin intervención humana. Cuando mueves el mouse, el sistema anota internamente que el cursor cambio de posición. Cuando Juan inicia sesión a las 8:00 AM, Active Directory registra: "Evento 4624: Juan inicio sesión con éxito."

El log es estúpido. No sabe si la acción fue buena o mala. Solo atestigua que ocurrió y lo archiva en un disco. Esta falta de juicio es su principal fortaleza (es objetivo) y su principal debilidad (genera volumen masivo de datos sin significado).

### Anatomía de un Log

Un log típico contiene campos estandarizados que debes aprender a identificar:

**Timestamp:** La fecha y hora exacta del evento. Sin esto, el log es inútil para reconstruir una línea de tiempo. Debe incluir zona horaria, preferiblemente UTC para evitar confusiones con cambios de horario estacional.

**Identificador del origen:** Que sistema genero el log (nombre del host, dirección IP, o UUID del dispositivo). Esto permite saber donde ocurrió el evento.

**Tipo de evento:** Que categoría de evento se registro (autenticación, creación de proceso, conexión de red, cambio de configuración). En Windows, esto es el Event ID. En syslog, es el facility y severity.

**Usuario o entidad:** Que usuario o proceso ejecutó la acción. Esto es fundamental para atribuir actividades a personas específicas.

**Resultado:** Si la acción fue exitosa o fallida (success/failure, allow/deny, 200/403).

**Detalles adicionales:** Contexto específico del evento como IPs, puertos, nombres de archivo, líneas de comando, o hashes.

### Formatos de Log

**Formato texto plano (syslog legacy):**
```
Jan 15 08:30:00 server01 sshd[1234]: Failed password for root from 192.168.1.100 port 22 ssh2
```
Problema: difícil de parsear automáticamente, campos no delimitados claramente.

**Formato JSON:**
```json
{"timestamp": "2024-01-15T08:30:00Z", "host": "server01", "process": "sshd", "pid": 1234, "action": "failed_password", "user": "root", "src_ip": "192.168.1.100", "port": 22}
```
Ventaja: estructura clara, fácil de procesar por máquinas, campos extensibles.

**Formato CEF (Common Event Format):**
```
CEF:0|Security|SSHD|1.0|100|Failed Login|5|src=192.168.1.100 dst=10.0.0.1 suser=root
```
Usado por dispositivos de seguridad como firewalls e IDS.

**Formato Windows EVTX:**
Formato binario propietario de Microsoft. Se lee con herramientas como wevtutil, Log Parser, o a través del Windows Event Log API. Cada evento tiene un ID numérico que identifica el tipo de evento.

### Donde se Generan los Logs y que Información Contienen

**Sistemas Operativos:**
- Windows: Event Log (Security, System, Application, PowerShell). Event IDs comunes: 4624 (logon success), 4625 (logon failure), 4688 (process creation), 1102 (security log cleared).
- Linux: syslog, auth.log, kern.log, dmesg. Cada servicio puede tener su propio archivo en /var/log/.

**Servidores Web:**
- Apache access log: IP, timestamp, método HTTP, URL, código de estado, user-agent.
- Apache error log: Errores del servidor, incluyendo intentos de explotación.
- Nginx access log: Similar a Apache, formato configurable.
- IIS (Windows): Formato W3C, similar a Apache.

**Bases de Datos:**
- MySQL general log: Todas las consultas SQL ejecutadas.
- MySQL slow query log: Consultas lentas (configurable por tiempo).
- PostgreSQL log: Consultas, errores, conexiones, configurado via postgresql.conf.

**Dispositivos de Red:**
- Firewalls: Conexiones permitidas y denegadas, con IP origen/destino, puertos, protocolo, acción.
- Routers y switches: Cambios de configuración, caidas de enlace, errores de interfaz.
- IDS/IPS: Alertas de detección con firma, severidad, payload del ataque.

**Aplicaciones Cloud:**
- AWS CloudTrail: Llamadas a la API de AWS, incluyendo quien hizo que y desde donde.
- Azure Monitor: Logs de recursos de Azure, actividad de suscripcion.
- GCP Cloud Logging: Logs de servicios de Google Cloud.

**Servicios de Directorio:**
- Active Directory: Autenticación, cambios de grupo, creación de usuarios, replicación.
- LDAP: Consultas y modificaciones al directorio.

### Por qué los Logs son Insuficientes por si Solos

Imagina a un analista Tier 1 viendo esta secuencia en tiempo real sin ningún filtro:
1. Juan abrió Word.
2. El firewall bloqueo una IP de China.
3. Maria cerró Excel.
4. El servidor 2 se quedó sin RAM.
5. Juan descargó un archivo sospechoso desde una IP desconocida.
6. Pedro inicio sesión desde una IP nueva en Rusia.
7. El antivirus actualizo sus definiciones.
8. El servicio de correo se reinicio por actualización de Windows.
9. La base de datos reporto lentitud por indexacion.
10. Un empleado cambio su contraseña por políticas de caducidad.

En esta secuencia, los eventos 5 y 6 son potencialmente graves. Pero están ahogados entre 8 eventos inocuos. El cerebro humano no puede sostener este nivel de discriminacion por 8 horas seguidas, 5 días a la semana. Por eso necesitamos alertas.

## La Alerta: El Grito del Sistema

Una alerta es un log que fue evaluado por una regla y superó un umbral de peligrosidad. El trabajo del Blue Team avanzado no es leer logs manualmente. Es crear reglas para que las máquinas lean los logs por ellos y solo molesten al humano cuando sea necesario.

La regla más básica: "Si un usuario falla su contraseña 1 vez, ignóralo. Si falla 50 veces en 1 minuto, enciende la sirena y alerta al analista."

Pero las alertas efectivas son mucho más complejas que simples umbrales. Una buena alerta responde estas preguntas automáticamente:
- Que paso exactamente? (Título claro y específico).
- Que tan grave es? (Severidad basada en contexto, no solo en el evento).
- Donde paso? (Host, IP, aplicación afectada).
- Quien esta involucrado? (Usuario, proceso).
- Cuando paso? (Timestamp exacto y ventana de tiempo relevante).
- Que evidencia hay? (Logs que dispararon la regla).
- Que debo hacer? (Acción recomendada o playbook asociado).

### Tipos de Alertas según su Lógica de Detección

**Alertas basadas en umbrales:** Se disparan cuando un contador supera un límite. Son fáciles de implementar pero propensas a falsos positivos si el umbral no se ajusta al contexto.

Ejemplo: "10 intentos de autenticación fallidos en 5 minutos desde la misma IP."

Problema: Si el umbral es 10 y el empleado olvida su contraseña 8 veces, no hay alerta. Pero si un atacante hace 9 intentos y se detiene, tampoco. El umbral es un número arbitrario que los atacantes pueden aprender y evadir.

**Alertas basadas en firmas:** Buscan patrones específicos conocidos de malware o técnicas de ataque. Son precisas pero solo detectan lo que ya se conoce.

Ejemplo: "Detección de Mimikatz en memoria del proceso lsass.exe."

Problema: Si el atacante modifica Mimikatz ligeramente (cambia strings, ofusca), la firma no coincide y la alerta falla.

**Alertas basadas en comportamiento:** Detectan desviaciones de la línea base de comportamiento normal. Son las más difíciles de implementar pero las más efectivas contra ataques desconocidos.

Ejemplo: "El usuario juan.perez, que nunca trabaja fuera del horario laboral, inicio sesión a las 3:00 AM desde una IP en un país donde la empresa no tiene operaciones."

**Alertas basadas en correlacion:** Combinan múltiples eventos de diferentes fuentes para identificar patrones de ataque complejos que eventos individuales no revelarian.

Ejemplo: "Un usuario recibe un correo con un enlace (fuente: email gateway) + hace clic en el enlace (fuente: proxy) + descarga un archivo (fuente: proxy) + ejecuta el archivo (fuente: EDR)."

Estas alertas son las más poderosas porque detectan la cadena completa del ataque, no solo un paso aislado. Pero son las más complejas de implementar y las que más recursos de procesamiento requieren.

### Propiedades de una Alerta Bien Diseñada

**Accionable:** El analista sabe exactamente que hacer cuando recibe la alerta. No hay ambiguedad sobre el siguiente paso.

**Contextual:** Incluye suficiente información para que el analista entienda el escenario sin tener que buscar datos adicionales.

**Priorizada:** La severidad refleja el riesgo real para el negocio, no solo la gravedad técnica del evento.

**No redundante:** No genera la misma alerta múltiples veces para el mismo incidente.

**Auditable:** Todas las acciones tomadas sobre la alerta quedan registradas para revisión posterior.

## Falsos Positivos y Falsos Negativos

El peor enemigo del Blue Team no es el atacante, es el falso positivo: cuando tu regla matemáticamente diseñada enciende la sirena roja por un evento inocente.

**Ejemplo clásico:** Escribes una regla que dice: "Alerta CRITICA si alguien sube un archivo ZIP encriptado a Google Drive." La lógica es sólida: los atacantes usan archivos ZIP encriptados para exfiltrar datos sin que el antivirus pueda inspeccionarlos. Suena la alarma. El SOC investiga. Descubren que fue Recursos Humanos enviando nominas protegidas por política de privacidad. No era un ataque, era un proceso legítimo.

Si esto ocurre 500 veces al día, los analistas se cansan y empiezan a cerrar las alertas sin mirarlas. El día que un atacante real pase por ahí exfiltrando datos, el analista cerrará la alerta por costumbre.

### El Ciclo del Falso Positivo

1. Se implementa una regla de detección.
2. La regla genera alertas, algunas son falsos positivos.
3. Los analistas comienzan a reconocer patrones de falsos positivos.
4. Los analistas desarrollan "ceguera" a esas alertas.
5. Un ataque real genera la misma alerta.
6. El analista la cierra sin investigar por habito.
7. El ataque tiene éxito.

### Falsos Negativos: El Asesino Silencioso

Los falsos negativos son igual de peligrosos pero invisibles. Ocurren cuando una regla NO se dispara pero DEBERIA. No hay alerta, no hay investigación, no hay respuesta. El atacante opera libremente.

Causas comunes:
- Reglas demasiado específicas que solo detectan una variante del ataque.
- Falta de telemetría para ciertos tipos de eventos.
- Ofuscación del ataque que evade la firma.
- Técnicas living off the land indistinguibles de actividad normal.

## Casos Reales de Logs y Alertas

### El caso del Beach No Lincoln (2017)

Un atacante comprometio una empresa de apuestas en Reino Unido. Estuvo presente en la red durante meses moviéndose lateralmente. Los logs existian, las alertas también, pero el equipo de seguridad solo revisaba alertas de alto nivel. El atacante generaba alertas de nivel bajo y medio consistentemente, pero nadie las investigaba.

### El caso de la Alerta Ignorada (2014)

Un analista SOC de una empresa de telecomunicaciones recibia diariamente una alerta de conexión saliente a una IP sospechosa. Siempre resultaba ser tráfico legítimo de un servidor de actualizaciones. Empezó a cerrarla sin mirar. Un día, la misma alerta correspondia a un malware exfiltrando datos.

### El caso del Log Sin Contexto (2020)

Un equipo de respuesta a incidentes encontró un log que decían: "El usuario admin ejecutó el comando rm -rf /." El log no incluia desde que terminal se ejecutó, si fue local o remota, ni que usuario de sistema ejecutó el comando real. Sin ese contexto, no pudieron determinar si fue un atacante o un administrador cometiendo un error.

## Modos de Falla

Sin logs sincronizados temporalmente, la correlacion entre eventos es imposible. Sin contexto en los logs, no se puede investigar. Sin alertas bien diseñadas, los analistas se saturan. Sin procesos de tuning, las alertas se vuelven obsoletas. Cada eslabón de la cadena log-alerta-respuesta debe funcionar correctamente.

## La Perspectiva del Atacante

El atacante sabe que los logs son su peor enemigo. Por eso los borra, los modifica, deshabilita servicios de logging, y opera con herramientas que minimizan la generación de registros. Su mejor aliado es el ruido: si puede generar suficientes falsos positivos, saturara al SOC y operara bajo la cobertura del caos.

## Autoevaluación

1. `{"ip": "10.0.0.1", "action": "GET /index.html", "status": 200}`. Es log o alerta? Que necesitaria para ser alerta?
2. Regla: "Alertar si alguien ejecuta DROP TABLE." Recibes 500 alertas diarias del equipo de desarrollo. Es falso positivo o falso negativo? Como ajustas la regla?
3. Por qué enviar logs crudos a la pantalla del analista sin reglas de alerta garantiza su saturacion?
4. Un atacante borra los Event Logs de Windows. Puede el SOC investigar? Que otras fuentes de datos podrían tener evidencia?
5. Regla: "Alertar si usuario se conecta desde país diferente al habitual." Tu empresa es una aerolínea internacional. Como evitas 50,000 falsos positivos al día?
6. Un analista recibe las mismas 100 alertas diarias y las cierra sin mirar. Un día una es diferente pero la cierra por inercia. Que falla queda expuesta?
7. Diseña un sistema de logging para una startup de 50 empleados. Que fuentes son esenciales y cuáles puedes omitir inicialmente?
8. El equipo de desarrollo pide acceso directo a los logs del SIEM para depurar errores. Debes negarlo? Que alternativas existen?

## Fuentes de Logs Críticas

### Logs de Sistema Operativo

**Windows Event Log:**
- Security: Inicios de sesión exitosos/fallidos (4624, 4625), cambios en privilegios (4672), creación de usuarios (4720), cambios en políticas de seguridad (4719).
- System: Eventos del sistema operativo, drivers, servicios (inicio, parada, fallo).
- Application: Logs de aplicaciones instaladas.
- PowerShell: Comandos ejecutados en PowerShell (4103, 4104) habilitado via Script Block Logging.

**Sysmon (System Monitor - Sysinternals):**
- Event ID 1: Creación de proceso (imagen, línea de comandos, hash).
- Event ID 3: Conexión de red (origen, destino, puerto, protocolo).
- Event ID 7: Carga de DLL (imagen cargada, DLL cargada).
- Event ID 8: Creación de remote thread (indicador de inyección de código).
- Event ID 11: Creación de archivo.
- Event ID 13: Cambio en registro.
- Event ID 15: Pipe creado.

**Linux Logs:**
- /var/log/auth.log: Autenticaciones (SSH, sudo, login).
- /var/log/syslog: Eventos del sistema.
- /var/log/kern.log: Mensajes del kernel.
- /var/log/audit/audit.log: Logs de auditd (Linux Audit Daemon).
- journalctl: Logs del sistema via systemd-journald.

### Logs de Red

**Firewall Logs:**
- Conexiones permitidas y bloqueadas.
- IPs origen y destino.
- Puertos y protocolos.
- Acciones (permitir, denegar, drop).

**DNS Logs:**
- Consultas DNS realizadas.
- Dominios resueltos.
- IPs de respuesta.

**Proxy Logs:**
- URLs visitadas.
- Método HTTP.
- User-Agent.
- Tamanos de contenido.

**DHCP Logs:**
- Asignaciones de IP.
- MAC addresses.
- Hostnames.

### Logs de Aplicaciones Web

**Web Server (IIS, Apache, Nginx):**
- Método HTTP (GET, POST, PUT, DELETE).
- URL solicitada.
- Código de respuesta (200, 404, 500).
- User-Agent.
- IP del solicitante.
- Parámetros enviados.
- Cookies.

**Base de Datos:**
- Consultas lentas.
- Intentos de conexión fallidos.
- Cambios en permisos.
- Lecturas masivas de datos.

## Estándares de Formato de Logs

### CEF (Common Event Format - ArcSight)

Formato de Arcsight (Micro Focus). Usa pipes como delimitadores:

```
CEF:0|Vendedor|Producto|Version|Signature ID|Name|Severity|[Extension]
```

Ejemplo:
```
CEF:0|Microsoft|Windows|10|4625|Failed logon|5|src=192.168.1.100 dst=10.0.0.5 duser=admin
```

### LEEF (Log Event Extended Format - QRadar)

Formato de QRadar (IBM). Usa tabs como delimitadores:

```
LEEF:1.0|Vendedor|Producto|Version|EventID|devTime|field1=value1	field2=value2
```

### JSON

Formato moderno y más flexible:

```json
{
  "timestamp": "2024-01-01T12:00:00",
  "event_id": 4625,
  "source_ip": "192.168.1.100",
  "destination_ip": "10.0.0.5",
  "username": "admin",
  "logon_type": 3,
  "status": "failure"
}
```

## Gestión del Ciclo de Vida de Alertas
## Preguntas Adicionales

9. El equipo de IT implementa una nueva aplicación que genera 50,000 logs por segundo. El SIEM esta diseñado para 10,000 EPS. Como manejas esta situación sin perder capacidad de detección?
10. Un administrador de sistemas ejecuta un script que modifica 500 cuentas de usuario en una hora. El SIEM genera 500 alertas de "modificación de cuenta." Como evitas que este tipo de eventos abrumen a los analistas?
11. El CEO te pide que reduzcas los logs a solo "lo que importa." Como le explicas que un log que hoy parece irrelevante puede ser crítico en una investigación futura?
12. Implementas Sysmon en 1000 endpoints. El volumen de logs se triplica. El equipo de operaciones se queja del rendimiento. Como balanceas la necesidad de telemetría de seguridad con el rendimiento del sistema?

## Gestión del Ciclo de Vida de Alertas

### Fases de una Alerta

1. **Generación:** El SIEM/SOAR crea la alerta basada en reglas de correlacion.
2. **Triage:** Un analista revisa la alerta y determina si requiere investigación inmediata o puede esperar.
3. **Investigación:** Si es positiva, se investiga para determinar alcance, impacto, y origen del evento.
4. **Contención:** Se toman acciones para detener la amenaza (bloquear IP, aislar sistema, deshabilitar cuenta, desplegar parche).
5. **Cierre:** Se documenta el resultado final de la alerta: ataque confirmado, falso positivo, o comportamiento benigno.
6. **Retroalimentacion:** La alerta y su resultado alimentan mejoras en reglas de detección, exclusiones, y procesos de respuesta.

### Priorización de Alertas

**Por criticidad del activo:** Una alerta en un servidor de base de datos de producción con datos de clientes tiene prioridad absoluta sobre una alerta en un servidor de desarrollo interno.

**Por tipo de amenaza:** Ransomware > Acceso no autorizado > Malware conocido > Comportamiento sospechoso > Violación de política.

**Por contexto temporal:** Una alerta de conexión a IP sospechosa a las 3 AM desde la cuenta de un empleado que nunca trabaja en ese horario es más crítica que la misma alerta a las 3 PM.

**Por confianza en la regla:** Una alerta generada por una regla basada en IoCs confirmados (alta confianza) puede priorizarse sobre una alerta de una regla de análisis de comportamiento (confianza media/baja).

### SLAs por Tipo de Alerta

- **Crítica:** Triage en 5 minutos, investigación en 15 minutos, contención en 30 minutos.
- **Alta:** Triage en 15 minutos, investigación en 1 hora, contención en 2 horas.
- **Media:** Triage en 1 hora, investigación en 4 horas, contención en 8 horas.
- **Baja:** Triage en 24 horas, investigación e informe en 48 horas.

## Automatización de Alertas con SOAR

Security Orchestration, Automation and Response (SOAR) automatiza tareas repetitivas de respuesta a incidentes.

**Ejemplo de automatización con SOAR:**
1. Alerta de SIEM: Posible ransomware detectado en endpoint.
2. SOAR recibe la alerta y ejecuta un playbook automático.
3. Paso 1: Confirmar que el endpoint esta activo (ping).
4. Paso 2: Aislar el endpoint de la red (API del EDR).
5. Paso 3: Tomar una captura de memoria (API de la herramienta forense).
6. Paso 4: Enviar notificación al equipo de IR via Slack/Teams.
7. Paso 5: Crear un ticket en el sistema de gestión de incidentes.
8. Paso 6: Esperar revisión humana.
9. Todo esto ocurre en segundos, sin intervención humana.
