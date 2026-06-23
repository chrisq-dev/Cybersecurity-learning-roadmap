# Temario Maestro de Ciberseguridad

Este archivo es el mapa grande del repositorio. No tienes que dominar todo al mismo tiempo. Sirve para saber que existe, que estudiar despues y donde ir agregando notas.

## 1. Fundamentos de Computacion

- Hardware: CPU, RAM, almacenamiento, red y perifericos.
- Sistemas operativos: kernel, procesos, memoria, filesystem y drivers.
- Usuarios, grupos, permisos y privilegios.
- Linea de comandos.
- Archivos de configuracion.
- Servicios y procesos en segundo plano.
- Logs y auditoria.
- Virtualizacion y contenedores.

Debes poder responder:

- Que pasa cuando abres un programa.
- Que diferencia hay entre usuario normal, administrador y root.
- Por que los logs son importantes en seguridad.

## 2. Redes

- Modelo OSI.
- Modelo TCP/IP.
- IPv4 e IPv6.
- Subnetting y CIDR.
- Puertos TCP/UDP.
- ARP.
- ICMP.
- DNS.
- DHCP.
- NAT.
- HTTP/HTTPS.
- TLS.
- Routing.
- Switching.
- VLANs.
- ACLs.
- VPNs.
- Firewalls.
- Proxies.
- Balanceadores.
- Wireshark.

Debes poder responder:

- Que ocurre cuando visitas una pagina web.
- Como se resuelve un dominio.
- Como viaja un paquete entre redes.
- Como separar redes con VLANs.
- Como una ACL permite o bloquea trafico.

## 3. Cisco y Networking Practico

- Packet Tracer o laboratorio equivalente.
- Configuracion basica de switches y routers.
- Interfaces.
- VLANs.
- Trunks.
- Routing estatico.
- OSPF basico.
- NAT.
- ACLs estandar y extendidas.
- DHCP en router.
- Troubleshooting.

Debes poder hacer:

- Diseñar una red pequena.
- Separar usuarios por VLAN.
- Permitir o bloquear trafico con ACLs.
- Diagnosticar conectividad.

## 4. Linux

- Filesystem.
- Permisos.
- Usuarios y grupos.
- Procesos.
- Servicios con systemd.
- Logs.
- SSH.
- Cron.
- Bash scripting.
- Paquetes.
- Red en Linux.
- Hardening basico.
- Sudoers.
- Firewall local.

Debes poder hacer:

- Administrar permisos.
- Revisar procesos sospechosos.
- Revisar logs de autenticacion.
- Automatizar tareas simples.
- Proteger SSH con configuraciones basicas.

## 5. Windows

- Usuarios y grupos locales.
- Permisos NTFS.
- Servicios.
- Registro de Windows.
- Event Viewer.
- PowerShell.
- Windows Defender.
- Firewall de Windows.
- Logs de seguridad.
- Sysmon.

Debes poder hacer:

- Revisar eventos de login.
- Consultar procesos y servicios.
- Usar PowerShell para listar usuarios, procesos y eventos.
- Entender permisos basicos.

## 6. Active Directory

- Dominios.
- Domain Controllers.
- Usuarios, grupos y equipos.
- OUs.
- GPOs.
- LDAP.
- Kerberos.
- NTLM.
- DNS en AD.
- Grupos privilegiados.
- Delegacion.
- Politicas de contrasenas.
- Hardening basico.
- Riesgos comunes.

Debes poder responder:

- Que es un dominio.
- Como se autentica un usuario.
- Por que Kerberos es importante.
- Por que los grupos privilegiados son sensibles.

## 7. Programacion para Seguridad

- Python basico.
- Manejo de archivos.
- JSON y CSV.
- Expresiones regulares.
- Requests HTTP.
- APIs.
- Parsing de logs.
- Hashing.
- Bash.
- PowerShell.
- Git.
- Estructura de scripts.
- Manejo de errores.

Debes poder crear:

- Parser de logs.
- Calculadora de hashes.
- Script de inventario simple.
- Script que consuma una API.
- Generador simple de reportes.

## 8. Seguridad Web

- HTTP.
- HTTPS.
- Headers.
- Cookies.
- Sesiones.
- Autenticacion.
- Autorizacion.
- APIs REST.
- JSON Web Tokens.
- CORS.
- SameSite.
- CSP.
- Uploads.
- Validacion de entrada.
- Control de acceso.
- Server-side vs client-side.

Debes poder responder:

- Que diferencia hay entre autenticacion y autorizacion.
- Como funciona una cookie de sesion.
- Por que validar solo en frontend no es suficiente.

## 9. OWASP Top 10

- Broken Access Control.
- Cryptographic Failures.
- Injection.
- Insecure Design.
- Security Misconfiguration.
- Vulnerable and Outdated Components.
- Identification and Authentication Failures.
- Software and Data Integrity Failures.
- Security Logging and Monitoring Failures.
- Server-Side Request Forgery.

Debes documentar por cada una:

- Definicion.
- Causa comun.
- Impacto.
- Ejemplo en laboratorio.
- Mitigacion.

## 10. Blue Team

- Logs.
- SIEM.
- Alertas.
- Triage.
- Investigacion.
- MITRE ATT&CK.
- IOC.
- TTP.
- Sigma.
- YARA.
- Threat hunting.
- Respuesta a incidentes.
- Playbooks.
- Deteccion de fuerza bruta.
- Deteccion de malware.
- Deteccion de movimiento lateral.

Debes poder hacer:

- Analizar una alerta.
- Separar falso positivo de posible incidente.
- Escribir una conclusion.
- Proponer una accion.
- Crear una deteccion simple.

## 11. Red Team y Pentesting Controlado

