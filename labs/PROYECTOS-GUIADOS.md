# Proyectos Guiados

Los proyectos guiados sirven para conectar teoria con situaciones realistas. En esta web no se tratan como entregables obligatorios ni como tareas cerradas. Son escenarios de estudio para entender como se aplican los conceptos y que tipo de razonamiento se espera en ciberseguridad.

Un buen proyecto no se mide solo por tener archivos. Se mide por la claridad con la que puedes explicar:

- que problema existe;
- que datos o evidencia se observarian;
- que riesgo representa;
- que controles reducen ese riesgo;
- que limitaciones tiene el analisis;
- que decision tomarias con la informacion disponible.

## Como Leer Estos Proyectos

Cada proyecto debe entenderse como un caso. Puedes reproducirlo en un entorno propio si quieres practicar, pero el valor principal esta en comprender el flujo.

La estructura mental recomendada es:

```text
escenario -> evidencia -> analisis -> riesgo -> controles -> conclusion
```

## Proyecto 1: Analisis de Logs de Autenticacion

### Que Busca Enseñar

Este proyecto enseña como un analista defensivo interpreta intentos de autenticacion, detecta patrones y evita conclusiones apresuradas.

### Escenario

Un sistema registra eventos de login:

```text
2026-06-23T10:00:01 user=admin src_ip=203.0.113.10 result=failed
2026-06-23T10:00:05 user=admin src_ip=203.0.113.10 result=failed
2026-06-23T10:05:00 user=maria src_ip=10.0.0.5 result=success
```

### Como Pensarlo

Preguntas importantes:

- Cuantos fallos hubo?
- Se concentran en un usuario?
- Se concentran en una IP?
- Hubo un login exitoso despues de muchos fallos?
- El usuario tenia privilegios altos?
- La IP origen es esperada?
- El horario es normal?

### Falsos Positivos

No todo patron de fallos es ataque.

Posibles explicaciones benignas:

- usuario olvido su contrasena;
- aplicacion usa credencial antigua;
- dispositivo intenta reconectar;
- integracion mal configurada;
- cambio reciente de politica de contrasenas.

Posibles señales de riesgo:

- muchos usuarios atacados desde la misma IP;
- pocos intentos por usuario en muchos usuarios, posible password spraying;
- login exitoso despues de fallos;
- origen externo desconocido;
- cuenta privilegiada involucrada.

### Lo Que Debe Quedar Claro

El objetivo no es solo contar eventos. El objetivo es explicar si el comportamiento parece normal, sospechoso o incidente, y por que.

## Proyecto 2: Hardening Linux

### Que Busca Enseñar

Hardening significa reducir superficie de ataque. No es aplicar comandos al azar. Es entender que controles reducen que riesgos.

### Areas de Revision

- actualizaciones;
- usuarios y grupos;
- sudo;
- SSH;
- firewall;
- logs;
- permisos;
- servicios innecesarios.

### Como Pensarlo

Ejemplo:

```text
Servicio SSH expuesto + password login + sin MFA + usuario con sudo = riesgo alto.
```

Controles posibles:

- llaves SSH;
- restriccion por IP;
- usuarios nominales;
- sudo limitado;
- logs de autenticacion;
- alertas por fuerza bruta.

### Lo Que Debe Quedar Claro

Cada control debe poder conectarse con un riesgo. Si no puedes explicar que riesgo reduce, probablemente solo estas siguiendo una checklist sin criterio.

## Proyecto 3: OWASP Top 10 con Casos

### Que Busca Enseñar

OWASP Top 10 ayuda a entender categorias comunes de fallas web. El objetivo no es memorizar nombres, sino comprender causa, impacto y mitigacion.

### Vulnerabilidades Iniciales

- Broken Access Control.
- SQL Injection.
- XSS.
- SSRF.
- Security Misconfiguration.

### Como Pensarlo

Para cada vulnerabilidad pregunta:

- donde entra el dato o accion;
- que confianza asume la aplicacion;
- que validacion falta;
- que impacto tendria;
- que control lo previene;
- que log ayudaria a detectarlo.

### Lo Que Debe Quedar Claro

Una vulnerabilidad web se entiende bien cuando puedes explicar la causa raiz y la remediacion, no solo el payload.

## Proyecto 4: Investigacion de Incidente Simulado

### Que Busca Enseñar

