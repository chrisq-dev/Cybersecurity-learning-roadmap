---
title: "Fundamentos Web: La Arquitectura del Restaurante"
---
# Fundamentos Web: La Arquitectura del Restaurante

## Objetivo del Módulo

Desmitificar cómo funciona el internet por debajo del capó.
No puedes hackear ni defender una página web si no entiendes sus piezas móviles. Para el 99% de las personas, "Internet" es simplemente un ícono de Chrome en su celular donde escriben cosas y mágicamente aparecen fotos. Para un profesional de la ciberseguridad, cada página web es un complejo sistema de tres niveles donde la confianza es la mayor vulnerabilidad.

---

## 1. La Arquitectura Clásica (Frontend, Backend, Base de Datos)

Olvídate de las computadoras por un momento. Imagina que vas a cenar a un Restaurante elegante.

Ese restaurante tiene tres componentes críticos que están estrictamente separados:
1.  **La Mesa y el Menú (Frontend):** Lo que tú puedes ver y tocar.
2.  **El Mesero (La Red / HTTP):** El que lleva tus órdenes hacia atrás y te trae la comida.
3.  **La Cocina (Backend):** El lugar secreto y cerrado donde se prepara todo.
4.  **La Alacena (Base de Datos):** El refrigerador gigante donde están guardados los ingredientes (y los secretos).

Así es exactamente como funciona cualquier página web (Amazon, Facebook, tu banco).

### A. El Frontend (La Mesa)
Es todo lo que ocurre **dentro de tu propio dispositivo** (tu celular o tu laptop). Está construido con tres lenguajes: HTML (la estructura), CSS (la pintura) y JavaScript (el movimiento).
*   *La Regla de Oro:* **El Frontend NUNCA es de confianza.** Como el menú está en tu mesa, tú puedes tomar un bolígrafo, tachar el precio de la Langosta de $100 dólares, y escribir $1 dólar. 

### B. El Backend (La Cocina)
Es una supercomputadora en un edificio de Amazon o Google (Servidor). Trabaja usando lenguajes como Python, PHP o Node.js. 
*   *Su Trabajo:* Es el cerebro ciego. Recibe la nota del mesero que dice "El cliente de la mesa 4 quiere la Langosta a $1 dólar". Si el Cocinero es estúpido (mal programado), cocinará la langosta y la cobrará a $1. Si el Cocinero está bien programado (Blue Team), validará la orden: *"Espera, la Langosta cuesta $100, no $1. Orden rechazada"*.

### C. La Base de Datos (La Alacena)
Es donde se guardan de forma permanente las contraseñas, los números de tarjetas de crédito y los saldos bancarios. Corre con sistemas como SQL o MongoDB.
*   *La Vulnerabilidad:* El Cocinero (Backend) es el **único** que tiene las llaves de la alacena. Si un atacante logra engañar al Cocinero, el atacante obtendrá la llave de la alacena entera.

---

## 2. El Hacker en el Restaurante

Cuando la gente habla de "Hackear una Web", generalmente no se refieren a destruir los muros del restaurante usando explosivos (Fuerza Bruta o DDoS). Se refieren a **engañar al sistema de confianza**.

### Vector 1: Atacando a Otros Clientes (Cross-Site Scripting - XSS)
El hacker no ataca a la cocina. Simplemente escribe una grosería en el menú de la mesa usando su bolígrafo, o le pone veneno a la sal del restaurante. El próximo cliente normal que se siente en esa mesa será el perjudicado. El servidor nunca se enteró.

### Vector 2: Mintiendo en la Orden (SQL Injection - SQLi)
El hacker le entrega al mesero una nota matemática retorcida. Cuando el Cocinero la lee, su cerebro colapsa, tira la puerta de la alacena (Base de datos) e imprime todas las recetas secretas y salarios de los empleados en lugar de cocinar la comida.

### Vector 3: Manipulación de Identidad (Broken Access Control)
El hacker le roba el uniforme al gerente y entra a la cocina. El Cocinero asume ciegamente que como trae uniforme de gerente, tiene derecho a ver las finanzas del restaurante.

---

## 3. Criterio de Dominio (Autoevaluación)

Revisa si tu mente ya separó el concepto de "Internet":

1. Modificas el código de un juego de navegador (Frontend) usando la consola de tu Google Chrome y cambias tus monedas de oro de 10 a 9,999,000. Pero cuando refrescas la página, vuelves a tener 10 monedas. ¿Por qué el hackeo falló? *(Piensa en la diferencia entre el Menú y la Cocina)*.
2. ¿Por qué es un error fatal de diseño guardar la regla `precio_del_zapato = 50.00` en el código JavaScript que se descarga en el navegador del cliente (Frontend) en lugar de verificarlo en el Servidor (Backend)?
3. Si un atacante logra robar la Base de Datos entera de contraseñas de los usuarios, ¿A qué nivel de la arquitectura tuvo que engañar para acceder a ella?
