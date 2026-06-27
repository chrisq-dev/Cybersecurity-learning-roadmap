---
title: "IAM Corporativo: La Tarjeta de Hotel"
---

# IAM Corporativo: La Tarjeta de Hotel

## Objetivo de esta Guía

Aprender la diferencia exacta entre "Autenticación" y "Autorización". Estos dos conceptos se confunden constantemente, pero en ciberseguridad, confundirlos significa dejar la puerta de la bóveda del banco abierta.

Como dice el famoso dicho de la industria moderna: "Los hackers ya no rompen las ventanas para entrar; simplemente inician sesión". Robar identidades es más barato, más rápido y más silencioso que programar virus.

## La Analogía

Imagina un hotel de lujo.

### Autenticación (Quien eres?)

Llegas a la recepción del hotel a las 3:00 PM. El recepcionista te pide tu Pasaporte. El mira la foto de tu pasaporte y mira tu cara. Si coinciden, el confirma que tu eres, efectivamente, Juan Perez.

En informática, esto es escribir tu Usuario y Contrasena, y poner el codigo de 6 dígitos que te llega al celular (Autenticación Multi-Factor - MFA). El sistema dice: "Ok, si eres el empleado Juan Perez".

El límite: Autenticarse NO te da permiso de hacer nada. Solo demuestra que eres tu.

### Autorización (Que puedes hacer?)

Una vez que el recepcionista sabe que eres Juan Perez, te entrega una Tarjeta Magnética Blanca.

- Tu caminas por el pasillo. Pasas la tarjeta por la puerta de la habitación 402, la luz se pone verde y entras (Autorizado).
- Bajas al primer piso e intentas usar la misma tarjeta para abrir la cocina del restaurante. La luz parpadea en rojo y la puerta no se abre (Denegado).
- Tu sigues siendo Juan Perez, pero no tienes los permisos para entrar a la cocina.

En informática, esto se llama RBAC (Role-Based Access Control). El sistema sabe que eres Juan (Ventas), por lo tanto tu tarjeta virtual solo abre la carpeta de Excel de Clientes, pero bloquea tu acceso a la carpeta de Nominas de Recursos Humanos.

## Autenticación: Los Tres Factores

La autenticación se clasifica en tres factores:

1. **Algo que sabes (Conocimiento):** Una contrasena, un PIN.
2. **Algo que tienes (Posesion):** Un teléfono, un token físico, una tarjeta inteligente.
3. **Algo que eres (Inherencia):** Huella dactilar, reconocimiento facial, iris.

### Autenticación de Un Solo Factor (SFA)

Solo usas un factor, tipicamente una contrasena. Es el menos seguro.

### Autenticación de Dos Factores (2FA)

Usas dos factores diferentes. Ejemplo:
- Contrasena (algo que sabes) + Codigo SMS (algo que tienes).

### Autenticación Multi-Factor (MFA)

Usas dos o más factores. Es el estándar mínimo para cuentas administrativas.

### Autenticación Sin Contrasena (Passwordless)

Tecnologías como Windows Hello, FIDO2/WebAuthn que eliminan la contrasena por completo usando:

- Biometrica (huella, rostro).
- Token físico (YubiKey).
- PIN local vinculado al dispositivo.

## Autorización: RBAC y ABAC

### RBAC (Role-Based Access Control)

Le pregunta "que rol tienes?" y decide por ti.

Los permisos se asignan según el rol del usuario en la organización.

Ejemplo:
- Rol: Analista de SOC
- Permisos: Leer logs, crear tickets, ejecutar scripts de respuesta.
- Rol: Administrador de Red
- Permisos: Configurar firewalls, modificar VPNs, resetear contraseñas.

**Ventajas:**
- Fácil de administrar (roles predefinidos).
- Escalable (nuevos empleados heredan permisos del rol).
- Consistente (todos los analistas tienen los mismos permisos).

**Desventajas:**
- Rigido (un analista senior puede necesitar más permisos que uno junior).
- Puede llevar a exceso de permisos (todos los analistas tienen los mismos permisos).

### ABAC (Attribute-Based Access Control)

Los permisos se asignan según atributos del usuario, recurso y entorno.

Atributos de ejemplo:
- Usuario: Departamento, ubicación, nivel de acceso.
- Recurso: Clasificación (público, interno, confidencial, secreto).
- Entorno: Hora del día, ubicación geográfica, dispositivo.

