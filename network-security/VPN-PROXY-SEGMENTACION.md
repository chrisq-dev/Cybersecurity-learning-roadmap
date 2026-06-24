# VPN, Proxy y Segmentacion

## Objetivo

Entender controles de acceso remoto, salida a internet y separacion de redes.

Estos controles definen como entran usuarios remotos, como salen sistemas a internet y como se limita el movimiento dentro de la red. Son temas esenciales para reducir impacto cuando una cuenta, laptop, servidor o aplicacion se compromete.

## Modelo Mental

```text
identidad -> dispositivo -> acceso -> segmento -> permiso -> log
```

Una arquitectura madura no pregunta solo "esta conectado a la VPN?". Pregunta:

- quien es el usuario;
- desde que dispositivo entra;
- que postura tiene el dispositivo;
- a que segmento necesita llegar;
- que puertos requiere;
- que se registra;
- que se bloquea por defecto.

## VPN

Una VPN crea un canal cifrado hacia una red o servicio.

Usos:

- Acceso remoto.
- Conexion site-to-site.
- Administracion segura.

Riesgos:

- Sin MFA.
- Acceso plano a toda la red.
- Usuarios antiguos activos.
- Clientes sin postura de seguridad.

Controles:

- MFA.
- Acceso por rol.
- Segmentacion.
- Logs.
- Device compliance.

Una VPN no debe significar "ya estas dentro de todo". El acceso remoto debe seguir minimo privilegio: entrar solo a los sistemas necesarios, con identidad fuerte y registro.

Modelo debil:

```text
Usuario remoto -> VPN -> Toda la red interna
```

Modelo mejor:

```text
Usuario remoto -> VPN con MFA -> Segmento segun rol -> Sistemas necesarios
```

## VPN Site-to-Site vs Acceso Remoto

### Acceso remoto

Un usuario se conecta desde su dispositivo hacia recursos internos.

Riesgos:

- credenciales robadas;
- dispositivo infectado;
- falta de MFA;
- acceso excesivo.

### Site-to-site

Conecta redes completas entre oficinas, cloud o proveedores.

Riesgos:

- confianza excesiva entre redes;
- rutas demasiado amplias;
- proveedor comprometido;
- falta de monitoreo este-oeste.

En ambos casos, la VPN cifra el canal, pero no reemplaza segmentacion ni autorizacion.

## Proxy

Un proxy intermedia trafico, normalmente web.

Puede ayudar a:

- Filtrar URLs.
- Registrar navegacion.
- Bloquear categorias.
- Inspeccionar trafico segun politica.

Un proxy ayuda a controlar salida a internet. Es util para reducir acceso a sitios maliciosos, detectar descargas sospechosas y tener visibilidad de navegacion corporativa segun politica.

Riesgos:

- Usuarios saltandolo con redes externas.
- Falta de logs.
- Reglas demasiado permisivas.
- Inspeccion TLS mal comunicada o mal configurada.

## Proxy Directo y Proxy Reverso

### Proxy directo

Intermedia salida de usuarios o sistemas hacia internet.

Ejemplo:

```text
usuario -> proxy -> internet
```

Usos:

- filtrar URLs;
- registrar navegacion;
- aplicar politicas;
- bloquear descargas peligrosas.

### Proxy reverso

Intermedia entrada desde usuarios externos hacia una aplicacion interna.

Ejemplo:

```text
internet -> reverse proxy -> aplicacion
```

Usos:

- TLS termination;
- balanceo;
- WAF;
- autenticacion centralizada;
- ocultar infraestructura interna.

No confundas ambos. Uno controla salida; el otro controla entrada hacia servicios.

## Egress Filtering

Controlar trafico saliente.

Importa porque:

- Malware necesita comunicarse.
- Exfiltracion usa salida.
- SSRF puede abusar salida del servidor.

Ejemplo:

```text
Servidor web puede salir a internet por 443 solo a servicios necesarios.
Servidor web no puede conectarse libremente a cualquier IP interna.
```

Egress filtering es importante porque muchas organizaciones solo piensan en bloquear entrada. Un atacante que ya logro ejecutar codigo necesita salida para descargar herramientas, comunicarse o sacar datos.

Ejemplo de politica:

```text
Servidor de aplicacion puede salir a proveedor de pagos por 443.
Servidor de aplicacion no puede conectarse por SSH a internet.
Base de datos no inicia conexiones a internet.
```

Egress filtering reduce:

- command and control;
- descarga de herramientas;
- exfiltracion;
- abuso de SSRF;
- conexiones inesperadas desde servidores.

## DMZ

