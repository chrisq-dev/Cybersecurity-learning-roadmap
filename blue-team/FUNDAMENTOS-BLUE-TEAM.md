# Fundamentos Blue Team

## Objetivo

Aprender a pensar como analista defensivo: observar, investigar, documentar y responder.

Blue Team no es solo mirar alertas. Es convertir senales incompletas en una decision defendible: falso positivo, actividad esperada, incidente real o riesgo que requiere mejora de controles.

El objetivo de esta guia es que entiendas:

- que es una alerta;
- que es evidencia;
- como formular hipotesis;
- como validar;
- como estimar impacto;
- como recomendar acciones;
- como comunicar conclusiones.

## Modelo Mental

```text
alerta -> evidencia -> contexto -> hipotesis -> validacion -> impacto -> accion -> reporte
```

Un buen analista separa tres cosas:

- hechos: evidencia observada;
- hipotesis: explicacion posible;
- conclusion: decision apoyada por evidencia.

## Que Es Blue Team

Blue Team agrupa actividades defensivas. Incluye monitoreo, deteccion, respuesta a incidentes, hardening, analisis de logs, threat hunting, gestion de vulnerabilidades, mejora de controles y documentacion.

La mentalidad defensiva no es "bloquear todo". Es entender riesgo, proteger lo importante, detectar desviaciones y responder con criterio.

## Alerta vs Evento

Un evento es algo que ocurrio.

Ejemplos:

- login fallido;
- proceso iniciado;
- archivo creado;
- conexion permitida;
- DNS consultado.

Una alerta es un evento o conjunto de eventos que cumple una regla de deteccion.

Ejemplo:

```text
10 logins fallidos para la misma cuenta en 2 minutos
```

No toda alerta es incidente. No todo incidente genera alerta. Esa es una idea clave.

## Evidencia

Evidencia es informacion observable que apoya o contradice una hipotesis.

Ejemplos:

- log de autenticacion;
- proceso ejecutado;
- hash de archivo;
- conexion de red;
- consulta DNS;
- correo recibido;
- cambio de permiso;
- accion en cloud;
- alerta EDR.

Una conclusion fuerte necesita evidencia suficiente, no intuicion.

## Contexto

El contexto convierte datos en significado.

Ejemplo:

```text
Login exitoso a las 03:12 desde otro pais
```

Puede ser:

- sospechoso si el usuario no viaja y no usa VPN;
- esperado si es un administrador de guardia usando VPN corporativa;
- ambiguo si faltan datos.

Contexto util:

- criticidad del activo;
- rol del usuario;
- ubicacion esperada;
- horario laboral;
- cambios recientes;
- tickets de mantenimiento;
- comportamiento historico;
- exposicion del sistema.

## Flujo de Investigacion

1. Recibir alerta.
2. Entender que dice.
3. Identificar activo, usuario, IP, proceso o recurso involucrado.
4. Reunir evidencia primaria.
5. Formular hipotesis.
6. Buscar actividad relacionada.
7. Determinar impacto.
8. Recomendar accion.
9. Documentar conclusion.

La investigacion no debe empezar con conclusion. Debe empezar con preguntas.

## Triage Inicial

Antes de investigar profundo, aclara:

- Que alerta se disparo?
- Que fuente la genero?
- Que activo esta involucrado?
- Que usuario aparece?
- Que hora tiene el evento?
- Hay severidad asignada?
- La alerta tiene regla o deteccion asociada?
- El comportamiento tiene contexto legitimo?
- Hay eventos repetidos?
- Hay evidencia de exito o solo intento?

El objetivo del triage es decidir si se investiga mas, se cierra como benigno o se escala.

## Fuentes de Evidencia

| Fuente | Que puede responder |
| --- | --- |
| Logs de autenticacion | Quien inicio sesion, desde donde, cuando |
| EDR | Procesos, comandos, archivos, conexiones |
| DNS | Dominios consultados |
| Proxy/Web gateway | URLs visitadas, descargas |
| Firewall | Conexiones permitidas o bloqueadas |
| Cloud logs | Acciones en recursos cloud |
| Email gateway | Remitente, enlaces, adjuntos |
| Logs de aplicacion | Acciones realizadas dentro del sistema |
| IAM | Cambios de permisos y roles |

