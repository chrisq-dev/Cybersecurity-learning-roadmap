---
title: "Pretexting y OSINT: El Actor y la Basura Digital"
---

# Pretexting y OSINT: El Actor y la Basura Digital

## Objetivo de esta Guía

Aprender como los criminales usan la actuación teatral y la información pública para vulnerar tu red.

El phishing depende de un clic ciego. Los ataques de alto nivel requieren una estrategia psicológica mucho más invasiva. El atacante necesita conocerte antes del golpe.

El Pretexting es la creación de un escenario fabricado para persuadir a una victima de que revele información o realice una accion. No es solo un correo. Es actuar, improvisar, y manipular en tiempo real, a veces durante semanas enteras.

## La Analogía: El Actor de Método

Un actor de Hollywood no solo aprende líneas. Investiga a su personaje: historia, forma de hablar, vestimenta.

Un atacante que usa pretexting hace lo mismo. Antes de la llamada, investiga a quien va a suplantar: tono de voz, vocabulario, relaciones, horarios. Cuando llama, no improvisa: interpreta un papel ensayado.

## OSINT: El Combustible del Pretexting

El primer paso es investigar al objetivo.

### Que Información Busca el Atacante

Personal: Nombre, cargo, hobbies, familiares, educacion, eventos recientes, afiliaciones.
Organizacional: Jerarquía, colegas, jefes, proyectos, proveedores, políticas internas.
Infraestructura: Tecnologías, proveedores, dispositivos, sistema de tickets.

### Fuentes de Información

toda esta info es pública. No necesitas ser un acosador profesional, solo saber donde mirar.

LinkedIn: Estructura, tecnologías, contactos.
Facebook/Instagram: Vida personal, familiares, ubicaciones.
Twitter: Opiniones, quejas, eventos.
GitHub: Codigo, configuraciones.
Glassdoor: Cultura interna, salarios, quejas.
Google: Noticias, registros públicos.
WHOIS: Información de dominios.
Shodan: Dispositivos expuestos.
Breach databases: Contraseñas historicas.

### El Poder de la Información Pública

La gente publica voluntariamente las respuestas a sus preguntas de seguridad:
- "Nombre de tu mascota" -> Instagram
- "Ciudad de nacimiento" -> Facebook
- "Equipo favorito" -> Twitter

Un estudio de Cambridge mostro que se pueden adivinar preguntas de seguridad con 75% de precision solo con redes sociales.

## Pretexting en Accion

### La Llamada Telefónica

El hacker llama al helpdesk fingiendo ser el VP de Finanzas:

"Mi computadora se bloqueo! Estoy por subir al avión para firmar un contrato de 10 millones. Necesito que me resetees la contrasena AHORA."

Usa OSINT: "Como le dije a tu jefe Roberto en el golf de ayer..."

El empleado, obedeciendo a la autoridad, dicta una nueva contrasena. El hacker de 19 años en pijama obtiene acceso total a la red financiera.

### Pretexting Presencial

El atacante se viste de empresa de limpieza, se presenta en la oficina diciendo que viene a revisar el sistema de ventilacion. Usa OSINT para saber el nombre del jefe de mantenimiento.

Una vez dentro:
- Conecta un USB malicioso
- Instala keylogger hardware
- Toma fotos de documentos
- Escanea la red WiFi

### Pretexting por Correo a RRHH

"Hola, soy Juan Perez de Finanzas. Olvide mi contrasena del sistema de nominas y necesito acceder para procesar la nómina. Mi jefe Carlos Lopez me pidio que escriba. Mi empleado es 12345."

El atacante obtuvo el número de empleado de una foto de gafete en LinkedIn.

### Pretexting en Varios Pasos

Paso 1: Correo falso de "conferencia" a la secretaria del CEO. Se registra con su correo corporativo.
Paso 2: Recordatorio de la conferencia con enlace a "materiales" que requiere login. Ingresa credenciales.
Paso 3: Con sus credenciales, accede al calendario del CEO.
Paso 4: Ve que el CEO tiene reunión con un abogado externo el viernes.
Paso 5: Minutos antes, envía correo falso del abogado con adjuntos maliciosos.
Paso 6: El CEO, esperando los documentos, abre el adjunto.

## Casos Reales

### El Fraude a Google y Facebook (2013-2015)

