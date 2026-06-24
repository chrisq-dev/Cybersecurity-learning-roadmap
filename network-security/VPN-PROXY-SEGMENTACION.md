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

Una VPN no debe significar "ya estas dentro de todo". El acceso remoto debe seguir minimo privilegio: entrar solo a los sistemas necesarios, con identidad fuerte y registro.

Modelo debil:

```text
Usuario remoto -> VPN -> Toda la red interna
```

Modelo mejor:

```text
Usuario remoto -> VPN con MFA -> Segmento segun rol -> Sistemas necesarios
```

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

## Microsegmentacion

Segmentacion clasica separa redes grandes. Microsegmentacion busca controlar comunicacion entre cargas o servicios especificos.

Ejemplo:

```text
frontend solo habla con backend
backend solo habla con database
database no inicia conexiones a internet
```

En cloud o Kubernetes esto puede implementarse con security groups, network policies, service mesh o politicas equivalentes.

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

## Practica

Diseña acceso remoto para administradores:

- Quien entra?
- MFA?
- A que segmento?
- Que puertos?
- Que logs?
- Que pasa si el dispositivo no cumple?

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
