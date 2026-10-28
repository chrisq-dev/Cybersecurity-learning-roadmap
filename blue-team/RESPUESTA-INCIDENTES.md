---
title: "Respuesta a Incidentes (IR): Los Bomberos"
level: "intermedio"
content_type: "guia"
updated: "2026-06-29"
reviewed: "2026-06-28"
reviewed_against: "NIST SP 800-61 Rev. 3 y SANS PICERL"
official_sources:
  - title: "NIST SP 800-61 Rev. 3"
    url: "https://csrc.nist.gov/pubs/sp/800/61/r3/final"
  - title: "SANS — Incident Response"
    url: "https://www.sans.org/security-resources/glossary-of-terms/incident-response"
  - title: "CISA — Incident and Vulnerability Response Playbooks"
    url: "https://www.cisa.gov/sites/default/files/2024-08/Federal_Government_Cybersecurity_Incident_and_Vulnerability_Response_Playbooks_508C.pdf"
---

# Respuesta a Incidentes (IR): Los Bomberos

## Objetivo de esta Guía

Aprender la habilidad más estresante y crítica de la ciberseguridad: que hacer cuando la pantalla se vuelve roja y el CEO grita porque la base de datos acaba de ser encriptada. La respuesta a incidentes no es un arte, es una ciencia militar con procedimientos estrictos que salvan vidas digitales.

Cuando el edificio esta en llamas, no improvisas. Sigues un manual para evitar que el daño se expanda y para asegurar que la evidencia sea valida ante un juez. Esta guía cubre las 6 fases de IR, la cadena de custodia legal, los playbooks, y los errores que cometen los equipos sin preparación. No es teoría: son procedimientos probados en incidentes reales.

## La Analogía: El Cuerpo de Bomberos

El servidor principal es un edificio de oficinas. El ataque es un incendio en el tercer piso.

**Error de novato:** El guardia entra en pánico, corre al cuarto de máquinas y apaga el interruptor eléctrico de todo el edificio. Consecuencia: Apagar el servidor destruye la memoria RAM, que contiene las herramientas del atacante (malware fileless) y las llaves de desencriptación. Al apagarlo, destruiste la evidencia para atrapar al criminal y recuperar los datos.

**Protocolo profesional:** Llamas a los bomberos (IR). Ellos no apagan el edificio. Aíslan el tercer piso cerrando puertas cortafuegos, extraen el oxígeno del piso para contener el fuego, y preservan la escena del crimen. La prioridad es contener el daño sin destruir la evidencia.

### Por qué la Velocidad No lo es Todo

En IR, la velocidad importa, pero la precisión importa más. Actuar sin pensar puede:
- Destruir evidencia vital.
- Extender el alcance del ataque (ej: aislar el sistema equivocado y dejar al atacante en los demás).
- Causar daño colateral (ej: bloquear a todos los usuarios en lugar de solo al atacante).

La regla de oro: "Primero no hacer daño." Antes de cualquier acción, pregúntate: "Esto ayuda a contener o podría empeorar las cosas?"

## Dos Marcos que No Deben Confundirse

**SANS PICERL** organiza el trabajo operativo en seis fases: Preparation, Identification, Containment, Eradication, Recovery y Lessons Learned. Las seis secciones siguientes utilizan ese modelo por su claridad didáctica.

**NIST SP 800-61 Rev. 3**, publicado en abril de 2025 y vigente en 2026, sustituyó la Rev. 2. Ya no presenta esas seis fases como el ciclo NIST. Integra la respuesta a incidentes en las funciones de CSF 2.0: Govern, Identify y Protect apoyan la preparación; Detect, Respond y Recover concentran la respuesta; las mejoras se retroalimentan en todo el ciclo de gestión de riesgo.

Ambos marcos pueden convivir: PICERL ayuda a describir acciones operativas y NIST conecta esas acciones con gobierno y gestión continua del riesgo.

## Las 6 Fases Operativas de SANS PICERL

### Fase 1: Preparación (Antes del Incendio)

Ocurre antes del ataque. Es comprar extintores, configurar el SIEM, tener contactos de emergencia, y definir roles.

**Componentes de la preparación:**

