---
title: "Hackeando la Entrevista Técnica"
level: "inicial"
content_type: "guia"
updated: "2026-06-29"
---

# Hackeando la Entrevista Técnica

## Objetivo de esta Guía

Buscan probar que **eres un adulto responsable al que se le pueden confiar las llaves del reino.** Suena fuerte, pero es así.

Llegaste a la entrevista final. Estás frente al CISO (Chief Information Security Officer) o al Líder del Blue Team.
La mayoría de los candidatos *Juniors* intentan impresionar al director diciendo: *"Puedo hackear una máquina de Windows en 3 minutos con Metasploit"*.
Eso asusta al Director, porque demuestra inmadurez. El Director no quiere a alguien que rompe cosas por diversión; quiere a alguien que defiende la empresa corporativa usando Playbooks y Métricas de Riesgo.

**Por qué esto importa:** Imagina que eres el dueño de un banco. ¿Contratas al que te dice "mira cómo abro esta caja fuerte en 2 minutos" o al que te dice "mira cómo instalo una alarma que nadie puede abrir"? Exacto.

---

## 1. El Formato STAR en la Entrevista

Cuando el CISO te pregunte: *"Cuéntame sobre una vez que resolviste un problema técnico"*, no debes vomitar datos técnicos. Debes contarle una historia estructurada (El Formato STAR). Es como contarle una película, no darle un manual de instrucciones.

* **S (Situación):** *"En mi laboratorio virtual, el servidor de bases de datos estaba expuesto a internet"*.
* **T (Tarea):** *"Tenía el objetivo de asegurar la base de datos sin romper la aplicación web que la estaba consumiendo"*.
* **A (Acción):** *"Implementé una segmentación de red aislando el servidor en una VLAN interna y configuré un Firewall para bloquear el puerto 3306 desde el exterior"*.
* **R (Resultado - El Impacto en el Negocio):** *"El resultado fue que reduje la superficie de ataque a cero para ataques externos, garantizando el cumplimiento de la ley de protección de datos (GRC), mientras mantenía la operatividad al 100%"*.

El CISO te contratará en ese mismo instante: cuando cuentas una historia bien armada, el que está del otro lado se imagina trabajando contigo.

**Más ejemplos STAR para roles específicos:**

**Para SOC Analyst:**
- S: "Durante mi turno en el laboratorio, el SIEM generó una alerta de conexión saliente a una IP marcada como maliciosa en Threat Intelligence."
- T: "Necesitaba determinar si era un falso positivo o un compromiso real y, en caso real, contener el host."
- A: "Correlacioné el evento con logs de autenticación (ID 4625), verifiqué el proceso padre en el endpoint y aislé el host de la red aplicando una regla en el firewall de switch."
- R: "Se confirmó como un troyano de acceso remoto (RAT). La contención evitó la exfiltración de datos y el host fue desinfectado en 2 horas, documentando el caso como lección aprendida."

**Para GRC Analyst:**
- S: "La empresa estaba preparando una auditoría de certificación ISO 27001 y se identificaron 15 controles con evidencia insuficiente."
- T: "Debía recopilar, revisar y organizar la evidencia de cumplimiento para los 15 controles en 3 semanas."
- A: "Coordiné con los dueños de cada proceso, establecí una carpeta centralizada con nomenclatura estandarizada, realicé revisiones de calidad y generé un reporte de brechas."
- R: "La auditoría externa encontró 0 no conformidades mayores en los controles revisados, y el certificado fue otorgado sin observaciones críticas."

---

## 2. Las 3 Preguntas de la "Prueba de Fuego"

Hay preguntas diseñadas específicamente para ver si tienes mentalidad de Negocio (Gobierno y Riesgo) o si solo tienes mentalidad de Hacker de películas. Y te van a agarrar.

