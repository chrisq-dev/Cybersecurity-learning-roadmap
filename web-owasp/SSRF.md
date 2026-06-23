# Server-Side Request Forgery

## Objetivo

Entender SSRF, una falla donde el servidor hace requests hacia destinos controlados por el usuario.

## Que es

SSRF ocurre cuando una aplicacion permite que el usuario influya en una URL o destino que el servidor va a consultar.

Ejemplo conceptual:

```text
/fetch?url=https://example.com
```

Si el servidor consulta cualquier URL sin control, puede ser abusado.

## Por Que Es Peligroso

El servidor puede tener acceso a:

- Redes internas.
- Servicios no expuestos a internet.
- Metadata cloud.
- Paneles internos.
- APIs internas.

## Impacto

Puede permitir:

- Escanear redes internas desde el servidor.
- Leer servicios internos.
- Acceder a metadata cloud si no esta protegida.
- Saltar controles perimetrales.

## Mitigacion

- Allowlist de destinos permitidos.
- Bloquear rangos internos y metadata.
- Validar esquema: `http`, `https`.
- Resolver DNS de forma segura.
- Controles de red egress.
- Timeouts y limites.
- No devolver respuestas internas completas.

## Errores Comunes

- Solo bloquear `localhost`.
- No considerar IPv6.
- No considerar redirecciones.
- No considerar DNS rebinding.
- Permitir cualquier URL.

## Practica Segura

Escenario ficticio:

```text
Una app permite generar previews de URLs.
```

Responde:

- Que riesgos existen?
- Que destinos bloquearias?
- Que allowlist permitirias?
- Que logs guardarias?

## Criterio de Dominio

Puedes avanzar cuando puedas:

- Explicar SSRF.
- Explicar por que cloud metadata importa.
- Proponer allowlist.
- Explicar controles de egress.