Ninguna fuente cuenta toda la historia. El analista correlaciona.

## Hipotesis

Una hipotesis es una explicacion posible.

Ejemplo:

Alerta: multiples fallos de login.

Hipotesis:

- usuario olvido contrasena;
- servicio usa credencial vieja;
- intento de fuerza bruta;
- password spraying;
- actividad de scanner interno;
- ataque desde IP externa.

Despues buscas evidencia para confirmar o descartar.

## Falso Positivo y Verdadero Positivo

### Falso positivo

La alerta se disparo, pero no representa actividad maliciosa ni riesgo relevante.

Ejemplo:

Un scanner autorizado genera trafico que parece reconocimiento.

### Verdadero positivo

La alerta representa actividad real que requiere atencion.

Ejemplo:

Login exitoso desde IP desconocida seguido de cambio de MFA y descarga masiva.

La meta no es cerrar rapido. Es cerrar bien.

## Severidad

La severidad no debe depender solo de que una alerta suene peligrosa.

Considera:

- criticidad del activo;
- privilegios del usuario;
- confirmacion de actividad maliciosa;
- alcance;
- persistencia;
- movimiento lateral;
- exfiltracion;
- disponibilidad afectada;
- sensibilidad de datos;
- exposicion externa.

Ejemplo:

```text
Un login fallido aislado a una cuenta sin privilegios puede ser bajo.
Un login exitoso desde pais inusual a una cuenta admin puede ser alto.
```

## MITRE ATT&CK

MITRE ATT&CK ayuda a clasificar tecnicas de adversarios.

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

- bloquear IP;
- deshabilitar cuenta;
- revocar sesiones;
- aislar endpoint;
- rotar credenciales;
- restaurar desde backup;
- abrir incidente;
- ajustar regla de deteccion;
- pedir confirmacion a usuario;
- escalar a equipo responsable.

Una accion defensiva tambien puede romper operacion. Por eso hay que balancear rapidez, evidencia y riesgo.

## Comunicacion

Un reporte defensivo debe ser claro.

Debe responder:

- que paso;
- como se detecto;
- que evidencia existe;
- que impacto tiene;
- que se hizo;
- que falta;
- que se recomienda.

Evita escribir solo tecnicismos. Seguridad debe comunicar riesgo a personas tecnicas y no tecnicas.

## Ejemplo de Investigacion

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
- Hubo cambios despues del login?
- Se descargaron datos?
- Se crearon usuarios?
- Hay tickets de mantenimiento?
- El usuario reconoce la actividad?

Conclusiones posibles:

- benigno: acceso esperado por guardia documentada;
- sospechoso: login inusual sin cambios posteriores;
- incidente: login seguido de cambios, descargas o acciones no autorizadas.

## Plantilla de Conclusion

```md
Con base en [evidencia], se observa [actividad].
El impacto potencial es [impacto] porque [razon].
La hipotesis mas probable es [hipotesis].
Se recomienda [acciones] y monitorear [indicadores].
```

## Errores Comunes

- Cerrar alertas sin documentar por que.
- Confundir ausencia de evidencia con evidencia de ausencia.
- Saltar a conclusiones sin validar.
- No revisar contexto del usuario o activo.
- No proponer una accion concreta.
- Reportar tecnicismos sin impacto.
- Tratar toda alerta como incidente.
- Ignorar actividad posterior al evento inicial.
- No preservar evidencia.

## Ejemplo de Analisis

Este caso permite practicar razonamiento defensivo:

```text
Alerta: multiples logins fallidos
Usuario: jlopez
Origen: 198.51.100.20
Destino: VPN corporativa
Hora: 02:44
Resultado: 14 fallos y 1 exito
```

Preguntas:

- Que evidencia adicional pedirias?
- Que hipotesis existen?
- Que haria que esto sea benigno?
- Que haria que sea incidente?
- Que acciones tomarias primero?
- Que controles evitarian repeticion?

## Criterio de Dominio

Dominas este tema cuando puedes:

- diferenciar evento, alerta e incidente;
- separar evidencia, hipotesis y conclusion;
- explicar fuentes de evidencia;
- hacer triage inicial;
- justificar severidad con impacto;
- usar MITRE ATT&CK con sentido;
- proponer acciones proporcionales;
- escribir una conclusion clara y defendible.
