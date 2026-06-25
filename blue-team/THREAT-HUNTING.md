# Threat Hunting: El Patrullaje Nocturno

## Objetivo del Módulo

Entender por qué esperar pasivamente a que suene la alarma del Antivirus es una garantía matemática de que serás hackeado, y cómo los mejores equipos defensivos del mundo operan bajo la mentalidad de "El hacker ya está adentro".

El **Threat Hunting** (Caza de Amenazas) es el nivel más alto del Blue Team (Tier 3). Es el puente donde la mentalidad de ataque (Red Team) y la mentalidad de defensa (Blue Team) se fusionan.

---

## 1. El Concepto: Assumed Breach (Asumir la Brecha)

Históricamente, la ciberseguridad se trataba de construir muros altos (Firewalls) e instalar guardias en las puertas (Antivirus). Si la alarma de la puerta no sonaba, el CEO dormía tranquilo.

La doctrina moderna cambió esto con el concepto de **Assumed Breach**.
El Threat Hunter llega a su escritorio el lunes por la mañana y asume religiosamente: *"Un hacker ruso ya vulneró nuestra puerta el domingo a las 3:00 AM. El Antivirus falló y el Firewall no lo vio. Está aquí adentro, escondido. Mi trabajo hoy es encontrarlo antes de que robe los datos"*.

En lugar de mirar la pantalla del SIEM esperando una alerta en rojo, el Threat Hunter agarra una linterna y sale a patrullar los pasillos oscuros del servidor.

---

## 2. ¿Cómo se ve una "Cacería" en la vida real?

El Threat Hunter no busca virus con nombres extraños. Busca anomalías matemáticas y comportamientos sutiles.

Imagina que el Threat Hunter de la empresa lanza una búsqueda (Query) en el SIEM:
*"Muéstrame a todos los usuarios que iniciaron sesión con éxito a través de la Red Privada (VPN) desde las 12:00 AM hasta las 5:00 AM"*.

El SIEM le devuelve 3 nombres: María, Pedro y Juan.
*   **María:** Es la Jefa de Sistemas. Es normal que trabaje de madrugada reparando servidores. (Inofensivo).
*   **Pedro:** Es del equipo de Ventas Asiáticas. Es normal que se conecte a esta hora por la diferencia horaria. (Inofensivo).
*   **Juan:** Es del departamento de Recursos Humanos de la oficina local. Su turno terminó a las 6:00 PM. **Anomalía.**

El Threat Hunter empieza a "jalar el hilo" de Juan. 
Busca en el SIEM: *"¿Qué hizo la computadora de Juan a las 2:15 AM?"*.
El SIEM responde: *"La computadora de Juan ejecutó `powershell.exe` para codificar un archivo en formato ZIP"*.

La alarma del Antivirus nunca sonó porque usar la VPN y abrir PowerShell son funciones normales de Windows. No hay ningún virus. Pero el comportamiento es 100% el de un hacker (Exfiltración de datos). El Threat Hunter acaba de atrapar a un cibercriminal en vivo.

---

## 3. El Resultado de la Cacería

Un Threat Hunter nunca regresa con las manos vacías. Al final del día, su cacería termina en uno de dos posibles resultados:

1.  **Encuentra al Hacker:** El peor escenario. Llama de inmediato al equipo de Bomberos (Respuesta a Incidentes) para apagar las computadoras, aislar la red y expulsar al atacante antes de que termine de robar.
2.  **No encuentra nada (El mejor escenario):** Descubre que Juan realmente estaba trabajando horas extras. Pero la cacería no fue inútil. El Threat Hunter toma lo que aprendió sobre los horarios de Juan, y le dice al *Detection Engineer*: *"Por favor, escribe una regla automática (Una Alerta) para que la próxima vez que un usuario de Recursos Humanos abra PowerShell en la madrugada, la alarma suene sola"*.

De esta forma, la trampa manual se vuelve automática, y el ciclo de defensa de la empresa se vuelve más fuerte cada día.

---

## 4. Criterio de Dominio (Autoevaluación)

Revisa si tienes el instinto de cazador:

1. ¿Por qué el principio táctico de "Assumed Breach" (Asumir la Brecha) es mentalmente superior a la creencia clásica de "Nuestro Antivirus bloqueará todos los ataques"?
2. Un Threat Hunter lanza una búsqueda en el SIEM buscando procesos de Windows que intenten comunicarse directamente con la IP `169.254.169.254` (La IP mágica de AWS). ¿Qué vulnerabilidad clásica de la fase ofensiva está intentando cazar este Defensor? *(Pista: Revisa el módulo de OWASP Top 10).*
3. Explica por qué el éxito a largo plazo del Threat Hunting depende de tener un **Detection Engineer** competente en el equipo.
4. "Para ser un buen Threat Hunter, necesitas ser un buen Red Teamer". Argumenta a favor o en contra de esta afirmación basándote en cómo el cazador elige qué anomalías buscar en los logs.
