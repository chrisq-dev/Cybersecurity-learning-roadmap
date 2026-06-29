---
title: "Detection Engineering: El Ingeniero de Trampas"
level: "intermedio"
content_type: "guia"
updated: "2026-06-29"
---

# Detection Engineering: El Ingeniero de Trampas

## Objetivo de esta Guía

Entender por qué el SOC moderno no depende de guardias despiertos, sino de trampas bien diseñadas. El Detection Engineering es una de las carreras mejor pagadas del Blue Team. No son los que miran pantallas. Son los programadores que escriben las reglas para que el SIEM encienda la alarma automáticamente.

Esta guía cubre el ciclo de vida completo de una detección: investigación de amenazas, escritura de reglas, pruebas, ajuste fino, despliegue, y mantenimiento. También explora el dilema fundamental: el balance entre capturar atacantes y no ahogar al SOC en falsos positivos.

## El Problema: Comprar una Caja Mágica

Hace una década, los bancos compraban un SIEM costoso y decían: "Listo, estamos seguros." La realidad es que un SIEM vacio es solo un disco duro caro. No atrapa a nadie si nadie le enseña que buscar.

Los fabricantes incluyen reglas por defecto. Son genéricas y horribles para entornos específicos. Una regla tipica: "Alertar si un usuario inicia sesión desde un país distinto al habitual." Si tu empresa es una aerolínea internacional, esta regla genera 20,000 falsos positivos diarios.

La industria aprendió esta lección por las malas. Hoy, el Detection Engineering es una disciplina reconocida con profesionales escasos y bien remunerados. No basta con instalar seguridad; hay que programar la inteligencia que la hace funcionar.

## El Trabajo del Ingeniero: Escribir la Trampa

El Detection Engineer es el trampero del bosque. Estudia la geografía de su bosque (la empresa) y pone trampas que atrapen osos (atacantes) sin lastimar conejos (empleados).

### El Ciclo de Vida de una Detección

**Fase 1: Investigación (Threat Intelligence)**

El ingeniero lee fuentes de inteligencia: reportes de grupos de amenazas, blogs de seguridad, feeds de IoCs, avisos de CVEs, y análisis de malware. Identifica una técnica de ataque relevante para su organización.

Ejemplo: Lee que el grupo de ransomware LockBit esta usando una nueva técnica para deshabilitar respaldos: ejecuta `vssadmin.exe delete shadows /all /quiet` para borrar las copias de sombra de Windows.

**Fase 2: Diseño de la Regla**

El ingeniero diseña la lógica de detección. Decide que eventos monitorear, que combinación de condiciones usar, y que umbrales aplicar.

La regla conceptual: "Detectar cuando un proceso llamado vssadmin.exe ejecute los argumentos 'delete shadows' en cualquier computadora de la empresa."

**Fase 3: Implementación**

Escribe la regla en el lenguaje de consulta del SIEM. Ejemplo en SPL (Splunk):

```
index=windows EventCode=4688 Process_Name=*vssadmin.exe CommandLine=*delete*shadows*
| stats count by ComputerName, User, CommandLine
| where count > 1
```

**Fase 4: Prueba Inicial (Baseline)**

Ejecuta la regla contra datos historicos (semanas o meses de logs). Esto revela:
- Cuántas alertas generaría la regla si estuviera activa.
- Si hay falsos positivos obvios.
- Si la regla tiene errores de sintaxis o lógica.

**Fase 5: Tuning (Afinación)**

Activa la regla en modo "monitoreo" (genera alertas pero no notifica al SOC) por una o dos semanas. Durante este periodo:
- Revisa todas las alertas generadas.
- Identifica falsos positivos y sus causas raíz.
- Agrega excepciones específicas cuando sea necesario.

Ejemplo: Descubre que el software de backup oficial de la empresa ejecuta `vssadmin delete shadows` todos los domingos a las 2:00 AM como parte de su mantenimiento. Modifica la regla:

```
index=windows EventCode=4688 Process_Name=*vssadmin.exe CommandLine=*delete*shadows*
NOT (date_wday=Sunday AND hour=2 AND User=NT_AUTHORITY\SYSTEM)
```

**Fase 6: Despliegue**

Activa la regla en modo producción. Las alertas comienzan a llegar al SOC. El ingeniero monitorea las primeras 48 horas para detectar problemas no anticipados.

