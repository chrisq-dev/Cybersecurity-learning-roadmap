# Detection Engineering

## Objetivo

Aprender a diseñar detecciones mantenibles y utiles, no solo alertas ruidosas.

## Que es Detection Engineering

Es el proceso de crear, probar, desplegar y mantener reglas de deteccion.

Busca responder:

- Que comportamiento queremos detectar?
- Que datos lo prueban?
- Que falsos positivos esperamos?
- Que accion debe tomar el analista?

## Ciclo de Vida

1. Hipotesis.
2. Fuente de datos.
3. Logica de deteccion.
4. Prueba.
5. Tuning.
6. Documentacion.
7. Despliegue.
8. Monitoreo.
9. Mejora.

## Partes de una Deteccion

- Nombre.
- Objetivo.
- Tactica MITRE.
- Tecnica MITRE.
- Fuente de logs.
- Campos requeridos.
- Logica.
- Severidad.
- Falsos positivos.
- Respuesta recomendada.

## Buena Deteccion

Una buena deteccion:

- Tiene contexto.
- Es accionable.
- Tiene pocos falsos positivos.
- Explica que revisar.
- Esta documentada.
- Tiene owner.

## Mala Deteccion

Ejemplo:

```text
Alertar cada vez que se ejecuta powershell.exe.
```

Problema:

- Demasiado ruido.
- PowerShell tambien es legitimo.

Mejor:

```text
PowerShell ejecutado por Office con parametros codificados y conexion externa.
```

## Practica

Diseña deteccion:

```text
Multiples logins fallidos seguidos por login exitoso desde la misma IP.
```

Define:

- Fuentes.
- Campos.
- Ventana temporal.
- Umbral.
- Falsos positivos.
- Severidad.
- Pasos de investigacion.

## Criterio de Dominio

Puedes avanzar cuando puedas:

- Explicar ciclo de detection engineering.
- Diseñar una deteccion accionable.
- Documentar falsos positivos.
- Relacionar deteccion con MITRE.
