# Detection Engineering

## Objetivo

Aprender a diseñar detecciones mantenibles y útiles, no solo alertas ruidosas.

Detection Engineering convierte conocimiento de amenazas en reglas operables. Una detección buena no solo dispara una alerta; también explica que revisar, por que importa y que hacer después.

## Mapa Mental

```text
comportamiento -> fuente de datos -> lógica -> prueba -> tuning -> documentacion -> operacion
```

La pregunta central:

```text
Qué comportamiento malicioso o riesgoso quiero detectar, y qué evidencia lo demuestra?
```

## Qué es Detection Engineering

Es el proceso de crear, probar, desplegar y mantener reglas de detección.

Busca responder:

- Qué comportamiento queremos detectar?
- Qué datos lo prueban?
- Qué falsos positivos esperamos?
- Qué acción debe tomar el analista?

## Ciclo de Vida

1. Hipótesis.
2. Fuente de datos.
3. Lógica de detección.
4. Prueba.
5. Tuning.
6. Documentacion.
7. Despliegue.
8. Monitoreo.
9. Mejora.

## Hipótesis de Detección

Una hipótesis clara se escribe asi:

```text
Si [comportamiento] ocurre en [entidad] bajo [condiciones], podria indicar [riesgo].
```

Ejemplo:

```text
Si una cuenta tiene muchos logins fallidos y luego uno exitoso desde la misma IP en pocos minutos, podria indicar password spraying o fuerza bruta exitosa.
```

## Partes de una Detección

- Nombre.
- Objetivo.
- Tactica MITRE.
- Técnica MITRE.
- Fuente de logs.
- Campos requeridos.
- Lógica.
- Severidad.
- Falsos positivos.
- Respuesta recomendada.

## Campos Requeridos

Antes de escribir lógica, confirma que los logs tienen campos suficientes:

- Usuario;
- IP origen;
- Host;
- Timestamp;
- Resultado;
- Proceso;
- Command line;
- Parent process;
- Recurso afectado;
- Acción.

Si el campo no existe o no es confiable, la detección sera débil.

## Buena Detección

Una buena detección:

- Tiene contexto.
- Es accionable.
- Tiene pocos falsos positivos.
- Explica que revisar.
- Está documentada.
- Tiene owner.

## Mala Detección

Ejemplo:

```text
Alertar cada vez que se ejecuta powershell.exe.
```

Problema:

- Demasiado ruido.
- PowerShell también es legitimo.

Mejor:

```text
PowerShell ejecutado por Office con parametros codificados y conexion externa.
```

## Medir Calidad

Indicadores:

- Precision: cuantas alertas son útiles;
- Recall: cuanto comportamiento real cubre;
- Tiempo de investigación;
- Falsos positivos;
- Falsos negativos conocidos;
- Cobertura MITRE;
- Claridad del playbook.

## Tuning

Tuning no significa apagar alertas. Significa mejorar contexto.

Ejemplos:

- Excluir cuentas de servicio conocidas;
- Agregar allowlist temporal con fecha de expiracion;
- Subir severidad si el activo es crítico;
- Agrupar eventos repetidos;
- Agregar condiciones de comportamiento.

## Ejemplo de Diseño

Una detección común busca:

```text
Múltiples logins fallidos seguidos por login exitoso desde la misma IP.
```

Debe definir:

- Fuentes.
- Campos.
- Ventana temporal.
- Umbral.
- Falsos positivos.
- Severidad.
- Pasos de investigación.

## Criterios de una Detección

Una detección bien pensada debe describir:

- Nombre;
- Hipótesis;
- Riesgo;
- Fuente de datos;
- Campos requeridos;
- Lógica conceptual;
- MITRE;
- Severidad;
- Falsos positivos;
- Pasos de triage;
- Acciones de respuesta;
- Forma segura de probarla.

## Errores Comunes

- Detectar herramientas en vez de comportamientos.
- No documentar fuentes y campos.
- No probar con casos benignos.
- No mantener reglas después de desplegarlas.
- Crear alertas que no tienen acción.
- No definir owner.

## Criterio de Dominio

Puedes avanzar cuando puedas:

- Explicar ciclo de detection engineering.
- Diseñar una detección accionable.
- Documentar falsos positivos.
- Relacionar detección con MITRE.
- Explicar como medir y ajustar la calidad de una detección.
