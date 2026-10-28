---
title: "Identidad y Permisos: Quien Eres y Que Puedes Hacer"
level: "inicial"
content_type: "guia"
updated: "2026-06-29"
reviewed: "2026-06-28"
reviewed_against: "NIST SP 800-63-4"
official_sources:
  - title: "NIST SP 800-63-4 — Digital Identity Guidelines"
    url: "https://pages.nist.gov/800-63-4/"
  - title: "NIST SP 800-63B-4 — Authentication and Authenticator Management"
    url: "https://pages.nist.gov/800-63-4/sp800-63b.html"
  - title: "CISA — Implementing Phishing-Resistant MFA"
    url: "https://www.cisa.gov/sites/default/files/2023-01/fact-sheet-implementing-phishing-resistant-mfa-508c.pdf"
---

# Identidad y Permisos: Quien Eres y Que Puedes Hacer

## Objetivo de esta Guía

Entender por qué probar quien eres (Autenticación) y controlar a que puedes acceder (Autorización) es el corazón de la seguridad corporativa moderna. No es un detalle técnico menor; es la primera línea de defensa y, cuando falla, la puerta de entrada a los peores desastres.

Si el hardware y el sistema operativo son los muros del castillo, la gestión de identidades son los guardias en la puerta principal. En la ciberseguridad actual, los atacantes ya no necesitan "hackear" sistemas complejos con exploits de día cero. Simplemente se roban contraseñas válidas y entran por la puerta grande como si fueran empleados legitimados.

Los informes de brechas de Verizon muestran de forma recurrente que el abuso de credenciales es un vector relevante. Por eso identidad, sesión y autorización deben tratarse como controles centrales y no solo como una pantalla de inicio de sesión.

---

## El Marco de Trabajo AAA: La Base de Toda Gestión de Acceso

Para no confundir términos, los profesionales de seguridad usan el marco "AAA": Authentication, Authorization, Accounting (Autenticación, Autorización y Contabilidad). Son tres procesos distintos que a menudo se confunden, y confundirlos puede llevar a implementar mal las defensas.

La analogía del aeropuerto es útil para entenderlos por separado, pero primero quiero que entiendas por qué están separados. La razón es simple: son preguntas diferentes que el sistema debe responder en orden secuencial y cada una tiene sus propios mecanismos y fallos.

### Autenticación: Demostrar Quien Eres

La autenticación es el proceso de demostrar tu identidad al sistema. No es "decir quien eres," es "probar que eres quien dices ser."

**En la práctica:** Escribes tu nombre de usuario (identificación) y tu contraseña (prueba). El sistema recibe ambos. Busca el hash de tu contraseña en la base de datos. Calcula el hash de lo que escribiste. Si coinciden, estas autenticado.

**La pregunta que responde:** "Eres realmente quien dices ser?"

**Como falla la autenticación:**

**Fallo 1: Contraseñas débiles.** El problema más antiguo y persistente de la informática. La gente usa contraseñas como `123456`, `password`, `admin`, o `Otono2024!` (que sigue un patrón predecible). Las listas públicas de contraseñas filtradas muestran patrones repetidos y predecibles, pero su frecuencia cambia según población y dataset.

**Fallo 2: Reutilización de contraseñas.** Un atacante compromete un sitio web pequeño (un foro, un juego online, un servicio de terceros), obtiene la base de datos de usuarios con contraseñas (generalmente hasheadas, pero muchos sitios usan hashing débil como MD5 o ni siquiera hashing). Luego prueba esas mismas combinaciones de email+contraseña en bancos, redes sociales, servicios corporativos. Esto se llama "credential stuffing" y es automático: existen herramientas que lo hacen con miles de combinaciones por minuto.

**Fallo 3: Phishing.** El atacante no rompe la contraseña; convence al usuario de que la entregue voluntariamente. Crea una página de login falsa que parece idéntica a la real (banco, Google, Microsoft 365). El usuario escribe su contraseña en la página falsa. El atacante la captura y la usa inmediatamente en el sitio real.

**Fallo 4: Robo de sesión.** No necesitas la contraseña si puedes robar el token de sesión. Muchos sistemas, una vez que auténticas, te dan un token (una cadena de texto) que prueba que ya pasaste la autenticación. Si un atacante roba ese token (vía malware, interceptacion de tráfico, o XSS), puede usarlo para actuar como si fuera tu sin saber tu contraseña.

