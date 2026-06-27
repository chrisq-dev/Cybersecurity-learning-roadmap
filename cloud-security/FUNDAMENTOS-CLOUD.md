---
title: "Fundamentos de la Nube: La Computadora de Alguien Más"
---

# Fundamentos de la Nube: La Computadora de Alguien Más

## Objetivo de esta Guía

Destruir la ilusión de que la Nube es un ente mágico y etéreo, y entender la vulnerabilidad más grande y peligrosa de migrar los servidores de tu empresa a Amazon, Google o Microsoft.

Hace 15 años (On-Premise), si una empresa quería una pagina web, tenía que comprar un servidor físico de metal de $5,000 USD, ponerlo en un cuarto con aire acondicionado y contratar un guardia de seguridad. Hoy, abren una cuenta en Amazon (AWS), le dan clic a un botón, y en 30 segundos Amazon les presta un servidor virtual en otro país por $5 dólares al mes.

Esa es la Nube: la computadora de alguien más.

## La Analogía

Para entender la seguridad en la nube, debes entender los 3 modelos de servicio.

### Infraestructura como Servicio (IaaS)

- La Analogía: Rentas un terreno vacio con paredes y techo.
- Tecnología: Amazon te presta un Servidor Linux completamente vacio (EC2). Tu tienes que instalarle la puerta, los muebles (Base de datos), la plomería (Redes) y pintarlo (El codigo).
- Seguridad: Tu eres responsable de casi todo. Si te hackean porque tu base de datos no tenía contrasena, es 100% tu culpa.

### Plataforma como Servicio (PaaS)

- La Analogía: Rentas un departamento amueblado.
- Tecnología: Amazon te dice: No te preocupes por instalar Linux ni la base de datos. Toma esta base de datos mágica (RDS) que ya funciona. Solo mete tus datos.
- Seguridad: Amazon se encarga de que la base de datos no tenga virus de sistema operativo. Tu solo te encargas de que las contraseñas de tus usuarios sean fuertes.

### Software como Servicio (SaaS)

- La Analogía: Pagas una noche en un Hotel de Lujo de 5 Estrellas (All Inclusive).
- Tecnología: Google Mail (Gmail) o Netflix. Tu no servidor usan, ni te importa. Solo entras, consumes el servicio y te vas.
- Seguridad: Google se encarga del 99% de la seguridad. Tu única responsabilidad es no darle tu contrasena de Gmail a un estafador.

## El Modelo de Responsabilidad Compartida

Si hay un solo concepto que debes memorizar en esta guía para no ir a prisión, es el Modelo de Responsabilidad Compartida (Shared Responsibility Model).

Cuando una empresa migra a AWS y es hackeada a la semana siguiente, el CEO de la empresa siempre sale a la prensa a decir: Amazon fue hackeado, es culpa de la Nube. Esto es falso en el 99.9% de los casos.

### La Regla de Oro

- El Proveedor (Amazon, Azure, GCP): Es responsable de la Seguridad DE la Nube (Security OF the Cloud). Asegurar que los muros físicos del edificio no se caigan, que no haya goteras, y que los cables eléctricos no se quemen.

- Tu (El Cliente): Eres responsable de la Seguridad EN la Nube (Security IN the Cloud). Si tu rentas la Habitación 402, y al salir a caminar dejas la puerta abierta de par en par con todo tu dinero en la cama, y alguien entra y te roba, el Hotel no te va a pagar ni un centavo.

Los hackers no atacan los muros físicos de Amazon. Los hackers usan escáneres en internet buscando a los miles de clientes que dejan sus configuraciones abiertas.

### Mapa de Responsabilidad por Servicio

| Recurso | IaaS | PaaS | SaaS |
|---------|------|------|------|
| Redes físicas | Proveedor | Proveedor | Proveedor |
| Hipervisor | Proveedor | Proveedor | Proveedor |
| Sistema Operativo | Cliente | Proveedor | Proveedor |
| Middleware | Cliente | Proveedor | Proveedor |
| Runtime | Cliente | Proveedor | Proveedor |
| Datos | Cliente | Cliente | Cliente |
| Accesos | Cliente | Cliente | Cliente |

