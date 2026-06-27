---
title: "Backups: La Máquina del Tiempo"
---

# Backups: La Máquina del Tiempo

## Objetivo de esta Guía

Aprender la diferencia financiera entre perder 5 minutos de datos y perder 24 horas de datos.

En ciberseguridad, puedes comprar todos los Antivirus y Firewalls del mundo. Pero el Riesgo jamás es cero. Cuando el ataque de Ransomware inevitablemente suceda y destruya tu Base de Datos, tu única salvación es tu capacidad de retroceder el tiempo: **Los Respaldos (Backups)**.

Esta guía cubre las estrategias de backup, los tipos de respaldo, las métricas de recuperación, los esquemas de rotación, las herramientas más comunes, y cómo los atacantes destruyen backups para forzar el pago del rescate.

---

## 1. La Filosofía del Respaldo

Hacer una copia de tus archivos en una memoria USB no es un "Backup" corporativo. Cuando haces eso, no pasa nada... hasta que pierdes todo. Un verdadero sistema de continuidad de negocio se rige por la Regla de Oro: **3-2-1**.

* **3 Copias de los datos:** La original y dos respaldos.
* **2 Medios diferentes:** Ej. Un disco duro interno y una cinta magnética externa.
* **1 Copia Off-site (Fuera de sitio):** Una copia guardada físicamente en otra ciudad o en la Nube (AWS).
 * *¿Por qué?* Si el edificio corporativo se quema hasta los cimientos en un incendio, no importa si tenías 500 discos duros de respaldo adentro del mismo edificio; lo perdiste todo.

### Evolución de la Regla 3-2-1

La regla 3-2-1 tradicional se ha actualizado a **3-2-1-1-0** en entornos modernos:

- **3-2-1:** La regla original.
- **+1 Copia Inmutable (Immutable):** Una copia que no puede ser modificada ni eliminada, ni siquiera por el administrador del sistema. Ej: AWS S3 Object Lock, Azure Blob Storage inmutabilidad, cintas WORM (Write Once Read Many).
- **+0 Errores (Zero Errors):** Después de cada backup, se verifica automáticamente la integridad de los datos (checksum). Un backup con errores de lectura no es un backup.

---

## 2. Tipos de Respaldo

### Por Método de Copia

**Backup Completo (Full Backup):**
- Copia todos los datos seleccionados. Es la base de cualquier estrategia.
- Ventaja: Restauración más rápida (un solo archivo).
- Desventaja: Tarda más, ocupa más espacio, consume más ancho de banda.
- Frecuencia típica: Semanal o mensual.

**Backup Incremental:**
- Copia solo los datos que cambiaron desde el último backup (completo o incremental).
- Ventaja: Rápido y pequeño. Ejecutable cada hora.
- Desventaja: Restauración lenta. Necesitas cadena completa: Full + Incremental_1 + Incremental_2 + ... + Incremental_n.
- Riesgo: Si un incremental se corrompe, pierdes todos los incrementales posteriores.

**Backup Diferencial:**
- Copia todos los datos que cambiaron desde el último backup completo.
- Ventaja: Restauración más rápida que incremental (solo necesitas: Full + Último Diferencial).
- Desventaja: Ocupa más espacio que incremental (cada diferencial acumula todos los cambios desde el último full).

**Comparación:**

| Característica | Full | Incremental | Diferencial |
|---------------|------|-------------|-------------|
| Tiempo de backup | Lento | Rápido | Medio |
| Espacio usado | Alto | Bajo | Medio-Alto |
| Tiempo de restore | Rápido | Lento (cadena) | Medio |
| Archivos para restore | 1 | N+1 | 2 |

### Por Tipo de Datos

**Backup de Archivos (File-level):** Copia archivos individuales (documentos, fotos, videos). Simple pero lento para muchos archivos pequeños.

**Backup de Imagen (Image-level / Block-level):** Copia el disco completo incluyendo sistema operativo, aplicaciones y configuraciones. Permite restaurar una máquina entera en minutos. Usado por Veeam, Acronis, AWS AMI.

**Backup de Aplicación (Application-aware):** Entiende la estructura interna de la aplicación. Ej: Backup de SQL Server que garantiza consistencia transaccional (VSS Writer en Windows, `pg_dump` en PostgreSQL). Sin este tipo, restaurar una base de datos puede resultar en datos corruptos.