Playbooks: Documentos paso a paso para tipos de incidentes. Un playbook de ransomware incluye:
- Como confirmar que es ransomware (extensiones de archivo encriptadas, nota de rescate, cambios en pantalla).
- Pasos de contención inmediata (aislar sistema, deshabilitar cuenta).
- Árbol de decisión (pagar o no pagar - política debe estar definida antes del incidente).
- Contactos a notificar (seguros, legales, autoridades, comunicaciones).

Herramientas: Tener disponibles discos forenses (con write blockers), software de captura de memoria, cables de red, y acceso a consolas de gestión. No tener las herramientas cuando ocurre el incidente es tan malo como no tener plan.

Contactos: Lista actualizada de números: abogados de turno, proveedores de seguridad, compañía de seguros, autoridades cibernéticas, equipo de comunicaciones (para crisis de relaciones públicas), y lideres de negocio.

Simulacros: Practicar la respuesta regularmente. Un simulacro típico:
1. Anunciar un escenario de incidente (ej: "recibimos un correo de un cliente diciendo que su cuenta fue comprometida").
2. El equipo sigue el playbook correspondiente.
3. Se evalúa la respuesta: tiempos, comunicación, decisiones.
4. Se identifican áreas de mejora.
5. Se actualiza el playbook.

Una empresa sin preparación no tiene un equipo de IR. Tiene un grupo de personas que entraran en pánico.

### Fase 2: Identificación (Hay Fuego?)

La alerta llega al SOC. El equipo de IR debe confirmar rápido si es un incidente real o un falso positivo.

**Preguntas a responder:**
- Que esta pasando exactamente? (tipo de incidente: malware, intrusión, fuga de datos, DDoS).
- Que sistemas están afectados? (hosts, servidores, aplicaciones, bases de datos).
- Quien o que lo causa? (IP externa, usuario interno, proceso).
- Cuando comenzó? (línea de tiempo inicial).
- Cual es el alcance actual? (cuántos sistemas, que datos).

**Fuentes de información para identificar:**
- Alertas del SIEM (eventos de seguridad).
- Reportes de usuarios ("no puedo abrir mis archivos").
- Logs de sistemas (firewall, EDR, servidores).
- Tráfico de red (picos anormales, conexiones a IPs sospechosas).

**Error común:** Parálisis por análisis. Pasar horas tratando de entender todo antes de actuar. El objetivo de la identificación no es entender todo, sino confirmar el incidente y tener información suficiente para empezar la contención. Los detalles finos se resuelven durante la investigación.

### Fase 3: Contención (Cerrar las Puertas)

El atacante está dentro. La contención busca limitar el daño sin destruir evidencia innecesariamente. Aislar, suspender, apagar o mantener operativo un sistema son decisiones distintas: deben considerar propagación, seguridad física, continuidad, cifrado activo y valor de la evidencia volátil.

**Contención a corto plazo (minutos):**
- Aislar el sistema de la red (desconectar cable, deshabilitar puerto de switch, aislar vía EDR).
- Deshabilitar cuentas de usuario comprometidas.
- Bloquear IPs maliciosas en el firewall.
- Cambiar contraseñas de cuentas afectadas.

**Contención a largo plazo (horas/días):**
- Aplicar parches de seguridad en sistemas vulnerables.
- Reconfigurar accesos y permisos.
- Implementar reglas de bloqueo en firewall e IPS.
- Establecer monitoreo intensivo en sistemas relacionados.

**Preservación proporcional:** Cuando sea seguro y exista capacidad forense, capturar memoria antes de apagar puede conservar procesos, conexiones, herramientas y claves presentes en RAM. Si mantener el equipo encendido aumenta el daño o pone en riesgo personas o sistemas críticos, la prioridad es contener. No existe una regla universal de conservar todo sistema encendido.

### Fase 4: Erradicación (Matar el Fuego)

Una vez contenida la amenaza y preservada la evidencia, procedes a eliminar al atacante del sistema.

**Acciones de erradicación:**
- Eliminar usuarios y cuentas creadas por el atacante.
- Remover servicios maliciosos, tareas programadas, y entradas de registro.
- Cerrar puertos y vulnerabilidades utilizadas para el acceso inicial.
- Reinstalar sistemas comprometidos desde cero (recomendado para compromisos profundos).
- Escanear toda la red con EDR y YARA para asegurar que no hay otras infecciones.

