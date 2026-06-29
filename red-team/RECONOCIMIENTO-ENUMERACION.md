---
title: "Reconocimiento y Enumeración: Midiendo el Muro"
level: "avanzado"
content_type: "guia"
updated: "2026-06-29"
---

# Reconocimiento y Enumeración: Midiendo el Muro

## Objetivo de esta Guía

Aprender la habilidad más importante del hacking: recolectar información del objetivo sin ser detectado. El novato lanza exploits ciegamente esperando que funcionen. El profesional pasa semanas estudiando el objetivo antes de ejecutar un solo ataque.

El reconocimiento es la diferencia entre un ataque ruidoso que fracasa y un ataque quirúrgico que tiene éxito. Esta guía cubre OSINT (reconocimiento pasivo), enumeración activa con Nmap, evasion de firewalls, y como los atacantes convierten información pública en acceso no autorizado. El 90% del éxito de un ataque se juega en estas fases iniciales.

## La Analogía: Estudiando el Castillo

Te contratan para infiltrarte en el castillo del rey.

**Reconocimiento pasivo (OSINT):** Te sientas en una colina a 5 km con binoculares. Observas los guardias, sus uniformes, sus horarios. Lees los diarios para saber quien construyo el castillo. Nunca tocas las piedras. El rey no sabe que existes.

**Reconocimiento activo (Enumeración):** Bajas de noche. Tocas la puerta de madera para ver si suena hueca. Pruebas las ventanas para ver cuáles están sin seguro. El rey (el firewall) puede escucharte si haces ruido.

La diferencia es el nivel de interacción. La pasiva no genera tráfico hacia el objetivo. La activa si, y puede ser detectada.

## Reconocimiento Pasivo: El Arte del OSINT

OSINT (Open-Source Intelligence) es recolectar información usando solo fuentes públicas. No envías paquetes al objetivo. Todo viene de internet, bases de datos, y redes sociales.

### Fuentes Principales de OSINT

**Motores de Búsqueda:**
Búsquedas avanzadas con operadores:
- `site:empresa.com filetype:pdf confidencial` - encuentra PDFs internos expuestos.
- `site:empresa.com inurl:admin` - encuentra paneles de administración.
- `site:empresa.com intitle:"index of"` - encuentra directorios abiertos.
- `site:github.com empresa` - busca código filtrado en GitHub.
- `site:pastebin.com empresa` - busca filtraciones en Pastebin.

**LinkedIn:**
La joya del OSINT. Los empleados publican voluntariamente:
- Tecnologías que usan ("Administrador de sistemas Windows Server 2022, Exchange 2019").
- Proveedores y socios.
- Organigrama de la empresa.
- Proyectos internos.
- Oficinas y ubicaciones.

Un administrador que publica "Migre todos los servidores a AWS usando contenedores Docker" le regala al atacante el mapa de infraestructura sin ningún costo.

**Shodan:**
Motor de búsqueda de dispositivos conectados a internet. Busca tu IP objetivo y revela:
- Puertos abiertos.
- Servicios y versiones.
- Dispositivos IoT expuestos (cámaras, routers, sistemas de control).
- Certificados SSL.

**Wayback Machine (archive.org):**
Muestra versiones historicas del sitio web. Puedes encontrar:
- Versiones antiguas con vulnerabilidades.
- Información que ya no esta pública.
- Comentarios en HTML que revelan detalles internos.
- Archivos de respaldo que aún existen en el servidor.

**WHOIS:**
Registros de dominio que revelan:
- Nombre y contacto del propietario del dominio.
- Correos electrónicos de los administradores.
- Servidores DNS utilizados.
- Fechas de registro y vencimiento.

**GitHub:**
Repositorios públicos de empleados que pueden contener:
- Código fuente de la empresa.
- Configuraciones con credenciales.
- Scripts de automatización interna.
- Documentación técnica.

