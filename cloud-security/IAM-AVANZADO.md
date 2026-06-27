---
title: "IAM Avanzado: Escalada de Privilegios y Máscaras"
---

# IAM Avanzado: Escalada de Privilegios y Máscaras

## Objetivo de esta Guía

Entender por que el hacking en la nube es un juego de ajedrez donde el atacante roba una llave de nivel muy bajo y hace malabares con el sistema de políticas para convertirse en Dios (Administrador).

En el mundo On-Premise, un atacante usaba ataques de fuerza bruta o de corruption de memoria para volverse Administrador (root o SYSTEM). En la nube, las computadoras son tan efímeras que al atacante no le importan. El atacante ataca directamente a las Políticas JSON de Amazon o Google. A esto se le llama Escalada de Privilegios en la Nube.

## La Analogía

Imagina un edificio corporativo con un sistema de tarjetas de acceso electrónico. Cada empleado tiene una tarjeta que abre ciertas puertas. Juan, el becario, solo puede abrir la puerta de la cafetería y la sala de descanso.

Pero Juan descubre una vulnerabilidad en el sistema: su tarjeta tiene un chip oculto que le permite "clonar" temporalmente la tarjeta de cualquier empleado que haya pasado por la puerta principal en las últimas 24 horas.

Juan espera a que pase el CEO, clona su tarjeta, y ahora tiene acceso a la bóveda del banco en el sótano.

En la nube, la tarjeta de Juan es su API Key. La vulnerabilidad que le permite clonar tarjetas es una política IAM mal configurada que le da permiso de `AssumeRole` o `iam:PassRole`. El CEO es un rol con permisos de Administrador.

## La Anatomía de una Política JSON

Las llaves del Conserje en la nube no son de metal. Son un documento de texto escrito en formato JSON.

