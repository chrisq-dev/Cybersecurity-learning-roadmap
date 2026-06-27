---
title: "Hashing y Contraseñas"
---

# Hashing y Contraseñas

## Objetivo de esta Guía

NO lo son. Y confundirlos puede hacer que termines guardando contraseñas como LinkedIn en 2012. No quieres ser LinkedIn en 2012.

El cifrado (AES, RSA) es una función de dos direcciones: cifras con una llave y descifras con esa misma llave (o con la llave correspondiente si es asimétrico). El hashing es una función de una sola dirección: tomas un dato de cualquier tamaño, lo procesas, y produces una salida de tamaño fijo de la cual no puedes recuperar el original.

Esta diferencia no es académica. Tiene consecuencias directas en cómo guardas contraseñas, cómo verificas integridad de archivos, y cómo proteges datos sensibles. Usar cifrado donde deberías usar hashing —o viceversa— crea vulnerabilidades que los atacantes explotan rutinariamente.

esta guía te va a explicar qué es el hashing, cómo se usa correctamente para almacenar contraseñas, cómo los atacantes lo rompen, y qué tecnologías como bcrypt y argon2 hacen para protegerte. Prestá atención porque esto es de lo más práctico que vas a leer.

---

## La Analogía: La Licuadora Matemática

Imagina que tomas una manzana, un plátano y dos fresas. Los metes a una licuadora industrial y presionas el botón. El resultado es un batido de color rojo oscuro.

No importa qué tan inteligente seas, no puedes tomar ese jugo, aplicar ingeniería inversa, separar los átomos y reconstruir la manzana original. Es físicamente imposible.

Eso es una función hash. Tomas un texto como "Hola Mundo" y lo pasas por la función SHA-256. El resultado es una cadena de 64 caracteres hexadecimales que no se parece al original:

`b221d9dbb083a7f33428d7c2a3c3198ae925614d70210e28716ccaa7cd4ddb79`

Si cambias una sola letra —"hola" con minúscula en lugar de mayúscula— el hash resultante es completamente diferente. No hay relación visible entre los dos hashes. Esto se llama el **efecto avalancha**: un pequeño cambio en la entrada produce un cambio masivo e impredecible en la salida.

Hay una propiedad adicional que es crítica: el hash siempre tiene la misma longitud sin importar el tamaño de la entrada. El hash SHA-256 de "Hola" (4 caracteres) y el hash SHA-256 de la Enciclopedia Británica completa (cientos de megabytes) tienen exactamente 64 caracteres de largo. Esto no es una coincidencia —es una propiedad de diseño.

**Por qué esto importa:** Esta propiedad es la que permite verificar archivos enormes con solo comparar 64 caracteres. Cuando descargas un ISO de Linux y verificas el checksum, estás usando esto. Si el hash fuera del tamaño del archivo, no serviría para nada.

---

## Las Propiedades Matemáticas de una Función Hash Segura

Para que una función hash sea útil en seguridad, debe cumplir varias propiedades:

### Determinista

La misma entrada siempre produce la misma salida. Si calculas SHA-256("Hola") hoy, mañana, o dentro de diez años, obtienes exactamente el mismo hash. Esto es esencial para que las comparaciones funcionen.

### Preimagen Resistente (One-way)

Dado un hash, debe ser computacionalmente inviable encontrar cualquier entrada que lo produzca. Es decir, si te doy el hash `b221d9...`, no deberías poder encontrar qué texto lo generó.

La única forma de "romper" esta propiedad es probar todas las entradas posibles hasta encontrar una que coincida —un ataque de fuerza bruta. Si la función es segura y la entrada tiene suficiente entropía, esto es inviable.

### Segunda Preimagen Resistente

Dada una entrada específica, debe ser computacionalmente inviable encontrar una entrada diferente que produzca el mismo hash. Esto evita que un atacante pueda reemplazar un mensaje por otro sin cambiar su hash.

### Resistente a Colisiones

