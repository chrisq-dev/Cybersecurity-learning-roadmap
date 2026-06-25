# Threat Hunting

## Objetivo

Aprender a buscar actividad sospechosa de forma proactiva, no solo esperar alertas.

Threat hunting es una habilidad clave para pasar de analista reactivo a analista que entiende comportamiento. No reemplaza alertas; ayuda a descubrir brechas de detección y a mejorar reglas existentes.

## Mapa Mental

```text
hipótesis -> datos -> busqueda -> contexto -> hallazgo -> detección -> mejora
```

Un hunt sin hipótesis se convierte en navegar logs sin rumbo.

## Qué es Threat Hunting

Threat hunting es una investigación guiada por hipótesis.

No empieza con:

```text
La herramienta alerto.
```

Empieza con:

```text
Creo que podria existir cierto comportamiento malicioso. Voy a buscar evidencia.
```

## Hipótesis

Una hipótesis debe ser clara y verificable.

Ejemplo débil:

```text
Buscar hackers.
```

Ejemplo bueno:

```text
Un atacante que obtuvo credenciales podria intentar múltiples logins fallidos y luego un login exitoso desde una IP inusual.
```

## Hipótesis Buena

Debe tener:

- Comportamiento observable;
- Fuente de datos posible;
- Entidad afectada;
- Criterio de sospecha;
- Resultado esperado.

Formato:

```text
Creo que [actor/comportamiento] podria [acción] en [entidad] y puedo buscarlo con [datos].
```

## Fuentes de Datos

- Logs de autenticación.
- Eventos de procesos.
- DNS.
- Proxy.
- Firewall.
- EDR.
- VPN.
- Cloud audit logs.
- Web server logs.

## Tipos de Hunt

### Basado en Hipótesis

Parte de una idea concreta.

### Basado en Inteligencia

Parte de indicadores o técnicas conocidas.

### Basado en Anomalias

Parte de desviaciones respecto al comportamiento normal.

### Basado en Cobertura

Busca técnicas MITRE que no están cubiertas por alertas actuales.

## Flujo de Hunting

1. Crear hipótesis.
2. Identificar datos necesarios.
3. Buscar patrones.
4. Revisar resultados.
5. Separar normal de sospechoso.
6. Documentar hallazgos.
7. Crear detección si aplica.

## Baseline

Antes de llamar algo sospechoso, entiende que es normal.

Ejemplos:

- Horarios normales de login;
- Paises o redes comunes;
- Procesos habituales por rol;
- Dominios frecuentes;
- Cuentas de servicio esperadas;
- Volumen normal de errores.

Sin baseline, todo parece raro o nada parece raro.

## Ejemplos de Hunts

### Hunt 1: Logins Inusuales

Hipótesis:

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
- Hay muchos fallos antes del éxito?
- Ocurre fuera de horario?
- Hubo actividad posterior sensible?

### Hunt 2: Uso Sospechoso de PowerShell

Hipótesis:

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

- Quién ejecuto PowerShell?
- Desde qué proceso padre?
- El comando está codificado?
- Descarga contenido remoto?

### Hunt 3: DNS Raro

Hipótesis:

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
- Hay tráfico posterior?

### Hunt 4: Cuentas de Servicio Anomalas

Hipótesis:

```text
Una cuenta de servicio comprometida puede usarse desde hosts o horarios no esperados.
```

Datos:

- Cuenta;
- Host origen;
- Sistema destino;
- Hora;
- Acción;
- Resultado.

Preguntas:

- La cuenta debería iniciar sesión interactivamente?
- El host origen es esperado?
- Hubo cambios de permisos?
- Se accedieron recursos sensibles?

## Formato de análisis de hunting

```md
# Threat Hunt

## Hipótesis

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

- Hipótesis: que comportamiento indicaria posible compromiso.
- Fuentes de datos: autenticación, VPN, endpoint, correo, proxy, EDR o directorio.
- Campos necesarios: usuario, IP origen, pais, dispositivo, hora, resultado, método de autenticación y recurso accedido.
- Busquedas conceptuales: accesos imposibles, cambios bruscos de ubicación, fallos repetidos, inicios fuera de horario y acceso a recursos nuevos.
- Baseline esperado: como se comporta normalmente esa cuenta.
- Anomalias: que cambio es relevante y por que.
- Falsos positivos: viajes, VPN corporativa, cambios de turno, automatizaciones o errores de sincronizacion.
- Recomendación: restablecimiento de credenciales, revocacion de sesiones, MFA, revisión de permisos y monitoreo posterior.
- Detección propuesta: regla que capture el patron sin generar ruido excesivo.

## Errores Comunes

- Buscar sin hipótesis.
- No conocer normalidad del ambiente.
- Confundir anomalia con incidente confirmado.
- No documentar busquedas que no encontraron nada.
- No convertir hallazgos repetibles en detecciones.
- No pedir datos faltantes.

## Criterio de Dominio

Puedes avanzar cuando puedas:

- Escribir una hipótesis verificable.
- Identificar fuentes de datos.
- Documentar resultados.
- Proponer una detección nueva.
- Explicar la diferencia entre anomalia, hallazgo e incidente.
