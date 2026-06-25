---
title: "Base de Seguridad: El Arte de Gestionar Riesgos"
---
# Base de Seguridad: El Arte de Gestionar Riesgos

## Objetivo del Módulo

Aprender a pensar como un Arquitecto de Seguridad. 

La ciberseguridad no es instalar un antivirus o configurar un firewall; eso es trabajo operativo. La **verdadera ciberseguridad es tomar decisiones de negocio para reducir el riesgo sin destruir la usabilidad del sistema**. En esta guía aprenderás los conceptos exactos bajo los estándares del **NIST** y certificaciones como **CISSP**, traducidos a la vida real.

---

## 1. La Tríada CIA (El Santo Grial de la Seguridad)

En cualquier reunión corporativa de ciberseguridad, escucharás hablar de la "Tríada CIA" (Confidencialidad, Integridad y Disponibilidad, por sus siglas en inglés). Todo esfuerzo defensivo busca proteger al menos uno de estos tres pilares.

### Confidencialidad (Nadie debe espiarte)
La información solo debe ser accesible para las personas autorizadas.
*   **Analogía:** Enviar un secreto en una caja cerrada con un candado cuya llave solo tiene tu amigo.
*   **Ataque Común:** Robo de bases de datos, contraseñas filtradas (Data Breach).
*   **Cómo se defiende:** Usando **Cifrado** (Matemáticas que hacen el texto ilegible) y contraseñas fuertes.

### Integridad (Nadie debe alterar la verdad)
La información no debe ser modificada, borrada o corrompida de forma no autorizada durante su almacenamiento o tránsito.
*   **Analogía:** Imagina que mandas una carta firmada al banco diciendo *"Transfiere $10 a Juan"*. El cartero la intercepta, borra el 10 y escribe un 1000. Hubo un fallo crítico de integridad.
*   **Ataque Común:** Malware que altera archivos, hackers cambiando sus permisos en una base de datos.
*   **Cómo se defiende:** Usando **Hashes** (huellas digitales matemáticas de un archivo) y revisión de logs.

### Disponibilidad (Availability - Siempre debe estar ahí)
Los sistemas y datos deben estar funcionando y ser accesibles cuando se necesitan.
*   **Analogía:** De nada sirve un banco impenetrable si cuando vas a sacar tu dinero la puerta está soldada y el cajero no funciona.
*   **Ataque Común:** **DDoS** (Saturar una página web con millones de peticiones basura hasta que se caiga) y Ransomware (cifrar archivos para que no puedas abrirlos).
*   **Cómo se defiende:** Redundancia (tener servidores de respaldo) y copias de seguridad (Backups).

> **Consejo:**
> **El opuesto: La Tríada DAD**
> Si fallas en proteger la CIA, ocurre un incidente DAD: **D**ivulgación (pierdes confidencialidad), **A**lteración (pierdes integridad), y **D**estrucción (pierdes disponibilidad).

---

## 2. La Fórmula del Riesgo (Para dejar de adivinar)

El error más común del novato es usar las palabras "Amenaza", "Vulnerabilidad" y "Riesgo" como sinónimos. En el estándar internacional, son cosas matemáticamente distintas.

Usemos el ejemplo de proteger una Casa:
*   **Activo:** Lo que tiene valor (Tu televisión 4K y tus joyas).
*   **Vulnerabilidad:** Una debilidad (Olvidaste cerrar la ventana del primer piso con llave).
*   **Amenaza:** El actor peligroso (Un ladrón de casas que ronda por tu calle).
*   **Riesgo:** La probabilidad de que la Amenaza aproveche la Vulnerabilidad para dañar el Activo, multiplicada por el Impacto. (Probabilidad Alta de perder la TV).

### La Regla de Oro de la Fórmula
`Riesgo = Amenaza x Vulnerabilidad x Impacto`

**Escenario de Examen:**
Imagina que descubres que tu servidor web tiene una vulnerabilidad crítica (Falla de software) que permite que cualquiera lo apague. 
Sin embargo, el servidor está desconectado de internet, apagado en una caja fuerte subterránea en la Antártida.
*   ¿Hay una Vulnerabilidad? **SÍ**. El software es defectuoso.
*   ¿Hay una Amenaza? **NO**. Ningún hacker ruso va a viajar a la Antártida a abrir la caja fuerte.
*   ¿Hay Riesgo? **NO**. 

