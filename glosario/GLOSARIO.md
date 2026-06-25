---
title: "Glosario de Ciberseguridad"
---
# Glosario de Ciberseguridad

Este glosario existe para que no te pierdas cuando una guía mencione términos técnicos. No está pensado para memorizar definiciones, sino para entender qué significa cada concepto, por qué importa y con qué otros temas se conecta.

## Cómo Usarlo

- Busca el término que no entiendas.
- Lee primero la explicación simple.
- Revisa el ejemplo.
- Conecta el término con las guías relacionadas.
- Vuelve aquí cada vez que una palabra te frene.

## Fundamentos

### Activo

**Qué es:** Algo que tiene valor para una persona u organización.

**Ejemplo simple:** Un servidor, una base de datos, una laptop, una cuenta de administrador o información de clientes.

**Por qué importa:** No puedes proteger bien algo si no sabes qué existe y qué valor tiene.

**Relacionado con:** inventario, riesgo, impacto, controles.

### Amenaza

**Qué es:** Algo o alguien que podría causar daño a un activo.

**Ejemplo simple:** Un atacante, malware, un empleado descuidado, una falla eléctrica o una mala configuración.

**Por qué importa:** Las defensas se diseñan pensando en amenazas realistas, no en miedo general.

**Relacionado con:** riesgo, vulnerabilidad, impacto, threat modeling.

### Vulnerabilidad

**Qué es:** Una debilidad que puede ser aprovechada para causar daño.

**Ejemplo simple:** Una contraseña débil, un servidor sin parches, un bucket público o una API sin autorización correcta.

**Por qué importa:** Las vulnerabilidades conectan una amenaza con un posible impacto.

**Relacionado con:** CVE, CVSS, remediación, hardening.

### Riesgo

**Qué es:** La posibilidad de que una amenaza aproveche una vulnerabilidad y genere impacto.

**Ejemplo simple:** Un servidor público sin parches tiene riesgo porque alguien podría explotarlo y afectar datos o disponibilidad.

**Por qué importa:** Seguridad no es arreglar todo al mismo tiempo; es priorizar lo que más puede afectar.

**Relacionado con:** impacto, probabilidad, controles, riesgo residual.

### Control

**Qué es:** Una medida para reducir riesgo.

**Ejemplo simple:** MFA, firewall, backups, monitoreo, cifrado, capacitación o revisión de permisos.

**Por qué importa:** Un control no existe para decorar; debe reducir un riesgo concreto.

**Relacionado con:** prevención, detección, corrección, evidencia.

### Superficie de Ataque

**Qué es:** Todo lo que puede ser alcanzado o abusado por un atacante.

**Ejemplo simple:** Puertos abiertos, endpoints de API, formularios web, cuentas expuestas, servicios cloud o dispositivos conectados.

**Por qué importa:** Mientras más grande sea la superficie de ataque, más oportunidades hay para cometer errores o recibir ataques.

**Relacionado con:** hardening, exposición, inventario, segmentación.

## Redes

### IP

**Qué es:** Dirección lógica que identifica un dispositivo dentro de una red.

**Ejemplo simple:** Es como la dirección de una casa, pero para equipos conectados.

**Por qué importa:** Muchas investigaciones empiezan preguntando quién habló con quién.

**Relacionado con:** subnetting, gateway, firewall, logs.

### Puerto

**Qué es:** Número que identifica un servicio dentro de un equipo.

**Ejemplo simple:** `80` suele usarse para HTTP, `443` para HTTPS y `22` para SSH.

**Por qué importa:** Un puerto abierto puede indicar un servicio legítimo o una exposición innecesaria.

**Relacionado con:** TCP, UDP, firewall, escaneo.

### DNS

**Qué es:** Sistema que traduce nombres de dominio a direcciones IP.

**Ejemplo simple:** Convierte `cbsdev.lat` en una IP que el navegador puede contactar.

**Por qué importa:** DNS aparece en navegación, phishing, investigación de dominios y configuración de servicios.

**Relacionado con:** dominio, registros, correo, phishing.

