---
title: "PAM (Privileged Access Management): La Bóveda Nuclear"
level: "intermedio"
content_type: "guia"
updated: "2026-06-29"
---

# PAM (Privileged Access Management): La Bóveda Nuclear

## Objetivo de esta Guía

Aprender como proteger a los Dioses de la red corporativa.

En la guía anterior (IAM) hablamos de empleados normales como la recepcionista o el de ventas. Pero en toda empresa existe un pequeño grupo de humanos (el equipo de IT / Administradores de Sistemas) cuyas cuentas tienen poder absoluto.

- Si le robas la contraseña al de ventas, puedes leer el Excel de los clientes.
- Si le robas la contraseña al Administrador de Red (Domain Admin), eres el dueño de la empresa entera. Puedes borrar servidores, apagar el Antivirus, y robar bases de datos encriptadas.

Por eso, los hackers profesionales dedican el 90% de su tiempo a robar credenciales de Administradores. A esto se le llama Movimiento Lateral y Escalada de Privilegios.

## La Analogía

Imagina un submarino nuclear. Solo unas pocas personas tienen acceso a los códigos de lanzamiento de misiles. Esos códigos no están escritos en ningún papel. Están guardados en una caja fuerte de titanio que solo se abre con dos llaves diferentes, cada una en posesión de una persona diferente.

El PAM (Privileged Access Management) es esa caja fuerte de titanio para las contraseñas de los administradores de sistemas.

## El Problema: El Post-it en el Monitor

Históricamente, el Administrador de Sistemas creaba una sola cuenta en el Servidor Maestro con la contraseña `PasswordSuperFuerte123!`. Para no olvidarla, el Administrador la anotaba en un Post-it amarillo debajo de su teclado, o peor aún, usaba esa misma contraseña gigante para iniciar sesión en su laptop de uso diario.

### El Ataque

1. El hacker le hace Phishing a la recepcionista. Entra a su computadora.
2. Desde la computadora de la recepcionista, el hacker explora la red en silencio (Movimiento Lateral).
3. Descubre que el Administrador dejó su sesión iniciada en la red local.
4. El hacker usa una herramienta como Mimikatz (visto en Forense de Memoria), extrae la contraseña gigante de la memoria RAM del Administrador, y automáticamente gana el juego. (Ataque Pass-The-Hash).

### Cuentas de Servicio vs Cuentas de Administrador

Por qué esto importa: los hackers saben que las cuentas de servicio son como puertas sin cerrojo. Nadie las mira, nadie las cambia, perfectas para entrar sin hacer ruido.

Además de las cuentas humanas de administrador, existen las cuentas de servicio:

- Cuentas usadas por aplicaciones (bases de datos, web servers, backups).
- Suelen tener contraseñas que no cambian nunca.
- Suelen tener permisos elevados.

Estas cuentas son un objetivo favorito de los atacantes porque:

- No están asociadas a una persona (nadie nota si se usan).
- Las contraseñas casi nunca rotan.
- Tienen permisos para acceder a recursos críticos.

## La Solución: La Bóveda Nuclear (PAM)

Para detener esta masacre, las corporaciones implementan sistemas de PAM (Privileged Access Management) como CyberArk, BeyondTrust, Delinea (antes Thycotic).

### Como Funciona PAM

**Paso 1: La Custodia**

El sistema PAM inventa una contraseña de 120 caracteres aleatorios y la guarda adentro de una Bóveda Cibernética ultra blindada. El servidor maestro se configura para que solo acepte esa contraseña absurda.

**Paso 2: El Chequeo (Checkout)**

Son las 3:00 PM y el Administrador necesita reiniciar el servidor. El Administrador entra al portal del sistema PAM y solicita acceso: "Soy el Admin, necesito entrar al Servidor 5 por motivos de mantenimiento".

**Paso 3: La Entrega Temporal**

La Bóveda aprueba la petición. No le muestra la contraseña al Admin, sino que le inyecta la sesión automáticamente en su pantalla. El Admin reinicia el servidor.

**Paso 4: La Autodestrucción (Checkin)**

El Administrador termina su trabajo a las 3:30 PM y cierra la sesión. Inmediatamente, la Bóveda inventa una contraseña nueva de 120 caracteres diferentes y se la cambia al servidor de forma invisible.

