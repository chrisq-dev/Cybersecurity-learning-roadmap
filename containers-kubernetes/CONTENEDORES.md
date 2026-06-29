---
title: "Contenedores (Docker): La Caja de Cristal"
level: "avanzado"
content_type: "guia"
updated: "2026-06-29"
---

# Contenedores (Docker): La Caja de Cristal

## Objetivo de esta Guía

Entender por qué la Nube moderna abandonó las Máquinas Virtuales pesadas y abrazó las Burbujas ultraligeras, y como esto afecta la seguridad y el aislamiento.

Anteriormente (Linux), aprendiste que las empresas instalan sus bases de datos en Servidores. Para no comprar 10 computadoras físicas, la industria inventó las Máquinas Virtuales (Virtualización): Meter 10 servidores fantasma adentro de un solo servidor físico.

El problema es que las Máquinas Virtuales son excesivamente pesadas y lentas. La solución a este problema de ingeniería se llama Contenedores (Docker).

## La Analogía

Imagina que tienes que alojar a 10 empleados de tu empresa.

### Máquina Virtual (El Edificio Entero)

Si usas Virtualización (VMware, VirtualBox), es como construirle un edificio entero de 10 pisos a cada empleado, con sus propios cimientos, sistema eléctrico y de plomería (el Sistema Operativo Invitado - Guest OS), solo para que el empleado viva en el primer piso. Es seguro (cada edificio esta aislado), pero desperdicias 9 pisos vacíos y millones de dólares en materiales.

### Contenedor (La Caja de Cristal)

En lugar de construir un edificio entero para cada empleado, construyes un solo edificio masivo (el Servidor Físico / Host OS). Adentro del edificio, metes a cada empleado en una Caja de Cristal insonorizada (el Contenedor).

- Todos los contenedores comparten los cimientos y la plomería del mismo edificio (comparten el Kernel de Linux).
- El empleado en la Caja A no puede ver ni tocar al empleado en la Caja B (aislamiento), pero ambos pesan casi cero porque no tienen que cargar con sus propios cimientos.
- En lugar de arrancar en 5 minutos, un contenedor arranca en 300 milisegundos.

## Máquina Virtual vs Contenedor

### Diferencias Arquitectonicas

| Característica | Máquina Virtual | Contenedor |
|----------------|-----------------|------------|
| Sistema Operativo | Cada VM tiene su propio SO (Guest OS) | Todos comparten el Kernel del Host |
| Arranque | 2-5 minutos | < 1 segundo |
| Tamaño | 2-10 GB por VM | 10-500 MB por contenedor |
| Aislamiento | Fuerte (hipervisor) | Débil (namespaces + cgroups) |
| Recursos | Asignación fija | Compartidos y limitados |
| Portabilidad | Entre hipervisores compatibles | Entre cualquier Linux con Docker |

### Cuando Usar cada uno

Usa Máquinas Virtuales cuando:

- Necesitas ejecutar diferentes sistemas operativos (Linux + Windows).
- Necesitas aislamiento de seguridad fuerte.
- Ejecutas aplicaciones que requieren acceso directo al hardware.

Usa Contenedores cuando:

- Necesitas rapidez en despliegue y escalado.
- Tienes muchas aplicaciones pequeñas (microservicios).
- Quieres consistencia entre entornos (desarrollo, pruebas, producción).

## La Seguridad del Aislamiento

La magia técnica que hace que el empleado en la Caja A no pueda ver a la Caja B se reduce a dos características del Kernel de Linux:

### Namespaces (La Pared de Cristal Insonorizada)

Los namespaces limitan lo que un proceso puede ver. Cada contenedor tiene sus propios namespaces:

1. **PID Namespace:** El contenedor solo ve sus propios procesos. No ve los procesos del host ni de otros contenedores.
2. **Network Namespace:** El contenedor tiene su propia pila de red (interfaces, rutas, tablas).
3. **Mount Namespace:** El contenedor tiene su propio sistema de archivos.
4. **UTS Namespace:** El contenedor tiene su propio hostname.
5. **IPC Namespace:** El contenedor tiene su propia comunicación entre procesos.
6. **User Namespace:** El contenedor tiene su propio mapa de usuarios (puede tener root adentro pero no afuera).

