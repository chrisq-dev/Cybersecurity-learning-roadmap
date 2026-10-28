---
title: "PKI y TLS"
level: "intermedio"
content_type: "guia"
updated: "2026-06-29"
---

# PKI y TLS

## Objetivo de esta Guía

El candado verde que aparece al lado de una URL no es magia. Es el resultado de décadas de infraestructura criptográfica global, con múltiples componentes que deben funcionar perfectamente para garantizar transacciones seguras en internet.

El objetivo de esta guía es que entiendas cómo funciona esa infraestructura: qué son los certificados digitales, cómo las Autoridades Certificadoras (CAs) mantienen la cadena de confianza, qué ocurre durante el handshake TLS, y —quizás más importante— cómo todo esto puede fallar.

Porque ha fallado. Y cuando falla, las consecuencias son catastróficas: certificados falsos que permiten a gobiernos espiar a sus ciudadanos, ataques MITM que roban credenciales bancarias, y vulnerabilidades en el protocolo que exponen datos supuestamente seguros.

Esta guía explica PKI y TLS desde el problema que resuelven hasta los ataques que los han quebrado, pasando por el detalle de cómo funciona cada pieza.

---

## El Problema de la Confianza en Internet

En la guía de fundamentos de criptografía vimos cómo el cifrado asimétrico permite que dos extraños intercambien un secreto a través de un canal inseguro. Diffie-Hellman resuelve el problema de intercambiar una llave. RSA y ECC permiten cifrar y firmar.

Pero hay un problema que ninguna de estas técnicas resuelve por sí sola: **la suplantación de identidad**.

Imagina que un hacker ruso pública una llave pública en internet y dice: "Hola, soy el Banco Santander. Usen esta llave pública para mandarme sus datos bancarios". Sin un sistema de verificación de identidad, no hay manera de saber que esa llave no es del banco.

El cifrado asimétrico asegura que solo el dueño de la llave privada puede descifrar. Pero si no sabes quién es el dueño de la llave pública, el cifrado no te sirve de nada. Le estás mandando tu información secreta a un impostor, y el cifrado garantiza que solo él —el impostor— pueda leerla.

**Por qué esto importa:** aquí tienes el problema de seguridad más básico y más ignorado. puedes tener el mejor cifrado del mundo, pero si no sabes con QUIÉN estás hablando, estás regalando tus datos. Es como ponerle una cerradura de última tecnología a la puerta de tu casa... pero abrirla cuando alguien toca el timbre y dice "soy el técnico del gas".

Este es el **problema de la autenticación de la llave pública**. Y para resolverlo se creó PKI.

---

## PKI: La Infraestructura de Confianza Global

### La Analogía del Pasaporte

Cuando viajas al extranjero y llegas a un aeropuerto internacional, el oficial de migración te pide identificación. No te cree solo porque tú digas "Soy Juan Pérez de México". Necesitas un documento que lo acredite.

Tu pasaporte tiene:

- Tus datos personales (nombre, fecha de nacimiento, nacionalidad)
- Tu fotografía
- Un sello oficial del gobierno que lo emitió
- Elementos de seguridad (hologramas, marcas de agua) que dificultan la falsificación

El oficial de migración no te conoce. Pero confía en el gobierno de México que emitió tu pasaporte. Como el gobierno de México puso su sello en el documento, el oficial confía en ti automáticamente. Esto se llama **confianza transitiva**: confío en A (tú) porque confío en B (el gobierno de México) que certificó a A.

PKI funciona exactamente igual, pero en internet. Los certificados digitales son los pasaportes, y las CAs son los gobiernos que los emiten. Y así como hay pasaportes falsos, también hay certificados falsos.

### Las Autoridades Certificadoras (CAs)

En el mundo digital, los "gobiernos" que emiten los pasaportes se llaman **Autoridades Certificadoras (CAs)**. Son empresas o entidades mundialmente reconocidas que verifican la identidad de los sitios web y emiten **certificados digitales** que atestiguan esa identidad.

Ejemplos de CAs conocidas: DigiCert, Let's Encrypt, GlobalSign, Sectigo, Entrust. Los navegadores web (Chrome, Firefox, Safari, Edge) vienen preinstalados con una lista de CAs en las que confían. Cualquier certificado firmado por una de estas CAs es aceptado automáticamente.

### ¿Cómo Obtiene Amazon su Certificado?

