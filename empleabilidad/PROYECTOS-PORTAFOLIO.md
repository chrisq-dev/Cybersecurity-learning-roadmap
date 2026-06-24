# Proyectos de Portafolio

Un portafolio de ciberseguridad no debe ser una carpeta llena de archivos sin explicacion. Debe demostrar que entiendes problemas, riesgos, evidencia, controles y comunicacion tecnica.

Los proyectos de esta seccion son ideas de estudio y demostracion. No son entregables obligatorios ni tienen que vivir en carpetas especificas. Lo importante es que puedas explicar el razonamiento detras de cada proyecto.

## Que Debe Demostrar un Proyecto

Un proyecto fuerte demuestra:

- comprension del problema;
- uso de datos ficticios o autorizados;
- analisis claro;
- identificacion de riesgos;
- mitigaciones razonables;
- limitaciones;
- comunicacion simple.

Si un proyecto no se puede explicar en una entrevista, todavia no esta maduro aunque tenga codigo.

## Proyecto 1: Analisis de Logs de Autenticacion

Area: Blue Team / Python.

### Que Enseña

Este proyecto enseña a interpretar eventos de autenticacion y distinguir entre actividad normal, error operativo, fuerza bruta o password spraying.

### Conceptos Clave

- logins fallidos;
- logins exitosos;
- IP origen;
- usuario objetivo;
- horario;
- privilegios;
- falsos positivos;
- severidad.

### Como Explicarlo

Una explicacion madura no dice solo "conte fallos". Dice:

```text
Observe multiples fallos contra una cuenta, revise si hubo exito posterior, compare origen y horario, considere falsos positivos y propuse acciones proporcionales.
```

### Falsos Positivos

Posibles causas benignas:

- usuario con contrasena antigua;
- servicio mal configurado;
- dispositivo intentando reconectar;
- cambio reciente de credenciales;
- pruebas internas autorizadas.

### Habilidades Demostradas

- lectura de logs;
- analisis de patrones;
- pensamiento defensivo;
- comunicacion de hallazgos;
- automatizacion si decides usar codigo.

## Proyecto 2: Hardening Linux

Area: Linux / Blue Team.

### Que Enseña

Hardening enseña a reducir superficie de ataque. El valor no esta en listar controles, sino en explicar por que cada control existe.

### Controles Relevantes

- actualizaciones;
- usuarios y sudo;
- SSH seguro;
- firewall local;
- permisos;
- logs;
- servicios innecesarios.

### Como Explicarlo

Una buena explicacion conecta control con riesgo:

```text
Restringir SSH reduce exposicion administrativa. Revisar sudo reduce impacto si una cuenta normal se compromete. Logs permiten investigar eventos posteriores.
```

### Habilidades Demostradas

- administracion basica;
- criterio de permisos;
- reduccion de superficie;
- lectura de logs;
- documentacion tecnica.

## Proyecto 3: OWASP Top 10 con Casos

Area: Seguridad web.

### Que Enseña

Este proyecto demuestra que entiendes vulnerabilidades web por causa, impacto y mitigacion, no solo por nombre.

### Vulnerabilidades Iniciales

- Broken Access Control.
- SQL Injection.
- XSS.
- SSRF.
- Security Misconfiguration.

### Como Explicarlo

Para cada caso, debes poder decir:

- que confianza se rompio;
- que dato o accion no se valido;
- que impacto tendria;
- que control lo reduce;
- como se detectaria.

### Habilidades Demostradas

- HTTP;
- autorizacion;
- validacion de entrada;
- lectura de requests;
- remediacion;
- comunicacion de riesgo.

## Proyecto 4: Red Segmentada

Area: Redes / Cisco.

### Que Enseña

Este proyecto demuestra que entiendes segmentacion, VLANs, ACLs y control de movimiento lateral.

### Conceptos Clave

- VLANs;
- subredes;
- routing entre VLANs;
- ACLs;
- zonas de red;
- administracion separada.

### Como Explicarlo

Una explicacion madura:

```text
Separe usuarios, servidores, invitados y administracion para que un compromiso en un segmento no permita acceso plano a toda la red.
```

### Habilidades Demostradas

- diseño de red;
- seguridad por zonas;
- reglas de acceso;
- minimo privilegio en red;
- documentacion de flujos.

## Proyecto 5: Investigacion de Alerta Simulada

Area: SOC / Blue Team.

### Que Enseña

Este proyecto demuestra capacidad de triage: reunir evidencia, formular hipotesis, evaluar impacto y concluir con claridad.

### Como Pensarlo

Una alerta no es una conclusion. Es una señal.

Debes poder diferenciar:

- hecho observado;
- hipotesis;
- falso positivo;
- incidente confirmado;
- accion recomendada.

### Habilidades Demostradas

- analisis defensivo;
- manejo de incertidumbre;
- MITRE ATT&CK;
- severidad;
- comunicacion ejecutiva y tecnica.

## Proyecto 6: Inventario de Activos

Area: Seguridad Operativa.

### Que Enseña

No puedes proteger bien lo que no sabes que existe. Inventario de activos conecta seguridad con operacion.

### Conceptos Clave

- owner;
- criticidad;
- exposicion;
- sistema operativo;
- fecha de actualizacion;
- datos que maneja;
- dependencia de negocio.

### Como Explicarlo

El valor esta en priorizar:

```text
Un servidor expuesto, sin owner y con datos sensibles merece mas atencion que un activo interno de baja criticidad.
```

## Proyecto 7: Cloud Security Review

Area: Cloud Security.

### Que Enseña

Cloud security demuestra criterio sobre identidad, storage, logging, redes y secretos.

### Areas Clave

- IAM;
- MFA;
- storage;
- logs;
- security groups;
- secretos;
- backups.

### Como Explicarlo

Una explicacion fuerte conecta configuracion con riesgo:

```text
Un bucket publico no siempre es malo, pero si contiene datos sensibles y no hay logs, el riesgo de fuga y falta de evidencia aumenta mucho.
```

## Como Presentar un Proyecto

Cuando hables de un proyecto, la estructura clara es:

1. Problema.
2. Contexto.
3. Riesgo.
4. Analisis.
5. Controles.
6. Limitaciones.
7. Aprendizaje.

No necesitas prometer que resolviste todo. Necesitas demostrar que piensas con criterio.

## Prioridad Recomendada

Para empezar, conviene dominar primero:

1. Analisis de logs.
2. Hardening Linux.
3. OWASP Top 10 con casos.
4. Investigacion de alerta simulada.
5. Red segmentada.

Ese orden construye base: sistemas, evidencia, web, defensa y arquitectura.