### Por Que Esto Destruye a los Hackers

Incluso si el hacker logra infiltrarse en la computadora del Administrador a las 4:00 PM, no encontrará absolutamente nada. La contraseña ya roto, cambio, y nadie en el mundo humano sabe cual es la nueva.

### Modelos de PAM

**1. Vault-based PAM:**

El modelo clásico. Las contraseñas se almacenan en un vault centralizado.

- El administrador solicita acceso al vault.
- El vault verifica la identidad del administrador (MFA).
- El vault entrega la contraseña o inicia la sesión.
- El vault rota la contraseña después del uso.

**2. Privileged Session Management (PSM):**

El administrador no ve la contraseña. El sistema PAM inicia una sesión remota (RDP, SSH) y el admin opera dentro de esa sesión.

- Grabación de la sesión en video.
- Control de comandos permitidos.
- Transferencia de archivos bloqueada.

**3. Just-In-Time (JIT) Access:**

No hay contraseñas permanentes. Los permisos se otorgan por tiempo limitado.

- Un desarrollador necesita acceso a un servidor de producción por 2 horas.
- Solicita acceso just-in-time.
- El sistema crea una cuenta temporal con permisos específicos.
- Después de 2 horas, la cuenta se elimina automáticamente.

Esto es lo más cercano a Zero Trust en gestión de accesos.

## Grabación de Sesiones (Session Recording)

Los sistemas PAM modernos incluyen una función de auditoría extrema.

Cuando la Bóveda le concede el acceso al Administrador, el sistema empieza a grabar en video toda la pantalla y guarda un registro de cada tecla que presiona en la consola de comandos.

Si a las 3:15 PM el servidor maestro se borra por completo, el equipo forense no tiene que adivinar si fue un virus, o si fue un error humano, o si fue un Sabotaje Interno (Insider Threat). Simplemente abren la Bóveda, reproducen el video del Administrador, y ven exactamente el comando destructivo que tecleó.

### Análisis de Sesiones

El video de la sesión puede analizarse automáticamente:

- Buscar comandos peligrosos (`rm -rf /`, `DROP DATABASE`, `shutdown`).
- Detectar patrones de comportamiento anómalos (acceso fuera de horario).
- Extraer IoCs si la sesión fue comprometida.

## Descubrimiento de Cuentas Privilegiadas

Antes de proteger las cuentas, hay que saber que cuentas existen. Los sistemas PAM incluyen capacidades de descubrimiento:

1. Escanean la red en busca de servidores y servicios.
2. Identifican cuentas locales y de dominio.
3. Detectan cuentas inactivas o compartidas.
4. Clasifican cuentas por nivel de privilegio.

### Resultado del Descubrimiento

Un descubrimiento típico revela:

- Cuentas de administrador local en servidores (contraseñas iguales en todos).
- Cuentas de servicio con contraseñas que expiraron hace años.
- Cuentas de aplicaciones con permisos excesivos.
- Cuentas de exempleados que aún están activas.

## Rotación de Contraseñas

La rotación automática de contraseñas es una de las funciones clave de PAM.

### Frecuencia de Rotación

| Tipo de Cuenta | Frecuencia Recomendada |
|----------------|----------------------|
| Administrador de Dominio | Después de cada uso |
| Administrador Local | Diaria o semanal |
| Cuenta de Servicio | Mensual o trimestral |
| Cuenta de Aplicación | Trimestral |
| Cuenta de Emergencia (Break Glass) | Después de cada uso |

### Cuentas Break Glass (Rompe-Vidrios)

Son cuentas de emergencia para usar cuando el sistema PAM no esta disponible (fallo del vault, caída de red).

Características:

- Contraseña larga y compleja almacenada en un sobre sellado físico.
- Solo accesible por personas autorizadas (dos personas deben abrir el sobre).
- La contraseña se rota inmediatamente después de usar.
- Cada uso genera una alerta al SOC.

Si un administrador usa la cuenta Break Glass un sábado a las 3:00 AM, el SOC debe investigar inmediatamente.

## Segregación de Deberes (SoD) en PAM

