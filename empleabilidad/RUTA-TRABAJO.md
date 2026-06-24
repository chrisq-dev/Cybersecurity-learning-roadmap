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

Evidencia minima:

- `labs/PRIMEROS-LABS.md` completado con tus resultados.
- Una nota de redes.
- Una nota de Linux.
- Una nota de Windows.
- Un README claro.

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

Evidencia minima:

- 2 investigaciones de logs.
- 1 regla Sigma.
- 1 mini reporte de incidente.
- 1 explicacion de MITRE ATT&CK aplicada a un caso.

Debes practicar escribir conclusiones, no solo mirar alertas. Un analista junior aporta valor cuando puede decir:

```text
Observe este evento, lo compare con el comportamiento esperado, encontre esta evidencia y recomiendo esta accion.
```

## Etapa 3: Web y Vulnerabilidades

Duracion sugerida: 8 a 12 semanas.

Debes demostrar:

- HTTP.
- OWASP Top 10.
- Burp Suite Community o curl.
- SQL Injection en labs.
- XSS en labs.
- Broken Access Control en labs.
- Reportes con impacto y remediacion.

Evidencia minima:

- 3 writeups permitidos de PortSwigger.
- 1 tabla OWASP con causa, impacto y mitigacion.
- 1 lab local vulnerable y corregido.

En esta etapa evita enfocarte solo en "explotar". Aprende a explicar causa raiz, impacto real y remediacion. Eso te diferencia de alguien que solo siguio pasos de un lab.

## Etapa 4: Automatizacion

Duracion sugerida: 4 a 8 semanas.

Debes demostrar:

- Python basico.
- Bash o PowerShell.
- Parsing de logs.
- Manejo de archivos.
- Reportes simples.

Evidencia minima:

- Script para analizar logs.
- Script para calcular hashes.
- Script para generar reporte en Markdown.

Automatizar no significa hacer herramientas enormes. Un script pequeno que parsea logs, resume datos o genera evidencia ya muestra criterio tecnico.

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
- Tienes 3 a 5 proyectos o labs documentados.
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
