---
title: "Firewalls, IDS e IPS: Los Guardias del Castillo"
---

# Firewalls, IDS e IPS: Los Guardias del Castillo

## Objetivo de esta Guía

Aprender la diferencia entre las tres grandes piezas de defensa perimetral y como trabajan juntas. Si conectas un servidor directamente a internet, durará minutos antes de ser escaneado por bots. Para evitarlo, construimos un castillo con múltiples capas.

Esta guía cubre firewalls tradicionales, sistemas de detección (IDS), sistemas de prevención (IPS), y firewalls de nueva generación (NGFW). Explora como los atacantes evaden cada defensa y como configurarlas sin causar daños colaterales.

## El Firewall: El Guardia de la Puerta

Guardia de seguridad enorme pero poco inteligente. Esta en la puerta con una lista de invitados (políticas). Revisa dirección origen, destino, y puerto:

- "Vienes de internet y quieres entrar al puerto 80? La lista dice que si. Adelante."
- "Vienes de internet y quieres entrar al puerto 22? Prohibido. Rechazado."

### Tipos de Firewalls

**Firewall de filtrado de paquetes (Stateless):**
Revisa solo cabeceras de paquetes (IP origen, IP destino, puerto, protocolo). No mantiene estado de conexiones. Rápido pero limitado. Cada paquete se evalua individualmente sin contexto de la conexion a la que pertenece.

**Firewall de inspeccion de estado (Stateful):**
Mantiene una tabla de conexiones activas. Solo permite paquetes que pertenecen a conexiones establecidas. Si un paquete SYN externo llega al puerto 80, permite el establecimiento y registra la conexion. Los paquetes siguientes de esa conexion se permiten automáticamente. Es el estándar mínimo actual.

**Firewall de capa de aplicación (Proxy):**
Inspecciona el contenido de la aplicación. Un proxy HTTP puede analizar el comando GET, la URL solicitada, el user-agent, y el cuerpo de la solicitud. Puede bloquear comandos específicos (PUT, DELETE) o detectar patrones de ataque en el contenido.

**Firewall de nueva generación (NGFW):**
Combina firewall stateful, IPS, control de aplicaciones, descifrado TLS, y filtrado URL en un solo dispositivo. Marcas: Palo Alto, Fortinet, Cisco Firepower, Check Point.

### La Debilidad Fundamental del Firewall

El firewall tradicional NO revisa el contenido del equipaje. Si un atacante pide entrar por el puerto 80 (HTTP), el firewall lo deja pasar. Una vez dentro, el atacante saca una inyección SQL de la mochila y destruye el servidor.

El firewall ve el sobre pero no la carta. HTTPS empeora el problema porque incluso el NGFW necesita descifrar el tráfico para inspeccionarlo, lo que tiene implicaciones de privacidad y rendimiento.

### Reglas de Firewall: Errores Comunes

**Regla "Permitir Todo" al interior:**
"Permitir cualquier tráfico de internet hacia cualquier puerto interno." Anula el propósito del firewall.

**Puertos administrativos abiertos a internet:**
22 (SSH), 3389 (RDP), 443 (paneles de administración) abiertos a toda internet. Los bots escanean constantemente estos puertos.

**Reglas sin documentación:**
Reglas agregadas hace años que nadie recuerda por que existen. Se acumulan y crean superficie de ataque innecesaria. Se estima que 30-50% de las reglas en firewalls corporativos son obsoletas.

**Default deny mal implementado:**
La política correcta es "denegar todo por defecto, permitir solo lo necesario." Muchas empresas usan "permitir todo por defecto, denegar solo lo malo," que es inseguro.

## IDS (Intrusion Detection System): El Perro que Ladra

Como el firewall es ciego al contenido, necesitamos algo más inteligente detrás. El IDS se sienta dentro del castillo y huele a las personas que el firewall dejó pasar. Examina el contenido de los paquetes buscando firmas de ataque o comportamientos anómalos.

### La Regla de Oro del IDS

La D es Detection. El IDS SOLO LADRA, NO MUERDE. Si huele la inyección SQL, ladra (alerta al SIEM). Pero no detiene al atacante. El ataque sigue su curso mientras la alarma suena.