**Fase 7: Monitoreo Continuo y Ajuste**

La regla se revisa periodicamente:
- Nuevas variantes de la técnica de ataque requieren actualizar la regla.
- Cambios en la infraestructura de la empresa (nuevo software, nuevas configuraciones) pueden introducir falsos positivos.
- La regla puede volverse obsoleta si la técnica de ataque ya no se usa.

**Fase 8: Retiro**

Cuando una regla ya no es útil (porque la técnica desaparecio, porque fue reemplazada por una regla mejor, o porque genera más ruido que valor), se desactiva. Mantener reglas obsoletas solo genera ruido en el SOC.

### Lenguajes de Detección

Cada SIEM tiene su propio lenguaje. Aprender uno facilita aprender otros:

**SPL (Search Processing Language)** - Splunk:
```
index=windows source="WinEventLog:Security" EventCode=4688
| search CommandLine=*powershell* -EncodedCommand*
| stats count by User, ComputerName
```
Sintaxis tipo pipeline: datos pasan por una serie de comandos separados por tuberías.

**KQL (Kusto Query Language)** - Microsoft Sentinel:
```
SecurityEvent
| where EventID == 4688
| where CommandLine contains "powershell" and CommandLine contains "-EncodedCommand"
| summarize count() by Account, Computer
```
Similar a SQL pero optimizado para datos temporales. Usado también en Azure Data Explorer.

**EQL (Event Query Language)** - Elastic Security:
```
sequence by host.name, user.name
  [process where process.name == "powershell.exe" and process.command_line == "*EncodedCommand*"]
  [network where process.name == "powershell.exe" and destination.port == 443]
```
Enfocado en secuencias de eventos, ideal para detectar patrones de ataque que involucran múltiples pasos.

**Sigma:**
No es un lenguaje de SIEM, sino un formato estándar. Escribes la regla en YAML y una herramienta la traduce automáticamente a SPL, KQL, EQL, etc.

## El Dilema Fundamental: Recall vs. Precisión

El ingeniero vive en un estrés constante balanceando dos métricas opuestas:

**Recall (Sensibilidad):** Capacidad de no perderse a ningún atacante.
- Una regla con alto recall detecta casi todos los ataques.
- Pero también genera muchos falsos positivos.
- Ejemplo: "Alertar si alguien ejecuta PowerShell" detecta atacantes Y administradores legítimos.

**Precisión (Especificidad):** Capacidad de no molestar al SOC con falsas alarmas.
- Una regla con alta precisión genera pocos falsos positivos.
- Pero puede perder ataques reales.
- Ejemplo: "Alertar si el archivo se llama exactamente 'malware.exe'" tiene precisión perfecta, pero el atacante renombra el archivo y la regla falla.

El punto optimo depende del contexto:
- Un banco con 50 analistas tolera más falsos positivos que una startup con 1 analista.
- Un sistema crítico (base de datos de clientes) merece reglas más sensibles.
- Un sistema interno de pruebas puede tener reglas más específicas.

### Estrategias para Mejorar Precisión sin Perder Recall

**Contextualizar:** Combina condiciones. "PowerShell solo" es ruidoso. "PowerShell + descarga de internet + en horario no laboral" es preciso.

**Usar secuencias:** El orden de los eventos importa. "Word ejecuta PowerShell" es más sospechoso que "Word se abre" o "PowerShell se ejecuta" por separado.

**Baseline por entidad:** Lo que es normal para un administrador puede ser anómalo para un recepcionista. "Admin ejecuta whoami" es normal. "Recepcionista ejecuta whoami" no.

**Frecuencia:** Un evento raro es más sospechoso. "Inicio de sesión desde IP extranjera" para un usuario que nunca viaja es más relevante que para un consultor internacional.

## Casos Reales

### La Regla Demasiado Genérica (2020)

Una empresa escribió: "Alertar si se ejecuta cmd.exe o powershell.exe." Miles de alertas diarias de desarrolladores y administradores. Los analistas empezaron a cerrar todas las alertas de PowerShell. Cuando un atacante real ejecutó PowerShell, la alerta se cerró sin investigar.

### La Exclusion que Cego al SOC (2021)