Observa que en todos los modelos, los DATOS y los ACCESOS son siempre responsabilidad del cliente. No importa si usas IaaS, PaaS o SaaS: si pierdes tus datos o tus credenciales, es tu responsabilidad.

## El Paradigma de las APIs (No hay cables que cortar)

En un ataque tradicional On-Premise, si un hacker se vuelve loco, el administrador de la empresa puede correr al cuarto de servidores y arrancar el cable de red de la pared físicamente.

En la nube, no tienes acceso físico. Todo el control del edificio se hace a través de un Panel de Control Web y Llaves API (API Keys).

Una Llave API es un texto largo que le dice a Amazon: Soy el dueño de la empresa, obedece mis órdenes.

Si un hacker se roba esa llave de texto (porque un programador la subió por accidente a GitHub), el hacker no necesita romper ningún firewall. Simplemente le escribe a Amazon y le dice: Hola Amazon, soy el dueño. Borra todos los servidores de la empresa.

El Hacking en la Nube es Hacking de Identidad, no Hacking de Redes.

### La Inmortalidad de la API Key

A diferencia de una contrasena que puedes cambiar, una API Key suele estar hardcodeada en:

- Archivos de configuración en sitios como GitHub.
- Variables de entorno en servidores.
- Codigo fuente de aplicaciones móviles (reversible).
- Archivos de configuración de CI/CD (Jenkins, GitLab CI).

Cuando una API Key se filtra, rotarla implica:

1. Generar una nueva llave.
2. Actualizar todos los lugares donde se usa.
3. Verificar que no haya servicios caídos por el cambio.
4. Revocar la llave anterior.

Este proceso puede tomar dias en empresas grandes.

## Seguridad de Red en la Nube: Security Groups y NACLs

En un datacenter físico, la seguridad de red se hacia con firewalls físicos (Cisco, Palo Alto). En la nube, se hace con software.

### Security Groups (Firewalls de Instancia)

Los Security Groups son firewalls a nivel de instancia (servidor). Cada máquina virtual tiene su propio firewall virtual.

Características:

- Stateful: si permites tráfico entrante, el tráfico saliente de respuesta se permite automáticamente.
- Solo permiten reglas de Allow (no se puede escribir Deny).
- Se aplican a nivel de interfaz de red.

Ejemplo de configuración:

- Regla 1: Permitir SSH (puerto 22) solo desde IP 192.168.1.0/24 (red interna).
- Regla 2: Permitir HTTP (puerto 80) desde cualquier IP (0.0.0.0/0).
- Regla 3: Permitir HTTPS (puerto 443) desde cualquier IP.

### Network ACLs (Firewall de Subred)

Las NACLs son firewalls a nivel de subred (grupo de servidores).

Características:

- Stateless: debes configurar explícitamente reglas de entrada y salida.
- Permiten reglas de Allow y Deny.
- Se evaluan en orden numérico (de menor a mayor número de regla).

### Diferencias Clave

| Característica | Security Group | NACL |
|----------------|---------------|------|
| Nivel | Instancia | Subred |
| Stateful | Si | No |
| Reglas Deny | No | Si |
| Orden de evaluación | Todas las reglas | Por número |
| Aplica a | Interfaces de red | Toda la subred |

### El Error Común: Puertos Abiertos al Mundo

El error más común en la nube es abrir puertos innecesarios a 0.0.0.0/0 (todo internet). Escáneres automáticos encuentran estos puertos en minutos:

- Puerto 22 (SSH) abierto al mundo: ataque de fuerza bruta.
- Puerto 3306 (MySQL) abierto al mundo: acceso directo a base de datos.
- Puerto 6379 (Redis) abierto al mundo: acceso a caché (sin autenticación, tipicamente).
- Puerto 27017 (MongoDB) abierto al mundo: acceso a base de datos NoSQL.

## El Riesgo de las Configuraciones por Defecto

casi todos estos errores se evitan con una sola regla: no confiar en los valores por defecto.

Cada servicio en la nube viene con configuraciones por defecto. La mayoría priorizan la facilidad de uso sobre la seguridad.

