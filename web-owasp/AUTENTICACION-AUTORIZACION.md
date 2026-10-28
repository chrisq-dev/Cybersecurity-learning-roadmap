---
title: "Autenticación vs Autorización: La Discoteca y los Cadeneros"
level: "inicial"
content_type: "guia"
updated: "2026-06-29"
---

# Autenticación vs Autorización: La Discoteca y los Cadeneros

## Objetivo de esta Guía

Entender por qué el "Control de Acceso Roto" se ha convertido en el Error #1 del mundo en el ranking de OWASP. Los programadores de hoy son buenos usando contraseñas complejas. Lo que hacen terriblemente mal es verificar quien eres una vez que ya entraste al sistema.

Confundir la diferencia entre Autenticación y Autorización es lo que permite que un estudiante de secundaria con un navegador web pueda robar la base de datos de millones de pacientes de un hospital moderno.

Esta guía no solo explica la teoría. Cubre los patrones de ataque más comunes (IDOR, escalada de privilegios, broken access control en APIs) y las defensas prácticas que todo desarrollador debería implementar. La guía conecta fallos de autorización frecuentes con controles que deben aplicarse en cada solicitud del backend.

## El Concepto Fundamental: AuthN vs AuthZ

Para que nunca lo olvides, usaremos la analogía de la Discoteca Exclusiva.

**Autenticación (Authentication - AuthN):** Es el Guardia de Seguridad en la puerta de la calle. Te pide tu ID y confirma que la foto coincida con tu cara. Si coincide, te deja entrar al edificio. Eres quien dices ser.

**Autorización (Authorization - AuthZ):** Es el Cadenero de la Sala VIP en el segundo piso. Tu ya estas adentro de la discoteca (ya pasaste la Autenticación), pero cuando intentas subir al segundo piso, el cadenero te detiene y dice: "Tu pulsera es normal. Aquí solo entran VIPs. Acceso Denegado." Tienes permiso para hacer esto.

### El Error Más Común

Los programadores novatos instalan al guardia de seguridad de la calle (Pantalla de Login), pero se les olvida poner cadeneros VIP en las puertas internas. El programador asume ciegamente: "Bueno, si ya logró entrar al edificio, significa que es un tipo bueno, hay que dejarlo pasear por donde quiera."

Este error es tan común que OWASP lo catálogo como A01: Broken Access Control en su Top 10 2021. No es un error nuevo, pero es el que más daño causa hoy en día porque:
- No hay herramienta automática que lo prevenga.
- Depende completamente de la lógica del programador.
- Los frameworks de desarrollo no lo resuelven por defecto.

## Insecure Direct Object Reference (IDOR)

El tipo más infame, simple y destructivo de "Autorización Rota" se llama IDOR (Referencia Insegura a Objetos Directos). Ocurre cuando el servidor asume que si pides un archivo, es porque te pertenece.

### El Escenario

Inicias sesión en tu cuenta de un Banco. Le das clic al botón de "Ver mi estado de cuenta de este mes". El sistema te muestra un archivo PDF con tus gastos.

Si miras la URL arriba en tu navegador, ves algo como esto:
```
banco.com/ver_pdf?recibo_id=100
```

### El Ataque (IDOR)

Un Hacker no necesita escribir código maligno ni inyectar virus. Simplemente da clic en la URL, borra el número 100, escribe el número 101, y presiona Enter.

```
banco.com/ver_pdf?recibo_id=101
```

**Que pasa en la cocina (El Backend)?**

El Servidor recibe la orden. Verifica que el hacker tiene una sesión iniciada (Autenticación), así que dice: "Okay, estas logueado. Quieres el recibo 101. Aquí lo tienes!"

El Servidor olvido preguntarle al cadenero VIP: "Espera, este hacker tiene la sesión iniciada, pero el recibo 101 le pertenece a el, o le pertenece al CEO de la empresa?"

Al cambiar un simple número en la URL, el hacker acaba de robar los estados de cuenta bancarios de cada uno de los clientes del banco (102, 103, 104...). Sin tirar una sola línea de código, vulneró la empresa entera.

### Donde Encontrar IDOR

Los IDORs aparecen en cualquier parámetro que identifiqué un recurso:

- IDs numéricos en URLs: `/usuario/5`, `/factura/1234`
- IDs en cuerpos JSON: `{"orden_id": 456}`
- Nombres de archivos: `/documentos/factura-juan.pdf`
- Tokens débiles: `{"token": "abc123"}` donde el token es predecible
- Parámetros en POST ocultos: `<input type="hidden" name="user_id" value="5">`

