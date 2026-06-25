---
title: "El Reporte: El Único Entregable Real"
---
# El Reporte: El Único Entregable Real

## Objetivo de esta Guía

Aprender la dura verdad del Red Team: A la empresa no le importa qué tan rápido tecleas ni cuántas consolas negras abriste. Lo único que compran con sus $10,000 USD es un archivo PDF de 40 páginas.

Un "Hacker Ético" que es un genio técnico pero que no sabe escribir un reporte claro sin faltas de ortografía, terminará desempleado rápidamente. Saber traducir el código binario a "Riesgo de Negocio" para la junta directiva es el súper-poder más cotizado de la industria.

---

## 1. El Triste Secreto del Red Team

Imagínate que contratas a un Inspector de Viviendas para ver si la casa que vas a comprar está en buenas condiciones.
El inspector pasa 3 horas golpeando las paredes, subiendo al techo y revisando tuberías.
Al final, baja, te mira y te dice: *"Uy, encontré unas vigas podridas. Toma, aquí está mi factura"*. Y se va.

¿Qué haces tú con esa información? Nada. No eres arquitecto, no sabes en qué habitación están las vigas podridas, ni cómo arreglarlas.
Un Penetration Test sin un buen reporte es exactamente lo mismo. El cliente necesita saber **Qué está roto, Dónde está roto y Cómo se arregla.**

---

## 2. Los Dos Idiomas del Reporte

Un buen reporte de auditoría (Pentest Report) se divide estrictamente en dos partes, porque será leído por dos públicos que hablan idiomas diferentes.

### A. El Resumen Ejecutivo (Para el CEO y Directores)
El CEO del Banco no sabe qué es "Nmap", ni qué es un "Puerto 22", ni qué es "SQLi". El CEO solo habla un idioma: **Dinero y Riesgo Reputacional.**

El Resumen Ejecutivo es una sola página, escrita en lenguaje de negocios, que responde a tres preguntas:
1. *¿Alguien puede entrar y robarnos?* (Sí o No).
2. *Si nos roban, ¿Cuánto dinero vamos a perder o de cuánto será la demanda legal?*
3. *¿Podemos arreglarlo rápido?*

> **Importante (El Arte de Asustar Correctamente):**
> Un mal reporte dice: *"Encontramos una vulnerabilidad de Cross-Site Scripting (XSS) en la cookie de sesión del parámetro `id`"*.
> Un buen reporte Ejecutivo dice: *"Descubrimos un fallo en el Portal de Clientes que permite a un atacante robar la sesión bancaria de cualquier usuario con un solo clic. Si este fallo es explotado mañana, el Banco se enfrenta a demandas millonarias por fraude y pérdida total de confianza de los clientes"*.

### B. El Reporte Técnico (Para los Programadores / Blue Team)
Esta es la sección técnica de 30 páginas para el Administrador de Sistemas (El pobre "Juan" que va a tener que quedarse horas extra arreglando el desastre).
Aquí sí escribes código, capturas de pantalla, las IPs atacadas y los pasos exactos para replicar el hackeo.

**La Regla de la Remediación:**
Nunca critiques una puerta rota sin ofrecer el candado para arreglarla.
Si encuentras una inyección SQL, debes incluir en el reporte el fragmento de código (ej. *Prepared Statements*) que el programador debe copiar y pegar para solucionar el problema.

---

## 3. Midiendo el Miedo: El Estándar CVSS

Cuando entregas tu reporte, los programadores del cliente van a leer que encontraste 50 errores. No pueden arreglar los 50 en un solo día. ¿Cómo deciden cuál arreglar primero?

Para evitar peleas sobre si un error es "Muy malo" o "Más o menos malo", la industria creó una calculadora matemática internacional llamada **CVSS (Common Vulnerability Scoring System)**.

CVSS te hace una serie de preguntas sobre el hackeo (Ej. *¿El hacker necesitaba contraseña para hacer el ataque? ¿El ataque destruyó datos o solo leyó datos?*).
Al final, la calculadora escupe un número del **0.0 al 10.0**.

* **Bajo (0.1 - 3.9):** "Arréglalo cuando tengas tiempo el próximo mes".
* **Medio (4.0 - 6.9):** "Ponlo en la lista de tareas para esta semana".
* **Alto (7.0 - 8.9):** "Arréglalo hoy en la tarde".
* **Crítico (9.0 - 10.0):** (Ej. *EternalBlue*, Log4j). "Despierta al equipo de desarrollo a las 3:00 AM un domingo. Tienen 4 horas para arreglar esto o el servidor explotará".

---

## 4. Criterio de Dominio (Autoevaluación)

Revisa si ya piensas como un Consultor de Ciberseguridad:

1. Estás redactando el Resumen Ejecutivo para la junta de directores del Banco. ¿Por qué mencionar la herramienta técnica "Burp Suite" o la terminal de "Kali Linux" en esta página del reporte es una pésima idea profesional?
2. Encuentras un error que expone los nombres de los empleados del área de mantenimiento (Nivel Bajo), pero encuentras otro error que le permite a cualquiera borrar la Base de Datos principal sin iniciar sesión (Nivel Crítico). ¿Qué métrica numérica/matemática universal usarías en tu reporte para clasificar la urgencia de ambos errores sin que haya debate?
3. Sabiendo que el equipo de IT (Blue Team) tiene que arreglar los fallos que tú encontraste, ¿por qué un reporte técnico que solo contiene capturas de pantalla del ataque, pero no contiene una sección de "Remediación", es considerado un trabajo incompleto?
4. "Hackear un sistema y escribir el reporte son habilidades idénticas". ¿Por qué esta afirmación es trágicamente falsa para muchos hackers técnicos brillantes que fracasan en el mundo corporativo?
