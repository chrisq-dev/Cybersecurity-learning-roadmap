# Fundamentos Blue Team

## Objetivo

Aprender a pensar como analista defensivo: observar, investigar, documentar y responder.

## Flujo de Investigacion

1. Recibir alerta.
2. Entender que dice.
3. Reunir evidencia.
4. Formular hipotesis.
5. Buscar actividad relacionada.
6. Determinar impacto.
7. Recomendar accion.
8. Documentar.

## Preguntas de Analista

- Que paso?
- Cuando paso?
- Donde paso?
- Que usuario o sistema estuvo involucrado?
- Es esperado o sospechoso?
- Hay evidencia adicional?
- Cual es el impacto?
- Que accion se recomienda?

## Logs Comunes

- Autenticacion.
- Procesos.
- DNS.
- Web server.
- Firewall.
- EDR.
- Cloud.

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

## Practica

Crea una investigacion simulada:

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

## Criterio de Dominio

Puedes avanzar cuando puedas:

- Explicar que es una alerta.
- Leer un log basico.
- Separar evidencia de suposicion.
- Escribir una conclusion.
- Proponer una accion.