### Ejemplos de Configuraciones Peligrosas

1. Bucket S3 Público: Por defecto, los buckets S3 son privados. Pero es fácil cambiarlos a públicos con un clic.

2. Base de Datos RDS Pública: Por defecto, las bases de datos RDS se crean en subredes privadas, pero es fácil cambiarlas a públicas para desarrollo.

3. Usuario Root sin MFA: La cuenta root de AWS no requiere MFA por defecto. Debe activarse manualmente.

4. Security Groups Permisivos: Por defecto, los Security Groups permiten todo el tráfico saliente.

## Casos Reales

### Capital One (2019)

En 2019, un ex-empleado de Amazon Web Services exploto una vulnerabilidad en un firewall de aplicación web (WAF) de Capital One para acceder a los buckets S3 de la empresa.

La atacante robo datos de 106 millones de clientes de Capital One, incluyendo:

- Números de seguro social.
- Números de cuentas bancarias.
- Nombres y direcciones.

La causa: una configuración incorrecta de IAM que permitia al WAF asumir un rol con permisos excesivos. No fue un hackeo de la infraestructura de AWS, fue un error de configuración del cliente.

### Verizon (2017)

Un bucket S3 de Verizon expuso datos de 6 millones de clientes por una configuración pública de almacenamiento. Un investigador de seguridad encontró el bucket abierto y notifico a Verizon.

El bucket contenía nombres, direcciones, números de teléfono y códigos PIN de cuentas.

### Accenture (2017)

Cuatro buckets S3 de Accenture estaban abiertos al público, exponiendo datos internos de la empresa incluyendo:

- Contraseñas en texto plano.
- Certificados SSL privados.
- Datos de clientes.

Los buckets fueron encontrados por UpGuard, una empresa de seguridad, que notifico a Accenture.

### El Ataque a Code Spaces (2014)

Code Spaces, una empresa que alojaba codigo fuente de clientes, fue atacada cuando un atacante obtuvo acceso a la consola de administración de AWS.

El atacante:

1. Ingreso a la cuenta de AWS usando credenciales robadas.
2. Solicito la eliminación de todos los servidores EC2.
3. Code Spaces no tenía copias de seguridad externas.
4. La empresa cerró operaciones permanentemente.

La leccion: las credenciales de la nube deben protegerse con MFA y los backups deben estar en cuentas separadas.

## Modos de Falla

### Falla 1: Confundir Modelos de Responsabilidad

El equipo cree que al migrar a PaaS, el proveedor se encarga de todo, incluyendo las contraseñas de la base de datos. Esto lleva a bases de datos sin contrasena o con contraseñas débiles.

### Falla 2: API Keys en Repositorios Públicos

Desarrolladores suben API Keys a GitHub por accidente. Scanners automáticos (como git-secrets, truffleHog) las detectan en minutos. Una vez pública, la llave debe revocarse inmediatamente.

### Falla 3: Privilegios Excesivos

Asignar permisos de Administrador a todos los empleados para evitar configuraciones complejas de IAM. Esto viola el Principio de Menor Privilegio.

### Falla 4: Falta de Monitoreo

No configurar alertas de CloudTrail para detectar actividades anomalas como:

- Inicios de sesión desde ubicaciones inusuales.
- Creación de recursos costosos (instancias grandes).
- Eliminación de recursos de seguridad (Security Groups, IAM roles).

### Falla 5: No Usar MFA en Cuentas Root

La cuenta root (Administrador absoluto) sin MFA es el riesgo más grande. Si un atacante obtiene la contrasena de la cuenta root, tiene control total.

### Falla 6: Backups en la Misma Cuenta

Si el atacante compromete la cuenta, también tiene acceso a los backups. Los backups deben estar en cuentas separadas (cross-account backup) o en almacenamiento inmutable.

## La Mirada del Hacker

Como atacante, la nube es mi territorio favorito. Los errores de configuración son omnipresentes.

### Encontrar Buckets Abiertos

Uso herramientas como:

- bucket-stream: escanea listas de palabras contra nombres de buckets.
- grayhatwarfare: base de datos de buckets públicos encontrados.
- Google Dork: `site:s3.amazonaws.com "confidential"`.

