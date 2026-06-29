---
title: "AWS, Azure y GCP: Los Tres Reyes de la Nube"
level: "intermedio"
content_type: "guia"
updated: "2026-06-29"
reviewed: "2026-06-29"
reviewed_against: "Catálogos oficiales de AWS, Microsoft Azure y Google Cloud consultados el 2026-06-29"
official_sources:
  - title: "AWS Security, Identity and Compliance"
    url: "https://aws.amazon.com/products/security/"
  - title: "Microsoft Azure Security"
    url: "https://azure.microsoft.com/en-us/products/category/security/"
  - title: "Google Cloud Security Products"
    url: "https://cloud.google.com/security/products"
  - title: "Microsoft — Azure Blueprints retirement"
    url: "https://learn.microsoft.com/en-us/azure/governance/blueprints/blueprint-retirement"
---

# AWS, Azure y GCP: Los Tres Reyes de la Nube

## Objetivo de esta Guía

Aprender a no dejarte intimidar por el marketing. Entender que sin importar si la empresa usa Amazon, Microsoft o Google, la infraestructura subyacente que vas a hackear o defender es exactamente la misma; solo le cambian el nombre comercial.

El mercado mundial de la nube esta dominado por tres corporaciones gigantes. Si entiendes como funciona una, entenderás como funcionan las otras dos simplemente comprando un diccionario de traducciones.

## La Analogía

Imagina tres cadenas de hoteles de lujo: Marriott, Hilton y Hyatt. Cada una tiene su propio diseño de habitaciones, su propio sistema de reservas y sus propias tarjetas de acceso.

Pero al final del día, las tres tienen:

- Habitaciones con camas (servidores virtuales).
- Restaurantes (bases de datos).
- Gimnasios (servicios de caching).
- Seguridad (firewalls, IAM).

Si aprendes a hospedarte en un Marriott, puedes hospedarte en un Hilton solo aprendiendo las diferencias de nomenclatura. Lo mismo pasa con AWS, Azure y GCP.

## Amazon Web Services (AWS)

Es el Rey indiscutible. Fue el primero en llegar al mercado (2006) y tiene la mayor cuota del mundo.

### Perfil de Cliente

Si una empresa es una Startup tecnológica (Netflix, Airbnb, Uber), casi seguro usan AWS. También es popular en empresas que necesitan flexibilidad y una amplia gama de servicios.

### Ventajas y Desventajas

Ventajas:
- Más de 200 servicios diferentes (elige lo que necesites).
- Madurez y comunidad enorme.
- Facturacion granular por hora/segundo.
- Certificaciones y documentación extensa.

Desventajas:
- Curva de aprendizaje pronunciada.
- Consola de administración compleja.
- Fácil cometer errores de configuración.
- Costos impredecibles si no se gestionan.

### El Diccionario de AWS

Aprende estos nombres, aparecen en todos los reportes de seguridad y examenes:

- **EC2 (Elastic Compute Cloud):** Una simple Computadora Virtual (un servidor Linux o Windows).
- **S3 (Simple Storage Service):** Un disco duro gigante donde guardas fotos o backups.
- **IAM (Identity and Access Management):** El sistema de control de usuarios y permisos.
- **VPC (Virtual Private Cloud):** La red virtual donde viven tus servidores.
- **RDS (Relational Database Service):** Bases de datos administradas (MySQL, PostgreSQL, SQL Server).
- **Lambda:** Funciones serverless (código que se ejecuta sin servidor).
- **CloudTrail:** Auditoría de todas las acciones en tu cuenta.
- **CloudWatch:** Monitoreo de métricas y logs.
- **Route 53:** Servicio de DNS.
- **CloudFront:** CDN (Content Delivery Network).

## Microsoft Azure

Es el segundo jugador más grande, pero el favorito del sector corporativo tradicional que ya usa Microsoft.

### Perfil de Cliente

Si el cliente es un Banco, un Hospital o una oficina de Gobierno que lleva 20 años usando Windows y Active Directory, casi 100% seguro usarán Azure, porque se integra perfectamente con las licencias de Microsoft que ya pagan.

### Ventajas y Desventajas

Ventajas:
- Integración nativa con Microsoft 365, Active Directory y Windows Server.
- Modelo de licencias empresariales (EA) que reduce costos para clientes existentes.
- Cumplimiento normativo extenso (ISO, SOC, FedRAMP).
- Soporte para aplicaciones .NET y SQL Server.

Desventajas:
- Menos servicios que AWS.
- Consola de administración menos intuitiva.
- Gestión de permisos compleja entre RBAC, Azure Policy, grupos de administración e infraestructura como código.
- Menor presencia en startups y empresas tecnológicas.