Debe ser computacionalmente inviable encontrar dos entradas diferentes que produzcan el mismo hash. Esta es una propiedad más fuerte que la segunda preimagen. Si una función hash tiene una debilidad de colisiones, un atacante puede crear dos documentos diferentes (un contrato inocente y uno fraudulento) que tengan el mismo hash.

La **paradoja del cumpleaños** establece que para una función de n bits, puedes encontrar una colisión en aproximadamente 2^(n/2) operaciones. Esto significa que SHA-256 ofrece 128 bits de seguridad contra colisiones, no 256.

### Colisiones en el Mundo Real: El Gusano Flame

Sabes qué pasa cuando una función hash se rompe? No es que "los académicos publican un paper y nadie se entera". Pasa esto:

En 2012, se descubrió que el gusano **Flame**, un malware altamente sofisticado atribuido a agencias de inteligencia de EE.UU. e Israel, utilizaba una colisión de MD5 para falsificar un certificado de Microsoft. El ataque permitía que Flame se propagara mediante Windows Update, el sistema de actualizaciones de Microsoft, sin levantar sospechas.

Los autores de Flame habían logrado una colisión de MD5 contra un certificado de Terminal Services de Microsoft. Microsoft tuvo que emitir una actualización de emergencia para revocar el certificado comprometido.

Este ataque demostró que las colisiones de hash no son solo teoría académica —se pueden usar en operaciones de ciberguerra reales.

### El Experimento Mental del Cumpleaños y la Seguridad de Hash

Hay una diferencia práctica importante entre romper una función hash por preimagen y romperla por colisión.

Para que te hagas una idea: romper SHA-256 por preimagen (dado un hash, encontrar un texto que lo genere) requiere 2^256 operaciones. Eso es un número tan astronómicamente grande que no hay ningún escenario práctico donde sea factible, ni siquiera con computadoras cuánticas.

Pero romper SHA-256 por colisión (encontrar dos textos que generen el mismo hash) requiere solo 2^128 operaciones gracias a la paradoja del cumpleaños. Sigue siendo un número enorme, pero es la diferencia entre "imposible" y "extremadamente difícil". Y para MD5, donde 2^64 se redujo a ataques prácticos, la diferencia es entre "extremadamente difícil" y "trivial".

Por eso, cuando una función hash se acerca al final de su vida útil, lo primero que se rompe es la resistencia a colisiones.

---

## Hashing en la Vida Real

El hashing se usa para mucho más que contraseñas:

- **Integridad de archivos:** Cuando descargas un archivo grande, el sitio suele publicar su hash SHA-256. Después de descargarlo, calculas el hash localmente y lo comparas. Si coinciden, el archivo no fue modificado durante la descarga ni está corrupto.
- **Firmas digitales:** En lugar de firmar un documento enorme, se firma su hash. Esto es mucho más eficiente.
- **Blockchain:** Bitcoin y otras criptomonedas usan SHA-256 para encadenar bloques de transacciones de forma inmutable.
- **Deduplicación de datos:** Los sistemas de almacenamiento identifican archivos duplicados por su hash, ahorrando espacio.

---

## La Evolución de las Funciones Hash

### MD5: Roto y Retirado

MD5 produce hashes de 128 bits (32 caracteres hex). Fue diseñado por Ron Rivest en 1991. Durante años fue el estándar para todo —integridad de archivos, contraseñas, firmas.

Pero en 2004, un equipo de investigadores chinos (Wang et al.) demostró colisiones prácticas en MD5. En 2008, se usó una colisión de MD5 para crear un certificado SSL falso que los navegadores aceptaban como válido (ataque a CA RapidSSL). Hoy, una colisión MD5 se puede generar en segundos en una computadora personal.

MD5 no debe usarse para nada relacionado con seguridad. Ni para contraseñas, ni para integridad, ni para certificados.

### SHA-1: El Siguiente en Caer

