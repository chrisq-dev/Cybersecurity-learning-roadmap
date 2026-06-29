---
title: "Threat Hunting: El Patrullaje Nocturno"
level: "intermedio"
content_type: "guia"
updated: "2026-06-29"
---

# Threat Hunting: El Patrullaje Nocturno

## Objetivo de esta Guía

Entender por qué esperar pasivamente a que suene la alarma es una garantía de que serás comprometido, y como los mejores equipos defensivos operan bajo la mentalidad de "el atacante ya esta adentro." El Threat Hunting (caza de amenazas) es el nivel más alto del Blue Team, donde la mentalidad ofensiva y defensiva se fusionan en una sola disciplina.

Un cazador no espera alertas. Busca activamente lo que las reglas automáticas no detectaron. Es la diferencia entre un guardia que mira una pantalla y un detective que sale a la calle a buscar pistas. Esta guía cubre las metodologías de caza, las hipótesis de búsqueda, como ejecutar una caza paso a paso, y como convertir los hallazgos en mejoras permanentes para la organización.

## El Concepto: Assumed Breach

Históricamente, la ciberseguridad trataba de construir muros altos (firewalls) y guardias en las puertas (antivirus). Si la alarma no sonaba, el equipo dormía tranquilo. Esta mentalidad falla porque:
- Los muros siempre tienen grietas (vulnerabilidades desconocidas, configuraciones erroneas).
- Los guardias se cansan y se distraen.
- Los atacantes encuentran formas de entrar sin hacer ruido.

La doctrina moderna cambio con el concepto de "assumed breach" (brecha asumida). El Threat Hunter llega cada mañana asumiendo que un atacante ya vulneró las defensas. Su trabajo es encontrarlo antes de que complete su misión, ya sea robar datos, desplegar ransomware, o establecer acceso persistente.

### Implicaciones de Assumed Breach

**Cambio de mentalidad:** En lugar de preguntarse "estamos seguros?", el cazador se pregunta "donde podría estar escondiendose un atacante?".

**Cambio de enfoque:** No esperar alertas, sino buscar activamente anomalías en los datos disponibles. El SIEM no es una pantalla de alertas, es una base de datos para explorar.

**Cambio de métrica:** El éxito no se mide por "cuántas alertas procesamos" sino por "cuántas hipótesis probamos y que aprendimos."

**Cambio cultural:** El equipo deja de pensar como bombero (apagar incendios) y empieza a pensar como detective (prevenir crímenes).

### Por qué el Hunting es Necesario

Las reglas automáticas de detección solo capturan lo que ya se conoce: firmas de malware existentes, patrones de ataque documentados, técnicas catalogadas en MITRE. Los atacantes innovan constantemente. Entre el momento en que aparece una nueva técnica y el momento en que se escribe una regla para detectarla, hay una ventana de vulnerabilidad.

El hunting cierra esa ventana. No espera a que exista una regla; busca el comportamiento directamente. Es la única forma de detectar ataques que usan técnicas que el equipo de seguridad aún no ha visto.

## Diferencias con Otras Disciplinas

**vs. Detection Engineering:**
- Engineering: Crea reglas para detectar ataques conocidos. Es reactivo a la inteligencia disponible.
- Hunting: Busca ataques desconocidos o que evadieron las reglas. Es proactivo.
- Relación: El hunting descubre patrones que luego se convierten en reglas. El engineering mantiene las reglas efectivas.

**vs. Respuesta a Incidentes:**
- IR: Responde a un incidente confirmado. Es reactivo a una alerta.
- Hunting: Busca incidentes que aún no han sido detectados. Es proactivo.
- Relación: Si el hunting encuentra un ataque activo, escala a IR para la respuesta.

**vs. Threat Intelligence:**
- Intel: Recolecta y analiza información sobre amenazas externas.
- Hunting: Aplica esa inteligencia para buscar en los datos internos.
- Relación: La inteligencia alimenta las hipótesis de caza.

## Metodologías de Caza

### Caza Basada en Hipótesis

El cazador fórmula una hipótesis basada en inteligencia de amenazas, reportes de la industria, o conocimiento interno de la red.

