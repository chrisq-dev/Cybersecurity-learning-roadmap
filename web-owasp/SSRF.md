# Server-Side Request Forgery

## Objetivo

Entender SSRF, una falla donde el servidor hace requests hacia destinos controlados por el usuario.

SSRF es peligrosa porque cambia el punto de vista del ataque: no es el navegador del usuario quien hace la peticion, sino el servidor. Ese servidor puede tener acceso a redes, servicios y metadatos que no estan expuestos al publico.

## Mapa Mental

```text
usuario controla destino -> servidor hace request -> servicio interno responde -> app devuelve o usa resultado
```

La pregunta clave:

```text
Que puede alcanzar el servidor que el usuario externo no deberia alcanzar?
```

## Que es

SSRF ocurre cuando una aplicacion permite que el usuario influya en una URL o destino que el servidor va a consultar.

Ejemplo conceptual:

```text
/fetch?url=https://example.com
```

Si el servidor consulta cualquier URL sin control, puede ser abusado.

## Donde Suele Aparecer

- Previews de enlaces.
- Importar imagen desde URL.
- Webhooks configurables.
- Conversores PDF.
- Integraciones con APIs externas.
- Validadores de URL.
- Proxies internos.
- Funciones de fetch o crawler.

## Por Que Es Peligroso

El servidor puede tener acceso a:

- Redes internas.
- Servicios no expuestos a internet.
- Metadata cloud.
- Paneles internos.
- APIs internas.

## Metadata Cloud

En cloud, algunas plataformas exponen metadata a instancias o workloads para obtener informacion de configuracion o credenciales temporales.

Riesgo conceptual:

```text
SSRF -> metadata -> credenciales temporales -> acceso cloud
```

Controles:

- bloquear acceso a metadata desde la aplicacion;
- usar versiones de metadata con protecciones adicionales cuando existan;
- restringir permisos del rol asociado;
- monitorear uso anomalo de credenciales;
- aplicar controles de egress.

## Impacto

Puede permitir:

- Escanear redes internas desde el servidor.
- Leer servicios internos.
- Acceder a metadata cloud si no esta protegida.
- Saltar controles perimetrales.

El impacto depende de:

- permisos del servidor;
- red donde vive;
- acceso a metadata;
- servicios internos disponibles;
- si la respuesta se devuelve al usuario;
- si existen controles de salida.

## Mitigacion

- Allowlist de destinos permitidos.
- Bloquear rangos internos y metadata.
- Validar esquema: `http`, `https`.
- Resolver DNS de forma segura.
- Controles de red egress.
- Timeouts y limites.
- No devolver respuestas internas completas.

## Allowlist Correcta

Una allowlist responde:

- que dominios estan permitidos;
- que esquemas se permiten;
- que puertos se permiten;
- si se permiten redirecciones;
- como se valida DNS;
- quien puede modificar la lista.

Evita aceptar destinos arbitrarios cuando el caso de negocio solo requiere unos cuantos proveedores.

## Controles de Egress

Aunque la app falle, la red debe limitar salidas:

- bloquear rangos privados si no son necesarios;
- bloquear metadata;
- restringir puertos;
- usar proxy de salida controlado;
- registrar destinos;
- alertar por destinos internos no esperados.

## Senales de Alerta

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

## Practica Segura Guiada

Escenario ficticio:

```text
Una app permite generar previews de URLs.
```

Responde:

- Que riesgos existen?
- Que destinos bloquearias?
- Que allowlist permitirias?
- Que logs guardarias?

Agrega:

- que red interna no debe ser accesible;
- que puertos bloquearias;
- como manejarias redirecciones;
- que mensaje de error mostrarias al usuario.

## Mini Laboratorio Defensivo

Crea `revision-ssrf-defensiva.md` con:

1. Flujo de negocio que necesita consultar URLs.
2. Destinos permitidos.
3. Destinos prohibidos.
4. Validacion de esquema, host y puerto.
5. Politica de red egress.
6. Logs y alertas.
7. Impacto si el control falla.

## Criterio de Dominio

Puedes avanzar cuando puedas:

- Explicar SSRF.
- Explicar por que cloud metadata importa.
- Proponer allowlist.
- Explicar controles de egress.
- Identificar donde una app permite al usuario influir en requests del servidor.