1. Amazon genera su par de llaves (pública y privada). La privada nunca sale de sus servidores.
2. Amazon crea una **CSR (Certificate Signing Request)** que contiene su llave pública y sus datos de identidad (nombre de dominio, organización, país).
3. Amazon envía la CSR a una CA como DigiCert.
4. DigiCert verifica que Amazon realmente controla `amazon.com`. Esto se hace típicamente mediante:
   - Validación de dominio (DV): la CA envía un correo a admin@amazon.com o verifica un registro DNS.
   - Validación de organización (OV): la CA verifica los documentos legales de la empresa.
   - Validación extendida (EV): el nivel más alto, donde la CA realiza una verificación exhaustiva de la identidad legal de la empresa.
5. Una vez verificada la identidad, DigiCert firma el certificado de Amazon con su propia llave privada. El resultado es un **certificado digital** que contiene la llave pública de Amazon, la identidad de Amazon, y la firma de DigiCert.
6. Amazon instala este certificado en su servidor web.

### ¿Qué Contiene un Certificado X.509?

El formato estándar de certificados digitales es **X.509**. Un certificado típico contiene:

- **Versión** del formato (usualmente v3)
- **Número de serie** (único para cada certificado emitido por una CA)
- **Algoritmo de firma** (ej. SHA-256 con RSA)
- **Emisor** (la CA que emitió el certificado)
- **Período de validez** (fecha de inicio y fin)
- **Sujeto** (a quién se emitió, ej. "CN=amazon.com, O=Amazon Inc.")
- **Llave pública del sujeto** (la llave pública de Amazon)
- **Extensiones** (usos permitidos de la llave, restricciones de política, etc.)
- **Firma de la CA** (la prueba criptográfica de que la CA emitió este certificado)

### La Cadena de Confianza (Chain of Trust)

Un certificado no suele estar firmado directamente por una CA raíz. En su lugar, hay una **cadena de certificados**:

1. **CA Raíz (Root CA):** Es la autoridad máxima. Su certificado está auto-firmado (ella misma lo firma). Los navegadores traen estas CA raíces preinstaladas. Por seguridad, las CA raíces suelen estar offline, guardadas en hardware seguro (HSM) en bóvedas físicas.
2. **CA Intermedia (Intermediate CA):** La CA raíz firma los certificados de una o varias CAs intermedias. Estas CAs intermedias son las que realmente emiten certificados a los sitios web. Si una CA intermedia se ve comprometida, se puede revocar su certificado sin tener que revocar la CA raíz.
3. **Certificado del servidor (Leaf):** El certificado del sitio web, firmado por la CA intermedia.

Cuando tu navegador visita Amazon, recibe la cadena completa: certificado de Amazon -> certificado de la CA intermedia -> certificado de la CA raíz. El navegador verifica cada firma en la cadena hasta llegar a una CA raíz que ya conoce y confía.

Este diseño de cadena es importante por seguridad: si una CA intermedia se ve comprometida, puedes revocar su certificado sin tener que redistribuir las CA raíces a millones de navegadores.

---

## TLS: El Protocolo que Usa PKI

TLS (Transport Layer Security) es el protocolo criptográfico que protege las comunicaciones en internet. Es el sucesor de SSL (Secure Sockets Layer). Cuando ves HTTPS en una URL, el tráfico está protegido por TLS.

### La Evolución de SSL a TLS

- **SSL 1.0 (1994):** Diseñado por Netscape. Nunca se publicó por tener múltiples fallas de seguridad.
- **SSL 2.0 (1995):** Severamente vulnerable. Prohibido en 2011.
- **SSL 3.0 (1996):** Mejor que SSL 2.0, pero vulnerable a POODLE (2014). Prohibido en 2015.
- **TLS 1.0 (1999):** Primera versión estándar del IETF. Vulnerable a BEAST (2011). Deprecado en 2021.
- **TLS 1.1 (2006):** Mejoras menores. Deprecado en 2021 junto con TLS 1.0.
- **TLS 1.2 (2008):** Ampliamente usado. Soporta AES-GCM, ECDHE, SHA-256. Sigue vigente.
- **TLS 1.3 (2018):** La versión actual. Más rápido, más seguro. Elimina algoritmos débiles y reduce el handshake a 1-RTT (o 0-RTT con reanudación).