Ejemplo de política ABAC:

"Permitir acceso a documentos confidenciales solo si:
- El usuario pertenece al departamento de Finanzas.
- La hora es entre 9 AM y 6 PM.
- El dispositivo esta registrado en la empresa.
- La ubicación es la oficina corporativa."

**Ventajas:**
- Granularidad fina.
- Adaptativo (permisos cambian según el contexto).

**Desventajas:**
- Complejo de implementar.
- Difícil de depurar (por que me denego acceso?).

## Active Directory y Entra ID

### Active Directory (AD)

Es la base de datos maestra de usuarios en entornos Windows. Un libro gigante que contiene el nombre, el departamento y el nivel de acceso de todos los empleados.

Componentes de AD:

- **Domain Controller:** Servidor que autentica usuarios y aplica políticas.
- **Organizational Units (OU):** Contenedores que agrupan usuarios y equipos por departamento.
- **Group Policy (GPO):** Políticas que se aplican a usuarios y equipos.
- **Kerberos:** Protocolo de autenticación predeterminado.

Si despiden a un empleado, el equipo de IT lo borra del AD, y automáticamente pierde acceso a absolutamente todo en 1 segundo.

### Entra ID (antes Azure Active Directory)

Es la versión cloud de Active Directory. Se integra con Office 365, Azure y aplicaciones SaaS.

Diferencias con AD on-premise:

| Característica | AD (On-Prem) | Entra ID (Cloud) |
|----------------|--------------|------------------|
| Protocolo | Kerberos, LDAP | OAuth, SAML, OpenID Connect |
| Estructura | Árbol, bosque | Plana (tenant) |
| Dispositivos | GPO | Intune / MDM |
| Apps | Windows integrado | SaaS + SAML |
| Ubicación | Servidor local | Global, Microsoft |

### Sincronizacion AD - Entra ID

Muchas empresas usan ambos (hibrido). Azure AD Connect sincroniza usuarios entre AD on-premise y Entra ID.

Esto permite:
- Un solo inicio de sesión para apps locales y cloud.
- Gestión unificada de identidades.
- Desactivar una cuenta en AD y que se refleje en la nube.

## SSO (Single Sign-On)

En una empresa con 5,000 empleados y 50 sistemas diferentes (Correo, Base de Datos, Intranet, VPN), obligar al empleado a memorizar 50 contraseñas diferentes es un desastre. Terminará anotándolas en un Post-it pegado al monitor, y el hacker lo agradecerá.

### La Pulsera del Parque de Diversiones

Single Sign-On (SSO) (ej. Okta, PingIdentity, Azure AD SSO) se conecta al directorio central.

Cuando vas a un parque de diversiones, en lugar de hacer fila para sacar la cartera y pagar 5 dólares en la Montaña Rusa, y luego volver a hacer fila para pagar 3 dólares en los Carritos Chocones, pagas una sola vez en la entrada del parque y te ponen una Pulsera Verde de papel en la muñeca.

En informática, el empleado llega el lunes en la mañana. Escribe su contrasena una sola vez en la intranet de la empresa. El sistema SSO le da un Token criptográfico invisible (la pulsera). Durante el resto del día, el empleado puede abrir el Correo, el CRM y la Base de Datos mágicamente sin tener que volver a escribir contraseñas.

### Protocolos de SSO

**SAML (Security Assertion Markup Language):**

Usa XML para intercambiar datos de autenticación entre el proveedor de identidad (IdP) y el proveedor de servicio (SP).

Flujo SAML:
1. Usuario intenta acceder a una aplicación (ej. Salesforce).
2. Salesforce redirige al IdP (ej. Okta, Azure AD).
3. Usuario se autentica en el IdP (contrasena + MFA).
4. IdP genera una afirmación SAML (XML firmado).
5. Afirmación se envía a Salesforce.
6. Salesforce verifica la firma y concede acceso.

**OAuth 2.0 / OpenID Connect:**

OAuth 2.0 es un protocolo de autorización (no autenticación). OpenID Connect (OIDC) es una capa de autenticación sobre OAuth 2.0.

Flujo OIDC:
1. Usuario hace clic en "Login with Google".
2. Redirige a Google.
3. Usuario se autentica en Google.
4. Google devuelve un ID Token (JWT).
5. Aplicación verifica el JWT y autentica al usuario.

### Riesgos de SSO

Si el atacante roba el Token de la sesión SSO:

- Tiene acceso a todas las aplicaciones que el usuario puede abrir.
- No necesita contraseñas individuales.
- Puede escalar a aplicaciones más sensibles.

Protecciones:
- Tokens de corta duracion (15-60 minutos).
- Revocacion inmediata de sesiones.
- Anomaly detection (ubicación inusual, dispositivo nuevo).

## Federacion de Identidades

La federacion permite que usuarios de una organización accedan a recursos de otra organización sin crear cuentas separadas.

### Ejemplo Práctico

Empresa A (tiene AD) se fusiona con Empresa B (tiene G Suite). En lugar de crear 500 cuentas nuevas en AD, establecen una federacion:

- Usuarios de B acceden a recursos de A usando sus credenciales de G Suite.
- La confianza se establece mediante metadatos SAML intercambiados entre los dos IdPs.

### Confederation vs. SSO

- **SSO:** Un solo IdP para múltiples aplicaciones dentro de la misma organización.
- **Federacion:** Múltiples organizaciones confían entre si para autenticación.

## Provisioning y Deprovisioning

### Provisioning (Creación de Cuentas)

Cuando un nuevo empleado llega, el sistema de IAM debe:

1. Crear cuenta en AD/Entra ID.
2. Asignar grupos (departamento, cargo).
3. Crear cuentas en aplicaciones (correo, CRM, VPN).
4. Asignar licencias (Office 365, Slack, etc.).
5. Enviar credenciales temporales al empleado.

### Deprovisioning (Eliminación de Cuentas)

Cuando un empleado se va, el sistema de IAM debe:

1. Deshabilitar cuenta en AD (inmediato).
2. Revocar sesiones activas (SSO tokens, VPN).
3. Eliminar acceso a aplicaciones.
4. Transferir propiedades (correo, documentos).
5. Auditar que no queden accesos residuales.

Esto debe hacerse en minutos, no en dias.

## Identity Governance and Administration (IGA)

IGA es el marco de gobierno que asegura que las identidades sean gestionadas correctamente.

### Procesos de IGA

1. **Recertificacion de Accesos:** Periodicamente, los managers revisan que permisos tienen sus empleados y confirman que siguen siendo necesarios.

2. **Segregacion de Deberes (SoD):** Prevenir que una misma persona tenga permisos incompatibles (ej. crear una orden de compra y aprobarla).

3. **Auditoría de Accesos:** Reportes de quien tiene acceso a que, usado por auditores internos y externos.

4. **Identity Analytics:** Detección de anomalías en el uso de identidades (cuentas inactivas, accesos inusuales).

## Casos Reales

### El Ataque a Okta (2022)

Okta, uno de los mayores proveedores de SSO del mundo, fue comprometido cuando un atacante obtuvo acceso a la computadora de un empleado de un subcontratista (Sitel).

El atacante pudo:

- Acceder a la consola de administración de Okta.
- Ver las grabaciones de pantalla de los administradores.
- Robar tokens de sesión.

El impacto potencial era enorme: los clientes de Okta confían en Okta para autenticar a sus empleados. Si el atacante hubiera comprometido el SSO, podría haber accedido a cualquier aplicación de cualquier cliente.

### SolarWinds y el Abuso de Identidades (2020)

El ataque SolarWinds uso técnicas de suplantación de identidad para moverse lateralmente:

1. Comprometieron una cuenta de administrador de SolarWinds.
2. Usaron esa cuenta para firmar digitalmente el malware (parecia legítimo).
3. El malware se distribuyo como una actualización legítima.

La leccion: las identidades privilegiadas (como cuentas de firma de codigo) deben protegerse con extrema rigurosidad.

### El Empleado que Mantenía Acceso Post-Salida (2019)

Un exempleado de una empresa de tecnología mantuvo acceso a los sistemas de la empresa durante 6 meses después de ser despedido. El equipo de IT olvido:

- Deshabilitar su cuenta de AD.
- Revocar sus tokens de SSO.
- Cambiar contraseñas de servicio compartidas.

El exempleado accedio a la base de datos de clientes y vendio la información a un competidor.

## Modos de Falla

### Falla 1: Contraseñas Débiles o Reutilizadas

El 80% de las brechas involucran contraseñas débiles o robadas. Sin políticas de contraseñas fuertes y MFA, las credenciales son el eslabón más débil.

### Falla 2: Falta de MFA en Cuentas Administrativas