Una vez que encuentro un bucket público, descargó todo su contenido y busco:

- Archivos de configuración con credenciales.
- Bases de datos SQL.
- Documentos con información personal.
- Claves SSH privadas.

### Encontrar API Keys en GitHub

Uso git-secrets, truffleHog o simplemente busco en GitHub:

- `AKIA[0-9A-Z]{16}` (patrón de Access Key de AWS).
- `-----BEGIN RSA PRIVATE KEY-----`.
- `password=` o `token=` en archivos de configuración.

Una vez que encuentro una API Key, asumo ese rol y busco que permisos tiene. Si tiene permisos de Administrador, el juego terminó.

### Escaneo de Puertos en la Nube

Uso masscan o Zmap para escanear rangos de IPs de AWS (publicados por Amazon) en busca de puertos abiertos:

- Redis (6379) sin autenticación: acceso a datos en memoria.
- MongoDB (27017) sin autenticación: acceso total a la base de datos.
- Elasticsearch (9200) sin autenticación: acceso a indices de datos.

### Explotación de SSRF (Server Side Request Forgery)

En la nube, las instancias EC2 tienen acceso a un endpoint de metadatos: `http://169.254.169.254/latest/meta-data/`. Este endpoint devuelve las credenciales temporales de la instancia.

Si encuentro una vulnerabilidad SSRF en la aplicación web, puedo:

1. Llamar al endpoint de metadatos.
2. Obtener las credenciales temporales de la instancia.
3. Usar esas credenciales para acceder a recursos de AWS.

Fue la técnica usada en el ataque a Capital One.

## Modelos de Despliegue en la Nube

Además de los modelos de servicio (IaaS, PaaS, SaaS), existen modelos de despliegue:

### Nube Pública

La infraestructura pertenece al proveedor (AWS, Azure, GCP) y esta disponible para el público.

- Ventajas: Bajo costo, escalabilidad, sin mantenimiento físico.
- Riesgos: Menor control, datos fuera de la empresa, multi-tenencia.
- Uso típico: Startups, aplicaciones web, desarrollo y pruebas.

### Nube Privada

La infraestructura pertenece a la empresa y esta dedicada exclusivamente a ella.

- Ventajas: Control total, cumplimiento normativo, aislamiento.
- Riesgos: Costo elevado, requiere equipo especializado.
- Uso típico: Bancos, gobierno, datos clasificados.

### Nube Hibrida

Combina nube pública y privada, con datos y aplicaciones compartidos entre ambos.

- Ventajas: Flexibilidad, optimización de costos, compliance.
- Riesgos: Complejidad de gestión, latencia de red, superficie de ataque mayor.
- Uso típico: Empresas con datos sensibles que necesitan escalar a pública para picos de demanda.

### Multi-Cloud

Usa múltiples proveedores de nube pública simultáneamente.

- Ventajas: Evita vendor lock-in, redundancia, mejores precios por servicio.
- Riesgos: Complejidad de gestión, costos de transferencia entre nubes, habilidades múltiples requeridas.
- Uso típico: Empresas grandes con equipos especializados por nube.

## Automation y DevOps en la Nube

La nube no se administra manualmente. Se administra a través de codigo y automatización.

### Infraestructura como Codigo (IaC)

Los recursos de nube se definen en archivos de configuración (Terraform, CloudFormation, ARM templates). Esto permite:

- Control de versiones (git).
- Revisión de cambios (pull requests).
- Automatización de despliegues (CI/CD).
- Consistencia entre entornos.

### Riesgos de Seguridad en IaC

1. **Secretos en codigo:** Contraseñas, API Keys y certificados hardcodeados en los archivos de IaC. Herramientas como tfsec, checkov o cfn-nag escanean estos archivos en busca de secretos.

2. **Políticas demasiado permisivas:** La mayoría de ejemplos de IaC usan políticas anchas (ej. `Action: "*"`). Sin revisión, estas políticas llegan a producción.

3. **Infraestructura inmutable:** Una vez desplegada, la infraestructura no debe modificarse manualmente. Cualquier cambio debe hacerse a través del codigo. Las modificaciones manuales crean "drift" que rompe la consistencia.