**Importante:** Los atacantes suelen dejar múltiples puertas traseras. Si solo eliminas una, el atacante puede volver por otra. La erradicación debe ser exhaustiva.

### Fase 5: Recuperación (Reconstrucción)

Restaurar los sistemas afectados a operación normal usando copias de seguridad limpias (anteriores al ataque).

**Pasos de recuperación:**
1. Verificar que los backups estén limpios (no infectados). Idealmente, usar backups en almacenamiento inmutable que el atacante no pudo modificar.
2. Restaurar sistemas en un orden lógico: primero infraestructura básica (DNS, AD), luego aplicaciones, luego datos.
3. Verificar la integridad de los sistemas restaurados (pruebas de funcionalidad y seguridad).
4. Conectar los sistemas a la red gradualmente, monitoreando intensivamente.
5. Mantener monitoreo reforzado durante 72 horas post-recuperación.
6. Comunicar a los usuarios y clientes que los servicios están disponibles.

### Fase 6: Lecciones Aprendidas (Post-Mortem)

El paso más importante y el que más se omite. Dos semanas después del incidente, el equipo se reúne y escribe un documento que explica:

**Que incluiré en un post-mortem:**
- Cronología del incidente (cuando entró, cuando se detecto, cuando se contuvo, cuando se recupero).
- Causa raíz (como entró el atacante exactamente).
- Fallas en las defensas (que reglas de detección no funcionaron, que controles fallaron).
- Fortalezas en la respuesta (que se hizo bien).
- Debilidades en la respuesta (que se hizo mal o se tardo demasiado).
- Acciones correctivas (con responsables y fechas de implementación).
- Lecciones para la organización (cambios en políticas, procesos, tecnología).

**La cultura del post-mortem:** No se trata de culpar a individuos. Se trata de mejorar el sistema. Una cultura donde el post-mortem se usa para castigar errores destruye la capacidad de aprender. Los incidentes futuros serán peores porque la gente ocultara errores en lugar de reportarlos.

## La Cadena de Custodia Legal

En el mundo corporativo, los ataques cibernéticos terminan en demandas de seguros, demandas de clientes, o investigaciones penales. La evidencia debe ser admisible en un tribunal.

Si tu, como analista, entras a la computadora del atacante y copias el archivo "virus.exe" a tu memoria USB personal, acabas de destruir la cadena de custodia. En un juicio, el abogado defensor preguntara: "Como sabemos que ese archivo no fue plantado por el analista?"

### Principios de la Cadena de Custodia

**Preservación:** La evidencia no debe ser alterada. Se usan bloqueadores de escritura (write blockers) en discos para garantizar que ningún dato se modifique durante la copia.

**Documentación:** Cada persona que toca la evidencia firma un registro. La cadena muestra quien, cuando, donde, y por qué accedió.

**Integridad:** Se calcula el hash SHA-256 del archivo o disco inmediatamente después de la adquisición. Cualquier modificación cambiaría el hash, demostrando manipulación.

**Almacenamiento seguro:** La evidencia se guarda en un lugar con acceso controlado (caja fuerte, cuarto con llave) y registro de acceso.

**Herramientas validadas:** Las herramientas forenses deben ser aceptadas por la comunidad legal. FTK, EnCase, y Autopsy tienen aceptación en tribunales.

### Errores Legales Comunes

- Apagar el servidor antes de adquirir memoria volátil (pierdes evidencia).
- Analizar el disco original en lugar de una copia (modificas timestamps).
- Usar herramientas no validadas (no aceptadas en tribunales).
- No documentar cada paso (cadena de custodia rota).
- Almacenar evidencia junto con otros datos (riesgo de contaminación).

## Escenarios Ilustrativos

Los siguientes escenarios explican decisiones frecuentes; no se presentan como casos documentados de organizaciones concretas.

### Respuesta Rápida

Una empresa financiera detecto actividad anómala a las 2:00 AM. El equipo de IR se activo en minutos. En lugar de apagar el servidor, lo aislaron de la red pero lo mantuvieron encendido. Los forenses adquirieron la memoria RAM y encontraron malware fileless. Identificaron el método de entrada (vulnerabilidad web) y la cerraron antes de que el atacante volviera.