**HaveIBeenPwned / Filtraciones:**
Bases de datos de credenciales filtradas en breaches anteriores. Si encuentras correos de empleados en filtraciones, existen contraseñas comprometidas que probablemente se reutilizan.

### Herramientas de OSINT

**theHarvester:** Recolecta correos, subdominios, IPs, y nombres de fuentes públicas (Google, Bing, LinkedIn, Shodan, DNS).

```
theHarvester -d empresa.com -b google,linkedin,bing
```

**Recon-ng:** Framework modular con docenas de modulos para diferentes fuentes OSINT. Interfaz similar a Metasploit.

**Maltego:** Herramienta gráfica que visualiza relaciones entre entidades (personas, empresas, dominios, IPs, correos). Excelente para encontrar conexiones no obvias.

**Google Dorks:** Colecciones de consultas avanzadas para encontrar información sensible. Ejemplos comunes:
- `inurl:wp-config.php` - encuentra archivos de configuración de WordPress.
- `filetype:sql "INSERT INTO"` - encuentra bases de datos SQL expuestas.
- `intitle:"phpMyAdmin" "Welcome to phpMyAdmin"` - encuentra paneles de base de datos sin autenticación.

**Shodan CLI:** Interfaz de línea de comandos para buscar en Shodan.

## Enumeración Activa: Nmap y el Escaneo de Puertos

Una vez que atacar, necesitas acercarte al castillo. Un servidor no es una caja, es un edificio con 65,535 puertas TCP y 65,535 puertas UDP.

### Puertos Críticos

- 21 (FTP): Transferencia de archivos, inseguro por defecto.
- 22 (SSH): Acceso remoto a terminal.
- 23 (Telnet): Acceso remoto sin cifrar (inseguro).
- 25 (SMTP): Correo saliente.
- 53 (DNS): Resolución de nombres.
- 80 (HTTP): Servidor web.
- 443 (HTTPS): Servidor web cifrado.
- 445 (SMB): Archivos compartidos en Windows.
- 1433 (MSSQL): Base de datos Microsoft.
- 3306 (MySQL): Base de datos MySQL.
- 3389 (RDP): Escritorio remoto Windows.
- 5432 (PostgreSQL): Base de datos PostgreSQL.
- 8080 (HTTP-Alt): Servidor web alternativo.
- 8443 (HTTPS-Alt): Servidor web cifrado alternativo.

### Nmap: La Herramienta Legendaria

Nmap (Network Mapper) es el estándar de la industria para descubrimiento de redes y auditoría de seguridad.

**Comandos básicos:**

`nmap -sS 10.0.0.5` - Escaneo SYN sigiloso de los 1000 puertos más comunes.

`nmap -sS -p- 10.0.0.5` - Escanea los 65535 puertos.

`nmap -sS -sV -O 10.0.0.5` - Detecta versiones de servicios y sistema operativo.

`nmap -sU 10.0.0.5` - Escanea puertos UDP (mucho más lento).

`nmap -sn 10.0.0.0/24` - Descubre hosts activos sin escanear puertos (ping sweep).

**El Escaneo SYN (Stealth Scan):**

La opción `-sS` realiza un escaneo SYN, también llamado "stealth" o sigiloso:

1. Nmap envía un paquete SYN (como si quisiera iniciar una conexión).
2. Si el puerto esta abierto, el servidor responde SYN-ACK.
3. En lugar de completar la conexión con ACK, Nmap envía RST (reset).
4. Como nunca se completo el handshake TCP, la aplicación de destino no registra la conexión en sus logs.

Limitacion: Aunque evade logs de aplicaciones, los firewalls y sistemas de detección de intrusiones pueden detectar escaneos SYN.

### Tipos de Escaneo en Nmap

