---
title: "Threat Intelligence (CTI): El Radar del SOC"
---
# Threat Intelligence (CTI): El Radar del SOC

## Objetivo de esta Guía

Aprender la diferencia entre recolectar millones de datos inservibles y generar Inteligencia de Amenazas (CTI) que realmente le sirva a una empresa para prevenir un ataque antes de que ocurra.

Si el Blue Team son los soldados en la trinchera y la Respuesta a Incidentes (IR) son los bomberos apagando el fuego, la Inteligencia de Amenazas **(Cyber Threat Intelligence)** son los agentes secretos infiltrados en el campo enemigo. Su trabajo es escuchar las comunicaciones, predecir por dónde atacará el enemigo y advertirle a los soldados para que preparen los escudos adecuados.

---

## 1. Datos vs Información vs Inteligencia

Para entender CTI, debes entender que los datos por sí solos no sirven de nada.

* **Dato Crudo:** "La Dirección IP 185.14.2.1 hizo conexión a nuestro servidor." (Es un número inútil).
* **Información:** "La IP 185.14.2.1 pertenece a un servidor en Rusia conocido por alojar malware." (Ya tiene contexto).
* **Inteligencia:** "El grupo criminal ruso 'APT28' está usando la IP 185.14.2.1 esta semana para lanzar Phishing masivo contra empresas del sector bancario usando correos falsos de DHL. Recomendamos bloquear esa IP en el Firewall hoy." (Tiene contexto, motivación y **una acción recomendada**).

El verdadero analista de CTI es el que escribe la tercera oración.

---

## 2. IOCs vs TTPs (La Pirámide del Dolor)

Cuando el equipo CTI analiza a un hacker, debe documentar sus armas. Hay dos formas de hacerlo:

### IOC (Indicator of Compromise) - "Las Balas"
Son evidencias forenses técnicas: 
* La Dirección IP del atacante.
* El Hash (firma matemática) del virus que usó.
* El nombre de dominio (`banco-falso-login.com`).
**El problema:** Son fáciles de cambiar. Si le bloqueas la IP al hacker, mañana comprará otra por $5 dólares y seguirá atacando.

### TTP (Tactics, Techniques, and Procedures) - "La Estrategia"
Es la forma de operar (el comportamiento) del hacker:
* *Táctica:* Robar credenciales.
* *Técnica:* Usar correos de Phishing haciéndose pasar por DHL los viernes a las 4:00 PM.
* *Procedimiento:* Cuando entra al servidor, siempre crea una tarea programada en Windows llamada "UpdateAgent" para no perder acceso.
**La ventaja:** Si le enseñas al Firewall a detectar y bloquear este "comportamiento" (TTP), no importa si el hacker cambia de IP o de virus mañana; su ataque fracasará porque su *estrategia* fue quemada. A esto se le conoce como la *Pirámide del Dolor de David Bianco*.

---

## 3. Integración con MITRE ATT&CK

El estándar mundial para hablar de CTI es **MITRE ATT&CK**.
Es una enorme enciclopedia gratuita mantenida por el gobierno estadounidense que documenta literalmente todas las tácticas (TTPs) que los hackers han usado en la historia registrada.

Un analista de CTI entra a la Dark Web, lee cómo un nuevo cartel de Ransomware está operando, mapea ese comportamiento con el diccionario de MITRE, y le envía un reporte al Blue Team diciendo: *"Asegúrense de tener reglas en el SIEM para detectar la Técnica T1110 (Fuerza Bruta), porque es la que están usando ahorita mismo."*

---

## Criterio de Dominio (Autoevaluación)

1. ¿Por qué enviar un Excel con 50,000 Direcciones IP maliciosas al gerente del Banco NO se considera "Cyber Threat Intelligence"?
2. Según la filosofía de la Pirámide del Dolor, ¿Por qué a un atacante le duele mucho más que le bloquees un "Procedimiento (TTP)" a que le bloquees una "Dirección IP (IOC)"?
3. Un grupo criminal (APT) suele enviar correos con archivos de Excel corruptos todos los meses. ¿Esto es un IOC o un TTP?
