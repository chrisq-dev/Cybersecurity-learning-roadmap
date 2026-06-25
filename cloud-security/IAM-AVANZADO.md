---
title: "IAM Avanzado: Escalada de Privilegios y Máscaras"
tiempo_estimado: "4 min"
minutos_lectura: 4
secciones: 5
---
# IAM Avanzado: Escalada de Privilegios y Máscaras

## Objetivo del Módulo

Entender por qué el hacking en la nube es un juego de ajedrez donde el atacante roba una llave de nivel muy bajo y hace malabares con el sistema de políticas para convertirse en Dios (Administrador).

En el mundo On-Premise, un atacante usaba ataques de fuerza bruta o de corrupción de memoria para volverse Administrador (`root` o `SYSTEM`). En la nube, las computadoras son tan efímeras que al atacante no le importan. El atacante ataca directamente a las **Políticas JSON** de Amazon o Google. A esto se le llama Escalada de Privilegios en la Nube.

---

## 1. La Anatomía de una Política JSON

Las llaves del Conserje en la nube no son de metal. Son un documento de texto escrito en el formato JSON. Tienen 4 partes fundamentales (Effect, Action, Resource, Condition).

**Ejemplo de una Llave Básica:**
```json
{
  "Effect": "Allow",
  "Action": "s3:GetObject",
  "Resource": "arn:aws:s3:::bodega-hospital/*"
}
```
*   **Effect:** ¿Qué vas a hacer, Permitir (Allow) o Bloquear (Deny)?
*   **Action:** ¿Qué poder mágico te estoy dando? (En este caso, la acción `GetObject` significa que puedes descargar fotos de S3).
*   **Resource:** ¿Sobre qué edificio específico tienes este poder? (En este caso, solo sobre la `bodega-hospital`).

Si un hacker roba las credenciales de este empleado, el hacker solo podrá descargar fotos. Es aburrido y de bajo impacto. El hacker quiere más.

---

## 2. El Atajo Letal: El Asterisco (*)

El mayor amigo del hacker en la nube se llama Asterisco (`*`), que en informática significa **"Todo" o "Comodín"**.

Si el Administrador de Sistemas de tu empresa tiene mucha prisa el viernes en la tarde, y le da pereza escribir exactamente qué bodegas puede tocar el empleado, escribirá esto:

```json
{
  "Effect": "Allow",
  "Action": "s3:*",
  "Resource": "*"
}
```
*   `Action: s3:*` -> Puedes hacer **CUALQUIER COSA** en el mundo del almacenamiento (Leer, Borrar, Modificar, Eliminar bodegas enteras).
*   `Resource: *` -> Sobre **CUALQUIER BODEGA** del mundo que exista en esta empresa.

A esto se le llama **Over-permissive Policies** (Políticas con exceso de permisos). Si el hacker roba esta llave, acaba de obtener el poder de borrar las bases de datos de toda la compañía con un solo enter.

---

## 3. Asumir Roles (Ponerse la Máscara)

Pero los hackers reales apuntan aún más alto. Apuntan a la característica más avanzada de IAM: El **AssumeRole** (Asumir un Rol).

*   **La Analogía:** Es el equivalente corporativo a ponerse una máscara de látex de otra persona.
*   Imagina que la cuenta de un becario (Junior) tiene una política muy aburrida que solo le permite leer manuales.
*   PERO, el becario tiene una línea mágica en su JSON que dice: `sts:AssumeRole`.

Esa línea significa: *"Tú eres un becario débil, pero tienes permiso de caminar al armario, agarrar el uniforme del CEO, ponértelo, y durante 1 hora el sistema pensará que eres el CEO"*.

### El Ataque de Escalada (Privilege Escalation)
1. El hacker envía un correo de Phishing al becario y le roba su llave (API Key).
2. El hacker revisa la llave y nota que el becario no puede borrar servidores, pero sí tiene el poder `AssumeRole`.
3. El hacker le manda un comando a Amazon: *"Hola, soy el becario. Quiero usar mi poder de Asumir Rol para ponerme el uniforme del Administrador de Bases de Datos"*.
4. Amazon verifica que el becario sí tiene ese poder en su JSON, y le entrega un uniforme temporal (Temporary Security Credentials).
5. El hacker, usando el nuevo uniforme, borra todos los servidores de la empresa.

Para el Blue Team, cuando revisen las cámaras (CloudTrail), verán que "El Administrador de Bases de Datos" borró los servidores. Tardarán horas en rastrear que en realidad era el becario usando una máscara.

---

## 4. Criterio de Dominio (Autoevaluación)

Revisa si puedes leer el ajedrez de las políticas:

1. Estás auditando una cuenta de AWS y ves una política con la acción `iam:CreateUser` combinada con el recurso `*`. ¿Por qué esto es una catástrofe? (Pista: Piensa en lo que podría hacer el hacker si tiene el poder de crear nuevos usuarios invisibles).
2. En términos de permisos, ¿Qué significa el uso del símbolo comodín `*` en un archivo JSON de IAM, y por qué los auditores de seguridad marcan su uso injustificado como un fallo crítico?
3. ¿Cómo funciona la técnica de "Asumir un Rol" (AssumeRole) como un vector para que un atacante convierta una cuenta de bajo privilegio en una de alto privilegio?
4. Si tú eres el Arquitecto de Seguridad de la empresa, ¿Por qué aplicar la doctrina de "Principio del Menor Privilegio" (Principle of Least Privilege) desde el día uno evita que un ataque de *AssumeRole* destruya a tu empresa?
