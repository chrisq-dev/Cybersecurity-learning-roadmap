# SIEM y MITRE ATT&CK

## Objetivo

Entender como se centralizan eventos y como se clasifican técnicas de adversarios.

Un SIEM no es magia. Es una herramienta para hacer preguntas sobre eventos. MITRE ATT&CK tampoco es una herramienta; es un lenguaje para describir comportamiento adversario. Juntos ayudan a pasar de "vi algo raro" a "tengo una hipótesis investigable".

## Mapa Mental

```text
fuente de log -> normalizacion -> busqueda -> correlacion -> alerta -> investigacion -> respuesta
```

Si falta una fuente de log, puede faltar visibilidad. Si falta contexto, puede sobrar ruido.

## Qué es un SIEM

SIEM significa Security Information and Event Management.

Un SIEM ayuda a:

- Recolectar logs.
- Buscar eventos.
- Correlacionar actividad.
- Crear alertas.
- Investigar incidentes.
- Comunicar resultados.

Ejemplos de fuentes:

- Windows.
- Linux.
- Firewalls.
- EDR.
- Cloud.
- Aplicaciones web.
- VPN.
- DNS.

## Pipeline de Logs

Un evento suele pasar por varias etapas:

1. Generación en el sistema origen.
2. Recoleccion por agente, API o syslog.
3. Normalizacion de campos.
4. Enriquecimiento con contexto.
5. Almacenamiento.
6. Busqueda y correlación.
7. Alerta o reporte.

Campos útiles:

- Timestamp;
- Host;
- Usuario;
- IP origen;
- IP destino;
- Acción;
- Resultado;
- Proceso;
- Recurso;
- Severidad;
- Correlation ID.

## Qué Hace una Buena Consulta

Una buena busqueda:

- Tiene una pregunta clara.
- Filtra por tiempo.
- Filtra por entidades.
- Evita ruido innecesario.
- Permite explicar resultados.

Ejemplo de pregunta:

```text
Qué usuarios tuvieron más de 10 logins fallidos en 15 minutos?
```

Preguntas malas:

```text
Hay hackers?
Paso algo raro?
Alguien entro?
```

Preguntas mejores:

```text
Qué usuarios tuvieron login exitoso despues de muchos fallos desde la misma IP?
Qué endpoints ejecutaron procesos inusuales despues de abrir un adjunto?
Qué cuentas admin se usaron fuera de horario?
```

## Correlación

Correlación es unir eventos relacionados.

Ejemplo:

1. Muchos logins fallidos.
2. Login exitoso.
3. Cambio de contraseña.
4. Acceso a datos sensibles.

Separados pueden parecer eventos normales. Juntos pueden indicar compromiso.

## Normalizacion

Cada fuente puede llamar diferente al mismo concepto:

| Concepto | Ejemplos de campo |
| --- | --- |
| Usuario | user, username, account, subject_user |
| IP origen | src_ip, source_ip, client_ip |
| IP destino | dst_ip, destination_ip |
| Resultado | action, outcome, status |

Una detección mantenible necesita saber que campos existen y como se llaman.

## MITRE ATT&CK

MITRE ATT&CK es una base de conocimiento de tacticas y técnicas usadas por adversarios.

No es una herramienta. Es un lenguaje común para describir comportamiento.

## Tacticas

Ejemplos:

- Initial Access.
- Execution.
- Persistence.
- Privilege Escalation.
- Defense Evasion.
- Credential Access.
- Discovery.
- Lateral Movement.
- Collection.
- Exfiltration.
- Impact.

## Técnicas

Una tactica responde "para que". Una técnica responde "como".

Ejemplo:

- Tactica: Credential Access.
- Técnica: Brute Force.

## Por Qué Sirve

MITRE ayuda a:

- Clasificar alertas.
- Explicar comportamiento.
- Diseñar detecciones.
- Encontrar huecos de visibilidad.
- Comunicar incidentes.

## Cobertura

No basta con decir "tenemos SIEM". Pregunta:

- Qué técnicas podemos detectar?
- Qué técnicas no tienen logs?
- Qué alertas son ruidosas?
- Qué detecciones tienen owner?
- Qué casos de uso son prioritarios?

## Ejemplo de Mapeo

Este caso permite mapear comportamiento a MITRE ATT&CK:

```text
Un usuario tuvo 50 logins fallidos, luego uno exitoso, y despues ejecuto comandos para listar usuarios.
```

El mapeo debe identificar:

- Posible tactica 1.
- Posible técnica 1.
- Posible tactica 2.
- Posible técnica 2.
- Logs que necesitarias.

También debe considerar:

- Consulta conceptual;
- Falsos positivos posibles;
- Acción recomendada;
- Severidad justificada.

## Criterios de un Caso de Uso SIEM

Un caso de uso SIEM debe explicar:

- Pregunta de investigación;
- Fuentes de log;
- Campos requeridos;
- Lógica conceptual;
- Ventana temporal;
- Umbral;
- MITRE tactica/técnica;
- Falsos positivos;
- Pasos de investigación;
- Respuesta recomendada.

## Errores Comunes

- Crear alertas sin pregunta clara.
- No conocer los campos de la fuente.
- Mapear MITRE sin explicar comportamiento.
- Alertar por eventos normales sin contexto.
- No documentar falsos positivos.
- Pensar que más logs siempre significa mejor detección.

## Criterio de Dominio

Puedes avanzar cuando puedas:

- Explicar que es un SIEM.
- Explicar correlación.
- Explicar tactica vs técnica.
- Usar MITRE para describir una alerta.
- Diseñar una consulta conceptual con fuentes, campos y respuesta.
