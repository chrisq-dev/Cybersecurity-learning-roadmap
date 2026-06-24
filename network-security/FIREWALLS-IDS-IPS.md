# Firewalls, IDS e IPS

## Objetivo

Entender controles de seguridad de red y como ayudan a prevenir o detectar trafico no deseado.

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

## IPS

Intrusion Prevention System.

Puede bloquear trafico sospechoso.

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

Diseña reglas para:

- Usuarios a web server por 443.
- Admin a servidores por SSH.
- Invitados solo a internet.
- Bloquear acceso a base de datos desde usuarios.

Tabla:

| Origen | Destino | Puerto | Accion | Justificacion |
| --- | --- | --- | --- | --- |

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
