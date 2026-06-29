---
title: "Fundamentos de Bases de Datos: El Maletín y La Bóveda"
level: "inicial"
content_type: "guia"
updated: "2026-06-29"
---

# Fundamentos de Bases de Datos: El Maletín y La Bóveda

## Objetivo de esta Guía

Aprender la diferencia exacta entre proteger los datos cuando están viajando y protegerlos cuando están guardados.

Anteriormente (Criptografía) y en la guía Web aprendimos que el protocolo HTTPS (TLS) cifra la información para que los hackers no puedan robar contraseñas desde el Wi-Fi de un café. A esto se le llama Cifrado en Tránsito.

El problema es que muchos ingenieros asumen que con HTTPS ya están seguros. Eso es un error catastrófico. HTTPS solo protege el viaje. Que pasa cuando el viaje termina?

## La Analogía

Imagina que eres un banco y necesitas enviar 1 millón de dólares a otra sucursal.

### Cifrado en Tránsito (El Maletín Blindado)

Se coloca el dinero en un Maletín Blindado y se contrata un Camión de Valores (este camión es el HTTPS / TLS). El camión conduce por la autopista (el Internet). Si una banda de asaltantes (Hackers) ataca el camión a mitad del camino, no podrán abrir el maletín de titanio. El dinero esta seguro durante el viaje.

### El Problema de la Llegada (Data in Use)

El camión llega sano y salvo a la sucursal de destino. El guardia saca el dinero del maletín blindado y lo deja en el piso del banco. El viaje terminó. El camión blindado ya no sirve de nada. Si un empleado malicioso de limpieza esta caminando por el banco, puede simplemente agacharse y robarse el millón de dólares.

En informática: Tu usuario escribe su contraseña en la página web usando HTTPS. Viaja encriptada y segura. Pero cuando llega al servidor web, el servidor le quita la encriptación para poder leerla, y la guarda en la Base de Datos en texto completamente plano (`contrasena123`). Si un hacker logra entrar a la red interna y copia la Base de Datos, se lleva todo.

## Cifrado en Tránsito (TLS/SSL)

### Como Funciona TLS

1. Cliente se conecta al servidor y solicita una conexión segura.
2. Servidor envía su certificado digital (contiene la llave pública).
3. Cliente verifica el certificado contra una autoridad certificadora (CA).
4. Cliente y servidor acuerdan una llave simétrica temporal (handshake).
5. A partir de ahí, toda la comunicación se cifra con AES.

### Donde se Aplica

- Entre el navegador y el servidor web (HTTPS).
- Entre aplicaciones y APIs (HTTPS).
- Entre servidores de base de datos y aplicaciones (usando certificados TLS).
- Entre servidores de correo (STARTTLS).

### Limitaciones de TLS

TLS solo protege los datos en tránsito. Cuando llegan al servidor de destino, los datos se descifran para ser procesados. En ese momento:

- El servidor web tiene acceso a los datos en texto plano.
- La aplicación procesa los datos en memoria (tal vez los guarda en log).
- La base de datos recibe los datos en texto plano (a menos que use cifrado de red).

## Cifrado en Reposo (Encryption at Rest)

Para arreglar el error de dejar el dinero tirado en el piso, inventamos el Cifrado en Reposo (Encryption at Rest). La tecnología más común para esto se llama TDE (Transparent Data Encryption).

### La Bóveda de Titanio

Cuando el camión blindado llega al banco, el dinero no se tira al piso. Se mete inmediatamente dentro de una Bóveda Subterránea que pesa 50 toneladas y tiene cerraduras matemáticas.

En informática: El Disco Duro físico donde la Base de Datos guarda su información (los archivos `.mdf` o `/var/lib/mysql`) se encripta matemáticamente usando AES-256.

### TDE (Transparent Data Encryption)

TDE encripta automáticamente los datos cuando se escriben al disco y los descifra cuando se leen. Es transparente para la aplicación (no requiere cambios en el código).

**Como funciona:**

1. La base de datos tiene una clave de encriptación de base de datos (DEK).
2. La DEK se almacena encriptada por una clave maestra (certificado).
3. La clave maestra se almacena en un módulo de seguridad (HSM) o en el sistema operativo.
4. Cuando la base de datos escribe datos al disco, los encripta automáticamente.
5. Cuando lee datos del disco, los descifra automáticamente.

**Que protege TDE:**

- El archivo físico de la base de datos (`.mdf`, `.ldf`).
- Los archivos de backup (`.bak`).
- Los archivos de log (`.ldf`).
- Los archivos temporales (tempdb).

