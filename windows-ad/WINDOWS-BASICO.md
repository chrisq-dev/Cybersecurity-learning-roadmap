---
title: "Windows Básico: Las Catacumbas del Sistema"
level: "inicial"
content_type: "guia"
updated: "2026-06-29"
---

# Windows Básico: Las Catacumbas del Sistema

## Objetivo de esta Guía

Cuando un usuario normal tiene un problema en Windows, lo más avanzado que hace es abrir el Administrador de Tareas o, si se siente valiente, busca "solucionar problemas" en el Panel de Control. Cuando un malware tiene un problema en Windows, excava en los rincones más profundos del sistema para asegurarse de sobrevivir incluso si el usuario formatea el disco. Esa diferencia de profundidad es lo que separa a un profesional de seguridad de un usuario avanzado.

Esta guía cubre los tres pilares que cualquier atacante o defensor debe conocer a fondo del sistema operativo Windows: el Registro, el sistema de permisos NTFS, y los procesos y servicios del sistema. No cubre todo Windows, sino lo que realmente importa en seguridad: dónde se esconden los atacantes, cómo persisten y cómo el sistema operativo puede ser explotado sin detectarlo.

## El Registro de Windows

Si abres el menú Inicio y escribes `regedit`, entras al Editor del Registro. Parece una aplicación aburrida llena de carpetas con nombres crípticos. Es, en realidad, la base de datos central de Windows. Todo lo que eres como máquina está ahí: tu configuración de red, las aplicaciones instaladas, las asociaciones de archivos, las políticas de seguridad, los secretos criptográficos, y las preferencias de cada usuario que haya iniciado sesión.

Linux distribuye su configuración en archivos de texto dentro de `/etc`. Windows concentra todo en una sola base de datos jerárquica. Esto tiene ventajas y desventajas. La ventaja principal es que hay un solo lugar para auditar. La desventaja es que si un atacante escribe en el lugar correcto, puede controlar toda la máquina con una sola entrada.

### La Estructura del Registro

Windows no usa archivos de configuración como Linux. Todo está en una base de datos gigante llamada Registro. Y ahí se esconden los atacantes.

El Registro se organiza en colmenas (hives), que son archivos físicos almacenados en el disco. Cuando abres regedit, ves cinco colmenas principales, aunque solo dos existen realmente como archivos; las otras son vistas o enlaces simbólicos.

