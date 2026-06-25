# Glosario de Ciberseguridad

## Conceptos Base

- Activo: recurso que tiene valor, como un servidor, una cuenta, una base de datos o información.
- Amenaza: causa potencial de un incidente, como malware, phishing o un atacante.
- Vulnerabilidad: debilidad que puede ser explotada.
- Riesgo: posibilidad de que una amenaza explote una vulnerabilidad y cause impacto.
- Impacto: consecuencia técnica, operativa, financiera o reputacional de un incidente.
- Control: medida para reducir riesgo, como MFA, backups, firewalls o monitoreo.

## Seguridad

- Confidencialidad: que solo personas autorizadas accedan a la información.
- Integridad: que la información no sea alterada sin autorización.
- Disponibilidad: que los sistemas esten accesibles cuando se necesitan.
- Autenticación: comprobar quien eres.
- Autorización: comprobar que puedes hacer.
- Auditoria: registrar y revisar acciones.
- AAA: autenticación, autorización y accounting. Se usa para controlar acceso y dejar rastro de acciones.
- MFA: autenticación multifactor. Combina algo que sabes, tienes o eres.
- Menor privilegio: dar solo los permisos necesarios para una tarea.
- Defensa en profundidad: usar varias capas de controles para que una falla no comprometa todo.
- Hardening: reducir superficie de ataque desactivando riesgos innecesarios y aplicando configuraciones seguras.
- Superficie de ataque: todos los puntos por donde un sistema puede ser atacado.
- Secreto: credencial sensible como password, token, API key, certificado o llave privada.

## Redes

- IP: dirección lógica de un equipo en una red.
- Puerto: identificador de un servicio dentro de un equipo.
- DNS: sistema que traduce nombres de dominio a direcciones IP.
- DHCP: protocolo que asigna configuración de red automaticamente.
- NAT: traduccion de direcciones de red.
- VLAN: separación lógica dentro de una red.
- ACL: regla de control de acceso para permitir o negar tráfico.
- TCP: protocolo orientado a conexión usado por servicios que requieren entrega confiable.
- UDP: protocolo sin conexión usado cuando importa velocidad o simplicidad.
- Gateway: equipo que permite salir de una red hacia otra.
- Subnetting: dividir una red IP en redes más pequeñas.
- CIDR: notacion para expresar rango de red, por ejemplo `192.168.1.0/24`.
- Firewall: control que permite o bloquea tráfico según reglas.
- IDS: sistema que detecta tráfico o actividad sospechosa.
- IPS: sistema que detecta y también puede bloquear actividad sospechosa.
- Proxy: intermediario entre cliente y destino, usado para control, filtrado o registro.
- VPN: tunel cifrado para conectar usuarios o redes.

## Web

- HTTP: protocolo usado por la web.
- Header: metadato enviado en una petición o respuesta HTTP.
- Cookie: dato guardado por el navegador y enviado al servidor.
- Sesión: estado de autenticación o interaccion de un usuario.
- API: interfaz para que sistemas se comuniquen.
- TLS: protocolo que protege comunicaciones cifrando el tráfico.
- CORS: mecanismo del navegador que controla que origen puede leer respuestas de otro origen.
- CSRF: ataque que intenta forzar al navegador de una victima a ejecutar una acción autenticada.
- XSS: inyección de JavaScript en una página vista por otros usuarios.
- SQL Injection: inyección de consultas SQL por entradas no controladas.
- SSRF: abuso de un servidor para que haga peticiones internas o externas no previstas.
- IDOR: acceso directo inseguro a objetos por falta de autorización correcta.
- BOLA: autorización rota a nivel de objeto, común en APIs.
- JWT: token usado para transmitir claims entre sistemas.
- Security headers: cabeceras HTTP que reducen riesgos en navegador o transporte.

## Blue Team