Evaldas Rimasauskas registro una empresa fantasma con el mismo nombre que Quanta Computer, legítimo proveedor. Investigó el formato exacto de facturas, montos y contactos. Envio facturas falsas desde correos similares. Google y Facebook pagaron más de 100 millones de dólares. No hubo hacking: puro pretexting.

### Kevin Mitnick y Nokia

Mitnick investigó a un empleado de Nokia con acceso al codigo fuente. Llamó a IT de Nokia fingiendo ser el empleado: "Hola, soy John de ingeniería. Trabajo desde casa y necesito acceso al repositorio." IT le dio las credenciales sin verificar.

### MGM Resorts 2023

Scattered Spider investigo empleados de MGM en LinkedIn, identifico personal de IT, y llamó al helpdesk fingiendo ser empleados que necesitaban resetear MFA. Accedieron a una cuenta, escalaron privilegios, y comprometieron la infraestructura cloud. Costo: 100 millones de dólares y 10 dias de caída.

## Formas de Falla

Confiar en identificación por voz: "Reconocio su voz" no es validación suficiente.

No verificar fuera de banda: El empleado debe colgar, buscar el número oficial, y llamar de vuelta.

Procedimientos débiles: "Cualquier ejecutivo puede pedir reset de contrasena" es peligroso.

Falta de entrenamiento contra pretexting: Empleados entrenados para phishing por correo pero no llamadas.

Cultura de "servicio al cliente" toxica: El helpdesk teme negar servicio a un "ejecutivo importante".

Sobre-compartir en redes sociales: Cada publicación sobre tecnología, horarios, viajes es un dato para el atacante.

### Defensa: Protocolos Anti-Humanos

- Ningún reset de contrasena por teléfono. Solicitud por escrito + verificación por videollamada.
- Solicitudes urgentes verificadas por segundo canal.
- Helpdesk con procedimientos que no dependan de información pública.

### Pruebas de Pretexting

La única forma de saber si los empleados son vulnerables es probarlos: llamadas de prueba al helpdesk, visitas de prueba a oficinas, correos de prueba.

## El Ángulo del Hacker

### Por Que Funciona el Pretexting

Autoridad: La gente obedece a figuras de autoridad (Milgram).
Simpatía: Decimos que si a quien nos cae bien.
Reciprocidad: Si alguien te ayuda, sientes que debes devolver el favor.
Escasez: "Solo tengo 5 minutos antes de mi vuelo".
Prueba social: "Tu jefe Roberto me dijo que llamara."

### Ciclo del Pretexting

1. Investigación OSINT.
2. Identificación del vector débil.
3. Construcción del pretexto.
4. Contacto.
5. Extracción.
6. Cobertura.

### Automatización con IA

Los atacantes están automatizando:
- Voz sintetica que imita a la persona suplantada.
- Correos generados por IA que imitan el estilo de escritura.
- Deepfake para videollamadas.

## Construcción de un Pretexto

### Paso 1: Definir el Personaje

Identidad falsa con nombre, cargo, empresa, y motivo de contacto. Investigar jerga del sector, nombres de proyectos internos.

### Paso 2: Ensayar la Interacción

Preparar respuestas a preguntas comunes. Tener excusa para cualquier contratiempo.

### Paso 3: Elegir el Canal

Teléfono, correo, mensajeria, presencial. Cada canal tiene ventajas: el teléfono permite tono de voz persuasivo, el correo deja registro escrito que parece formal.

### Paso 4: Ejecutar con Confianza

El que duda pierde. Confianza y seguridad en cada palabra.

## Senales de Alarma para el Defensor

Pistas que delatan un pretexting:
- La persona no puede proporcionar un número de vuelta directo.
- La historia tiene detalles que no coinciden (timestamps, nombres).
- Urgencia excesiva.
- Pide información o accion que no corresponde a su rol.
- Evita videollamada.
- No puede responder preguntas básicas sobre el contexto que dice conocer.

### Protocolo de Verificación

Paso 1: Decir "Necesito verificar, lo llamare de vuelta."
Paso 2: Buscar el número oficial en la intranet.
Paso 3: Llamar al número oficial y preguntar por la persona.
Paso 4: Si dice "no llame", escalar a seguridad.

## Automatización del Pretexting con IA

Los atacantes usan modelos de voz para clonar voces. Ejemplo: llamada del "CEO" usando voz sintetica entrenada con videos de YouTube.