**Que NO protege TDE:**

- Las consultas SQL en memoria (datos en uso).
- Los datos transmitidos por la red.
- Los datos accesibles por un usuario autorizado.

### El Escenario Definitivo (Zero Trust)

TDE no te salva de un SQL Injection, pero te salva cuando el disco físico aparece en la dark web.

La empresa es hackeada. El hacker salta el Firewall. El hacker vulnera el Servidor Web. El hacker logra descargar el archivo físico gigantesco que contiene la Base de Datos de Clientes y se lo lleva a su computadora en Rusia.

El hacker abre el archivo esperando ver 5 millones de tarjetas de crédito. En su lugar, el hacker solo ve basura ilegible (`x9$Lp@...`). Como la base de datos tenía Cifrado en Reposo, y el hacker no tiene la Llave Maestra (que esta guardada en un HSM o Bóveda PAM), el botín que robo es matemáticamente inútil. La empresa se salvo de la multa millonaria.

## Cifrado a Nivel de Columna

Además del cifrado a nivel de disco (TDE), se puede cifrar a nivel de columna. Esto cifra datos específicos dentro de la base de datos.

### Cuando Usar Cifrado de Columna

- Datos especialmente sensibles (números de tarjeta de crédito, números de seguro social, registros médicos).
- Cuando se necesita control granular sobre quien puede ver los datos.
- Cuando el TDE no es suficiente (el DBA puede ver los datos descifrados, pero no debería).

### Ejemplo en SQL Server

```sql
CREATE MASTER KEY ENCRYPTION BY PASSWORD = 'ClaveMaestra123!';
CREATE CERTIFICATE CertificadoSSL WITH SUBJECT = 'Certificado para datos sensibles';
CREATE SYMMETRIC KEY ClaveSimetrica WITH ALGORITHM = AES_256
ENCRYPTION BY CERTIFICATE CertificadoSSL;

-- Encriptar datos
OPEN SYMMETRIC KEY ClaveSimetrica DECRYPTION BY CERTIFICATE CertificadoSSL;
UPDATE Clientes SET TarjetaCredito = ENCRYPTBYKEY(KEY_GUID('ClaveSimetrica'), TarjetaCredito);
CLOSE SYMMETRIC KEY ClaveSimetrica;
```

### Limitaciones del Cifrado de Columna

- Rendimiento: las consultas sobre columnas cifradas son más lentas.
- No se puede buscar por igualdad en columnas cifradas (a menos que se use deterministic encryption).
- Gestión de claves compleja.

## Cifrado en Uso (Confidential Computing)

La frontera más reciente es el cifrado en uso: proteger los datos mientras se están procesando en memoria. Esto se logra con tecnologías como:

- **Intel SGX (Software Guard Extensions):** Crea enclaves seguros en la CPU donde los datos se descifran solo dentro del procesador.
- **AMD SEV (Secure Encrypted Virtualization):** Encripta la memoria de las VMs.
- **Confidential Computing en la nube:** Azure Confidential Computing, AWS Nitro Enclaves.

El cifrado en uso protege contra:

- Acceso de hipervisores (cloud).
- Acceso de administradores del sistema.
- Acceso de otros procesos en el mismo servidor.

## Gestión de Claves (Key Management)

El cifrado es tan seguro como la clave que lo protege. Si pierdes la clave, pierdes los datos. Si alguien roba la clave, el cifrado es inútil.

### HSM (Hardware Security Module)

Un HSM es un dispositivo físico (o virtual) que almacena claves criptográficas de forma segura. Características:

- Las claves nunca salen del HSM en texto plano.
- Las operaciones criptográficas se realizan dentro del HSM.
- Resistente a manipulación física.
- Cumplimiento FIPS 140-2 Level 3.

### Key Vaults en la Nube

- AWS KMS (Key Management Service): Gestión de claves para servicios de AWS.
- Azure Key Vault: Almacén de claves, certificados y secretos.
- GCP Cloud KMS: Gestión de claves para Google Cloud.

### El Problema del Huevo y la Gallina

Para encriptar la clave de la base de datos, necesitas otra clave (la clave maestra). Para proteger la clave maestra, necesitas otro sistema (HSM, Key Vault). Y así sucesivamente.

La cadena termina en un Root of Trust: un HSM físico o un módulo de plataforma segura (TPM) en el hardware.

## Backup y Cifrado

Los backups de bases de datos deben estar cifrados. Un backup sin cifrar es un riesgo enorme: cualquiera que tenga acceso al archivo de backup puede restaurar la base de datos completa.

