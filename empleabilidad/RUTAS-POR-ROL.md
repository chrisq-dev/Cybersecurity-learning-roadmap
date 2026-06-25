# Rutas por Rol

Elige una ruta principal y una secundaria. No intentes dominar todas al mismo tiempo. En ciberseguridad hay demasiadas áreas; avanzar mejor significa construir una base común y después profundizar en el tipo de problemas que quieres resolver.

Una ruta no es una lista de archivos ni una colección de entregas. Es una forma de ordenar el estudio: qué conceptos debes entender, cómo se conectan entre sí y qué señales muestran que ya puedes hablar del tema con criterio.

## SOC Analyst Junior

### Debes estudiar

- Redes básicas.
- Linux y Windows.
- Logs.
- SIEM.
- MITRE ATT&CK.
- Respuesta a incidentes.
- Sigma básico.
- Python para leer y resumir datos simples.

### Cómo se conecta

SOC se trata de convertir señales incompletas en decisiones razonables. Una alerta aislada rara vez cuenta toda la historia. Necesitas entender de dónde viene el evento, qué activo está involucrado, qué usuario aparece, qué comportamiento es normal y qué información falta.

Redes te ayuda a interpretar origen, destino, puertos y protocolos. Linux y Windows te ayudan a entender endpoints y servidores. SIEM centraliza eventos. MITRE ATT&CK te da lenguaje común para describir comportamiento. Respuesta a incidentes te ayuda a decidir contención, escalamiento y comunicación.

### Señales de comprensión

- Puedes explicar una alerta sin asumir que todo es incidente.
- Separas datos observados, hipótesis, falsos positivos e impacto.
- Entiendes que logs faltan antes de afirmar una conclusión.
- Puedes describir una detección conceptual y sus límites.
- Puedes comunicar severidad, impacto y siguientes pasos.

### Puedes aplicar cuando

- Explicas qué pasó, dónde pasó y por qué importa.
- Propones contención proporcional al riesgo.
- Reconoces incertidumbre sin inventar conclusiones.
- Comunicas una conclusión clara para un analista o un responsable técnico.

## AppSec Junior

### Debes estudiar

- HTTP.
- APIs.
- OWASP Top 10.
- Autenticación y autorización.
- SQL Injection.
- XSS.
- SSRF.
- DevSecOps.
- Threat modeling.

### Cómo se conecta

AppSec busca entender como fallan las aplicaciones y como reducir esos riesgos desde diseño, desarrollo y pruebas. No se trata solo de encontrar vulnerabilidades; también importa explicar causa raíz, impacto, controles y remediación.

HTTP te da la base de cliente, servidor, métodos, headers, cookies y sesiones. APIs agregan contratos, tokens, permisos y abuso automatizado. OWASP ayuda a clasificar riesgos comunes. Threat modeling permite pensar antes de que la app esté terminada. DevSecOps conecta esos controles con el ciclo real de desarrollo.

### Señales de comprensión

- Puedes diferenciar autenticación de autorización.
- Explicas Broken Access Control con ejemplos claros.
- Conectas causa, impacto y mitigacion.
- Entiendes por qué validar solo en frontend no protege.
- Puedes revisar una API pensando en identidad, permisos, entrada, errores y logs.

### Puedes aplicar cuando

- Propones mitigaciones realistas, no solo recomendaciones genericas.
- Puedes explicar una vulnerabilidad sin glorificar explotación.
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
- Contenedores básicos.
- Seguridad en CI/CD.

### Cómo se conecta

Cloud security combina identidad, configuración, datos y visibilidad. Muchos incidentes cloud no empiezan con exploits complejos, sino con permisos excesivos, buckets públicos, llaves expuestas, logs desactivados o redes abiertas sin justificacion.

Responsabilidad compartida aclara qué protege el proveedor y qué debe proteger el cliente. IAM define quién puede hacer qué. Storage concentra datos. Logging permite investigar. Networking cloud define exposición. Secret management evita que credenciales vivan en código, imágenes o pipelines.

### Señales de comprensión

- Puedes explicar mínimo privilegio en IAM.
- Identificas riesgos de storage público.
- Entiendes por que los logs deben estar activos antes del incidente.
- Sabes que una llave expuesta requiere rotación, no solo borrado.
- Puedes priorizar hallazgos cloud por impacto y exposición.

### Puedes aplicar cuando

- Explicas riesgos cloud sin depender de una marca especifica.
- Propones controles para identidad, datos, red y secretos.
- Sabes qué preguntas hacer en una revisión inicial.
- Entiendes que cloud no es seguro por defecto.

## Vulnerability Management Junior

### Debes estudiar

- Inventario.
- CVE.
- CVSS.
- Priorización.
- Remediación.
- Verificación.
- Comunicación técnica.

### Cómo se conecta

Vulnerability Management no es perseguir todos los CVEs en orden numérico. Es decidir qué corregir primero con base en activo, exposición, criticidad, explotabilidad, controles existentes y capacidad real del equipo.

El inventario es la base porque no puedes proteger lo que no sabes que existe. CVE identifica vulnerabilidades conocidas. CVSS ayuda, pero no reemplaza contexto. Remediación necesita owner y verificación. Comunicación técnica traduce hallazgos en decisiones accionables.

### Señales de comprensión

- Puedes explicar por qué el inventario es la base.
- Priorizas por riesgo, no solo por severidad.
- Distingues vulnerabilidad técnica de impacto real.
- Propones remediación verificable.
- Entiendes cuando un control compensatorio reduce urgencia.

### Puedes aplicar cuando

- Justificas por qué un hallazgo va antes que otro.
- Explicas impacto de negocio.
- Comunicas una recomendación concreta.
- Reconoces información faltante antes de decidir prioridad.

## GRC Junior

### Debes estudiar

- Riesgo.
- Controles.
- Pruebas de control.
- Políticas.
- Auditoria.
- Excepciones.
- Privacidad.

### Cómo se conecta

GRC conecta seguridad con gobierno, riesgo, cumplimiento y negocio. No siempre implementa controles técnicos directamente, pero ayuda a definir qué debe existir, cómo se valida y quién acepta el riesgo cuando algo no se corrige de inmediato.

Riesgo combina probabilidad e impacto. Los controles reducen riesgo. Las pruebas de control muestran si algo existe y funciona. Las políticas establecen expectativas. Auditoria revisa cumplimiento. Privacidad protege datos personales y reduce abuso de información.

### Señales de comprensión

- Diferencias amenaza, vulnerabilidad, riesgo y control.
- Explicas controles preventivos, detectivos y correctivos.
- Entiendes riesgo inherente y residual.
- Puedes leer una política sin tratarla como burocracia vacia.
- Sabes pedir pruebas de control adecuadas al contexto.

### Puedes aplicar cuando

- Explicas riesgo en lenguaje técnico y de negocio.
- Conectas controles con impacto real.
- Entiendes excepciones y aceptacion de riesgo.
- Comunicas límites, responsables y decisiones pendientes.

## Ruta Recomendada Inicial

Si no sabes cual elegir, empieza por:

1. SOC Analyst Junior.
2. Vulnerability Management Junior.
3. Cloud Security Junior como ruta secundaria.

Esta combinación da buena base laboral porque mezcla fundamentos defensivos, criterio de priorización y comprensión de entornos modernos.
