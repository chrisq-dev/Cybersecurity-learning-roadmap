# Threat Hunting

## Objetivo

Aprender a buscar actividad sospechosa de forma proactiva, no solo esperar alertas.

## Que es Threat Hunting

Threat hunting es una investigacion guiada por hipotesis.

No empieza con:

```text
La herramienta alerto.
```

Empieza con:

```text
Creo que podria existir cierto comportamiento malicioso. Voy a buscar evidencia.
```

## Hipotesis

Una hipotesis debe ser clara y verificable.

Ejemplo debil:

```text
Buscar hackers.
```

Ejemplo bueno:

```text
Un atacante que obtuvo credenciales podria intentar multiples logins fallidos y luego un login exitoso desde una IP inusual.
```

## Fuentes de Datos

- Logs de autenticacion.
- Eventos de procesos.
- DNS.
- Proxy.
- Firewall.
- EDR.
- VPN.
- Cloud audit logs.
- Web server logs.

## Flujo de Hunting

1. Crear hipotesis.
2. Identificar datos necesarios.
3. Buscar patrones.
4. Revisar resultados.
5. Separar normal de sospechoso.
6. Documentar hallazgos.
7. Crear deteccion si aplica.

## Ejemplos de Hunts

### Hunt 1: Logins Inusuales

Hipotesis:

```text
Credenciales validas pueden usarse desde ubicaciones o IPs inusuales.
```

Datos:

- Usuario.
- IP origen.
- Pais o ASN si existe.
- Hora.
- Resultado.

Preguntas:

- Es una IP nueva para ese usuario?
- Hay muchos fallos antes del exito?
- Ocurre fuera de horario?
- Hubo actividad posterior sensible?

### Hunt 2: Uso Sospechoso de PowerShell

Hipotesis:

```text
PowerShell puede usarse para ejecutar comandos sospechosos o automatizar acciones maliciosas.
```

Datos:

- Proceso.
- Comando.
- Usuario.
- Parent process.
- Host.

Preguntas:

- Quien ejecuto PowerShell?
- Desde que proceso padre?
- El comando esta codificado?
- Descarga contenido remoto?

### Hunt 3: DNS Raro

Hipotesis:

```text
Malware puede comunicarse con dominios inusuales o generados automaticamente.
```

Datos:

- Dominio.
- Host.
- Frecuencia.
- Longitud del dominio.
- Respuesta DNS.

Preguntas:

- El dominio es nuevo?
- Tiene muchos subdominios?
- Se repite en varios hosts?
- Hay trafico posterior?

## Entregable de Hunting

```md
# Threat Hunt

## Hipotesis

## Fuentes de Datos

## Busquedas Realizadas

## Resultados

## Hallazgos

## Falsos Positivos

## Recomendaciones

## Detecciones Propuestas
```

## Criterio de Dominio

Puedes avanzar cuando puedas:

- Escribir una hipotesis verificable.
- Identificar fuentes de datos.
- Documentar resultados.
- Proponer una deteccion nueva.