### La Pregunta de la Vulnerabilidad
* **El Entrevistador:** *"Encuentras una vulnerabilidad crítica (CVSS 10) en el servidor de ventas principal a las 2:00 PM. El parche oficial de Microsoft ya está disponible y sabes cómo instalarlo. ¿Qué haces?"*
* **Respuesta de Novato (Reprobada):** *"¡Instalo el parche inmediatamente para detener a los hackers!"* (Acabas de tumbar el servidor de ventas corporativas en pleno horario comercial porque no probaste el parche. Te despiden).
* **Respuesta de Élite (Aprobada):** *"NO instalo el parche en Producción. Sigo el protocolo del **Blue Team**. Primero, lo reporto e instalo el parche en el entorno de Pruebas (Test). Si no rompe nada, programo una ventana de mantenimiento a las 3:00 AM para instalarlo en Producción, minimizando el Riesgo Financiero de tiempo de inactividad"*.

### La Pregunta del DNS
* **El Entrevistador:** *"¿Qué pasa exactamente cuando escribes `google.com` en tu navegador y le das Enter?"*
* **El Objetivo:** Es la pregunta de Redes más famosa del mundo. Quieren ver tu profundidad arquitectónica. Tienes que hablar sobre cómo la computadora busca en su caché, luego contacta al servidor DNS, cómo se negocia el protocolo TLS (Handshake) y cómo el HTTP entra en acción.

**Desglose de la respuesta completa:**
1. Caché del navegador (DNS local en la propia aplicación).
2. Caché del sistema operativo (hosts file, resolución local).
3. Consulta al servidor DNS recursivo configurado (ISP o corporativo).
4. Resolución iterativa o recursiva: root servers → TLD servers (.com) → authoritative servers (google.com).
5. Obtención de la dirección IP (142.250.XX.XX).
6. Conexión TCP tres-way handshake (SYN, SYN-ACK, ACK).
7. Negociación TLS 1.3: ClientHello, ServerHello, certificado, intercambio de claves (Diffie-Hellman), Finished.
8. Solicitud HTTP/2 o HTTP/3 (QUIC): método GET, headers, cookies.
9. Servidor web responde con el contenido HTML.
10. El navegador parsea HTML, pide recursos adicionales (CSS, JS, imágenes) y renderiza.

### La Pregunta de la Crisis
* **El Entrevistador:** *"Recibes una alerta de que el ransomware está cifrando los archivos del servidor de archivos compartidos. Ya hay 20 usuarios afectados. El CEO está en copia del correo de amenaza. ¿Cuáles son tus primeros 3 pasos?"*
* **Respuesta de Novato:** *"Ejecutó el antivirus y espero a que limpie."*
* **Respuesta de Élite:**
  1. "Aíslo el servidor de la red inmediatamente (desconectar cable o deshabilitar puerto de switch) para contener el cifrado."
  2. "Preservo la evidencia: tomó captura de pantalla del mensaje de rescate, registro la hora del incidente, identifico el vector inicial (phishing, RDP expuesto)."
  3. "Activo el plan de respuesta a incidentes: notifico al CISO, legal y al equipo de IR. Inicio la cadena de custodia."

**Por qué esto importa:** Si no puedes explicar algo que usas todos los días, menos vas a poder explicar un ataque complejo. Es la prueba de fuego de "realmente entiende o solo memorizó comandos".

---

## 3. Preguntas Técnicas Frecuentes por Categoría

### Redes
- Explica la diferencia entre TCP y UDP con ejemplos prácticos.
- ¿Cómo funciona ARP? ¿Qué es un ARP spoofing?
- ¿Qué es una DMZ y por qué se usa?
- Diferencia entre IDS y IPS.
- ¿Cómo traceroute descubre la ruta de los paquetes?

### Sistemas Operativos (Linux)
- ¿Cómo verificas los procesos que están usando más memoria?
- ¿Qué es un symlink? ¿Cómo puede ser un riesgo de seguridad?
- Explica los permisos SUID, SGID y sticky bit.
- ¿Qué información encuentras en /var/log/auth.log?
- ¿Cómo matarías un proceso zombi?