| Tipo | Opción | Descripción | Detección |
|------|--------|-------------|-----------|
| SYN Scan | `-sS` | No completa conexión TCP | Media (firewalls lo ven) |
| Connect Scan | `-sT` | Completa conexión TCP | Alta (logs de aplicación) |
| UDP Scan | `-sU` | Escanea puertos UDP | Baja (UDP no tiene handshake) |
| FIN Scan | `-sF` | Envía paquete FIN | Baja (firewalls no filtran FIN) |
| Xmas Scan | `-sX` | Envía FIN+PSH+URG | Baja |
| Null Scan | `-sN` | Sin banderas TCP | Baja |

### Detección de Versiones y SO

`nmap -sV 10.0.0.5` intenta determinar la versión exacta de cada servicio. Ejemplo de salida:

```
PORT     STATE SERVICE     VERSION
22/tcp   open  ssh         OpenSSH 8.9p1 Ubuntu 3
80/tcp   open  http        Apache httpd 2.4.54
3306/tcp open  mysql       MySQL 5.7.39
```

Con esta información, buscas en Exploit-DB o CVE si existen vulnerabilidades conocidas para esas versiones específicas.

`nmap -O 10.0.0.5` intenta detectar el sistema operativo basándose en las respuestas TCP/IP. No es 100% confiable pero da una buena orientacion.

### Evasion de Firewalls con Nmap

Los firewalls modernos detectan escaneos de Nmap. Para evadirlos:

**Fragmentacion (`-f`):**
Divide los paquetes en fragmentos más pequeños. El firewall puede no reensamblarlos para inspeccionar el contenido.

`nmap -sS -f 10.0.0.5`

**Decoys (`-D`):**
Agrega IPs falsas como origen. Confunde al firewall haciendole creer que múltiples hosts están escaneando.

`nmap -sS -D RND:10 10.0.0.5`

**Timing (`-T0` a `-T5`):**
Controla la velocidad. T0 es extremadamente lento (evita detección por umbrales). T5 es muy rápido (riesgo de perder paquetes).

`nmap -sS -T0 10.0.0.5`

**Source port (`-g`):**
Usa un puerto de origen confiable. Puertos como 53 (DNS) o 80 (HTTP) suelen tener menos restricciones.

`nmap -sS -g 53 10.0.0.5`

## Banners: Leyendo las Etiquetas

Banner grabbing es obtener la presentación del servicio. Cuando te conectas a un puerto, el servicio suele decir quien es.

**Manual con Netcat:**
```
nc 10.0.0.5 22
SSH-2.0-OpenSSH_8.9p1 Ubuntu-3
```

**Automático con Nmap:**
```
nmap -sV --script=banner 10.0.0.5
```

### Defensa contra Banner Grabbing

Si eres defensor, deshabilita los banners. Configura el servidor para que responda genérico:

- En Apache: `ServerTokens Prod` y `ServerSignature Off`.
- En SSH: `DebianBanner no` y modificar el banner.
- En Nginx: `server_tokens off;`.

Un servidor que responde "Hola" en lugar de "Hola, soy Apache 2.4.54" obliga al atacante a trabajar a ciegas.

## Enumeración de Aplicaciones Web

Más allá de puertos, la enumeración web incluye:

**Descubrimiento de directorios:** Buscar rutas ocultas en el servidor web.

```
gobuster dir -u http://empresa.com -w /usr/share/wordlists/dirb/common.txt
```

**Identificación de CMS:** Detectar WordPress, Joomla, Drupal.

```
wpscan --url http://empresa.com
```

**Análisis de headers HTTP:**
```
curl -I http://empresa.com
```
Headers revelan: `Server`, `X-Powered-By`, `Set-Cookie` (indica tecnología de sesión).

## Casos Reales

### LinkedIn que Revelo Todo (2019)

Un Red Team encontró en LinkedIn que el CTO público: "Implementé infraestructura AWS con contenedores Docker." Investigaron y encontraron un bucket S3 mal configurado con datos internos. Sin enviar un paquete a la red de la empresa.

