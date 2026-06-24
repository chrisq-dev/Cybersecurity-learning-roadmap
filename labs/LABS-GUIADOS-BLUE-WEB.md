# Labs Guiados Blue Team y Web

Estos labs conectan investigacion defensiva con fundamentos web. Estan pensados como ejemplos guiados para entender evidencia, impacto y controles.

## Como Leer Estos Labs

Una buena lectura del caso observa:

- objetivo;
- alcance;
- datos usados;
- pasos o flujo;
- evidencia;
- analisis;
- conclusion;
- recomendacion;
- dudas pendientes.

## Lab 1: Investigacion de Fuerza Bruta

### Objetivo

Analizar un posible ataque de fuerza bruta.

### Datos

```text
2026-06-23T11:00:00 user=maria src_ip=198.51.100.23 result=failed
2026-06-23T11:00:10 user=maria src_ip=198.51.100.23 result=failed
2026-06-23T11:00:20 user=maria src_ip=198.51.100.23 result=failed
2026-06-23T11:00:30 user=maria src_ip=198.51.100.23 result=failed
2026-06-23T11:00:40 user=maria src_ip=198.51.100.23 result=failed
2026-06-23T11:02:00 user=maria src_ip=198.51.100.23 result=success
```

### Pasos

1. Identifica usuario.
2. Identifica IP.
3. Cuenta fallos.
4. Revisa si hubo exito.
5. Escribe hipotesis.
6. Recomienda acciones.

### Resultado Esperado

Conclusion ejemplo:

```text
Actividad consistente con fuerza bruta o password spraying contra la cuenta maria. Se recomienda validar geolocalizacion/IP, revisar actividad posterior al login exitoso, resetear credenciales si aplica y habilitar MFA.
```

### Extension

Agrega una linea de tiempo:

| Hora | Evento | Evidencia | Interpretacion |
| --- | --- | --- | --- |

El analisis debe aclarar:

- Es incidente confirmado o sospecha?
- Que evidencia falta?
- Que accion tomarias primero?
- Que deteccion crearias?

### Criterio de Exito

- Diferencias fuerza bruta, password spraying y error de usuario.
- Justificas severidad.
- Propones contencion y mejora de deteccion.

## Lab 2: Headers HTTP

### Objetivo

Revisar headers y entender riesgos.

### Pasos

```bash
curl -I https://example.com
```

### Preguntas

- Que codigo HTTP aparece?
- Hay `Content-Type`?
- Hay `Server`?
- Hay cookies?
- Que headers de seguridad conoces?

### Headers de Seguridad a Investigar

- Content-Security-Policy.
- Strict-Transport-Security.
- X-Content-Type-Options.
- Referrer-Policy.
- Permissions-Policy.

### Ejemplo de resultado

Tabla:

| Header | Aparece | Para que sirve |
| --- | --- | --- |

### Extension

Clasifica headers:

| Header | Categoria | Riesgo si falta |
| --- | --- | --- |

Categorias sugeridas:

- transporte;
- contenido;
- privacidad;
- permisos del navegador;
- cache.

### Criterio de Exito

- Explicas al menos 5 headers.
- No confundes header ausente con vulnerabilidad critica automaticamente.
- Propones mejora concreta.

## Lab 3: Control de Acceso Conceptual

### Objetivo

Entender Broken Access Control.

### Escenario

Una app tiene estas rutas:

```text
/profile/1001
/profile/1002
/admin
```

Usuario:

```text
id=1001
role=user
```

### Preguntas

- Deberia acceder a `/profile/1001`?
- Deberia acceder a `/profile/1002`?
- Deberia acceder a `/admin`?
- Donde debe validarse el permiso?

### Ejemplo de resultado

Explica:

- Riesgo.
- Impacto.
- Mitigacion.

### Extension

Una matriz de ejemplo puede verse asi:

| Ruta | Usuario 1001 | Usuario 1002 | Admin |
| --- | --- | --- | --- |
| `/profile/1001` |  |  |  |
| `/profile/1002` |  |  |  |
| `/admin` |  |  |  |

Agrega una columna con el codigo esperado: `200`, `401` o `403`.

### Criterio de Exito

- Explicas autorizacion por recurso.
- Identificas Broken Access Control.
- Defines pruebas manuales para validar permisos.

## Lab 4: Regla Sigma Conceptual

### Objetivo

Crear una deteccion simple.

### Caso

Detectar multiples logins fallidos.

### Elementos

- Fuente: logs de autenticacion.
- Condicion: `result=failed`.
- Agrupacion: usuario o IP.
- Ventana: 5 minutos.
- Umbral: 5 eventos.

### Ejemplo de resultado

Escribe una regla conceptual con:

- Titulo.
- Descripcion.
- Fuente.
- Condicion.
- Falsos positivos.
- Severidad.

### Observacion Adicional

Tambien puede considerar:

- MITRE tactica;
- MITRE tecnica;
- campos requeridos;
- pasos de investigacion;
- respuesta recomendada.

### Criterio de Exito

- La deteccion es accionable.
- Tiene falsos positivos.
- Tiene pasos de triage.
- Explica que evidencia debe revisar el analista.

## Lab 5: SQL Injection Defensivo

### Objetivo

Entender causa y mitigacion sin atacar sistemas reales.

### Escenario

Una app construye consultas asi:

```text
SELECT * FROM users WHERE email = '<input>'
```

### Puntos a observar

1. Explica el riesgo.
2. Identifica donde entra el dato.
3. Reescribe la consulta de forma conceptual parametrizada.
4. Define permisos minimos para la cuenta DB.
5. Define logs de errores y actividad sospechosa.

### Ejemplo de resultado

Un analisis corto con causa, impacto, mitigacion y forma de validar el control.

## Lab 6: XSS por Contexto

### Objetivo

Practicar escape por contexto.

### Escenario

La app muestra el nombre del usuario en:

- HTML body;
- atributo HTML;
- JavaScript inline;
- URL.

### Puntos a observar

1. Explica por que cada contexto cambia la defensa.
2. Propone control para cada contexto.
3. Define una politica CSP inicial.
4. Explica el rol de `HttpOnly`.

### Ejemplo de resultado

Tabla:

| Contexto | Riesgo | Control |
| --- | --- | --- |

## Lab 7: Caso SOC Completo

### Objetivo

Unir logs, timeline, MITRE, severidad y respuesta.

### Datos

```text
12:00 user=ana result=failed src=198.51.100.10
12:01 user=ana result=failed src=198.51.100.10
12:02 user=ana result=success src=198.51.100.10
12:05 user=ana action=download file=clientes.csv
12:08 user=ana action=create_api_key
12:10 user=ana action=disable_mfa
```

### Ejemplo de resultado

Reporte con:

- resumen ejecutivo;
- timeline;
- evidencia;
- hipotesis;
- MITRE;
- severidad;
- contencion;
- deteccion propuesta;
- lecciones aprendidas.

## Rubrica Rapida

| Nivel | Evidencia |
| --- | --- |
| Basico | Respondes preguntas |
| Bueno | Creas tablas y timeline |
| Fuerte | Propones controles y detecciones |
| Portafolio | Reporte completo y reproducible |
