---
title: "SIEM y MITRE ATT&CK: El Cerebro y El Diccionario"
level: "intermedio"
content_type: "guia"
updated: "2026-06-29"
---

# SIEM y MITRE ATT&CK: El Cerebro y El Diccionario

## Objetivo de esta Guía

Entender que es la pantalla que miran los analistas SOC y como la industria global se puso de acuerdo en un solo lenguaje para describir ataques. El SIEM es el cerebro que centraliza todos los eventos de seguridad en un solo lugar. MITRE ATT&CK es el diccionario que le da significado a esos eventos y permite que defensores de todo el mundo se entiendan entre si.

Sin SIEM, los analistas están ciegos ante el panorama completo de seguridad. Sin MITRE, cada equipo habla un idioma diferente y no puede compartir inteligencia. La integración de ambos define la madurez de un centro de operaciones de seguridad. Esta guía explica como funcionan, como se configuran, y como evitan errores comunes.

## El SIEM: El Cerebro Central

En las guías anteriores aprendimos que una empresa tiene cámaras por todas partes: firewalls, EDR, servidores web, Active Directory, proxies. Cada una de estas fuentes genera sus propios logs en su propio formato. El problema es que un analista no puede mirar 50 monitores diferentes simultáneamente.

El SIEM (Security Information and Event Management) resuelve este problema. Es una plataforma que:
1. Absorbe logs de todas las fuentes en tiempo real o en lotes.
2. Normaliza los datos: convierte formatos dispares a un esquema común.
3. Almacena los datos de forma que puedan ser buscados rápidamente.
4. Correlaciona eventos de diferentes fuentes para identificar patrones de ataque.
5. Genera alertas cuando se cumplen condiciones predefinidas.
6. Proporciona dashboards y visualizaciones para monitoreo en tiempo real.

Si buscas la IP `10.0.0.5` en el SIEM, el SIEM te dirá instantáneamente: "Esa IP fue vista por el firewall hace 2 horas conectándose al puerto 443, fue detectada por el EDR hace 1 hora ejecutando un proceso desconocido, acaba de iniciar sesión en Windows Server 01 hace 5 minutos como administrador, y esta transfiriendo datos a un servidor en Rusia."

### Componentes Arquitectónicos de un SIEM

**Recolectores (Forwarders / Agents):**
Software instalado en los sistemas que envía logs al SIEM. Ejemplos: Splunk Universal Forwarder, Winlogbeat, syslog-ng, Fluentd. Los recolectores deben ser ligeros para no afectar el rendimiento del sistema que monitorean.

**Cola de mensajes (Message Queue):**
Buffer temporal que absorbe picos de tráfico. Si el SIEM se cae o se satura, los logs no se pierden porque quedan encolados. Tecnologías comunes: Kafka, RabbitMQ, Redis.

**Motor de parsing y normalización:**
Convierte logs de diferentes formatos a un esquema común. Por ejemplo, el campo "src_ip" en un log de firewall, "SourceAddress" en Windows, y "origen" en un log customizado se normalizan a un solo campo "source.ip".

**Motor de correlación:**
Aplica reglas que cruzan eventos de diferentes fuentes. Ejemplo: "Si un usuario falla autenticación 3 veces en Windows + luego inicia sesión exitosamente desde una IP nueva + luego ejecuta un comando de elevación de privilegios, genera alerta de posible compromiso de cuenta."

**Almacenamiento:**
Los logs se guardan en indices o bases de datos. La capacidad de almacenamiento determina cuanto tiempo histórico puedes consultar. Las regulaciones como PCI DSS exigen 1 año de retención. La mayoría de las empresas mantienen 30-90 días de datos en almacenamiento de alto rendimiento y hasta 1-2 años en almacenamiento de bajo costo.

**Dashboards y visualización:**
Paneles que muestran el estado de seguridad en tiempo real. Buenos dashboards muestran: alertas activas por severidad, fuentes de datos con problemas, tendencias de amenazas, y tiempo de respuesta promedio.

### SIEM vs. EDR vs. XDR