> **Advertencia:**
> Un error de principiante es entrar en pánico cuando los escáneres marcan 100 "Vulnerabilidades Altas". Si esas vulnerabilidades están en sistemas internos sin exposición a amenazas reales, tu **Riesgo** es bajo y deberías priorizar otras cosas. Prioriza el contexto, no el color rojo de la herramienta.

---

## 3. Controles de Seguridad (La Defensa)

Para mitigar los riesgos, los Arquitectos de Seguridad instalan **Controles**. Estos se dividen de dos formas principales:

### Según su Naturaleza (Qué son):
1.  **Físicos:** Puertas, candados, cámaras de seguridad, guardias, tarjetas magnéticas para entrar al edificio.
2.  **Técnicos (Lógicos):** Firewalls, antivirus, contraseñas, cifrado, permisos en Active Directory.
3.  **Administrativos:** Políticas, leyes de la empresa, entrenamiento contra el Phishing, reglas de recursos humanos. (Si un empleado anota su contraseña en un post-it, ningún firewall técnico lo va a salvar; necesitas un control administrativo).

### Según su Función (Qué hacen en el tiempo):
1.  **Preventivos:** Intentan evitar que el ataque pase. (Ej. Una cerradura en la puerta; un Antivirus que borra el archivo antes de que lo abras).
2.  **Detectivos:** No detienen el ataque, pero dan la alarma. (Ej. Una cámara de seguridad; una alerta de que alguien hizo login a las 3 AM desde Rusia).
3.  **Correctivos:** Se usan para arreglar el daño después del desastre. (Ej. Un extintor de incendios; restaurar tu computadora desde un Backup después de sufrir Ransomware).

---

## 4. Defensa en Profundidad (El Modelo de la Cebolla)

La máxima de la seguridad corporativa es que **todo control puede fallar**. Tu firewall puede tener un bug, tu empleado puede ser engañado, y tu antivirus puede fallar.

Por lo tanto, se aplica la **Defensa en Profundidad** (Defense in Depth). Consiste en poner capas superpuestas de controles, como una cebolla. Si el atacante rompe una capa, debe enfrentarse a la siguiente.

**Ejemplo de Defensa en Profundidad para un Servidor de Base de Datos:**
1.  *Capa 1 (Red Externa):* Firewall que bloquea tráfico de países sospechosos.
2.  *Capa 2 (Red Interna):* El servidor solo acepta conexiones de la IP del servidor web.
3.  *Capa 3 (Sistema Operativo):* El servidor tiene los parches de seguridad al día.
4.  *Capa 4 (Identidad):* Para entrar a la base de datos se requiere Autenticación Multifactor (MFA).
5.  *Capa 5 (Datos):* La base de datos está fuertemente cifrada (encriptada). 

Si un atacante roba la contraseña del administrador, aún le falta romper el MFA. Si rompe el MFA y se roba la base de datos, aún se enfrenta al cifrado. Nunca dependas de un solo candado.

---

## 5. Criterio de Dominio (Autoevaluación)

¿Puedes responder estas preguntas sin mirar arriba?

1. Un hacker satura la página de tu Universidad para que los estudiantes no puedan inscribirse en las clases. ¿Qué pilar de la tríada CIA fue atacado?
2. Usando la fórmula del riesgo, ¿por qué dejar la puerta de tu casa abierta en un barrio privado y vigilado (Amenaza baja) tiene un riesgo diferente a dejarla abierta en una calle peligrosa (Amenaza alta), si la vulnerabilidad es exactamente la misma?
3. Tienes un "Backup" (Copia de seguridad) de tus fotos familiares. ¿Qué tipo de control es este: Preventivo, Detectivo o Correctivo?
4. Un empleado pega su contraseña en un papelito en su monitor. ¿Qué tipo de control falló: Técnico, Físico o Administrativo?
