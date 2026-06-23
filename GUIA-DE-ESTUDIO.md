# Guia de Estudio de Ciberseguridad

Esta guia esta pensada para estudiar ciberseguridad de forma ordenada, desde fundamentos hasta practica real en laboratorios. No es una lista de herramientas: es una ruta para entender sistemas, redes, ataques, defensa, automatizacion y documentacion profesional.

## Como Usar Este Repositorio

1. Lee el tema en la carpeta correspondiente.
2. Crea tus propias notas con tus palabras.
3. Haz un laboratorio pequeno.
4. Documenta comandos, errores, observaciones y lecciones.
5. Marca el avance en `roadmap/CHECKLIST.md`.
6. Repite hasta poder explicar el tema sin copiar.

Usa [INDICE-MAESTRO.md](INDICE-MAESTRO.md) cuando quieras encontrar un tema rapido.

## Regla Principal

No avances solo por "haberlo visto". Avanza cuando puedas:

- Explicar el concepto.
- Dar un ejemplo.
- Ejecutar una practica.
- Detectar errores comunes.
- Explicar el riesgo de seguridad.
- Proponer una mitigacion.

## Ruta Recomendada

### 1. Fundamentos

Primero debes entender como funcionan las computadoras, los sistemas operativos, las redes y los conceptos basicos de seguridad.

Lee en este orden:

- [fundamentos/COMPUTACION-BASICA.md](fundamentos/COMPUTACION-BASICA.md)
- [fundamentos/SISTEMAS-OPERATIVOS.md](fundamentos/SISTEMAS-OPERATIVOS.md)
- [fundamentos/IDENTIDAD-PERMISOS.md](fundamentos/IDENTIDAD-PERMISOS.md)
- [fundamentos/BASE-DE-SEGURIDAD.md](fundamentos/BASE-DE-SEGURIDAD.md)

Estudia:

- CPU, RAM, disco, procesos y archivos.
- Usuarios, permisos y privilegios.
- Redes: IP, puertos, protocolos, DNS, DHCP, HTTP y TLS.
- Seguridad: confidencialidad, integridad, disponibilidad, autenticacion, autorizacion y auditoria.
- Riesgo: amenaza, vulnerabilidad, impacto y probabilidad.

Practica:

- Explica el modelo OSI con tus palabras.
- Identifica puertos comunes: 22, 53, 80, 443, 445, 3389.
- Usa `ping`, `traceroute`, `nslookup`, `dig`, `curl` y `netstat` o `ss`.

### 2. Redes y Cisco

La seguridad depende mucho de redes. Si no entiendes redes, muchas alertas, ataques y configuraciones seran confusas.

Lee en este orden:

- [redes-cisco/FUNDAMENTOS-REDES.md](redes-cisco/FUNDAMENTOS-REDES.md)
- [redes-cisco/MODELO-OSI-TCPIP.md](redes-cisco/MODELO-OSI-TCPIP.md)
- [redes-cisco/IP-SUBNETTING.md](redes-cisco/IP-SUBNETTING.md)
- [redes-cisco/DNS-DHCP-NAT.md](redes-cisco/DNS-DHCP-NAT.md)
- [redes-cisco/SWITCHING-VLANS-ACLS.md](redes-cisco/SWITCHING-VLANS-ACLS.md)

Estudia:

- IPv4, subnetting y CIDR.
- Switching, VLANs y trunking.
- Routing estatico y dinamico.
- NAT, ACLs, DHCP y DNS.
- Wireshark y analisis de trafico.

Practica:

- Calcula subredes manualmente.
- Diseña una red pequena con VLANs.
- Crea reglas ACL simples.
- Captura trafico HTTP, DNS y TLS en Wireshark.

### 3. Linux

Linux aparece en servidores, herramientas de seguridad, cloud, contenedores y laboratorios.

Lee en este orden:

- [linux/FUNDAMENTOS-LINUX.md](linux/FUNDAMENTOS-LINUX.md)
- [linux/COMANDOS-BASICOS.md](linux/COMANDOS-BASICOS.md)
- [linux/PERMISOS-USUARIOS.md](linux/PERMISOS-USUARIOS.md)
- [linux/PROCESOS-SERVICIOS-LOGS.md](linux/PROCESOS-SERVICIOS-LOGS.md)

Estudia:

- Sistema de archivos.
- Permisos y ownership.
- Procesos y servicios.
- Logs.
- SSH.
- Bash.
- Hardening basico.

Practica:

- Crea usuarios y grupos.
- Cambia permisos con `chmod` y `chown`.
- Revisa logs de autenticacion.
- Crea scripts simples en Bash.
- Configura SSH de forma mas segura.

