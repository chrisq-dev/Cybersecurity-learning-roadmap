# VPN, Proxy y Segmentación

## Objetivo

Entender controles de acceso remoto, salida a internet y separación de redes.

Estos controles definen como entran usuarios remotos, como salen sistemas a internet y como se limita el movimiento dentro de la red. Son temas esenciales para reducir impacto cuando una cuenta, laptop, servidor o aplicación se compromete.

## Modelo Mental

```text
identidad -> dispositivo -> acceso -> segmento -> permiso -> log
```

Una arquitectura madura no pregunta solo "está conectado a la VPN?". Pregunta:

- Quien es el usuario;
- Desde que dispositivo entra;
- Que postura tiene el dispositivo;
- A que segmento necesita llegar;
- Que puertos requiere;
- Que se registra;
- Que se bloquea por defecto.

## VPN

Una VPN crea un canal cifrado hacia una red o servicio.

Usos:

- Acceso remoto.
- Conexión site-to-site.
- Administracion segura.

Riesgos:

- Sin MFA.
- Acceso plano a toda la red.
- Usuarios antiguos activos.
- Clientes sin postura de seguridad.

Controles:

- MFA.
- Acceso por rol.
- Segmentación.
- Logs.
- Device compliance.

Una VPN no debe significar "ya estas dentro de todo". El acceso remoto debe seguir mínimo privilegio: entrar solo a los sistemas necesarios, con identidad fuerte y registro.

Modelo débil:

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

- Credenciales robadas;
- Dispositivo infectado;
- Falta de MFA;
- Acceso excesivo.

### Site-to-site

Conecta redes completas entre oficinas, cloud o proveedores.

Riesgos:

- Confianza excesiva entre redes;
- Rutas demasiado amplias;
- Proveedor comprometido;
- Falta de monitoreo este-oeste.

En ambos casos, la VPN cifra el canal, pero no reemplaza segmentación ni autorización.

## Proxy

Un proxy intermedia tráfico, normalmente web.

Puede ayudar a:

- Filtrar URLs.
- Registrar navegación.
- Bloquear categorías.
- Inspeccionar tráfico según política.

Un proxy ayuda a controlar salida a internet. Es útil para reducir acceso a sitios maliciosos, detectar descargas sospechosas y tener visibilidad de navegación corporativa según política.

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

- Filtrar URLs;
- Registrar navegación;
- Aplicar políticas;
- Bloquear descargas peligrosas.

### Proxy reverso

Intermedia entrada desde usuarios externos hacia una aplicación interna.

Ejemplo:

```text
internet -> reverse proxy -> aplicacion
```

Usos:

- TLS termination;
- Balanceo;
- WAF;
- Autenticación centralizada;
- Ocultar infraestructura interna.

No confundas ambos. Uno controla salida; el otro controla entrada hacia servicios.

## Egress Filtering

Controlar tráfico saliente.

Importa porque:

- Malware necesita comunicarse.
- Exfiltración usa salida.
- SSRF puede abusar salida del servidor.

Ejemplo:

```text
Servidor web puede salir a internet por 443 solo a servicios necesarios.
Servidor web no puede conectarse libremente a cualquier IP interna.
```

Egress filtering es importante porque muchas organizaciones solo piensan en bloquear entrada. Un atacante que ya logro ejecutar código necesita salida para descargar herramientas, comunicarse o sacar datos.

Ejemplo de política:

```text
Servidor de aplicacion puede salir a proveedor de pagos por 443.
Servidor de aplicacion no puede conectarse por SSH a internet.
Base de datos no inicia conexiones a internet.
```

Egress filtering reduce:

- Command and control;
- Descarga de herramientas;
- Exfiltración;
- Abuso de SSRF;
- Conexiones inesperadas desde servidores.

## DMZ

Zona para sistemas expuestos, separada de red interna.

Ejemplo:

- Web público en DMZ.
- Base de datos en red interna.
- Admin desde red separada.

Una DMZ reduce impacto porque un sistema expuesto no queda en la misma zona que datos internos. No significa que el sistema de DMZ sea confiable; significa que se asume mayor riesgo y se limita lo que puede alcanzar.

