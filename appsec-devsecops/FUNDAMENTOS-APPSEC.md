# Fundamentos de AppSec

## Objetivo

Entender como proteger aplicaciones durante diseño, desarrollo, pruebas y operacion.

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

## Threat Modeling

Threat modeling es pensar que puede salir mal antes de construir.

Preguntas:

- Que estamos construyendo?
- Que datos maneja?
- Quien puede atacarlo?
- Que controles existen?
- Que pasa si falla?

## Code Review de Seguridad

Buscar patrones inseguros:

- Validacion solo en frontend.
- Consultas SQL concatenadas.
- Secretos en codigo.
- Permisos sin verificar.
- Logs con datos sensibles.
- Manejo inseguro de archivos.

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

## Practica

Elige una app imaginaria de login y responde:

- Que datos maneja?
- Que roles existen?
- Donde podria fallar autenticacion?
- Donde podria fallar autorizacion?
- Que logs son necesarios?
- Que pruebas harias?

## Criterio de Dominio

Puedes avanzar cuando puedas:

- Explicar AppSec.
- Explicar SDLC.
- Explicar threat modeling.
- Diferenciar SAST y DAST.
- Identificar riesgos comunes en codigo.
