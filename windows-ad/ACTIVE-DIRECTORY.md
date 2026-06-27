---
title: "Active Directory: El Trono de Hierro"
---

# Active Directory: El Trono de Hierro

## Objetivo de esta Guía

Quiero ser honesto contigo desde el principio: Active Directory es el tema más complejo y el más lucrativo que puedes aprender en ciberseguridad corporativa. No es exageración decir que el 90% de los ataques de ransomware que terminan en titulares de noticias involucran a Active Directory de alguna forma. No porque AD sea inseguro, sino porque es el centro de todo. Es el sistema que controla quién tiene acceso a qué en una organización. Si un atacante lo controla, controla la organización entera.

En la guía de fundamentos viste la diferencia entre una isla (Workgroup) y un imperio (Dominio). Esta guía es un mapa detallado del imperio. Vamos a cubrir la arquitectura de Active Directory, el protocolo Kerberos a fondo, las Políticas de Grupo (GPO), las confianzas entre dominios, y los ataques más avanzados que existen. Pero no voy a solo listar conceptos. Te voy a mostrar cómo cada pieza funciona, cómo falla, y cómo un atacante la explota. No saldrás de aquí siendo un experto en AD —eso toma años— pero saldrás sabiendo lo que realmente importa para seguridad.

## Por Qué Existe Active Directory

Imagina que eres el Director de TI de un banco con 5,000 empleados. Llega un nuevo diseñador llamado Juan. Juan necesita acceso a su computadora, a una carpeta compartida de diseños, a la impresora del piso, al sistema de tickets, al correo electrónico, y a la VPN. Sin AD, tendrías que crear una cuenta en cada sistema por separado. Cuando Juan renuncie, tendrías que borrar su cuenta en 6 sistemas distintos. Ahora multiplica eso por 5,000 empleados que entran, rotan de puesto, se van de vacaciones, o son despedidos. Es insostenible.

Active Directory resuelve este problema siendo la fuente única de verdad sobre la identidad. Una cuenta en AD le da a Juan acceso a todo lo que necesita, y cuando esa cuenta se desactiva, pierde acceso a todo simultáneamente. Es el sistema de identidad centralizado del que todos los demás sistemas dependen.

## La Estructura de Active Directory

### Dominios

Es una frontera. Lo que pasa en un dominio, queda en ese dominio... a menos que haya una confianza.

Un Dominio es la unidad administrativa principal en AD. Es un límite de seguridad: los administradores de un dominio tienen control total sobre los objetos dentro de ese dominio, pero no sobre los de otros dominios (a menos que haya una confianza configurada). Es también un límite de replicación: los Controladores de Dominio en un dominio replican información solo entre ellos.

Cada Dominio tiene un nombre DNS único, como `banco.local` o `corp.empresa.com`. Este nombre no solo identifica al dominio, sino que también permite que las computadoras lo encuentren en la red usando DNS. Cuando una laptop se une a un dominio, su configuración DNS apunta a los Controladores de Dominio.

### Árboles y Bosques

Un Árbol es un conjunto de dominios que comparten un namespace DNS contiguo. Por ejemplo: `ventas.empresa.com`, `finanzas.empresa.com`, y `rh.empresa.com` forman un árbol bajo `empresa.com`. La ventaja es que la confianza entre estos dominios es automática y transitiva.

Un Bosque (Forest) es el contenedor más grande en AD. Es un conjunto de árboles que comparten un esquema común (la definición de qué tipos de objetos existen), una configuración global, y un catálogo global. El bosque es el límite de seguridad máximo: los administradores de un bosque no tienen acceso automático a otro bosque.

La razón por la que las empresas terminan con múltiples dominios o bosques suele ser histórica. Una empresa crece por adquisiciones y cada empresa adquirida tenía su propio AD. En lugar de migrar todo (un proceso extremadamente costoso y riesgoso), establecen confianzas entre los dominios. El resultado es una estructura compleja que los atacantes pueden explotar.

### Unidades Organizacionales (OUs)

Las OUs son contenedores dentro de un dominio que permiten organizar objetos (usuarios, computadoras, grupos) de forma jerárquica. Piensa en ellas como carpetas. Un dominio típico podría tener OUs para cada departamento: Ventas, Finanzas, TI, RH. Dentro de Ventas, podría haber OUs para Ventas Nacionales y Ventas Internacionales.

