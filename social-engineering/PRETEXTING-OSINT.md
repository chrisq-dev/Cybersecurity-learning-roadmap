# Pretexting y OSINT: El Actor y la Basura Digital

## Objetivo del Módulo

Aprender cómo los criminales cibernéticos usan la actuación teatral y el buceo de información pública para vulnerar tu red.

El Phishing (Módulo anterior) depende de que la víctima le dé clic a un enlace ciego. Pero los ataques de alto nivel (Hacking a corporaciones Fortune 500) requieren una estrategia psicológica mucho más invasiva. El atacante necesita conocer tu vida entera antes de dar el golpe.

---

## 1. OSINT (Open Source Intelligence): Buceo en la Basura Digital

El primer paso de un ataque cibernético no es escribir código en una pantalla negra, es investigar al objetivo. Esto se conoce como la fase de Reconocimiento (Recon).

*   **¿Qué es OSINT?** Es la recolección de información que es 100% pública y legal en internet. El hacker no rompe ninguna ley al hacer esto.
*   **El Proceso:** El atacante entra al perfil de LinkedIn del Administrador de Sistemas de la empresa (Fase 15). Ve en su perfil que acaba de tener un hijo llamado "Mateo" en 2023. Luego entra a su Instagram público y ve que es fanático del equipo de fútbol "Real Madrid".
*   **La Ejecución Silenciosa:** Con esta información gratuita, el atacante no tiene que adivinar las millones de combinaciones posibles para una contraseña. El atacante genera un diccionario personalizado y adivina que la contraseña del Administrador probablemente es `Mateo2023!` o `HalaMadrid123!`.

Con el auge de las redes sociales, los usuarios entregan voluntariamente a los hackers las respuestas exactas a sus "Preguntas de Seguridad" (Nombre de tu primer mascota, ciudad de nacimiento).

---

## 2. Pretexting: El Actor de Hollywood

Una vez que el hacker recolecta suficiente información mediante OSINT, fabrica una "Historia de Cobertura" (El Pretexto).

*   **La Analogía:** El Pretexting es una actuación de teatro ganadora de un Óscar, diseñada para engañar al empleado de tu empresa e infundirle terror, urgencia o simpatía extrema.
*   **El Ataque en Acción:** El Hacker llama por teléfono al departamento de Sistemas (HelpDesk). Finge ser el Vicepresidente de Finanzas de la empresa.
    *   *El Hacker (Fingiendo pánico):* "¡Mi computadora se bloqueó! ¡Estoy a punto de subir al avión para ir a firmar un contrato de 10 millones de dólares en Suiza y necesito que me resetees mi contraseña AHORA MISMO o los dos estaremos despedidos!".
    *   Para darle credibilidad a su actuación, el Hacker usa la información de OSINT: "Como le dije a tu jefe Roberto en el partido de golf de ayer..."
    *   *El Empleado (Asustado):* La mente humana está programada para obedecer a la autoridad y evitar problemas. El empleado de Sistemas salta los protocolos de seguridad, no verifica la identidad real del sujeto en la línea, y le dicta una nueva contraseña temporal por teléfono.

El Hacker de 19 años sentado en pijama en otro continente acaba de obtener acceso total a la red financiera de la corporación simplemente hablando por teléfono durante 3 minutos.

---

## 3. La Defensa: Protocolos Anti-Humanos

Como no puedes "parchar" el cerebro humano con una actualización de software, la única defensa contra la Ingeniería Social es el **Gobierno y Cumplimiento (Fase 20)**.

Entrenamientos corporativos agresivos (Security Awareness) y políticas estrictas:
*"Ningún reseteo de contraseñas se hará por teléfono. Todos los empleados, incluyendo el CEO, deben realizar la solicitud por escrito y ser verificados por videollamada"*.

---

## 4. Criterio de Dominio (Autoevaluación)

Cierre maestro del curso de Ciberseguridad. Revisa si logras pensar como el enemigo:

1. Un hacker descubre en LinkedIn que el nuevo empleado del departamento de Pagos de una empresa comenzó a trabajar hace solo 3 días (lo que significa que aún no conoce los procedimientos internos). Usando una táctica de **Pretexting**, describe un escenario telefónico que el hacker podría usar contra este nuevo empleado para lograr que realice una transferencia de fondos no autorizada.
2. Explica la relación directa entre el concepto de **OSINT** (Inteligencia de Fuentes Abiertas) y la eficacia de un ataque de *Spear Phishing* (Visto en el módulo anterior). ¿Por qué investigar primero hace que el ataque sea letal?
3. Sabiendo que el ser humano es el eslabón más débil, ¿Por qué las herramientas tecnológicas de la Fase 14 (EDR) y la Fase 13 (IPS) no sirven para detectar y detener un ataque de Ingeniería Social (Ej. Que la secretaria le dicte voluntariamente su contraseña a un supuesto técnico por teléfono)?
4. Con todo el conocimiento que has adquirido en las 21 fases de este mapa de aprendizaje (Desde Redes hasta DevSecOps), ¿Cuál consideras que es el vector de ataque más peligroso y difícil de mitigar para una empresa global, y por qué recae casi siempre en el factor humano?