### GitHub (2020)

Un atacante encontró un repositorio público de un empleado con configuraciones de producción que contenian credenciales de base de datos. Accedio y extrajo datos de clientes.

### Shodan y SCADA (2021)

Un investigador uso Shodan para encontrar una planta de tratamiento de agua con paneles SCADA accesibles sin contraseña. El operador no sabia que estaba expuesto a internet.

### Escaneo que se Escaló (2022)

Un tester escaneo un objetivo sin coordinar con el Blue Team. El IDS bloqueo automáticamente su IP a nivel de ISP, interrumpiendo todo el tráfico de su oficina.

## Modos de Falla

Apresurar el reconocimiento. Depender de una sola fuente. Ignorar la evasion (escaneos ruidosos). No documentar hallazgos. Confiar ciegamente en herramientas automáticas (el banner puede ser falso).

## Autoevaluación

1. Usas Nmap pero el firewall bloquea todo. Cambias a WHOIS. Es pasivo o activo?
2. Encuentras puerto 3306 abierto. Haces banner grabbing y ves MySQL 5.7. Que fase completaste?
3. Por qué el SYN scan puede no dejar logs en aplicaciones? Que tipo de logs SI lo registran?
4. Encuentras en un foro código fuente del servidor de tu cliente con una vulnerabilidad. Es trampa o hacking válido?
5. Nmap con `-D RND:10` - que hace y para que sirve?
6. Encuentras un bucket S3 abierto con backups de BD. Accedes? Que riesgos legales?
7. Un admin configura el banner como "Apache 2.2.3" cuando es 2.4.54 parcheado. Es seguridad por oscuridad suficiente? Que debería complementarlo?
8. Encuentras `/backup/` en el servidor web con archivos .sql de clientes. Los descargas para incluir en el reporte? Que implicaciones tiene?

## Fases del Reconocimiento Detalladas

### Reconocimiento Pasivo

Se realiza sin interactuar directamente con el objetivo. El objetivo no sabe que lo están investigando.

**OSINT (Open Source Intelligence):**
- Google Dorks: Búsquedas avanzadas en Google para encontrar información expuesta. Operadores: site:, filetype:, intitle:, inurl:, link:.
- Shodan: Motor de búsqueda de dispositivos conectados a internet (servidores, routers, cámaras, IoT).
- Censys: Similar a Shodan pero más orientado a certificados SSL/TLS y configuraciones de servidores.
- ZoomEye: Motor de búsqueda de activos de red.
- Have I Been Pwned: Verificar si correos electrónicos han sido comprometidos en filtraciones de datos.
- Dehashed: Búsqueda en bases de datos filtradas.
- Hunter.io: Encontrar correos electrónicos asociados a un dominio.
- BuiltWith: Identificar tecnologías usadas por el objetivo (CMS, frameworks, analytics).

**Recolección pasiva de WHOIS/DNS:**
- whois: Información de registro de dominios (titular, creador, DNS, contacto).
- nslookup/dig: Consultas DNS (registros A, AAAA, MX, TXT, CNAME, NS).
- DNSDumpster: Mapeo visual de relaciones DNS.
- Certificate Transparency (crt.sh): Certificados SSL emitidos para el dominio y subdominios.

### Reconocimiento Activo

Se interactúa directamente con el objetivo. Existe riesgo de detección.

**Escaneo de puertos con Nmap:**

Tipos de escaneo:
- SYN Scan (-sS): Escaneo sigiloso (no completa el handshake TCP). Rápido y menos detectable.
- Connect Scan (-sT): Completa el handshake TCP. Más detectable pero no requiere privilegios.
- UDP Scan (-sU): Escaneo de puertos UDP (lento pero necesario para DNS, SNMP, DHCP).
- FIN/Null/Xmas Scan: Técnicas de evasion para firewalls.
- Idle Scan (-sI): Escaneo usando un "zombie" para ocultar la IP real.

