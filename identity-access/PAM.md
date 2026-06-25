# PAM (Privileged Access Management): La Bóveda Nuclear

## Objetivo del Módulo

Aprender cómo proteger a los "Dioses" de la red corporativa.

En el módulo anterior (IAM) hablamos de empleados normales como la recepcionista o el de ventas. Pero en toda empresa existe un pequeño grupo de humanos (El equipo de IT / Administradores de Sistemas) cuyas cuentas tienen poder absoluto.
*   Si le robas la contraseña al de ventas, puedes leer el Excel de los clientes.
*   Si le robas la contraseña al Administrador de Red (Domain Admin), **eres el dueño de la empresa entera**. Puedes borrar servidores, apagar el Antivirus, y robar bases de datos encriptadas.

Por eso, los hackers profesionales dedican el 90% de su tiempo a robar credenciales de Administradores. A esto se le llama **Movimiento Lateral** y **Escalada de Privilegios**.

---

## 1. El Problema: El Post-it en el Monitor

Históricamente, el Administrador de Sistemas creaba una sola cuenta en el Servidor Maestro con la contraseña `PasswordSuperFuerte123!`.
Para no olvidarla, el Administrador la anotaba en un *Post-it* amarillo debajo de su teclado, o peor aún, usaba esa misma contraseña gigante para iniciar sesión en su laptop de uso diario.

*   **El Ataque:** El hacker le hace Phishing a la recepcionista. Entra a su computadora. Desde la computadora de la recepcionista, el hacker explora la red en silencio (Movimiento Lateral). Descubre que el Administrador dejó su sesión iniciada en la red local. El hacker usa una herramienta como *Mimikatz* (Visto en Forense de Memoria), extrae la contraseña gigante de la memoria RAM del Administrador, y automáticamente gana el juego. (Ataque *Pass-The-Hash*).

---

## 2. La Solución: La Bóveda Nuclear (PAM)

Para detener esta masacre, las corporaciones implementan sistemas de **PAM (Privileged Access Management)** (Ej. *CyberArk*, *BeyondTrust*).

*   **La Analogía:** Los Códigos de Lanzamiento Nuclear y la Bóveda de Titanio.
El Administrador de Sistemas moderno **NO CONOCE** la contraseña del Servidor Maestro. Es imposible que la anote en un *Post-it* porque no sabe cuál es.

1.  **La Custodia:** El sistema PAM inventa una contraseña de 120 caracteres aleatorios (`&4#Lp9...`) y la guarda adentro de una Bóveda Cibernética ultra blindada. El servidor maestro se configura para que solo acepte esa contraseña absurda.
2.  **El Chequeo (Checkout):** Son las 3:00 PM y el Administrador necesita reiniciar el servidor. El Administrador entra al portal del sistema PAM y solicita acceso: *"Soy el Admin, necesito entrar al Servidor 5 por motivos de mantenimiento"*.
3.  **La Entrega Temporal:** La Bóveda aprueba la petición. No le muestra la contraseña al Admin, sino que **le inyecta la sesión automáticamente** en su pantalla. El Admin reinicia el servidor.
4.  **La Autodestrucción (Checkin):** El Administrador termina su trabajo a las 3:30 PM y cierra la sesión. Inmediatamente, la Bóveda inventa una contraseña nueva de 120 caracteres diferentes y se la cambia al servidor de forma invisible.

**¿Por qué esto destruye a los Hackers?**
Incluso si el hacker logra infiltrarse en la computadora del Administrador a las 4:00 PM, no encontrará absolutamente nada. La contraseña ya rotó, cambió, y nadie en el mundo humano sabe cuál es la nueva.

---

## 3. Grabación de Sesiones (Session Recording)

Los sistemas PAM modernos incluyen una función de auditoría extrema.
Cuando la Bóveda le concede el acceso al Administrador, el sistema empieza a **grabar en video toda la pantalla** y guarda un registro de cada tecla que presiona en la consola de comandos.

Si a las 3:15 PM el servidor maestro se borra por completo, el equipo forense no tiene que adivinar si fue un virus, o si fue un error humano, o si fue un Sabotaje Interno (Insider Threat). Simplemente abren la Bóveda, reproducen el video del Administrador, y ven exactamente el comando destructivo que tecleó.

---

## 4. Criterio de Dominio (Autoevaluación)

Revisa si puedes proteger el reino:

1. Un hacker logra tomar control de la computadora de un becario de Marketing. Explica qué es el "Movimiento Lateral" y cuál es el objetivo final (la cuenta objetivo) del hacker durante esta fase del ataque.
2. El Administrador de Bases de Datos de tu empresa dice que el sistema PAM "es muy molesto" y propone que simplemente le dejen configurar una contraseña muy compleja (Ej. 30 caracteres) y que él promete guardarla en su mente. Usando el concepto de la "Bóveda Nuclear" y la rotación de claves, explica por qué la propuesta del Administrador sigue siendo un riesgo inaceptable para la empresa.
3. Un ataque de *Pass-The-Hash* (robar una credencial directamente de la Memoria RAM) depende de que la contraseña permanezca estática y válida por mucho tiempo. ¿Cómo mitiga matemáticamente un sistema de *Privileged Access Management* (PAM) este vector de ataque específico?
4. Ocurre una caída masiva del sistema de nóminas el día de pago. El Administrador jura que él solo estaba "leyendo" la configuración y no tocó nada. Si la empresa cuenta con un sistema PAM de nivel empresarial (*Enterprise-Grade*), ¿Qué evidencia exacta buscaría el Analista Forense para comprobar o desmentir la versión del Administrador?