### El Diccionario de Azure (La Traducción)

- **Virtual Machines (VM):** El equivalente a las EC2 de Amazon. (Computadoras virtuales).
- **Blob Storage:** El equivalente a los S3 de Amazon. (Almacenamiento de objetos).
- **Entra ID (antes Azure Active Directory):** El equivalente a IAM + Directorio Activo en la nube.
- **Virtual Network (VNet):** El equivalente a VPC.
- **Azure SQL Database:** El equivalente a RDS.
- **Functions:** El equivalente a Lambda.
- **Azure Monitor:** El equivalente a CloudWatch.
- **Azure Policy:** Gobierno y cumplimiento de configuraciones.
- **Azure Firewall:** Firewall como servicio administrado.
- **Key Vault:** Gestión de secretos y certificados.

### La Complejidad de los Permisos en Azure

Azure tiene un modelo de permisos particularmente complejo que incluye:

1. **RBAC (Role-Based Access Control):** Roles clasicos como Owner, Contributor, Reader.
2. **Azure Policy:** Reglas de gobierno que se aplican automáticamente (ej. "bloquear la creación de VMs sin encriptación").
3. **Management Groups:** Jerarquía de grupos que heredan políticas.
4. **Template Specs y Deployment Stacks:** Versionado y despliegue gobernado de infraestructura. Azure Blueprints está en retirada progresiva desde julio de 2026 y debe migrarse antes de su eliminación.

El error común en Azure es:

- Asignar el rol Owner a todo el equipo de desarrollo (permisos excesivos).
- No usar Management Groups para separar entornos (producción, pruebas, desarrollo).
- No auditar los cambios en Azure Policy.

## Google Cloud Platform (GCP)

El tercer jugador. Tiene menos cuota de mercado global, pero es amado por los ingenieros de datos y la inteligencia artificial.

### Perfil de Cliente

Empresas que manejan Big Data, Inteligencia Artificial o que usan intensivamente Kubernetes (inventado por Google). También es popular en startups que priorizan la simplicidad.

### Ventajas y Desventajas

Ventajas:
- Interfaz de usuario más limpia y fácil de usar.
- Red interna más rápida (Andromeda, su red SDN).
- Mejor integración con Kubernetes (GKE - Google Kubernetes Engine).
- Precios competitivos en Big Data (BigQuery).
- Comandos de CLI consistentes (gcloud).

Desventajas:
- Menos servicios que AWS y Azure.
- Menor presencia en empresas tradicionales.
- Documentación a veces desactualizada.
- Menor comunidad y terceros integrados.

### El Diccionario de GCP (La Traducción)

- **Compute Engine:** El equivalente a EC2 o VMs.
- **Cloud Storage:** El equivalente a S3 o Blobs.
- **Cloud IAM:** El control de accesos.
- **VPC:** Red virtual (similar a AWS VPC).
- **Cloud SQL:** Base de datos administrada (MySQL, PostgreSQL).
- **Cloud Functions:** El equivalente a Lambda.
- **Cloud Logging:** El equivalente a CloudWatch Logs.
- **Cloud Monitoring:** El equivalente a CloudWatch Metrics.
- **Cloud KMS:** Gestión de llaves criptográficas.
- **Cloud Armor:** WAF (Web Application Firewall).

### Por Que GCP es Diferente

GCP tiene un enfoque más "global" desde el inicio:

- Los recursos no están en "regiones" específicas por defecto (se asignan globalmente).
- Los buckets de Cloud Storage tienen nombres globales (no por cuenta).
- La red VPC es global (no por region como AWS).

Esto simplifica la administración pero puede complicar el aislamiento.

## El Hacker Multi-Nube (Cloud Agnostic)

Como profesional de ciberseguridad, no puedes decir "Yo solo se hackear AWS". Debes ser Agnóstico a la Nube.

### Lo que No Cambia Entre Nubes

Un hacker no ataca "un EC2" o "un Compute Engine". El hacker ataca un servidor Linux que tiene un puerto 22 abierto. A Linux no le importa en que nube esta flotando; las técnicas de Inyección SQL, XSS o Fuerza Bruta aplican exactamente igual en Amazon que en la computadora debajo de tu cama.

Las vulnerabilidades que son independientes del proveedor:

- SQL Injection: funciona igual en cualquier servidor de base de datos.
- XSS: funciona igual en cualquier aplicación web.
- Fuerza Bruta SSH: funciona contra cualquier servidor Linux.
- Desbordamiento de Buffer: funciona igual en cualquier binario.

### Lo que si Cambia: La API de Control