**Snapshot:** Captura instantánea del estado de un sistema en un momento dado. No es un backup real (depende del disco original). Usado para restauraciones rápidas, pero no protege contra fallo del disco o ransomware.

---

## 3. Esquemas de Rotación

### GFS (Grandfather-Father-Son)

El esquema más común en entornos corporativos:

- **Son (Hijo):** Backups diarios. Retención: 7 días.
- **Father (Padre):** Backups semanales. Retención: 4-5 semanas.
- **Grandfather (Abuelo):** Backups mensuales. Retención: 12 meses.

Ejemplo: Lunes a Viernes backups incrementales (hijo). Viernes backup completo (padre). Último viernes del mes backup completo (abuelo).

**Ventaja:** Balance entre espacio de almacenamiento y capacidad de recuperación. Puedes recuperar un archivo de ayer, de la semana pasada o del año pasado.

### Tower of Hanoi (Torre de Hanoi)

Esquema más complejo basado en la secuencia matemática de la Torre de Hanoi. Cada backup tiene una frecuencia de retención diferente según su nivel en la torre. Proporciona una cobertura temporal excelente con pocas cintas.

### Estrategia de Retención Recomendada

| Tipo | Frecuencia | Retención | Medio |
|------|-----------|-----------|-------|
| Backup transaccional (logs) | Cada 5-15 min | 24 horas | Disco rápido (SSD) |
| Backup incremental | Cada hora | 7 días | Disco/NAS |
| Backup completo diario | Cada 24 h | 30 días | Disco/Cloud |
| Backup completo semanal | Cada semana | 3 meses | Cloud/Cinta |
| Backup completo mensual | Cada mes | 1 año | Cinta/Cloud Glacial |
| Backup completo anual | Cada año | 7 años (legal) | Cinta/Cloud Glacial |

* **Por que esto importa:** La retención no es solo técnica. Es legal. Muchas regulaciones (GDPR, SOX, HIPAA) exigen retención de datos por períodos específicos. Eliminar backups antes del plazo legal puede resultar en multas y sanciones.

---

## 4. Las Matemáticas del Desastre: RPO y RTO

Cuando el CEO te pregunta: *"¿Podemos sobrevivir al ataque de Ransomware?"*, tú no le respondes con términos técnicos, le respondes con estas dos métricas.

### RPO (Recovery Point Objective): El Límite de Pérdida

Básicamente: ¿cuántos datos está dispuesta a perder la empresa matemáticamente?

* **La Máquina del Tiempo:** Imagina que tu empresa hace un respaldo a las 12:00 de la noche todos los días. Hoy a las 11:59 PM, un hacker encripta todo. Tú usas tu "máquina del tiempo" y restauras el respaldo de ayer a la medianoche.

* **La Pérdida:** Acabas de borrar **24 horas completas** del trabajo de todos los empleados y de las transacciones de los clientes. Ese es tu RPO (24 horas).

* Si tu empresa es un banco que procesa millones de transacciones por minuto, un RPO de 24 horas significa la quiebra absoluta. El banco necesita un RPO de *milisegundos* (Replicación en tiempo real).

### RTO (Recovery Time Objective): El Reloj de Arena

¿Cuánto tiempo tarda la empresa en volver a operar desde que ocurre el desastre?

* **La Realidad Operativa:** El ataque ocurrió, los servidores están caídos. Tú tienes un respaldo perfecto intacto. El problema es que el respaldo pesa **50 Terabytes**.

* **El Reloj:** Mover 50 Terabytes de datos desde la nube hasta tus servidores locales va a tomar exactamente **48 horas**. Durante esos 2 días, la página web de tu empresa estará "Caída" y no podrán vender nada. Ese es tu RTO (48 horas).

* Si eres Amazon.com, estar "caído" 48 horas significa perder cientos de millones de dólares. Amazon necesita un RTO casi instantáneo.

### Cálculo Práctico de RPO y RTO

Para calcular RPO y RTO necesitas considerar:

**RPO depende de:**
- Frecuencia de backups: backups cada hora = RPO de 1 hora.
- Tecnología de replicación: Replicación síncrona = RPO de 0 (cero pérdida). Replicación asíncrona = RPO de segundos/minutos.
- Log shipping: Base de datos en modo de recuperación completa con backups de log cada 5 minutos = RPO de 5 minutos.

