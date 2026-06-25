# Hashing, Cifrado y TLS

## Objetivo

Entender conceptos criptograficos prácticos sin perderse en matematica avanzada.

## Encoding

Encoding transforma datos para representarlos en otro formato.

Ejemplo:

- Base64.

Importante:

```text
Encoding no es seguridad.
```

Si algo está en Base64, normalmente se puede decodificar facilmente.

## Hashing

Un hash transforma datos en una huella de longitud fija.

Propiedades deseadas:

- Misma entrada produce mismo hash.
- Pequeño cambio cambia el hash.
- No debería poder revertirse facilmente.

Usos:

- Verificar integridad.
- Comparar archivos.
- Almacenar contraseñas de forma segura si se usa algoritmo adecuado.

Ejemplo:

```bash
sha256sum archivo.txt
```

## Hashing de Contraseñas

No se deben guardar contraseñas en texto plano.

Tampoco basta con SHA256 simple para contraseñas.

Se usan algoritmos diseñados para password hashing:

- Bcrypt.
- Scrypt.
- Argon2.
- PBKDF2.

Concepto importante:

- Salt: valor unico agregado para proteger contra tablas precomputadas.

## Cifrado Simetrico

Usa la misma llave para cifrar y descifrar.

Ejemplo:

- AES.

Reto:

- Cómo compartir la llave de forma segura?

## Cifrado Asimetrico

Usa par de llaves:

- Pública.
- Privada.

Lo cifrado para una llave pública se descifra con la privada correspondiente.

Usos:

- Intercambio de llaves.
- Firmas digitales.
- Certificados.

## Firmas Digitales

Permiten verificar:

- Autenticidad.
- Integridad.
- No repudio en ciertos contextos.

## TLS

TLS protege comunicaciones como HTTPS.

Ayuda con:

- Confidencialidad.
- Integridad.
- Autenticación del servidor.

Cuando visitas `https://`, el navegador valida un certificado y negocia una comunicación segura.

## Certificados

Un certificado vincula una identidad con una llave pública.

Incluye:

- Dominio.
- Emisor.
- Fechas de validez.
- Llave pública.
- Firma de autoridad certificadora.

## Errores Comunes

- Confundir hashing con cifrado.
- Guardar contraseñas en texto plano.
- Usar algoritmos obsoletos.
- Exponer llaves privadas.
- Ignorar errores de certificado.
- Guardar secretos en GitHub.

## Observación de Hashing

Un hash criptografico cambia completamente cuando cambia el contenido de entrada, aunque sea por un carácter. Esta propiedad ayuda a verificar integridad, detectar modificaciones y comparar artefactos sin guardar el contenido original.

Comando:

```bash
sha256sum archivo.txt
```

## Criterio de Dominio

Puedes avanzar cuando puedas:

- Diferenciar encoding, hashing y cifrado.
- Explicar salt.
- Explicar cifrado simetrico vs asimetrico.
- Explicar para que sirve TLS.
- Explicar por que no se suben llaves privadas.