Un ingeniero agregó una exclusion a la regla para ignorar tráfico de la IP 10.0.0.50 (el escáner de vulnerabilidades). Un atacante dentro de la red descubrió la exclusion y uso esa IP para operar sin ser detectado.

### La Regla que Detecto su Ausencia (2023)

Un equipo implementó una regla que monitoreaba si los EDRs enviaban telemetría. Si un endpoint dejaba de reportar por 24 horas, se generaba alerta. Detecto cuando un atacante desinstalo el EDR en varios servidores antes de ejecutar ransomware.

## Modos de Falla

Reglas sin contexto de negocio: detectan transferencias de 100MB sin saber que diseño sube videos. No probar con datos historicos: errores de sintaxis o falsos positivos masivos. Excluir por conveniencia: ignorar departamentos enteros crea puntos ciegos. Reglas estaticas en entornos dinamicos: lo que funcionaba hace 6 meses puede estar obsoleto. Ignorar la evasion: los atacantes estudian las reglas y las evaden.

### El Problema de las Excepciones Acumuladas

Cada vez que una regla genera un falso positivo, la tentacion es agregar una excepción. Con el tiempo, la regla original queda irreconocible, llena de parches que la hacen ineficaz. La mejor práctica es en lugar de acumular excepciones, redisenar la regla para que sea más específica desde el inicio.

## La Perspectiva del Atacante

Un atacante que enfrenta Detection Engineering sólido sabe que no puede confiar en técnicas conocidas. Prueba sus herramientas contra EDRs, modifica firmas, usa herramientas nativas (LOLBins), distribuye actividades en el tiempo, y estudia las políticas de exclusion si puede acceder a documentación interna.

El atacante más peligroso sabe exactamente que reglas existen y diseña su ataque para evadirlas todas.

## Autoevaluación

1. Compras un SIEM sin contratar Detection Engineer. Por qué las reglas por defecto serán inútiles?
2. Regla para detectar whoami. En empresa de desarrollo, genera problema de recall o precisión?
3. Agregas exclusion para IP 10.0.0.50. Por qué las exclusiones fijas son peligrosas?
4. Regla busca "ransomware.exe". Que problemas tiene? Como la mejoras?
5. Un empleado de IT usa PowerShell. Un atacante también. Como distingues entre ambos?
6. Nueva regla genera 100 alertas en la primera hora. Opciones: desactivar, ajustar, ignorar. Cual es correcta?
7. Red Team evade todas tus reglas. Como conviertes su reporte en mejoras?
8. Por qué el Detection Engineer necesita entender redes, SO, y programación? No basta con saber el lenguaje del SIEM?

## Análisis Avanzado de Reglas de Detección

### Reglas para Técnicas Living off the Land

Los atacantes usan herramientas nativas del sistema (LOLBins) para evitar ser detectados. Ejemplos comunes y como detectarlos:

**PowerShell:**
- Normal: Los administradores usan PowerShell para tareas de gestión.
- Anómalo: PowerShell ejecuta scripts desde URLs, usa argumentos ofuscados (-EncodedCommand), o ejecuta en ventana oculta (-WindowStyle Hidden).
- Regla: Alertar cuando PowerShell descargué contenido de internet Y ejecute código en memoria.

**WMI (Windows Management Instrumentation):**
- Normal: Herramientas de inventario y gestión usan WMI.
- Anómalo: WMI ejecuta procesos en sistemas remotos, especialmente en horarios no laborales.
- Regla: Alertar cuando wmiprvse.exe ejecute cmd.exe o powershell.exe en un sistema remoto.

**MSHTA (Microsoft HTML Application):**
- Normal: Prácticamente nunca usado en entornos corporativos modernos.
- Anómalo: Cualquier ejecución de mshta.exe debe ser investigada.
- Regla: Alertar en cualquier ejecución de mshta.exe.

**Regsvr32:**
- Normal: Usado para registrar/desregistrar DLLs.
- Anómalo: Regsvr32 ejecutando scripts desde URLs remotas (Squiblydoo).
- Regla: Alertar cuando regsvr32.exe se conecte a internet.

### Estrategias de Evasion que los Atacantes Usan

**Living off the Land:** Usar herramientas nativas del sistema (PowerShell, WMI, MSHTA, certutil) para evitar que herramientas externas generen alertas.

