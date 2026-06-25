---
title: "SSRF (Server-Side Request Forgery): Secuestrando al Mesero"
---
# SSRF (Server-Side Request Forgery): Secuestrando al Mesero

## Objetivo de esta Guía

Aprender cómo un atacante usa el propio servidor de la empresa como un Caballo de Troya para atacar bases de datos secretas a las que es imposible acceder desde el internet público.

A diferencia del CSRF (donde el atacante engaña a un *Usuario/Cliente*), en el **Server-Side Request Forgery (SSRF)** el atacante engaña al mismísimo *Servidor*. Convierte a la víctima (el servidor web) en su propio mercenario. Esta vulnerabilidad se volvió infame tras causar el histórico hackeo del banco Capital One, donde se robaron los datos de 100 millones de personas.

---

## 1. La Analogía: El Mesero Secuestrado

Volvamos a la analogía del Restaurante.

1. El Mesero (Servidor Web) tiene permiso de salir a la calle a atender a los clientes (Internet Público).
2. La Cocina y la Bóveda del dinero (Bases de Datos, Servidores de Pago, APIs de Amazon AWS) están detrás de una inmensa puerta de acero blindada (El Firewall). 
3. Si un delincuente en la calle intenta abrir la puerta blindada de la cocina, será bloqueado inmediatamente.
4. **Pero el Mesero tiene la llave de la puerta blindada**, porque su trabajo es entrar y salir todo el día con las órdenes.

### El Ataque SSRF:
El atacante en la calle no intenta forzar la puerta blindada. Simplemente llama al Mesero y le pone una pistola en la cabeza (o lo engaña). Le dice: *"Entra tú a la cocina, abre la bóveda, lee los números secretos del jefe, sal a la calle y dímelos en voz alta"*.

El Mesero entra a la cocina. Como trae el uniforme oficial, los guardias (Firewall) de la puerta lo dejan pasar sin sospechar nada. El mesero extrae el dinero y se lo lleva al delincuente en la calle.

---

## 2. El Ataque en el Código

¿Cómo "engañas" a un servidor web en la vida real?
Buscando funcionalidades en la página web que le pidan al servidor ir a leer información a otra parte (URLs externas).

Imagina que una página de foros tiene una función para subir fotos de perfil desde otras páginas. 
La URL normal se ve así:
`https://foro.com/descargar_imagen?url=http://imgur.com/foto.jpg`

El servidor (`foro.com`) recibe la petición, viaja a `imgur.com`, descarga la foto y te la muestra en pantalla.

**El Hacker manipula el parámetro:**
En lugar de poner la URL de Imgur, el hacker escribe la IP privada del servidor interno de bases de datos (Ej. `192.168.1.5`), un lugar que no existe en internet, sino adentro de la red del edificio de la empresa.

`https://foro.com/descargar_imagen?url=http://192.168.1.5/datos-secretos.txt`

El servidor web (El Mesero) es un robot sin sentido común. Va a la red interna, usa su privilegio de empleado para saltar el Firewall, descarga el archivo secreto y se lo escupe al hacker en la pantalla como si fuera una foto de perfil.

---

## 3. El AWS Cloud Metadata (El Santo Grial del SSRF)

Cuando una empresa aloja su página web en la Nube de Amazon (AWS), Amazon instala una "llave maestra invisible" en cada servidor. Esta llave vive en una IP mágica que todos los hackers del mundo se saben de memoria: **`169.254.169.254`**.

Si estás afuera en internet e intentas entrar a esa IP, no llegarás a ningún lado. Pero si obligas al servidor de la empresa (a través de un SSRF) a visitar esa IP interna:
`https://foro.com/descargar_imagen?url=http://169.254.169.254/latest/meta-data/`

El servidor de AWS responderá entregando todas las Credenciales Administrativas maestras de la Nube (IAM Keys). Con esas llaves, el atacante ahora es dueño absoluto de toda la cuenta de Amazon de la empresa, pudiendo borrar todos los servidores de un solo golpe.

---

## 4. La Defensa (El Blue Team)

Curar el SSRF es difícil porque las aplicaciones web *necesitan* conectarse con otras APIs de internet para funcionar. No puedes simplemente vendarle los ojos al servidor.

**La Regla de Oro: Listas Blancas (Whitelisting).**

En lugar de crear un filtro que prohíba que el servidor visite palabras como "192.168" o "localhost" (Blacklisting), el programador debe dictar explícitamente a dónde SÍ puede ir el servidor.

* *El Código Blindado:* "El mesero solo tiene permitido descargar imágenes desde `imgur.com` o `aws.com`. Si el cliente le pide ir a CUALQUIER otra URL del universo, el mesero debe abortar la operación y llamar a seguridad".

---

## 5. Criterio de Dominio (Autoevaluación)

Revisa si comprendes el poder del SSRF:

1. Estás auditando una página web y encuentras una funcionalidad para exportar un PDF. La URL es: `empresa.com/exportar?url=pagina_facturas.html`. ¿Por qué ese parámetro `url=` enciende todas las alarmas en tu cabeza como posible SSRF?
2. A diferencia del ataque XSS (que ataca el navegador del cliente) y del CSRF (que engaña la sesión del cliente), ¿quién es el actor tecnológico que físicamente realiza el trabajo sucio y rompe la red interna en un ataque SSRF?
3. Un desarrollador de AWS se entera de la magia de la IP `169.254.169.254` e implementa un filtro de seguridad en el backend: `if (url == "169.254.169.254") { bloquear; }`. ¿Por qué este filtro es fácil de evadir por un hacker? *(Pista: Existen decenas de formas de escribir o enmascarar una misma IP usando conversiones hexadecimales o redirecciones cortas).*
4. Durante una entrevista de trabajo para Defensor (Blue Team), te preguntan cuál es la arquitectura de red ideal para mitigar el impacto de un SSRF. ¿Por qué sugerirías "Segmentación de Red" en la cocina interna del servidor?