### Firewall

**Qué es:** Control que permite o bloquea tráfico según reglas.

**Ejemplo simple:** Permitir HTTPS hacia una web pública, pero bloquear SSH desde internet.

**Por qué importa:** Ayuda a reducir exposición y controlar qué comunicaciones son permitidas.

**Relacionado con:** puertos, segmentación, logs, reglas.

### VPN

**Qué es:** Conexión cifrada para acceder a una red o servicio de forma más controlada.

**Ejemplo simple:** Un empleado se conecta desde casa a recursos internos de la empresa.

**Por qué importa:** No reemplaza todos los controles, pero ayuda a proteger acceso remoto.

**Relacionado con:** identidad, MFA, acceso remoto, segmentación.

## Web y AppSec

### HTTP

**Qué es:** Protocolo que usan navegadores y servidores para intercambiar información.

**Ejemplo simple:** Tu navegador envía una petición y el servidor responde con HTML, JSON, imágenes o errores.

**Por qué importa:** Para entender seguridad web necesitas entender requests, responses, headers, cookies y sesiones.

**Relacionado con:** APIs, cookies, sesiones, OWASP.

### Autenticación

**Qué es:** Confirmar quién eres.

**Ejemplo simple:** Iniciar sesión con usuario, contraseña y MFA.

**Por qué importa:** Si la autenticación falla, alguien puede entrar como otra persona.

**Relacionado con:** MFA, sesión, contraseña, identity access.

### Autorización

**Qué es:** Confirmar qué puedes hacer después de iniciar sesión.

**Ejemplo simple:** Un usuario normal no debería poder borrar usuarios ni ver facturas ajenas.

**Por qué importa:** Muchos incidentes ocurren porque el sistema valida login, pero no permisos.

**Relacionado con:** IDOR, roles, permisos, Broken Access Control.

### XSS

**Qué es:** Vulnerabilidad donde un atacante logra ejecutar JavaScript en el navegador de otra persona.

**Ejemplo simple:** Un comentario mal filtrado que termina ejecutándose como código en la página.

**Por qué importa:** Puede afectar sesiones, acciones del usuario, contenido visible y confianza en la aplicación.

**Relacionado con:** validación, escaping, CSP, OWASP.

### SQL Injection

**Qué es:** Vulnerabilidad donde datos del usuario terminan alterando una consulta SQL.

**Ejemplo simple:** Un formulario de búsqueda que pega texto del usuario directamente en una consulta.

**Por qué importa:** Puede permitir leer, modificar o borrar datos si la aplicación está mal construida.

**Relacionado con:** prepared statements, bases de datos, validación.

### SSRF

**Qué es:** Vulnerabilidad donde un servidor hace peticiones a lugares que el atacante elige.

**Ejemplo simple:** Una función para cargar imágenes desde URL que puede intentar acceder a servicios internos.

**Por qué importa:** Puede exponer metadata cloud, redes internas o servicios que no deberían ser públicos.

**Relacionado con:** cloud, APIs, allowlist, metadata.

### IDOR

**Qué es:** Fallo de autorización (Insecure Direct Object Reference) donde cambiar un identificador permite acceder a recursos ajenos.

**Ejemplo simple:** Cambiar `factura=100` por `factura=101` y ver una factura de otro usuario.

**Por qué importa:** Es común, fácil de entender y puede causar fuga de datos.
> **Contexto Corporativo:** Es la vulnerabilidad más frecuente y devastadora en APIs REST modernas. Las empresas gastan millones en Firewalls Perimetrales, pero un IDOR se salta todas las defensas porque ocurre en la lógica de negocio, no en la red.

**Relacionado con:** autorización, control de acceso, APIs.

## Blue Team

### Log

**Qué es:** Registro de algo que ocurrió en un sistema.

**Ejemplo simple:** Un login exitoso, un login fallido, una conexión, un error o un archivo creado.

**Por qué importa:** Sin logs, investigar incidentes se vuelve casi imposible.

**Relacionado con:** SIEM, alerta, evidencia, forense.

