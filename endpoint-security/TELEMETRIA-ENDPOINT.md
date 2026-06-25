# Telemetria de Endpoint

## Objetivo

Entender que datos de endpoint ayudan a investigar actividad sospechosa.

La telemetria de endpoint es la evidencia que permite reconstruir que hizo un usuario, proceso o archivo en una máquina. Sin telemetria, una alerta queda incompleta.

## Mapa Mental

```text
usuario -> proceso padre -> proceso hijo -> command line -> archivo -> red -> persistencia
```

Una investigación busca unir esas piezas en una linea de tiempo.

## Telemetria Útil

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
| Timestamp | Cuándo ocurrio? |
| Hostname | En qué equipo? |
| Usuario | Con qué identidad? |
| Process name | Qué se ejecuto? |
| Parent process | Qué lo inicio? |
| Command line | Con qué argumentos? |
| File hash | Qué archivo exacto? |
| Path | Desde dónde se ejecuto? |
| Destination IP/domain | A dónde se conecto? |
| Action | Fue permitido, bloqueado o detectado? |

## Parent Process

El proceso padre ayuda a entender origen.

Ejemplo sospechoso conceptual:

```text
winword.exe -> powershell.exe
```

No siempre es malicioso, pero requiere contexto.

Ejemplos que merecen revisión:

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

Señales comunes:

- Comandos codificados;
- Descarga desde internet;
- Ejecucion desde `%TEMP%`;
- Desactivación de antivirus;
- Creación de usuarios;
- Compresion de archivos;
- Acceso a rutas sensibles;
- Uso de herramientas administrativas fuera de contexto.

## Persistencia

Formas comunes:

- Servicios.
- Tareas programadas.
- Run keys.
- Startup folder.
- Agentes instalados.

## Red desde Endpoint

Revisa:

- Dominios consultados;
- IP destino;
- Puerto;
- Proceso que inicio conexión;
- Volumen;
- Frecuencia;
- Reputación o contexto.

Una conexión externa no es maliciosa por si sola. Importa el proceso, usuario, destino y momento.

## Archivos

Campos útiles:

- Ruta;
- Hash;
- Firma;
- Fecha de creación;
- Owner;
- Origen;
- Si fue descargado;
- Si se ejecuto.

## Registro y Configuración

En Windows, cambios de registro pueden indicar:

- Persistencia;
- Desactivación de controles;
- Configuración de servicios;
- Ejecucion al inicio.

## Caso de Referencia

Caso:

```text
Usuario abre adjunto. Luego winword.exe inicia powershell.exe y se conecta a internet.
```

Puntos a observar:

- Qué evidencia necesitas?
- Qué procesos revisas?
- Qué conexiones?
- Qué acción de contención consideras?

## Linea de Tiempo Conceptual

| Hora | Evento | Evidencia | Interpretacion |
| --- | --- | --- | --- |
| 10:00 | usuario abre adjunto | proceso Office | inicio del flujo |
| 10:01 | PowerShell ejecutado | parent process | comportamiento sospechoso |
| 10:02 | conexión externa | destino/red | posible descarga o C2 |
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
- Formular preguntas de investigación.
- Construir una linea de tiempo básica de endpoint.
