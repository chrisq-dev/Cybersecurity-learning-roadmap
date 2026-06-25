# SQL Injection

## Objetivo

Entender SQL Injection como una falla de construccion de consultas, su impacto y como prevenirla.

Esta lección se enfoca en causa, riesgo, detección y mitigacion. Las pruebas deben hacerse solo en laboratorios propios o plataformas autorizadas.

## Qué es

SQL Injection ocurre cuando una aplicación mezcla datos del usuario con una consulta SQL de forma insegura.

El problema no es SQL en si. El problema es tratar entrada no confiable como si fuera parte confiable de la consulta.

## Por Qué Ocurre

Ejemplo inseguro conceptual:

```text
"SELECT * FROM users WHERE email = '" + email + "'"
```

Si `email` viene del usuario, la consulta puede alterarse.

## Impacto

Puede permitir:

- Saltar autenticación.
- Leer datos no autorizados.
- Modificar datos.
- Eliminar datos.
- Obtener información sensible.
- En algunos casos, afectar el servidor.

## Mitigacion

Controles principales:

- Consultas parametrizadas.
- ORM usado correctamente.
- Validación de entrada.
- Mínimo privilegio en la cuenta de base de datos.
- Manejo seguro de errores.
- Logging de eventos sospechosos.

Ejemplo conceptual seguro:

```text
SELECT * FROM users WHERE email = ?
```

La idea es que el valor del usuario se trate como dato, no como código SQL.

## Modelo Mental

```text
input no confiable -> consulta dinamica -> base de datos -> respuesta
```

El problema aparece cuando el input cambia la estructura de la consulta. La defensa busca separar estructura y datos.

## Dónde Suele Aparecer

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

La aplicación revela errores de base de datos. El riesgo adicional es que el error puede filtrar tablas, columnas o tecnologia.

### Boolean-based

La respuesta cambia según una condicion verdadera o falsa.

### Time-based

La respuesta tarda más o menos según una condicion. Suele aparecer cuando no hay errores visibles.

### Second-order

El dato malicioso se guarda primero y se usa después en otra consulta insegura.

## Señales de Alerta

En logs web:

- Errores SQL repetidos.
- Caracteres raros en parametros.
- Muchas pruebas contra el mismo endpoint.
- Respuestas 500 al enviar parametros inusuales.

En código:

- Concatenacion de strings para SQL.
- Interpolacion directa de parametros.
- Filtros de ordenamiento sin allowlist.
- ORM usado con consultas raw sin parametros.
- Cuenta de DB con permisos excesivos.

## Preguntas de Análisis

- Qué parametros llegan al servidor?
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

### Mínimo Privilegio

La cuenta de la aplicación no debería poder hacer más de lo necesario.

Ejemplo:

- Una app de lectura no necesita `DROP TABLE`;
- Un usuario de reportes no necesita modificar usuarios;
- Una API pública no debería conectarse como admin.

### Errores Seguros

El usuario recibe un mensaje generico. El detalle técnico va a logs protegidos.

## Observación Segura

La SQL Injection debe estudiarse solo en laboratorios autorizados o aplicaciones locales vulnerables creadas para aprendizaje.

Una forma segura de analizar un caso es separar:

- Causa: donde se concatena o interpreta input como SQL;
- Flujo: que endpoint recibe el dato;
- Impacto: que datos podrian leerse o modificarse;
- Mitigacion: parametros, allowlists y mínimo privilegio;
- Detección: errores, patrones raros y eventos repetidos;
- Limitacion: que no se puede afirmar sin evidencia.

## Criterios de Revisión

Una revisión defensiva busca comprobar si:

- No hay concatenacion directa de SQL;
- Las consultas raw usan parametros;
- Los campos dinamicos usan allowlist;
- Los errores no revelan estructura interna;
- La cuenta de base de datos tiene mínimo privilegio;
- Eventos sospechosos quedan en logs útiles;
- Flujos sensibles como login, busqueda, filtros y reportes tienen controles.

## Errores Comunes

- Pensar que un ORM elimina todo riesgo automaticamente.
- Usar validación de entrada como unica defensa.
- Dejar errores SQL visibles.
- Conectar la aplicación con usuario administrador.
- Reportar SQLi sin explicar impacto sobre datos.

## Criterio de Dominio

Puedes avanzar cuando puedas:

- Explicar por que concatenar consultas es peligroso.
- Explicar consultas parametrizadas.
- Describir impacto sin exagerar.
- Proponer mitigacion concreta.
- Identificar señales de SQLi en código y logs.
