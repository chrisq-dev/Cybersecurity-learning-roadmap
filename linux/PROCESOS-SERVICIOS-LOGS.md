---
title: "Procesos, Servicios y Logs: El Pulso de la Máquina"
---
# Procesos, Servicios y Logs: El Pulso de la Máquina

## Objetivo del Módulo

Aprender a tomarle el pulso a un servidor Linux. Un Analista de Seguridad (Blue Team) o Cazador de Amenazas (Threat Hunter) pasa la mayor parte de su vida mirando tres cosas: ¿Qué está vivo en la memoria RAM? ¿Qué arranca en secreto? y ¿Qué quedó escrito en las bitácoras?

Esta guía mapea directamente a las habilidades de diagnóstico requeridas en la certificación **CompTIA Linux+** y es la base absoluta de la Respuesta a Incidentes Forenses (DFIR).

---

## 1. La Analogía del Hospital

Para entender cómo Linux maneja la vida de sus programas, imagina un enorme hospital de alta tecnología.

*   **Los Procesos (Pacientes Vivos):** Un proceso es cualquier programa que le diste doble clic (o ejecutaste en consola) y ahora mismo está respirando, ocupando espacio en las camas del hospital (Memoria RAM) y pidiendo atención médica (Tiempo de Procesador/CPU).
*   **Los Servicios o Demonios (Los Doctores Invisibles):** Son procesos especiales. No necesitan que tú les des doble clic. Viven en el fondo del hospital (background) trabajando en silencio las 24 horas del día. Un servidor web (`nginx`) o el programa de red (`NetworkManager`) son doctores invisibles.
*   **El Expediente Médico (Los Logs):** Es el registro escrito en papel que anota a qué hora entró el paciente, qué medicinas se le dieron y si el paciente murió o se curó. Si algo sale mal, el director del hospital no adivina; lee el expediente médico.

> **Importante para la Seguridad:**
> Cuando un servidor Linux es infectado por un atacante avanzado, no verás un archivo gigante llamado `SOY-UN-VIRUS.exe` en tu escritorio. El atacante creará un **Servicio Invisible** para que su malware arranque de fondo sin ventanas gráficas, y se inyectará como un **Proceso** legítimo en la memoria RAM. Tu único trabajo es detectarlo.

---

## 2. Los Procesos: Tomando el Pulso (`top` y `ps`)

Si la computadora se siente muy lenta o los ventiladores suenan mucho, no la reinicies de golpe. Primero, saca tu estetoscopio.

### `top` (El Monitor de Signos Vitales en Tiempo Real)
Escribe el comando `top` y presiona Enter. Verás una pantalla que se actualiza cada pocos segundos.
*   **¿Qué miras ahí?** Verás una lista de todos los procesos (Pacientes) que más CPU y Memoria están consumiendo en la habitación ahora mismo.
*   **El PID (Process ID):** Es el número de seguro social único de ese proceso. Si quieres matar a un proceso rebelde, usas ese número con el comando `kill PID` (ej. `kill 1055`).

### `ps` (La Fotografía Congelada)
El comando `ps aux` toma una fotografía estática (un flashazo) de absolutamente todo lo que está respirando en tu memoria RAM en este milisegundo.
*   **Combinación Maestra Hacker:** `ps aux | grep "python"`. Esta combinación (usando la tubería `|` que aprendimos en el módulo anterior) fotografía la RAM y busca *únicamente* si algún proceso vivo tiene la palabra "python" en su nombre.

---

## 3. Los Servicios (El Sistema `systemd`)

Antiguamente, iniciar programas de fondo en Linux era un caos. Hoy, casi todas las distribuciones modernas (Ubuntu, Red Hat, Debian) usan un jefe médico central llamado **systemd**. El comando para darle órdenes a ese jefe es `systemctl`.

### ¿Cómo controlar a los Doctores Invisibles?
Digamos que instalaste un servidor web (`apache2`). No lo arrancas tú a mano; le pides al jefe médico que lo haga:
*   **Ver si está vivo:** `systemctl status apache2` (Te dirá en letras verdes `active (running)` o en rojo `inactive`).
*   **Iniciar/Detener:** `systemctl start apache2` o `systemctl stop apache2`.
*   **Persistencia Mágica:** `systemctl enable apache2`. Este es el comando más poderoso. Le dice a Linux: *"Incluso si reinicio la computadora y me voy de vacaciones, asegúrate de prender a este doctor apenas encienda la máquina"*.

> **El Ángulo de Ciberseguridad (Persistencia):**
> Un atacante siempre usará el equivalente de `systemctl enable` para su propio malware. Por eso los auditores de seguridad revisan la lista de servicios habilitados (`systemctl list-unit-files --state=enabled`) buscando nombres de doctores falsos que no deberían estar trabajando en el hospital.

---

## 4. Los Logs: La Caja Negra Indestructible (`/var/log`)

En ciberseguridad, **si no hay logs, el crimen no ocurrió**.
La carpeta `/var/log` es el lugar más importante de todo el disco duro durante una investigación forense. 

### Los 3 Archivos de Logs que debes memorizar:

1.  `/var/log/syslog` (o `/var/log/messages` en Red Hat): Es el diario general del hospital. TODO lo genérico que pasa en el sistema se anota aquí.
2.  `/var/log/auth.log` (o `/var/log/secure` en Red Hat): **El Santo Grial de la Seguridad**. Aquí se anota cada vez que alguien intenta iniciar sesión, ya sea poniendo bien la contraseña o fallándola miserablemente.
3.  `/var/log/dmesg`: Los mensajes del "Kernel" (El núcleo profundo de la máquina) cuando el hardware arranca. Si metiste un USB con malware de hardware, dejará un rastro aquí.

### Cómo leer los Logs de forma táctica
No abras `/var/log/auth.log` en un editor de texto si tiene 2 millones de líneas. Usa el comando que aprendimos:
`cat /var/log/auth.log | grep "Failed password"`
Este comando extraerá al instante cada vez que un hacker intentó entrar a tu servidor y adivinó mal tu contraseña, mostrándote la hora exacta y su Dirección IP pública.

---

## 5. Criterio de Dominio (Autoevaluación)

Mide si estás listo para hacer respuesta a incidentes en un servidor corporativo:

1. Estás auditando tu servidor web y el ventilador está al 100%. Quieres ver en *tiempo real* qué programa exacto está usando todo el procesador. ¿Qué comando de 3 letras ejecutas?
2. Usaste el comando anterior y descubriste que un virus llamado `miner.sh` (con el PID 4099) te está consumiendo el procesador. ¿Qué comando exacto usas para destruirlo al instante?
3. Sufres un ciberataque. El atacante borra todos sus archivos maliciosos de tu carpeta de Descargas y huye. Tú quieres saber exactamente a qué hora y desde qué IP el atacante inició sesión en tu cuenta. ¿A qué ruta exacta del sistema operativo (`/carpeta/carpeta/archivo`) vas a buscar esa evidencia?
4. Un desarrollador junior te dice: *"Instalé la base de datos, funciona perfecto hoy, pero mañana que reinicien el servidor para mantenimiento tendré que entrar a prenderla a mano otra vez"*. ¿Qué comando de `systemctl` le dirías que escriba para automatizar su arranque sin que él intervenga?
