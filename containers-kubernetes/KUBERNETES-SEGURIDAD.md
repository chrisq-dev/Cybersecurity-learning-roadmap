# Seguridad en Kubernetes

## Objetivo

Entender conceptos básicos de Kubernetes y controles de seguridad importantes.

Kubernetes concentra aplicaciones, redes, secretos, permisos y despliegues. Un error de configuración puede dar acceso a muchas cargas de trabajo al mismo tiempo. La meta inicial es entender que revisar y por que importa.

## Mapa Mental

```text
cluster -> namespace -> workload -> pod -> container -> identity -> network -> secrets -> logs
```

Preguntas clave:

- Qué corre en el cluster?
- Con qué permisos?
- En qué namespace?
- Puede hablar con todo?
- Usa secretos?
- Corre cómo root?
- Hay auditoria?

## Qué es Kubernetes

Kubernetes orquesta contenedores.

Ayuda a:

- Ejecutar aplicaciones.
- Escalar.
- Reiniciar contenedores.
- Conectar servicios.
- Gestionar configuración.

## Conceptos

- Cluster: conjunto de nodos.
- Node: máquina que ejecuta cargas.
- Pod: unidad mínima que ejecuta contenedores.
- Service: expone pods.
- Namespace: separación lógica.
- ConfigMap: configuración no sensible.
- Secret: datos sensibles, requiere protección adicional.
- RBAC: permisos.

## Plano de Control y Plano de Datos

Conceptualmente:

- Plano de control: API server, scheduler, controller manager, etcd;
- Plano de datos: nodos, pods, contenedores y red.

El API server es crítico porque desde ahi se administra el cluster.

## Riesgos Comunes

- Pods privilegiados.
- Contenedores como root.
- Secrets mal protegidos.
- RBAC demasiado amplio.
- API server expuesto.
- Imágenes vulnerables.
- Falta de Network Policies.
- Falta de límites de recursos.

## Security Context

Controles importantes:

- `runAsNonRoot`;
- `readOnlyRootFilesystem`;
- `allowPrivilegeEscalation: false`;
- Capabilities mínimas;
- Seccomp/apparmor cuando aplique.

La idea es reducir lo que un contenedor puede hacer si se compromete.

## RBAC

Controla quien puede hacer que en el cluster.

Preguntas:

- Qué identidad tiene acceso?
- A qué namespace?
- Qué verbos puede usar?
- Sobre qué recursos?

Verbos comunes:

- Get;
- List;
- Watch;
- Create;
- Update;
- Patch;
- Delete;
- Exec.

`exec` puede ser sensible porque permite entrar a contenedores.

## Network Policies

Controlan comunicación entre pods.

Sin políticas, muchos clusters permiten comunicación amplia por defecto.

Preguntas:

- Qué pods necesitan hablar entre si?
- Qué pods necesitan salida a internet?
- Qué namespaces deben estar aislados?
- Qué tráfico debe bloquearse por defecto?

## Secrets

Kubernetes Secrets no deben tratarse como magia.

Buenas prácticas:

- Cifrado en reposo.
- Acceso limitado.
- No imprimir en logs.
- Rotación.
- Integración con secret manager si aplica.

Evita:

- Imprimir secrets en logs;
- Montarlos en pods que no los necesitan;
- Guardarlos en YAML dentro del repo;
- Dar permisos amplios para leer todos los secrets.

## Admission Control

Permite bloquear configuraciones inseguras antes de que entren al cluster.

Ejemplos:

- Bloquear privileged containers.
- Exigir imágenes firmadas.
- Exigir `runAsNonRoot`.

Herramientas o enfoques:

- Políticas nativas;
- Admission controllers;
- Policy-as-code;
- Escaneo de manifests;
- Revisiones en CI/CD.

## Imágenes

Riesgos:

- Imágenes con vulnerabilidades;
- Tags mutables como `latest`;
- Imágenes de origen desconocido;
- Secretos dentro de capas;
- Paquetes innecesarios.

Controles:

- Escaneo de imágenes;
- Imágenes mínimas;
- Firmas;
- Registry confiable;
- Pinning de versión/digest.

## Observabilidad

Necesitas:

- Audit logs del API server;
- Logs de pods;
- Eventos de Kubernetes;
- Metricas;
- Alertas sobre cambios sensibles;
- Inventario de workloads.

## Criterios de Revisión

Una revisión de Kubernetes debe considerar:

- RBAC mínimo;
- Pods no privilegiados;
- Contenedores no root;
- Secrets protegidos;
- Network Policies;
- Imágenes escaneadas;
- API server restringido;
- Logs y auditoria activos;
- Límites de CPU y memoria.

## Ejemplo de Análisis de Manifest

Este fragmento representa un permiso de alto riesgo:

```yaml
securityContext:
  privileged: true
```

El análisis debe explicar:

- Qué riesgo existe?
- Por qué podria usarse?
- Qué alternativa segura buscarias?
- Cómo lo bloquearias?

## Criterios Para Leer un Manifest

Al leer un manifest, observa:

- Que hace el pod;
- Si usa configuraciones privilegiadas;
- Que usuario ejecuta el contenedor;
- Que permisos RBAC necesita realmente;
- Que comunicación de red debería permitir;
- Como maneja secrets;
- Que límites de recursos tiene;
- Que evidencia quedaria en logs o auditoria.
7. Define que logs revisarias.

## Errores Comunes

- Ejecutar contenedores como root por defecto.
- Dar `cluster-admin` a identidades de aplicación.
- No usar namespaces con criterio.
- No limitar comunicación entre pods.
- Guardar secrets en manifests del repo.
- No activar audit logs.
- Usar imágenes sin escaneo.

## Criterio de Dominio

Puedes avanzar cuando puedas:

- Explicar pod, service y namespace.
- Explicar RBAC.
- Explicar Network Policies.
- Identificar riesgos de pods privilegiados.
- Revisar un manifest conceptual y proponer hardening.
