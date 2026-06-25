# Metodología y Ética

## Objetivo

Entender como estudiar técnicas ofensivas de forma responsable. Red Team o pentesting no significa atacar cualquier sistema; significa probar seguridad bajo reglas claras, autorización y alcance definido.

Esta sección existe para fijar el marco. Aprender ofensiva sin ética, alcance y reporte no te hace profesional; te vuelve un riesgo. El objetivo es entrenar pensamiento adversarial para mejorar defensas.

## Mapa Mental

```text
autorización -> alcance -> reglas -> prueba controlada -> evidencia -> impacto -> remediación
```

Si falta autorización o alcance, no hay práctica profesional.

## Regla Principal

Solo se prueba en:

- Sistemas propios.
- Laboratorios locales.
- Plataformas diseñadas para práctica.
- Entornos donde tienes autorización explícita.

No se prueba en:

- Empresas sin permiso.
- IPs aleatorias.
- Redes públicas.
- Cuentas de terceros.
- Sistemas de universidad, trabajo o clientes sin autorización formal.

## Alcance

El alcance define que se puede probar.

Debe responder:

- Qué sistemas están permitidos?
- Qué técnicas están permitidas?
- Qué horarios aplican?
- Qué datos no se deben tocar?
- A quién reportar problemas?
- Qué está fuera de alcance?

Ejemplo de fuera de alcance:

- Denegación de servicio.
- Persistencia.
- Exfiltración de datos reales.
- Ataques a empleados.
- Sistemas de terceros.
- Cambios destructivos.

## Metodología General

1. Definir alcance.
2. Recolectar información permitida.
3. Enumerar servicios.
4. Identificar posibles debilidades.
5. Validar en laboratorio o con permiso.
6. Documentar evidencia.
7. Explicar impacto.
8. Recomendar remediación.

## Fases de Trabajo

### Preparacion

- Entender objetivo.
- Confirmar autorización.
- Definir alcance.
- Preparar ambiente de notas.
- Definir formato de reporte.

### Reconocimiento Permitido

- Revisar información dentro del alcance.
- Identificar superficies autorizadas.
- Documentar supuestos.

### Enumeración

- Identificar servicios.
- Leer banners.
- Revisar versiones.
- Entender rutas y endpoints.
- No explotar sin necesidad.

### Validación Controlada

- Probar solo lo necesario para demostrar riesgo.
- Evitar impacto innecesario.
- Usar datos de prueba.
- Capturar solo la información necesaria para demostrar riesgo.

### Reporte

- Explicar hallazgo.
- Mostrar evidencia segura.
- Describir impacto.
- Dar pasos de reproducción.
- Proponer remediación.

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

- Pública credenciales.
- Extrae datos innecesarios.
- Muestra información privada.
- No explica impacto ni remediación.

## Severidad Responsable

No todo hallazgo es crítico.

Considera:

- Puede explotarse dentro del alcance?
- Requiere autenticación?
- Qué privilegios obtiene?
- Qué datos expone?
- Afecta disponibilidad?
- Hay controles compensatorios?

## Ejemplo de Alcance

Un alcance ficticio puede verse asi:

```md
# Alcance de Laboratorio

## Permitido

- Máquina local vulnerable.
- Red privada de laboratorio.
- Herramientas de enumeracion básica.

## No Permitido

- Sistemas reales.
- IPs públicas.
- Exfiltrar datos.
- Persistencia.

## Objetivo

Aprender enumeracion y reporte.
```

## Ejemplo de Reporte Seguro

Escenario:

```text
En una app local de laboratorio encuentras un panel admin accesible sin autenticación.
```

Un reporte ético debe explicar:

- Alcance;
- Hallazgo;
- Evidencia sin datos sensibles;
- Impacto;
- Riesgo;
- Remediación;
- Lo que no se hizo para evitar daño.

## Errores Comunes

- Escanear IPs aleatorias.
- Probar sistemas de universidad o trabajo sin permiso.
- Publicar evidencia con secretos.
- Explotar más de lo necesario.
- No reportar remediación.
- Confundir laboratorio con mundo real.

## Criterio de Dominio

Puedes avanzar cuando puedas:

- Explicar que es autorización.
- Explicar que es alcance.
- Separar prueba responsable de actividad indebida.
- Escribir un reporte con remediación.
- Explicar por que una prueba está dentro o fuera de alcance.
