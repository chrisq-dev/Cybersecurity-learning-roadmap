---
title: "Permisos y Auditoría de DB: Las Gafas Mágicas y la Cámara de Seguridad"
---

# Permisos y Auditoría de DB: Las Gafas Mágicas y la Cámara de Seguridad

## Objetivo de esta Guía

Aprender como proteger la base de datos contra el Enemigo Interno (Insider Threat).

El Cifrado en Reposo de la guía anterior es perfecto si alguien se roba el disco duro físico. Pero, que pasa si el ladrón no es un hacker ruso, sino el empleado de Recursos Humanos de tu propia empresa usando sus credenciales legítimas?

## La Analogía

Imagina un banco con una bóveda gigante llena de dinero. La bóveda tiene una puerta de titanio con cerradura biometrica (cifrado en reposo). Pero dentro del banco trabajan 500 empleados que necesitan acceder a la bóveda para hacer su trabajo.

- **El Problema:** No todos los empleados deberían ver todo el dinero. El cajero solo necesita ver los billetes que cuenta. El gerente necesita ver los balances. El auditor necesita ver los movimientos.

- **Las Gafas Mágicas (Data Masking):** El cajero mira la bóveda y solo ve los billetes que necesita contar. El resto del dinero aparece borroso.

- **La Cámara de Seguridad (DAM):** Cada vez que alguien abre la bóveda, una cámara graba quien fue, a que hora y que hizo adentro.

## El Principio del Menor Privilegio en Bases de Datos

Al igual que en IAM y en sistemas operativos, en bases de datos se aplica el Principio del Menor Privilegio: cada usuario debe tener solo los permisos estrictamente necesarios para hacer su trabajo.

### Niveles de Permisos en Bases de Datos

Los permisos se organizan en una jerarquía:

1. **Nivel de Servidor:** Permisos sobre toda la instancia de base de datos.
   - `sysadmin` (SQL Server): Control total.
   - `securityadmin`: Gestión de logins.
   - `serveradmin`: Configuración del servidor.

2. **Nivel de Base de Datos:** Permisos sobre una base de datos específica.
   - `db_owner`: Control total sobre la base de datos.
   - `db_datareader`: Leer todas las tablas.
   - `db_datawriter`: Escribir en todas las tablas.
   - `db_ddladmin`: Modificar la estructura (tablas, procedimientos).

3. **Nivel de Objeto:** Permisos sobre tablas, vistas, procedimientos.
   - `SELECT`: Leer datos.
   - `INSERT`: Insertar datos.
   - `UPDATE`: Modificar datos.
   - `DELETE`: Eliminar datos.
   - `EXECUTE`: Ejecutar procedimientos almacenados.

### Práctica Común Peligrosa

Muchos administradores asignan `db_owner` a todos los usuarios para "que no tengan problemas". Esto viola completamente el Principio del Menor Privilegio.

```sql
-- PELIGROSO: dar permisos de administrador a todos
ALTER ROLE db_owner ADD MEMBER usuario_normal;
```

```sql
-- CORRECTO: dar solo los permisos necesarios
GRANT SELECT ON Clientes TO usuario_ventas;
GRANT SELECT, INSERT ON Pedidos TO usuario_ventas;
```

## Roles de Base de Datos

Los roles simplifican la administración de permisos. En lugar de asignar permisos a cada usuario individualmente, se crean roles y se asignan usuarios a esos roles.

### Roles Fijos vs Roles Personalizados

**Roles Fijos de SQL Server:**
- `db_datareader`: Lee todas las tablas.
- `db_datawriter`: Escribe en todas las tablas.
- `db_ddladmin`: Modifica la estructura.

**Roles Personalizados:**

```sql
CREATE ROLE ConsultorVentas;
GRANT SELECT ON Clientes TO ConsultorVentas;
GRANT SELECT ON Productos TO ConsultorVentas;
GRANT SELECT, INSERT ON Pedidos TO ConsultorVentas;
EXEC sp_addrolemember 'ConsultorVentas', 'usuario_maria';
```

Esto es más granular: Maria tiene permisos de lectura en Clientes y Productos, y de lectura/escritura en Pedidos.

### Esquemas como Contenedores de Permisos

Los esquemas agrupan tablas relacionadas y permiten asignar permisos a nivel de esquema:

```sql
CREATE SCHEMA Ventas;
CREATE SCHEMA RecursosHumanos;

CREATE TABLE Ventas.Clientes (...);
CREATE TABLE RecursosHumanos.Nominas (...);

GRANT SELECT ON SCHEMA :: Ventas TO ConsultorVentas;
-- No tiene acceso al esquema RecursosHumanos
```

