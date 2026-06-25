---
title: "Fundamentos de Wi-Fi: El Megáfono Invisible"
---
# Fundamentos de Wi-Fi: El Megáfono Invisible

## Objetivo de esta Guía

Aprender por qué la comodidad del internet inalámbrico es el sueño hecho realidad de cualquier hacker con $20 dólares.

Anteriormente (Redes), aprendimos que para hackearte, el atacante tenía que conectarse físicamente a tu Switch con un cable. 
Con la invención del Wi-Fi (Radiofrecuencia 802.11), la humanidad quitó el cable y empezó a gritar sus datos al aire.

---

## 1. La Física del Wi-Fi (El Megáfono)

* **La Analogía:** 
 * **Internet por Cable (Ethernet):** Es como susurrarle al oído a tu módem a través de un tubo de PVC cerrado. Es físicamente imposible que un vecino te escuche.
 * **Internet Wi-Fi:** Es como salir al balcón y usar un **Megáfono** para gritarle tu contraseña a tu módem. El problema es que las ondas de radio atraviesan paredes. El vecino de al lado no necesita hackear tu módem, solo necesita abrir la ventana, prender su propia antena (Sniffing) y "escuchar" los gritos invisibles de tu computadora.

### La Evolución de las Contraseñas (WPA)
Como gritar con un megáfono es peligroso, la industria inventó el cifrado inalámbrico. Tu computadora sigue gritando, pero grita en "código secreto" (Criptografía).
* **WEP / WPA1:** Obsoletos. Si el vecino intercepta los gritos, una computadora moderna puede descifrar el código en menos de 5 minutos.
* **WPA2:** El estándar actual. Bastante fuerte, pero vulnerable si la contraseña de la casa es muy débil y el atacante intercepta el saludo inicial (El *Handshake*).
* **WPA3:** La armadura moderna. Usa un algoritmo tan potente (SAE) que el hacker no puede descifrar la contraseña incluso si graba tus transmisiones durante años.

---

## 2. El Gemelo Malvado (Evil Twin)

Incluso con WPA3, existe un ataque que no requiere matemáticas complejas, solo manipulación humana.

* **La Trampa:** Llegas a una cafetería famosa. Abres tu celular y buscas la red de la cafetería.
* **La Configuración:** El hacker está sentado en la esquina tomando un café. Sacó un módem portátil de su mochila y le puso exactamente el mismo nombre: `Starbucks_Gratis`. Y le puso una señal de antena más potente que la del módem real del techo.
* **El Ataque (Evil Twin):** Los celulares están programados para conectarse automáticamente a las redes conocidas que tengan "mejor señal". Tu celular ignora el módem del techo y se conecta directamente a la mochila del hacker (El Gemelo Malvado).
* **El Resultado:** El hacker te da internet real para que no sospeches, pero se convierte en un "Hombre en el Medio" (Man-In-The-Middle). A partir de ese momento, cada página que abres y cada mensaje que mandas, pasa primero por la computadora del hacker antes de ir al internet público. 

---

## 3. Criterio de Dominio (Autoevaluación)

Revisa si puedes mantener la cordura en el aire:

1. Un hacker estaciona su auto afuera de un edificio de oficinas corporativo e intenta robar las credenciales de red capturando el tráfico Wi-Fi en el aire (Sniffing). Sabiendo que la empresa usa el protocolo antiguo **WEP**, ¿Por qué el hacker tendrá éxito garantizado en un par de minutos, independientemente de lo larga que sea la contraseña?
2. Usando la analogía del "Megáfono", explica la diferencia de riesgo físico y de superficie de ataque entre conectar una computadora de Finanzas directamente por un Cable Ethernet versus conectarla a la red Wi-Fi de la empresa.
3. El ataque del "Gemelo Malvado" (Evil Twin) es devastador en aeropuertos y hoteles. Si la víctima ya cayó en la trampa y su celular está conectado a la mochila del hacker, ¿Por qué el uso exclusivo de páginas web con **HTTPS** (Cifrado en Tránsito) es la única defensa técnica que protegerá la contraseña del usuario de ser robada por el hacker?
4. El nuevo protocolo **WPA3** es el salvador moderno de las redes inalámbricas. ¿Cuál es el cambio arquitectónico principal que hace WPA3 para volver obsoletos los ataques tradicionales de "fuerza bruta" (Dictionary Attacks) contra las contraseñas del Wi-Fi?
