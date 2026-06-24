# OWASP Top 10

## Objetivo

Conocer las categorias principales de riesgos en aplicaciones web. OWASP Top 10 no es una lista de payloads; es un mapa de fallas comunes.

El objetivo de esta leccion es que puedas mirar una aplicacion y clasificar riesgos sin depender de memorizar nombres. OWASP Top 10 sirve para hablar con desarrolladores, analistas, clientes y equipos de seguridad usando un lenguaje comun.

## Como Usar OWASP Correctamente

OWASP no reemplaza pruebas, threat modeling ni criterio tecnico. Usalo para:

- ordenar hallazgos;
- explicar impacto;
- construir checklists;
- planear pruebas;
- justificar controles;
- mapear riesgos a categorias conocidas.

No lo uses como:

- lista cerrada de todas las vulnerabilidades;
- ranking exacto para todas las empresas;
- excusa para ignorar contexto;
- coleccion de payloads.

## Mapa Mental

```text
entrada -> identidad -> autorizacion -> logica -> datos -> configuracion -> logs
```

Una aplicacion falla cuando confia demasiado en algun punto:

- confia en el usuario;
- confia en el frontend;
- confia en IDs;
- confia en dependencias;
- confia en defaults;
- confia en que alguien revisara logs despues.

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

Preguntas de revision:

- El backend valida permisos en cada accion?
- Un usuario puede cambiar IDs y ver recursos ajenos?
- Existe separacion real entre usuario, admin y soporte?
- Los endpoints internos estan protegidos?

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

Preguntas de revision:

- Que datos son sensibles?
- Viajan por TLS?
- Estan cifrados en reposo cuando aplica?
- Las contraseñas usan hashing fuerte con salt?
- Donde viven las llaves?

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

Preguntas de revision:

- Hay concatenacion de consultas?
- Hay llamadas a comandos del sistema?
- Los parametros llegan a interpretes como SQL, shell, LDAP o templates?
- La cuenta del servicio tiene permisos minimos?

## 4. Insecure Design

Ocurre cuando el problema esta en el diseño, no solo en un bug.

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
- Configuracion por ambiente.
- Revisiones automatizadas.
- Desactivar lo innecesario.

Revision rapida:

- Debug apagado.
- Credenciales default eliminadas.
- Headers basicos configurados.
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
- Se sabe que version esta en produccion?
- Hay proceso para actualizar?

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

Preguntas:

- Existe MFA para cuentas sensibles?
- Las sesiones expiran?
- Se detecta fuerza bruta?
- La recuperacion de contrasena es segura?
- Las cookies tienen flags adecuados?

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

Ejemplos modernos:

- pipeline CI/CD con secretos expuestos;
- paquetes instalados sin control;
- artefactos sin firma;
- cambios en produccion sin revision.

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

Eventos minimos:

- logins fallidos y exitosos;
- cambios de contraseña;
- cambios de permisos;
- acceso a datos sensibles;
- errores de autorizacion;
- acciones administrativas;
- fallas de validacion repetidas.

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

## Como Estudiar Cada Categoria

Para cada categoria, una nota informativa puede incluir:

- Definicion.
- Ejemplo.
- Impacto.
- Lab.
- Mitigacion.
- Como detectarla.

## Ejemplo de Revision OWASP

En una aplicacion propia, una app local vulnerable o un proyecto demo autorizado, una tabla de revision puede verse asi:

| Categoria OWASP | Donde podria aparecer | Impacto | Control | Evidencia a revisar |
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

## Criterios Para Estudiar Una Categoria

Una categoria de OWASP se entiende mejor cuando puedes explicar:

- la categoria con tus palabras;
- un ejemplo seguro de laboratorio o escenario ficticio;
- impacto tecnico;
- impacto para negocio o usuario;
- mitigacion;
- deteccion o evidencia.

## Errores Comunes

- Aprender solo payloads y no causas.
- No diferenciar impacto tecnico de impacto real.
- Reportar "OWASP" sin explicar evidencia.
- Confiar en el frontend como control.
- No validar autorizacion por recurso.

## Criterio de Dominio

Puedes avanzar cuando puedas:

- Explicar las 10 categorias.
- Dar un ejemplo por categoria.
- Proponer una mitigacion.
- Distinguir causa tecnica e impacto de negocio.
- Convertir una categoria OWASP en una prueba, una evidencia y una recomendacion.
