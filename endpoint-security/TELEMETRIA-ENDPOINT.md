# Telemetria de Endpoint

## Objetivo

Entender que datos de endpoint ayudan a investigar actividad sospechosa.

## Telemetria Util

- Procesos.
- Parent process.
- Command line.
- Usuario.
- Hash de archivo.
- Conexiones de red.
- Escritura de archivos.
- Cambios de registro.
- Servicios creados.
- Tareas programadas.

## Parent Process

El proceso padre ayuda a entender origen.

Ejemplo sospechoso conceptual:

```text
winword.exe -> powershell.exe
```

No siempre es malicioso, pero requiere contexto.

## Command Line

La linea de comando revela intencion.

Preguntas:

- Descarga archivos?
- Ejecuta contenido codificado?
- Modifica seguridad?
- Crea usuarios?

## Persistencia

Formas comunes:

- Servicios.
- Tareas programadas.
- Run keys.
- Startup folder.
- Agentes instalados.

## Practica

Caso:

```text
Usuario abre adjunto. Luego winword.exe inicia powershell.exe y se conecta a internet.
```

Responde:

- Que evidencia necesitas?
- Que procesos revisas?
- Que conexiones?
- Que accion de contencion consideras?

## Criterio de Dominio

Puedes avanzar cuando puedas:

- Explicar telemetria endpoint.
- Usar parent process como contexto.
- Identificar persistencia conceptual.
- Formular preguntas de investigacion.
