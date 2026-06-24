# SIEM y MITRE ATT&CK

## Objetivo

Entender como se centralizan eventos y como se clasifican tecnicas de adversarios.

Un SIEM no es magia. Es una herramienta para hacer preguntas sobre eventos. MITRE ATT&CK tampoco es una herramienta; es un lenguaje para describir comportamiento adversario. Juntos ayudan a pasar de "vi algo raro" a "tengo una hipotesis investigable".

## Mapa Mental

```text
fuente de log -> normalizacion -> busqueda -> correlacion -> alerta -> investigacion -> respuesta
```

Si falta una fuente de log, puede faltar visibilidad. Si falta contexto, puede sobrar ruido.

## Que es un SIEM

SIEM significa Security Information and Event Management.

Un SIEM ayuda a:

- Recolectar logs.
- Buscar eventos.
- Correlacionar actividad.
- Crear alertas.
- Investigar incidentes.
- Generar reportes.

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

1. Generacion en el sistema origen.
2. Recoleccion por agente, API o syslog.
3. Normalizacion de campos.
4. Enriquecimiento con contexto.
5. Almacenamiento.
6. Busqueda y correlacion.
7. Alerta o reporte.

Campos utiles:

- timestamp;
- host;
- usuario;
- IP origen;
- IP destino;
- accion;
- resultado;
- proceso;
- recurso;
- severidad;
- correlation ID.

## Que Hace una Buena Consulta

Una buena busqueda:

- Tiene una pregunta clara.
- Filtra por tiempo.
- Filtra por entidades.
- Evita ruido innecesario.
- Permite explicar resultados.

Ejemplo de pregunta:

```text
Que usuarios tuvieron mas de 10 logins fallidos en 15 minutos?
```

Preguntas malas:

```text
Hay hackers?
Paso algo raro?
Alguien entro?
```

Preguntas mejores:

```text
Que usuarios tuvieron login exitoso despues de muchos fallos desde la misma IP?
Que endpoints ejecutaron procesos inusuales despues de abrir un adjunto?
Que cuentas admin se usaron fuera de horario?
```

## Correlacion

Correlacion es unir eventos relacionados.

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

Una deteccion mantenible necesita saber que campos existen y como se llaman.

## MITRE ATT&CK

MITRE ATT&CK es una base de conocimiento de tacticas y tecnicas usadas por adversarios.

No es una herramienta. Es un lenguaje comun para describir comportamiento.

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

## Tecnicas

Una tactica responde "para que". Una tecnica responde "como".

Ejemplo:

- Tactica: Credential Access.
- Tecnica: Brute Force.

## Por Que Sirve

MITRE ayuda a:

- Clasificar alertas.
- Explicar comportamiento.
- Diseñar detecciones.
- Encontrar huecos de visibilidad.
- Comunicar incidentes.

## Cobertura

No basta con decir "tenemos SIEM". Pregunta:

- Que tecnicas podemos detectar?
- Que tecnicas no tienen logs?
- Que alertas son ruidosas?
- Que detecciones tienen owner?
- Que casos de uso son prioritarios?

## Practica Guiada

Toma este caso:

```text
Un usuario tuvo 50 logins fallidos, luego uno exitoso, y despues ejecuto comandos para listar usuarios.
```

Mapea:

- Posible tactica 1.
- Posible tecnica 1.
- Posible tactica 2.
- Posible tecnica 2.
- Logs que necesitarias.

Agrega:

- consulta conceptual;
- falsos positivos posibles;
- accion recomendada;
- severidad justificada.

## Mini Laboratorio: Caso de Uso SIEM

Crea `caso-uso-siem-logins.md` con:

1. Pregunta de investigacion.
2. Fuentes de log.
3. Campos requeridos.
4. Logica conceptual.
5. Ventana temporal.
6. Umbral.
7. MITRE tactica/tecnica.
8. Falsos positivos.
9. Pasos de investigacion.
10. Respuesta recomendada.

## Errores Comunes

- Crear alertas sin pregunta clara.
- No conocer los campos de la fuente.
- Mapear MITRE sin explicar comportamiento.
- Alertar por eventos normales sin contexto.
- No documentar falsos positivos.
- Pensar que mas logs siempre significa mejor deteccion.

## Criterio de Dominio

Puedes avanzar cuando puedas:

- Explicar que es un SIEM.
- Explicar correlacion.
- Explicar tactica vs tecnica.
- Usar MITRE para describir una alerta.
- Diseñar una consulta conceptual con fuentes, campos y respuesta.
