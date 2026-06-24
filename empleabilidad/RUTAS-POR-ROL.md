# Rutas por Rol

Elige una ruta principal y una secundaria. No intentes dominar todas al mismo tiempo. En ciberseguridad hay demasiadas areas; avanzar mejor significa construir una base comun y despues profundizar en el tipo de problemas que quieres resolver.

Una ruta no es una lista de archivos ni una coleccion de entregas. Es una forma de ordenar el estudio: que conceptos debes entender, como se conectan entre si y que señales muestran que ya puedes hablar del tema con criterio.

## SOC Analyst Junior

### Debes estudiar

- Redes basicas.
- Linux y Windows.
- Logs.
- SIEM.
- MITRE ATT&CK.
- Respuesta a incidentes.
- Sigma basico.
- Python para leer y resumir datos simples.

### Como se conecta

SOC se trata de convertir señales incompletas en decisiones razonables. Una alerta aislada rara vez cuenta toda la historia. Necesitas entender de donde viene el evento, que activo esta involucrado, que usuario aparece, que comportamiento es normal y que informacion falta.

Redes te ayuda a interpretar origen, destino, puertos y protocolos. Linux y Windows te ayudan a entender endpoints y servidores. SIEM centraliza eventos. MITRE ATT&CK te da lenguaje comun para describir comportamiento. Respuesta a incidentes te ayuda a decidir contencion, escalamiento y comunicacion.

### Señales de comprension

- Puedes explicar una alerta sin asumir que todo es incidente.
- Separas datos observados, hipotesis, falsos positivos e impacto.
- Entiendes que logs faltan antes de afirmar una conclusion.
- Puedes describir una deteccion conceptual y sus limites.
- Puedes comunicar severidad, impacto y siguientes pasos.

### Puedes aplicar cuando

- Explicas que paso, donde paso y por que importa.
- Propones contencion proporcional al riesgo.
- Reconoces incertidumbre sin inventar conclusiones.
- Comunicas una conclusion clara para un analista o un responsable tecnico.

## AppSec Junior

### Debes estudiar

- HTTP.
- APIs.
- OWASP Top 10.
- Autenticacion y autorizacion.
- SQL Injection.
- XSS.
- SSRF.
- DevSecOps.
- Threat modeling.

### Como se conecta

AppSec busca entender como fallan las aplicaciones y como reducir esos riesgos desde diseño, desarrollo y pruebas. No se trata solo de encontrar vulnerabilidades; tambien importa explicar causa raiz, impacto, controles y remediacion.

HTTP te da la base de cliente, servidor, metodos, headers, cookies y sesiones. APIs agregan contratos, tokens, permisos y abuso automatizado. OWASP ayuda a clasificar riesgos comunes. Threat modeling permite pensar antes de que la app este terminada. DevSecOps conecta esos controles con el ciclo real de desarrollo.

### Señales de comprension

- Puedes diferenciar autenticacion de autorizacion.
- Explicas Broken Access Control con ejemplos claros.
- Conectas causa, impacto y mitigacion.
- Entiendes por que validar solo en frontend no protege.
- Puedes revisar una API pensando en identidad, permisos, entrada, errores y logs.

### Puedes aplicar cuando

- Propones mitigaciones realistas, no solo recomendaciones genericas.
- Puedes explicar una vulnerabilidad sin glorificar explotacion.
- Entiendes como prevenir fallas desde diseño.
- Hablas de riesgo para usuarios, datos y negocio.

## Cloud Security Junior

### Debes estudiar

- Responsabilidad compartida.
- IAM.
- Storage.
- Logging.
- Networking cloud.
- Secret management.
- Contenedores basicos.
- Seguridad en CI/CD.

### Como se conecta

Cloud security combina identidad, configuracion, datos y visibilidad. Muchos incidentes cloud no empiezan con exploits complejos, sino con permisos excesivos, buckets publicos, llaves expuestas, logs desactivados o redes abiertas sin justificacion.

Responsabilidad compartida aclara que protege el proveedor y que debe proteger el cliente. IAM define quien puede hacer que. Storage concentra datos. Logging permite investigar. Networking cloud define exposicion. Secret management evita que credenciales vivan en codigo, imagenes o pipelines.

### Señales de comprension

- Puedes explicar minimo privilegio en IAM.
- Identificas riesgos de storage publico.
- Entiendes por que los logs deben estar activos antes del incidente.
- Sabes que una llave expuesta requiere rotacion, no solo borrado.
- Puedes priorizar hallazgos cloud por impacto y exposicion.

### Puedes aplicar cuando

- Explicas riesgos cloud sin depender de una marca especifica.
- Propones controles para identidad, datos, red y secretos.
- Sabes que preguntas hacer en una revision inicial.
- Entiendes que cloud no es seguro por defecto.

## Vulnerability Management Junior

### Debes estudiar

- Inventario.
- CVE.
- CVSS.
- Priorizacion.
- Remediacion.
- Verificacion.
- Comunicacion tecnica.

### Como se conecta

Vulnerability Management no es perseguir todos los CVEs en orden numerico. Es decidir que corregir primero con base en activo, exposicion, criticidad, explotabilidad, controles existentes y capacidad real del equipo.

El inventario es la base porque no puedes proteger lo que no sabes que existe. CVE identifica vulnerabilidades conocidas. CVSS ayuda, pero no reemplaza contexto. Remediacion necesita owner y verificacion. Comunicacion tecnica traduce hallazgos en decisiones accionables.

### Señales de comprension

- Puedes explicar por que el inventario es la base.
- Priorizas por riesgo, no solo por severidad.
- Distingues vulnerabilidad tecnica de impacto real.
- Propones remediacion verificable.
- Entiendes cuando un control compensatorio reduce urgencia.

### Puedes aplicar cuando

- Justificas por que un hallazgo va antes que otro.
- Explicas impacto de negocio.
- Comunicas una recomendacion concreta.
- Reconoces informacion faltante antes de decidir prioridad.

## GRC Junior

### Debes estudiar

- Riesgo.
- Controles.
- Pruebas de control.
- Politicas.
- Auditoria.
- Excepciones.
- Privacidad.

### Como se conecta

GRC conecta seguridad con gobierno, riesgo, cumplimiento y negocio. No siempre implementa controles tecnicos directamente, pero ayuda a definir que debe existir, como se valida y quien acepta el riesgo cuando algo no se corrige de inmediato.

Riesgo combina probabilidad e impacto. Los controles reducen riesgo. Las pruebas de control muestran si algo existe y funciona. Las politicas establecen expectativas. Auditoria revisa cumplimiento. Privacidad protege datos personales y reduce abuso de informacion.

### Señales de comprension

- Diferencias amenaza, vulnerabilidad, riesgo y control.
- Explicas controles preventivos, detectivos y correctivos.
- Entiendes riesgo inherente y residual.
- Puedes leer una politica sin tratarla como burocracia vacia.
- Sabes pedir pruebas de control adecuadas al contexto.

### Puedes aplicar cuando

- Explicas riesgo en lenguaje tecnico y de negocio.
- Conectas controles con impacto real.
- Entiendes excepciones y aceptacion de riesgo.
- Comunicas limites, responsables y decisiones pendientes.

## Ruta Recomendada Inicial

Si no sabes cual elegir, empieza por:

1. SOC Analyst Junior.
2. Vulnerability Management Junior.
3. Cloud Security Junior como ruta secundaria.

Esta combinacion da buena base laboral porque mezcla fundamentos defensivos, criterio de priorizacion y comprension de entornos modernos.
