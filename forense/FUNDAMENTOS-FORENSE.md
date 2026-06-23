# Fundamentos de Forense Digital

## Objetivo

Entender como preservar y analizar evidencia sin destruirla.

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

## Cadena de Custodia

Registro de quien tuvo la evidencia, cuando y que hizo con ella.

Importa porque:

- Protege integridad.
- Permite auditoria.
- Evita dudas sobre manipulacion.

## Principio Basico

No modificar evidencia original si puedes evitarlo.

Buenas practicas:

- Trabajar con copias.
- Calcular hashes.
- Documentar acciones.
- Registrar fechas y herramientas.

## Timeline

Una linea de tiempo ordena eventos.

Ejemplo:

```text
10:00 login fallido
10:02 login exitoso
10:05 descarga de archivo
10:10 cambio de contraseña
```

## Preguntas Forenses

- Cual fue el primer evento conocido?
- Que usuario estuvo involucrado?
- Que archivos cambiaron?
- Que procesos se ejecutaron?
- Que conexiones ocurrieron?
- Hay persistencia?

## Practica

Usa logs ficticios y crea:

- Timeline.
- Evidencia clave.
- Hipotesis.
- Preguntas pendientes.
- Conclusion.

## Criterio de Dominio

Puedes avanzar cuando puedas:

- Explicar evidencia.
- Explicar cadena de custodia.
- Crear timeline.
- Separar hechos de hipotesis.