**Caso real de fallo de autenticación: Uber (2022).** Un atacante comprometió la cuenta de un contratista de Uber. La cuenta estaba protegida con MFA, pero el atacante envío múltiples solicitudes de autenticación al teléfono del contratista (MFA fatigue) hasta que el contratista, cansado de las notificaciones, acepto una. Una vez dentro, el atacante encontró credenciales de administrador en un script de PowerShell. Accedió a sistemas internos de Uber (AWS, GCP, Slack, base de datos de clientes). El ataque no requirió exploits técnicos; solo engañar a una persona y fatigar su MFA.

### Autorización: Determinar Que Puedes Hacer

autenticación y autorización se confunden todo el tiempo, pero son dos preguntas distintas: una es "quien eres" y la otra es "que te dejó hacer".

La autorización ocurre después de la autenticación. El sistema ya sabe quien eres. Ahora decide que recursos puedes ver, modificar, crear o eliminar.

**En la práctica:** Iniciaste sesión en tu cuenta de correo corporativo. Estas autenticado. Ahora intentas abrir la carpeta de Recursos Humanos que contiene los salarios de todos los empleados. El sistema revisa tus permisos y dice: "Lo siento, no tienes acceso. Eres del departamento de Marketing, no de RRHH."

**La pregunta que responde:** "Una vez que se quien eres, que recursos puedes usar y que acciones puedes realizar sobre ellos?"

**Como falla la autorización:**

**Fallo 1: Permisos demasiado amplios.** Es el fallo más común. Un empleado necesita acceso a un sistema para una tarea específica, pero el administrador le da "acceso total" porque es más fácil. Meses después, el empleado se va de la empresa, pero su cuenta sigue activa con acceso total.

**Fallo 2: Escalacion de privilegios horizontal o vertical.** Un atacante que compromete una cuenta de usuario normal busca formas de aumentar sus permisos (escalacion vertical) o acceder a recursos de otros usuarios (escalacion horizontal).

**Fallo 3: Confusión de autorización en APIs.** Las aplicaciones web modernas dependen de APIs. Un error común es que la API verifique la autenticación pero no la autorización. El usuario A puede ver los datos del usuario B simplemente cambiando un número en la URL (IDOR: Insecure Direct Object Reference).

**Escenario ilustrativo: fallo de autorización a nivel de objeto.** En 2021, un investigador de seguridad descubrió que el sistema de autenticación de una gran empresa de telecomunicaciones permitía a cualquier usuario autenticado acceder a los registros de llamadas de cualquier otro cliente solo modificando el número de teléfono en la URL de la API. La autenticación funcionaba perfectamente. La autorización simplemente no existía a nivel de recurso individual.

### Contabilidad (Accounting / Auditing): Registrar Que Hiciste

La contabilidad (o auditoría) es el proceso de registrar todas las acciones que un usuario realizo, para poder investigar si algo sale mal.

**En la práctica:** El sistema escribe en un log: "El usuario juan.perez eliminó el archivo ventas-2024.xlsx a las 14:03:22 desde la IP 192.168.1.100."

**La pregunta que responde:** "Que hizo exactamente este usuario y cuando?"

**Por qué la contabilidad es tan importante como la autenticación:**

Sin registros de auditoría, no puedes:
- Saber que paso durante un breach.
- Identificar que datos fueron accedidos o robados.
- Probar quien fue el responsable (para acciones legales o disciplinarias).
- Cumplir con regulaciones (GDPR, SOX, PCI DSS).
- Aprender de los incidentes para mejorar la seguridad.

**Como falla la contabilidad:**

**Fallo 1:** Los logs no se generan (falta de configuración). El sistema no registro nada.

**Fallo 2:** Los logs se almacenan localmente y el atacante los borra después del ataque.

**Fallo 3:** Los logs son demasiado ruidosos (miles de eventos por segundo) y nadie los revisa.

**Fallo 4:** Los logs no tienen integridad: un atacante los modifica para ocultar sus pasos.

---

## El Factor Humano en AAA

El marco AAA asume que los usuarios son racionales. No lo son.

**Fatiga de autenticación:** Cuando un sistema pide autenticación constantemente, los usuarios buscan atajos. Contraseñas fáciles. Post-its en el monitor. Reutilización de contraseñas. Aceptar cualquier solicitud MFA sin mirar.