Las OUs son importantes en seguridad porque las GPOs se pueden aplicar a nivel de OU. Esto permite configuraciones diferentes para diferentes departamentos. Por ejemplo: los usuarios de Finanzas pueden tener una política que les impida instalar software, mientras que los de TI tienen más libertad.

### Objetos y Atributos

Todo en AD es un objeto: usuarios, grupos, computadoras, impresoras, carpetas compartidas. Cada objeto tiene atributos. Un usuario tiene atributos como `samAccountName` (el nombre de inicio de sesión clásico), `userPrincipalName` (el email-style login), `givenName`, `sn`, `memberOf`, `lastLogon`, `badPwdCount`, y muchos más.

El atributo `badPwdCount` es particularmente interesante desde la perspectiva de seguridad. Registra cuántas veces un usuario intentó iniciar sesión con una contraseña incorrecta. Si ves `badPwdCount` alto en muchas cuentas, probablemente estás bajo un ataque de pulverización de contraseñas (password spraying).

## LDAP: El Lenguaje del Directorio

Active Directory se puede consultar usando LDAP (Lightweight Directory Access Protocol). LDAP es un protocolo de acceso a directorios que permite leer y escribir objetos en AD. Piensa en LDAP como SQL, pero para un directorio en lugar de una base de datos relacional.

### Cómo Funciona una Consulta LDAP

Un cliente LDAP se conecta al Controlador de Dominio en el puerto 389 (LDAP) o 636 (LDAPS, la versión segura). Envía una consulta que específica:

- **Base DN**: El punto de partida en el árbol del directorio (ej: `DC=empresa,DC=com`).
- **Filtro**: La condición de búsqueda (ej: `(&(objectClass=user)(department=Finanzas))`).
- **Atributos**: Qué atributos devolver (ej: `samAccountName`, `mail`).

### LDAP en Ataques

Los atacantes usan LDAP extensivamente para reconocimiento. Herramientas como `ldapsearch`, `PowerView`, o `BloodHound` hacen consultas LDAP para mapear el dominio. Preguntan cosas como:

- ¿Qué usuarios pertenecen al grupo "Domain Admins"?
- ¿Qué computadoras tienen `operatingSystem` que contiene "Windows 7" (sistemas obsoletos)?
- ¿Qué usuarios tienen el atributo `adminCount` = 1 (usuarios privilegiados)?

Una consulta LDAP inofensiva es simplemente un usuario normal leyendo atributos del directorio. Pero 100 consultas LDAP en un minuto desde una sola máquina es un escaneo de reconocimiento. Los equipos de defensa monitorean los eventos de consulta LDAP (Event ID 4662) para detectar este comportamiento.

## Kerberos en Profundidad

Kerberos es el protocolo de autenticación por defecto en Active Directory desde Windows 2000. Es un protocolo complejo, y entenderlo bien es lo que separa a un analista de seguridad de nivel medio de uno avanzado.

### Los Actores en Kerberos

- **Cliente**: La máquina del usuario que quiere acceder a un recurso.
- **Servicio**: El servidor que ofrece el recurso (archivos, impresoras, base de datos).
- **KDC (Key Distribution Center)**: El Controlador de Dominio que actúa como centro de distribución de claves.
- **AS (Authentication Service)**: Parte del KDC que emite los TGT (Ticket Granting Ticket).
- **TGS (Ticket Granting Service)**: Parte del KDC que emite los tickets de servicio.

### El Flujo de Autenticación Paso a Paso

**Paso 1: AS-REQ (Authentication Service Request)**
Cuando el usuario presiona Ctrl+Alt+Supr e ingresa su contraseña, el cliente Kerberos en su máquina construye un mensaje AS-REQ. Este mensaje contiene el nombre de usuario (en forma de `principalName`) y una marca de tiempo cifrada con un hash derivado de la contraseña del usuario. El propósito de la marca de tiempo es demostrar que conoces la contraseña sin enviarla por la red. Se envía al KDC en el puerto 88.

**Paso 2: AS-REP (Authentication Service Reply)**
El KDC recibe el AS-REQ, busca al usuario en AD, obtiene su hash de contraseña (derivado de la contraseña almacenada), e intenta descifrar la marca de tiempo. Si descifra correctamente, sabe que el usuario conocía la contraseña. Entonces construye un AS-REP que contiene:

- Un TGT (Ticket Granting Ticket) cifrado con la contraseña de la cuenta KRBTGT. Este ticket contiene el SID del usuario, los grupos a los que pertenece, y una marca de tiempo de expiración.
- Una clave de sesión cifrada con la contraseña del usuario.

El cliente recibe esto, descifra la clave de sesión usando su contraseña, y almacena el TGT en la memoria (no en disco) de su sesión actual.

**Paso 3: TGS-REQ (Ticket Granting Service Request)**
Cuando el usuario quiere acceder a un recurso (ej: un servidor de archivos llamado `fileserver01`), el cliente envía un TGS-REQ al KDC. Este mensaje contiene:

- El TGT obtenido en el paso anterior (para probar que ya estamos autenticados).
- El nombre del servicio al que quiere acceder (ej: `cifs/fileserver01.empresa.com`).
- Un autenticador cifrado con la clave de sesión.

**Paso 4: TGS-REP (Ticket Granting Service Reply)**
El KDC verifica el TGT (lo descifra con la contraseña de KRBTGT), extrae la clave de sesión, descifra el autenticador, y si todo coincide, genera un ticket de servicio. Este ticket está cifrado con la contraseña de la cuenta del servidor destino (`fileserver01`). El ticket contiene el SID del usuario y sus grupos. El KDC devuelve también una clave de sesión para el servicio, cifrada con la clave de sesión original.

**Paso 5: AP-REQ (Application Request)**
El cliente envía el ticket de servicio al servidor destino (`fileserver01`), junto con un autenticador cifrado con la clave de sesión del servicio. El servidor descifra el ticket (usando su propia contraseña), extrae la clave de sesión, descifra el autenticador, y verifica que el ticket no haya expirado. Si todo está bien, el servidor concede acceso al recurso.

### El PAC (Privilege Attribute Certificate)

Dentro del ticket de servicio hay una estructura llamada PAC. El PAC contiene los privilegios del usuario: su SID, los SIDs de los grupos a los que pertenece, y sus derechos. El servidor revisa el PAC para determinar si el usuario tiene permiso para acceder al recurso.

Históricamente, el PAC tenía una vulnerabilidad conocida como MS14-068. Un atacante podía modificar el PAC de un ticket para incluir SIDs de grupos privilegiados. Microsoft parcheó la validación del PAC, pero hay versiones antiguas de Windows que siguen siendo vulnerables. Los atacantes aún prueban este ataque en entornos que no están actualizados.

### Delegación Kerberos

La delegación permite que un servicio actúe en nombre de un usuario. Por ejemplo: un servidor web que necesita acceder a una base de datos en nombre del usuario autenticado. El servidor web pide al KDC un ticket para la base de datos usando la identidad del usuario.

Hay tres tipos de delegación:

**Delegación No Restringida (Unconstrained Delegation)**: El servidor puede pedir tickets para cualquier otro servicio en nombre del usuario. Es peligroso porque si el servidor está comprometido, el atacante puede obtener tickets para cualquier recurso. Los atacantes buscan computadoras con delegación no restringida usando herramientas como BloodHound.

**Delegación Restringida (Constrained Delegation)**: El servidor solo puede pedir tickets para servicios específicos. Es más seguro pero la configuración es compleja y propensa a errores.

**Delegación Basada en Recursos (Resource-Based Delegation, RBCD)**: El recurso destino (el servidor de archivos, por ejemplo) específica qué cuentas pueden delegar en su nombre. Es el modelo más moderno y seguro, introducido en Windows Server 2012.

### Modos de Falla de Kerberos

- **Desincronización de reloj**: Si el reloj del cliente difiere más de 5 minutos del KDC, las marcas de tiempo fallan. Los atacantes a veces manipulan el reloj de una máquina para forzar fallos de autenticación y que el sistema caiga a NTLM (más vulnerable).
- **Expiración de tickets por defecto de 10 horas. Un ticket robado es válido hasta que expire.
- **Renovación de tickets**: Los TGT se renuevan silenciosamente mientras el usuario tenga sesión activa. Esto significa que un ataque Pass-the-Ticket puede extenderse más allá de las 10 horas si la sesión permanece activa.
- **Fallos de DNS**: Kerberos usa nombres DNS para identificar servicios. Si DNS falla, Kerberos falla.

## NTLM: El Protocolo de Respaldo

