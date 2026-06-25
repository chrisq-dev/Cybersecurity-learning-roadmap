# Backups

## Objetivo

Entender backups como control correctivo crítico.

Un backup que no se puede restaurar no es un control confiable. La meta no es solo tener copias, sino demostrar que puedes recuperar sistemas dentro del tiempo y pérdida aceptables.

## Mapa Mental

```text
datos -> copia -> aislamiento -> retencion -> prueba -> restauracion -> evidencia
```

## Por Qué Importan

Backups ayudan a recuperarse de:

- Borrado accidental.
- Ransomware.
- Falla de hardware.
- Corrupcion.
- Error humano.
- Incidente de seguridad.

## Qué Respaldar

- Bases de datos;
- Archivos de usuario;
- Configuraciones;
- Secretos según proceso seguro;
- Infraestructura como código;
- Logs importantes;
- Documentacion crítica.

No todo requiere la misma frecuencia. Depende de criticidad y cambio.

## Regla 3-2-1

Idea general:

- 3 copias.
- 2 tipos de medio.
- 1 copia fuera del sitio o aislada.

Variacion moderna:

- Una copia inmutable;
- Una copia fuera del alcance de credenciales normales;
- Pruebas regulares de restauracion.

## RPO y RTO

### RPO

Recovery Point Objective.

Cuantos datos puedes perder.

Ejemplo:

```text
RPO 1 hora = puedo perder maximo 1 hora de datos.
```

### RTO

Recovery Time Objective.

Cuanto tiempo puedes tardar en recuperar.

Ejemplo:

```text
RTO 4 horas = el servicio debe volver en 4 horas.
```

## Retención

Define cuanto tiempo guardar:

- Diarios;
- Semanales;
- Mensuales;
- Anuales si aplica.

La retención debe equilibrar costo, requisitos y riesgo.

## Riesgos

- Backups no probados.
- Backups conectados y cifrados por ransomware.
- Sin retención.
- Sin documentacion.
- Sin owner.
- Credenciales de backup expuestas.

## Ransomware

Riesgos especificos:

- Atacante borra backups;
- Cifra backups conectados;
- Roba credenciales de backup;
- Destruye snapshots;
- Espera a que backups limpios expiren.

Controles:

- Inmutabilidad;
- Separación de credenciales;
- MFA;
- Monitoreo de borrados;
- Pruebas de restore;
- Segmentación.

## Controles

- Backups inmutables.
- Pruebas de restauracion.
- Separación de credenciales.
- Monitoreo de fallos.
- Retención definida.
- Cifrado.
- Documentacion.

## Ejemplo de Estrategia

Una estrategia de backup para este caso debe cubrir:

```text
App web con base de datos de clientes.
```

Define:

- Que respaldar.
- Frecuencia.
- RPO.
- RTO.
- Retención.
- Como probar restauracion.

## Criterios de un Plan de Restore

Un plan de restore debe explicar:

- Sistema involucrado;
- Datos respaldados;
- Frecuencia;
- RPO;
- RTO;
- Retención;
- Responsable;
- Pasos de restauracion;
- Evidencia de prueba;
- Riesgos pendientes.

## Controles Que Deben Entenderse

- El backup debe existir y cubrir datos importantes.
- El backup debe estar cifrado si contiene información sensible.
- El backup debe estar aislado o ser inmutable para resistir ransomware.
- El restore debe probarse; un backup no probado es una suposicion.
- Debe existir owner responsable.
- RPO y RTO deben estar definidos según impacto.
- Fallos de backup deben generar alertas.
- Credenciales de backup deben protegerse con mucho cuidado.

## Errores Comunes

- Nunca probar restauracion.
- Guardar backups con las mismas credenciales comprometidas.
- No documentar RPO/RTO.
- Respaldar datos pero no configuraciones.
- No monitorear fallos.
- No considerar costo de tiempo de recuperación.

## Criterio de Dominio

Puedes avanzar cuando puedas:

- Explicar RPO.
- Explicar RTO.
- Explicar regla 3-2-1.
- Diseñar prueba de restauracion.
- Justificar una estrategia de backups contra ransomware.
