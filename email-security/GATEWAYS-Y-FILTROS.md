---
title: "Seguridad de Gateways: El Control de Aduanas"
---

# Seguridad de Gateways: El Control de Aduanas

## Objetivo de esta Guía

Aprender como la empresa detiene los misiles balísticos (Ransomware adjunto) antes de que lleguen al escritorio del empleado.

El protocolo DMARC (visto en la guía anterior) detiene las falsificaciones de identidad. Pero que pasa si un atacante envía un correo desde una cuenta de Gmail 100% real, y le adjunta un archivo PDF con un virus adentro? DMARC dejará pasar el correo porque técnicamente es un correo valido de Gmail. Necesitamos un sistema de Aduanas.

Aqui entra el Secure Email Gateway (SEG), el equivalente al control de aduanas en un aeropuerto. Todo correo que entra o sale de la empresa pasa por este sistema que inspecciona, analiza y decide si el contenido es seguro.

## La Analogía

Imagina que compras un paquete en el extranjero. Antes de que llegue a tu casa, tiene que pasar por la Aduana del país. Los agentes abren el paquete, lo pasan por rayos X, huelen si hay explosivos, y si lo consideran seguro, le ponen un sello verde y te lo mandan.

El Secure Email Gateway (SEG) es ese agente de aduanas. Se pone literalmente en medio de internet y tu servidor de correo corporativo. Todo el correo del mundo tiene que pasar por el primero.

Pero la aduana no es un solo proceso. Tiene múltiples capas:

1. Inspeccion visual (Filtrado básico): El agente mira el paquete, ve de donde viene, y decide si es sospechoso por el origen.
2. Rayos X (Escaneo de contenido): El agente pasa el paquete por una máquina para ver que hay adentro sin abrirlo.
3. Perros entrenados (Detección por firmas): El perro huele sustancias conocidas (firmas de malware).
4. Cuarto de cuarentena (Sandbox): Si el agente no esta seguro, mete el paquete en un cuarto blindado y lo abre con un robot para ver que pasa.

Ninguna capa es perfecta. La seguridad real esta en la combinación de todas.

## Secure Email Gateway (SEG)

El SEG es un servidor (físico o en la nube) que se coloca como proxy de correo. Todo el tráfico SMTP entrante y saliente pasa a través de el.

### Arquitectura del SEG

Hay dos modos de despliegue:

1. Gateway Inbound: El registro MX del dominio apunta al SEG en lugar de apuntar directamente al servidor de correo. El SEG recibe el correo, lo analiza, y si es seguro, lo reenvia al servidor interno.

2. Gateway Outbound: Todo el correo que envían los empleados sale primero al SEG, que lo analiza para evitar fuga de datos (DLP) y luego lo reenvia a internet.

En empresas grandes, el SEG inbound y outbound son servidores diferentes para balancear la carga.

### Funciones Principales del SEG

el SEG hace de todo, no solo una cosa. Vamos por partes.

**Anti-Spam (Filtrado de Correo No Deseado)**

El SEG utiliza múltiples técnicas para identificar spam:

- Filtrado por reputación de IP: Mantiene listas de IPs conocidas por enviar spam (DNSBL - DNS-based Blackhole Lists).
- Filtrado por contenido: Analiza el texto del correo en busca de patrones tipicos de spam.
- Filtrado por heuristicas: Combina múltiples senales (puntuación) para determinar si un correo es spam.
- Filtrado por autenticación: Verifica SPF, DKIM y DMARC antes de cualquier otro análisis.

**URL Rewriting (Reescritura de Enlaces)**

Esta técnica intercepta cada enlace en el cuerpo del correo y lo reemplaza por un enlace del SEG.

Ejemplo:
- Enlace original: `https://sitio-malicioso.com/payload.exe`
- Enlace reescrito: `https://seg.empresa.com/click?id=7a8f9e&url=https://sitio-malicioso.com/payload.exe`

Cuando el usuario hace clic, la petición pasa por el SEG que:

1. Analiza la URL en tiempo real contra bases de datos de phishing.
2. Abre la URL en una máquina virtual remota (detección por comportamiento).
3. Si es maliciosa, muestra una pagina de advertencia al usuario.
4. Si es segura, redirige al destino original.

Además, el SEG registra cada clic, permitiendo al SOC identificar usuarios que hacen clic en enlaces sospechosos y nuevos dominios de phishing.

**Anti-Malware (Escaneo de Archivos Adjuntos)**

El SEG analiza cada archivo adjunto con múltiples antivirus simultáneamente (hasta 30 motores diferentes). Si al menos uno detecta algo, el archivo se bloquea.

Los motores incluyen: ClamAV (open source), McAfee, Kaspersky, ESET, Sophos.

Además del escaneo por firmas:

- Análisis de extensiones: Bloquea extensiones peligrosas (.exe, .vbs, .scr, .js, .hta).
- Análisis de tipos MIME: Verifica que el tipo declarado coincida con el contenido real.
- Análisis de macros: Abre los documentos de Office y analiza las macros en busca de comportamiento sospechoso.

**Filtrado de Contenido (DLP Básico)**

El SEG puede inspeccionar el contenido del correo en busca de datos sensibles:

- Números de tarjeta de crédito (patrones de 16 dígitos).
- Números de seguro social.
- Contraseñas en texto plano.
- Documentos marcados como Confidencial.

Si se detecta un patrón sensible, el SEG puede bloquear el correo, ponerlo en cuarentena o enviar una alerta.

## Sandboxing: La Caja de Arena

El problema del escaneo por firmas es que solo detecta malware conocido. Para los ataques Zero-Day, necesitamos algo más: el Sandbox (caja de arena).

### Como Funciona el Sandbox

1. El SEG recibe un correo con un archivo adjunto sospechoso (ej. un PDF).
2. En lugar de analizarlo con firmas, el SEG crea una máquina virtual desechable.
3. Copia el archivo dentro de la VM.
4. Ejecuta el archivo como lo haría un usuario normal (doble clic).
5. Monitorea el comportamiento del archivo durante 2-5 minutos:
   - Modifica el registro de Windows?
   - Se conecta a una IP externa?
   - Intenta inyectarse en otros procesos?
   - Crea archivos en carpetas del sistema?
6. Si el comportamiento es malicioso, el SEG destruye la VM, elimina el correo y registra los IoCs.
7. Si el comportamiento es benigno, el SEG entrega el correo al usuario.

### Técnicas de Evasion que Combate el Sandbox

Los creadores de malware saben que los sandboxes existen y han desarrollado técnicas para evadirlos.

**Detección de VM**

El malware verifica si se esta ejecutando en una VM:

- Revisa si hay procesos de VMware o VirtualBox.
- Revisa si el disco duro es virtual.
- Revisa si hay drivers de VM en el sistema.
- Revisa el tamaño de la RAM.

**Time-delay Execution**

El malware incluye un retraso:

- Espera 10-15 minutos antes de ejecutar codigo malicioso.
- El sandbox típico solo analiza por 2-3 minutos.
- Cuando el sandbox destruye la VM y entrega el correo, el malware se activa en el equipo real.

**Conditional Execution**

El malware solo se activa si se cumplen condiciones específicas:

- El idioma del sistema es el esperado (ej. ruso).
- La zona horaria es la correcta.
- El nombre de usuario esta en una lista blanca.

**Sleep Loops con Llamadas al Sistema**

El malware usa llamadas al sistema que los sandboxes tienen problemas para emular:

- Sleep de larga duracion.
- Esperar a que el usuario mueva el mouse.
- Esperar a que haya actividad de red.

### Contramedidas de Sandbox Avanzado

Los SEGs modernos han mejorado sus sandboxes:

1. Perfiles de VM Personalizados: Usan configuraciones diferentes para parecer máquinas reales.
2. Análisis en Tiempo Real en el Endpoint: Algunos EDRs tienen sandboxes locales.
3. Golden Images con Datos Reales: Las VMs tienen datos de usuario reales.
4. Detección de Evasion: El sandbox detecta cuando un archivo intenta detectar la VM.

