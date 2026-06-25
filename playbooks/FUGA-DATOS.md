---
title: "Playbook: Fuga de Datos y Extorsión"
---
# Playbook: Fuga de Datos y Extorsión

## Objetivo de esta Guía

Aprender qué hacer cuando la solución tecnológica ("Restaurar un Backup") es completamente inútil.

En el Ransomware tradicional, el hacker destruye tus servidores y te cobra por arreglarlos. Si tienes buenos Backups, simplemente los ignoras y te recuperas solo.
Pero la mafia cibernética evolucionó hacia la **Doble Extorsión (Data Breach)**.

---

## Fases de Respuesta a Incidentes (El Ciclo PICERL)

### Escenario (La Alarma)
**Lunes 9:00 AM:** El CEO recibe un correo electrónico. No hay ningún virus en la empresa. Los servidores funcionan perfectamente. Pero el correo tiene un enlace de la Dark Web (Red Tor) que muestra los nombres, direcciones y tarjetas de crédito de 5 millones de clientes de la empresa. 
El mensaje dice: *"Paga 5 millones de dólares en Bitcoin, o le venderemos esta Base de Datos a la competencia y la haremos pública en Twitter"*.

*¡Los Backups no te sirven de nada aquí! Los datos ya salieron del edificio.*

---

### Paso 1: Contención (El Control de Daños Legal)
La contención en una Fuga de Datos no es técnica, es **Legal y de Relaciones Públicas (GRC)**.

1. **Involucrar a los Abogados:** Llamar inmediatamente al equipo legal. En Europa (GDPR) y California (CCPA), la empresa tiene exactamente **72 horas legales** para notificar al gobierno sobre la fuga de datos. Si el equipo técnico oculta el ataque, las multas gubernamentales quebrarán a la empresa.
2. **Identificar el "Agujero":** Aislar el servidor específico por el cual se robaron los datos (Contención de Red) para evitar que el hacker siga descargando más información mientras ocurre la negociación.
3. **No Pagar (Aún):** Pagar a terroristas o carteles sancionados por la OFAC (EE. UU.) es un delito federal grave. Los abogados deben verificar quién es el grupo atacante antes de siquiera pensar en negociar.

---

### Paso 2: Erradicación (Cerrar la Tubería)
Tenemos que tapar el agujero por el que el hacker sacó (Exfiltró) los 5 Terabytes de datos.

1. **Cierre de Accesos (Zero Trust):** Revocar todas las contraseñas de los administradores de Base de Datos y forzar Autenticación Multi-Factor (MFA) para todos.
2. **Parchear la Vulnerabilidad:** Si el hacker entró por una Inyección SQL en la página web, el equipo de programación debe reescribir ese código en las próximas horas antes de volver a encender la página web de ventas.

---

### Paso 3: Recuperación (La Disculpa Pública)
La "Recuperación" en este escenario significa recuperar la confianza del cliente, no recuperar servidores.

1. **Comunicado de Prensa (PR):** Publicar un comunicado transparente admitiendo el error. *Regla de Oro:* Las empresas que ocultan un hackeo (Ej. Caso Uber) terminan con Directivos en la cárcel. Las empresas que lo admiten el Día 1 sobreviven.
2. **Monitoreo Crediticio:** Ofrecer a los 5 millones de clientes afectados un servicio de monitoreo de tarjetas de crédito gratuito por 12 meses pagado por la empresa. (Estrategia de mitigación de demandas colectivas).
3. **Auditoría Externa:** Contratar a una empresa forense externa (Mandiant, CrowdStrike) para que certifique públicamente que el hacker ya no está en el edificio.

---

## 4. Criterio de Dominio (Autoevaluación)

Revisa si puedes manejar la peor crisis del mundo corporativo:

1. Un Director Técnico (CISO) recibe una amenaza de extorsión por el robo de la Base de Datos. El CISO decide borrar el correo y no avisarle a nadie porque "tiene Backups y puede restaurar el sistema sin problema". Explica la falla catastrófica de lógica del CISO al confundir un ataque de Ransomware tradicional con un ataque de **Fuga de Datos (Data Breach)**.
2. Basado en el concepto de "Gobierno, Riesgo y Cumplimiento" (GRC), explica por qué ocultarle a los clientes (y al gobierno) que sus tarjetas de crédito fueron robadas generará un impacto financiero legal infinitamente mayor que el costo de la extorsión original.
3. Explica el concepto de **Doble Extorsión (Double Extortion)**. ¿Por qué los grupos de Ransomware modernos ya no se conforman con cifrar tus datos localmente, sino que ahora siempre los descargan a sus propios servidores *antes* de encriptar los tuyos?
4. Durante la fase de **Recuperación** de una fuga masiva de datos, ¿Por qué la acción principal recae en el equipo de "Relaciones Públicas y Legal" en lugar del equipo de "Ingeniería de Sistemas"?