### Alerta

**Qué es:** Aviso generado cuando una regla detecta algo relevante o sospechoso.

**Ejemplo simple:** Muchos intentos fallidos de login desde la misma IP.

**Por qué importa:** Una alerta no siempre es incidente; necesita análisis.

**Relacionado con:** falso positivo, SIEM, SOC, triage.

### SIEM

**Qué es:** Plataforma que centraliza logs y alertas de distintos sistemas.

**Ejemplo simple:** En lugar de revisar 50 servidores uno por uno, sus logs llegan a un solo lugar.

**Por qué importa:** Ayuda a detectar patrones, investigar incidentes y responder más rápido.

**Relacionado con:** logs, alertas, SOC, MITRE ATT&CK, Sigma.

### EDR

**Qué es:** Herramienta que monitorea y responde a actividad en endpoints como laptops o servidores.

**Ejemplo simple:** Detectar que `Excel.exe` abrió `PowerShell.exe` de forma sospechosa.

**Por qué importa:** Muchos ataques ocurren en equipos finales, no solo en servidores.

**Relacionado con:** endpoint, telemetría, malware, respuesta.

### IOC

**Qué es:** Indicador que puede sugerir actividad maliciosa.

**Ejemplo simple:** Un hash de malware, una IP sospechosa, un dominio usado en phishing o una ruta de archivo rara.

**Por qué importa:** Ayuda a buscar evidencia, pero no debe analizarse sin contexto.

**Relacionado con:** threat intel, hunting, detección, YARA.

### TTP

**Qué es:** Tácticas, técnicas y procedimientos usados por atacantes.

**Ejemplo simple:** Borrar respaldos antes de ejecutar ransomware.

**Por qué importa:** Entender comportamiento es más útil que perseguir solo IPs o hashes.

**Relacionado con:** MITRE ATT&CK, threat hunting, detection engineering.

### MITRE ATT&CK

**Qué es:** Base de conocimiento que organiza comportamientos usados por atacantes.

**Ejemplo simple:** Credential Dumping, Phishing, Lateral Movement o Command and Control.

**Por qué importa:** Da lenguaje común para describir ataques y construir detecciones.

**Relacionado con:** TTP, SIEM, Sigma, Blue Team.

### Falso Positivo

**Qué es:** Alerta que parece peligrosa, pero no representa actividad maliciosa real.

**Ejemplo simple:** Un escáner interno genera tráfico que parece ataque.

**Por qué importa:** Demasiados falsos positivos cansan al equipo y ocultan alertas importantes.

**Relacionado con:** alerta, triage, detección, SOC.

## Cloud e Identidad

### IAM

**Qué es:** Gestión de identidades y accesos.

**Ejemplo simple:** Definir qué usuario, rol o servicio puede leer un bucket o administrar recursos.

**Por qué importa:** Muchos incidentes cloud nacen de permisos excesivos.

**Relacionado con:** MFA, roles, políticas, mínimo privilegio.

### MFA

**Qué es:** Autenticación con más de un factor.

**Ejemplo simple:** Contraseña más app de autenticación.

**Por qué importa:** Reduce el impacto de contraseñas robadas, aunque no elimina todos los riesgos.

**Relacionado con:** phishing, identidad, acceso remoto.

### Mínimo Privilegio

**Qué es:** Dar solo los permisos necesarios para cumplir una función.

**Ejemplo simple:** Una app que solo necesita leer archivos no debería poder borrarlos.

**Por qué importa:** Si una cuenta se compromete, limita el daño posible.

**Relacionado con:** IAM, roles, permisos, Zero Trust.

### Secret

**Qué es:** Dato sensible usado para autenticarse o acceder a servicios.

**Ejemplo simple:** API key, token, contraseña, llave privada o cadena de conexión.

**Por qué importa:** Un secret expuesto puede abrir acceso directo a sistemas o datos.
> **Contexto Corporativo:** Subir *secrets* en código fuente a GitHub de forma accidental (hardcoding) es la causa principal de más del 60% de los hackeos masivos en infraestructura Cloud hoy en día.

