# Hashing y Passwords: La Licuadora Matemática

## Objetivo del Módulo

Desaprender un error gravísimo: **El Hashing NO es Cifrado.**
Cifrar algo (como vimos en el archivo anterior) significa que alguien tiene la llave para descifrarlo y leer el secreto original. 
El Hashing es magia de un solo sentido. Sirve para guardar contraseñas de forma que ni siquiera el dueño de la empresa pueda saber cuáles son.

---

## 1. La Analogía: La Licuadora Matemática

Imagina que tomas una manzana, un plátano y dos fresas. Los metes a una licuadora industrial y presionas el botón. El resultado es un batido (Jugo) de color rojo oscuro.

*   **Es Irreversible:** No importa qué tan inteligente seas, no puedes tomar ese jugo rojo, aplicar ingeniería inversa, separar los átomos y volver a construir la manzana original. Es físicamente imposible.

Eso es una función de **Hash (Ej. SHA-256)**.
Tomas un texto (Ej. `"Hola Mundo"`) y lo pasas por la función matemática SHA-256. El resultado será una cadena de texto basura que siempre tiene exactamente 64 caracteres de largo, sin importar si metiste la palabra "Hola" o si metiste la Enciclopedia Británica entera.

El Hash de la palabra "Hola" usando SHA-256 es:
`b221d9dbb083a7f33428d7c2a3c3198ae925614d70210e28716ccaa7cd4ddb79`

Si cambias UNA SOLA LETRA del texto original (Ej. "hola" con minúscula), el jugo resultante (el Hash) cambiará al 100%. Será irreconocible.

---

## 2. ¿Cómo se guardan las Contraseñas Reales? (El Error de Novato)

Si tú eres el programador de Facebook, y guardas la contraseña de Mark Zuckerberg en tu base de datos como Texto Plano (`Contraseña: Mark123`), eres un mal programador. Si un hacker ataca tu base de datos, roba todas las contraseñas de todos los usuarios.

**La Solución de la Industria:**
Facebook no guarda tu contraseña. **Facebook guarda el Jugo (El Hash).**
1. Cuando creas tu cuenta, escribes `MiPassword123`.
2. Facebook mete eso a la licuadora (SHA-256) y obtiene el Hash `A9F5...`
3. Facebook borra tu contraseña original para siempre, y guarda `A9F5...` en la base de datos.
4. Si un hacker roba la base de datos de Facebook, solo se roba millones de jugos licuados. El hacker no puede revertirlos a las contraseñas originales.

**¿Cómo inicias sesión si Facebook no sabe tu contraseña?**
Mañana regresas a Facebook y escribes `MiPassword123`. Facebook mete esa palabra a la misma licuadora. Como es la misma fruta, genera exactamente el mismo jugo (`A9F5...`). Facebook compara el jugo nuevo con el jugo que tiene guardado. Si son idénticos, te deja entrar.

---

## 3. El Ataque de Rainbow Tables (Tablas Arcoíris)

Los hackers se dieron cuenta de que revertir la licuadora es imposible. Así que inventaron las **Tablas Arcoíris**.

Un hacker compra una computadora gigante. Pone a la computadora a licuar millones de palabras comunes de diccionario (Ej. "123456", "admin", "password", "qwerty") y anota el Hash de cada una en un archivo de texto gigantesco (Una tabla arcoíris).

Cuando el hacker roba la base de datos de Facebook llena de Hashes, no necesita revertirlos. Simplemente compara los Hashes robados contra su Tabla Arcoíris pre-calculada. Si el Hash coincide con el Hash de la palabra "123456", el hacker acaba de adivinar la contraseña en 1 segundo.

### La Solución: La Sal (Salting)
Para destruir las Tablas Arcoíris del hacker, los defensores inventaron la **Sal (Salt)**.
Antes de meter tu contraseña a la licuadora, el servidor le añade texto aleatorio (Sal) a tu contraseña.

*   Contraseña original: `admin`
*   La Sal aleatoria de este usuario: `H7xL`
*   Lo que se mete a la licuadora: `adminH7xL`

El Hash resultante ahora es completamente único y diferente. La Tabla Arcoíris del hacker (que solo tenía el Hash de la palabra sola `admin`) ya no sirve para nada, porque el hacker tendría que volver a pre-calcular millones de palabras sumándoles la sal específica de tu usuario, lo cual tomaría 100 años.

---

## 4. Criterio de Dominio (Autoevaluación)

Revisa si puedes asegurar una base de datos de usuarios:

1. ¿Por qué es un error técnico grave decirle a tu jefe que "Vamos a encriptar las contraseñas de los usuarios en la base de datos usando AES de 256 bits"? ¿Cuál es el riesgo si el servidor es hackeado y cómo lo soluciona el Hashing?
2. Usando la analogía de la licuadora, explica por qué un Hash siempre tiene una longitud de texto fija (Ej. 64 caracteres), sin importar si "licuaste" un documento de texto de 1 Kilobyte o una película de 5 Gigabytes.
3. Un atacante se roba la base de datos de contraseñas de tu empresa. Las contraseñas están *Hasheadas* con SHA-256, pero el programador olvidó usar "Sal" (Salting). El atacante logra descifrar el 60% de las contraseñas en 5 minutos usando una técnica pre-calculada. ¿Cómo se llama el ataque que usó?
4. El término "Integridad de Archivos" se refiere a asegurar que un archivo descargado de internet no fue modificado por un virus. ¿Cómo se usa una función Hash para garantizar la integridad de un archivo `.exe` descargado?
