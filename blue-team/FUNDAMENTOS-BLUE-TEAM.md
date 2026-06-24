# Fundamentos Blue Team

## Objetivo

Aprender a pensar como analista defensivo: observar, investigar, documentar y responder.

Blue Team no es solo mirar alertas. Es convertir senales incompletas en una decision defendible: falso positivo, actividad esperada, incidente real o riesgo que requiere mejora de controles.

## Mapa Mental

```text
alerta -> evidencia -> contexto -> hipotesis -> validacion -> impacto -> accion -> reporte
```

Un buen analista separa tres cosas:

- Hechos: evidencia observada.
- Hipotesis: explicacion posible.
- Conclusion: decision apoyada por evidencia.

## Flujo de Investigacion

1. Recibir alerta.
2. Entender que dice.
3. Reunir evidencia.
4. Formular hipotesis.
5. Buscar actividad relacionada.
6. Determinar impacto.
7. Recomendar accion.
8. Documentar.

## Triage Inicial

Antes de investigar profundo, responde:

- Que alerta se disparo?
- Que fuente la genero?
- Que activo esta involucrado?
- Que usuario aparece?
- Que hora tiene el evento?
- Hay severidad asignada?
- La alerta tiene regla o deteccion asociada?
- El comportamiento tiene contexto legitimo?

El objetivo del triage es decidir si se investiga mas, se cierra como benigno o se escala.

## Preguntas de Analista

- Que paso?
- Cuando paso?
- Donde paso?
- Que usuario o sistema estuvo involucrado?
- Es esperado o sospechoso?
- Hay evidencia adicional?
- Cual es el impacto?
- Que accion se recomienda?

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

## Logs Comunes

- Autenticacion.
- Procesos.
- DNS.
- Web server.
- Firewall.
- EDR.
- Cloud.

## Severidad

La severidad no debe depender solo de que una alerta suene peligrosa. Considera:

- Criticidad del activo.
- Privilegios del usuario.
- Confirmacion de actividad maliciosa.
- Alcance.
- Persistencia.
- Exfiltracion.
- Disponibilidad afectada.

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

## Errores Comunes de Principiante

- Cerrar alertas sin documentar por que.
- Confundir ausencia de evidencia con evidencia de ausencia.
- Saltar a conclusiones sin validar.
- No revisar contexto del usuario o activo.
- No proponer una accion concreta.
- Reportar tecnicismos sin impacto.

## Practica Guiada

Una investigacion simulada puede verse asi:

```md
# Investigacion: Multiples Logins Fallidos

## Alerta

Multiples fallos de login para el usuario admin.

## Evidencia

- Hora:
- Usuario:
- IP origen:
- Sistema destino:

## Hipotesis

Puede ser fuerza bruta, error de usuario o servicio mal configurado.

## Validacion

Buscar otros eventos desde la misma IP.

## Conclusion


## Acciones


```

Completa el reporte con al menos:

- 5 eventos de evidencia.
- 2 hipotesis alternativas.
- 1 conclusion.
- 3 acciones recomendadas.

## Mini Laboratorio: Login Sospechoso

Escenario:

```text
Usuario: admin
Evento: login exitoso
Origen: IP externa desconocida
Hora: 03:12
Sistema: panel administrativo
```

Analiza:

1. Que evidencia pedirias?
2. Que haria que esto fuera benigno?
3. Que haria que fuera incidente?
4. Que acciones tomarias en los primeros 15 minutos?
5. Que controles evitarian repeticion?

## Plantilla de Conclusion

```md
Con base en [evidencia], se observa [actividad].
El impacto potencial es [impacto] porque [razon].
La hipotesis mas probable es [hipotesis].
Se recomienda [acciones] y monitorear [indicadores].
```

## Criterio de Dominio

Puedes avanzar cuando puedas:

- Explicar que es una alerta.
- Leer un log basico.
- Separar evidencia de suposicion.
- Escribir una conclusion.
- Proponer una accion.
- Justificar severidad usando impacto y evidencia.
