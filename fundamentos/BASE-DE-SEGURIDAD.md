# Base de Seguridad

## Objetivo

Entender los conceptos que aparecen en casi cualquier area de ciberseguridad.

Esta leccion no busca que memorices definiciones. Busca que puedas mirar un sistema real y responder: que queremos proteger, de quien, que podria fallar, que impacto tendria y que controles reducen el riesgo.

## Mapa Mental

```text
activo -> amenaza -> vulnerabilidad -> impacto -> riesgo -> control -> evidencia
```

Si no puedes nombrar el activo, no sabes que estas protegiendo.
Si no puedes describir la amenaza, no sabes contra que estas protegiendo.
Si no puedes medir impacto, no puedes priorizar.
Si no puedes pedir evidencia, solo tienes una opinion.

## Conceptos Clave

### Confidencialidad

La informacion solo debe ser accesible para personas o sistemas autorizados.

Ejemplos:

- Cifrado.
- Control de acceso.
- MFA.
- Clasificacion de datos.

Preguntas utiles:

- Quien deberia leer esta informacion?
- Quien no deberia leerla?
- Donde esta guardada?
- Como viaja por la red?
- Que pasa si se filtra?

### Integridad

La informacion no debe ser modificada sin autorizacion.

Ejemplos:

- Hashes.
- Firmas digitales.
- Control de cambios.
- Permisos.

Preguntas utiles:

- Como sabemos que el dato no fue alterado?
- Quien puede modificarlo?
- Existe historial de cambios?
- Se puede detectar una modificacion indebida?

### Disponibilidad

Los sistemas deben estar funcionando cuando se necesitan.

Ejemplos:

- Backups.
- Redundancia.
- Monitoreo.
- Proteccion contra DoS.

Preguntas utiles:

- Cuanto tiempo puede estar caido?
- Que usuarios o procesos dependen de el?
- Existe respaldo?
- Existe procedimiento de recuperacion?

## Activos

Un activo es cualquier cosa que tenga valor para una persona u organizacion.

Ejemplos:

- Datos de clientes.
- Codigo fuente.
- Cuenta de administrador.
- Servidor web.
- Laptop de trabajo.
- Token de API.
- Reputacion de la empresa.

En seguridad, no todo activo es tecnico. Una credencial, un contrato, un correo sensible o una configuracion tambien pueden ser activos.

## Amenaza, Vulnerabilidad e Impacto

- Amenaza: quien o que podria causar dano.
- Vulnerabilidad: debilidad que permite que algo salga mal.
- Impacto: consecuencia si el evento ocurre.

Ejemplo simple:

| Elemento | Ejemplo |
| --- | --- |
| Activo | Cuenta de correo corporativo |
| Amenaza | Phishing |
| Vulnerabilidad | Usuario sin MFA |
| Impacto | Robo de acceso, fraude, fuga de informacion |
| Control | MFA, entrenamiento, alertas de login, bloqueo por riesgo |

## Riesgo

Formula mental:

```text
Riesgo = amenaza + vulnerabilidad + impacto
```

Una version mas practica:

```text
Riesgo = probabilidad de que ocurra x impacto si ocurre
```

Ejemplo:

- Activo: servidor web.
- Amenaza: atacante externo.
- Vulnerabilidad: panel admin sin MFA.
- Impacto: acceso no autorizado.
- Control: MFA, restriccion por IP, monitoreo y logs.

## Controles

Un control es una medida para reducir riesgo. No todos los controles hacen lo mismo.

### Preventivos

Intentan evitar que el problema ocurra.

Ejemplos:

- MFA.
- Hardening.
- Segmentacion de red.
- Validacion de entrada.
- Politicas de minimo privilegio.

### Detectivos

Ayudan a descubrir que algo ocurrio o esta ocurriendo.

Ejemplos:

- Logs.
- Alertas SIEM.
- EDR.
- Monitoreo de integridad.
- Deteccion de anomalias.

### Correctivos

Ayudan a recuperarse o reducir dano despues del evento.

Ejemplos:

- Backups.
- Rotacion de credenciales.
- Restauracion de sistemas.
- Bloqueo de indicadores.
- Parches.

## Errores Comunes de Principiante

- Confundir amenaza con vulnerabilidad.
- Pensar que una herramienta equivale a seguridad.
- Proponer controles sin entender el activo.
- Reportar hallazgos sin impacto.
- No diferenciar entre riesgo teorico y riesgo explotable.
- No guardar evidencia.

## Practica Guiada

Elige 3 activos:

- Tu laptop.
- Una cuenta de correo.
- Un servidor web imaginario.

Para cada uno escribe:

- Activo.
- Amenaza.
- Vulnerabilidad.
- Impacto.
- Control preventivo.
- Control detectivo.
- Control correctivo.

Usa esta tabla:

| Activo | Amenaza | Vulnerabilidad | Impacto | Control preventivo | Control detectivo | Control correctivo |
| --- | --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |  |

## Ejemplo de resultado

Una nota de ejemplo, `modelo-riesgo-basico.md`, puede incluir:

1. Tres activos analizados.
2. Una tabla de riesgos.
3. Un parrafo explicando cual riesgo atenderias primero y por que.
4. Evidencia de que distingues controles preventivos, detectivos y correctivos.

## Autoevaluacion

Responde sin ver la nota:

- Que diferencia hay entre amenaza y vulnerabilidad?
- Por que un activo puede ser no tecnico?
- Que control detectivo pondrias para una cuenta comprometida?
- Que control correctivo pondrias ante ransomware?
- Por que el impacto ayuda a priorizar?

## Criterio de Dominio

Puedes avanzar cuando puedas explicar:

- CIA triad.
- Diferencia entre amenaza y vulnerabilidad.
- Que es un control.
- Como reducir un riesgo.
- Como justificar una prioridad de seguridad con impacto y evidencia.
