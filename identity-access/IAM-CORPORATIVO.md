---
title: "IAM Corporativo: La Tarjeta de Hotel"
tiempo_estimado: "4 min"
minutos_lectura: 4
secciones: 4
---
# IAM Corporativo: La Tarjeta de Hotel

## Objetivo del Módulo

Aprender la diferencia exacta entre "Autenticación" y "Autorización". Estos dos conceptos se confunden constantemente, pero en ciberseguridad, confundirlos significa dejar la puerta de la bóveda del banco abierta.

Como dice el famoso dicho de la industria moderna: *"Los hackers ya no rompen las ventanas para entrar; simplemente inician sesión"*. Robar identidades es más barato, más rápido y más silencioso que programar virus.

---

## 1. La Analogía: El Hotel

### Autenticación (¿Quién eres?)
*   **La Analogía:** Llegas a la recepción del hotel a las 3:00 PM. El recepcionista te pide tu **Pasaporte**. Él mira la foto de tu pasaporte y mira tu cara. Si coinciden, él confirma que tú eres, efectivamente, *Juan Pérez*.
*   **En Informática:** Esto es escribir tu Usuario y Contraseña, y poner el código de 6 dígitos que te llega al celular (Autenticación Multi-Factor - MFA). El sistema dice: *"Ok, sí eres el empleado Juan Pérez"*.
*   **El Límite:** Autenticarse **NO** te da permiso de hacer nada. Solo demuestra que eres tú.

### Autorización (¿Qué puedes hacer?)
*   **La Analogía:** Una vez que el recepcionista sabe que eres Juan Pérez, te entrega una **Tarjeta Magnética Blanca**. 
    *   Tú caminas por el pasillo. Pasas la tarjeta por la puerta de la habitación 402, la luz se pone verde y entras (Autorizado). 
    *   Bajas al primer piso e intentas usar la misma tarjeta para abrir la cocina del restaurante. La luz parpadea en rojo y la puerta no se abre (Denegado). 
    *   Tú sigues siendo Juan Pérez, pero **no tienes los permisos** para entrar a la cocina.
*   **En Informática:** Esto se llama **RBAC (Role-Based Access Control)**. El sistema sabe que eres Juan (Ventas), por lo tanto tu tarjeta virtual solo abre la carpeta de *Excel de Clientes*, pero bloquea tu acceso a la carpeta de *Nóminas de Recursos Humanos*.

---

## 2. Active Directory y SSO (Single Sign-On)

En una empresa con 5,000 empleados y 50 sistemas diferentes (Correo, Base de Datos, Intranet, VPN), obligar al empleado a memorizar 50 contraseñas diferentes es un desastre. Terminará anotándolas en un *Post-it* pegado al monitor, y el hacker lo agradecerá.

La solución a esto es centralizar la identidad.

### Directorio Activo (El Gran Libro)
**Active Directory (AD)** (o Entra ID en la nube) es la base de datos maestra de la empresa. Es un libro gigante que contiene el nombre, el departamento y el nivel de acceso de los 5,000 empleados. Si despiden a un empleado, el equipo de IT lo borra de este Gran Libro, y automáticamente pierde acceso a absolutamente todo en 1 segundo.

### SSO: La Pulsera del Parque de Diversiones
**Single Sign-On (SSO)** (Ej. *Okta*, *PingIdentity*) se conecta al Gran Libro.
*   **La Analogía:** Cuando vas a un parque de diversiones, en lugar de hacer fila para sacar la cartera y pagar 5 dólares en la Montaña Rusa, y luego volver a hacer fila para pagar 3 dólares en los Carritos Chocones... pagas una sola vez en la entrada del parque y te ponen una **Pulsera Verde de papel** en la muñeca.
*   **En Informática:** El empleado llega el lunes en la mañana. Escribe su contraseña una sola vez en la intranet de la empresa. El sistema SSO le da un *Token* criptográfico invisible (La Pulsera). Durante el resto del día, el empleado puede abrir el Correo, el CRM y la Base de Datos mágicamente sin tener que volver a escribir contraseñas.

---

## 3. Criterio de Dominio (Autoevaluación)

Revisa si dominas el mundo de la Identidad:

1. El sistema de inicio de sesión de un banco te pide tu nombre de usuario, tu contraseña, y adicionalmente te pide que escanees tu huella dactilar en el celular. ¿A qué fase técnica del IAM corresponde esto: a la Autenticación o a la Autorización?
2. Usando la analogía de la "Tarjeta Magnética del Hotel", explica por qué un empleado del departamento de Marketing (que se validó correctamente en la VPN de la empresa) recibe un mensaje de "Acceso Denegado" al intentar leer un documento en la carpeta de Finanzas.
3. Un empleado es despedido el viernes a las 5:00 PM con carácter inmediato. Gracias a que la empresa utiliza una arquitectura centralizada con **Active Directory**, ¿Por qué el equipo de IT no tiene que entrar a los 50 programas diferentes que usaba el empleado para borrar su cuenta uno por uno?
4. El SSO (Single Sign-On) mejora drásticamente la comodidad del usuario (evita la fatiga de contraseñas). Sin embargo, ¿Cuál es el riesgo catastrófico para la empresa si un hacker logra robar el "Token" o "Pulsera" de la sesión SSO de un Gerente General?
