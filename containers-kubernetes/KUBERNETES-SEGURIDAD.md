# Seguridad en Kubernetes

## Objetivo

Entender conceptos basicos de Kubernetes y controles de seguridad importantes.

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

## Riesgos Comunes

- Pods privilegiados.
- Contenedores como root.
- Secrets mal protegidos.
- RBAC demasiado amplio.
- API server expuesto.
- Imagenes vulnerables.
- Falta de Network Policies.
- Falta de limites de recursos.

## RBAC

Controla quien puede hacer que en el cluster.

Preguntas:

- Que identidad tiene acceso?
- A que namespace?
- Que verbos puede usar?
- Sobre que recursos?

## Network Policies

Controlan comunicacion entre pods.

Sin politicas, muchos clusters permiten comunicacion amplia por defecto.

## Secrets

Kubernetes Secrets no deben tratarse como magia.

Buenas practicas:

- Cifrado en reposo.
- Acceso limitado.
- No imprimir en logs.
- Rotacion.
- Integracion con secret manager si aplica.

## Admission Control

Permite bloquear configuraciones inseguras antes de que entren al cluster.

Ejemplos:

- Bloquear privileged containers.
- Exigir imagenes firmadas.
- Exigir `runAsNonRoot`.

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

## Practica Conceptual

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

## Criterio de Dominio

Puedes avanzar cuando puedas:

- Explicar pod, service y namespace.
- Explicar RBAC.
- Explicar Network Policies.
- Identificar riesgos de pods privilegiados.
