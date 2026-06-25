---
title: "Playbook: Cuenta Comprometida (Insider Threat)"
---
# Playbook: Cuenta Comprometida (Insider Threat)

## Objetivo de esta Guía

Aprender la letalidad silenciosa de un ataque cuando el enemigo ya tiene las llaves de la puerta principal.

Un ataque de Ransomware (Fase 24) hace mucho ruido. Destruye archivos y activa alarmas rojas. Una **Cuenta Comprometida (Business Email Compromise)** no hace ningún ruido. El atacante (El Espía) obtuvo la contraseña de un empleado legítimo, inició sesión normalmente, y ahora camina por los pasillos del castillo leyendo información clasificada sin que ninguna alarma se dispare.

---

## Fases de Respuesta a Incidentes (El Ciclo PICERL)

### Escenario (La Alarma Silenciosa)
**Jueves 2:00 PM:** El Analista SOC Nivel 1 nota una anomalía en el SIEM (Fase 8). La cuenta del `Director de Recursos Humanos` inició sesión en la VPN corporativa desde Miami, y 5 minutos después inició sesión en Microsoft 365 desde China (Viaje Imposible). Es matemáticamente imposible viajar de Miami a China en 5 minutos. La cuenta está comprometida.

---

### Paso 1: Contención (El Corte Silencioso)
La regla de oro contra un Espía es **no dejar que se entere de que ya lo descubriste** hasta que hayas bloqueado todas sus puertas de salida al mismo tiempo.

1.  **Congelar el Acceso:** En lugar de apagar el servidor o enviarle un correo al usuario (el espía podría estar leyendo el correo), el Blue Team desactiva la cuenta de Active Directory (Fase 15). Esto congela al espía en su lugar.
2.  **Revocar Tokens:** Matar todas las sesiones activas (Oauth Tokens) en todas las aplicaciones en la Nube (AWS, Office 365, Salesforce). Esto expulsa al espía a mitad de cualquier descarga de archivos que estuviera haciendo.
3.  **Aislamiento de Dispositivo:** Bloquear el acceso a la red de la laptop del Director de Recursos Humanos por si el robo de la contraseña ocurrió por un Malware (Keylogger) en su máquina física.

---

### Paso 2: Erradicación (Buscar la Puerta Trasera)
El espía fue expulsado del castillo. Pero, ¿dejó la ventana abierta para volver a entrar mañana?

1.  **Revisión de Delegaciones y Permisos:** Los espías suelen crear nuevas cuentas de administrador ocultas ("Shadow Admin") mientras están adentro, para poder regresar si pierden la cuenta principal. El equipo debe revisar y borrar cualquier usuario nuevo creado en las últimas 24 horas.
2.  **Limpieza de Reglas de Correo:** (Igual que en el Playbook de Phishing). Buscar reglas automáticas de reenvío para evitar la Fuga de Datos continua (Fase 25).
3.  **Auditoría de API Keys:** Si el usuario tenía acceso a infraestructura en la nube, el atacante pudo haber robado las "Llaves de API" (Fase 18) para conectarse programáticamente en el futuro sin usar contraseña. Hay que rotar (cambiar) todas esas llaves inmediatamente.

---

### Paso 3: Recuperación (Devolver las Llaves)
Una vez que las ventanas traseras están cerradas y el espía no tiene forma de volver a entrar, procedemos a devolver el acceso al usuario legítimo.

1.  **Restablecimiento Fuerte:** El usuario legítimo debe presentarse con IT (Físicamente o por videollamada verificada) para recibir su nueva contraseña temporal. No se debe enviar por correo ni SMS sin verificar identidad.
2.  **Análisis Forense Rápido:** Escanear la computadora del Director de Recursos Humanos para asegurar que el compromiso de la cuenta no provino de un malware persistente.
3.  **Post-Mortem (Lecturas Aprendidas):** El CISO investiga por qué la Autenticación Multi-Factor (MFA) falló en detener al atacante en China, descubriendo posiblemente un ataque de *MFA Fatigue* (Ingeniería Social avanzada).

---

## 4. Criterio de Dominio (Autoevaluación)

Revisa si puedes atrapar al espía corporativo:

1. El Analista SOC recibe una alerta de "Viaje Imposible" en la cuenta del CEO. Entra en pánico y decide enviarle un correo al CEO diciéndole: *"Alerta: Creemos que un Hacker en China está usando su cuenta en este momento"*. Explica el enorme riesgo táctico de enviar este mensaje antes de ejecutar la fase de **Contención**.
2. Explica la diferencia principal de detección entre un ataque de Ransomware (Malware) y un ataque de "Cuenta Comprometida" (Insider Threat/BEC). ¿Por qué los Antivirus EDR tradicionales (Fase 14) suelen ser ciegos ante el robo de credenciales legítimas?
3. Durante la **Erradicación**, ¿Por qué es fundamental revisar la creación de nuevas cuentas ("Shadow Admins") o Llaves de API, además de simplemente cambiar la contraseña del usuario original?
4. El análisis *Post-Mortem* de este incidente determinó que el ataque fue exitoso a pesar de que la empresa exigía MFA en el celular del usuario. Investiga qué es el ataque **"MFA Fatigue" (Fatiga de MFA)** y cómo un Hacker moderno evade la Autenticación Multi-Factor explotando la psicología humana (Fase 21).
