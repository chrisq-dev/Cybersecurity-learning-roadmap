# Fundamentos Blue Team

## Objetivo

Aprender a pensar como analista defensivo: observar, investigar, documentar y responder.

Blue Team no es solo mirar alertas. Es convertir señales incompletas en una decisión defendible: falso positivo, actividad esperada, incidente real o riesgo que requiere mejora de controles.

El objetivo de esta guía es que entiendas:

- Que es una alerta;
- Que es evidencia;
- Como formular hipótesis;
- Como validar;
- Como estimar impacto;
- Como recomendar acciones;
- Como comunicar conclusiones.

## Modelo Mental

```text
alerta -> evidencia -> contexto -> hipótesis -> validación -> impacto -> acción -> reporte
```

Un buen analista separa tres cosas:

- Hechos: evidencia observada;
- Hipótesis: explicación posible;
- Conclusión: decisión apoyada por evidencia.

## Qué Es Blue Team

Blue Team agrupa actividades defensivas. Incluye monitoreo, detección, respuesta a incidentes, hardening, análisis de logs, threat hunting, gestion de vulnerabilidades, mejora de controles y documentacion.

La mentalidad defensiva no es "bloquear todo". Es entender riesgo, proteger lo importante, detectar desviaciones y responder con criterio.

## Alerta vs Evento

Un evento es algo que ocurrio.

Ejemplos:

- Login fallido;
- Proceso iniciado;
- Archivo creado;
- Conexión permitida;
- DNS consultado.

Una alerta es un evento o conjunto de eventos que cumple una regla de detección.

Ejemplo:

```text
10 logins fallidos para la misma cuenta en 2 minutos
```

No toda alerta es incidente. No todo incidente genera alerta. Esa es una idea clave.

## Evidencia

Evidencia es información observable que apoya o contradice una hipótesis.

Ejemplos:

- Log de autenticación;
- Proceso ejecutado;
- Hash de archivo;
- Conexión de red;
- Consulta DNS;
- Correo recibido;
- Cambio de permiso;
- Acción en cloud;
- Alerta EDR.

Una conclusión fuerte necesita evidencia suficiente, no intuicion.

## Contexto

El contexto convierte datos en significado.

Ejemplo:

```text
Login exitoso a las 03:12 desde otro pais
```

Puede ser:

- Sospechoso si el usuario no viaja y no usa VPN;
- Esperado si es un administrador de guardia usando VPN corporativa;
- Ambiguo si faltan datos.

Contexto útil:

- Criticidad del activo;
- Rol del usuario;
- Ubicación esperada;
- Horario laboral;
- Cambios recientes;
- Tickets de mantenimiento;
- Comportamiento historico;
- Exposición del sistema.

## Flujo de Investigación

1. Recibir alerta.
2. Entender que dice.
3. Identificar activo, usuario, IP, proceso o recurso involucrado.
4. Reunir evidencia primaria.
5. Formular hipótesis.
6. Buscar actividad relacionada.
7. Determinar impacto.
8. Recomendar acción.
9. Documentar conclusión.

La investigación no debe empezar con conclusión. Debe empezar con preguntas.

## Triage Inicial

Antes de investigar profundo, aclara:

- Qué alerta se disparo?
- Qué fuente la genero?
- Qué activo está involucrado?
- Qué usuario aparece?
- Qué hora tiene el evento?
- Hay severidad asignada?
- La alerta tiene regla o detección asociada?
- El comportamiento tiene contexto legitimo?
- Hay eventos repetidos?
- Hay evidencia de éxito o solo intento?

El objetivo del triage es decidir si se investiga más, se cierra como benigno o se escala.

## Fuentes de Evidencia

| Fuente | Que puede responder |
| --- | --- |
| Logs de autenticación | Quien inicio sesión, desde donde, cuando |
| EDR | Procesos, comandos, archivos, conexiones |
| DNS | Dominios consultados |
| Proxy/Web gateway | URLs visitadas, descargas |
| Firewall | Conexiones permitidas o bloqueadas |
| Cloud logs | Acciones en recursos cloud |
| Email gateway | Remitente, enlaces, adjuntos |
| Logs de aplicación | Acciones realizadas dentro del sistema |
| IAM | Cambios de permisos y roles |

Ninguna fuente cuenta toda la historia. El analista correlaciona.

## Hipótesis

Una hipótesis es una explicación posible.

Ejemplo:

Alerta: múltiples fallos de login.

Hipótesis:

- Usuario olvido contraseña;
- Servicio usa credencial vieja;
- Intento de fuerza bruta;
- Password spraying;
- Actividad de scanner interno;
- Ataque desde IP externa.

Después buscas evidencia para confirmar o descartar.