Por que querríamos un guardia que solo avisa? Para evitar falsos positivos. Si el perro se equivoca y muerde al CEO (bloquea su tráfico legítimo), es un desastre corporativo. En modo solo detección, el analista revisa la alerta y decide si es real antes de actuar.

### Métodos de Detección del IDS

**Firmas (Signature-based):**
Compara el tráfico con una base de datos de patrones de ataque conocidos. Similar a como funciona un antivirus. Efectivo contra ataques conocidos, inútil contra ataques nuevos o variantes.

Ejemplo de firma: Buscar el string "union select" en tráfico HTTP para detectar SQL injection.

Ventaja: Preciso, pocos falsos positivos.
Desventaja: Solo detecta lo que ya se conoce. Los atacantes modifican sus técnicas para evadir firmas.

**Anomalías (Anomaly-based):**
Establece una línea base de tráfico normal y alerta cuando hay desviaciones. Puede detectar ataques nuevos. Pero genera más falsos positivos porque cualquier cambio legítimo (nueva aplicación, nuevo empleado) parece una anomalía.

**Protocolos (Protocol-based):**
Verifica que los protocolos se usen según los estándares RFC. Detecta desviaciones como puertos incorrectos, opciones invalidas, o secuencias de comandos anormales.

### Ubicación del IDS en la Red

- **Detrás del firewall:** Ve el tráfico que pasa a la red interna. Es la ubicación más común.
- **En la DMZ:** Monitorea servidores expuestos a internet.
- **En la red interna:** Detecta movimiento lateral de atacantes que ya entraron.
- **En segmentos crítico:** Red de base de datos, red de administración.

## IPS (Intrusion Prevention System): El Perro que Muerde

Evolución del IDS. La P es Prevention. Se coloca en medio del tráfico (inline). Si huele un ataque, ladra (alerta al SIEM) y muerde al atacante (bloquea la conexion). El servidor se salva automáticamente sin intervención humana.

### El Riesgo del IPS: Falsos Positivos

Configurar un IPS en modo bloqueo sin ajuste fino es peligroso. Si una regla es demasiado sensible, el IPS bloquea tráfico legítimo. Esto constituye un ataque de denegación de servicio (DoS) contra tu propia empresa.

**Implementación segura de IPS:**
1. Modo monitoreo (solo alertar) durante 2-4 semanas.
2. Revisar todas las alertas y eliminar falsos positivos.
3. Ajustar reglas basándose en los falsos positivos identificados.
4. Activar modo prevención gradualmente, comenzando con las reglas más confiables.
5. Monitorear continuamente por nuevos falsos positivos.

### Capacidades Avanzadas de IPS

**Normalización de tráfico:** Reensambla paquetes fragmentados para detectar evasion por fragmentacion.

**Bloqueo por reputación:** Usa listas de IPs maliciosas actualizadas en tiempo real. Si una IP tiene reputación de ser un servidor de C2, el IPS bloquea automáticamente.

**Control de aplicaciones:** Identifica aplicaciones por comportamiento (no por puerto). Puede bloquear Tor, BitTorrent, VPNs no autorizadas incluso si usan puertos no estándar.

**Descifrado TLS:** Inspecciona tráfico HTTPS descifrandolo en el IPS y re-cifrandolo hacia el destino. Requiere que los endpoints confien en el certificado del IPS.

## NGFW (Next-Generation Firewall): El Todo en Uno

Las empresas ya no compran firewall + IDS + IPS por separado. Compran un NGFW que incluye:
- Firewall stateful
- IPS
- Descifrado TLS
- Control de aplicaciones (identifica aplicaciones por comportamiento)
- Filtrado URL (bloquea categorías de sitios)
- Prevención de amenazas (antivirus, anti-malware, anti-botnet)
- Sandboxing (ejecuta archivos sospechosos en entorno aislado)

### Limitaciones del NGFW

**Costo:** Equipos costosos, especialmente para alto rendimiento.

**Complejidad:** Requieren personal capacitado. Un NGFW mal configurado es inseguro o bloquea tráfico legítimo.

**Rendimiento:** Descifrar TLS e inspeccionar contenido consume recursos. Activar todas las funciones reduce el throughput. El rendimiento real puede ser 50-70% del nominal.

**Cobertura limitada:** No protegen contra ataques que no cruzan el perímetro: USB malicioso, insider threats, ataques por VPN sin control.

## Casos Reales

### Regla Mal Configurada (2019)