### IDOR Horizontal vs Vertical

**IDOR Horizontal:** El atacante accede a recursos de usuarios del mismo nivel. Ejemplo: un usuario normal ve las facturas de otro usuario normal.

**IDOR Vertical (Escalada de Privilegios):** El atacante accede a recursos de un nivel superior. Ejemplo: un usuario normal accede a funciones de administrador.

Ambos son fallos de autorización, pero el vertical es generalmente más severo.

## Escalada de Privilegios

El Control de Acceso Roto no solo sirve para robar PDFs ajenos. Sirve para volverse Administrador (el Dueño de la Discoteca).

### Security by Obscurity (El Escondite)

Un programador malo simplemente esconde el botón de "Borrar Usuarios" para que los clientes normales no lo vean en su pantalla. Piensa que si no lo ves, no puedes darle clic.

Pero el Hacker sabe como piensa un programador. El Hacker intercepta el tráfico web y le escribe una petición manual (POST) al mensajero:

```
POST /admin/borrar_usuario
Host: empresa.com
Cookie: session=normal_user_123
```

El Servidor recibe la orden. Como el Servidor no tiene un Cadenero VIP en la puerta trasera, dice: "Oh, alguien me mando la orden de borrar a un usuario. Okay, lo borraré." El Hacker, con su cuenta de cliente gratuita, acaba de borrar a un usuario del sistema.

**La Regla de Oro:** Ocultar botones en la interfaz gráfica (Frontend) jamás es seguridad. El servidor trasero (Backend) debe desconfiar de CADA orden que recibe, y verificar si la cuenta que la envía tiene el rol requerido para hacerlo en ese mismo milisegundo.

### Tipos de Escalada de Privilegios

**Escalada Vertical:** De usuario normal a administrador. El atacante obtiene acceso a funcionalidades restringidas.

**Escalada Horizontal:** De usuario normal a otro usuario normal. El atacante accede a los datos de otro usuario.

**Escalada por Manipulación de Token:** El atacante modifica un token JWT o cookie para cambiar su rol:

```json
// Token original (decodificado)
{"user": "juan", "rol": "usuario", "iat": 123456}

// Token manipulado
{"user": "juan", "rol": "administrador", "iat": 123456}
```

Si el servidor no verifica la firma del JWT, el atacante puede cambiar su rol.

### Path Traversal como Escalada

A veces la escalada de privilegios no es sobre roles sino sobre rutas. El atacante accede a archivos fuera del directorio permitido.

```
https://empresa.com/descargar?archivo=../../etc/passwd
```

Esto no es estrictamente autorización, pero es un fallo de control de acceso a nivel de archivos.

## Mass Assignment (Asignación Masiva)

Ocurre cuando un framework automáticamente mapea los parámetros de una petición a los campos de un objeto en la base de datos. Si el desarrollador no específica que campos pueden ser asignados, el atacante puede modificar campos que no debería.

**Ejemplo:**

Una API para actualizar el perfil de usuario:

```json
// Peticion esperada
{"nombre": "Juan", "email": "juan@nuevo.com"}

// Peticion modificada por el atacante
{"nombre": "Juan", "email": "juan@nuevo.com", "rol": "administrador"}
```

Si el servidor mapea todos los campos del JSON directamente al modelo de usuario sin filtrar, el atacante se auto-asigna el rol de administrador.

**Defensa:** Usar DTOs (Data Transfer Objects) que especifican exactamente que campos se pueden modificar. Nunca pasar el cuerpo de la petición directamente al modelo de base de datos.

## Broken Access Control en APIs

Las APIs son particularmente vulnerables a Broken Access Control porque:

1. No tienen interfaz gráfica, por lo que no hay "botones ocultos" que den pistas.
2. Los endpoints son directos y fáciles de enumerar.
3. Los desarrolladores frecuentemente olvidan poner controles de acceso en endpoints nuevos.
4. Las APIs usan tokens (JWT, API keys) que pueden ser robados o manipulados.

**Ejemplo común:**

Una API bancaria tiene estos endpoints:
- `GET /api/cuentas` -- Lista mis cuentas
- `GET /api/cuentas/1234` -- Detalle de mi cuenta 1234
- `POST /api/transferir` -- Realizar una transferencia

Si el desarrollador verifica la autenticación (token válido) pero no la autorización (el token pertenece al dueño de la cuenta 1234), cualquier usuario autenticado puede ver cualquier cuenta.

