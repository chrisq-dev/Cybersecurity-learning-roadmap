# Fundamentos de Forense Digital

## Objetivo

Entender como preservar y analizar evidencia sin destruirla.

Forense digital busca reconstruir hechos. En seguridad operativa, no siempre haces forense formal legal, pero si necesitas disciplina: preservar evidencia, documentar acciones y separar hechos de hipotesis.

## Mapa Mental

```text
evidencia -> preservacion -> copia -> hash -> analisis -> timeline -> conclusion
```

La pregunta central:

```text
Que evidencia prueba lo que creemos que paso?
```

## Que es Forense Digital

Forense digital busca responder:

- Que paso?
- Cuando paso?
- Como paso?
- Que sistemas fueron afectados?
- Que evidencia lo prueba?

## Evidencia

Ejemplos:

- Logs.
- Archivos.
- Memoria.
- Imagen de disco.
- Eventos de Windows.
- Historial de comandos.
- Trafico de red.

## Tipos de Evidencia

### Volatil

Puede perderse rapido:

- memoria;
- procesos;
- conexiones activas;
- sesiones;
- comandos recientes;
- archivos temporales.

### No Volatil

Permanece mas tiempo:

- disco;
- logs;
- registros;
- archivos;
- backups;
- snapshots.

El orden de recoleccion importa porque algunas evidencias desaparecen al reiniciar o apagar.

## Cadena de Custodia

Registro de quien tuvo la evidencia, cuando y que hizo con ella.

Importa porque:

- Protege integridad.
- Permite auditoria.
- Evita dudas sobre manipulacion.

Una entrada minima:

| Campo | Descripcion |
| --- | --- |
| Evidencia | Que se recolecto |
| Hash | Integridad |
| Fecha/hora | Cuando |
| Persona | Quien |
| Accion | Que hizo |
| Ubicacion | Donde se guarda |

## Principio Basico

No modificar evidencia original si puedes evitarlo.

Buenas practicas:

- Trabajar con copias.
- Calcular hashes.
- Documentar acciones.
- Registrar fechas y herramientas.

## Hashes

Un hash ayuda a demostrar que un archivo no cambio.

Ejemplos:

- SHA256 para archivos;
- hash antes y despues de copiar;
- registro en notas de caso.

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

- zona horaria;
- fuente de log;
- usuario;
- sistema;
- evento;
- interpretacion separada del hecho.

## Preguntas Forenses

- Cual fue el primer evento conocido?
- Que usuario estuvo involucrado?
- Que archivos cambiaron?
- Que procesos se ejecutaron?
- Que conexiones ocurrieron?
- Hay persistencia?

## Hechos vs Hipotesis

Hecho:

```text
El usuario admin inicio sesion a las 03:12 desde 198.51.100.10.
```

Hipotesis:

```text
La cuenta admin pudo estar comprometida.
```

Conclusion:

```text
Con base en login inusual, descarga masiva y ausencia de viaje registrado, la hipotesis de compromiso es probable.
```

## Ejemplo de Analisis

Con logs ficticios, un analisis forense basico debe reconstruir:

- Timeline.
- Evidencia clave.
- Hipotesis.
- Preguntas pendientes.
- Conclusion.

## Criterios Para un Timeline Forense

Un timeline forense debe ayudar a reconstruir hechos sin mezclar conclusiones prematuras. Debe considerar:

- eventos ordenados por tiempo;
- fuente de cada evento;
- zona horaria;
- separacion entre hechos e hipotesis;
- conclusion sustentada;
- evidencia faltante;
- integridad de archivos cuando aplique.

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
- Crear timeline.
- Separar hechos de hipotesis.
- Documentar integridad con hashes y notas claras.
