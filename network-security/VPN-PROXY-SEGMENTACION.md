# VPN, Proxy y Segmentacion

## Objetivo

Entender controles de acceso remoto, salida a internet y separacion de redes.

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

## Proxy

Un proxy intermedia trafico, normalmente web.

Puede ayudar a:

- Filtrar URLs.
- Registrar navegacion.
- Bloquear categorias.
- Inspeccionar trafico segun politica.

## Egress Filtering

Controlar trafico saliente.

Importa porque:

- Malware necesita comunicarse.
- Exfiltracion usa salida.
- SSRF puede abusar salida del servidor.

## DMZ

Zona para sistemas expuestos, separada de red interna.

Ejemplo:

- Web publico en DMZ.
- Base de datos en red interna.
- Admin desde red separada.

## Segmentacion

Separar por funcion y riesgo:

- Usuarios.
- Servidores.
- Admin.
- Invitados.
- Produccion.
- Desarrollo.

## Practica

Diseña acceso remoto para administradores:

- Quien entra?
- MFA?
- A que segmento?
- Que puertos?
- Que logs?
- Que pasa si el dispositivo no cumple?

## Criterio de Dominio

Puedes avanzar cuando puedas:

- Explicar VPN.
- Explicar proxy.
- Explicar DMZ.
- Explicar egress filtering.
- Diseñar segmentacion basica.
