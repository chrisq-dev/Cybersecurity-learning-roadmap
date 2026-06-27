---
title: "Fundamentos de Criptografía"
---

# Fundamentos de Criptografía

## Objetivo de esta Guía

Entender cómo funciona la seguridad de la información a nivel matemático permite tomar decisiones informadas al diseñar sistemas, evaluar vulnerabilidades o comprender por qué una conexión HTTPS es segura.

La criptografía es una herramienta diaria que se usa cientos de veces sin saberlo: al pagar con tarjeta, enviar un mensaje o acceder a la banca en línea. Como toda herramienta, si no se entienden sus límites, se usa incorrectamente.

En seguridad, saber cómo se rompe algo es tan importante como saber cómo se construye.

---

## El Problema Central: Compartir Secretos con un Extraño

Imagina que estás en un cuarto lleno de gente y necesitas pasarle una nota escrita a una persona al otro lado del cuarto. Todos los demás pueden ver lo que escribes. Si le pasas la nota directamente, alguien más la puede leer en el camino. Si la pones en una caja, cualquiera puede abrirla.

Este es el problema fundamental de las comunicaciones: dos partes que no se conocen, separadas por un medio inseguro, quieren compartir un secreto sin que un tercero lo intercepte.

A lo largo de la historia, la humanidad ha inventado dos soluciones distintas a este problema. Una usa una sola llave para cifrar y descifrar (simétrico). La otra usa dos llaves matemáticamente vinculadas (asimétrico). Cada una resuelve una parte del problema, y solo cuando las combinas obtienes una solución completa.

**Por qué esto importa:** Si no entiendes la diferencia entre estos dos mundos, cuando te toque diseñar un sistema vas a terminar haciendo algo inseguro sin darte cuenta. Existen sistemas "profesionales" que usaban RSA para cifrar archivos enormes y tardaban horas. Es importante evitar estos errores.

Vamos a entender ambas.

---

## Cifrado Simétrico: Una Misma Llave para Cerrar y Abrir

### La Caja Fuerte Compartida

Piensa en una caja fuerte común. Tiene un mecanismo de cierre que se bloquea con una llave metálica. Con esa misma llave puedes cerrar la caja y también abrirla. No hay una llave para cerrar y otra diferente para abrir. Es la misma.

Eso es el cifrado simétrico: un solo secreto compartido —la llave— se usa tanto para cifrar como para descifrar. Si Alice y Bob quieren comunicarse, los dos necesitan tener una copia exacta de la misma llave. Cualquiera que tenga esa llave puede leer los mensajes.

En el mundo real, el algoritmo simétrico dominante hoy es AES (Advanced Encryption Standard). Pero no siempre fue así, y entender la historia es entender por qué ciertas decisiones de diseño importan.

Sabes qué pasa cuando usas un algoritmo viejo solo porque "siempre funcionó"? Te van a partir al medio. La historia de la criptografía está llena de ejemplos de algoritmos que parecían seguros... hasta que alguien encontró la grieta.

### Breve Historia de la Lucha entre Cifradores y Criptoanalistas

Antes de que existieran las computadoras, el cifrado simétrico era cosa de manuales y rotores. El **Cifrado César** desplazaba cada letra del alfabeto por un número fijo de posiciones. Si sabías que el desplazamiento era 3, "HOLA" se convertía en "KROD". Se rompió en segundos —solo hay 25 desplazamientos posibles.

Luego vinieron los cifrados por **sustitución polialfabética** como el **Cifrado Vigenère**, que usaba una palabra clave para determinar diferentes desplazamientos para cada letra. Durante siglos se consideró inquebrantable, hasta que Friedrich Kasiski encontró la forma de romperlo en 1863 analizando patrones de repetición en el texto cifrado.

Durante la Primera Guerra Mundial, el **Telegrama Zimmermann** fue interceptado y descifrado por los británicos, lo que contribuyó a que EE.UU. entrara en la guerra. Este episodio demostró que la criptografía no era solo un juego académico —tenía consecuencias geopolíticas reales.

En la Segunda Guerra Mundial, los alemanes usaron **Enigma**, una máquina de rotores que implementaba un cifrado de sustitución complejo que cambiaba en cada pulsación de tecla. Cada rotor añadía una capa de ofuscación, y el reflector garantizaba que el cifrado fuera simétrico (cifrar dos veces recuperaba el original). Los aliados, liderados por Alan Turing y los matemáticos de Bletchley Park, lograron romperlo explotando debilidades en el protocolo de uso —los operadores alemanes enviaban mensajes predecibles como reportes climáticos y saludos de cumpleaños que daban a los criptoanalistas "texto conocido" para trabajar.

Enigma era matemáticamente sólido para su época, pero los humanos lo usaban mal. Esa es una lección que se repite una y otra vez en criptografía: el eslabón más débil casi siempre es la implementación o el protocolo, no el algoritmo.

En los años 70, el gobierno de EE.UU. estandarizó **DES (Data Encryption Standard)**, desarrollado por IBM con la NSA supervisando el diseño. Usaba llaves de 56 bits y un diseño de red Feistel. Hubo controversia porque la NSA redujo el tamaño de la llave de 128 bits original a 56 bits, lo que muchos sospecharon que era intencional para que la agencia pudiera romperlo. En los 70 y 80, 56 bits era seguro contra ataques prácticos. Pero para finales de los 90, una máquina construida por la Electronic Frontier Foundation llamada Deep Crack podía romper una llave DES en menos de 3 días a un costo de $250,000. Hoy, una GPU moderna como una RTX 4090 puede romper DES en minutos.

