# Respuesta a Incidentes

## Objetivo

Entender como actuar cuando hay una alerta o incidente. La meta es reducir impacto, preservar evidencia y recuperar operaciones.

Respuesta a incidentes no es improvisar bajo presion. Es seguir un proceso que permita decidir rapido, proteger evidencia, contener dano y aprender para que no se repita.

## Mapa Mental

```text
alerta -> triage -> severidad -> contencion -> erradicacion -> recuperacion -> lecciones
```

La regla practica:

```text
primero entiende suficiente, luego contiene sin destruir evidencia innecesariamente
```

## Que es un Incidente

Un incidente es un evento que afecta o puede afectar confidencialidad, integridad o disponibilidad.

Ejemplos:

- Cuenta comprometida.
- Malware.
- Exfiltracion.
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

Tambien:

- matriz de severidad;
- canales de comunicacion;
- roles y responsabilidades;
- plantillas;
- criterios de escalacion;
- simulacros.

### 2. Identificacion

Determinar si algo es incidente.

Preguntas:

- Que paso?
- Cual es la evidencia?
- Hay impacto?
- Sigue ocurriendo?

## Triage

Preguntas iniciales:

- Que activo esta involucrado?
- Que usuario?
- Que hora?
- Que fuente genero la alerta?
- Hay actividad relacionada?
- Hay datos sensibles?
- El ataque sigue activo?
- Que accion inmediata reduce impacto?

### 3. Contencion

Limitar daño.

Ejemplos:

- Bloquear IP.
- Deshabilitar cuenta.
- Aislar endpoint.
- Revocar token.

Contencion puede ser:

- corta: detener dano inmediato;
- larga: mantener operacion segura mientras se remedia.

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

Erradicacion responde:

- Como entro?
- Que permitio que ocurriera?
- Que debe eliminarse o corregirse?
- Que credenciales deben rotarse?

### 5. Recuperacion

Volver a operar.

Ejemplos:

- Restaurar backups.
- Validar sistemas.
- Monitorear recurrencia.

Recuperar no es solo encender sistemas. Debes validar que el riesgo fue reducido y que hay monitoreo reforzado.

### 6. Lecciones Aprendidas

Mejorar para el futuro.

Preguntas:

- Que fallo?
- Que funciono?
- Que control falta?
- Que deteccion se debe crear?

## Severidad

Considera:

- criticidad del activo;
- tipo de dato;
- cantidad de usuarios afectados;
- privilegios involucrados;
- alcance;
- continuidad del ataque;
- impacto legal o reputacional;
- capacidad de contencion.

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

## Practica Guiada

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

Agrega:

- linea de tiempo;
- owner de cada accion;
- estado de contencion;
- evidencia que no debes perder;
- detecciones posteriores.

## Criterios Para Analizar una Cuenta Comprometida

Un caso de cuenta comprometida debe explicar:

- resumen ejecutivo;
- severidad;
- timeline;
- evidencia;
- contencion inmediata;
- erradicacion;
- recuperacion;
8. Comunicacion.
9. Lecciones aprendidas.
10. Mejoras de deteccion.

## Errores Comunes

- Borrar evidencia antes de entender.
- Contener tarde por buscar certeza absoluta.
- No registrar hora de acciones.
- No asignar owners.
- Confundir erradicacion con recuperacion.
- No hacer lecciones aprendidas.

## Criterio de Dominio

Puedes avanzar cuando puedas:

- Explicar fases de respuesta.
- Proponer contencion.
- Separar contencion de erradicacion.
- Escribir una linea de tiempo.
- Justificar severidad y acciones con evidencia.