NTLM sigue presente en todas las redes Windows por compatibilidad con sistemas antiguos. Cuando Kerberos falla (por ejemplo, si el cliente se conecta por IP en lugar de nombre DNS, o si el servidor no está en el dominio), Windows automáticamente cae a NTLM.

### El Flujo NTLM

1. El cliente envía una solicitud de conexión al servidor.
2. El servidor responde con un número aleatorio de 8 bytes (el desafío).
3. El cliente cifra el desafío con el hash NTLM de su contraseña y lo devuelve.
4. El servidor envía el desafío original y la respuesta del cliente al Controlador de Dominio.
5. El Controlador de Dominio hace el mismo cálculo y compara resultados.

### La Vulnerabilidad de NTLM Relay

NTLM no autentica al servidor. El cliente no puede verificar que el servidor es quien dice ser. Un atacante puede interceptar la autenticación NTLM y retransmitirla a otro servidor. Por ejemplo:

- El atacante configura un servidor malicioso que pide autenticación NTLM.
- La víctima se conecta al servidor malicioso (por ejemplo, haciendo clic en un enlace de un correo de phishing).
- El servidor malicioso retransmite los paquetes NTLM al servidor de archivos legítimo.
- El servidor de archivos legítimo cree que la víctima se está autenticando directamente y le concede acceso.

Este ataque funciona incluso si la víctima tiene una cuenta sin privilegios, porque el relay ocurre a nivel de red y el token de acceso se transfiere completo.

### Protecciones contra NTLM Relay

Microsoft introdujo "EPA (Extended Protection for Authentication)" y "Channel Binding" para mitigar estos ataques. También recomienda deshabilitar NTLM donde sea posible. Pero en la práctica, muchas aplicaciones legacy requieren NTLM, y las empresas lo mantienen activo.

## GPO: Las Leyes del Imperio

Las Políticas de Grupo (Group Policy Objects) son el mecanismo de configuración centralizada en Active Directory. Piensa en ellas como las leyes que el gobierno central envía a todas las provincias. Una GPO es un conjunto de configuraciones que se aplican a usuarios y computadoras.

### Cómo se Aplican las GPOs

Cuando una computadora se enciende, descarga la lista de GPOs que le aplican (basadas en su ubicación en la OU y en los filtros de seguridad). Aplica las configuraciones en este orden:

1. **Local**: La política de la máquina local (la más débil).
2. **Sitio**: Políticas vinculadas al sitio de AD (ubicación física).
3. **Dominio**: Políticas vinculadas al dominio entero.
4. **OU**: Políticas vinculadas a la OU (y a las OUs padre, en orden jerárquico).
5. **OU hijo**: Las políticas más cercanas al objeto tienen prioridad.

La regla general: "Último que escribe, gana". Si hay conflictos, la política de la OU más específica tiene prioridad sobre la del dominio.

### Seguridad en GPO

Hay dos filtros importantes en las GPO:

- **Filtro de seguridad**: Por defecto, las GPOs se aplican a "Usuarios Autenticados" (todos). Se puede restringir para que solo ciertos grupos reciban la política.
- **Filtro WMI**: Permite aplicar la política solo si se cumple una condición. Por ejemplo: "solo si el sistema operativo es Windows 10".

### Abuso de GPOs por Atacantes

Si un atacante obtiene privilegios para modificar GPOs (por ejemplo, comprometiendo una cuenta del grupo "Group Policy Creator Owners"), puede:

1. Crear una GPO que deshabilite el antivirus en todas las máquinas.
2. Crear una GPO que agregue una tarea programada maliciosa.
3. Crear una GPO que configuré un servidor proxy malicioso para interceptar tráfico.
4. Crear una GPO que otorgue permisos administrativos locales a un usuario específico.

Lo más peligroso: el atacante no necesita tener acceso directo a cada máquina. La política se propaga automáticamente. Y como las GPOs se almacenan en SYSVOL (una carpeta compartida en los Controladores de Dominio), el atacante puede incluso modificar los archivos de política directamente si tiene acceso de escritura a SYSVOL.

## Confianzas Entre Dominios

Las confianzas (trusts) permiten que usuarios de un dominio accedan a recursos en otro dominio. Son necesarias en organizaciones con múltiples dominios o después de adquisiciones.

### Tipos de Confianza

