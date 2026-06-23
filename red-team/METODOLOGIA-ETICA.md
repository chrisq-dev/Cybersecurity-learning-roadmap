# Metodologia y Etica

## Objetivo

Entender como estudiar tecnicas ofensivas de forma responsable. Red Team o pentesting no significa atacar cualquier sistema; significa probar seguridad bajo reglas claras, autorizacion y alcance definido.

## Regla Principal

Solo se prueba en:

- Sistemas propios.
- Laboratorios locales.
- Plataformas diseñadas para practica.
- Entornos donde tienes autorizacion explicita.

No se prueba en:

- Empresas sin permiso.
- IPs aleatorias.
- Redes publicas.
- Cuentas de terceros.
- Sistemas de universidad, trabajo o clientes sin autorizacion formal.

## Alcance

El alcance define que se puede probar.

Debe responder:

- Que sistemas estan permitidos?
- Que tecnicas estan permitidas?
- Que horarios aplican?
- Que datos no se deben tocar?
- A quien reportar problemas?
- Que esta fuera de alcance?

## Metodologia General

1. Definir alcance.
2. Recolectar informacion permitida.
3. Enumerar servicios.
4. Identificar posibles debilidades.
5. Validar en laboratorio o con permiso.
6. Documentar evidencia.
7. Explicar impacto.
8. Recomendar remediacion.

## Pensamiento Correcto

El objetivo no es "romper por romper". El objetivo es:

- Encontrar riesgo real.
- Probarlo de forma controlada.
- Documentarlo con claridad.
- Ayudar a corregirlo.

## Evidencia Responsable

Buena evidencia:

- Muestra que el problema existe.
- Evita exponer datos sensibles.
- Es reproducible dentro del alcance.
- Incluye fecha, sistema y contexto.

Mala evidencia:

- Publica credenciales.
- Extrae datos innecesarios.
- Muestra informacion privada.
- No explica impacto ni remediacion.

## Practica

Escribe un alcance ficticio:

```md
# Alcance de Laboratorio

## Permitido

- Maquina local vulnerable.
- Red privada de laboratorio.
- Herramientas de enumeracion basica.

## No Permitido

- Sistemas reales.
- IPs publicas.
- Exfiltrar datos.
- Persistencia.

## Objetivo

Aprender enumeracion y reporte.
```

## Criterio de Dominio

Puedes avanzar cuando puedas:

- Explicar que es autorizacion.
- Explicar que es alcance.
- Separar prueba responsable de actividad indebida.
- Escribir un reporte con remediacion.