### Limitaciones del Sandbox

- Rendimiento: Analizar cada archivo en una VM es costoso.
- Falsos Positivos: Archivos legítimos pueden comportarse como malware.
- Ventana de Evasion: Malware que espera horas o dias evade el análisis.
- Cobertura: No todos los adjuntos se analizan en sandbox (solo los sospechosos).

## Casos Reales

### El Ataque a la Cadena de Suministro de M.E.Doc (2017)

En 2017, el ransomware NotPetya se propago a través del software de contabilidad ucraniano M.E.Doc. Los atacantes comprometieron el servidor de actualizaciones de M.E.Doc y enviaron una actualización maliciosa a todos los clientes.

El correo que anunciaba la actualización no contenia malware visible. Era un correo legítimo desde la dirección real de M.E.Doc pidiendo a los usuarios descargar una actualización. El SEG no podía bloquearlo porque:

- El correo era genuino (SPF, DKIM, DMARC pasaban).
- No tenía adjuntos maliciosos.
- El enlace apuntaba al sitio legítimo de M.E.Doc.

La leccion: el SEG no protege contra ataques a la cadena de suministro donde el software legítimo se vuelve malicioso.

### El Phishing que Evadio el Sandbox (2020)

Un grupo de atacantes creo un PDF malicioso que:

1. Detectaba que se ejecutaba en un sandbox (revisaba el tamaño de pantalla).
2. Si detectaba VM, mostraba un PDF en blanco (comportamiento benigno).
3. Si detectaba un equipo real, descargaba el malware desde un servidor remoto.

El sandbox del SEG lo clasifico como benigno y entregó el correo. El usuario abrió el PDF en su equipo real y la infección comenzó.

### Business Email Compromise con Adjunto Malicioso (2019)

Una empresa de logística perdió 2 millones de dólares cuando un empleado de Finanzas abrió un archivo Excel adjunto a un correo. El correo parecia venir de un proveedor legítimo (dominio real, SPF/DKIM correctos). El Excel contenia una macro que descargaba un ladrón de credenciales.

El SEG tenía sandbox habilitado, pero el Excel estaba protegido con contrasena (el sandbox no podía abrirlo sin la contrasena). La contrasena estaba en el cuerpo del correo.

La leccion: los archivos protegidos con contrasena son una señal de alerta para el SEG y deben ser bloqueados.

## Modos de Falla

### Falla 1: Depender Solo del Sandbox

El sandbox no es infalible. Malware avanzado evita la detección. La combinación de firmas, heuristicas, reputación y sandbox es necesaria.

### Falla 2: No Configurar Cuarentena Humana

Muchos SEGs bloquean correos sospechosos pero no permiten que un analista revise los falsos positivos. Correos legítimos de clientes pueden ser bloqueados y nadie los revisa.

### Falla 3: Ignorar el Correo Saliente

El SEG saliente es igual de importante que el entrante. Un empleado comprometido puede enviar datos de clientes por correo. Sin DLP saliente, la fuga de datos pasa desapercibida.

### Falla 4: Tiempo de Análisis Insuficiente

Si el sandbox analiza por 2 minutos pero el malware espera 5, la evasion funciona. Los SEGs deben configurarse con tiempos de análisis largos.

### Falla 5: No Actualizar las Reglas

Las firmas de spam y malware cambian cada hora. Un SEG sin actualizaciones frecuentes es inútil.

## La Mirada del Hacker

Como atacante, el SEG es un obstaculo molesto pero no insuperable.

### Evadir el SEG con Archivos Protegidos

Envio un archivo ZIP protegido con contrasena. El SEG no puede abrirlo para analizar el contenido. La contrasena la pongo en el cuerpo del correo, que el SEG si puede leer.

Variante: el archivo legítimo (una factura real) tiene un exploit oculto en los metadatos. El SEG analiza el PDF, ve una factura real, y lo deja pasar.