- **Direccional**: Unidireccional (Dominio A confía en Dominio B, pero B no confía en A). Como una puerta que solo se abre de un lado.
- **Transitiva**: Si A confía en B y B confía en C, entonces A confía en C. Las confianzas dentro de un bosque son transitivas por defecto.
- **No transitiva**: La confianza solo existe entre los dos dominios específicos. Común en confianzas externas (con dominios fuera del bosque).
- **De bosque**: Permite acceso entre dos bosques completos. Puede ser transitiva o no.

### SID Filtering

Cuando se establece una confianza, el dominio de origen puede filtrar SIDs para evitar que un administrador del dominio confiado eleve sus privilegios en el dominio confiador. Sin este filtro, un administrador del dominio A podría agregar un SID de "Domain Admins" a su token y acceder al dominio B como administrador.

### Ataques a Través de Confianzas

Las confianzas son vectores de ataque en expansión. Si un atacante compromete un dominio, puede usar la confianza para moverse al siguiente dominio. La técnica se llama "SID History Abuse" o "Trust Attack".

Un caso real: el ransomware "NotPetya" usó confianzas de dominio para propagarse. Una vez que comprometía un dominio, usaba herramientas de administración remota para saltar a los dominios confiados, infectando toda la organización.

## Ataques Avanzados a Active Directory

### Kerberoasting

Este ataque explota cómo Kerberos maneja las cuentas de servicio. Las cuentas de servicio (como "sqlservice", "iis_service", etc.) tienen contraseñas que, por razones históricas, suelen ser débiles y rara vez se cambian.

El ataque:

1. Cualquier usuario autenticado en el dominio puede solicitar un ticket de servicio (TGS) para cualquier cuenta de servicio.
2. El TGS está cifrado con la contraseña de la cuenta de servicio.
3. El atacante descarga el TGS y lo almacena en su máquina.
4. Fuera de línea, el atacante prueba contraseñas contra ese ticket. Si la contraseña es correcta, el ticket se descifra.

La detección de Kerberoasting es difícil porque la solicitud de TGS es una operación legítima. El indicador principal es un volumen inusualmente alto de solicitudes de TGS desde una sola máquina. El Event ID 4769 registra cada solicitud de ticket de servicio.

### AS-REP Roasting

Similar al Kerberoasting, pero para cuentas de usuario que tienen deshabilitada la pre-autenticación de Kerberos. Esta configuración existe para compatibilidad con aplicaciones antiguas. Si está deshabilitada, un atacante puede enviar un AS-REQ para esa cuenta sin necesidad de conocer la contraseña, y el KDC le devolverá un AS-REP que contiene datos cifrados con la contraseña del usuario. El atacante descarga estos datos y los descifra offline.

### DCSync

Este es uno de los ataques más devastadores en AD. Requiere que el atacante tenga permisos de "Replicación de Directorio" (que normalmente tienen los Controladores de Dominio, pero también pueden tenerlos cuentas con permisos especiales).

El atacante se hace pasar por un Controlador de Dominio y solicita la replicación de datos de contraseñas desde el Controlador de Dominio legítimo. El protocolo de replicación de AD no verifica si el solicitante es realmente un DC o solo una máquina que solicita replicación. Si la cuenta tiene los permisos adecuados, el DC legítimo le entrega todos los hashes de todas las cuentas del dominio.

La protección contra DCSync es monitorear los Event ID 4662 (acceso a un objeto de directorio) en los que el objeto accedido sea el del NC (Naming Context) del dominio y el acceso sea "Control de Replicación". Microsoft también recomienda proteger las cuentas con privilegios de replicación con cuentas de servicio administradas (gMSA).

### Golden Ticket

El ataque del Golden Ticket es el más famoso de AD. Una vez que un atacante compromete el Controlador de Dominio y extrae el hash de la cuenta KRBTGT, puede crear TGTs falsos para cualquier usuario, incluyendo "Administrator", con cualquier membresía de grupo.

El hash KRBTGT se usa para firmar todos los TGTs en el dominio. Con ese hash, el atacante puede crear un TGT que diga "Yo soy el Administrador del Dominio, y pertenezco a Domain Admins, Enterprise Admins, y Schema Admins". El KDC no puede distinguir este TGT falso de uno real porque está correctamente cifrado con la clave KRBTGT.

