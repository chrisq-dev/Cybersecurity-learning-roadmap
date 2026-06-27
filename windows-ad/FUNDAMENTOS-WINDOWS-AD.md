---
title: "Fundamentos de Windows Corporativo: La Isla vs El Imperio"
---

# Fundamentos de Windows Corporativo: La Isla vs El Imperio

## Objetivo de esta Guía

El Windows que se usa en un entorno corporativo —un banco, un hospital o una petrolera— es radicalmente diferente del Windows que se usa en casa. Comparten el nombre y la interfaz, pero por dentro son sistemas con arquitecturas, políticas y riesgos completamente distintos.

En ciberseguridad, el 95% del ransomware del mundo está diseñado para aprovecharse de cómo las empresas conectan miles de computadoras Windows entre sí. No atacan Linux en la nube primero. Atacan la laptop Windows de un empleado, porque desde ahí pueden llegar a todo lo demás. Esta guía marca la frontera entre ser un "usuario avanzado de Windows" y entender cómo piensa un atacante de nivel empresarial. Después de leer esto, la perspectiva sobre la seguridad en Windows cambia radicalmente.

## El Mito del Hacker de Linux

Existe una idea muy extendida en la cultura popular y en los primeros años de cualquier estudiante de ciberseguridad: "Los servidores reales usan Linux. Windows es para las secretarias. Los hackers de verdad solo atacan Linux". Es una idea común entre quienes empiezan en ciberseguridad, pero la realidad del entorno corporativo muestra una imagen muy distinta.

Es cierto que Linux domina el alojamiento web en la nube. Pero adentro del edificio físico de una empresa, casi el 100% del parque informático es de Microsoft. Las laptops de los empleados usan Windows. El servidor de correos internos Exchange usa Windows. El servidor que valida las contraseñas de acceso a la red WiFi del edificio usa Windows. La base de datos de Recursos Humanos corre sobre Windows. Incluso muchos servidores SQL que parecen "de Linux" están conectados a un Active Directory de Windows.

Esto crea una dinámica curiosa: si un atacante quiere robar una base de datos de clientes de un banco, probablemente tenga que vulnerar un servidor Linux que la aloja. Pero para llegar a ese servidor Linux, primero tiene que enviar un correo de phishing a un empleado, infectar su laptop con Windows, moverse por la red corporativa usando protocolos de Windows, robar credenciales de Active Directory, y solo entonces —una vez dentro— dar el salto al servidor Linux final. El camino hacia el tesoro casi siempre está pavimentado con tecnologías de Microsoft. Ignorar Windows en ciberseguridad es como aprender a manejar un auto de carreras pero no saber cambiar una llanta.

## La Isla Autónoma: El Grupo de Trabajo

El Windows que compras en la tienda y usas en tu casa pertenece a un modelo llamado Grupo de Trabajo o Workgroup. Entender este modelo es clave porque es la base de todo lo que viene después.

### Cómo Funciona una Isla

Imagina que tu casa es una isla diminuta en medio del océano. Tú eres el rey absoluto de esa isla: puedes instalar lo que quieras, cambiar el fondo de pantalla, borrar el sistema operativo por completo o romperlo todo. Cada cuenta que creas en tu laptop existe únicamente dentro de esa máquina. Si le creas una cuenta a "mi hermano" con contraseña "123", tu hermano solo puede iniciar sesión físicamente en tu laptop. Si él va a la computadora del vecino y escribe su usuario, la PC del vecino simplemente le dirá "No sé quién eres", porque cada isla mantiene su propia lista de ciudadanos.

En el mundo técnico, esto significa que cada computadora mantiene su propia Base de Datos de Seguridad Local (SAM). Cuando inicias sesión, el sistema operativo revisa el archivo SAM, verifica tu usuario y contraseña, y te deja entrar. No hay comunicación con ninguna otra computadora en el proceso. Todo es local, todo es aislado.

### Por Qué a los Atacantes No les Interesan las Islas

Para un atacante corporativo, comprometer una laptop personal en un Workgroup es casi irrelevante. Sí, puede robarte tus fotos, tus contraseñas de redes sociales, o incluso usar tu computadora para minar criptomonedas. Pero el juego termina ahí. No hay un controlador central, no hay una base de datos central de cuentas corporativas, no hay una red de máquinas interconectadas. Es una isla. Una vez que la controla, no hay a dónde más ir. El atacante profesional que trabaja para grupos de ransomware no pierde tiempo con islas. Él busca imperios.

### Modos de Falla del Workgroup

El Workgroup funciona bien para una casa o una oficina pequeña de 5 computadoras, pero se vuelve insostenible cuando crece. Administrar 50 computadoras en Workgroup significa crear cuentas manualmente en cada una. Si alguien renuncia, hay que borrar su cuenta en 50 máquinas distintas. No hay forma centralizada de aplicar políticas de seguridad. No hay un registro unificado de quién inició sesión y cuándo. Desde la perspectiva de seguridad, es un caos. Pero lo interesante es que, desde la perspectiva de un atacante, también es un caos: no hay un punto único para robar todas las credenciales, no hay un servidor central que, una vez comprometido, entregue toda la red. El Workgroup es frágil de administrar pero sorprendentemente resistente a la expansión de un ataque.

## El Imperio Corporativo: El Dominio de Windows

Cuando entras a trabajar en una empresa mediana o grande, te entregan una laptop. Esa laptop tiene Windows, pero ya no es una isla. Es una provincia dentro de un imperio. La laptop pertenece a un Dominio de Windows (Windows Domain). Todo cambia.