Deepfake en tiempo real para videollamadas. La victima ve y escucha a la persona suplantada.

Defensa: Codigo de verificación fuera de banda. Pregunta que solo la persona real sabria. Palabra clave pre-acordada.

## Pretexting en la Era Remota

El trabajo remoto multiplico el pretexting. Nadie conoce a los colegas en persona. Es más fácil suplantar a alguien que nunca viste.

Los atacantes se aprovechan: "Hola, soy el nuevo de IT, trabajo remoto desde España."

Protocolo: Verificación visual (videollamada). Directorio de empleados con fotos. Codigo de verificación interno.

## El Costo del Pretexting Exitoso

El ataque a MGM Resorts 2023: un atacante llamó al helpdesk, fingio ser un empleado, obtuvo reset de contrasena, entró a la red, cifró servidores. Costo: $100 millones.

No es solo pérdida económica: reputación, clientes, reguladores.

## Pretexting en el Mundo Físico

El atacante no solo llama. Puede presentarse en persona: falso técnico, falso auditor, falso repartidor.

Técnicas físicas: Tailgating (seguir a un empleado), Shoulder surfing (mirar pantallas), Dumpster diving (revisar basura).

Cada interacción física también usa un pretexto. El uniforme y la actitud son el disfraz.

## Pretexting con IA

### Clonación de Voz

Con segundos de audio de una persona (YouTube, podcasts, llamadas), los atacantes clonan la voz con IA. Llaman a la victima con la voz del CEO.

### Deepfake en Tiempo Real

Deepfake para videollamadas. La victima ve y escucha a la persona suplantada. El atacante usa software como DeepFaceLab o Avatarify.

### Defensa contra IA

Códigos de verificación pre-acordados. Palabra clave que solo la persona real conoce. Verificación fuera de banda (colgar y llamar al número oficial).

## Pretexting en la Era del Trabajo Remoto

El trabajo remoto multiplico el pretexting. Nadie conoce en persona a todos los colegas. Es más fácil suplantar a alguien que nunca viste.

### Ataque Típico Remoto

"Hola, soy Carlos, nuevo en IT. Me incorporo remoto desde Madrid. Necesito acceso al VPN y al sistema de tickets."

### Defensa Remota

Proceso de verificación de nuevos empleados: videollamada de bienvenida, confirmación por HR, credenciales entregadas por dos canales.

## Técnicas de Ingeniería Social Relacionadas

### Baiting

Dejar un USB infectado en el estacionamiento. El empleado lo encuentra, lo conecta por curiosidad, el malware se ejecuta.

### Quid Pro Quo

"Llame para ofrecerle una actualización gratuita de seguridad." El atacante ofrece algo a cambio de acceso.

### Tailgating

Seguir a un empleado a través de una puerta con control de acceso. El empleado sujeta la puerta por cortesia sin verificar.

### Shoulder Surfing

Mirar la pantalla o teclado mientras la victima escribe su contrasena.

### Dumpster Diving

Revisar la basura de la empresa en busca de documentos, discos, post-its con contraseñas.

## Pretexting Defensivo

### Entrenamiento

Simulaciones de pretexting: llamadas de prueba al helpdesk, visitas de prueba a recepción.

### Procedimientos

Checklist de verificación de identidad obligatoria. Reset de contrasena requiere: nombre, fecha de nacimiento, último digito de empleado, codigo de verificación.

### Cultura

No castigar al empleado que cae en simulacro. Reportar errores es seguro.

## Casos Historicos

### Kevin Mitnick (1990s)

El hacker más famoso uso pretexting constantemente. Llamaba a operadores de telefónica, fingia ser técnico, obtenia acceso a sistemas.

### Frank Abagnale (1960s)

El protagonista de "Agarrame si puedes" uso pretexting para hacerse pasar por piloto, médico, abogado. Todos los pretextos tenían nombre, historia, y lenguaje técnico.

## Defensa Organizacional Contra Pretexting

### Políticas de Verificación

Toda solicitud de acceso, reset de contrasena o cambio de privilegios debe verificarse por dos canales.

### Entrenamiento Continuo

Simulaciones de llamadas de pretexting al helpdesk. Pruebas de phishing presencial (visitas falsas de técnicos). Resultados miden vulnerabilidad de la organización.

### Tecnología de Apoyo