Lo peor del Golden Ticket:
- Es válido hasta que la contraseña de KRBTGT se cambie dos veces (por razones de replicación).
- No requiere conexión al Controlador de Dominio para usarse (el atacante ya tiene el hash, no necesita preguntarle a nadie).
- Puede tener cualquier expiración que el atacante desee.

### Silver Ticket

Similar al Golden Ticket, pero para servicios específicos. En lugar de forjar un TGT, el atacante forja un ticket de servicio para un servicio concreto. El atacante necesita el hash de la cuenta del servicio (no el de KRBTGT). Es más fácil de obtener (cualquier cuenta de servicio comprometida sirve) pero solo da acceso al servicio específico.

Un Silver Ticket para el servicio `cifs/servidor` permite acceder al sistema de archivos de ese servidor. Un Silver Ticket para `http/servidor` permite acceso al IIS. Los Silver Tickets son más difíciles de detectar porque el Controlador de Dominio no está involucrado en la validación.

### Abuso de ACL en AD

Active Directory permite permisos muy granulares sobre objetos. Por ejemplo, se puede dar permiso a un usuario para "Restablecer contraseña" de otro usuario, o para "Agregar miembro" a un grupo. Estos permisos a veces se configuran incorrectamente.

Un atacante usa herramientas como BloodHound para mapear estas relaciones. BloodHound consulta AD y construye un grafo que muestra:

- Qué usuarios pueden leer la contraseña de qué otros usuarios (via "GenericAll" o "AllExtendedRights").
- Qué usuarios pueden agregar miembros a grupos privilegiados.
- Qué máquinas permiten delegación no restringida.
- Qué grupos tienen sesiones activas de usuarios privilegiados.

Un camino típico de ataque: Usuario A tiene permiso "ForceChangePassword" sobre Usuario B. Usuario B es miembro de "Backup Operators". Backup Operators tiene permiso para hacer backup de los archivos del Controlador de Dominio, incluyendo NTDS.dit. El atacante cambia la contraseña de A a B, se conecta como B, hace backup de NTDS.dit, extrae todos los hashes, y tiene el dominio completo.

### SMB Relay y Responder

El ataque de relay más común usa la herramienta Responder. Responder escucha en la red y responde a solicitudes de resolución de nombres, haciéndose pasar por un servidor legítimo. Cuando una víctima intenta conectarse a un recurso de red, Responder captura la autenticación NTLM y la retransmite al servidor objetivo.

La mitigación principal: habilitar la firma SMB (SMB Signing) en todos los sistemas. Sin firma SMB, el relay es trivial. Con firma SMB, el relay es mucho más difícil porque cada mensaje debe estar firmado.

## Modos de Falla de Active Directory

### Falla de Replicación (USN Rollback)

Cuando un Controlador de Dominio se restaura desde un respaldo antiguo, sus números de secuencia de actualización (USN) pueden retroceder. Esto confunde a los otros DCs, que piensan que los cambios recientes ya se replicaron. El resultado: objetos que deberían estar actualizados quedan en un estado inconsistente. Microsoft recomienda no restaurar nunca un DC desde un respaldo sin seguir procedimientos específicos.

### Pérdida de Roles FSMO

Los roles FSMO (Flexible Single Master Operations) son roles especiales que solo un DC puede tener a la vez. Hay cinco roles:

- Schema Master (controla la estructura del directorio).
- Domain Naming Master (controla la adición/eliminación de dominios).
- PDC Emulator (actúa como servidor NT 4.0, maneja cambios de contraseña).
- RID Master (asigna identificadores únicos a objetos nuevos).
- Infrastructure Master (actualiza referencias entre objetos).

Si el DC que tiene el rol PDC Emulator falla y no se transfiere el rol, los cambios de contraseña de todo el dominio dejan de funcionar. Los usuarios no pueden cambiar sus contraseñas, y las cuentas caducan sin posibilidad de renovación.

### Tombstone Lifetime

Cuando un objeto se elimina en AD, no se borra inmediatamente. Se convierte en un "tombstone" (un marcador de objeto eliminado) que persiste por un período configurable (default 180 días). Si un DC está offline por más tiempo que el tombstone lifetime y luego se reconecta, no puede replicarse correctamente porque los cambios que necesita ya se eliminaron. El DC debe ser forzado a una reinstalación limpia.

### Falla de Catálogo Global

