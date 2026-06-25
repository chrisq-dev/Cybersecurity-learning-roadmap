---
title: "OWASP Mobile Top 10 y Frida"
---
# OWASP Mobile Top 10 y Frida

## Objetivo de esta Guía

Entender las fallas de seguridad más catastróficas que ocurren al programar para móviles y descubrir el arma definitiva del Pentester Móvil: La instrumentación dinámica.

Al igual que en las páginas web, la organización OWASP tiene un estándar global para aplicaciones móviles.

---

## 1. El OWASP Mobile Top 10 (Los Errores Capitales)

De las 10 vulnerabilidades, estas son las tres que todo profesional debe conocer a la perfección:

### M1: Uso Inadecuado de Credenciales / Hardcoding
(Como vimos en la guía de Ingeniería Inversa). Dejar llaves secretas incrustadas en el código fuente.

### M2: Almacenamiento Inseguro de Datos
Este es el error móvil más común del mundo.
Un desarrollador guarda el usuario y la contraseña del cliente para que no tenga que escribirla cada vez que abre la app. En lugar de usar el Almacenamiento Seguro del sistema operativo (El "Keychain" en iOS o el "Keystore" en Android), el desarrollador guarda la contraseña en un archivo de texto simple o en una base de datos local SQLite (`misdatos.db`).

Si a la víctima le roban físicamente el celular, o si descarga un malware, el atacante simplemente lee ese archivo SQLite y roba la contraseña del banco en texto claro.

### M3: Comunicación Insegura (La Intercepción)
Cuando la App Móvil se comunica con los servidores del Banco a través del Wi-Fi de un Starbucks, la comunicación debe estar fuertemente cifrada (HTTPS/SSL).
Si la aplicación no obliga a usar cifrado, el atacante sentado en la mesa de al lado puede hacer un ataque *Man-in-the-Middle (MitM)* y capturar todas las transacciones financieras flotando en el aire.

---

## 2. La Defensa del Banco: El "Pinning" (Anclaje)

Para evitar que los atacantes de cafeterías lean el tráfico Wi-Fi, los bancos implementaron el **SSL Pinning**.
Esto es una regla extrema de paranoia codificada en la app del banco que dice:
*"No me importa lo que diga el celular. Solo, absoluta y únicamente, voy a confiar si el servidor al que me conecto tiene el Certificado de Seguridad oficial de mi Banco. Si detecto cualquier otro certificado intermediario (como el de un hacker), cerraré la conexión inmediatamente y mostraré un error"*.

El SSL Pinning hace casi imposible para los Pentesters interceptar el tráfico para buscar vulnerabilidades. ¿Cómo hace el equipo de ciberseguridad (Red Team) para hackear su propia app entonces?

---

## 3. El Arma Secreta: FRIDA (Instrumentación Dinámica)

Cuando la Ingeniería Inversa y los Proxys de red fallan porque la aplicación está demasiado ofuscada y tiene SSL Pinning, entra **Frida**.

Frida es un framework de instrumentación dinámica, y es el estándar de oro del Mobile Pentesting.
*   **¿Qué hace?** En lugar de descompilar el código muerto de la app, Frida inyecta código de JavaScript **directamente en la memoria RAM del celular mientras la aplicación se está ejecutando**.

### El Salto de la Matrix
Imagínate esto: Abres la app del banco. La app ejecuta su función `checkSSLPinning()` para ver si el hacker la está interceptando. La función arroja `True` (hay un hacker) y la app se va a cerrar.
En esa micro-fracción de segundo en la Memoria RAM, Frida intercepta la función y **fuerza al sistema a cambiar el resultado de `True` a `False`**. 

La aplicación queda hipnotizada, asume que no hay ningún hacker interceptando y envía todas las contraseñas al atacante felizmente.

Con Frida, los pentesters pueden:
*   Destruir la protección SSL Pinning en tiempo real.
*   Saltarse los avisos de "Celular Rooteado/Jailbreakeado" (`Root Detection Bypass`).
*   Robar variables de memoria antes de que se cifren.

---

## Criterio de Dominio (Autoevaluación)

1. Un banco guarda las contraseñas de sesión de los clientes en un archivo local SQLite dentro de la memoria interna del celular "porque el usuario no tiene acceso a esa carpeta". Explica por qué esto viola el principio OWASP M2 y cómo un malware podría acceder a esa base de datos.
2. ¿Qué es el SSL Pinning y por qué es una pesadilla para los atacantes (o pentesters) que intentan hacer un ataque de intermediario (Man-in-the-Middle) en una red Wi-Fi pública?
3. En tus propias palabras, ¿Por qué la herramienta `Frida` se considera instrumentación "dinámica" en contraste con el uso de herramientas como `Jadx` (que es análisis "estático")?