**El error de diseño:** Los sistemas ponen la carga de la seguridad en el usuario. Cada vez que le pides a un usuario que recuerde una contraseña compleja de 20 caracteres con símbolos, números y mayúsculas, estas pidiendo algo que los humanos hacemos mal por diseño. La solución no es entrenar mejor al usuario; es diseñar sistemas que no dependan de la memoria humana (gestores de contraseñas, SSO, passkeys, biometría).

---

## Autenticación multifactor (MFA)

Una contraseña sigue siendo común, pero no debería ser la única barrera para accesos sensibles. MFA combina autenticadores de categorías diferentes. No garantiza que una cuenta sea invulnerable: un atacante todavía puede explotar recuperación de cuenta, sesiones, dispositivos, consentimiento o factores susceptibles a phishing.

### Las tres categorías de factores

NIST SP 800-63-4 reconoce tres categorías:

1. **Algo que sabes:** contraseña o PIN.
2. **Algo que tienes:** llave de seguridad, dispositivo con passkey, tarjeta inteligente o aplicación autenticadora.
3. **Algo que eres:** característica biométrica utilizada para desbloquear un autenticador.

Dos pruebas de la misma categoría no constituyen MFA. Contraseña más PIN continúa siendo un solo factor de conocimiento. Contraseña más una llave criptográfica combina conocimiento y posesión.

La ubicación, la dirección IP, el comportamiento de escritura y el riesgo del dispositivo son **señales contextuales**. Pueden activar controles adicionales, pero NIST no las considera categorías independientes para afirmar que existe MFA.

### Resistencia al phishing

No todos los métodos MFA ofrecen la misma protección:

- **SMS y voz:** aportan una barrera adicional, pero dependen de la red telefónica y pueden verse afectados por portabilidad fraudulenta, redirección y engaño al usuario. NIST los trata como autenticadores restringidos.
- **TOTP:** evita depender del SMS, pero el código puede capturarse mediante phishing y reutilizarse dentro de su ventana de validez.
- **Notificaciones push:** pueden sufrir fatiga de aprobación. La vinculación por número y el contexto de la solicitud reducen el riesgo, pero no convierten el método en resistente al phishing.
- **WebAuthn, FIDO2 y passkeys:** vinculan criptográficamente la autenticación al origen legítimo. Son opciones resistentes al phishing cuando se implementan y recuperan correctamente.

Una passkey puede residir en una llave física, un dispositivo o un proveedor de credenciales sincronizadas. La biometría local suele desbloquear la clave; la huella no se envía al sitio como secreto compartido.

### Autenticación adaptativa

El sistema puede evaluar dispositivo, ubicación, horario, reputación de red y comportamiento para decidir si permite, bloquea o solicita una autenticación más fuerte. Estas señales deben complementar factores reales y no sustituir autorización, monitoreo ni protección de sesión.

### Criterios de diseño

- Exige autenticación resistente al phishing para administradores y operaciones de alto impacto cuando sea viable.
- Protege recuperación, registro y reemplazo de autenticadores con controles equivalentes al acceso normal.
- Permite revocar autenticadores y sesiones de forma independiente.
- No confíes en MFA para corregir autorización deficiente.
- Registra altas, cambios y fallos de autenticación sin almacenar secretos.
- Diseña alternativas accesibles y procedimientos de recuperación que no degraden la seguridad.

## Modelos de Control de Acceso: Cómo se Deciden los Permisos

Cuando trabajas en una empresa, no le das permisos a cada empleado uno por uno. Eso no escala. Usas modelos de control de acceso: sistemas que definen como se asignan y gestionan los permisos.

### DAC (Discretionary Access Control): Control de Acceso Discrecional

El dueño del recurso decide quien tiene acceso.

**Como funciona:** Tu creas un archivo. Tu decides quien puede leerlo, modificarlo o compartirlo. Es como Google Drive: tu creas un documento y decides si lo compartes por enlace, con personas específicas, o si lo dejas público.

**Ventajas:** Flexible. El dueño del dato tiene control directo.

**Desventajas:**
- No escala en organizaciones grandes. Un empleado en marketing no debería decidir quien accede a datos financieros.
- Riesgo de error humano: alguien comparte el archivo equivocado con la persona equivocada.
- No hay auditoría centralizada de quien tiene acceso a que.

**Donde se usa:** Sistemas operativos de escritorio (Linux: permisos de archivos con chmod), sistemas de archivos personales, herramientas de colaboración pequeñas.