DES murió oficialmente cuando el NIST retiró el estándar en 2005. Pero su reemplazo ya estaba listo.

### AES: El Estándar Moderno

AES fue seleccionado en el año 2000 tras una competencia pública organizada por el NIST. Quince candidatos se presentaron, cinco fueron finalistas, y ganó un algoritmo llamado Rijndael, creado por los criptógrafos belgas Joan Daemen y Vincent Rijmen. La competencia fue completamente abierta y transparente —cada candidato fue analizado públicamente por la comunidad criptográfica mundial. Eso es exactamente lo contrario de cómo se diseñó DES.

AES es un **cifrado por bloques** que opera con bloques de 128 bits y soporta llaves de 128, 192 o 256 bits. La estructura interna se llama **Sustitución-Permutación (SP-network)** y consiste en:

- **SubBytes:** Cada byte del bloque se reemplaza por otro byte usando una tabla de sustitución no lineal (S-box). Esta S-box está diseñada específicamente para resistir ataques de criptoanálisis diferencial y lineal.
- **ShiftRows:** Las filas de la matriz de bytes se desplazan circularmente. Esto mezcla los bytes entre columnas.
- **MixColumns:** Cada columna de la matriz se transforma mediante una multiplicación polinomial que mezcla los bytes dentro de la columna.
- **AddRoundKey:** El bloque se combina con la llave de la ronda actual mediante XOR.

El número de rondas depende del tamaño de la llave: 10 rondas para AES-128, 12 para AES-192, 14 para AES-256. Cada ronda aplica estas cuatro operaciones (excepto la última, que omite MixColumns).

No necesitas memorizar estos detalles para usar criptografía correctamente. Pero entender que AES no es solo "revuelve los bits al azar" —sino que es un diseño matemáticamente estructurado con propiedades específicas de difusión y confusión— te ayuda a apreciar por qué es seguro y por qué modificarlo es peligroso. Cambiar un solo byte de la S-box o alterar el número de rondas puede destruir la seguridad del algoritmo entero.

**Por qué esto importa:** Cada vez que veas a alguien decir "es que le agregué mi propio cifrado encima de AES para hacerlo más seguro", corre. La criptografía no es como la pizza que le puedes poner más ingredientes. Agregar pasos caseros generalmente rompe todo.

### La Importancia de la Entropía y la Generación de Llaves

Aquí hay una verdad incómoda: AES es matemáticamente seguro solo si la llave que usas es verdaderamente aleatoria. Si tu llave es "MiClave123", el atacante no necesita forzar 2^128 posibilidades —solo necesita probar palabras de diccionario.

La **entropía** es la medida de la incertidumbre en un sistema. Una llave de 128 bits tiene 2^128 valores posibles si cada bit fue elegido al azar. Pero una llave generada por un humano escribiendo en un teclado tiene mucha menos entropía —quizás solo 20-30 bits si es una frase predecible.

Los sistemas operativos modernos recolectan entropía de fuentes como:
- La variación en los tiempos de llegada de paquetes de red
- El movimiento del mouse y la pulsación de teclas
- La variación en los tiempos de acceso a disco (latencia rotacional)
- Ruido térmico en sensores de hardware
- Generadores de números aleatorios basados en hardware (como Intel RDSEED)

En Linux, la entropía se gestiona a través de `/dev/random` (que bloquea si no hay suficiente entropía) y `/dev/urandom` (que no bloquea). Durante años hubo debate sobre cuál usar, pero hoy la recomendación unánime es usar `getrandom()` o `/dev/urandom` en todos los casos prácticos.

Un error clásico es inicializar un generador pseudoaleatorio con una semilla predecible. Por ejemplo, usar `srand(time(NULL))` en C para generar llaves criptográficas. El tiempo tiene una entropía de segundos desde una fecha conocida —un atacante puede probar todos los valores posibles en milisegundos.

La seguridad de AES es abrumadora en la práctica:
- **AES-128** requiere aproximadamente 2^128 operaciones para romperse por fuerza bruta. Si tuvieras una máquina capaz de probar un billón de llaves por segundo, te tomaría más años que la edad estimada del universo (13,800 millones de años).
- **AES-256** cuadruplica el espacio de llaves. Es el estándar que usa el gobierno de EE.UU. para información clasificada de alto secreto.

Haz la cuenta: 13 mil millones de años. Y aún así la gente usa "Password123". No tiene sentido.

Sin embargo, hay un detalle crítico que la mayoría de la gente ignora: AES no es simplemente "AES". La forma en que se aplica importa tanto como el algoritmo mismo.

### Modos de Operación: El Talón de Aquiles de los Implementadores

AES cifra datos en bloques de 128 bits. Pero los archivos no siempre miden exactamente 128 bits. Y si cifras dos bloques idénticos con la misma llave, obtienes dos bloques cifrados idénticos. Eso filtra información sobre la estructura del mensaje original.

Aquí entran los **modos de operación**:

- **ECB (Electronic Codebook):** El modo más básico y peligroso. Cada bloque de 128 bits se cifra independientemente. Si cifras una imagen con áreas de color uniforme, el patrón sigue siendo visible en el cifrado. Es el famoso meme del pingüino cifrado donde se sigue viendo la silueta del pingüino. Nunca uses ECB para nada que no sea jugar. La NSA desaconseja explícitamente su uso en cualquier aplicación seria.