### 4. Windows y Active Directory

Muchas empresas usan Windows y Active Directory. Para Blue Team, Red Team y SOC, esto es clave.

Lee en este orden:

- [windows-ad/FUNDAMENTOS-WINDOWS-AD.md](windows-ad/FUNDAMENTOS-WINDOWS-AD.md)
- [windows-ad/WINDOWS-BASICO.md](windows-ad/WINDOWS-BASICO.md)
- [windows-ad/POWERSHELL-EVENTOS.md](windows-ad/POWERSHELL-EVENTOS.md)
- [windows-ad/ACTIVE-DIRECTORY.md](windows-ad/ACTIVE-DIRECTORY.md)

Estudia:

- Usuarios, grupos y permisos.
- Event Viewer.
- PowerShell.
- Servicios.
- Active Directory.
- Kerberos, LDAP y GPO.

Practica:

- Consulta eventos de seguridad.
- Ejecuta comandos basicos de PowerShell.
- Explica que es un dominio.
- Explica autenticacion Kerberos a nivel conceptual.

### 5. Programacion para Seguridad

No necesitas ser ingeniero de software senior, pero si debes poder automatizar y entender codigo.

Lee en este orden:

- [programacion/FUNDAMENTOS-PYTHON-SEGURIDAD.md](programacion/FUNDAMENTOS-PYTHON-SEGURIDAD.md)
- [programacion/PYTHON-BASICO.md](programacion/PYTHON-BASICO.md)
- [programacion/LOGS-JSON-CSV-APIS.md](programacion/LOGS-JSON-CSV-APIS.md)

Estudia:

- Python.
- Bash.
- PowerShell.
- Expresiones regulares.
- JSON, CSV y logs.
- APIs.
- Git.

Practica:

- Crea un parser de logs.
- Calcula hashes de archivos.
- Lee un archivo CSV y genera un reporte.
- Consume una API publica.

### 6. Seguridad Web y OWASP

Gran parte de la seguridad moderna esta en aplicaciones web y APIs.

Lee en este orden:

- [web-owasp/FUNDAMENTOS-WEB.md](web-owasp/FUNDAMENTOS-WEB.md)
- [web-owasp/HTTP.md](web-owasp/HTTP.md)
- [web-owasp/AUTENTICACION-AUTORIZACION.md](web-owasp/AUTENTICACION-AUTORIZACION.md)
- [web-owasp/OWASP-TOP-10.md](web-owasp/OWASP-TOP-10.md)
- [web-owasp/SQL-INJECTION.md](web-owasp/SQL-INJECTION.md)
- [web-owasp/XSS.md](web-owasp/XSS.md)
- [web-owasp/CSRF.md](web-owasp/CSRF.md)
- [web-owasp/SSRF.md](web-owasp/SSRF.md)
- [web-owasp/FILE-UPLOAD.md](web-owasp/FILE-UPLOAD.md)

Estudia:

- HTTP.
- Cookies y sesiones.
- Autenticacion y autorizacion.
- APIs REST.
- OWASP Top 10.
- SQL Injection.
- XSS.
- CSRF.
- SSRF.
- Broken Access Control.
- File Upload.
- Security headers.

Practica:

- Resuelve labs de PortSwigger Web Security Academy.
- Documenta cada vulnerabilidad con: causa, impacto, explotacion en lab y remediacion.
- Crea ejemplos locales vulnerables y corregidos.

### 7. Blue Team

Blue Team es defensa: detectar, investigar, responder y mejorar controles.

Lee en este orden:

- [blue-team/FUNDAMENTOS-BLUE-TEAM.md](blue-team/FUNDAMENTOS-BLUE-TEAM.md)
- [blue-team/LOGS-Y-ALERTAS.md](blue-team/LOGS-Y-ALERTAS.md)
- [blue-team/SIEM-MITRE.md](blue-team/SIEM-MITRE.md)
- [blue-team/SIGMA-YARA.md](blue-team/SIGMA-YARA.md)
- [blue-team/RESPUESTA-INCIDENTES.md](blue-team/RESPUESTA-INCIDENTES.md)
- [blue-team/THREAT-HUNTING.md](blue-team/THREAT-HUNTING.md)

Estudia:

- Logs de Linux, Windows, web servers y firewalls.
- SIEM.
- MITRE ATT&CK.
- Sigma.
- YARA.
- Respuesta a incidentes.
- Threat hunting.

Practica:

- Analiza logs de autenticacion.
- Crea una regla Sigma simple.
- Crea una regla YARA simple.
- Documenta una investigacion: alerta, evidencia, conclusion y accion.

