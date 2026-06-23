# Respuesta a Incidentes

## Objetivo

Entender como actuar cuando hay una alerta o incidente. La meta es reducir impacto, preservar evidencia y recuperar operaciones.

## Que es un Incidente

Un incidente es un evento que afecta o puede afectar confidencialidad, integridad o disponibilidad.

Ejemplos:

- Cuenta comprometida.
- Malware.
- Exfiltracion.
- Servidor expuesto.
- Acceso no autorizado.
- Ransomware.

## Fases Comunes

### 1. Preparacion

Antes del incidente:

- Logs.
- Backups.
- Playbooks.
- Contactos.
- Herramientas.
- Accesos.

### 2. Identificacion

Determinar si algo es incidente.

Preguntas:

- Que paso?
- Cual es la evidencia?
- Hay impacto?
- Sigue ocurriendo?

### 3. Contencion

Limitar daño.

Ejemplos:

- Bloquear IP.
- Deshabilitar cuenta.
- Aislar endpoint.
- Revocar token.

### 4. Erradicacion

Eliminar causa.

Ejemplos:

- Quitar malware.
- Corregir vulnerabilidad.
- Rotar credenciales.
- Eliminar persistencia.

### 5. Recuperacion

Volver a operar.

Ejemplos:

- Restaurar backups.
- Validar sistemas.
- Monitorear recurrencia.

### 6. Lecciones Aprendidas

Mejorar para el futuro.

Preguntas:

- Que fallo?
- Que funciono?
- Que control falta?
- Que deteccion se debe crear?

## Plantilla de Incidente

```md
# Incidente

## Resumen

## Linea de Tiempo

## Sistemas Afectados

## Evidencia

## Impacto

## Acciones de Contencion

## Acciones de Erradicacion

## Recuperacion

## Lecciones Aprendidas

## Recomendaciones
```

## Practica

Caso simulado:

```text
Una cuenta de usuario tuvo 30 logins fallidos desde una IP externa, luego un login exitoso y descarga de muchos archivos.
```

Escribe:

- Severidad.
- Evidencia.
- Acciones inmediatas.
- Preguntas pendientes.
- Recomendaciones.

## Criterio de Dominio

Puedes avanzar cuando puedas:

- Explicar fases de respuesta.
- Proponer contencion.
- Separar contencion de erradicacion.
- Escribir una linea de tiempo.
