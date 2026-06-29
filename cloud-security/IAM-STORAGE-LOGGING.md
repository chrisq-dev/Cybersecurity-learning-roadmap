---
title: "IAM, Storage y Logs: Las Piezas Clave de la Nube"
level: "intermedio"
content_type: "guia"
updated: "2026-06-29"
---

# IAM, Storage y Logs: Las Piezas Clave de la Nube

## Objetivo de esta Guía

Aprender las tres piezas maestras que conforman cualquier infraestructura en la nube. Si le preguntas a un ingeniero de AWS experto que necesitas proteger para asegurar una empresa millonaria, te responderá tres cosas: Quien tiene las llaves (IAM), Donde están los datos (Storage) y Quien te esta vigilando (Logs).

No importa si usas AWS, Azure o GCP: estos tres pilares existen en todos los proveedores. Si controlas estos tres, controlas la seguridad de tu nube.

## La Analogía

Imagina un edificio corporativo de 20 pisos:

- **Storage (S3, Blob, Cloud Storage):** Es la bodega gigante en el sótano donde se guardan todos los archivos de la empresa. Radiografías, contratos, fotos, todo esta ahí.

- **IAM (Identity and Access Management):** Es el conserje que reparte las llaves. El conserje decide quien puede entrar a la bodega, quien solo puede ver desde la puerta, y quien no puede ni acercarse.

- **Logs (CloudTrail, Azure Monitor, Cloud Logging):** Son las cámaras de seguridad en cada puerta y cada pasillo. Cada vez que alguien abre una puerta, la cámara registra quien fue, a que hora y que hizo.

Si el conserje da mal las llaves (IAM mal configurado), la bodega queda expuesta (Storage público), y si las cámaras no graban (Logs desactivados), nunca sabrás quien robo.

## Storage: La Bodega Gigante

Imagina que tienes una empresa de Hospitales y tienes 5 millones de radiografías en formato JPG. No puedes guardar todo eso en el disco duro de una computadora normal porque se llenaría en dos días.

Para esto existe el Almacenamiento en la Nube (AWS S3, Azure Blob, GCP Cloud Storage).

### Características del Almacenamiento de Objetos

- No hay sistema operativo, no hay Linux, no hay Windows. Simplemente subes el archivo y el proveedor te da una URL.
- Escalabilidad prácticamente infinita.
- Datos replicados en múltiples zonas de disponibilidad.
- Acceso via API REST (HTTP/HTTPS).

### El Modelo de Objetos

En el almacenamiento de objetos (S3, Blob, Cloud Storage), los datos se organizan en tres niveles:

1. **Cuenta/Tenant:** La cuenta del proveedor (tu empresa).
2. **Bucket/Container:** Un "cubo" o "contenedor" donde agrupas archivos. Cada bucket tiene un nombre globalmente único en AWS.
3. **Objeto:** El archivo individual (una foto, un documento, un video). Cada objeto tiene una clave (key) que es su ruta dentro del bucket.

Ejemplo de URL de un objeto:
```
https://mi-hospital.s3.amazonaws.com/pacientes/radiografia-12345.jpg
```

### El Famoso Bucket Abierto (El Error #1)

Que pasa si un programador novato (o perezoso) construye la bodega del hospital, pero se le olvida ponerle candado a la puerta principal? La bodega se vuelve Pública en Internet.

Un Hacker no tiene que hackear ninguna contraseña. Simplemente entra a su navegador web, escribe la URL pública de la bodega, y comienza a descargar el millón de radiografías privadas frente a los ojos de Amazon.

### Tipos de Acceso a un Bucket

Hay varios niveles de acceso público:

1. **Bucket Público:** Todo el mundo puede listar los archivos del bucket y descargarlos.
2. **Objetos Públicos:** El bucket es privado, pero objetos individuales pueden tener permisos públicos.
3. **Bucket con ACL Pública:** El bucket permite escritura pública (cualquiera puede subir archivos, usado para ataques de ransomware).
4. **Bucket Privado:** Solo usuarios autenticados con permisos pueden acceder.