Donde las nubes SI son diferentes, es en como las controlas por fuera.

Si un atacante roba tus llaves secretas (API Keys) de AWS, usara un comando en su terminal llamado `aws s3 ls` para robar tus archivos. Si el atacante roba tus llaves de Google, usara el comando `gcloud storage ls`. Si roba tus llaves de Azure, usara `az storage blob list`.

El objetivo (robar datos) es el mismo; solo cambia la herramienta de control remoto.

### Ejemplo Práctico: Listar Buckets en Cada Nube

AWS:
```bash
aws s3 ls
```

Azure:
```bash
az storage container list
```

GCP:
```bash
gcloud storage ls
```

Tres comandos diferentes para la misma acción: listar almacenamiento.

## Seguridad Multi-Nube

Cada vez más empresas usan varios proveedores de nube simultáneamente (multi-cloud). Esto presenta desafios de seguridad unicos:

1. **Gestión de Identidades Unificada:** Usar Entra ID (Azure) para autenticar usuarios en AWS (via SAML federation).

2. **Monitoreo Centralizado:** Enviar logs de AWS, Azure y GCP a un SIEM único.

3. **Políticas de Red Consistentes:** Asegurar que los Security Groups en AWS, las NSGs en Azure y los Firewall Rules en GCP tengan las mismas reglas básicas.

4. **Gestión de Secretos:** Usar una bóveda central (HashiCorp Vault, CyberArk) en lugar del sistema nativo de cada nube.

### Herramientas Multi-Nube

- **Terraform:** Infraestructura como Código (IaC) para todas las nubes.
- **Prisma Cloud (Palo Alto):** Seguridad multi-nube unificada.
- **Wiz:** Escaneo de vulnerabilidades multi-nube.
- **CloudHealth:** Gestión de costos multi-nube.

## Casos Reales

### El Ataque a Tesla en AWS (2018)

Tesla tenía su infraestructura de Kubernetes en AWS. Un atacante encontró un dashboard de Kubernetes sin autenticación y lo uso para desplegar contenedores de minería de criptomonedas.

El ataque no fue contra AWS, fue contra una configuración errónea de Kubernetes en AWS. La lección: el proveedor de nube no es responsable de la configuración del software que tu instalas en el.

### La Brecha de Microsoft Azure Active Directory (2021)

Un investigador descubrió que Microsoft Entra ID tenía una vulnerabilidad que permitia a un atacante elevar privilegios de un usuario invitado a administrador global.

Microsoft corrigio la vulnerabilidad, pero el caso muestra que incluso los servicios PaaS pueden tener fallos de seguridad. La responsabilidad es compartida: Microsoft corrige el servicio, el cliente debe monitorear los logs de actividad.

### Coinbase en GCP (2021)

Coinbase uso Google Cloud Platform para su infraestructura de criptomonedas. Un atacante exploto una vulnerabilidad en un servicio de GCP (Cloud Functions) para acceder a datos de clientes.

La lección: en PaaS, el proveedor asegura la plataforma, pero el cliente asegura el código que ejecuta en ella.

## Modos de Falla

### Falla 1: Asumir que el Proveedor Asegura Todo

El error más común: "Como estamos en Azure, Microsoft nos protege del SQL Injection". Falso. La seguridad de la aplicación es responsabilidad del cliente.

### Falla 2: No Entender la Facturacion Compartida

Cada nube tiene un modelo de responsabilidad diferente según el servicio. IaaS requiere más responsabilidad del cliente que PaaS o SaaS.

### Falla 3: Traducir Mal los Nombres

Un equipo que solo sabe AWS puede configurar mal Azure porque no entiende los equivalentes exactos. Por ejemplo, los "Security Groups" de AWS son stateful, pero las "NSGs" (Network Security Groups) de Azure son stateless.

### Falla 4: Dependencia Excesiva de un Solo Proveedor (Vendor Lock-in)

Usar servicios propietarios (DynamoDB en AWS, Cosmos DB en Azure) dificulta migrar a otro proveedor. Si el proveedor tiene un fallo de seguridad, el cliente no tiene alternativa.

## La Mirada del Hacker

Como atacante, no me importa que nube usa mi objetivo. Me importa que servicio esta mal configurado.

### Encontrar el Punto de Entrada

Independientemente de la nube, busco:

1. Puertos abiertos al mundo (SSH, RDP, bases de datos).
2. APIs de administración expuestas (kubernetes API, docker API).
3. Aplicaciones web con vulnerabilidades conocidas.
4. Repositorios públicos con credenciales.

### Explotar Diferencias de Nomenclatura

