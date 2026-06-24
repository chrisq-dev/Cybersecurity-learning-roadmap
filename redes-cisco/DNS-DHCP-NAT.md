# DNS, DHCP y NAT

## Objetivo

Entender tres servicios clave de redes: DNS, DHCP y NAT. Aparecen constantemente en troubleshooting, cloud, SOC, pentesting autorizado, administracion y respuesta a incidentes.

Estos tres temas explican preguntas basicas:

- DNS: como un nombre se convierte en IP?
- DHCP: como un equipo obtiene configuracion de red?
- NAT: como muchas IPs internas salen a internet o publican servicios?

Si entiendes estos tres, puedes interpretar mejor logs, conexiones, exposicion de servicios, phishing, malware, VPNs, cloud y firewalls.

## DNS

DNS traduce nombres a direcciones y otros datos.

Ejemplo:

```text
example.com -> 93.184.216.34
```

Sin DNS tendrias que recordar IPs. Con DNS, las aplicaciones pueden usar nombres estables aunque la infraestructura cambie.

## Por Que DNS Importa

DNS aparece antes de muchas conexiones.

Flujo tipico:

```text
usuario escribe dominio -> equipo consulta DNS -> recibe IP -> intenta conexion
```

En seguridad, DNS ayuda a responder:

- que dominio intento visitar un equipo;
- si un malware busco command and control;
- si un dominio parece phishing;
- si hay tunneling o exfiltracion;
- si una configuracion de correo esta bien;
- si un servicio apunta a la IP correcta.

## Tipos de Registros DNS

| Registro | Uso |
| --- | --- |
| A | Nombre a IPv4 |
| AAAA | Nombre a IPv6 |
| CNAME | Alias |
| MX | Servidores de correo |
| TXT | Texto, verificaciones, SPF, DKIM, DMARC |
| NS | Servidores autoritativos |
| SOA | Informacion administrativa de la zona |
| PTR | Resolucion inversa |

Ejemplos:

```text
www.example.com  A      93.184.216.34
mail.example.com MX     servidor de correo
example.com      TXT    verificacion o politica
```

## Flujo DNS Simplificado

1. La aplicacion pide resolver un nombre.
2. El sistema revisa cache local.
3. Si no sabe, pregunta al resolver configurado.
4. El resolver consulta jerarquia DNS si no tiene cache.
5. Se obtiene respuesta.
6. El equipo intenta conectarse a la IP.

El resolver puede ser del proveedor, corporativo, publico o local.

## Cache DNS

DNS usa cache para evitar consultar todo cada vez.

El TTL define cuanto tiempo puede guardarse una respuesta.

En seguridad:

- cache puede explicar por que un equipo siguio usando una IP antigua;
- dominios maliciosos pueden cambiar rapido;
- TTL muy bajo puede aparecer en infraestructura dinamica;
- limpiar cache puede ayudar en troubleshooting.

## DNS en Seguridad

DNS ayuda a detectar:

- malware contactando dominios raros;
- exfiltracion por DNS;
- phishing;
- dominios generados automaticamente;
- typosquatting;
- mala configuracion de registros;
- dominios recien creados;
- subdominios sospechosos.

Ejemplo:

```text
host interno consulta x7d9a2.example-malicioso.tld cada 30 segundos
```

Eso puede indicar beaconing, DGA o comunicacion automatizada.

## Comandos de Observacion

En un entorno propio puedes observar DNS con:

```bash
dig example.com
dig MX example.com
dig TXT example.com
nslookup example.com
```

La meta es interpretar la respuesta:

- que registro responde;
- que IP aparece;
- que servidor respondio;
- si hay errores;
- si hay registros relacionados con correo o verificacion.

## DHCP

DHCP asigna configuracion de red automaticamente.

Puede entregar:

- IP;
- mascara;
- gateway;
- DNS;
- tiempo de concesion;
- dominio local;
- otras opciones.

Sin DHCP, tendrias que configurar cada equipo manualmente.

## Flujo DHCP

Flujo simplificado:

```text
Discover -> Offer -> Request -> Acknowledge
```

Significado:

- Discover: el cliente pregunta si hay servidor DHCP.
- Offer: el servidor ofrece una configuracion.
- Request: el cliente solicita usar esa configuracion.
- Acknowledge: el servidor confirma.

## Lease

Una concesion DHCP dura cierto tiempo. Al expirar, el cliente debe renovar.

En seguridad e investigacion, DHCP ayuda a responder:

- que equipo tenia cierta IP en cierto momento;
- que MAC recibio una IP;
- cuando se asigno;
- cuando expiro;
- que hostname reporto.

Sin logs DHCP, una IP interna puede ser dificil de atribuir historicamente.

## DHCP en Seguridad

Riesgos:

- servidor DHCP falso;
- asignacion de gateway malicioso;
- DNS malicioso;
- red sin control de dispositivos;
- falta de segmentacion;
- dificultad para atribuir IPs.

Controles:

- DHCP snooping;
- segmentacion;
- monitoreo;
- inventario de dispositivos;
- 802.1X cuando aplica;
- alertas por servidores DHCP no autorizados.

## NAT

NAT traduce direcciones IP.

Uso comun:

```text
192.168.1.10 -> router NAT -> IP publica -> internet
```

Muchos equipos internos pueden salir usando una o pocas IPs publicas.

## Source NAT

Cambia la IP origen. Es comun para salida a internet.

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

Esto permite que internet llegue a un servicio interno. Es util, pero aumenta exposicion.

## NAT en Investigaciones

NAT importa porque:

- puede ocultar muchas IPs internas detras de una IP publica;
- logs deben conservar puertos y traducciones;
- port forwarding expone servicios;
- reglas mal hechas pueden publicar sistemas internos;
- atribucion requiere timestamps precisos.

Para investigar necesitas correlacionar:

- IP interna;
- puerto origen interno;
- IP publica;
- puerto traducido;
- timestamp;
- usuario o dispositivo;
- destino externo.

## Ejemplo de Caso

Un proveedor reporta actividad sospechosa desde:

```text
203.0.113.5:40001 a las 10:15 UTC
```

Internamente, esa IP publica pertenece a tu NAT.

Para identificar el host real necesitas:

- log NAT de esa hora;
- puerto traducido `40001`;
- zona horaria correcta;
- DHCP para mapear IP interna a dispositivo;
- autenticacion o EDR para mapear dispositivo a usuario.

Sin esos datos, solo sabes que salio de tu red, no de que equipo exacto.

## Errores Comunes

- Pensar que DNS y HTTP son lo mismo.
- Ignorar DNS en investigaciones.
- No guardar logs DHCP.
- No registrar traducciones NAT.
- Publicar servicios internos con port forwarding sin controles.
- Usar DNS publico cuando se requiere resolucion interna.
- Asumir que una IP publica identifica a un solo host.
- No considerar zona horaria en logs.

## Criterio de Dominio

Dominas este tema cuando puedes:

- explicar DNS y registros comunes;
- interpretar una consulta DNS;
- explicar DHCP y el flujo Discover/Offer/Request/Acknowledge;
- explicar por que DHCP ayuda a atribuir IPs;
- diferenciar Source NAT y Destination NAT;
- explicar por que NAT complica investigaciones;
- describir los riesgos de un DHCP falso;
- entender por que DNS, DHCP y NAT son fuentes clave de evidencia.
