# Ruta Para Conseguir Trabajo

Esta ruta está pensada para conseguir un primer trabajo en ciberseguridad o acercarte a el desde soporte, redes o sistemas.

Usa también [EMPLEO-READY.md](EMPLEO-READY.md) para saber si ya tienes evidencia suficiente para aplicar.

La idea central es simple: para conseguir oportunidades junior no necesitas saberlo todo, pero si necesitas demostrar fundamentos, criterio, documentacion y capacidad de aprender sin inventar experiencia.

## Roles de Entrada

| Rol | Que hace | Base que debes demostrar |
| --- | --- | --- |
| SOC Analyst Junior | Revisa alertas, logs y eventos | Redes, Windows/Linux, SIEM, MITRE, comunicación |
| Cybersecurity Analyst Junior | Apoya controles, revisiones y reportes | Riesgo, vulnerabilidades, hardening, documentacion |
| NOC Analyst con enfoque security | Monitorea red y disponibilidad | Redes, troubleshooting, logs, escalamiento |
| IT Support security-focused | Soporte con buenas prácticas de seguridad | Windows, identidad, MFA, endpoints, usuarios |
| Vulnerability Management Junior | Revisa hallazgos y prioriza remediación | CVSS, activos, riesgo, comunicación con equipos |
| AppSec Intern/Junior | Revisa apps y apoya a devs | HTTP, OWASP, Git, código, reportes claros |

No todos empiezan directo en "hacker ético". Muchas carreras fuertes empiezan en soporte, redes, sistemas, SOC, GRC o desarrollo seguro.

## Etapa 1: Base Empleable

Duración sugerida: 8 a 12 semanas.

Debes demostrar:

- Redes básicas.
- Linux básico.
- Windows básico.
- GitHub ordenado.
- Notas técnicas claras.
- 3 laboratorios documentados.

Señales de preparacion:

- Puedes explicar redes básicas.
- Puedes leer comandos Linux y Windows sin copiarlos a ciegas.
- Puedes interpretar logs simples.
- Tu GitHub muestra notas técnicas claras.
- Tu README explica que estas estudiando y hacia donde vas.

Lo importante en esta etapa es claridad. Si no puedes explicar DNS, HTTP, Linux básico, permisos y logs, las herramientas avanzadas se vuelven memorizacion fragil.

## Etapa 2: Perfil SOC Junior

Duración sugerida: 8 a 12 semanas.

Debes demostrar:

- Análisis de logs.
- Conceptos de SIEM.
- MITRE ATT&CK básico.
- Respuesta a incidentes.
- Reglas Sigma básicas.
- Comunicación escrita.

Señales de comprensión:

- Puedes explicar como investigarias logs de autenticación.
- Puedes describir una regla Sigma a nivel conceptual.
- Puedes separar evento, alerta, incidente, hipótesis y falso positivo.
- Puedes aplicar MITRE ATT&CK a un caso sin forzar técnicas.

Debes practicar escribir conclusiones, no solo mirar alertas. Un analista junior aporta valor cuando puede decir:

```text
Observe este evento, lo compare con el comportamiento esperado, encontre esta evidencia y recomiendo esta acción.
```

## Etapa 3: Web y Vulnerabilidades

Duración sugerida: 8 a 12 semanas.

Debes comprender:

- HTTP.
- OWASP Top 10.
- Burp Suite Community o curl.
- SQL Injection en entornos autorizados.
- XSS en entornos autorizados.
- Broken Access Control en entornos autorizados.
- Impacto y remediación.

Señales de comprensión:

- Puedes explicar causa, impacto y mitigacion de categorías OWASP.
- Puedes hablar de pruebas permitidas sin atacar sistemas reales.
- Puedes diferenciar encontrar una falla de corregir su causa raíz.

En esta etapa evita enfocarte solo en "explotar". Aprende a explicar causa raíz, impacto real y remediación. Eso te diferencia de alguien que solo siguio pasos de un lab.

## Etapa 4: Automatización

Duración sugerida: 4 a 8 semanas.

