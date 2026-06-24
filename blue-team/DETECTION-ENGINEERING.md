# Detection Engineering

## Objetivo

Aprender a diseñar detecciones mantenibles y utiles, no solo alertas ruidosas.

Detection Engineering convierte conocimiento de amenazas en reglas operables. Una deteccion buena no solo dispara una alerta; tambien explica que revisar, por que importa y que hacer despues.

## Mapa Mental

```text
comportamiento -> fuente de datos -> logica -> prueba -> tuning -> documentacion -> operacion
```

La pregunta central:

```text
Que comportamiento malicioso o riesgoso quiero detectar, y que evidencia lo demuestra?
```

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

## Hipotesis de Deteccion

Una hipotesis clara se escribe asi:

```text
Si [comportamiento] ocurre en [entidad] bajo [condiciones], podria indicar [riesgo].
```

Ejemplo:

```text
Si una cuenta tiene muchos logins fallidos y luego uno exitoso desde la misma IP en pocos minutos, podria indicar password spraying o fuerza bruta exitosa.
```

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

## Campos Requeridos

Antes de escribir logica, confirma que los logs tienen campos suficientes:

- usuario;
- IP origen;
- host;
- timestamp;
- resultado;
- proceso;
- command line;
- parent process;
- recurso afectado;
- accion.

Si el campo no existe o no es confiable, la deteccion sera debil.

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

## Medir Calidad

Indicadores:

- precision: cuantas alertas son utiles;
- recall: cuanto comportamiento real cubre;
- tiempo de investigacion;
- falsos positivos;
- falsos negativos conocidos;
- cobertura MITRE;
- claridad del playbook.

## Tuning

Tuning no significa apagar alertas. Significa mejorar contexto.

Ejemplos:

- excluir cuentas de servicio conocidas;
- agregar allowlist temporal con fecha de expiracion;
- subir severidad si el activo es critico;
- agrupar eventos repetidos;
- agregar condiciones de comportamiento.

## Practica Guiada

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

## Mini Laboratorio: Documento de Deteccion

Crea `deteccion-login-exitoso-tras-fallos.md`:

1. Nombre.
2. Hipotesis.
3. Riesgo.
4. Fuente de datos.
5. Campos requeridos.
6. Logica conceptual.
7. MITRE.
8. Severidad.
9. Falsos positivos.
10. Pasos de triage.
11. Acciones de respuesta.
12. Como probarla.

## Errores Comunes

- Detectar herramientas en vez de comportamientos.
- No documentar fuentes y campos.
- No probar con casos benignos.
- No mantener reglas despues de desplegarlas.
- Crear alertas que no tienen accion.
- No definir owner.

## Criterio de Dominio

Puedes avanzar cuando puedas:

- Explicar ciclo de detection engineering.
- Diseñar una deteccion accionable.
- Documentar falsos positivos.
- Relacionar deteccion con MITRE.
- Explicar como medir y ajustar la calidad de una deteccion.
