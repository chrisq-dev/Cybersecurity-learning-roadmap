---
title: "Backups: La Máquina del Tiempo"
---
# Backups: La Máquina del Tiempo

## Objetivo de esta Guía

Aprender la diferencia financiera entre perder 5 minutos de datos y perder 24 horas de datos.

En ciberseguridad, puedes comprar todos los Antivirus (Fase 14) y Firewalls (Fase 13) del mundo. Pero el Riesgo jamás es cero. Cuando el ataque de Ransomware inevitablemente suceda y destruya tu Base de Datos, tu única salvación es tu capacidad de retroceder el tiempo: **Los Respaldos (Backups)**.

---

## 1. La Filosofía del Respaldo

Hacer una copia de tus archivos en una memoria USB no es un "Backup" corporativo. Un verdadero sistema de continuidad de negocio se rige por la Regla de Oro: **3-2-1**.

*   **3 Copias de los datos:** La original y dos respaldos.
*   **2 Medios diferentes:** Ej. Un disco duro interno y una cinta magnética externa.
*   **1 Copia Off-site (Fuera de sitio):** Una copia guardada físicamente en otra ciudad o en la Nube (AWS). 
    *   *¿Por qué?* Si el edificio corporativo se quema hasta los cimientos en un incendio, no importa si tenías 500 discos duros de respaldo adentro del mismo edificio; lo perdiste todo.

---

## 2. Las Matemáticas del Desastre: RPO y RTO

Cuando el CEO te pregunta: *"¿Podemos sobrevivir al ataque de Ransomware?"*, tú no le respondes con términos técnicos, le respondes con estas dos métricas.

### RPO (Recovery Point Objective): El Límite de Pérdida
¿Cuántos datos está dispuesta a perder la empresa matemáticamente?
*   **La Máquina del Tiempo:** Imagina que tu empresa hace un respaldo a las 12:00 de la noche todos los días. Hoy a las 11:59 PM, un hacker encripta todo. Tú usas tu "máquina del tiempo" y restauras el respaldo de ayer a la medianoche.
*   **La Pérdida:** Acabas de borrar **24 horas completas** del trabajo de todos los empleados y de las transacciones de los clientes. Ese es tu RPO (24 horas). 
*   Si tu empresa es un banco que procesa millones de transacciones por minuto, un RPO de 24 horas significa la quiebra absoluta. El banco necesita un RPO de *milisegundos* (Replicación en tiempo real).

### RTO (Recovery Time Objective): El Reloj de Arena
¿Cuánto tiempo tarda la empresa en volver a operar desde que ocurre el desastre?
*   **La Realidad Operativa:** El ataque ocurrió, los servidores están caídos. Tú tienes un respaldo perfecto intacto. El problema es que el respaldo pesa **50 Terabytes**.
*   **El Reloj:** Mover 50 Terabytes de datos desde la nube hasta tus servidores locales va a tomar exactamente **48 horas**. Durante esos 2 días, la página web de tu empresa estará "Caída" y no podrán vender nada. Ese es tu RTO (48 horas).
*   Si eres Amazon.com, estar "caído" 48 horas significa perder cientos de millones de dólares. Amazon necesita un RTO casi instantáneo.

---

## 3. Criterio de Dominio (Autoevaluación)

Revisa si puedes salvar a la empresa del apocalipsis:

1. Un Hospital configura su sistema de expedientes médicos para hacer un respaldo a la Nube (AWS) todos los viernes a las 10:00 PM. Un ataque de Ransomware destruye los servidores el viernes a las 9:00 PM. Usando el concepto de **RPO (Recovery Point Objective)**, calcula exactamente cuánto tiempo de datos de pacientes (cirugías, recetas) se perdió y discute el impacto letal que esto tendría en la vida real.
2. Explica la "Regla 3-2-1" de los respaldos. ¿Por qué el paso final ("1 copia fuera de sitio") es la única defensa real contra desastres naturales como inundaciones o terremotos que destruyan el Centro de Datos principal?
3. El Director Financiero (CFO) se queja de que el costo de almacenamiento en la nube es muy caro, y exige que el **RTO (Recovery Time Objective)** de la empresa se reduzca a 5 minutos, pero sin gastar más dinero. Explica por qué lograr un RTO de 5 minutos requiere una arquitectura de "Alta Disponibilidad" extremadamente costosa, y por qué no es compatible con presupuestos bajos.
4. Tu empresa tiene un respaldo completo (Backup) almacenado en un servidor NAS (Disco de Red) conectado a la misma red de la oficina. Un empleado descarga accidentalmente un Ransomware avanzado. Explica por qué este Ransomware probablemente destruirá también tus respaldos (anulando tu capacidad de recuperación) y cómo el concepto de "Segmentación de Red" (Fase 13) podría haberlo evitado.
