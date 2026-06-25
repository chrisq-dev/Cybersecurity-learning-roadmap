# OWASP Top 10

## Objetivo

Conocer las categorías principales de riesgos en aplicaciones web. OWASP Top 10 no es una lista de payloads; es un mapa de fallas comunes.

El objetivo de esta lección es que puedas mirar una aplicación y clasificar riesgos sin depender de memorizar nombres. OWASP Top 10 sirve para hablar con desarrolladores, analistas, clientes y equipos de seguridad usando un lenguaje común.

## Cómo Usar OWASP Correctamente

OWASP no reemplaza pruebas, threat modeling ni criterio técnico. Usalo para:

- Ordenar hallazgos;
- Explicar impacto;
- Construir checklists;
- Planear pruebas;
- Justificar controles;
- Mapear riesgos a categorías conocidas.

No lo uses como:

- Lista cerrada de todas las vulnerabilidades;
- Ranking exacto para todas las empresas;
- Excusa para ignorar contexto;
- Colección de payloads.

## Mapa Mental

```text
entrada -> identidad -> autorización -> lógica -> datos -> configuración -> logs
```

Una aplicación falla cuando confia demasiado en algun punto:

- Confia en el usuario;
- Confia en el frontend;
- Confia en IDs;
- Confia en dependencias;
- Confia en defaults;
- Confia en que alguien revisara logs después.

## 1. Broken Access Control

Ocurre cuando un usuario puede hacer algo que no debería.

Ejemplos:

- Ver datos de otro usuario.
- Acceder a panel admin.
- Modificar recursos ajenos.
- Saltarse validaciones cambiando IDs.

Impacto:

- Exposición de datos.
- Acceso no autorizado.
- Acciones indebidas.

Mitigacion:

- Validar permisos en servidor.
- Denegar por defecto.
- Revisar controles por rol.
- Tests de autorización.

Preguntas de revisión:

- El backend valida permisos en cada acción?
- Un usuario puede cambiar IDs y ver recursos ajenos?
- Existe separación real entre usuario, admin y soporte?
- Los endpoints internos están protegidos?

## 2. Cryptographic Failures

Ocurre cuando se protege mal información sensible.

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

Preguntas de revisión:

- Qué datos son sensibles?
- Viajan por TLS?
- Están cifrados en reposo cuándo aplica?
- Las contraseñas usan hashing fuerte con salt?
- Dónde viven las llaves?

## 3. Injection

Ocurre cuando datos no confiables son interpretados como comandos o consultas.

Ejemplos:

- SQL Injection.
- Command Injection.
- LDAP Injection.

Mitigacion:

- Consultas parametrizadas.
- Validación de entrada.
- Escapar salida donde aplique.
- Mínimo privilegio.

Preguntas de revisión:

- Hay concatenacion de consultas?
- Hay llamadas a comandos del sistema?
- Los parametros llegan a interpretes cómo SQL, shell, LDAP o templates?
- La cuenta del servicio tiene permisos mínimos?

## 4. Insecure Design

Ocurre cuando el problema está en el diseño, no solo en un bug.

Ejemplo:

- Una app permite cambiar email sin verificar contraseña o MFA.

Mitigacion:

- Threat modeling.
- Revisiones de diseño.
- Abuse cases.
- Controles desde arquitectura.

Ejemplo de pensamiento:

```text
No basta con validar que el endpoint funcione.
Tambien debes preguntar como podria abusarse.
```

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
- Configuración por ambiente.
- Revisiones automatizadas.
- Desactivar lo innecesario.

Revisión rapida:

- Debug apagado.
- Credenciales default eliminadas.
- Headers básicos configurados.
- Servicios no usados apagados.
- Acceso admin restringido.

## 6. Vulnerable and Outdated Components

Ocurre al usar dependencias vulnerables o sin mantenimiento.

Mitigacion:

- Inventario de dependencias.
- Actualizaciones.
- SCA.
- Parches.

