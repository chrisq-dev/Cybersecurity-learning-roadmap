---
title: "Playbook: Compromiso por Phishing"
tiempo_estimado: "4 min"
minutos_lectura: 4
secciones: 3
---
# Playbook: Compromiso por Phishing

## Objetivo del Módulo

Aprender el protocolo de emergencia militar cuando las barreras psicológicas han fallado.

En la Fase 21 aprendimos cómo el atacante crea el "Espejismo". En la Fase 22 configuramos los Gateways (SEG) para detenerlo.
Pero el Riesgo Nunca es Cero (Fase 20). Un usuario de Finanzas hizo clic en el enlace, escribió su contraseña, y el atacante ya está adentro de la cuenta de correo corporativa.

Saca tu manual de emergencia. Es hora de operar.

---

## Fases de Respuesta a Incidentes (El Ciclo PICERL)

### Escenario (La Alarma)
**10:15 AM:** Un analista de Nivel 1 del SOC (Fase 24) ve una alerta: *"Se ha detectado un inicio de sesión exitoso en la cuenta de Microsoft 365 de `jefe.finanzas@empresa.com`. La dirección IP proviene de Nigeria"*.

---

### Paso 1: Contención (Cortar el Acceso)
El hacker está adentro del buzón leyendo correos confidenciales. Tienes que sacarlo a patadas inmediatamente.

1.  **Forzar el Cierre de Sesión:** Entrar a la consola de Identidad (Active Directory / Entra ID) y presionar el botón "Revoke all sessions" (Revocar todos los Tokens de sesión activos). Esto expulsará al hacker (y al usuario legítimo) del correo instantáneamente, sin importar en qué dispositivo estén.
2.  **Resetear la Contraseña:** Cambiar la contraseña comprometida por una contraseña temporal generada aleatoriamente de 20 caracteres.
3.  **Aislar la Computadora:** Aunque fue un ataque a la Nube (Correo), existe el riesgo de que el Phishing incluyera la descarga de un Malware. Por precaución, usar el EDR para aislar la computadora física de la red de la oficina (Visto en el Playbook de Malware).

---

### Paso 2: Erradicación (Limpiar el Daño Interno)
El hacker fue expulsado. Pero en los 10 minutos que estuvo adentro, ¿Qué hizo?

1.  **Buscar Reglas de Reenvío (Forwarding Rules):** Los hackers siempre dejan una "puerta trasera". Crean una regla en Outlook que dice: *"Reenviar una copia oculta de todos los correos entrantes a `hacker@gmail.com`"*. Si el Analista no revisa y borra esta regla, el hacker seguirá robando información durante meses aunque ya no tenga la contraseña.
2.  **Buscar correos enviados:** El hacker pudo haber usado la cuenta del `jefe.finanzas` para enviarle un correo de Phishing al `CEO`, aprovechando la confianza interna (Movimiento Lateral).
3.  **Auditoría de Acciones (Logs):** Revisar los logs (Fase 8) para determinar exactamente qué documentos de SharePoint o OneDrive descargó el atacante. ¿Se robaron la fórmula secreta de la empresa? (Impacto de Negocio).

---

### Paso 3: Recuperación (El Regreso Controlado)
La amenaza ha sido neutralizada y el buzón está limpio.

1.  **Auditoría con el Usuario:** Llamar por teléfono al Jefe de Finanzas. Preguntarle exactamente qué vio, en qué hizo clic y cómo ocurrió el ataque. Esta información servirá para la reunión forense (Purple Team).
2.  **Devolver el Acceso:** Entregarle la nueva contraseña temporal al usuario por una vía segura (Ej. SMS, no por el correo que acaba de recuperar).
3.  **Forzar MFA:** Obligar al usuario a volver a registrar su dispositivo móvil para la Autenticación Multi-Factor (MFA), asegurándose de que el dispositivo del hacker sea borrado del registro.

---

## 4. Criterio de Dominio (Autoevaluación)

Revisa si puedes asegurar las comunicaciones:

1. ¿Por qué el paso 1 de Contención debe ser "Forzar el cierre de todas las sesiones activas" (Revocar Tokens) *antes* de resetear la contraseña? Si solo cambias la contraseña en el panel de administración, ¿Qué pasará con la conexión en vivo que el hacker ya tiene establecida en su navegador?
2. Explica la importancia vital de buscar "Reglas de Reenvío" (Forwarding Rules) en la fase de Erradicación. Usando el concepto de "Persistencia" (Fase 16), justifica por qué un analista inexperto que omite este paso dejará a la empresa vulnerable a espionaje permanente.
3. Si el atacante utilizó la cuenta comprometida de Finanzas para enviarle un correo malicioso al CEO de la empresa, ¿A qué fase de la cadena de ataque militar (Cyber Kill Chain) corresponde esta acción y cómo se relaciona con el "Movimiento Lateral"?
4. Después de resolver el incidente, el **Purple Team** se reúne. Como resultado de esta crisis, recomiendan instalar un **Secure Email Gateway (SEG)** (Fase 22) para escanear y reescribir las URLs antes de que lleguen a los buzones. ¿A qué fase del Ciclo de Vida de Respuesta a Incidentes (PICERL) corresponde implementar nuevas defensas para evitar que el mismo error vuelva a suceder en el futuro? (Lecciones Aprendidas).
