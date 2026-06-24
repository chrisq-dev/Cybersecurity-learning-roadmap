# EDR, Antivirus y Hardening

## Objetivo

Entender controles defensivos en endpoints.

Un endpoint es una laptop, desktop, servidor o dispositivo donde los usuarios y procesos ejecutan actividad diaria. Muchos incidentes empiezan ahi: phishing, malware, credenciales robadas, scripts sospechosos o uso indebido de privilegios.

## Mapa Mental

```text
endpoint -> usuario -> proceso -> archivo -> red -> telemetria -> deteccion -> respuesta
```

La defensa de endpoint combina prevencion, visibilidad y respuesta.

## Antivirus

Detecta malware conocido usando firmas, heuristica y otros metodos.

Limitacion:

- No detecta todo.
- Puede generar falsos positivos.

## EPP vs EDR

| Control | Enfoque | Ejemplo |
| --- | --- | --- |
| Antivirus/EPP | prevenir o bloquear amenazas conocidas | deteccion por firma, reputacion |
| EDR | observar, investigar y responder | proceso, parent process, aislamiento |
| Hardening | reducir superficie de ataque | parches, minimo privilegio |

## EDR

Endpoint Detection and Response.

Ayuda a:

- Recoger telemetria.
- Detectar comportamiento sospechoso.
- Investigar procesos.
- Aislar equipos.
- Responder a incidentes.

Funciones comunes:

- busqueda de procesos;
- timeline de actividad;
- bloqueo de hash;
- aislamiento de host;
- recoleccion de archivo;
- deteccion de comportamiento;
- respuesta remota;
- integracion con SIEM.

## Hardening de Endpoint

Controles:

- Parches.
- Firewall local.
- Bloqueo de macros.
- Application control.
- Deshabilitar servicios innecesarios.
- Minimo privilegio.
- Cifrado de disco.
- EDR activo.

## Controles Preventivos

- usuario sin admin local;
- parches de sistema y apps;
- bloqueo de macros;
- navegador actualizado;
- firewall local;
- cifrado de disco;
- control de aplicaciones;
- restriccion de PowerShell o scripts cuando aplique;
- MFA para accesos criticos.

## Controles Detectivos

- alertas EDR;
- logs de procesos;
- conexiones de red;
- eventos de autenticacion;
- cambios de servicios;
- tareas programadas;
- ejecuciones desde rutas temporales;
- desactivacion de seguridad.

## Controles Correctivos

- aislar host;
- eliminar archivo malicioso;
- quitar persistencia;
- reinstalar si no hay confianza;
- rotar credenciales;
- bloquear indicadores;
- aplicar parche o configuracion.

## Application Control

Permite o bloquea ejecucion de aplicaciones.

Ejemplos:

- Allowlist.
- Bloqueo de scripts.
- Reglas por ruta o firma.

## Superficie de Ataque Comun

| Area | Riesgo |
| --- | --- |
| Office/macros | malware por adjuntos |
| Navegador | exploit, phishing, extensiones |
| Scripts | PowerShell, Bash, Python mal usados |
| Admin local | mayor impacto si se compromete |
| USB | malware o fuga de datos |
| Software viejo | vulnerabilidades conocidas |

## Riesgos Comunes

- Usuarios administradores locales.
- EDR desactivado.
- Sistemas sin parche.
- Macros permitidas sin control.
- Software no autorizado.
- Disco sin cifrado.

## Indicadores de Mala Postura

- EDR sin actualizar.
- Equipos sin inventario.
- Usuarios con admin local sin justificacion.
- Parches atrasados.
- BitLocker/FileVault desactivado.
- Firewall local apagado.
- Software no autorizado.
- Logs insuficientes.

## Referencia de Revision

Checklist de endpoint de ejemplo:

- Parches.
- EDR activo.
- Firewall activo.
- Cifrado.
- Usuario sin admin local.
- Logs.
- Software autorizado.

## Preguntas de Investigacion

- Que usuario estaba activo?
- Que proceso inicio la actividad?
- Cual fue el proceso padre?
- Que archivo se ejecuto?
- Cual es el hash?
- Hubo conexion externa?
- Hay persistencia?
- El EDR estaba activo?

## Errores Comunes

- Pensar que antivirus basta.
- Aislar tarde un host claramente comprometido.
- Limpiar antes de preservar evidencia minima.
- No revisar actividad posterior.
- Dejar usuarios con admin local por comodidad.
- No probar que el EDR este reportando.

## Criterio de Dominio

Puedes avanzar cuando puedas:

- Explicar antivirus vs EDR.
- Explicar hardening.
- Nombrar telemetria util.
- Proponer controles endpoint.
- Diferenciar prevencion, deteccion y respuesta en endpoint.
