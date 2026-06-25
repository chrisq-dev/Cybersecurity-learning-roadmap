---
title: "IAM, Storage y Logs: Las Piezas Clave de la Nube"
---
# IAM, Storage y Logs: Las Piezas Clave de la Nube

## Objetivo del Módulo

Aprender las tres piezas maestras que conforman cualquier infraestructura en la nube.
Si le preguntas a un ingeniero de AWS experto qué necesitas proteger para asegurar una empresa millonaria, te responderá tres cosas: **Quién tiene las llaves (IAM)**, **Dónde están los datos (Storage)** y **Quién te está vigilando (Logs)**.

---

## 1. Storage (S3): La Bodega Gigante

Imagina que tienes una empresa de Hospitales y tienes 5 millones de radiografías en formato `.JPG`. No puedes guardar todo eso en el disco duro de una computadora normal porque se llenaría en dos días.

Para esto existe el Almacenamiento en la Nube (AWS S3, Azure Blob, GCP Cloud Storage).

* **La Analogía:** Es una inmensa Bodega industrial en medio del desierto, con pasillos infinitos de cajas.
* No hay sistema operativo, no hay Linux, no hay Windows. Simplemente subes el archivo y Amazon te da una URL (Ej. `https://s3.amazonaws.com/mi-hospital/radio1.jpg`).

### El Famoso "S3 Bucket Abierto" (El Error #1)

¿Qué pasa si un programador novato (o perezoso) construye la bodega del hospital, pero se le olvida ponerle candado a la puerta principal?
La bodega se vuelve **Pública en Internet**.

Un Hacker no tiene que hackear ninguna contraseña. Simplemente entra a su navegador web, escribe la URL pública de la bodega, y comienza a descargar el millón de radiografías privadas frente a los ojos de Amazon.

> **El Impacto Real:** Capital One, Verizon, Accenture y cientos de empresas globales han sufrido robos masivos de datos no porque un "hacker ruso" usara matemáticas avanzadas, sino porque un programador olvidó configurar el Bucket S3 como `Privado`.

---

## 2. IAM (Identity and Access Management): El Llavero

Ya aprendimos que no puedes dejar la bodega pública. Tienes que ponerle candado.
¿Cómo decides quién sí puede abrir el candado? A través de **IAM (Gestión de Identidades y Accesos)**.

IAM es el corazón, el cerebro y el alma de la seguridad en la Nube.

* **La Analogía:** Es el Conserje del edificio que reparte las llaves (Políticas / Policies).

Una "Llave" en IAM no es una llave física, es un archivo de texto en formato **JSON**.
Si el Conserje te da una llave, el archivo JSON dirá exactamente qué puedes hacer:
`"Al Usuario Juan, se le permite LEER la Bodega S3, pero se le PROHÍBE BORRAR archivos"`.

**El Vector de Ataque:**
Si un atacante logra robar el usuario y la contraseña (o la API Key) de Juan, el atacante no adquiere "poderes mágicos" para destruir Amazon. El atacante **solo hereda la llave de Juan**.
Si la llave de Juan dice "Solo Leer", el atacante no podrá borrar la base de datos, aunque lo intente mil veces.

*(La regla de oro del Blue Team: **El Principio del Menor Privilegio**. Jamás le des a Juan una llave de "Administrador" si su trabajo solo requiere leer radiografías).*

---

## 3. Logs (CloudTrail): La Cámara de Seguridad Incorruptible

Si el atacante robó la llave de Juan, y a las 3:00 AM abrió la bodega S3 y robó 500 radiografías, ¿Cómo se entera el equipo de seguridad (Blue Team)?

A través de los Logs de la Nube. En AWS, este servicio se llama **CloudTrail**.

* **La Analogía:** Es la cámara de seguridad indestructible que graba absolutamente cada orden que se ejecuta en el edificio.
* Si alguien enciende un servidor, CloudTrail lo anota.
* Si alguien borra un archivo, CloudTrail lo anota.

### La Magia de la Nube (La Ventaja Defensiva)

En un servidor físico (On-Premise) con Linux, si un hacker se vuelve Administrador (Root), puede entrar a la carpeta de Logs (`/var/log`) y borrar el archivo de texto para limpiar sus huellas.

En AWS, **el hacker NO PUEDE borrar el registro de CloudTrail**.
CloudTrail está protegido directamente por Amazon a un nivel tan profundo que incluso si el hacker roba la cuenta del CEO de tu empresa, la cámara ya grabó y envió el video a una bóveda blindada antes de que el hacker tenga tiempo de darse cuenta.

---

## 4. Criterio de Dominio (Autoevaluación)

Revisa si ya entiendes la triada de la Nube:

1. Estás auditando la cuenta de AWS de una empresa. Descubres un Bucket S3 llamado "respaldos-financieros-2023" que tiene configurada la política pública de acceso de lectura (Public Read). Sin usar ninguna herramienta ofensiva como Kali Linux o Nmap, ¿Cómo podrías demostrarle al cliente que este es un fallo de seguridad crítico en menos de 10 segundos?
2. Si un empleado necesita descargar un reporte mensual desde la Nube, y tú eres el Administrador IAM, ¿Por qué asignarle al empleado el permiso genérico `AmazonS3FullAccess` (que permite leer, escribir y borrar) es una violación a las buenas prácticas de ciberseguridad?
3. Un atacante se roba las Credenciales de la cuenta de "Auditoría" y decide apagar 50 servidores de producción. ¿Qué servicio nativo de AWS debe revisar el Blue Team para encontrar la IP exacta del atacante y el minuto exacto en que apagó los servidores?
4. El jefe te pide guardar los videos de seguridad de la empresa. Los videos pesan 5 Terabytes. ¿Usarías una máquina virtual (EC2) o un servicio de almacenamiento como S3? Justifica en términos de costo y administración de espacio.