**Ofuscación:** Codificar payloads en Base64, usar XOR, o comprimir con herramientas como Invoke-Obfuscation para evadir firmas basadas en strings.

**Process Hollowing:** Inyectar código malicioso en un proceso legítimo (como explorer.exe o svchost.exe) para que las reglas que monitorean procesos no detecten el ejecutable malicioso.

**DLL Side-Loading:** Colocar una DLL maliciosa en el directorio de búsqueda de una aplicación legítima para que esta cargue la DLL sin saberlo.

**Timing Attacks:** Distribuir las actividades maliciosas a lo largo del tiempo para evitar detecciones basadas en umbrales de frecuencia.

**Living off the Land Binary (LOLBins) más comunes:**
- powershell.exe, cmd.exe, wmic.exe, mshta.exe, regsvr32.exe, rundll32.exe, certutil.exe, bitsadmin.exe, cscript.exe, wscript.exe

### Automatización del Tuning

El proceso de tuning se puede automatizar parcialmente:
1. Implementar la regla en modo "monitoreo."
2. Recolectar todas las alertas generadas durante 2 semanas.
3. Analizar automáticamente los patrones de falsos positivos (misma hora, mismo usuario, mismo sistema).
4. Generar sugerencias de exclusiones basadas en los patrones identificados.
5. El ingeniero revisa y aprueba las exclusiones propuestas.
6. La regla se despliega en modo producción con las exclusiones.

## Detección por Capas

Un enfoque maduro de detección implementa múltiples capas:

**Capa 1: Prevención**
Bloquear antes de que ocurra. Ejemplo: Políticas de AppLocker que impiden ejecutar scripts no firmados.

**Capa 2: Detección en Tiempo Real**
Alertas que se disparan durante el evento. Ejemplo: Regla de EDR que detecta y bloquea Mimikatz en memoria.

**Capa 3: Detección Post-Evento**
Alertas basadas en logs después del evento. Ejemplo: Regla SIGMA que detecta creación de usuarios administrativos.

**Capa 4: Hunting**
Búsqueda proactiva de patrones que las reglas no cubren. Ejemplo: Buscar conexiones salientes a IPs en países de alto riesgo.

## El Factor Humano en Detection Engineering

Las mejores reglas técnicas fallan si no consideran el factor humano:
- Los analistas se cansan y cometen errores.
- Los administradores legítimos hacen cosas que parecen ataques.
- Los desarrolladores despliegan código que genera tráfico anómalo.
- Los cambios de configuración no se comunican al equipo de seguridad.

Un Detection Engineer efectivo construye relaciones con IT, desarrollo, y operaciones para entender que es normal y que no. La tecnología es solo una parte de la ecuación.

## Preguntas Adicionales

9. Un nuevo empleado de IT ejecuta scripts de PowerShell que generan alertas. Es un atacante o un empleado aprendiendo? Como lo determinas sin crear falsos positivos ni perder un ataque real?
10. Implementas una regla que detecta el uso de certutil.exe para descargar archivos (técnica usada por atacantes). El equipo de IT usa certutil para descargar parches de Microsoft. Como resuelves este conflicto?
11. El equipo de Red Team prueba tus reglas durante un ejercicio y las evade todas. Como conviertes este resultado en una mejora concreta de tus reglas?
12. Una regla bien afinada tiene 0 falsos positivos pero solo detecta el 10% de los ataques. Otra regla detecta el 90% pero genera 1000 falsos positivos al día. Cual prefieres y por qué?

## Preguntas Adicionales

13. Un nuevo empleado de IT ejecuta scripts de PowerShell que generan alertas. Es un atacante o un empleado aprendiendo? Como lo determinas sin crear falsos positivos ni perder un ataque real?
14. Implementas una regla que detecta el uso de certutil.exe para descargar archivos. El equipo de IT usa certutil para descargar parches. Como resuelves este conflicto?
15. El equipo de Red Team prueba tus reglas durante un ejercicio y las evade todas. Como conviertes este resultado en una mejora concreta?
16. Una regla bien afinada tiene 0 falsos positivos pero solo detecta el 10% de los ataques. Otra detecta el 90% pero genera 1000 falsos positivos al día. Cual prefieres y por qué?
17. Que métricas usarías para medir la efectividad de tu programa de Detection Engineering? Como las presentarias a la dirección para justificar el presupuesto?