El Catálogo Global (Global Catalog) es un índice de todos los objetos en el bosque. Permite a los usuarios buscar recursos en todo el bosque sin consultar cada dominio individualmente. Si el servidor de Catálogo Global falla, las autenticaciones de usuarios de otros dominios fallan, y las búsquedas de recursos no funcionan.

## El Ángulo del Hacker en Active Directory

Aquí tienes las estrategias que los atacantes usan para comprometer AD, resumidas:

### Reconocimiento
- Consultar LDAP para mapear usuarios, grupos, computadoras, y relaciones.
- Ejecutar BloodHound para encontrar caminos de ataque.
- Enumerar GPOs para encontrar configuraciones débiles.
- Identificar cuentas de servicio con contraseñas que nunca expiran.

### Acceso Inicial
- Phishing para obtener credenciales de un empleado.
- Explotar una vulnerabilidad en un servidor expuesto a internet.
- Comprar credenciales en foros de la dark web.
- Usar ataques de fuerza bruta contra cuentas sin protección de MFA.

### Escalada de Privilegios
- Kerberoasting para obtener contraseñas de cuentas de servicio.
- AS-REP Roasting para cuentas sin pre-autenticación.
- Abuso de ACL para modificar pertenencias a grupos privilegiados.
- Explotar delegación no restringida para obtener tickets de otros usuarios.

### Movimiento Lateral
- Pass-the-Hash para autenticarse como otro usuario.
- Pass-the-Ticket para reutilizar tickets Kerberos robados.
- SMB Relay para capturar y retransmitir autenticaciones.
- Uso de herramientas como PsExec, WinRM, o SchTasks para ejecutar comandos remotos.

### Persistencia
- Crear una cuenta de administrador oculta.
- Modificar la membresía de grupos privilegiados.
- Deshabilitar la auditoría en eventos específicos.
- Instalar un servicio malicioso con reinicio automático.

### Objetivo Final
- DCSync para extraer todos los hashes del dominio.
- Golden Ticket para tener acceso indefinido.
- Desplegar ransomware en todas las máquinas mediante GPO.
- Exfiltrar datos de bases de datos, correos, y archivos compartidos.

## Read-Only Domain Controllers (RODC)

En entornos con sucursales remotas que no tienen seguridad física adecuada (como tiendas minoristas, almacenes o kioskos), Microsoft recomienda usar RODC. Un RODC es un Controlador de Dominio que:

- No almacena contraseñas de usuarios (excepto las de un grupo específico, "Allowed RODC Password Replication Group").
- No permite modificaciones al directorio.
- Tiene una base de datos NTDS de solo lectura.

El RODC es útil porque si un atacante roba físicamente un RODC, la exposición es limitada: solo las contraseñas de las cuentas configuradas explícitamente para replicarse están comprometidas. Sin embargo, los RODC tienen su propio vector de ataque: el atacante puede robar el RODC, extraer el hash de la cuenta KRBTGT del RODC (que es diferente al KRBTGT del dominio), y usar ese hash para forjar tickets para los usuarios cuyas contraseñas están almacenadas en el RODC.

## Group Managed Service Accounts (gMSA)

Históricamente, las cuentas de servicio en AD eran un problema de seguridad: contraseñas largas que nunca se cambiaban, almacenadas en scripts o archivos de configuración. Si un atacante comprometía una cuenta de servicio, tenía acceso persistente hasta que alguien manualmente cambiará la contraseña.

Microsoft introdujo las Managed Service Accounts (MSA) y luego las Group Managed Service Accounts (gMSA) para resolver esto. Una gMSA es una cuenta de dominio cuya contraseña es administrada automáticamente por AD. La contraseña es larga, compleja, y se rota periódicamente. Las computadoras autorizadas pueden recuperar la contraseña actual del AD sin necesidad de que un administrador la conozca.

Desde la perspectiva de seguridad, las gMSA eliminan el riesgo de contraseñas de servicio estáticas, pero introducen un nuevo vector: si un atacante compromete una computadora autorizada a usar una gMSA, puede recuperar la contraseña actual de esa cuenta y usarla para autenticarse como el servicio. La detección de este abuso requiere monitorear los eventos de acceso a gMSA (Event ID 4662 con acceso a objetos msDS-ManagedPassword).

## Local Administrator Password Solution (LAPS)

