# Plan de 24 Semanas

Plan inicial de 6 meses para estudiar ciberseguridad de forma constante. Ajustalo segun tu tiempo, pero manten evidencia escrita de cada semana.

## Como Usar Este Plan

Cada semana debe terminar con cuatro evidencias:

- Nota: una explicacion con tus palabras en `notes/` o en el modulo correspondiente.
- Practica: comandos, lab, analisis, script o ejercicio.
- Respuestas: preguntas contestadas en `evaluaciones/RESPUESTAS.md`.
- Estado: avance actualizado en `roadmap/DONDE-VOY.md` y `roadmap/TABLERO.md`.

Si una semana no tiene evidencia, no cuenta como completada aunque hayas leido o visto videos.

## Flujo Semanal

1. Lunes: elegir tema en `roadmap/TABLERO.md`.
2. Martes a jueves: estudiar y practicar.
3. Viernes: contestar preguntas en `evaluaciones/RESPUESTAS.md`.
4. Sabado: documentar nota, lab o reporte.
5. Domingo: actualizar `roadmap/DONDE-VOY.md` y decidir si avanzas.

## Criterio Para Avanzar

Avanza si puedes:

- Explicar el tema sin copiar.
- Resolver al menos una practica.
- Contestar preguntas basicas.
- Nombrar riesgos y mitigaciones.
- Mostrar evidencia escrita.

Si no puedes, repite la semana con una meta mas pequena.

## Mes 1: Fundamentos y Redes

### Semana 1: Computacion y Seguridad Basica

- Estudiar CPU, RAM, disco, procesos y sistema operativo.
- Estudiar CIA: confidencialidad, integridad y disponibilidad.
- Crear un glosario inicial de 30 terminos.
- Practica: explicar que es una vulnerabilidad, una amenaza y un riesgo.

### Semana 2: Modelo OSI y TCP/IP

- Estudiar OSI y TCP/IP.
- Aprender IP, puertos, protocolos y encapsulacion.
- Practica: identificar protocolos comunes y sus puertos.
- Lab: usar `ping`, `traceroute`, `curl`, `nslookup` y `dig`.

### Semana 3: Subnetting y Servicios de Red

- Estudiar IPv4, CIDR y subnetting.
- Estudiar DNS, DHCP, NAT y gateways.
- Practica: calcular subredes.
- Lab: resolver nombres de dominio y analizar respuestas DNS.

### Semana 4: Wireshark y Trafico

- Instalar o estudiar Wireshark.
- Capturar trafico DNS, HTTP y TLS.
- Identificar cliente, servidor, puerto y protocolo.
- Documentar un analisis de trafico simple.

## Mes 2: Linux y Windows

### Semana 5: Linux Basico

- Estudiar estructura de archivos.
- Practicar comandos: `ls`, `cd`, `cat`, `less`, `find`, `grep`, `chmod`, `chown`.
- Crear usuarios y permisos.
- Documentar comandos esenciales.

### Semana 6: Linux Seguridad y Logs

- Estudiar procesos, servicios, systemd y logs.
- Revisar logs de autenticacion.
- Practicar SSH.
- Lab: investigar intentos de login en logs de ejemplo.

### Semana 7: Bash y Automatizacion

- Estudiar variables, condiciones, loops y funciones.
- Crear scripts pequenos.
- Lab: script para buscar errores en logs.
- Documentar entradas, salidas y limitaciones.

### Semana 8: Windows y PowerShell

- Estudiar usuarios, grupos, servicios y eventos.
- Practicar comandos basicos de PowerShell.
- Estudiar Event Viewer.
- Documentar eventos importantes de seguridad.

## Mes 3: Programacion y Web

### Semana 9: Python Basico

- Estudiar tipos de datos, funciones, archivos y errores.
- Leer y escribir archivos.
- Lab: calcular hashes de archivos.
- Crear notas de Python para seguridad.

### Semana 10: Logs, Regex y APIs

- Estudiar expresiones regulares.
- Leer JSON y CSV.
- Consumir una API.
- Lab: parser de logs sencillo.

### Semana 11: HTTP y Aplicaciones Web

- Estudiar requests, responses, headers, cookies y sesiones.
- Usar `curl` o Burp Suite Community.
- Lab: analizar una peticion HTTP.
- Documentar flujo de autenticacion basico.

### Semana 12: OWASP Top 10 Intro

- Leer resumen de OWASP Top 10.
- Estudiar SQL Injection, XSS y Broken Access Control.
- Resolver 2 o 3 labs faciles de PortSwigger.
- Escribir un mini writeup.

## Mes 4: Web Security y Blue Team

### Semana 13: SQL Injection

- Estudiar causa, impacto y mitigacion.
- Practicar en labs autorizados.
- Documentar payloads solo de laboratorio.
- Escribir remediaciones: parametros, ORM, validacion y permisos.

### Semana 14: XSS y CSRF

- Estudiar XSS reflejado, almacenado y DOM.
- Estudiar CSRF.
- Practicar en labs.
- Documentar diferencias y mitigaciones.

### Semana 15: Blue Team Fundamentos

- Estudiar tipos de logs.
- Estudiar SIEM a nivel conceptual.
- Leer sobre MITRE ATT&CK.
- Lab: analizar logs de autenticacion.

### Semana 16: Detecciones

- Estudiar Sigma.
- Estudiar YARA.
- Crear una regla simple de cada una.
- Documentar falsos positivos y contexto.

## Mes 5: Active Directory, Red Team Controlado y Cloud

### Semana 17: Active Directory Conceptual

- Estudiar dominios, usuarios, grupos, OUs y GPOs.
- Estudiar Kerberos y LDAP a nivel conceptual.
- Documentar flujo de autenticacion.

### Semana 18: Seguridad en AD

- Estudiar privilegios, grupos sensibles y malas configuraciones.
- Aprender conceptos de hardening.
- Documentar riesgos comunes.

### Semana 19: Red Team en Labs

- Estudiar reconocimiento, enumeracion y escaneo autorizado.
- Practicar solo en labs.
- Documentar metodologia y reglas eticas.
- Leer `security-teams/TEAMS-Y-HATS.md`.
- Explicar diferencia entre Red Team, Purple Team, White Team, White Hat, Black Hat y Gray Hat.

### Semana 20: Cloud Security Intro

- Estudiar responsabilidad compartida.
- Estudiar IAM, storage y logging.
- Comparar AWS, Azure y GCP.
- Documentar errores comunes.

## Mes 6: Consolidacion y Portafolio

### Semana 21: Respuesta a Incidentes

- Estudiar fases de respuesta a incidentes.
- Crear plantilla de investigacion.
- Lab: analizar una alerta simulada.

### Semana 22: Threat Hunting

- Estudiar hipotesis, evidencia y busquedas.
- Crear una investigacion sencilla.
- Relacionar hallazgos con MITRE ATT&CK.

### Semana 23: Proyecto Practico

- Elegir un proyecto:
  - Parser de logs.
  - Lab web vulnerable y corregido.
  - Guia de hardening Linux.
  - Analisis de trafico con Wireshark.
- Documentar como reporte.

### Semana 24: Revision y Siguiente Ruta

- Revisar checklist.
- Mejorar README y notas.
- Elegir especializacion inicial.
- Definir siguiente plan de 3 meses.
