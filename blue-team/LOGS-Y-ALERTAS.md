---
title: "Logs vs Alertas: Separando la Basura del Fuego"
---
# Logs vs Alertas: Separando la Basura del Fuego

## Objetivo de esta Guía

Aprender la diferencia crítica entre tener un dato guardado en un disco duro (Log) y tener una llamada de emergencia a las 3:00 AM (Alerta).

El mayor problema de un Centro de Seguridad (SOC) no es que no puedan ver al hacker. El problema es que ven *demasiado*. Un banco de tamaño mediano genera **Terabytes** de registros de texto todos los días. Encontrar al hacker ahí es peor que buscar una aguja en un pajar; es buscar una aguja específica en una pila de 10 millones de agujas.

---

## 1. El Log: La Bitácora Aburrida

Un **Log** (Registro) es simplemente una línea de texto que anota que "algo" ocurrió.
Cualquier computadora moderna genera miles de logs por segundo sin que te des cuenta.

* Si mueves el mouse de tu Windows, la computadora internamente anota un log de que el cursor cambió de píxel.
* Si Juan entra a su computadora a las 8:00 AM usando su contraseña correcta, el servidor de Windows (Active Directory) anota: `Evento 4624: Juan inició sesión con éxito`.

**El Log es estúpido y ciego.** No sabe si la acción fue buena o mala, solo es un notario que certifica que el evento ocurrió y lo archiva en un disco duro (como lo vimos en la guía de Python y Parsing de CSVs/JSONs).

### El Problema de Leer Logs Crudos
Imagina ser el Analista SOC Tier 1 e intentar leer esto en tu pantalla:
1. *Juan abrió Word.*
2. *El Firewall bloqueó una IP de China.*
3. *María cerró Excel.*
4. *El servidor 2 se quedó sin RAM.*
5. *Juan descargó un virus.exe.*

Tu cerebro colapsaría a los 5 minutos. Necesitas una forma matemática de ignorar el ruido (Word, Excel) y gritar solo cuando haya fuego (El virus). Aquí nacen las alertas.

---

## 2. La Alerta: El Grito del Sistema

Una **Alerta** es un Log que fue evaluado por una Regla Matemática (Detection Engineering) y superó el umbral de peligrosidad.

El trabajo del Blue Team avanzado no es leer logs. Es crear reglas lógicas para que las máquinas lean los logs por ellos.

* **Regla Lógica:** `"Si lees un Log donde el Usuario X falló su contraseña 1 vez, ignóralo. PERO si lees Logs donde el Usuario X falló su contraseña 50 veces en menos de 1 minuto... enciende la Sirena Roja y envíale la Alerta al Analista Tier 1"`.

La Alerta es lo que realmente llega a la pantalla del Guardia de Seguridad en el SOC.

---

## 3. Falsos Positivos y Fatiga de Alertas

El peor enemigo del Blue Team no es el hacker ruso, es el **Falso Positivo**.

Un Falso Positivo ocurre cuando tu regla matemática fue demasiado paranoica y encendió la sirena roja por un evento que era totalmente inocente.

**Ejemplo de un Falso Positivo:**
Escribiste una regla de seguridad que dice: *"Generar una ALERTA CRÍTICA si alguien sube un archivo ZIP encriptado con contraseña a Google Drive, porque los hackers hacen eso para robar datos corporativos sin que el antivirus los vea (Exfiltración)"*.
Suena la alarma. El SOC Tier 1 abre la alerta, investiga, y descubre que fue el departamento de Recursos Humanos enviando las nóminas de salarios protegidas por política de privacidad. No era un hacker, era un proceso de negocio legítimo.

### La Fatiga de Alertas (Alert Fatigue)
Si el SOC genera 5,000 falsos positivos al día, los analistas se cansarán física y mentalmente. Empezarán a cerrar las alertas automáticamente sin leerlas, diciendo *"Ah, seguro es Recursos Humanos otra vez"*. 
El día que el hacker real pase por ahí subiendo el archivo ZIP con los secretos de la empresa, el analista cerrará la alerta por costumbre, y la empresa será hackeada frente a sus propios ojos. A esto se le llama **Fatiga de Alertas**.

---

## 4. Criterio de Dominio (Autoevaluación)

Revisa si puedes separar la basura de la evidencia:

1. El servidor web de tu empresa registra la siguiente línea en formato JSON: `{"ip": "18.2.1.1", "accion": "GET /index.html", "estado": 200}`. ¿Esto es un Log Crudo o es una Alerta de Seguridad?
2. Como ingeniero de seguridad, te piden crear una alerta para cuando alguien intente borrar la base de datos completa. Escribes la regla: *"Gritar ALERTA si alguien ejecuta el comando SQL `DROP TABLE`"*. A los dos días, recibes 500 alertas diarias provenientes del equipo de Desarrolladores, quienes borran las tablas de prueba constantemente. ¿Es esto un Falso Positivo o un Falso Negativo?
3. ¿Por qué enviar los "Logs Crudos" del Firewall directamente a la pantalla del Analista SOC Nivel 1, sin pasar por un sistema de reglas de alertas, garantiza que el analista renunciará a su trabajo en menos de una semana?
4. Un atacante logra entrar al servidor de Windows a las 3:00 AM, roba archivos y borra todos los archivos de texto que guardaban los Registros de Eventos (Event Logs). A la mañana siguiente, no hay ninguna alerta. ¿El Blue Team puede investigar cómo entró el hacker si ya no existen los Logs?
