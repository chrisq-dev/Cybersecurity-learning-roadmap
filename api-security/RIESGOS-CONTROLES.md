---
title: "Riesgos y Controles de API: Hackeando al Mesero"
---
# Riesgos y Controles de API: Hackeando al Mesero

## Objetivo de esta Guía

Aprender la vulnerabilidad número 1 de las APIs en el mundo entero (BOLA) y cómo el equipo defensivo utiliza pulseras criptográficas para detenerla.

Las APIs son maravillosas porque conectan sistemas mundiales en milisegundos, pero al quitar la interfaz gráfica para el usuario, los desarrolladores suelen olvidar ponerle candados a las peticiones invisibles de las máquinas.

---

## 1. El Riesgo #1: BOLA (Broken Object Level Authorization)

* **La Analogía:** Llegas a un teatro de lujo durante el invierno. Vas al Guardarropa y entregas tu chaqueta. El empleado te da un ticket de papel con el número `15`. 
 Al final de la obra, tú miras el ticket `15`. Decides sacar un bolígrafo de tu bolsillo, tachar el 15 y escribir `16`. 
 Le entregas el ticket alterado al empleado. El empleado es una API mal programada: ve el número 16, **no te pide tu identificación para confirmar**, va al armario, y te entrega el costoso abrigo de visón de otra persona. Acabas de robar el objeto de alguien más cambiando un número.

**El Ataque BOLA en la vida real:**
Abres la App de tu banco. Para ver el saldo de tu propia cuenta, la App le manda este mensaje JSON invisible al Mesero (La API):
```json
{
 "usuario": "Juan",
 "accion": "ver_saldo",
 "cuenta_id": 15
}
```
La API te responde con tus 50 dólares.
El Hacker toma el control, intercepta el mensaje antes de que salga del celular, y con un teclado cambia el `"cuenta_id": 15` por `"cuenta_id": 16`. 

Si el programador del banco construyó una API ingenua (El empleado del guardarropa tonto), la API no verificará si el usuario "Juan" es realmente el dueño de la cuenta 16. La API simplemente obedecerá y le entregará al hacker el saldo del cliente 16 (Un millón de dólares). 

BOLA es la causa principal de las filtraciones masivas de datos en empresas modernas (OWASP API #1).

---

## 2. Los Escudos Defensivos (Controles)

Para arreglar al empleado del guardarropa y al Mesero, la industria usa dos mecanismos principales.

### Rate Limiting (Límite de Tasa)
* **La Analogía:** El Cantinero del bar que dice *"No te voy a servir más de 2 cervezas por minuto"*.
* **La Función:** Un hacker necesita adivinar tu contraseña. Le lanza 5,000 peticiones JSON a la API de inicio de sesión por segundo (Fuerza Bruta). Si la API tiene configurado un *Rate Limit*, después de la 5ta petición errónea en un minuto, la API bloquea la dirección IP del hacker temporalmente. Detiene el ataque de tajo.

### Tokens JWT (JSON Web Tokens)
* **La Analogía:** El sello de luz ultravioleta que te ponen en la mano en los festivales VIP.
* **La Función:** Es la evolución de la Autenticación y Autorización. 
 Cuando inicias sesión con tu contraseña, la API te devuelve un archivo de texto gigantesco llamado JWT. Este Token tiene adentro tu nombre ("Juan") y tus permisos ("No puede ver la cuenta 16"), y está **Firmado Criptográficamente** con la llave privada del servidor.
 En cada orden que le das al mesero, le tienes que mostrar tu sello VIP (El JWT). Si intentas falsificar el ticket de guardarropa para robarte el abrigo 16, el mesero lee tu JWT, ve la firma digital, dice *"Tu sello no te autoriza a abrir la cuenta 16"*, y rechaza el ataque BOLA al instante.

---

## 3. Criterio de Dominio (Autoevaluación)

Revisa si puedes asegurar el tráfico invisible de las máquinas:

1. Un hacker descubre que al cambiar el número en la URL de una tienda web de `tienda.com/api/pedido/40` a `tienda.com/api/pedido/41`, puede descargar la factura de compra de otro cliente, exponiendo su tarjeta de crédito. Usando la analogía del Ticket de Guardarropa, explica por qué la API permitió este ataque y cómo se llama esta vulnerabilidad.
2. ¿Por qué el uso del "Saneamiento de Entradas" (Input Sanitization, que aprendimos Anteriormente para evitar Inyecciones SQL) **no** sirve para detener un ataque BOLA? (Pista: Analiza si el dato que manda el hacker es código malicioso o es un número completamente legal).
3. Estás diseñando la API de inicio de sesión (Login) de tu empresa. Explica cómo la implementación de un mecanismo estricto de **Rate Limiting** destruye financieramente la viabilidad de un ataque de Fuerza Bruta.
4. El contenido de un **Token JWT** (Ej. `"rol": "usuario_normal"`) viaja por internet en texto codificado, lo que significa que el hacker puede decodificarlo y leerlo fácilmente. Si esto es así, ¿Por qué el hacker no puede simplemente borrar la palabra `"usuario_normal"` de su propio Token, escribir `"Administrador"`, y engañar a la API para ganar control total del sistema? (Recuerda las fases anteriores Criptografía).
