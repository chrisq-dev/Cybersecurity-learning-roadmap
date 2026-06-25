# Proyectos de Portafolio

Un portafolio de ciberseguridad no debe ser una carpeta llena de archivos sin explicación. Debe demostrar que entiendes problemas, riesgos, evidencia, controles y comunicación técnica.

Los proyectos de esta sección son ideas de estudio y demostracion. No son tareas obligatorias ni tienen que vivir en carpetas especificas. Lo importante es que puedas explicar el razonamiento detras de cada proyecto.

## Qué Debe Demostrar un Proyecto

Un proyecto fuerte demuestra:

- Comprensión del problema;
- Uso de datos ficticios o autorizados;
- Análisis claro;
- Identificación de riesgos;
- Mitigaciones razonables;
- Limitaciones;
- Comunicación simple.

Si un proyecto no se puede explicar en una entrevista, todavía no está maduro aunque tenga código.

## Proyecto 1: Análisis de Logs de Autenticación

Área: Blue Team / Python.

### Qué Enseña

Este proyecto enseña a interpretar eventos de autenticación y distinguir entre actividad normal, error operativo, fuerza bruta o password spraying.

### Conceptos Clave

- Logins fallidos;
- Logins exitosos;
- IP origen;
- Usuario objetivo;
- Horario;
- Privilegios;
- Falsos positivos;
- Severidad.

### Cómo Explicarlo

Una explicación madura no dice solo "conte fallos". Dice:

```text
Observe múltiples fallos contra una cuenta, revise si hubo exito posterior, compare origen y horario, considere falsos positivos y propuse acciones proporcionales.
```

### Falsos Positivos

Posibles causas benignas:

- Usuario con contraseña antigua;
- Servicio mal configurado;
- Dispositivo intentando reconectar;
- Cambio reciente de credenciales;
- Pruebas internas autorizadas.

### Habilidades Demostradas

- Lectura de logs;
- Análisis de patrones;
- Pensamiento defensivo;
- Comunicación de hallazgos;
- Automatización si decides usar código.

## Proyecto 2: Hardening Linux

Área: Linux / Blue Team.

### Qué Enseña

Hardening enseña a reducir superficie de ataque. El valor no está en listar controles, sino en explicar por que cada control existe.

### Controles Relevantes

- Actualizaciones;
- Usuarios y sudo;
- SSH seguro;
- Firewall local;
- Permisos;
- Logs;
- Servicios innecesarios.

### Cómo Explicarlo

Una buena explicación conecta control con riesgo:

```text
Restringir SSH reduce exposición administrativa. Revisar sudo reduce impacto si una cuenta normal se compromete. Logs permiten investigar eventos posteriores.
```

### Habilidades Demostradas

- Administracion básica;
- Criterio de permisos;
- Reducción de superficie;
- Lectura de logs;
- Documentacion técnica.

## Proyecto 3: OWASP Top 10 con Casos

Área: Seguridad web.

### Qué Enseña

Este proyecto demuestra que entiendes vulnerabilidades web por causa, impacto y mitigacion, no solo por nombre.

### Vulnerabilidades Iniciales

- Broken Access Control.
- SQL Injection.
- XSS.
- SSRF.
- Security Misconfiguration.

### Cómo Explicarlo

Para cada caso, debes poder decir:

- Que confianza se rompio;
- Que dato o acción no se valido;
- Que impacto tendria;
- Que control lo reduce;
- Como se detectaria.

### Habilidades Demostradas

- HTTP;
- Autorización;
- Validación de entrada;
- Lectura de requests;
- Remediación;
- Comunicación de riesgo.

## Proyecto 4: Red Segmentada

Área: Redes / Cisco.

### Qué Enseña

Este proyecto demuestra que entiendes segmentación, VLANs, ACLs y control de movimiento lateral.

### Conceptos Clave

- VLANs;
- Subredes;
- Routing entre VLANs;
- ACLs;
- Zonas de red;
- Administracion separada.

### Cómo Explicarlo

Una explicación madura:

```text
Separe usuarios, servidores, invitados y administracion para que un compromiso en un segmento no permita acceso plano a toda la red.
```

### Habilidades Demostradas

- Diseño de red;
- Seguridad por zonas;
- Reglas de acceso;
- Mínimo privilegio en red;
- Documentacion de flujos.

## Proyecto 5: Investigación de Alerta Simulada

Área: SOC / Blue Team.

### Qué Enseña

Este proyecto demuestra capacidad de triage: reunir evidencia, formular hipótesis, evaluar impacto y concluir con claridad.

### Cómo Pensarlo

Una alerta no es una conclusión. Es una señal.

Debes poder diferenciar:

- Hecho observado;
- Hipótesis;
- Falso positivo;
- Incidente confirmado;
- Acción recomendada.

### Habilidades Demostradas

- Análisis defensivo;
- Manejo de incertidumbre;
- MITRE ATT&CK;
- Severidad;
- Comunicación ejecutiva y técnica.

## Proyecto 6: Inventario de Activos

Área: Seguridad Operativa.

### Qué Enseña

No puedes proteger bien lo que no sabes que existe. Inventario de activos conecta seguridad con operación.

### Conceptos Clave

- Owner;
- Criticidad;
- Exposición;
- Sistema operativo;
- Fecha de actualizacion;
- Datos que maneja;
- Dependencia de negocio.

### Cómo Explicarlo

El valor está en priorizar:

```text
Un servidor expuesto, sin owner y con datos sensibles merece más atencion que un activo interno de baja criticidad.
```

## Proyecto 7: Cloud Security Review

Área: Cloud Security.

### Qué Enseña

Cloud security demuestra criterio sobre identidad, storage, logging, redes y secretos.

### Áreas Clave

- IAM;
- MFA;
- Storage;
- Logs;
- Security groups;
- Secretos;
- Backups.

### Cómo Explicarlo

Una explicación fuerte conecta configuración con riesgo:

```text
Un bucket público no siempre es malo, pero si contiene datos sensibles y no hay logs, el riesgo de fuga y falta de evidencia aumenta mucho.
```

## Cómo Presentar un Proyecto

Cuando hables de un proyecto, la estructura clara es:

1. Problema.
2. Contexto.
3. Riesgo.
4. Análisis.
5. Controles.
6. Limitaciones.
7. Aprendizaje.

No necesitas prometer que resolviste todo. Necesitas demostrar que piensas con criterio.

## Prioridad Recomendada

Para empezar, conviene dominar primero:

1. Análisis de logs.
2. Hardening Linux.
3. OWASP Top 10 con casos.
4. Investigación de alerta simulada.
5. Red segmentada.

Ese orden construye base: sistemas, evidencia, web, defensa y arquitectura.