SHA-1 produce hashes de 160 bits. Fue diseñado por la NSA en 1995. Durante años parecía seguro. Pero en 2017, el equipo de Google y CWI Amsterdam demostró **SHAttered** —la primera colisión práctica de SHA-1. Subieron dos PDFs diferentes con el mismo hash SHA-1.

Lo alarmante no era solo que pudieran encontrar una colisión, sino que el ataque requería aproximadamente 110 años de computación en CPU (que se redujo a días en GPU). Y el costo de la computación necesaria —equivalente a unos $110,000 en servicios en la nube— estaba al alcance de actores estatales y organizaciones grandes.

Google, Microsoft, y Apple dejaron de aceptar certificados SSL firmados con SHA-1 a partir de 2017. Hoy, SHA-1 está oficialmente deprecado y debería desaparecer de todos los sistemas.

### SHA-2: El Estándar Actual

SHA-2 es una familia de funciones (SHA-224, SHA-256, SHA-384, SHA-512) diseñadas también por la NSA. Hoy no hay ataques prácticos conocidos contra SHA-256. Es el estándar de facto en la industria.

Sin embargo, SHA-2 comparte el mismo diseño estructural que SHA-1. Aunque no hay vulnerabilidades conocidas hoy, el parecido estructural hace que algunos criptógrafos prefieran migrar a SHA-3 por precaución.

### SHA-3: El Nuevo Llegado

SHA-3 fue seleccionado en una competencia pública del NIST (2012) como reemplazo de SHA-2. Usa una estructura completamente diferente llamada **Keccak** (esponja criptográfica) que no se parece a SHA-1 ni SHA-2. Esto significa que si se descubre un ataque contra la familia SHA-2, SHA-3 no se verá afectado.

Hoy SHA-3 se usa en algunas aplicaciones, pero SHA-256 sigue siendo dominante por razones de compatibilidad y madurez de implementaciones.

---

## El Almacenamiento de Contraseñas: Donde Todo se Vuelve Crítico

Ahora llegamos al corazón del asunto: cómo se guardan las contraseñas en las bases de datos de los sistemas que usamos todos los días.

### Texto Plano: El Error Imperdonable

Si eres el programador de un sistema y guardas la contraseña de un usuario en texto plano en tu base de datos, estás cometiendo un error grave. Si un atacante obtiene acceso a tu base de datos —por SQL injection, por un servidor mal configurado, por un empleado malicioso— obtiene todas las contraseñas de todos los usuarios.

Esto pasó en LinkedIn en 2012: 6.5 millones de contraseñas almacenadas como hashes SHA-1 sin sal (no texto plano, pero casi igual de malo). Pasó en Adobe en 2013: 38 millones de cuentas, con contraseñas cifradas en modo ECB (que permitió deducir patrones). Pasó en RockYou en 2009: 32 millones de cuentas en texto plano.

**Por qué esto importa:** No es que "me hackearon la base de datos". Es que expusiste las contraseñas de tus usuarios, que son las mismas que usan en Gmail, en el banco, en Netflix. Un descuido tuyo y el usuario queda comprometido en todos lados.

Cada uno de estos incidentes debería haber sido suficiente para que la industria aprendiera. Y sin embargo, en 2023, un estudio encontró que el 5% de las aplicaciones web aún almacena contraseñas en texto plano. Increíble.

### Hashing Simple: El Primer Paso

La solución obvia: en lugar de guardar la contraseña, guarda su hash. Cuando el usuario inicia sesión, calculas el hash de la contraseña ingresada y lo comparas con el hash almacenado.

Esto evita que un atacante que robe la base de datos obtenga las contraseñas directamente. Tiene hashes, que son irreversibles.

Pero el hashing simple tiene un problema enorme: las funciones hash como SHA-256 están diseñadas para ser **rápidas**. Un hash SHA-256 se calcula en nanosegundos. Eso significa que un atacante puede probar millones de contraseñas por segundo.

### El Problema de las Tablas Arcoíris