Es común la confusión entre estos términos:

**SIEM:** Centraliza logs de múltiples fuentes (firewalls, servidores, aplicaciones, EDR). Proporciona visión global.

**EDR:** Se enfoca en un solo endpoint. Registra todo lo que pasa en esa computadora. Ve el árbol en detalle.

**XDR (Extended Detection and Response):** Evolución del EDR que integra telemetría de múltiples fuentes (endpoint, red, nube, correo) en una sola plataforma. Es como un EDR + SIEM pero más integrado.

La relación es de complemento. El EDR es una fuente de datos para el SIEM. El XDR intenta reemplazar al SIEM en algunos escenarios, pero aún no es un reemplazo completo para empresas complejas.

### Implementación de un SIEM: Pasos Críticos

1. **Definir requerimientos:** Que fuentes de datos son críticas? Que regulaciones aplican? Cuántos analistas usarán el sistema?
2. **Seleccionar plataforma:** Splunk (comercial, costoso), Elastic Security (open source con opciones comerciales), Wazuh (open source), Microsoft Sentinel (cloud), IBM QRadar (comercial).
3. **Diseñar arquitectura:** Donde se alojara? En premisas o en la nube? Cuanta capacidad de procesamiento y almacenamiento?
4. **Configurar recolección:** Instalar forwarders en todas las fuentes críticas. Probar que los logs llegan correctamente.
5. **Normalizar datos:** Configurar el parsing para cada tipo de log. Este paso es tedioso pero crítico.
6. **Crear reglas de correlación:** Implementar detecciones basadas en MITRE y casos de uso del negocio.
7. **Configurar alertas y notificaciones:** Definir canales de alerta (correo, SMS, chat, tickets).
8. **Crear dashboards:** Diseñar paneles para el SOC y para la gerencia.
9. **Probar y ajustar:** Verificar que las reglas funcionan con datos históricos y en vivo.
10. **Mantener:** Revisar periódicamente reglas, fuentes de datos, y rendimiento.

### El Error Común: Comprar el SIEM y Esperar Milagros

Muchas empresas compran un SIEM, lo instalan, y esperan que automáticamente detecte ataques. La realidad es que un SIEM sin configurar es un disco duro caro. Las reglas por defecto son genéricas y producen demasiados falsos positivos o demasiados falsos negativos.

Una implementación de SIEM puede fallar aunque la herramienta funcione: las causas habituales incluyen falta de personal, cobertura incompleta de fuentes, costos de ingestión y ausencia de procesos para responder a alertas.

## MITRE ATT&CK: La Enciclopedia del Crimen

Dos analistas SOC están en la cafetería. Uno dice: "Ayer nos atacaron. El atacante uso un script de PowerShell para leer las contraseñas de la memoria RAM." El otro dice: "Ah, a nosotros también nos hicieron dump de LSASS."

Hablan del mismo ataque con palabras diferentes. Si el FBI quiere contar crímenes a nivel mundial, no puede tener 100 nombres para la misma técnica.

MITRE ATT&CK es una organización financiada por el gobierno de EE.UU. que creo una "tabla periódica" del hacking. Es un diccionario universal y gratuito que clasifica todas las técnicas de ataque conocidas.

En lugar de decir "leyó contraseñas de la RAM," la industria entera acorda llamarlo T1003: OS Credential Dumping. Cuando dices T1003 en un reporte, cualquier analista en cualquier país sabe exactamente de que hablas.

### Estructura del Framework

**Tácticas:** El "por qué" del ataque. Que intenta lograr el atacante en esta fase? Las 14 tácticas actuales son:
- Reconocimiento (TA0043): Recolectar información del objetivo.
- Desarrollo de Recursos (TA0042): Preparar herramientas y cuentas.
- Acceso Inicial (TA0001): Entrar a la red.
- Ejecución (TA0002): Ejecutar código malicioso.
- Persistencia (TA0003): Mantener el acceso.
- Elevación de Privilegios (TA0004): Obtener más permisos.
- Evasión de Defensas (TA0005): Evitar ser detectado.
- Acceso a Credenciales (TA0006): Robar nombres de usuario y contraseñas.
- Descubrimiento (TA0007): Explorar el entorno.
- Movimiento Lateral (TA0008): Moverse a otros sistemas.
- Recolección (TA0009): Reunir datos de interés.
- Comando y Control (TA0011): Comunicarse con servidores externos.
- Exfiltración (TA0010): Robar datos.
- Impacto (TA0040): Manipular, interrumpir o destruir.

