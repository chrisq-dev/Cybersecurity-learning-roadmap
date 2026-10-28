---
title: "El Reporte: El Único Entregable Real"
level: "avanzado"
content_type: "guia"
updated: "2026-06-29"
---

# El Reporte: El Único Entregable Real

## Objetivo de esta Guía

Aceptar la verdad del trabajo ofensivo: a la empresa no le importa cuántas terminales abriste. Lo único que compran es un PDF de 40 páginas que explique que esta roto, donde, y como arreglarlo. Un hacker ético genial técnicamente pero que no escribe bien terminará desempleado.

Traducir el código a riesgo de negocio para la junta directiva es la habilidad más cotizada de la industria. Esta guía cubre como estructurar un reporte profesional, diferenciar entre audiencia ejecutiva y técnica, usar CVSS para priorizar, y evitar los errores que arruinan la credibilidad.

## El Entregable Único

Contratas un inspector de viviendas. Pasa 3 horas revisando la casa. Al final te dice: "Encontré vigas podridas. Aquí esta mi factura." Y se va. Que haces? Nada. No sabes donde están las vigas ni como arreglarlas.

Un pentest sin reporte útil es lo mismo. El cliente necesita: que esta roto, donde esta roto, que tan urgente es, y como arreglarlo.

### El Ciclo de Vida del Reporte

1. **Planificación:** Antes del pentest, defines la estructura basado en el alcance y objetivos del cliente.
2. **Recolección:** Durante el pentest, documentas cada hallazgo: capturas de pantalla, comandos, evidencias, pasos de reproducción.
3. **Análisis y priorización:** Después, clasificas hallazgos por severidad usando CVSS y riesgo de negocio.
4. **Redacción:** Escribes el reporte en dos partes: ejecutiva y técnica.
5. **Revisión:** Revisas errores, claridad, y que cada hallazgo tenga su remediación.
6. **Entrega:** Presentas al cliente, usualmente en reunión para explicar los hallazgos principales.
7. **Seguimiento:** Verificas que las remediaciones se implementaron (re-test).

## Los Dos Idiomas del Reporte

Un buen reporte se divide en dos partes porque lo leen dos audiencias que hablan idiomas diferentes.

### Resumen Ejecutivo (Para el CEO)

El CEO no sabe que es Nmap, puerto 22, o SQLi. El CEO habla dinero y riesgo reputacional.

El resumen ejecutivo es una página que responde:
1. Alguien puede entrar y robarnos? (Si/No + contexto).
2. Si nos roban, cuanto perdemos? (en dinero, demandas, reputación).
3. Podemos arreglarlo rápido? (tiempo y costo estimado).

**Mal ejemplo:** "Encontramos una vulnerabilidad de Cross-Site Scripting (XSS) en la cookie de sesión del parámetro id."

**Buen ejemplo:** "Descubrimos un fallo en el portal de clientes que permite a un atacante robar la sesión de cualquier usuario con un clic. Si se explota, el banco enfrenta demandas millonarias por fraude y pérdida total de confianza."

**Reglas del resumen ejecutivo:**
- Sin jerga técnica. No menciones herramientas (Burp Suite, Kali, Nmap).
- Enfocarse en impacto de negocio (pérdida financiera, daño reputacional, multas regulatorias).
- Ser honesto pero no catastrofista. Asustar lo suficiente para acción pero no generar pánico.
- Incluir logros positivos ("El firewall perimetral esta correctamente configurado") para ser objetivo.

### Reporte Técnico (Para Programadores y Blue Team)

Sección detallada para quienes implementaran las correcciones.

**Por cada hallazgo incluir:**

- **Título:** Claro y descriptivo. "Inyección SQL en parámetro id del módulo de búsqueda"
- **Severidad:** CVSS score y clasificación (Critical/High/Medium/Low).
- **Ubicación:** URL exacta, parámetro, IP, archivo, configuración.
- **Descripción:** Explicación de la vulnerabilidad y como funciona.
- **Evidencia:** Captura de pantalla, request/response HTTP, comando ejecutado, log.
- **Pasos de reproducción:** Instrucciones paso a paso para replicar.
- **Impacto:** Que puede lograr un atacante al explotarla.
- **Remediación:** Solución específica, con código si aplica.
- **Referencias:** Enlaces a documentación oficial, CVE, buenas prácticas.