### Buenas Prácticas de Backup Cifrado

1. Cifrar todos los backups con TDE o cifrado nativo.
2. Almacenar las claves de cifrado de backup separadas de los datos.
3. Probar la restauración de backups periodicamente.
4. Almacenar backups en ubicaciones geograficamente separadas.
5. Usar almacenamiento inmutable (los backups no pueden ser modificados o borrados).

## Casos Reales

### La Brecha de Equifax (2017)

Equifax sufrio una brecha que expuso datos de 147 millones de personas. La causa fue una vulnerabilidad en Apache Struts (CVE-2017-5638).

Los datos robados incluian nombres, números de seguro social, fechas de nacimiento y direcciones. Si Equifax hubiera tenido cifrado en reposo a nivel de columna para los números de seguro social, los atacantes habrian obtenido datos cifrados inútiles.

Sin embargo, el cifrado en reposo no habría detenido el ataque: los atacantes usaron credenciales de una aplicación legítima que tenía acceso a los datos descifrados. Necesitaban también controles de acceso.

### El Robo de Discos en la Nube (2018-2019)

Varios casos de discos SSD de centros de datos que fueron desechados o reutilizados sin borrar correctamente los datos. El cifrado en reposo (TDE) protege contra este escenario: incluso si el disco físico es robado, los datos están cifrados.

### MongoDB Ransomware (2017)

Miles de bases de datos MongoDB fueron secuestradas porque estaban expuestas a internet sin autenticación. Los atacantes borraron los datos y pidieron rescate.

El cifrado en reposo no habría ayudado aqui: la base de datos estaba funcionando y accesible. Los atacantes accedieron a los datos a través de la aplicación, no robando el disco.

## Modos de Falla

### Falla 1: Solo Cifrado en Tránsito, No en Reposo

Muchas empresas cifran HTTPS pero no cifran los discos de la base de datos. Un ataque que comprometa el servidor de base de datos expone todos los datos.

### Falla 2: Clave Maestra en el Mismo Servidor

Guardar la clave de cifrado en el mismo servidor que la base de datos. Si el atacante compromete el servidor, también tiene la clave.

### Falla 3: No Cifrar Backups

Los backups suelen almacenarse sin cifrar. Un backup robado expone todos los datos de la base de datos.

### Falla 4: Cifrado Sin Gestión de Claves

Perder la clave de cifrado significa perder los datos permanentemente. Sin un sistema de respaldo de claves, la recuperación es imposible.

### Falla 5: Rendimiento Ignorado

El cifrado de columna puede degradar el rendimiento significativamente. Sin pruebas de rendimiento, las aplicaciones pueden volverse inusables.

## La Mirada del Hacker

Como atacante, el cifrado en reposo es un obstaculo, pero no insalvable si puedo comprometer la aplicación o la base de datos en funcionamiento.

### Como Evadir el Cifrado en Reposo

Si logró acceso a la base de datos en funcionamiento:

1. **Consultar datos a través de la aplicación:** La aplicación descifra los datos para mostrarlos. Si puedo ejecutar consultas SQL, los datos me llegan descifrados.

2. **Acceder a la memoria del servidor:** La base de datos almacena los datos descifrados en memoria. Un dump de memoria puede revelar los datos.

3. **Robar las claves:** Si encuentro las claves de cifrado (en archivos de configuración, en el registro, en variables de entorno), puedo descifrar los archivos de la base de datos.

4. **Forzar un backup:** SolicitO a la base de datos que haga un backup. Si el backup no esta cifrado, me llevo todos los datos.

### Técnica: Server Side Request Forgery (SSRF) + Cifrado

Similar al ataque Capital One: si encuentro una vulnerabilidad SSRF, puedo hacer que el servidor web acceda a recursos internos (incluyendo el endpoint de metadatos de la nube) y obtener credenciales temporales para acceder a la base de datos.

### Técnica: Inyección SQL + Cifrado

Si encuentro una vulnerabilidad de SQL Injection, puedo ejecutar consultas directamente en la base de datos. La base de datos descifra los datos automáticamente (TDE es transparente), y yo recibo los datos en texto plano en la respuesta HTTP.

El cifrado en reposo NO protege contra SQL Injection.

## Encriptación por el Cliente (Client-Side Encryption)

Existe un nivel de cifrado aún más profundo que TDE y el cifrado de columna: el cifrado del lado del cliente. En este modelo, los datos se cifran antes de salir del cliente (navegador, aplicación móvil) y el servidor jamás tiene acceso a la llave de cifrado.

