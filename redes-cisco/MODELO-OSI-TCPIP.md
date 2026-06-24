# Modelo OSI y TCP/IP

## Objetivo

Entender como se divide la comunicacion de red en capas y por que ese modelo ayuda a diagnosticar problemas, explicar trafico y analizar incidentes de seguridad.

El modelo OSI no se estudia para recitar siete nombres en una entrevista. Se estudia porque ordena el pensamiento. Cuando algo no funciona o parece sospechoso, las capas te ayudan a preguntar donde esta el problema: cable, Wi-Fi, MAC, IP, puerto, TLS, DNS, HTTP, aplicacion o usuario.

## Idea Principal

Una comunicacion de red no es una sola accion. Es una cadena de responsabilidades.

```text
aplicacion -> datos -> transporte -> IP -> enlace -> medio fisico
```

Si una parte falla, la comunicacion completa puede fallar. Si una parte esta mal protegida, puede crear riesgo.

## Por Que Existen Capas

Las capas separan responsabilidades.

Ejemplo: cuando visitas una pagina web, no todo ocurre en un solo bloque. Hay partes encargadas de:

- transmitir bits por cable o Wi-Fi;
- identificar equipos dentro de la red local;
- enrutar paquetes entre redes;
- conectar procesos por puertos;
- cifrar datos;
- interpretar HTTP;
- ejecutar logica de aplicacion.

Separar por capas ayuda a preguntar:

- El problema es fisico?
- Es de red local?
- Es de IP?
- Es de ruta?
- Es de puerto?
- Es de TLS?
- Es de DNS?
- Es de HTTP?
- Es de aplicacion?

En seguridad, esa separacion evita conclusiones apresuradas. Un error `403` no es un problema de firewall. Un timeout TCP no es lo mismo que un error HTTP. Un DNS que resuelve a una IP rara no significa que el puerto este abierto.

## Modelo OSI

El modelo OSI tiene siete capas. En redes reales muchas tecnologias mezclan responsabilidades, pero el modelo sigue siendo util para razonar.

### Capa 1: Fisica

Transmite bits por cable, fibra, radio o señales electricas.

Ejemplos:

- cable Ethernet;
- fibra;
- Wi-Fi;
- puertos fisicos;
- señal.

Problemas comunes:

- cable desconectado;
- señal Wi-Fi debil;
- puerto fisico dañado;
- interferencia;
- velocidad o duplex mal negociado.

En seguridad:

- acceso fisico puede permitir conectar dispositivos no autorizados;
- Wi-Fi expone medio compartido por radio;
- puertos fisicos sin control pueden habilitar acceso interno.

### Capa 2: Enlace de Datos

Comunica equipos dentro de la misma red local.

Conceptos:

- MAC address;
- switch;
- VLAN;
- ARP;
- tramas Ethernet.

Problemas comunes:

- VLAN incorrecta;
- loops de switching;
- problemas de ARP;
- MAC flapping;
- puertos mal configurados.

En seguridad:

- ARP spoofing puede manipular trafico local;
- VLANs mal configuradas pueden romper segmentacion;
- puertos sin control pueden permitir dispositivos no autorizados;
- ataques locales suelen vivir en esta capa.

### Capa 3: Red

Permite comunicacion entre redes.

Conceptos:

- IP;
- router;
- gateway;
- ICMP;
- rutas;
- subredes.

Problemas comunes:

- IP incorrecta;
- mascara incorrecta;
- gateway incorrecto;
- ruta faltante;
- conflicto de IP;
- bloqueo ICMP.

En seguridad:

- reglas de firewall suelen depender de IP origen/destino;
- logs de red usan IPs;
- segmentacion depende de subredes;
- NAT puede complicar atribucion.

### Capa 4: Transporte

Maneja comunicacion entre procesos usando puertos.

Protocolos:

- TCP;
- UDP.

Problemas comunes:

- puerto cerrado;
- servicio caido;
- firewall bloqueando;
- timeout;
- reset;
- UDP sin respuesta.

En seguridad:

- escaneos de puertos observan esta capa;
- servicios expuestos viven en puertos;
- firewalls permiten o bloquean segun protocolo y puerto;
- conexiones salientes pueden indicar actividad maliciosa.

### Capa 5: Sesion

Gestiona sesiones de comunicacion. En la practica moderna muchas funciones de sesion se mezclan con TLS, HTTP, aplicaciones o librerias.

Ejemplos:

- mantener una sesion activa;
- reconectar;
- controlar estado de comunicacion.

En seguridad:

- sesiones mal gestionadas pueden permitir secuestro o reutilizacion;
- timeouts incorrectos aumentan riesgo;
- sesiones sin invalidacion pueden quedar activas despues de logout.

### Capa 6: Presentacion

Define formato, codificacion, compresion y cifrado.

Ejemplos:

- TLS;
- JSON;
- XML;
- Base64;
- compresion;
- encoding.

En seguridad:

- TLS protege datos en transito;
- encoding puede ocultar payloads;
- parseo incorrecto puede crear vulnerabilidades;
- formatos complejos pueden ampliar superficie de ataque.

### Capa 7: Aplicacion

Protocolos usados directamente por aplicaciones.

Ejemplos:

- HTTP;
- DNS;
- SMTP;
- SSH;
- FTP;
- SMB.

En seguridad:

- aqui aparecen muchas vulnerabilidades web;
- autenticacion y autorizacion suelen vivir aqui;
- logs de aplicacion dan contexto;
- errores HTTP ayudan a diagnosticar comportamiento.

## Modelo TCP/IP

El modelo TCP/IP es mas usado en redes reales y agrupa algunas capas OSI.

| TCP/IP | OSI Aproximado | Ejemplos |
| --- | --- | --- |
| Aplicacion | 5-7 | HTTP, DNS, SSH, SMTP |
| Transporte | 4 | TCP, UDP |
| Internet | 3 | IP, ICMP |
| Acceso a red | 1-2 | Ethernet, Wi-Fi |

No necesitas pelear por si un protocolo pertenece exactamente a una capa. Necesitas entender que problema resuelve y que evidencia deja.

## Ejemplo: Abrir una Web

Visitas:

```text
https://example.com
```

Flujo:

1. El navegador interpreta la URL.
2. DNS resuelve el nombre a una IP.
3. Tu equipo revisa si el destino esta en su red local.
4. Si no esta local, envia trafico al gateway.
5. Se establece conexion TCP al puerto 443.
6. Se negocia TLS.
7. El navegador envia una peticion HTTP.
8. El servidor responde.
9. El navegador procesa HTML, CSS, JavaScript e imagenes.

Vista por capas:

| Paso | Capa aproximada |
| --- | --- |
| Wi-Fi/Ethernet transmite bits | 1-2 |
| ARP resuelve MAC local | 2 |
| IP enruta hacia destino | 3 |
| TCP conecta al puerto 443 | 4 |
| TLS cifra comunicacion | 6 |
| HTTP pide recurso | 7 |

## Diagnostico por Capas

Si una web no carga, puedes pensar asi:

- Capa 1: hay cable, Wi-Fi o señal?
- Capa 2: estoy en la VLAN correcta?
- Capa 3: tengo IP, mascara, gateway y ruta?
- Capa 4: el puerto 443 responde?
- Capa 6: TLS negocia correctamente?
- Capa 7: el servidor responde HTTP?

Ejemplos:

```text
ping 8.8.8.8 funciona, pero dig falla -> probable problema DNS.
dig funciona, pero curl timeout -> posible bloqueo de puerto, ruta o servicio caido.
curl responde 403 -> red funciona; el problema es autorizacion o politica de aplicacion.
curl responde certificado invalido -> problema TLS o inspeccion.
```

## Capas y Controles de Seguridad

| Capa | Control comun |
| --- | --- |
| Fisica | control de acceso a puertos, salas y cableado |
| Enlace | VLANs, port security, DHCP snooping |
| Red | routing, ACLs, firewalls, segmentacion |
| Transporte | filtrado por puerto, stateful firewall |
| Presentacion | TLS, certificados, configuracion criptografica |
| Aplicacion | autenticacion, autorizacion, validacion, WAF, logging |

La defensa madura combina controles en varias capas.

## Herramientas y Que Observan

| Herramienta | Ayuda a ver |
| --- | --- |
| `ip addr` | interfaces e IPs |
| `ip route` | rutas y gateway |
| `ping` | conectividad ICMP basica |
| `traceroute` | saltos hacia destino |
| `dig` | resolucion DNS |
| `curl -I` | respuesta HTTP y headers |
| `ss -tuln` | puertos escuchando |
| `tcpdump` | paquetes en red |

No uses herramientas sobre redes ajenas sin permiso. Para aprender, trabaja en tus equipos o laboratorios autorizados.

## Errores Comunes

- Memorizar capas sin saber usarlas.
- Decir "fallo la red" cuando el problema es HTTP.
- Confundir DNS con conectividad.
- Confundir firewall con autenticacion.
- No revisar gateway o ruta.
- Ignorar TLS al diagnosticar HTTPS.
- Pensar que una capa segura protege todas las demas.

## Criterio de Dominio

Dominas este tema cuando puedes:

- explicar las capas OSI con ejemplos;
- mapear OSI a TCP/IP;
- describir que ocurre al abrir una pagina web;
- diagnosticar un fallo por capas;
- diferenciar problemas de DNS, TCP, TLS y HTTP;
- ubicar controles de seguridad en distintas capas;
- leer una evidencia de red y decir que capa ayuda a explicar.