**La regla de la remediación:**
Nunca señales un problema sin ofrecer solución. Si encuentras SQLi, incluyes el código corregido usando prepared statements. Si encuentras un servidor sin parche, indicas exactamente que parche instalar y donde descargarlo. Un reporte sin remediaciones esta incompleto.

## Midiendo el Miedo: CVSS

Cuando entregas 50 hallazgos, el equipo no puede arreglar todo en un día. Necesitan priorizar. Para evitar discusiones, la industria creo CVSS (Common Vulnerability Scoring System).

### Componentes de CVSS

**Métricas base (no cambian con el tiempo):**
- Vector de Ataque: Red (remoto) o Local (requiere acceso físico).
- Complejidad: Baja (fácil) o Alta (requiere condiciones especiales).
- Privilegios: Ninguno (anónimo) o Requerido (necesita autenticación).
- Interacción: Ninguna (automático) o Requerida (usuario hace clic).
- Confidencialidad: Alta/Media/Baja (datos expuestos).
- Integridad: Alta/Media/Baja (datos modificables).
- Disponibilidad: Alta/Media/Baja (servicio interrumpido).

### Interpretación de Scores

| Score | Severidad | Acción recomendada |
|-------|-----------|-------------------|
| 0.1 - 3.9 | Bajo | Arreglar cuando haya tiempo |
| 4.0 - 6.9 | Medio | Incluir en sprint actual |
| 7.0 - 8.9 | Alto | Arreglar hoy |
| 9.0 - 10.0 | Crítico | Despertar al equipo a las 3:00 AM |

### Limitaciones de CVSS

CVSS mide severidad técnica, no riesgo empresarial. Un CVSS 10 en un sistema aislado sin datos sensibles puede ser menos urgente que un CVSS 6 en el sistema de pagos.

Ejemplo: Una vulnerabilidad en el servidor de pruebas interno (CVSS 9.0) vs. una vulnerabilidad en el portal de clientes (CVSS 6.5). Cual arreglas primero? Depende del contexto. El reporte debe complementar CVSS con análisis de riesgo de negocio.

## Errores Comunes en Reportes

**Demasiado técnico para el CEO:** El resumen ejecutivo lleno de jerga que la junta no entiende. Solución: escribir para cada audiencia, dos documentos separados si es necesario.

**Sin evidencia:** "Encontré XSS." Sin captura, sin payload, sin request HTTP. El programador no puede reproducir ni confirmar.

**Sin priorización:** 50 hallazgos sin orden. El equipo no sabe por donde empezar. Siempre priorizar por severidad e impacto de negocio.

**Remediaciones genéricas:** "Actualizar software" o "Configurar firewall." Solución específica: "En el servidor 10.0.0.5, modificar /etc/nginx/nginx.conf agregando `add_header X-Frame-Options DENY;` en la línea 45."

**Solo negativo:** Un reporte que solo muestra fallos desmotiva. Incluir hallazgos positivos ("El servidor de BD esta correctamente aislado") demuestra objetividad.

**Demora en entrega:** Un reporte entregado 3 meses después puede ser irrelevante. La infraestructura pudo cambiar. Entregar dentro de las 2 semanas.

## Casos Reales

### El Reporte que No se Entregó (2018)

Un equipo completo un pentest para una empresa de salud. Encontraron vulnerabilidades críticas en el sistema de expedientes. El consultor se retraso en escribir el reporte. Cuando lo entregó, 4 meses después, la empresa ya había sufrido un ataque que exploto exactamente esas vulnerabilidades. Demanda millonaria contra el consultor.

### El Resumen Ejecutivo que Movió Montanas (2020)

Un pentest encontró vulnerabilidades en los sistemas de control de producción de una fábrica. El resumen ejecutivo dijo: "Un atacante podría detener la línea de producción principal durante 3 semanas, causando perdidas estimadas en 5 millones de dólares." Consiguió aprobación inmediata de $500,000 para correcciones.

### El Falso Positivo en el Reporte (2021)

Un consultor reporto una vulnerabilidad crítica que resulto ser falso positivo. El equipo de desarrollo del cliente paso 3 semanas investigando un problema inexistente. La relación se deterioro significativamente.

## La Perspectiva del Cliente