### La Capital del Imperio

Existe una computadora especial, escondida en un cuarto con aire acondicionado y cerradura con llave, llamada Controlador de Dominio (Domain Controller). Esta máquina es la capital del imperio. Es una base de datos viviente que contiene la identidad de cada persona, cada computadora y cada impresora de la organización. Cuando el equipo de TI te crea una cuenta con el nombre "juan.perez", no la crean en tu laptop. La crean en el Controlador de Dominio. Tu laptop solo es un terminal que pregunta "oye, capital, ¿existe este usuario?" cada vez que alguien intenta iniciar sesión.

### Ciudadanía Universal

Esto tiene una consecuencia poderosa: la Ciudadanía Universal. Puedes caminar a cualquier escritorio vacío en cualquier piso del edificio, escribir tu usuario y contraseña, y la máquina te dejará entrar. La laptop local no sabe quién eres, pero le pregunta a la capital y la capital responde que sí, que existes, que tienes permiso. Esto es mágico para el usuario y un dolor de cabeza enorme para el atacante: porque significa que las credenciales de un solo empleado funcionan en cientos de máquinas.

### Ya No Eres el Rey

Hay una verdad incómoda cuando empiezas a trabajar en una empresa con Dominio: la laptop no es tuya. Aunque físicamente la tengas en tu mochila y te la lleves a tu casa, el dueño real de esa máquina es el Departamento de TI. Si intentas instalar Spotify sin permisos, Windows te mostrará un cartel que dice "Acceso Denegado. Consulta a tu administrador". Si intentas cambiar la hora del reloj, lo mismo. El Controlador de Dominio dicta las leyes y tu laptop obedece ciegamente. Esto se llama ser un "Usuario estándar" en lugar de "Administrador local". Y es la primera barrera de seguridad.

### La Cadena de Confianza

Cuando inicias sesión en un dominio? No es magia, es una conversación cifrada entre tu máquina y el Controlador de Dominio.

En un Dominio, el proceso de inicio de sesión no es un simple "reviso mi archivo SAM y ya". Es una conversación de red. Tu laptop envía un paquete cifrado al Controlador de Dominio diciendo "el usuario Juan Pérez quiere entrar, aquí está su contraseña envuelta en un sobre seguro". El Controlador de Dominio abre el sobre, verifica la contraseña contra su base de datos, y responde con un "sí" o un "no" y, si es afirmativo, con un boleto de autenticación que la laptop usará para futuras solicitudes. Esto significa que si el Controlador de Dominio está apagado o la red está caída, nadie puede iniciar sesión. Es una dependencia total. Las empresas conscientes instalan al menos dos Controladores de Dominio por esta razón, pero incluso eso tiene sus matices.

### Lo Que el Usuario No Ve

Hay un detalle que el usuario jamás nota pero que es crítico para la seguridad: al iniciar sesión en un Dominio, tu laptop no solo demuestra quién eres. También demuestra quién es ella. La computadora tiene su propia cuenta en Active Directory, con su propia contraseña que rota automáticamente cada 30 días. Cuando la laptop se conecta a la red corporativa, ambos se autentican mutuamente. Es una relación de confianza bidireccional: la laptop confía en que el Dominio es legítimo, y el Dominio confía en que la laptop no ha sido manipulada. Si alguien intenta conectar una computadora falsa a la red haciéndose pasar por una legítima, el Dominio lo detectará porque la contraseña de la máquina no coincidirá.

### Credenciales Almacenadas

Hay un aspecto del que casi nadie habla y que los atacantes aprovechan constantemente: Windows almacena credenciales localmente para permitir el inicio de sesión incluso cuando el Controlador de Dominio no está disponible. Se llaman "credenciales cacheadas" (cached credentials). Por defecto, Windows guarda las últimas 10 contraseñas de inicios de sesión exitosos de dominio en el registro local, en un formato llamado MSCACHE.

Esto es necesario para que los empleados puedan trabajar offline (en un avión, por ejemplo). Pero es un riesgo enorme: si un atacante compromete la máquina, puede extraer esas credenciales cacheadas del registro. No obtiene la contraseña en texto plano, pero obtiene un hash que puede intentar descifrar offline. Si el usuario tiene una contraseña débil, el atacante la recupera y puede iniciar sesión como ese usuario aunque la cuenta esté en el Controlador de Dominio.

Los administradores pueden reducir este riesgo configurando el número de credenciales cacheadas a 0 mediante GPO, pero eso significa que nadie puede trabajar sin conexión a la red. Es un balance entre usabilidad y seguridad.

### El Canal Seguro: Netlogon

Cuando una computadora se une a un dominio, establece un canal seguro con el Controlador de Dominio usando el protocolo Netlogon. Este canal se usa para actualizar la contraseña de la computadora, autenticar usuarios, y establecer la relación de confianza. Netlogon ha tenido vulnerabilidades famosas, la más conocida es Zerologon (CVE-2020-1472), que permitía a un atacante hacerse pasar por cualquier computadora del dominio y cambiar su contraseña, incluyendo la del propio Controlador de Dominio. El ataque era tan grave que Microsoft lo clasificó con el máximo nivel de severidad.

El canal Netlogon también se usa para la autenticación NTLM cuando Kerberos no está disponible. Esto significa que un atacante que logra interceptar el canal Netlogon puede capturar autenticaciones y retransmitirlas.

## Kerberos y NTLM: Los Dos Idiomas del Imperio

