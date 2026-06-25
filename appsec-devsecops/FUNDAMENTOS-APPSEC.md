---
title: "Fundamentos de AppSec: El Corrector y el Muñeco de Choque"
---
# Fundamentos de AppSec: El Corrector y el Muñeco de Choque

## Objetivo de esta Guía

Aprender cómo auditar el código fuente que escriben los programadores de tu empresa.

La **Seguridad de Aplicaciones (AppSec)** parte de una premisa triste pero real: Los programadores estudian para hacer que las cosas funcionen rápido, no para hacerlas seguras. Si un programador de tu empresa construye una Base de Datos y la conecta a la página web, es altamente probable que el código tenga agujeros por donde un hacker puede pasar. (El clásico de OWASP).

El equipo de Seguridad no puede leer millones de líneas de código manualmente. Necesitamos robots que lo hagan por nosotros.

---

## 1. El Enemigo: Falta de Saneamiento

En las Fases 6 (Web) y 7 (Red Team) mencionamos brevemente la famosa **Inyección SQL**. 

El 90% de los ataques a páginas web ocurren por un solo error de programación: **Falta de Saneamiento de Entradas (Input Sanitization)**.
*   **El Error:** El programador pone un cuadro de texto que dice "Escribe tu Nombre". El usuario escribe *Juan*. La Base de Datos guarda *Juan*.
*   **El Ataque:** El Hacker no escribe su nombre. Escribe una orden destructiva en código SQL: `' OR 1=1; DROP TABLE usuarios; --`.
*   **La Consecuencia:** Como el programador fue perezoso y no le enseñó a la página web a diferenciar entre "Nombres humanos" y "Código de computadora", la Base de Datos obedece la orden del hacker y se borra a sí misma por completo.

Para evitar que esto llegue a producción (Internet público), usamos SAST y DAST.

---

## 2. SAST: El Corrector Ortográfico (Código Estático)

SAST significa *Static Application Security Testing*.

*   **La Analogía:** Cuando escribes un documento en Microsoft Word y escribes mal una palabra, Word le pone una raya roja por debajo inmediatamente. Word no necesita que imprimas el documento para saber que te equivocaste. Está leyendo el texto (Estático) mientras escribes.
*   **En Programación:** SAST es un robot (Ej. *SonarQube*, *Checkmarx*) que lee el código fuente que el programador acaba de escribir en su computadora (Python, Java, C#).
*   **Lo que Atrapa:** Si el SAST ve que el programador dejó una contraseña secreta escrita en texto plano adentro del código, o si ve que el programador olvidó poner la función de Saneamiento para evitar Inyecciones SQL, el SAST pone una "raya roja" y levanta una alerta.
*   **La Ventaja:** Encuentra el error en el momento exacto en que se cometió, meses antes de que el programa salga al mercado.

---

## 3. DAST: El Muñeco de Pruebas de Choque (Dinámico)

SAST es muy bueno leyendo texto, pero a veces, los errores de seguridad solo aparecen cuando las piezas del programa se conectan entre sí y el motor arranca. Aquí entra DAST (*Dynamic Application Security Testing*).

*   **La Analogía:** SAST revisa que el diseño de los frenos del auto en papel sea correcto. DAST pone a un Muñeco de Pruebas de Choque (Crash Test Dummy) adentro del auto real, lo arranca a 100 km/h y lo choca contra la pared para ver si el conductor sobrevive.
*   **En Programación:** DAST (Ej. *OWASP ZAP*, *Burp Suite*) no tiene acceso al código fuente. Trata a la página web como una "Caja Negra" (Igual que un hacker).
*   **Lo que Atrapa:** El robot DAST se conecta a la página web de pruebas del banco, y empieza a dispararle millones de contraseñas falsas, Inyecciones SQL y ataques cruzados (XSS) a los cuadros de texto para ver si la página web explota o escupe información privada.

**El Resumen:** SAST lee tu código en la fábrica. DAST ataca tu programa terminado desde afuera. Necesitas ambos.

---

## 4. Criterio de Dominio (Autoevaluación)

Revisa si puedes auditar código como un profesional:

1. Un desarrollador escribe una aplicación en lenguaje Java. Mientras programa, accidentalmente deja la "Llave Secreta de Amazon AWS" escrita en la línea 45 de su código. ¿Cuál de las dos herramientas (SAST o DAST) es la ideal para encontrar este error específico, y usando la analogía correspondiente, por qué?
2. Explica el concepto de "Falta de Saneamiento de Entradas" (Input Sanitization) usando el ejemplo clásico de una Inyección SQL, y describe cómo un simple cuadro de "Buscar Usuario" se convierte en un arma letal si el desarrollador omite este paso.
3. El equipo de Seguridad (AppSec) contrata un sistema DAST para escanear la página web de la empresa todas las noches. A diferencia de un SAST, ¿Por qué el DAST necesita que la página web y la base de datos estén completamente operativas y encendidas (Running State) para poder hacer su trabajo?
4. El robot SAST reportó 50 "Falsos Positivos" (marcó como error algo que en realidad es seguro), lo cual hizo que los programadores se enojaran y apagaran la herramienta. ¿Qué proceso de ajuste (visto también en la Fase 8 con el SIEM y en la Fase 13 con el IPS) debe realizar el Arquitecto de Seguridad para que la herramienta SAST sea útil?
