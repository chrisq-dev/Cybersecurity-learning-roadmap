---
title: "Reconocimiento y Enumeración: Midiendo el Muro"
---
# Reconocimiento y Enumeración: Midiendo el Muro

## Objetivo del Módulo

Aprender la habilidad más importante y menos valorada del Hacking: Cómo recopilar información de tu víctima sin que ella se dé cuenta.

El error de un hacker novato es lanzar un misil ciegamente contra la puerta del servidor esperando que se rompa. El hacker profesional pasa 3 semanas estudiando de qué material está hecha la puerta, a qué hora salen a comer los guardias, y quién es el arquitecto que la diseñó. A esto se le llama **Reconocimiento y Enumeración (Fases 1 y 2 de la Kill Chain)**.

---

## 1. La Analogía: Estudiando el Castillo

Imagina que te contratan para robar el Castillo del Rey.

*   **Reconocimiento Pasivo (OSINT):** Te sientas en una colina a 5 kilómetros de distancia con unos binoculares. Miras a los guardias cambiar de turno y anotas sus uniformes. Lees los diarios del pueblo para ver quién construyó el castillo. *En ningún momento tocaste las piedras del castillo. El Rey no sabe que existes.*
*   **Reconocimiento Activo (Enumeración):** Bajas de la colina de noche. Caminas hacia el castillo, tocas la puerta de madera con los nudillos para ver si suena hueca. Mueves las perillas de las ventanas para ver cuáles están sin seguro. *El Rey (El Firewall) sí puede escucharte si hace ruido.*

---

## 2. Reconocimiento Pasivo: El Arte del OSINT

**OSINT (Open-Source Intelligence)** significa Inteligencia de Fuentes Abiertas. Es el arte de hackear usando exclusivamente información pública en internet.

A los Red Teamers les encanta LinkedIn. Si el Banco te contrata para hackearlos, tu primer paso es buscar a los empleados de TI en LinkedIn.
*   Encuentras a "Juan", el Administrador de Sistemas.
*   En su perfil, Juan presume: *"Orgulloso de haber migrado los servidores del Banco a Windows Server 2019 usando la versión de IIS 10.0"*.

¡Bingo! Juan te acaba de regalar el mapa del castillo. Ahora sabes exactamente qué sistema operativo atacar sin haberle enviado ni un solo paquete de red a la IP del Banco. Tu ataque será silencioso, quirúrgico e indetectable.

---

## 3. Enumeración Activa: Tocando Puertas con Nmap

Una vez que sabes qué atacar, tienes que acercarte al castillo (La IP del servidor). Un servidor no es solo una "caja"; es un edificio con **65,535 puertas (Puertos)**.
*   El Puerto 80 es la puerta de cristal (La página web).
*   El Puerto 22 es la puerta trasera de acero (El acceso SSH para administradores).

Para descubrir cuáles de estas 65,535 puertas están abiertas sin seguro, los hackers usan la herramienta más legendaria del mundo: **Nmap (Network Mapper)**.

### El Escaneo Sigiloso (Stealth Scan)
Un comando clásico de Nmap se ve así: `nmap -sS -p- 10.0.0.5`
*   `-p-`: Le dice a Nmap que toque absolutamente las 65,535 puertas.
*   `-sS`: Le dice a Nmap que aplique el escaneo *Stealth* (Sigiloso).

**La Magia del Stealth Scan (TCP SYN):**
Nmap camina hacia el Puerto 22 y toca la puerta: *"Hola, ¿puedo entrar?"* (SYN).
El servidor, muy amable, responde: *"Sí, la puerta está abierta, pasa"* (SYN-ACK).
En lugar de entrar, Nmap le da la espalda y se va corriendo sin despedirse (RST).
Como Nmap nunca terminó de entrar por la puerta, el servidor no anota la visita en su cuaderno de visitas (El Log de Eventos). Nmap descubrió que la puerta estaba abierta, pero no dejó rastro.

---

## 4. Banners: Leyendo las Etiquetas

Una vez que Nmap descubre que la puerta 22 está abierta, necesitas saber qué guardia está del otro lado. A esto se le llama **Banner Grabbing**.

Si tocas la puerta y gritas *"¡Hola!"*, el programa del otro lado suele ser muy estúpido y responder educadamente: *"¡Hola! Soy OpenSSH versión 7.2"*.
En ese mismo segundo, tu escaneo termina. Tomas la versión "OpenSSH 7.2", vas a Google o a bases de datos de vulnerabilidades (Exploit-DB), descargas el código para destruir esa versión específica, y ganas acceso total al servidor.

> **Importante para el Blue Team (Hardening):**
> ¿Por qué tu servidor tiene que presentarse con su versión exacta a un extraño en internet? La primera regla del Defensor durante el Hardening es apagar los "Banners" en la configuración de sus servidores. Que el servidor responda *"Hola"* en lugar de *"Hola, soy Apache 2.4"*. Haz que el hacker trabaje a ciegas.

---

## 5. Criterio de Dominio (Autoevaluación)

Revisa si ya piensas de forma táctica:

1. Estás usando Nmap para escanear los puertos de una empresa, pero descubres que su Firewall bloquea todo tu tráfico. Decides cambiar de estrategia y buscas el nombre de dominio de la empresa en la base de datos de registros de internet (WHOIS) para ver quién es el dueño corporativo. ¿El WHOIS cuenta como Reconocimiento Activo o Pasivo? Justifica tu respuesta.
2. Encuentras un puerto abierto (`3306`) en el servidor, que normalmente pertenece a Bases de Datos MySQL. Decides lanzar un ataque de "Banner Grabbing" para confirmar la versión. Si el ataque es exitoso, ¿Qué fase de la Kill Chain acaba de completarse?
3. Sabiendo que el escaneo "Stealth" (SYN Scan) no completa la conexión con el servidor (interrumpe el apretón de manos a la mitad), ¿Por qué un administrador de sistemas novato que solo revisa los logs de aplicaciones (ej. el `/var/log/apache2/access.log`) nunca se enterará de que su servidor fue escaneado por Nmap?
4. Un cliente te contrata para un Penetration Test y te da la URL `empresa.com`. Usando OSINT, descubres un foro donde un empleado de la empresa accidentalmente pegó un bloque de código fuente de su servidor interno. Con este código, descubres una vulnerabilidad masiva sin siquiera escanear a la empresa. ¿Esto es trampa o es Hacking válido?