Cuando encuentro una API Key, pruebo a ver si es de AWS, Azure o GCP:

- AWS: `AKIA...` (Access Key ID) o `AWS_SECRET_ACCESS_KEY`.
- Azure: `azure_storage_account_key` o `AZURE_CLIENT_SECRET`.
- GCP: `GOOGLE_APPLICATION_CREDENTIALS` o un archivo JSON de service account.

Cada una tiene una CLI diferente, pero el objetivo es el mismo: acceder a los recursos.

### Movimiento Lateral Multi-Nube

Si la empresa usa AWS y Azure:

1. Comprometo un bucket S3 en AWS.
2. Encuentro en los documentos un script con credenciales de Azure.
3. Uso esas credenciales para acceder a Azure SQL Database.

El movimiento lateral entre nubes es particularmente peligroso porque los equipos de seguridad suelen estar organizados por nube, no interconectados.

## Servicios de Seguridad por Proveedor

Cada proveedor ofrece servicios nativos de seguridad. Conocerlos ayuda a configurar la defensa sin herramientas de terceros.

### AWS Security Services

- **AWS WAF:** Web Application Firewall para proteger aplicaciones web.
- **AWS Shield:** Protección DDoS con un nivel Standard incluido y opciones avanzadas sujetas a suscripción y consumo.
- **AWS GuardDuty:** Detección de amenazas basada en machine learning (analiza CloudTrail, VPC Flow Logs, DNS).
- **AWS Inspector:** Escaneo de vulnerabilidades en EC2 y ECR.
- **AWS Security Hub:** Centro de comando de seguridad que agrega alertas de otros servicios.
- **AWS Config:** Evaluación de configuraciones contra reglas de compliance.
- **AWS KMS:** Gestión de claves de cifrado.
- **AWS CloudHSM:** HSM dedicado para cumplimiento normativo.
- **AWS Secrets Manager:** Rotación y gestión de secretos.
- **AWS Macie:** Detección de datos sensibles en S3 usando ML.

### Azure Security Services

- **Azure Firewall:** Firewall como servicio administrado.
- **Azure DDoS Protection:** Protección DDoS con planes y capacidades que dependen del recurso y la arquitectura.
- **Microsoft Defender for Cloud:** Gestión de postura cloud y recomendaciones de configuración, con capacidades que dependen del plan habilitado.
- **Microsoft Sentinel:** SIEM nativo en la nube.
- **Azure Key Vault:** Gestión de secretos, certificados y claves.
- **Azure Policy:** Gobierno de recursos mediante reglas.
- **Azure Deployment Stacks + Template Specs:** Despliegues gobernados y artefactos versionados que sustituyen Azure Blueprints.
- **Azure ATP (Advanced Threat Protection):** Detección de amenazas en Active Directory.
- **Azure Information Protection:** Clasificación y protección de documentos.
- **Defender for Cloud workload protection:** Protección de cargas de trabajo según los planes habilitados.

### GCP Security Services

- **Cloud Armor:** WAF y protección DDoS.
- **Cloud IDS:** Detección de intrusiones en la red.
- **Security Command Center:** Centro de comando de seguridad.
- **Cloud KMS:** Gestión de claves de cifrado.
- **Cloud HSM:** HSM gestionado.
- **Cloud DLP:** Prevención de pérdida de datos (detección de datos sensibles).
- **Google Security Operations:** SIEM de Google.
- **Web Security Scanner:** Escaneo automático de vulnerabilidades web.
- **Binary Authorization:** Solo permite desplegar imágenes de contenedor firmadas.
- **Assured Workloads:** Cumplimiento normativo para cargas de trabajo reguladas.

### Tabla Comparativa de Servicios de Seguridad

cada proveedor te vende su propio ecosistema, pero al final todos hacen lo mismo: proteger tus recursos. La diferencia esta en como se llama el servicio y cuanto te cobran.

| Función | AWS | Azure | GCP |
|---------|-----|-------|-----|
| WAF | WAF | Azure WAF | Cloud Armor |
| SIEM | Security Hub + 3ro | Microsoft Sentinel | Google Security Operations |
| KMS | AWS KMS | Key Vault | Cloud KMS |
| HSM | CloudHSM | Azure HSM | Cloud HSM |
| Postura | Security Hub | Defender for Cloud | Security Command Center |
| DLP | Macie | Information Protection | Cloud DLP |
| Secrets | Secrets Manager | Key Vault | Secret Manager |

## Certificaciones de Nube para Seguridad

Si quieres especializarte en seguridad de nube, estas son las certificaciones clave:

### AWS

