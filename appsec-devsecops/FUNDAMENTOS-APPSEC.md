# Fundamentos de AppSec

## Objetivo

Entender como proteger aplicaciones durante diseño, desarrollo, pruebas y operacion.

AppSec conecta desarrollo con seguridad. No se trata de frenar al equipo, sino de ayudar a construir software que falle menos, exponga menos datos y pueda ser revisado con evidencia.

## Mapa Mental

```text
requisito -> diseno -> codigo -> dependencia -> prueba -> despliegue -> monitoreo
```

En cada fase debes preguntar:

- Que puede salir mal?
- Que dato sensible existe?
- Que usuario o servicio tiene permisos?
- Que validaciones son obligatorias?
- Que evidencia queda si algo falla?

## Que es AppSec

Application Security es la practica de reducir riesgos en aplicaciones.

Incluye:

- Diseño seguro.
- Revision de codigo.
- Pruebas de seguridad.
- Manejo de dependencias.
- Autenticacion y autorizacion.
- Proteccion de datos.
- Logging.

## SDLC

Software Development Life Cycle:

1. Requisitos.
2. Diseño.
3. Desarrollo.
4. Pruebas.
5. Despliegue.
6. Operacion.
7. Mantenimiento.

AppSec busca meter seguridad en todas las fases, no solo al final.

## Seguridad por Fase

| Fase | Actividad AppSec |
| --- | --- |
| Requisitos | Definir datos sensibles, roles y riesgos |
| Diseno | Threat modeling y arquitectura segura |
| Desarrollo | Validacion, auth, manejo de errores, secretos |
| Pruebas | SAST, DAST, pruebas manuales, abuso de casos |
| Despliegue | Configuracion segura, secrets, headers, TLS |
| Operacion | Logs, alertas, respuesta, parches |

## Threat Modeling

Threat modeling es pensar que puede salir mal antes de construir.

Preguntas:

- Que estamos construyendo?
- Que datos maneja?
- Quien puede atacarlo?
- Que controles existen?
- Que pasa si falla?

### Modelo Rapido: STRIDE

STRIDE ayuda a pensar amenazas:

- Spoofing: alguien se hace pasar por otro.
- Tampering: alguien modifica datos.
- Repudiation: alguien niega una accion.
- Information Disclosure: datos expuestos.
- Denial of Service: servicio interrumpido.
- Elevation of Privilege: permisos aumentados indebidamente.

No necesitas usarlo perfecto al inicio. Usalo para no olvidar categorias importantes.

## Code Review de Seguridad

Buscar patrones inseguros:

- Validacion solo en frontend.
- Consultas SQL concatenadas.
- Secretos en codigo.
- Permisos sin verificar.
- Logs con datos sensibles.
- Manejo inseguro de archivos.

Preguntas para revisar codigo:

- La autorizacion se valida en backend?
- Las consultas usan parametros?
- Los errores revelan detalles internos?
- Los secretos vienen de variables seguras?
- Hay limites de tamano y tipo en inputs?
- Los logs evitan contrasenas, tokens y datos sensibles?

## SAST y DAST

### SAST

Analiza codigo fuente o binarios sin ejecutar la app.

Encuentra:

- Patrones inseguros.
- Dependencias.
- Posibles errores.

### DAST

Prueba una app en ejecucion desde fuera.

Encuentra:

- Fallas web.
- Configuraciones.
- Comportamiento real.

## Dependencias

Las apps usan librerias. Si una dependencia tiene vulnerabilidad, la app puede quedar expuesta.

Controles:

- Inventario.
- Actualizaciones.
- Dependency scanning.
- Version pinning.

## Secretos

Nunca guardes secretos en repositorios:

- API keys.
- Tokens.
- Passwords.
- Certificados privados.
- Connection strings.

Controles:

- Variables de entorno.
- Secret managers.
- Rotacion.
- Escaneo de secretos.
- Permisos por ambiente.

## Logging Seguro

Un log util responde que paso, cuando, donde y con que identidad. Un log inseguro filtra datos sensibles.

Guarda:

- ID de usuario.
- Accion.
- Recurso afectado.
- Resultado.
- IP o contexto.
- Correlation ID.

Evita:

- Passwords.
- Tokens.
- Datos de tarjetas.
- Secretos.
- PII innecesaria.

## Ejemplo de Revision AppSec

Una app imaginaria de login permite analizar:

- Que datos maneja?
- Que roles existen?
- Donde podria fallar autenticacion?
- Donde podria fallar autorizacion?
- Que logs son necesarios?
- Que pruebas harias?

## Criterios Para Revisar un Diseno

Escenario:

```text
App SaaS con usuarios, administradores, pagos, subida de archivos y API publica.
```

Una revision de diseno AppSec debe explicar:

- Cuales son los activos principales y por que importan.
- Que roles existen y que permisos tiene cada uno.
- Que flujos son sensibles: login, pagos, subida de archivos, administracion y API publica.
- Que amenazas aparecen si se analiza el sistema con STRIDE.
- Que controles previenen abuso antes de que exista una vulnerabilidad explotable.
- Que logs permiten reconstruir acciones importantes.
- Que pruebas de seguridad validan autenticacion, autorizacion, validacion de datos y manejo de errores.

El objetivo no es llenar una plantilla, sino aprender a mirar una aplicacion antes de programarla como si ya estuviera bajo abuso real.

## Errores Comunes

- Pensar que AppSec empieza cuando la app ya esta terminada.
- Confiar en validacion de frontend.
- No modelar permisos por recurso.
- Tratar todos los hallazgos como igual de graves.
- Ignorar dependencias.
- No revisar secrets en CI/CD.

## Criterio de Dominio

Puedes avanzar cuando puedas:

- Explicar AppSec.
- Explicar SDLC.
- Explicar threat modeling.
- Diferenciar SAST y DAST.
- Identificar riesgos comunes en codigo.
- Proponer controles por fase del SDLC.