Para que un Imperio funcione, todos deben hablar el mismo idioma de autenticación. Windows tiene dos: NTLM (el viejo) y Kerberos (el moderno). Ningún administrador de TI configura esto a mano; el sistema elige automáticamente el mejor disponible. Pero como profesional de seguridad, necesitas entender ambos porque los atacantes atacan las debilidades de cada uno.

### NTLM: El Legado Peligroso

NTLM (NT LAN Manager) es el protocolo más antiguo. Funciona así: cuando te conectas a un recurso de red, tu máquina envía un "desafío" al servidor, el servidor responde con un número aleatorio, tu máquina cifra ese número con tu contraseña y lo devuelve. El servidor hace lo mismo con la contraseña que tiene guardada. Si los resultados coinciden, entras.

El problema es que NTLM no soporta autenticación mutua. Tu máquina no puede verificar que el servidor con el que está hablando es legítimo. Esto permite ataques de Relay (NTLM Relay) donde un atacante se pone en medio de la conversación y engaña a tu máquina para que entregue su hash a un servidor controlado por el atacante. Es uno de los ataques más comunes en redes corporativas mal configuradas.

### Kerberos: El Sistema de Boletos

Kerberos es el protocolo moderno de Microsoft (basado en el MIT Kerberos original). Implementa la autenticación mutua y elimina la necesidad de enviar contraseñas por la red constantemente.

Pensemos en un parque de diversiones. Cuando llegas al parque en la mañana, te presentas en la taquilla principal con tu identificación y pagas tu entrada. El guardia no te abre las puertas aún: te pone una pulsera electrónica en la muñeca. Esa pulsera contiene un chip que demuestra que ya pagaste. Durante el resto del día, cuando quieras subir a la montaña rusa, el operador solo mira tu pulsera. No tienes que volver a pagar ni mostrar tu identificación. La pulsera caduca a medianoche.

En Kerberos:

- La taquilla principal es el Centro de Distribución de Claves (KDC), que vive en el Controlador de Dominio.
- Tu identificación y pago son tu nombre de usuario y contraseña.
- La pulsera mágica se llama Ticket Granting Ticket (TGT).
- La montaña rusa es un servidor de archivos o cualquier recurso de red.
- El operador que revisa tu pulsera es el Ticket Granting Service (TGS).

Cuando inicias sesión, tu máquina negocia con el KDC y obtiene un TGT que se almacena en la memoria RAM de tu sesión. Cuando quieres acceder a un servidor de archivos, tu máquina usa ese TGT para pedir un ticket específico para ese servidor. El servidor recibe el ticket, lo valida, y te deja entrar. Todo esto ocurre en milisegundos sin que el usuario se dé cuenta.

### Por Qué Kerberos es Más Seguro que NTLM

Kerberos resuelve el problema del NTLM Relay gracias a la autenticación mutua. Cada ticket incluye información cifrada que solo el servidor destino puede leer. Si un atacante intenta interceptar el ticket y usarlo en otro servidor, el ticket no servirá porque está firmado para un destino específico. Además, los tickets tienen una vida útil limitada (generalmente 10 horas, configurable) y son renovables.

Sin embargo, Kerberos no es invulnerable. Existe un ataque llamado Kerberoasting que explota cómo se almacenan las contraseñas de las cuentas de servicio. Lo veremos en detalle en la guía de Active Directory, pero vale la pena mencionarlo aquí: los tickets de servicio incluyen información cifrada con la contraseña de la cuenta objetivo. Un atacante puede pedir tickets de servicio para cualquier cuenta, llevárselos a su máquina, y descifrarlos por fuera probando contraseñas. Es offline, silencioso, y muy efectivo.

### El Rol de IPv6 y WPAD en la Autenticación

Hay un aspecto de la red que casi nadie configura y los atacantes explotan sistemáticamente: IPv6. En la mayoría de las redes corporativas, IPv6 está habilitado por defecto en Windows aunque la organización no lo use. Cuando una máquina Windows se enciende, pregunta por un servidor DHCPv6. Si nadie responde, la máquina se asigna una dirección IPv6 link-local automáticamente.

El ataque, llamado mitm6, funciona así: un atacante en la red local responde a las solicitudes DHCPv6 de las máquinas, suplantando al servidor legítimo. Le dice a la máquina víctima: "Usa este DNS: <IP del atacante>". Una vez que la víctima usa el DNS del atacante, este puede redirigir cualquier solicitud de nombre. Por ejemplo, cuando la víctima intenta actualizar sus GPOs o autenticarse contra un servidor, el DNS del atacante responde con la IP de una máquina controlada por el atacante. Esto permite capturar autenticaciones NTLM y retransmitirlas.

La protección es simple pero muchas empresas no la implementan: deshabilitar IPv6 en las interfaces de red o configurar DHCPv6 legítimo. También se puede habilitar la protección de "DNS Security" (DNSSEC) y SMB Signing obligatorio.

### WPAD (Web Proxy Auto-Discovery)

Otro vector relacionado es WPAD. Windows, por defecto, intenta descubrir automáticamente un proxy web usando WPAD. El navegador pregunta: "¿Hay un archivo wpad.dat en la red que me diga cómo conectarme a internet?". Si un atacante responde primero, puede configurar un proxy malicioso que intercepte todo el tráfico web. La combinación de mitm6 + WPAD es devastadora: el atacante usa mitm6 para redirigir la solicitud WPAD y luego captura todo el tráfico HTTP e incluso puede modificar páginas web.

Estos ataques no requieren credenciales previas. Solo necesitan que el atacante esté en la misma red local. Son ataques de "pre-autenticación" que han comprometido empresas enteras.