### Como Funciona

1. El cliente genera una llave de cifrado (derivada de la contraseña del usuario).
2. El cliente cifra los datos localmente antes de enviarlos al servidor.
3. El servidor almacena los datos cifrados (sin poder descifrarlos).
4. Cuando el cliente necesita los datos, los descarga cifrados y los descifra localmente.

### Ventajas

- El proveedor de la nube no puede leer los datos (confidencialidad absoluta).
- Un atacante que comprometa el servidor solo obtiene datos cifrados.
- Cumplimiento normativo para datos extremadamente sensibles (registros médicos, secretos de estado).

### Desventajas

- No se pueden buscar datos en el servidor (a menos que se use Searchable Encryption).
- Si el usuario pierde la llave, los datos se pierden permanentemente.
- Mayor complejidad de desarrollo.

### Herramientas

- **AWS S3 Client-Side Encryption:** El SDK de AWS permite cifrar objetos antes de subirlos a S3.
- **Azure Client-Side Encryption:** El SDK de Azure Storage cifra datos antes de la transmision.
- **SQL Server Always Encrypted:** Una característica que permite que las consultas se ejecuten sobre datos cifrados, y solo el cliente tiene la llave.

## Data Masking vs Encryption

Es importante no confundir enmascaramiento con cifrado:

| Característica | Cifrado (TDE) | Enmascaramiento (Masking) |
|----------------|---------------|---------------------------|
| Propocito | Proteger contra robo físico | Proteger contra usuarios no autorizados |
| Reversible | Si (con la clave) | No (irreversible) |
| Rendimiento | Impacto moderado | Impacto mínimo |
| Datos en disco | Cifrados | En texto plano |
| Datos en memoria | Descifrados | Enmascarados |
| A quien protege | Contra atacantes externos | Contra insiders |

Ambos son necesarios. El cifrado protege si roban el disco. El enmascaramiento protege si un empleado mira la pantalla.

## Cumplimiento Normativo y Cifrado

Diferentes regulaciones exigen cifrado de datos:

### PCI DSS (Datos de Tarjetas de Crédito)

- Requiere cifrado de datos de tarjetas almacenados (cifrado en reposo).
- Requiere cifrado en tránsito (TLS 1.2+).
- Las claves de cifrado deben protegerse en un HSM o similar.

### HIPAA (Datos Médicos en USA)

- Requiere cifrado de datos de pacientes en reposo y en tránsito.
- No específica algoritmo, pero AES-256 es el estándar.
- Las claves deben gestionarse de forma segura.

### GDPR (Datos Personales en Europa)

- No exige técnicamente cifrado, pero lo recomienda como medida de seguridad.
- El cifrado puede ser usado como mitigación para reducir multas en caso de brecha.

### Sarbanes-Oxley (SOX)

- Requiere protección de datos financieros.
- El cifrado es una de las medidas aceptadas.

## Casos Reales Adicionales

### El Robo de la Base de Datos de LinkedIn (2012)

LinkedIn sufrio una brecha donde 6.5 millones de contraseñas de usuarios fueron robadas. Las contraseñas estaban almacenadas como hashes SHA1 sin sal (salt).

El cifrado en reposo no habría ayudado porque los atacantes accedieron a la base de datos en funcionamiento a través de una vulnerabilidad. Pero si LinkedIn hubiera usado cifrado de columna para las contraseñas, el ataque habría sido más difícil.

La lección: las contraseñas nunca deben almacenarse en texto plano ni con hashes débiles. Deben tener salt y usar algoritmos lentos (bcrypt, scrypt, Argon2).

### El Robo de Discos en el Centro de Datos de Google (2013)

Google reporto que un disco duro de su centro de datos en Taiwan fue robado. Como Google usa cifrado en reposo en todos sus discos (AES-256), los datos robados eran ilegibles.

Este es el caso de uso perfecto del cifrado en reposo: proteger contra robo físico.

## Modos de Falla Adicionales

### Falla 6: Cifrado Sin Rotation de Claves

Usar la misma clave de cifrado por años. Si la clave se ve comprometida (empleado despedido, auditoría), todos los datos historicos quedan expuestos.

Buena práctica: rotar claves de cifrado anualmente, y mantener claves anteriores para descifrar datos antiguos.

### Falla 7: Cifrado Que Degrada el Rendimiento Sin Planificar

El cifrado de columna puede hacer que las consultas sean 10-100x más lentas. Sin pruebas de rendimiento, las aplicaciones pueden colapsar.

### Falla 8: No Cifrar Datos en Logs

