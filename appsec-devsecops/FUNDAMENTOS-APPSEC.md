# Fundamentos de AppSec

## Objetivo

Entender como proteger aplicaciones durante diseño, desarrollo, pruebas y operación.

AppSec conecta desarrollo con seguridad. No se trata de frenar al equipo, sino de ayudar a construir software que falle menos, exponga menos datos y pueda ser revisado con evidencia.

## Mapa Mental

```text
requisito -> diseño -> código -> dependencia -> prueba -> despliegue -> monitoreo
```

En cada fase debes preguntar:

- Qué puede salir mal?
- Qué dato sensible existe?
- Qué usuario o servicio tiene permisos?
- Qué validaciones son obligatorias?
- Qué evidencia queda si algo falla?

## Qué es AppSec

Application Security es la práctica de reducir riesgos en aplicaciones.

Incluye:

- Diseño seguro.
- Revisión de código.
- Pruebas de seguridad.
- Manejo de dependencias.
- Autenticación y autorización.
- Protección de datos.
- Logging.

## SDLC

Software Development Life Cycle:

1. Requisitos.
2. Diseño.
3. Desarrollo.
4. Pruebas.
5. Despliegue.
6. Operación.
7. Mantenimiento.

AppSec busca meter seguridad en todas las fases, no solo al final.

## Seguridad por Fase

| Fase | Actividad AppSec |
| --- | --- |
| Requisitos | Definir datos sensibles, roles y riesgos |
| Diseño | Threat modeling y arquitectura segura |
| Desarrollo | Validación, auth, manejo de errores, secretos |
| Pruebas | SAST, DAST, pruebas manuales, abuso de casos |
| Despliegue | Configuración segura, secrets, headers, TLS |
| Operación | Logs, alertas, respuesta, parches |

## Threat Modeling

Threat modeling es pensar que puede salir mal antes de construir.

Preguntas:

- Qué estamos construyendo?
- Qué datos maneja?
- Quién puede atacarlo?
- Qué controles existen?
- Qué pasa si falla?

### Modelo Rápido: STRIDE

STRIDE ayuda a pensar amenazas:

- Spoofing: alguien se hace pasar por otro.
- Tampering: alguien modifica datos.
- Repudiation: alguien niega una acción.
- Information Disclosure: datos expuestos.
- Denial of Service: servicio interrumpido.
- Elevation of Privilege: permisos aumentados indebidamente.

No necesitas usarlo perfecto al inicio. Usalo para no olvidar categorías importantes.

## Code Review de Seguridad

Buscar patrones inseguros:

- Validación solo en frontend.
- Consultas SQL concatenadas.
- Secretos en código.
- Permisos sin verificar.
- Logs con datos sensibles.
- Manejo inseguro de archivos.

Preguntas para revisar código:

- La autorización se valida en backend?
- Las consultas usan parametros?
- Los errores revelan detalles internos?
- Los secretos vienen de variables seguras?
- Hay límites de tamano y tipo en inputs?
- Los logs evitan contraseñas, tokens y datos sensibles?

## SAST y DAST

### SAST

Analiza código fuente o binarios sin ejecutar la app.

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

Las apps usan librerías. Si una dependencia tiene vulnerabilidad, la app puede quedar expuesta.

Controles:

- Inventario.
- Actualizaciones.
- Dependency scanning.
- Versión pinning.

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
- Rotación.
- Escaneo de secretos.
- Permisos por ambiente.

## Logging Seguro

Un log útil responde que paso, cuando, donde y con que identidad. Un log inseguro filtra datos sensibles.

Guarda:

- ID de usuario.
- Acción.
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

## Ejemplo de Revisión AppSec

Una app imaginaria de login permite analizar:

- Qué datos maneja?
- Qué roles existen?
- Dónde podria fallar autenticación?
- Dónde podria fallar autorización?
- Qué logs son necesarios?
- Qué pruebas harias?

## Criterios Para Revisar un Diseño

Escenario:

```text
App SaaS con usuarios, administradores, pagos, subida de archivos y API pública.
```

Una revisión de diseño AppSec debe explicar:

- Cuales son los activos principales y por que importan.
- Que roles existen y que permisos tiene cada uno.
- Que flujos son sensibles: login, pagos, subida de archivos, administracion y API pública.
- Que amenazas aparecen si se analiza el sistema con STRIDE.
- Que controles previenen abuso antes de que exista una vulnerabilidad explotable.
- Que logs permiten reconstruir acciones importantes.
- Que pruebas de seguridad validan autenticación, autorización, validación de datos y manejo de errores.

El objetivo no es llenar una plantilla, sino aprender a mirar una aplicación antes de programarla como si ya estuviera bajo abuso real.

## Errores Comunes

- Pensar que AppSec empieza cuando la app ya está terminada.
- Confiar en validación de frontend.
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
- Identificar riesgos comunes en código.
- Proponer controles por fase del SDLC.