Los sistemas PAM pueden aplicar segregación de deberes:

- Un administrador puede solicitar acceso a un servidor.
- Otra persona (aprobador) debe aprobar la solicitud.
- Nadie puede auto-aprobarse acceso.

Esto previene:
- Un admin malicioso que borra servidores.
- Un admin que accede a datos confidenciales sin supervisión.

## PAM en la Nube

Las cuentas cloud (IAM roles, service accounts, root accounts) también deben gestionarse con PAM.

### AWS IAM y PAM

- La cuenta root de AWS solo se usa con PAM (checkout/checkin).
- Los IAM roles se asignan just-in-time.
- Las API Keys se rotan automáticamente.

### Azure y PAM

- Azure Privileged Identity Management (PIM) es el servicio de Microsoft para PAM en Azure.
- Permite activar roles de Microsoft Entra ID solo cuando se necesitan.
- Las activaciones requieren aprobación y MFA.
- Las sesiones tienen duración limitada (típicamente 1-8 horas).

### GCP y PAM

- GCP tiene Cloud IAM con soporte para condiciones temporales.
- Se integra con herramientas de PAM de terceros (CyberArk, BeyondTrust).
- Las service accounts deben tener llaves rotadas.

## Casos Reales

### El Ataque a RSA SecurID (2011)

RSA, la empresa que fábrica los tokens de autenticación de dos factores, fue comprometida. Los atacantes robaron información relacionada con los tokens SecurID de RSA.

El impacto:

- Los atacantes pudieron generar códigos de autenticación para clientes de RSA.
- Lockheed Martin fue atacada usando estos códigos.
- RSA tuvo que reemplazar 40 millones de tokens.

La lección: incluso los fabricantes de seguridad pueden ser comprometidos. Las cuentas privilegiadas deben protegerse con todos los niveles de PAM.

### El Ataque a Uber (2016)

Un atacante obtuvo las credenciales de un administrador de Uber (almacenadas en GitHub). Esas credenciales le dieron acceso a:

- La cuenta de AWS de Uber.
- Datos de 57 millones de usuarios.
- Información de 600,000 conductores.

Uber pago $100,000 al atacante para que eliminara los datos (y no lo reporto a las autoridades, lo que resulto en multas y demandas).

La lección: si las credenciales de administrador están en código fuente subido a GitHub, no importa que tan fuerte sea la contraseña.

### El Caso del Administrador Despedido (2018)

Un administrador de sistemas de una empresa de salud fue despedido. Antes de irse, creo una cuenta de administrador oculta. Dos semanas después, accedió al sistema de registros médicos y robo datos de pacientes.

La empresa no tenía PAM. No había:

- Rotación de contraseñas.
- Auditoría de cuentas privilegiadas.
- Grabación de sesiones.
- Detección de cuentas inactivas.

Con PAM, la cuenta oculta del administrador habría sido detectada durante el descubrimiento automático de cuentas.

## Modos de Falla

### Falla 1: No Implementar PAM en Todas las Cuentas

Proteger solo las cuentas de dominio pero ignorar las cuentas locales de servidores. Los atacantes apuntan a las cuentas menos protegidas.

### Falla 2: Contraseñas de Servicio Sin Rotación

Las cuentas de servicio suelen tener contraseñas que no rotan nunca. Si un atacante las roba, tiene acceso persistente.

### Falla 3: Falta de Aprobación en Checkout

Permitir que los administradores se auto-aprueben el acceso. La segregación de deberes es esencial.

### Falla 4: Grabación de Sesiones Desactivada

Sin grabación de sesiones, no hay evidencia si algo sale mal. No se puede probar quien hizo que.

### Falla 5: Cuentas Break Glass Sin Control

Cuentas de emergencia que se usan sin generar alertas. El SOC debe ser notificado inmediatamente cuando se usa una cuenta Break Glass.

### Falla 6: No Integrar PAM con SIEM

Los logs de PAM deben enviarse al SIEM para correlación con otros eventos.

## La Mirada del Hacker

Como atacante, las cuentas privilegiadas son mi objetivo final. No importa cuántas capas de seguridad tenga la empresa, si logró una cuenta de administrador, todo se derrumba.

