# OWASP Top 10

## Objetivo

Conocer las categorias principales de riesgos en aplicaciones web. OWASP Top 10 no es una lista de payloads; es un mapa de fallas comunes.

## 1. Broken Access Control

Ocurre cuando un usuario puede hacer algo que no deberia.

Ejemplos:

- Ver datos de otro usuario.
- Acceder a panel admin.
- Modificar recursos ajenos.
- Saltarse validaciones cambiando IDs.

Impacto:

- Exposicion de datos.
- Acceso no autorizado.
- Acciones indebidas.

Mitigacion:

- Validar permisos en servidor.
- Denegar por defecto.
- Revisar controles por rol.
- Tests de autorizacion.

## 2. Cryptographic Failures

Ocurre cuando se protege mal informacion sensible.

Ejemplos:

- Contraseñas en texto plano.
- TLS mal configurado.
- Datos sensibles sin cifrar.
- Uso de algoritmos obsoletos.

Mitigacion:

- TLS correcto.
- Password hashing fuerte.
- Cifrado para datos sensibles.
- Manejo seguro de llaves.

## 3. Injection

Ocurre cuando datos no confiables son interpretados como comandos o consultas.

Ejemplos:

- SQL Injection.
- Command Injection.
- LDAP Injection.

Mitigacion:

- Consultas parametrizadas.
- Validacion de entrada.
- Escapar salida donde aplique.
- Minimo privilegio.

## 4. Insecure Design

Ocurre cuando el problema esta en el diseño, no solo en un bug.

Ejemplo:

- Una app permite cambiar email sin verificar contraseña o MFA.

Mitigacion:

- Threat modeling.
- Revisiones de diseño.
- Abuse cases.
- Controles desde arquitectura.

## 5. Security Misconfiguration

Ocurre por configuraciones inseguras.

Ejemplos:

- Panel admin expuesto.
- Debug activo.
- Credenciales default.
- Headers ausentes.
- Permisos demasiado amplios.

Mitigacion:

- Hardening.
- Configuracion por ambiente.
- Revisiones automatizadas.
- Desactivar lo innecesario.

## 6. Vulnerable and Outdated Components

Ocurre al usar dependencias vulnerables o sin mantenimiento.

Mitigacion:

- Inventario de dependencias.
- Actualizaciones.
- SCA.
- Parches.

## 7. Identification and Authentication Failures

Fallas de login, sesiones o identidad.

Ejemplos:

- Sin MFA.
- Sesiones que no expiran.
- Recuperacion de contraseña insegura.
- Fuerza bruta sin deteccion.

Mitigacion:

- MFA.
- Rate limiting.
- Sesiones seguras.
- Deteccion de ataques.

## 8. Software and Data Integrity Failures

Fallas al confiar en codigo, actualizaciones o datos sin verificar.

Ejemplos:

- CI/CD inseguro.
- Dependencias comprometidas.
- Updates sin firma.

Mitigacion:

- Firmas.
- Verificacion de integridad.
- Proteccion de pipeline.
- Revision de dependencias.

## 9. Security Logging and Monitoring Failures

Ocurre cuando no hay suficiente visibilidad para detectar incidentes.

Ejemplos:

- Logins fallidos no registrados.
- Errores criticos sin alerta.
- Logs sin retencion.
- Nadie revisa eventos.

Mitigacion:

- Logging de eventos clave.
- Alertas.
- Retencion.
- Monitoreo.
- Playbooks.

## 10. Server-Side Request Forgery

SSRF ocurre cuando el servidor hace requests controladas por un atacante.

Riesgo:

- Acceder a servicios internos.
- Consultar metadata cloud.
- Saltar controles de red.

Mitigacion:

- Validar destinos.
- Denylist/allowlist robusta.
- Bloquear rangos internos.
- Controles de red.

## Como Estudiar Cada Categoria

Para cada una crea una nota con:

- Definicion.
- Ejemplo.
- Impacto.
- Lab.
- Mitigacion.
- Como detectarla.

## Criterio de Dominio

Puedes avanzar cuando puedas:

- Explicar las 10 categorias.
- Dar un ejemplo por categoria.
- Proponer una mitigacion.
- Distinguir causa tecnica e impacto de negocio.