- Etica y autorizacion.
- Alcance.
- Reconocimiento.
- Enumeracion.
- Escaneo.
- Analisis de servicios.
- Explotacion en labs.
- Privilege escalation en labs.
- Post-explotacion conceptual.
- Limpieza y reporte.
- Remediacion.

Debes poder hacer:

- Trabajar solo en labs o sistemas autorizados.
- Documentar metodologia.
- Explicar impacto.
- Recomendar mitigaciones.

## 12. Security Teams, Hats y Roles

- Blue Team.
- Red Team autorizado.
- Purple Team.
- White Team.
- AppSec Team.
- Cloud Security Team.
- DFIR Team.
- Threat Intelligence Team.
- GRC Team.
- White Hat.
- Black Hat.
- Gray Hat.
- Diferencia entre rol profesional y actividad ilegal.
- Reglas de autorizacion.
- Scope y rules of engagement.

Debes poder responder:

- Diferencia entre Red Team y Black Hat.
- Que hace Blue Team.
- Que hace Purple Team.
- Que hace White Team.
- Por que White Hat es la ruta correcta.
- Por que Gray Hat puede ser riesgoso.
- Que equipos existen en una organizacion moderna.

Material:

- `security-teams/`

## 13. Criptografia Aplicada

- Encoding vs hashing vs encryption.
- Hashes.
- Salt.
- Password hashing.
- Cifrado simetrico.
- Cifrado asimetrico.
- Firmas digitales.
- Certificados.
- TLS.
- PKI.
- Manejo de secretos.

Debes poder responder:

- Por que un hash no es cifrado.
- Por que no se deben guardar contrasenas en texto plano.
- Como ayuda TLS a proteger trafico.

## 14. Cloud Security

- Responsabilidad compartida.
- IAM.
- Usuarios, roles y politicas.
- MFA.
- Redes cloud.
- Security groups.
- Storage.
- Buckets publicos.
- Logging.
- Monitoreo.
- Secret managers.
- Kubernetes basico.
- Contenedores.
- CI/CD security.

Debes poder responder:

- Que protege el proveedor cloud y que proteges tu.
- Por que IAM es una fuente comun de incidentes.
- Por que el logging es critico en cloud.

## 15. Seguridad de Aplicaciones y DevSecOps

- SDLC.
- Threat modeling.
- SAST.
- DAST.
- Dependency scanning.
- Secret scanning.
- Code review de seguridad.
- CI/CD.
- Seguridad en contenedores.
- Firmado de artefactos.
- Supply chain security.

Debes poder hacer:

- Identificar riesgos en una app.
- Revisar dependencias vulnerables.
- Explicar controles en un pipeline.

## 16. Malware y Analisis Basico

- Tipos de malware.
- Persistencia.
- Indicadores de compromiso.
- Hashes.
- Strings.
- YARA.
- Sandboxes.
- Analisis estatico basico.
- Analisis dinamico controlado.

Debes poder hacer:

- Extraer informacion basica de un archivo sospechoso en un entorno seguro.
- Crear una regla YARA simple.
- Documentar IOCs.

## 17. Forense Digital e Incidentes

- Cadena de custodia.
- Evidencia.
- Imagenes de disco.
- Memoria.
- Timeline.
- Logs.
- Artefactos de Windows.
- Artefactos de Linux.
- Reporte de incidente.

Debes poder responder:

- Como preservar evidencia.
- Que preguntas hacer durante un incidente.
- Como escribir una linea de tiempo.

## 18. Gobernanza, Riesgo y Cumplimiento

- Politicas.
- Controles.
- Riesgo.
- Auditoria.
- NIST CSF.
- ISO 27001.
- CIS Controls.
- Privacidad.
- Gestion de vulnerabilidades.

Debes poder responder:

- Como se prioriza un riesgo.
- Que es un control.
- Por que la seguridad tambien es proceso.

## 19. Habilidades Profesionales

- Escritura tecnica.
- Reportes ejecutivos.
- Reportes tecnicos.
- Comunicacion con equipos.
- Priorizacion.
- Pensamiento critico.
- Aprendizaje continuo.
- Etica profesional.
- CV y LinkedIn.
- Entrevistas tecnicas.
- Portafolio.
- Aplicaciones.
- Networking profesional.

Debes poder hacer:

- Explicar un hallazgo a una persona tecnica.
- Explicar el mismo hallazgo a una persona no tecnica.
- Defender una recomendacion con evidencia.
- Presentar un proyecto del repo en entrevista.
- Registrar aplicaciones y aprender de rechazos.

## Material Desarrollado en Este Repo

Para estudiar directamente desde el repo, empieza con:

- `fundamentos/`
- `redes-cisco/`
- `linux/`
- `windows-ad/`
- `web-owasp/`
- `programacion/`
- `blue-team/`
- `cloud-security/`
- `cripto/`
- `red-team/`
- `security-teams/`
- `appsec-devsecops/`
- `forense/`
- `malware-basico/`
- `vulnerability-management/`
- `grc/`
- `api-security/`
- `containers-kubernetes/`
- `privacy/`
- `email-security/`
- `wireless-security/`
- `security-architecture/`
- `identity-access/`
- `business-continuity/`
- `network-security/`
- `endpoint-security/`
- `database-security/`
- `capstone-projects/`
- `cheatsheets/`
- `evaluaciones/`
- `playbooks/`
- `plantillas/`
- `labs/`
- `empleabilidad/EMPLEO-READY.md`
- `empleabilidad/TRACKER-APLICACIONES.md`

Cada modulo debe estudiarse con el mismo ciclo:

1. Leer explicacion.
2. Escribir resumen propio.
3. Hacer practica.
4. Documentar evidencia.
5. Marcar avance.