### Como Busco Cuentas Privilegiadas

1. **Escaneo de puertos:** Busco servidores con RDP (3389) o SSH (22) abiertos.
2. **Enumeración de AD:** Uso herramientas como BloodHound para mapear relaciones de confianza y encontrar rutas a cuentas de administrador.
3. **Credenciales en sitios de código:** Busco en GitHub contraseñas hardcodeadas.
4. **Dump de memoria:** Uso Mimikatz para extraer credenciales de la RAM.

### BloodHound: El Mapa del Tesoro

BloodHound es una herramienta que analiza Active Directory y muestra visualmente las rutas de escalada de privilegios.

Ejemplo de ruta que BloodHound encontraría:

"Usuario Juan -> Miembro del grupo Ventas -> Tiene acceso a la computadora del Admin -> Admin tiene sesión iniciada -> Extraer contraseña del Admin -> Admin es Domain Admin -> Game Over."

### Pass-the-Hash con Mimikatz

Una vez en la computadora de un administrador:

```cmd
mimikatz.exe
sekurlsa::logonpasswords
```

Esto extrae las contraseñas en texto plano de la memoria. Luego:

```cmd
sekurlsa::pth /user:Admin /domain:empresa.com /ntlm:HASH
```

Esto inicia una nueva sesión como Admin usando el hash robado, sin necesidad de la contraseña.

### PAM Como Defensa contra Mimikatz

Con PAM, incluso si el atacante ejecuta Mimikatz en la computadora del Admin:

- No encuentra contraseñas en la memoria (nunca estuvieron ahí).
- El Admin uso una sesión remota inyectada, no escribió la contraseña.
- La contraseña ya roto y cambio.

## PAM para Proveedores y Terceros

Las empresas no solo tienen que proteger sus propias cuentas privilegiadas, sino también las de proveedores y contratistas.

### Acceso de Terceros (Vendor PAM)

1. El proveedor solicita acceso a un sistema específico.
2. PAM crea una cuenta temporal con permisos limitados.
3. La cuenta expira automáticamente después del periodo acordado.
4. Todas las sesiones se graban y auditan.

### Zero Standing Privileges (ZSP)

El concepto de "cero privilegios permanentes" significa que ningún usuario (ni siquiera administradores) tiene permisos privilegiados de forma permanente. Los permisos se otorgan just-in-time y se revocan inmediatamente después del uso.

### Ejemplo de Flujo ZSP

1. Administrador necesita acceso a un servidor Linux.
2. Solicita acceso vía PAM (con justificación).
3. PAM verifica identidad (MFA), verifica horario, verifica aprobador.
4. PAM agrega al admin al grupo `sudoers` del servidor por 2 horas.
5. Admin ejecuta comandos con sudo.
6. Después de 2 horas, PAM elimina al admin del grupo `sudoers`.

## PAM en Entornos DevOps

Los entornos DevOps (CI/CD, Kubernetes, automatización) tienen necesidades especiales de PAM.

### Cuentas de Servicio en CI/CD

Los pipelines de CI/CD necesitan credenciales para desplegar código, acceder a registries de contenedores, y modificar infraestructura. Tradicionalmente, estas credenciales se almacenan como variables de entorno en Jenkins, GitLab o GitHub Actions.

**Problema:** Cualquiera con acceso al pipeline puede leer las credenciales.

**Solución PAM:**
- Las herramientas de CI/CD se integran con el vault de PAM.
- En lugar de almacenar la contraseña en una variable, el pipeline solicita la contraseña al vault en tiempo de ejecución.
- El vault entrega la contraseña solo para la duración del pipeline.
- La contraseña se rota después de cada uso.

### Kubernetes y PAM

Kubernetes tiene su propio sistema de secrets, pero no es un PAM. Para entornos empresariales:

1. **External Secrets Operator:** Sincroniza secrets de Kubernetes con un vault externo (AWS Secrets Manager, HashiCorp Vault, Azure Key Vault).
2. **CSI Secrets Store:** Monta secrets del vault directamente en los pods como volúmenes.
3. **Pod Identity:** Asigna identidades Microsoft Entra ID / AWS IAM a los pods para que puedan autenticarse sin secretos.

