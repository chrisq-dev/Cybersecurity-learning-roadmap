---
title: "Metodología y Ética: El Ladrón Profesional"
level: "avanzado"
content_type: "guia"
updated: "2026-06-29"
---

# Metodología y Ética: El Ladrón Profesional

## Objetivo de esta Guía

Dejar atrás la fantasía de Hollywood y entender que el hacking profesional es un trabajo estructurado, burocrático y legal. Un hacker ético no es un rebelde, es un profesional que sigue metodologías rigurosas dentro de límites legales claros.

Las películas muestran a un joven con capucha que teclea 30 segundos y dice "Estoy adentro." La realidad: 80% del tiempo lees documentación, 15% configuras herramientas, 5% ejecutas el ataque. Esta guía cubre las reglas de enfrentamiento, las 5 fases del hacking, la ética profesional, y la delgada línea que separa un profesional de un criminal.

## La Fina Línea: Legalidad y la Carta de Salida de Prisión

La diferencia técnica entre un cibercriminal y un penetration tester es exactamente cero. Ambos usan las mismas herramientas (Kali Linux, Nmap, Metasploit), las mismas técnicas, explotan las mismas vulnerabilidades. La única diferencia entre cobrar 10,000 dólares o ir a prisión 15 años es un contrato firmado.

### Las Reglas de Enfrentamiento (Rules of Engagement - ROE)

Documento legal firmado antes de cualquier prueba que define:

**Alcance (Scope):** IPs, dominios, y sistemas autorizados. "Puedes atacar 10.0.0.5, pero tienes prohibido tocar 10.0.0.6." Una sola IP de error es un delito.

**Horarios:** Ventanas de tiempo permitidas. "Lunes a viernes de 8:00 PM a 6:00 AM, solo fines de semana." Minimiza impacto en operaciones.

**Técnicas permitidas:** Que métodos están autorizados. "Se permite phishing? Se permite ingeniería social telefónica? Se permite DDoS?" No todo esta permitido.

**Datos permitidos:** Que datos se pueden extraer como prueba. Generalmente solo datos de muestra para demostrar la vulnerabilidad.

**Notificaciones:** A quien avisar antes de las pruebas. El Blue Team debe saber que el Red Team va a atacar para no confundir el test con un ataque real.

**Límites de daño:** Cuanto riesgo se acepta. "No se permite causar caída del servicio de producción bajo ninguna circunstancia."

### La Carta de Salida de Prisión (Get Out of Jail Free Card)

El contrato firmado por el CEO del cliente autoriza las pruebas. Si durante el ataque el Blue Team llama a la policía, el tester presenta el contrato.

Limitaciones de esta carta:
- Solo cubre lo que esta en el alcance. Salirte del alcance anula la protección legal.
- No cubre daños colaterales. Si tu ataque tumba un sistema de otro cliente, respondes legalmente.
- Requiere que el firmante tenga autoridad para autorizar la prueba (CEO, CISO, no un gerente de IT).

### Formas de Consentimiento

**Válido:** Contrato firmado por ambas partes, con alcance detallado, fechas, límites, firmas, y testigos.

**Invalido:** Consentimiento verbal ("si, hazlo"), correo electrónico sin respaldo contractual ("puedes probar"), o permiso de una persona sin autoridad ("el gerente de IT dijo que si").

**Zona gris:** Bug bounty sin contrato formal. Cada programa tiene sus propias reglas. Leerlas y respetarlas es obligatorio.

## Las 5 Fases del Hacking (Cyber Kill Chain)

El hacking sigue un método científico. Existen varios modelos (Lockheed Martin Cyber Kill Chain, PTES, OWASP Testing Guide), pero todos comparten la misma estructura.

### Fase 1: Reconocimiento (Recon)

El ladrón de bancos no entra corriendo el primer día. Pasa semanas observando: horario de los guardias, marcas de cámaras, ruta del camión blindado.

**En ciberseguridad:**
- OSINT: Buscar en Google, LinkedIn, Shodan, WHOIS, GitHub, filtraciones anteriores.
- Redes sociales: Identificar empleados, tecnologías que usan, proveedores.
- Infraestructura: Descubrir dominios, subdominios, IPs, tecnologías.
- Sin tocar el objetivo: Ningún paquete enviado al servidor. El atacante es invisible.

