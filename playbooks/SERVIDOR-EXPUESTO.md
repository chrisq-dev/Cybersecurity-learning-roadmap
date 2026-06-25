---
title: "Playbook: Servidor Comprometido (Expuesto a Internet)"
---
# Playbook: Servidor Comprometido (Expuesto a Internet)

## Objetivo del Módulo

Aprender qué hacer cuando el castillo ha sido penetrado no por engañar al usuario, sino por la fuerza bruta técnica.

En los Playbooks anteriores enfrentamos Phishing (Engaño) y Malware (Infección de usuario). En un escenario de **Servidor Expuesto**, no hay usuarios engañados. 
Un administrador olvidó configurar el Firewall (Fase 13). Dejó el puerto 22 (SSH) abierto al internet público. Un escáner automatizado en Rusia detectó la puerta abierta y rompió la cerradura mediante fuerza bruta. El atacante ahora es dueño (Root) del Servidor Web corporativo.

---

## Fases de Respuesta a Incidentes (El Ciclo PICERL)

### Escenario (La Alerta Técnica)
**Sábado 11:30 PM:** El sistema IPS (Prevención de Intrusiones) lanza una alerta crítica. Detectó comandos de terminal (Linux Shell) inyectados hacia la IP externa del Servidor Web de la empresa. El servidor ha descargado un minero de criptomonedas y está consumiendo el 100% del procesador.

---

### Paso 1: Contención (El Cerco Militar)
El atacante está adentro del Servidor Web. El riesgo principal es que salte hacia la Base de Datos Financiera (Movimiento Lateral).

1.  **Aislamiento en DMZ:** Reconfigurar el Firewall de inmediato para mover el Servidor Web comprometido a una **VLAN de Cuarentena (DMZ)**. Esto significa que el servidor no puede hablar con ningún otro servidor de la red corporativa. Es una celda de confinamiento.
2.  **¡No Apagar la Máquina! (Captura de RAM):** De nuevo, la regla máxima Forense. El atacante suele esconder su malware en la Memoria RAM. Si apagas el servidor físico, borras la evidencia. El equipo DFIR (Digital Forensics and Incident Response) procede a tomar un *Volcado de Memoria RAM* (RAM Dump).
3.  **Imagen de Disco Duro:** Tomar una "Fotografía (Snapshot)" completa del disco duro (Fase 12) para que el equipo Forense pueda diseccionar el ataque mañana, asegurando la Cadena de Custodia Legal.

---

### Paso 2: Erradicación (Quemar la Casa)
En servidores críticos en la Nube (AWS/Azure), la erradicación no consiste en borrar el virus. Consiste en destruir todo el servidor comprometido y reconstruirlo. 

1.  **Terminar el Servidor:** Si usamos infraestructura moderna como contenedores (Kubernetes - Fase 23) o Servidores Virtuales, simplemente presionamos el botón de "Terminar/Eliminar Servidor". Quemamos el castillo entero (el servidor virtual) con el atacante adentro.
2.  **Cerrar la Ventana Rota:** El Firewall (Fase 13) se reconfigura para cerrar definitivamente el Puerto 22 al mundo. El acceso por SSH a los servidores ahora solo será permitido si el administrador se conecta usando una VPN corporativa con MFA (Zero Trust - Fase 23).
3.  **Auditoría de Bases de Datos:** Verificar los logs (Fase 8) para saber si el atacante logró enviar peticiones a la Base de Datos interna antes del aislamiento. (Verificar si esto escaló a una Fuga de Datos - Fase 25).

---

### Paso 3: Recuperación (El Clon Limpio)
El servidor malo fue destruido. Hay que levantar las operaciones para que la empresa vuelva a vender.

1.  **Despliegue Inmutable:** El equipo de desarrollo utiliza código automatizado (Terraform/Ansible) para crear una copia exacta y 100% limpia del servidor web en 5 minutos, conectada al entorno sano de la red.
2.  **Rotación de Contraseñas y Secretos:** El atacante tuvo acceso root al servidor antiguo. Es probable que se haya robado las contraseñas de las Bases de Datos (API Keys) guardadas en el código fuente de ese servidor. Deben rotarse todas las contraseñas usadas por esa máquina antes de conectar la nueva.
3.  **Monitoreo Reforzado:** Dejar el nuevo servidor bajo "Libertad Condicional". El Blue Team aplicará reglas más estrictas de detección de IDS/IPS durante las siguientes 72 horas para asegurar que el atacante no intente volver a entrar.

---

## 4. Criterio de Dominio (Autoevaluación)

Revisa si puedes responder como un bombero forense:

1. Un servidor virtual ha sido comprometido por un grupo APT (Hacker Avanzado). El administrador local de TI, tratando de ser útil, "Apaga el servidor y lo borra inmediatamente de AWS" para detener la amenaza. Explica el desastre irreparable que acaba de cometer desde una perspectiva de **Respuesta Forense (DFIR - Fase 12)** y la pérdida del *Volcado de RAM*.
2. El concepto moderno de operaciones en la Nube asume "Infraestructura Inmutable". En la fase de **Erradicación**, en lugar de perder horas corriendo el Antivirus tratando de limpiar el servidor hackeado, ¿Cuál es la estrategia táctica más eficiente (Quemar la Casa) para servidores virtuales?
3. En la fase de Contención, el servidor se mueve a una "VLAN de Cuarentena (Celda de Aislamiento)". Usando la filosofía de "Zero Trust" (Fase 23), ¿Por qué este paso previene el ataque mortal de "Movimiento Lateral"?
4. El servidor hackeado guardaba las credenciales para acceder a la pasarela de pagos de PayPal de la empresa. En la fase de **Recuperación**, si el administrador levanta un servidor nuevo idéntico pero se olvida de ejecutar el paso de **"Rotación de Contraseñas y Secretos"**, ¿Qué podría hacer el hacker al día siguiente, aunque ya no tenga acceso al servidor físico?
