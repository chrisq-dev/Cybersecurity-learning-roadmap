# Ruta Para Conseguir Trabajo

Esta ruta esta pensada para conseguir un primer trabajo en ciberseguridad o acercarte a el desde soporte, redes o sistemas.

Usa tambien [EMPLEO-READY.md](EMPLEO-READY.md) para saber si ya tienes evidencia suficiente para aplicar.

La idea central es simple: para conseguir oportunidades junior no necesitas saberlo todo, pero si necesitas demostrar fundamentos, criterio, documentacion y capacidad de aprender sin inventar experiencia.

## Roles de Entrada

| Rol | Que hace | Base que debes demostrar |
| --- | --- | --- |
| SOC Analyst Junior | Revisa alertas, logs y eventos | Redes, Windows/Linux, SIEM, MITRE, comunicacion |
| Cybersecurity Analyst Junior | Apoya controles, revisiones y reportes | Riesgo, vulnerabilidades, hardening, documentacion |
| NOC Analyst con enfoque security | Monitorea red y disponibilidad | Redes, troubleshooting, logs, escalamiento |
| IT Support security-focused | Soporte con buenas practicas de seguridad | Windows, identidad, MFA, endpoints, usuarios |
| Vulnerability Management Junior | Revisa hallazgos y prioriza remediacion | CVSS, activos, riesgo, comunicacion con equipos |
| AppSec Intern/Junior | Revisa apps y apoya a devs | HTTP, OWASP, Git, codigo, reportes claros |

No todos empiezan directo en "hacker etico". Muchas carreras fuertes empiezan en soporte, redes, sistemas, SOC, GRC o desarrollo seguro.

## Etapa 1: Base Empleable

Duracion sugerida: 8 a 12 semanas.

Debes demostrar:

- Redes basicas.
- Linux basico.
- Windows basico.
- GitHub ordenado.
- Notas tecnicas claras.
- 3 laboratorios documentados.

Senales de preparacion:

- Puedes explicar redes basicas.
- Puedes leer comandos Linux y Windows sin copiarlos a ciegas.
- Puedes interpretar logs simples.
- Tu GitHub muestra notas tecnicas claras.
- Tu README explica que estas estudiando y hacia donde vas.

Lo importante en esta etapa es claridad. Si no puedes explicar DNS, HTTP, Linux basico, permisos y logs, las herramientas avanzadas se vuelven memorizacion fragil.

## Etapa 2: Perfil SOC Junior

Duracion sugerida: 8 a 12 semanas.

Debes demostrar:

- Analisis de logs.
- Conceptos de SIEM.
- MITRE ATT&CK basico.
- Respuesta a incidentes.
- Reglas Sigma basicas.
- Comunicacion escrita.

Senales de comprension:

- Puedes explicar como investigarias logs de autenticacion.
- Puedes describir una regla Sigma a nivel conceptual.
- Puedes separar evento, alerta, incidente, hipotesis y falso positivo.
- Puedes aplicar MITRE ATT&CK a un caso sin forzar tecnicas.

Debes practicar escribir conclusiones, no solo mirar alertas. Un analista junior aporta valor cuando puede decir:

```text
Observe este evento, lo compare con el comportamiento esperado, encontre esta evidencia y recomiendo esta accion.
```

## Etapa 3: Web y Vulnerabilidades

Duracion sugerida: 8 a 12 semanas.

Debes comprender:

- HTTP.
- OWASP Top 10.
- Burp Suite Community o curl.
- SQL Injection en entornos autorizados.
- XSS en entornos autorizados.
- Broken Access Control en entornos autorizados.
- Impacto y remediacion.

Senales de comprension:

- Puedes explicar causa, impacto y mitigacion de categorias OWASP.
- Puedes hablar de pruebas permitidas sin atacar sistemas reales.
- Puedes diferenciar encontrar una falla de corregir su causa raiz.

En esta etapa evita enfocarte solo en "explotar". Aprende a explicar causa raiz, impacto real y remediacion. Eso te diferencia de alguien que solo siguio pasos de un lab.

## Etapa 4: Automatizacion