**Aprende más en:** La guía completa de riesgos de API en `api-security/RIESGOS-CONTROLES.md`.

## El Principio de Menor Privilegio

Es la filosofía de seguridad que dice: un usuario (o un proceso) debe tener solo los permisos mínimos necesarios para realizar su trabajo, y nada más.

**Aplicación práctica:**

- Un usuario normal no debería poder ver la lista de todos los usuarios del sistema.
- Un usuario normal no debería poder borrar posts que no son suyos.
- Un usuario normal no debería poder cambiar su propio rol.
- Un usuario normal no debería poder acceder a la consola de administración.

**En el código:**

Cada función del Backend debe verificar explícitamente si el usuario actual tiene permiso para realizar la acción solicitada. No asumas nada.

```python
def borrar_usuario(id_usuario_a_borrar):
    usuario_actual = obtener_usuario_de_sesion()

    # Verificar autorizacion EXPLICITA
    if usuario_actual.rol != 'admin':
        return error("No tienes permiso para borrar usuarios")

    # Ejecutar la accion
    db.borrar_usuario(id_usuario_a_borrar)
```

## Modelos de Control de Acceso

Existen varios modelos para implementar autorización. Cada uno tiene sus casos de uso y vulnerabilidades.

### RBAC (Role-Based Access Control)

RBAC parece simple, pero su mantenimiento se complica cuando los roles crecen sin revisión ni criterios claros.

El más común. Los usuarios tienen roles. Los roles tienen permisos.

**Ejemplo:** Roles: `usuario`, `moderador`, `admin`

- `usuario` puede: editar su perfil, crear posts, ver posts públicos
- `moderador` puede: editar cualquier post, borrar posts, banear usuarios
- `admin` puede: todo

**Vulnerabilidades comunes:**
- Escalada de rol no verificada
- Roles mal configurados
- Un usuario puede tener múltiples roles y la lógica de unión de permisos es incorrecta

### ABAC (Attribute-Based Access Control)

El acceso se concede basado en atributos del usuario, del recurso, y del contexto.

**Ejemplo:** "Un usuario puede editar un post si y solo si el usuario es el autor del post O el usuario tiene rol 'admin'."

**Ventaja:** Mucho más granular que RBAC.
**Desventaja:** Más complejo de implementar y mantener.

### ACL (Access Control Lists)

Cada recurso tiene una lista de usuarios y sus permisos.

**Ejemplo:** `post:123` -> `{juan: leer, editar}, maria: leer, admin: todo}`

**Vulnerabilidad:** Las ACLs son difíciles de mantener a escala. Si la lista de usuarios cambia frecuentemente, las ACLs se vuelven obsoletas.

## Defensas Contra Broken Access Control

La defensa contra Broken Access Control no es técnica, es arquitectónica. No hay una librería que puedas instalar y olvidarte. Es una disciplina de programación.

### Patrón de Verificación Centralizada

Crea una función o middleware central que verifique la autorización para cada acción sensible. No disperses la lógica de autorización por todo el código.

```python
def requiere_permiso(permiso):
    def decorator(func):
        def wrapper(*args, **kwargs):
            usuario = obtener_usuario_actual()
            if not usuario.tiene_permiso(permiso):
                return error("No autorizado", 403)
            return func(*args, **kwargs)
        return wrapper
    return decorator

@requiere_permiso('borrar_usuarios')
def borrar_usuario(id):
    # ...
```

### No Exponer IDs Directos

En lugar de usar IDs numéricos secuenciales en las URLs, usa identificadores opacos (UUIDs, hashes, slugs).

**Mal:** `/api/factura/1234`
**Bien:** `/api/factura/a1b2c3d4-e5f6-7890-abcd-ef1234567890`

Un UUID no es seguridad por si mismo (si el atacante lo obtiene, puede acceder igual), pero hace que la enumeración sea impracticable. No puedes adivinar UUIDs como puedes adivinar IDs secuenciales.

### Verificación de Propiedad (Ownership Check)

Cada vez que un usuario accede a un recurso, verifica que el recurso le pertenece.

```python
def ver_factura(id_factura):
    factura = db.facturas.obtener(id_factura)
    usuario = obtener_usuario_actual()

    if factura.usuario_id != usuario.id and usuario.rol != 'admin':
        return error("No tienes permiso para ver esta factura", 403)

    return factura
```

Este chequeo debe hacerse en CADA endpoint que acceda a recursos de usuarios, no solo en algunos.

### Pruebas de Autorización Automáticas