Un hacker con previsión puede pre-calcular los hashes de las contraseñas más comunes y guardarlos en una **tabla arcoíris**. Es un archivo gigante que mapea contraseñas a sus hashes. Cuando roba la base de datos, solo necesita comparar los hashes robados contra su tabla. Si un hash coincide, sabe la contraseña al instante.

Hay tablas arcoíris públicas con billones de combinaciones. No hay que calcular nada nuevo —solo buscar.

La solución a este problema es la **sal (salt)**.

### El Ataque de Tablas Arcoíris en Detalle

Las tablas arcoíris son una optimización del ataque de fuerza bruta que usa el **trade-off tiempo-memoria**. En lugar de calcular el hash de cada contraseña sobre la marcha (costoso en tiempo) o de guardar todos los pares (contraseña, hash) en una base de datos (costoso en memoria), las tablas arcoíris usan cadenas de reducción que comprimen la información.

El proceso:

1. Tomas una contraseña candidata (ej. "password").
2. Calculas su hash: H("password") = hash1.
3. Aplicas una función de reducción R(hash1) = "qwerty" (una contraseña diferente).
4. Calculas H("qwerty") = hash2.
5. Repites millones de veces, formando una cadena.
6. Guardas solo el primer elemento de la cadena (la contraseña inicial) y el último (el hash final).
7. Cuando tienes un hash objetivo, aplicas la función de reducción y ves si coincide con algún final de cadena. Si coincide, puedes reconstruir la cadena desde el principio y encontrar la contraseña.

Esto permite comprimir billones de relaciones (contraseña, hash) en un espacio de almacenamiento manejable. Un atacante con una tabla arcoíris bien construida puede descifrar la mayoría de los hashes sin sal en minutos.

Las tablas arcoíris son específicas para cada función hash. Una tabla para MD5 no sirve para SHA-256. Y la sal las vuelve completamente inútiles porque cambia la entrada.

### Salting: Arruinando las Tablas Arcoíris

La sal es un valor aleatorio que se añade a la contraseña antes de hashearla. Cada usuario tiene una sal diferente. La sal se guarda en la base de datos junto con el hash, en texto claro.

Pero no importa. La sal no es secreta. Lo que hace es que el atacante no pueda pre-calcular nada. Tiene que calcular el hash para cada usuario individualmente.

Funciona así:

1. Cuando el usuario crea su cuenta con contraseña "MiClave123", el sistema genera una sal aleatoria, por ejemplo "H7xLk9".
2. Calcula SHA-256("MiClave123" + "H7xLk9") y guarda el resultado junto con la sal.
3. Cuando el usuario inicia sesión, el sistema busca su sal, la añade a la contraseña ingresada, calcula el hash, y compara.

La tabla arcoíris del atacante contiene hashes de contraseñas solas ("MiClave123"), no de contraseñas concatenadas con sales. Como cada usuario tiene una sal diferente, el atacante tendría que pre-calcular una tabla arcoíris para cada sal individualmente —lo que hace que el ataque sea impracticable.

La sal no es secreta. Está en la base de datos, visible. Su propósito no es ocultarse, sino forzar al atacante a atacar cada hash individualmente en lugar de usar valores pre-calculados.

### El Problema de la Velocidad: Por Qué SHA-256 Sigue Siendo Insuficiente

Aunque la sal resuelve el problema de las tablas arcoíris, no resuelve el problema fundamental: SHA-256 es demasiado rápido. Con una GPU moderna como una RTX 4090, un atacante puede probar aproximadamente 10 mil millones de hashes SHA-256 por segundo.

Supón que un atacante roba una base de datos de 10 millones de usuarios, todos con sal. No importa. El atacante toma la contraseña más común "123456", calcula SHA-256("123456" + sal_usuario_1), SHA-256("123456" + sal_usuario_2), etc., para cada usuario. En segundos, ha probado la contraseña más común contra todos los usuarios. Luego pasa a la siguiente: "password", "admin", "qwerty123"...

En cuestión de horas, el atacante habrá recuperado la mayoría de las contraseñas —no porque el hash sea débil, sino porque es rápido y las contraseñas humanas son predecibles.