**Técnicas:** El "como" del ataque. Métodos específicos para lograr cada táctica. Por ejemplo, para "Acceso Inicial" (táctica), las técnicas incluyen:
- T1566: Phishing.
- T1078: Cuentas Válidas.
- T1190: Explotación de Aplicación Pública.
- T1133: Acceso Remoto (VPN, RDP).
- T1199: Confianza en Proveedores.

**Subtecnicas:** Variantes más específicas de una técnica. T1566.001 es "Spearphishing Attachment" y T1566.002 es "Spearphishing Link."

**Grupos:** Organizaciones de amenazas conocidas. Ejemplos: APT29 (Rusia), Lazarus (Corea del Norte), FIN7 (crimen organizado).

**Software:** Herramientas y malware utilizados por los grupos. Ejemplos: Mimikatz (robo de credenciales), Cobalt Strike (post-explotación), Emotet (botnet).

### Como Usar MITRE en el Día a Día

Para el analista SOC: Cuando recibe una alerta, verifica si esta etiquetada con una técnica MITRE. Si lo esta (ejemplo: T1059 - PowerShell), busca la técnica en la página de MITRE para entender:
- Como funciona la técnica.
- Que datos recolecta el atacante.
- Como detectarla (reglas sugeridas).
- Como mitigarla (configuraciones recomendadas).

Para el Detection Engineer: Al crear una nueva regla, la etiqueta con la técnica MITRE correspondiente. Esto permite al SOC entender el contexto del ataque.

Para el Threat Hunter: Usa MITRE como guía para formular hipótesis. "El grupo APT29 usa T1059 para ejecución. Voy a buscar actividad de PowerShell en horarios no laborales."

Para el equipo de arquitectura: Usa MITRE para identificar puntos ciegos en las defensas. "No tenemos detección para T1057 (Descubrimiento de Procesos). Necesitamos crear una regla."

## La Fusión: Cuando el SIEM conoce a MITRE

El trabajo moderno del defensor es mapear las reglas del SIEM a la matriz de MITRE. Cada regla de detección debería estar etiquetada con una o más técnicas de MITRE.

Beneficios:
- **Contexto inmediato:** Cuando la alerta llega al analista, ve T1059 y sabe que el atacante esta ejecutando código vía scripting.
- **Cobertura medible:** Puedes crear un dashboard que muestre cuántas técnicas de MITRE tienes cubiertas con reglas de detección.
- **Detección de brechas:** Si no tienes reglas para T1003 (robo de credenciales), los atacantes pueden robar contraseñas sin ser detectados.
- **Lenguaje común:** Todos los equipos (SOC, IR, Threat Intel) hablan el mismo idioma.

### La Matriz de Cobertura

Una práctica avanzada es crear una matriz que muestre que técnicas de MITRE tu SIEM puede detectar. Cada celda de la matriz representa una combinación de táctica y técnica.

La matriz revela patrones preocupantes. Por ejemplo, si tu matriz muestra buena cobertura en "Ejecución" pero mala en "Movimiento Lateral," significa que puedes detectar cuando el atacante ejecuta código, pero no cuando se mueve a otros sistemas.

## Casos Reales de SIEM y MITRE

### Implementación Fallida (2019)

Escenario ilustrativo: una empresa contrata un SIEM, pero dos años después solo una parte de las fuentes de datos está conectada. Las reglas nunca se habían actualizado. El SIEM recibía logs de 3 de 15 firewalls, de ningún EDR, y de la mitad de los servidores.

### Mapeo MITRE que Salvo la Investigación (2021)