- **CBC (Cipher Block Chaining):** Cada bloque se mezcla mediante XOR con el bloque cifrado anterior antes de cifrarse. Esto soluciona el problema de los patrones, pero introduce dependencia secuencial —no puedes cifrar en paralelo. Además, CBC requiere un **vector de inicialización (IV)** aleatorio para cada mensaje. Si reusas el IV, la seguridad se degrada. CBC también es vulnerable a ataques de **padding oracle** si el servidor revela si el padding es válido o no. El ataque **POODLE** contra SSLv3 explotaba exactamente esto.

- **CFB (Cipher Feedback):** Convierte el cifrado de bloques en un cifrado de flujo. El cifrado del bloque anterior se cifra y luego se combina con el texto plano. Útil cuando necesitas cifrar datos byte a byte, pero menos común hoy.

- **OFB (Output Feedback):** Genera un flujo de keystream cifrando repetidamente un vector de inicialización. El keystream es independiente del texto plano y del cifrado. Problema: si el IV se repite, la seguridad se destruye por completo.

- **CTR (Counter):** Cifra un contador que se incrementa por cada bloque. Es paralelizable —puedes cifrar el bloque 1 y el bloque 10 simultáneamente. También permite acceso aleatorio al cifrado (descifrar solo el bloque 5 sin descifrar los anteriores). Es la base de los modos modernos.

- **GCM (Galois/Counter Mode):** El favorito actual. Usa CTR para el cifrado, y añade una capa de **autenticación** mediante multiplicación en el campo de Galois. Esto significa que no solo cifra, sino que también genera un tag que detecta si alguien modificó los datos cifrados. Esto se llama **cifrado autenticado (AEAD)** y es esencial para prevenir ataques de manipulación. TLS 1.2 y 1.3 usan AES-GCM como estándar.

- **CCM (Counter with CBC-MAC):** Similar a GCM pero menos eficiente. Se usa en algunos protocolos inalámbricos como WPA2.

La elección del modo es crítica. Si ves a alguien implementando AES-ECB en producción, no entiende criptografía. Si ves AES-CBC sin autenticación, hay riesgo de padding oracle. El estándar moderno seguro es AES-GCM.

**Por qué esto importa:** Esto no es teoría al pedo. Cada uno de estos modos tiene vulnerabilidades documentadas que se han explotado en ataques reales. No es que "ECB es malo porque sí". Es que filtra información y ya se demostró mil veces.

### Cifrado de Flujo vs Cifrado de Bloques

AES es un **cifrado por bloques** —procesa datos en bloques fijos (128 bits). Pero existe otra categoría: los **cifrados de flujo**, que procesan datos byte a byte o bit a bit, como si generaran un flujo continuo de valores aleatorios que se combinan con el texto plano.

Históricamente, los cifrados de flujo como **RC4** fueron muy populares por su simplicidad y velocidad. RC4 se usó en WEP, SSL/TLS y muchos otros protocolos. Pero RC4 tenía debilidades fatales: los primeros bytes de su keystream no eran realmente aleatorios, y con suficientes muestras era posible reconstruir el estado interno. Hoy RC4 está completamente roto y no debe usarse.

El cifrado de flujo moderno más importante es **ChaCha20**, diseñado por Daniel J. Bernstein. Es más rápido que AES en software (especialmente en dispositivos sin aceleración hardware AES), y es el cifrado por defecto en TLS 1.3 cuando se combina con Poly1305 para autenticación (ChaCha20-Poly1305). WhatsApp, Google, y Cloudflare lo usan ampliamente.

La diferencia clave: los cifrados de bloque como AES son excelentes con aceleración hardware (presente en casi todos los CPUs modernos), mientras que ChaCha20 brilla en software puro, lo que lo hace ideal para dispositivos móviles más antiguos o sistemas embedded sin soporte AES-NI.

### One-Time Pad: El Único Cifrado Perfecto (Pero Impractico)

Existe un cifrado que ofrece **seguridad perfecta** en sentido matemático —el **One-Time Pad (OTP)**. La idea es simple: tomas un mensaje y lo combinas con una llave aleatoria de exactamente la misma longitud mediante XOR. Si la llave es verdaderamente aleatoria, se usa una sola vez, y se mantiene secreta, el cifrado resultante es matemáticamente inquebrantable —incluso con una computadora cuántica infinita.

El problema: la llave debe ser tan larga como el mensaje, debe ser verdaderamente aleatoria, y ambas partes deben tenerla de antemano por un canal seguro. Eso significa que si quieres enviar 1 GB de datos, necesitas haber compartido 1 GB de llave aleatoria previamente. Esto hace que OTP sea impráctico para casi cualquier aplicación real.

El OTP se usó históricamente en la línea roja entre Moscú y Washington durante la Guerra Fría, donde los mensajes eran cortos y las llaves se intercambiaban mediante valijas diplomáticas. Pero para la comunicación digital masiva de hoy, no es una opción viable.

### Casos Reales de Uso y Abuso del Simétrico

**Ransomware WannaCry (2017):** Infectó más de 200,000 computadoras en 150 países en cuestión de días. Usaba AES-128 para cifrar los archivos de la víctima y luego RSA para cifrar la llave AES. Ese es el patrón clásico del ransomware: lo rápido para el volumen de datos, lo asimétrico para proteger la llave. Si el ransomware usara RSA para cifrar cada archivo, el proceso tomaría horas y el ataque sería descubierto antes de completarse.

**Shamoon (2012):** Un malware dirigido a la petrolera saudí Aramco. No solo cifraba los archivos, sino que sobrescribía el Master Boot Record de los discos, dejando los sistemas inservibles. Usaba AES para el cifrado local. Destruyó los datos de más de 30,000 computadoras. No buscaba rescate —buscaba destrucción.