### Como Proteger un Bucket (AWS S3)

AWS proporciona varias capas de protección:

1. **Bucket Policies:** Políticas IAM a nivel de bucket. Definen explícitamente quien puede acceder y que acciones puede realizar.

2. **Block Public Access:** Un configuración a nivel de cuenta que bloquea TODOS los accesos públicos, independientemente de las políticas del bucket.

3. **ACLs (Access Control Lists):)** Listas de control de acceso a nivel de objeto (más granular pero menos recomendado).

4. **Encriptación:** Cifrar los objetos en reposo usando AES-256 (SSE-S3, SSE-KMS, SSE-C).

5. **Versioning:** Mantener versiones anteriores de los objetos (protege contra borrado accidental o ransomware).

6. **Bucket Logging:** Registrar todas las solicitudes de acceso al bucket.

### Storage en Azure y GCP

AWS S3 -> Azure Blob Storage -> GCP Cloud Storage

AWS S3 Block Public Access -> Azure "Allow Blob Public Access" (deshabilitado) -> GCP "Public access prevention"

AWS Bucket Policy -> Azure RBAC + SAS Tokens -> GCP IAM + ACLs

El error es el mismo en los tres: dejar el almacenamiento abierto al público.

## IAM: El Llavero

Ya aprendiste que no puedes dejar la bodega pública. Tienes que ponerle candado. Como decides quien si puede abrir el candado? A través de IAM (Gestión de Identidades y Accesos).

IAM es el corazón, el cerebro y el alma de la seguridad en la Nube.

### Componentes de IAM

Cuando no entiendes estos componentes? Le regalas el edificio entero al atacante.

1. **Usuarios:** Representan a personas físicas o aplicaciones. Cada usuario tiene credenciales (contraseña, Access Key, certificado).

2. **Grupos:** Colecciones de usuarios. Los permisos se asignan a los grupos, no a los usuarios individualmente.

3. **Roles:** Identidades que pueden ser asumidas por usuarios, servicios o aplicaciones. No tienen credenciales permanentes; reciben credenciales temporales.

4. **Políticas:** Documentos JSON que definen permisos. Se adjuntan a usuarios, grupos o roles.