### El Handshake TLS 1.2 en Detalle

Ahora viene lo bueno. Cuando abres https://amazon.com, ocurre todo esto en milisegundos sin que te des cuenta. Es como una coreografía de baile entre tu navegador y el servidor, pero si un paso sale mal, todo se cae:

1. **ClientHello:** Tu navegador envía un mensaje de saludo que incluye la versión de TLS que soporta, una lista de cifrados que entiende, y un número aleatorio.

2. **ServerHello:** El servidor de Amazon responde con la versión de TLS que usarán, el cifrado elegido de la lista, su propio número aleatorio, y —esto es clave— su **certificado digital**.

3. **Certificate:** El servidor envía su cadena de certificados, que incluye su certificado y los certificados de las CAs intermedias hasta la raíz.

4. **ServerKeyExchange:** Si se usa ECDHE (como se debe), el servidor envía sus parámetros Diffie-Hellman efímeros y firma todo con su llave privada para demostrar que controla el certificado.

5. **ClientKeyExchange:** El navegador genera sus propios parámetros Diffie-Hellman y los envía al servidor. Ambos calculan ahora la **llave premaestra** usando ECDHE.

6. **ChangeCipherSpec:** Ambas partes indican que a partir de ahora todo irá cifrado con la llave derivada.

7. **Finished:** Mensajes cifrados que verifican que todo el handshake no fue manipulado.

A partir de este punto, todo el tráfico entre tu navegador y Amazon está cifrado con AES-GCM (o ChaCha20-Poly1305) usando la llave simétrica acordada.

### El Handshake TLS 1.3: Más Rápido y Seguro

TLS 1.3 simplificó drásticamente el handshake:

- Reduce de 2 rondas (2-RTT) a 1 ronda (1-RTT) en el caso normal.
- Elimina todos los algoritmos inseguros: RSA para intercambio de llaves, cifrados CBC, RC4, 3DES, export ciphers.
- Solo permite Diffie-Hellman efímero (ECDHE) para intercambio de llaves, lo que proporciona **Perfect Forward Secrecy (PFS)**.
- Firma todo el handshake para evitar ataques de downgrade.
- Soporta **0-RTT** (cero round trip time) para reanudar sesiones anteriores, aunque con advertencias de seguridad contra ataques de replay.

Perfect Forward Secrecy significa que incluso si un atacante roba la llave privada del servidor de Amazon, no puede descifrar el tráfico pasado. En versiones anteriores de TLS con RSA para intercambio de llaves, si robaban la privada, podían descifrar cualquier sesión grabada previamente.

### Verificación de Certificados por el Cliente

Tu navegador no acepta ciegamente cualquier certificado. Hace una banda de verificaciones antes de mostrar el candadito verde:

1. **Validez temporal:** El certificado debe estar dentro de su período de validez.
2. **Cadena de confianza:** La firma del certificado debe ser verificable hasta una CA raíz confiable.
3. **Nombre del sujeto:** El dominio en el certificado debe coincidir con el dominio al que te estás conectando.
4. **Revocación:** El certificado no debe estar en una lista de revocación (CRL) o ser reportado como revocado por OCSP.
5. **Uso de la llave:** El certificado debe tener el uso correcto (TLS Web Server Authentication).

Si alguna de estas verificaciones falla, el navegador muestra una advertencia. Y aquí viene el problema: la mayoría de los usuarios ignora estas advertencias y hace clic en "Continuar de todas formas". Es como si un guardia de seguridad te dijera "esta persona no está en la lista de invitados" y tu dijeras "ah, déjalo pasar igual".

### OCSP y CRL: Verificando que el Certificado no esté Revocado

Un certificado puede ser revocado antes de su fecha de expiración —por ejemplo, si la llave privada fue comprometida o si la empresa cambió de nombre.

Hay dos mecanismos para verificar la revocación:

- **CRL (Certificate Revocation List):** La CA publica una lista de números de serie de certificados revocados. El navegador descarga periódicamente esta lista. Problema: las listas pueden ser enormes y difíciles de distribuir.
- **OCSP (Online Certificate Status Protocol):** El navegador consulta en tiempo real a la CA si un certificado específico sigue siendo válido. Más eficiente que CRL, pero introduce latencia y problemas de privacidad (la CA sabe qué sitios estás visitando).
- **OCSP Stapling:** El servidor web consulta periódicamente a la CA y adjunta la respuesta OCSP firmada al handshake TLS. Esto resuelve los problemas de latencia y privacidad, y es el método recomendado.

