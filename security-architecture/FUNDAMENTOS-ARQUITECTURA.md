# Fundamentos de Arquitectura de Seguridad

## Objetivo

Entender como diseñar sistemas con controles coherentes, no solo herramientas sueltas.

## Defensa en Profundidad

Significa tener varias capas de defensa.

Ejemplo:

- MFA.
- Mínimo privilegio.
- Segmentación.
- EDR.
- Logs.
- Backups.
- Respuesta a incidentes.

Si una capa falla, otra puede reducir impacto.

El punto no es acumular herramientas. El punto es que cada capa tenga una función clara:

- Reducir probabilidad de ataque.
- Limitar impacto.
- Detectar actividad anormal.
- Responder rápido.
- Recuperar operación.

Una arquitectura madura combina controles preventivos, detectivos y correctivos. Si solo previene, queda ciega. Si solo detecta, llega tarde. Si solo recupera, acepta demasiado dano.

## Superficie de Ataque

Todo lo que puede ser atacado:

- Puertos.
- APIs.
- Usuarios.
- Aplicaciones.
- Proveedores.
- Credenciales.
- Repositorios.

Reducir superficie:

- Desactivar servicios innecesarios.
- Restringir acceso.
- Parchar.
- Eliminar cuentas antiguas.

## Activos, Amenazas y Controles

Antes de elegir controles, entiende que estas protegiendo.

| Pregunta | Ejemplo |
| --- | --- |
| Qué activo importa? | Base de datos de clientes |
| Qué amenaza aplica? | Robo de credenciales, SQL Injection, exfiltración |
| Qué vulnerabilidad podria existir? | App sin consultas parametrizadas |
| Qué impacto tendria? | Fuga de PII, multas, pérdida de confianza |
| Qué control reduce el riesgo? | Parametrizacion, WAF, permisos mínimos, logs |
| Cómo se verifica? | Pruebas, revisión de permisos, alertas |

Este razonamiento evita comprar o implementar controles sin relacion con un riesgo real.

## Segmentación

Separar sistemas para limitar movimiento lateral.

Ejemplos:

- Usuarios.
- Servidores.
- Administracion.
- Invitados.
- Produccion.
- Desarrollo.

## Principio de Mínimo Privilegio

Aplica a:

- Usuarios.
- Cuentas de servicio.
- Bases de datos.
- Redes.
- Buckets/storage.
- Pipelines CI/CD.
- Contenedores.
- APIs.

La pregunta clave es:

```text
Qué acceso necesita para cumplir su función y nada más?
```

Mínimo privilegio no es solo permisos de usuario. También es limitar origen, destino, acción, duración y contexto.

## Controles

### Preventivos

Evitan:

- MFA.
- Firewall.
- Validación de entrada.

### Detectivos

Detectan:

- Logs.
- SIEM.
- EDR.

### Correctivos

Corrigen o recuperan:

- Backups.
- Rotación de credenciales.
- Reimagen de equipos.

### Disuasivos

Reducen probabilidad por advertencia o política:

- Banners legales.
- Políticas aceptadas.
- Concientizacion.

### Compensatorios

Reducen riesgo cuando no puedes corregir directamente:

- WAF frente a una app legacy.
- Segmentación si un sistema no puede parchearse aún.
- Monitoreo extra en sistemas críticos.

## Patrones de Arquitectura Segura

### Aplicación Web Clasica

```text
Internet -> CDN/WAF -> Load Balancer -> App -> Database privada
                              |
                              v
                            Logs/SIEM
```

Controles esperados:

- TLS.
- WAF o protección HTTP.
- App sin secretos en código.
- DB no pública.
- Logs centralizados.
- Backups probados.
- Separación de admin.

### Administracion Segura

```text
Admin -> MFA -> VPN/ZTNA -> Jump Box -> Servidores
```

Controles esperados:

- MFA.
- Acceso just-in-time si es posible.
- Sesiones registradas.
- No RDP/SSH directo desde internet.
- Cuentas separadas de uso diario.

### Datos Sensibles

```text
App autorizada -> API/servicio -> DB cifrada -> Backup cifrado
```

Controles esperados:

- Autorización por objeto.
- Auditoria de accesos.
- Cifrado en transito.
- Cifrado en reposo.
- Retención definida.
- Minimizacion de datos.

## Trade-offs

Seguridad real tiene compromisos:

- Más controles pueden aumentar friccion.
- Menos friccion puede aumentar riesgo.
- Bloqueos automáticos pueden afectar disponibilidad.
- Logs excesivos pueden generar ruido o guardar datos sensibles.
- Cifrado ayuda, pero no corrige permisos malos.

Un buen arquitecto de seguridad explica el riesgo y propone controles proporcionales, no solo dice "bloquea todo".

## Errores Comunes

- Poner herramientas sin modelo de riesgo.
- Confiar en red interna como si fuera segura.
- No separar administracion.
- No revisar cuentas de servicio.
- Guardar secretos en repositorios.
- No centralizar logs.
- No probar backups.
- Documentar diagramas que no reflejan reglas reales.

## Ejemplo de Arquitectura Segura

Una arquitectura segura para una app debe considerar:

- Frontend.
- Backend.
- Base de datos.
- Admin.
- Logs.

Define:

- Segmentos.
- Controles preventivos.
- Controles detectivos.
- Controles correctivos.

## Preguntas de Comprensión

- Cuál es el activo más crítico del sistema?
- Qué atacante o escenario te preocupa más?
- Qué pasaria si una cuenta de usuario se compromete?
- Qué pasaria si el backend se compromete?
- Dónde se detectaria una extraccion masiva de datos?
- Cómo se recuperaria el servicio si hay ransomware?

## Criterio de Dominio

Puedes avanzar cuando puedas:

- Explicar defensa en profundidad.
- Explicar segmentación.
- Identificar superficie de ataque.
- Elegir controles por riesgo.
- Dibujar una arquitectura simple con controles razonados.
- Explicar trade-offs entre seguridad, operación y costo.
