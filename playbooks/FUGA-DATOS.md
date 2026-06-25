# Playbook: Fuga de Datos

## Objetivo

Investigar posible exposición o extraccion de datos.

## Severidad Inicial

Sube severidad si:

- Hay datos personales o sensibles;
- Volumen alto;
- Datos expuestos a internet;
- Tercero no autorizado accedio;
- Hay obligacion contractual o legal;
- La exposición sigue activa.

## Señales

- Descarga masiva.
- Acceso a datos sensibles.
- Bucket público.
- Exportaciones inusuales.
- Tráfico saliente anomalo.
- Credenciales expuestas.

## Evidencia

- Que datos.
- Cuanto volumen.
- Quien accedio.
- Desde donde.
- Cuando.
- Como se detecto.
- Si hubo terceros.

## Primeros 15 Minutos

1. Confirmar que dato está involucrado.
2. Contener exposición activa.
3. Preservar logs.
4. Identificar owner del sistema.
5. Evitar borrar evidencia.
6. Escalar según proceso interno.

## Pasos

1. Confirmar tipo de dato.
2. Determinar alcance.
3. Contener acceso.
4. Preservar logs.
5. Identificar causa.
6. Evaluar impacto.
7. Notificar según proceso interno.
8. Remediar control.
9. Documentar lecciones.

## Clasificación de Datos

| Tipo | Ejemplo | Impacto |
| --- | --- | --- |
| Público | información publicada | bajo |
| Interno | documentacion interna | medio |
| Confidencial | datos de clientes | alto |
| Sensible | credenciales, salud, financiero | crítico |

## Contención

- Revocar acceso.
- Hacer privado storage.
- Rotar credenciales.
- Bloquear exfiltración.
- Deshabilitar cuenta comprometida.

## Análisis de Alcance

El análisis de alcance debe aclarar:

- Que datos;
- Cuantos registros;
- Durante cuanto tiempo;
- Quien accedio;
- Desde donde;
- Si hubo descarga;
- Si hay copia externa;
- Que logs lo prueban.

## Preguntas

- Son datos personales?
- Son datos sensibles?
- Hay obligacion de notificacion?
- Qué control fallo?

## Cierre

Puedes cerrar cuando:

- Exposición contenida;
- Alcance documentado;
- Owner informado;
- Controles corregidos;
- Notificacion evaluada por responsables;
- Monitoreo posterior definido.