Las cuentas con permisos elevados sin MFA son el objetivo principal de los atacantes.

### Falla 3: Cuentas Compartidas

Varios administradores usando la misma cuenta (ej. "admin", "root"). No hay auditoría de quien hizo que.

### Falla 4: SSO sin Protección de Sesión

Tokens de SSO sin expiracion o sin revocacion rápida.

### Falla 5: Deprovisioning Lento

Empleados que se van pero mantienen acceso por semanas.

### Falla 6: Permisos Heredados Acumulados

Empleados que cambian de rol pero mantienen permisos de roles anteriores.

## La Mirada del Hacker

Como atacante, las identidades son mi vector de entrada favorito.

### Phishing de Credenciales

Creo una pagina de login falsa que imita a Azure AD, Okta o Gmail. Cuando la victima ingresa sus credenciales, las capturo y las uso inmediatamente.

### Ataque de Fuerza Bruta contra AD

Uso herramientas como Crowbar o Hydra para probar contraseñas comunes contra el portal de VPN o correo.

### Pass-the-Hash / Pass-the-Ticket

Si comprometo una computadora con un administrador logueado, puedo extraer:

- Hashes de contraseñas de la memoria (Mimikatz).
- Tickets Kerberos del caché.
- Tokens de sesión.

Con estos, puedo autenticarme como ese usuario sin conocer la contrasena.

### Abuso de Confianza de Federacion

Si la empresa confía en un IdP externo (federacion), y ese IdP es comprometido, puedo autenticarme como cualquier usuario de la empresa federada.

## SAML vs OAuth vs OpenID Connect

Es común confundir estos tres protocolos. Aclaremos la diferencia.

### SAML (Security Assertion Markup Language)

- **Propósito:** Intercambio de datos de autenticación y autorización.
- **Formato:** XML.
- **Uso típico:** SSO empresarial (Okta -> Salesforce, Azure AD -> AWS).
- **Flujo:** El usuario se autentica en el IdP, que genera una afirmación SAML firmada. El SP (Service Provider) verifica la firma.
- **Ventajas:** Maduro, ampliamente soportado en aplicaciones empresariales.
- **Desventajas:** XML es verboso, no diseñado para aplicaciones móviles.

### OAuth 2.0

- **Propósito:** Autorización delegada. Permite a una aplicación acceder a recursos en nombre de un usuario sin compartir la contrasena.
- **Formato:** JSON.
- **Uso típico:** "Inicia sesión con Google" (permiso limitado).
- **Flujo:** El usuario autoriza a la aplicación a acceder a sus datos. La aplicación recibe un access token.
- **Ventajas:** Ligero, flexible, diseñado para APIs.
- **Desventajas:** No define autenticación (solo autorización).

### OpenID Connect (OIDC)

- **Propósito:** Capa de identidad sobre OAuth 2.0.
- **Formato:** JSON (JWT).
- **Uso típico:** Autenticación de usuarios en aplicaciones web y móviles.
- **Flujo:** El usuario se autentica en el IdP, que devuelve un ID Token (JWT) con información del usuario.
- **Ventajas:** Diseñado para la web moderna, soporta móvil y single-page apps.
- **Desventajas:** Más complejo que SAML para casos simples.

### Tabla Comparativa

| Característica | SAML | OAuth 2.0 | OIDC |
|----------------|------|-----------|------|
| Propósito | AuthN + AuthZ | AuthZ | AuthN + AuthZ |
| Formato | XML | JSON | JWT |
| Uso principal | SSO empresarial | APIs | Apps web/móvil |
| Complejidad | Alta | Media | Media |
| Soporte móvil | Limitado | Bueno | Excelente |

## Identity Providers (IdP) Populares

### Okta

El IdP líder del mercado. Ofrece SSO, MFA, y gestión del ciclo de vida de identidades.

- Ventajas: Amplia integración con aplicaciones, fácil de configurar.
- Desventajas: Costo elevado, complejidad en empresas grandes.

### Microsoft Entra ID (Azure AD)

El IdP de Microsoft, integrado con Office 365, Azure y aplicaciones empresariales.

- Ventajas: Integración nativa con Microsoft ecosystem, incluido en licencias empresariales.
- Desventajas: Complejidad en configuración de federacion.

### Google Workspace

IdP para empresas que usan Gmail, Google Drive y Google Cloud.

- Ventajas: Integración nativa con GCP, facilidad de uso.
- Desventajas: Menor integración con aplicaciones empresariales tradicionales.