**Fallo típico:** Un empleado comparte un enlace a una carpeta de Google Drive con datos de clientes. El enlace es "cualquiera con el enlace puede ver." El empleado no sabía que el enlace era público. El enlace se filtra. Datos expuestos.

### MAC (Mandatory Access Control): Control de Acceso Obligatorio

Nadie decide los permisos, ni siquiera el dueño del recurso. El sistema operativo impone etiquetas (labels) de seguridad obligatorias.

**Como funciona:** Cada recurso (archivo, proceso, dispositivo) tiene una etiqueta de seguridad (ej: "TOP SECRET", "SECRET", "CONFIDENTIAL", "UNCLASSIFIED"). Cada usuario tiene una autorización. El sistema decide si el usuario puede acceder al recurso basado en las reglas de la etiqueta. Ni el creador del archivo puede cambiar esto.

**Ventajas:**
- Extremadamente seguro. No depende de decisiones humanas.
- Ideal para entornos militares, de inteligencia, y gobierno.
- Previene la fuga de datos incluso si un usuario con altos privilegios intenta compartir información.

**Desventajas:**
- Muy rígido. Difícil de administrar en entornos que no sean estrictamente jerárquicos.
- Complejo de configurar.
- Los usuarios no pueden compartir recursos fácilmente.

**Ejemplos:** SELinux (Security-Enhanced Linux) en sistemas Red Hat/CentOS, AppArmor en Ubuntu, sistema de clasificación militar.

**Donde se usa en la práctica:** SELinux esta activo por defecto en muchas distribuciones de Linux empresariales (RHEL, CentOS, Fedora). Si SELinux bloquea algo que parece normal, es frustrante, pero esa frustración es la evidencia de que el control de acceso obligatorio esta funcionando.

**Fallo típico de MAC (configuración):** Un administrador, frustrado porque SELinux bloquea una aplicación, ejecuta `setenforce 0` para deshabilitar SELinux completamente en lugar de configurar la política correctamente. La protección MAC desaparece y el sistema queda más débil que antes.

### RBAC (Role-Based Access Control): Control de Acceso Basado en Roles

Los permisos no se asignan a individuos. Se asignan a roles (puestos de trabajo). Luego, los usuarios se asignan a roles.

**Como funciona:**
- Se define el rol "CONTADOR" con acceso al sistema de facturación y al libro mayor.
- Llega Juan, nuevo contador. Se le asigna el rol "CONTADOR." Juan obtiene automáticamente todos los permisos del rol.
- Se va Juan. Llega Maria. Se le asigna el rol "CONTADOR." Maria obtiene exactamente los mismos permisos que tenía Juan.
- Si el departamento de finanzas decide que los contadores necesitan acceso a un nuevo sistema, solo se modifica el rol "CONTADOR" y todos los contadores obtienen el acceso.

**Ventajas:**
- Escala perfectamente en organizaciones grandes. Miles de empleados, docenas de roles.
- Fácil de auditar. "Quien tiene acceso a facturación? Todos los que tienen el rol CONTADOR."
- La provisión y desprovision de acceso es simple. Nuevo empleado = asignar rol. Empleado que se va = quitar rol.

**Desventajas:**
- Los roles pueden ser demasiado amplios o demasiado restrictivos (role explosión: cuando necesitas cientos de roles diferentes).
- Los permisos dentro de un rol son estáticos. Un contador en España y un contador en Japón tienen los mismos permisos, aunque tal vez no deberían.

**Es el estándar de oro en empresas:** Microsoft Active Directory, AWS IAM (parcialmente), sistemas ERP (SAP, Oracle).

**Fallo típico:** "Role creep." Un empleado cambia de puesto varias veces dentro de la empresa, acumulando roles de puestos anteriores. Después de 5 años, tiene permisos de 3 puestos diferentes que ya no corresponden a su función actual. Si su cuenta se compromete, el atacante hereda todos esos permisos acumulados.

**Escenario ilustrativo de fallo de RBAC:** Un administrador de bases de datos en una empresa financiera llevaba 10 años en la empresa. Durante esos 10 años, había rotado por 4 departamentos diferentes. Cada vez le agregaban roles; nunca le quitaban los anteriores. Cuando su cuenta fue comprometida vía phishing, el atacante tenía acceso a sistemas de RRHH (de cuando trabajo en recursos humanos), sistemas de contabilidad (de su paso por finanzas), y acceso administrativo a la base de datos de producción (de su puesto actual). El RBAC no tenía un proceso de revisión periódica de roles, y los permisos se acumularon hasta crear una supercuenta involuntaria.

