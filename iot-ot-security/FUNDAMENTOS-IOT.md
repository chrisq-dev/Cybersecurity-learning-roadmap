---
title: "Fundamentos IoT: Cuando tu Nevera es Hackeada"
---
# Fundamentos IoT: Cuando tu Nevera es Hackeada

## Objetivo de esta Guía

Entender por qué el ecosistema del "Internet de las Cosas" (IoT) es, literalmente, el salvaje oeste de la ciberseguridad. 
Descubrirás cómo dispositivos aparentemente inofensivos pueden ser convertidos en armas de destrucción digital masiva.

---

## 1. ¿Qué es el IoT?

El **Internet of Things (IoT)** se refiere a agregar conexión Wi-Fi o Bluetooth a objetos cotidianos que tradicionalmente no tenían internet.
*   Focos inteligentes (Philips Hue).
*   Cámaras de seguridad de bebés.
*   Neveras, aspiradoras y termostatos.
*   Dispositivos médicos (Marcapasos).

### El Problema de Negocio
Los fabricantes de estos dispositivos (como fábricas genéricas en Asia) tienen un solo objetivo: **Vender barato y vender rápido**.
Contratar a un experto en ciberseguridad para asegurar el software de una bombilla inteligente de $5 dólares arruinaría su margen de ganancia. Por lo tanto, sacan productos al mercado con seguridad inexistente.

---

## 2. Los Pecados Capitales del IoT

Si analizas una cámara IP barata comprada por internet, casi siempre encontrarás estos 3 errores mortales:

### A. Contraseñas por Defecto Incrustadas (Hardcoded)
Para que el usuario no batalle al instalarla, el fabricante le pone la misma contraseña a todas las cámaras del mundo. Ej: `Usuario: admin`, `Contraseña: admin`.
Lo peor: a veces el fabricante deja una cuenta oculta de mantenimiento en el sistema que el usuario final no puede borrar ni cambiar.

### B. Falta de Cifrado (Clear Text)
Para ahorrar batería y poder de procesamiento (CPU), los dispositivos IoT rara vez cifran sus datos. Si el dispositivo envía el video de tu casa hacia la nube del fabricante, suele hacerlo en texto plano (HTTP). Cualquiera en la misma red Wi-Fi puede interceptar el video.

### C. Imposibilidad de Actualización (No-Patch)
Si mañana descubrimos una vulnerabilidad crítica en Windows, Microsoft manda una actualización y tu laptop se arregla sola.
Si mañana descubrimos una vulnerabilidad en tu termostato inteligente... se quedará vulnerable para siempre. El fabricante no tiene infraestructura para actualizar el termostato por internet de forma segura (y muchas veces el hardware es tan viejo que no soporta nuevo código).

---

## 3. El Caso de Estudio: La Botnet Mirai (2016)

La historia más famosa del IoT demuestra cómo tu cámara web puede tirar el internet de un país.

En 2016, un joven creó un virus llamado **Mirai**. En lugar de atacar computadoras potentes, Mirai escaneaba internet buscando exclusivamente cámaras IP, impresoras y routers caseros.
Cuando encontraba uno, intentaba iniciar sesión usando las 60 contraseñas por defecto más comunes del mundo (`admin/admin`, `root/1234`).
Como millones de personas nunca cambian la contraseña de su router, Mirai infectó **300,000 dispositivos en unas pocas horas**.

En lugar de robar datos (una cámara no tiene datos valiosos), Mirai **zombificó** a los dispositivos, creando una "Botnet" (Red de robots).
El creador le dio una orden a su ejército de 300,000 neveras y cámaras: *"Envíen tráfico basura a Dyn (El proveedor de DNS más grande de EE. UU.) al mismo tiempo"*.

**El resultado:** El ataque de Denegación de Servicio (DDoS) fue tan masivo que apagó a Netflix, Twitter, Reddit y Spotify en toda la costa este de los Estados Unidos durante horas. Todo usando cámaras de bebés.

---

## Criterio de Dominio (Autoevaluación)

1. Vas a comprar una cámara de seguridad para tu casa por $10 dólares en una tienda genérica. Basado en los pecados del IoT, ¿Qué es lo primero y más importante que debes cambiar apenas la conectes a la corriente?
2. Explica por qué a un fabricante de tecnología IoT barata no le interesa financieramente diseñar un sistema de actualizaciones remotas automáticas (OTA Updates).
3. ¿Qué es una Botnet y por qué los hackers prefieren infectar 100,000 dispositivos IoT lentos en lugar de 10,000 computadoras potentes?
