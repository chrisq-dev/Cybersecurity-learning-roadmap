---
title: "CSRF (Cross-Site Request Forgery): Falsificando Firmas"
---
# CSRF (Cross-Site Request Forgery): Falsificando Firmas

## Objetivo de esta Guía

Aprender cómo un atacante puede obligar a un usuario legítimo a ejecutar acciones destructivas en su propia cuenta, sin que el usuario se dé cuenta y sin robarle la contraseña.

El **Cross-Site Request Forgery (CSRF)**, o Falsificación de Petición en Sitios Cruzados, es un ataque de engaño puro. Juega con la confianza ciega que un navegador (como Chrome) le tiene a las cookies de sesión (el post-it del mesero) cuando el usuario visita páginas de terceros.

---

## 1. La Analogía: El Cheque con Firma Falsificada

Imagina que eres el Director de una empresa. Vas al Banco, te identificas con el Cajero (Inicias sesión) y te quedas en la sala de espera leyendo una revista. El Cajero ya sabe que eres tú y confía en cualquier papel que le entregues en los próximos 15 minutos.

1. Mientras estás en la sala de espera del banco, un extraño se te acerca y te dice: *"Oye, mira esta foto de un gatito"*. 
2. Te entrega una hoja de papel doblada. En la portada tiene la foto del gatito, pero por detrás (la parte que tú no ves), hay una orden de transferencia bancaria hacia la cuenta del extraño.
3. Tú, sin saberlo, caminas hacia el Cajero y le entregas la hoja de papel doblada.
4. El Cajero te mira, confirma tu identidad (porque ya estabas validado en la sala), desdobla la hoja, lee la orden de transferencia y ejecuta la transacción.

Acabas de robarte a ti mismo, y el extraño nunca tuvo que saber tu contraseña. Solo necesitó que tú entregaras el papel por él.

---

## 2. El Ataque CSRF en la Web

En la web, el Banco es `banco.com`, y la foto del gatito es una página trampa creada por el hacker (`gatos-graciosos.com`).

1. Entras a `banco.com` y pones tu contraseña. El banco te da tu Cookie de sesión.
2. Sin cerrar la pestaña del banco, abres otra pestaña y entras a `gatos-graciosos.com`.
3. La página de los gatos tiene un código HTML invisible que le dice a tu navegador: *"Oye Chrome, manda una petición POST a banco.com/transferir con el monto de $1,000"*.
4. **El error de diseño de la Web:** Por defecto, los navegadores antiguos decían: *"Ah, me están pidiendo ir a banco.com. Dejame buscar la Cookie (El post-it) que tengo guardada para el banco y pegársela a esta petición automáticamente"*.
5. El servidor del banco recibe la petición, ve que trae tu Cookie válida, y transfiere el dinero.

El hacker "forjó" (falsificó) la petición desde un "sitio cruzado" (Cross-Site).

---

## 3. La Defensa (El Blue Team)

¿Cómo evita el Banco que un extraño falsifique cheques a tu nombre? Obligándote a usar una pluma de tinta invisible que cambia de color cada 5 minutos.

En el desarrollo web, esto se llama el **Token Anti-CSRF**.

Cuando inicias sesión en el banco de forma legítima, el servidor (El Cocinero) no solo te da tu Cookie. También genera un código matemático larguísimo y aleatorio (El Token), y lo esconde dentro de todos los formularios de transferencias de la página oficial del banco.

Cuando el hacker intenta hacer el ataque desde `gatos-graciosos.com`, el hacker no sabe cuál es tu Token secreto de este segundo. Su petición falsa llegará al banco sin el Token. El servidor del banco verá la Cookie correcta, pero al ver que falta el Token matemático dirá: *"Rechazado. Esta orden no se generó dentro de nuestro edificio"*.

> **Importante (El Atacante Llora):**
> Hoy en día, casi todos los lenguajes de Backend modernos (Laravel, Django, Spring) incluyen protección Anti-CSRF encendida por defecto. Además, los navegadores modernos actualizaron sus políticas (el famoso atributo `SameSite` en las Cookies) para dejar de enviar Cookies automáticamente a páginas cruzadas. Encontrar un CSRF puro hoy en día es raro, pero cuando ocurre, es devastador.

---

## 4. Criterio de Dominio (Autoevaluación)

Revisa si puedes detectar la falsificación:

1. Estás auditando una página web antigua de un Hospital. Descubres que para cambiar la dirección de correo electrónico de un paciente, el sistema usa un método `GET` como este: `hospital.com/cambiar_correo?nuevo=hacker@mal.com`. ¿Por qué esto hace que un ataque CSRF sea ridículamente fácil de ejecutar con solo enviarle una imagen por WhatsApp a la víctima?
2. A diferencia del ataque XSS (donde el hacker ejecuta código JavaScript en tu máquina para leer tu información), en un ataque CSRF, ¿el atacante alguna vez llega a *leer* tu contraseña o los datos de tu cuenta bancaria?
3. Un programador añade un Token Anti-CSRF a su página web, pero decide usar un Token fijo (Ejemplo: `Token=123456`) que nunca cambia para ningún usuario del sistema. ¿Por qué esto arruina completamente el propósito de la defensa?
4. Estás programando en Node.js y decides configurar la Cookie de sesión de tus usuarios con la bandera de seguridad `SameSite=Strict`. ¿Cómo afecta esta pequeña línea de código a la viabilidad técnica de un ataque CSRF?