Para el cliente, el reporte es el único producto tangible del pentest. Sus expectativas:
- **Claridad:** Entender que se encontró, donde, y que tan urgente es.
- **Accionabilidad:** Poder tomar acciones concretas basadas en el reporte.
- **Honestidad:** Saber que los hallazgos son reales y verificados.
- **Respeto:** Que el reporte no menosprecie el trabajo del equipo interno.
- **Valor:** Que el costo del pentest se justifique con la utilidad del reporte.

Un cliente satisfecho contrata de nuevo. Uno insatisfecho no, sin importar la calidad técnica del pentest.

## Autoevaluación

1. Redactas el resumen ejecutivo para la junta directiva de un banco. Mencionar "Burp Suite" o "Kali Linux" es pésima idea. Por qué? Como describes los hallazgos?
2. Encuentras un error que expone nombres de empleados (bajo) y otro que permite borrar la base de datos sin autenticación (crítico). Que métrica usas para clasificar? Que limitaciones tiene?
3. Por qué un reporte solo con capturas de pantalla pero sin remediación es incompleto? Que responsabilidad tiene el tester?
4. "Hackear y escribir el reporte son habilidades idénticas." Por qué es falso? Que habilidades de comunicación son necesarias?
5. Encuentras 30 vulnerabilidades, 25 son "Altas" o "Críticas" según CVSS. El equipo no puede arreglar todo. Como priorizas? Que criterio adicional usas?
6. Un hallazgo crítico que reportaste resulta ser falso positivo. Como recuperas la confianza del cliente? Que cambios haces en tu proceso?
7. El equipo de desarrollo dice que tu reporte de 100 páginas es muy extenso. Como lo reestructuras? Que secciones son esenciales y cuáles van en apéndices?
8. Un cliente te pide omitir del reporte una vulnerabilidad crítica en un sistema legacy que descontinuaran pronto. Cual es tu respuesta ética?

## Técnicas Avanzadas de Reporte

### Personalización por Industria

Un reporte para una institución financiera debe enfatizar riesgos de fraude, cumplimiento regulatorio (PCI DSS, SOX), y protección de datos de clientes. Un reporte para una empresa de salud debe enfocarse en HIPAA, datos de pacientes, y disponibilidad de sistemas críticos. Un reporte para una empresa de tecnología debe priorizar protección de propiedad intelectual y continuidad del negocio.

La estructura básica es la misma, pero el lenguaje, los ejemplos, y las recomendaciones deben adaptarse a la industria del cliente.

### Re-Testing: Verificando la Remediación

Un pentest no termina con la entrega del reporte. Incluye una fase de re-test donde verificas que las vulnerabilidades fueron corregidas. El proceso:

1. Cliente implementa las remediaciones.
2. Cliente notifica que las correcciones están listas.
3. El tester re-ejecuta las pruebas específicas para cada hallazgo.
4. Si la vulnerabilidad persiste, se mantiene en el reporte como "abierta."
5. Si fue corregida, se marca como "cerrada."
6. Si la corrección es parcial o introdujo nuevos problemas, se documenta.

### Automatización de Reportes

Herramientas como Serpico, PwnDoc, o Ghostwriter ayudan a generar reportes semi-automáticamente. Ingresas los hallazgos una vez y la herramienta genera el documento en formato Word o PDF con la estructura adecuada.

Beneficios:
- Consistencia entre reportes.
- Ahorro de tiempo en formato y maquetación.
- Repositorio central de hallazgos para reutilización.
- Plantillas personalizables por cliente.

Riesgos:
- Los reportes pueden sonar "genéricos" si no se personalizan.
- Dependencia de la herramienta (si falla, no puedes generar reportes).

### El Lenguaje del Reporte

**Ser preciso, no ambiguo:**
- Mal: "La aplicación podría tener problemas de seguridad."
- Bien: "La aplicación es vulnerable a SQL Injection en el endpoint /api/users/search mediante el parámetro 'q'."

**Ser objetivo, no emotivo:**
- Mal: "El desarrollador fue negligente al no validar entradas."
- Bien: "La entrada del usuario no es validada antes de ser incluida en una consulta SQL."

**Ser útil, no crítico:**
- Mal: "Esta configuración es terrible."
- Bien: "Se recomienda modificar la configuración para seguir la política de seguridad establecida en el estándar X."

## Métricas de Calidad del Reporte

Como medir si tu reporte es bueno:

- **Tasa de remediación:** Que porcentaje de los hallazgos fueron corregidos en el re-test? Una alta tasa indica que el reporte fue accionable.
- **Tiempo de remediación:** Cuanto tardo el cliente en corregir los hallazgos? Reportes claros reducen este tiempo.
- **Satisfacción del cliente:** Encuestas post-entrega. El cliente entendió los hallazgos? Pudo actuar sobre ellos?
- **Re-engagement:** El cliente contrata de nuevo? Es la métrica más importante.

## Errores de Formato y Presentación

**Reportes sin numeración de páginas:** Difícil de referenciar en reuniones.
**Sin tabla de contenidos:** El lector no encuentra lo que busca.
**Fuente ilegible:** Tamaño muy pequeño o color de texto sobre fondo oscuro.
**Sin encabezados claros:** No se distingue entre secciones.
**Fechas incorrectas:** El reporte dice "enero" pero el pentest fue en marzo.
**Nombre del cliente incorrecto:** Error imperdonable.

## Aspectos Legales del Reporte

El reporte es un documento legal que puede ser usado en:
- Demandas contra la empresa por no proteger datos.
- Reclamos a seguros cibernéticos.
- Auditorías regulatorias.
- Litigios entre socios comerciales.

Por lo tanto:
- Cada hallazgo debe estar respaldado por evidencia.
- Las fechas y horas deben ser precisas.
- Las recomendaciones deben ser realistas y basadas en estándares.
- El reporte debe incluir una declaración de limitaciones (lo que NO se probo).

## Preguntas Adicionales de Autoevaluación

9. Un cliente te pide que "suavices" el lenguaje del reporte para que la junta directiva no se alarme. Cual es tu respuesta profesional?
10. Durante el re-test, descubres que el cliente "corrigió" una vulnerabilidad de una forma que introduce una vulnerabilidad peor. Como lo documentas?
11. Tu reporte tiene 80 páginas. El CISO del cliente te dice que solo leyó el resumen ejecutivo. Como aseguras que los hallazgos críticos sean visibles incluso para quien solo lee una página?
12. Un hallazgo que reportaste como "Alto" fue reclasificado por el cliente como "Bajo" porque "ese sistema no es crítico." Debes aceptar su reclasificación? Como manejas esta situación?
13. El equipo de desarrollo del cliente argumenta que una vulnerabilidad no es explotable "en la práctica." Como respondes sin entrar en una discusión técnica interminable?
14. Tu reporte incluye un hallazgo que requiere cambios arquitectónicos profundos. El cliente dice que es demasiado costoso. Ofreces una mitigación parcial o insistes en la solución completa?

## Estructura Detallada de un Reporte

### Resumen Ejecutivo

Sección más importante del reporte. La lee la alta dirección que toma decisiones de presupuesto y prioridades.

**Debe incluir:**
- Que se evaluó y por qué.
- Número total de hallazgos, categorizados por severidad.
- Riesgo general de la organización (bajo, medio, alto, crítico).
- Que es lo más crítico que debe remediarse primero.
- Recomendaciones de alto nivel con prioridad.

**Tono:** Profesional pero accesible. Sin jerga técnica excesiva.

**Ejemplo de fraseología:**
"Se identificaron 12 hallazgos de seguridad: 2 críticos, 4 altos, 3 medios, y 3 bajos. El hallazgo más crítico permite a un atacante obtener acceso administrativo al Active Directory sin autenticación. Se recomienda parchear los controladores de dominio de forma inmediata."

### Metodología y Alcance

Documenta como se realizo la prueba para que el reporte sea defendible y reproducible.

**Debe incluir:**
- Fechas de la prueba (inicio y fin).
- Tipo de prueba: Caja negra, caja blanca, caja gris.
- Herramientas utilizadas (con versiones).
- Alcance: IPs, dominios, aplicaciones, redes, usuarios incluidos y excluidos.
- Limitaciones: restricciones que afectaron la profundidad de la prueba.
- Metodología de referencia: OWASP, PTES, NIST, OSSTMM.

**Ejemplo:**
"La prueba se realizo del 01/01/2024 al 15/01/2024 en modalidad de caja gris, con credenciales de usuario estándar pero sin privilegios administrativos. Se utilizó Burp Suite Professional v2024.1, Nmap v7.94, y Metasploit v6.3. El alcance incluyo 10 aplicaciones web, 50 servidores, y 2 controladores de dominio. Quedaron excluidos los sistemas de producción crítica con aprobación del CISO."