## Active Directory Certificate Services

Hasta ahora hemos hablado de contraseñas y tickets, pero hay otro pilar de la autenticación en Windows que los atacantes han aprendido a explotar: Active Directory Certificate Services (AD CS). AD CS permite a la empresa emitir certificados digitales para autenticar usuarios, computadoras y servicios. Por ejemplo, cuando usas una tarjeta inteligente para iniciar sesión, AD CS emite el certificado que la valida.

El problema con AD CS es que su configuración es compleja y los errores son comunes. En 2021, el investigador Will Schroeder publicó una investigación que identificó múltiples vulnerabilidades en configuraciones típicas de AD CS, conocidas como "ESC" (Escalation of Certificate Services). La más grave, ESC1, permite a un usuario con bajos privilegios solicitar un certificado que lo identifiqué como administrador del dominio.

El flujo del ataque:
1. El atacante encuentra una plantilla de certificado mal configurada (con "Client Authentication" habilitado y "Manager approval" deshabilitado, y que permite al solicitante especificar cualquier "subject name").
2. Solicita un certificado usando esa plantilla, pero poniendo "Administrator" o "Domain Admin" como subject name.
3. La Autoridad de Certificación emite el certificado porque la configuración lo permite.
4. El atacante usa ese certificado para autenticarse como administrador del dominio.

AD CS a menudo se instala en el mismo servidor que el Controlador de Dominio o en un servidor separado. Donde sea que esté, es un vector de ataque crítico. Muchas organizaciones instalan AD CS para cumplir requisitos de cumplimiento (como Smart Card logon) pero no lo aseguran adecuadamente.

## El Controlador de Dominio Joya Única

Dentro del imperio, el Controlador de Dominio es el recurso más valioso y el punto de falla más crítico. Cada Controlador de Dominio ejecuta varios servicios que son el corazón del ecosistema:

- Servicio de Directorio (NTDS): la base de datos que almacena todos los objetos, atributos y contraseñas. El archivo se llama `ntds.dit` y está bloqueado por el sistema operativo incluso para administradores.
- Servicio de Autenticación (Kerberos KDC): el que emite los tickets y valida las identidades.
- Servicio de Réplica: mantiene sincronizados los cambios entre múltiples Controladores de Dominio.
- DNS integrado en AD: el sistema de nombres que permite a las máquinas encontrarse entre sí en la red.

Cada uno de estos servicios es un vector de ataque potencial. Cuando un atacante logra ejecutar código en un Controlador de Dominio, ya no necesita tanta sutileza. Puede extraer la base de datos NTDS completa con todas las contraseñas de la organización usando herramientas como `ntdsutil` o `vssadmin`. Puede crear cuentas nuevas con privilegios de administrador. Puede modificar la pertenencia a grupos en segundos.

### Réplica Entre Controladores

La mayoría de las empresas tienen dos o más Controladores de Dominio por redundancia. Esto evita que un solo apagón paralice la autenticación. Pero introduce un nuevo riesgo: la réplica. Los cambios hechos en un Controlador se propagan a los demás. Si un atacante compromete un Controlador y modifica un objeto, esos cambios se replican a todos los demás. Es una forma de persistencia silenciosa: el atacante puede, desde un solo punto de entrada, corromper toda la infraestructura de directorio.

### Modos de Falla del Controlador

Cuando un Controlador de Dominio falla, las consecuencias son inmediatas y graves:

- Si el único Controlador de Dominio se apaga, nadie puede iniciar sesión con cuentas de dominio. Los usuarios ya logueados pueden seguir trabajando porque su ticket de Kerberos sigue siendo válido, pero nadie nuevo puede autenticarse. Cambiar contraseñas falla. Bloquear cuentas de empleados despedidos falla.
- Si la base de datos NTDS se corrompe y no hay respaldo, la identidad digital de toda la organización se pierde. Es como si el gobierno perdiera el registro civil de todo un país.
- Si hay dos Controladores de Dominio pero la replicación falla, puedes tener "objetos huérfanos" donde un usuario desactivado en un Controlador sigue activo en otro, permitiendo accesos no autorizados.
- La desincronización del reloj entre máquinas rompe Kerberos porque los tickets dependen de marcas de tiempo. Si el reloj de una laptop se desvía más de 5 minutos del Controlador, la autenticación falla.

## El Movimiento Lateral

Una vez que entendemos la arquitectura isla vs imperio, podemos hablar de la técnica más importante en un ataque corporativo: el movimiento lateral.

### La Diferencia Clave: Autenticación Local vs Remota

Hay una confusión común que quiero aclarar antes de continuar. En un Workgroup, cuando inicias sesión, el sistema operativo verifica tu contraseña contra el archivo SAM local. Esto es autenticación local. No importa si estás conectado a internet o no; el archivo SAM está en tu disco duro. No hay dependencia de red.

En un Dominio, la autenticación puede ser local o remota dependiendo del tipo de cuenta que uses:

- Si usas una cuenta local (como `.\Administrador` o `MI-PC\Usuario`), el sistema verifica contra el SAM local.
- Si usas una cuenta de dominio (como `EMPRESA\juan.perez`), el sistema envía la solicitud al Controlador de Dominio.