### Key Stretching: Haciendo el Hash Voluntariamente Lento

La solución al problema de la velocidad es hacer que el hashing de contraseñas sea **voluntariamente lento**. Esto se llama **key stretching** o **derivación de llaves basada en contraseña**.

**Por qué esto importa:** Si para el usuario legítimo el hash tarda 100ms, ni se nota. Pero para un atacante que quiere probar 10 mil millones de combinaciones, cada milisegundo extra multiplica el tiempo de ataque por una barbaridad. Es como poner un peaje en una autopista —el que pasa una vez ni lo nota, el que quiere hacer 10 mil millones de viajes se funde.

---

## Algoritmos de Hashing de Contraseñas

### bcrypt

bcrypt fue diseñado en 1999 por Niels Provos y David Mazières. Fue el primer algoritmo diseñado específicamente para hashing de contraseñas.

Su funcionamiento:

1. Incorpora una sal automáticamente (no necesitas generarla manualmente).
2. Tiene un parámetro de **costo** (work factor) que determina cuántas iteraciones realiza. Cada incremento en el factor duplica el tiempo de cómputo.
3. Internamente usa el cifrado Blowfish, no SHA.

Hoy, un work factor de 10 toma aproximadamente 80ms en una CPU moderna. Para un atacante con GPU, sigue siendo mucho más costoso que SHA-256, aunque bcrypt tiene limitaciones: es resistente a FPGAs pero vulnerable a ASICs y especialmente a GPUs modernas que pueden paralelizar ciertas operaciones.

### scrypt

scrypt fue diseñado en 2009 por Colin Percival (FreeBSD) específicamente para ser costoso no solo en tiempo de CPU, sino también en **memoria**. Esto lo hace mucho más difícil de implementar en hardware especializado (ASICs, FPGAs) que bcrypt, porque el atacante necesita una cantidad significativa de memoria rápida por cada intento de hash.

La idea de scrypt es: calcular el hash requiere mantener un gran vector en memoria y acceder a él de forma pseudoaleatoria. Un ASIC que intente paralelizar scrypt necesita mucha memoria por núcleo, lo que encarece drásticamente el ataque.

scrypt fue el algoritmo usado por la criptomoneda Litecoin.

### argon2

argon2 ganó la competencia **Password Hashing Competition (PHC)** en 2015. Es el estándar moderno. Está diseñado por criptógrafos con los conocimientos acumulados de bcrypt y scrypt.

Ofrece tres variantes:

- **argon2d:** Resistente contra ataques de canal lateral (timing attacks). Ideal para sistemas donde el atacante puede medir tiempos de ejecución.
- **argon2i:** Optimizado para resistencia contra ataques de trade-off (tiempo vs memoria).
- **argon2id:** La combinación de ambos. Es la recomendada para uso general.

Al igual que scrypt, argon2 es configurable en tres parámetros: tiempo (costo computacional), memoria (uso de RAM), y paralelismo (número de hilos). Esto lo hace adaptable a diferentes hardware —puedes configurarlo para que tome 100ms en un servidor moderno así como en un Raspberry Pi.

### PBKDF2: El Más Antiguo

PBKDF2 (Password-Based Key Derivation Function 2) fue diseñado en el año 2000 y es parte de los estándares RSA. Es esencialmente aplicar SHA muchas veces en cadena. No tiene resistencia a memoria. Se considera el menos seguro de los cuatro para hashing de contraseñas, pero es el más compatible y está soportado en prácticamente todos los lenguajes y plataformas.

PBKDF2 con 100,000 iteraciones sigue siendo mejor que SHA-256 directo, pero peor que bcrypt/argon2.

### Resumen de Recomendaciones

Si estás diseñando un sistema hoy:
- Usa **argon2id** si tu plataforma lo soporta.
- Usa **bcrypt** si necesitas compatibilidad máxima.
- Usa **scrypt** si quieres resistencia a ASIC y no puedes usar argon2.
- No uses **PBKDF2** a menos que no tengas otra opción.
- Nunca uses SHA-256 directo ni MD5 ni SHA-1 para contraseñas.

