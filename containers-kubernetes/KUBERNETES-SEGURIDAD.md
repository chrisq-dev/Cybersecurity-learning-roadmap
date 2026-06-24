# Seguridad en Kubernetes

## Objetivo

Entender conceptos basicos de Kubernetes y controles de seguridad importantes.

Kubernetes concentra aplicaciones, redes, secretos, permisos y despliegues. Un error de configuracion puede dar acceso a muchas cargas de trabajo al mismo tiempo. La meta inicial es entender que revisar y por que importa.

## Mapa Mental

```text
cluster -> namespace -> workload -> pod -> container -> identity -> network -> secrets -> logs
```

Preguntas clave:

- Que corre en el cluster?
- Con que permisos?
- En que namespace?
- Puede hablar con todo?
- Usa secretos?
- Corre como root?
- Hay auditoria?

## Que es Kubernetes

Kubernetes orquesta contenedores.

Ayuda a:

- Ejecutar aplicaciones.
- Escalar.
- Reiniciar contenedores.
- Conectar servicios.
- Gestionar configuracion.

## Conceptos

- Cluster: conjunto de nodos.
- Node: maquina que ejecuta cargas.
- Pod: unidad minima que ejecuta contenedores.
- Service: expone pods.
- Namespace: separacion logica.
- ConfigMap: configuracion no sensible.
- Secret: datos sensibles, requiere proteccion adicional.
- RBAC: permisos.

## Plano de Control y Plano de Datos

Conceptualmente:

- plano de control: API server, scheduler, controller manager, etcd;
- plano de datos: nodos, pods, contenedores y red.

El API server es critico porque desde ahi se administra el cluster.

## Riesgos Comunes

- Pods privilegiados.
- Contenedores como root.
- Secrets mal protegidos.
- RBAC demasiado amplio.
- API server expuesto.
- Imagenes vulnerables.
- Falta de Network Policies.
- Falta de limites de recursos.

## Security Context

Controles importantes:

- `runAsNonRoot`;
- `readOnlyRootFilesystem`;
- `allowPrivilegeEscalation: false`;
- capabilities minimas;
- seccomp/apparmor cuando aplique.

La idea es reducir lo que un contenedor puede hacer si se compromete.

## RBAC

Controla quien puede hacer que en el cluster.

Preguntas:

- Que identidad tiene acceso?
- A que namespace?
- Que verbos puede usar?
- Sobre que recursos?

Verbos comunes:

- get;
- list;
- watch;
- create;
- update;
- patch;
- delete;
- exec.

`exec` puede ser sensible porque permite entrar a contenedores.

## Network Policies

Controlan comunicacion entre pods.

Sin politicas, muchos clusters permiten comunicacion amplia por defecto.

Preguntas:

- Que pods necesitan hablar entre si?
- Que pods necesitan salida a internet?
- Que namespaces deben estar aislados?
- Que trafico debe bloquearse por defecto?

## Secrets

Kubernetes Secrets no deben tratarse como magia.

Buenas practicas:

- Cifrado en reposo.
- Acceso limitado.
- No imprimir en logs.
- Rotacion.
- Integracion con secret manager si aplica.

Evita:

- imprimir secrets en logs;
- montarlos en pods que no los necesitan;
- guardarlos en YAML dentro del repo;
- dar permisos amplios para leer todos los secrets.

## Admission Control

Permite bloquear configuraciones inseguras antes de que entren al cluster.

Ejemplos:

- Bloquear privileged containers.
- Exigir imagenes firmadas.
- Exigir `runAsNonRoot`.

Herramientas o enfoques:

- politicas nativas;
- admission controllers;
- policy-as-code;
- escaneo de manifests;
- revisiones en CI/CD.

## Imagenes

Riesgos:

- imagenes con vulnerabilidades;
- tags mutables como `latest`;
- imagenes de origen desconocido;
- secretos dentro de capas;
- paquetes innecesarios.

Controles:

- escaneo de imagenes;
- imagenes minimas;
- firmas;
- registry confiable;
- pinning de version/digest.

## Observabilidad

Necesitas:

- audit logs del API server;
- logs de pods;
- eventos de Kubernetes;
- metricas;
- alertas sobre cambios sensibles;
- inventario de workloads.

## Checklist

- [ ] RBAC minimo.
- [ ] Pods no privilegiados.
- [ ] Contenedores no root.
- [ ] Secrets protegidos.
- [ ] Network Policies.
- [ ] Imagenes escaneadas.
- [ ] API server restringido.
- [ ] Logs y auditoria activos.
- [ ] Limites de CPU/memoria.

## Practica Conceptual Guiada

Analiza:

```yaml
securityContext:
  privileged: true
```

Responde:

- Que riesgo existe?
- Por que podria usarse?
- Que alternativa segura buscarias?
- Como lo bloquearias?

## Mini Laboratorio: Revision de Manifest

Crea `revision-kubernetes-manifest.md`:

1. Describe un pod hipotetico.
2. Lista 5 configuraciones inseguras posibles.
3. Propone un `securityContext` seguro conceptual.
4. Define permisos RBAC minimos.
5. Define una Network Policy conceptual.
6. Explica como protegerias secrets.
7. Define que logs revisarias.

## Errores Comunes

- Ejecutar contenedores como root por defecto.
- Dar `cluster-admin` a identidades de aplicacion.
- No usar namespaces con criterio.
- No limitar comunicacion entre pods.
- Guardar secrets en manifests del repo.
- No activar audit logs.
- Usar imagenes sin escaneo.

## Criterio de Dominio

Puedes avanzar cuando puedas:

- Explicar pod, service y namespace.
- Explicar RBAC.
- Explicar Network Policies.
- Identificar riesgos de pods privilegiados.
- Revisar un manifest conceptual y proponer hardening.