---

## Casos de Fracaso en el Mundo Real

### DigiNotar: El Colapso de una CA Holandesa (2011)

Este es mi caso favorito para explicar por qué el modelo PKI da miedo. DigiNotar era una Autoridad Certificadora holandesa. En 2011, un hacker —presuntamente iraní— comprometió sus sistemas y emitió certificados falsos para dominios como google.com, microsoft.com, y twitter.com.

El certificado falso de Google se usó para interceptar las comunicaciones de aproximadamente 300,000 usuarios iraníes que usaban servicios de Google. Los atacantes podían leer correos electrónicos, contraseñas, y cualquier dato transmitido a través de conexiones HTTPS.

Cuando se descubrió el ataque:

- Los navegadores (Chrome, Firefox) revocaron la confianza en DigiNotar inmediatamente.
- El gobierno holandés asumió el control de DigiNotar.
- La empresa declaró la bancarrota semanas después.
- El CEO de DigiNotar fue despedido y se suicidó posteriormente.
- Fue necesario reemplazar miles de certificados legítimos que DigiNotar había emitido.

Este caso mostró que el modelo PKI es tan fuerte como la CA más débil. Una CA comprometida en un pequeño país podía emitir certificados válidos para cualquier dominio del mundo.

### Cómodo: Otro Compromiso de CA (2011)

Ese mismo año, Cómodo —una CA mucho más grande— también fue comprometida. Un atacante obtuvo credenciales de un administrador y emitió certificados falsos para Google, Yahoo, Mozilla, y otros.

La diferencia con DigiNotar: Cómodo detectó el ataque rápidamente, revocó los certificados inmediatamente, y trabajó con los navegadores para mitigar el daño. Cómodo sobrevivió. DigiNotar no.

La lección: la respuesta a un incidente marca la diferencia entre una crisis manejable y una empresa liquidada.

### Symantec: La Desconfianza Masiva (2017-2020)

En 2017, Google descubrió que Symantec —una de las CAs más grandes del mundo— había emitido incorrectamente 30,000 certificados. No certificados falsos por un atacante externo, sino errores de la propia Symantec en sus procesos de validación.

Chrome tomó una decisión sin precedentes: anunció que dejaría de confiar gradualmente en todos los certificados emitidos por Symantec y sus subsidiarias (GeoTrust, Thawte, RapidSSL). Esto afectó a millones de sitios web.

Symantec tuvo que vender su negocio de certificados a DigiCert en 2017 por $950 millones. Fue el precio de haber perdido la confianza de los navegadores.

### Let's Encrypt: Democratizando los Certificados

En contraste con las CAs tradicionales, **Let's Encrypt** (lanzado en 2015) ofrece certificados SSL/TLS gratuitos y automatizados. Su misión es cifrar toda la web.

Let's Encrypt automatiza completamente el proceso de emisión y renovación mediante el protocolo **ACME**. Los certificados duran solo 90 días, lo que fomenta la renovación automática y reduce el riesgo de usar certificados expirados.

Para 2023, Let's Encrypt emitía más de 200 millones de certificados activos y es la CA más grande del mundo. Su existencia ha sido fundamental para aumentar el porcentaje de sitios web que usan HTTPS de aproximadamente el 30% en 2015 a más del 90% hoy.

Pero hay una crítica importante: Let's Encrypt solo ofrece validación de dominio (DV), no de organización (OV) ni extendida (EV). Esto significa que cualquiera puede obtener un certificado Let's Encrypt para `hackersite.com`. Para un sitio fraudulento, el certificado no impide nada.

### Heartbleed: Cuando la Implementación Expone las Llaves Privadas

Ya mencioné Heartbleed en la guía de fundamentos, pero vale la pena repetirlo aquí por su impacto en PKI.

Heartbleed (CVE-2014-0160) era una vulnerabilidad en OpenSSL que permitía leer 64 KB de memoria del servidor. Esto podía incluir las llaves privadas de los certificados TLS.

Las consecuencias:

- Yahoo, con 800 millones de usuarios, fue uno de los afectados más notorios.
- Yahoo tuvo que revocar todos sus certificados y emitir nuevos.
- Empresas de todos los tamaños tuvieron que hacer lo mismo.
- La vulnerabilidad afectó implementaciones ampliamente desplegadas de OpenSSL.