**Por qué es la fase más importante:** Un buen reconocimiento puede hacer que el resto del ataque sea trivial. Saber que el servidor usa Apache 2.4.49 con una vulnerabilidad CVE conocida te da el ataque en bandeja.

### Fase 2: Escaneo y Enumeración

El ladrón camina al banco y disimuladamente empuja la puerta trasera.

**En ciberseguridad:**
- Nmap para escanear puertos abiertos.
- Banner grabbing para identificar versiones de servicios.
- Enumeración de usuarios, recursos compartidos, y servicios.
- El objetivo genera logs (el firewall ve el escaneo).

### Fase 3: Explotación (Ganar Acceso)

Encuentras una cerradura oxidada y aplicas una palanca.

**En ciberseguridad:**
- Buscar exploit para la versión de software identificada.
- Lanzar el exploit (manual o con Metasploit).
- Si funciona, obtienes acceso: una reverse shell, una webshell, o acceso RDP.
- Eres "adentro" del sistema.

### Fase 4: Mantener Acceso (Persistencia)

Si el servidor se reinicia, pierdes el acceso. Necesitas asegurar que puedas volver.

**Métodos de persistencia:**
- Crear usuario administrador falso (con nombre que pase desapercibido, como "backup_svc").
- Instalar servicio que se inicie automáticamente con el sistema.
- Agregar entrada en registro de Windows (Run, RunOnce).
- Programar tarea (scheduled task) que ejecute tu payload periodicamente.
- Modificar archivos de configuración del sistema.
- Instalar web shell en el servidor web.

### Fase 5: Borrado de Huellas

El ladrón limpia sus huellas y borra las cintas de seguridad.

**En ciberseguridad:**
- Eliminar logs que registraron tu actividad.
- Borrar archivos que subiste al sistema.
- Desinstalar herramientas que usaste.
- Restaurar configuraciones que modificaste.
- En un pentest ético, algunas huellas se dejan intencionalmente para que el Blue Team las encuentre y aprenda.

### Variaciones del Modelo

**Lockheed Martin Cyber Kill Chain:** 7 fases (agrega Weaponization y Delivery entre Recon y Exploitation).

**PTES (Penetration Testing Execution Standard):** 7 fases (agrega Post-Exploitation y Reporting).

**OWASP Testing Guide:** Enfocado en aplicaciones web, con su propia taxonomia de pruebas.

Cualquier modelo es válido. Lo importante es cubrir todo el ciclo: desde la investigación inicial hasta la entrega del reporte.

## La Ética del Hacking Profesional

### Principios Fundamentales

**Autorización:** Nunca atacar sin permiso escrito. No importa la excusa: "era solo para probar," "no iba a hacer daño," "la puerta estaba abierta."

**Confidencialidad:** No compartir información del cliente con terceros. Los hallazgos, datos, configuraciones, y vulnerabilidades son propiedad del cliente.

**Integridad:** No modificar datos en sistemas de producción sin autorización. No extraer datos personales de clientes.

**Responsabilidad:** Reportar todas las vulnerabilidades encontradas, no solo las que te pagaron por buscar. Si encuentras algo fuera del alcance, lo reportas pero no lo explotas.

**Divulgación responsable:** Si descubres una vulnerabilidad en un software de terceros (no de tu cliente), notificas al proveedor, esperas un plazo razonable (usualmente 90 días) para que publique un parche, y solo entonces haces pública la vulnerabilidad.

### Dilemas Éticos Frecuentes

**El empleado que mina criptomonedas:** Durante un pentest descubres que un empleado usa servidores de la empresa para minar. No es una vulnerabilidad técnica. Lo reportas? A quien? Tu responsabilidad es con el cliente, pero tienes obligación de reportar actividades sospechosas.

**El hallazgo fuera de alcance:** Encuentras una vulnerabilidad crítica en un sistema que no estaba en el alcance pero que compromete toda la red. La explotas para demostrar el riesgo? O solo la mencionas en el reporte? La respuesta correcta es mencionarla sin explotarla, a menos que el cliente autorice expandir el alcance.

**El dato personal expuesto:** Encuentras una base de datos con datos de clientes accesible sin contraseña. Accedes para confirmar? Te detienes en el primer registro? La respuesta depende del ROE. Algunos contratos permiten acceso mínimo para demostrar la vulnerabilidad. Otros lo prohiben explícitamente.