## Enmascaramiento Dinámico (Dynamic Data Masking)

El Principio del Menor Privilegio dicta que un empleado solo debe ver la información estrictamente necesaria para hacer su trabajo.

### El Problema del Call Center

Tienes a 500 operadores de Call Center atendiendo llamadas telefónicas de clientes. Ellos necesitan confirmar la identidad del cliente pidiéndole los últimos 4 dígitos de su tarjeta de crédito. Pero si les muestras la tarjeta completa en su pantalla, los operadores podrían tomarle una foto con su celular y hacer fraude.

### La Solución: Gafas Mágicas

En el disco duro de la Base de Datos, la tarjeta de crédito esta guardada intacta y real: `4555 1234 1234 9876`.

Cuando el sistema detecta que el usuario que esta pidiendo ver la tabla es un "Empleado de Call Center", la Base de Datos le pone unas gafas mágicas de manera dinámica antes de mandarle la información a la pantalla.

El resultado: El empleado mira su pantalla y solo ve esto: `XXXX XXXX XXXX 9876`. Puede confirmar la identidad del cliente, puede hacer su trabajo, pero es físicamente imposible que robe la tarjeta completa porque la Base de Datos se rehusó a enviarla.

### Implementación en SQL Server

```sql
CREATE TABLE Clientes (
  ID INT,
  Nombre VARCHAR(100),
  TarjetaCredito VARCHAR(19) MASKED WITH (FUNCTION = 'partial(0, "XXXX-XXXX-XXXX-", 4)'),
  Email VARCHAR(100) MASKED WITH (FUNCTION = 'email()'),
  Salario DECIMAL(10,2) MASKED WITH (FUNCTION = 'default()')
);
```

Tipos de máscaras:

- **default():** Muestra `xxxx` para strings, `0` para números.
- **email():** Muestra `aXXX@XXXX.com`.
- **partial(n, "prefijo", m):** Muestra los primeros n caracteres, un prefijo personalizado, y los últimos m caracteres.
- **random(límite):** Reemplaza números con valores aleatorios en un rango.

### Quien Puede Ver los Datos Reales

Los usuarios con permisos `UNMASK` pueden ver los datos sin enmascarar. Esto tipicamente incluye:

- Administradores de base de datos (DBA).
- Auditores.
- Gerentes autorizados.

```sql
GRANT UNMASK TO UsuarioAuditor;
```

### Limitaciones del Enmascaramiento

- No es cifrado: los datos reales están en disco sin encriptar.
- No protege contra usuarios con permiso UNMASK.
- No protege contra inyección SQL si el atacante usa un usuario con UNMASK.
- Puede ser evadido en algunos casos (ej. usando procedimientos almacenados con la opción EXECUTE AS).

## Auditoría Avanzada (DAM - Database Activity Monitoring)

Anteriormente hablamos de recolección de Telemetría y Análisis Forense en Windows. Las Bases de Datos gigantes (Oracle, SQL Server) tienen su propio ecosistema de auditoría llamado DAM.

### La Cámara de Seguridad 4K

Es la cámara de seguridad 4K que graba el interior de la Bóveda del Banco.

La Necesidad: Los Administradores de Bases de Datos (DBAs) tienen el poder absoluto ("Modo Dios"). Pueden borrar las tablas y pueden ver todas las tarjetas de crédito sin máscara. Quien vigila al vigilante?

La Ejecución: Las herramientas de DAM operan independientemente de la Base de Datos. Graban cada orden (Query SQL) que ejecuta cada persona.

### Que Registra DAM

Cada consulta SQL que se ejecuta:

```sql
SELECT Salario FROM Empleados WHERE Nombre = 'CEO'
```

DAM registra:

- **Quien:** Usuario `admin_juan` (dominio\usuario).
- **Que:** `SELECT Salario FROM Empleados`.
- **Donde:** Servidor `SQL-PROD-01`, Base de datos `Nominas`.
- **Cuando:** `2024-01-15 02:15:30 UTC`.
- **Desde:** IP `192.168.1.50` (estacion de trabajo del DBA).
- **Filas afectadas:** 1 fila devuelta.

### Alertas en Tiempo Real

Si el Administrador de Base de Datos ejecuta el comando `SELECT Salario FROM Empleados WHERE Nombre = 'CEO'`, el sistema DAM:

1. Graba el evento en una bóveda forense inalterable.
2. Inmediatamente envía una Alerta Crítica al Analista del SOC, notificándole que el empleado con mayores privilegios de la empresa acaba de intentar espiar la nómina del Director General a las 2:00 AM.

### No-Repudiación

El objetivo del DAM no es detener al Administrador (porque técnicamente tiene los permisos), el objetivo es la No-Repudiación. Que el día de mañana no pueda decir "Yo no fui".