Scripts NSE (Nmap Scripting Engine):
- http-enum: Enumeración de directorios y archivos en servidores web.
- http-title: Obtiene el título de la página web.
- smb-enum-shares: Enumeración de recursos compartidos SMB.
- smb-os-discovery: Identifica sistema operativo via SMB.
- dns-zone-transfer: Intenta transferencia de zona DNS.
- ssl-cert: Obtiene información del certificado SSL.

## Enumeración de Servicios Específicos

### Enumeración de Active Directory

Herramientas y técnicas:
- BloodHound: Mapea relaciones entre usuarios, grupos, equipos, y recursos en AD para identificar rutas de escalacion de privilegios.
- ldapsearch: Consultas LDAP al controlador de dominio para extraer información de usuarios y grupos.
- PowerView: Script de PowerShell para enumeración de AD.
- ADExplorer: Herramienta gráfica de Sysinternals para explorar AD.

Información a enumerar:
- Usuarios del dominio (incluyendo administradores y cuentas de servicio).
- Grupos de seguridad (Domain Admins, Enterprise Admins, grupos anidados).
- Políticas de contraseñas (longitud mínima, expiracion, historial).
- Unidades Organizativas (OU) para entender la estructura organizativa.
- Equipos unidos al dominio.
- Relaciones de confianza con otros dominios/forests.
- ACLs y permisos delegados.

### Enumeración de Servicios Web

**HTTP/HTTPS:**
- whatweb: Identifica tecnologías web, versiones de CMS, frameworks JS.
- dirb/gobuster/dirsearch: Fuerza bruta de directorios y archivos en servidores web.
- wpscan: Escaneo de seguridad de sitios WordPress (plugins, temas, usuarios).
- nikto: Escáner de vulnerabilidades de servidores web (archivos peligrosos, configuraciones incorrectas, versiones desactualizadas).
- wafw00f: Identifica si hay WAF y de que tipo.

**robots.txt y sitemap.xml:**
Archivos que los administradores usan para guiar a los crawlers pero que a menudo revelan rutas sensibles.

## Técnicas de Evasion de WAF/Firewalls

**Fragmentacion:** Dividir el payload en varios paquetes TCP para evitar la inspeccion completa del paquete.

