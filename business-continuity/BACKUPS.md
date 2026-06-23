# Backups

## Objetivo

Entender backups como control correctivo critico.

## Por Que Importan

Backups ayudan a recuperarse de:

- Borrado accidental.
- Ransomware.
- Falla de hardware.
- Corrupcion.
- Error humano.
- Incidente de seguridad.

## Regla 3-2-1

Idea general:

- 3 copias.
- 2 tipos de medio.
- 1 copia fuera del sitio o aislada.

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

## Riesgos

- Backups no probados.
- Backups conectados y cifrados por ransomware.
- Sin retencion.
- Sin documentacion.
- Sin owner.
- Credenciales de backup expuestas.

## Controles

- Backups inmutables.
- Pruebas de restauracion.
- Separacion de credenciales.
- Monitoreo de fallos.
- Retencion definida.
- Cifrado.
- Documentacion.

## Practica

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

## Criterio de Dominio

Puedes avanzar cuando puedas:

- Explicar RPO.
- Explicar RTO.
- Explicar regla 3-2-1.
- Diseñar prueba de restauracion.
