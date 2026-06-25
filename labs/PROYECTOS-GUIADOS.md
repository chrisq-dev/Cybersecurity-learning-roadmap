# Proyectos Guiados

Los proyectos guiados sirven para conectar teoría con situaciones realistas. En esta web no se tratan como tareas obligatorias ni como actividades cerradas. Son escenarios de estudio para entender como se aplican los conceptos y que tipo de razonamiento se espera en ciberseguridad.

Un buen proyecto no se mide solo por tener archivos. Se mide por la claridad con la que puedes explicar:

- Que problema existe;
- Que datos o evidencia se observarian;
- Que riesgo representa;
- Que controles reducen ese riesgo;
- Que limitaciones tiene el análisis;
- Que decisión tomarias con la información disponible.

## Cómo Leer Estos Proyectos

Cada proyecto debe entenderse como un caso. Puedes reproducirlo en un entorno propio si quieres practicar, pero el valor principal está en comprender el flujo.

La estructura mental recomendada es:

```text
escenario -> evidencia -> análisis -> riesgo -> controles -> conclusión
```

## Proyecto 1: Análisis de Logs de Autenticación

### Qué Busca Enseñar

Este proyecto enseña como un analista defensivo interpreta intentos de autenticación, detecta patrones y evita conclusiones apresuradas.

### Escenario

Un sistema registra eventos de login:

```text
2026-06-23T10:00:01 user=admin src_ip=203.0.113.10 result=failed
2026-06-23T10:00:05 user=admin src_ip=203.0.113.10 result=failed
2026-06-23T10:05:00 user=maria src_ip=10.0.0.5 result=success
```

### Cómo Pensarlo

Preguntas importantes:

- Cuantos fallos hubo?
- Se concentran en un usuario?
- Se concentran en una IP?
- Hubo un login exitoso después de muchos fallos?
- El usuario tenia privilegios altos?
- La IP origen es esperada?
- El horario es normal?

### Falsos Positivos

No todo patron de fallos es ataque.

Posibles explicaciones benignas:

- Usuario olvido su contraseña;
- Aplicación usa credencial antigua;
- Dispositivo intenta reconectar;
- Integración mal configurada;
- Cambio reciente de política de contraseñas.

Posibles señales de riesgo:

- Muchos usuarios atacados desde la misma IP;
- Pocos intentos por usuario en muchos usuarios, posible password spraying;
- Login exitoso después de fallos;
- Origen externo desconocido;
- Cuenta privilegiada involucrada.

### Lo Que Debe Quedar Claro

El objetivo no es solo contar eventos. El objetivo es explicar si el comportamiento parece normal, sospechoso o incidente, y por que.

## Proyecto 2: Hardening Linux

### Qué Busca Enseñar

Hardening significa reducir superficie de ataque. No es aplicar comandos al azar. Es entender que controles reducen que riesgos.

### Áreas de Revisión

- Actualizaciones;
- Usuarios y grupos;
- Sudo;
- SSH;
- Firewall;
- Logs;
- Permisos;
- Servicios innecesarios.

### Cómo Pensarlo

Ejemplo:

```text
Servicio SSH expuesto + password login + sin MFA + usuario con sudo = riesgo alto.
```

Controles posibles:

- Llaves SSH;
- Restriccion por IP;
- Usuarios nominales;
- Sudo limitado;
- Logs de autenticación;
- Alertas por fuerza bruta.

### Lo Que Debe Quedar Claro

Cada control debe poder conectarse con un riesgo. Si no puedes explicar que riesgo reduce, probablemente solo estas siguiendo una checklist sin criterio.

## Proyecto 3: OWASP Top 10 con Casos

### Qué Busca Enseñar

OWASP Top 10 ayuda a entender categorías comunes de fallas web. El objetivo no es memorizar nombres, sino comprender causa, impacto y mitigacion.

### Vulnerabilidades Iniciales

- Broken Access Control.
- SQL Injection.
- XSS.
- SSRF.
- Security Misconfiguration.

### Cómo Pensarlo

Para cada vulnerabilidad pregunta:

- Donde entra el dato o acción;
- Que confianza asume la aplicación;
- Que validación falta;
- Que impacto tendria;
- Que control lo previene;
- Que log ayudaria a detectarlo.

### Lo Que Debe Quedar Claro

Una vulnerabilidad web se entiende bien cuando puedes explicar la causa raíz y la remediación, no solo el payload.

## Proyecto 4: Investigación de Incidente Simulado

