# Fundamentos de Privacidad: La Cortina y la Máscara

## Objetivo del Módulo

Resolver la peor y más peligrosa confusión conceptual en la historia del internet: Creer que Privacidad es lo mismo que Anonimato.

Las corporaciones te venden "Privacidad" y los periodistas perseguidos necesitan "Anonimato". Mezclarlos puede llevar a consecuencias legales y de seguridad catastróficas.

---

## 1. Privacidad vs Anonimato

*   **La Analogía de la Privacidad (Las Cortinas Cerradas):** Tienes una casa con las ventanas transparentes. Todo el vecindario puede ver qué programas de televisión estás viendo (El tráfico web normal sin cifrar). Si quieres Privacidad, instalas cortinas pesadas y las cierras. 
    *   *El Resultado:* Todo el mundo, incluyendo la policía, **sabe exactamente dónde vives, saben cuál es tu nombre (Tu Dirección IP), y saben que estás adentro de tu casa**. Lo único que NO saben es qué estás haciendo adentro. Esa es la Privacidad.

*   **La Analogía del Anonimato (La Máscara de Plástico):** Sales a caminar por el parque a plena luz del día. Vas gritando canciones y tirando basura. Todo el mundo ve exactamente lo que estás haciendo (El tráfico es público). Sin embargo, llevas puesta una máscara negra sin cara y guantes. 
    *   *El Resultado:* Nadie sabe cómo te llamas. Nadie sabe dónde vives. La policía ve lo que hiciste, pero es incapaz de rastrear **quién eres**. Ese es el Anonimato.

---

## 2. Las Herramientas del Comercio

### VPNs (Virtual Private Networks) = Privacidad Comercial
Una VPN es un túnel criptográfico (La Cortina).
*   **La Falacia:** Los YouTubers te dicen que "uses VPN para ser anónimo y que los gobiernos no te persigan". Esto es una mentira técnica.
*   **La Realidad:** Cuando usas una VPN comercial, tu proveedor de internet (Tu compañía telefónica local) ya no puede ver qué páginas visitas (porque cerraste la cortina). Pero la empresa dueña de la VPN **sí puede verlo**. Y lo más importante: La empresa de la VPN tiene tu tarjeta de crédito, tu correo electrónico y tu IP real. Si un juez les pide tu información, se la entregarán. **La VPN te da privacidad frente a tu vecino, no te da anonimato frente a las autoridades.**

### Red Tor (The Onion Router) = Anonimato Extremo
La red Tor, diseñada originalmente por la Marina de EE. UU., es la máscara de plástico.
*   **El Enrutamiento de Cebolla:** Cuando te conectas a internet usando Tor, tu conexión rebota aleatoriamente por 3 computadoras voluntarias diferentes alrededor del planeta (Nodos) antes de llegar al servidor final (Ej. Netflix o un sitio en la Deep Web).
*   **El Secreto (Capas):** Cada nodo solo conoce el salto anterior y el salto siguiente. El Nodo 3 sabe qué página estás visitando, pero no sabe tu IP. El Nodo 1 sabe tu IP, pero no tiene idea de qué página estás intentando abrir. Ningún nodo en el planeta tierra tiene la pieza completa del rompecabezas.
*   **La Realidad:** Es por esto que los periodistas disidentes en regímenes autoritarios usan Tor. Es matemáticamente imposible que el gobierno sepa *quién* está publicando un artículo en contra de ellos (Anonimato).

---

## 3. Criterio de Dominio (Autoevaluación)

Revisa si puedes separar la ilusión comercial de la seguridad táctica:

1. Un empleado utiliza una VPN comercial pública instalada en su computadora corporativa para trabajar desde una cafetería Wi-Fi. Basado en la analogía de "Las Cortinas Cerradas", explica cómo esta VPN lo protege de un ataque de "Evil Twin" (Módulo anterior) orquestado por el Hacker de la mesa de al lado, proporcionándole Privacidad.
2. Un activista político disidente intenta usar la misma VPN comercial (pagada con su propia tarjeta de crédito) para publicar documentos clasificados del gobierno de forma anónima. ¿Por qué es técnicamente incorrecto decir que es "anónimo" y cómo el gobierno podría rastrearlo fácilmente a través de citaciones legales?
3. Explica el concepto de "Enrutamiento de Cebolla" (Onion Routing) en la red Tor. ¿Cómo la división del conocimiento entre los "Tres Nodos" garantiza matemáticamente que nadie sepa al mismo tiempo "Quién eres" y "A dónde vas"?
4. La red Tor sacrifica drásticamente la velocidad (ancho de banda) a cambio de otorgar anonimato. Si un banco internacional necesita conectar en tiempo real sus bases de datos entre Nueva York y Londres usando **Cifrado en Tránsito** (Fase 19), ¿Por qué el Banco siempre elegirá una arquitectura VPN Corporativa privada en lugar de usar la red Tor?