### Hallazgos

Cada hallazgo debe ser autónomo (puede entenderse sin leer todo el reporte).

**Estructura de cada hallazgo:**
1. **Título:** Claro y descriptivo.
2. **Severidad:** Crítico, Alto, Medio, Bajo, Informativo.
3. **CWE/CVE:** Referencia estándar si aplica.
4. **Descripción:** Que es la vulnerabilidad en lenguaje no técnico.
5. **Impacto:** Que puede hacer un atacante si explota la vulnerabilidad.
6. **Pasos de reproducción:** Instrucciones detalladas para replicar el hallazgo.
7. **Evidencia:** Capturas de pantalla, logs, salida de comandos.
8. **Recomendación de remediación:** Pasos concretos para corregir la vulnerabilidad.
9. **Referencias:** Enlaces a documentación externa relevante.

**Ejemplo de hallazgo:**

**Título:** Inyección SQL en módulo de búsqueda de productos
**Severidad:** Crítico
**CWE:** CWE-89
**Descripción:** La aplicación web no sanitiza correctamente el parámetro "search" en /products/search. Un atacante puede inyectar comandos SQL y acceder a la base de datos subyacente.
**Impacto:** El atacante puede extraer, modificar, o eliminar toda la base de datos de productos y clientes (incluyendo datos personales, direcciones, e historial de compras). Potencial violación de GDPR.
**Pasos de reproducción:** [detalle técnico]
**Evidencia:** [captura de pantalla mostrando la inyección exitosa, comando SQL utilizado, datos extraídos]
**Recomendación:** Usar consultas parametrizadas (prepared statements) en vez de concatenación de strings para todas las consultas SQL. Validar y sanitizar todos los inputs de usuario.
**Referencias:** OWASP SQL Injection Prevention Cheat Sheet.

### Recomendaciones Estratégicas

Van más allá de parchar vulnerabilidades específicas. Guían la mejora a largo plazo.

**Ejemplos:**
- "Implementar un programa de bug bounty para recibir reportes de la comunidad de seguridad."
- "Establecer un proceso de revisión de seguridad en el SDLC."
- "Capacitar a los desarrolladores en prácticas de código seguro."
- "Implementar un WAF o NGFW para mitigar ataques web comunes mientras se corrigen las aplicaciones."

### Priorización de Remedacion

Método CVSS para cuantificar severidad:
- CVSS v4.0 Base Score: 0.0 - 10.0; incluye siempre el vector y la versión utilizados.
- Vector: AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H.

Factores además de CVSS:
- Exposición a internet: Un hallazgo en un sistema expuesto a internet tiene prioridad sobre uno interno.
- Criticidad del activo: Un hallazgo en un servidor de base de datos tiene prioridad sobre uno en un servidor de desarrollo.
- Explotabilidad: Existe exploit público? Existe PoC? Se esta explotando activamente? (CISA KEV).
- Riesgo de negocio: Impacto en la reputación, operaciones, cumplimiento normativo.

### Riesgos Legales del Reporte

El reporte de pentest puede ser usado en:
- Demandas por negligencia (si la empresa no remedia).
- Auditorías regulatorias (GDPR, PCI-DSS, HIPAA).
- Seguros cibernéticos (para demostrar due diligence).
- Procesos legales contra la empresa por fuga de datos.

Por eso es importante:
- No hacer afirmaciones sin evidencia.
- Documentar limitaciones y exclusiones del alcance.
- Incluir una clausula de confidencialidad.
- Entregar solo a personas autorizadas.

### Roles de Remedacion

- **Descubridor (Tester):** Reporta la vulnerabilidad, provee evidencia y recomendaciones.
- **Propietario del sistema:** Responsable de implementar la remediación.
- **Validador (Generalmente el tester):** Verifica que la remediación fue implementada correctamente.
- **Aprobador (CISO/Director):** Aprueba el plan de remediación y asigna recursos.

## Preguntas Adicionales