### Apagón Prematuro

Una empresa detecto ransomware en una PC. El administrador apagó el servidor de archivos principal. El ransomware se detuvo, pero los backups (montados en la misma red) también estaban encriptados. Perdieron meses de datos.

### Post-Mortem que Evitó una Repetición

Una startup sufrió ransomware (rescate de $50,000). El equipo contuvo sin pagar. En el post-mortem descubrieron que el atacante entró por VPN sin 2FA. Implementaron 2FA en todos los accesos remotos. Seis meses después, otro ataque intento el mismo vector y fue bloqueado.

## Modos de Falla

Sin plan: improvisación bajo presión. Sin práctica: el plan escrito no sirve si nadie lo conoce. Comunicación caótica: nadie sabe quien lidera. Destruir evidencia: apagar sistemas antes de forénsica. No aprender: resolver el incidente y no hacer post-mortem.

## La Perspectiva del Atacante

Un atacante que sabe que hay un equipo de IR competente sabe que el tiempo es su enemigo. Cada minuto reduce sus posibilidades de éxito. Por eso atacan en horarios de bajo personal, atacan múltiples sistemas simultáneamente, borran logs, establecen accesos de respaldo, y estudian los horarios del equipo de seguridad.

## Autoevaluación

1. El CEO ordena apagar el servidor principal porque una PC tiene ransomware. Basado en contención y preservación de evidencia, que respondes y que haces?
2. Enumera las seis fases de SANS PICERL y explica cómo se relacionan con las funciones Detect, Respond y Recover de NIST CSF 2.0.
3. El equipo descubre que el atacante entró por falta de 2FA. En que fase se documenta esto y se propone la solución?
4. Explica la importancia legal de usar SHA-256 inmediatamente después de adquirir un disco forense. Que pasaría sin el hash?
5. El equipo de IR aísla un servidor pero lo mantiene encendido. La gerencia pregunta: "Por qué no lo apagan?" Como explicas la importancia de la memoria volátil?
6. Un simulacro revela que el proceso de comunicación falla: IT no sabe a quien contactar en legal. Como corriges esto?
7. Después de contener un phishing donde 5 empleados hicieron clic, la empresa quiere enviar un correo masivo explicando. Es buena idea? Que riesgos hay?
8. El post-mortem revela que el atacante uso TeamViewer (software legítimo aprobado por IT). Como diseñas una detección que distinga uso legítimo de malicioso?

## El Incident Response Plan (IRP)

Documento maestro que define como la organización responde a incidentes. Debe incluir:

**Política de IR:** Compromiso de la alta dirección con la capacidad de respuesta. Asignación de recursos. Consecuencias de no cumplir.

**Roles y Responsabilidades:**
- Incident Commander: Lidera la respuesta, toma decisiones, coordina equipos.
- Technical Lead: Dirige la investigación técnica y la contención.
- Communications Lead: Gestiona comunicaciones internas y externas.
- Legal Counsel: Asesora sobre implicaciones legales y regulatorias.
- HR Representative: Maneja aspectos de personal si el incidente involucra empleados.
- PR/Communications: Gestiona comunicación pública si es necesario.

**Matriz de Escalacion:**
- Nivel 1: Incidente menor (un solo sistema no crítico, sin datos sensibles). Respuesta: Equipo local en horas laborales.
- Nivel 2: Incidente moderado (sistema crítico afectado, posible fuga de datos). Respuesta: Equipo de IR completo en 2 horas.
- Nivel 3: Incidente mayor (Múltiples sistemas, datos de clientes, ransomware, APT). Respuesta: Equipo completo inmediatamente, notificar a alta dirección y legales.

**Playbooks de IR:**

Playbook de Ransomware:
1. Confirmar síntomas: archivos encriptados, nota de rescate, cambios en pantalla.
2. Aislar sistema afectado de la red (no apagar).
3. Identificar alcance: que otros sistemas están encriptados?.
4. Determinar vector de entrada: phishing? VPN sin 2FA? vulnerabilidad?
5. Preservar evidencia: capturar memoria, logs, y muestras de ransomware.
6. Evaluar opciones: pagar? restaurar de backups? reconstruir?
7. Si hay backups limpios: formatear y restaurar.
8. Si no hay backups: evaluar si existen descifradores públicos.
9. Post-mortem: como entró? por qué no se detecto? que mejorar?