Cuando ejecutas `docker run`, Docker crea un nuevo conjunto de namespaces para el contenedor. El proceso dentro del contenedor "cree" que es el único proceso en el sistema.

### Cgroups (La Ración de Comida)

Los Cgroups (Control Groups) limitan lo que el contenedor puede usar. Sin cgroups, un contenedor podría consumir toda la RAM del servidor y matar a los demás.

Configuración tipica de recursos para un contenedor:

```bash
docker run --memory="512m" --cpus="0.5" nginx
```

Esto limita el contenedor a 512 MB de RAM y medio núcleo de CPU.

Métricas que controlan los cgroups:

- **memory.limit_in_bytes:** Memoria máxima.
- **cpu.cfs_quota_us:** Tiempo de CPU máximo.
- **blkio.throttle.read_bps_device:** Velocidad de lectura de disco.
- **pid.max:** Número máximo de procesos.

### El Riesgo: Escapar del Contenedor (Container Breakout)

Aqui esta el talón de Aquiles de Docker. Como todos los contenedores comparten el mismo "suelo" (el Kernel de Linux del servidor anfitrión), si un hacker logra hackear la aplicación adentro de la Caja de Cristal, y encuentra un Zero-Day en el motor de Docker, puede "romper el cristal" (Container Escape).

Si rompe el cristal, cae directamente al suelo del servidor físico (Root access al Host). Desde ahí, tiene el poder absoluto para destruir y borrar todas las otras 500 cajas de cristal del edificio.

### Container Breakout Conocido: CVE-2019-5736

En 2019, se descubrió una vulnerabilidad en runc (el runtime de contenedores de Docker y Kubernetes) que permitia a un atacante con acceso al contenedor escapar al host.

Como funcionaba:

1. El atacante dentro del contenedor obtenia ejecución de código.
2. El atacante sobrescribia el binario `runc` en el host desde dentro del contenedor.
3. La próxima vez que el host ejecutará `runc` (para crear otro contenedor), el binario malicioso se ejecutaba con permisos de root en el host.

La vulnerabilidad afectaba a todos los contenedores que ejecutaban como root adentro (que es la mayoría).

## Malas Prácticas de Seguridad en Docker

### Ejecutar como Root

Por defecto, los procesos dentro de un contenedor se ejecutan como root (UID 0). Aunque el user namespace mapea este UID a un usuario no privilegiado en el host, sigue siendo peligroso.

Si el contenedor tiene capacidades de Linux (capabilities) adicionales, el proceso root dentro del contenedor puede hacer cosas peligrosas.

**Buena práctica:** Usar `USER` en el Dockerfile para ejecutar procesos con un usuario no root.

```dockerfile
FROM node:18
RUN useradd -m appuser
USER appuser
COPY app.js .
CMD ["node", "app.js"]
```

### Capacidades de Linux (Capabilities)

Linux capabilities son permisos especiales que se pueden asignar a procesos sin darles acceso root completo.

Por defecto, Docker elimina muchas capabilities peligrosas:

- `CAP_SYS_ADMIN` - acceso administrativo al kernel.
- `CAP_NET_ADMIN` - configuración de red.
- `CAP_SYS_MODULE` - carga de modulos del kernel.

Pero a veces los administradores las agregan de vuelta para que la aplicación funcione. Esto es peligroso.

```bash
# PELIGROSO: agrega capacidades administrativas
docker run --cap-add=NET_ADMIN --cap-add=SYS_ADMIN nginx
```

### Volumenes Montados

Montar el sistema de archivos del host dentro del contenedor es necesario para persistencia, pero peligroso.

```bash
# PELIGROSO: monta el disco del host completo
docker run -v /:/host nginx
```

Un atacante que comprometa este contenedor puede modificar cualquier archivo del host.

### Privileged Mode

El modo privilegiado (`--privileged`) da al contenedor acceso a todos los dispositivos del host y elimina casi todas las restricciones de capabilities.

```bash
# PELIGROSISIMO: modo privilegiado
docker run --privileged nginx
```

