# Firewalls, IDS e IPS

## Objetivo

Entender controles de seguridad de red y como ayudan a prevenir o detectar trafico no deseado.

Estos controles no son decoracion en un diagrama. Son puntos donde una organizacion decide que comunicacion permite, que bloquea, que registra y que investiga. Una red sin controles claros depende demasiado de que cada sistema individual este perfectamente protegido, y eso rara vez ocurre.

## Modelo Mental

```text
flujo de red -> politica -> control -> log -> revision
```

Una comunicacion segura debe poder explicarse:

- quien inicia;
- hacia donde va;
- por que puerto;
- por que se permite;
- que control lo valida;
- que log queda;
- quien revisa la regla.

## Firewall

Un firewall permite o bloquea trafico segun reglas.

Criterios comunes:

- IP origen.
- IP destino.
- Puerto.
- Protocolo.
- Aplicacion.
- Usuario en firewalls modernos.

Un firewall no "hace segura" una red por si solo. Su valor depende de reglas claras, arquitectura correcta, logs utiles y revision continua. Una regla demasiado amplia puede ser peor que no tener control, porque da una falsa sensacion de seguridad.

## Regla de Firewall

Una regla debe responder:

- Quien origina?
- A donde va?
- Que puerto/protocolo?
- Por que se permite?
- Quien aprobo?
- Cuando expira?

Ejemplo de regla clara:

| Campo | Valor |
| --- | --- |
| Origen | Segmento `app-prod` |
| Destino | `db-prod` |
| Puerto | TCP 5432 |
| Accion | Allow |
| Justificacion | Backend de produccion consulta PostgreSQL |
| Owner | Equipo backend |
| Expiracion/revision | Revision trimestral |

Ejemplo de regla riesgosa:

```text
Origen: any
Destino: any
Puerto: any
Accion: allow
```

## Deny by Default

Principio:

```text
Bloquear por defecto y permitir solo lo necesario.
```

Esto obliga a justificar accesos en vez de permitir todo y reaccionar despues.

## Tipos de Firewall

| Tipo | Donde aparece | Que controla |
| --- | --- | --- |
| Host firewall | Laptop/servidor | Trafico del equipo |
| Network firewall | Perimetro o segmentos | Trafico entre redes |
| Cloud security group | AWS/Azure/GCP | Trafico hacia recursos cloud |
| WAF | Delante de apps web | Patrones HTTP maliciosos |
| Next-gen firewall | Empresa | App, usuario, inspeccion avanzada |

Un WAF no reemplaza validacion segura en la aplicacion. Un security group cloud no reemplaza identidad segura. Son capas distintas.

## IDS

Intrusion Detection System.

Detecta actividad sospechosa y alerta.

No necesariamente bloquea.

Un IDS es util cuando quieres visibilidad sin interrumpir trafico. Puede colocarse para observar segmentos, trafico norte-sur o este-oeste, dependiendo de la arquitectura.

Ejemplo:

```text
IDS detecta intento de explotacion contra servidor web y genera alerta para SOC.
```

Limitacion:

Si nadie revisa alertas o si hay demasiados falsos positivos, el IDS pierde valor operativo.

## IPS

Intrusion Prevention System.

Puede bloquear trafico sospechoso.

Un IPS agrega capacidad de prevencion, pero tambien mayor riesgo operativo. Una firma mal calibrada puede bloquear trafico legitimo.

Ejemplo:

```text
IPS bloquea trafico que coincide con explotacion conocida.
```

Pregunta clave:

```text
Que prefiero en este flujo: alertar, bloquear o monitorear?
```

## Diferencia

| Control | Funcion |
| --- | --- |
| Firewall | Permitir/bloquear segun reglas |
| IDS | Detectar y alertar |
| IPS | Detectar y bloquear |

## Deteccion por Firmas y Comportamiento

IDS/IPS pueden detectar por:

- Firmas conocidas.
- Reputacion de IP/dominio.
- Patrones de protocolo.
- Anomalias de volumen.
- Indicadores de command and control.
- Intentos de explotacion conocidos.

Limitaciones:

- Cifrado puede ocultar contenido.
- Firmas pueden generar falsos positivos.
- Trafico nuevo o personalizado puede no detectarse.
- Bloquear automaticamente puede afectar disponibilidad si no se calibra.

## Riesgos Comunes

- Reglas `any any`.
- Puertos administrativos expuestos.
- Reglas sin owner.
- Reglas antiguas sin uso.
- Falta de logs.
- IDS con demasiados falsos positivos.

## Network Flows que Debes Saber Leer

Ejemplo seguro:

```text
Usuario -> Load Balancer:443 -> App:443 -> DB:5432
```

Ejemplo riesgoso:

```text
Usuario -> DB:5432
```

Ejemplo de administracion mas controlada:

```text
Admin -> VPN con MFA -> Jump Box -> Servidor
```

Si puedes dibujar los flujos, puedes discutir controles. Si nadie puede explicar por que un puerto esta abierto, probablemente debe revisarse.