Este proyecto enseña como razonar como SOC: separar evidencia, hipotesis y conclusion.

### Caso

Una cuenta muestra varios logins fallidos y luego un login exitoso desde una IP externa desconocida.

### Como Pensarlo

Preguntas:

- el usuario reconoce la actividad?
- hubo MFA?
- hubo cambios despues del login?
- hay descargas, cambios de permisos o creacion de tokens?
- la IP pertenece a VPN o proveedor conocido?
- hay actividad similar en otros usuarios?

### Conclusiones Posibles

- benigno: actividad esperada y confirmada;
- sospechoso: falta contexto, requiere monitoreo;
- incidente: acceso no autorizado confirmado o altamente probable.

### Lo Que Debe Quedar Claro

Un analista no debe saltar directo a "hackeo". Debe construir una conclusion con evidencia.

## Proyecto 5: Revision de Cloud Security

### Que Busca Enseñar

Cloud security se basa en identidad, configuracion, visibilidad y responsabilidad compartida.

### Areas Clave

- IAM;
- MFA;
- storage;
- logs;
- security groups;
- secretos;
- backups;
- cuentas privilegiadas.

### Como Pensarlo

Ejemplo de riesgo:

```text
Bucket publico + datos sensibles + sin logs = riesgo de fuga dificil de investigar.
```

Controles:

- acceso privado;
- cifrado;
- logging;
- politicas por rol;
- alertas;
- revision de permisos.

### Lo Que Debe Quedar Claro

En cloud, muchas brechas ocurren por configuracion e identidad, no por vulnerabilidades complejas.

## Proyecto 6: Email Security y Phishing

### Que Busca Enseñar

El correo sigue siendo una via comun de acceso inicial. Entender phishing implica mirar identidad, dominio, enlaces, adjuntos, headers y comportamiento del usuario.

### Areas Clave

- SPF;
- DKIM;
- DMARC;
- MFA;
- reporte de phishing;
- concientizacion;
- analisis de headers;
- enlaces y adjuntos.

### Como Pensarlo

Preguntas:

- el dominio del remitente es legitimo?
- SPF/DKIM/DMARC alinean?
- el enlace apunta a un dominio esperado?
- hay urgencia, presion o suplantacion?
- el usuario interactuo?
- hubo login posterior?

### Lo Que Debe Quedar Claro

Phishing no se analiza solo por apariencia. Se analiza combinando señales tecnicas y contexto humano.

## Proyecto 7: Ransomware Tabletop

### Que Busca Enseñar

Un tabletop no prueba herramientas. Prueba decisiones, comunicacion y preparacion.

### Escenario

Una organizacion detecta archivos cifrados en varios equipos y sospecha ransomware.

### Como Pensarlo

Preguntas:

- que sistemas estan afectados?
- hay backups?
- los backups estan aislados?
- hay propagacion activa?
- quien decide apagar, aislar o restaurar?
- cual es el RTO/RPO?
- que se comunica a usuarios y directivos?

### Lo Que Debe Quedar Claro

Responder ransomware requiere coordinacion. No basta con "tener backup"; hay que saber restaurar, contener y comunicar.

## Proyecto 8: Revision de Accesos

### Que Busca Enseñar

La revision de accesos busca comprobar si usuarios, roles y permisos siguen teniendo sentido.

### Como Pensarlo

Preguntas:

- el usuario sigue en la organizacion?
- el rol corresponde a su funcion?
- hay privilegios excesivos?
- hay cuentas compartidas?
- hay cuentas sin owner?
- hay accesos antiguos no revocados?

### Lo Que Debe Quedar Claro

El acceso excesivo no siempre parece incidente, pero aumenta impacto cuando una cuenta se compromete.

## Capstone Projects

Los capstones combinan varios temas en un escenario mas grande:

- investigacion SOC;
- pequeña empresa segura;
- AppSec review;
- Cloud Security review.

La idea de un capstone es integrar teoria: redes, identidad, logs, riesgo, controles, comunicacion y remediacion.

## Criterio de Dominio

Estos proyectos cumplen su funcion cuando puedes explicar:

- que problema estudia cada escenario;
- que evidencia seria relevante;
- que falsos positivos podrian existir;
- que riesgo se intenta reducir;
- que controles aplican;
- que conclusion seria defendible;
- que limitaciones tiene el analisis.