Un contenedor privilegiado puede:
- Acceder a todos los discos del host.
- Cargar modulos del kernel.
- Modificar la configuración de red del host.
- Escapar del contenedor fácilmente.

### Imagenes de Fuentes no Confiables

Docker Hub tiene millones de imágenes públicas. Muchas contienen malware.

```dockerfile
# NO HAGAS ESTO: imagen de fuente desconocida
FROM usuario_desconocido/nginx
```

Guía segura:
- Usar imágenes oficiales (`nginx`, `node`, `python`).
- Usar imágenes firmadas (Docker Content Trust).
- Escanear imágenes con herramientas como Trivy o Snyk.
- Especificar versión exacta (no `latest`).

```dockerfile
# BIEN: imagen oficial con version especifica
FROM nginx:1.25.3
```

## Dockerfile Seguro

Un Dockerfile seguro incluye:

```dockerfile
FROM node:18-alpine

# Crear usuario no root
RUN adduser -D appuser

# Copiar solo lo necesario
COPY package.json .
RUN npm install
COPY app.js .

# No ejecutar como root
USER appuser

# Health check
HEALTHCHECK --interval=30s CMD node health.js

# Puerto de la aplicacion
EXPOSE 3000

CMD ["node", "app.js"]
```

### Multi-stage Builds

Usar multi-stage builds para reducir el tamaño de la imagen y eliminar herramientas de compilación que no son necesarias en producción:

```dockerfile
# Etapa de compilacion
FROM node:18 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Etapa de produccion (solo lo necesario)
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
```

La imagen final solo contiene Nginx y los archivos estaticos, sin Node.js ni herramientas de compilación.

## Docker Secrets

No incluyas contraseñas en el Dockerfile. Usa los mecanismos de secrets de Docker:

```bash
# Crear un secreto
echo "mipassword123" | docker secret create db_password -

# Usar el secreto en un servicio
docker service create --secret db_password --name myapp nginx
```

O mejor aún, usar variables de entorno desde archivos externos:

```bash
docker run --env-file .env.prod nginx
```

Pero nunca:
```dockerfile
ENV DB_PASSWORD=mipassword123
```

Esto queda grabado en la imagen para siempre.

## Casos Reales

### El Contenedor que Escape en Shopify (2018)

Un investigador de seguridad descubrió una vulnerabilidad en la plataforma Shopify que le permitia ejecutar código dentro de un contenedor. El contenedor estaba mal configurado:

- Ejecutaba como root.
- Tenía la capability `CAP_SYS_ADMIN`.
- Tenía montado el socket de Docker (`/var/run/docker.sock`).

El investigador pudo escapar del contenedor y acceder al host. Shopify pago una recompensa de $25,000 por el reporte.

### Criptominero en Contenedores (2017-2018)

Entre 2017 y 2018, atacantes escanearon internet en busca de puertos de Docker API expuestos (puerto 2375 sin TLS). Cuando encontraban uno, ejecutaban:

```bash
docker run -d --cpus="8" --memory="8g" miner
```

El contenedor minaba criptomonedas usando los recursos del servidor. El dueño del servidor pagaba la factura de electricidad y cómputo sin saberlo.

Se estima que miles de servidores Docker fueron comprometidos de esta forma.

## Modos de Falla

### Falla 1: Compartir el Socket de Docker

Montar `/var/run/docker.sock` dentro de un contenedor le da control total sobre el demonio de Docker. El contenedor puede crear, modificar o eliminar cualquier otro contenedor.

### Falla 2: Imagenes Desactualizadas

Las imágenes contienen vulnerabilidades conocidas. Usar `node:latest` sin escanear es como instalar Windows 95 sin parches.

### Falla 3: No Limitar Recursos

Contenedores sin límites de CPU/RAM pueden causar Denial of Service a otros contenedores en el mismo host.

### Falla 4: Variables de Entorno con Secretos

Las contraseñas en variables de entorno son visibles para cualquiera que pueda ejecutar `docker inspect` en el contenedor.

### Falla 5: Capabilities Excesivas

Agregar capabilities como `SYS_ADMIN` o `NET_ADMIN` sin necesidad.

## La Mirada del Hacker