### Ejemplo: Integración Jenkins + Vault

1. Jenkins inicia un pipeline.
2. Antes de desplegar, Jenkins solicita al vault las credenciales de producción.
3. El vault verifica que Jenkins esta autorizado y entrega un token temporal.
4. Jenkins usa el token para autenticarse contra el servidor de producción.
5. Jenkins despliega la aplicación.
6. El token expira. Nadie puede reutilizarlo.

## Auditoría y Compliance con PAM

Los sistemas PAM son esenciales para cumplir con normativas:

### SOX (Sarbanes-Oxley)

- Requiere control de acceso a sistemas financieros.
- PAM proporciona auditoría detallada de quien accedió a que y cuando.
- Las sesiones grabadas sirven como evidencia en auditorías.

### PCI DSS

- Requiere proteger las cuentas de administrador de sistemas de tarjetas de crédito.
- PAM asegura que solo personal autorizado acceda a estos sistemas.
- La rotación de contraseñas cumple con el requisito de cambiar contraseñas periódicamente.

### ISO 27001

- A.9.2.3: Gestión de privilegios.
- A.12.4.1: Registro de eventos.
- A.12.4.3: Protección de logs.

### HIPAA

- Requiere control de acceso a datos médicos electrónicos.
- PAM asegura que solo personal autorizado acceda a los sistemas que contienen PHI (Protected Health Information).

## Casos Reales Adicionales

### El Ataque a Twitter (2020)

En julio de 2020, atacantes comprometieron cuentas de Twitter de alto perfil (Bill Gates, Elon Musk, Barack Obama) para promover una estafa de Bitcoin.

El ataque comenzó cuando los atacantes hicieron ingeniería social a empleados de Twitter que tenían acceso a herramientas administrativas internas. Usaron credenciales de empleados para acceder al panel de administración y cambiar la dirección de correo electrónico de las cuentas objetivo.

**Lecciones:**
- Las herramientas administrativas internas deben protegerse con PAM.
- Los empleados con acceso privilegiado deben tener MFA obligatorio.
- El acceso a funciones críticas (cambio de correo, reseteo de contraseña) debe requerir aprobación de un segundo empleado.

Si Twitter hubiera tenido PAM con segregación de deberes, un solo empleado comprometido no habría podido cambiar las cuentas.

### El Ataque a SolarWinds (2020)

Los atacantes comprometieron las credenciales de un administrador de SolarWinds y las usaron para firmar el malware Sunburst. La cuenta de firma de código tenía permisos excesivos y no estaba protegida con PAM.

**Lecciones:**
- Las cuentas de firma de código son cuentas privilegiadas y deben gestionarse con PAM.
- La rotación de contraseñas y el acceso just-in-time habrían limitado el daño.

## Modos de Falla Adicionales

### Falla 7: PAM Sin Cobertura de Cuentas Locales

Muchas empresas implementan PAM solo para cuentas de dominio (Active Directory), olvidando las cuentas locales de servidores Linux y Windows.

### Falla 8: No Integrar PAM con la Gestión de Parches

Las vulnerabilidades en sistemas privilegiados (servidores, firewalls, routers) son especialmente peligrosas porque el atacante puede escalar desde una vulnerabilidad de software a una cuenta privilegiada.

### Falla 9: Sesiones PAM sin Grabación

Sin grabación de sesiones, la auditoría se basa en logs de texto que pueden ser alterados. La grabación en video proporciona evidencia irrefutable.

### Falla 10: No Probar el Sistema PAM Regularmente

Los sistemas PAM son complejos y pueden fallar. Sin pruebas regulares (fire drills), el equipo no sabrá como actuar cuando el PAM no funcione (por ejemplo, durante una caída de red).

## La Mirada del Hacker: Como Atacar un Sistema PAM

Como atacante, el PAM es mi peor enemigo. Si logró comprometer el propio PAM, tengo acceso a todas las contraseñas de la empresa.

### Ataque al Vault de PAM

El vault (bóveda) de PAM es un objetivo de alto valor. Si logró comprometer el servidor de PAM:

1. Puedo leer todas las contraseñas almacenadas.
2. Puedo crear cuentas de administrador falsas.
3. Puedo ver las grabaciones de sesiones de otros administradores.

