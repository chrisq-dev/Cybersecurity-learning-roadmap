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
- Tests de autorizacion.

## Mass Assignment

Ocurre cuando la API acepta campos que el usuario no deberia controlar.

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
- Validacion estricta.

## Rate Limiting

Limita abuso.

Protege contra:

- Fuerza bruta.
- Scraping.
- Abuso de recursos.
- Ataques automatizados.

## Errores Excesivos

Errores demasiado detallados revelan informacion.

Mal:

```text
SQL syntax error at line...
```

Mejor:

```text
Invalid request
```

con detalle interno solo en logs.

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

## Checklist

- [ ] Autenticacion requerida.
- [ ] Autorizacion por objeto.
- [ ] Validacion de entrada.
- [ ] Allowlist de campos.
- [ ] Rate limiting.
- [ ] Errores seguros.
- [ ] Logs utiles.
- [ ] Tokens con expiracion.
- [ ] Permisos minimos.

## Practica

Analiza este request:

```http
PATCH /api/users/123
Authorization: Bearer token
Content-Type: application/json

{
  "displayName": "Ana",
  "role": "admin"
}
```

Responde:

- Que riesgo aparece?
- Que validarias?
- Que log guardarias?
- Que respuesta segura darias?

## Criterio de Dominio

Puedes avanzar cuando puedas:

- Explicar BOLA.
- Explicar mass assignment.
- Proponer rate limiting.
- Diseñar logs seguros.
