# Modelo OSI y TCP/IP

## Objetivo

Entender como se divide la comunicación de red en capas y por que ese modelo ayuda a diagnosticar problemas, explicar tráfico y analizar incidentes de seguridad.

El modelo OSI no se estudia para recitar siete nombres en una entrevista. Se estudia porque ordena el pensamiento. Cuando algo no funciona o parece sospechoso, las capas te ayudan a preguntar donde está el problema: cable, Wi-Fi, MAC, IP, puerto, TLS, DNS, HTTP, aplicación o usuario.

## Idea Principal

Una comunicación de red no es una sola acción. Es una cadena de responsabilidades.

```text
aplicacion -> datos -> transporte -> IP -> enlace -> medio fisico
```

Si una parte falla, la comunicación completa puede fallar. Si una parte está mal protegida, puede crear riesgo.

## Por Qué Existen Capas

Las capas separan responsabilidades.

Ejemplo: cuando visitas una página web, no todo ocurre en un solo bloque. Hay partes encargadas de:

- Transmitir bits por cable o Wi-Fi;
- Identificar equipos dentro de la red local;
- Enrutar paquetes entre redes;
- Conectar procesos por puertos;
- Cifrar datos;
- Interpretar HTTP;
- Ejecutar lógica de aplicación.

Separar por capas ayuda a preguntar:

- El problema es fisico?
- Es de red local?
- Es de IP?
- Es de ruta?
- Es de puerto?
- Es de TLS?
- Es de DNS?
- Es de HTTP?
- Es de aplicación?

En seguridad, esa separación evita conclusiones apresuradas. Un error `403` no es un problema de firewall. Un timeout TCP no es lo mismo que un error HTTP. Un DNS que resuelve a una IP rara no significa que el puerto este abierto.

## Modelo OSI

El modelo OSI tiene siete capas. En redes reales muchas tecnologías mezclan responsabilidades, pero el modelo sigue siendo útil para razonar.

### Capa 1: Fisica

Transmite bits por cable, fibra, radio o señales electricas.

Ejemplos:

- Cable Ethernet;
- Fibra;
- Wi-Fi;
- Puertos fisicos;
- Señal.

Problemas comunes:

- Cable desconectado;
- Señal Wi-Fi débil;
- Puerto fisico dañado;
- Interferencia;
- Velocidad o duplex mal negociado.

En seguridad:

- Acceso fisico puede permitir conectar dispositivos no autorizados;
- Wi-Fi expone medio compartido por radio;
- Puertos fisicos sin control pueden habilitar acceso interno.

### Capa 2: Enlace de Datos

Comunica equipos dentro de la misma red local.

Conceptos:

- MAC address;
- Switch;
- VLAN;
- ARP;
- Tramas Ethernet.

Problemas comunes:

- VLAN incorrecta;
- Loops de switching;
- Problemas de ARP;
- MAC flapping;
- Puertos mal configurados.

En seguridad:

- ARP spoofing puede manipular tráfico local;
- VLANs mal configuradas pueden romper segmentación;
- Puertos sin control pueden permitir dispositivos no autorizados;
- Ataques locales suelen vivir en esta capa.

### Capa 3: Red

Permite comunicación entre redes.

Conceptos:

- IP;
- Router;
- Gateway;
- ICMP;
- Rutas;
- Subredes.

Problemas comunes:

- IP incorrecta;
- Mascara incorrecta;
- Gateway incorrecto;
- Ruta faltante;
- Conflicto de IP;
- Bloqueo ICMP.

En seguridad:

- Reglas de firewall suelen depender de IP origen/destino;
- Logs de red usan IPs;
- Segmentación depende de subredes;
- NAT puede complicar atribución.

### Capa 4: Transporte

Maneja comunicación entre procesos usando puertos.

Protocolos:

- TCP;
- UDP.

Problemas comunes:

- Puerto cerrado;
- Servicio caido;
- Firewall bloqueando;
- Timeout;
- Reset;
- UDP sin respuesta.

En seguridad:

- Escaneos de puertos observan esta capa;
- Servicios expuestos viven en puertos;
- Firewalls permiten o bloquean según protocolo y puerto;
- Conexiones salientes pueden indicar actividad maliciosa.

### Capa 5: Sesión

Gestiona sesiones de comunicación. En la práctica moderna muchas funciones de sesión se mezclan con TLS, HTTP, aplicaciones o librerías.

Ejemplos:

- Mantener una sesión activa;
- Reconectar;
- Controlar estado de comunicación.

En seguridad:

- Sesiones mal gestionadas pueden permitir secuestro o reutilizacion;
- Timeouts incorrectos aumentan riesgo;
- Sesiones sin invalidacion pueden quedar activas después de logout.

### Capa 6: Presentacion

Define formato, codificacion, compresion y cifrado.

Ejemplos:

- TLS;
- JSON;
- XML;
- Base64;
- Compresion;
- Encoding.

En seguridad:

- TLS protege datos en transito;
- Encoding puede ocultar payloads;
- Parseo incorrecto puede crear vulnerabilidades;
- Formatos complejos pueden ampliar superficie de ataque.

### Capa 7: Aplicación

Protocolos usados directamente por aplicaciones.

Ejemplos:

- HTTP;
- DNS;
- SMTP;
- SSH;
- FTP;
- SMB.

En seguridad:

- Aqui aparecen muchas vulnerabilidades web;
- Autenticación y autorización suelen vivir aqui;
- Logs de aplicación dan contexto;
- Errores HTTP ayudan a diagnosticar comportamiento.

## Modelo TCP/IP

El modelo TCP/IP es más usado en redes reales y agrupa algunas capas OSI.

| TCP/IP | OSI Aproximado | Ejemplos |
| --- | --- | --- |
| Aplicación | 5-7 | HTTP, DNS, SSH, SMTP |
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
3. Tu equipo revisa si el destino está en su red local.
4. Si no está local, envia tráfico al gateway.
5. Se establece conexión TCP al puerto 443.
6. Se negocia TLS.
7. El navegador envia una petición HTTP.
8. El servidor responde.
9. El navegador procesa HTML, CSS, JavaScript e imágenes.

Vista por capas:

| Paso | Capa aproximada |
| --- | --- |
| Wi-Fi/Ethernet transmite bits | 1-2 |
| ARP resuelve MAC local | 2 |
| IP enruta hacia destino | 3 |
| TCP conecta al puerto 443 | 4 |
| TLS cifra comunicación | 6 |
| HTTP pide recurso | 7 |

## Diagnóstico por Capas

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
curl responde 403 -> red funciona; el problema es autorización o política de aplicacion.
curl responde certificado invalido -> problema TLS o inspeccion.
```

## Capas y Controles de Seguridad

| Capa | Control común |
| --- | --- |
| Fisica | control de acceso a puertos, salas y cableado |
| Enlace | VLANs, port security, DHCP snooping |
| Red | routing, ACLs, firewalls, segmentación |
| Transporte | filtrado por puerto, stateful firewall |
| Presentacion | TLS, certificados, configuración criptografica |
| Aplicación | autenticación, autorización, validación, WAF, logging |

La defensa madura combina controles en varias capas.

## Herramientas y Que Observan

| Herramienta | Ayuda a ver |
| --- | --- |
| `ip addr` | interfaces e IPs |
| `ip route` | rutas y gateway |
| `ping` | conectividad ICMP básica |
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
- Confundir firewall con autenticación.
- No revisar gateway o ruta.
- Ignorar TLS al diagnosticar HTTPS.
- Pensar que una capa segura protege todas las demas.

## Criterio de Dominio

Dominas este tema cuando puedes:

- Explicar las capas OSI con ejemplos;
- Mapear OSI a TCP/IP;
- Describir que ocurre al abrir una página web;
- Diagnosticar un fallo por capas;
- Diferenciar problemas de DNS, TCP, TLS y HTTP;
- Ubicar controles de seguridad en distintas capas;
- Leer una evidencia de red y decir que capa ayuda a explicar.
