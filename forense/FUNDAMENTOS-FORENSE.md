# Fundamentos de Forense Digital

## Objetivo

Entender como preservar y analizar evidencia sin destruirla.

Forense digital busca reconstruir hechos. En seguridad operativa, no siempre haces forense formal legal, pero si necesitas disciplina: preservar evidencia, documentar acciones y separar hechos de hipótesis.

## Mapa Mental

```text
evidencia -> preservación -> copia -> hash -> análisis -> timeline -> conclusión
```

La pregunta central:

```text
Qué evidencia prueba lo qué creemos qué paso?
```

## Qué es Forense Digital

Forense digital busca responder:

- Qué paso?
- Cuándo paso?
- Cómo paso?
- Qué sistemas fueron afectados?
- Qué evidencia lo prueba?

## Evidencia

Ejemplos:

- Logs.
- Archivos.
- Memoria.
- Imagen de disco.
- Eventos de Windows.
- Historial de comandos.
- Tráfico de red.

## Tipos de Evidencia

### Volatil

Puede perderse rápido:

- Memoria;
- Procesos;
- Conexiones activas;
- Sesiones;
- Comandos recientes;
- Archivos temporales.

### No Volatil

Permanece más tiempo:

- Disco;
- Logs;
- Registros;
- Archivos;
- Backups;
- Snapshots.

El orden de recoleccion importa porque algunas evidencias desaparecen al reiniciar o apagar.

## Cadena de Custodia

Registro de quien tuvo la evidencia, cuando y que hizo con ella.

Importa porque:

- Protege integridad.
- Permite auditoria.
- Evita dudas sobre manipulacion.

Una entrada mínima:

| Campo | Descripcion |
| --- | --- |
| Evidencia | Que se recolecto |
| Hash | Integridad |
| Fecha/hora | Cuando |
| Persona | Quien |
| Acción | Que hizo |
| Ubicación | Donde se guarda |

## Principio Básico

No modificar evidencia original si puedes evitarlo.

Buenas prácticas:

- Trabajar con copias.
- Calcular hashes.
- Documentar acciones.
- Registrar fechas y herramientas.

## Hashes

Un hash ayuda a demostrar que un archivo no cambio.

Ejemplos:

- SHA256 para archivos;
- Hash antes y después de copiar;
- Registro en notas de caso.

## Timeline

Una linea de tiempo ordena eventos.

Ejemplo:

```text
10:00 login fallido
10:02 login exitoso
10:05 descarga de archivo
10:10 cambio de contraseña
```

Un buen timeline incluye:

- Zona horaria;
- Fuente de log;
- Usuario;
- Sistema;
- Evento;
- Interpretacion separada del hecho.

## Preguntas Forenses

- Cuál fue el primer evento conocido?
- Qué usuario estuvo involucrado?
- Qué archivos cambiaron?
- Qué procesos se ejecutaron?
- Qué conexiones ocurrieron?
- Hay persistencia?

## Hechos vs Hipótesis

Hecho:

```text
El usuario admin inicio sesion a las 03:12 desde 198.51.100.10.
```

Hipótesis:

```text
La cuenta admin pudo estar comprometida.
```

Conclusión:

```text
Con base en login inusual, descarga masiva y ausencia de viaje registrado, la hipótesis de compromiso es probable.
```

## Ejemplo de Análisis

Con logs ficticios, un análisis forense básico debe reconstruir:

- Timeline.
- Evidencia clave.
- Hipótesis.
- Preguntas pendientes.
- Conclusión.

## Criterios Para un Timeline Forense

Un timeline forense debe ayudar a reconstruir hechos sin mezclar conclusiones prematuras. Debe considerar:

- Eventos ordenados por tiempo;
- Fuente de cada evento;
- Zona horaria;
- Separación entre hechos e hipótesis;
- Conclusión sustentada;
- Evidencia faltante;
- Integridad de archivos cuando aplique.

## Errores Comunes

- Analizar el original sin copia.
- No registrar zona horaria.
- Mezclar hechos con opiniones.
- No calcular hashes.
- Cambiar timestamps por abrir archivos sin cuidado.
- No documentar herramientas usadas.

## Criterio de Dominio

Puedes avanzar cuando puedas:

- Explicar evidencia.
- Explicar cadena de custodia.
- Reconstruir una linea de tiempo.
- Separar hechos de hipótesis.
- Documentar integridad con hashes y notas claras.
