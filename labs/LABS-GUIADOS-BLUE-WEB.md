# Labs Guiados Blue Team y Web

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

### Entregable

Tabla:

| Header | Aparece | Para que sirve |
| --- | --- | --- |

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

### Entregable

Explica:

- Riesgo.
- Impacto.
- Mitigacion.

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

### Entregable

Escribe una regla conceptual con:

- Titulo.
- Descripcion.
- Fuente.
- Condicion.
- Falsos positivos.
- Severidad.
