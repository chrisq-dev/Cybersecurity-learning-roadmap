---
title: "Fundamentos de Correo Electrónico: El Sello de Cera Real"
---

# Fundamentos de Correo Electrónico: El Sello de Cera Real

## Objetivo de esta Guía

Aprender la falla técnica más grande del internet antiguo, y como tres protocolos matemáticos intentan salvar el mundo corporativo.

En la guía de Ingeniería Social aprendimos sobre el Phishing. Pero la pregunta técnica que todo Ingeniero debe hacerse es: Como es posible que un hacker pueda enviar un correo desde la dirección `facturacion@netflix.com` si el hacker no trabaja en Netflix?

La respuesta es que el protocolo base del correo electrónico (SMTP), inventado en 1982, fue diseñado asumiendo que nadie mentiría en internet. Esa suposición ingenua es la madre de todos los ataques de phishing corporativo.

## La Analogía

Imagina el sistema de correo l tradicional. Tomas un sobre en blanco, metes un papel adentro, tomas una pluma y escribes en la esquina superior izquierda del sobre: "Remitente: El Presidente de la Nación". Le pones un sello l y se lo entregas al cartero.

El cartero no tiene la autoridad ni la capacidad de verificar si el Presidente realmente te dio permiso para escribir su nombre en ese sobre. El cartero simplemente lo entrega en el destino.

En informática, esto se llama Email Spoofing (Falsificación de Identidad). Un servidor de correo (el cartero) de forma predeterminada no verifica si tu eres el dueño del dominio `netflix.com`. Simplemente obedece las instrucciones del sobre. Esto hizo que el Phishing corporativo se saliera de control.

Para arreglar esta falla masiva, la industria no destruyó el sistema de correo antiguo (seria imposible cambiar 40 años de infraestructura global), sino que le agregó tres capas de seguridad con criptografía encima: SPF, DKIM y DMARC.

## El Protocolo SMTP y su Falla Original

Cuando diseñas un protocolo asumiendo que todos son buenos? Exactamente esto.

El Simple Mail Transfer Protocol (SMTP) fue definido en RFC 821 en 1982. En esa epoca, internet era una red academica y militar donde todos los participantes eran confiables.

### Como Funciona SMTP (Simplificado)

Cuando envías un correo, tu cliente de correo (Outlook, Gmail) se conecta al servidor SMTP de tu proveedor y le dice algo como:

```
HELO clienteweb.com
MAIL FROM: <atacante@gmail.com>
RCPT TO: <victima@banco.com>
DATA
Subject: Tu cuenta ha sido bloqueada
Haz clic aqui para recuperar tu acceso...
.
```

El servidor SMTP no verifica si realmente eres `atacante@gmail.com`. Simplemente acepta lo que le digas en `MAIL FROM` y lo reenvia al destino. Cualquier persona con acceso a un servidor SMTP (incluso público) puede enviar correos con cualquier remitente.

### La Cabecera "From" es Solo Texto

La dirección de correo que ves en tu cliente de correo (la cabecera `From:`) es simplemente un campo de texto. No hay verificación criptográfica que valide que el remitente es quien dice ser. Es como escribir el remitente en un sobre de papel con lápiz.

### Extensiones Posteriores (ESMTP)

Con el tiempo se anadieron extensiones como:

- SMTP-AUTH: autenticación para usar el servidor SMTP (evita que cualquiera use tu servidor para enviar correos). Pero no verifica la identidad del remitente declarado.
- STARTTLS: cifrado de la conexion entre servidores SMTP. Protege el contenido en tránsito, pero no verifica la identidad del remitente.

Ninguna de estas extensiones resuelve el problema fundamental: el protocolo confía en el remitente declarado.

## SPF: La Lista de Carteros Autorizados

Sender Policy Framework (SPF), definido en RFC 7208, fue el primer intento serio de solucionar el spoofing.

### Como Funciona

El dueño de un dominio publica un registro TXT en su DNS que lista explícitamente las direcciones IP autorizadas para enviar correos desde ese dominio.

Ejemplo del registro SPF de Google:

```
v=spf1 include:_spf.google.com ~all
```

Esto significa: "Los servidores de correo de Google están en la lista `_spf.google.com`. Cualquier otro servidor que intente enviar correos como `@gmail.com` debe ser tratado con sospecha (soft fail)."

### Mecanismo de Validación

1. El servidor de correo del receptor (ej. Outlook) recibe un correo de `remitente@empresa.com`.
2. El receptor consulta el DNS de `empresa.com` y busca el registro SPF.
3. El receptor extrae la IP del servidor que envio el correo (de la cabecera `Received`).
4. Compara la IP contra la lista del registro SPF.
5. Si la IP esta en la lista: PASS. Si no: FAIL.

### Limitaciones de SPF

SPF tiene problemas graves:

1. **Reenvío de Correos:** Si un correo legítimo se reenvia, la IP del reenviador no esta en el SPF original, y el correo se marca como falso. Esto rompe listas de correo y sistemas de tickets.

2. **Solo Verifica la IP, no el Contenido:** Un atacante puede configurar su propio servidor en una IP autorizada por SPF (si logra acceso a la infraestructura) y seguir enviando correos falsos.

3. **Límite de 10 Consultas DNS:** SPF tiene un límite de 10 consultas DNS (para evitar ataques DDoS). Dominios con infraestructura compleja pueden exceder este límite.

4. **No Protege contra Alteracion:** SPF no verifica que el contenido del correo no fue modificado en el tránsito. Solo verifica que el servidor de envio esta autorizado.

## DKIM: El Sello de Cera Real

DomainKeys Identified Mail (DKIM), definido en RFC 6376, agrega una firma criptográfica a cada correo.

### Como Funciona

1. El servidor de correo del remitente genera un par de llaves RSA o ECDSA.
2. La llave pública se publica en el DNS del dominio.
3. Cuando se envía un correo, el servidor firma ciertas cabeceras (From, Subject, Date) y el cuerpo del mensaje con la llave privada.
4. La firma se incluye como una cabecera adicional: `DKIM-Signature`.
5. El servidor receptor consulta la llave pública en el DNS y verifica la firma.

### Anatomía de una Firma DKIM

```
DKIM-Signature: v=1; a=rsa-sha256; c=relaxed/relaxed;
  d=gmail.com; s=20230601;
  bh=47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU=;
  h=from:to:subject:date:message-id;
  b=AwEAAH/8... (firma larga en Base64)
```

- `d=gmail.com`: el dominio que firma.
- `s=20230601`: el selector (apunta al registro DNS donde esta la llave pública).
- `bh`: el hash del cuerpo del mensaje.
- `h`: las cabeceras que fueron firmadas.
- `b`: la firma criptográfica.

### Selectores DKIM

Los selectores permiten tener múltiples llaves públicas simultáneamente. Son utiles para:

- Rotar llaves periodicamente.
- Tener llaves diferentes para diferentes servicios (marketing, transaccional, corporativo).
- Revocar una llave comprometida sin afectar las demás.

El registro DNS de la llave pública se ve así:

```
20230601._domainkey.gmail.com. TXT "v=DKIM1; k=rsa; p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA..."
```

### Que Protege DKIM

- **Integridad:** Si alguien modifica el correo en el tránsito, la firma se rompe.
- **Autenticidad del Remitente:** Demuestra que el correo paso por un servidor que posee la llave privada del dominio.

### Que NO Protege DKIM

- **Si la llave privada es robada:** El atacante puede firmar correos falsos.
- **Si el dominio esta comprometido:** El atacante puede publicar su propia llave pública en el DNS.
- **Contra phishing de dominios similares:** Si el atacante usa `netflix-pagos.com` en lugar de `netflix.com`, DKIM no aplica porque el dominio es diferente.

## DMARC: El Ejecutor de Órdenes

Domain-based Message Authentication, Reporting, and Conformance (DMARC), definido en RFC 7489, es la capa que une SPF y DKIM y le dice al servidor receptor que hacer si fallan.

### Políticas DMARC