### ABAC (Attribute-Based Access Control): Control de Acceso Basado en Atributos

Es la evolución moderna del RBAC. En lugar de roles estáticos, usa reglas basadas en atributos del usuario, del recurso, del contexto y del entorno.

**Como funciona:** Se definen políticas del tipo: "SI (el usuario TIENE rol = contador) Y (la hora ES entre 9am y 6pm) Y (el dispositivo ESTA registrado en la empresa) Y (la ubicación ES la oficina central) ENTONCES permitir acceso."

**Atributos típicos:**
- Del usuario: rol, departamento, antigüedad, nivel de autorización.
- Del recurso: clasificación del dato (público, interno, confidencial, secreto).
- Del contexto: hora del día, día de la semana, ubicación geográfica.
- Del dispositivo: si esta administrado por la empresa, si tiene antivirus activo, versión del sistema operativo.
- Del riesgo: si el usuario esta intentando acceder desde una IP conocida por ataques previos.

**Ventajas:**
- Extremadamente granular y flexible.
- Puede adaptarse a contexto en tiempo real.
- Permite políticas complejas como "los contadores pueden ver informes financieros, pero solo en horario laboral, desde dispositivos corporativos, y solo si están en la oficina o conectados vía VPN."

**Desventajas:**
- Complejidad de implementación. Definir y mantener políticas ABAC requiere herramientas especializadas.
- Puede ser lento si hay que evaluar muchos atributos en cada solicitud.
- La gestión de atributos (mantenerlos actualizados) es un desafío operativo.

**Donde se usa:** Sistemas de nube (AWS IAM Policies, Microsoft Entra ID Conditional Access), sistemas de gestión de identidad modernos (Okta, Auth0).

**Ejemplo práctico de ABAC en acción:**
- Usuario: Maria, rol "ingeniera," nivel de autorización "L3."
- Recurso: Servidor de producción, clasificado como "crítico."
- Contexto: Las 2 AM, desde una IP en China, dispositivo no administrado.
- Decisión de ABAC: DENEGADO. Aunque Maria tiene el rol para acceder al servidor, el contexto (hora, ubicación, dispositivo) activa una regla de denegación.

Un sistema RBAC clásico habría permitido el acceso porque Maria tiene el rol "ingeniera." ABAC agrega las capas contextuales que hacen la diferencia entre un acceso legítimo y un acceso sospechoso.

---

## Single Sign-On (SSO): Una Contraseña para Gobernarlos a Todos

El SSO (Single Sign-On) permite a un usuario autenticarse una sola vez y acceder a múltiples sistemas sin volver a ingresar credenciales. Es como tener un pase único que te da acceso a todos los edificios de un campus.

### Como funciona técnicamente

Cuando te auténticas en el SSO (ej: con tu cuenta de Google o Microsoft 365), el sistema SSO genera un token de autenticación firmado digitalmente. Cuando intentas acceder a una aplicación (Slack, Jira, el sistema de nómina), la aplicación redirige tu navegador al SSO preguntando: "Este usuario ya esta autenticado?" El SSO verifica su token y responde: "Si, es juan.perez. Aquí esta una prueba firmada." La aplicación confía en la firma del SSO y te deja entrar sin pedir contraseña.

### Protocolos detrás del SSO

**SAML (Security Assertion Markup Language):** El protocolo clásico empresarial. Usa XML para intercambiar datos de autenticación y autorización entre el proveedor de identidad (IdP) y el proveedor de servicios (SP). Común en empresas con Active Directory.

**OAuth 2.0:** No es un protocolo de autenticación, aunque se usa como tal. Es un protocolo de autorización delegada. Permite que una aplicación (ej: una aplicación de terceros) acceda a recursos en nombre del usuario sin conocer su contraseña.

**OpenID Connect (OIDC):** Una capa de autenticación construida sobre OAuth 2.0. Es el estándar moderno que usan Google, Microsoft, Auth0 y Okta.

### Por qué SSO es más seguro (y menos seguro de lo que parece)