**BitLocker y FileVault:** Los sistemas de cifrado de disco completo de Windows y macOS usan AES en modo XTS (una variante de CBC diseñada para almacenamiento). Esto protege los datos si te roban la laptop. Sin embargo, si la computadora está encendida y la sesión está activa, los datos están descifrados y accesibles —el cifrado de disco no protege contra ataques en caliente.

**Snowden y Dual EC DRBG (2013):** Los documentos filtrados por Edward Snowden revelaron que la NSA había pagado a RSA Security para usar el generador de números aleatorios **Dual EC DRBG** por defecto. Este generador contenía una puerta trasera teórica —usando parámetros específicos, la NSA podía predecir los números aleatorios generados. Si el generador de números aleatorios está comprometido, cualquier llave AES generada con él es predecible. No importa qué tan fuerte sea AES si la llave la generó un sistema comprometido.

---

## El Problema de la Distribución de Llaves

Llegamos al talón de Aquiles del cifrado simétrico. Si Alice y Bob están en lados opuestos del mundo, ¿cómo acuerdan una llave secreta compartida sin que nadie más la intercepte?

No pueden mandársela por el mismo canal que quieren proteger —eso es como poner la llave de la caja fuerte dentro de la caja fuerte antes de cerrarla. Necesitan un canal seguro aparte, pero si tuvieran un canal seguro aparte, no necesitarían cifrar.

hay un problema de los que mencionan en todos lados pero pocos explican bien? Este es uno. La paradoja de la distribución de llaves es el motivo por el que la criptografía simétrica sola no sirve para comunicarse con desconocidos.

Este problema, el **Problema de la Distribución de Llaves**, fue lo que mantuvo a la criptografía simétrica limitada a contextos donde las partes podían reunirse físicamente (espías, militares, diplomáticos) durante miles de años.

Durante siglos, la solución fue reunirse en persona para acordar la llave, o usar mensajeros de confianza. Pero en la era digital, donde las comunicaciones son globales e instantáneas, esa solución no escala. Necesitas poder comunicarte de forma segura con alguien que nunca has visto en persona.

Aquí es donde entra la criptografía asimétrica.

---

## Cifrado Asimétrico: Dos Llaves con una Relación Especial

### El Buzón Público

Imagina que colocas un buzón de correos en la vía pública. Cualquiera puede meter una carta, pero solo tú tienes la llave para abrirlo y leer lo que hay dentro.

El buzón tiene dos estados:
- **Abierto para recibir:** cualquiera puede dejar un mensaje.
- **Cerrado para proteger:** solo el dueño puede abrirlo.

Eso es el cifrado asimétrico en esencia: una **llave pública** que cualquiera puede usar para cifrar (cerrar el buzón), y una **llave privada** que solo el dueño tiene y que sirve para descifrar (abrir el buzón).

La relación matemática entre ambas llaves es direccional. Puedes derivar la llave pública de la privada fácilmente. Pero derivar la privada a partir de la pública es computacionalmente inviable —siempre que los parámetros sean suficientemente grandes.

### Diffie-Hellman: El Momento Eureka

En 1976, Whitfield Diffie y Martin Hellman publicaron "New Directions in Cryptography", que cambió la seguridad digital para siempre. Por primera vez, demostraron que dos partes podían acordar un secreto compartido a través de un canal completamente público e inseguro.

El concepto es hermoso en su simplicidad:

1. Alice y Bob acuerdan dos números públicos: un primo grande `p` y una base `g`.
2. Alice elige un número secreto `a`, calcula `A = g^a mod p`, y envía `A` a Bob.
3. Bob elige un número secreto `b`, calcula `B = g^b mod p`, y envía `B` a Alice.
4. Alice calcula `s = B^a mod p`.
5. Bob calcula `s = A^b mod p`.

Ambos obtienen el mismo resultado `s` —la llave compartida— sin haberla transmitido nunca. Un atacante que intercepte `g`, `p`, `A` y `B` no puede calcular `s` sin resolver el **Problema del Logaritmo Discreto**, que en números suficientemente grandes es computacionalmente inviable.

Un ejemplo numérico pequeño para que se entienda (usando números pequeños que no son seguros pero ilustran el concepto): si `p=23`, `g=5`, Alice elige `a=6`, Bob elige `b=15`, entonces Alice envía `A = 5^6 mod 23 = 8`, Bob envía `B = 5^15 mod 23 = 19`, y ambos calculan la misma llave `s = 19^6 mod 23 = 8^15 mod 23 = 2`. El atacante ve `p=23, g=5, A=8, B=19` pero no puede obtener `s=2` sin probar todos los valores posibles de `a` o `b`.

En la práctica, `p` es un primo de 2048 bits o más. Hay que destacar algo importante: Diffie-Hellman básico es vulnerable a ataques MITM si no hay autenticación. Un atacante puede interceptar los valores públicos y reemplazarlos con los suyos, estableciendo dos llaves separadas con Alice y Bob. Por eso Diffie-Hellman siempre debe ir acompañado de firmas digitales o estar integrado en un protocolo que autentique las partes, como TLS.

Este fue el avance que hizo posible la criptografía moderna. Sin Diffie-Hellman, no habría comercio electrónico, ni VPNs, ni HTTPS como lo conocemos.

**Por qué esto importa:** Cada vez que compras algo por internet, estás usando Diffie-Hellman sin saberlo. Literalmente, si no existiera este algoritmo, no podrías darle tu número de tarjeta a Amazon sin que todo internet lo vea. Piensa en eso un segundo.

### RSA: La Factorización de Primos

