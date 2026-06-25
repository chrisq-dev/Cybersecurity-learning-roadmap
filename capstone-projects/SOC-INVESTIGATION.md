# Capstone: SOC Investigation

## Objetivo

Simular una investigación SOC usando logs ficticios, MITRE ATT&CK, detecciones y reporte.

Este proyecto demuestra que puedes trabajar una alerta de principio a fin: triage, evidencia, timeline, hipótesis, severidad, contención, detección y reporte.

## Escenario

Un usuario presenta múltiples logins fallidos, un login exitoso y actividad posterior sospechosa.

## Datos de Referencia

El caso puede apoyarse en datos ficticios como:

- Logs de autenticación;
- Resumen de eventos por usuario;
- Resumen de eventos por IP;
- Timeline;
- Reporte de análisis.

No importa la ruta exacta de los archivos. Importa que los datos sean ficticios o autorizados y que permitan razonar sin exponer información sensible.

## Alcance

Incluido:

- Análisis de logs ficticios;
- Timeline;
- MITRE ATT&CK;
- Severidad;
- Contención;
- Detección propuesta;
- Reporte ejecutivo.

Fuera de alcance:

- Atribución de actores;
- Acciones contra sistemas reales;
- Escaneo externo;
- Uso de datos reales.

## Puntos a observar

1. Entender que información aportan los logs.
2. Separar eventos relevantes de ruido.
3. Reconstruir una linea de tiempo.
4. Formular hipótesis.
5. Mapear con MITRE ATT&CK.
6. Proponer contención.
7. Proponer detección.
8. Escribir reporte final.

## Fase 1: Triage

El triage debe aclarar:

- Qué alerta inicia el caso?
- Qué usuario está involucrado?
- Qué IP origen aparece?
- Hay login exitoso?
- Hay actividad posterior?
- Qué severidad inicial asignas?

## Fase 2: Timeline

Formato:

| Hora | Fuente | Evento | Evidencia | Interpretacion |
| --- | --- | --- | --- | --- |

La interpretacion no debe mezclarse con el evento. Primero hechos, después hipótesis.

## Fase 3: Hipótesis

Escribe al menos dos:

```text
H1: La cuenta fue comprometida mediante fuerza bruta.
H2: El usuario escribio mal su password y luego inicio sesion legitimamente.
```

Después indica que evidencia apoya o contradice cada una.

## Fase 4: MITRE

Mapea comportamiento, no solo nombres:

| Evidencia | Tactica | Técnica | Justificacion |
| --- | --- | --- | --- |

## Fase 5: Respuesta

Propone:

- Contención inmediata;
- Erradicacion;
- Recuperación;
- Monitoreo posterior;
- Comunicación necesaria.

## Fase 6: Detección

Documenta una regla conceptual:

- Nombre;
- Fuente;
- Campos;
- Condicion;
- Ventana;
- Umbral;
- Falsos positivos;
- Severidad;
- Pasos de triage.

## Estructura sugerida

```md
# SOC Investigation

## Resumen Ejecutivo

## Alcance

## Evidencia

## Timeline

## Análisis

## MITRE ATT&CK

## Severidad

## Recomendaciones

## Detección Propuesta

## Lecciones Aprendidas
```

## Criterio de Éxito

- El reporte diferencia evidencia de hipótesis.
- Hay timeline.
- Hay recomendación accionable.
- Hay detección propuesta.
- Hay severidad justificada.
- Hay MITRE con justificacion.
- Hay falsos positivos.
- Hay lecciones aprendidas.

## Rúbrica

| Nivel | Evidencia |
| --- | --- |
| Básico | Describe eventos |
| Bueno | Timeline e hipótesis claras |
| Fuerte | Propone contención y detección |
| Portafolio | Reporte ejecutivo completo, claro y accionable |
