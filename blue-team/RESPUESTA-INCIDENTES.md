# Respuesta a Incidentes

## Objetivo

Entender como actuar cuando hay una alerta o incidente. La meta es reducir impacto, preservar evidencia y recuperar operaciones.

Respuesta a incidentes no es improvisar bajo presion. Es seguir un proceso que permita decidir rápido, proteger evidencia, contener dano y aprender para que no se repita.

## Mapa Mental

```text
alerta -> triage -> severidad -> contencion -> erradicacion -> recuperacion -> lecciones
```

La regla práctica:

```text
primero entiende suficiente, luego contiene sin destruir evidencia innecesariamente
```

## Qué es un Incidente

Un incidente es un evento que afecta o puede afectar confidencialidad, integridad o disponibilidad.

Ejemplos:

- Cuenta comprometida.
- Malware.
- Exfiltración.
- Servidor expuesto.
- Acceso no autorizado.
- Ransomware.

## Evento vs Alerta vs Incidente

- Evento: algo ocurrio.
- Alerta: una regla o herramienta marco algo como relevante.
- Incidente: hay impacto real o riesgo significativo que requiere respuesta coordinada.

No toda alerta es incidente, pero toda alerta importante debe evaluarse.

## Fases Comunes

### 1. Preparacion

Antes del incidente:

- Logs.
- Backups.
- Playbooks.
- Contactos.
- Herramientas.
- Accesos.

También:

- Matriz de severidad;
- Canales de comunicación;
- Roles y responsabilidades;
- Plantillas;
- Criterios de escalacion;
- Simulacros.

### 2. Identificación

Determinar si algo es incidente.

Preguntas:

- Qué paso?
- Cuál es la evidencia?
- Hay impacto?
- Sigue ocurriendo?

## Triage

Preguntas iniciales:

- Qué activo está involucrado?
- Qué usuario?
- Qué hora?
- Qué fuente genero la alerta?
- Hay actividad relacionada?
- Hay datos sensibles?
- El ataque sigue activo?
- Qué acción inmediata reduce impacto?

### 3. Contención

Limitar daño.

Ejemplos:

- Bloquear IP.
- Deshabilitar cuenta.
- Aislar endpoint.
- Revocar token.

Contención puede ser:

- Corta: detener dano inmediato;
- Larga: mantener operación segura mientras se remedia.

Ejemplo:

```text
Deshabilitar cuenta comprometida = contencion corta.
Forzar MFA y revisar sesiones activas = contencion adicional.
```

### 4. Erradicacion

Eliminar causa.

Ejemplos:

- Quitar malware.
- Corregir vulnerabilidad.
- Rotar credenciales.
- Eliminar persistencia.

Erradicacion busca aclarar:

- Cómo entro?
- Qué permitio qué ocurriera?
- Qué debe eliminarse o corregirse?
- Qué credenciales deben rotarse?

### 5. Recuperación

Volver a operar.

Ejemplos:

- Restaurar backups.
- Validar sistemas.
- Monitorear recurrencia.

Recuperar no es solo encender sistemas. Debes validar que el riesgo fue reducido y que hay monitoreo reforzado.

### 6. Lecciones Aprendidas

Mejorar para el futuro.

Preguntas:

- Qué fallo?
- Qué funciono?
- Qué control falta?
- Qué detección se debe crear?

## Severidad

Considera:

- Criticidad del activo;
- Tipo de dato;
- Cantidad de usuarios afectados;
- Privilegios involucrados;
- Alcance;
- Continuidad del ataque;
- Impacto legal o reputacional;
- Capacidad de contención.

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

## Ejemplo de Análisis

Caso simulado:

```text
Una cuenta de usuario tuvo 30 logins fallidos desde una IP externa, luego un login exitoso y descarga de muchos archivos.
```

El análisis debe cubrir:

- Severidad.
- Evidencia.
- Acciones inmediatas.
- Preguntas pendientes.
- Recomendaciones.

También conviene incluir:

- Linea de tiempo;
- Owner de cada acción;
- Estado de contención;
- Evidencia que no debes perder;
- Detecciones posteriores.

## Criterios Para Analizar una Cuenta Comprometida

Un caso de cuenta comprometida debe explicar:

- Resumen ejecutivo;
- Severidad;
- Timeline;
- Evidencia;
- Contención inmediata;
- Erradicacion;
- Recuperación;
8. Comunicación.
9. Lecciones aprendidas.
10. Mejoras de detección.

## Errores Comunes

- Borrar evidencia antes de entender.
- Contener tarde por buscar certeza absoluta.
- No registrar hora de acciones.
- No asignar owners.
- Confundir erradicacion con recuperación.
- No hacer lecciones aprendidas.

## Criterio de Dominio

Puedes avanzar cuando puedas:

- Explicar fases de respuesta.
- Proponer contención.
- Separar contención de erradicacion.
- Escribir una linea de tiempo.
- Justificar severidad y acciones con evidencia.