### El Problema del Hacking "Gris"

Zonas donde los límites no están claros:
- Bug bounty sin contrato formal.
- Investigación de seguridad sin autorización.
- Pruebas en sistemas ajenos que están expuestos.
- Scripts automáticos que escanean internet sin control.

La regla de oro: si no tienes autorización escrita clara, no lo hagas. No importa cuán "ética" sea tu intención.

## Casos Reales

### Contrato Mal Redactado (2018)

Un tester recibio un contrato que autorizaba atacar "todos los sistemas del cliente." Accedio a un sistema cloud de un proveedor externo. El proveedordetecto el ataque y lo reporto a la policía. El contrato no especificaba los sistemas del proveedor. El tester enfrento cargos penales.

### Exceso de Confianza (2020)

Un Red Team interno lanzo un phishing a todos los empleados, incluyendo al CEO, sin informar a la junta. El CEO reporto el incidente, el equipo de IR se activo, pasaron horas de trabajo perdidas. La confianza entre equipos se deterioro.

### Bug Bounty Sin Límites (2021)

Un investigador encontró una vulnerabilidad crítica y para demostrarla extrajo una base de datos de clientes. La empresa lo recompenso pero luego lo denuncio por violar los términos del programa.

## Modos de Falla

No leer el contrato. Asumir permisos que no están escritos. No reportar hallazgos a tiempo. Divulgar información confidencial. No documentar el proceso. Probar técnicas no autorizadas. Operar fuera del alcance.

## Autoevaluación

1. Un amigo aprendió Kali Linux y quiere escanear la IP de la universidad "sin hacer daño." Por qué te niegas? Que riesgos legales existen?
2. En que fase de las 5 usarías SQL Injection? En que fase la persistencia via registro de Windows?
3. Durante un pentest, descubres que la base de datos no esta en el cliente sino en AWS no listado en el contrato. La atacas? Explica legalmente.
4. Por qué el reconocimiento es la fase más importante del ataque? Que información obtienes que hace la explotación trivial?
5. En un bug bounty, lees archivos de configuración del servidor y ves credenciales. Reportas. La empresa dice que violaste los términos. Tenían razón? Como demostrabas la vulnerabilidad sin violarlos?
6. Un cliente pide pentest sin contrato "para ahorrar tiempo." Aceptas? Que riesgos corres?
7. Descubres que un empleado del cliente usa los servidores para minar crypto. Reportas? A quien? Que implicaciones éticas tiene?
8. "Un hacker ético y un cibercriminal usan las mismas herramientas y técnicas. La única diferencia es el papel firmado." Explica por qué es cierta y sus implicaciones.

## Metodologías de Prueba Detalladas

### OWASP Testing Guide (Aplicaciones Web)

El estándar más utilizado para pentest de aplicaciones web. Cubre:
- Recopilacion de información (OSINT, huellas dactilares).
- Pruebas de configuración y gestión (puertos, métodos HTTP, banners).
- Pruebas de autenticación (credenciales débiles, bypass de login, session fixation).
- Pruebas de autorización (escalacion de privilegios, IDOR, path traversal).
- Pruebas de validación de entrada (XSS, SQLi, command injection, SSRF).
- Pruebas de lógica de negocio (flujos de trabajo, límites de transacciones).
- Pruebas de cifrado (TLS, almacenamiento de datos sensibles).

Cada categoría tiene sub-pruebas detalladas con pasos específicos y herramientas recomendadas.

### PTES (Penetration Testing Execution Standard)

Cubre todo el ciclo del pentest:
1. **Interacción previa:** Definir alcance, ROE, contactos, objetivos de negocio.
2. **Recopilacion de inteligencia:** OSINT, escaneo de red, enumeración de servicios.
3. **Modelado de amenazas:** Identificar activos críticos, vectores de ataque, impacto potencial.
4. **Análisis de vulnerabilidades:** Escaneo automático y manual, verificación de falsos positivos.
5. **Explotación:** Confirmar vulnerabilidades, obtener acceso, escalar privilegios.
6. **Post-explotación:** Persistencia, movimiento lateral, recolección de datos.
7. **Reporte:** Documentar hallazgos, evidencias, remediaciones.