9. Descubres una vulnerabilidad crítica en un sistema que el cliente excluyo del alcance. Que haces? La incluyes en el reporte? La reportas informalmente?
10. El equipo de desarrollo del cliente argumenta que una vulnerabilidad de XSS es "bajo riesgo" porque "nadie haría clic en el enlace malicioso." Como respondes profesionalmente sin crear conflicto?
11. El cliente te pide modificar la severidad de un hallazgo de "Alto" a "Bajo" porque "el equipo de IT no tiene capacidad de remediarlo este trimestre." Cual es tu respuesta ética?
12. Un hallazgo del reporte anterior sigue sin remediarse 12 meses después. El cliente te dice "no ha pasado nada." Como abordas este escenario en el nuevo reporte?

## Revisión y Validación de Remedaciones

### Proceso de Remediación

1. **Entrega del reporte:** El equipo de pentest entrega el reporte final al cliente.
2. **Reunión de resultados:** Se presentan los hallazgos al equipo técnico y de gestión del cliente.
3. **Plan de remediación:** El cliente elabora un plan con fechas y responsables para cada hallazgo.
4. **Implementación:** El equipo técnico del cliente implementa las correcciones.
5. **Verificación:** El equipo de pentest (o un validador independiente) verifica que las correcciones funcionan.
6. **Cierre:** Se emite un certificado de verificación o un reporte de re-test.

### Tipos de Remedacion

**Correctiva:** Corrige la vulnerabilidad directamente. Ejemplo: Parchear el servidor, sanitizar el input, actualizar la configuración.

**Compensatoria:** Mitiga el riesgo sin corregir la vulnerabilidad de raíz. Ejemplo: Implementar un WAF para bloquear SQLi mientras se reescribe el código de la aplicación.

**Aceptación del Riesgo:** El cliente acepta el riesgo y no implementa ninguna corrección. Debe haber una justificación formal y aprobación de la alta dirección.

### Plazos de Remediación Sugeridos

- **Crítico:** 24-48 horas.
- **Alto:** 7-14 días.
- **Medio:** 30-60 días.
- **Bajo:** 90-120 días.
- **Informativo:** Próximo ciclo de mejora.

## Formatos de Reporte

### Reporte Técnico (Audiencia: Ingenieros, Administradores)
- Detalle técnico completo.
- Pasos de reproducción exactos.
- Comandos, herramientas, y configuraciones.
- Logs y capturas de pantalla.
- Recomendaciones de configuración específicas.

### Reporte Ejecutivo (Audiencia: Dirección, Junta Directiva)
- Resumen de una página.
- Gráficos de severidad y tendencias.
- Riesgo de negocio en términos financieros.
- Recomendaciones estratégicas.
- Comparativa con benchmarks del sector.

### Reporte de Cumplimiento (Audiencia: Auditores, Reguladores)
- Referencias a requisitos específicos (PCI-DSS 6.6, HIPAA 164.312, GDPR Art. 32).
- Mapeo de hallazgos a requisitos regulatorios.
- Evidencia de pruebas realizadas.
- Estado actual vs. requisito.

## Manejo de Hallazgos Falsos Positivos

Durante el pentest, pueden surgir hallazgos que el cliente cuestiona:

**Caso 1: El cliente dice que es falso positivo.**
Procedimiento: Pedir evidencia de que esta remediado. Verificar con una prueba adicional. Si el cliente tiene razón, retirar el hallazgo del reporte o moverlo a "Informativo."

**Caso 2: El cliente dice que el riesgo es menor.**
Procedimiento: Documentar el desacuerdo en el reporte. El cliente puede firmar una aceptación de riesgo. Mantener la severidad original según el criterio del tester.

**Caso 3: El cliente dice que "es así por diseño."**
Procedimiento: Evaluar si realmente es intencional o es una excusa. Si es intencional, documentar como "Riesgo Aceptado" con la justificación del cliente.

## Preguntas Adicionales

13. El cliente te pide modificar la severidad de un hallazgo de "Alto" a "Bajo" porque el equipo de IT no tiene capacidad de remediarlo este trimestre y quieren evitar que la alta dirección se entere. Cual es tu respuesta como profesional de seguridad?
14. Verificas una remediación 6 meses después del pentest original. La vulnerabilidad crítica sigue presente, pero el cliente dice que "implementaron controles compensatorios." Como evalúas si los controles compensatorios son adecuados?
15. Un hallazgo del reporte de hace 2 años sigue sin remediarse. El cliente lo sabe pero no ha priorizado la corrección. Que implicaciones tiene esto para el riesgo general de la organización? Como lo documentas en el nuevo reporte?