Heartbleed demostró que la cadena de confianza no termina en la CA —también depende de que el servidor proteja adecuadamente su llave privada.

### Logjam y FREAK: Degradando la Confianza

Logjam (2015) y FREAK (2015) permitían a atacantes degradar conexiones TLS a criptografía de exportación débil, como vimos en la guía de fundamentos. En el contexto de PKI, estos ataques muestran que el certificado puede ser válido —la identidad está verificada— pero la conexión sigue siendo insegura porque el cifrado es débil.

Un certificado válido no garantiza una conexión segura. La seguridad depende de todo el protocolo, no solo del certificado.

---

## La Visión del Hacker: Ataques a PKI y TLS

Sabes qué tienen en común todos estos ataques? Ninguno rompió la criptografía. Todos explotaron algo más débil: la confianza, la implementación, o la estupidez humana. aquí te cuento cómo se hace.

### MITM con Certificados Falsos

El ataque más directo: un atacante en posición de intermediario (por ejemplo, en una red WiFi pública o en un ISP comprometido) intercepta la conexión del usuario y presenta su propio certificado falso.

Si el usuario ignora la advertencia del navegador, el atacante puede:

- Descifrar todo el tráfico HTTPS.
- Modificar el contenido de las páginas.
- Robar credenciales de inicio de sesión.

El ataque **SSLstrip** (2009) de Moxie Marlinspike iba un paso más allá: en lugar de presentar un certificado falso, el atacante simplemente eliminaba la "s" de HTTPS cuando el usuario escribía la URL, forzando al usuario a conectarse por HTTP no cifrado mientras el atacante mantenía una conexión HTTPS con el servidor real. El usuario veía HTTP en su navegador, pero como la mayoría de los usuarios no revisa la URL, no notaba la diferencia.

SSLstrip funciónó durante años hasta que la adopción de HSTS se generalizó. **HSTS (HTTP Strict Transport Security)** es un header que el servidor envía al navegador indicando que siempre debe usar HTTPS para ese dominio, incluso si el usuario escribe http://. Los navegadores modernos también incluyen listas precargadas de sitios que deben usar HSTS obligatoriamente (como los bancos y Google).

Una variante más reciente es **SSLstrip 2.0**, que intenta engañar al navegador para que ignore HSTS usando un certificado válido para un dominio ligeramente diferente (homógrafo). Por ejemplo, usando "g00gle.com" con ceros en lugar de "google.com" con oes, con un certificado válido para g00gle.com.

### Compromiso de CA

El ataque más grave en PKI. Si un atacante compromete una CA, puede emitir certificados válidos para cualquier dominio. Esto permite ataques MITM indetectables, ya que el navegador del usuario acepta el certificado sin mostrar advertencias.

DigiNotar (2011) fue el ejemplo más claro. El atacante —un hacker iraní— obtuvo acceso a la infraestructura de DigiNotar y emitió al menos 531 certificados falsos, incluyendo uno para *.google.com que se usó activamente para interceptar tráfico en Irán.

### Certificados Typhoeus (2013)

En 2013, investigadores informaron sobre una serie de ataques **Man-in-the-Middle** a gran escala en Siria, donde se detectaron certificados falsos para facebook.com y twitter.com emitidos por CAs legítimas. Se sospecha que el gobierno sirio comprometió una CA o forzó a una CA a emitir los certificados.

### Ataques de Hash a Certificados

Como vimos en la guía de hashing, MD5 perdió su resistencia a colisiones en 2004. En 2008, investigadores demostraron que podían crear un certificado fraudulento que pareciera válido explotando una colisión de MD5. La CA RapidSSL usaba MD5 para firmar certificados. Los investigadores:

1. Crearon un certificado legítimo y uno fraudulento que tenían el mismo hash MD5.
2. Obtuvieron la firma de la CA para el certificado legítimo.
3. Aplicaron la misma firma al certificado fraudulento.

El resultado: un certificado falso para un dominio arbitrario, firmado válidamente por una CA confiable.

Esto llevó a la industria a abandonar MD5 en certificados y migrar a SHA-1, que luego fue reemplazado por SHA-256.

### Ataques de Renegociación en TLS