Como atacante, el contenedor es mi prisión. Mi objetivo es escapar.

### Reconocimiento dentro del Contenedor

Cuando comprometo un contenedor, lo primero que hago es:

1. Revisar que usuario soy (`whoami`).
2. Revisar las capabilities (`cat /proc/1/status | grep Cap`).
3. Revisar los dispositivos montados (`ls -la /dev`).
4. Revisar los volumenes montados (`mount | grep /dev/sda`).
5. Revisar la red (`ip addr`, `cat /etc/hosts`).

Si encuentro el socket de Docker montado, puedo ejecutar:

```bash
docker -H unix:///var/run/docker.sock run -v /:/host -it alpine chroot /host
```

Esto me da acceso al sistema de archivos completo del host.

### Búsqueda de Credenciales

Las aplicaciones dentro de contenedores suelen tener:

- Archivos `.env` con contraseñas.
- Claves SSH.
- API Keys de servicios cloud.
- Tokens de acceso a bases de datos.

Si el contenedor tiene un rol IAM (en AWS), puedo acceder al endpoint de metadatos y obtener credenciales temporales.

### Container Breakout via Kernel Exploit

Si el kernel del host es viejo, puedo buscar un CVE que permita escalar privilegios desde el contenedor al host.

CVE-2022-0847 (Dirty Pipe): vulnerabilidad en el kernel de Linux que permitia a un proceso no privilegiado sobrescribir archivos de solo lectura. Funcionaba dentro de contenedores.

### Ataque a la Red del Contenedor

Si puedo hacer ARP spoofing dentro de la red del contenedor, puedo interceptar el tráfico de otros contenedores en el mismo host (ataque lateral).

## Docker Bench Security

esta herramienta solo detecta problemas, no los arregla. Pero saber que tienes el problema ya es medio camino andado.

Docker Bench Security es una herramienta que audita la configuración de Docker contra el CIS Benchmark de Docker.

### Categorías que Evalua

1. **Configuración del Host:** Permisos de archivos de Docker, uso de AppArmor/SElinux, restricciones del kernel.
2. **Configuración del Daemon:** TLS habilitado, almacenamiento de logs, políticas de descarga.
3. **Configuración de Contenedores:** Usuario no root, recursos limitados, filesystem read-only, capabilities minimas.
4. **Imagenes:** Escaneo de vulnerabilidades, etiquetado correcto, sin capas innecesarias.
5. **Red:** Uso de redes definidas por el usuario, no --net=host.
6. **Seguridad del Host:** Secomp, AppArmor, SELinux.

### Ejecución

```bash
docker run --privileged --pid=host -v /var/run/docker.sock:/var/run/docker.sock \
  docker/docker-bench-security
```

### Ejemplos de Tests

- **2.1:** Asegurar que el daemon de Docker no use `--icc=false` (inter-container communication).
- **2.5:** Asegurar que `--live-restore` este habilitado.
- **4.1:** Asegurar que los contenedores no usen el namespace de red del host.
- **5.1:** Asegurar que no haya puertos expuestos en contenedores.
- **5.4:** Asegurar que los contenedores no usen `--privileged`.
- **5.7:** Asegurar que los contenedores tengan límites de memoria.
- **5.12:** Asegurar que los contenedores tengan un usuario no root.

## Image Scanning con Trivy

Trivy es un escáner de vulnerabilidades para imágenes de contenedor (y otros targets).

### Escaneo Básico

```bash
trivy image nginx:1.25.3
```

### Resultados

Trivy reporta:

- Vulnerabilidades por severidad (CRITICAL, HIGH, MEDIUM, LOW).
- CVE, descripción, y link a la referencia.
- Paquete afectado y versión.
- Si existe fix disponible.

### Integración en CI/CD

```yaml
# GitHub Actions
- name: Scan image with Trivy
  uses: aquasecurity/trivy-action@master
  with:
    image-ref: 'myapp:${{ github.sha }}'
    format: 'sarif'
    output: 'trivy-results.sarif'
    severity: 'CRITICAL,HIGH'
```

Si se encuentra una vulnerabilidad CRITICAL, el pipeline falla y la imagen no se despliega.

