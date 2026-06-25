---
title: "Respuesta a Incidentes (IR): Los Bomberos"
---
# Respuesta a Incidentes (IR): Los Bomberos

## Objetivo de esta Guía

Aprender la habilidad más estresante y crítica de la ciberseguridad: Qué hacer en el momento exacto en que la pantalla se vuelve roja y el CEO está gritando por teléfono porque la base de datos acaba de ser encriptada.

La **Respuesta a Incidentes (Incident Response - IR)** no es un arte, es una ciencia militar. Cuando el edificio está en llamas, no te pones a improvisar. Sigues un manual estricto al pie de la letra para evitar que el daño se expanda, y para asegurar que la evidencia sea válida ante un juez.

---

## 1. La Analogía: El Cuerpo de Bomberos

Imagina que el Servidor Principal es un edificio de oficinas, y el Hacker es un incendio en el tercer piso.

* **Error de Novato:** El guardia de seguridad entra en pánico, corre al cuarto de máquinas y apaga el interruptor eléctrico de todo el edificio.
 * *Consecuencia:* Apagar un servidor a la fuerza destruye la Memoria RAM. La Memoria RAM es donde el hacker guarda sus herramientas (Fileless Malware) y las llaves de encriptación. Al apagarlo, destruiste la única evidencia que tenías para atrapar al criminal y descifrar los archivos.
* **Protocolo Profesional:** Llamas a los Bomberos (El equipo de IR). Ellos no apagan el edificio. Ellos entran, **aíslan** el tercer piso cerrando las puertas cortafuegos, extraen el oxígeno del piso para matar el fuego, y luego preservan la escena del crimen.

---

## 2. Las 6 Fases Clásicas (NIST / SANS)

La industria global sigue un manual de 6 pasos. Memorízalo, porque es pregunta obligatoria en cualquier entrevista de trabajo defensiva.

### 1. Preparación (Antes del Incendio)
Ocurre semanas antes del ataque. Es comprar los extinguidores, configurar el SIEM, y tener una lista de números de teléfono de emergencia pegada en la pared. Un equipo de IR sin preparación es un equipo inútil.

### 2. Identificación (¿Hay Fuego?)
La sirena suena (Una alerta del SOC). El equipo de IR debe confirmar rápidamente si es un incendio real (El Hacker) o alguien fumando un cigarrillo (Un Falso Positivo).

### 3. Contención (Cerrar las Puertas)
El hacker está adentro. **No apagues el servidor.**
La contención significa "Desconectar el cable de red". Usas el EDR para aislar la computadora de la víctima para que no pueda comunicarse con el resto de la empresa. El hacker sigue vivo adentro de esa laptop aislada, pero ya no puede propagar el Ransomware hacia los servidores principales.

### 4. Erradicación (Matar el Fuego)
Una vez que la amenaza está contenida y ya tomaste fotografías de la evidencia (Copia Forense de la RAM y el Disco Duro), procedes a matar al hacker. Borras su usuario falso, eliminas su *Web Shell*, y cierras el puerto que dejó abierto.

### 5. Recuperación (Reconstrucción)
Restauras el servidor usando las copias de seguridad (Backups) del día anterior. Lo conectas de nuevo a la red de producción con precaución, observando los monitores por si el hacker dejó una "Bomba de Tiempo" escondida.

### 6. Lecturas Aprendidas (El Reporte Post-Mortem)
El paso más importante. Dos semanas después del ataque, el equipo se reúne y escribe un documento de 20 páginas explicando cómo entró el hacker (Ej. *Le hizo Phishing al gerente*) y qué van a comprar o configurar para asegurarse de que ese método exacto jamás vuelva a funcionar.

---

## 3. La Cadena de Custodia Legal

En el mundo corporativo, los ataques cibernéticos terminan en demandas de seguros o en el FBI.

Si tú, como Analista de IR, entras a la computadora del hacker y copias el archivo `virus.exe` a tu memoria USB personal para "analizarlo en tu casa", acabas de destruir la **Cadena de Custodia**.
En un juicio, el abogado del hacker dirá: *"Ese archivo de la memoria USB pudo haber sido plantado por el analista"*.

La evidencia forense se extrae usando discos duros sellados, herramientas criptográficas que generan "Hashes" para demostrar que el archivo no fue modificado ni por un solo bit, y un documento firmado por cada persona que tocó el disco duro. El Hacking Defensivo es una ciencia legal.

---

## 4. Criterio de Dominio (Autoevaluación)

Revisa si puedes mantener la calma bajo presión:

1. El CEO te llama a las 4:00 AM gritando que la computadora del Contador tiene Ransomware y te ordena que "Apagues el servidor principal cortando la electricidad para que el virus no se propague". Basado en el paso 3 de IR (Contención) y la preservación de evidencia, ¿Qué le respondes profesionalmente al CEO y qué acción técnica tomas en su lugar?
2. Enumera los 6 pasos del ciclo de Respuesta a Incidentes (IR) del estándar SANS/NIST en orden cronológico.
3. El equipo de IR descubre que el atacante entró porque el sistema de Recursos Humanos no requería Autenticación de Dos Factores (2FA). ¿En qué fase de las 6 posibles se debe documentar oficialmente este fallo y proponer la compra de un sistema 2FA?
4. Explica la importancia legal de usar una función Matemática Hash (como SHA-256) inmediatamente después de tomar una copia forense del disco duro de una computadora infectada.
