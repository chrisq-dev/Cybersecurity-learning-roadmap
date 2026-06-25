---
title: "Autenticación vs Autorización: Robando Llaves Ajenas"
tiempo_estimado: "5 min"
minutos_lectura: 5
secciones: 5
---
# Autenticación vs Autorización: Robando Llaves Ajenas

## Objetivo del Módulo

Entender por qué el "Control de Acceso Roto" (Broken Access Control) se ha convertido en el Error #1 del mundo en el ranking de OWASP.

Los programadores de hoy en día son buenos usando contraseñas complejas. Lo que hacen terriblemente mal es verificar quién eres una vez que ya entraste al sistema. Confundir la diferencia entre **Autenticación** y **Autorización** es lo que permite que un estudiante de primaria con un navegador web pueda robar la base de datos de millones de pacientes de un hospital moderno.

---

## 1. El Concepto: La Discoteca

Para que nunca lo olvides, usaremos la analogía de la Discoteca Exclusiva.

*   **Autenticación (Authentication - AuthN):** Es el Guardia de Seguridad en la puerta de la calle. Te pide tu ID y confirma que la foto coincida con tu cara. Si coincide, te deja entrar al edificio. *(Eres quien dices ser).*
*   **Autorización (Authorization - AuthZ):** Es el Cadenero de la Sala VIP en el segundo piso. Tú ya estás adentro de la discoteca (ya pasaste la Autenticación), pero cuando intentas subir al segundo piso, el cadenero te detiene y dice: *"Tu pulsera es normal. Aquí solo entran VIPs. Acceso Denegado"*. *(Tienes permiso para hacer esto).*

### El Error Común:
Los programadores novatos instalan al guardia de seguridad de la calle (Pantalla de Login con Usuario y Contraseña), pero se les olvida poner cadeneros VIP en las puertas internas. El programador asume ciegamente: *"Bueno, si ya logró entrar al edificio, significa que es un tipo bueno, hay que dejarlo pasear por donde quiera"*.

---

## 2. Insecure Direct Object Reference (IDOR)

El tipo más infame, simple y destructivo de "Autorización Rota" se llama **IDOR** (Referencia Insegura a Objetos Directos). Ocurre cuando el servidor asume que si pides un archivo, es porque te pertenece.

**El Escenario:**
Inicias sesión en tu cuenta de un Banco. Le das clic al botón de "Ver mi estado de cuenta de este mes". El sistema te muestra un archivo PDF con tus gastos.

Si miras la URL arriba en tu navegador (El Mesero), ves algo como esto:
`banco.com/ver_pdf?recibo_id=100`

### El Ataque (IDOR):
Un Hacker no necesita escribir código maligno ni inyectar virus. Simplemente da clic en la URL, borra el número `100`, escribe el número `101`, y presiona Enter.

`banco.com/ver_pdf?recibo_id=101`

**¿Qué pasa en la cocina (El Backend)?**
El Servidor recibe la orden. Verifica que el hacker tiene una sesión iniciada válida (Autenticación), así que dice: *"Okay, estás logueado. Quieres el recibo 101. ¡Aquí lo tienes!"*.
El Servidor **olvidó** preguntarle al cadenero VIP: *"Espera, este hacker tiene la sesión iniciada, pero... ¿el recibo 101 le pertenece a él, o le pertenece al CEO de la empresa?"*.

Al cambiar un simple número en la URL, el hacker acaba de robar los estados de cuenta bancarios de cada uno de los clientes del banco (102, 103, 104...). Sin tirar una sola línea de código, vulneró a la empresa entera.

---

## 3. Escalada de Privilegios

El Control de Acceso Roto no solo sirve para robar PDFs ajenos. Sirve para volverse Administrador (El Dueño de la Discoteca).

A veces, las páginas web tienen menús ocultos. Cuando inicias sesión como Usuario Normal, el menú dice:
- Ver Perfil
- Ver Facturas

Cuando el Administrador inicia sesión, el menú dice:
- Ver Perfil
- Ver Facturas
- Borrar Usuarios (Botón Peligroso)

### Security by Obscurity (El Escondite)
Un programador malo simplemente **esconde** el botón de "Borrar Usuarios" para que los clientes normales no lo vean en su pantalla. Piensa que si no lo ves, no puedes darle clic.

Pero el Hacker sabe cómo piensa un programador. El Hacker intercepta el tráfico web y le escribe una petición manual (POST) al mesero:
`POST /admin/borrar_usuario`

El Servidor recibe la orden. Como el Servidor no tiene un Cadenero VIP en la puerta trasera, dice: *"Oh, alguien me mandó la orden de borrar a un usuario. Okay, lo borraré"*. El Hacker, con su cuenta de cliente gratuita, acaba de borrar a los usuarios del sistema.

**La Regla de Oro:** Ocultar botones en la interfaz gráfica (Frontend) **jamás** es seguridad. El servidor trasero (Backend) debe desconfiar de CADA maldita orden que recibe, y verificar si la cuenta que la envía tiene el rol requerido para hacerlo en ese mismo milisegundo.

---

## 4. Criterio de Dominio (Autoevaluación)

Revisa si tu mente ya distingue entre Guardia y Cadenero:

1. ¿Un ataque de IDOR (cambiar números en la URL) es un fallo en la Autenticación o un fallo en la Autorización? Justifica.
2. Entras a la página de tu Universidad. Para ver tu boleta de calificaciones, la URL es `universidad.com/boleta?alumno_id=5000`. Al cambiar el número a `5001`, la página te devuelve una boleta, pero en blanco o con un error. Sin embargo, al cambiar el número a `5002`, te devuelve la boleta de tu amigo con todas sus calificaciones. ¿Qué error crítico de programación cometió el Backend?
3. ¿Por qué depender del código HTML/JavaScript (Frontend) para ocultar el botón rojo de "Borrar Base de Datos" a los usuarios normales es una técnica de defensa inútil contra un hacker profesional?
4. En términos de Severidad, si un atacante descubre un IDOR en un foro que le permite leer los "Borradores de Post" de otros usuarios antes de que los publiquen, versus un IDOR en un Banco que le permite leer las "Tarjetas de Crédito", ¿Ambos ataques tienen la misma gravedad corporativa? ¿Por qué?
