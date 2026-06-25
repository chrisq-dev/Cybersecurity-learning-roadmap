---
title: "Hardware Hacking: Destripando Circuitos"
---
# Hardware Hacking: Destripando Circuitos

## Objetivo de esta Guía

Bajar de la nube de software y ensuciarnos las manos con el cobre y el silicio.
El Hardware Hacking es el arte de vulnerar sistemas físicos interactuando directamente con sus componentes electrónicos, sus ondas de radio o sus memorias locales. Es donde la ciberseguridad se cruza con la ingeniería electrónica.

---

## 1. El Peligro del Acceso Físico

Existe una ley universal en ciberseguridad: **Si un atacante tiene acceso físico sin restricciones a tu computadora, ya no es tu computadora**.

Los desarrolladores asumen que los atacantes están a 5,000 kilómetros de distancia atacando por Wi-Fi. Pero, ¿Qué pasa si compraste una caja fuerte electrónica china, el atacante la desenrosca, le saca la placa verde (Motherboard), y conecta un cable directamente al chip de memoria para leer el PIN maestro? Las barreras de software caen cuando manipulas la electricidad.

---

## 2. Puertos Ocultos de Diagnóstico (UART y JTAG)

Cuando los ingenieros diseñan un Smart TV o un Router de internet, necesitan una forma de probarlo en la fábrica antes de venderlo. Para eso, dejan pequeños "puntos de soldadura" expuestos en la placa base llamados **Puertos de Diagnóstico (UART o JTAG)**.

*   **El Error:** Las fábricas casi nunca bloquean estos puertos antes de enviar el producto a la tienda.
*   **El Hack:** Un Hardware Hacker compra el router, lo desatornilla, conecta unos pequeños cables con pinzas (Jumpers) a esos puntitos de metal, y los conecta a su laptop mediante un adaptador USB (como el famoso *Bus Pirate* o un adaptador FTDI).

¡Magia! Al conectarse, la laptop del hacker recibe una terminal de Linux (`root@router:~#`) con acceso total al procesador del router. No tuvo que adivinar contraseñas web; simplemente entró por la "puerta trasera" que dejaron los ingenieros de fábrica.

---

## 3. Hackeando lo Invisible: Radiofrecuencia (SDR)

No todos los dispositivos usan Wi-Fi. Millones de aparatos usan ondas de radio simples: controles de garaje, llaves de automóviles modernos, sensores de temperatura de aviones, y timbres de casas.

Para hackearlos, usamos **SDR (Software Defined Radio - Radio Definida por Software)**.
Con una antena USB barata de $30 dólares (como el RTL-SDR) o equipos avanzados como el *HackRF One*, un atacante puede interceptar frecuencias de radio flotando en el aire.

### El Ataque de Repetición (Replay Attack)
Imagina que tú aprietas el botón de las llaves de tu auto para abrir la puerta. Tu llave envía un sonido (onda de radio) que dice `101010`.
El hacker, escondido detrás de un árbol con su antena SDR, "graba" ese sonido en su laptop.
A la noche, cuando estás durmiendo, el hacker va a tu auto y "reproduce" el mismo sonido `101010`. El auto escucha el sonido válido y abre las puertas de par en par.

> **Defensa (Rolling Codes):** Para evitar esto, los autos modernos usan códigos rodantes. Cada vez que presionas la llave, la contraseña cambia matemáticamente y el `101010` viejo queda invalidado para siempre. (Aunque incluso eso puede ser hackeado con herramientas como el *RollJam*).

---

## 4. RFID y Clonación de Tarjetas

¿Has usado una tarjeta plástica blanca para abrir la puerta de tu oficina o la habitación del hotel? Eso es tecnología **RFID** (Radio Frequency Identification).

La mayoría de los sistemas antiguos (como las tarjetas HID de 125 kHz) son increíblemente estúpidos. La tarjeta no tiene un microprocesador ni hace criptografía; simplemente tiene un número de identificación grabado a fuego y lo "grita" al aire apenas la acercas al lector.

**El Hack:**
El atacante esconde un lector-clonador poderoso en su mochila (como el famoso *Proxmark3* o un *Flipper Zero*). Se acerca a un empleado de la empresa en el tren, frota la mochila contra el bolsillo del empleado durante 1 segundo, y **copia** exactamente el número de tarjeta.
Al día siguiente, el atacante usa una tarjeta en blanco, le inyecta el número copiado, y entra al edificio del banco por la puerta principal, saludando al guardia de seguridad.

---

## Criterio de Dominio (Autoevaluación)

1. Estás auditando una cámara de seguridad física y has intentado hackearla por red (IP/HTTP) durante días sin éxito. Decides desatornillar la carcasa y mirar la placa verde. ¿Qué nombres reciben los pequeños puertos metálicos de prueba de fábrica que podrías buscar para conectarte directamente al procesador?
2. Explica brevemente cómo funciona un ataque de repetición (Replay Attack) usando SDR contra la puerta de un garaje antiguo.
3. ¿Por qué las tarjetas de acceso de oficina antiguas (RFID de baja frecuencia) son tan vulnerables a ser clonadas por alguien caminando muy cerca de ti en la calle?
