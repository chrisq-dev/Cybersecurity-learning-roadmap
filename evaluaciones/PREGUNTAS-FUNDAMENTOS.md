# Preguntas de Fundamentos

Usa estas preguntas como examen oral o escrito. No basta con responder una frase; intenta explicar con ejemplo, impacto y evidencia.

## Redes

1. Que pasa cuando visitas `https://example.com`?
2. Diferencia entre IP y puerto.
3. Qué hace DNS?
4. Qué hace DHCP?
5. Qué es NAT?
6. Diferencia entre TCP y UDP.
7. Qué es una VLAN?
8. Qué es una ACL?
9. Qué diferencia hay entre switch y router?
10. Para qué sirve TLS?

### Casos

1. Un usuario dice que "internet no funciona", pero puede hacer ping a `8.8.8.8` y no puede abrir `example.com`. Qué sospechas?
2. Un servidor escucha en `0.0.0.0:22`. Qué significa y qué riesgo podria tener?
3. Dos equipos están en VLANs distintas. Qué necesitas para qué se comuniquen?

## Linux

1. Que significa `rwxr-x---`?
2. Diferencia entre `chmod 600` y `chmod 755`.
3. Cómo ves procesos?
4. Cómo ves puertos escuchando?
5. Dónde buscarias logs?
6. Que es `sudo`?
7. Qué riesgo tiene ejecutar servicios cómo root?
8. Qué revisarias para hardening SSH?

### Casos

1. Un archivo tiene permisos `777`. Qué significa y por qué puede ser riesgoso?
2. Ves muchos fallos de login en `/var/log/auth.log`. Qué campos revisas?
3. Un servicio desconocido escucha en un puerto. Qué pasos tomas para investigarlo?

## Windows y AD

1. Qué es Event Viewer?
2. Qué significa Event ID 4624?
3. Qué significa Event ID 4625?
4. Qué es Active Directory?
5. Qué es un Domain Controller?
6. Qué es una GPO?
7. Qué es Kerberos?
8. Por qué son sensibles los grupos privilegiados?

### Casos

1. Un usuario aparece agregado a Domain Admins. Qué evidencia revisarias?
2. Una cuenta de servicio tiene password sin rotar por años. Qué riesgo hay?
3. Un login exitoso ocurre a las 03:00 desde ubicación inusual. Qué preguntas haces?

## Seguridad Base

1. Explica confidencialidad, integridad y disponibilidad.
2. Diferencia entre amenaza y vulnerabilidad.
3. Qué es riesgo?
4. Qué es mínimo privilegio?
5. Qué es MFA?
6. Qué es autenticación?
7. Qué es autorización?
8. Qué es auditoria?

### Casos

1. Una empresa quiere proteger datos de clientes. Identifica activo, amenaza, vulnerabilidad, impacto y controles.
2. Un sistema crítico no tiene backups probados. Qué parte de CIA se afecta principalmente?
3. Explica la diferencia entre control preventivo, detectivo y correctivo con un ejemplo.

## Análisis Escrito

Para practicar razonamiento, toma un activo y analiza:

| Activo | Amenaza | Vulnerabilidad | Impacto | Control preventivo | Control detectivo | Control correctivo |
| --- | --- | --- | --- | --- | --- | --- |

La parte importante es justificar que atenderias primero y por que.

## Criterio

Si no puedes responder 80% con tus palabras, refuerza:

- Computación básica.
- Redes.
- Linux.
- Windows.
- Identidad y permisos.
- Logs y observación segura.

## Autoevaluacion

- 0 puntos: no puedo explicar.
- 1 punto: explico definicion.
- 2 puntos: doy ejemplo.
- 3 puntos: explico riesgo o impacto.
- 4 puntos: propongo control.
- 5 puntos: documento evidencia o práctica.