**RTO depende de:**
- Tamaño de los datos a restaurar: 50 TB en disco local vs 50 TB descargando de cloud.
- Velocidad del medio de restauración: SSD (500 MB/s) vs HDD (150 MB/s) vs red (1 Gbps = 125 MB/s).
- Automatización: Restauración manual (días) vs scripts automatizados (horas) vs infraestructura como código (minutos).
- Dependencias: ¿Hay que reinstalar el SO, las aplicaciones, configurar redes? Cada paso suma al RTO.

---

## 5. Herramientas de Backup

### Empresariales (Pago)

- **Veeam Backup & Replication:** Estándar en entornos VMware y Hyper-V. Soporta backup de VMs, agentes físicos y cloud (AWS, Azure). Características: deduplicación, compresión, cifrado, inmutabilidad (Linux Hardened Repository). Restauración a nivel de archivo, VM completa o incluso aplicación (Exchange, SQL, Oracle).
- **Acronis Cyber Backup:** Backup de endpoints, servidores y cloud con protección anti-ransomware integrada. Usa blockchain para verificar integridad de backups.
- **Commvault:** Suite empresarial completa. Backup, recuperación, archive, replicación. Soporta cualquier plataforma (física, virtual, cloud, SaaS).
- **Veritas NetBackup:** Legacy pero omnipresente en grandes corporaciones. Backup de mainframes, UNIX, Linux, Windows, cloud.

### Open Source / Gratuitas

- **BorgBackup (Borg):** Herramienta de deduplicación y compresión. Ideal para backups de Linux. Soporta cifrado AES-256. Comandos: `borg init`, `borg create`, `borg extract`.
- **Restic:** Backup rápido y multiplataforma. Soporta múltiples destinos: local, SFTP, S3, Azure Blob, Google Cloud Storage. Cifrado integrado. `restic backup /data --repo s3:s3.amazonaws.com/bucket`
- **Duplicati:** Backup cifrado e incremental. Interfaz web. Soporta destinos cloud (S3, Azure, Google Drive, Dropbox). Open-source pero con interfaz amigable.
- **rsync:** Herramienta estándar de Linux para sincronización de archivos. No es un backup completo (no maneja versiones), pero puede usarse como base para scripts de backup. `rsync -avz --delete /source/ user@remote:/dest/`
- **Duplicity:** Usa rsync como backend con cifrado GPG. Soporta backups incrementales.

### Cloud-Native

- **AWS Backup:** Servicio gestionado de backup para servicios AWS (EC2, RDS, DynamoDB, EFS, S3). Políticas centralizadas, retención automatizada, cifrado.
- **Azure Backup:** Backup de VMs Azure, SQL Server, SAP HANA, Azure Files. Retención configurable, backups consistentes con aplicación.
- **Google Cloud Backup and DR:** Servicio gestionado de backup y recuperación. Snapshots persistentes, backups de bases de datos.

---

## 6. Validación y Pruebas de Backup

Un backup que no se prueba no es un backup. Es una ilusión.

### Qué Probar

- **Restauración completa:** ¿Puedes restaurar un servidor completo desde cero?
- **Restauración parcial:** ¿Puedes restaurar un solo archivo de un backup de 50 TB?
- **Integridad de datos:** ¿Los datos restaurados son idénticos a los originales? Verificar checksum (MD5, SHA256).
- **Consistencia de aplicación:** ¿La base de datos restaurada es consistente? Ejecutar `DBCC CHECKDB` (SQL Server) o `pg_dump` con verificación.
- **Rendimiento:** ¿El tiempo de restauración real cumple con el RTO declarado?

### Frecuencia de Pruebas

- **Prueba automática post-backup:** Verificar checksum inmediatamente después de cada backup.
- **Prueba de restauración mensual:** Restaurar un servidor no crítico en un entorno aislado.
- **Prueba de DR completa anual:** Apagar el entorno de producción y operar desde backups (Full Test).

---

## 7. El Ángulo del Hacker

Un atacante de ransomware conoce la importancia de los backups y los ataca directamente:

1. **Descubrimiento de backups:** El ransomware busca archivos de backup por extensión y ubicación común: `*.bak`, `*.vbk` (Veeam), `*.vhd` (Hyper-V), `*.vmdk` (VMware), `backup`, `backups`, `restore`. Usa comandos como `where /r C:\ *.bak` (Windows) o `find / -name "*.vbk"` (Linux).