El dueño del dominio publica un registro TXT en DNS:

```
_dmarc.empresa.com. TXT "v=DMARC1; p=reject; rua=mailto:dmarc@empresa.com"
```

Las políticas disponibles son:

1. **p=none:** "Monitoriza pero no hagas nada". El servidor receptor debe enviar reportes, pero no bloquea los correos que fallan. Útil para pruebas iniciales.

2. **p=quarantine:** "Si falla la autenticación, pon el correo en la carpeta de SPAM". Reduce el riesgo pero aún permite que el usuario vea correos sospechosos.

3. **p=reject:** "Si falla la autenticación, rechaza el correo. No lo entregues, no lo pongas en SPAM, destrúyelo". Esta es la única política realmente segura.

### Alineacion de Identificadores

DMARC requiere que el dominio en la cabecera `From` coincida con:

- **SPF:** El dominio en `MAIL FROM` (SPF) debe coincidir con el dominio en `From` (cabecera). Esto es alineacion SPF.
- **DKIM:** El dominio en la firma DKIM (`d=`) debe coincidir con el dominio en `From` (cabecera). Esto es alineacion DKIM.

Se considera que un correo pasa DMARC si pasa SPF Y tiene alineacion, O pasa DKIM Y tiene alineacion.

### Reportes Agregados (RUA)

DMARC incluye un mecanismo de reportes. El dominio publica una dirección de correo donde recibir reportes XML diarios:

```
rua=mailto:dmarc-reports@empresa.com
```

Estos reportes contienen:

- Cuántos correos se enviaron desde el dominio.
- Cuántos pasaron SPF, DKIM y DMARC.
- Las IPs de los servidores que intentaron enviar correos.
- La accion tomada por el servidor receptor (none, quarantine, reject).

Para el Blue Team, estos reportes son oro puro. Revelan:

- Servidores no autorizados que están enviando correos de tu dominio (posible compromiso).
- Servicios de terceros que usan tu dominio sin configuración adecuada.
- Errores de configuración que causan que correos legítimos sean rechazados.

### Implementación Gradual

La migración a DMARC debe ser gradual para evitar bloquear correos legítimos:

1. **Fase 1 - Monitorizacion:** Implementar `p=none` por 1-2 meses. Analizar los reportes para identificar flujos de correo legítimos que no están autenticados.

2. **Fase 2 - Cuarentena:** Implementar `p=quarantine` por 1 mes. Los correos sospechosos van a SPAM en lugar de ser bloqueados.

3. **Fase 3 - Rechazo:** Implementar `p=reject`. Solo los correos que pasan autenticación llegan a la bandeja de entrada.

Cada fase debe ir acompanada de comunicación con los equipos de negocio para identificar falsos positivos.

## Casos Reales

### El Robo de 100 Millones de Dólares por BEC (2016-2019)

El Business Email Compromise (BEC) es un tipo de ataque donde el atacante falsifica correos de ejecutivos para ordenar transferencias bancarias. Según el FBI, entre 2016 y 2019 las perdidas globales por BEC superaron los 26 mil millones de dólares.

El ataque típico:

1. El atacante investiga la empresa (LinkedIn, web corporativa).
2. Identifica al CFO y al CEO.
3. Envía un correo falsificado desde `ceo@empresa.com` (con spoofing) al departamento de Finanzas.
4. El correo ordena una transferencia urgente a una cuenta en el extranjero.
5. Sin DMARC, el correo llega a la bandeja de entrada como legítimo.

Si la empresa hubiera tenido DMARC con `p=reject`, el correo nunca habría llegado a la bandeja de entrada del empleado de Finanzas.

### El Caso del Correo de Google y PayPal (2017)

Un investigador de seguridad descubrió que Google y PayPal tenían configuraciones de SPF y DKIM correctas, pero DMARC en `p=none`. Esto significaba que cualquier atacante podía falsificar correos de `@google.com` o `@paypal.com` y estos llegarian sin problemas a las víctimas.

Google corrigio la configuración a `p=reject` después de que el investigador lo publicara.