Un analista etiqueto un evento con T1003. Cuando el atacante se movió lateralmente, el SIEM correlaciono los nuevos eventos con la etiqueta inicial, revelando el alcance completo del ataque en minutos.

### Grupo Financiero (2022)

Un grupo financiero implementó SIEM con mapeo MITRE completo. Durante un ataque, identificaron que el atacante estaba en fase de Descubrimiento (T1087) y lo detuvieron antes de que llegará a Impacto (T1486).

## Modos de Falla

SIEM como sumidero sin proceso: los logs llegan pero nadie los revisa. MITRE como ejercicio académico: el mapeo existe en un PDF pero nadie lo usa. Dependencia excesiva de MITRE: cubre técnicas conocidas, no las nuevas. SIEM como cuello de botella: superado por el volumen de datos. Confundir MITRE con checklist: marcar técnicas no significa estar protegido.

### El Problema de la Escalabilidad del SIEM

Cuando el volumen de logs crece más rápido que la capacidad del SIEM, empiezan los problemas: retraso en el procesamiento, pérdida de eventos, alertas tardías. Las causas del crecimiento son naturales: más servidores, más aplicaciones, más requisitos de compliance, más fuentes de datos cloud.

Las soluciones incluyen: filtrado de logs irrelevantes en el origen, almacenamiento en caliente y frío, particionamiento de indices, y escalamiento horizontal de la infraestructura.

### MITRE no es un Checklist de Seguridad

Un error común es tratar MITRE como una lista de verificación: "Tenemos detección para 200 de 500 técnicas, estamos 40% seguros." Esto es peligroso porque:
- Una regla de detección no es una mitigación. Tener una regla para T1003 no evita el robo de credenciales; solo lo detecta.
- La calidad de la regla importa más que la cantidad. Una regla bien diseñada para 10 técnicas es mejor que 100 reglas mal diseñadas.
- Las técnicas no tienen el mismo peso. Algunas son mucho más peligrosas que otras.

## La Perspectiva del Atacante

Un atacante que enfrenta un SIEM bien configurado sabe que sus movimientos serán detectados. Por eso los atacantes avanzados estudian el SIEM de la víctima: buscan vulnerabilidades conocidas, intentan saturarlo con tráfico basura, atacan los forwarders para interrumpir la recolección, y usan técnicas no catalogadas en MITRE.

El atacante también sabe que el analista humano es el eslabón débil. Si puede generar suficientes falsos positivos para saturarlo, puede operar bajo el ruido.

## Autoevaluación

1. Configuras un SIEM nuevo. Conectas firewall (usa "source_ip") y Windows (usa "ClientAddress"). Por qué la normalización es obligatoria? Que pasaría si no la hicieras?
2. Un reporte dice: "Vulneramos el servidor usando T1110 (Brute Force)." Si buscas T1110 en MITRE, encuentras un tutorial para atacar tu empresa o una descripción universal? Cual es el valor de esta distinción?
3. Por qué MITRE es más útil para el Blue Team que CVSS? Que información adicional proporciona MITRE?
4. Un directivo pregunta: "Para que pagamos un SIEM si ya tenemos antivirus y firewall?" Como justificas la compra usando la metáfora de las cámaras y la visión global?
5. Quieres crear una regla para detectar Mimikatz. Que técnicas MITRE deberías etiquetar?
6. El equipo de IT usa PowerShell legítimamente. Como balanceas detección de actividad maliciosa sin falsos positivos?
7. Creas un dashboard que muestra cobertura MITRE del 90%. Es esto una medida real de seguridad? Que más necesitas?
8. Un atacante usa una técnica no catalogada en MITRE. Tu SIEM no la detecta. Pasas meses sin saber de la brecha. Que lección aprendes sobre dependencia de frameworks?

## Casos Prácticos de Correlación en SIEM

### Caso 1: Detección de Pass-the-Hash en Active Directory

**Fuentes de datos:** Logs de Windows Security (Event ID 4624), logs de autenticación de DC.