- Log: registro de eventos.
- SIEM: plataforma para recolectar, buscar y correlacionar eventos.
- Alerta: evento o conjunto de eventos que requiere investigación.
- IOC: indicador de compromiso.
- Threat hunting: busqueda proactiva de actividad sospechosa.
- Telemetria: datos generados por sistemas para observar actividad y comportamiento.
- Triage: primera clasificación de una alerta para decidir prioridad y siguientes pasos.
- Falso positivo: alerta que parece maliciosa pero no representa una amenaza real.
- Regla Sigma: formato generico para describir detecciones basadas en logs.
- Regla YARA: regla usada para identificar patrones en archivos o memoria.
- MITRE ATT&CK: base de conocimiento de tacticas y técnicas usadas por adversarios.
- Playbook: guía operativa para responder a un tipo de incidente.
- Runbook: procedimiento repetible y detallado para ejecutar una tarea operativa.
- Blue Team: equipo defensivo encargado de monitoreo, detección, investigación y respuesta.
- Purple Team: colaboracion entre Red Team y Blue Team para mejorar detecciones, controles y respuesta.
- White Team: equipo que coordina reglas, alcance, autorización y evaluación en ejercicios de seguridad.

## Red Team

- Reconocimiento: recoleccion de información.
- Enumeración: identificación detallada de servicios, usuarios o recursos.
- Explotación: uso de una vulnerabilidad en un entorno autorizado.
- Privilege escalation: aumento de privilegios en un sistema.
- Payload: contenido enviado para probar o explotar un comportamiento.
- Post-explotación: actividades después de lograr acceso en un laboratorio o prueba autorizada.
- Remediación: acción para corregir o reducir un riesgo encontrado.
- Evidencia: datos que respaldan un hallazgo, como logs, capturas o salidas de comandos.
- Red Team: equipo ofensivo autorizado que simula adversarios para evaluar defensas.
- White Hat: persona que trabaja con permiso, legalidad y ética.
- Black Hat: atacante malicioso que opera sin autorización.
- Gray Hat: persona que actua en zona ambigua, a veces sin permiso claro; es riesgoso legal y eticamente.
- Scope: límites autorizados de una prueba o ejercicio.
- Rules of engagement: reglas que definen que se permite, que no se permite, horarios, sistemas y contactos.

## Windows y Active Directory

- Dominio: conjunto administrado de usuarios, equipos y recursos en Active Directory.
- Domain Controller: servidor que autentica y administra el dominio.
- Kerberos: protocolo de autenticación usado en entornos Windows/AD.
- LDAP: protocolo para consultar y modificar servicios de directorio.
- GPO: política de grupo usada para aplicar configuraciones a usuarios o equipos.
- OU: unidad organizativa para ordenar objetos y aplicar políticas.
- SID: identificador unico de seguridad en Windows.
- Event ID: número que identifica un tipo de evento en logs de Windows.

## Cloud

- IAM: gestion de identidades y permisos.
- Bucket: almacenamiento de objetos en la nube.
- Region: ubicación geografica de servicios cloud.
- Responsabilidad compartida: division de responsabilidades entre proveedor cloud y cliente.
- Role: identidad o conjunto de permisos asumible por usuarios, servicios o recursos.
- Policy: documento que define permisos permitidos o denegados.
- Security group: control de red que filtra tráfico hacia recursos cloud.
- Public exposure: recurso accesible desde internet cuando no debería estarlo.
- Logging cloud: registros como CloudTrail, Azure Activity Logs o Cloud Audit Logs.
- KMS: servicio para administrar llaves de cifrado.

## Vulnerabilidades y Riesgo

- CVE: identificador público de una vulnerabilidad conocida.
- CVSS: sistema de puntuacion de severidad técnica.
- EPSS: probabilidad estimada de explotación de una vulnerabilidad.
- Exploitability: que tan viable es explotar una vulnerabilidad.
- Compensating control: control alternativo que reduce riesgo cuando no se puede corregir de inmediato.
- SLA de remediación: tiempo objetivo para corregir según severidad o riesgo.
- Asset criticality: importancia de un activo para el negocio o la operación.