### 8. Red Team Controlado

El objetivo es aprender como piensa un atacante para defender mejor y hacer pruebas autorizadas.

Lee en este orden:

- [red-team/METODOLOGIA-ETICA.md](red-team/METODOLOGIA-ETICA.md)
- [red-team/RECONOCIMIENTO-ENUMERACION.md](red-team/RECONOCIMIENTO-ENUMERACION.md)
- [red-team/REPORTE-REMEDIACION.md](red-team/REPORTE-REMEDIACION.md)

Estudia:

- Reconocimiento.
- Enumeracion.
- Escaneo autorizado.
- Explotacion en laboratorios.
- Privilege escalation en labs.
- Reporte y remediacion.

Practica:

- Usa solo maquinas propias, CTFs o labs autorizados.
- Documenta metodologia, evidencia, impacto y mitigacion.
- Evita publicar spoilers o datos sensibles.

### 9. Cloud Security

La nube es central en empresas modernas. IAM mal configurado, storage expuesto y logs incompletos son problemas comunes.

Lee en este orden:

- [cloud-security/FUNDAMENTOS-CLOUD.md](cloud-security/FUNDAMENTOS-CLOUD.md)
- [cloud-security/IAM-STORAGE-LOGGING.md](cloud-security/IAM-STORAGE-LOGGING.md)
- [cloud-security/AWS-AZURE-GCP.md](cloud-security/AWS-AZURE-GCP.md)

Estudia:

- Modelo de responsabilidad compartida.
- IAM.
- Roles, politicas y permisos.
- Redes cloud.
- Storage.
- Logging y monitoreo.
- Secret management.

Practica:

- Explica el modelo de responsabilidad compartida.
- Compara IAM en AWS, Azure y GCP.
- Documenta riesgos de buckets/storage publicos.

### 10. Criptografia Aplicada

Criptografia aparece en contraseñas, TLS, certificados, integridad, firmas, secretos y comunicaciones.

Lee:

- [cripto/HASHING-CIFRADO-TLS.md](cripto/HASHING-CIFRADO-TLS.md)

Estudia:

- Encoding vs hashing vs cifrado.
- Hashes.
- Password hashing.
- Salt.
- Cifrado simetrico.
- Cifrado asimetrico.
- Certificados.
- TLS.
- Manejo de secretos.

Practica:

- Calcula hashes.
- Explica por que Base64 no es seguridad.
- Revisa un certificado TLS.
- Documenta buenas practicas para secretos.

### 11. Reportes y Portafolio

Saber documentar es parte del trabajo. Un buen reporte explica riesgo, evidencia y solucion.

Todo laboratorio importante debe tener:

- Objetivo.
- Entorno.
- Pasos.
- Evidencia.
- Hallazgo.
- Impacto.
- Remediacion.
- Lecciones aprendidas.

### 12. AppSec y DevSecOps

AppSec protege aplicaciones durante diseño, desarrollo y operacion. DevSecOps integra controles de seguridad en pipelines.

Lee:

- [appsec-devsecops/FUNDAMENTOS-APPSEC.md](appsec-devsecops/FUNDAMENTOS-APPSEC.md)
- [appsec-devsecops/DEVSECOPS.md](appsec-devsecops/DEVSECOPS.md)

Practica:

- Haz threat modeling de una app simple.
- Diseña un pipeline con SAST, dependency scanning y secret scanning.
- Documenta riesgos y controles.

### 13. Forense Digital

Forense ayuda a preservar evidencia y reconstruir que paso.

Lee:

- [forense/FUNDAMENTOS-FORENSE.md](forense/FUNDAMENTOS-FORENSE.md)

Practica:

- Crea una linea de tiempo con logs ficticios.
- Separa evidencia de hipotesis.
- Calcula hashes de archivos de practica.

### 14. Malware Basico

Malware basico ayuda a entender comportamientos, IOCs y detecciones.

Lee:

- [malware-basico/FUNDAMENTOS-MALWARE.md](malware-basico/FUNDAMENTOS-MALWARE.md)

Practica:

- Crea IOCs ficticios.
- Calcula hashes.
- Escribe una regla YARA simple.
- Explica falsos positivos.

### 15. Labs y Proyectos Guiados

La practica consolida el aprendizaje.

Lee y completa:

- [labs/LABS-GUIADOS-FUNDAMENTOS.md](labs/LABS-GUIADOS-FUNDAMENTOS.md)
- [labs/LABS-GUIADOS-BLUE-WEB.md](labs/LABS-GUIADOS-BLUE-WEB.md)
- [labs/PROYECTOS-GUIADOS.md](labs/PROYECTOS-GUIADOS.md)