**Regla de correlación:**
1. Detectar múltiples inicios de sesión exitosos (4624) desde una misma cuenta en diferentes sistemas en menos de 5 minutos.
2. Filtrar por Logon Type 3 (acceso a recurso de red).
3. Verificar que la autenticación uso NTLM (no Kerberos).
4. Si la cuenta normalmente usa Kerberos y de repente usa NTLM desde IPs diferentes: alta probabilidad de PtH.

**Falsos positivos:** Aplicaciones que usan una cuenta de servicio para autenticarse en múltiples servidores simultáneamente.

### Caso 2: Detección de Data Exfiltration por DNS

**Fuentes de datos:** Logs de DNS (servidor DNS corporativo), logs de firewall.

**Regla de correlación:**
1. Identificar dominios con subdominios largos y aleatorios (ej: asdf1234.malware.dom).
2. Contar consultas DNS únicas por dominio por hora.
3. Si un dominio recibe más de 100 consultas únicas en una hora con subdominios generados: alerta.
4. Verificar que el tráfico no corresponde a servicios legítimos como CDN.

**Falsos positivos:** Servicios de CDN como Akamai o Cloudflare que usan subdominios generados.

### Caso 3: Detección de Ransomware

**Fuentes de datos:** Logs de sistema de archivos, logs de procesos, logs de red.

**Regla de correlación:**
1. Detectar alta tasa de modificaciones de archivos (especialmente con extensiones de oficina: .docx, .xlsx, .pdf).
2. Correlacionar con procesos no habituales (nuevos ejecutables, procesos renombrados).
3. Identificar archivos README o notas de rescate creados en múltiples directorios.
4. Verificar conexiones salientes a dominios recién registrados o IPs en países sin presencia comercial.

## Herramientas de SIEM Populares

**SIEM Empresariales:**
- Splunk Enterprise Security (ES): Líder del mercado. Lenguaje de búsqueda SPL. Amplia gama de aplicaciones. Costo elevado.
- IBM QRadar: Fuerte en correlación de eventos y análisis de flujo. Interfaz menos intuitiva pero potente.
- LogRhythm: Bueno para cumplimiento normativo. Análisis automático de eventos.
- McAfee ESM: Integrado con el ecosistema de McAfee. Bueno para organizaciones que ya usan productos McAfee.
- ArcSight (Micro Focus): Potente pero complejo. Curva de aprendizaje pronunciada.

**SIEM Open Source:**
- Wazuh: Fork de OSSEC. Gran comunidad. Integración con Elastic Stack. Bueno para PYMES.
- Elastic Security (ELK Stack): Elasticsearch, Logstash, Kibana. Escalable. Requiere más configuración manual.
- OpenSearch: Fork de Elasticsearch. Compatible con la mayoría de herramientas del ecosistema ELK.
- AlienVault OSSIM: Integra SIEM, HIDS, monitoreo de red en una sola plataforma open source.

**SIEM Cloud (SaaS):**
- Microsoft Sentinel: SIEM nativo de Azure. Integración profunda con el ecosistema Microsoft. Modelo de pago por uso.
- AWS Security Hub: SIEM nativo de AWS. Integra GuardDuty, Inspector, Macie.
- Google Google Security Operations: SIEM en la nube de Google. Escalabilidad masiva. Precio predecible.

### Consideraciones para Elegir un SIEM

1. **Volumen de datos:** Cuántos EPS (Eventos Por Segundo)? 1000 EPS? 10000 EPS?
2. **Fuentes de datos:** Que sistemas necesitas integrar? Windows, Linux, AWS, Azure, GCP, on-premise?
3. **Madurez del equipo:** Tienen experiencia con SIEM? Splunk es fácil de aprender pero caro. ELK requiere más habilidades técnicas.
4. **Presupuesto:** Licencias, hardware, almacenamiento, personal.
5. **Cumplimiento normativo:** PCI-DSS, HIPAA, GDPR requieren funcionalidades específicas de auditoría y reporting.

## Preguntas Adicionales