---

## Casos de Fracaso Histórico

### LinkedIn 2012

LinkedIn sufrió una filtración de 6.5 millones de hashes SHA-1 sin sal. No era texto plano, pero estaba muy lejos de ser seguro. SHA-1 sin sal es vulnerable a tablas arcoíris. Para 2016, el 90% de las contraseñas habían sido descifradas. La SEC multó a LinkedIn con $2.5 millones por violar las leyes de protección de datos.

La lección: no basta con usar hashing. Hay que usar hashing diseñado para contraseñas, con sal.

### Adobe 2013

Adobe perdió 38 millones de cuentas. Las contraseñas estaban cifradas con 3DES en modo ECB. Ya vimos que ECB filtra patrones. Como resultado, los atacantes pudieron deducir que contraseñas como "password" y "Password" estaban relacionadas. Además, la hint de contraseña (una frase de ayuda que el usuario configura) estaba en texto plano, lo que ayudó aún más a los atacantes.

Adobe pagó $1.1 millones en costos legales y un acuerdo con la FTC.

### Ashley Madison 2015

El sitio de citas extramaritales Ashley Madison fue hackeado y se filtraron 36 millones de cuentas. El sitio usaba **bcrypt**, que es un algoritmo razonablemente bueno. Sin embargo, el daño no fue por debilidad criptográfica —fue por la naturaleza del negocio y la filtración misma.

Pero hay un detalle que los atacantes aprovecharon: aunque bcrypt es lento, las contraseñas débiles de los usuarios seguían siendo vulnerables. Contraseñas como "123456" se descifran sin importar qué algoritmo uses si el usuario las elige.

### SHA-1 y SHAttered (2017)

Google y CWI demostraron que podían generar dos documentos PDF diferentes con el mismo hash SHA-1. El ataque tomó el equivalente a 6,500 años de computación en CPU, pero solo 110 años de GPU —que en la práctica fueron meses en un clúster de Google.

Esto significa que SHA-1 ya no ofrece resistencia a colisiones, una de las propiedades fundamentales que debe tener una función hash segura.

### RockYou 2009

32 millones de cuentas en texto plano. La razón: RockYou almacenaba contraseñas sin ningún tipo de protección. Fue el despertar para muchas empresas sobre la necesidad del hashing.

### Maven Media 2023

Todavía en 2023, Maven Media expuso un archivo JSON con 3 millones de contraseñas en texto plano en un bucket S3 mal configurado. No era un ataque sofisticado —era un bucket público en internet al que cualquiera podía acceder.

---

## La Visión del Hacker: Como se Rompen las Contraseñas

Sabes cuál es el secreto peor guardado de la seguridad informática? Que la mayoría de las contraseñas se rompen en minutos, no porque el hash sea débil, sino porque los humanos somos predecibles. aqui te cuento cómo lo hacen.

### Ataques de Diccionario

El ataque más básico. Tomas una lista de las contraseñas más comunes (rockyou.txt tiene 14 millones de contraseñas reales), las hasheas con la sal de cada usuario, y las comparas. En cuestión de minutos recuperas la mayoría de las contraseñas.

Las listas de contraseñas más usadas incluyen: rockyou.txt, SecLists, Have I Been Pwned (con más de 600 millones de contraseñas reales filtradas).

### Fuerza Bruta con GPU

Una GPU moderna ejecuta miles de núcleos en paralelo. Para SHA-256, una RTX 4090 puede probar aproximadamente 10 mil millones de hashes por segundo. Con un clúster de GPUs, puedes probar billones.

Haz la cuenta: si tu base de datos tiene 10 millones de usuarios y usas SHA-256 sin key stretching, en un segundo el atacante probó la contraseña "123456" contra todos tus usuarios. En dos segundos, también "password".