Escribe pruebas automatizadas que verifiquen la autorización:

```
Test: Usuario A intenta ver factura del Usuario B -> debe recibir 403
Test: Usuario no autenticado intenta ver factura -> debe recibir 401
Test: Admin ve factura de cualquier usuario -> debe recibir 200
Test: Usuario A ve su propia factura -> debe recibir 200
```

Estas pruebas son tan importantes como las pruebas de funcionalidad.

### Rate Limiting en Endpoints Sensibles

Los endpoints de autenticación y autorización deben tener rate limiting para prevenir ataques de fuerza bruta.

## Casos Reales de Broken Access Control

**Caso Facebook (2018):** Un investigador descubrió que podía acceder a cualquier cuenta de Facebook simplemente modificando un parámetro en la respuesta del servidor durante el flujo de "olvide mi contraseña". Podía leer mensajes privados, fotos, y publicaciones de cualquier usuario. Facebook pago $40,000 en bug bounty.

**Caso Parler (2021):** Después del asalto al Capitolio de EE.UU., activistas descargaron videos de Parler que mostraban evidencia del evento. Parler tenía un IDOR masivo: los videos públicos tenían IDs numéricos secuenciales. Los activistas simplemente iteraron sobre los IDs y descargaron miles de videos que los usuarios habían marcado como privados pero que la API no verificaba la autorización.

**Caso T-Mobile (2022):** Un atacante encontró una API interna de T-Mobile que no requería autenticación. Podía consultar cualquier número de teléfono y obtener información personal del cliente. No era un IDOR clásico pero era un fallo de control de acceso total.

## Modos de Falla con Autenticación/Autorización

**Confiar en el Frontend para decisiones de acceso.** Si el Frontend oculta un botón pero el Backend no verifica el permiso, el atacante bypassea el Frontend.

**No validar la propiedad del recurso.** Asumir que si el usuario esta autenticado, todo lo que pide le pertenece.

**Usar IDs secuenciales o predecibles.** Facilita la enumeración de recursos.

**JWT sin verificar la firma.** El atacante puede modificar cualquier campo del token.

**No cerrar sesión en el servidor.** Si la sesión solo se cierra en el Frontend (borrando el token del cliente), el token robado sigue siendo válido.

**Permisos por defecto demasiado abiertos.** Crear nuevos usuarios con permisos de administrador por defecto.

**No invalidar tokens/sesiones ante cambios de permisos.** Si un usuario pierde el rol de admin, su token actual debería invalidarse inmediatamente.

## Autoevaluación

1. Un ataque de IDOR (cambiar números en la URL) es un fallo en la Autenticación o en la Autorización? Justifica tu respuesta.

2. Entras a la página de tu Universidad. Para ver tu boleta de calificaciones, la URL es `universidad.com/boleta?alumno_id=5000`. Al cambiar el número a `5001`, la página te devuelve un error. Pero al cambiar a `5002`, te devuelve la boleta de tu amigo con todas sus calificaciones. Que error crítico de programación cometió el Backend?

3. Por qué depender del código HTML/JavaScript (Frontend) para ocultar el botón rojo de "Borrar Base de Datos" a los usuarios normales es una defensa inútil contra un hacker profesional?

4. En términos de Severidad, si un atacante descubre un IDOR en un foro que le permite leer los "Borradores de Post" de otros usuarios antes de que los publiquen, versus un IDOR en un Banco que le permite leer las "Tarjetas de Crédito", ambos ataques tienen la misma gravedad corporativa? Explica.

5. Explica la diferencia entre Escalada de Privilegios Horizontal y Vertical. Da un ejemplo de cada uno.

6. Un equipo de desarrollo implementa RBAC con tres roles: `usuario`, `editor`, `admin`. Descubres que cuando un `usuario` solicita cambiar su propio rol a `admin` vía API, el servidor lo permite. Que falla de autorización específica esta ocurriendo y como se llama?

7. Tu aplicación usa UUIDs para los IDs de los recursos en lugar de números secuenciales. Un desarrollador argumenta que "como los UUIDs no son adivinables, no necesitamos verificar la propiedad del recurso". Por qué esta lógica es peligrosa?

8. Durante una auditoría de código, encuentras el siguiente fragmento en el Backend de una aplicación de mensajería:

```python
def leer_mensaje(id_mensaje):
    mensaje = db.mensajes.obtener(id_mensaje)
    return mensaje.contenido
```

Que vulnerabilidad de autorización tiene este código y como la corregirías?
