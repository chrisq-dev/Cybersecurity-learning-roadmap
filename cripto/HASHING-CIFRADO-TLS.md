# Hashing, Cifrado y TLS

## Objetivo

Entender conceptos criptograficos practicos sin perderse en matematica avanzada.

## Encoding

Encoding transforma datos para representarlos en otro formato.

Ejemplo:

- Base64.

Importante:

```text
Encoding no es seguridad.
```

Si algo esta en Base64, normalmente se puede decodificar facilmente.

## Hashing

Un hash transforma datos en una huella de longitud fija.

Propiedades deseadas:

- Misma entrada produce mismo hash.
- Pequeño cambio cambia el hash.
- No deberia poder revertirse facilmente.

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

- bcrypt.
- scrypt.
- Argon2.
- PBKDF2.

Concepto importante:

- Salt: valor unico agregado para proteger contra tablas precomputadas.

## Cifrado Simetrico

Usa la misma llave para cifrar y descifrar.

Ejemplo:

- AES.

Reto:

- Como compartir la llave de forma segura?

## Cifrado Asimetrico

Usa par de llaves:

- Publica.
- Privada.

Lo cifrado para una llave publica se descifra con la privada correspondiente.

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
- Autenticacion del servidor.

Cuando visitas `https://`, el navegador valida un certificado y negocia una comunicacion segura.

## Certificados

Un certificado vincula una identidad con una llave publica.

Incluye:

- Dominio.
- Emisor.
- Fechas de validez.
- Llave publica.
- Firma de autoridad certificadora.

## Errores Comunes

- Confundir hashing con cifrado.
- Guardar contraseñas en texto plano.
- Usar algoritmos obsoletos.
- Exponer llaves privadas.
- Ignorar errores de certificado.
- Guardar secretos en GitHub.

## Practica

1. Crea un archivo.
2. Calcula SHA256.
3. Modifica una letra.
4. Calcula SHA256 otra vez.
5. Explica por que cambio.

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
