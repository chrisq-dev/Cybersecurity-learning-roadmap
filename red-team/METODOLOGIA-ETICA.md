# Metodologia y Etica

## Objetivo

Entender como estudiar tecnicas ofensivas de forma responsable. Red Team o pentesting no significa atacar cualquier sistema; significa probar seguridad bajo reglas claras, autorizacion y alcance definido.

Esta seccion existe para fijar el marco. Aprender ofensiva sin etica, alcance y reporte no te hace profesional; te vuelve un riesgo. El objetivo es entrenar pensamiento adversarial para mejorar defensas.

## Mapa Mental

```text
autorizacion -> alcance -> reglas -> prueba controlada -> evidencia -> impacto -> remediacion
```

Si falta autorizacion o alcance, no hay practica profesional.

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

Ejemplo de fuera de alcance:

- Denegacion de servicio.
- Persistencia.
- Exfiltracion de datos reales.
- Ataques a empleados.
- Sistemas de terceros.
- Cambios destructivos.

## Metodologia General

1. Definir alcance.
2. Recolectar informacion permitida.
3. Enumerar servicios.
4. Identificar posibles debilidades.
5. Validar en laboratorio o con permiso.
6. Documentar evidencia.
7. Explicar impacto.
8. Recomendar remediacion.

## Fases de Trabajo

### Preparacion

- Entender objetivo.
- Confirmar autorizacion.
- Definir alcance.
- Preparar ambiente de notas.
- Definir formato de reporte.

### Reconocimiento Permitido

- Revisar informacion dentro del alcance.
- Identificar superficies autorizadas.
- Documentar supuestos.

### Enumeracion

- Identificar servicios.
- Leer banners.
- Revisar versiones.
- Entender rutas y endpoints.
- No explotar sin necesidad.

### Validacion Controlada

- Probar solo lo necesario para demostrar riesgo.
- Evitar impacto innecesario.
- Usar datos de prueba.
- Capturar evidencia minima suficiente.

### Reporte

- Explicar hallazgo.
- Mostrar evidencia segura.
- Describir impacto.
- Dar pasos de reproduccion.
- Proponer remediacion.

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

## Severidad Responsable

No todo hallazgo es critico.

Considera:

- Puede explotarse dentro del alcance?
- Requiere autenticacion?
- Que privilegios obtiene?
- Que datos expone?
- Afecta disponibilidad?
- Hay controles compensatorios?

## Ejemplo de Alcance

Un alcance ficticio puede verse asi:

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

## Ejemplo de Reporte Seguro

Escenario:

```text
En una app local de laboratorio encuentras un panel admin accesible sin autenticacion.
```

Un reporte etico debe explicar:

- alcance;
- hallazgo;
- evidencia sin datos sensibles;
- impacto;
- riesgo;
- remediacion;
- lo que no se hizo para evitar daño.

## Errores Comunes

- Escanear IPs aleatorias.
- Probar sistemas de universidad o trabajo sin permiso.
- Publicar evidencia con secretos.
- Explotar mas de lo necesario.
- No reportar remediacion.
- Confundir laboratorio con mundo real.

## Criterio de Dominio

Puedes avanzar cuando puedas:

- Explicar que es autorizacion.
- Explicar que es alcance.
- Separar prueba responsable de actividad indebida.
- Escribir un reporte con remediacion.
- Explicar por que una prueba esta dentro o fuera de alcance.