### El Ataque a Ubiquiti Networks (2015)

Ubiquiti Networks, una empresa de tecnología, perdió 46.7 millones de dólares en un ataque BEC. Los atacantes falsificaron correos de ejecutivos y ordenaron transferencias a cuentas controladas por ellos.

La empresa tenía configuraciones de seguridad de correo débiles. Si hubieran tenido DMARC con `p=reject`, el ataque habría sido imposible.

## Modos de Falla

### Falla 1: DMARC en None

La configuración `p=none` es útil para monitorizacion inicial, pero muchas empresas la dejan permanentemente. Esto anula completamente la protección. DMARC en `none` solo recolecta datos, no bloquea nada.

### Falla 2: SPF con Mecanismo ~all (Soft Fail)

Muchos registros SPF usan `~all` (soft fail) en lugar de `-all` (hard fail). Esto le dice al servidor receptor "esto podría ser falso, pero no estoy seguro". Muchos servidores interpretan `~all` como "déjalo pasar".

### Falla 3: No Monitorear los Reportes

DMARC genera reportes XML diarios. Si nadie los lee, no sirven para nada. Empresas grandes pueden recibir miles de reportes por día. Se necesita una herramienta automatizada (como DMARCian, Valimail o Dmarcian) para procesarlos.

### Falla 4: Olvidar los Subdominios

DMARC por defecto cubre el dominio principal y los subdominios. Pero si configuras SPF solo para el dominio principal y dejas subdominios sin configurar, un atacante puede usar `subdominio.empresa.com` para enviar correos falsos.

### Falla 5: No Incluir Servicios de Terceros

Muchas empresas usan servicios de marketing (Mailchimp, SendGrid) que envían correos desde su dominio. Si estos servicios no están incluidos en SPF ni tienen DKIM configurado, los correos de marketing serán bloqueados o marcados como SPAM.

## La Mirada del Hacker

Como atacante, el correo electrónico es mi vector de entrada favorito. Es más fácil que encontrar una vulnerabilidad de software.

### Ataques Cuando DMARC no Existe

Si la empresa objetivo no tiene DMARC, mis opciones son:

1. **Spoofing Directo:** Envio correos como `ceo@empresa.com`. El servidor receptor no verifica nada. La victima ve el nombre del CEO en su bandeja de entrada.

2. **Spoofing con Display Name:** Uso una cuenta falsa de Gmail pero pongo el nombre de visualizacion del CEO: "Juan Perez (CEO)" con dirección `juan.perez@gmail.com`. Muchos usuarios miran solo el nombre, no la dirección.

3. **Dominio Similar (Typosquatting):** Registro `empresa-seguridad.com` o `empresaa.com` y envio correos desde ahí. Con una letra diferente, la mayoría de usuarios no nota la diferencia.

### Ataques Cuando DMARC Existe

Si la empresa tiene DMARC `p=reject`, no puedo falsificar su dominio. Pero tengo alternativas:

1. **Comprometer una Cuenta Real:** Envio un phishing a un empleado real para robar sus credenciales. Una vez dentro, envio correos desde la cuenta legítima del empleado comprometido.

2. **Ataque a Proveedores:** Envio correos falsos desde el dominio de un proveedor o socio (que quizas no tiene DMARC). La empresa confía en correos de sus socios.

3. **Whaling con Ingeniería Social:** Sin falsificar el dominio, creo un correo convincente desde una cuenta personal del CEO (si encuentro su correo personal en redes sociales).

### Como Atacar la Configuración de Correo

Como atacante, si logró acceso a la consola de administración de Office 365 o Google Workspace:

- Puedo agregar mi propia llave DKIM y firmar correos como si fueran del dominio legítimo.
- Puedo modificar el registro SPF para incluir mi servidor.
- Puedo cambiar la política DMARC a `p=none`.

Esto requiere comprometer la cuenta del administrador de correo. Es un ataque de alto valor que justifica toda la protección de PAM y MFA.

### Domain Takeover

Si la empresa deja expirar su dominio y no lo renueva, puedo comprarlo. Una vez que tengo el dominio:

- Configuró mis propios registros MX y recibo correos dirigidos a la empresa.
- Configuró SPF, DKIM y DMARC para mi infraestructura.
- Puedo enviar correos "legítimos" desde el dominio.

Esto se llama Domain Takeover y es una amenaza real para empresas que no gestionan sus dominios correctamente.

## Protocolos de Reporte y Monitoreo DMARC

DMARC no solo bloquea correos falsos, sino que también genera reportes valiosos para el equipo de seguridad.

### RUA (Reporting URI for Aggregate Reports)

Los reportes agregados (XML) se envían diariamente a la dirección configurada en `rua`. Contienen:

- Número de correos recibidos desde tu dominio.
- Resultados de SPF (pass, fail, softfail).
- Resultados de DKIM (pass, fail).
- Resultados de DMARC (pass, fail).
- Direcciones IP de los servidores que enviaron correos.
- Accion tomada por el receptor (none, quarantine, reject).

### RUF (Reporting URI for Forensic Reports)

Los reportes forenses (opcionales) se envían a la dirección configurada en `ruf`. Contienen:

- El correo completo que fallo la autenticación.
- Cabeceras completas.
- Cuerpo del mensaje.

**Precaución:** Los reportes forenses pueden contener datos personales, por lo que su uso esta regulado por privacidad.

### Análisis de Reportes

Los reportes DMARC permiten:

1. **Detectar suplantación:** Si ves correos desde IPs desconocidas, alguien esta intentando falsificar tu dominio.

2. **Identificar servicios no autorizados:** Departamentos que contrataron servicios de email marketing sin informar a IT.

3. **Validar migraciones:** Cuando cambias de proveedor de correo, los reportes confirman que los nuevos servidores están autenticando correctamente.

4. **Medir la efectividad de DMARC:** Ver como disminuyen los correos falsos a medida que subes la política de `none` a `quarantine` y finalmente a `reject`.

## SPF: Implementación Avanzada

### Mecanismos SPF

Además del mecanismo `include`, SPF soporta:

- **`ip4`:** Especificar una IP o rango IPv4.
  `ip4:192.168.1.0/24` - autoriza el rango 192.168.1.0-255.

- **`ip6`:** Especificar una IP o rango IPv6.

- **`a`:** Autoriza la IP del registro A del dominio.
  `a` - autoriza la IP donde resuelve el dominio.

- **`mx`:** Autoriza las IPs de los servidores MX del dominio.
  `mx:mail.empresa.com` - autoriza los servidores de correo.

- **`exists`:** Verifica si un dominio existe (uso avanzado).

- **`redirect`:** Redirige a otro dominio SPF.
  `redirect=_spf.google.com` - usa el SPF de Google.

### Modificadores SPF

- **`+` (Pass):** La IP esta autorizada. Ej: `+ip4:192.168.1.1`. Por defecto si no se específica.
- **`-` (Fail):** La IP NO esta autorizada. Ej: `-all`. Policía estricta.
- **`~` (SoftFail):** La IP probablemente no esta autorizada. Ej: `~all`. Modo de pruebas.
- **`?` (Neutral):** No se afirma ni se niega. Ej: `?all`. No recomendado.

### Límite de 10 Consultas DNS

SPF tiene un límite de 10 consultas DNS para prevenir ataques DDoS. Cada `include` cuenta como una consulta. Si tu SPF tiene muchos includes, puedes exceder el límite.

Ejemplo de SPF que excede el límite:

```
v=spf1 include:servidor1.com include:servidor2.com include:servidor3.com
       include:servidor4.com include:servidor5.com include:servidor6.com
       include:servidor7.com include:servidor8.com include:servidor9.com
       include:servidor10.com include:servidor11.com -all
```

Soluciones:
- Combinar rangos IP en lugar de usar múltiples `include`.
- Usar un servicio de gestión SPF como DNS Made Easy o Cloudflare.
- Revisar periodicamente los includes para eliminar los que ya no se usan.

## DKIM: Implementación Avanzada

### Algoritmos de Firma