### OSSTMM (Open Source Security Testing Methodology Manual)

Enfoque más academico y científico. Define métricas para medir la seguridad:
- Resistencia a ataques.
- Capacidad de detección.
- Tiempo de respuesta.
- Clasifica los canales de ataque (humano, físico, inalámbrico, telecomunicaciones, redes).

## Técnicas Ofensivas Específicas

### Password Spraying vs. Fuerza Bruta

**Fuerza Bruta:** Muchas contraseñas contra un solo usuario. Detectable por bloqueo de cuenta. Ruidoso.

**Password Spraying:** Una contraseña común contra muchos usuarios. Ejemplo: "Invierno2024!" contra todos los correos de la empresa. No bloquea cuentas individuales porque solo intenta 1-2 veces por cuenta. Mucho más sigiloso.

### Kerberoasting

Técnica para obtener credenciales de cuentas de servicio en Active Directory:
1. Un atacante con acceso a la red solicita tickets TGS para cuentas de servicio.
2. El DC devuelve el ticket encriptado con el hash de la cuenta de servicio.
3. El atacante descarga los tickets y los crackea offline.
4. Si la contraseña de la cuenta de servicio es débil, la obtiene.

Detección: Monitorear Event ID 4769 (solicitud de ticket Kerberos) con Encryption Type 0x17 (RC4).

### PasstheHash

Usar el hash NTLM en lugar de la contraseña para autenticarse:
1. El atacante obtiene el hash NTLM de un usuario (de la memoria LSASS, de un dump de SAM, etc.).
2. Usa herramientas como Mimikatz para autenticarse usando solo el hash.
3. No necesita conocer la contraseña en texto plano.

Detección: Monitorear inicios de sesión con NTLM (Event ID 4624, Logon Type 3 o 9) desde cuentas que normalmente usan Kerberos.

## Herramientas del Red Team

**C2 Frameworks (Command and Control):**
- Cobalt Strike: El estándar de la industria. Proporciona payloads, listeners, y capacidades de post-explotación.
- Metasploit: Framework completo para desarrollo de exploits y post-explotación.
- Empire: Framework PowerShell puro (ahora en desuso).
- Covenant: C2 escrito en C#.
- Sliver: C2 open source moderno.

**Herramientas de Post-Explotación:**
- Mimikatz: Robo de credenciales de memoria.
- BloodHound: Mapeo de relaciones en Active Directory para encontrar rutas de escalacion.
- PowerSploit: Scripts PowerShell para evasion, persistencia, y recolección.

**Web Application Testing:**
- Burp Suite: Proxy de intercepción, scanner automático, herramientas de manipulación de requests.
- OWASP ZAP: Alternativa open source a Burp Suite.
- SQLMap: Automatización de detección y explotación de SQL Injection.

## Comunicación con el Cliente

Habilidades blandas necesarias:
- Explicar vulnerabilidades técnicas a audiencias no técnicas.
- Manejar objeciones ("eso no es un riesgo real").
- Negociar alcance cuando se descubren sistemas inesperados.
- Mantener la calma cuando un cliente esta estresado por un hallazgo crítico.
- Saber cuando presionar y cuando dar espacio.

## Preguntas Adicionales

9. Durante un pentest, el firewall del cliente bloquea todas tus herramientas de C2. Como estableces comunicación con el sistema comprometido? Que alternativas existen?
10. Explica la diferencia entre Password Spraying y Fuerza Bruta. Cual es más sigilosa y por qué?
11. Durante la post-explotación, encuentras que Active Directory tiene múltiples rutas de escalacion de privilegios. Cual reportas primero? Cual priorizas?
12. El cliente te pide que NO uses técnicas de ingeniería social porque "sus empleados son muy inteligentes." Como respondes profesionalmente?
13. Descubres que el CTO del cliente esta usando una contraseña débil en su cuenta de administrador. Lo incluyes en el reporte? Como manejas la situación diplomaticamente?
14. Después del pentest, el cliente implementa las remediaciones pero te pide que no incluyas las vulnerabilidades en el reporte final para "no tener evidencias negativas." Cual es tu respuesta?

## Tipos de Pruebas de Seguridad