### 16. Scripts Defensivos

Los scripts ayudan a automatizar tareas repetitivas y crear evidencia practica.

Lee:

- [scripts/README.md](scripts/README.md)

Practica:

- Calcular hashes con `hash_file.py`.
- Generar reporte de autenticacion con `auth_log_summary.py`.
- Revisar inventario ficticio con `asset_inventory_check.py`.

### 17. Gestion de Vulnerabilidades

Aprende a identificar, priorizar, remediar y verificar vulnerabilidades.

Lee:

- [vulnerability-management/FUNDAMENTOS.md](vulnerability-management/FUNDAMENTOS.md)
- [vulnerability-management/PRIORIZACION-Y-CVSS.md](vulnerability-management/PRIORIZACION-Y-CVSS.md)

Practica:

- Crea inventario ficticio.
- Prioriza hallazgos.
- Escribe remediacion y validacion.

### 18. GRC y Riesgo

GRC conecta seguridad con decisiones, controles y evidencia.

Lee:

- [grc/FUNDAMENTOS-GRC.md](grc/FUNDAMENTOS-GRC.md)
- [grc/RIESGO-CONTROLES.md](grc/RIESGO-CONTROLES.md)

Practica:

- Crea matriz de riesgos.
- Define controles preventivos, detectivos y correctivos.
- Especifica evidencia.

### 19. API Security

Las APIs concentran autenticacion, autorizacion, datos y logica de negocio.

Lee:

- [api-security/FUNDAMENTOS-API.md](api-security/FUNDAMENTOS-API.md)
- [api-security/RIESGOS-CONTROLES.md](api-security/RIESGOS-CONTROLES.md)

Practica:

- Diseña permisos por endpoint.
- Identifica BOLA e IDOR.
- Define logs seguros.

### 20. Contenedores y Kubernetes

Contenedores y Kubernetes son comunes en entornos modernos.

Lee:

- [containers-kubernetes/CONTENEDORES.md](containers-kubernetes/CONTENEDORES.md)
- [containers-kubernetes/KUBERNETES-SEGURIDAD.md](containers-kubernetes/KUBERNETES-SEGURIDAD.md)

Practica:

- Revisa riesgos de Dockerfile.
- Explica pods, services, namespaces y RBAC.
- Crea checklist de seguridad Kubernetes.

### 21. Privacidad

Privacidad ayuda a proteger datos personales y sensibles.

Lee:

- [privacy/FUNDAMENTOS-PRIVACIDAD.md](privacy/FUNDAMENTOS-PRIVACIDAD.md)

Practica:

- Clasifica datos.
- Define controles.
- Revisa riesgos de logs con datos sensibles.

### 22. Aplicar a Trabajo

Cuando tengas proyectos y fundamentos, empieza a aplicar.

Lee:

- [empleabilidad/CHECKLIST-APLICAR.md](empleabilidad/CHECKLIST-APLICAR.md)

### 23. Email Security y Phishing

El correo es una de las vias mas comunes de ataque.

Lee:

- [email-security/FUNDAMENTOS-EMAIL.md](email-security/FUNDAMENTOS-EMAIL.md)
- [email-security/PHISHING.md](email-security/PHISHING.md)

Practica:

- Analiza un correo ficticio.
- Explica SPF, DKIM y DMARC.
- Propone controles contra phishing.

### 24. Wireless Security

Wi-Fi debe diseñarse con segmentacion y controles.

Lee:

- [wireless-security/FUNDAMENTOS-WIFI.md](wireless-security/FUNDAMENTOS-WIFI.md)

Practica:

- Diseña red corporativa, invitados y administracion.
- Define VLANs y restricciones.

### 25. Arquitectura de Seguridad

Arquitectura une controles en un diseño coherente.

Lee:

- [security-architecture/FUNDAMENTOS-ARQUITECTURA.md](security-architecture/FUNDAMENTOS-ARQUITECTURA.md)
- [security-architecture/ZERO-TRUST.md](security-architecture/ZERO-TRUST.md)

Practica:

- Diseña controles preventivos, detectivos y correctivos para una app.
- Explica Zero Trust con un caso remoto.

### 26. IAM Corporativo y PAM

Identidad es una de las areas mas importantes de seguridad.

Lee:

- [identity-access/IAM-CORPORATIVO.md](identity-access/IAM-CORPORATIVO.md)
- [identity-access/PAM.md](identity-access/PAM.md)

Practica:

- Crea matriz de accesos.
- Diseña access review.
- Propone controles para cuentas privilegiadas.

