# DNS, DHCP y NAT

## Objetivo

Entender tres servicios clave de redes: DNS, DHCP y NAT. Aparecen constantemente en troubleshooting, cloud, SOC, pentesting autorizado, administracion y respuesta a incidentes.

Estos tres temas explican preguntas básicas:

- DNS: cómo un nombre se convierte en IP?
- DHCP: cómo un equipo obtiene configuración de red?
- NAT: cómo muchas IPs internas salen a internet o publican servicios?

Si entiendes estos tres, puedes interpretar mejor logs, conexiones, exposición de servicios, phishing, malware, VPNs, cloud y firewalls.

## DNS

DNS traduce nombres a direcciones y otros datos.

Ejemplo:

```text
example.com -> 93.184.216.34
```

Sin DNS tendrias que recordar IPs. Con DNS, las aplicaciones pueden usar nombres estables aunque la infraestructura cambie.

## Por Qué DNS Importa

DNS aparece antes de muchas conexiones.

Flujo tipico:

```text
usuario escribe dominio -> equipo consulta DNS -> recibe IP -> intenta conexion
```

En seguridad, DNS ayuda a responder:

- Que dominio intento visitar un equipo;
- Si un malware busco command and control;
- Si un dominio parece phishing;
- Si hay tunneling o exfiltración;
- Si una configuración de correo está bien;
- Si un servicio apunta a la IP correcta.

## Tipos de Registros DNS

| Registro | Uso |
| --- | --- |
| A | Nombre a IPv4 |
| AAAA | Nombre a IPv6 |
| CNAME | Alias |
| MX | Servidores de correo |
| TXT | Texto, verificaciones, SPF, DKIM, DMARC |
| NS | Servidores autoritativos |
| SOA | Información administrativa de la zona |
| PTR | Resolucion inversa |

Ejemplos:

```text
www.example.com  A      93.184.216.34
mail.example.com MX     servidor de correo
example.com      TXT    verificación o política
```

## Flujo DNS Simplificado

1. La aplicación pide resolver un nombre.
2. El sistema revisa cache local.
3. Si no sabe, pregunta al resolver configurado.
4. El resolver consulta jerarquia DNS si no tiene cache.
5. Se obtiene respuesta.
6. El equipo intenta conectarse a la IP.

El resolver puede ser del proveedor, corporativo, público o local.

## Cache DNS

DNS usa cache para evitar consultar todo cada vez.

El TTL define cuanto tiempo puede guardarse una respuesta.

En seguridad:

- Cache puede explicar por que un equipo siguio usando una IP antigua;
- Dominios maliciosos pueden cambiar rápido;
- TTL muy bajo puede aparecer en infraestructura dinamica;
- Limpiar cache puede ayudar en troubleshooting.

## DNS en Seguridad

DNS ayuda a detectar:

- Malware contactando dominios raros;
- Exfiltración por DNS;
- Phishing;
- Dominios generados automaticamente;
- Typosquatting;
- Mala configuración de registros;
- Dominios recien creados;
- Subdominios sospechosos.

Ejemplo:

```text
host interno consulta x7d9a2.example-malicioso.tld cada 30 segundos
```

Eso puede indicar beaconing, DGA o comunicación automatizada.

## Comandos de Observación

En un entorno propio puedes observar DNS con:

```bash
dig example.com
dig MX example.com
dig TXT example.com
nslookup example.com
```

La meta es interpretar la respuesta:

- Que registro responde;
- Que IP aparece;
- Que servidor respondio;
- Si hay errores;
- Si hay registros relacionados con correo o verificación.

## DHCP

DHCP asigna configuración de red automaticamente.

Puede entregar:

- IP;
- Mascara;
- Gateway;
- DNS;
- Tiempo de concesion;
- Dominio local;
- Otras opciones.

Sin DHCP, tendrias que configurar cada equipo manualmente.

## Flujo DHCP

