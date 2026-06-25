---
title: "Permisos y Auditoría de DB: Las Gafas Mágicas y la Cámara de Seguridad"
---
# Permisos y Auditoría de DB: Las Gafas Mágicas y la Cámara de Seguridad

## Objetivo de esta Guía

Aprender cómo proteger la base de datos contra el "Enemigo Interno" (Insider Threat). 

El "Cifrado en Reposo" de la guía anterior es perfecto si alguien se roba el disco duro físico. Pero, ¿qué pasa si el ladrón no es un hacker ruso, sino el empleado de Recursos Humanos de tu propia empresa usando sus credenciales legítimas?

---

## 1. Enmascaramiento Dinámico (Data Masking)

El Principio de Menor Privilegio dicta que un empleado solo debe ver la información estrictamente necesaria para hacer su trabajo.

* **El Problema:** Tienes a 500 operadores de *Call Center* atendiendo llamadas telefónicas de clientes. Ellos necesitan confirmar la identidad del cliente pidiéndole los últimos 4 dígitos de su tarjeta de crédito. Pero si les muestras la tarjeta completa en su pantalla, los operadores podrían tomarle una foto con su celular y hacer fraude.
* **La Analogía (Las Gafas Mágicas):** En el disco duro de la Base de Datos, la tarjeta de crédito está guardada intacta y real: `4555 1234 1234 9876`. Cuando el sistema detecta que el usuario que está pidiendo ver la tabla es un "Empleado de Call Center", la Base de Datos le pone unas "gafas mágicas" de manera dinámica antes de mandarle la información a la pantalla.
* **El Resultado:** El empleado mira su pantalla y solo ve esto: `XXXX XXXX XXXX 9876`. Puede confirmar la identidad del cliente, puede hacer su trabajo, pero es físicamente imposible que robe la tarjeta completa porque la Base de Datos se rehusó a enviarla.

A esto se le llama **Dynamic Data Masking (Enmascaramiento Dinámico de Datos)**.

---

## 2. Auditoría Avanzada (DAM)

Anteriormente hablamos de recolección de Telemetría y Análisis Forense en Windows. Las Bases de Datos gigantes (Oracle, SQL Server) tienen su propio ecosistema de auditoría llamado **DAM (Database Activity Monitoring)**.

* **La Analogía:** Es la cámara de seguridad 4K que graba el interior de la Bóveda del Banco.
* **La Necesidad:** Los Administradores de Bases de Datos (DBAs) tienen el poder absoluto ("Modo Dios"). Pueden borrar las tablas y pueden ver todas las tarjetas de crédito sin máscara. ¿Quién vigila al vigilante?
* **La Ejecución:** Las herramientas de DAM operan independientemente de la Base de Datos. Graban cada orden (Query SQL) que ejecuta cada persona.

Si el Administrador de Base de Datos ejecuta el comando `SELECT Salario FROM Empleados WHERE Nombre = 'CEO'`, el sistema DAM:
1. Graba el evento en una bóveda forense inalterable.
2. Inmediatamente envía una Alerta Crítica al Analista del SOC, notificándole que el empleado con mayores privilegios de la empresa acaba de intentar espiar la nómina del Director General a las 2:00 AM.

El objetivo del DAM no es detener al Administrador (porque técnicamente tiene los permisos), el objetivo es la **No-Repudiación**. Que el día de mañana no pueda decir "Yo no fui".

---

## 3. Criterio de Dominio (Autoevaluación)

Revisa si puedes mitigar el Riesgo Interno:

1. El equipo Legal de la empresa prohíbe que el equipo de programadores (Desarrollo) tenga acceso a los números de Seguro Social reales de los clientes mientras hacen pruebas de software. Usando el concepto de "Data Masking", explica cómo los programadores pueden seguir probando el software sin ver los datos reales.
2. Explica la diferencia entre usar Cifrado en Reposo (TDE) para proteger una Base de Datos contra un robo físico, y usar Enmascaramiento Dinámico de Datos (Masking) para protegerla contra un "Insider Threat" (Empleado malicioso).
3. ¿Por qué es fundamental que la herramienta de Auditoría de Base de Datos (DAM) envíe los logs de monitoreo a un servidor SIEM centralizado de forma inmediata, en lugar de guardar los registros (logs) dentro del mismo servidor de Base de Datos? (Pista: Piensa en el "Modo Dios" del Administrador).
4. Un atacante logra hacer un ataque exitoso de Inyección SQL desde la página web pública, ordenándole a la Base de Datos que extraiga la tabla de "Usuarios". Si el sistema de Base de Datos tiene configurado **Dynamic Data Masking** para las columnas de Contraseñas y Correos, ¿Qué información recibirá el atacante en su pantalla?