Un año después de Diffie-Hellman, Ron Rivest, Adi Shamir y Leonard Adleman publicaron RSA, que añadía la capacidad de **cifrar directamente** y **firmar digitalmente**.

RSA se basa en un problema matemático diferente: la **factorización del producto de dos números primos grandes**. Si multiplicas dos primos gigantescos `p` y `q`, obtienes un número compuesto `n`. Dado `n`, encontrar `p` y `q` es extremadamente difícil —no hay algoritmo eficiente conocido para factorizar números grandes. Pero si conoces `p` y `q`, puedes calcular la llave privada y descifrar.

El funcionamiento conceptual: para cifrar un mensaje `m`, calculas `c = m^e mod n`, donde `e` y `n` forman la llave pública. Para descifrar, calculas `m = c^d mod n`, donde `d` es la llave privada. La relación entre `e` y `d` está gobernada por la función totient de Euler.

RSA fue el estándar dominante durante décadas y todavía se usa ampliamente, pero tiene limitaciones:

- **Velocidad:** RSA es órdenes de magnitud más lento que AES. Cifrar un archivo grande con RSA directo tomaría una eternidad.
- **Tamaño de llave:** Para ser seguro hoy, RSA necesita llaves de al menos 2048 bits. Las de 1024 bits se consideran vulnerables —la NSA las clasifica como rompibles por agencias estatales. RSA-768 se factorizó en 2009 usando cientos de computadoras durante 2 años.
- **Rendimiento en firmas:** RSA requiere exponenciación modular con exponentes enormes, lo que consume mucha CPU comparado con alternativas modernas.

### Curvas Elípticas (ECC): Más por Menos

Sin entrar en la matemática profunda —que involucra puntos en una curva de la forma `y^2 = x^3 + ax + b` y la operación de suma geométrica sobre esos puntos— lo que importa saber es que **ECC ofrece la misma seguridad que RSA con llaves mucho más pequeñas**.

La comparación aproximada:

- RSA 2048 bits equivale a ECC 224 bits
- RSA 3072 bits equivale a ECC 256 bits
- RSA 15360 bits equivale a ECC 521 bits

La diferencia en rendimiento es dramática. Una firma ECDSA con una llave de 256 bits es mucho más rápida de generar que una firma RSA de 2048 bits, y el tamaño de la firma también es menor. Por eso los dispositivos móviles, que tienen CPUs más limitadas y ancho de banda restringido, prefieren ECC. También por eso **TLS 1.3 eliminó RSA como opción de intercambio de llaves** y solo permite Diffie-Hellman efímero sobre curvas elípticas (ECDHE).

Las curvas más usadas hoy son **Curve25519** (también conocida como X25519) y **P-256** (secp256r1). Curve25519 fue diseñada por Daniel J. Bernstein específicamente para ser segura y fácil de implementar correctamente, evitando bugs de implementación como los que plagan a otras curvas. P-256 es una curva recomendada por el NIST.

Sin embargo, ECC no está exenta de controversia. Las curvas **P-224, P-256, P-384 y P-521** fueron generadas por la NSA usando parámetros cuyo origen nunca se explicó completamente. Aunque no hay evidencia de que tengan puertas traseras, la falta de transparencia en su generación ha llevado a sospechas. Por eso muchos criptógrafos prefieren Curve25519, cuyos parámetros fueron generados de forma completamente transparente y cuyo diseño evita problemas comunes de implementación.

### Comparación de Niveles de Seguridad

Para que te hagas una idea de cómo se comparan los distintos algoritmos, aquí hay una tabla de niveles de seguridad equivalentes aproximados:

- AES-128 equivale a RSA-3072 y ECC-256
- AES-192 equivale a RSA-7680 y ECC-384
- AES-256 equivale a RSA-15360 y ECC-521

Pero el nivel de seguridad no lo es todo. También importa:

- **Rendimiento:** AES-128 es significativamente más rápido que AES-256 en CPUs sin aceleración hardware especializada. En CPUs modernos con AES-NI, la diferencia es mínima.
- **Tamaño de la llave:** Las llaves ECC son mucho más pequeñas que las RSA. Una llave pública ECC de 256 bits ocupa 32 bytes, mientras que una RSA de 3072 bits ocupa 384 bytes. En protocolos como TLS, esto se traduce en menos datos que transmitir durante el handshake.
- **Tamaño de la firma:** Las firmas RSA son del tamaño de la llave (por ejemplo, 2048 bits = 256 bytes). Las firmas ECDSA son aproximadamente el doble del nivel de seguridad (por ejemplo, 64 bytes para seguridad de 128 bits).
- **Resistencia a ataques cuánticos:** Ninguno de los algoritmos actuales resiste una computadora cuántica capaz de ejecutar el algoritmo de Shor. Pero AES-256 mantiene 128 bits de seguridad contra Grover, mientras que RSA y ECC caen completamente.

### El Costo Computacional y la Necesidad de la Combinación

Resumamos:

- **Simétrico (AES):** Rápido, eficiente, ideal para grandes volúmenes. Pero requiere que ambas partes conozcan la misma llave previamente.
- **Asimétrico (RSA/ECC):** Resuelve el problema de distribución de llaves y permite autenticación. Pero es computacionalmente costoso.

La solución práctica: **usar ambos**. El cifrado asimétrico para intercambiar de forma segura una llave simétrica temporal, y luego usar esa llave simétrica para el volumen de datos. Esto se llama **criptografía híbrida** y es exactamente lo que hace TLS, SSH, Signal, WhatsApp, y prácticamente cualquier protocolo criptográfico moderno.