DKIM soporta múltiples algoritmos:

- **rsa-sha256:** El más común. Usa RSA de 1024 o 2048 bits con SHA-256.
- **rsa-sha1:** Obsoleto (SHA-1 tiene vulnerabilidades conocidas).
- **ed25519-sha256:** Algoritmo moderno usando curvas elípticas (más rápido, claves más cortas).

### Canones de Firma

DKIM define como se normaliza el mensaje antes de firmar:

- **`simple/simple`:** No se modifica nada. Cualquier cambio (espacios, saltos de línea) rompe la firma.
- **`relaxed/relaxed`:** Se normalizan los espacios en blanco y las cabeceras. Permite pequeños cambios que no alteran el significado.
- **`simple/relaxed`:** Cuerpo simple, cabeceras relajadas.
- **`relaxed/simple`:** Cuerpo relajado, cabeceras simples.

La mayoría de los servicios usan `relaxed/relaxed` para evitar falsos positivos por diferencias de formato.

### Rotación de Claves DKIM

Las claves DKIM deben rotarse periodicamente:

1. Generar un nuevo par de claves.
2. Publicar la nueva clave pública con un nuevo selector.
3. Configurar el servidor de correo para firmar con la nueva clave.
4. Mantener la clave antigua por un tiempo (los correos en tránsito pueden tener la firma antigua).
5. Eliminar la clave antigua cuando todos los correos en circulacion hayan expirado.

## Caso Real: El Ataque a la Casa Blanca (2020)

En 2020, investigadores descubrieron que el dominio whitehouse.gov tenía configuraciones de DMARC incompletas. Aunque tenía SPF y DKIM, la política DMARC estaba en `p=none`.

Esto significaba que cualquier atacante podía falsificar correos de la Casa Blanca y estos llegarian a las bandejas de entrada sin problemas. El gobierno de EE.UU. había emitido una directiva ejecutiva (EO 14028) exigiendo DMARC `p=reject` para todas las agencias federales, pero la implementación era lenta.

## Autoevaluación

Responde estas preguntas para verificar si comprendes los conceptos:

1. Un hacker envía un correo altamente convincente a todos los empleados de tu empresa, pero la dirección del remitente es `ceo-tuempresa@gmail.com` en lugar de `@tuempresa.com`. Por que los protocolos SPF, DKIM y DMARC no sirven para detener absolutamente nada en este escenario de ataque específico? (Pista: Analiza a quien le pertenece el dominio "gmail.com").

2. Explica la falla fundamental de arquitectura que tiene el protocolo original SMTP y por que se compara con "enviar una carta por correo l sin que nadie verifique la identidad del remitente".

3. Durante una migración corporativa, la empresa contrata un nuevo servicio en la nube para enviar correos de marketing masivos (ej. MailChimp). Al día siguiente, todos los correos de la empresa hacia los clientes empiezan a rebotar y a ser marcados como SPAM por Gmail. Sabiendo como funciona el protocolo SPF, Que paso crítico olvido el equipo de IT y por que Gmail rechazo los correos genuinos?

4. El equipo de Seguridad de la empresa ha configurado correctamente SPF y DKIM, pero configuraron el protocolo DMARC con la política `p=none`. Usando la analogía del "Ejecutor de Órdenes", Por que esta configuración deja a la empresa completamente vulnerable a los ataques de falsificación de identidad (Spoofing) a pesar de tener los candados puestos?

5. Explica la diferencia entre SPF (que verifica) y DKIM (que verifica). Usa la analogía del correo l para ilustrar la diferencia.

6. Un atacante compromete el servidor DNS de una empresa y modifica el registro SPF para incluir su propia dirección IP. Como podría el equipo de seguridad detectar esta modificacion y que protocolo evitaria que los correos falsos lleguen a los destinatarios?

7. Por que la política DMARC `p=reject` es considerada la única configuración realmente segura? Que riesgos conlleva implementarla sin una fase de pruebas adecuada?

8. Como funcionan los reportes DMARC (RUA) y que información valiosa proporcionan al equipo de seguridad?