Zona para sistemas expuestos, separada de red interna.

Ejemplo:

- Web publico en DMZ.
- Base de datos en red interna.
- Admin desde red separada.

Una DMZ reduce impacto porque un sistema expuesto no queda en la misma zona que datos internos. No significa que el sistema de DMZ sea confiable; significa que se asume mayor riesgo y se limita lo que puede alcanzar.

## Segmentacion

Separar por funcion y riesgo:

- Usuarios.
- Servidores.
- Admin.
- Invitados.
- Produccion.
- Desarrollo.

La segmentacion responde una pregunta clave:

```text
Si este activo cae, que mas puede alcanzar?
```

No basta con crear VLANs. La segmentacion existe de verdad cuando hay reglas, logs y revisiones.

## Microsegmentacion

Segmentacion clasica separa redes grandes. Microsegmentacion busca controlar comunicacion entre cargas o servicios especificos.

Ejemplo:

```text
frontend solo habla con backend
backend solo habla con database
database no inicia conexiones a internet
```

En cloud o Kubernetes esto puede implementarse con security groups, network policies, service mesh o politicas equivalentes.

La microsegmentacion es especialmente util cuando muchos servicios viven en la misma nube, cluster o red virtual. En vez de confiar en que "todo backend puede hablar con todo", define relaciones concretas.

## Zonas Sugeridas

| Zona | Ejemplos | Controles |
| --- | --- | --- |
| Usuarios | Laptops, estaciones | EDR, proxy, acceso limitado |
| Servidores | Apps internas | Firewall interno, hardening, logs |
| DMZ | Servicios publicos | WAF, monitoreo, acceso restringido a interno |
| Datos | Bases, storage sensible | Acceso solo desde apps autorizadas |
| Administracion | Jump boxes, consolas | MFA, PAM, logging fuerte |
| Invitados/IoT | Visitantes, dispositivos no confiables | Internet solamente o acceso minimo |

## Errores Comunes

- VPN sin MFA.
- VPN que da acceso plano a toda la red.
- Proxy sin monitoreo.
- Servidores con salida libre a internet.
- DMZ con acceso excesivo a bases internas.
- Segmentos definidos en diagrama pero no aplicados en reglas.
- Reglas temporales que nunca expiran.

## Ejemplo de Diseno de Acceso

Ejemplo de diseno de acceso remoto para administradores:

- Quien entra?
- MFA?
- A que segmento?
- Que puertos?
- Que logs?
- Que pasa si el dispositivo no cumple?

Diseno razonable:

| Pregunta | Respuesta esperada |
| --- | --- |
| Quien entra? | Administradores nominales |
| MFA? | Obligatorio |
| Dispositivo | Corporativo y saludable |
| Segmento | Administracion |
| Acceso | Jump box, no red completa |
| Logs | VPN, jump box, comandos criticos |
| Incumplimiento | Bloquear o acceso limitado |

## Patrones de Arquitectura

### Patron debil

```text
VPN -> red completa -> servidores y usuarios
```

Problema:

Una cuenta VPN comprometida puede explorar demasiado.

### Patron mejor

```text
VPN con MFA -> segmento por rol -> jump box -> sistemas necesarios
```

Ventaja:

La identidad, el dispositivo y el rol limitan alcance.

### Patron para aplicaciones publicas

```text
internet -> WAF/reverse proxy -> app -> database
```

La base de datos no debe exponerse directamente a internet ni a usuarios.

## Logs Importantes

Para VPN:

- usuario;
- IP origen;
- hora de conexion;
- MFA exitoso o fallido;
- dispositivo;
- IP asignada;
- bytes transferidos;
- desconexion.

Para proxy:

- usuario o IP;
- URL o dominio;
- categoria;
- accion;
- bytes;
- user-agent;
- reputacion.

Para segmentacion:

- regla aplicada;
- origen;
- destino;
- puerto;
- accion;
- zona.

Sin logs, estos controles son dificiles de auditar.

## Preguntas de Comprension

- Que debe poder hacer un usuario al conectarse por VPN?
- Que no deberia poder hacer?
- Que trafico saliente necesita una app y cual seria sospechoso?
- Que diferencia hay entre segmentacion y microsegmentacion?
- Como separarias usuarios, servidores, invitados y administracion?

## Criterio de Dominio

Puedes avanzar cuando puedas:

- Explicar VPN.
- Explicar proxy.
- Explicar DMZ.
- Explicar egress filtering.
- Diseñar segmentacion basica.
- Explicar por que VPN no debe dar acceso plano.
- Proponer zonas de red con reglas razonables.