Es como si para abrir una puerta usarás una llave enorme y pesada solo para sacar la llave chica de adentro de una caja. Suena ridículo pero es exactamente lo que pasa y funciona perfecto.

---

## Criptografía Híbrida: Lo Mejor de Dos Mundos en Acción

Cuando tu navegador se conecta a un servidor HTTPS, ocurre esto en milisegundos:

1. **Negociación:** El navegador y el servidor acuerdan qué algoritmos usarán. El servidor presenta su certificado (que contiene su llave pública firmada por una Autoridad Certificadora).
2. **Intercambio de llaves:** Usan ECDHE (Diffie-Hellman sobre curva elíptica, con valores efímeros que se generan nuevos en cada conexión) para acordar una llave simétrica compartida.
3. **Autenticación:** El servidor firma sus mensajes del handshake con su llave privada (RSA o ECDSA). El navegador verifica la firma usando la llave pública del certificado, confirmando que está hablando con el servidor correcto.
4. **Cifrado de datos:** Con la llave simétrica acordada, ambos cifran todo el tráfico con AES-GCM (o ChaCha20-Poly1305).

El resultado: verificaste la identidad del servidor, intercambiaste una llave de forma segura, y cifraste terabytes de datos rápidamente. Cada técnica hace lo que mejor sabe hacer.

---

## Casos de Fracaso en el Mundo Real

### DES y la Lección de los 56 Bits

DES usaba llaves de 56 bits. En los 70, eso parecía suficiente. Pero en 1998, la EFF construyó Deep Crack por menos de $250,000 y rompió DES en menos de 3 días. Hoy, con GPUs modernas, una llave DES se rompe en segundos.

La lección: el tamaño de llave importa, y lo que es seguro hoy no lo será mañana. La seguridad es un objetivo móvil.

### Logjam: Cuando la Deuda Técnica Cobra Factura

En 2015, un equipo de investigadores descubrió **Logjam**, que explotaba la debilidad de grupos Diffie-Hellman de 512 bits. Históricamente, EE.UU. había restringido la exportación de criptografía fuerte durante la Guerra Fría, limitando las llaves a 512 bits. Esa restricción quedó en la ley hasta los años 90, pero los sistemas legacy mantenían la compatibilidad.

Logjam permitía a un atacante en posición MITM degradar una conexión TLS a Diffie-Hellman de 512 bits y luego romper la llave en tiempo real usando servicios en la nube como Amazon EC2. Afectó al 8.4% de los servidores HTTPS más populares. Los investigadores demostraron que podían romper un intercambio de 512 bits en cuestión de minutos.

La lección: mantener compatibilidad con algoritmos débiles por razones heredadas es una deuda técnica que eventualmente se cobra en forma de vulnerabilidades.

### FREAK: La Trampa de la Criptografía de Exportación

Similar a Logjam, **FREAK (Factoring RSA Export Keys)** en 2015 explotaba la capacidad de forzar a un servidor a usar RSA de exportación (512 bits), que podía factorizarse. El atacante degradaba la conexión, obligaba al servidor a usar criptografía débil, descifraba la llave de sesión, y luego interceptaba todo el tráfico.

Afectó a los navegadores Apple Safari y Android por defecto. La causa raíz: los navegadores permitían RSA de exportación para mantener compatibilidad con servidores antiguos del gobierno de EE.UU., décadas después de que las leyes de exportación hubieran cambiado.

### Heartbleed: Cuando el Bug no Está en la Mate

En 2014, se descubrió **Heartbleed (CVE-2014-0160)**, una vulnerabilidad en OpenSSL —la biblioteca criptográfica más usada del mundo— que permitía leer la memoria del servidor. Esto podía incluir llaves privadas de certificados TLS, contraseñas de sesiones activas, y cualquier otro dato en memoria.

Heartbleed no era un problema matemático. AES y RSA eran perfectamente seguros. El problema era una mala implementación del protocolo Heartbeat de TLS: no validaba los límites de un buffer. Un atacante enviaba un heartbeat con una longitud falsa y recibía hasta 64 KB de memoria del servidor que no debería haber visto.

Afectó a millones de servidores. Se estima que el 17% de los servidores HTTPS seguros en internet eran vulnerables en el momento del anuncio. Empresas como Yahoo, Dropbox y GitHub estuvieron afectadas. El certificado de Yahoo fue revocado y re-emitido porque sus llaves privadas potencialmente habían sido expuestas.

La lección: un algoritmo seguro en una implementación insegura no es un sistema seguro. La criptografía es una cadena, y tan fuerte como su eslabón más débil.

### DUAL_EC_DRBG: La Puerta Trasera de la NSA

El generador de números aleatorios **Dual Elliptic Curve Deterministic Random Bit Generator (DUAL_EC_DRBG)** fue estandarizado por el NIST en 2006. En 2007, investigadores de Microsoft descubrieron que tenía una estructura que permitía una puerta trasera si conocías ciertos parámetros. En 2013, Snowden confirmó que la NSA había pagado secretamente para que DUAL_EC_DRBG fuera el estándar y que podía romper cualquier cifrado generado con él.

RSA Security (la empresa, no el algoritmo) recibió $10 millones de la NSA para usar DUAL_EC_DRBG como generador por defecto en su biblioteca BSAFE. Esta es una de las razones por las que la comunidad criptográfica desconfía de los estándares que no son completamente abiertos y auditables.

### POODLE: Cuando SSL 3.0 se Niega a Morir

**POODLE (Padding Oracle On Downgraded Legacy Encryption)** en 2014 demostró el peligro de mantener protocolos antiguos por compatibilidad. El ataque forzaba una degradación a SSL 3.0, que usaba cifrado CBC con un diseño vulnerable. Un atacante podía descifrar cookies de sesión byte a byte explotando el padding oracle.

