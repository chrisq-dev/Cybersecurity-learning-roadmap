---
title: "Inyección SQL (SQLi): Engañando al Archivero"
---
# Inyección SQL (SQLi): Engañando al Archivero

## Objetivo del Módulo

Entender la vulnerabilidad web más famosa, antigua y devastadora de la historia.
A pesar de tener más de 25 años de antigüedad, la Inyección SQL sigue destruyendo empresas hoy en día. Ocurre cuando un programador confía ciegamente en lo que el usuario escribe en una caja de texto, permitiendo que el usuario envíe código malicioso directamente a la base de datos de la empresa.

---

## 1. La Analogía: El Archivero Ciego

Imagina que la Base de Datos es un enorme cuarto lleno de archiveros. Dentro del cuarto vive un **Archivero Ciego (El motor SQL)**.
*   El archivero es una máquina perfecta. Hace exactamente lo que le pides, muy rápido, pero no tiene sentido común.
*   El lenguaje oficial con el que le das órdenes al archivero se llama **SQL**.

### El Escenario Normal
En tu página web tienes una caja de texto para que los clientes busquen productos. Un cliente escribe la palabra `Zapatos`.
El servidor web (El Cocinero) toma la palabra `Zapatos` y construye la siguiente oración lógica en SQL:
`"Hola Archivero, por favor ve y búscame todos los productos DONDE el nombre sea IGUAL a 'Zapatos'."`

El archivero obedece, saca los expedientes de zapatos y te los da. Todo es feliz y normal.

---

## 2. El Ataque (Inyección)

Un Hacker llega a tu página web y, en la caja de búsqueda de productos, en lugar de escribir "Zapatos", escribe lo siguiente exactamente (incluyendo la comilla simple al principio):

`' O 1=1 --`

El Cocinero (Backend) estúpido y mal programado toma este texto y lo pega directamente en la oración. La orden que recibe el Archivero ciego ahora queda así:

`"Hola Archivero, por favor ve y búscame todos los productos DONDE el nombre sea IGUAL a '' O 1=1 --"`

### La Descomposición Matemática de la Destrucción:
Para el Archivero ciego, esta oración tiene lógica matemática pura:
1.  **`''` (Vacío):** El archivero busca un producto sin nombre (Falso).
2.  **`O (OR)`:** La palabra mágica. Significa "Si lo primero fue falso, revisa la segunda opción".
3.  **`1=1`:** El archivero se pregunta: "¿El número 1 es igual al número 1?". La respuesta es **Verdadero**.
4.  **`--` (Comentario):** Le dice al archivero: "Ignora cualquier otra orden que venga después de esto, no importa".

**El Resultado:** Dado que "1 siempre es igual a 1", la condición es verdadera para absolutamente todos los archivos en todo el cuarto. El Archivero ciego saca **toda la base de datos** (incluyendo cuentas de usuarios, tarjetas de crédito, precios ocultos) y los escupe en la pantalla del atacante.
El hacker acaba de robarte la empresa entera usando una comilla simple y matemática de primaria.

---

## 3. Las Consecuencias y Tipos de SQLi

Robar datos es solo el principio. Si la inyección se hace en la pantalla de Login (Usuario y Contraseña), el hacker puede inyectar un código que diga:
`"Valida mi contraseña O déjame entrar si 1=1"`.
El sistema lo dejará entrar a la cuenta del Administrador sin saber la contraseña real (Authentication Bypass).

Existen otros tipos más avanzados:
*   **Blind SQLi (Inyección Ciega):** A veces la página web no "escupe" los datos en la pantalla, pero el hacker puede hacerle preguntas de "Sí o No" a la base de datos (Ej. *"¿La primera letra de la contraseña del administrador es la A?"*). Dependiendo de si la página tarda 5 segundos en cargar o no, el hacker adivina la respuesta (Inyección basada en tiempo).

---

## 4. La Defensa (El Blue Team)

Como futuro auditor o programador, ¿cómo evitas esto? Es extremadamente fácil si se hace bien.

**La Regla de Oro: NUNCA CONCATENES TEXTO (No pegues con resistol).**

*   **Mal (El Cocinero Estúpido):** Tomar el texto del usuario y pegarlo crudo en la oración SQL.
*   **Bien (Consultas Preparadas / Prepared Statements):** El programador usa una caja blindada. Le envía la oración al Archivero primero, y le dice: *"Archivero, voy a mandarte una caja blindada. No me importa qué palabras, símbolos matemáticos o comillas vengan adentro de la caja; vas a tratar todo su contenido **estrictamente como texto literal**, no como una orden"*.

Cuando el hacker envía `' O 1=1 --`, el archivero ciego simplemente buscará en sus expedientes un producto que se llame literalmente "comilla O uno igual a uno guion guion". Al no encontrarlo, devolverá un error inofensivo.

---

## 5. Criterio de Dominio (Autoevaluación)

Revisa si tu mente ya ve los agujeros en las cajas de texto:

1. Estás auditando una página web y escribes una comilla simple (`'`) en la caja de búsqueda. La página se rompe y te devuelve un mensaje rojo gigantesco que dice: `Error Code 1064: You have an error in your SQL syntax near...`. ¿Por qué ese mensaje es oro molido para ti como *Penetration Tester*?
2. Un programador te dice: *"Yo no sufro de SQL Injection porque programé un filtro que elimina todas las comillas simples de lo que escribe el usuario"*. ¿Por qué los filtros manuales (Blacklisting) suelen ser una mala idea de seguridad comparado con usar Consultas Preparadas (Prepared Statements)?
3. Si un hacker no quiere robar datos, sino destruir a la empresa entera de forma vengativa, ¿Qué comando de inyección clásico (cuatro letras que empiezan con D) podría intentar insertar después del punto y coma (`;`) para borrar una tabla entera de la base de datos?
4. En el ataque de *Authentication Bypass* (Burlar el Login), ¿por qué la declaración matemática `1=1` logra engañar a la base de datos para dejar entrar al atacante sin contraseña?
