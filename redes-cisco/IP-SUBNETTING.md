---
title: "Direcciones IP y Subnetting: El GPS de Internet"
---
# Direcciones IP y Subnetting: El GPS de Internet

## Objetivo del Módulo

Aprender cómo las computadoras se encuentran entre sí a nivel mundial y por qué dividir las redes (Subnetting) es la primera línea de defensa para contener a un atacante.

Las matemáticas detrás de las direcciones IP y el *subnetting* suelen asustar a los principiantes. En este módulo no te haré convertir números binarios a mano (para eso existen calculadoras). Aquí vas a entender la **lógica arquitectónica** que exige la certificación Cisco CCNA: por qué existen las IP, cómo se leen, y por qué cortamos las redes en pedazos por seguridad.

---

## 1. La Analogía: Calles y Códigos Postales

Si quieres enviarle un paquete a tu amigo Juan, no basta con decirle al cartero: *"Entrégaselo a Juan"*. Hay millones de Juanes. Necesitas una dirección lógica estructurada: País, Estado, Código Postal, Calle y Número de Casa.

En las redes informáticas:
*   **La Dirección MAC:** Es el nombre completo de Juan (ej. Juan Pérez Gómez). Viene de fábrica y nunca cambia. Pero no te dice *dónde* vive.
*   **La Dirección IP:** Es la dirección de su casa (ej. Calle Maple #123, Código Postal 5000). Cambia si Juan se muda a otra ciudad. 

Las Direcciones IP le permiten a los Routers (las oficinas de correo) saber en qué país y en qué edificio del mundo estás conectado ahora mismo.

---

## 2. IPv4 vs IPv6 (Se nos acabaron las casas)

### IPv4 (El estándar clásico)
Una dirección IPv4 se ve así: `192.168.1.55`. 
Está compuesta por 4 bloques de números, donde cada número solo puede ir del **0 al 255**.
El problema con este diseño antiguo es que solo permite **4,300 millones de direcciones posibles**. A principios de los años 2010, nos quedamos literalmente sin IPs en el mundo. Hay más celulares, relojes inteligentes y computadoras que direcciones disponibles.

### IPv6 (La solución del futuro)
Para solucionar el fin del mundo de las IPs, se inventó IPv6. 
Se ve así: `2001:0db8:85a3:0000:0000:8a2e:0370:7334`.
Es un formato mucho más largo y usa letras y números. Es tan inmensamente grande que podríamos darle una dirección IP única a cada grano de arena del planeta Tierra y nos sobrarían. Aunque IPv6 es el futuro, **IPv4 seguirá siendo el rey en las redes corporativas internas por muchos años más**.

---

## 3. IP Pública vs IP Privada (El Truco para sobrevivir)

Si se nos acabaron las IPv4, ¿por qué tu casa sigue teniendo internet? Por un truco brillante llamado **IPs Privadas**.

Los ingenieros de internet acordaron reservar unos "Códigos Postales Especiales" que no existen en el mapa público mundial. Son como direcciones de departamentos dentro de un edificio.

*   **IP Pública (Tu Edificio):** Es la dirección de la puerta principal de tu edificio hacia la calle (Internet). Es única en todo el mundo.
*   **IP Privada (Tu Departamento):** Es tu número de departamento (`Apt 101`, `Apt 102`). Muchos edificios pueden tener un "Departamento 101", pero no hay conflicto porque están puertas adentro.

**Los Rangos Privados Famosos:**
Si ves una IP que empieza con estos números, **sabes que es una IP privada local** que no puede navegar directamente a Internet sin pedirle permiso al Router:
*   `10.x.x.x` (Muy usada en grandes empresas)
*   `172.16.x.x` a `172.31.x.x`
*   `192.168.x.x` (La clásica de todas las casas del mundo)

---

## 4. Subnetting: Cortando el Pastel (El famoso `/24`)

Imagínate que administras una Universidad con 1,000 computadoras. Si las pones todas en la misma "calle" (misma red local), vas a tener un caos masivo de tráfico, y si un estudiante descarga un gusano (worm) maligno, el virus infectará a las 1,000 máquinas en segundos.

La solución es el **Subnetting (Subredes)**: Cortar ese pastel gigante en pedazos más pequeños y poner muros entre ellos. Pones a los Alumnos en una red, a Finanzas en otra, y a los Profesores en otra.

### La Máscara de Red (El Cuchillo)
Para decirle a la computadora qué parte de su dirección es "El nombre de la calle" y qué parte es "El número de la casa", usamos la Máscara de Red.

*   **IP:** `192.168.1.55`
*   **Máscara (Estilo antiguo):** `255.255.255.0`
*   **Máscara (Estilo moderno / CIDR):** `/24`

¿Qué diablos significa `/24`?
En lenguaje humano significa: *"Los primeros 3 bloques de la IP (`192.168.1`) son el nombre de la calle. El último bloque (`.55`) es el número de la casa. Solo caben 254 casas en esta calle"*.

> **Importante en Ciberseguridad:** 
> La regla de oro del Subnetting es que **las casas de la calle A no pueden hablar con las casas de la calle B a menos que pasen por un guardia de seguridad (Router/Firewall)**. Si aislas los servidores de la empresa en una subred `/24` separada del Wi-Fi de invitados, cortaste el 90% del riesgo de infección cruzada.

---

## 5. Laboratorio Práctico: Descubre tu IP Real vs Privada

Vamos a ver cómo la analogía del "edificio y el departamento" funciona en tu propia máquina.

### Paso 1: Tu IP Privada (El Departamento)
1.  Abre la terminal (`cmd` en Windows, `Terminal` en Mac/Linux).
2.  Escribe `ipconfig` (Windows) o `ip addr` (Mac/Linux).
3.  Busca tu dirección IP (probablemente dirá algo como `192.168.0.15`).
4.  Esta es tu dirección privada. Desde aquí solo puedes hablar con tu Smart TV, tu celular y otros equipos **dentro de tu casa**.

### Paso 2: Tu IP Pública (El Edificio hacia Internet)
1.  Abre tu navegador web y entra a [https://www.cual-es-mi-ip.net/](https://www.cual-es-mi-ip.net/) o busca en Google "What is my IP".
2.  Verás un número completamente diferente (Ej. `187.144.20.100`).
3.  Esa es la IP Pública que tu proveedor de internet (Telmex, Movistar) le asignó a tu casa. 
4.  **Cuando entras a Facebook**, Facebook no ve tu IP privada `192.168.0.15`. Facebook solo ve tu IP pública `187.144.20.100`.

---

## 6. Criterio de Dominio (Autoevaluación)

¿Puedes responder a esto con seguridad?

1. En una auditoría de seguridad, un reporte dice que "El atacante se conectó desde la IP `192.168.1.40`". ¿El atacante está en otro país hackeando por internet, o está físicamente conectado al Wi-Fi de tu edificio?
2. Si un colega te dice que configuró la red como `10.0.0.0 /24`, ¿Qué significa ese `/24` en términos simples sobre el tamaño de la red?
3. ¿Por qué el Subnetting es considerado una técnica de seguridad y no solo una técnica de organización de redes?
4. ¿Cuál es la diferencia de utilidad entre una Dirección MAC y una Dirección IP usando la analogía postal?