La solución: deshabilitar SSL 3.0 por completo. Pero diez años después, todavía hay servidores que lo soportan. Una lección sobre cómo la deuda técnica persiste.

### RC4 y la Caída de un Favorito

RC4 fue el cifrado de flujo más usado durante décadas. Rápido, simple, fácil de implementar en software. Se usó en SSL, TLS, WEP, y muchos otros protocolos. Pero tenía un defecto fundamental: su keystream inicial era predecible. Combinado con el hecho de que TLS reusaba llaves para múltiples mensajes, esto permitió ataques prácticos como **RC4 NOMORE (2015)** que podía descifrar cookies de sesión interceptando aproximadamente 2^26 conexiones.

Hoy RC4 está completamente prohibido en los estándares TLS. Pero su larga vida —y la resistencia de la industria a abandonarlo— es otra lección sobre cómo la comodidad supera a la seguridad hasta que es demasiado tarde.

## La Visión del Hacker

Sabes cuál es el mejor truco de un hacker? No es romper el cifrado. Es hacer que el otro cambie al cifrado más choto que existe sin que se dé cuenta. aqui te cuento cómo.

### Downgrade Attacks: No Necesitas Romper AES

Un atacante sofisticado no va a gastar años tratando de adivinar una llave AES de 256 bits. Lo que hace es forzar al cliente y al servidor a usar la versión más débil del protocolo.

En TLS, el handshake negocia el conjunto de cifrados que ambas partes soportan. El cliente envía una lista de cifrados que soporta, ordenados por preferencia. El servidor elige el más fuerte que ambos soporten. Si un atacante puede interceptar y modificar los mensajes de negociación, puede eliminar las opciones fuertes de la lista del cliente, dejando solo las débiles. Luego rompe la opción débil.

Esto se mitiga en TLS 1.3 al eliminar los algoritmos débiles por completo (RSA para intercambio de llaves, cifrados de bloque en modo CBC, etc.) y al firmar criptográficamente todo el handshake para que cualquier manipulación sea detectable.

### Side-Channel Attacks: El Enemigo es el Mundo Físico

Sabes qué pasa cuando un algoritmo es matemáticamente perfecto pero el mundo real se mete? Esto. Son ataques que no atacan el algoritmo matemático, sino su implementación en el mundo físico.

Pero funciona.

- **Timing attacks:** Mides cuánto tarda el servidor en procesar una operación y deduces información sobre la llave. Una implementación ingenua de RSA que compara llaves byte por byte y se detiene en la primera diferencia revela información sobre cuántos bytes coinciden. Las implementaciones modernas usan **constant-time comparison** —siempre toma el mismo tiempo, independientemente de si los valores coinciden o no.

- **Power analysis:** Mides el consumo de energía del chip mientras realiza operaciones criptográficas. Diferentes operaciones (multiplicación, suma, exponenciación) consumen diferentes cantidades de energía. Con suficientes mediciones, puedes deducir la llave. Esto es particularmente relevante para dispositivos IoT y tarjetas inteligentes.

- **Caché attacks:** Accedes a la memoria caché del procesador y observas qué datos se están procesando. Los ataques como **Flush+Reload** o **Prime+Probe** permiten a un proceso no privilegiado deducir información sobre operaciones criptográficas que ocurren en otro proceso o incluso en una máquina virtual en el mismo hardware.

- **Spectre y Meltdown (2018):** Vulnerabilidades de CPU que permiten leer memoria del kernel a través de ejecución especulativa. Aunque no son ataques criptográficos per se, pueden exponer llaves privadas almacenadas en memoria.

### Ataques de Protocolo: Donde la Criptografía se Encuentra con la Red

Los ataques de protocolo explotan la forma en que se usan los algoritmos criptográficos, no los algoritmos mismos.

- **Padding oracle attacks:** Si un sistema revela si el padding de un mensaje cifrado es válido o no (por ejemplo, devolviendo un error diferente según el caso), un atacante puede descifrar el mensaje byte a byte. El ataque POODLE contra SSL 3.0 y los ataques contra TLS-CBC en general explotan esta debilidad. La solución definitiva es usar cifrados autenticados (AES-GCM, ChaCha20-Poly1305) que verifican la integridad antes de procesar cualquier padding.

- **Ataques de reinyeccion (replay):** Un atacante captura un mensaje cifrado válido y lo reenvía más tarde. Si el sistema no detecta repeticiones, puede aceptar la transacción duplicada. Los protocolos modernos usan **nonces** (numbers used once) y marcas de tiempo para evitar esto. Por ejemplo, el protocolo TLS 1.3 incluye un random en el handshake que hace que cada sesión sea única e irrepetible.

- **Truncamiento:** Un atacante elimina el último bloque de un mensaje cifrado. Si el sistema procesa el mensaje antes de verificar su integridad, puede aceptar un mensaje truncado. Los modos AEAD generan un tag de autenticación que cubre todo el mensaje, haciendo detectable cualquier truncamiento.

- **Ataques de texto cifrado elegido (CCA):** Un atacante que puede hacer que el sistema descifre mensajes arbitrarios (excepto el objetivo) puede deducir información sobre el texto plano cifrado. Los esquemas de cifrado modernos como RSA-OAEP están diseñados específicamente para resistir CCA. Por eso nunca debes usar RSA "crudo" (textbook RSA) —siempre debe ir con padding (OAEP o PSS).

