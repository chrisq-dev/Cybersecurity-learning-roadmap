# Reporte y Remediación

## Objetivo

Aprender a convertir hallazgos técnicos en información útil para corregir riesgos.

## Un Hallazgo Debe Tener

- Titulo claro.
- Severidad.
- Sistema afectado.
- Descripcion.
- Evidencia.
- Impacto.
- Pasos de reproducción controlados.
- Remediación.
- Referencias.

## Severidad

La severidad no depende solo de la técnica. Depende de:

- Impacto.
- Probabilidad.
- Exposición.
- Sensibilidad de datos.
- Facilidad de explotación.
- Controles existentes.

## Ejemplo de Hallazgo

```md
# Headers de Seguridad Ausentes

## Severidad

Baja / Media segun contexto.

## Descripcion

La aplicacion no devuelve ciertos headers de seguridad que ayudan a reducir riesgos comunes del navegador.

## Evidencia

curl -I https://app-lab.local

## Impacto

Puede aumentar exposición ante ciertos ataques del lado del cliente si existen otras fallas.

## Remediación

Configurar headers como Content-Security-Policy, X-Content-Type-Options y Strict-Transport-Security cuando aplique.
```

## Buen Reporte vs Mal Reporte

Mal reporte:

```text
La app es insegura.
```

Buen reporte:

```text
El endpoint /admin permite acceso a usuarios sin rol administrativo. Esto permite que un usuario autenticado no privilegiado vea funciones administrativas. Se recomienda validar autorización en servidor para cada request.
```

## Remediación

Una buena remediación debe ser:

- Especifica.
- Realista.
- Proporcional al riesgo.
- Verificable.

## Ejemplo de Reporte

Un hallazgo ficticio puede verse asi:

```text
Una página de laboratorio muestra versión exacta del servidor en headers.
```

Un reporte claro debe separar:

- Titulo.
- Riesgo.
- Evidencia.
- Impacto.
- Remediación.
- Como validar que se corrigio.

## Criterio de Dominio

Puedes avanzar cuando puedas:

- Escribir impacto sin exagerar.
- Proponer remediación clara.
- Separar evidencia de opinion.
- Explicar severidad.