## Segmentación

Separar por función y riesgo:

- Usuarios.
- Servidores.
- Admin.
- Invitados.
- Produccion.
- Desarrollo.

La segmentación responde una pregunta clave:

```text
Si este activo cae, qué más puede alcanzar?
```

No basta con crear VLANs. La segmentación existe de verdad cuando hay reglas, logs y revisiones.

## Microsegmentacion

Segmentación clasica separa redes grandes. Microsegmentacion busca controlar comunicación entre cargas o servicios especificos.

Ejemplo:

```text
frontend solo habla con backend
backend solo habla con database
database no inicia conexiones a internet
```

En cloud o Kubernetes esto puede implementarse con security groups, network policies, service mesh o políticas equivalentes.

La microsegmentacion es especialmente útil cuando muchos servicios viven en la misma nube, cluster o red virtual. En vez de confiar en que "todo backend puede hablar con todo", define relaciones concretas.

## Zonas Sugeridas

| Zona | Ejemplos | Controles |
| --- | --- | --- |
| Usuarios | Laptops, estaciones | EDR, proxy, acceso limitado |
| Servidores | Apps internas | Firewall interno, hardening, logs |
| DMZ | Servicios públicos | WAF, monitoreo, acceso restringido a interno |
| Datos | Bases, storage sensible | Acceso solo desde apps autorizadas |
| Administracion | Jump boxes, consolas | MFA, PAM, logging fuerte |
| Invitados/IoT | Visitantes, dispositivos no confiables | Internet solamente o acceso mínimo |

## Errores Comunes

- VPN sin MFA.
- VPN que da acceso plano a toda la red.
- Proxy sin monitoreo.
- Servidores con salida libre a internet.
- DMZ con acceso excesivo a bases internas.
- Segmentos definidos en diagrama pero no aplicados en reglas.
- Reglas temporales que nunca expiran.

## Ejemplo de Diseño de Acceso

Ejemplo de diseño de acceso remoto para administradores:

- Quién entra?
- MFA?
- A qué segmento?
- Qué puertos?
- Qué logs?
- Qué pasa si el dispositivo no cumple?

Diseño razonable:

| Pregunta | Respuesta esperada |
| --- | --- |
| Quién entra? | Administradores nominales |
| MFA? | Obligatorio |
| Dispositivo | Corporativo y saludable |
| Segmento | Administracion |
| Acceso | Jump box, no red completa |
| Logs | VPN, jump box, comandos críticos |
| Incumplimiento | Bloquear o acceso limitado |

## Patrones de Arquitectura

### Patron débil

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

### Patron para aplicaciones públicas

```text
internet -> WAF/reverse proxy -> app -> database
```

La base de datos no debe exponerse directamente a internet ni a usuarios.

## Logs Importantes

Para VPN:

- Usuario;
- IP origen;
- Hora de conexión;
- MFA exitoso o fallido;
- Dispositivo;
- IP asignada;
- Bytes transferidos;
- Desconexion.

Para proxy:

- Usuario o IP;
- URL o dominio;
- Categoría;
- Acción;
- Bytes;
- User-agent;
- Reputación.

Para segmentación:

- Regla aplicada;
- Origen;
- Destino;
- Puerto;
- Acción;
- Zona.

Sin logs, estos controles son dificiles de auditar.

## Preguntas de Comprensión

- Qué debe poder hacer un usuario al conectarse por VPN?
- Qué no debería poder hacer?
- Qué tráfico saliente necesita una app y cuál seria sospechoso?
- Qué diferencia hay entre segmentación y microsegmentacion?
- Cómo separarias usuarios, servidores, invitados y administracion?

## Criterio de Dominio

Puedes avanzar cuando puedas:

- Explicar VPN.
- Explicar proxy.
- Explicar DMZ.
- Explicar egress filtering.
- Diseñar segmentación básica.
- Explicar por que VPN no debe dar acceso plano.
- Proponer zonas de red con reglas razonables.