Preguntas:

- Existe inventario de dependencias?
- Hay dependencias sin mantenimiento?
- Se sabe qué versión está en produccion?
- Hay proceso para actualizar?

## 7. Identification and Authentication Failures

Fallas de login, sesiones o identidad.

Ejemplos:

- Sin MFA.
- Sesiones que no expiran.
- Recuperación de contraseña insegura.
- Fuerza bruta sin detección.

Mitigacion:

- MFA.
- Rate limiting.
- Sesiones seguras.
- Detección de ataques.

Preguntas:

- Existe MFA para cuentas sensibles?
- Las sesiones expiran?
- Se detecta fuerza bruta?
- La recuperación de contraseña es segura?
- Las cookies tienen flags adecuados?

## 8. Software and Data Integrity Failures

Fallas al confiar en código, actualizaciones o datos sin verificar.

Ejemplos:

- CI/CD inseguro.
- Dependencias comprometidas.
- Updates sin firma.

Mitigacion:

- Firmas.
- Verificación de integridad.
- Protección de pipeline.
- Revisión de dependencias.

Ejemplos modernos:

- Pipeline CI/CD con secretos expuestos;
- Paquetes instalados sin control;
- Artefactos sin firma;
- Cambios en produccion sin revisión.

## 9. Security Logging and Monitoring Failures

Ocurre cuando no hay suficiente visibilidad para detectar incidentes.

Ejemplos:

- Logins fallidos no registrados.
- Errores críticos sin alerta.
- Logs sin retención.
- Nadie revisa eventos.

Mitigacion:

- Logging de eventos clave.
- Alertas.
- Retención.
- Monitoreo.
- Playbooks.

Eventos mínimos:

- Logins fallidos y exitosos;
- Cambios de contraseña;
- Cambios de permisos;
- Acceso a datos sensibles;
- Errores de autorización;
- Acciones administrativas;
- Fallas de validación repetidas.

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

Preguntas:

- El usuario controla URLs o destinos?
- El servidor puede llegar a redes internas?
- Hay metadata cloud accesible?
- Existe allowlist de destinos?

## Cómo Estudiar Cada Categoría

Para cada categoría, una nota informativa puede incluir:

- Definicion.
- Ejemplo.
- Impacto.
- Lab.
- Mitigacion.
- Como detectarla.

## Ejemplo de Revisión OWASP

En una aplicación propia, una app local vulnerable o un proyecto demo autorizado, una tabla de revisión puede verse asi:

| Categoría OWASP | Donde podria aparecer | Impacto | Control | Evidencia a revisar |
| --- | --- | --- | --- | --- |
| Broken Access Control |  |  |  |  |
| Cryptographic Failures |  |  |  |  |
| Injection |  |  |  |  |
| Insecure Design |  |  |  |  |
| Security Misconfiguration |  |  |  |  |
| Vulnerable Components |  |  |  |  |
| Auth Failures |  |  |  |  |
| Integrity Failures |  |  |  |  |
| Logging Failures |  |  |  |  |
| SSRF |  |  |  |  |

## Criterios Para Estudiar Una Categoría

Una categoría de OWASP se entiende mejor cuando puedes explicar:

- La categoría con tus palabras;
- Un ejemplo seguro de laboratorio o escenario ficticio;
- Impacto técnico;
- Impacto para negocio o usuario;
- Mitigacion;
- Detección o evidencia.

## Errores Comunes

- Aprender solo payloads y no causas.
- No diferenciar impacto técnico de impacto real.
- Reportar "OWASP" sin explicar evidencia.
- Confiar en el frontend como control.
- No validar autorización por recurso.

## Criterio de Dominio

Puedes avanzar cuando puedas:

- Explicar las 10 categorías.
- Dar un ejemplo por categoría.
- Proponer una mitigacion.
- Distinguir causa técnica e impacto de negocio.
- Convertir una categoría OWASP en una prueba, una evidencia y una recomendación.
