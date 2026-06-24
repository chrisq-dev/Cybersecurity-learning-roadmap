# Fundamentos de Arquitectura de Seguridad

## Objetivo

Entender como diseñar sistemas con controles coherentes, no solo herramientas sueltas.

## Defensa en Profundidad

Significa tener varias capas de defensa.

Ejemplo:

- MFA.
- Minimo privilegio.
- Segmentacion.
- EDR.
- Logs.
- Backups.
- Respuesta a incidentes.

Si una capa falla, otra puede reducir impacto.

El punto no es acumular herramientas. El punto es que cada capa tenga una funcion clara:

- Reducir probabilidad de ataque.
- Limitar impacto.
- Detectar actividad anormal.
- Responder rapido.
- Recuperar operacion.

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
| Que activo importa? | Base de datos de clientes |
| Que amenaza aplica? | Robo de credenciales, SQL Injection, exfiltracion |
| Que vulnerabilidad podria existir? | App sin consultas parametrizadas |
| Que impacto tendria? | Fuga de PII, multas, perdida de confianza |
| Que control reduce el riesgo? | Parametrizacion, WAF, permisos minimos, logs |
| Como se verifica? | Pruebas, revision de permisos, alertas |

Este razonamiento evita comprar o implementar controles sin relacion con un riesgo real.

## Segmentacion

Separar sistemas para limitar movimiento lateral.

Ejemplos:

- Usuarios.
- Servidores.
- Administracion.
- Invitados.
- Produccion.
- Desarrollo.

## Principio de Minimo Privilegio

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
Que acceso necesita para cumplir su funcion y nada mas?
```

Minimo privilegio no es solo permisos de usuario. Tambien es limitar origen, destino, accion, duracion y contexto.

## Controles

### Preventivos

Evitan:

- MFA.
- Firewall.
- Validacion de entrada.

### Detectivos

Detectan:

- Logs.
- SIEM.
- EDR.

### Correctivos

Corrigen o recuperan:

- Backups.
- Rotacion de credenciales.
- Reimagen de equipos.

### Disuasivos

Reducen probabilidad por advertencia o politica:

- Banners legales.
- Politicas aceptadas.
- Concientizacion.

### Compensatorios

Reducen riesgo cuando no puedes corregir directamente:

- WAF frente a una app legacy.
- Segmentacion si un sistema no puede parchearse aun.
- Monitoreo extra en sistemas criticos.

## Patrones de Arquitectura Segura

### Aplicacion Web Clasica

```text
Internet -> CDN/WAF -> Load Balancer -> App -> Database privada
                              |
                              v
                            Logs/SIEM
```

Controles esperados:

- TLS.
- WAF o proteccion HTTP.
- App sin secretos en codigo.
- DB no publica.
- Logs centralizados.
- Backups probados.
- Separacion de admin.

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

- Autorizacion por objeto.
- Auditoria de accesos.
- Cifrado en transito.
- Cifrado en reposo.
- Retencion definida.
- Minimizacion de datos.

## Trade-offs

Seguridad real tiene compromisos:

- Mas controles pueden aumentar friccion.
- Menos friccion puede aumentar riesgo.
- Bloqueos automaticos pueden afectar disponibilidad.
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

## Practica

Diseña arquitectura para una app:

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

## Preguntas de Comprension

- Cual es el activo mas critico del sistema?
- Que atacante o escenario te preocupa mas?
- Que pasaria si una cuenta de usuario se compromete?
- Que pasaria si el backend se compromete?
- Donde se detectaria una extraccion masiva de datos?
- Como se recuperaria el servicio si hay ransomware?

## Criterio de Dominio

Puedes avanzar cuando puedas:

- Explicar defensa en profundidad.
- Explicar segmentacion.
- Identificar superficie de ataque.
- Elegir controles por riesgo.
- Dibujar una arquitectura simple con controles razonados.
- Explicar trade-offs entre seguridad, operacion y costo.
