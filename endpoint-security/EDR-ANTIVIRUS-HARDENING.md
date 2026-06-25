# EDR, Antivirus y Hardening

## Objetivo

Entender controles defensivos en endpoints.

Un endpoint es una laptop, desktop, servidor o dispositivo donde los usuarios y procesos ejecutan actividad diaria. Muchos incidentes empiezan ahi: phishing, malware, credenciales robadas, scripts sospechosos o uso indebido de privilegios.

## Mapa Mental

```text
endpoint -> usuario -> proceso -> archivo -> red -> telemetria -> detección -> respuesta
```

La defensa de endpoint combina prevencion, visibilidad y respuesta.

## Antivirus

Detecta malware conocido usando firmas, heuristica y otros métodos.

Limitacion:

- No detecta todo.
- Puede generar falsos positivos.

## EPP vs EDR

| Control | Enfoque | Ejemplo |
| --- | --- | --- |
| Antivirus/EPP | prevenir o bloquear amenazas conocidas | detección por firma, reputación |
| EDR | observar, investigar y responder | proceso, parent process, aislamiento |
| Hardening | reducir superficie de ataque | parches, mínimo privilegio |

## EDR

Endpoint Detection and Response.

Ayuda a:

- Recoger telemetria.
- Detectar comportamiento sospechoso.
- Investigar procesos.
- Aislar equipos.
- Responder a incidentes.

Funciones comunes:

- Busqueda de procesos;
- Timeline de actividad;
- Bloqueo de hash;
- Aislamiento de host;
- Recoleccion de archivo;
- Detección de comportamiento;
- Respuesta remota;
- Integración con SIEM.

## Hardening de Endpoint

Controles:

- Parches.
- Firewall local.
- Bloqueo de macros.
- Application control.
- Deshabilitar servicios innecesarios.
- Mínimo privilegio.
- Cifrado de disco.
- EDR activo.

## Controles Preventivos

- Usuario sin admin local;
- Parches de sistema y apps;
- Bloqueo de macros;
- Navegador actualizado;
- Firewall local;
- Cifrado de disco;
- Control de aplicaciones;
- Restriccion de PowerShell o scripts cuando aplique;
- MFA para accesos críticos.

## Controles Detectivos

- Alertas EDR;
- Logs de procesos;
- Conexiones de red;
- Eventos de autenticación;
- Cambios de servicios;
- Tareas programadas;
- Ejecuciones desde rutas temporales;
- Desactivación de seguridad.

## Controles Correctivos

- Aislar host;
- Eliminar archivo malicioso;
- Quitar persistencia;
- Reinstalar si no hay confianza;
- Rotar credenciales;
- Bloquear indicadores;
- Aplicar parche o configuración.

## Application Control

Permite o bloquea ejecucion de aplicaciones.

Ejemplos:

- Allowlist.
- Bloqueo de scripts.
- Reglas por ruta o firma.

## Superficie de Ataque Común

| Área | Riesgo |
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

## Referencia de Revisión

Checklist de endpoint de ejemplo:

- Parches.
- EDR activo.
- Firewall activo.
- Cifrado.
- Usuario sin admin local.
- Logs.
- Software autorizado.

## Preguntas de Investigación

- Qué usuario estaba activo?
- Qué proceso inicio la actividad?
- Cuál fue el proceso padre?
- Qué archivo se ejecuto?
- Cuál es el hash?
- Hubo conexión externa?
- Hay persistencia?
- El EDR estaba activo?

## Errores Comunes

- Pensar que antivirus basta.
- Aislar tarde un host claramente comprometido.
- Limpiar antes de preservar datos relevantes para investigación.
- No revisar actividad posterior.
- Dejar usuarios con admin local por comodidad.
- No probar que el EDR este reportando.

## Criterio de Dominio

Puedes avanzar cuando puedas:

- Explicar antivirus vs EDR.
- Explicar hardening.
- Nombrar telemetria útil.
- Proponer controles endpoint.
- Diferenciar prevencion, detección y respuesta en endpoint.