### Usar Servicios de Correo Legítimos

No necesito mi propio servidor SMTP. Uso una cuenta de Gmail, Outlook o ProtonMail real. El correo pasa SPF, DKIM y DMARC porque viene de un servidor legítimo. El SEG lo trata como correo confiable.

### Fragmentacion de Contenido

Distribuyo el payload en múltiples correos. Cada correo individual es benigno. Cuando el usuario los abre todos, el malware se reconstruye.

### Timing del Envio

Envio correos sospechosos en fines de semana o feriados, cuando el SOC tiene menos personal. El SEG automático puede detectar, pero la revisión humana se retrasa.

### Ataque al Propio SEG

Si logró comprometer el SEG (ej. a través de una vulnerabilidad en la interfaz web de administración), puedo:

- Deshabilitar el análisis de malware.
- Agregar mi IP a la lista blanca.
- Reenviar correos internos a mi cuenta externa.

Los SEGs son objetivos de alto valor para APTs.

## Modos de Falla Adicionales

### Falla 6: No Revisar la Cuarentena

Los correos bloqueados por el SEG van a cuarentena. Si nadie revisa la cuarentena periodicamente, correos legítimos de clientes pueden perderse para siempre.

Buena práctica: tener un equipo que revise la cuarentena diariamente y libere falsos positivos.

### Falla 7: Depender de un Solo Motor Antivirus

Si el SEG usa un solo motor antivirus (ej. solo ClamAV), un malware que evada ese motor pasará desapercibido. Usar múltiples motores (multi-scanning) reduce el riesgo.

### Falla 8: No Configurar Reglas de Fisgoneo (Outbound)

El SEG saliente es igual de importante que el entrante. Sin reglas DLP salientes, los empleados pueden enviar datos sensibles por correo sin restriccion.

### Falla 9: Ignorar el Cifrado de Correo

Los correos viajan en texto plano entre servidores SMTP a menos que se use STARTTLS. Sin cifrado en tránsito, cualquier atacante en la ruta puede leer el contenido.

### Falla 10: No Actualizar las Firmas de Forma Automática

Las firmas de spam y malware se actualizan cada pocos minutos. Si el SEG no se actualiza automáticamente, las detecciones quedan obsoletas rápidamente.

## Configuración Práctica de un SEG

Al implementar un SEG, estos son los pasos recomendados:

### Fase 1: Monitorizacion (1-2 semanas)

1. Configurar el SEG en modo "solo monitoreo" (no bloquea nada).
2. Analizar el tráfico de correo normal.
3. Identificar falsos positivos (correos legítimos que serian bloqueados).
4. Ajustar reglas basadas en el tráfico real.

### Fase 2: Bloqueo de Spam (2-4 semanas)

1. Activar el filtrado anti-spam con puntuación baja (bloquear solo lo obvio).
2. Revisar cuarentena diariamente.
3. Ajustar umbrales de spam según los reportes de usuarios.

### Fase 3: Bloqueo de Malware (permanente)

1. Activar el escaneo de adjuntos con todos los motores disponibles.
2. Activar el sandboxing para adjuntos sospechosos.
3. Bloquear extensiones peligrosas (exe, scr, vbs, js, hta).

### Fase 4: URL Rewriting y DLP (permanente)

1. Activar URL Rewriting para todos los enlaces.
2. Configurar reglas DLP para datos sensibles (tarjetas de crédito, SSN).
3. Integrar con el SIEM para alertas en tiempo real.

## Integración del SEG con Otras Herramientas

### SEG + SIEM

El SEG debe enviar logs al SIEM para correlacion con otros eventos:

- Un usuario recibe un correo de phishing y minutos después hay un intento de inicio de sesión anómalo.
- Un usuario descarga un adjunto y el EDR detecta actividad sospechosa.

### SEG + EDR

Cuando el SEG detecta un enlace malicioso, debe informar al EDR para que:

- Bloquee el dominio en todos los endpoints.
- Aisle el endpoint si el usuario hizo clic.
- Busque indicadores de compromiso (IoCs) en toda la flota.