- **HKEY_LOCAL_MACHINE (HKLM)**: Es la colmena de la máquina. Contiene configuraciones que afectan a todos los usuarios. Su archivo físico está en `%SystemRoot%\System32\config\`. Dentro de HKLM, la subcolmena `SAM` contiene las contraseñas locales de la máquina. El acceso está restringido incluso para el administrador en ejecución normal.

- **HKEY_CURRENT_USER (HKCU)**: Es un enlace al perfil del usuario que inició sesión actualmente. Apunta a `HKU\<SID del usuario>`. Su archivo físico es `NTUSER.DAT` dentro del perfil del usuario. Cada usuario tiene el suyo, y solo se carga cuando el usuario inicia sesión.

- **HKEY_USERS (HKU)**: Contiene las colmenas de todos los usuarios que han iniciado sesión en la máquina (incluyendo servicios del sistema).

- **HKEY_CLASSES_ROOT (HKCR)**: Es una composición de `HKLM\Software\Classes` y `HKCU\Software\Classes`. Define qué aplicación abre cada tipo de archivo. Por ejemplo, que los `.txt` se abran con el Bloc de Notas.

- **HKEY_CURRENT_CONFIG (HKCC)**: Es un enlace a `HKLM\SYSTEM\CurrentControlSet\Hardware Profiles\Current`. Contiene información del perfil de hardware actual.

### Valores y Tipos de Datos

Cada clave del Registro puede tener múltiples valores. Los tipos más comunes en seguridad:

- `REG_SZ`: Una cadena de texto simple. Las rutas de ejecución automática suelen ser de este tipo.
- `REG_DWORD`: Un número de 32 bits. Se usa para valores booleanos (1 o 0) y configuraciones numéricas.
- `REG_BINARY`: Datos binarios. El archivo SAM almacena los hashes en formato binario dentro del Registro.
- `REG_EXPAND_SZ`: Una cadena con variables de entorno expandibles, como `%SystemRoot%\cmd.exe`.
- `REG_MULTI_SZ`: Varias cadenas en un solo valor.

### Persistencia a Través del Registro

El uso más peligroso del Registro desde la perspectiva de seguridad es la persistencia. Un atacante que logra ejecutar código en una máquina necesita asegurarse de que su código se ejecute cada vez que la máquina se reinicia. El Registro ofrece docenas de ubicaciones para lograr esto. Las más conocidas:

- `HKLM\Software\Microsoft\Windows\CurrentVersion\Run`: Ejecuta programas al inicio para todos los usuarios.
- `HKCU\Software\Microsoft\Windows\CurrentVersion\Run`: Ejecuta programas al inicio solo para el usuario actual.
- `HKLM\Software\Microsoft\Windows\CurrentVersion\RunOnce`: Ejecuta programas una sola vez al próximo inicio y luego se borra la entrada.
- `HKLM\Software\Microsoft\Windows NT\CurrentVersion\Winlogon\Userinit`: Específica qué programas se ejecutan después de que un usuario inicia sesión. Históricamente abusado por malware.
- `HKLM\System\CurrentControlSet\Services`: Cada servicio registrado aquí se inicia automáticamente según su configuración. Un atacante puede registrar un servicio malicioso.

He visto casos donde el atacante escribe su persistencia en `RunOnce` con un nombre que imita una actualización legítima de Windows, como `MicrosoftEdgeUpdateTask`. Los usuarios y los antivirus básicos no lo cuestionan.

### Registro y UAC

El Control de Cuentas de Usuario (UAC) es un mecanismo de seguridad que limita los privilegios incluso para cuentas administrativas. Cuando un administrador inicia sesión, recibe dos tokens: uno con privilegios completos y otro filtrado (sin privilegios de administrador). Las aplicaciones se ejecutan con el token filtrado a menos que explícitamente soliciten elevación (el cartel "¿Quieres permitir que esta aplicación haga cambios en tu dispositivo?").

Los atacantes han encontrado formas de evadir UAC. Una técnica clásica: modificar el Registro en `HKCU\Software\Classes\ms-settings\Shell\Open\command` para que, cuando se ejecute una aplicación firmada de Microsoft que solicita elevación automática (como el panel de configuración de Windows), se ejecute código malicioso en su lugar con privilegios elevados. Esto se llama "UAC Bypass" y hay docenas de variantes documentadas.

UAC no es un muro infranqueable. Es una barrera que detiene a usuarios descuidados y malware básico. Un atacante decidido la evita.

### Modos de Falla del Registro

El Registro es frágil. Un valor incorrecto puede dejar el sistema inestable o imposible de iniciar. Los administradores con experiencia siempre hacen respaldo del Registro antes de modificarlo manualmente, usando `reg export` o la opción de exportar desde regedit. Los atacantes a veces rompen el sistema sin querer al modificar valores incorrectos, lo que genera ruido que los equipos de seguridad pueden detectar.

Otro problema común es la fragmentación del Registro con el tiempo, que ralentiza el acceso y los tiempos de inicio. En máquinas con años de uso, una colmena muy grande puede causar que los perfiles de usuario tarden en cargar.

La corrupción del archivo de colmena es otro modo de falla. Si el disco se corrompe o el sistema se apaga durante una escritura en el Registro, la colmena puede quedar inconsistente. Windows tiene mecanismos de recuperación con respaldos automáticos, pero no siempre funcionan.

La fragmentación del Registro también es un problema. Con el tiempo, el Registro crece y se fragmenta, ralentizando el acceso. En máquinas muy antiguas, una colmena de gran tamaño puede causar tiempos de inicio largos o fallos al cargar perfiles de usuario.

### Persistencia Más Allá del Registro

Aunque el Registro es el lugar más común para persistencia, los atacantes usan otros mecanismos:

**Tareas Programadas (Task Scheduler)**: Permiten ejecutar código en horarios específicos o en respuesta a eventos (inicio de sesión,bloqueo de estación). Un atacante crea una tarea que se ejecuta cada vez que un usuario inicia sesión, ejecutando un payload en memoria. Las tareas programadas son difíciles de distinguir de las legítimas porque Windows y las aplicaciones crean decenas de ellas.

**WMI Event Subscription**: Windows Management Instrumentation (WMI) permite suscribirse a eventos del sistema. Un atacante puede crear una suscripción WMI que ejecute un script cada vez que ocurra un evento específico, como el inicio del sistema. Es extremadamente sigilosa porque no crea un archivo .exe ni una entrada en el registro Run. Se almacena en la base de datos WMI y no es visible en herramientas de administración tradicionales.

**COM Hijacking**: Windows usa el modelo de objetos componente (COM) para que las aplicaciones se comuniquen entre sí. Cuando una aplicación solicita un objeto COM, Windows busca en el Registro la implementación de ese objeto. Un atacante puede modificar el Registro para que, cuando una aplicación legítima solicite un objeto COM, se cargue una DLL maliciosa en su lugar.

**Bootkit y Rootkit**: Algunos malware modifican el Master Boot Record (MBR) o el Unified Extensible Firmware Interface (UEFI) para ejecutarse antes que el sistema operativo. Estos son los más difíciles de detectar y eliminar porque el malware se carga antes que el antivirus.

**Tareas Programadas**: El Programador de Tareas permite ejecutar código en horarios específicos o en respuesta a eventos. Los atacantes crean tareas que se ejecutan al iniciar sesión o al desbloquear la estación de trabajo. Las tareas son difíciles de distinguir de las legítimas porque Windows y las aplicaciones crean muchas de ellas.

## Permisos NTFS

Los permisos en Windows son radicalmente diferentes a los de Linux. Linux usa el modelo simple de `rwx` para dueño, grupo y otros. Windows usa Listas de Control de Acceso (ACLs) que permiten granularidad extrema. No es mejor ni peor, es más complejo, y esa complejidad introduce vectores de ataque únicos.

### Las Reglas de las ACLs

Cada archivo y carpeta en NTFS tiene una ACL (Access Control List) que contiene Entradas de Control de Acceso (ACEs). Cada ACE específica:

- Un usuario o grupo (el "principal").
- Un permiso (Lectura, Escritura, Modificar, Control Total, etc.).
- Un tipo (Permitir o Denegar).

La diferencia clave con Linux: en Linux, si no tienes permiso, punto. En Windows, puedes tener permiso para leer un archivo pero no para borrarlo. Puedes tener permiso para crear archivos en una carpeta pero no para listar su contenido. Esto permite configuraciones muy finas, pero también genera confusiones cuando los permisos se heredan o se superponen.

### Herencia de Permisos

Por defecto, las carpetas heredan los permisos de su carpeta padre. Si le das permiso de Lectura a "Todos" en la carpeta C:\, todos los archivos dentro heredan ese permiso. Esto es práctico pero peligroso: si alguien cambia los permisos de una carpeta raíz, puede exponer accidentalmente todo el árbol.

La herencia se puede romper explícitamente. Un administrador puede establecer "Permisos Especiales" en una subcarpeta que reemplacen a los del padre. Los atacantes buscan estas rupturas de herencia porque a menudo indican carpetas que contienen información sensible que alguien intentó proteger, pero quizás mal.

### Permisos Compartidos vs Permisos NTFS

Hay una confusión clásica entre permisos NTFS y permisos de recurso compartido (Share). Los recursos compartidos de red tienen sus propios permisos que actúan como filtro adicional. El permiso efectivo es siempre el más restrictivo entre el permiso NTFS y el permiso de recurso compartido. Un atacante que encuentra un recurso compartido con permisos abiertos ("Todos: Control Total") pero NTFS restrictivos, no puede hacer mucho. Pero si encuentra el caso inverso, puede acceder a archivos que no debería.

### El Usuario SYSTEM

Esta es una de las confusiones más grandes que veo en estudiantes nuevos. Linux tiene `root`. Windows tiene el grupo `Administradores`. Pero el Administrador de Windows NO es el ser más poderoso del sistema. Ese título le pertenece a `NT AUTHORITY\SYSTEM`.

SYSTEM es la cuenta que el propio sistema operativo usa para funcionar. Es la cuenta bajo la cual corren los servicios críticos del sistema. Tiene acceso absoluto a todo, incluyendo el archivo SAM que contiene los hashes de las contraseñas locales. Un administrador normal, incluso con la cuenta `Administrator`, no puede leer el archivo SAM mientras está en uso porque SYSTEM lo mantiene bloqueado.

El objetivo de un atacante cuando compromete una máquina no es volverse Administrador. Es engañar al sistema para ejecutar código como SYSTEM. Esto se logra explotando vulnerabilidades de escalada de privilegios, como servicios mal configurados que corren como SYSTEM pero permiten manipulación por parte de usuarios sin privilegios.

### Alternate Data Streams (ADS)

NTFS tiene una característica poco conocida que los atacantes aman: los Alternate Data Streams. En NTFS, un archivo puede tener múltiples flujos de datos. El flujo principal es el que ves normalmente (`$DATA`), pero puedes tener flujos adicionales asociados al mismo archivo.

Para crear un flujo alterno: `echo "contenido oculto" > archivo.txt:secreto.txt`. El archivo `archivo.txt` sigue mostrando el mismo tamaño, pero `secreto.txt` existe dentro de él como un flujo alterno.

Los atacantes usan ADS para:
- Ocultar malware dentro de archivos legítimos: `type virus.exe > imagen.jpg:malware.exe`
- Almacenar información de configuración robada sin crear archivos visibles.
- Ocultar la salida de comandos de reconocimiento.

Windows Explorer no muestra los ADS. El comando `dir` de cmd no los muestra. La mayoría de los antivirus tradicionales no escanean los ADS. Para detectarlos, necesitas herramientas como `streams.exe` de Sysinternals o PowerShell con `Get-Item -Stream *`.

### Security Descriptors y el Modelo de Seguridad de Windows

Cada objeto protegible en Windows (archivo, proceso, clave de registro, pipe, etc.) tiene un Security Descriptor que define su protección. El Security Descriptor contiene:

- **Owner (Propietario)**: Quién es dueño del objeto. El propietario siempre puede cambiar los permisos del objeto, incluso si no tiene ningún permiso explícito sobre él.
- **Group (Grupo primario)**: Usado principalmente por servicios POSIX en Windows, no relevante para la mayoría de escenarios.
- **DACL (Discretionary Access Control List)**: La lista de permisos que define quién puede hacer qué sobre el objeto.
- **SACL (System Access Control List)**: Define qué accesos al objeto deben ser auditados (generar eventos de seguridad).

La SACL es particularmente útil para defensa: puedes configurar la SACL de un archivo crítico (como `ntds.dit`) para que cualquier intento de lectura genere un Event ID 4663. Si alguien intenta leer la base de datos de AD, el sistema genera un evento inmediatamente.

### El Modelo de Confianza en la Ejecución: Authenticode y Firmas

Windows usa firmas digitales para verificar la integridad de los ejecutables. Un archivo firmado incluye una firma criptográfica que garantiza que no ha sido modificado desde que el editor lo firmó. Windows puede:

- Validar la firma de un controlador antes de cargarlo (requisito para kernel-mode drivers desde Windows Vista 64-bit).
- Validar la firma de un ejecutable antes de ejecutarlo (si está configurado mediante políticas).
- Mostrar el editor del programa en el UAC.

Los atacantes a veces firman malware con certificados robados. Ha habido casos famosos (Stuxnet, Flame) donde el malware usaba certificados de compañías legítimas que habían sido robados. También existe la técnica de "binary patching" donde el atacante modifica un ejecutable legítimo después de firmado (la firma se rompe, pero algunas herramientas no la validan).

### Modos de Falla de los Permisos NTFS

El error más común: permisos demasiado permisivos por defecto. Muchas aplicaciones se instalan con permisos abiertos para "Todos" en carpetas de programa, permitiendo que cualquier usuario modifique archivos ejecutables. Un atacante puede reemplazar un ejecutable legítimo por uno malicioso.

Otro modo de falla: la propiedad de archivos y carpetas. Si un administrador pierde la propiedad de una carpeta crítica, puede quedar bloqueado. Recuperar la propiedad requiere permisos especiales que no siempre están disponibles.

La deshabilitación de la herencia sin entender las consecuencias es otro problema común. He visto carpetas de bases de datos que, al romper la herencia y olvidar asignar permisos adecuados, quedan inaccesibles para las aplicaciones que las necesitan, causando caídas en producción.

## Procesos y Servicios

Windows maneja procesos y servicios de una manera que a los administradores de Linux les parece extraña al principio. En Linux, todo es un proceso, y los servicios son procesos demonio administrados por systemd o init. En Windows, hay una distinción más marcada entre aplicaciones (procesos con ventana) y servicios (procesos sin interacción con el escritorio).

### El Administrador de Tareas y Más Allá

La herramienta básica es el Administrador de Tareas (Task Manager), pero los profesionales de seguridad no lo usan. Usan herramientas como Process Explorer de Sysinternals o Process Hacker. Estas herramientas muestran información que el Administrador de Tareas oculta: la línea de comandos completa de cada proceso, los identificadores de archivos abiertos, las conexiones de red activas, y el árbol de proceso padre-hijo.

### Procesos Críticos del Sistema

Windows tiene varios procesos críticos que son blancos frecuentes de ataques. Conocerlos ayuda a distinguir lo normal de lo anómalo:

- **System (PID 4)**: El proceso del kernel de Windows. No es un proceso de usuario; es la representación del núcleo del sistema operativo. Cualquier archivo ejecutable asociado a este proceso que no esté en `C:\Windows\System32\ntoskrnl.exe` es sospechoso.
- **smss.exe (Session Manager)**: El primer proceso de usuario creado en el arranque. Gestiona las sesiones. Se ejecuta por unos segundos y termina. Si ves smss.exe persistentemente en la lista de procesos, algo está mal.
- **csrss.exe (Client Server Runtime Process)**: Maneja la consola de Windows y los hilos de interfaz. Es crítico. Los ataques de "Process Doppelganging" a veces apuntan a csrss.exe.
- **wininit.exe (Windows Initialization)**: Inicia los servicios del sistema. Es padre de services.exe, lsass.exe, y lsaiso.exe.
- **services.exe (Service Control Manager)**: Gestiona los servicios del sistema. Es el proceso que inicia, detiene y administra todos los servicios de Windows.
- **lsass.exe (Local Security Authority Subsystem Service)**: El proceso más atacado de Windows. Gestiona la política de seguridad, la autenticación de usuarios, y almacena credenciales en memoria. Mimikatz y herramientas similares atacan lsass.exe para extraer contraseñas y hashes.
- **winlogon.exe**: Maneja el inicio de sesión interactivo (Ctrl+Alt+Supr). Trabaja estrechamente con lsass.exe.
- **svchost.exe (Service Host)**: Ya lo cubrimos. Es el contenedor genérico de servicios DLL.
- **explorer.exe (Windows Explorer)**: El shell gráfico de Windows. Proporciona el escritorio, la barra de tareas, y el menú Inicio.

Cada uno de estos procesos es un posible vector de ataque. Por ejemplo, inyectar código en lsass.exe permite acceder a las credenciales en memoria. Secuestrar explorer.exe permite controlar la interfaz del usuario.

### El Árbol de Procesos

La relación padre-hijo entre procesos es la información forense más valiosa que existe. Todo programa en Windows es iniciado por otro programa. Cuando haces doble clic en un acceso directo, Explorer.exe (el shell de Windows) inicia el proceso correspondiente. Si ese proceso es un documento de Word, winword.exe es hijo de explorer.exe. Todo normal.

El problema comienza cuando la cadena no tiene sentido. Si winword.exe inicia cmd.exe, y cmd.exe inicia powershell.exe, y powershell.exe se conecta a una IP externa, no hay explicación inocente. Un procesador de texto no necesita abrir una terminal de comandos. Un atacante usó una macro maliciosa para ejecutar código, y el árbol de procesos muestra exactamente eso.

Los analistas de SOC entrenan su ojo para detectar estas anomalías. Es tan común que los atacantes modernos intentan ocultar su árbol de procesos inyectando código en procesos legítimos en lugar de crear procesos hijos. Esto se llama "Process Injection" y es mucho más difícil de detectar.

### svchost.exe

Si abres el Administrador de Tareas, verás múltiples instancias de `svchost.exe` (Service Host). Es normal tener entre 30 y 80 instancias. `svchost` es un proceso contenedor que aloja servicios de Windows. En lugar de que cada servicio tenga su propio proceso (lo que consumiría mucha memoria), Windows agrupa servicios relacionados en un solo proceso `svchost`.

Un administrador normal ve 50 svchost y piensa "es normal". Un analista de seguridad revisa la línea de comandos de cada svchost para ver qué grupo de servicios contiene. Usando Process Explorer, puede pasar el mouse sobre cada svchost y ver qué servicios DLL están cargados. Si un svchost carga una DLL que no corresponde a un servicio conocido, es señal de infección.

Los atacantes nombran su malware como `svchost.exe` y lo colocan en una ruta diferente (por ejemplo, `C:\Users\Public\svchost.exe` en lugar de `C:\Windows\System32\svchost.exe`). El nombre es el mismo pero la ruta delata al impostor.

### Servicios de Windows

Los servicios son programas diseñados para ejecutarse en segundo plano sin interacción del usuario. Se administran desde `services.msc`. Cada servicio tiene:

- Un nombre corto (ej: `Spooler` para el servicio de impresión).
- Una ruta al ejecutable.
- Un tipo de inicio: Automático, Manual o Deshabilitado.
- Una cuenta bajo la cual se ejecuta (SYSTEM, NetworkService, LocalService, o una cuenta de usuario específica).
- Dependencias con otros servicios.
- Acciones de recuperación en caso de falla.

### Secuestro de Servicios

Un atacante puede abusar de los servicios de varias formas:

- **Servicio inseguro**: Un servicio configurado para ejecutarse como SYSTEM pero cuyo ejecutable puede ser modificado por un usuario sin privilegios. El atacante reemplaza el ejecutable y, cuando el servicio se inicia (o lo fuerza a iniciarse), el código malicioso se ejecuta como SYSTEM.

- **Cambio de ruta del servicio**: Si el atacante tiene permisos para modificar la configuración del servicio (a través del Registro o sc.exe), puede cambiar el ejecutable que el servicio ejecuta.

- **DLL Hijacking**: Algunos servicios cargan DLLs desde rutas donde un usuario sin privilegios puede escribir. El atacante coloca una DLL maliciosa con el nombre que el servicio busca, y el servicio la carga inadvertidamente.

- **Servicios no utilizados**: Un atacante puede instalar un nuevo servicio malicioso con un nombre que imite un servicio legítimo de Windows, como `WindowsUpdateService` o `MicrosoftSecurityCenter`.

### Credential Guard y el Aislamiento de LSASS

Una de las mayores vulnerabilidades de Windows es que lsass.exe almacena credenciales en su memoria de proceso. Cualquier proceso con privilegios de depuración (SeDebugPrivilege) o como SYSTEM puede leer la memoria de lsass y extraer contraseñas. Esto es lo que permite a Mimikatz funcionar.

Microsoft introdujo Credential Guard para mitigar esto. Credential Guard usa virtualización (Hyper-V) para aislar lsass.exe en un contenedor virtualizado. Las credenciales se almacenan en una memoria protegida que ni siquiera el kernel de Windows puede leer directamente. Solo lsass.exe (el real, no el atacante) puede acceder a ellas.

Credential Guard no es perfecto:

- Tiene requisitos de hardware: virtualización VT-x/AMD-V habilitada, IOMMU, UEFI Secure Boot.
- No protege contra ataques que ocurren en tiempo de ejecución (si el atacante ejecuta código en lsass antes de que guarde las credenciales, aún puede interceptarlas).
- No protege contra todos los tipos de credenciales (por ejemplo, contraseñas en texto plano de inicios de sesión interactivos pueden filtrarse temporalmente).
- Puede causar problemas de compatibilidad con controladores y aplicaciones antiguas.

A pesar de sus limitaciones, Credential Guard es una de las medidas más efectivas contra el robo de credenciales. En organizaciones que lo implementan, el valor de Mimikatz se reduce drásticamente.

### Aislamiento de Sesiones

Windows aísla los procesos en sesiones. La Sesión 0 está reservada para servicios del sistema y no tiene acceso al escritorio. Las Sesiones 1, 2, etc., corresponden a usuarios que han iniciado sesión. Este aislamiento evita que un servicio malicioso capture la pantalla o el teclado de un usuario, pero no evita que un servicio interactúe con el sistema de archivos o la red.

Los atacantes han encontrado formas de romper este aislamiento. Por ejemplo, usando la API `CreateProcessAsUser` para crear un proceso en la sesión de un usuario desde un servicio en Sesión 0, o manipulando ventanas a través de mensajes de Windows para inyectar código.

### Tokens en Profundidad

Cada proceso en Windows tiene un token de acceso que contiene la identidad del usuario bajo la cual se ejecuta, los grupos a los que pertenece, y sus privilegios. Entender los tokens es clave para entender la escalada de privilegios en Windows.

Un token contiene:

- **SID del usuario**: La identidad única del usuario.
- **SIDs de grupos**: Todos los grupos a los que pertenece el usuario (incluyendo grupos de dominio si la máquina está en AD).
- **Privilegios**: Los derechos especiales del usuario, como `SeDebugPrivilege` (permite depurar otros procesos), `SeTakeOwnershipPrivilege` (permite tomar propiedad de objetos), `SeBackupPrivilege` (permite hacer backup de archivos sin respetar permisos NTFS).
- **Integrity Level**: El nivel de integridad del token (Sistema, Alto, Medio, Bajo). Windows usa Integrity Levels para restringir lo que un proceso puede hacer. Un proceso con nivel Bajo no puede escribir en un objeto con nivel Medio.
- **Session ID**: La sesión de inicio de sesión a la que pertenece el token.

Hay dos tipos de tokens:

- **Primary Token**: Asociado a un proceso, define los permisos del proceso.
- **Impersonation Token**: Permite a un proceso "actuar como" otro usuario. Los servicios usan esto para atender solicitudes de usuarios sin tener sus privilegios.

### Robo de Tokens

Un atacante que logra ejecutar código en una máquina puede:

1. Enumerar todos los tokens disponibles en la memoria del sistema.
2. Encontrar un token con privilegios elevados (por ejemplo, un token de Administrador o SYSTEM).
3. Usar la API `DuplicateTokenEx` para crear un duplicado del token.
4. Usar `CreateProcessWithTokenW` para ejecutar un proceso malicioso con los privilegios del token robado.

Esta técnica se llama "Token Stealing" o robo de tokens, y es una de las formas más comunes de escalada de privilegios local. Herramientas como Mimikatz incluyen funcionalidades específicas para robar tokens.

### Niveles de Integridad y UAC

Windows implementa Integrity Levels como parte de UAC. Los niveles son:

- **System (S-1-16-16384)**: Solo para procesos del sistema (SYSTEM).
- **High (S-1-16-12288)**: Procesos elevados (administradores que aprobaron el UAC).
- **Medium (S-1-16-8192)**: Procesos de usuario estándar (la mayoría de las aplicaciones).
- **Low (S-1-16-4096)**: Procesos con acceso muy restringido (sandboxes de Internet Explorer, Edge, Chrome).
- **Untrusted (S-1-16-0)**: Máximo aislamiento (para procesos de internet no confiables).

Un proceso con nivel Medium no puede escribir en un objeto con nivel High usando métodos estándar. Esto limita el daño incluso si un atacante compromete una cuenta de administrador pero no pasa el UAC.

### Modos de Falla en Procesos y Servicios

Un servicio configurado para iniciar automáticamente puede fallar al arrancar porque su dependencia no está disponible, porque el ejecutable fue borrado o movido, o porque la cuenta bajo la cual se ejecuta perdió permisos.

La condición de "carrera" (race condition) en servicios es otro modo de falla. Si dos servicios dependen uno del otro y ambos intentan iniciarse simultáneamente, pueden terminar en un estado bloqueado.

Los servicios que fallan repetidamente pueden configurarse para reiniciarse automáticamente, pero si la falla es instantánea, pueden consumir recursos del sistema en un bucle infinito de reinicio.

## Ataques Reales Contra Estos Componentes

### Caso de Persistencia por Registro

En una respuesta a incidentes que documentó el equipo de ciberseguridad de Mandiant en 2020, un ransomware llamado "Ryuk" utilizaba persistencia en el Registro. Los atacantes escribían una entrada en `HKLM\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Winlogon\Shell`. Normalmente, esta clave apunta a `explorer.exe`, el shell de Windows. Los atacantes la modificaron para que ejecutará primero su ransomware y luego explorer.exe. Cada inicio de sesión ejecutaba el malware antes de que el usuario viera el escritorio. Los antivirus no lo detectaban porque el valor parecía legítimo si no se inspeccionaba con atención.

### Caso de Escalada por Servicio

En entornos corporativos, los administradores instalan agentes de monitoreo, backups o antivirus que corren como SYSTEM. Estos agentes tienen carpetas de instalación que, por error, permiten escritura a todos los usuarios. En 2021, un ataque masivo a empresas de telecomunicaciones usó esta técnica: los atacantes encontraron una carpeta de un agente de monitoreo donde cualquier usuario podía escribir. Reemplazaron un archivo DLL que el agente cargaba al iniciarse. El agente, al ejecutarse como SYSTEM, cargó la DLL maliciosa, dándoles control total de la máquina.

### Caso de Proceso Inyectado

El malware "Emotet", famoso por su persistencia y evasión, utilizaba Process Hollowing. Este malware creaba un proceso legítimo (como `svchost.exe`) en estado suspendido, reemplazaba su código en memoria con código malicioso, y reanudaba el proceso. Para el sistema operativo, el proceso seguía siendo `svchost.exe` legítimo. Para el analista, el árbol de procesos no mostraba un hijo sospechoso. Solo una inspección profunda de la memoria revelaba la anomalía.

## Windows Defender Antivirus

Windows incluye un antivirus integrado (Windows Defender Antivirus, ahora parte de Microsoft Defender for Endpoint). En las versiones modernas, Defender es un antivirus competente que utiliza firmas, análisis heurístico, machine learning, y protección en la nube. También incluye reglas ASR (Attack Surface Reduction) que bloquean comportamientos sospechosos como la ejecución de scripts descargados por Office o el uso de herramientas de reconocimiento de redes.

Secure Boot es otra capa de protección que verifica la integridad del bootloader antes de cargar Windows. Trusted Boot extiende esta verificación al kernel y controladores críticos. Los atacantes que usan bootkits (como BlackLotus en 2023) han logrado evadir Secure Boot usando certificados de arranque vulnerables, demostrando que no es una protección absoluta pero sí necesaria.

Para un atacante, Defender es un obstáculo pero no insuperable. Las técnicas de evasión incluyen ofuscar el payload, usar herramientas legítimas (LotL), deshabilitar Defender si se tienen privilegios de administrador, o ejecutar código desde memoria sin tocar el disco. La protección en la nube es la más difícil de evadir porque incluso archivos nuevos pueden clasificarse como maliciosos en segundos.

## AppLocker y Windows Defender Application Control

Microsoft provee dos herramientas para restringir qué ejecutables pueden correr en un sistema: AppLocker y Windows Defender Application Control (WDAC, anteriormente Device Guard).

AppLocker permite crear reglas que permiten o deniegan la ejecución de aplicaciones basadas en:

- **Publicador**: La firma digital del ejecutable.
- **Ruta**: La ubicación del archivo.
- **Hash**: El hash del archivo.

WDAC es más restrictivo. Usa una política de código que define qué binarios son confiables, y todo lo que no esté en la política se bloquea, incluso si es ejecutado por un administrador.

### Cómo los Atacantes Evaden estas Restricciones

AppLocker y WDAC son efectivos contra malware básico, pero los atacantes han desarrollado técnicas para evadirlos:

- **Living-off-the-land (LotL)**: En lugar de ejecutar un .exe malicioso, el atacante usa herramientas legítimas de Windows que están permitidas por defecto: PowerShell, cscript, wmic, mshta, regsvr32. Todas estas herramientas están firmadas por Microsoft y en la lista blanca.

- **Ejecución desde rutas permitidas**: Si AppLocker permite ejecución desde `C:\Windows\*`, el atacante puede colocar su ejecutable en esa carpeta (si tiene permisos de escritura, que no debería, pero a veces los tiene).

- **Bypass con instaladores**: AppLocker a veces permite que los instaladores (`.msi`) ejecuten código arbitrario porque los instaladores están firmados.

- **WDAC Bypass usando binarios vulnerables**: El atacante encuentra un binario firmado y permitido por WDAC que tenga una vulnerabilidad de carga de DLL o de ejecución de comandos. Usa ese binario para ejecutar su código sin violar la política.

La mejor defensa contra LotL es la más difícil de implementar: Constrained Language Mode en PowerShell, deshabilitar herramientas innecesarias (como cscript, mshta), y habilitar Script Block Logging.

## Hacker Angle Resumido

Cada uno de los componentes que hemos cubierto puede ser explotado. Aquí un resumen de lo que un atacante busca en cada uno:

### En el Registro
- **Persistencia**: Escribir en las claves `Run`, `RunOnce`, `Winlogon`, o registrar un nuevo servicio.
- **Debilitamiento de seguridad**: Modificar `HKLM\System\CurrentControlSet\Control\Lsa` para deshabilitar restricciones como `RestrictAnonymous` o `LimitBlankPasswordUse`.
- **Ocultamiento**: Modificar valores de configuración para ocultar archivos, procesos, o conexiones de red.
- **Robo de secretos**: Extraer hashes del SAM (`HKLM\SAM`) y del SYSTEM (`HKLM\SYSTEM`) para descifrarlos offline.

### En NTFS
- **Abuso de permisos débiles**: Encontrar ejecutables o scripts modificables por usuarios sin privilegios.
- **DLL Hijacking**: Colocar una DLL maliciosa en una ruta donde una aplicación privilegiada la buscará.
- **Alternate Data Streams**: Escribir datos ocultos en archivos existentes sin alterar su tamaño aparente. Prácticamente indetectable por el usuario.
- **Bypass de restricciones**: Usar rutas como `\\.\C:\` para evitar ciertos filtros de seguridad.

### En Procesos y Servicios
- **Process Injection**: Inyectar código en un proceso legítimo para ocultar la presencia del atacante.
- **Token Stealing**: Robar tokens de procesos privilegiados para escalar privilegios.
- **Service Abuse**: Modificar servicios existentes o crear nuevos para ejecución persistente y privilegiada.
- **DLL Sideloading**: Aprovechar que Windows busca DLLs en el directorio del ejecutable antes que en System32 para cargar una DLL maliciosa.

## Criterio de Dominio: Autoevaluación

Estas preguntas están diseñadas para verificar si entiendes cómo se comporta Windows por debajo del capó. No se trata de memorizar rutas del Registro, sino de pensar como un atacante o defensor.

### Preguntas Conceptuales

1. Sospechas que tu PC tiene malware que sobrevive cada reinicio. Revisas la carpeta de Inicio y está vacía. ¿Qué herramienta específica vas a abrir para buscar dónde se esconde el código de arranque del atacante? Menciona al menos dos ubicaciones exactas dentro de esa herramienta donde buscarías.

2. Tienes acceso a una máquina Windows con tu usuario estándar (sin privilegios administrativos) y descubres que puedes modificar la colmena `HKEY_CURRENT_USER`. Si colocas un virus en `HKCU\Software\Microsoft\Windows\CurrentVersion\Run`, ¿se ejecutará también cuando otro usuario inicie sesión en la misma máquina? Explica por qué, basándote en la diferencia entre HKLM y HKCU.

3. Lograste obtener la contraseña del Administrador local de una máquina Windows y accedes con esa cuenta. Sin embargo, al intentar leer el archivo SAM para extraer los hashes de todas las cuentas locales, Windows te niega el acceso. ¿Quién tiene el privilegio superior al del Administrador en ese sistema? ¿Qué necesitarías hacer para ejecutar código como esa entidad?

4. Un documento de Word (winword.exe) crea un proceso hijo cmd.exe, que a su vez crea powershell.exe, que establece una conexión TCP saliente a una IP en el extranjero a las 3:00 AM. Describe qué está ocurriendo y qué herramienta usarías para descubrir el árbol de procesos.

5. Encuentras un servicio de Windows llamado "UpdateService" que se ejecuta como SYSTEM, pero cuyo ejecutable apunta a `C:\Users\Public\update.exe`. ¿Es esto normal o sospechoso? ¿Qué pasos seguirías para investigar? ¿Qué herramienta usarías para verificar la ruta del ejecutable de un servicio?

6. Un analista te dice: "Los permisos NTFS de la carpeta C:\Program Files\MyApp permiten modificación a todos los usuarios". Explica por qué esto es peligroso incluso si los usuarios no tienen acceso administrativo. Describe un escenario de ataque concreto.

7. Después de un reinicio, el servicio de impresión (Spooler) no arranca. El evento de error dice "El servicio no respondió a la solicitud de inicio o control en un tiempo oportuno". ¿Qué posibles causas tiene este fallo y cómo las investigarías?

8. Estás revisando un sistema comprometido y encuentras un valor en el Registro `HKLM\System\CurrentControlSet\Services\\DriverName\ImagePath` que apunta a un archivo en `C:\Temp`. ¿Por qué esto es altamente sospechoso incluso si el nombre del servicio parece legítimo?

### Preguntas de Escenario

9. Durante una investigación forense, encuentras un archivo `legitimo.pdf` en el escritorio de un usuario. El archivo tiene un tamaño de 2 MB. Al hacer clic derecho y ver propiedades, muestra 2 MB. Sin embargo, al ejecutar `streams.exe` de Sysinternals sobre el archivo, descubres un flujo alterno de 30 MB llamado `payload.dll`. Explica cómo llegó ese flujo alterno allí y qué significa para la seguridad del sistema.

10. Un administrador configura AppLocker para permitir solo aplicaciones de `C:\Program Files` y `C:\Windows`. Sin embargo, los atacantes siguen ejecutando PowerShell. ¿Por qué? ¿Qué configuración adicional necesitaría el administrador para bloquear PowerShell sin romper la funcionalidad del sistema?

11. Explica la diferencia entre un UAC Bypass y una escalada de privilegios a SYSTEM. ¿Son lo mismo? ¿Cuál permite mayor control sobre el sistema? Describe un ejemplo de cada uno.

12. Un atacante con acceso a una máquina como usuario estándar (Medium Integrity) quiere leer el contenido del archivo SAM, que está protegido por SYSTEM. Describe una cadena de al menos 3 pasos que el atacante podría seguir para lograr este objetivo, mencionando en cada paso qué vulnerabilidad o característica de Windows explota.
