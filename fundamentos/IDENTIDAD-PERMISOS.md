---
title: "Identidad y Permisos: ¿Quién eres y qué puedes hacer?"
---
# Identidad y Permisos: ¿Quién eres y qué puedes hacer?

## Objetivo del Módulo

Entender por qué probar quién eres (Autenticación) y controlar a dónde puedes entrar (Autorización) es el corazón de la seguridad corporativa moderna.

Si el hardware y el sistema operativo son los muros del castillo, la "Gestión de Identidades" son los guardias de la puerta principal. En la ciberseguridad actual, los atacantes ya no "hackean" para entrar a las empresas rompiendo sistemas súper complejos; simplemente **se roban contraseñas válidas y entran por la puerta grande**. 

En esta guía, aprenderás los conceptos de Identidad y Accesos bajo los estándares corporativos (IAM - Identity and Access Management).

---

## 1. El Marco de Trabajo AAA (La Analogía del Aeropuerto)

Para no confundir términos, los profesionales de seguridad usan el marco "AAA" (Authentication, Authorization, Accounting).
Imagina que vas a viajar en avión.

### 1.1 Autenticación (Authentication): ¿Realmente eres tú?
Es el proceso de demostrar tu identidad al sistema.
*   **En el Aeropuerto:** Llegas al mostrador y entregas tu Pasaporte Oficial. El guardia mira la foto y dice: *"Sí, eres Juan Pérez"*.
*   **En la Computadora:** Cuando escribes tu usuario y tu contraseña en una página web.

### 1.2 Autorización (Authorization): ¿Qué puedes hacer?
Es el proceso de revisar qué permisos tiene la persona que ya fue autenticada.
*   **En el Aeropuerto:** El guardia ya sabe que eres Juan Pérez. Ahora mira tu boleto. Tienes permiso para entrar a la Sala de Espera y subir al Vuelo 404 en Clase Económica. **NO** tienes permiso (no estás autorizado) para subir a Primera Clase, y mucho menos tienes permiso para entrar a la cabina del piloto.
*   **En la Computadora:** Ya iniciaste sesión. El sistema revisa si eres un Usuario Estándar (solo puedes leer archivos) o un Administrador (puedes borrar la base de datos). 

### 1.3 Contabilidad (Accounting / Auditing): ¿Qué hiciste?
Es el proceso de registrar (guardar logs) todas las acciones que hiciste para poder investigarte en el futuro si algo sale mal.
*   **En el Aeropuerto:** El sistema guarda un registro de la hora exacta a la que pasaste por seguridad y el asiento exacto en el que te sentaste.
*   **En la Computadora:** El servidor web guarda un archivo diciendo: *"El usuario Juan Pérez borró el archivo ventas.pdf a las 14:03"*.

> **Advertencia:**
> **Error de Novatos:** Muchas veces la gente dice "Hubo un error de Autenticación" cuando en realidad el usuario sí pudo iniciar sesión, pero le salió un mensaje de "Acceso Denegado" al intentar abrir un archivo. Ese fue un error de **Autorización**. ¡No los confundas!

---

## 2. Autenticación Multifactor (MFA): La Caída de las Contraseñas

Las contraseñas ya no sirven. Así de simple. La gente usa contraseñas como `Otoño2024!` o la misma contraseña para su banco y para el foro de videojuegos. Si el foro de videojuegos es hackeado, los atacantes probarán esa misma contraseña en tu banco (esto se llama *Credential Stuffing*).

Para solucionar esto, inventamos el **MFA (Multi-Factor Authentication)**.
Existen 5 "Factores" para probar tu identidad. Un buen MFA debe usar al menos **DOS DE DIFERENTES TIPOS**.

1.  **Algo que sabes (Knowledge):** Una contraseña, un PIN, la respuesta a una pregunta secreta ("¿Cuál fue el nombre de tu primer perro?").
2.  **Algo que tienes (Possession):** Tu teléfono celular (donde recibes un código de Google Authenticator), una tarjeta magnética, o una llave física USB (como YubiKey).
3.  **Algo que eres (Inherence):** Tu huella dactilar, el escáner de tu cara (FaceID), tu retina. (Biometría).
4.  **Algo que haces (Behavior):** El patrón de cómo tecleas de rápido, o tu forma de caminar.
5.  **Un lugar donde estás (Location):** Si el sistema ve que estás haciendo login físicamente en la oficina de Madrid a través del GPS de tu celular.

**¿Por qué un SMS (mensaje de texto) es el peor MFA?**
A los políticos y empresarios constantemente les roban sus redes sociales a pesar de tener MFA por SMS. Esto pasa porque un atacante puede sobornar o engañar al empleado de tu compañía telefónica para que pase tu número de teléfono a la tarjeta SIM del hacker (esto se llama *SIM Swapping*). El SMS llega al hacker, no a ti. 
Usa siempre aplicaciones Autenticadoras (Google, Authy) o Llaves Físicas (FIDO2).

---

## 3. Modelos de Control de Acceso (Los Estándares)

A nivel corporativo, ¿cómo decide un servidor quién entra a dónde?
Hay 4 formas (Modelos) principales:

### 3.1 DAC (Discretionary Access Control)
El dueño del archivo decide quién lo lee. 
*   **Ejemplo:** Google Drive. Si tú creas un documento, tú decides si lo compartes por link a tus amigos. Es muy flexible pero un infierno para administrar en una empresa de 10,000 empleados.

### 3.2 MAC (Mandatory Access Control)
Nadie decide nada. El sistema operativo impone etiquetas militares. 
*   **Ejemplo:** Sistemas del Ejército. Tienes un archivo clasificado como "TOP SECRET". Tu usuario es de nivel "CONFIDENCIAL". No puedes abrir el archivo de ninguna forma, y aunque el creador del archivo quiera compartírtelo, el sistema simplemente no lo deja.

### 3.3 RBAC (Role-Based Access Control)
Los permisos no se dan a "Juan". Se dan al rol de "CONTADOR".
*   **Ejemplo:** Si Juan es el nuevo contador, simplemente se le asigna el rol "CONTADOR". Automáticamente recibe acceso a las finanzas. Si mañana Juan es despedido y entra María, a María se le da el rol "CONTADOR" y listo. Es el estándar de oro en las empresas normales.

### 3.4 ABAC (Attribute-Based Access Control)
Es la evolución moderna. Funciona con reglas y atributos (If / Then).
*   **Ejemplo:** Juan tiene el rol de "CONTADOR" (Atributo 1). Pero Juan está intentando acceder a las finanzas el Domingo a las 3 AM (Atributo 2). Además, Juan está usando una laptop no registrada en China (Atributo 3). El sistema junta los atributos y dice: *"Eres contador, pero tu contexto es sospechoso. Acceso denegado"*. 

---

## 4. Criterio de Dominio (Autoevaluación)

Revisa si dominas el arte de los permisos:

1. Un usuario entra a la página del banco, escribe su nombre y contraseña y entra. ¿Esto es Autenticación o Autorización?
2. Entraste a trabajar a una empresa y tu jefe usó el sistema "RBAC". Te dio el rol de "Marketing". ¿Qué significa eso para tus permisos?
3. Si le pones clave (Algo que sabes) y un PIN (Algo que sabes) a tu cuenta, ¿Tienes Autenticación Multifactor (MFA)? Piensa en las categorías de los factores.
4. ¿Por qué enviar un código por Mensaje de Texto (SMS) es la forma más débil de MFA en la actualidad?
