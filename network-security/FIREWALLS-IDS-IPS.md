---
title: "Firewalls, IDS e IPS: Los Guardias del Castillo"
---
# Firewalls, IDS e IPS: Los Guardias del Castillo

## Objetivo de esta Guía

Aprender la diferencia exacta entre las tres grandes piezas de hardware y software que protegen el perímetro de una empresa.

Si conectas un servidor directamente al internet público, durará exactamente 5 minutos antes de ser hackeado por robots escáneres en Rusia o China. Para evitarlo, construimos un "Castillo" (La red corporativa) y ponemos a tres tipos de guardias en la puerta principal.

---

## 1. El Firewall (Cortafuegos): El Guardia de la Puerta

*   **La Analogía:** Es un guardia de seguridad enorme, pero muy poco inteligente. Está parado en la puerta del castillo con una lista de invitados escrita en un papel (Políticas).

Su trabajo es leer la dirección de origen, la dirección de destino y el puerto (Conceptos que vimos en la Fase 2 de Redes).
*   *"¿Vienes de internet (Cualquier IP) y quieres entrar al Puerto 80 (La página web)? La lista dice que sí puedes pasar. Adelante."*
*   *"¿Vienes de internet y quieres entrar al Puerto 22 (SSH / Terminal de comandos)? La lista dice que está Prohibido. Rechazado."*

**La Debilidad del Firewall:**
El Firewall tradicional **no revisa qué traes adentro de la mochila**.
Si un Hacker se disfraza de visitante normal y pide entrar por el Puerto 80 (La página web), el Firewall lo dejará pasar. Una vez adentro, el hacker saca una inyección SQL de su mochila y destruye el servidor. El Firewall falló porque la Inyección SQL viajó escondida dentro de tráfico web legítimo (Puerto 80).

---

## 2. IDS (Intrusion Detection System): El Perro que Ladra

Como el Firewall es ciego al contenido, necesitamos algo más inteligente detrás de él.

*   **La Analogía:** Es un Perro Rastreador entrenado. 
El IDS se sienta adentro del castillo y huele a las personas que el Firewall dejó pasar. Examina el interior de los paquetes de datos buscando Firmas de Virus (YARA) o comportamientos anómalos.

**La Regla de Oro del IDS:**
La letra "D" significa *Detection*. El IDS **SOLO LADRA, NO MUERDE**.
Si el perro huele la Inyección SQL, empieza a ladrar (Envía una Alerta Roja al SIEM para que el Analista del *Blue Team* la vea en su pantalla). 
Pero el IDS **no** detiene al hacker. El hacker sigue caminando, inyecta el código, y el servidor explota mientras la alarma suena.

*¿Por qué querríamos un guardia que solo avisa y no actúa?*
Para evitar Falsos Positivos. Si el perro se equivoca y muerde al CEO de la empresa, es un desastre corporativo.

---

## 3. IPS (Intrusion Prevention System): El Perro que Muerde

El siguiente nivel de evolución es el IPS.

*   **La Analogía:** Es un Perro Rastreador y de Ataque.
La letra "P" significa *Prevention*. Este sistema se coloca directamente *en medio* del pasillo (In-line). Si huele la Inyección SQL, ladra (Envía la alerta al SIEM) y **muerde al atacante inmediatamente**, bloqueando su conexión a internet (Tirando el paquete).

El servidor web se salva automáticamente sin intervención humana.

**El Riesgo del IPS (Tuning):**
Como vimos en la fase del *Detection Engineering*, configurar un IPS en modo "Prevenir/Bloquear" es peligrosísimo. Si configuras mal la regla, el IPS puede detectar el tráfico legítimo de los clientes del banco como "tráfico malicioso" y bloquearlos a todos. Acabas de crear un ataque de Denegación de Servicio (DoS) contra tu propia empresa.

---

## 4. NGFW (Next-Generation Firewall)

Hoy en día, las corporaciones no compran estas tres cosas por separado. Compran un **NGFW (Firewall de Próxima Generación)** de marcas como *Palo Alto*, *Fortinet* o *Cisco*.

Un NGFW es una caja de metal millonaria que incluye:
1. El Guardia de la Lista (Firewall de Puertos).
2. El Perro que Muerde (IPS).
3. Desencriptación TLS (Para ver qué traes en la mochila, incluso si usas HTTPS).

---

## 5. Criterio de Dominio (Autoevaluación)

Revisa si puedes diseñar un perímetro defensivo:

1. Un Analista Junior instala un sistema *Snort* (un motor de red de código abierto) y lo configura estrictamente en modo **IDS**. Durante la madrugada, un atacante envía un *Exploit* conocido y logra tomar control del servidor web. Al día siguiente, el Analista Junior se queja de que "el sistema falló porque no detuvo el ataque". ¿Cuál es el error fundamental en la queja del Analista?
2. Usando la teoría de puertos TCP/IP, ¿Qué instrucción le darías al Guardia (Firewall) para proteger la Base de Datos (Puerto 3306) de ataques externos, pero permitiendo que el Servidor Web interno sí pueda hablar con la Base de Datos?
3. ¿Por qué instalar un IPS (Intrusion Prevention System) sin haber pasado por una fase previa de "Afinación de Reglas" (Tuning) y eliminación de Falsos Positivos, es la forma más rápida de ser despedido por causar la caída de toda la producción de la empresa?
4. El tráfico cifrado de internet (HTTPS/TLS) impide que cualquier intermediario lea el contenido del paquete. Siendo así, ¿Cómo puede un IPS moderno (NGFW) lograr detectar un virus que viaja escondido dentro de un paquete HTTPS totalmente encriptado?