En 2009, se descubrió una vulnerabilidad en la renegociación de TLS. Un atacante podía inyectar su propio tráfico dentro de una conexión TLS establecida, mezclando sus datos con los del usuario legítimo. El servidor veía todo como parte de la misma conexión autenticada.

La solución fue implementar la **renegociación segura** (RFC 5746), que vincula criptográficamente las renegociaciones con la conexión original.

### Implementaciones Defectuosas

- **OpenSSL (Heartbleed):** Una mala validación de buffer expuso llaves privadas.
- **GnuTLS:** En 2014, se descubrió un bug que hacía que la verificación de certificados siempre devolviera éxito, incluso para certificados inválidos. Cualquier certificado falso era aceptado como válido.
- **Apple goto fail (2014):** Un error de programación en el código de verificación de certificados de Apple (iOS y macOS) hacía que un certificado inválido fuera aceptado si contenía una línea "goto fail" duplicada. Esto permitía a atacantes presentar certificados falsos que el sistema aceptaba sin verificar.

### Certificados Wildcard Mal Configurados

Un certificado wildcard `*.ejemplo.com` cubre cualquier subdominio de `ejemplo.com`. Si se emite incorrectamente, puede cubrir `cualquier-cosa.ejemplo.com`. Esto es útil para grandes organizaciones, pero peligroso si la llave privada se filtra: el atacante puede suplantar cualquier subdominio.

---

## Buenas Prácticas y Consideraciones de Implementación

### Usar TLS 1.3

TLS 1.3 es más rápido, más seguro, y elimina los algoritmos problemáticos del pasado. Si tu servidor lo soporta, deberías usarlo. Si no, TLS 1.2 con configuraciones modernas (ECDHE + AES-GCM + SHA-256) es aceptable.

### Configurar HSTS

HTTP Strict Transport Security (HSTS) le dice al navegador que siempre use HTTPS para un dominio, nunca HTTP. Esto previene ataques de SSLstrip y downgrade.

### Usar OCSP Stapling

En lugar de depender de que el navegador consulte OCSP (lo que añade latencia y problemas de privacidad), el servidor adjunta una respuesta OCSP firmada durante el handshake.

### Renovar Certificados Antes de que Expiren

