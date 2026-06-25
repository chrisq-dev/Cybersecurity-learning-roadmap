---
title: "SCADA y OT: Hackeando el Mundo Físico"
---
# SCADA y OT: Hackeando el Mundo Físico

## Objetivo de esta Guía

Entender la gigantesca diferencia entre Tecnología de la Información (IT) y Tecnología de las Operaciones (OT).
Aquí no hackeamos bases de datos para robar números de tarjeta; aquí hackeamos turbinas, trenes y acueductos. Las reglas de la ciberseguridad convencional se invierten por completo.

---

## 1. La Diferencia entre IT y OT

* **IT (Information Technology):** Maneja **Datos**. Son tus servidores Windows, bases de datos SQL, la nube y los empleados usando Word.
* **OT (Operational Technology):** Maneja **Física**. Son los sistemas que abren y cierran válvulas de presión en una refinería de petróleo, los brazos robóticos que arman autos, y el sistema que cambia la luz del semáforo a verde.

### La Triada CIA invertida
En ciberseguridad clásica (IT), la regla de oro es la Triada CIA: **Confidencialidad**, Integridad y Disponibilidad. Lo más importante es que nadie robe los datos. Si hay un virus, apagas el servidor inmediatamente para proteger la base de datos (pierdes disponibilidad para salvar la confidencialidad).

En el mundo industrial (OT), la triada es AIC: **Disponibilidad (Availability)**, Integridad y Confidencialidad.
Si una planta de fundición de acero está operando a 2,000 grados Celsius, **no puedes apagar la computadora de control por un virus**. Si la apagas (pierdes disponibilidad), el acero se solidifica en las tuberías, causando una explosión que matará a los obreros. 

En OT, **el software no puede fallar, ni siquiera para protegerse de un hacker, porque las personas mueren**.

---

## 2. Los Componentes del Mundo OT

No encontrarás Macbooks operando trenes de carga. Encontrarás estos equipos especializados:

### A. PLC (Programmable Logic Controller)
Es el "músculo y cerebro básico". Es una caja de metal indestructible atornillada a la pared de la fábrica. Su único trabajo es ejecutar un código en bucle infinito: *"Si el sensor de temperatura pasa de 100°, abre la válvula de agua fría"*.
Los PLCs son confiables por décadas, pero tienen **cero seguridad criptográfica**. Si les mandas la orden de abrir la válvula por la red, la abren ciegamente sin pedir contraseña.

### B. SCADA (Supervisory Control and Data Acquisition)
Es el "centro de mando". Es una sala llena de pantallas gigantes donde los operadores humanos ven los gráficos de toda la refinería. El SCADA envía las órdenes a los miles de PLCs repartidos por kilómetros.

---

## 3. El Caso de Estudio: Stuxnet (El Arma Digital)

El ejemplo definitivo de por qué la ciberseguridad industrial es un asunto de guerra internacional es el virus **Stuxnet (2010)**.

**El Objetivo:** La planta secreta de enriquecimiento de Uranio nuclear de Natanz, en Irán.
**El Problema:** La planta estaba "Air-gapped" (Totalmente desconectada de internet). No había forma de hackearla remotamente.

**El Ataque (Atribuido a EE. UU. e Israel):**
1. Infectaron memorias USB de proveedores civiles que trabajaban en la planta nuclear iraní.
2. Cuando un empleado conectó el USB infectado a la red interna (aislada de internet), Stuxnet despertó.
3. El virus no robó datos ni cifró archivos. Silenciosamente, buscó un modelo hiperespecífico de **PLC Siemens** (los que controlaban las centrífugas nucleares).
4. **El sabotaje físico:** Stuxnet manipuló las centrífugas haciéndolas girar al máximo de velocidad hasta que los motores se destrozaran físicamente, pero... al mismo tiempo, el virus le enviaba información falsa a las pantallas de la sala SCADA diciendo: *"Todo está normal a 50 revoluciones por minuto"*.
5. Los operadores humanos veían luces verdes en sus pantallas mientras escuchaban las máquinas explotar en el piso de abajo.

Stuxnet fue la primera "Arma Cibernética" de la historia. Retrasó el programa nuclear de Irán por años, usando únicamente código.

---

## 4. ¿Por qué no actualizamos el SCADA?

El analista novato siempre pregunta: *"¿Por qué la planta de agua usa Windows XP en 2026? ¡Deberían actualizar a Windows 11!"*.

En OT, si un sistema físico lleva 15 años funcionando perfectamente sin matar a nadie, **no lo tocas**.
Actualizar el sistema operativo podría introducir un retraso de 3 milisegundos en el procesamiento de la computadora. En una fábrica, ese micro-retraso podría hacer que un brazo robótico choque contra la pared. El costo de certificar que un nuevo sistema operativo es 100% seguro para vidas humanas cuesta millones de dólares, así que las empresas prefieren aislar el viejo Windows XP en una red privada y no tocarlo nunca.

---

## Criterio de Dominio (Autoevaluación)

1. En el mundo IT corporativo, si detectas un Ransomware en la computadora financiera, desconectas el cable de red y la apagas (Contención). Explica por qué hacer esto mismo en el mundo OT (Una planta química) es una pésima decisión.
2. ¿Qué es un PLC y cuál es su mayor debilidad de ciberseguridad histórica?
3. En tus propias palabras, ¿Cómo logró Stuxnet engañar a los operadores humanos mientras destruía las máquinas físicas de la planta nuclear?