Playbook de Phishing:
1. Usuario reporta correo sospechoso.
2. Analizar correo: headers, enlaces (no hacer clic), archivos adjuntos.
3. Determinar si es phishing conocido o nuevo.
4. Si es nuevo: analizar en sandbox, extraer IoCs.
5. Buscar en SIEM si otros usuarios recibieron el mismo correo.
6. Si alguien hizo clic: investigar endpoint, buscar ejecución de payload.
7. Bloquear dominio/IP del remitente en el gateway de correo.
8. Eliminar correo de bandejas de entrada de otros usuarios.
9. Educar al usuario que reporto.

## Forénsica Digital

### Adquisición de Evidencia

**Orden de Volatilidad (Los datos más volátiles primero):**
1. Registros y caché de CPU.
2. Tablas de enrutamiento y ARP.
3. Memoria del kernel y procesos.
4. Memoria temporal del sistema (RAM).
5. Discos duros y almacenamiento persistente.
6. Logs remotos y backups.

**Captura de Memoria (RAM):**
Herramientas: FTK Imager, WinPmem, LiME (Linux), OSXpmem.
Que contiene: procesos en ejecución, conexiones de red activas, claves de encriptación, malware fileless, comandos ejecutados recientemente.

**Captura de Disco:**
Con bloqueador de escritura (hardware o software).
Crear imagen forense (formato E01, DD, AFF).
Calcular hash (SHA-256) de la imagen.
Documentar la cadena de custodia.

### Análisis Forense

**Línea de tiempo (Timeline):**
Reconstruir la secuencia de eventos del ataque:
- Cuando entró el atacante (primer evento anómalo).
- Que hizo en cada etapa (reconocimiento, exfiltración, persistencia).
- Cuando se detecto el incidente.
- Cuando se contuvo.

**Artefactos a buscar:**
- Prefetch: Muestra que programas se ejecutaron y cuando.
- Amcache: Registro de ejecutables en sistemas Windows 8+.
- Shimcache: Datos de compatibilidad de aplicaciones.
- $UsnJrnl: Cambios en el sistema de archivos NTFS.
- Event Logs: Especialmente Security, System, PowerShell.
- Registro de Windows: RunMRU, UserAssist, Shellbags.
- Browser History: Que sitios visito el atacante?.

## Comunicación de Crisis

Reglas para comunicar durante un incidente:

**No mentir:** La verdad siempre sale. Ser honesto sobre lo que se sabe y lo que no.

**No especular:** Decir "creemos que fue un ataque de Rusia" sin evidencia es peligroso.

**Una sola voz:** Toda comunicación externa pasa por una sola persona (Communications Lead).

**Mantener informados a los stakeholders:** Clientes, socios, reguladores, junta directiva.

**No prometer lo que no se puede cumplir:** "Estaremos operativos en 2 horas" si no estas seguro.

## Preguntas Adicionales

9. Durante un incidente de ransomware, el CEO te ordena pagar el rescate de inmediato para recuperar los datos. Como Respondes profesionalmente? Que alternativas ofreces?
10. El equipo de IR contiene un incidente y eradica la amenaza. Una semana después, el mismo atacante vuelve a entrar por un vector diferente. Que fallo en tu proceso de respuesta?
11. Durante la investigación, descubres que el atacante tuvo acceso a los sistemas de la empresa durante 6 meses antes de ser detectado. Como afecta esto tu análisis forense y tu reporte?
12. El abogado del cliente te dice que no adquieras evidencia porque "podría ser usada en nuestra contra en una demanda." Cual es tu respuesta ética y profesional?
13. Un empleado reporta un correo de phishing. Al investigar, descubres que el empleado hizo clic en el enlace, descargó un archivo, y lo ejecutó. El EDR no detecto nada. Que haces?
14. El equipo de IR trabaja 48 horas seguidas conteniendo un incidente. La calidad de las decisiones empieza a deteriorarse. Como manejas la fatiga del equipo sin comprometer la respuesta?