El tipo de cuenta se distingue por el prefijo: `.\` o `MI-PC\` = cuenta local. `EMPRESA\` o `usuario@empresa.com` = cuenta de dominio. Si no pones prefijo, Windows intenta primero con cuenta de dominio si la máquina está unida a un dominio.

Esto es importante en seguridad porque un atacante puede crear una cuenta local en una máquina que comprometa y usar esa cuenta para acceder a los recursos de esa máquina, pero no podrá salir de ella hacia el dominio.

### La Metáfora del Edificio de Oficinas

Imagina que eres un ladrón que logró colarse en el piso 12 de un edificio de oficinas. Entraste escondido en el ascensor. Ahora estás en un cubículo. Tu objetivo no es robar la computadora de ese cubículo (eso sería ruidoso y poco rentable). Tu objetivo es llegar al piso 30, donde está la oficina del director financiero y la caja fuerte.

Pero hay guardias por todos lados, puertas con tarjeta de acceso, y cámaras en cada pasillo. No puedes simplemente caminar hasta el piso 30. Necesitas:

1. Un mapa del edificio (reconocimiento de red).
2. Una tarjeta de acceso que funcione en los pisos intermedios (credenciales robadas).
3. Un uniforme que no levante sospechas (técnicas de evasión).
4. Saber qué puertas están abiertas (vulnerabilidades de configuración).

En el mundo Windows, esto se traduce en:

- Usar herramientas como BloodHound para mapear las relaciones entre usuarios, grupos y computadoras en Active Directory.
- Robar hashes de contraseñas de la memoria de una computadora y reutilizarlos en otra (Pass-the-Hash).
- Robar tickets de Kerberos de la sesión de un usuario y reutilizarlos (Pass-the-Ticket).
- Encontrar credenciales almacenadas en scripts, archivos de configuración, o la herramienta de Windows conocida como Administrador de Credenciales.

### Por Qué el Movimiento Lateral es Tan Efectivo

El movimiento lateral funciona porque las redes corporativas suelen ser planas. Históricamente, los diseñadores de redes priorizaron la facilidad de uso sobre la segmentación. Una vez que estás dentro de la red, puedes comunicarte con casi cualquier máquina. No hay un "muro" entre el piso de ventas y el servidor de bases de datos. Esto está cambiando lentamente con la microsegmentación y Zero Trust, pero la mayoría de las empresas todavía operan como un edificio donde las puertas interiores no tienen candado.

### El Mapa del Edificio: BloodHound y el Reconocimiento

Antes de moverse, un atacante necesita un mapa. La herramienta más famosa para esto es BloodHound. BloodHound usa consultas LDAP para extraer información de Active Directory: usuarios, grupos, computadoras, sesiones activas, permisos, GPOs, y relaciones de confianza. Luego construye un grafo que muestra los caminos de ataque.

Un camino de ataque típico que BloodHound revela: el usuario "juan.perez" tiene permiso "ForceChangePassword" sobre el usuario "svc_backup". "svc_backup" es miembro del grupo "Backup Operators". "Backup Operators" tiene permiso para hacer backup del Controlador de Dominio y leer el archivo NTDS.dit. En cuatro saltos, Juan Pérez puede convertirse en administrador del dominio, y su jefe ni siquiera sabe que tiene ese permiso.

BloodHound se ha convertido en un estándar de la industria. Los equipos rojos lo usan para planificar ataques. Los equipos azules lo usan para auditar permisos y encontrar configuraciones peligrosas.

### Técnicas de Movimiento Lateral

**Pass-the-Hash**: Ya lo describimos. El atacante extrae el hash NTLM de la memoria de una máquina y lo usa para autenticarse en otra máquina. Funciona porque NTLM no requiere la contraseña en texto plano, solo el hash.

**Overpass-the-Hash**: Una variante más peligrosa. El atacante usa el hash NTLM para solicitar un ticket Kerberos TGT. Luego usa ese TGT para acceder a recursos de red. Esto convierte un hash NTLM (que solo sirve para NTLM) en un ticket Kerberos (que puede usarse para cualquier recurso que soporte Kerberos).

**Pass-the-Ticket**: El atacante roba un ticket Kerberos de la memoria de una máquina y lo inyecta en su propia sesión. Si el ticket pertenece a un administrador, el atacante adquiere sus privilegios.

**Credential Stuffing desde el Registro**: El atacante busca claves de registro que almacenan credenciales, como `HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Winlogon\DefaultPassword`. Algunas aplicaciones almacenan contraseñas en texto plano en el registro.

**LSA Secrets**: El equipo de seguridad local (LSA) almacena contraseñas de servicios, cuentas y tareas programadas. Un atacante con privilegios puede extraer estos secretos usando herramientas como Mimikatz o `reg.exe`.

**DCSync**: Aunque es más un ataque de escalada que de movimiento lateral, DCSync permite a un atacante con los permisos adecuados solicitar la replicación de contraseñas desde el Controlador de Dominio, obteniendo todos los hashes del dominio sin necesidad de ejecutar código en el DC.

## Ataques Reales: Cómo se Ven Estas Técnicas en la Vida Real

### Pass-the-Hash

En 2012, un grupo de atacantes comprometió una gran empresa de petróleo y gas usando la técnica de Pass-the-Hash. El ataque comenzó con un correo de phishing a un empleado de contabilidad. Al abrir el archivo adjunto, se ejecutó un script que robó el hash NTLM de la sesión del empleado. Ese hash no era una contraseña legible, sino un valor derivado de ella. En un entorno normal, tener el hash no te permite iniciar sesión en un sistema remoto. Pero en redes Windows sin la protección adecuada (como la política de "Deny NTLM" o "Restricted Admin Mode"), el hash es suficiente.

Los atacantes usaron una herramienta llamada Mimikatz para extraer el hash de la memoria de la laptop infectada. Luego usaron ese hash para autenticarse en el servidor de archivos del departamento de contabilidad. Una vez allí, encontraron un script con la contraseña de una cuenta de servicio con privilegios elevados. Con esa cuenta, se movieron al servidor de bases de datos. Desde allí, ejecutaron un ataque DCSync (lo veremos en la guía de Active Directory) contra el Controlador de Dominio y extrajeron todas las contraseñas de la empresa. Todo esto ocurrió en menos de 48 horas sin que el equipo de seguridad se diera cuenta.

### Pass-the-Ticket

Un caso real que investigué durante mi práctica en un SOC involucró a un empleado de ventas que viajaba frecuentemente. Su laptop fue infectada con un malware que se propagaba por unidades USB. El malware, al ejecutarse, cargaba Mimikatz en memoria (sin tocar el disco) y robaba todos los tickets Kerberos de la sesión activa del usuario. El empleado tenía acceso a una carpeta compartida de finanzas por su trabajo. El atacante usó ese ticket para conectarse al servidor de finanzas directamente. Lo peor es que el empleado cerró sesión al final del día, pero el ticket seguía siendo válido por horas. El atacante trabajó durante la madrugada descargando información financiera.

### La Importancia de Entender Estos Ataques

No te cuento estas historias para asustarte. Te las cuento porque, como defensor, una vez que entiendes cómo opera un atacante, puedes empezar a ver las señales. Un inicio de sesión desde una IP que no corresponde a la máquina del usuario. Un ticket de Kerberos usado desde dos ubicaciones geográficas distintas al mismo tiempo. Un hash NTLM que aparece en un servidor donde ningún usuario debería estar autenticándose.

## Modos de Falla del Modelo de Dominio

Cada decisión arquitectónica en un Dominio de Windows tiene un modo de falla asociado. Conocerlos es tan importante como conocer el funcionamiento normal.

### Falla del Controlador de Dominio Único

El caso más común en empresas pequeñas: un solo Controlador de Dominio. Si el disco duro falla, la organización pierde su identidad digital. La restauración desde respaldo puede tomar días, y si el respaldo también está corrupto o desactualizado, las consecuencias son catastróficas. He visto empresas que tuvieron que recrear manualmente cientos de cuentas de usuario porque su único respaldo era de 6 meses atrás.

### Falla de Confianza en el Canal

Cuando un usuario inicia sesión con una cuenta de dominio, la computadora local y el Controlador de Dominio establecen un canal seguro. Si el canal se rompe (por ejemplo, si la contraseña de la computadora en AD se desincroniza con la local), el usuario puede ser bloqueado incluso con credenciales correctas. Esto ocurre más seguido de lo que la gente cree, especialmente después de restaurar un Controlador de Dominio desde un respaldo antiguo.

### Falla de Replicación

En entornos con múltiples Controladores de Dominio, la replicación es clave. Si un Controlador queda aislado de la red por un período prolongado, los cambios realizados en otros Controladores no llegan. Cuando se reconecta, puede haber conflictos. Active Directory maneja estos conflictos mediante "versiones de atributos", pero a veces se pierden datos. He visto casos donde un usuario desactivado en un Controlador seguía activo en otro porque el enlace de replicación estaba caído.

### Falla de la Zona Horaria

Kerberos depende de la sincronización de relojes. Si la hora del sistema de un cliente difiere en más de 5 minutos de la del Controlador de Dominio, la autenticación falla con un mensaje críptico como "KRB_AP_ERR_SKEW". Esto es especialmente común en máquinas virtuales que se reanudan de un estado suspendido, o en laptops que viajan entre zonas horarias sin ajustar la hora automáticamente.

### Falla de Expiración Masiva de Contraseñas

Cuando las contraseñas de dominio expiran, todos los empleados deben cambiarlas. Si muchos intentan cambiar su contraseña al mismo tiempo (por ejemplo, el primer día laboral del mes), el Controlador de Dominio puede saturarse y algunos cambios pueden fallar, dejando a usuarios bloqueados hasta que un administrador intervenga manualmente.

## El Ángulo del Hacker en Cada Componente

Cada componente del ecosistema Windows tiene un ángulo de ataque. Voy a enumerar los más importantes que debes conocer como profesional de seguridad.

### Sobre el Workgroup

Un hacker no suele atacar un Workgroup directamente, pero sí lo usa como punto de pivote. Si compromete una laptop personal que un empleado usa para conectarse por VPN a la red corporativa, la laptop personal se convierte en el puente. Desde ahí puede ejecutar ataques de ARP spoofing, interceptar tráfico, o robar credenciales de VPN almacenadas.

### Sobre el Dominio

El Dominio es el sueño de cualquier atacante. Una vez dentro, todo está interconectado. La estrategia es: comprometer una máquina, extraer credenciales, moverse a la siguiente, escalar, y finalmente llegar al Controlador de Dominio. Herramientas como BloodHound convierten esta búsqueda en un grafo visual que muestra exactamente qué usuario tiene permisos sobre qué máquina, facilitando la planificación del ataque.

### Sobre el Rol de la Segmentación de Red

Históricamente, el movimiento lateral ha sido tan efectivo porque las redes corporativas son planas. Pero hay esperanza. La segmentación de red (dividir la red en zonas con firewalls internos) limita severamente la capacidad de un atacante para moverse.

- Si el departamento de finanzas está en un segmento de red diferente al de ventas, un atacante que compromete una máquina de ventas no puede comunicarse directamente con el servidor de finanzas.
- Si los servidores críticos (Controladores de Dominio, bases de datos) están en una zona DMZ interna con firewalls que solo permiten tráfico específico, el atacante tiene que encontrar un camino mucho más difícil.

Sin embargo, la segmentación no es una bala de plata. Los atacantes pueden usar "Jump Boxes" (servidores de salto) o comprometer un servidor que tenga acceso a múltiples segmentos para saltar entre ellos.

### Sobre Kerberos

Kerberos se diseñó para ser seguro, pero su implementación en Windows tiene debilidades conocidas:

- **Kerberoasting**: Cualquier usuario del dominio puede solicitar un ticket de servicio para cualquier cuenta de servicio. Ese ticket está cifrado con la contraseña de la cuenta de servicio. El atacante descarga el ticket y lo descifra offline.
- **AS-REP Roasting**: Si una cuenta de usuario no tiene habilitado el pre-autenticación de Kerberos (un ajuste de configuración), un atacante puede solicitar un ticket de inicio de sesión para esa cuenta sin conocer su contraseña.
- **Golden Ticket**: Si un atacante obtiene el hash de la cuenta KRBTGT (la cuenta que firma todos los tickets en el dominio), puede forjar tickets de Kerberos que le den acceso a cualquier recurso. Es el ataque más devastador porque el ticket forjado es indistinguible de uno real.
- **Silver Ticket**: Similar al Golden Ticket, pero para un servicio específico. No requiere el hash KRBTGT, solo el hash de la cuenta del servicio objetivo.

### Sobre NTLM

NTLM sigue presente en la mayoría de las redes por compatibilidad. Los atacantes lo explotan mediante:

- **Pass-the-Hash**: Ya lo explicamos. Reutilizar el hash NTLM robado.
- **NTLM Relay**: Interceptar la autenticación NTLM y retransmitirla a otro servidor para obtener acceso.
- **SMB Relay**: Una variante del anterior que usa el protocolo SMB para compartir archivos.

### Sobre el Movimiento Lateral

Los atacantes no se mueven al azar. Siguen caminos predecibles:

- Reconocimiento: usan `net view`, `nltest`, o herramientas como PowerView para mapear la red.
- Robo de credenciales ejecutan Mimikatz, procdump, o herramientas de volcado de SAM.
- Movimiento: usan `psexec`, `wmic`, `winrm`, tareas programadas, o servicios de Windows para ejecutar comandos en máquinas remotas.
- Objetivo: buscan cuentas con privilegios de administrador de dominio.

### Sobre SYSVOL

SYSVOL es una carpeta compartida en todos los Controladores de Dominio que contiene las GPOs, scripts de inicio de sesión, y archivos de configuración. Es replicada automáticamente entre todos los DCs. El problema de seguridad históricamente más grave de SYSVOL fueron las Group Policy Preferences (GPP). Los administradores usaban GPP para configurar cosas como la contraseña del administrador local, y esas contraseñas se almacenaban cifradas (con una clave pública conocida) en un archivo XML dentro de SYSVOL. Cualquier usuario del dominio podía leer estos archivos.

Microsoft publicó un parche en 2014 que impide crear nuevas GPP con contraseñas, pero las existentes no se migraron automáticamente. Miles de organizaciones aún tienen contraseñas en texto plano (bueno, cifradas con una clave pública que todos conocen) en SYSVOL, esperando a que un atacante las lea.

La herramienta `Get-GPPPassword` de PowerSploit automatiza la búsqueda de estas contraseñas. Es el primer comando que muchos pentesters ejecutan después de obtener acceso a un dominio.

### Sobre el Almacenamiento de Credenciales

Los atacantes saben que Windows almacena credenciales en múltiples lugares:

- **SAM**: Hashes de contraseñas locales. Requiere privilegios de SYSTEM para leer.
- **LSASS**: Contiene contraseñas y hashes de usuarios con sesión activa. Accesible con privilegios de depuración (SeDebugPrivilege).
- **Credenciales cacheadas (MSCACHE)**: Hashes de contraseñas de dominio para inicio de sesión offline. Almacenadas en el registro.
- **Credential Manager**: El administrador de credenciales de Windows guarda contraseñas de sitios web, recursos de red y aplicaciones.
- **LSA Secrets**: Contraseñas de servicios, cuentas de tareas programadas, y la contraseña de la cuenta de la máquina.
- **Cookies de Kerberos**: Tickets TGT almacenados en la memoria de la sesión del usuario.
- **SYSVOL**: Carpeta compartida en los Controladores de Dominio que a veces contiene scripts de inicio de sesión con contraseñas en texto plano.

Cada uno de estos almacenes tiene sus propias protecciones y sus propias herramientas de extracción. Mimikatz cubre la mayoría, pero hay herramientas especializadas para cada uno.

### Sobre el Abuso de GPOs por Atacantes

Las GPOs son otro vector que los atacantes explotan después de comprometer el dominio. Si un atacante obtiene permisos para crear o modificar GPOs (por ejemplo, comprometiendo una cuenta del grupo "Group Policy Creator Owners"), puede:

- Crear una GPO que deshabilite el antivirus en todas las máquinas del dominio.
- Configurar una tarea programada mediante GPO para ejecutar un payload en todas las máquinas.
- Modificar la política de auditoría para deshabilitar la generación de eventos críticos.
- Asignar privilegios de administrador local a cualquier usuario en todas las máquinas.
- Configurar un script de inicio de sesión que ejecute código malicioso cada vez que un usuario inicia sesión.

Las GPOs se almacenan en SYSVOL, accesible para todos los usuarios autenticados del dominio (aunque solo lectura para la mayoría). Un atacante con acceso de escritura a SYSVOL puede modificar las GPOs directamente sin usar herramientas administrativas, dificultando la detección.

### Sobre el Phishing como Puerta de Entrada

El 91% de los ataques corporativos comienzan con phishing. No porque sea una técnica sofisticada, sino porque funciona. Un correo bien redactado dirigido a un empleado de contabilidad o recursos humanos tiene altas probabilidades de éxito. El payload inicial suele ser un documento de Office con macros maliciosas que ejecutan PowerShell.

Una vez que el atacante tiene ejecución de código en una máquina dentro del dominio, el resto de la cadena depende de su capacidad para moverse sin ser detectado. Es por esto que las empresas invierten tanto en seguridad perimetral (filtros antiphishing, sandboxing de correos) y en capacitación de empleados. Pero la seguridad perimetral nunca es suficiente; siempre habrá un correo que pase los filtros y un empleado que haga clic.

### Sobre la Cadena de Ataque Completa

Un ataque real rara vez usa una sola técnica. Combina varias en una cadena:

1. El atacante gana acceso inicial mediante phishing (correo a un empleado).
2. Extrae credenciales de LSASS usando Mimikatz.
3. Usa Pass-the-Hash para moverse a un servidor de departamento.
4. Encuentra un script en SYSVOL con la contraseña de una cuenta de servicio.
5. Usa Kerberoasting contra la cuenta de servicio para obtener un ticket cifrado.
6. Descifra el ticket offline y obtiene la contraseña de la cuenta de servicio.
7. La cuenta de servicio tiene permisos de replicación de directorio.
8. Ejecuta DCSync contra el Controlador de Dominio y obtiene todos los hashes.
9. Crea un Golden Ticket con el hash KRBTGT.
10. Usa el Golden Ticket para acceder a cualquier recurso de la empresa.

Cada paso de esta cadena se puede detectar con la configuración adecuada de auditoría y monitoreo. Pero la mayoría de las organizaciones solo detectan uno o dos pasos, y los atacantes lo saben.

## Criterio de Dominio: Autoevaluación

Revisa si tu mente ya hizo la transición de usuario doméstico a analista corporativo. Estas preguntas están diseñadas para exponer lagunas en tu comprensión del modelo de Dominio. Tómalo como un diagnóstico, no como un examen.

### Preguntas Conceptuales

1. Un amigo te dice: "Instalé un buen antivirus en mi laptop personal, soy invulnerable a los hackers rusos". ¿Por qué un atacante corporativo profesional no perdería tiempo atacando la laptop de tu amigo si está en un Workgroup? La respuesta no es "porque no tiene información valiosa" —piensa en la arquitectura.

2. En tu primer día de trabajo en un banco, te asignan un escritorio temporal. Inicias sesión en una PC que nunca habías visto y milagrosamente funciona. ¿Quién o qué verificó tu identidad en ese instante? ¿El sistema operativo local o el Controlador de Dominio? ¿Cómo puedes distinguir la diferencia entre ambos escenarios?

3. Un atacante logra infectar la computadora del equipo de diseño gráfico, pero los analistas de seguridad lo detectan y lo expulsan a los 5 minutos. ¿Qué le faltó al atacante para completar el ataque? ¿Fue mala suerte o mala técnica?

4. Si tienes la contraseña de Administrador Local de la laptop de Recursos Humanos, ¿eso significa que también controlas el Controlador de Dominio? Explica por qué sí o por qué no, y qué información adicional necesitarías.

5. Explica con tus propias palabras por qué un ataque Pass-the-Hash es más silencioso que un keylogger en un entorno corporativo. ¿Qué ventajas tiene para el atacante?

6. Un administrador de TI configura un solo Controlador de Dominio porque "es más fácil de administrar". Enumera al menos tres modos de falla específicos que podrían ocurrir y afectar a toda la organización.

7. Si el reloj de tu laptop se desvía 6 minutos del reloj del Controlador de Dominio, ¿qué protocolo de autenticación fallará y por qué? ¿NTLM funcionaría en ese caso como respaldo automático?

8. Un atacante roba el archivo `ntds.dit` de un Controlador de Dominio. ¿Qué información específica contiene ese archivo? Si el atacante también roba el archivo `SYSTEM` del registro, ¿qué más puede hacer con esa combinación?

### Preguntas de Escenario

9. Trabajas como analista de SOC y detectas un inicio de sesión (Event 4624) con LogonType 3 desde la IP 192.168.1.50 hacia el servidor de archivos. La IP 192.168.1.50 pertenece a un puesto de trabajo en recepción. El usuario que inició sesión es "jperez" del departamento de finanzas. Son las 3:00 AM. ¿Qué pasos sigues para determinar si esto es legítimo o un ataque?

10. Durante un pentest, descubres que una laptop corporativa tiene credenciales cacheadas con más de 10 inicios de sesión almacenados. La laptop fue utilizada previamente por un administrador del dominio. El atacante extrae el archivo SAM y los hashes de las credenciales cacheadas. ¿Qué tipo de ataque puede ejecutar con estos datos? ¿Necesita conexión al Controlador de Dominio para usarlos?

11. Explica la relación entre mitm6 y NTLM Relay. ¿Por qué la combinación de estos dos ataques es tan efectiva incluso contra redes que tienen buena seguridad perimetral?

12. Un atacante encuentra AD CS instalado en el entorno y descubre que la plantilla de certificado "Corporate Authentication" permite especificar el subject name en la solicitud. ¿Qué ataque puede ejecutar y cuál sería el impacto?
