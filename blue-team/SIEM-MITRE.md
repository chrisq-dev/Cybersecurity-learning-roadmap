# SIEM y MITRE ATT&CK

## Objetivo

Entender como se centralizan eventos y como se clasifican tecnicas de adversarios.

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

## Correlacion

Correlacion es unir eventos relacionados.

Ejemplo:

1. Muchos logins fallidos.
2. Login exitoso.
3. Cambio de contraseña.
4. Acceso a datos sensibles.

Separados pueden parecer eventos normales. Juntos pueden indicar compromiso.

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

## Practica

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

## Criterio de Dominio

Puedes avanzar cuando puedas:

- Explicar que es un SIEM.
- Explicar correlacion.
- Explicar tactica vs tecnica.
- Usar MITRE para describir una alerta.
