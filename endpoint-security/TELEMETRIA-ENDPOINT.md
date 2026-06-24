# Telemetria de Endpoint

## Objetivo

Entender que datos de endpoint ayudan a investigar actividad sospechosa.

La telemetria de endpoint es la evidencia que permite reconstruir que hizo un usuario, proceso o archivo en una maquina. Sin telemetria, una alerta queda incompleta.

## Mapa Mental

```text
usuario -> proceso padre -> proceso hijo -> command line -> archivo -> red -> persistencia
```

Una investigacion busca unir esas piezas en una linea de tiempo.

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

## Campos Importantes

| Campo | Pregunta |
| --- | --- |
| Timestamp | Cuando ocurrio? |
| Hostname | En que equipo? |
| Usuario | Con que identidad? |
| Process name | Que se ejecuto? |
| Parent process | Que lo inicio? |
| Command line | Con que argumentos? |
| File hash | Que archivo exacto? |
| Path | Desde donde se ejecuto? |
| Destination IP/domain | A donde se conecto? |
| Action | Fue permitido, bloqueado o detectado? |

## Parent Process

El proceso padre ayuda a entender origen.

Ejemplo sospechoso conceptual:

```text
winword.exe -> powershell.exe
```

No siempre es malicioso, pero requiere contexto.

Ejemplos que merecen revision:

| Cadena | Por que importa |
| --- | --- |
| `winword.exe -> powershell.exe` | posible macro o documento malicioso |
| `excel.exe -> cmd.exe` | posible abuso de Office |
| `browser.exe -> powershell.exe` | descarga/ejecucion sospechosa |
| `service.exe -> unknown.exe` | posible persistencia |
| `explorer.exe -> temp/random.exe` | ejecucion desde ruta temporal |

## Command Line

La linea de comando revela intencion.

Preguntas:

- Descarga archivos?
- Ejecuta contenido codificado?
- Modifica seguridad?
- Crea usuarios?

Senales comunes:

- comandos codificados;
- descarga desde internet;
- ejecucion desde `%TEMP%`;
- desactivacion de antivirus;
- creacion de usuarios;
- compresion de archivos;
- acceso a rutas sensibles;
- uso de herramientas administrativas fuera de contexto.

## Persistencia

Formas comunes:

- Servicios.
- Tareas programadas.
- Run keys.
- Startup folder.
- Agentes instalados.

## Red desde Endpoint

Revisa:

- dominios consultados;
- IP destino;
- puerto;
- proceso que inicio conexion;
- volumen;
- frecuencia;
- reputacion o contexto.

Una conexion externa no es maliciosa por si sola. Importa el proceso, usuario, destino y momento.

## Archivos

Campos utiles:

- ruta;
- hash;
- firma;
- fecha de creacion;
- owner;
- origen;
- si fue descargado;
- si se ejecuto.

## Registro y Configuracion

En Windows, cambios de registro pueden indicar:

- persistencia;
- desactivacion de controles;
- configuracion de servicios;
- ejecucion al inicio.

## Caso de Referencia

Caso:

```text
Usuario abre adjunto. Luego winword.exe inicia powershell.exe y se conecta a internet.
```

Puntos a observar:

- Que evidencia necesitas?
- Que procesos revisas?
- Que conexiones?
- Que accion de contencion consideras?

## Linea de Tiempo Conceptual

| Hora | Evento | Evidencia | Interpretacion |
| --- | --- | --- | --- |
| 10:00 | usuario abre adjunto | proceso Office | inicio del flujo |
| 10:01 | PowerShell ejecutado | parent process | comportamiento sospechoso |
| 10:02 | conexion externa | destino/red | posible descarga o C2 |
| 10:04 | archivo creado | ruta/hash | posible payload |

## Errores Comunes

- Ver un proceso raro y concluir sin contexto.
- Ignorar parent process.
- No revisar command line.
- No revisar conexiones posteriores.
- No preguntar si el usuario esperaba la actividad.
- No preservar hashes/rutas.

## Criterio de Dominio

Puedes avanzar cuando puedas:

- Explicar telemetria endpoint.
- Usar parent process como contexto.
- Identificar persistencia conceptual.
- Formular preguntas de investigacion.
- Construir una linea de tiempo basica de endpoint.
