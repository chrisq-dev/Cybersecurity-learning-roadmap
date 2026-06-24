# Playbook: Fuga de Datos

## Objetivo

Investigar posible exposicion o extraccion de datos.

## Severidad Inicial

Sube severidad si:

- hay datos personales o sensibles;
- volumen alto;
- datos expuestos a internet;
- tercero no autorizado accedio;
- hay obligacion contractual o legal;
- la exposicion sigue activa.

## Señales

- Descarga masiva.
- Acceso a datos sensibles.
- Bucket publico.
- Exportaciones inusuales.
- Trafico saliente anomalo.
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

1. Confirmar que dato esta involucrado.
2. Contener exposicion activa.
3. Preservar logs.
4. Identificar owner del sistema.
5. Evitar borrar evidencia.
6. Escalar segun proceso interno.

## Pasos

1. Confirmar tipo de dato.
2. Determinar alcance.
3. Contener acceso.
4. Preservar logs.
5. Identificar causa.
6. Evaluar impacto.
7. Notificar segun proceso interno.
8. Remediar control.
9. Documentar lecciones.

## Clasificacion de Datos

| Tipo | Ejemplo | Impacto |
| --- | --- | --- |
| Publico | informacion publicada | bajo |
| Interno | documentacion interna | medio |
| Confidencial | datos de clientes | alto |
| Sensible | credenciales, salud, financiero | critico |

## Contencion

- Revocar acceso.
- Hacer privado storage.
- Rotar credenciales.
- Bloquear exfiltracion.
- Deshabilitar cuenta comprometida.

## Analisis de Alcance

El analisis de alcance debe aclarar:

- que datos;
- cuantos registros;
- durante cuanto tiempo;
- quien accedio;
- desde donde;
- si hubo descarga;
- si hay copia externa;
- que logs lo prueban.

## Preguntas

- Son datos personales?
- Son datos sensibles?
- Hay obligacion de notificacion?
- Que control fallo?

## Cierre

Puedes cerrar cuando:

- exposicion contenida;
- alcance documentado;
- owner informado;
- controles corregidos;
- notificacion evaluada por responsables;
- monitoreo posterior definido.