Flujo simplificado:

```text
Discover -> Offer -> Request -> Acknowledge
```

Significado:

- Discover: el cliente pregunta si hay servidor DHCP.
- Offer: el servidor ofrece una configuración.
- Request: el cliente solicita usar esa configuración.
- Acknowledge: el servidor confirma.

## Lease

Una concesion DHCP dura cierto tiempo. Al expirar, el cliente debe renovar.

En seguridad e investigación, DHCP ayuda a responder:

- Que equipo tenia cierta IP en cierto momento;
- Que MAC recibio una IP;
- Cuando se asigno;
- Cuando expiro;
- Que hostname reporto.

Sin logs DHCP, una IP interna puede ser difícil de atribuir históricamente.

## DHCP en Seguridad

Riesgos:

- Servidor DHCP falso;
- Asignacion de gateway malicioso;
- DNS malicioso;
- Red sin control de dispositivos;
- Falta de segmentación;
- Dificultad para atribuir IPs.

Controles:

- DHCP snooping;
- Segmentación;
- Monitoreo;
- Inventario de dispositivos;
- 802.1X cuando aplica;
- Alertas por servidores DHCP no autorizados.

## NAT

NAT traduce direcciones IP.

Uso común:

```text
192.168.1.10 -> router NAT -> IP pública -> internet
```

Muchos equipos internos pueden salir usando una o pocas IPs públicas.

## Source NAT

Cambia la IP origen. Es común para salida a internet.

Ejemplo:

```text
Origen interno: 192.168.1.10:51512
Despues de NAT: 203.0.113.5:40001
```

El puerto traducido ayuda a distinguir conexiones simultaneas.

## Destination NAT / Port Forwarding

Cambia destino para publicar un servicio interno.

Ejemplo:

```text
203.0.113.5:443 -> 192.168.10.20:443
```

Esto permite que internet llegue a un servicio interno. Es útil, pero aumenta exposición.

## NAT en Investigaciones

NAT importa porque:

- Puede ocultar muchas IPs internas detras de una IP pública;
- Logs deben conservar puertos y traducciones;
- Port forwarding expone servicios;
- Reglas mal hechas pueden publicar sistemas internos;
- Atribución requiere timestamps precisos.

Para investigar necesitas correlacionar:

- IP interna;
- Puerto origen interno;
- IP pública;
- Puerto traducido;
- Timestamp;
- Usuario o dispositivo;
- Destino externo.

## Ejemplo de Caso

Un proveedor reporta actividad sospechosa desde:

```text
203.0.113.5:40001 a las 10:15 UTC
```

Internamente, esa IP pública pertenece a tu NAT.

Para identificar el host real necesitas:

- Log NAT de esa hora;
- Puerto traducido `40001`;
- Zona horaria correcta;
- DHCP para mapear IP interna a dispositivo;
- Autenticación o EDR para mapear dispositivo a usuario.

Sin esos datos, solo sabes que salio de tu red, no de que equipo exacto.

## Errores Comunes

- Pensar que DNS y HTTP son lo mismo.
- Ignorar DNS en investigaciones.
- No guardar logs DHCP.
- No registrar traducciones NAT.
- Publicar servicios internos con port forwarding sin controles.
- Usar DNS público cuando se requiere resolucion interna.
- Asumir que una IP pública identifica a un solo host.
- No considerar zona horaria en logs.

## Criterio de Dominio

Dominas este tema cuando puedes:

- Explicar DNS y registros comunes;
- Interpretar una consulta DNS;
- Explicar DHCP y el flujo Discover/Offer/Request/Acknowledge;
- Explicar por que DHCP ayuda a atribuir IPs;
- Diferenciar Source NAT y Destination NAT;
- Explicar por que NAT complica investigaciones;
- Describir los riesgos de un DHCP falso;
- Entender por que DNS, DHCP y NAT son fuentes clave de evidencia.
