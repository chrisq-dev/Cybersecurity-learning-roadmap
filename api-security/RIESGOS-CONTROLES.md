# Riesgos y Controles en APIs

## Objetivo

Conocer fallas comunes en APIs y como mitigarlas.

## BOLA / IDOR

Broken Object Level Authorization ocurre cuando un usuario accede a objetos de otro usuario cambiando IDs.

Ejemplo:

```text
/api/invoices/1001
/api/invoices/1002
```

Mitigacion:

- Validar permisos en servidor para cada objeto.
- No confiar en que el frontend oculta botones.
- Tests de autorización.

## Mass Assignment

Ocurre cuando la API acepta campos que el usuario no debería controlar.

Ejemplo:

```json
{
  "name": "Ana",
  "role": "admin"
}
```

Mitigacion:

- Allowlist de campos permitidos.
- DTOs.
- Validación estricta.

## Rate Limiting

Limita abuso.

Protege contra:

- Fuerza bruta.
- Scraping.
- Abuso de recursos.
- Ataques automatizados.

## Errores Excesivos

Errores demasiado detallados revelan información.

Mal:

```text
SQL syntax error at line...
```

Mejor:

```text
Invalid request
```

Con detalle interno solo en logs.

## Logging

Registrar:

- Identidad.
- Endpoint.
- Resultado.
- IP origen.
- User-Agent.
- Correlation ID.

Evitar:

- Contraseñas.
- Tokens.
- Datos sensibles innecesarios.

## Criterios de Revisión

Una API segura debe evaluarse con estos criterios:

- Autenticación requerida cuando el recurso no es público;
- Autorización por objeto para evitar BOLA/IDOR;
- Validación de entrada en servidor;
- Allowlist de campos para evitar mass assignment;
- Rate limiting para reducir abuso;
- Errores seguros que no filtren detalles internos;
- Logs útiles sin contraseñas ni tokens;
- Tokens con expiracion razonable;
- Permisos mínimos entre servicios y datos.

## Ejemplo de Riesgo

Este request muestra un riesgo común de autorización y mass assignment:

```http
PATCH /api/users/123
Authorization: Bearer token
Content-Type: application/json

{
  "displayName": "Ana",
  "role": "admin"
}
```

El análisis debe revisar:

- Qué riesgo aparece?
- Qué validarias?
- Qué log guardarias?
- Qué respuesta segura darias?

## Criterio de Dominio

Puedes avanzar cuando puedas:

- Explicar BOLA.
- Explicar mass assignment.
- Proponer rate limiting.
- Diseñar logs seguros.