### SEG + SOAR

El SOAR puede automatizar respuestas:

- Cuando el SEG detecta un nuevo dominio de phishing, actualizar automáticamente las listas negras del firewall.
- Cuando un usuario reporta un correo como phishing (con un botón en Outlook), el SOAR analiza el correo y bloquea enlaces similares para todos los usuarios.

## Métodos de Entrega Alternativos para Evadir el SEG

Los atacantes constantemente buscan formas de evadir el SEG. Algunas técnicas:

### Adjuntos en la Nube

En lugar de adjuntar un archivo malicioso, el correo contiene un enlace a Google Drive, Dropbox o OneDrive donde esta alojado el malware. El SEG no puede analizar el archivo porque esta en un servicio externo.

### Imagenes con Texto

En lugar de escribir el mensaje de phishing en texto (que el SEG puede analizar), el atacante incluye una imagen con el texto. Los OCRs de los SEGs modernos pueden detectar texto en imagenes, pero no siempre.

### Correo Fragmentado

El atacante envía el payload en múltiples correos a lo largo del tiempo. Cada correo individual es benigno. Cuando el usuario los recibe todos, las instrucciones le indican como combinarlos.

### Abuso de Servicios de Redirección

Usar acortadores de URL (bit.ly, tinyurl) o servicios de redirección legítimos para ocultar la URL maliciosa. El SEG ve un enlace a un servicio legítimo, no al destino final.

## Modos de Falla Adicionales

### Falla 6: No Revisar la Cuarentena

Los correos bloqueados por el SEG van a cuarentena. Si nadie revisa la cuarentena periodicamente, correos legítimos de clientes pueden perderse para siempre.

Buena práctica: tener un equipo que revise la cuarentena diariamente y libere falsos positivos.

### Falla 7: Depender de un Solo Motor Antivirus

Si el SEG usa un solo motor antivirus (ej. solo ClamAV), un malware que evada ese motor pasará desapercibido. Usar múltiples motores (multi-scanning) reduce el riesgo.

### Falla 8: No Configurar Reglas de Fisgoneo (Outbound)

El SEG saliente es igual de importante que el entrante. Sin reglas DLP salientes, los empleados pueden enviar datos sensibles por correo sin restriccion.

### Falla 9: Ignorar el Cifrado de Correo

Los correos viajan en texto plano entre servidores SMTP a menos que se use STARTTLS. Sin cifrado en tránsito, cualquier atacante en la ruta puede leer el contenido.

### Falla 10: No Actualizar las Firmas de Forma Automática

Las firmas de spam y malware se actualizan cada pocos minutos. Si el SEG no se actualiza automáticamente, las detecciones quedan obsoletas rápidamente.

## Configuración Práctica de un SEG

Al implementar un SEG, estos son los pasos recomendados:

### Fase 1: Monitorizacion (1-2 semanas)

1. Configurar el SEG en modo "solo monitoreo" (no bloquea nada).
2. Analizar el tráfico de correo normal.
3. Identificar falsos positivos (correos legítimos que serian bloqueados).
4. Ajustar reglas basadas en el tráfico real.

### Fase 2: Bloqueo de Spam (2-4 semanas)

1. Activar el filtrado anti-spam con puntuación baja (bloquear solo lo obvio).
2. Revisar cuarentena diariamente.
3. Ajustar umbrales de spam según los reportes de usuarios.

### Fase 3: Bloqueo de Malware (permanente)

1. Activar el escaneo de adjuntos con todos los motores disponibles.
2. Activar el sandboxing para adjuntos sospechosos.
3. Bloquear extensiones peligrosas (exe, scr, vbs, js, hta).

### Fase 4: URL Rewriting y DLP (permanente)

1. Activar URL Rewriting para todos los enlaces.
2. Configurar reglas DLP para datos sensibles (tarjetas de crédito, SSN).
3. Integrar con el SIEM para alertas en tiempo real.

## Integración del SEG con Otras Herramientas