### Sistemas Operativos (Windows)
- ¿Qué es Active Directory? Explica el concepto de dominio, OU y GPO.
- ¿Qué eventos de seguridad monitorearías para detectar un ataque de pass-the-hash?
- ¿Cómo funciona Kerberos en AD?
- Diferencia entre usuario local y usuario de dominio.

### Ataques Web
- Explica SQL Injection con ejemplo concreto. ¿Cómo lo previenes?
- ¿Qué es XSS? Tipos (Reflejado, Almacenado, DOM-based).
- ¿Qué es CSRF y cómo se mitiga?
- ¿Qué es un IDOR? Ejemplo de cómo explotarlo.
- Diferencia entre autenticación y autorización.

### Herramientas de Defensa
- ¿Cómo configurarías una regla de correlación en un SIEM para detectar fuerza bruta?
- ¿Qué es un playbook de respuesta a incidentes? ¿Qué pasos debe contener?
- Explica cómo funciona un EDR vs un antivirus tradicional.
- ¿Qué es un IoC y un IoA? Diferencias.

---

## 4. Preparación Antes de la Entrevista

### Investigación de la Empresa
- Industria: ¿manejan datos sensibles? (salud, finanzas, gobierno).
- Tamaño: startup, pyme, corporación multinacional.
- Stack tecnológico: ¿usan AWS, Azure, on-premise? ¿Qué SIEM? (LinkedIn, ofertas de empleo, blogs técnicos).
- Noticias recientes: ¿sufrieron un ataque? ¿Están en proceso de certificación?
- Cultura de seguridad: ¿tienen CISO? ¿Equipo SOC? ¿Red Team interno?

### Preparación de Preguntas para el Entrevistador
Preguntas que demuestran interés y madurez:
- "¿Cómo es el flujo de escalamiento de incidentes en el equipo?"
- "¿Qué herramientas están usando actualmente para SIEM/SOAR?"
- "¿Cómo miden la efectividad del equipo de seguridad? (KPIs, métricas)"
- "¿Cuál es el proceso de onboarding para nuevos miembros del equipo?"
- "¿Qué proyectos de mejora tiene planificados el equipo para los próximos 6 meses?"
- "¿Cómo manejan el balance entre seguridad y productividad del negocio?"

### Checklist Pre-Entrevista
- [ ] Investigar la empresa (LinkedIn, web, noticias).
- [ ] Investigar a los entrevistadores (LinkedIn, perfil técnico).
- [ ] Repasar tus 3 proyectos principales del portafolio (formato STAR).
- [ ] Tener 3 preguntas preparadas para el final.
- [ ] Verificar conexión a internet, cámara, micrófono (si es remoto).
- [ ] Tener papel y lápiz para anotaciones (presencial o remoto).
- [ ] Ropa profesional (aunque sea remoto: camisa o blazer).
- [ ] Agua cerca.
- [ ] Ambiente silencioso y sin interrupciones.
- [ ] Cargar tu CV actualizado y el portafolio en el escritorio.

---

## 5. Manejo de Preguntas Difíciles

**No sé la respuesta:** "Esa es una excelente pregunta. No tengo la respuesta en este momento, pero así es como abordaría el problema: [explicar metodología de solución]. ¿Podría investigarlo y enviarle mi respuesta por correo?"

**Pregunta sobre experiencia no relevante:** "No tengo experiencia directa con [tecnología X], pero he trabajado con [tecnología Y] que comparte principios similares. Por ejemplo, [explicar analogía técnica]."

**Pregunta sobre fracaso:** Usa STAR inverso: "En mi laboratorio, intenté implementar [X] pero no funciónó porque [causa]. Aprendí [lección] y lo resolví haciendo [acción correctiva]. Ahora incluyo [mejora] en todos mis proyectos."

**Salario:** "Estoy abierto a negociar basado en el paquete total. Mi expectativa está en el rango de mercado para un rol de [nivel] en [industria/ubicación]. ¿Cuál es el rango presupuestado para esta posición?"

---

## 6. Señales de Alerta (Banderas Rojas) en Candidatos