Proceso:
1. Leer un reporte: "El grupo APT29 esta usando una nueva técnica de persistencia via servicios de Windows."
2. Formular hipótesis: "Si APT29 esta en nuestra red, podría haber instalado servicios sospechosos en los últimos 30 días."
3. Diseñar búsqueda: Consultar el SIEM para listar todos los servicios instalados recientemente, filtrando por nombres que coincidan con patrones de APT29.
4. Analizar resultados: Revisar la lista manualmente, buscando servicios en sistemas donde no se esperan.
5. Investigar anomalías: Para cada servicio sospechoso, investigar el contexto (quien lo instalo, cuando, desde donde).
6. Concluir: Determinar si la hipótesis se confirma o se refuta.

Ejemplo de hipótesis concretas:
- "Si hay un atacante en la red, podría estar usando RDP para moverse lateralmente en horarios no laborales."
- "Si un empleado fue comprometido via phishing, su cuenta podría estar accediendo a sistemas que normalmente no usa."
- "Si hay malware en la red, podría estar generando consultas DNS a dominios generados algoritmicamente (DGA)."

### Caza Basada en Indicadores (IoCs)

El cazador recibe una lista de IPs, dominios, hashes, o patrones de ataque de fuentes de inteligencia y busca si aparecen en los logs historicos.

Ventaja: Rápida de ejecutar, útil para detección inmediata de amenazas conocidas.
Desventaja: Los atacantes cambian sus IoCs constantemente. Depender solo de IoCs es hunting débil.

Proceso:
1. Obtener lista de IoCs (de MISP, ThreatConnect, feeds comerciales).
2. Convertir IoCs al formato adecuado para búsqueda en el SIEM.
3. Buscar cada IoC en los logs (DNS, proxy, firewall, EDR, autenticación).
4. Para cada coincidencia, investigar el contexto completo.
5. Si se confirma un compromiso, escalar a IR.

### Caza Basada en Comportamiento (Análisis de Línea Base)

El cazador establece una línea base de comportamiento normal y busca desviaciones. Esta es la metodología más poderosa porque puede detectar ataques sin firmas conocidas.

Proceso:
1. Establecer línea base: Durante 30-90 días, recolectar datos de comportamiento normal de usuarios, sistemas, y redes.
2. Definir métricas: Horarios de trabajo tipicos, volumen de datos transferido, destinos de conexión frecuentes, aplicaciones usadas.
3. Buscar desviaciones: Identificar comportamientos que se salen de la línea base establecida.
4. Investigar: Para cada desviacion, determinar si tiene una explicación legítima o si es sospechosa.

Ejemplos de desviaciones:
- Un usuario que nunca trabaja de madrugada inicia sesión a las 3:00 AM.
- Un servidor que siempre transfiere 100 MB/día de repente transfiere 2 GB.
- Una cuenta de servicio que solo se conecta a 3 servidores intenta conectarse a 20.

### Caza Basada en Datos (Data-Driven)

El cazador explora los datos sin una hipótesis preconcebida, buscando anomalías estadisticas. Es la metodología más exploratoria.

Ejemplo: El cazador ejecuta una consulta que lista todos los procesos ejecutados en la última semana, ordenados por frecuencia. Los procesos que aparecen solo una vez son candidatos a investigación porque son poco comunes y potencialmente sospechosos.

## Ejecución de una Caza: Caso Práctico

Sigue el proceso completo de una sesión de hunting real:

**Paso 1: Inteligencia recibida**
Un reporte de inteligencia indica que un grupo de ransomware esta usando conexiones RDP desde IPs internas para moverse lateralmente entre servidores antes de desplegar el rescate.

**Paso 2: Hipótesis**
"Si un atacante esta en nuestra red usando RDP para moverse lateralmente, debería haber sesiones RDP exitosas (Logon Type 10 en Windows) desde cuentas de usuarios que normalmente no usan RDP, en horarios no laborales."

**Paso 3: Diseño de la búsqueda**
```
index=windows EventCode=4624 LogonType=10
| where date_wday in ("Saturday", "Sunday") OR (date_hour >= 19 OR date_hour <= 6)
| where NOT User in ("admin1", "admin2", "sysadmin")
| stats count by User, ComputerName, SourceIP, LogonTime
| sort - count
```

**Paso 4: Ejecución**
La búsqueda devuelve 50 registros. El cazador los revisa línea por línea.

**Paso 5: Hallazgo**
La cuenta "pedro.garcia" del departamento de contabilidad inicio sesión RDP en el servidor de base de datos "DB-PROD-01" a las 2:35 AM del sábado. Pedro nunca trabaja los fines de semana y no tiene responsabilidades sobre bases de datos.

