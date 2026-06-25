---
title: "El Protocolo HTTP: El Mesero Sordo"
---
# El Protocolo HTTP: El Mesero Sordo

## Objetivo de esta Guía

Aprender el lenguaje en el que hablan los navegadores y los servidores.

Si el Frontend es el cliente y el Backend es el Cocinero, **HTTP (Hypertext Transfer Protocol)** es el Mesero. El mesero es el único que viaja a través del restaurante (Internet) llevando mensajes. Entender la anatomía de los mensajes que lleva el mesero te permitirá interceptarlos, modificarlos y hackear aplicaciones web con herramientas como *Burp Suite*.

---

## 1. La Naturaleza del Mesero (Stateless)

La regla más importante de HTTP es que es un protocolo "Stateless" (Sin Memoria).
Esto significa que el Mesero tiene **amnesia severa a corto plazo**.

1. Le pides al mesero una hamburguesa. El mesero va, pide la hamburguesa y te la trae.
2. Dos segundos después, le pides salsa de tomate.
3. El mesero te mirará confundido y te dirá: *"¿Salsa para qué? ¿Quién eres tú? No recuerdo haberte traído nada"*.

Para solucionar esto, los programadores inventaron las **Cookies**. Cada vez que inicias sesión, el mesero te pega un post-it (Cookie) en la frente que dice "Cliente Válido #845". De ahora en adelante, cada vez que le pidas algo al mesero, él leerá tu frente y dirá: *"Ah, tú eres el #845, aquí está tu salsa"*. 

> **El Ángulo Hacker (Robo de Sesión):**
> Si un hacker logra copiar tu post-it (tu Cookie de Sesión), puede pegárselo en su propia frente. El mesero ciego le llevará al hacker los datos de tu cuenta bancaria sin sospechar absolutamente nada.

---

## 2. Los Métodos: GET y POST

Cuando le entregas la nota al mesero (una Petición HTTP / Request), la nota tiene un "Verbo" en mayúsculas que indica la intención.

### GET (Tráeme)
Es el método más común. Solo sirve para **leer** o traer información. Cuando escribes `google.com` en tu navegador, tu Chrome le envía un `GET /` al servidor de Google pidiéndole que le envíe la página principal.
*   **La Peligrosidad:** En un método `GET`, cualquier información extra viaja **visiblemente en la URL** (ej. `banco.com/saldo?cuenta=juan`). Si mandas una contraseña por un método GET, quedará grabada para siempre en el historial de navegación de tu computadora y en los logs del servidor.

### POST (Toma esto y Guárdalo)
Sirve para **enviar** información sensible (como cuando te registras, compras algo o subes una foto).
*   **La Seguridad:** En un método `POST`, la información (ej. tu contraseña) no viaja expuesta en la URL. Viaja escondida dentro del "Cuerpo" (Body) de la carta, en un sobre cerrado. 

---

## 3. Los Códigos de Estado (Las Respuestas)

Cuando el mesero regresa de la cocina, siempre regresa con un número de 3 dígitos (Status Code). Es el resumen de lo que pasó allá atrás. Un profesional de seguridad los lee como matrix.

*   **200 (OK):** Todo salió perfecto. La página se cargó con éxito.
*   **301 / 302 (Redirección):** El mesero te dice *"El recurso se mudó, ve a esta otra mesa"*.
*   **400 (Errores del Cliente):** Tú (el navegador) arruinaste la orden.
    *   **401 (Unauthorized):** No tienes el post-it (Cookie) para ver esta página.
    *   **403 (Forbidden):** Tienes el post-it, sé quién eres, pero tu rol es muy bajo para entrar aquí.
    *   **404 (Not Found):** Me pediste un menú que no existe.
*   **500 (Errores del Servidor):** El Cocinero arruinó la orden.
    *   **500 (Internal Server Error):** El código del servidor acaba de fallar miserablemente. (Dato: A los hackers de Red Team les encanta provocar errores 500 para ver si el servidor escupe pistas en la pantalla).

---

## 4. Laboratorio Mental: El Ataque Intermediario (MitM)

Imagina que el mesero viaja por un pasillo oscuro (El internet público o un WiFi de cafetería) para llevarle la carta de tu contraseña al Cocinero.

Si el protocolo es HTTP (sin la S al final), la carta viaja **abierta**. Cualquier persona sentada en la cafetería con un sniffer de red (como Wireshark) puede leer tu contraseña en texto claro flotando por el aire.

**HTTPS (Hypertext Transfer Protocol Secure)** no cambia cómo funciona el restaurante. Simplemente obliga al mesero a meter tu carta en una **Caja Fuerte Encriptada con Candado Criptográfico (TLS/SSL)** antes de cruzar el pasillo oscuro. Si el hacker intercepta al mesero, solo verá una caja de metal cerrada sin sentido matemático.

---

## 5. Criterio de Dominio (Autoevaluación)

¿Puedes leer la red?

1. Te piden diseñar un formulario para que los empleados envíen sus datos de recursos humanos (Salarios y Seguro Social). El desarrollador junior lo programó usando el método `GET`. ¿Por qué debes rechazar su código inmediatamente por motivos de seguridad?
2. Un atacante intenta visitar la ruta secreta `servidor.com/admin_panel`. El mesero HTTP regresa con un código `403`. ¿Qué deduces de la posición o el estatus del atacante en el sistema en ese momento?
3. Sabiendo que HTTP tiene "amnesia" (es Stateless), si un hacker logra robar el archivo donde están guardadas tus credenciales cifradas, pero NO logra robar tu Cookie de sesión (el post-it) activa de hoy. ¿Puede el hacker entrar a tu cuenta bancaria directamente pegando la contraseña robada en la URL?
4. Estás analizando el tráfico de una aplicación móvil de un Banco. Notas que todas las peticiones a `api.banco.com` viajan por el puerto 80 (HTTP) en lugar del puerto 443 (HTTPS). ¿Por qué eso es una vulnerabilidad crítica (Severidad Alta) aunque los datos viajen por método POST?
