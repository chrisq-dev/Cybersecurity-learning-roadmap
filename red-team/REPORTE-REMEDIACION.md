# Reporte y Remediacion

## Objetivo

Aprender a convertir hallazgos tecnicos en informacion util para corregir riesgos.

## Un Hallazgo Debe Tener

- Titulo claro.
- Severidad.
- Sistema afectado.
- Descripcion.
- Evidencia.
- Impacto.
- Pasos de reproduccion controlados.
- Remediacion.
- Referencias.

## Severidad

La severidad no depende solo de la tecnica. Depende de:

- Impacto.
- Probabilidad.
- Exposicion.
- Sensibilidad de datos.
- Facilidad de explotacion.
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

Puede aumentar exposicion ante ciertos ataques del lado del cliente si existen otras fallas.

## Remediacion

Configurar headers como Content-Security-Policy, X-Content-Type-Options y Strict-Transport-Security cuando aplique.
```

## Buen Reporte vs Mal Reporte

Mal reporte:

```text
La app es insegura.
```

Buen reporte:

```text
El endpoint /admin permite acceso a usuarios sin rol administrativo. Esto permite que un usuario autenticado no privilegiado vea funciones administrativas. Se recomienda validar autorizacion en servidor para cada request.
```

## Remediacion

Una buena remediacion debe ser:

- Especifica.
- Realista.
- Proporcional al riesgo.
- Verificable.

## Ejemplo de Reporte

Un hallazgo ficticio puede verse asi:

```text
Una pagina de laboratorio muestra version exacta del servidor en headers.
```

Un reporte claro debe separar:

- Titulo.
- Riesgo.
- Evidencia.
- Impacto.
- Remediacion.
- Como validar que se corrigio.

## Criterio de Dominio

Puedes avanzar cuando puedas:

- Escribir impacto sin exagerar.
- Proponer remediacion clara.
- Separar evidencia de opinion.
- Explicar severidad.