**Más seguro porque:**
- El usuario solo recuerda una contraseña. Puede hacerla realmente fuerte.
- El usuario no escribe su contraseña en cada aplicación, reduciendo la exposición a keyloggers y phishing.
- La empresa puede centralizar políticas de contraseñas y MFA en el SSO.
- Cuando un empleado se va, se desactiva su cuenta SSO y pierde acceso a todo.

**Menos seguro porque:**
- Si el SSO es comprometido, el atacante tiene acceso a todas las aplicaciones conectadas. Es un único punto de fallo.
- Un token SSO robado permite acceso a todo el ecosistema. No es suficiente robar una contraseña; hay que proteger el token.

**Fallo típico:** Un empleado instala una extensión de navegador maliciosa que roba las cookies de sesión del SSO. El atacante ahora tiene acceso a todas las aplicaciones corporativas sin necesidad de contraseña ni MFA, porque el token de sesión ya paso la autenticación.

### Proveedores de Identidad (IdP) y Federación

Un proveedor de identidad (IdP) es el sistema central que almacena las identidades y maneja la autenticación. Ejemplos: Microsoft Entra ID, Okta, Google Workspace, OneLogin.

La federación de identidades ocurre cuando dos organizaciones acuerdan confiar mutuamente en sus IdP. Ejemplo: tu empresa usa Okta. Tu socio comercial usa Microsoft Entra ID. Si federan identidades, puedes acceder a los sistemas de tu socio usando tus credenciales de Okta, sin crear una cuenta separada en su sistema.

---

## Privileged Access Management (PAM): Protegiendo las Cuentas Más Peligrosas

Si SSO es para usuarios normales, PAM es para administradores y cuentas privilegiadas. Es una capa adicional de seguridad sobre las cuentas que pueden hacer daño real.

### El Problema de las Cuentas Administradoras

Un administrador de sistemas tiene acceso a todo: puede leer cualquier base de datos, modificar cualquier configuración, crear o eliminar cuentas. Esta es la cuenta más valiosa para un atacante.

Las cuentas privilegiadas concentran capacidad de cambio y acceso sensible, por lo que un compromiso puede ampliar de forma considerable el impacto.

### Como Funciona PAM

**Credenciales dinámicas:** En lugar de que el administrador conozca la contraseña de root, un sistema PAM (CyberArk, BeyondTrust, Delinea) genera una contraseña temporal. El administrador solicita acceso, el sistema PAM verifica que tiene autorización, genera una contraseña de un solo uso, y la entrega al administrador. Cuando el administrador termina, la contraseña se inválida.

**Sesiones grabadas:** El sistema PAM puede actuar como proxy. El administrador se conecta al PAM, y el PAM se conecta al servidor. Todo lo que el administrador hace (cada comando, cada clic) queda grabado en video. Si hay un incidente, se revisa la grabación.

**Acceso just-in-time (JIT):** El administrador no tiene acceso permanente a los sistemas. Solicita acceso cuando lo necesita, por un tiempo limitado, y el acceso se revoca automáticamente. Esto contrasta con el modelo tradicional donde el administrador tiene acceso 24/7 aunque solo lo use 2 horas al día.

**Aprobación de dos personas (Dual Control):** Para acciones críticas (ej: restablecer la contraseña de un CEO, modificar reglas de firewall), se requiere que dos administradores diferentes autoricen la acción. Esto evita que un administrador comprometido o descontento pueda hacer daño por si solo.

### Escenario Ilustrativo de Fallo de PAM

En 2021, un administrador de sistemas de una empresa de telecomunicaciones en Latinoamérica fue despedido. Su cuenta de administrador no fue desactivada (fallo de desprovision) y no había PAM (las contraseñas eran estáticas y el las conocía). Esa noche, accedió al sistema de facturación y borró registros de clientes. La empresa tardo 3 semanas en recuperar los datos desde backups. El costo: 2 millones de dólares en perdidas operativas y multas regulatorias.

Con PAM, la contraseña de administrador se habría rotado automáticamente después de cada uso, y el acceso se habría revocado al momento del despido.

---

## El Problema de la Cuenta de Servicio

Un tema que casi nunca se cubre en cursos introductorios pero que causa breaches constantemente: las cuentas de servicio.

Una cuenta de servicio es una cuenta que no pertenece a una persona real. Es una cuenta que usan los sistemas para comunicarse entre si. Ejemplo: el servidor web necesita conectarse a la base de datos. Para eso, usa una cuenta de servicio.