9. Tu SIEM recibe 100,000 EPS (eventos por segundo) de 10,000 endpoints. El 99.9% de estos eventos son de parches de Windows que no son útiles para detección. Que estrategia usas para reducir el ruido sin perder eventos de seguridad importantes?
10. Splunk Enterprise cuesta $200,000 al año. Wazuh es gratuito. Que factores además del costo considerarías para decidir cual implementar en una empresa de 500 empleados?
11. El equipo de seguridad implementa una regla de SIEM que detecta acceso a un servidor crítico fuera del horario laboral. El CEO accede al servidor un domingo a las 2 AM para revisar un informe. Que haces con la alerta y con la regla?
12. Configuras MITRE ATT&CK en tu SIEM. En una semana, tienes 50 alertas de T1059 (PowerShell). Solo 1 es un ataque real. Como priorizas la investigación sin que el equipo se canse de falsos positivos?

## Arquitectura de un SIEM

### Componentes Principales

**Recolectores (Collectors/Forwarders):**
Agentes instalados en los sistemas origen que recolectan logs y los envían al SIEM. Ejemplos: Universal Forwarder (Splunk), Winlogbeat (Elastic), rsyslog (Linux).

**Mensajería/Cola (Queue/Buffer):**
Sistema de encolado que recibe los logs de los recolectores y los almacena temporalmente antes de procesarlos. Ejemplos: Kafka, RabbitMQ, Redis. Permite absorber picos de tráfico sin perder eventos.

**Motor de Procesamiento (Processing Engine):**
Normaliza, parsea, y enriquece los logs. Convierte logs de diferentes formatos (Windows Event Log, syslog, JSON, CEF) a un formato común. Añade contexto (geo-IP, información de activos, reputación de IPs).

**Motor de Correlación (Correlation Engine):**
Aplica las reglas de correlación a los eventos procesados. Evalúa condiciones temporales (5 intentos de login fallidos en 1 minuto), condiciones lógicas (firewall bloquea conexión Y usuario reporta lentitud), y condiciones de umbral.

**Almacenamiento (Storage):**
Base de datos optimizada para búsquedas de texto completo y consultas analíticas. Ejemplos: Elasticsearch, Splunk Indexes. Los datos se almacenan por periodos definidos (30 días, 90 días, 1 año) según políticas de retención.

**Interfaz de Búsqueda (Search Interface):**
Interfaz de usuario para consultar datos. Permite búsquedas ad-hoc, dashboards, y reportes programados. Ejemplos: Kibana (Elastic), Splunk Web, QRadar Console.

### Scaling Topics

**Horizontal vs. Vertical:**
- Escalado vertical: Más CPU, RAM, disco en el mismo servidor. Limitado por hardware máximo.
- Escalado horizontal: Más servidores trabajando en clúster. Ilimitado teóricamente.

**Indexers vs. Search Heads:**
En Splunk (y arquitecturas similares), los Indexers almacenan y procesan datos, mientras que los Search Heads coordinan búsquedas entre Indexers. Separar estas funciones permite escalar independientemente.

**Hot/Warm/Cold Storage:**
- Hot: Datos de los últimos 7-30 días, en almacenamiento rápido (SSD). Consultas frecuentes.
- Warm: Datos de 30-90 días, en almacenamiento más lento (HDD). Consultas ocasionales.
- Cold: Datos de más de 90 días, en almacenamiento de bajo costo (S3 Glacier, Azure Archive). Consultas excepcionales.

## Preguntas Adicionales

13. Configuras una regla de correlación que detecta 5 intentos de inicio de sesión fallidos en 1 minuto desde la misma IP. La regla genera 10,000 alertas en una hora. Que esta mal y como lo corriges?
14. El SIEM recibe logs de 100 firewalls, 500 servidores, y 10,000 endpoints. El almacenamiento se llena en 3 días en vez de los 30 días planificados. Que estrategias usas para priorizar que logs conservar?
15. Un administrador de SIEM configura un dashboard de cumplimiento PCI-DSS. Que eventos debe monitorear el dashboard? Como los controles están funcionando correctamente?
