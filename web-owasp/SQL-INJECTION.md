# SQL Injection

## Objetivo

Entender SQL Injection como una falla de construccion de consultas, su impacto y como prevenirla.

Esta leccion se enfoca en causa, riesgo, deteccion y mitigacion. Las pruebas deben hacerse solo en laboratorios propios o plataformas autorizadas.

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

## Modelo Mental

```text
input no confiable -> consulta dinamica -> base de datos -> respuesta
```

El problema aparece cuando el input cambia la estructura de la consulta. La defensa busca separar estructura y datos.

## Donde Suele Aparecer

- Login.
- Buscadores.
- Filtros.
- Ordenamiento.
- Reportes.
- APIs con parametros.
- Paneles admin.
- Importadores CSV.

## Tipos Conceptuales

### Error-based

La aplicacion revela errores de base de datos. El riesgo adicional es que el error puede filtrar tablas, columnas o tecnologia.

### Boolean-based

La respuesta cambia segun una condicion verdadera o falsa.

### Time-based

La respuesta tarda mas o menos segun una condicion. Suele aparecer cuando no hay errores visibles.

### Second-order

El dato malicioso se guarda primero y se usa despues en otra consulta insegura.

## Señales de Alerta

En logs web:

- Errores SQL repetidos.
- Caracteres raros en parametros.
- Muchas pruebas contra el mismo endpoint.
- Respuestas 500 al enviar parametros inusuales.

En codigo:

- Concatenacion de strings para SQL.
- Interpolacion directa de parametros.
- Filtros de ordenamiento sin allowlist.
- ORM usado con consultas raw sin parametros.
- Cuenta de DB con permisos excesivos.

## Preguntas de Analisis

- Que parametros llegan al servidor?
- Se usan consultas parametrizadas?
- Los errores revelan detalles?
- La cuenta de DB tiene privilegios excesivos?
- Hay logs suficientes?

## Mitigacion Detallada

### Consultas Parametrizadas

La estructura de SQL se define antes y los valores se pasan aparte.

### Allowlist para Campos Dinamicos

No todo puede parametrizarse igual. Para campos como `ORDER BY`, usa allowlist:

```text
permitidos = ["name", "created_at", "status"]
```

### Minimo Privilegio

La cuenta de la aplicacion no deberia poder hacer mas de lo necesario.

Ejemplo:

- una app de lectura no necesita `DROP TABLE`;
- un usuario de reportes no necesita modificar usuarios;
- una API publica no deberia conectarse como admin.

### Errores Seguros

El usuario recibe un mensaje generico. El detalle tecnico va a logs protegidos.

## Observacion Segura

La SQL Injection debe estudiarse solo en laboratorios autorizados o aplicaciones locales vulnerables creadas para aprendizaje.

Una forma segura de analizar un caso es separar:

- causa: donde se concatena o interpreta input como SQL;
- flujo: que endpoint recibe el dato;
- impacto: que datos podrian leerse o modificarse;
- mitigacion: parametros, allowlists y minimo privilegio;
- deteccion: errores, patrones raros y eventos repetidos;
- limitacion: que no se puede afirmar sin evidencia.

## Criterios de Revision

Una revision defensiva busca comprobar si:

- no hay concatenacion directa de SQL;
- las consultas raw usan parametros;
- los campos dinamicos usan allowlist;
- los errores no revelan estructura interna;
- la cuenta de base de datos tiene minimo privilegio;
- eventos sospechosos quedan en logs utiles;
- flujos sensibles como login, busqueda, filtros y reportes tienen controles.

## Errores Comunes

- Pensar que un ORM elimina todo riesgo automaticamente.
- Usar validacion de entrada como unica defensa.
- Dejar errores SQL visibles.
- Conectar la aplicacion con usuario administrador.
- Reportar SQLi sin explicar impacto sobre datos.

## Criterio de Dominio

Puedes avanzar cuando puedas:

- Explicar por que concatenar consultas es peligroso.
- Explicar consultas parametrizadas.
- Describir impacto sin exagerar.
- Proponer mitigacion concreta.
- Identificar señales de SQLi en codigo y logs.
