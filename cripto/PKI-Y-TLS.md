# PKI y TLS: El Notario Público de Internet

## Objetivo del Módulo

Entender por qué puedes meter tu tarjeta de crédito con total confianza en `amazon.com`, sin temor a que un hacker ruso sentado en medio del cable de internet pueda leer los números de tu tarjeta, y más importante aún: ¿Cómo estás seguro de que esa página realmente es Amazon?

En el primer archivo aprendimos que el **Cifrado Asimétrico (Llave Pública / Llave Privada)** permite que dos extraños intercambien secretos. 
El gran problema del cifrado asimétrico es la **Suplantación de Identidad**. 
¿Qué pasa si un hacker ruso publica una Llave Pública en internet y dice *"Hola, soy el Banco Santander, usen esta llave pública para mandarme sus contraseñas"*?

Necesitamos un árbitro, un notario que certifique quién es quién. Necesitamos a PKI.

---

## 1. PKI y CA: El Notario y el Pasaporte

La **PKI (Infraestructura de Llave Pública)** es el sistema global de confianza del internet.

*   **La Analogía:** Cuando vas al aeropuerto internacional y dices "Soy Juan Pérez de México", el oficial de migración no te cree solo porque tú lo dices. Te pide tu **Pasaporte**.
*   El pasaporte tiene tu foto, y lo más importante: **Tiene el sello oficial y holográfico del Gobierno de México**.
*   El oficial de migración confía en el Gobierno de México. Como el Gobierno selló el documento, el oficial confía en ti automáticamente (Confianza Transitiva).

### La Autoridad Certificadora (CA)
En internet, los "Gobiernos" que emiten los pasaportes se llaman **Autoridades Certificadoras (CA - Certificate Authorities)**. Son empresas mundialmente confiables (como *DigiCert* o *Let's Encrypt*).
Los navegadores web (Chrome, Firefox, Safari) vienen de fábrica con los "sellos" de estas Autoridades ya instalados y aprobados.

**¿Cómo obtiene Amazon su pasaporte?**
1. Amazon fabrica su par de llaves (Pública y Privada).
2. Amazon va con el Notario (La Autoridad Certificadora) y le dice: *"Soy dueño de amazon.com, aquí está mi Llave Pública. Certifícala"*.
3. El Notario revisa los documentos legales de Amazon, verifica que realmente son los dueños de esa página web, y **le pone su sello oficial a la Llave Pública de Amazon**.
4. Este documento sellado se llama **Certificado Digital (Certificado SSL/TLS)**.

---

## 2. HTTPS y TLS: El Apretón de Manos (Handshake)

Cuando abres Chrome y escribes `https://amazon.com`, ocurre el **TLS Handshake (Apretón de manos)** en milisegundos:

1. **La Petición:** Chrome saluda al servidor de Amazon.
2. **El Pasaporte:** El servidor de Amazon le envía a Chrome su **Certificado Digital** (que incluye su Llave Pública y el sello del Notario).
3. **La Verificación:** Chrome revisa el sello. Como el sello es de una Autoridad Certificadora confiable, Chrome dice: *"Perfecto, sí eres Amazon"*. En ese momento, **aparece el Candadito Verde** junto a la URL.
4. **La Mezcla de Cifrados:** Ahora viene la magia. El Cifrado Asimétrico (El del Notario) es muy lento. No sirve para transmitir un video de Netflix de 4 Gigabytes. Así que Chrome genera una **Llave Secreta Simétrica (Caja Fuerte - Rápida)**, la mete en el Buzón Asimétrico de Amazon, la cierra con la Llave Pública del Certificado, y se la manda a Amazon.
5. **El Canal Seguro:** Amazon usa su Llave Privada para abrir el buzón y sacar la Llave Simétrica. Ahora ambos (Chrome y Amazon) tienen la misma Llave Rápida (AES). A partir de ese milisegundo, toda tu navegación, contraseñas y compras están encriptadas a la velocidad de la luz en un tubo blindado por donde el hacker ruso no puede mirar.

> **Resumen del Hacking:**
> TLS combina lo mejor de ambos mundos. Usa Cifrado Asimétrico (Pesado) solo al principio para verificar identidades y pasarse una llave de forma segura; y luego usa Cifrado Simétrico (Ligero) para encriptar la película que estás viendo.

---

## 3. Criterio de Dominio (Autoevaluación)

Revisa si entiendes la cadena de confianza mundial:

1. Estás navegando desde un cibercafé de un aeropuerto, el cual es administrado por un Hacker. Intentas entrar a tu Banco, pero el navegador Chrome muestra una pantalla roja gigante que dice: *"Warning: The Certificate is Invalid"*. Si ignoras la advertencia y das clic en "Continuar", ¿Qué ataque de Redes clásico (*que vimos en la Fase 3*) estás permitiendo que ocurra?
2. En la infraestructura PKI de internet, ¿Cuál es la función exacta de una Autoridad Certificadora (CA) usando la analogía del Gobierno que emite Pasaportes?
3. Para proteger el tráfico de una videollamada HD de 2 horas (5 Gigabytes de datos) entre tú y un servidor, ¿Por qué el protocolo TLS no usa Cifrado Asimétrico (RSA) para encriptar el video, y en su lugar solo lo usa al principio para intercambiar una llave Simétrica (AES)?
4. Si un hacker ruso logra vulnerar las computadoras centrales de una Autoridad Certificadora importante (Ej. DigiCert) y se roba su "Sello Maestro", ¿Por qué esto se considera el fin del mundo para la seguridad en internet, y qué podría hacer el hacker con ese sello?
