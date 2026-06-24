# Backups

## Objetivo

Entender backups como control correctivo critico.

Un backup que no se puede restaurar no es un control confiable. La meta no es solo tener copias, sino demostrar que puedes recuperar sistemas dentro del tiempo y perdida aceptables.

## Mapa Mental

```text
datos -> copia -> aislamiento -> retencion -> prueba -> restauracion -> evidencia
```

## Por Que Importan

Backups ayudan a recuperarse de:

- Borrado accidental.
- Ransomware.
- Falla de hardware.
- Corrupcion.
- Error humano.
- Incidente de seguridad.

## Que Respaldar

- bases de datos;
- archivos de usuario;
- configuraciones;
- secretos segun proceso seguro;
- infraestructura como codigo;
- logs importantes;
- documentacion critica.

No todo requiere la misma frecuencia. Depende de criticidad y cambio.

## Regla 3-2-1

Idea general:

- 3 copias.
- 2 tipos de medio.
- 1 copia fuera del sitio o aislada.

Variacion moderna:

- una copia inmutable;
- una copia fuera del alcance de credenciales normales;
- pruebas regulares de restauracion.

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

## Retencion

Define cuanto tiempo guardar:

- diarios;
- semanales;
- mensuales;
- anuales si aplica.

La retencion debe equilibrar costo, requisitos y riesgo.

## Riesgos

- Backups no probados.
- Backups conectados y cifrados por ransomware.
- Sin retencion.
- Sin documentacion.
- Sin owner.
- Credenciales de backup expuestas.

## Ransomware

Riesgos especificos:

- atacante borra backups;
- cifra backups conectados;
- roba credenciales de backup;
- destruye snapshots;
- espera a que backups limpios expiren.

Controles:

- inmutabilidad;
- separacion de credenciales;
- MFA;
- monitoreo de borrados;
- pruebas de restore;
- segmentacion.

## Controles

- Backups inmutables.
- Pruebas de restauracion.
- Separacion de credenciales.
- Monitoreo de fallos.
- Retencion definida.
- Cifrado.
- Documentacion.

## Practica Guiada

Diseña estrategia para:

```text
App web con base de datos de clientes.
```

Define:

- Que respaldar.
- Frecuencia.
- RPO.
- RTO.
- Retencion.
- Como probar restauracion.

## Mini Laboratorio: Plan de Restore

Crea `plan-restore-basico.md`:

1. Sistema.
2. Datos respaldados.
3. Frecuencia.
4. RPO.
5. RTO.
6. Retencion.
7. Responsable.
8. Pasos de restauracion.
9. Evidencia de prueba.
10. Riesgos pendientes.

## Checklist

- [ ] Backup existe.
- [ ] Backup esta cifrado.
- [ ] Backup esta aislado o inmutable.
- [ ] Restore fue probado.
- [ ] Owner definido.
- [ ] RPO/RTO documentados.
- [ ] Alertas por fallo.
- [ ] Credenciales protegidas.

## Errores Comunes

- Nunca probar restauracion.
- Guardar backups con las mismas credenciales comprometidas.
- No documentar RPO/RTO.
- Respaldar datos pero no configuraciones.
- No monitorear fallos.
- No considerar costo de tiempo de recuperacion.

## Criterio de Dominio

Puedes avanzar cuando puedas:

- Explicar RPO.
- Explicar RTO.
- Explicar regla 3-2-1.
- Diseñar prueba de restauracion.
- Justificar una estrategia de backups contra ransomware.