**Paso 6: Investigación profunda**
- Revisar el historial de inicios de sesión de Pedro en las últimas semanas.
- Verificar desde que IP se conecto (10.0.5.150 - una IP de un segmento de red diferente al de contabilidad).
- Revisar que procesos ejecutó en el servidor de base de datos.
- Verificar si la cuenta de Pedro fue usada desde otras ubicaciones.

**Paso 7: Conclusión**
La cuenta de Pedro fue comprometida. El atacante la uso para acceder a la base de datos de producción.

**Paso 8: Escalacion**
El cazador escala el hallazgo al equipo de respuesta a incidentes.

**Paso 9: Retroalimentacion**
El cazador documenta el hallazgo y recomienda una nueva regla de detección: "Alertar cuando una cuenta del departamento de contabilidad inicie sesión RDP en un servidor de base de datos en horario no laboral."

## Casos Reales de Threat Hunting

### La Tubería de DNS (2020)

Un equipo de hunting revisaba logs de DNS buscando dominios generados algoritmicamente (DGA). Encontraron que un servidor interno hacia consultas a un dominio con un patrón de caracteres aleatorios. El dominio no estaba en ninguna lista negra. Investigaron y descubrieron un malware que había evadido el EDR durante 6 meses. El malware estaba diseñado para robar credenciales cloud.

### El Certificado Robado (2021)

Un cazador noto que un certificado emitido para un servidor interno estaba siendo utilizado desde una IP externa. El certificado era válido, la autenticación era exitosa, pero el origen era incorrecto. Sin hunting, este ataque nunca se habría detectado porque desde la perspectiva técnica todo era correcto.

### La Línea Base que Revelo Shadow IT (2022)

Un equipo establecio una línea base de tráfico de red y descubrió que un servidor se comunicaba con una IP en un país sin operaciones de la empresa. Era un servicio cloud no autorizado que un empleado había configurado sin permiso (Shadow IT).

## Modos de Falla

### Hunting Sin Hipótesis

Buscar "cosas extranas" sin marco de referencia produce ruido. El cazador necesita hipótesis para enfocar la búsqueda.

### Dependencia Exclusiva de IoCs

Buscar solo IPs y hashes conocidos es hunting débil. Los atacantes cambian estos indicadores constantemente. El hunting efectivo busca comportamientos.

### No Documentar los Hallazgos

Un hallazgo que no se documenta se pierde. La documentación permite crear nuevas reglas, compartir inteligencia, y medir efectividad.

### Sin Retroalimentacion al Engineering

Si el hunting descubre patrones pero no se convierten en reglas automáticas, el equipo seguirá descubriendo lo mismo una y otra vez.

### Línea Base Desactualizada

La línea base de comportamiento cambia: nuevos empleados, herramientas, arquitecturas. Una línea base desactualizada genera falsos positivos o falsos negativos.

### Falta de Tiempo Dedicado

Si el cazador también responde alertas del SOC, nunca tendrá tiempo para cazar. Las organizaciones maduras dedican personal exclusivo al hunting.

## La Perspectiva del Atacante

Un atacante que enfrenta un equipo de hunting sabe que:
- No puede confiar en que su malware no será detectado por firmas. Debe comportarse como un usuario legítimo.
- Cualquier desviacion de la norma (horarios, volumenes, destinos) puede ser detectada.
- Cuanto más tiempo permanezca, más probable es que lo descubran.
- Debe conocer la línea base de la red tanto como el defensor.

El atacante avanzado estudia los patrones de la red, limita sus actividades a ventanas de tiempo seguras, usa credenciales robadas de usuarios reales, y aborta si sospecha que fue detectado.

## Autoevaluación

1. Por qué assumed breach es superior a "nuestro antivirus nos protege"? Que implicaciones prácticas tiene?
2. Un cazador busca procesos que se comuniquen con 169.254.169.254. Que técnica de ataque busca? (Pista: relacionada con nube AWS/Azure/GCP)
3. Por qué el éxito del hunting depende de tener un Detection Engineer en el equipo?
4. "Para ser buen Threat Hunter necesitas pensar como atacante." Es cierta o falsa? Por qué?
5. Encuentras un servidor Linux ejecutando cURL hacia IP externa cada noche a las 2:00 AM. No hay cron jobs conocidos. Cuáles son tus siguientes pasos?
6. El equipo de hunting dedica 2 horas semanales y el resto responde alertas. Que problema organizativo tiene esto?
7. Después de 3 meses de hunting sin encontrar ataques, los directivos cuestionan el programa. Que métricas usarías para demostrar su valor?
8. Un empleado de ventas accede a la base de datos los fines de semana desde casa. Tiene permiso de acceso. Es ataque o trabajo extra? Que datos necesitas para decidir?

