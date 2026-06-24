# Preguntas de Fundamentos

Usa estas preguntas como examen oral o escrito. No basta con responder una frase; intenta explicar con ejemplo, impacto y evidencia.

## Redes

1. Que pasa cuando visitas `https://example.com`?
2. Diferencia entre IP y puerto.
3. Que hace DNS?
4. Que hace DHCP?
5. Que es NAT?
6. Diferencia entre TCP y UDP.
7. Que es una VLAN?
8. Que es una ACL?
9. Que diferencia hay entre switch y router?
10. Para que sirve TLS?

### Casos

1. Un usuario dice que "internet no funciona", pero puede hacer ping a `8.8.8.8` y no puede abrir `example.com`. Que sospechas?
2. Un servidor escucha en `0.0.0.0:22`. Que significa y que riesgo podria tener?
3. Dos equipos estan en VLANs distintas. Que necesitas para que se comuniquen?

## Linux

1. Que significa `rwxr-x---`?
2. Diferencia entre `chmod 600` y `chmod 755`.
3. Como ves procesos?
4. Como ves puertos escuchando?
5. Donde buscarias logs?
6. Que es `sudo`?
7. Que riesgo tiene ejecutar servicios como root?
8. Que revisarias para hardening SSH?

### Casos

1. Un archivo tiene permisos `777`. Que significa y por que puede ser riesgoso?
2. Ves muchos fallos de login en `/var/log/auth.log`. Que campos revisas?
3. Un servicio desconocido escucha en un puerto. Que pasos tomas para investigarlo?

## Windows y AD

1. Que es Event Viewer?
2. Que significa Event ID 4624?
3. Que significa Event ID 4625?
4. Que es Active Directory?
5. Que es un Domain Controller?
6. Que es una GPO?
7. Que es Kerberos?
8. Por que son sensibles los grupos privilegiados?

### Casos

1. Un usuario aparece agregado a Domain Admins. Que evidencia revisarias?
2. Una cuenta de servicio tiene password sin rotar por años. Que riesgo hay?
3. Un login exitoso ocurre a las 03:00 desde ubicacion inusual. Que preguntas haces?

## Seguridad Base

1. Explica confidencialidad, integridad y disponibilidad.
2. Diferencia entre amenaza y vulnerabilidad.
3. Que es riesgo?
4. Que es minimo privilegio?
5. Que es MFA?
6. Que es autenticacion?
7. Que es autorizacion?
8. Que es auditoria?

### Casos

1. Una empresa quiere proteger datos de clientes. Identifica activo, amenaza, vulnerabilidad, impacto y controles.
2. Un sistema critico no tiene backups probados. Que parte de CIA se afecta principalmente?
3. Explica la diferencia entre control preventivo, detectivo y correctivo con un ejemplo.

## Analisis Escrito

Para practicar razonamiento, toma un activo y analiza:

| Activo | Amenaza | Vulnerabilidad | Impacto | Control preventivo | Control detectivo | Control correctivo |
| --- | --- | --- | --- | --- | --- | --- |

La parte importante es justificar que atenderias primero y por que.

## Criterio

Si no puedes responder 80% con tus palabras, refuerza:

- Computacion basica.
- Redes.
- Linux.
- Windows.
- Identidad y permisos.
- Logs y observacion segura.

## Autoevaluacion

- 0 puntos: no puedo explicar.
- 1 punto: explico definicion.
- 2 puntos: doy ejemplo.
- 3 puntos: explico riesgo o impacto.
- 4 puntos: propongo control.
- 5 puntos: documento evidencia o practica.