Estos ataques demuestran por qué la criptografía moderna no son solo algoritmos, sino **protocolos completos**. TLS no es solo AES + RSA —es la forma específica en que se combinan, negocian, y verifican que hace seguro al sistema.

### Weak Randomness: Sin Azar, No Hay Seguridad

Si el generador de números aleatorios genera números predecibles, toda la criptografía se derrumba. Algunos ejemplos históricos:

- En 2012, investigadores analizaron millones de llaves RSA públicas en internet y encontraron que aproximadamente 1 de cada 200 llaves compartía un factor primo con otra llave. La causa: generadores aleatorios débiles en dispositivos embedded (routers, firewalls) que inicializaban sus llaves al arrancar, cuando el sistema aún no había acumulado suficiente entropía.

- En 2013, se descubrió que el generador aleatorio de Android en versiones antiguas no se inicializaba correctamente, resultando en llaves criptográficas predecibles para billeteras de Bitcoin. Se perdieron bitcoins reales como resultado.

- El ataque a la lotería de Iowa en 2022 por un empleado de la NSA que manipuló el generador de números aleatorios de la lotería para predecir números ganadores. Aunque se trató de un ataque interno, ilustra la importancia de la fuente de aleatoriedad.

La lección: si tus llaves no son realmente aleatorias, el atacante no necesita romper el cifrado. Solo necesita adivinar la llave.

### La Amenaza Cuántica

Dos algoritmos cuánticos amenazan la criptografía actual de maneras diferentes:

- **Algoritmo de Shor (1994):** Puede factorizar números grandes y resolver logaritmos discretos exponencialmente más rápido que cualquier algoritmo clásico conocido. Esto rompería RSA, Diffie-Hellman y ECC por completo si existiera una computadora cuántica con suficientes qubits lógicos. Para romper RSA-2048, se estima que se necesitan aproximadamente 20 millones de qubits físicos (con corrección de errores), algo que no existe hoy pero que podría ser posible en las próximas décadas.

- **Algoritmo de Grover (1996):** Acelera la búsqueda en bases de datos no ordenadas. Para criptografía, esto significa que un ataque de fuerza bruta contra AES-128 se reduce de 2^128 a 2^64 operaciones. Eso reduce la seguridad efectiva de AES-128 a 64 bits —considerado insuficiente. Sin embargo, AES-256 quedaría en 128 bits efectivos, que sigue siendo seguro contra ataques cuánticos prácticos.

Por eso hay un esfuerzo masivo del NIST, iniciado en 2016, para estandarizar **criptografía post-cuántica** —algoritmos basados en problemas matemáticos que resistan ataques tanto clásicos como cuánticos. Los candidatos incluyen esquemas basados en retículas (lattices), códigos correctores de errores, funciones hash multivariadas, y isogenias. Se espera que los estándares finales se publiquen en los próximos años, y ya hay implementaciones experimentales en uso (como la extensión híbrida de TLS 1.3).

---

**Por qué esto importa (el resumen final):** La criptografía no es un hechizo mágico. Es matemática aplicada con un montón de formas de fallar. Si te llevas algo de esta guía, que sea esto: el algoritmo más seguro del mundo no te salva si la implementación es una porquería, si la llave la genera un sistema comprometido, o si el protocolo permite que te degraden a algo inseguro.

---

## Autoevaluación

1. Un ataque de ransomware cifra 10 TB de datos de una empresa en 15 minutos usando AES. Luego exige un rescate y promete descifrar usando una llave RSA. Por que es computacionalmente necesario usar AES para el cifrado masivo en lugar de RSA? Explica la diferencia de rendimiento y por que la criptografía híbrida es la única opción práctica.

2. Si un atacante intercepta una conexión Diffie-Hellman y captura los valores públicos (g, p, A, B), por que no puede derivar la llave compartida? Identifica el problema matemático que lo protege y explica sus limitaciones prácticas si los parámetros son pequeños.

3. Una base de datos almacena contraseñas cifradas con AES. Cuando el usuario inicia sesión, el servidor descifra la contraseña almacenada y la compara con la ingresada. Identifica por que este diseño es inseguro aunque AES sea matemáticamente fuerte. Por que el hashing es mejor alternativa aun siendo matemáticamente más débil?

4. En el ataque Logjam, los investigadores degradaron conexiones TLS a Diffie-Hellman de 512 bits. Explica por que es posible forzar a dos partes a usar un cifrado más débil incluso cuando ambas soportan opciones fuertes. Que cambios en el protocolo previenen esto?

5. Dos imagenes BMP idénticas se cifran con AES en modo ECB. Aunque los píxeles individuales están cifrados, la imagen resultante aún muestra el contorno de la original. Explica por que ocurre y que modo de operación lo soluciona. Por que GCM es preferible a CBC en aplicaciones modernas?

6. En el handshake TLS, el servidor y el cliente acuerdan una llave simétrica usando ECDHE, y luego usan AES-GCM para el resto de la comunicación. Por que no usan simplemente RSA para todo el tráfico? Explica el problema de rendimiento y la diferencia de escalabilidad.

7. Una computadora cuantica con suficiente poder de cómputo podría romper RSA-2048 en horas usando el algoritmo de Shor. Por que AES-256 no estaria igualmente vulnerable a la misma máquina? Describe la diferencia entre los algoritmos de Shor y Grover y sus respectivos impactos en cifrado simétrico y asimétrico.

8. Una empresa implementa su propio sistema de cifrado combinando AES-256-CBC con SHA-256 para la integridad de los mensajes. Identifica al menos dos problemas de seguridad potenciales en esta implementación que un atacante podría explotar. Como se solucionan estos problemas en protocolos modernos?

---