## Metodologías de Hunting

### Modelo Pyramid of Pain (David Bianco)

Mide el impacto que causa al atacante cuando se detectan/niegan diferentes artefactos:

**Base de la pirámide (dolor bajo para el atacante):**
- Hashes (SHA-1, MD5): Fácil de cambiar. El atacante recompila y sigue.

**Nivel medio (dolor medio):**
- IP Addresses: Fácil de cambiar (proxies, VPN, TOR).
- Domain Names: Algo más difícil (cambia de dominio, pero es barato).
- Network Artifacts: Más doloroso (cambiar User-Agent, patrones de protocolo, TLS fingerprints).

**Nivel alto (dolor alto):**
- Tools: El atacante debe encontrar nuevas herramientas (cambiar de C2, de framework).
- TTPs: El nivel más alto. Detectar las técnicas y procedimientos, no los indicadores.

Aplicación: Un cazador efectivo busca patrones de comportamiento (TTPs) no IoCs. Los IoCs caducan rápido, las TTPs cambian lentamente.

### Modelo de Madurez de Hunting (SQH)

**Nivel 0 - Reactivo:** Solo se busca cuando hay un incidente. Sin hunting proactivo.
**Nivel 1 - Básico:** El hunting se realiza de forma ad-hoc sin procesos definidos. Depende de cazadores individuales.
**Nivel 2 - Estandarizado:** Procesos de hunting documentados y repetibles. Se usan plantillas de búsqueda. Se documentan los resultados.
**Nivel 3 - Avanzado:** El hunting se integra con Detection Engineering. Los resultados mejoran las reglas automáticas. Se miden métricas de efectividad.
**Nivel 4 - Optimizado:** Hunting automatizado donde es posible, pero con supervisión humana. El programa de hunting es parte integral de la postura de seguridad.

### Ciclo del Hunting (DJ Malone - Lockheed Martin)

1. **Hipótesis:** Basada en inteligencia de amenazas, análisis de riesgo, o incidentes previos.
2. **Recolección de datos:** Identificar que fuentes de datos se necesitan (logs, endpoints, red).
3. **Búsqueda:** Ejecutar la búsqueda usando herramientas analíticas (SIEM, EDR, notebooks).
4. **Análisis:** Evaluar los resultados. Es un ataque? Un falso positivo? Un comportamiento inusual?
5. **Documentación:** Documentar los resultados, incluyendo IoCs, TTPs, y recomendaciones.
6. **Mejora continua:** Si se encontró un ataque, crear regla de detección automática. Refinar la hipótesis para futuras búsquedas.

## Ejemplos Prácticos de Hunting

### Búsqueda: Lateral Movement via RDP

**Hipótesis:** Un atacante que compromete una estación de trabajo usará RDP para moverse lateralmente.

**Fuentes:** Logs de Event ID 4624 (Logon Type 10 = RemoteInteractive), logs de firewall (puerto 3389).

**Búsqueda:**
1. Identificar todas las conexiones RDP exitosas en los últimos 30 días.
2. Agrupar por usuario origen, sistema origen, sistema destino.
3. Identificar anomalías: usuarios que nunca usaron RDP y de repente lo hacen (posible cuenta comprometida), conexiones desde sistemas que no son estaciones de administración, conexiones en horarios no laborales.
4. Verificar si el usuario tenía justificacion para la conexión (mantenimiento, soporte). Si no hay justificacion, escalar a investigación.

### Búsqueda: Unusual Process Creation

**Hipótesis:** Los atacantes ejecutan procesos desde ubicaciones no estándar o con nombres sospechosos.

**Fuentes:** Event ID 4688 (Process Creation), Sysmon Event ID 1, logs de EDR.

**Búsqueda:**
1. Identificar procesos creados desde directorios de usuario (AppData, Temp, Downloads).
2. Identificar procesos renombrados (winn.exe en lugar de win.exe, svch0st.exe en lugar de svchost.exe).
3. Identificar procesos hijos de aplicaciones de oficina (winword.exe ejecutando cmd.exe o powershell.exe).
4. Si encuentras word.exe -> cmd.exe -> powershell.exe descargando algo: 90% de probabilidad de compromiso.

### Búsqueda: DNS Beaconing