### Estructura Básica

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::bodega-hospital/*"
    }
  ]
}
```

- **Versión:** La versión del lenguaje de políticas (2012-10-17 es la actual).
- **Statement:** Un array de declaraciones de permisos.
  - **Effect:** Allow (permitir) o Deny (denegar).
  - **Action:** El servicio y la accion (s3:GetObject, ec2:RunInstances, iam:CreateUser).
  - **Resource:** El ARN del recurso específico.
  - **Condition (opcional):** Condiciones adicionales.

### Elementos Avanzados de una Política

**Action con Múltiples Servicios:**

```json
{
  "Effect": "Allow",
  "Action": [
    "s3:GetObject",
    "s3:PutObject",
    "s3:ListBucket"
  ],
  "Resource": "*"
}
```

**Notacion ARN (Amazon Resource Name):**

```
arn:partition:service:region:account-id:resource
arn:aws:s3:::mi-bucket/*
arn:aws:ec2:us-east-1:123456789012:instance/*
```

**Conditions (Condiciones):**

```json
{
  "Effect": "Deny",
  "Action": "*",
  "Resource": "*",
  "Condition": {
    "IpAddress": {
      "aws:SourceIp": "0.0.0.0/0"
    }
  }
}
```

## El Atajo Letal: El Asterisco

El mayor amigo del hacker en la nube se llama Asterisco (`*`), que en informática significa "Todo" o "Comodín".

Si el Administrador de Sistemas de tu empresa tiene mucha prisa el viernes en la tarde, y le da pereza escribir exactamente que bodegas puede tocar el empleado, escribirá esto:

```json
{
  "Effect": "Allow",
  "Action": "s3:*",
  "Resource": "*"
}
```

- `Action: s3:*` -> Puedes hacer CUALQUIER COSA en el mundo del almacenamiento (Leer, Borrar, Modificar, Eliminar bodegas enteras).
- `Resource: *` -> Sobre CUALQUIER BODEGA del mundo que exista en esta empresa.

A esto se le llama Over-permissive Policies (Políticas con exceso de permisos). Si el hacker roba esta llave, acaba de obtener el poder de borrar las bases de datos de toda la compañía con un solo enter.

### Combinaciones Peligrosas de Acciones

Algunas combinaciones de acciones son particularmente peligrosas:

| Accion | Servicio | Riesgo |
|--------|----------|--------|
| iam:CreateUser + iam:CreateAccessKey | IAM | Crear usuarios con acceso a la cuenta |
| iam:PassRole + ec2:RunInstances | IAM + EC2 | Lanzar instancias con roles privilegiados |
| iam:CreatePolicy + iam:AttachPolicy | IAM | Crear y asignar políticas de administrador |
| lambda:CreateFunction + lambda:InvokeFunction | Lambda | Ejecutar codigo con permisos del rol Lambda |
| s3:PutBucketPolicy | S3 | Hacer un bucket público |

Cada una de estas combinaciones permite a un atacante elevar sus privilegios.

## Asumir Roles (Ponerse la Máscara)

Pero los hackers reales apuntan aún más alto. Apuntan a la característica más avanzada de IAM: El AssumeRole (Asumir un Rol).

### La Máscara de Látex

Es el equivalente corporativo a ponerse una máscara de látex de otra persona.

Imagina que la cuenta de un becario (Junior) tiene una política muy aburrida que solo le permite leer manuales. PERO, el becario tiene una línea mágica en su JSON que dice: `sts:AssumeRole`.

Esa línea significa: "Tu eres un becario débil, pero tienes permiso de caminar al armario, agarrar el uniforme del CEO, ponértelo, y durante 1 hora el sistema pensará que eres el CEO".

### El Flujo del Ataque AssumeRole

1. El hacker envía un correo de Phishing al becario y le roba su llave (API Key).
2. El hacker revisa la llave y nota que el becario no puede borrar servidores, pero si tiene el poder `AssumeRole`.
3. El hacker le manda un comando a AWS: "Hola, soy el becario. Quiero usar mi poder de Asumir Rol para ponerme el uniforme del Administrador de Bases de Datos".
4. AWS verifica que el becario si tiene ese poder en su JSON, y le entrega un uniforme temporal (Temporary Security Credentials).
5. El hacker, usando el nuevo uniforme, borra todos los servidores de la empresa.

Para el Blue Team, cuando revisen las cámaras (CloudTrail), verán que "El Administrador de Bases de Datos" borró los servidores. Tardarán horas en rastrear que en realidad era el becario usando una máscara.

### Comando Real de AssumeRole

```bash
aws sts assume-role \
  --role-arn "arn:aws:iam::123456789012:role/AdminRole" \
  --role-session-name "hacker-session"
```

Este comando devuelve credenciales temporales (AccessKeyId, SecretAccessKey, SessionToken) que el atacante puede usar para ejecutar comandos como si fuera el rol AdminRole.

### Condiciones de AssumeRole

Para protegerse contra este ataque, se pueden agregar condiciones al AssumeRole:

```json
{
  "Effect": "Allow",
  "Action": "sts:AssumeRole",
  "Resource": "arn:aws:iam::123456789012:role/AdminRole",
  "Condition": {
    "Bool": {
      "aws:MultiFactorAuthPresent": "true"
    }
  }
}
```

Esta política exige MFA para poder asumir el rol. Incluso si el atacante roba la API Key, no puede asumir el rol sin el segundo factor de autenticación.

## PassRole: El Caballo de Troya

Otra técnica de escalada de privilegios es `iam:PassRole`. Esta accion permite a un usuario pasar un rol IAM a un servicio de AWS (como EC2 o Lambda).

### Como Funciona el Ataque PassRole

1. El atacante tiene una cuenta con permisos limitados pero que incluye `iam:PassRole`.
2. El atacante también puede lanzar instancias EC2 (`ec2:RunInstances`).
3. El atacante encuentra un rol existente con permisos de administrador (ej. `AdminRole`).
4. El atacante lanza una nueva instancia EC2 y le asigna el rol `AdminRole`.
5. El atacante se conecta a la instancia (via SSH).
6. Dentro de la instancia, el atacante accede al endpoint de metadatos de AWS y obtiene las credenciales temporales del rol `AdminRole`.
7. El atacante ahora tiene permisos de administrador.

### Protección contra PassRole

```json
{
  "Effect": "Allow",
  "Action": "iam:PassRole",
  "Resource": "arn:aws:iam::123456789012:role/AuditRole",
  "Condition": {
    "StringEquals": {
      "iam:PassedToService": "ec2.amazonaws.com"
    }
  }
}
```

Esta política solo permite pasar el rol `AuditRole` al servicio EC2. No permite pasar roles administrativos.

## Service Control Policies (SCP)

En organizaciones grandes con múltiples cuentas de AWS (AWS Organizations), las SCP permiten establecer límites de permisos a nivel de organización.

### Como Funcionan las SCP

1. Un administrador central define una SCP que se aplica a todas las cuentas de la organización.
2. La SCP define el máximo de permisos que una cuenta puede tener.
3. Ninguna cuenta, ni siquiera el administrador de la cuenta, puede exceder los límites de la SCP.

Ejemplo de SCP que bloquea el acceso a servicios costosos:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Deny",
      "Action": [
        "ec2:RunInstances"
      ],
      "Resource": "*",
      "Condition": {
        "StringEquals": {
          "ec2:InstanceType": [
            "p3dn.24xlarge",
            "p4d.24xlarge"
          ]
        }
      }
    }
  ]
}
```

Esta SCP bloquea la creación de instancias GPU costosas en todas las cuentas de la organización.

### SCP vs IAM Policies

| Característica | SCP | IAM Policy |
|----------------|-----|------------|
| Nivel | Organización/Cuenta | Usuario/Rol |
| Alcance | Máximo permisible | Permiso efectivo |
| Puede otorgar permisos? | No (solo denegar o limitar) | Si |
| Aplica a cuenta root? | Si | No |

## Azure RBAC y Azure Policy

En Azure, el equivalente de IAM es RBAC (Role-Based Access Control). Los conceptos son similares pero la terminología cambia.

### Roles de Azure

- **Owner:** Acceso completo a todos los recursos (equivalente a Administrador).
- **Contributor:** Puede crear y gestionar recursos pero no puede asignar permisos.
- **Reader:** Solo lectura.
- **User Access Administrator:** Puede gestionar el acceso de usuarios.

### Azure Policy vs IAM

Azure Policy no es un sistema de permisos (eso es RBAC). Azure Policy es un sistema de gobierno que asegura que los recursos cumplan con reglas específicas.

Ejemplos de Azure Policy:

- "Solo permitir VMs en regiones aprobadas".
- "Exigir encriptación en discos de VM".
- "Bloquear la creación de recursos sin etiquetas de costo".

Las Azure Policy se aplican automáticamente y pueden:

- Denegar la creación de recursos que no cumplan.
- Auditar recursos existentes.
- Modificar recursos automáticamente (DeployIfNotExists).

## GCP IAM y Roles Personalizados

En GCP, IAM funciona con roles que se asignan a miembros (usuarios, grupos, service accounts).

### Tipos de Roles en GCP

1. **Roles Predefinidos:** Creados por Google (roles/viewer, roles/editor, roles/owner).
2. **Roles Básicos:** Roles amplios (viewer, editor, owner) que no deben usarse en producción.
3. **Roles Personalizados:** Roles definidos por el cliente con permisos específicos.

### Service Accounts en GCP

Las service accounts son identidades no humanas (para aplicaciones). Ejemplo:

```json
{
  "type": "service_account",
  "project_id": "mi-proyecto",
  "private_key_id": "abc123",
  "private_key": "-----BEGIN PRIVATE KEY-----\n...",
  "client_email": "app@mi-proyecto.iam.gserviceaccount.com",
  "client_id": "123456789",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth"
}
```

Si un atacante roba este archivo JSON, puede autenticarse como la service account y acceder a los recursos del proyecto.

## Casos Reales

### El Ataque a Coinbase con AssumeRole (2021)

Un atacante comprometio una cuenta IAM con permisos limitados en Coinbase. La cuenta tenía `iam:PassRole` combinado con `ec2:RunInstances`. El atacante lanzo una instancia EC2 con un rol de administrador y obtuvo acceso total a la cuenta de AWS.

Coinbase detecto el ataque gracias a CloudTrail, que registro la creación inusual de una instancia EC2 con un rol administrativo.

### Capital One y el SSRF (2019)

La atacante de Capital One exploto una vulnerabilidad de SSRF (Server Side Request Forgery) en el WAF. El SSRF le permitió acceder al endpoint de metadatos de la instancia EC2 y obtener las credenciales temporales de un rol IAM.

El rol IAM tenía permisos excesivos: permitia leer y escribir en todos los buckets S3 de la cuenta. Con esas credenciales, la atacante pudo exfiltrar 106 millones de registros de clientes.

La leccion: el rol IAM de la instancia EC2 debería haber tenido permisos minimos para solo leer los buckets necesarios.

## Modos de Falla

### Falla 1: Políticas con Asterisco en Accion y Recurso

El error más común y peligroso: `Action: "*"` y `Resource: "*"`. Esto da acceso total a cualquier recurso.

### Falla 2: AssumeRole sin MFA

Permitir asumir roles sin exigir autenticación MFA. Un atacante que robe una API Key puede asumir cualquier rol.

### Falla 3: iam:PassRole sin Restricciones

Permitir pasar cualquier rol a cualquier servicio. El atacante puede lanzar recursos con roles privilegiados.

### Falla 4: Roles de Instancia con Permisos Excesivos

Asignar roles demasiado permisivos a instancias EC2 o Lambdas. Si la instancia es comprometida, el atacante hereda los permisos del rol.

### Falla 5: No Usar SCP en Organizaciones Multi-Cuenta

Sin SCP, cada cuenta puede otorgarse permisos de administrador a si misma. Un atacante que comprometa una sola cuenta puede escalar a toda la organización.

## La Mirada del Hacker

Como atacante, mi objetivo es encontrar una política IAM mal configurada que me permita escalar privilegios.

### Técnicas de Escalada de Privilegios

**Técnica 1: Crear un Usuario Administrador**

Si encuentro una política que permite `iam:CreateUser` y `iam:CreateAccessKey`:

```bash
aws iam create-user --user-name hacker
aws iam create-access-key --user-name hacker
aws iam attach-user-policy --user-name hacker --policy-arn arn:aws:iam::aws:policy/AdministratorAccess
```

Ahora tengo un usuario con acceso completo.

**Técnica 2: Modificar una Política**

Si encuentro una política que permite `iam:CreatePolicyVersion`:

```bash
aws iam create-policy-version \
  --policy-arn arn:aws:iam::123456789012:policy/MiPolitica \
  --policy-document '{"Version":"2012-10-17","Statement":[{"Effect":"Allow","Action":"*","Resource":"*"}]}' \
  --set-as-default
```

Ahora la política existente da acceso completo.

**Técnica 3: Usar un Rol de Servicio**

Si encuentro un rol de servicio (ej. para Lambda) con permisos de administrador, y tengo `iam:PassRole`:

```bash
aws lambda create-function \
  --function-name hacker-function \
  --runtime python3.8 \
  --role arn:aws:iam::123456789012:role/AdminRole \
  --handler index.handler \
  --zip-file fileb://function.zip
```

La funcion Lambda se ejecuta con permisos de administrador.

### Herramientas de Auditoría IAM

Los atacantes también usan herramientas para auditar políticas IAM:

- **Pacu:** Framework de ataque para AWS que incluye modulos de escalada de IAM.
- **ScoutSuite:** Herramienta de auditoría multi-nube.
- **CloudSploit:** Escaneo de configuración de seguridad en la nube.

### Que Busca un Atacante en IAM

1. `iam:*` (acceso completo a IAM).
2. `sts:AssumeRole` sin restricciones.
3. `iam:PassRole` sin restricciones.
4. `iam:CreatePolicyVersion` en políticas existentes.
5. `iam:CreateAccessKey` en usuarios existentes.
6. Roles de servicio con permisos amplios.

## Autoevaluación

Responde estas preguntas para verificar si comprendes los conceptos:

1. Estas auditando una cuenta de AWS y ves una política con la accion `iam:CreateUser` combinada con el recurso `*`. Por que esto es una catástrofe? (Pista: Piensa en lo que podría hacer el hacker si tiene el poder de crear nuevos usuarios invisibles).

2. En términos de permisos, Que significa el uso del símbolo comodín `*` en un archivo JSON de IAM, y por que los auditores de seguridad marcan su uso injustificado como un fallo crítico?

3. Como funciona la técnica de "Asumir un Rol" (AssumeRole) como un vector para que un atacante convierta una cuenta de bajo privilegio en una de alto privilegio?

4. Si tu eres el Arquitecto de Seguridad de la empresa, Por que aplicar la doctrina de "Principio del Menor Privilegio" (Principle of Least Privilege) desde el día uno evita que un ataque de AssumeRole destruya a tu empresa?

5. Que diferencia hay entre `iam:PassRole` y `sts:AssumeRole`? En que escenarios de ataque se usa cada uno?

6. Un atacante obtiene acceso a una service account de GCP. Que puede hacer con el archivo JSON de credenciales y como podría el equipo de seguridad detectar su uso?

7. Explica el ataque de Capital One (2019) desde la perspectiva de IAM: que permisos tenía la instancia EC2 comprometida y como la escalada de privilegios permitió el robo de datos?

8. Como protegen las Service Control Policies (SCP) contra la escalada de privilegios en organizaciones multi-cuenta de AWS?