### Implementación de Auditoría Nativa

La mayoría de bases de datos incluyen auditoría nativa:

**SQL Server Audit:**

```sql
CREATE SERVER AUDIT MiAuditoria
TO FILE (FILEPATH = 'C:\AuditLogs\');

CREATE DATABASE AUDIT SPECIFICATION AuditNominas
FOR SERVER AUDIT MiAuditoria
ADD (SELECT ON Empleados BY dbo)
WITH (STATE = ON);

ALTER SERVER AUDIT MiAuditoria WITH (STATE = ON);
```

**PostgreSQL Audit (pgAudit):**

```sql
shared_preload_libraries = 'pgaudit'
pgaudit.log = 'read,write'
```

**MySQL Audit:**

Plugin de auditoría empresarial o soluciones de terceros.

### DAM y SIEM

Los logs de DAM deben enviarse al SIEM central para correlacion con otros eventos:

- Un DBA accede a la base de datos desde una IP externa (no desde la oficina).
- Un DBA accede a las 3:00 AM (fuera de horario).
- Un DBA consulta tablas que no corresponden a su trabajo.

En el SIEM, estas senales se correlacionan para detectar Insider Threats.

## Segregacion de Deberes (SoD) en Bases de Datos

La segregacion de deberes asegura que ninguna persona tenga permisos para realizar dos funciones incompatibles.

### Ejemplo de SoD en DB

- **DBA de Producción:** Administra la base de datos pero NO puede ver datos sensibles.
- **DBA de Desarrollo:** Administra bases de datos de desarrollo, no tiene acceso a producción.
- **Auditor:** Lee logs de auditoría pero no puede modificar la base de datos.
- **Oficial de Seguridad:** Aprueba cambios pero no los ejecuta.

### Separacion de Entornos

- **Desarrollo:** DBAs pueden modificar estructura, datos de prueba.
- **Pruebas:** Datos enmascarados (no datos reales de clientes).
- **Producción:** Acceso restringido, solo lectura para la mayoría.

## Prevención de SQL Injection

La inyección SQL es el enemigo #1 de las bases de datos. Un atacante que explota SQL Injection puede:

- Leer cualquier tabla (incluyendo contraseñas).
- Modificar o borrar datos.
- Ejecutar comandos en el servidor (en algunos casos).

### Defensas Contra SQL Injection

1. **Parametrizacion de Consultas (Prepared Statements):** La única defensa realmente efectiva. Separar los datos del codigo SQL.

```python
# VULNERABLE
cursor.execute(f"SELECT * FROM usuarios WHERE email = '{email}'")

# SEGURO
cursor.execute("SELECT * FROM usuarios WHERE email = %s", (email,))
```

2. **Stored Procedures:** Ejecutar lógica dentro de la base de datos, no concatenar strings.

3. **Validación de Input:** Verificar que los datos de entrada tengan el formato esperado.

4. **Principio del Menor Privilegio:** La cuenta de la aplicación debe tener solo los permisos minimos. No usar `sa` o `root` para la aplicación web.

5. **WAF (Web Application Firewall):** Bloquear patrones de SQL Injection en el tráfico HTTP.

## Casos Reales

### La Brecha de Datos de Marriott (2018)

Marriott descubrió que 500 millones de registros de clientes fueron robados. Los atacantes accedieron a la base de datos usando credenciales de dos empleados de una propiedad de Marriott.

Los atacantes usaron acceso legítimo (credenciales robadas) para acceder a datos de clientes. No necesitaron SQL Injection ni vulnerabilidades técnicas. Fue un abuso de privilegios.

La leccion: el monitoreo de actividad (DAM) y el enmascaramiento de datos habrian limitado el daño.

### El DBA que Robo Datos de Tarjetas de Crédito (2017)

Un administrador de base de datos de una empresa de pagos uso sus privilegios para copiar datos de tarjetas de crédito de clientes. Vendio los datos en la dark web.

El ataque fue descubierto cuando un socio comercial noto transacciones fraudulentas. La empresa no tenía:

- Enmascaramiento de datos (el DBA veía todas las tarjetas).
- Auditoría DAM (nadie registro que el DBA accedio a los datos).
- Segregacion de deberes (el DBA tenía acceso a producción y a datos sensibles).

### El Ataque a la Cadena de Suministro de Target (2013)

Target fue hackeado cuando atacantes robaron credenciales de un proveedor de HVAC (calefaccion). Esas credenciales les dieron acceso a la red interna de Target, desde donde accedieron a la base de datos de tarjetas de crédito.

El ataque comprometio 40 millones de tarjetas de crédito. Target no tenía:

- Segmentación de red (el proveedor de HVAC tenía acceso a la red de pagos).
- Monitoreo de actividad de base de datos (DAM).
- Enmascaramiento de datos de tarjetas.

## Modos de Falla

### Falla 1: DBA con Permisos Excesivos

Asignar `sysadmin` a todos los DBAs. Un DBA puede ver y modificar cualquier dato sin restriccion.

### Falla 2: Aplicación Web Conectada como sa

La aplicación web se conecta a la base de datos con el usuario `sa` (administrador). Si hay SQL Injection, el atacante obtiene control total.

### Falla 3: No Auditar Consultas Anomalas

No configurar auditoría para consultas inusuales (SELECT masivo, acceso fuera de horario, consultas a tablas sensibles).

### Falla 4: Enmascaramiento No Configurado

Los datos sensibles (tarjetas de crédito, SSN, salarios) se muestran completos a todos los usuarios.

### Falla 5: Logs de Auditoría en la Misma Base de Datos

Almacenar los logs de auditoría en la misma base de datos que se esta auditando. Si un atacante compromete la base de datos, puede borrar los logs.

### Falla 6: Sin Separacion de Entornos

Datos de producción usados en desarrollo y pruebas. Los desarrolladores tienen acceso a datos reales de clientes.

## La Mirada del Hacker

Como atacante, la base de datos es mi objetivo final. Ahí están los datos que valen dinero.

### Técnicas para Robar Datos

**1. SQL Injection con Blind Data Extraction:**

Si encuentro SQL Injection en una aplicación web, no necesito ver los datos directamente. Puedo extraerlos bit por bit usando consultas booleanas:

```sql
' IF (SELECT SUBSTRING(contrasena,1,1) FROM usuarios WHERE id=1) = 'a' WAITFOR DELAY '00:00:05' --
```

Si la pagina tarda 5 segundos en cargar, el primer carácter de la contrasena es 'a'. Es lento pero efectivo.

**2. Abuso de Usuarios con Permisos Excesivos:**

Si logró credenciales de un usuario con permisos `db_owner`, puedo:

- Exportar todas las tablas a archivos CSV.
- Crear un usuario para mi mismo (backdoor).
- Ejecutar comandos en el sistema operativo (xp_cmdshell en SQL Server).

**3. Evasion de Auditoría:**

Si tengo acceso a la base de datos, busco:

- Deshabilitar la auditoría (ALTER SERVER AUDIT).
- Borrar los logs de auditoría (si están en la misma base de datos).
- Usar técnicas de ofuscación de consultas.

**4. Robo de Backups:**

Los backups suelen estar menos protegidos que la base de datos en producción. Busco:

- Archivos .bak en carpetas compartidas.
- Backups en buckets S3 sin cifrar.
- Backups en cintas magnéticas sin cifrado.

## Autoevaluación

Responde estas preguntas para verificar si comprendes los conceptos:

1. El equipo Legal de la empresa prohíbe que el equipo de programadores (Desarrollo) tenga acceso a los números de Seguro Social reales de los clientes mientras hacen pruebas de software. Usando el concepto de "Data Masking", explica como los programadores pueden seguir probando el software sin ver los datos reales.

2. Explica la diferencia entre usar Cifrado en Reposo (TDE) para proteger una Base de Datos contra un robo físico, y usar Enmascaramiento Dinámico de Datos (Masking) para protegerla contra un Insider Threat (Empleado malicioso).

3. Por que es fundamental que la herramienta de Auditoría de Base de Datos (DAM) envíe los logs de monitoreo a un servidor SIEM centralizado de forma inmediata, en lugar de guardar los registros (logs) dentro del mismo servidor de Base de Datos? (Pista: Piensa en el Modo Dios del Administrador).

4. Un atacante logra hacer un ataque exitoso de Inyección SQL desde la pagina web pública, ordenándole a la Base de Datos que extraiga la tabla de "Usuarios". Si el sistema de Base de Datos tiene configurado Dynamic Data Masking para las columnas de Contraseñas y Correos, Que información recibirá el atacante en su pantalla?

5. Por que es peligroso que la aplicación web se conecte a la base de datos con el usuario administrador (sa, root) en lugar de un usuario con permisos limitados?

6. Explica el concepto de segregacion de deberes (SoD) en bases de datos. Da un ejemplo de dos roles que no deberían estar en la misma persona.

7. Un administrador de base de datos consulta la tabla de salarios de empleados a las 2:00 AM desde su casa. Que herramientas permitirian detectar esta actividad como sospechosa?

8. Cual es la diferencia entre la auditoría nativa de SQL Server y una herramienta DAM de terceros? Que ventajas tiene DAM?