**Hipótesis:** Los C2 de malware se comunican con dominios de comando y control usando intervalos regulares.

**Fuentes:** Logs de DNS corporativo.

**Búsqueda:**
1. Calcular el tiempo entre consultas DNS para cada dominio.
2. Identificar dominios que muestran un intervalo constante (ej: exactamente cada 60 segundos).
3. Filtrar dominios conocidos (Microsoft, Google, Adobe, etc).
4. Verificar dominios sospechosos en bases de reputación (VirusTotal, AlienVault OTX).
5. Los beaconing a menudo usan dominios que no tienen registros MX (no reciben correo) y tienen registros A que apuntan a IPs en países sin presencia comercial.

## Preguntas Adicionales

9. Tu hipótesis de hunting es: "Los atacantes usan PowerShell ofuscado." Buscas y encuentras 5 estaciones de trabajo con ejecución de PowerShell ofuscado. Todas son del equipo de IT que automatizan tareas. Que haces con esta información y como refinas la búsqueda?
10. Un cazador junior encuentra un patrón sospechoso en los logs de DNS que parece un beacon. Después de 3 horas de investigación, descubre que es una actualización de software legítima. Como evitas que este tipo de falsos positivos desanimen al equipo?
11. Durante el hunting, encuentras evidencia de que un atacante tuvo acceso a tu red durante 3 meses sin ser detectado. El hunting revelo el acceso pero los sistemas de detección automática no. Que implicaciones tiene esto para tu programa de seguridad?

## Herramientas para Threat Hunting

### SIEM como Herramienta Principal
El SIEM es la herramienta más utilizada para hunting. Permite buscar en grandes volumenes de datos historicos.
- Splunk: SPL (Search Processing Language) para búsquedas complejas.
- Elastic/Kibana: Query DSL y Kibana Lens para visualizaciones.

### EDR para Hunting en Endpoints
Los EDRs modernos permiten búsquedas en endpoints a gran escala.
- CrowdStrike Falcon: Raptor search para búsquedas en todos los endpoints.
- Microsoft Defender for Endpoint: Kusto Query Language (KQL) para hunting avanzado.
- SentinelOne: Purple Cloud para búsquedas personalizadas.

### Jupyter Notebooks para Hunting
Los notebooks permiten documentar y compartir el proceso de hunting.
- Análisis programatico de datos con Python/R.
- Visualizaciones personalizadas.
- Reproducibilidad del proceso.
- Integración con APIs de SIEM y EDR.

### Bases de Conocimiento
- MITRE ATT&CK: Para identificar que técnicas buscar.
- Threat Reports: Para entender como operan grupos APT específicos.
- Threat Intel Feeds: Para correlacionar IoCs con datos internos.
- Comunidad: DFIR Report, Red Canary, The DFIR Report.

## Medidas de Éxito en Hunting

Como saber si el programa de hunting es efectivo:

**Métricas Cuantitativas:**
- Número de hipótesis probadas por mes.
- Número de ataques confirmados encontrados via hunting (no via alertas automáticas).
- Tiempo desde la publicación de una nueva amenaza hasta su detección via hunting.
- Tasa de conversión de hipótesis a reglas de detección automáticas.
- Porcentaje de tiempo del equipo dedicado a hunting (vs. otras actividades).

**Métricas Cualitativas:**
- Calidad de las hipótesis (son relevantes? se basan en inteligencia actual?).
- Impacto de los hallazgos (se previno un incidente?).
- Satisfaccion del equipo (el hunting es interesante o es una tarea más?).
- Integración con otros equipos (Detection Engineering, IR, Threat Intel).

## Preguntas Adicionales

12. Tu hipótesis de hunting es que "los atacantes usan RDP para moverse lateralmente." Encuentras 50 conexiones RDP sospechosas en la última semana. Al investigar, todas son del equipo de IT haciendo mantenimiento remoto. Como refinas tu hipótesis?
13. Implementas un programa de hunting y el equipo dedica 4 horas por semana a esta tarea. Después de 3 meses, no han encontrado ningún ataque real. Tu jefe te pregunta si vale la pena seguir invirtiendo tiempo en hunting. Que le dices?
14. Durante una búsqueda de DNS beaconing, encuentras un dominio que hace consultas exactamente cada 60 segundos. El dominio esta registrado en Panama y la IP destino esta en Rusia. Tu primer instinto es que es un C2. Que verificaciones haces antes de concluir?