Una empresa configuró una regla que permitia todo el tráfico desde la IP de su proveedor cloud. La intención era permitir actualizaciones. Un atacante comprometio al proveedor y uso esa regla para acceder a la red interna.

### IPS en Modo Monitoreo (2020)

Un banco implementó un IPS pero lo dejó en modo monitoreo durante meses. Nunca completo el ajuste. Un atacante lanzo un exploit conocido que el IPS detecto correctamente... pero solo genero una alerta. No bloqueo.

### Evasion por Fragmentacion (2021)

Un atacante fragmento paquetes IP para evadir el IDS. Cada fragmento era tan pequeño que el IDS no podía reensamblar el contenido. El ataque paso desapercibido.

### Firewall Humano (2022)

Un admin creo una regla "temporal" permitiendo cualquier tráfico entre segmentos. Nunca la eliminó. Meses después, un atacante la uso para moverse lateralmente.

## Modos de Falla

Firewall como única defensa. Redes internas planas (sin segmentación). Reglas acumuladas sin revisión. Falsos positivos no gestionados en IDS/IPS. Ignorar tráfico cifrado (HTTPS). No monitorear logs del firewall.

## La Perspectiva del Atacante

Un atacante enfrentando firewalls, IDS e IPS sabe que debe:
- Usar puertos permitidos (80, 443, 53) para esconder el ataque.
- Fragmentar paquetes para evadir inspeccion.
- Usar HTTPS para cifrar el payload.
- Enumerar reglas del firewall con escaneos lentos.
- Usar tunelizacion (SSH, DNS) para tráfico malicioso.

El atacante también sabe que los firewalls mal administrados (configuraciones por defecto, reglas demasiado permisivas) son casi tan peligrosos como no tener firewall.

## Autoevaluación

1. Un analista instala Snort en modo IDS. El IDS detecta un exploit pero no lo bloquea. El analista se queja de que fallo. Cual es el error?
2. Que regla de firewall protege la base de datos (3306) de internet pero permite conexiones del servidor web interno?
3. Por que activar un IPS en modo prevención sin tuning previo puede causar una caída de producción?
4. Como detecta un IPS malware dentro de tráfico HTTPS? Que implicaciones de privacidad tiene?
5. Un atacante escanea puertos muy lentamente (1 paquete cada 10 segundos). Por que evade la detección del IDS?
6. Tienes un firewall con 500 reglas acumuladas de 5 años. Nadie recuerda para que sirven. Como las limpias sin causar interrupción?
7. Un empleado se conecta via VPN desde su casa. Su PC tiene malware que intenta propagarse a la red corporativa. Que defensas lo detectan y bloquean?
8. Por que "el firewall me protege de todo" es una concepcion errónea? Que ataques no puede prevenir?

## Arquitectura de Defensa Perimetral

### Zonas de Red (DMZ, Interna, Gestión)

**DMZ (Zona Desmilitarizada):**
Red separada que contiene servidores accesibles desde internet (web, correo, DNS). Si un atacante compromete un servidor en la DMZ, solo tiene acceso a la DMZ, no a la red interna.

Reglas de firewall para DMZ:
- Internet -> DMZ: Solo puertos necesarios (80, 443, 25, 53).
- DMZ -> Internet: Solo para actualizaciones y resolución DNS.
- DMZ -> Interna: Prohibido por defecto. Excepciones específicas (ej: servidor web -> base de datos en puerto 3306).
- Interna -> DMZ: Permitido solo desde estaciones de administración autorizadas.

**Zona de Gestión:**
Red separada para administración de infraestructura (servidores de backup, consolas de virtualización, sistemas de monitoreo). Solo administradores autorizados pueden acceder desde estaciones de trabajo específicas.

### Estrategias de Implementación

**East-West vs. North-South Traffic:**
- North-South: Tráfico que entra o sale de la red (internet <=> red interna). Protegido por firewall perimetral.
- East-West: Tráfico entre sistemas dentro de la misma red. Tradicionalmente no protegido. Los atacantes explotan esta confianza para moverse lateralmente.

Solución: Firewalls internos, microsegmentacion, y políticas de confianza cero que controlan también el tráfico East-West.

### Firewalls Cloud

En entornos cloud (AWS, Azure, GCP), los firewalls son virtuales:

**AWS:**
- Security Groups: Firewall stateful a nivel de instancia. Por defecto deniega todo, permites solo lo necesario.
- Network ACLs: Firewall stateless a nivel de subnet. Reglas numeradas evaluadas en orden.
- AWS WAF: Firewall de aplicación web para proteger contra SQLi, XSS, DDoS.
- AWS Shield: Protección DDoS automática.

**Azure:**
- Network Security Groups (NSG): Similar a Security Groups de AWS.
- Azure Firewall: Firewall stateful como servicio gestionado.
- Azure WAF: Protección de aplicaciones web.
- Azure DDoS Protection: Protección DDoS.

**GCP:**
- VPC Firewall Rules: Firewall stateful a nivel de red.
- Cloud Armor: WAF y protección DDoS.
- Google Cloud Load Balancing: Con funcionalidades de firewall integradas.

## Configuración de Reglas por Tipo de Ataque

### Bloqueo de SQL Injection

Reglas en el IPS/NGFW:
- Buscar patrones como: UNION SELECT, OR 1=1, ', --, WAITFOR DELAY.
- Bloquear requests que contengan estos patrones en parámetros GET/POST.
- Normalizar tráfico antes de la inspeccion para evitar evasion por codificación URL.

### Bloqueo de Cross-Site Scripting (XSS)

Reglas en el IPS/WAF:
- Buscar patrones como: <script>, onerror=, onload=, javascript:.
- Bloquear requests con estos patrones en headers, cookies, y body.
- Validar Content-Type para evitar polucion de parámetros.

### Bloqueo de Fuerza Bruta

Reglas en el firewall/IPS:
- Limitar número de conexiones por IP origen por minuto (rate limiting).
- Bloquear IPs que excedan el umbral por un tiempo definido.
- Detectar y bloquear patrones de escaneo de puertos.

### Bloqueo de DDoS

Estrategias:
- Rate limiting por IP origen.
- Bloqueo de IPs en listas negras de reputación.
- Captcha o desafios JS para tráfico sospechoso.
- Redirección a servicios de mitigación cloud (Cloudflare, Akamai, AWS Shield).
- Anycast para distribuir tráfico entre múltiples centros de datos.

## Monitoreo de Firewalls

### Que Monitorear

**Volumen de tráfico:**
- Picos inusuales (posible DDoS o exfiltración).
- Caidas inesperadas (posible fallo del firewall o del enlace).

**Conexiones bloqueadas:**
- Incremento en bloqueos (posible escaneo o ataque).
- Patrones en IPs bloqueadas (ataque dirigido o escaneo masivo).
- Tipos de ataques más frecuentes.

**Rendimiento del firewall:**
- Uso de CPU y memoria.
- Número de conexiones simultaneas.
- Throughput vs. capacidad nominal.

**Cambios de configuración:**
- Nuevas reglas agregadas.
- Reglas modificadas o eliminadas.
- Accesos al panel de administración.

### Alertas Críticas de Firewall

- Firewall caído o no responde.
- Regla de "permitir todo" agregada.
- Cambio en password de administrador.
- Configuración de backup fallida.
- Licencia por expirar.
- Firmas de IDS/IPS desactualizadas.

## Pruebas de Penetracion a Firewalls

Como un atacante evalua un firewall:

1. **Descubrimiento de reglas:** Escaneo de puertos con diferentes opciones (SYN, FIN, NULL) para inferir reglas.
2. **Evasion de filtros:** Fragmentacion, decoys, timing lento, puertos de origen confiables.
3. **Firewalking:** Técnica para determinar que puertos están filtrados enviando paquetes con TTL específico.
4. **Bypass de IDS/IPS:** Ofuscación de payloads, codificación URL multiple, división de ataques en múltiples paquetes.

## Preguntas Adicionales

9. Configuras un NGFW con descifrado TLS. Los empleados empiezan a recibir errores de certificado en sus navegadores. Que configuración falta y como la implementas sin interrumpir el trabajo?
10. Un servidor en la DMZ necesita acceder a la base de datos en la red interna. Que reglas de firewall necesitas crear? Considera seguridad y funcionalidad.
11. El firewall principal de tu empresa muestra picos de tráfico a las 3:00 AM todos los dias. El tráfico es HTTPS a una IP en Rusia. Es un ataque, un servicio legítimo, o un empleado?
