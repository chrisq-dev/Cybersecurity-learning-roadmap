# Fundamentos de la Nube: La Computadora de Alguien Más

## Objetivo del Módulo

Destruir la ilusión de que la "Nube" es un ente mágico y etéreo, y entender la vulnerabilidad más grande y peligrosa de migrar los servidores de tu empresa a Amazon, Google o Microsoft.

Hace 15 años (On-Premise), si una empresa quería una página web, tenía que comprar un servidor físico de metal de $5,000 USD, ponerlo en un cuarto con aire acondicionado y contratar a un guardia de seguridad. Hoy, abren una cuenta en Amazon (AWS), le dan clic a un botón, y en 30 segundos Amazon les "presta" un servidor virtual en otro país por $5 dólares al mes.
Esa es la Nube: **La computadora de alguien más.**

---

## 1. La Analogía: Construir tu Casa vs Rentar un Hotel

Para entender la seguridad en la nube, debes entender los 3 modelos de servicio.

### A. Infraestructura como Servicio (IaaS)
*   **La Analogía:** Rentas un terreno vacío con paredes y techo.
*   *Tecnología:* Amazon te presta un Servidor Linux completamente vacío (EC2). Tú tienes que instalarle la puerta, los muebles (Base de datos), la plomería (Redes) y pintarlo (El código).
*   *Seguridad:* Tú eres responsable de casi todo. Si te hackean porque tu base de datos no tenía contraseña, es 100% tu culpa.

### B. Plataforma como Servicio (PaaS)
*   **La Analogía:** Rentas un departamento amueblado.
*   *Tecnología:* Amazon te dice: *"No te preocupes por instalar Linux ni la base de datos. Toma esta base de datos mágica (RDS) que ya funciona. Solo mete tus datos"*.
*   *Seguridad:* Amazon se encarga de que la base de datos no tenga virus de sistema operativo. Tú solo te encargas de que las contraseñas de tus usuarios sean fuertes.

### C. Software como Servicio (SaaS)
*   **La Analogía:** Pagas una noche en un Hotel de Lujo de 5 Estrellas (All Inclusive).
*   *Tecnología:* Google Mail (Gmail) o Netflix. Tú no sabes qué servidor usan, ni te importa. Solo entras, consumes el servicio y te vas.
*   *Seguridad:* Google se encarga del 99% de la seguridad. Tu única responsabilidad es no darle tu contraseña de Gmail a un estafador.

---

## 2. El Modelo de Responsabilidad Compartida

Si hay un solo concepto que debes memorizar en este módulo para no ir a prisión, es el **Modelo de Responsabilidad Compartida (Shared Responsibility Model)**.

Cuando una empresa migra a AWS y es hackeada a la semana siguiente, el CEO de la empresa siempre sale a la prensa a decir: *"Amazon fue hackeado, es culpa de la Nube"*. 
Esto es falso en el 99.9% de los casos.

**La Regla de Oro:**
*   **Amazon (El Dueño del Hotel):** Es responsable de la Seguridad **DE** la Nube. (Security OF the Cloud). Asegurar que los muros físicos del edificio no se caigan, que no haya goteras, y que los cables eléctricos no se quemen.
*   **Tú (El Cliente):** Eres responsable de la Seguridad **EN** la Nube. (Security IN the Cloud). Si tú rentas la Habitación 402, y al salir a caminar dejas la puerta abierta de par en par con todo tu dinero en la cama, y alguien entra y te roba... **El Hotel no te va a pagar ni un centavo**.

Los hackers no atacan los muros físicos de Amazon. Los hackers usan escáneres en internet buscando a los miles de clientes tontos que dejan sus "Habitaciones 402" con las puertas abiertas de par en par (Configuraciones por Defecto Inseguras).

---

## 3. El Paradigma de las APIs (No hay cables que cortar)

En un ataque tradicional (On-Premise), si un hacker se vuelve loco, el administrador de la empresa puede correr al cuarto de servidores y arrancar el cable de red de la pared físicamente.

En la nube, no tienes acceso físico. TODO el control del edificio se hace a través de un Panel de Control Web y **Llaves API (API Keys)**.
Una Llave API es un texto largo (ej. `AKIAIOSFODNN7EXAMPLE`) que le dice a Amazon: *"Soy el dueño de la empresa, obedece mis órdenes"*.

Si un hacker se roba esa llave de texto (porque un programador la subió por accidente a GitHub), el hacker no necesita romper ningún firewall. Simplemente le escribe a Amazon y le dice: *"Hola Amazon, soy el dueño. Borra todos los servidores de la empresa"*. 

**El Hacking en la Nube es Hacking de Identidad, no Hacking de Redes.**

---

## 4. Criterio de Dominio (Autoevaluación)

Revisa si entiendes a quién culpar en un hackeo:

1. El servidor de la base de datos de tu empresa está alojado en una máquina virtual de AWS (Modelo IaaS). Un hacker descubre que el software del servidor web (Apache) estaba desactualizado desde hace 3 años, entra y roba los datos. ¿Quién tiene la responsabilidad legal de este fallo según el Modelo de Responsabilidad Compartida, Amazon o la Empresa? Justifica.
2. Contratas un servicio de Google Drive (SaaS) para guardar archivos. Un hacker no ataca a Google, sino que adivina la contraseña `12345` de tu jefe y descarga los archivos. ¿Por qué Google no puede ser demandado por esta filtración de datos?
3. ¿Por qué el robo de una `API Key` con permisos administrativos en la nube es infinitamente más devastador para una empresa moderna que el robo físico de una computadora de escritorio en sus oficinas?
4. Un amigo te dice: *"Alojé mi página web en Microsoft Azure, así que ya no necesito configurar un Firewall ni preocuparme por la Inyección SQL, porque Microsoft me defiende"*. ¿Por qué tu amigo está a punto de perder su negocio?