2. **Desconexión de servicios de backup:** Mata procesos de backup: `taskkill /f /im veeam.exe`, `systemctl stop veeamservice`.

3. **Eliminación de snapshots:** En VMware, el atacante ejecuta `Get-VM | Get-Snapshot | Remove-Snapshot` via PowerShell si tiene acceso a vCenter.

4. **Borrado de backups en cloud:** Si encuentra credenciales de AWS/Azure en los servidores, las usa para borrar buckets S3 (aws s3 rm s3://backup-bucket --recursive) o contenedores Azure.

5. **Ataque a backups inmutables:** Los atacantes ahora buscan vulnerabilidades en la configuración de inmutabilidad. Si el período de inmutabilidad expiró y el atacante tiene credenciales de administrador, puede eliminar los backups inmutables después de modificar el período de retención.

* **Por que esto importa:** La única defensa probada contra ransomware es un backup **inmutable y air-gapped**. Un backup air-gapped (separado físicamente o con desconexión de red programada) no puede ser alcanzado por el ransomware. Ejemplo: cintas LTO almacenadas en una caja fuerte, o un NAS con conexión programada solo durante la ventana de backup.

---

## 8. Seguridad de Backups

### Principios de Protección de Backups

- **Cifrado en reposo:** Todos los backups deben estar cifrados (AES-256). Si un atacante roba la cinta o el bucket S3, no puede leer los datos.
- **Cifrado en tránsito:** La transferencia de backups debe ir cifrada (TLS 1.3, SSH, VPN).
- **Separación de credenciales:** Las credenciales para acceder a los backups deben ser diferentes de las credenciales de administración del sistema. Idealmente, usar cuentas de servicio con MFA y solo los permisos necesarios.
- **Principio de mínimo privilegio:** El servicio de backup debe tener acceso de solo lectura a los datos y solo escritura al repositorio de backup.
- **Autenticación multifactor:** El acceso al panel de administración de backup (Veeam, Acronis, AWS Console) debe requerir MFA.
- **Monitoreo de actividad de backup:** Alertar sobre eliminaciones masivas de backups, cambios en políticas de retención, accesos fuera del horario laboral.

---

## 9. Criterio de Dominio (Autoevaluación)

Revisa si puedes salvar a la empresa del apocalipsis:

1. Un Hospital configura su sistema de expedientes médicos para hacer un respaldo a la Nube (AWS) todos los viernes a las 10:00 PM. Un ataque de Ransomware destruye los servidores el viernes a las 9:00 PM. Usando el concepto de **RPO (Recovery Point Objective)**, calcula exactamente cuánto tiempo de datos de pacientes (cirugías, recetas) se perdió y discute el impacto letal que esto tendría en la vida real.

2. Explica la "Regla 3-2-1" de los respaldos. ¿Por qué el paso final ("1 copia fuera de sitio") es la única defensa real contra desastres naturales como inundaciones o terremotos que destruyan el Centro de Datos principal?

3. El Director Financiero (CFO) se queja de que el costo de almacenamiento en la nube es muy caro, y exige que el **RTO (Recovery Time Objective)** de la empresa se reduzca a 5 minutos, pero sin gastar más dinero. Explica por qué lograr un RTO de 5 minutos requiere una arquitectura de "Alta Disponibilidad" extremadamente costosa, y por qué no es compatible con presupuestos bajos.

4. Tu empresa tiene un respaldo completo (Backup) almacenado en un servidor NAS (Disco de Red) conectado a la misma red de la oficina. Un empleado descarga accidentalmente un Ransomware avanzado. Explica por qué este Ransomware probablemente destruirá también tus respaldos (anulando tu capacidad de recuperación) y cómo el concepto de "Segmentación de Red" podría haberlo evitado.

5. Un administrador configura backups incrementales cada hora con retención de 7 días, más backups completos semanales con retención de 3 meses. Tras un ataque de ransomware, descubre que el backup incremental de hace 2 días está corrupto. Explica qué cadena de restauración se rompe y cómo un esquema **GFS (Grandfather-Father-Son)** podría mitigar este riesgo.

6. Un equipo de IT decide almacenar sus backups en AWS S3 con Object Lock habilitado (inmutabilidad por 30 días). Sin embargo, el usuario que ejecuta los backups tiene permisos de administrador completos sobre el bucket S3 (s3:*). Explica por qué esta configuración no protege realmente contra un atacante que comprometa la cuenta del administrador.
