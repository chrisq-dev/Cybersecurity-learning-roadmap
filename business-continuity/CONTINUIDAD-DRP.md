---
title: "Continuidad y DRP: El Simulacro de Incendio"
---
# Continuidad y DRP: El Simulacro de Incendio

## Objetivo de esta Guía

Aprender la diferencia entre saber qué hacer en teoría, y saber qué hacer cuando el edificio realmente está en llamas.

Los respaldos (Guía anterior) son solo los datos brutos. Si tienes los planos del motor de un avión guardados en un USB (El Backup), no significa que tengas un avión listo para volar. Necesitas reconstruirlo.
El plan paso a paso para reconstruir la empresa desde las cenizas se llama **Disaster Recovery Plan (DRP)**.

---

## 1. El Plan de Recuperación de Desastres (DRP)

* **La Analogía (El Simulacro de Incendio):** Cuando suena la alarma de incendios en la escuela, los niños no se sientan a hacer un comité para votar por dónde van a salir. Existe un documento escrito que dice exactamente que el grupo A sale por la puerta 1, y el grupo B sale por la puerta 2.
* **En Informática:** A las 3:00 AM, un ransomware encripta los servidores principales de la empresa. El CISO saca la carpeta roja del DRP. El documento dice exactamente:
 1. A quién hay que llamar por teléfono (El orden de escalamiento).
 2. En qué orden exacto se deben encender los servidores de repuesto. (Si enciendes la Base de Datos antes de encender el Active Directory, el sistema colapsará).
 3. Quién va a redactar el comunicado de prensa para los clientes.

El mayor error de los equipos técnicos es escribir un DRP gigantesco... **y nunca probarlo**. Un plan que no ha sido probado en un simulacro, es un plan que va a fallar durante la crisis real.

---

## 2. Los Sitios Alternos (La Base Secreta)

Si tu Centro de Datos principal en Nueva York quedó bajo el agua por un huracán, necesitas encender tus operaciones en otro lugar físico. 

* **Hot Site (Sitio Caliente):** Es un centro de datos idéntico en Texas. Tiene las mismas computadoras, el mismo software, y está sincronizado en tiempo real.
 * *Ventaja:* El RTO (Tiempo de Recuperación) es de casi 0 minutos. Aprietas un botón y la empresa sigue operando.
 * *Desventaja:* Cuesta literalmente el doble de dinero, porque estás pagando por mantener encendidos dos centros de datos gigantes al mismo tiempo.
* **Cold Site (Sitio Frío):** Es un edificio vacío rentado en Texas que tiene electricidad e internet, pero no tiene computadoras. 
 * *Ventaja:* Es extremadamente barato.
 * *Desventaja:* Si ocurre el desastre, el equipo de IT tiene que viajar a Texas, ir a comprar servidores físicos, instalarlos, descargar los respaldos y configurarlo todo. El RTO será de semanas o meses.
* **Warm Site (Sitio Tibio):** El punto medio. Tiene computadoras viejas listas para encenderse, pero los datos no están sincronizados en tiempo real. Tardarás un par de días en levantar la operación.

---

## 3. Criterio de Dominio (Autoevaluación)

Revisa si puedes liderar el comité de crisis corporativa:

1. El CEO de la empresa ordena que el Plan de Recuperación de Desastres (DRP) se guarde exclusivamente en un documento de Word cifrado en el servidor principal de la empresa, para asegurar su "confidencialidad". Explica el enorme problema lógico de esta decisión si la empresa es víctima de un Ransomware o un apagón total.
2. Explica la diferencia práctica entre un "Backup" (Copia de seguridad) y un "Disaster Recovery Plan (DRP)". ¿Por qué tener un disco duro lleno de datos (Backup) no garantiza que la empresa pueda volver a vender productos mañana en la mañana?
3. Un Banco global que procesa 10,000 transacciones con tarjetas de crédito por segundo decide usar un "Cold Site" como su estrategia de recuperación de desastres para ahorrar dinero en su presupuesto anual. Discute el impacto financiero que tendría esta decisión si el centro de datos principal falla catastróficamente.
4. El equipo técnico redactó un DRP perfecto hace 3 años, pero el mes pasado la empresa cambió toda su arquitectura local hacia la Nube de AWS. Usando la analogía del "Simulacro de Incendio", explica qué pasará la próxima vez que ocurra una emergencia y el equipo intente seguir el DRP de hace 3 años.