**Por qué son peligrosas:**
- Casi siempre tienen contraseñas que nunca expiran. Se configuran una vez y se olvidan.
- Nadie las usa "directamente," por lo que nadie nota si están comprometidas.
- Suelen tener permisos muy amplios (el servidor web necesita acceso a la base de datos, y "por si acaso," le dan permisos de administrador).
- No están vinculadas a una persona, por lo que los procesos de "revisión de accesos" las ignoran.
- Las contraseñas suelen estar en archivos de configuración en texto plano.

**Como mitigarlas:**
- Usar secretos gestionados (Hashicorp Vault, AWS Secrets Manager, Azure Key Vault) en lugar de contraseñas estáticas.
- Rotar las contraseñas de servicio periódicamente.
- Aplicar el principio de mínimo privilegio también a cuentas de servicio.
- Monitorear el uso de cuentas de servicio (si una cuenta que solo se usa desde un servidor específico aparece desde otro origen, es una señal de alarma).

---

## El Ciclo de Vida de la Identidad

La gestión de identidad no termina cuando creas una cuenta. Tiene un ciclo de vida completo, y cada etapa tiene sus riesgos.

**Provisión (Creación):** Cuando un empleado nuevo llega a la empresa, se le crean cuentas, se le asignan roles, se le dan accesos. Riesgo: dar demasiados permisos desde el día uno "por si acaso los necesita."

**Revisión (Auditoría):** Periódicamente (cada 3, 6 o 12 meses), se revisan los accesos de cada empleado. Riesgo: las revisiones son superficiales. Un gerente firma una lista de 200 accesos sin mirarlos realmente. O peor: las cuentas de servicio no se revisan.

**Desprovision (Baja):** Cuando un empleado deja la empresa, se deben desactivar todas sus cuentas inmediatamente. Riesgo: las cuentas quedan activas. Una cuenta que permanece activa después de una baja conserva una vía de acceso sin propietario legítimo.

**Escenario ilustrativo de desaprovisionamiento fallido:** En 2019, un exempleado de una empresa de tecnología acceso al sistema de producción de la empresa usando su cuenta personal que nunca fue desactivada. Modifico configuraciones que causaron una caída del servicio durante 6 horas. La empresa perdió millones en ingresos y costo de recuperación. Todo porque nadie desactivo la cuenta cuando el empleado se fue.

---

## Autoevaluación: Criterio de Dominio

Puedes decir que entiendes identidad y permisos si puedes responder estas preguntas y explicárselas a alguien más.

1. Un usuario ingresa al portal del banco, escribe su nombre de usuario y contraseña, y accede a su cuenta. Esto es autenticación o autorización? Explica la diferencia.

2. Luego de iniciar sesión, el usuario intenta ver el saldo de la cuenta de otra persona y el sistema le muestra "Acceso denegado." Esto es un fallo de autenticación o de autorización?

3. Si proteges tu cuenta con una contraseña (algo que sabes) y un código numérico que te llega por correo electrónico (algo que... sabes? tienes? depende de como lo veas), es realmente MFA? Explica por qué si o por qué no basado en las categorías de factores.

4. Explica por qué el SMS es la peor forma de MFA. Usa el concepto de SIM swapping en tu explicación.

5. En el ataque a Uber de 2022, el atacante no conocía la contraseña del contratista al principio. Como logró acceder a la cuenta protegida con MFA? (Pista: MFA fatigue.)

6. Un administrador de sistemas deshabilita SELinux en un servidor Linux porque "interfiere con la aplicación." Que modelo de control de acceso estaba usando (DAC, MAC, RBAC, ABAC) y que implicaciones de seguridad tiene deshabilitarlo?

7. Una empresa tiene 50 empleados. Usa RBAC con 5 roles. Después de 3 años, tiene 45 roles diferentes. Que problema de RBAC esta ocurriendo y como se podría resolver?

8. Explica el concepto de "cuenta de servicio" y por qué es un riesgo de seguridad frecuente en las empresas. Que medidas tomarías para proteger las cuentas de servicio?

9. Usando ABAC, diseña una política de acceso para un sistema de nómina. Considera: quien puede acceder (rol), desde donde (ubicación), desde que dispositivo, y en que horario.

10. Un empleado deja la empresa. Su cuenta de correo electrónico y acceso al VPN siguen activos 6 meses después. Que riesgos específicos corre la empresa y que proceso debería haber evitado esta situación?

---
