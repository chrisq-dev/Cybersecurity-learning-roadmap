# Cadena de Custodia: La Ley y el Orden

## Objetivo del Módulo

Aprender que la Informática Forense no se trata de usar herramientas de hacking geniales. Se trata de usar herramientas aburridas de forma legalmente perfecta para que un Juez Federal no deseche tu evidencia.

Si el Red Team (Ofensivo) rompe el cristal, y el Blue Team (Defensivo) detiene al ladrón, el **Analista Forense** es el detective forense de la policía que llega a fotografiar el cristal roto, medir las huellas dactilares y demostrar matemáticamente frente a un jurado quién fue el culpable.

---

## 1. La Cadena de Custodia (Chain of Custody)

Si hay un cadáver en una habitación, la policía no entra a tocarlo con las manos desnudas, ni se lleva el arma homicida en el bolsillo de su pantalón. Toman fotos, usan guantes, meten el arma en una bolsa de plástico sellada, y **cada persona que toca esa bolsa debe firmar un documento**.

En ciberseguridad, esto se llama **Cadena de Custodia**.
*   **El Error del Novato:** Un empleado descargó pornografía infantil en su computadora corporativa. El gerente de IT se enoja, enciende la computadora del empleado, abre la carpeta "Mis Documentos", copia los archivos ilegales a su memoria USB personal, y se la lleva a la policía.
*   **El Resultado Legal:** El abogado defensor del empleado dirá: *"Esa memoria USB es personal. El gerente pudo haber fabricado esos archivos en su propia casa para incriminar a mi cliente"*. El juez declarará la evidencia **Inadmisible** y el empleado quedará libre.

**El Protocolo Forense:**
Un verdadero Analista Forense jamás enciende la computadora original. Saca el disco duro, lo conecta a un aparato llamado "Bloqueador de Escritura" (Write Blocker) que impide físicamente que se modifique un solo bit, y hace una copia bit a bit (Un *Dump* o Clon exacto). Luego guarda el disco original en una bóveda fuerte.

---

## 2. El Hashing como Sello Legal

¿Cómo le demuestras al juez que la copia que hiciste es **exactamente idéntica** al disco duro original incautado?
Usando la Licuadora Matemática que vimos en el módulo de Criptografía: **El Hash**.

1. Tomas el disco duro original de 500 Gigabytes. Le calculas su Hash SHA-256. (Ej. `A9F5...`)
2. Haces la copia a tu disco duro forense.
3. Le calculas el Hash a tu copia. (Ej. `A9F5...`).
4. En el juicio, le muestras al juez que los dos Hashes coinciden matemáticamente al 100%. Esto prueba irrebatiblemente que la evidencia no fue alterada (Integridad).

---

## 3. El Orden de Volatilidad (No desenchufes la máquina)

Históricamente, la policía cibernética llegaba a una oficina criminal y lo primero que hacían era tirar del cable de corriente de los servidores para apagarlos e incautarlos. **Hoy en día, eso es un error garrafal.**

La regla número uno del análisis forense es el **Orden de Volatilidad**: Debes recolectar primero la evidencia que está a punto de desaparecer.

La Memoria RAM es altísimamente volátil. Si cortas la electricidad, la RAM se borra en milisegundos.
¿Qué vive en la RAM?
*   Contraseñas en texto plano que el usuario acaba de escribir.
*   Conexiones de red activas hacia Rusia.
*   Virus "Fileless" (Malware que no toca el disco duro).

Si el servidor fue hackeado por un malware avanzado, desenchufar la máquina significa destruir el arma homicida. El Analista Forense moderno primero hace una "Fotografía" de la Memoria RAM con la computadora encendida, y solo después procede a apagarla para extraer el disco duro físico.

---

## 4. Criterio de Dominio (Autoevaluación)

Revisa si podrías testificar ante un Juez:

1. ¿Por qué el acto de simplemente "Encender" la laptop de un sospechoso destruye automáticamente la validez legal de la evidencia en un juicio? (Pista: Piensa en los miles de logs y archivos temporales que Windows escribe en el disco duro durante el proceso de arranque).
2. Explica qué es un "Write Blocker" (Bloqueador de Escritura) de hardware y por qué es la herramienta más importante en la mochila de un Analista Forense que va a clonar un disco duro incautado.
3. El equipo de Respuesta a Incidentes te dice que el servidor fue infectado, pero el Antivirus no encuentra ningún archivo `.exe` malicioso en el disco C:. Basado en el Orden de Volatilidad, ¿Cuál es tu primer objetivo forense al llegar a la escena y por qué?
4. El abogado de un sospechoso argumenta que tú pudiste haber plantado la evidencia incriminatoria en la copia del disco duro de su cliente durante tu investigación en el laboratorio. ¿Qué prueba criptográfica exacta debes mostrarle al Juez para destruir el argumento del abogado?