## Falso Positivo y Verdadero Positivo

### Falso positivo

La alerta se disparo, pero no representa actividad maliciosa ni riesgo relevante.

Ejemplo:

Un scanner autorizado genera tráfico que parece reconocimiento.

### Verdadero positivo

La alerta representa actividad real que requiere atención.

Ejemplo:

Login exitoso desde IP desconocida seguido de cambio de MFA y descarga masiva.

La meta no es cerrar rápido. Es cerrar bien.

## Severidad

La severidad no debe depender solo de que una alerta suene peligrosa.

Considera:

- Criticidad del activo;
- Privilegios del usuario;
- Confirmacion de actividad maliciosa;
- Alcance;
- Persistencia;
- Movimiento lateral;
- Exfiltración;
- Disponibilidad afectada;
- Sensibilidad de datos;
- Exposición externa.

Ejemplo:

```text
Un login fallido aislado a una cuenta sin privilegios puede ser bajo.
Un login exitoso desde pais inusual a una cuenta admin puede ser alto.
```

## MITRE ATT&CK

MITRE ATT&CK ayuda a clasificar técnicas de adversarios.

Ejemplos de tacticas:

- Initial Access.
- Execution.
- Persistence.
- Privilege Escalation.
- Defense Evasion.
- Credential Access.
- Discovery.
- Lateral Movement.
- Exfiltration.

Usalo para describir comportamiento, no para decorar reportes. Si dices "Credential Access", explica que evidencia muestra intento de obtener credenciales.

## Acciones de Respuesta

Las acciones dependen de evidencia e impacto.

Ejemplos:

- Bloquear IP;
- Deshabilitar cuenta;
- Revocar sesiones;
- Aislar endpoint;
- Rotar credenciales;
- Restaurar desde backup;
- Abrir incidente;
- Ajustar regla de detección;
- Pedir confirmacion a usuario;
- Escalar a equipo responsable.

Una acción defensiva también puede romper operación. Por eso hay que balancear rapidez, evidencia y riesgo.

## Comunicación

Un reporte defensivo debe ser claro.

Debe responder:

- Que paso;
- Como se detecto;
- Que evidencia existe;
- Que impacto tiene;
- Que se hizo;
- Que falta;
- Que se recomienda.

Evita escribir solo tecnicismos. Seguridad debe comunicar riesgo a personas técnicas y no técnicas.

## Ejemplo de Investigación

Escenario:

```text
Usuario: admin
Evento: login exitoso
Origen: IP externa desconocida
Hora: 03:12
Sistema: panel administrativo
```

Preguntas:

- El usuario `admin` existe y debe usarse?
- La IP externa pertenece a VPN corporativa?
- Hubo MFA?
- Hay logins fallidos antes?
- Hubo cambios después del login?
- Se descargaron datos?
- Se crearon usuarios?
- Hay tickets de mantenimiento?
- El usuario reconoce la actividad?

Conclusiones posibles:

- Benigno: acceso esperado por guardia documentada;
- Sospechoso: login inusual sin cambios posteriores;
- Incidente: login seguido de cambios, descargas o acciones no autorizadas.

## Plantilla de Conclusión

```md
Con base en [evidencia], se observa [actividad].
El impacto potencial es [impacto] porque [razon].
La hipótesis más probable es [hipótesis].
Se recomienda [acciones] y monitorear [indicadores].
```

## Errores Comunes

- Cerrar alertas sin documentar por que.
- Confundir ausencia de evidencia con evidencia de ausencia.
- Saltar a conclusiones sin validar.
- No revisar contexto del usuario o activo.
- No proponer una acción concreta.
- Reportar tecnicismos sin impacto.
- Tratar toda alerta como incidente.
- Ignorar actividad posterior al evento inicial.
- No preservar evidencia.

## Ejemplo de Análisis

Este caso permite practicar razonamiento defensivo:

```text
Alerta: múltiples logins fallidos
Usuario: jlopez
Origen: 198.51.100.20
Destino: VPN corporativa
Hora: 02:44
Resultado: 14 fallos y 1 exito
```

Preguntas:

- Qué evidencia adicional pedirias?
- Qué hipótesis existen?
- Qué haria qué esto sea benigno?
- Qué haria qué sea incidente?
- Qué acciones tomarias primero?
- Qué controles evitarian repeticion?

## Criterio de Dominio

Dominas este tema cuando puedes:

- Diferenciar evento, alerta e incidente;
- Separar evidencia, hipótesis y conclusión;
- Explicar fuentes de evidencia;
- Hacer triage inicial;
- Justificar severidad con impacto;
- Usar MITRE ATT&CK con sentido;
- Proponer acciones proporcionales;
- Escribir una conclusión clara y defendible.