### Qué Busca Enseñar

Este proyecto enseña como razonar como SOC: separar evidencia, hipótesis y conclusión.

### Caso

Una cuenta muestra varios logins fallidos y luego un login exitoso desde una IP externa desconocida.

### Cómo Pensarlo

Preguntas:

- El usuario reconoce la actividad?
- Hubo MFA?
- Hubo cambios después del login?
- Hay descargas, cambios de permisos o creación de tokens?
- La IP pertenece a VPN o proveedor conocido?
- Hay actividad similar en otros usuarios?

### Conclusiones Posibles

- Benigno: actividad esperada y confirmada;
- Sospechoso: falta contexto, requiere monitoreo;
- Incidente: acceso no autorizado confirmado o altamente probable.

### Lo Que Debe Quedar Claro

Un analista no debe saltar directo a "hackeo". Debe construir una conclusión con evidencia.

## Proyecto 5: Revisión de Cloud Security

### Qué Busca Enseñar

Cloud security se basa en identidad, configuración, visibilidad y responsabilidad compartida.

### Áreas Clave

- IAM;
- MFA;
- Storage;
- Logs;
- Security groups;
- Secretos;
- Backups;
- Cuentas privilegiadas.

### Cómo Pensarlo

Ejemplo de riesgo:

```text
Bucket público + datos sensibles + sin logs = riesgo de fuga difícil de investigar.
```

Controles:

- Acceso privado;
- Cifrado;
- Logging;
- Políticas por rol;
- Alertas;
- Revisión de permisos.

### Lo Que Debe Quedar Claro

En cloud, muchas brechas ocurren por configuración e identidad, no por vulnerabilidades complejas.

## Proyecto 6: Email Security y Phishing

### Qué Busca Enseñar

El correo sigue siendo una via común de acceso inicial. Entender phishing implica mirar identidad, dominio, enlaces, adjuntos, headers y comportamiento del usuario.

### Áreas Clave

- SPF;
- DKIM;
- DMARC;
- MFA;
- Reporte de phishing;
- Concientizacion;
- Análisis de headers;
- Enlaces y adjuntos.

### Cómo Pensarlo

Preguntas:

- El dominio del remitente es legitimo?
- SPF/DKIM/DMARC alinean?
- El enlace apunta a un dominio esperado?
- Hay urgencia, presion o suplantacion?
- El usuario interactuo?
- Hubo login posterior?

### Lo Que Debe Quedar Claro

Phishing no se analiza solo por apariencia. Se analiza combinando señales técnicas y contexto humano.

## Proyecto 7: Ransomware Tabletop

### Qué Busca Enseñar

Un tabletop no prueba herramientas. Prueba decisiones, comunicación y preparacion.

### Escenario

Una organización detecta archivos cifrados en varios equipos y sospecha ransomware.

### Cómo Pensarlo

Preguntas:

- Qué sistemas están afectados?
- Hay backups?
- Los backups están aislados?
- Hay propagacion activa?
- Quién decide apagar, aislar o restaurar?
- Cuál es el RTO/RPO?
- Qué se comunica a usuarios y directivos?

### Lo Que Debe Quedar Claro

Responder ransomware requiere coordinacion. No basta con "tener backup"; hay que saber restaurar, contener y comunicar.

## Proyecto 8: Revisión de Accesos

### Qué Busca Enseñar

La revisión de accesos busca comprobar si usuarios, roles y permisos siguen teniendo sentido.

### Cómo Pensarlo

Preguntas:

- El usuario sigue en la organización?
- El rol corresponde a su función?
- Hay privilegios excesivos?
- Hay cuentas compartidas?
- Hay cuentas sin owner?
- Hay accesos antiguos no revocados?

### Lo Que Debe Quedar Claro

El acceso excesivo no siempre parece incidente, pero aumenta impacto cuando una cuenta se compromete.

## Capstone Projects

Los capstones combinan varios temas en un escenario más grande:

- Investigación SOC;
- Pequeña empresa segura;
- AppSec review;
- Cloud Security review.

La idea de un capstone es integrar teoría: redes, identidad, logs, riesgo, controles, comunicación y remediación.

## Criterio de Dominio

Estos proyectos cumplen su función cuando puedes explicar:

- Que problema estudia cada escenario;
- Que evidencia seria relevante;
- Que falsos positivos podrian existir;
- Que riesgo se intenta reducir;
- Que controles aplican;
- Que conclusión seria defendible;
- Que limitaciones tiene el análisis.
