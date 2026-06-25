# Server-Side Request Forgery

## Objetivo

Entender SSRF, una falla donde el servidor hace requests hacia destinos controlados por el usuario.

SSRF es peligrosa porque cambia el punto de vista del ataque: no es el navegador del usuario quien hace la petición, sino el servidor. Ese servidor puede tener acceso a redes, servicios y metadatos que no están expuestos al público.

## Mapa Mental

```text
usuario controla destino -> servidor hace request -> servicio interno responde -> app devuelve o usa resultado
```

La pregunta clave:

```text
Qué puede alcanzar el servidor qué el usuario externo no debería alcanzar?
```

## Qué es

SSRF ocurre cuando una aplicación permite que el usuario influya en una URL o destino que el servidor va a consultar.

Ejemplo conceptual:

```text
/fetch?url=https://example.com
```

Si el servidor consulta cualquier URL sin control, puede ser abusado.

## Dónde Suele Aparecer

- Previews de enlaces.
- Importar imagen desde URL.
- Webhooks configurables.
- Conversores PDF.
- Integraciones con APIs externas.
- Validadores de URL.
- Proxies internos.
- Funciones de fetch o crawler.

## Por Qué Es Peligroso

El servidor puede tener acceso a:

- Redes internas.
- Servicios no expuestos a internet.
- Metadata cloud.
- Paneles internos.
- APIs internas.

## Metadata Cloud

En cloud, algunas plataformas exponen metadata a instancias o workloads para obtener información de configuración o credenciales temporales.

Riesgo conceptual:

```text
SSRF -> metadata -> credenciales temporales -> acceso cloud
```

Controles:

- Bloquear acceso a metadata desde la aplicación;
- Usar versiones de metadata con protecciones adicionales cuando existan;
- Restringir permisos del rol asociado;
- Monitorear uso anomalo de credenciales;
- Aplicar controles de egress.

## Impacto

Puede permitir:

- Escanear redes internas desde el servidor.
- Leer servicios internos.
- Acceder a metadata cloud si no está protegida.
- Saltar controles perimetrales.

El impacto depende de:

- Permisos del servidor;
- Red donde vive;
- Acceso a metadata;
- Servicios internos disponibles;
- Si la respuesta se devuelve al usuario;
- Si existen controles de salida.

## Mitigacion

- Allowlist de destinos permitidos.
- Bloquear rangos internos y metadata.
- Validar esquema: `http`, `https`.
- Resolver DNS de forma segura.
- Controles de red egress.
- Timeouts y límites.
- No devolver respuestas internas completas.

## Allowlist Correcta

Una allowlist aclara:

- Que dominios están permitidos;
- Que esquemas se permiten;
- Que puertos se permiten;
- Si se permiten redirecciones;
- Como se valida DNS;
- Quien puede modificar la lista.

Evita aceptar destinos arbitrarios cuando el caso de negocio solo requiere unos cuantos proveedores.

## Controles de Egress

Aunque la app falle, la red debe limitar salidas:

- Bloquear rangos privados si no son necesarios;
- Bloquear metadata;
- Restringir puertos;
- Usar proxy de salida controlado;
- Registrar destinos;
- Alertar por destinos internos no esperados.

## Señales de Alerta

- Requests del servidor hacia IPs privadas.
- Errores al intentar conectar a `localhost`.
- Muchas URLs distintas probadas en poco tiempo.
- Redirecciones hacia rangos internos.
- Acceso inusual a metadata cloud.
- Endpoints de preview con respuestas 500 repetidas.

## Errores Comunes

- Solo bloquear `localhost`.
- No considerar IPv6.
- No considerar redirecciones.
- No considerar DNS rebinding.
- Permitir cualquier URL.

## Ejemplo de Análisis SSRF

Escenario ficticio:

```text
Una app permite generar previews de URLs.
```

El análisis debe cubrir:

- Qué riesgos existen?
- Qué destinos bloquearias?
- Qué allowlist permitirias?
- Qué logs guardarias?

En una revisión informativa conviene considerar:

- Que red interna no debe ser accesible;
- Que puertos bloquearias;
- Como manejarias redirecciones;
- Que mensaje de error mostrarias al usuario.

## Criterios de Revisión

Un flujo con riesgo de SSRF debe analizar:

- Flujo de negocio que necesita consultar URLs;
- Destinos permitidos;
- Destinos prohibidos;
- Validación de esquema, host y puerto;
- Política de red egress;
- Manejo de redirecciones;
- Logs y alertas;
- Impacto si el control falla.

## Criterio de Dominio

Puedes avanzar cuando puedas:

- Explicar SSRF.
- Explicar por que cloud metadata importa.
- Proponer allowlist.
- Explicar controles de egress.
- Identificar donde una app permite al usuario influir en requests del servidor.
