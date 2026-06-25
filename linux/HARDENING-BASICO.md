---
title: "Hardening Básico: Blindando el Castillo"
tiempo_estimado: "5 min"
minutos_lectura: 5
secciones: 6
---
# Hardening Básico: Blindando el Castillo

## Objetivo del Módulo

Entender qué es el "Hardening" y cómo transformar un servidor Linux recién instalado (que es como una casa con las puertas abiertas) en una fortaleza corporativa paranoica.

Instalar Linux es fácil. Hacer que sobreviva 5 minutos expuesto directamente a Internet es el verdadero reto. El **Hardening (Endurecimiento)** no es un software que instalas; es una mentalidad. Es el proceso sistemático de reducir la "Superficie de Ataque" apagando, borrando y bloqueando absolutamente todo lo que no sea estrictamente necesario para que el servidor funcione. 

---

## 1. La Analogía: El Castillo Medieval

Un servidor Linux recién encendido de fábrica viene con muchas comodidades activadas para facilitarte la vida. 
Es un castillo con el puente levadizo abajo, los comerciantes entrando y saliendo, y puertas traseras sin candado para que el jardinero pueda entrar a trabajar cómodo.

Hacer *Hardening* significa:
1.  **Subir el puente levadizo:** Nadie entra a menos que tenga una identificación militar.
2.  **Sellar las puertas traseras:** Solo hay una entrada principal, fuertemente vigilada.
3.  **Desarmar a los visitantes:** Nadie camina por el castillo con una espada desenfundada.

Si el servidor solo fue contratado para mostrar una Página Web, su **único trabajo** es servir tráfico web por el Puerto 443 (HTTPS). Cualquier otra cosa (como un servidor de correos pre-instalado, o un puerto de base de datos expuesto al exterior) es un riesgo inaceptable y debe ser destruido.

---

## 2. SSH (Secure Shell): La Entrada Principal

SSH es el protocolo que usas para administrar tu servidor desde tu casa sin tener que conectar un monitor físico al servidor en el centro de datos. Todo el mundo usa SSH en el Puerto 22.

> **El Ángulo Hacker (Fuerza Bruta):**
> En el segundo exacto en que enciendes un servidor en la Nube (AWS, DigitalOcean), miles de bots automatizados rusos y chinos empezarán a bombardear tu Puerto 22 intentando adivinar contraseñas como `root/123456`, `admin/admin` o `root/password`. 

### Hardening de SSH (Reglas de Oro)

1.  **Prohibir al Rey (`PermitRootLogin no`):**
    Nunca, bajo ninguna circunstancia, se le debe permitir al usuario `root` iniciar sesión desde Internet. Obliga a los administradores a entrar primero con su cuenta de Campesino (ej. `juan`), y una vez adentro de la muralla, usar `sudo` para volverse administradores.
2.  **Destruir las Contraseñas (Usar Llaves Criptográficas):**
    Las contraseñas de texto (como "F1rulais2024!") son hackeables o adivinables. Los servidores profesionales **desactivan el inicio de sesión con contraseña**. La única forma de entrar es si tu computadora personal tiene una Llave Privada Criptográfica (un archivo de texto con miles de caracteres matemáticos aleatorios). Si no tienes la llave, el servidor ni siquiera te pedirá contraseña; te cortará la conexión en 0.1 segundos.
3.  **Cambiar el Puerto (Opcional pero útil):**
    Cambiar el SSH del Puerto 22 al Puerto 5892 no detendrá a un hacker real que escanee todos tus puertos, pero **limpiará tus logs** del 90% del ruido de bots basura que atacan a ciegas el puerto estándar 22.

---

## 3. UFW (Uncomplicated Firewall): El Guardia de la Puerta

Linux tiene un firewall interno legendario y extremadamente complejo llamado `iptables`. Para hacernos la vida más fácil, se inventó **UFW (Uncomplicated Firewall)**, que es simplemente una interfaz fácil de usar para controlar a los guardias.

El *Hardening* de red más básico del mundo tiene solo tres reglas universales:

1.  **Denegar Toda Entrada (Default Deny Incoming):**
    Le dices a UFW: *"Rechaza a cualquier persona que intente entrar desde Internet"*.
2.  **Permitir Toda Salida (Default Allow Outgoing):**
    Le dices a UFW: *"Si el servidor mismo inicia la conexión hacia afuera (ej. para bajar actualizaciones de Ubuntu), déjalo salir y volver a entrar"*.
3.  **Hacer Excepciones Explícitas:**
    Abres agujeros microscópicos en la pared **solo** para lo que necesitas.
    *   `sudo ufw allow ssh` (O abres el puerto personalizado que hayas elegido para entrar a administrarlo).
    *   `sudo ufw allow 443/tcp` (Abres la puerta web para los clientes).

**El Resultado:** Si levantaste una base de datos local y olvidaste ponerle contraseña, estás a salvo de Internet porque UFW tiene la puerta principal cerrada con candado y solo deja pasar tráfico Web y SSH.

---

## 4. Laboratorio Mental: El Peor Escenario

Imagínate que entras a trabajar a una startup y te dicen: *"Nuestro servidor web está súper seguro porque la contraseña del usuario root tiene 30 caracteres, mayúsculas, números y símbolos"*.

**¿Por qué, según el Hardening, ese servidor está al borde del desastre?**

1. Porque siguen usando contraseñas. Un keylogger en la laptop del administrador, o un ataque de "Fuerza Bruta" lento durante un año podría romperla. (Falta Hardening de SSH: Llaves Privadas).
2. Porque el usuario `root` tiene permiso de recibir ataques directamente desde la red. Un atacante puede intentar millones de combinaciones sobre el usuario maestro sin parar. (Falta Hardening de SSH: `PermitRootLogin no`).
3. Porque no importa cuán compleja sea la contraseña de acceso, si no hay un Firewall (UFW) bloqueando todos los demás puertos, un atacante no necesita adivinar la contraseña SSH; simplemente buscará vulnerabilidades en la Base de Datos o en servicios secundarios que estén expuestos a la calle por error.

---

## 5. Criterio de Dominio (Autoevaluación)

Mide tus reflejos defensivos:

1. Alquilas un servidor nuevo en AWS. El sistema te pregunta: *"¿Quieres acceder usando una Contraseña Compleja o usando un Par de Llaves SSH?"*. Como profesional de ciberseguridad, ¿cuál eliges y por qué?
2. Configuras tu UFW (Firewall) bloqueando *todo* el tráfico de entrada, y luego abres el puerto `443` para tu servidor web. De repente, notas que tu servidor no puede descargar las actualizaciones del sistema porque no encuentra internet. ¿Qué política básica ("Default...") se te olvidó configurar en el Firewall?
3. En el archivo de configuración `/etc/ssh/sshd_config`, encuentras la línea `PermitRootLogin yes`. ¿Qué ataque específico estás facilitando enormemente a los bots de internet al dejar esa configuración así?
4. El "Hardening" significa instalar 4 antivirus comerciales carísimos en el servidor. ¿Verdadero o Falso? Justifica.