## Docker Content Trust (DCT)

DCT asegura la integridad de las imágenes mediante firmas digitales.

### Como Funciona

1. El publicador firma la imagen con una clave privada.
2. El consumidor verifica la firma contra una clave pública conocida.
3. Si la firma no es valida, Docker no permite descargar ni ejecutar la imagen.

### Habilitar DCT

```bash
export DOCKER_CONTENT_TRUST=1
docker pull nginx:latest
# Solo descarga si la imagen esta firmada
```

### Protección contra Ataques

DCT protege contra:

- **Man-in-the-Middle:** Un atacante intercepta la descarga y reemplaza la imagen.
- **Registry Malicioso:** Un atacante sube una imagen maliciosa con el mismo nombre.
- **Tag Spoofing:** Un atacante etiqueta una imagen maliciosa como `latest`.

## Casos Reales Adicionales

### El Escape de Contenedor en SUSE (2019)

Un investigador descubrió una vulnerabilidad en runc (CVE-2019-5736) que afectaba a todos los contenedores que ejecutaban como root. La vulnerabilidad permitia a un atacante escapar del contenedor al host.

El fix requirio actualizar runc en todos los servidores Docker y Kubernetes del mundo. Las empresas que no actualizaron quedaron vulnerables.

### Docker Hub y las Imagenes Maliciosas (2018-2023)

Docker Hub ha eliminado miles de imágenes maliciosas que contenian:

- Scripts de minería de criptomonedas.
- Backdoors para acceso remoto.
- Keyloggers.
- Ransomware.

Las imágenes maliciosas suelen:
- Tener pocas descargas pero nombres similares a imágenes oficiales.
- Usar técnicas de SEO poisoning en las descripciones.
- Contener el malware en capas ocultas (no visibles en el Dockerfile).

### El Ataque a la Cadena de Suministro de Codecov (2021)

Codecov, una herramienta de cobertura de código, fue comprometida. Los atacantes modificaron la imagen de Docker de Codecov para incluir malware que robaba credenciales de los pipelines de CI/CD de sus clientes.

Los clientes que usaban la imagen de Docker de Codecov sin verificar su integridad (DCT) ejecutaron el malware en sus pipelines.

## Autoevaluación

Responde estas preguntas para verificar si comprendes los conceptos:

1. El equipo de desarrollo quiere desplegar 100 pequeños microservicios diferentes en un solo servidor físico. Explica, usando la diferencia de arquitectura entre Máquinas Virtuales (VMs) y Contenedores (Docker), por qué usar Contenedores ahorrará una cantidad masiva de Memoria RAM (Pista: Piensa en el Sistema Operativo Invitado).

2. Un atacante logra ejecutar código remoto malicioso (RCE) dentro del contenedor web de tu empresa. Sin embargo, el atacante se da cuenta de que no puede ver los archivos de contraseñas de la Base de Datos que esta corriendo en otro contenedor en la misma máquina física. Que característica del Kernel de Linux (Namespaces o Cgroups) es responsable de este aislamiento de visión?

3. Define que es un ataque de "Container Escape" (Fuga de Contenedor) y explica por qué las consecuencias de este ataque son infinitamente más letales que si el atacante simplemente se quedara atrapado adentro de su contenedor original.

4. Con base en la filosofía de "Zero Trust", Por qué otorgarle permisos de "Usuario Root" (Modo Dios en Linux) al usuario que se ejecuta adentro de un Contenedor de Docker es considerado una de las peores y más peligrosas prácticas de seguridad de la industria?

5. Un administrador monta el socket de Docker (`/var/run/docker.sock`) dentro de un contenedor para que una aplicación de monitoreo pueda gestionar otros contenedores. Explica por qué esta práctica es peligrosa y como un atacante podría explotarla.

6. Que son las Linux Capabilities y por qué agregar `CAP_SYS_ADMIN` a un contenedor es peligroso?

7. Un contenedor ejecuta `node:latest` sin escanear la imagen. Que riesgos de seguridad específicos presenta esta práctica?

8. Explica la diferencia entre un ataque de Container Escape y un ataque de movimiento lateral entre contenedores en la misma red.