Parece obvio, pero es increíble la cantidad de incidentes de seguridad causados por certificados expirados. La automatización (Let's Encrypt, ACME) ayuda a prevenir esto.

### Proteger las Llaves Privadas

La llave privada del servidor es el activo más valioso. Debe:

- Generarse en el servidor donde se usará (nunca transferirse por red).
- Almacenarse con permisos restringidos.
- Considerar el uso de HSM (Hardware Security Module) o TPM para almacenamiento.
- Rotarse periódicamente.

### Certificados de Validación Extendida (EV)

Los certificados EV requieren una verificación exhaustiva de la identidad legal de la organización. Cuando un sitio web tiene un certificado EV, el navegador muestra el nombre de la organización en la barra de direcciones (por ejemplo, "Amazon.com, Inc." en verde).

Sin embargo, en años recientes los navegadores han ido eliminando gradualmente los indicadores visuales especiales para EV, argumentando que no proporcionan una seguridad real adicional. La controversia continúa.

---

## El Futuro de la Confianza en Internet

### Certificate Transparency (CT)

Una de las soluciones más importantes al problema de las CAs comprometidas. **Certificate Transparency** (CT) es un sistema de logs públicos donde todas las CAs deben registrar cada certificado que emiten. Los navegadores rechazan certificados que no aparecen en los logs de CT.

Si una CA emite un certificado fraudulento, quedará registrado públicamente y cualquiera puede detectarlo. Google Search fue el primer motor de búsqueda que indexó estos logs y permitía buscar certificados por dominio.

Chrome requiere que todos los certificados emitidos después de 2018 estén registrados en logs de CT.

### DNS CAA (Certification Authority Authorization)

CAA es un registro DNS que permite a los dueños de dominio especificar qué CAs pueden emitir certificados para su dominio. Por ejemplo, `amazon.com` podría configurar un registro CAA que solo permita a DigiCert y Let's Encrypt emitir certificados para amazon.com.

Si una CA no autorizada intenta emitir un certificado, la solicitud debe ser rechazada. Esto añade una capa adicional de control.

### Criptografía Post-Cuántica en PKI

Cuando las computadoras cuánticas sean una realidad, los algoritmos de firma actuales (RSA, ECDSA) quedarán obsoletos. El NIST está estandarizando nuevos algoritmos de firma post-cuántica.

Pero el problema es más complejo que solo cambiar el algoritmo:

- Los tamaños de las llaves y firmas post-cuánticas son mucho mayores (kilobytes o incluso megabytes en algunos esquemas).
- La cadena de confianza necesita ser reemplazada completamente —no solo los certificados de servidor, sino también las CA raíces y las intermedias.
- Ya hay pruebas de concepto de hibridación: combinar firmas clásicas y post-cuánticas en el mismo certificado para garantizar compatibilidad durante la transición.

TLS 1.3 ya soporta extensiones para intercambio de llaves híbrido (clásico + post-cuántico). La migración llevará años y requerirá coordinación global.

### La Fragilidad de la Confianza

La confianza en PKI es frágil por definición. Depende de:

- Que las CAs no se vean comprometidas (DigiNotar, Cómodo).
- Que los navegadores mantengan listas de CAs confiables actualizadas.
- Que los servidores protejan sus llaves privadas.
- Que los certificados se emitan correctamente.
- Que los usuarios no ignoren las advertencias del navegador.

Cualquier ruptura en esta cadena —por ataque externo, error humano, o mala implementación— puede comprometer la seguridad de millones de usuarios. Por eso la industria ha ido añadiendo capas de defensa: Certificate Transparency, DNS CAA, HSTS, HPKP (aunque retirado), y la exigencia de validaciones más rigurosas.

El sistema PKI no es perfecto. Pero sigue siendo la mejor solución que tenemos para el problema de establecer confianza en una red inherentemente desconfiable como internet. La clave está en entender sus limitaciones y trabajar dentro de ellas, no en asumir que el candado verde significa seguridad absoluta.

**El resumen:** El candado verde no es seguridad absoluta. Es un sistema de confianza con muchas piezas móviles, y cada una puede fallar. La próxima vez que veas una advertencia de certificado en el navegador, no la ignores —puede ser la única barrera entre tu y un hacker.

---

## Autoevaluación

1. Estás navegando desde la red WiFi de un aeropuerto que puede estar controlada por un atacante. Intentas entrar a tu banco, pero Chrome muestra una pantalla roja que dice "NET::ERR_CERT_AUTHORITY_INVALID". Si ignoras la advertencia y continúas, que ataque clásico estas permitiendo? Explica como funciona el ataque en el contexto del handshake TLS.

2. En el modelo PKI, explica la función de las Autoridades Certificadoras (CAs) usando la analogía del pasaporte. Que pasaría en el mundo real si una oficina gubernamental que emite pasaportes fuera comprometida por criminales?

3. Para proteger una videollamada HD de 2 horas (unos 5 GB de datos), el protocolo TLS no usa cifrado asimétrico para todo el tráfico. Explica por qué usa ECDHE solo al principio para acordar una llave simétrica y luego usa AES-GCM para el contenido. Incluye el concepto de Perfect Forward Secrecy.

4. Una empresa opera su propio servidor web con un certificado auto-firmado. Los empleados que acceden internamente ven una advertencia de seguridad en el navegador. Explica por qué un certificado auto-firmado es inherentemente inseguro para comunicaciones externas y cual es la diferencia con un certificado firmado por una CA confiable.

5. Durante el handshake TLS 1.2, el servidor envía su certificado junto con los parámetros Diffie-Hellman efímeros. Explica por qué el servidor firma estos parámetros con su llave privada. Que pasaría si no los firmara?

6. En 2011, la CA DigiNotar fue comprometida y se emitieron certificados falsos para google.com. Explica el impacto de este ataque: por qué los navegadores confiaban inicialmente en esos certificados falsos, y que tuvo que hacer la industria para mitigar el daño.

7. Un atacante compromete una CA intermedia y emite un certificado falso para un banco. Explica como Certificate Transparency (CT) y los registros DNS CAA pueden detectar o prevenir este ataque incluso si la firma criptográfica del certificado es perfectamente valida.

8. Heartbleed permitía leer 64 KB de memoria del servidor. Explica por qué este ataque es diferente a un ataque contra el algoritmo RSA. Por qué Yahoo tuvo que revocar y reemitir todos sus certificados aunque el algoritmo RSA mismo no hubiera sido comprometido?

---
