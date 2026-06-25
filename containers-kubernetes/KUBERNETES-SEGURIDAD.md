# Seguridad en Kubernetes (K8s): El Director de Orquesta

## Objetivo del Módulo

Entender qué hace Kubernetes, por qué es el rey absoluto de la Nube, y cómo hackearlo significa ganar el juego instantáneamente.

Si tienes 3 contenedores de Docker (Las cajas de cristal del módulo anterior), puedes encenderlos a mano escribiendo comandos en la terminal de Linux.
Pero las empresas como Netflix o Spotify no tienen 3 contenedores. Tienen **50,000 contenedores** encendiéndose y apagándose cada segundo alrededor del mundo. Un humano no puede administrar eso. Necesitas un robot automatizado: **Kubernetes**.

---

## 1. El Robot Orquestador

*   **La Analogía:** Tienes a 50,000 músicos de todos los instrumentos listos para tocar. Necesitan un **Director de Orquesta**. El Director no toca el violín (no ejecuta el código), él solo vigila a los músicos (Los Contenedores de Docker). Si el violinista se muere de un infarto (Se cae el servidor), el Director inmediatamente llama a otro violinista de repuesto y lo sienta en la silla sin que la sinfonía se detenga un solo segundo. A esto se le llama **Orquestación de Contenedores**.

En la jerga técnica de Kubernetes (K8s):
*   **Pod:** La unidad más pequeña (La silla del músico, usualmente contiene uno o dos contenedores).
*   **Worker Node:** Los servidores esclavos donde se sientan los pods.
*   **Control Plane (Master Node):** El Director de Orquesta.

---

## 2. El Apocalipsis: Hackear la API de Kubernetes

Kubernetes es el objetivo más preciado por cualquier grupo de Hackers en el mundo moderno.
Si logran robarle la batuta al Director de Orquesta, no hackearon una computadora, hackearon **toda la infraestructura en la Nube de la empresa completa**.

*   **El API Server (El Corazón de K8s):** El Control Plane se comunica con todo el clúster a través de una API (Fase 18). Si la API de Kubernetes se deja expuesta públicamente a Internet sin autenticación (Un error de configuración ridículamente común), cualquier persona desde Rusia puede mandarle un archivo JSON al Director de Orquesta ordenándole: *"Cierra los contenedores de Netflix y arranca 10,000 contenedores nuevos para minar criptomonedas (Bitcoin) usando las tarjetas de crédito corporativas de la empresa"*. 
Esto se conoce como *Cryptojacking*.

### La Defensa: K8s Security Posture
Para evitar el fin del mundo, los Arquitectos de Seguridad de Kubernetes deben aplicar el "Zero Trust" (Fase 23):
1.  **RBAC (Role-Based Access Control):** Reglas estrictas. El programador "Juan" solo puede ordenar encender contenedores en el entorno de Pruebas, pero tiene prohibido tocar el entorno de Producción.
2.  **Network Policies (Cortafuegos de Pods):** Por defecto en Kubernetes, todos los músicos de la orquesta pueden hablar entre sí. Debes crear políticas que digan: "El Pod de la Página Web NO tiene permiso técnico de hablar con el Pod del Sistema de Nómina". (Segmentación).
3.  **Proteger los Secretos (Secrets Management):** No escribas las contraseñas de las bases de datos en texto plano dentro del código. Kubernetes tiene una bóveda blindada llamada "Secrets" para encriptarlas.

---

## 3. Criterio de Dominio (Autoevaluación)

Revisa si puedes asegurar la batuta del Director:

1. Basado en la analogía del "Director de Orquesta", explica la diferencia de responsabilidades y nivel de riesgo entre un "Worker Node" (Un músico) y el "Control Plane" (El Director). ¿Por qué los atacantes modernos apuntan casi exclusivamente al Control Plane?
2. Un equipo de desarrollo despliega Kubernetes pero decide no configurar ninguna "Network Policy" (Política de Red) porque es demasiado trabajo administrativo. Un atacante logra vulnerar un contenedor público que hospeda un simple Blog de WordPress. Explica cómo la falta de Network Policies le permite al atacante moverse lateralmente para atacar la Base de Datos Financiera de la empresa alojada en el mismo clúster.
3. El **API Server** de Kubernetes es el cerebro que recibe y ejecuta todas las órdenes de orquestación. Si el equipo de IT deja el API Server expuesto al internet público sin requerir Tokens de Autenticación (Fase 15), describe un escenario de **Cryptojacking** y su impacto financiero letal.
4. Explica la función del sistema **RBAC** en Kubernetes. Si no existiera RBAC, ¿Por qué un simple empleado del equipo de Soporte Técnico tendría el mismo poder destructivo que el Administrador Principal (Root) de la Nube?