Debes comprender:

- Python básico.
- Bash o PowerShell.
- Parsing de logs.
- Manejo de archivos.
- Salidas técnicas simples y legibles.

Señales de comprensión:

- Puedes explicar como se analiza un log linea por linea.
- Puedes explicar que hace un hash y para que sirve.
- Puedes convertir datos técnicos en conclusiones claras sin exponer información sensible.

Automatizar no significa hacer herramientas enormes. Entender como leer datos, resumirlos y explicar límites ya muestra criterio técnico.

## Etapa 5: Aplicar a Trabajos

Cuando tengas evidencia suficiente:

- Aplica a SOC Analyst Junior.
- Aplica a Cybersecurity Analyst Junior.
- Aplica a IT Support Security-focused.
- Aplica a NOC Analyst.
- Aplica a Vulnerability Management Junior.

No esperes sentirte experto para aplicar. Aplica cuando puedas explicar tus proyectos y tus fundamentos con claridad.

Lleva un registro privado de vacantes, fechas, respuestas y aprendizajes de entrevista. Puede ser una hoja de calculo, una nota personal o tu gestor de tareas.

## Cómo Saber a Que Rol Apuntar

Usa estas señales:

| Si te gusta... | Mira hacia... |
| --- | --- |
| Revisar logs, alertas y patrones | SOC / Blue Team |
| Redes, firewalls, VPNs, Wireshark | Network Security / NOC |
| Apps, APIs, bugs y código | AppSec / DevSecOps |
| Cloud, IAM, storage y configuración | Cloud Security |
| Políticas, riesgo, auditoria y controles | GRC |
| Incidentes, evidencia y timelines | DFIR |
| Labs ofensivos autorizados y reportes | Pentesting junior más adelante |

Puedes explorar varias áreas, pero para aplicar conviene vender una historia principal.

## Indicadores de que Ya Puedes Aplicar

- Puedes explicar TCP/IP, DNS, HTTP y TLS a nivel básico.
- Puedes usar Linux sin miedo.
- Puedes revisar logs y escribir una conclusión.
- Puedes explicar OWASP Top 10 con ejemplos.
- Puedes explicar 3 a 5 casos de estudio o proyectos propios.
- Puedes hablar de riesgo, impacto y remediación.
- Tu GitHub no parece una carpeta abandonada.

## Cómo Presentar Este Repositorio

Este repo debe mostrar:

- Ruta de estudio.
- Notas con tus palabras.
- Labs permitidos.
- Scripts pequeños pero explicados.
- Reportes con evidencia y remediación.
- Progreso constante.
- Ética y alcance autorizado.

Evita que parezca una colección de comandos copiados. Cada archivo debe responder: que aprendi, por que importa y como se reduce el riesgo.

## Preguntas de Entrevista que Debes Poder Responder

- Qué pasa cuándo escribes una URL en el navegador?
- Diferencia entre autenticación y autorización.
- Qué es mínimo privilegio?
- Qué buscarias en logs ante múltiples intentos fallidos?
- Qué es OWASP Top 10 y por qué importa?
- Cómo priorizarias vulnerabilidades?
- Qué haria si una cuenta fue comprometida?
- Qué diferencia hay entre firewall, IDS e IPS?
- Cómo explicarias un proyecto de tu GitHub en dos minutos?
- Qué haces cuándo no sabes una respuesta?

## Rutina de Aplicación

Cada semana:

- Mejorar 1 proyecto.
- Publicar 1 nota o lab.
- Aplicar a 5 vacantes.
- Practicar 10 preguntas de entrevista.
- Mejorar CV o LinkedIn con evidencia nueva.

## Señales de Madurez

Vas por buen camino cuando:

- Puedes explicar conceptos sin leer.
- Puedes reconocer límites de tu conocimiento.
- Tus reportes incluyen impacto y remediación.
- Tus labs no exponen datos sensibles.
- Puedes discutir trade-offs, no solo herramientas.
- Tu GitHub tiene estructura y continuidad.
- Pides feedback y corriges.