Pero para bcrypt con work factor 12, la misma GPU logra solo unos miles de hashes por segundo. Para argon2id con parámetros altos, aún menos. Ahí la diferencia entre "lo rompo en un día" y "me rindo y busco un blanco más fácil".

### Máscaras y Reglas

Las personas siguen patrones predecibles al elegir contraseñas:

- Empiezan con mayúscula, terminan con número y símbolo: "Password1!"
- Usan años: "Contraseña2023"
- Reemplazan letras con símbolos: "P@ssw0rd"
- Usan nombres propios, equipos de fútbol, mascotas

Herramientas como Hashcat y John the Ripper tienen reglas predefinidas que generan variaciones de palabras base, probando millones de combinaciones por minuto.

### Ataques de Relleno de Credenciales (Credential Stuffing)

Los atacantes toman contraseñas filtradas de un sitio (ej. LinkedIn) y las prueban en otros sitios (ej. Gmail, Twitter, Banco). Como la mayoría de las personas reusa contraseñas, esto funciona alarmantemente bien.

En 2021, el ataque de credential stuffing contra la cuenta de un usuario de Twilio expuso información de Signal. Las consecuencias van más allá de la cuenta individual.

### Herramientas del Oficio

**Hashcat** es la herramienta más popular para el cracking de contraseñas. Soporta:

- Más de 300 modos de hash (MD5, SHA-1, SHA-256, bcrypt, argon2, etc.)
- Ataques con reglas (transformaciones automáticas de palabras base)
- Ataques de máscara (fuerza bruta con patrones conocidos)
- Aceleración por GPU (OpenCL, CUDA)
- Distribución en múltiples GPUs

**John the Ripper** es la alternativa clásica. Menos rápido que Hashcat en GPU, pero más flexible en modos de ataque y con mejor soporte para hashes de sistemas Unix (como /etc/shadow).

Los atacantes serios construyen **clusters de cracking** con múltiples GPUs. Un clúster de 8 RTX 4090 cuesta aproximadamente $20,000 y puede probar 80 mil millones de SHA-256 por segundo. A ese ritmo, todos los hashes SHA-256 de LinkedIn (6.5 millones) se podrían probar contra una lista de 10,000 contraseñas comunes en cuestión de segundos.

Por eso la velocidad del hash es el factor crítico. Un hash lento no evita el ataque —lo hace mil veces más costoso, lo que puede ser suficiente para disuadir a la mayoría de los atacantes.

### Ataques de Canal Lateral

- **Timing attacks en comparación:** Si comparas dos hashes byte por byte y te detienes en la primera diferencia, un atacante puede medir cuánto tarda la comparación y deducir cuántos bytes coinciden. Las implementaciones seguras usan comparación en tiempo constante.
- **Side-channel en la base de datos:** Si la consulta a la base de datos revela si el usuario existe o no antes de verificar la contraseña (por ejemplo, "Usuario no encontrado" vs "Contraseña incorrecta"), el atacante puede primero enumerar usuarios válidos y luego atacar sus contraseñas.

---

## Técnicas de Protección Avanzadas

### Pepper (Pimienta)

Mientras que la **sal** se guarda en la base de datos junto con el hash, la **pimienta (pepper)** es un valor secreto que se guarda aparte (en el código de la aplicación, en un HSM, en una variable de entorno). La pimienta se añade a la contraseña antes de hashearla, pero a diferencia de la sal, no se almacena en la base de datos.

Si un atacante roba solo la base de datos (sin el código), no tiene la pimienta y no puede calcular los hashes de las contraseñas candidatas. Si roba la base de datos y el código, la pimienta no ayuda —pero eso requiere un nivel de compromiso mayor.

La pimienta es una capa adicional de defensa, no un sustituto de la sal.

### Bloqueo de Cuentas

Después de N intentos fallidos, la cuenta se bloquea temporalmente. Esto hace que los ataques de fuerza bruta en línea sean impracticables.

El balance: si bloqueas por 5 intentos fallidos durante 15 minutos, un atacante solo puede probar 5 contraseñas cada 15 minutos por cuenta. Con 10,000 cuentas, puede probar 5 por cada una cada 15 minutos, lo que aún puede ser significativo si el atacante tiene muchos blancos.

