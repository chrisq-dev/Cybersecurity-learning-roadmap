---
title: "Detection Engineering: El Ingeniero de Trampas"
---
# Detection Engineering: El Ingeniero de Trampas

## Objetivo de esta Guía

Entender por qué el SOC moderno no depende de que los guardias estén despiertos, sino de que las trampas estén bien diseñadas.

El **Detection Engineering** (Ingeniería de Detección) es una de las carreras mejor pagadas dentro del Blue Team. No son los que miran la pantalla para ver si hay un virus (Ese es el Analista Tier 1). Son los programadores que **escriben las reglas** (las alertas del SIEM) para que la pantalla encienda su alarma roja de forma automática.

---

## 1. El Problema: Comprar una Caja Mágica

Hace 10 años, los bancos compraban un SIEM millonario, lo enchufaban, lo encendían y decían: *"Listo, estamos seguros, el SIEM atrapará a los hackers"*.
La realidad es que un SIEM vacío es solo un disco duro muy caro. No atrapa absolutamente a nadie si nadie le enseña qué buscar.

El fabricante del SIEM (ej. Splunk) te incluye 500 reglas de detección "Por Defecto". Pero las reglas por defecto son genéricas y horribles. 
*   Una regla por defecto dirá: *"Generar alerta si un usuario inicia sesión desde un país distinto a su país habitual"*.
*   Si tu empresa es una Aerolínea Internacional donde todos los empleados viajan todos los días, esa regla generará 20,000 Falsos Positivos diarios y destruirá la paz mental de tu SOC.

---

## 2. El Trabajo del Ingeniero (Escribir la Trampa)

El Detection Engineer es como el trampero del bosque. Su trabajo es entender la geografía específica de su propio bosque (su empresa) y poner trampas que atrapen a los osos (hackers), pero que no lastimen a los conejos (empleados legítimos).

### El Ciclo de Vida de una Detección:
1.  **Investigación (Threat Intel):** El Ingeniero lee en Twitter o en MITRE ATT&CK que los hackers rusos están usando un comando llamado `vssadmin.exe delete shadows` para borrar los respaldos antes de detonar el Ransomware.
2.  **Escritura (La Lógica):** El Ingeniero abre el SIEM y escribe una regla: *"Si cualquier computadora ejecuta la palabra `vssadmin` seguida de `delete shadows`, detona la Alerta Crítica"*.
3.  **Tuning (Afinación):** El Ingeniero enciende la alerta en modo "Silencio" por una semana. Descubre que el software oficial de respaldos de la empresa usa ese mismo comando a las 2:00 AM los domingos. El Ingeniero modifica la regla: *"Detona la alerta... EXCEPTO si es domingo a las 2:00 AM y lo hace el usuario Sistema_Backup"*.
4.  **Despliegue:** La alerta se enciende oficialmente en el SOC.

---

## 3. El Dilema del Detection Engineer (Recall vs Precision)

El Ingeniero vive en un estrés constante tratando de balancear dos matemáticas:

*   **Recall (No perderse a ningún hacker):** Si haces una regla demasiado general (Ej. *"Alerta si se abre una terminal negra"*), atraparás al 100% de los hackers. El problema es que también atraparás al 100% de los programadores de la empresa (Miles de Falsos Positivos).
*   **Precision (No molestar al SOC):** Si haces una regla demasiado específica (Ej. *"Alerta si el archivo se llama exactamente `virus_ruso.exe`"*), tendrás cero falsos positivos (Paz mental para el SOC). Pero si el hacker renombra el archivo a `virus_chino.exe`, el hacker pasará por enfrente de la cámara y la regla fallará (Falso Negativo).

El trabajo del Ingeniero de Detección es encontrar el punto medio exacto donde se atrapa el comportamiento del hacker, sin generar "Fatiga de Alertas" en los analistas de Nivel 1.

---

## 4. Criterio de Dominio (Autoevaluación)

Revisa si podrías diseñar trampas lógicas:

1. ¿Por qué comprar un Antivirus o un SIEM "Directo de Fábrica" sin contratar a un Detection Engineer para afinar sus reglas es garantizar que el software será inútil en menos de un mes?
2. Diseñas una regla de detección para atrapar el comando `whoami` (Un comando inofensivo pero muy usado por los hackers apenas logran entrar al servidor). Si enciendes esta regla en una empresa de desarrollo de software, ¿Generarás un problema de "Recall" (Perder al hacker) o un problema de "Precision" (Demasiados Falsos Positivos)?
3. Durante la fase de Afinación (Tuning), decides agregar una excepción a tu regla para que ignore todas las alertas que vengan de la IP `10.0.0.50`, porque es la IP del Administrador de Red. ¿Por qué agregar "Excepciones de IPs" fijas (Whitelisting ciego) es un sueño hecho realidad para un Hacker Ofensivo (Red Team)?
4. En el ciclo del Blue Team moderno, ¿Por qué un Ingeniero de Detección debe trabajar de la mano y leer constantemente la matriz de MITRE ATT&CK?