Duracion sugerida: 4 a 8 semanas.

Debes comprender:

- Python basico.
- Bash o PowerShell.
- Parsing de logs.
- Manejo de archivos.
- Salidas tecnicas simples y legibles.

Senales de comprension:

- Puedes explicar como se analiza un log linea por linea.
- Puedes explicar que hace un hash y para que sirve.
- Puedes convertir datos tecnicos en conclusiones claras sin exponer informacion sensible.

Automatizar no significa hacer herramientas enormes. Entender como leer datos, resumirlos y explicar limites ya muestra criterio tecnico.

## Etapa 5: Aplicar a Trabajos

Cuando tengas evidencia suficiente:

- Aplica a SOC Analyst Junior.
- Aplica a Cybersecurity Analyst Junior.
- Aplica a IT Support Security-focused.
- Aplica a NOC Analyst.
- Aplica a Vulnerability Management Junior.

No esperes sentirte experto para aplicar. Aplica cuando puedas explicar tus proyectos y tus fundamentos con claridad.

Lleva un registro privado de vacantes, fechas, respuestas y aprendizajes de entrevista. Puede ser una hoja de calculo, una nota personal o tu gestor de tareas.

## Como Saber a Que Rol Apuntar

Usa estas senales:

| Si te gusta... | Mira hacia... |
| --- | --- |
| Revisar logs, alertas y patrones | SOC / Blue Team |
| Redes, firewalls, VPNs, Wireshark | Network Security / NOC |
| Apps, APIs, bugs y codigo | AppSec / DevSecOps |
| Cloud, IAM, storage y configuracion | Cloud Security |
| Politicas, riesgo, auditoria y controles | GRC |
| Incidentes, evidencia y timelines | DFIR |
| Labs ofensivos autorizados y reportes | Pentesting junior mas adelante |

Puedes explorar varias areas, pero para aplicar conviene vender una historia principal.

## Indicadores de que Ya Puedes Aplicar

- Puedes explicar TCP/IP, DNS, HTTP y TLS a nivel basico.
- Puedes usar Linux sin miedo.
- Puedes revisar logs y escribir una conclusion.
- Puedes explicar OWASP Top 10 con ejemplos.
- Puedes explicar 3 a 5 casos de estudio o proyectos propios.
- Puedes hablar de riesgo, impacto y remediacion.
- Tu GitHub no parece una carpeta abandonada.

## Como Presentar Este Repositorio

Este repo debe mostrar:

- Ruta de estudio.
- Notas con tus palabras.
- Labs permitidos.
- Scripts pequenos pero explicados.
- Reportes con evidencia y remediacion.
- Progreso constante.
- Etica y alcance autorizado.

Evita que parezca una coleccion de comandos copiados. Cada archivo debe responder: que aprendi, por que importa y como se reduce el riesgo.

## Preguntas de Entrevista que Debes Poder Responder

- Que pasa cuando escribes una URL en el navegador?
- Diferencia entre autenticacion y autorizacion.
- Que es minimo privilegio?
- Que buscarias en logs ante multiples intentos fallidos?
- Que es OWASP Top 10 y por que importa?
- Como priorizarias vulnerabilidades?
- Que haria si una cuenta fue comprometida?
- Que diferencia hay entre firewall, IDS e IPS?
- Como explicarias un proyecto de tu GitHub en dos minutos?
- Que haces cuando no sabes una respuesta?

## Rutina de Aplicacion

Cada semana:

- Mejorar 1 proyecto.
- Publicar 1 nota o lab.
- Aplicar a 5 vacantes.
- Practicar 10 preguntas de entrevista.
- Mejorar CV o LinkedIn con evidencia nueva.

## Senales de Madurez

Vas por buen camino cuando:

- Puedes explicar conceptos sin leer.
- Puedes reconocer limites de tu conocimiento.
- Tus reportes incluyen impacto y remediacion.
- Tus labs no exponen datos sensibles.
- Puedes discutir trade-offs, no solo herramientas.
- Tu GitHub tiene estructura y continuidad.
- Pides feedback y corriges.