### Autenticación Multifactor (MFA)

Incluso si un atacante obtiene la contraseña (por phishing, por filtración en otro sitio), no puede acceder sin el segundo factor (TOTP, SMS, llave FIDO2).

MFA no hace más segura la contraseña. Hace que tener la contraseña no sea suficiente.

### Have I Been Pwned y Listas de Contraseñas Filtradas

Cuando un usuario crea una contraseña, se puede verificar contra la API de Have I Been Pwned (que contiene cientos de millones de contraseñas reales filtradas). Si la contraseña está en la lista, se rechaza.

Esto evita que los usuarios elijan contraseñas que ya son conocidas, incluso si son complejas.

---

## La Autenticación y el Futuro

### Passkeys y FIDO2

El futuro apunta a eliminar las contraseñas por completo. Los estándares FIDO2/WebAuthn permiten autenticación mediante llaves criptográficas (almacenadas en el dispositivo, en un llavero USB, o en el gestor de contraseñas del sistema operativo).

Cuando inicias sesión en un sitio con un passkey, tu dispositivo firma un desafío criptográfico usando una llave privada que nunca sale de tu dispositivo. El servidor solo conoce la llave pública correspondiente. No hay contraseña que robar, no hay hash que descifrar.

Google, Apple y Microsoft han adoptado passkeys como parte de la FIDO Alliance. Para 2026, se espera que la mayoría de los nuevos dispositivos soporten autenticación sin contraseña.

Pero hasta que eso sea universal, el hashing de contraseñas sigue siendo una habilidad crítica para cualquier persona que diseñe sistemas.

**El resumen de todo:** Si te quedas con algo de esta guía, que sea: NO uses SHA-256 directo para contraseñas. Usa argon2id o bcrypt con un work factor decente. Pon sal siempre. Y si puedes, agrega pepper y bloqueo de cuenta. Cada capa suma. Los atacantes van a lo fácil —no les pongas la alfombra roja.

## Autoevaluación

1. Una base de datos almacena contraseñas usando SHA-256 sin sal. Un atacante roba la base de datos y logra descifrar el 60% de las contraseñas en 5 minutos. Explica exactamente que ataque uso y por que la sal lo habría prevenido.

2. Tu jefe te dice: "Vamos a encriptar las contraseñas con AES-256 en la base de datos". Identifica al menos dos problemas de seguridad en esta estrategia comparada con usar hashing con sal y key stretching.

3. En la analogía de la licuadora, explica por que una funcion hash siempre produce una salida de longitud fija sin importar el tamaño de la entrada. Por que esta propiedad es útil en sistemas de almacenamiento?

4. La funcion SHA-256 se considera segura para integridad de archivos pero insegura para almacenar contraseñas. Explica la contradiccion aparente: como puede un algoritmo ser seguro para un propósito e inseguro para otro?

5. LinkedIn en 2012 almacenaba hashes SHA-1 sin sal. Adobe en 2013 cifraba contraseñas con 3DES-ECB. Explica cual de los dos enfoques es menos inseguro y por que, analizando las debilidades específicas de cada uno.

6. Argon2 tiene tres parámetros configurables: tiempo, memoria y paralelismo. Explica como un incremento en el parámetro de memoria afecta la capacidad de un atacante de usar GPUs o ASICs para descifrar las contraseñas robadas.

7. Un sistema implementa bloqueo de cuenta después de 3 intentos fallidos durante 30 minutos. Sin embargo, un atacante logra evadir esta protección atacando 100,000 cuentas simultáneamente. Explica la lógica del ataque y como mitigarlo.

8. Las funciones hash criptográficas deben ser resistentes a colisiones. Por que es importante que nadie pueda encontrar dos mensajes diferentes que produzcan el mismo hash? Da un ejemplo de un ataque del mundo real que explotaria una debilidad de colisiones.

---