### Pentest de Caja Negra (Black Box)
El tester no tiene información previa del objetivo.
- Ventajas: Simula un atacante externo real. Evalua la información que se filtra sin querer.
- Desventajas: Puede perder tiempo en reconocimiento básico que no aporta valor. No evalua profundamente.
- Duracion tipica: 2-4 semanas.

### Pentest de Caja Blanca (White Box)
El tester tiene acceso completo a la información (código fuente, diagramas de red, credenciales).
- Ventajas: Evaluación más profunda. Encuentra vulnerabilidades que un atacante externo no encontraria fácilmente. Mayor cobertura.
- Desventajas: No evalua la capacidad de detección del equipo defensor. Puede dar una falsa sensación de seguridad.
- Duracion tipica: 3-6 semanas.

### Pentest de Caja Gris (Gray Box)
El tester tiene información parcial (credenciales de usuario estándar, diagramas de red básicos).
- Ventajas: Balance entre profundidad y realismo. Simula un atacante con acceso inicial (insider threat, credenciales comprometidas).
- Desventajas: Requiere definir cuidadosamente el alcance de la información proporcionada.
- Duracion tipica: 2-4 semanas.

### Red Team Exercise
Ejercicio completo que simula un ataque real con objetivos definidos (robar datos de clientes, comprometer AD, etc.).
- Ventajas: Evalua capacidades de detección y respuesta del Blue Team. Mide el tiempo de detección y contención.
- Desventajas: Costoso y requiere mucha coordinacion. Puede causar estrés en el equipo defensor.
- Duracion tipica: 4-12 semanas.

## Ética y Límites

### Reglas de Engagement (ROE)

Documento firmado por ambas partes antes de comenzar cualquier prueba. Debe incluir:

**Alcance técnico:**
- Que sistemas, redes, y aplicaciones están incluidos y excluidos.
- Que técnicas están permitidas (Ingeniería social? Phishing? Ataques físicos?).
- Ventanas de prueba (horario, días de la semana, fechas límites).
- IPs de origen de las pruebas (para que el cliente pueda whitelistear si es necesario).

**Puntos de contacto:**
- Quien autoriza la prueba.
- A quien contactar en caso de incidente real durante la prueba.
- Canales de comunicación de emergencia.

**Manejo de datos:**
- Que datos se recolectaran durante la prueba.
- Como se almacenaran y transmitiran los datos sensibles.
- Cuando y como se eliminaran los datos después del reporte.

**Límites y exclusiones:**
- Que NO se debe hacer (denegación de servicio, modificación de datos sin autorización, acceso a datos personales sin necesidad).
- Sistemas críticos que no deben ser tocados.
- Usuarios que no deben ser objetivo (CEO, personal médico en hospitales, etc.).

### Dilemas Éticos Comunes

**Vulnerabilidad descubierta fuera del alcance:**
Durante un pentest de una aplicación web, encuentras una vulnerabilidad en el servidor de base de datos que no estaba en el alcance. Éticamente, debes reportarlo, pero no explotarlo. El cliente puede querer que lo incluyas en el reporte o que lo trates por separado.

**Datos de clientes reales expuestos:**
Encuentras una base de datos con información real de clientes. Debes detener la prueba, notificar inmediatamente al cliente, y documentar. No debes extraer ni examinar los datos más allá de lo necesario para confirmar la exposición.

**Credenciales de empleados comprometidas:**
Encuentras un archivo con contraseñas de empleados. No debes usarlas para acceder a sistemas sin autorización específica. Debes reportar el hallazgo responsablemente.

## Preguntas Adicionales

15. Durante un pentest, el firewall del cliente bloquea todas tus herramientas de C2. Como estableces comunicación con el sistema comprometido? Que alternativas existen para establecer un canal de C2?
16. Explica en detalle la diferencia entre Password Spraying y Fuerza Bruta. Bajo que circunstancias usarías cada técnica?
17. Durante la post-explotación, encuentras múltiples rutas de escalacion en AD. Cual reportas primero? Cual priorizas para el cliente basándote en riesgo de negocio?
18. El cliente te pide que NO uses ingeniería social porque "sus empleados son muy inteligentes." Como respondes profesionalmente explicando la importancia de la capa humana?
19. Descubres que el CTO del cliente usa la contraseña "admin123" en su cuenta de administrador. Lo incluyes en el reporte? Como manejas esta situación con tacto?
