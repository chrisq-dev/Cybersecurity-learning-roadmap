---
title: "Switching, VLANs y ACLs: Dividiendo el Edificio"
---
# Switching, VLANs y ACLs: Dividiendo el Edificio

## Objetivo del Módulo

Entender cómo los Arquitectos de Red aíslan y protegen departamentos enteros dentro de una misma empresa usando paredes virtuales (VLANs) y guardias de seguridad invisibles (ACLs).

En ciberseguridad, asumir que un atacante no va a entrar a tu red es pecar de inocente. La mentalidad moderna dicta que **el atacante ya está adentro**. Si el hacker vulnera la computadora de la recepcionista, el trabajo de la red no es evitar que entre, sino **evitar que pueda saltar desde la recepción hasta el servidor de recursos humanos**. Aquí es donde brillan las VLANs y las ACLs.

---

## 1. La Analogía: El Edificio de Cristal

Imagina que tu empresa (La Red Local o LAN) es un gran edificio de oficinas.

Si no configuras nada, tu red será como un edificio sin paredes internas, estilo "espacio abierto" enorme.
*   **El Problema de Seguridad:** Si alguien entra gritando "¡Hola!" (Un mensaje de *Broadcast* de red), todos en el edificio entero, desde el contador hasta el diseñador, van a escucharlo. Si un empleado se roba un documento financiero secreto que alguien dejó en una mesa, no hay puertas que lo detengan.

Para arreglar esto, instalamos **VLANs (Virtual Local Area Networks)**.

### ¿Qué es una VLAN?
Una VLAN es como levantar **paredes de cristal insonorizadas** en el edificio.
A través de la configuración del *Switch* (sin tener que comprar cables nuevos o aparatos nuevos), puedes decirle al aparato:
*"Del puerto 1 al 10 será la VLAN 10 (Recursos Humanos). Del puerto 11 al 20 será la VLAN 20 (Finanzas)"*.

*   **El resultado:** A partir de ese segundo, aunque la computadora de Finanzas y la computadora de Recursos Humanos estén enchufadas **al mismo aparato físico**, no pueden escucharse, no pueden hablarse y están completamente separadas lógicamente.

> **El Ángulo Hacker (VLAN Hopping):**
> Si un hacker conecta su laptop en el puerto de "Invitados" de la recepción (VLAN 30), e intenta hackear al servidor de Finanzas (VLAN 20), el Switch no dejará pasar sus paquetes. Así que los hackers desarrollaron una técnica llamada *VLAN Hopping* (Saltar la VLAN), que consiste en enviar paquetes con etiquetas falsas para engañar al Switch y hacerle creer que el hacker pertenece a la VLAN de Finanzas.

---

## 2. El Router (El Ascensorista)

Si levantaste paredes insonorizadas entre Recursos Humanos y Finanzas usando VLANs, ¿qué pasa si el contador **legítimamente** necesita enviar un recibo de nómina a la gerente de RH? ¡Las VLANs no se hablan entre sí!

Para que dos VLANs se puedan comunicar, **necesitas obligatoriamente un Router**.
El Router actúa como el Ascensor o el Oficial de correspondencia. 
1. El contador (VLAN 20) le envía el recibo al Router.
2. El Router toma el recibo, cruza la "frontera" y lo deposita en la VLAN 10 (RH).

Y aquí es donde la magia de la seguridad se aplica. Al obligar a todos a pasar por el Router para poder cruzar de un departamento a otro, puedes poner a un **Guardia de Seguridad** en la puerta del Router para revisar cada paquete. Ese guardia se llama ACL.

---

## 3. ACLs (Listas de Control de Acceso)

Una **Access Control List (ACL)** es literalmente una "Lista VIP" (o Lista Negra) pegada en la puerta del Router. Son las reglas de Firewall más básicas y antiguas que existen.

El Router lee la regla de arriba hacia abajo cada vez que le llega un paquete.

**Ejemplo de cómo se lee una ACL en Cisco:**
```text
1. PERMITIR: Que la IP del Contador pase hacia el Servidor de Finanzas.
2. DENEGAR: Que cualquier otra persona pase hacia el Servidor de Finanzas.
3. PERMITIR: Que todos los empleados puedan salir a Internet.
```

### ¿Por qué son vitales?
Sin ACLs, el Router simplemente deja pasar todo. Con ACLs, aplicas el principio más puro de la ciberseguridad: **El Principio de Mínimo Privilegio**. 

Si un atacante infecta con un *Ransomware* la máquina de un empleado en la VLAN de Marketing, el virus intentará propagarse al Servidor de Finanzas. Llegará al Router, el Router leerá la ACL y dirá: *"Lo siento, la regla 2 dice que Marketing no tiene permiso de hablar con Finanzas. ¡Paquete destruido!"*. Has salvado a la empresa.

---

## 4. Laboratorio Mental: El Diseño Seguro

Piensa en la red de un banco pequeño. Como Arquitecto de Seguridad, ¿cómo usarías las VLANs?

Un mal diseño pondría todas las máquinas en una sola red plana (Ej. `192.168.1.x`).
Un **diseño blindado de CCNA** haría lo siguiente:

1.  **VLAN 10 (Cajeros):** `10.0.10.x`. Contiene las computadoras de los cajeros en la sucursal.
2.  **VLAN 20 (Gerencia):** `10.0.20.x`. Contiene las laptops de los banqueros y directores.
3.  **VLAN 30 (Servidores):** `10.0.30.x`. Aquí está la base de datos de dinero y saldos de los clientes.
4.  **VLAN 40 (Invitados):** `10.0.40.x`. El Wi-Fi gratuito para los clientes que están sentados esperando su turno.

**Las ACLs del Router dirían:**
*   **Regla 1:** La VLAN 10 (Cajeros) SÍ puede hablar con la VLAN 30 (Servidores).
*   **Regla 2:** La VLAN 20 (Gerencia) SÍ puede hablar con la VLAN 30 (Servidores).
*   **Regla 3:** La VLAN 40 (Invitados) SOLO puede hablar con Internet. Tiene **prohibido** absoluto intentar siquiera mirar hacia la VLAN 30.

Si un hacker que se hace pasar por un cliente se sienta en la sala de espera y se conecta al Wi-Fi gratuito, su intento de escanear los servidores será frenado en seco por el Router gracias a las VLANs y la ACL.

---

## 5. Criterio de Dominio (Autoevaluación)

Revisa si puedes diseñar redes en tu cabeza:

1. Estás configurando una oficina con 50 computadoras conectadas a un solo Switch gigante. El director quiere que los 10 contadores no puedan comunicarse con los 40 diseñadores. ¿Qué tecnología del Switch vas a configurar para lograr esto sin tener que comprar un segundo aparato?
2. Si tienes dos computadoras en la misma VLAN, ¿necesitas un Router para que hablen entre sí?
3. En una lista de control de acceso (ACL), ¿Por qué el orden de las reglas importa? (Piensa qué pasa si la regla número 1 dice "Denegar a todos", y la regla número 2 dice "Permitir al Contador").
4. ¿Qué es el *VLAN Hopping* en términos de ciberseguridad ofensiva?