Sistemas de verificación de identidad: confirmación por SMS, app de autenticación, token físico. Logs de todas las interacciones de helpdesk.

## El Pretexting en el Mundo Corporativo

### Helpdesk: El Eslabón Más Débil

El helpdesk quiere ayudar. No quiere negar servicio a un ejecutivo. No quiere parecer incompetente.

El atacante explota esto: tono de autoridad, urgencia, conocimiento de jerga interna.

### Defensa del Helpdesk

Script de verificación obligatorio. Si la persona no responde correctamente, escalar a supervisor. No hay excepciones ni para CEO.

## Pretexting en el Sector Salud

Hospitales son objetivos frecuentes. Atacante llama a enfermeria: "Soy el Dr. Perez, necesito las contraseñas del sistema de pacientes para una emergencia."

El personal de salud prioriza la atención al paciente sobre la seguridad. Protocolos de verificación deben ser simples y rapidos.

## El Pretexting como Primer Paso

El pretexting rara vez es el único ataque. Es la puerta de entrada. Una vez dentro, el atacante despliega malware, ransomware o roba datos.

## Pretexting en la Era de la IA Generativa

ChatGPT puede generar guiones de pretexting. Voz sintetica clonada. Deepfake en videollamadas. La defensa requiere verificación fuera de banda obligatoria.

## Senales de Alarma Técnicas

La llamada de la persona suplantada NO se hizo desde el número registrado. La persona pide algo que no coincide con su rol. Hay urgencia inusual.

## Pretexting en el Sector Financiero

Transferencias fraudulentas, verificación de cuentas, suplantación de clientes. El atacante investiga al cliente y llama al banco con datos precisos.

## Defensa Técnica

Sistemas de verificación de identidad. Autenticación multifactor. Límites de transferencia. Aprobación dual para cambios de cuenta.

## El Rol de la Cultura Organizacional

Si la cultura premia la ayuda sin verificación, el pretexting funciona. Si la cultura exige verificación, el pretexting falla.

## Checklist de Verificación

Nombre completo. Número de empleado. Departamento. Jefe directo. Motivo de la solicitud. Verificación por segundo canal (email, app, presencial).

## Impacto del Pretexting en la Empresa

Pérdida financiera directa (transferencias), robo de datos, acceso a sistemas críticos, daño reputacional.

## Medicion de la Vulnerabilidad

Simulaciones de pretexting: llamadas de prueba, visitas de prueba. Medir cuántos empleados verifican y cuántos ceden.

## Pretexting en el Sector Público

Funcionarios públicos capacitados para ayudar. El atacante explota la cultura de servicio. Protocolos de verificación específicos para cada tramite.

## Ciclo de Mejora Continua

Simular -> medir -> entrenar -> simular de nuevo. La defensa contra pretexting nunca termina.

## Resumen para el Líder

El pretexting es la puerta de entrada a ataques mayores. Invertir en verificación de identidad, entrenamiento del helpdesk y procedimientos de doble verificación.

## Reflexion Final

La tecnología más avanzada no detiene a un empleado que dicta su contrasena por teléfono. La defensa comienza en las personas.

## Autoevaluación

1. Un hacker descubre en LinkedIn que un nuevo empleado de Pagos empezó hace 3 dias. Usando pretexting, describe un escenario telefónico para lograr una transferencia no autorizada.

2. Explica la relación entre OSINT y spear phishing. Por que investigar primero lo hace letal?

3. Por que EDR, firewalls e IPS no detectan a una secretaria dictando su contrasena por teléfono?

4. Un empleado recibe llamada de alguien que dice ser IT, sabe su nombre, cargo, y jefe. Que procedimientos debe seguir para verificar?

5. Como se usa LinkedIn para construir un pretexto? Da un ejemplo concreto.

6. En el fraude a Google y Facebook, como se robaron 100 millones sin tecnología ofensiva?

7. Un atacante llama al helpdesk diciendo ser el CEO. El empleado reconoce la voz. Por que no es verificación suficiente?

8. Diseña un protocolo de 3 pasos para reset de contrasena por teléfono que cualquier empleado (incluyendo CEO) deba seguir.

9. Explica el principio de autoridad en pretexting. Por que los atacantes se hacen pasar por ejecutivos?

10. Cual es el vector de ataque más peligroso y difícil de mitigar, y por que recae en el factor humano?