- **AWS Certified Security - Specialty:** La certificación de seguridad para AWS. Cubre IAM, logging, cifrado, compliance, y respuesta a incidentes.
- **AWS Certified Solutions Architect - Associate:** Base para entender la arquitectura de AWS.

### Azure

- **Microsoft Certified: Azure Security Engineer Associate (AZ-500):** Implementación de controles de seguridad en Azure.
- **Microsoft Certified: Cybersecurity Architect Expert (SC-100):** Diseño de arquitecturas de seguridad.

### GCP

- **Google Professional Cloud Security Engineer:** Diseño e implementación de seguridad en GCP.
- **Google Professional Cloud Architect:** Arquitectura de GCP (incluye seguridad).

### Multi-Nube / Independientes

- **CCSP (Certified Cloud Security Professional):** Certificación de (ISC)2, independiente del proveedor.
- **CompTIA Cloud+:** Certificación básica de nube.
- **Certificate of Cloud Security Knowledge (CCSK):** De CSA (Cloud Security Alliance).

## Hacking Ético en la Nube

Para los que quieren probar la seguridad de la nube desde el lado ofensivo:

### Herramientas de Auditoría Cloud

- **ScoutSuite:** Herramienta open-source de auditoría multi-nube. Escanea configuraciones y reporta fallos.
- **Pacu:** Framework de ataque para AWS. Incluye modulos para escalada de privilegios, exfiltración de datos, y persistencia.
- **CloudSploit:** Escaneo de configuración de seguridad (código abierto).
- **Stratus Red Team:** Simulación de técnicas MITRE ATT&CK en la nube.

### Laboratorios Prácticos

- **Flaws.cloud:** Laboratorio de seguridad de AWS creado por un ingeniero de AWS.
- **Flaws2.cloud:** Versión avanzada.
- **CloudGoat:** Laboratorio vulnerable de AWS creado por Rhino Security Labs.
- **AzureGoat:** Laboratorio vulnerable de Azure.

## Modos de Falla Adicionales

### Falla 5: No Usar Etiquetas (Tags)

Las etiquetas son metadatos que se asignan a los recursos (proyecto, entorno, dueño). Sin etiquetas, es imposible saber que recurso pertenece a que equipo, lo que dificulta la auditoría y la gestión de costos.

### Falla 6: Exceso de Confianza en la Red de la Nube

Algunas empresas asumen que la red de la nube es inherentemente segura. No configuran firewalls internos ni segmentación porque "la nube ya protege". Esto es falso: la responsabilidad de la seguridad de red es compartida.

### Falla 7: No Probar los Backups

Los backups en la nube (snapshots de EBS, copias de RDS, backups de Azure VM) deben probarse regularmente. Un backup que no se prueba no es un backup, es una esperanza.

### Falla 8: Ignorar los Costos de Seguridad

Los costos cambian por región, volumen, plan, retención y tipo de dato. No uses cifras estáticas de una guía para presupuestar: consulta las calculadoras oficiales y registra los supuestos. Un diseño seguro debe contemplar desde el inicio el costo de telemetría, retención, protección y respuesta.

## Autoevaluación

Responde estas preguntas para verificar si comprendes los conceptos:

1. Estas leyendo un reporte de inteligencia y dice: "El atacante vulneró una instancia EC2 y luego exfiltró datos de un bucket S3". Traduce esta oración al idioma de Microsoft Azure.

2. Un desarrollador te dice: "Vamos a mover nuestro servidor local a la nube de AWS (IaaS). Como AWS tiene ingenieros de seguridad brillantes, ya no necesito parchear las vulnerabilidades de mi Linux". Basado en lo que aprendiste en la guía anterior, Por qué este desarrollador esta equivocado?

3. Si descubres que la página web de tu cliente es vulnerable a Inyección SQL (SQLi). La forma de ejecutar el ataque matemático SQLi cambia dependiendo de si el servidor esta en AWS, Azure o GCP? Por qué?

4. Por qué el servicio Microsoft Entra ID es el objetivo final y más codiciado para cualquier atacante que vulnera una red corporativa moderna alojada en la nube de Microsoft?

5. Explica por qué un atacante no necesita saber si un servidor esta en AWS, Azure o GCP para explotar una vulnerabilidad de Inyección SQL.

6. Cual es la diferencia fundamental entre un Security Group (AWS) y una Network Security Group (Azure) en términos de stateful vs stateless?

7. Un equipo de seguridad multi-nube necesita centralizar logs de AWS, Azure y GCP. Que desafios enfrenta y como podría resolverlos?

8. Por qué se considera que el vendor lock-in (dependencia excesiva de un proveedor) es un riesgo de seguridad?