## Puertos que Requieren Cuidado

| Puerto | Servicio comun | Riesgo |
| --- | --- | --- |
| 22 | SSH | Fuerza bruta, acceso admin |
| 3389 | RDP | Ataques frecuentes, ransomware |
| 3306/5432 | MySQL/PostgreSQL | Exposicion de datos |
| 6379 | Redis | Datos/cache sin autenticacion fuerte |
| 9200 | Elasticsearch | Indices expuestos |
| 445 | SMB | Movimiento lateral |
| 80/443 | HTTP/HTTPS | Apps vulnerables |

No significa que siempre esten mal. Significa que requieren justificacion, restriccion y monitoreo.

## Logs Utiles

Un log de red deberia ayudar a responder:

- Quien se conecto?
- A que destino?
- Por que puerto?
- Fue permitido o bloqueado?
- Cuantos bytes se transfirieron?
- Fue normal para ese origen?
- Hubo una alerta asociada?

Ejemplo de log conceptual:

```text
2026-06-24T12:01:10 allow src=10.10.10.25 dst=10.10.20.50 proto=tcp dpt=443 bytes=18342 rule=USERS_TO_WEB
```

Interpretacion:

- el origen fue un host de usuarios;
- el destino fue un servidor web;
- se uso TCP 443;
- la regla que permitio fue identificable;
- hubo transferencia de datos;
- falta revisar si ese flujo era esperado para ese usuario y horario.

Un log sin regla, sin zona o sin timestamp confiable tiene menos valor.

## Higiene de Reglas

Buenas practicas:

- Evitar `any any`.
- Nombrar reglas con intencion clara.
- Documentar owner.
- Revisar reglas antiguas.
- Separar administracion de usuarios.
- Bloquear administracion desde internet.
- Registrar denies relevantes.
- Usar expiracion para reglas temporales.

## Practica

Ejemplo de diseno de reglas para una red simple:

- Usuarios a web server por 443.
- Admin a servidores por SSH.
- Invitados solo a internet.
- Bloquear acceso a base de datos desde usuarios.

Tabla:

| Origen | Destino | Puerto | Accion | Justificacion |
| --- | --- | --- | --- | --- |
| Usuarios | Web interno | TCP 443 | Allow | Acceso a aplicacion |
| Admin VPN | Servidores | TCP 22 | Allow | Administracion controlada |
| Invitados | Internet | TCP 80/443 | Allow | Navegacion basica |
| Usuarios | Base de datos | TCP 5432 | Deny | DB solo desde backend |

La parte importante no es llenar la tabla. Es poder defender por que cada flujo existe.

## Arquitectura Correcta

Un firewall funciona mejor cuando la red ya tiene zonas razonables.

Ejemplo debil:

```text
usuarios, servidores, invitados y administracion en la misma red
```

Ejemplo mejor:

```text
usuarios -> firewall interno -> aplicaciones -> firewall interno -> datos
administracion -> jump box -> sistemas criticos
invitados -> internet solamente
```

Los controles se vuelven mas claros cuando la arquitectura separa funciones.

## Revision de Reglas

Las reglas envejecen.

Preguntas para revisar:

- La regla sigue siendo necesaria?
- Tiene owner?
- Tiene justificacion?
- Tiene alcance minimo?
- Usa `any` donde podria ser especifica?
- Hay trafico real usando esa regla?
- Expone administracion?
- Tiene fecha de expiracion si fue temporal?

Una regla temporal sin expiracion se convierte en riesgo permanente.

## Falsos Positivos y Falsos Negativos

### Falso positivo

El IDS/IPS alerta o bloquea algo benigno.

Impacto:

- fatiga de alertas;
- interrupcion del negocio;
- perdida de confianza en la herramienta.

### Falso negativo

El IDS/IPS no detecta actividad maliciosa.

Impacto:

- incidente sin alerta;
- deteccion tardia;
- falsa sensacion de seguridad.

La calidad defensiva mejora ajustando reglas, revisando contexto y aprendiendo de incidentes.

## Criterio de Buena Regla

Una buena regla:

- es especifica;
- tiene razon de negocio o tecnica;
- tiene owner;
- genera logs utiles;
- evita `any any`;
- se revisa periodicamente;
- limita administracion;
- no contradice la arquitectura.

## Preguntas de Comprension

- Que regla permitiria a usuarios navegar sin abrir acceso a servidores internos?
- Que diferencia hay entre firewall y WAF?
- Que log esperarias ver si alguien intenta conectarse a RDP desde internet?
- Cuando conviene alertar y cuando conviene bloquear?
- Que regla eliminarias primero en una revision de firewall?

## Criterio de Dominio

Puedes avanzar cuando puedas:

- Explicar firewall.
- Diferenciar IDS e IPS.
- Identificar reglas peligrosas.
- Diseñar reglas con justificacion.
- Dibujar flujos de red y ubicar controles.
- Explicar por que los puertos administrativos no deben exponerse.