**Relacionado con:** vault, rotación, CI/CD, cloud.

## Malware y Forense

### Malware

**Qué es:** Software diseñado para causar daño, robar información o dar acceso no autorizado.

**Ejemplo simple:** Ransomware, spyware, troyanos, gusanos o botnets.

**Por qué importa:** Entender tipos de malware ayuda a detectar, contener y recuperar.

**Relacionado con:** EDR, IOC, forense, respuesta a incidentes.

### Ransomware

**Qué es:** Malware que cifra archivos o sistemas para exigir pago.

**Ejemplo simple:** Una empresa no puede abrir sus archivos y recibe una nota de rescate.

**Por qué importa:** Afecta disponibilidad, continuidad, reputación y datos sensibles.
> **Contexto Corporativo:** El costo de un ataque de ransomware rara vez es el "rescate" en sí. El verdadero costo millonario viene de las semanas de inoperatividad del negocio y las multas regulatorias por fuga de datos.

**Relacionado con:** backups, respuesta a incidentes, malware, continuidad.

### C2

**Qué es:** Command and Control; canal usado por malware o atacantes para recibir instrucciones.

**Ejemplo simple:** Un equipo infectado se conecta cada cierto tiempo a un servidor externo.

**Por qué importa:** Detectar C2 puede ayudar a cortar control del atacante.

**Relacionado con:** botnet, firewall, DNS, threat hunting.

### Hash

**Qué es:** Huella digital calculada a partir de datos.

**Ejemplo simple:** Dos archivos iguales generan el mismo hash; si cambia un byte, cambia el hash.

**Por qué importa:** Sirve para verificar integridad, identificar archivos y documentar evidencia.

**Relacionado con:** forense, malware, integridad, cadena de custodia.

### Cadena de Custodia

**Qué es:** Registro que demuestra cómo se manejó una evidencia.

**Ejemplo simple:** Quién tomó una imagen de disco, cuándo, dónde se guardó y quién tuvo acceso.

**Por qué importa:** Sin cadena de custodia, la evidencia puede perder credibilidad.

**Relacionado con:** forense, evidencia, hash, reporte.

## GRC y Continuidad

### Política

**Qué es:** Documento que define reglas o expectativas.

**Ejemplo simple:** Política de contraseñas, accesos, backups o uso aceptable.

**Por qué importa:** Ayuda a alinear comportamiento, controles y responsabilidades.

**Relacionado con:** GRC, cumplimiento, evidencia, auditoría.

### Auditoría

**Qué es:** Revisión para comprobar si controles, procesos o evidencias cumplen un criterio.

**Ejemplo simple:** Verificar si los backups existen, se prueban y están protegidos.

**Por qué importa:** No basta con decir que algo existe; debe poder demostrarse.

**Relacionado con:** evidencia, controles, cumplimiento, riesgo.

### Riesgo Residual

**Qué es:** Riesgo que permanece después de aplicar controles.

**Ejemplo simple:** Aunque uses MFA, aún puede existir riesgo de phishing avanzado o fatiga de MFA.

**Por qué importa:** Ningún control elimina todo el riesgo; alguien debe aceptar o tratar lo que queda.

**Relacionado con:** GRC, controles, excepciones, aceptación de riesgo.

### BIA

**Qué es:** Business Impact Analysis; análisis del impacto de una interrupción.

**Ejemplo simple:** Determinar cuánto afecta que un sistema de pagos esté caído por 4 horas.

**Por qué importa:** Ayuda a decidir prioridades de continuidad y recuperación.

**Relacionado con:** continuidad, DRP, backups, impacto.

### DRP

**Qué es:** Disaster Recovery Plan; plan para recuperar sistemas después de una interrupción grave.

**Ejemplo simple:** Restaurar servidores, datos y servicios críticos después de ransomware o falla de infraestructura.

**Por qué importa:** Recuperarse no se improvisa durante una crisis.

**Relacionado con:** backups, continuidad, BIA, recuperación.