**Protecciones:**
- El vault debe estar aislado en su propia red (segmentación).
- Solo personal autorizado debe tener acceso administrativo al vault.
- El vault debe tener MFA para todas las operaciones administrativas.
- Los logs de acceso al vault deben enviarse a un SIEM separado.

### Ataque de Denegación de Servicio al PAM

Si logró hacer que el PAM no funcione (caída del servidor, ataque DDoS), los administradores no podrán obtener acceso a los sistemas. Esto puede causar:

- Caída de operaciones críticas.
- Los administradores usarán las cuentas Break Glass (menos seguras).
- El caos facilita otros ataques.

**Protecciones:**
- El PAM debe ser altamente disponible (HA).
- Debe haber un plan de contingencia para cuando el PAM no este disponible.
- Las cuentas Break Glass deben estar protegidas pero accesibles en emergencias.

### Credenciales de Servicio Sin Protección

Las cuentas de servicio (usadas por aplicaciones) suelen estar fuera del alcance del PAM porque las aplicaciones necesitan las contraseñas en texto plano para funcionar. Los atacantes buscan:

- Archivos de configuración con contraseñas.
- Variables de entorno con contraseñas.
- Scripts de inicio con contraseñas hardcodeadas.

**Protecciones:**
- Usar Managed Service Accounts (MSA) o Group Managed Service Accounts (gMSA) en Windows.
- Usar roles de instancia (IAM) en la nube en lugar de contraseñas.
- Usar vaults de aplicaciones (como HashiCorp Vault) que entregan contraseñas a las aplicaciones en tiempo de ejecución.

## El Futuro del PAM: Hacia Cero Privilegios

La tendencia en PAM es hacia:

1. **Cero privilegios permanentes (Zero Standing Privileges):** Ningún usuario tiene acceso privilegiado permanente. Todo se otorga just-in-time.

2. **Acceso sin contraseña (Passwordless):** Usar biometría, tokens físicos o certificados en lugar de contraseñas.

3. **Machine Learning para detección de anomalías:** El PAM aprende el comportamiento normal de los administradores y alerta cuando algo es inusual (acceso fuera de horario, desde ubicación extraña, a sistemas no habituales).

4. **Integración con SOAR:** Cuando el PAM detecta una anomalía, el SOAR puede automáticamente revocar el acceso, aislar el endpoint, y notificar al SOC.

## Autoevaluación

Responde estas preguntas para verificar si comprendes los conceptos:

1. Un hacker logra tomar control de la computadora de un becario de Marketing. Explica que es el Movimiento Lateral y cual es el objetivo final (la cuenta objetivo) del hacker durante esta fase del ataque.

2. El Administrador de Bases de Datos de tu empresa dice que el sistema PAM "es muy molesto" y propone que simplemente le dejen configurar una contraseña muy compleja (ej. 30 caracteres) y que el promete guardarla en su mente. Usando el concepto de la Bóveda Nuclear y la rotación de claves, explica por qué la propuesta del Administrador sigue siendo un riesgo inaceptable para la empresa.

3. Un ataque de Pass-The-Hash (robar una credencial directamente de la Memoria RAM) depende de que la contraseña permanezca estática y valida por mucho tiempo. Como mitiga matemáticamente un sistema de Privileged Access Management (PAM) este vector de ataque específico?

4. Ocurre una caída masiva del sistema de nominas el día de pago. El Administrador jura que el solo estaba "leyendo" la configuración y no tocó nada. Si la empresa cuenta con un sistema PAM de nivel empresarial, Que evidencia exacta buscaría el Analista Forense para comprobar o desmentir la versión del Administrador?

5. Que es una cuenta "Break Glass" (Rompe-Vidrios) en PAM y bajo que circunstancias debería usarse?

6. Explica el concepto de Just-In-Time (JIT) Access. Como reduce el riesgo comparado con tener cuentas administrativas permanentes?

7. Por qué las cuentas de servicio (usadas por aplicaciones) son un objetivo favorito de los atacantes y como PAM las protege?

8. Cual es la diferencia entre vault-based PAM y privileged session management (PSM)? En que escenarios usarías cada uno?