### Estructura de una Política IAM

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::mi-bucket/*"
    }
  ]
}
```

Componentes:

- **Effect:** Allow o Deny (Permitir o Denegar).
- **Action:** El servicio y la acción (s3:GetObject, ec2:StartInstances, iam:CreateUser).
- **Resource:** El ARN (Amazon Resource Name) del recurso específico.
- **Condition (opcional):** Condiciones adicionales (IP de origen, MFA requerido, horario).

### El Principio del Menor Privilegio

Nunca le des a un usuario más permisos de los que necesita para hacer su trabajo.

Si Juan solo necesita leer archivos de un bucket específico, su política debe ser:

```json
{
  "Effect": "Allow",
  "Action": "s3:GetObject",
  "Resource": "arn:aws:s3:::bucket-de-juan/*"
}
```

No:

```json
{
  "Effect": "Allow",
  "Action": "s3:*",
  "Resource": "*"
}
```

### El Vector de Ataque

Si un atacante logra robar el usuario y la contraseña (o la API Key) de Juan, el atacante no adquiere "poderes mágicos" para destruir Amazon. El atacante solo hereda la llave de Juan.

Si la llave de Juan dice "Solo Leer", el atacante no podrá borrar la base de datos, aunque lo intente mil veces.

La regla de oro del Blue Team: el Principio del Menor Privilegio.

### Buenas Prácticas de IAM

1. **No usar la cuenta Root:** La cuenta root (dueño absoluto) solo debe usarse para configuraciones iniciales. Para el día a día, crear usuarios IAM con roles específicos.

2. **Usar Grupos:** No asignes políticas a usuarios individuales. Asigna a grupos y luego agrega usuarios a los grupos.

3. **Rotar Keys:** Las API Keys deben rotarse cada 90 días como máximo.

4. **Eliminar Keys no Usadas:** Auditorías regulares para identificar y eliminar keys que no se usan.

5. **Usar Roles en lugar de Keys para aplicaciones:** Las aplicaciones en EC2 deben usar Roles de Instancia (credenciales temporales) en lugar de Access Keys estaticas.

6. **Habilitar MFA:** Para todos los usuarios con permisos administrativos.

7. **Implementar Password Policy:** Longitud mínima, rotación, complejidad.

## Logs (CloudTrail): La Cámara de Seguridad Incorruptible

Si el atacante robo la llave de Juan, y a las 3:00 AM abrió la bodega S3 y robo 500 radiografías, Como se entera el equipo de seguridad (Blue Team)?

A través de los Logs de la Nube. En AWS, este servicio se llama CloudTrail. En Azure es Azure Monitor / Activity Log. En GCP es Cloud Logging.

### Que Registra CloudTrail

CloudTrail registra todas las llamadas a la API de AWS, incluyendo:

- Inicio de sesión en la consola.
- Creación o eliminación de instancias EC2.
- Modificación de Security Groups.
- Lectura o escritura en buckets S3.
- Creación o eliminación de usuarios IAM.
- Cambios en políticas IAM.

Cada evento contiene:

- **Event ID:** Identificador único del evento.
- **Event Time:** Fecha y hora exacta (UTC).
- **User Identity:** Quien ejecutó la acción (usuario, rol, servicio).
- **Source IP Address:** IP desde donde se ejecutó la acción.
- **Event Source:** Que servicio genero el evento (ec2.amazonaws.com, s3.amazonaws.com).
- **Event Name:** La acción ejecutada (RunInstances, PutObject, DeleteBucket).
- **Request Parameters:** Los parámetros de la solicitud (que instancia, que bucket).
- **Response Elements:** El resultado de la acción.

### La Magia de la Nube (La Ventaja Defensiva)

En un servidor físico (On-Premise) con Linux, si un hacker se vuelve Administrador (Root), puede entrar a la carpeta de Logs (`/var/log`) y borrar el archivo de texto para limpiar sus huellas.

En AWS, el hacker NO PUEDE borrar el registro de CloudTrail. CloudTrail esta protegido directamente por Amazon a un nivel tan profundo que incluso si el hacker roba la cuenta del CEO de tu empresa, la cámara ya grabó y envio el video a una bóveda blindada antes de que el hacker tenga tiempo de darse cuenta.

Esto es posible porque:

1. CloudTrail almacena los logs en un bucket S3 separado (configurado por el cliente).
2. El bucket de CloudTrail debe tener políticas que impidan la eliminación de logs.
3. Los logs se pueden enviar a CloudWatch Logs para retention a largo plazo.
4. Los logs se pueden enviar a un SIEM externo en tiempo real.

### Tipos de Trails (CloudTrail)

1. **Trail de Lectura/Escritura:** Registra todas las acciones de lectura y escritura. Genera muchos logs pero es más completo.

2. **Trail de Solo Lectura:** Registra solo las acciones de lectura (Get, List, Describe). Utiles para auditoría.

3. **Trail de Solo Escritura:** Registra solo las acciones de escritura (Create, Delete, Update, Put). Es el mínimo recomendado para seguridad.

4. **Trail por Region vs Global:** Los trails pueden cubrir todas las regiones o solo una.

### Eventos de Seguridad Críticos en CloudTrail

Estos eventos deben generar alertas inmediatas en el SIEM:

| Evento | Significado |
|--------|-------------|
| ConsoleLogin sin MFA | Inicio de sesión sin MFA |
| CreateUser | Creación de un nuevo usuario |
| CreateAccessKey | Creación de una nueva API Key |
| DeleteTrail | Intento de desactivar la auditoría |
| UpdateTrail | Modificación de la configuración de auditoría |
| PutBucketPolicy con Efecto Allow y Principal * | Hacer un bucket público |
| AuthorizeSecurityGroupIngress | Abrir un puerto en el firewall |
| RunInstances con InstanceType grande | Creación de recursos costosos |

### CloudTrail en Azure y GCP

AWS CloudTrail -> Azure Activity Log -> GCP Cloud Audit Logs

AWS CloudTrail Insights -> Azure Monitor -> GCP Cloud Logging Operations

La funcionalidad es la misma: registrar cada acción en la nube para permitir la auditoría y detección de anomalías.

### Limitaciones de los Logs de Nube

1. **Costos:** La ingestión, el almacenamiento, el análisis y la retención se facturan según el servicio, la región y el volumen. Consulta siempre las páginas oficiales de precios y calcula el costo con tu patrón real de uso.

2. **Volumen:** Una cuenta activa puede generar millones de eventos por día. Se necesita un SIEM o herramienta de análisis.

3. **Latencia:** Los logs pueden tardar hasta 15 minutos en estar disponibles (tiempo de propagación).

4. **Vacio de Cobertura:** CloudTrail no registra eventos de red (solo de API). Para logs de red se necesita VPC Flow Logs.

## Casos Reales

### Capital One (2019)

La atacante (Paige Thompson) exploto una vulnerabilidad en el WAF de Capital One para obtener credenciales temporales de una instancia EC2. Con esas credenciales, accedio a los buckets S3 de Capital One.

CloudTrail registro cada acción que realizo la atacante. El análisis forense posterior permitió reconstruir todo el ataque.

La lección: CloudTrail fue vital para la investigación, pero no evito el ataque. Los logs son reactivos, no preventivos.

### La Configuración Errónea de S3 de Accenture (2017)

Cuatro buckets S3 de Accenture estaban abiertos al público. CloudTrail no tenía configurada ninguna alerta para detectar accesos públicos.

UpGuard (la empresa que descubrió la brecha) pudo acceder a los buckets sin autenticación. Accenture no tenía monitoreo de acceso a sus buckets.

La lección: los logs no sirven si no se configuran alertas sobre ellos.

## Modos de Falla

### Falla 1: Buckets Sin Bloqueo de Acceso Público

Muchas empresas no activan el "Block Public Access" de S3. Una sola política mal escrita puede exponer todo.

### Falla 2: IAM con Permisos Excesivos

Asignar políticas con `Action: "*"` y `Resource: "*"` a cualquier usuario. Es cómodo pero peligroso.

### Falla 3: CloudTrail Desactivado o Parcial

Muchas empresas solo activan CloudTrail en regiones principales, olvidando regiones secundarias donde también tienen recursos.

### Falla 4: Logs Sin Alertas

Tener CloudTrail activo pero sin ningún sistema de alertas es como tener cámaras de seguridad sin nadie mirando los monitores.

### Falla 5: No Proteger el Bucket de CloudTrail

Si el bucket donde se almacenan los logs de CloudTrail es público, el atacante puede borrar sus huellas.

## La Mirada del Hacker

Como atacante, mi primer objetivo es identificar:

1. Buckets públicos (datos accesibles sin autenticación).
2. Políticas IAM mal configuradas (escalada de privilegios).
3. CloudTrail desactivado (puedo operar sin ser detectado).

### Como Detecto Buckets Públicos

Uso herramientas como:

- `aws s3 ls s3://nombre-del-bucket --no-sign-request` (listar sin credenciales).
- Escaneo de nombres comunes (backups, data, logs, prod).

Si el bucket permite `s3:ListBucket`, puedo listar todos los objetos. Si permite `s3:GetObject`, puedo descargarlos.

### Como Evado CloudTrail

Si el atacante tiene acceso a la cuenta:

1. Puede detener CloudTrail (requiere permisos `cloudtrail:StopLogging`).
2. Puede eliminar el trail (requiere `cloudtrail:DeleteTrail`).
3. Puede modificar el trail para que no registre acciones (requiere `cloudtrail:UpdateTrail`).

Por eso es crucial que los permisos de CloudTrail estén restringidos a unos pocos administradores de seguridad.

### Como Encuentro Credenciales en Buckets

Cuando encuentro un bucket público, no solo busco datos. También busco:

- Archivos `.env` o `.config` con credenciales.
- Archivos de Terraform con API Keys hardcodeadas.
- Scripts con contraseñas en texto plano.

Estas credenciales me permiten pivotar a otros servicios.

## VPC Flow Logs: La Cámara de la Red

Además de CloudTrail (logs de API), AWS ofrece VPC Flow Logs para monitorear el tráfico de red.

### Que Registran los Flow Logs

- IP de origen y destino.
- Puerto de origen y destino.
- Protocolo (TCP, UDP, ICMP).
- Acción (ACCEPT o REJECT).
- Bytes y paquetes transferidos.
- Interfaz de red (ENI).

### Usos en Seguridad

- Detectar escaneo de puertos (muchas conexiones REJECT desde una misma IP).
- Detectar exfiltración de datos (tráfico saliente a IPs inusuales).
- Verificar reglas de Security Groups y NACLs.
- Investigar incidentes (a que IP se conecto una instancia comprometida?).

### Limitaciones

- No registra contenido de paquetes (solo metadata).
- No registra tráfico dentro de la misma instancia (localhost).
- Puede generar costos elevados si se habilita para todo el tráfico.

## GuardDuty: El Analista Automático de AWS

Amazon GuardDuty es un servicio de detección de amenazas que analiza los logs de AWS (CloudTrail, VPC Flow Logs, DNS) usando machine learning.

### Tipos de Hallazgos de GuardDuty

**Hallazgos de Reconocimiento:**

- `UnauthorizedAccess:EC2/SSHBruteForce`: Fuerza bruta SSH desde una IP externa.
- `Recon:EC2/Portscan`: Escaneo de puertos desde una instancia EC2.

**Hallazgos de Compromiso de Instancia:**

- `Behavior:EC2/NetworkPortUnusual`: Instancia conectandose a puertos inusuales.
- `CryptoCurrency:EC2/BitcoinTool.B`: Instancia minando criptomonedas.
- `Backdoor:EC2/C&CActivity.B`: Instancia comunicandose con un servidor C2.

**Hallazgos de Compromiso de Cuenta:**

- `Persistence:IAMUser/UserPermissions`: Modificación de políticas IAM.
- `Stealth:IAMUser/CloudTrailLoggingDisabled`: Desactivacion de CloudTrail.
- `UnauthorizedAccess:IAMUser/ConsoleLoginSuccess`: Inicio de sesión desde ubicación inusual.

### Automatización con GuardDuty + Lambda

GuardDuty puede integrarse con Lambda para responder automáticamente:

1. GuardDuty detecta un hallazgo crítico.
2. Lambda se ejecuta automáticamente.
3. Lambda modifica el Security Group de la instancia comprometida para aislarla.
4. Lambda envía una notificación al SOC.

## Infrastructure as Code (IaC) Security

La infraestructura en la nube se define mediante código (Terraform, CloudFormation, ARM). La seguridad debe integrarse en este código.

### Escaneo de IaC

Herramientas como Checkov, tfsec, y cfn-nag escanean los archivos de IaC en busca de configuraciones inseguras:

```hcl
# MAL: bucket S3 publico
resource "aws_s3_bucket" "data" {
  bucket = "mi-bucket"
  acl    = "public-read"  # CHECKOV: CKV_AWS_20
}

# BIEN: bucket S3 privado con bloqueo de acceso publico
resource "aws_s3_bucket" "data" {
  bucket = "mi-bucket"
  acl    = "private"
}

resource "aws_s3_bucket_public_access_block" "block" {
  bucket = aws_s3_bucket.data.id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}
```

### Ejemplos de Reglas de Seguridad en IaC

- `CKV_AWS_20`: Bucket S3 no debe ser público.
- `CKV_AWS_23`: Security Group no debe permitir tráfico entrante desde 0.0.0.0/0 en puerto 22.
- `CKV_AWS_24`: Security Group no debe permitir tráfico entrante desde 0.0.0.0/0 en puerto 3389.
- `CKV_AWS_79`: Instancia debe tener encriptado el volumen root.
- `CKV_AWS_116`: Lambda function debe tener políticas de recursos limitadas.

## Azure Policy y AWS Config

Tanto AWS como Azure ofrecen servicios de evaluación continua de configuraciones.

### AWS Config

AWS Config evalua los recursos de AWS contra reglas predefinidas o personalizadas:

- `s3-bucket-public-read-prohibited`: Detecta buckets con lectura pública.
- `ec2-volume-inuse-check`: Detecta discos EBS no utilizados.
- `restricted-ssh`: Security Group no debe tener SSH abierto al mundo.

### Azure Policy

Azure Policy define reglas que se aplican automáticamente a los recursos:

```json
{
  "policyRule": {
    "if": {
      "field": "type",
      "equals": "Microsoft.Compute/virtualMachines"
    },
    "then": {
      "effect": "deny",
      "details": {
        "field": "Microsoft.Compute/virtualMachines/storageProfile.osDisk.managedDisk.diskEncryptionSet.id",
        "exists": "false"
      }
    }
  }
}
```

Esta política deniega la creación de VMs sin discos encriptados.

## Costos de Seguridad en la Nube

Implementar seguridad en la nube tiene costos que deben presupuestarse:

| Servicio | Unidad que conviene estimar |
|----------|-----------------------------|
| CloudTrail | Eventos, copias de trails y consultas |
| CloudWatch Logs | Ingestión, almacenamiento, consultas y exportación |
| GuardDuty | Fuentes de datos y volumen analizado |
| AWS Config | Elementos de configuración y evaluaciones |
| S3 Inventory | Objetos listados, frecuencia y formato de salida |

El presupuesto debe cubrir ingestión, retención, consultas y transferencia. Las tarifas cambian por región y con el tiempo; valida el cálculo en las páginas oficiales antes de decidir qué habilitar.

## Autoevaluación

Responde estas preguntas para verificar si comprendes los conceptos:

1. Estas auditando la cuenta de AWS de una empresa. Descubres un Bucket S3 llamado "respaldos-financieros-2023" que tiene configurada la política pública de acceso de lectura (Public Read). Sin usar ninguna herramienta ofensiva como Kali Linux o Nmap, Como podrías demostrarle al cliente que este es un fallo de seguridad crítico en menos de 10 segundos?

2. Si un empleado necesita descargar un reporte mensual desde la Nube, y tu eres el Administrador IAM, Por qué asignarle al empleado el permiso genérico `AmazonS3FullAccess` (que permite leer, escribir y borrar) es una violación a las buenas prácticas de ciberseguridad?

3. Un atacante se roba las Credenciales de la cuenta de "Auditoría" y decide apagar 50 servidores de producción. Que servicio nativo de AWS debe revisar el Blue Team para encontrar la IP exacta del atacante y el minuto exacto en que apagó los servidores?

4. El jefe te pide guardar los videos de seguridad de la empresa. Los videos pesan 5 Terabytes. Usarías una máquina virtual (EC2) o un servicio de almacenamiento como S3? Justifica en términos de costo y administración de espacio.

5. Explica la diferencia entre un User (usuario IAM) y un Role (rol IAM). Cuando usarías cada uno?

6. Un administrador de AWS comete un error: asigna a un empleado una política IAM con `Action: "s3:*"` y `Resource: "*"`. Que alcance tiene esta política y por qué es peligrosa?

7. Por qué se dice que CloudTrail es "inmutable" o que los logs no pueden ser borrados por un atacante? Como se logra esta protección?

8. Que es el "Block Public Access" de S3 y por qué debería estar activado en todas las cuentas de AWS?