Uno de los problemas más comunes en entornos AD es que todas las computadoras tienen la misma contraseña de administrador local. Esto es porque las imágenes de sistema se clonan y la contraseña local se replica. Si un atacante obtiene la contraseña de administrador local de una máquina, puede acceder a todas las máquinas del mismo tipo.

LAPS resuelve esto almacenando una contraseña única para el administrador local de cada computadora en AD, y rotándola periódicamente. Cada máquina tiene su propia contraseña, almacenada como un atributo del objeto computadora en AD. Solo los usuarios autorizados pueden leer este atributo.

LAPS es una de las medidas de seguridad más efectivas y fáciles de implementar en AD. Sin embargo, su implementación incorrecta (por ejemplo, dando permiso de lectura del atributo LAPS a todos los usuarios del dominio) puede anular su beneficio.

## Criterio de Dominio: Autoevaluación

Estas preguntas asumen que ya leíste y procesaste toda la guía. Son preguntas de síntesis, no de memoria.

1. Un atacante compromete una cuenta de usuario estándar en el dominio. Sin escalar privilegios, ¿qué información sensible de AD puede obtener este atacante solo con consultas LDAP? ¿Puede saber qué usuarios son administradores? ¿Puede obtener los hashes de contraseñas?

2. Explica la diferencia técnica entre Pass-the-Hash y Pass-the-Ticket. ¿En qué capa del protocolo de autenticación opera cada uno? ¿Cuál es más detectable y por qué?

3. Un administrador de TI crea una cuenta de servicio llamada `svc_backup` con una contraseña de 8 caracteres que nunca expira. ¿Qué ataques específicos puede ejecutar un atacante contra esta cuenta? Describe el proceso paso a paso.

4. Durante un pentest, encuentras que un usuario tiene el permiso "GenericAll" sobre una OU que contiene la cuenta de un administrador del dominio. Explica cómo explotarías este hallazgo para convertirte en administrador del dominio. ¿Qué herramienta usarías para descubrir este camino?

5. Una empresa adquiere otra y establece una confianza transitiva bidireccional entre los bosques. ¿Qué riesgos de seguridad introduce esta confianza? ¿Qué ataques específicos podría realizar un atacante que comprometa el bosque adquirido?

6. Explica por qué un Golden Ticket es más peligroso que un DCSync desde la perspectiva de persistencia. ¿Cuál de los dos requiere conexión al Controlador de Dominio y cuál no? ¿Cuál es más fácil de detectar?

7. El equipo de seguridad detecta múltiples Event ID 4769 desde una sola estación de trabajo hacia múltiples cuentas de servicio en un período corto de tiempo. ¿Qué está ocurriendo? ¿Es evidencia concluyente de un ataque Kerberoasting o podría haber una explicación legítima?

8. En una auditoría, descubres que 50 computadoras en el dominio tienen delegación no restringida configurada. Explica por qué esto es riesgoso y describe un ataque que aproveche esta configuración. ¿Qué métrica de mitigación recomendarías?

### Preguntas de Escenario Avanzado

9. Durante un pentest, encuentras que la organización usa RODC en una sucursal remota. Logras acceso físico al RODC y extraes su base de datos NTDS. La cuenta KRBTGT del RODC es diferente a la del dominio. ¿Puedes crear un Golden Ticket para todo el dominio con este hash? Explica qué limitaciones tiene y qué puedes hacer realmente.

10. Un administrador implementa LAPS pero configura los permisos del atributo `ms-Mcs-AdmPwd` para que sea legible por "Usuarios Autenticados". Explica por qué esto anula el propósito de LAPS y qué puede hacer un atacante con esta información. ¿Cómo detectarías este error de configuración?

11. Una empresa usa gMSA para su servicio SQL Server. Un atacante compromete el servidor SQL y obtiene la contraseña actual de la gMSA desde AD. El administrador cambia la contraseña de la gMSA manualmente (algo que no debería hacer, pero lo hace). Explica qué pasa con los servicios que dependen de esa gMSA y cómo este error de administración puede causar una denegación de servicio.

12. Explica la relación entre la cuenta KRBTGT, el ataque Golden Ticket, y el cambio de contraseña de KRBTGT. Microsoft recomienda cambiar la contraseña de KRBTGT dos veces en un período corto después de un compromiso. ¿Por qué dos veces? ¿Qué pasa si solo se cambia una vez?