### Shift Left Security en la Nube

El concepto de "shift left" significa integrar la seguridad desde el inicio del desarrollo:

1. Escanear IaC en el commit (pre-commit hooks).
2. Escanear IaC en el pull request (CI).
3. Validar políticas de seguridad antes del deploy.
4. Monitorear el runtime para detectar cambios no autorizados.

## El Concepto de Zonas de Aterrizaje (Landing Zones)

En empresas grandes, la nube se organiza en "landing zones": configuraciones predefinidas que cumplen con las políticas de seguridad de la empresa.

### Componentes de una Landing Zone

1. **Organización de cuentas:** Cuentas separadas por entorno (producción, pruebas, desarrollo) y por unidad de negocio.

2. **Red base:** VPC/VNet con subredes públicas y privadas, conectividad VPN/ExpressRoute.

3. **IAM base:** Roles predefinidos con permisos minimos, federacion con AD.

4. **Logging centralizado:** CloudTrail/Activity Log habilitado para todas las cuentas, enviado a un SIEM central.

5. **Políticas de seguridad:** SCP/Azure Policy que bloquean configuraciones inseguras (discos sin cifrar, puertos abiertos al mundo).

## Migración Segura a la Nube (6Rs)

Cuando una empresa migra sus sistemas a la nube, puede usar el modelo de las 6Rs:

1. **Rehost (Lift & Shift):** Mover servidores tal cual (mínimo cambio, mínimo beneficio de seguridad).

2. **Replatform (Lift, Tinker & Shift):** Mover a servicios administrados (ej. de MySQL auto-instalado a RDS). Mejora la seguridad porque el proveedor parchea el SO.

3. **Refactor / Re-architect:** Redisenar la aplicación para la nube (microservicios, serverless). Máximo beneficio de seguridad pero mayor costo de desarrollo.

4. **Repurchase:** Cambiar a SaaS (ej. de CRM propio a Salesforce). La seguridad la gestiona el proveedor.

5. **Retire:** Eliminar aplicaciones que ya no se necesitan. Reduce la superficie de ataque.

6. **Retain:** Mantener on-premise las aplicaciones que no pueden migrarse (por compliance, latencia, o dependencias técnicas).

## Autoevaluación

Responde estas preguntas para verificar si comprendes los conceptos:

1. El servidor de la base de datos de tu empresa esta alojado en una máquina virtual de AWS (Modelo IaaS). Un hacker descubre que el software del servidor web (Apache) estaba desactualizado desde hace 3 años, entra y roba los datos. Quien tiene la responsabilidad legal de este fallo según el Modelo de Responsabilidad Compartida, Amazon o la Empresa? Justifica.

2. Contratas un servicio de Google Drive (SaaS) para guardar archivos. Un hacker no ataca a Google, sino que adivina la contrasena 12345 de tu jefe y descarga los archivos. Por que Google no puede ser demandado por esta filtración de datos?

3. Por que el robo de una API Key con permisos administrativos en la nube es infinitamente más devastador para una empresa moderna que el robo físico de una computadora de escritorio en sus oficinas?

4. Un amigo te dice: Alojé mi pagina web en Microsoft Azure, así que ya no necesito configurar un Firewall ni preocuparme por la Inyección SQL, porque Microsoft me defiende. Por que tu amigo esta a punto de perder su negocio?

5. Explica la diferencia entre un Security Group (firewall de instancia) y una Network ACL (firewall de subred). En que situación usarías cada uno?

6. Un desarrollador sube una API Key de AWS a un sitio público como GitHub. La llave tiene permisos de administrador. Describe el impacto inmediato y que pasos debe seguir el equipo de seguridad para mitigar el riesgo.

7. Por que el endpoint de metadatos de AWS (169.254.169.254) es un objetivo crítico para un atacante que explota una vulnerabilidad SSRF en una aplicación web alojada en EC2?

8. Una empresa tiene todos sus backups en la misma cuenta de AWS que los servidores de producción. Que riesgo específico corre si un atacante compromete la cuenta?
