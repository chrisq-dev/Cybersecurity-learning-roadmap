# Capstone: SOC Investigation

## Objetivo

Simular una investigacion SOC usando logs ficticios, MITRE ATT&CK, detecciones y reporte.

Este proyecto demuestra que puedes trabajar una alerta de principio a fin: triage, evidencia, timeline, hipotesis, severidad, contencion, deteccion y reporte.

## Escenario

Un usuario presenta multiples logins fallidos, un login exitoso y actividad posterior sospechosa.

## Datos de Referencia

El caso puede apoyarse en datos ficticios como:

- logs de autenticacion;
- resumen de eventos por usuario;
- resumen de eventos por IP;
- timeline;
- reporte de analisis.

No importa la ruta exacta de los archivos. Importa que los datos sean ficticios o autorizados y que permitan razonar sin exponer informacion sensible.

## Alcance

Incluido:

- analisis de logs ficticios;
- timeline;
- MITRE ATT&CK;
- severidad;
- contencion;
- deteccion propuesta;
- reporte ejecutivo.

Fuera de alcance:

- atribucion de actores;
- acciones contra sistemas reales;
- escaneo externo;
- uso de datos reales.

## Puntos a observar

1. Entender que informacion aportan los logs.
2. Separar eventos relevantes de ruido.
3. Reconstruir una linea de tiempo.
4. Formular hipotesis.
5. Mapear con MITRE ATT&CK.
6. Proponer contencion.
7. Proponer deteccion.
8. Escribir reporte final.

## Fase 1: Triage

El triage debe aclarar:

- Que alerta inicia el caso?
- Que usuario esta involucrado?
- Que IP origen aparece?
- Hay login exitoso?
- Hay actividad posterior?
- Que severidad inicial asignas?

## Fase 2: Timeline

Formato:

| Hora | Fuente | Evento | Evidencia | Interpretacion |
| --- | --- | --- | --- | --- |

La interpretacion no debe mezclarse con el evento. Primero hechos, despues hipotesis.

## Fase 3: Hipotesis

Escribe al menos dos:

```text
H1: La cuenta fue comprometida mediante fuerza bruta.
H2: El usuario escribio mal su password y luego inicio sesion legitimamente.
```

Despues indica que evidencia apoya o contradice cada una.

## Fase 4: MITRE

Mapea comportamiento, no solo nombres:

| Evidencia | Tactica | Tecnica | Justificacion |
| --- | --- | --- | --- |

## Fase 5: Respuesta

Propone:

- contencion inmediata;
- erradicacion;
- recuperacion;
- monitoreo posterior;
- comunicacion necesaria.

## Fase 6: Deteccion

Documenta una regla conceptual:

- nombre;
- fuente;
- campos;
- condicion;
- ventana;
- umbral;
- falsos positivos;
- severidad;
- pasos de triage.

## Estructura sugerida

```md
# SOC Investigation

## Resumen Ejecutivo

## Alcance

## Evidencia

## Timeline

## Analisis

## MITRE ATT&CK

## Severidad

## Recomendaciones

## Deteccion Propuesta

## Lecciones Aprendidas
```

## Criterio de Exito

- El reporte diferencia evidencia de hipotesis.
- Hay timeline.
- Hay recomendacion accionable.
- Hay deteccion propuesta.
- Hay severidad justificada.
- Hay MITRE con justificacion.
- Hay falsos positivos.
- Hay lecciones aprendidas.

## Rubrica

| Nivel | Evidencia |
| --- | --- |
| Basico | Describe eventos |
| Bueno | Timeline e hipotesis claras |
| Fuerte | Propone contencion y deteccion |
| Portafolio | Reporte ejecutivo completo, claro y accionable |
