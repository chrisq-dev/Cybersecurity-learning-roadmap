# SQL Injection

## Objetivo

Entender SQL Injection como una falla de construccion de consultas, su impacto y como prevenirla.

## Que es

SQL Injection ocurre cuando una aplicacion mezcla datos del usuario con una consulta SQL de forma insegura.

El problema no es SQL en si. El problema es tratar entrada no confiable como si fuera parte confiable de la consulta.

## Por Que Ocurre

Ejemplo inseguro conceptual:

```text
"SELECT * FROM users WHERE email = '" + email + "'"
```

Si `email` viene del usuario, la consulta puede alterarse.

## Impacto

Puede permitir:

- Saltar autenticacion.
- Leer datos no autorizados.
- Modificar datos.
- Eliminar datos.
- Obtener informacion sensible.
- En algunos casos, afectar el servidor.

## Mitigacion

Controles principales:

- Consultas parametrizadas.
- ORM usado correctamente.
- Validacion de entrada.
- Minimo privilegio en la cuenta de base de datos.
- Manejo seguro de errores.
- Logging de eventos sospechosos.

Ejemplo conceptual seguro:

```text
SELECT * FROM users WHERE email = ?
```

La idea es que el valor del usuario se trate como dato, no como codigo SQL.

## Señales de Alerta

En logs web:

- Errores SQL repetidos.
- Caracteres raros en parametros.
- Muchas pruebas contra el mismo endpoint.
- Respuestas 500 al enviar parametros inusuales.

## Preguntas de Analisis

- Que parametros llegan al servidor?
- Se usan consultas parametrizadas?
- Los errores revelan detalles?
- La cuenta de DB tiene privilegios excesivos?
- Hay logs suficientes?

## Practica Segura

Usa solo laboratorios autorizados como PortSwigger Web Security Academy o una app local vulnerable.

Para documentar un lab:

```md
# SQL Injection Lab

## Causa

## Evidencia

## Impacto

## Mitigacion

## Lecciones Aprendidas
```

## Criterio de Dominio

Puedes avanzar cuando puedas:

- Explicar por que concatenar consultas es peligroso.
- Explicar consultas parametrizadas.
- Describir impacto sin exagerar.
- Proponer mitigacion concreta.