**Codificación URL:** Codificar caracteres especiales del payload en formato URL (%27 para ', %3C para <, %3E para >).

**HTTP Parameter Pollution:** Enviar el mismo parámetro multiple veces para confundir los filtros.

**Case Swapping:** Alternar mayúsculas/minusculas en el payload (ej: SeLeCt * FrOm UsErS).

**Usar métodos HTTP alternativos:** PUT, DELETE, OPTIONS en lugar de GET/POST para evadir reglas que solo inspeccionan estos métodos.

**Usar HTTPS:** Si el WAF no inspecciona tráfico SSL/TLS.

## Preguntas Adicionales

9. Durante la fase de enumeración, encuentras un servidor web que responde en el puerto 8080 pero no aparece en los registros DNS públicos. El cliente no menciono este servidor en el alcance. Que haces?
10. El escaneo de puertos revela que el objetivo tiene un firewall que bloquea paquetes SYN. Que técnicas de Nmap usarías para evadir el firewall y determinar que puertos están abiertos?
11. Durante la enumeración de Active Directory con BloodHound, encuentras una ruta de escalacion que permite a cualquier usuario del dominio convertirse en Domain Admin. Que tan urgente es reportar esto y por qué?
12. Encuentras un bucket S3 de AWS abierto al público durante el reconocimiento. El bucket contiene archivos de configuración con credenciales. El cliente no menciono AWS en el alcance. Como procedes?

## Herramientas de OSINT Avanzado

### Motores de Búsqueda Especializados

**Shodan:** Busca dispositivos conectados a internet. Filtros utiles: port, country, city, org, product, vuln. Ejemplo: `port:3389 country:MX` para encontrar servidores RDP en México.

**Censys:** Similar a Shodan pero con enfoque en certificados SSL. Ideal para encontrar subdominios via certificate transparency. Ejemplo: Buscar todos los certificados emitidos para `*.example.com`.

**GreyNoise:** Identifica si una IP es parte de escaneo masivo de internet o es un ataque dirigido. Ayuda a filtrar ruido en los logs de SIEM.

**ONYPHE:** Motor de búsqueda que recolecta datos de fuentes como shodan, censys, y fuentes de inteligencia de amenazas.

### Google Dorks Avanzados

Combinaciones de operadores para encontrar información sensible:

```
site:example.com intitle:"index of" (pdf|doc|xls)
site:example.com filetype:sql "INSERT INTO" "password"
site:example.com inurl:wp-content/uploads filetype:pdf
site:example.com ext:xml inurl:config
site:example.com intitle:"phpMyAdmin" "Welcome to phpMyAdmin"
site:example.com "UNION SELECT" inurl:search
site:example.com "password" filetype:env
site:example.com "SECRET_KEY" OR "API_KEY" OR "ACCESS_KEY"
site:example.com "-----BEGIN RSA PRIVATE KEY-----"
```

### OSINT de Redes Sociales

**LinkedIn:** Identificar empleados, roles, tecnologías que usa la empresa, relaciones entre personal. Buscar ex-empleados que puedan tener acceso residual.

**GitHub:** Buscar código, configuraciones, tokens, y credenciales filtradas por empleados de la empresa objetivo. Operadores: `org:example.com password`, `"example.com" "aws_secret_access_key"`.

**Twitter:** Menciones de la empresa, quejas de clientes (pueden revelar vulnerabilidades), empleados que publican sobre su trabajo y revelan tecnologías.

## Enumeración Web Detallada

### Identificación de Tecnologías

**whatweb:** Identifica CMS, servidores web, frameworks JS, librerías, y sus versiones.

**BuiltWith:** Perfil tecnológico completo del sitio: hosting, CDN, analytics, frameworks, CMS, librerías JS, certificados SSL.

**Wappalyzer:** Extensión de navegador que identifica tecnologías en tiempo real.

**Retire.js:** Detecta librerías JS con vulnerabilidades conocidas.

### Fuzzing de Directorios y Archivos

Herramientas: dirb, gobuster, dirsearch, ffuf.

Wordlists populares:
- SecLists: La colección más completa de wordlists para fuzzing.
- DirBuster Lists: Wordlists incluidas con OWASP ZAP.
- Common.txt: La más básica y rápida.
- raft-large-words.txt: Wordlist extensisima para búsquedas exhaustivas.

Extensiones a probar: .php, .asp, .aspx, .jsp, .do, .action, .html, .htm, .txt, .xml, .json, .config, .bak, .old, .swp, .save.

### Enumeración de Parámetros

Herramientas: Arjun, ParamSpider, ffuf.

Buscar parámetros ocultos en endpoints web. Los desarrolladores a menudo anaden parámetros de depuracion o funcionalidades ocultas que no están documentadas.

## Preguntas Adicionales

13. Durante el reconocimiento activo, tu escaneo de Nmap es detectado por el IDS del objetivo. Que implicaciones tiene esto para el resto de la prueba? Como modificas tu enfoque?
14. Encuentras un bucket S3 configurado como público durante la enumeración. Contiene archivos de configuración con claves de API. El cliente no menciono AWS en el alcance. Como procedes ética y profesionalmente?
15. Después de 3 días de OSINT, tienes suficiente información para lanzar un ataque de phishing dirigido. Que información usarías para hacer el phishing más convincente? Como priorizas los objetivos?
16. Utilizando Google Dorks encuentras un archivo de base de datos expuesto en un servidor público. El archivo contiene 10,000 registros de clientes. Cual es tu siguiente paso?