Los logs de aplicaciones suelen contener datos sensibles en texto plano (contraseñas, tokens, datos de clientes). Si los logs no se cifran o redactan, son una fuente de exposición.

### Falla 9: Depender Solo de SSL/TLS

SSL/TLS solo protege los datos en tránsito. Una vez que llegan al servidor y se descifran para ser procesados, quedan expuestos si no hay cifrado en reposo.

## La Mirada del Hacker: Estrategias de Ataque a Datos Cifrados

Como atacante, el cifrado en reposo me obliga a cambiar mis técnicas.

### Ataque a la Aplicación, No al Disco

Si la base de datos tiene TDE, no pierdo tiempo tratando de robar discos. En su lugar:

1. Busco SQL Injection en la aplicación web. La aplicación tiene acceso a los datos descifrados, y a través de SQL Injection, yo también.
2. Busco credenciales de la aplicación en sitios de código, configuraciones, o variables de entorno.
3. Si la aplicación tiene una API, busco vulnerabilidades que me permitan extraer datos.

### Ataque a las Claves de Cifrado

Las claves de cifrado suelen estar en:

- Archivos de configuración en el servidor.
- Almacén de certificados de Windows.
- Variables de entorno.
- Código fuente de la aplicación.
- Scripts de deployment (Terraform, Ansible).

Si encuentro las claves, el cifrado es inútil.

### Ataque Side-Channel

Si el cifrado se hace en software (no en HSM), puedo usar técnicas de side-channel:

- Análisis de tiempos: medir cuanto tarda el servidor en descifrar datos puede revelar información sobre la clave.
- Análisis de caché: el acceso a la memoria caché durante el descifrado puede filtrar la clave.
- Spectre/Meltdown: vulnerabilidades de CPU que permiten leer memoria de otros procesos.

### Ataque a Backups

Los backups suelen tener protecciones más débiles que la base de datos en producción. Busco:

- Backups almacenados sin cifrar en buckets S3.
- Backups en archivos compartidos de red.
- Backups en cintas enviadas a almacenamiento externo.

Un backup robado me da todos los datos, generalmente en un formato que puedo restaurar en mi propio servidor.

### Ataque a la Memoria (Memory Dump)

Si logró ejecutar código en el servidor de base de datos, puedo hacer un dump de la memoria del proceso de la base de datos. La base de datos mantiene los datos descifrados en memoria para responder consultas rápidamente.

Herramientas como `procdump` (Windows) o `gcore` (Linux) pueden extraer la memoria de un proceso en ejecución.

## Autoevaluación

Responde estas preguntas para verificar si comprendes los conceptos:

1. El Arquitecto de Software de tu empresa argumenta: "No necesitamos cifrar los discos duros de la base de datos (Cifrado en Reposo) porque nuestra página web ya tiene un certificado HTTPS muy seguro". Usando la analogía del Camión de Valores, explica por qué este argumento es técnicamente incorrecto y peligroso.

2. Un empleado del Centro de Datos entra físicamente a la sala de servidores de la empresa a las 3:00 AM, roba físicamente el Disco Duro del servidor de Base de Datos principal, y se lo lleva a su casa. Si la base de datos estaba configurada con TDE (Transparent Data Encryption), Que verá el empleado cuando conecte el disco duro robado en su computadora personal?

3. Sabiendo que el Cifrado en Reposo protege contra el robo físico de los discos, Por qué un ataque de Inyección SQL ejecutado a través de la página web si lograría extraer los datos de forma legible a pesar de que el disco duro este encriptado con TDE? (Pista: Piensa en quien esta "leyendo" legalmente los datos y entregándoselos al atacante).

4. El equipo de seguridad decide implementar Cifrado en Reposo (AES-256) en la Base de Datos. Matemáticamente, esto requiere una Llave Maestra de Encriptación. Basándote en lo aprendido anteriormente, Por qué guardar esta Llave Maestra en un archivo de texto plano en el mismo servidor web anula completamente todo el propósito del cifrado?

5. Explica la diferencia entre cifrado en tránsito (TLS/HTTPS) y cifrado en reposo (TDE). Que protege cada uno y que dejan sin proteger?

6. Un atacante compromete un servidor de base de datos con TDE habilitado. Como podría el atacante obtener los datos descifrados sin tener la clave maestra?

7. Por qué los backups de bases de datos deben cifrarse incluso si la base de datos en producción ya esta cifrada con TDE?

8. Que es un HSM (Hardware Security Module) y por qué es importante para la gestión de claves de cifrado?