### SEG + SIEM

El SEG debe enviar logs al SIEM para correlacion con otros eventos:

- Un usuario recibe un correo de phishing y minutos después hay un intento de inicio de sesión anómalo.
- Un usuario descarga un adjunto y el EDR detecta actividad sospechosa.

### SEG + EDR

Cuando el SEG detecta un enlace malicioso, debe informar al EDR para que:

- Bloquee el dominio en todos los endpoints.
- Aisle el endpoint si el usuario hizo clic.
- Busque indicadores de compromiso (IoCs) en toda la flota.

### SEG + SOAR

El SOAR puede automatizar respuestas:

- Cuando el SEG detecta un nuevo dominio de phishing, actualizar automáticamente las listas negras del firewall.
- Cuando un usuario reporta un correo como phishing (con un botón en Outlook), el SOAR analiza el correo y bloquea enlaces similares para todos los usuarios.

## Métodos de Entrega Alternativos para Evadir el SEG

Los atacantes constantemente buscan formas de evadir el SEG. Algunas técnicas:

### Adjuntos en la Nube

En lugar de adjuntar un archivo malicioso, el correo contiene un enlace a Google Drive, Dropbox o OneDrive donde esta alojado el malware. El SEG no puede analizar el archivo porque esta en un servicio externo.

### Imagenes con Texto

En lugar de escribir el mensaje de phishing en texto (que el SEG puede analizar), el atacante incluye una imagen con el texto. Los OCRs de los SEGs modernos pueden detectar texto en imagenes, pero no siempre.

### Correo Fragmentado

El atacante envía el payload en múltiples correos a lo largo del tiempo. Cada correo individual es benigno. Cuando el usuario los recibe todos, las instrucciones le indican como combinarlos.

### Abuso de Servicios de Redirección

Usar acortadores de URL (bit.ly, tinyurl) o servicios de redirección legítimos para ocultar la URL maliciosa. El SEG ve un enlace a un servicio legítimo, no al destino final.

## Autoevaluación

Responde estas preguntas para verificar si comprendes los conceptos:

1. El protocolo DMARC verifica la autenticidad matemática del remitente, mientras que un Secure Email Gateway (SEG) inspecciona el contenido del correo. Explica, usando la analogía de Aduanas, por que una empresa moderna necesita implementar ambos controles y no puede depender de uno solo.

2. Un empleado del departamento de Recursos Humanos recibe cientos de currículums en formato PDF todos los dias. Un atacante le envía un PDF infectado con un Malware Zero-Day (totalmente desconocido para los Antivirus tradicionales). Explica como el proceso de Sandboxing en el Gateway de correo logrará detectar que el PDF es malicioso a pesar de no tener una firma de virus conocida.

3. El SEG de tu empresa incluye la funcion de URL Rewriting. Un usuario hace clic en un enlace de un correo para rastrear un paquete de Amazon. Usando la lógica del Hombre en el Medio, explica que hace la tecnología de URL Rewriting en el milisegundo entre que el usuario hace clic y la pagina web carga en su navegador.

4. Si la tecnología de Sandboxing es tan buena detonando bombas virtuales antes de que lleguen al usuario, Por que crees que los creadores de Malware avanzados programan sus virus para dormir y no hacer nada durante los primeros 10 minutos después de ser ejecutados?

5. Un atacante envía un archivo ZIP protegido con contrasena adjunto a un correo. Por que esta técnica puede evadir el sandbox del SEG y como se podría mitigar este riesgo?

6. Explica la diferencia entre la protección que ofrece DMARC y la protección que ofrece un SEG. En que escenarios uno es suficiente y el otro no?

7. Un correo de un proveedor legítimo pero comprometido llega al SEG. El proveedor tiene SPF, DKIM y DMARC configurados correctamente. El correo es genuino desde el punto de vista técnico, pero contiene un enlace a un sitio de phishing. Como detectaria el SEG este ataque?

8. Por que la configuración del SEG Outbound (correo saliente) es importante para prevenir la fuga de datos (DLP)?
