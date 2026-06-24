# Threat Hunting

## Objetivo

Aprender a buscar actividad sospechosa de forma proactiva, no solo esperar alertas.

Threat hunting es una habilidad clave para pasar de analista reactivo a analista que entiende comportamiento. No reemplaza alertas; ayuda a descubrir brechas de deteccion y a mejorar reglas existentes.

## Mapa Mental

```text
hipotesis -> datos -> busqueda -> contexto -> hallazgo -> deteccion -> mejora
```

Un hunt sin hipotesis se convierte en navegar logs sin rumbo.

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

## Hipotesis Buena

Debe tener:

- comportamiento observable;
- fuente de datos posible;
- entidad afectada;
- criterio de sospecha;
- resultado esperado.

Formato:

```text
Creo que [actor/comportamiento] podria [accion] en [entidad] y puedo buscarlo con [datos].
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

## Tipos de Hunt

### Basado en Hipotesis

Parte de una idea concreta.

### Basado en Inteligencia

Parte de indicadores o tecnicas conocidas.

### Basado en Anomalias

Parte de desviaciones respecto al comportamiento normal.

### Basado en Cobertura

Busca tecnicas MITRE que no estan cubiertas por alertas actuales.

## Flujo de Hunting

1. Crear hipotesis.
2. Identificar datos necesarios.
3. Buscar patrones.
4. Revisar resultados.
5. Separar normal de sospechoso.
6. Documentar hallazgos.
7. Crear deteccion si aplica.

## Baseline

Antes de llamar algo sospechoso, entiende que es normal.

Ejemplos:

- horarios normales de login;
- paises o redes comunes;
- procesos habituales por rol;
- dominios frecuentes;
- cuentas de servicio esperadas;
- volumen normal de errores.

Sin baseline, todo parece raro o nada parece raro.

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

### Hunt 4: Cuentas de Servicio Anomalas

Hipotesis:

```text
Una cuenta de servicio comprometida puede usarse desde hosts o horarios no esperados.
```

Datos:

- cuenta;
- host origen;
- sistema destino;
- hora;
- accion;
- resultado.

Preguntas:

- La cuenta deberia iniciar sesion interactivamente?
- El host origen es esperado?
- Hubo cambios de permisos?
- Se accedieron recursos sensibles?

## Formato de analisis de hunting

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

## Criterios Para Analizar Una Cuenta Comprometida

Un hunt de cuenta comprometida debe razonar sobre:

- Hipotesis: que comportamiento indicaria posible compromiso.
- Fuentes de datos: autenticacion, VPN, endpoint, correo, proxy, EDR o directorio.
- Campos necesarios: usuario, IP origen, pais, dispositivo, hora, resultado, metodo de autenticacion y recurso accedido.
- Busquedas conceptuales: accesos imposibles, cambios bruscos de ubicacion, fallos repetidos, inicios fuera de horario y acceso a recursos nuevos.
- Baseline esperado: como se comporta normalmente esa cuenta.
- Anomalias: que cambio es relevante y por que.
- Falsos positivos: viajes, VPN corporativa, cambios de turno, automatizaciones o errores de sincronizacion.
- Recomendacion: restablecimiento de credenciales, revocacion de sesiones, MFA, revision de permisos y monitoreo posterior.
- Deteccion propuesta: regla que capture el patron sin generar ruido excesivo.

## Errores Comunes

- Buscar sin hipotesis.
- No conocer normalidad del ambiente.
- Confundir anomalia con incidente confirmado.
- No documentar busquedas que no encontraron nada.
- No convertir hallazgos repetibles en detecciones.
- No pedir datos faltantes.

## Criterio de Dominio

Puedes avanzar cuando puedas:

- Escribir una hipotesis verificable.
- Identificar fuentes de datos.
- Documentar resultados.
- Proponer una deteccion nueva.
- Explicar la diferencia entre anomalia, hallazgo e incidente.