Lo que los entrevistadores técnicos detectan como negativo:
- **Arrogancia técnica:** "Eso es fácil", "Yo sé más que..."
- **No saber decir "no lo sé":** Intentar inventar una respuesta.
- **Enfoque solo ofensivo:** Solo habla de hacking, nunca de defensa.
- **Desinterés en el negocio:** No preguntar sobre la empresa, el equipo, los desafíos.
- **Mal lenguaje corporal:** No mirar a los ojos, brazos cruzados, mirada al techo.
- **Llegar tarde:** Sin aviso ni justificación.
- **No tener preguntas:** "No, todo bien" → muestra desinterés.
- **Criticar a empleadores anteriores:** Señal de falta de profesionalismo.
- **Mencionar actividades ilegales:** "Una vez entré al sistema de mi universidad..."

---

## 7. Post-Entrevista: El After Action Report

Inmediatamente después de la entrevista:
1. Anota todas las preguntas que te hicieron (repasa respuestas).
2. Identifica preguntas que no supiste responder y busca las respuestas correctas.
3. Escribe un resumen de lo que salió bien y lo que puedes mejorar.
4. Si mencionaron tecnologías específicas, investiga.
5. Envía un correo de agradecimiento al entrevistador dentro de 24 horas.

**Plantilla de agradecimiento post-entrevista:**
```
Estimado/a [Nombre],

Muchas gracias por tu tiempo hoy. Me quedó muy claro el enfoque del equipo y el desafío que están abordando con [mencionar algo específico discutido].

Quedo atento/a a los próximos pasos y disponible para cualquier consulta adicional.

Saludos cordiales,

[Tu nombre]
[Tu LinkedIn]
```

---

## 8. Criterio de Dominio (Autoevaluación)

Revisa si puedes asegurar tu primer empleo:

1. Durante la entrevista, el Gerente de IT te presenta el siguiente escenario: "Tenemos un sistema antiguo (Windows XP) que controla los brazos robóticos de la fábrica. No podemos actualizarlo porque el software dejaría de funcionar, pero es extremadamente vulnerable a Ransomware". Utilizando el concepto de "Segmentación de Red y Compartimentos Estancos", ¿Cuál es tu respuesta técnica madura para gestionar este riesgo?

2. Explica por qué utilizar el **Formato STAR** (Situación, Tarea, Acción, Resultado) durante las respuestas verbales hace que parezcas un profesional experimentado (Senior) en lugar de un estudiante técnico novato.

3. El entrevistador te pregunta sobre tus motivaciones y tú respondes: "Amo la adrenalina de hackear páginas web y encontrar contraseñas". ¿Por qué esta respuesta es una "Bandera Roja" gigantesca para el área de **Recursos Humanos** corporativa y cómo deberías reformularla enfocándote en el **Blue Team**?

4. Repasa todos las guías de este Roadmap de Aprendizaje (De las fases anteriores a las fases anteriores). Si tuvieras que elegir una sola **Analogía** (Ej. El Mesero, El Maletín Blindado, El Sello de Cera) para explicársela al reclutador durante la entrevista, ¿Cuál usarías para demostrar tu profunda capacidad de comunicación técnica, y por qué?

5. Durante la entrevista, el CISO te pregunta: "Describe cómo investigarías una alerta de conexión saliente sospechosa desde un endpoint interno a las 3:00 AM a una IP en un país de alto riesgo." Construye una respuesta completa usando el formato STAR, detallando qué herramientas usarías en cada paso (SIEM, EDR, Threat Intelligence, análisis de procesos, verificación de integridad de archivos).

6. Te preguntan en la entrevista: "En tu opinión, ¿cuál es la vulnerabilidad más crítica en las empresas hoy en día?" Redacta una respuesta madura que muestre entendimiento técnico, conciencia del negocio y perspectiva de Blue Team. Debe incluir: mención de un vector específico, marco de referencia (MITRE, OWASP), e impacto en el negocio medible.