### OneLogin

IdP enfocado en PYMES. Ofrece funcionalidades similares a Okta a menor costo.

### PingIdentity

IdP enfocado en empresas grandes y gobierno. Ofrece federacion avanzada y API security.

## Modelo de Madurez de IAM

Las empresas pasan por etapas en su madurez de IAM:

### Nivel 1: Ad-Hoc

- Contraseñas locales en cada aplicación.
- Sin directorio central.
- Sin SSO.
- Sin MFA.
- Deprovisioning manual (si existe).

### Nivel 2: Centralizado

- Active Directory o Entra ID implementado.
- SSO básico (algunas aplicaciones integradas).
- MFA para aplicaciones críticas.
- Deprovisioning semi-automatizado.

### Nivel 3: Estandarizado

- IAM con RBAC implementado.
- SSO para todas las aplicaciones SaaS.
- MFA para todos los usuarios.
- Provisioning automatizado (SCIM).
- Recertificaciones periodicas.

### Nivel 4: Avanzado

- IAM con ABAC + RBAC.
- Federacion con socios y proveedores.
- Identity Analytics para detección de anomalías.
- Zero Trust (verificar siempre, confiar nunca).
- PAM para cuentas privilegiadas.

### Nivel 5: Optimizado

- IAM adaptativo (el riesgo determina el nivel de autenticación).
- Autenticación sin contrasena (passwordless).
- Identidad descentralizada (SSI - Self-Sovereign Identity).
- Automatización completa del ciclo de vida.

## SCIM (System for Cross-domain Identity Management)

SCIM es un protocolo para automatizar el intercambio de identidades entre sistemas.

### Que Permite SCIM

- Crear automáticamente cuentas de usuario en aplicaciones SaaS cuando se crean en AD.
- Actualizar atributos (nombre, departamento, rol) en todas las aplicaciones cuando cambian en AD.
- Deshabilitar cuentas en todas las aplicaciones cuando se desactivan en AD.

### Flujo SCIM

1. Usuario creado en AD.
2. Azure AD Connect detecta el cambio.
3. Azure AD envía una solicitud SCIM POST a Salesforce (por ejemplo) con los datos del nuevo usuario.
4. Salesforce crea el usuario y responde 201 Created.
5. Todo automático, sin intervención manual.

### Riesgos de SCIM

- Si un atacante compromete el IdP, puede crear usuarios en todas las aplicaciones.
- Los tokens de SCIM (usados para autenticar las solicitudes) deben protegerse.

## Autoevaluación

Responde estas preguntas para verificar si comprendes los conceptos:

1. El sistema de inicio de sesión de un banco te pide tu nombre de usuario, tu contrasena, y adicionalmente te pide que escanees tu huella dactilar en el celular. A que fase técnica del IAM corresponde esto: a la Autenticación o a la Autorización?

2. Usando la analogía de la Tarjeta Magnética del Hotel, explica por que un empleado del departamento de Marketing (que se valido correctamente en la VPN de la empresa) recibe un mensaje de "Acceso Denegado" al intentar leer un documento en la carpeta de Finanzas.

3. Un empleado es despedido el viernes a las 5:00 PM con carácter inmediato. Gracias a que la empresa utiliza una arquitectura centralizada con Active Directory, Por que el equipo de IT no tiene que entrar a los 50 programas diferentes que usaba el empleado para borrar su cuenta uno por uno?

4. El SSO (Single Sign-On) mejora drásticamente la comodidad del usuario (evita la fatiga de contraseñas). Sin embargo, Cual es el riesgo catastrófico para la empresa si un hacker logra robar el Token o Pulsera de la sesión SSO de un Gerente General?

5. Explica la diferencia entre Autenticación (Authentication) y Autorización (Authorization). Da un ejemplo de cada una en el contexto de acceso a una aplicación web.

6. Que es el ataque Pass-the-Hash y como se relaciona con la captura de credenciales de administradores en Active Directory?

7. Por que la sincronizacion entre AD on-premise y Entra ID (Azure AD Connect) puede ser un vector de ataque? Que pasaría si un atacante compromete el servidor de sincronizacion?

8. Un empleado cambia de departamento (de Marketing a Finanzas) pero mantiene los permisos de ambos departamentos. Que problema de seguridad representa esto y como lo solucionaria un sistema IGA (Identity Governance)?