### 27. Backups y Continuidad

La recuperacion tambien es seguridad.

Lee:

- [business-continuity/BACKUPS.md](business-continuity/BACKUPS.md)
- [business-continuity/CONTINUIDAD-DRP.md](business-continuity/CONTINUIDAD-DRP.md)

Practica:

- Define RPO/RTO.
- Diseña prueba de restauracion.
- Crea tabletop de ransomware.

### 28. Datos de Laboratorio

Usa datos ficticios para practicar automatizacion.

Lee:

- [labs/data/README.md](labs/data/README.md)
- [labs/reportes/README.md](labs/reportes/README.md)

Practica:

- Ejecuta `auth_log_summary.py`.
- Ejecuta `asset_inventory_check.py`.
- Lee los reportes generados.

### 29. Network Security

Lee:

- [network-security/FIREWALLS-IDS-IPS.md](network-security/FIREWALLS-IDS-IPS.md)
- [network-security/VPN-PROXY-SEGMENTACION.md](network-security/VPN-PROXY-SEGMENTACION.md)

Practica:

- Diseña reglas firewall.
- Define DMZ y segmentacion.
- Explica egress filtering.

### 30. Endpoint Security

Lee:

- [endpoint-security/EDR-ANTIVIRUS-HARDENING.md](endpoint-security/EDR-ANTIVIRUS-HARDENING.md)
- [endpoint-security/TELEMETRIA-ENDPOINT.md](endpoint-security/TELEMETRIA-ENDPOINT.md)

Practica:

- Crea checklist endpoint.
- Analiza parent process conceptual.
- Define accion de contencion.

### 31. Database Security

Lee:

- [database-security/FUNDAMENTOS-DB.md](database-security/FUNDAMENTOS-DB.md)
- [database-security/PERMISOS-AUDITORIA.md](database-security/PERMISOS-AUDITORIA.md)

Practica:

- Diseña roles DB.
- Define auditoria.
- Crea alertas de acceso sospechoso.

### 32. Detection Engineering

Lee:

- [blue-team/DETECTION-ENGINEERING.md](blue-team/DETECTION-ENGINEERING.md)

Practica:

- Diseña deteccion de login fallido seguido de exito.
- Documenta fuente, campos, falsos positivos y respuesta.

### 33. Capstone Projects

Lee:

- [capstone-projects/README.md](capstone-projects/README.md)

Practica:

- Completa al menos un capstone.
- Publica reporte final.
- Usa evidencia, riesgo y remediacion.

### 34. Cheatsheets, Evaluaciones y Repaso

Cuando ya estudiaste un tema, usa estas carpetas para reforzar:

- [cheatsheets/README.md](cheatsheets/README.md)
- [evaluaciones/README.md](evaluaciones/README.md)
- [roadmap/REPASO-30-60-90.md](roadmap/REPASO-30-60-90.md)
- [roadmap/BITACORA-SEMANAL.md](roadmap/BITACORA-SEMANAL.md)

Practica:

- Responde preguntas sin mirar notas.
- Repite labs una semana despues.
- Usa cheatsheets solo para confirmar, no para memorizar sin entender.

### 35. Trabajo Real: Playbooks y Plantillas

Cuando ya entiendas fundamentos, practica documentacion profesional.

Lee:

- [playbooks/README.md](playbooks/README.md)
- [plantillas/README.md](plantillas/README.md)
- [empleabilidad/RUTAS-POR-ROL.md](empleabilidad/RUTAS-POR-ROL.md)
- [empleabilidad/MAPA-SKILLS-EVIDENCIA.md](empleabilidad/MAPA-SKILLS-EVIDENCIA.md)

Practica:

- Toma un caso ficticio.
- Usa un playbook.
- Llena una plantilla de reporte.
- Conecta el resultado con una habilidad laboral.

## Metodo de Estudio Semanal

Cada semana intenta completar:

- 3 sesiones de teoria.
- 2 sesiones de practica.
- 1 resumen escrito.
- 1 mini laboratorio o reto.
- 1 actualizacion del checklist.

## Como Usar IA Para Aprender

Usa IA para:

- Pedir explicaciones alternativas.
- Crear preguntas tipo examen.
- Revisar tus notas.
- Generar ideas de laboratorios.
- Explicar logs.
- Mejorar reportes.

Pero siempre verifica con documentacion oficial, practica real y tu propio criterio.

## Resultado Esperado

Al avanzar por esta guia deberias construir:

- Fundamentos solidos.
- Practica documentada.
- Scripts utiles.
- Reportes tecnicos.
- Criterio ofensivo y defensivo.
- Un portafolio publico serio.
