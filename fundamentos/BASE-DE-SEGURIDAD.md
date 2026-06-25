# Base de Seguridad

## Objetivo

Entender los conceptos que aparecen en casi cualquier área de ciberseguridad y aprender a razonar sobre riesgo.

Esta guía no busca que memorices definiciones aisladas. Busca que puedas mirar un sistema real y responder:

- Que queremos proteger;
- De quien o de que lo protegemos;
- Que podria fallar;
- Que impacto tendria;
- Que controles reducen el riesgo;
- Que evidencia demuestra que el control funciona.

La ciberseguridad no es instalar herramientas. Es tomar decisiones para reducir riesgo sin destruir la operación del sistema.

## Modelo Mental

```text
activo -> amenaza -> vulnerabilidad -> impacto -> riesgo -> control -> evidencia
```

Si no puedes nombrar el activo, no sabes que estas protegiendo.
Si no puedes describir la amenaza, no sabes contra que estas protegiendo.
Si no puedes explicar la vulnerabilidad, no sabes que debilidad existe.
Si no puedes medir impacto, no puedes priorizar.
Si no puedes pedir evidencia, solo tienes una opinion.

## Seguridad No Es Absoluta

Un error común es pensar que algo es "seguro" o "inseguro" de forma absoluta. En realidad, seguridad depende de contexto.

Ejemplo:

- Un servidor SSH expuesto puede ser aceptable si tiene MFA, llaves, monitoreo y restricciones.
- El mismo SSH expuesto con contraseña débil y sin logs es un riesgo alto.

La pregunta correcta no es solo:

```text
Es vulnerable?
```

La pregunta madura es:

```text
Qué riesgo crea, para qué activo, bajo qué amenaza, con qué impacto y con qué controles?
```

## CIA Triad

La triada CIA resume tres objetivos básicos: confidencialidad, integridad y disponibilidad.

### Confidencialidad

La información solo debe ser accesible para personas o sistemas autorizados.

Ejemplos:

- Cifrado;
- Control de acceso;
- MFA;
- Clasificación de datos;
- Segmentación;
- Mascaramiento de información.

Preguntas útiles:

- Quién debería leer está información?
- Quién no debería leerla?
- Dónde está guardada?
- Cómo viaja por la red?
- Qué pasa si se filtra?
- Hay datos personales, financieros, técnicos o secretos?

Incidentes de confidencialidad:

- Fuga de base de datos;
- Repositorio público con credenciales;
- Correo sensible enviado al destinatario incorrecto;
- Bucket cloud público;
- Empleado con acceso a datos que no necesita.

### Integridad

La información no debe ser modificada sin autorización.

Ejemplos:

- Hashes;
- Firmas digitales;
- Control de cambios;
- Permisos;
- Revisión de código;
- Logs de auditoria.

Preguntas útiles:

- Cómo sabemos qué el dato no fue alterado?
- Quién puede modificarlo?
- Existe historial de cambios?
- Se puede detectar una modificacion indebida?
- Qué pasa si el dato es incorrecto?

Incidentes de integridad:

- Atacante modifica una factura;
- Malware altera archivos;
- Usuario cambia permisos sin autorización;
- Actualizacion manipulada;
- Datos de inventario alterados.

### Disponibilidad

Los sistemas deben estar funcionando cuando se necesitan.

Ejemplos:

- Backups;
- Redundancia;
- Monitoreo;
- Protección contra DoS;
- Planes de recuperación;
- Capacidad suficiente.

Preguntas útiles:

- Cuanto tiempo puede estar caido?
- Qué usuarios o procesos dependen de el?
- Existe respaldo?
- Existe procedimiento de recuperación?
- Cuál es el impacto por hora de caida?

Incidentes de disponibilidad:

- Ransomware;
- Caida de servidor;
- Saturacion por tráfico;
- Error de despliegue;
- Dependencia externa fuera de servicio.

## Activos

Un activo es cualquier cosa que tenga valor para una persona u organización.

Ejemplos:

- Datos de clientes;
- Código fuente;
- Cuenta de administrador;
- Servidor web;
- Laptop de trabajo;
- Token de API;
- Reputación;
- Continuidad del negocio;
- Configuración de infraestructura;
- Secretos de CI/CD;
- Documentacion interna.

En seguridad, no todo activo es técnico. Una credencial, un contrato, una marca, una relacion con clientes o la confianza pública también pueden ser activos.

## Clasificación de Activos

Clasificar activos ayuda a decidir donde invertir esfuerzo.

Ejemplo simple:

| Nivel | Descripcion | Ejemplo |
| --- | --- | --- |
| Público | Puede compartirse sin dano | Blog, landing pública |
| Interno | Uso dentro de la organización | Procedimientos internos |
| Confidencial | Acceso limitado | Datos de clientes |
| Crítico | Alto impacto si se pierde o altera | Llaves maestras, produccion, backups |

No todos los activos merecen el mismo nivel de control. Proteger todo como si fuera crítico suele ser caro e impracticable; proteger lo crítico como si fuera público es peligroso.

## Amenaza

Una amenaza es quien o que podria causar dano.

Ejemplos:

- Atacante externo;
- Malware;
- Empleado negligente;
- Empleado malicioso;
- Error humano;
- Proveedor comprometido;
- Falla electrica;
- Desastre natural;
- Bot automatizado;
- Credencial filtrada.

La amenaza no siempre es una persona. Puede ser un evento, una condicion o un fallo.

## Vulnerabilidad

Una vulnerabilidad es una debilidad que permite que algo salga mal.

Ejemplos:

- Contraseña débil;
- Software sin parche;
- Permiso excesivo;
- Validación de entrada deficiente;
- Bucket público;
- Falta de MFA;
- Logs desactivados;
- Red sin segmentación.

Una vulnerabilidad sin amenaza o sin impacto puede no ser prioridad. Una vulnerabilidad con amenaza activa e impacto alto debe atenderse rápido.

## Impacto

Impacto es la consecuencia si el riesgo se materializa.

Puede ser:

- Financiero;
- Legal;
- Operativo;
- Reputacional;
- Técnico;
- Humano;
- Contractual.

Ejemplo:

Una vulnerabilidad XSS en una página interna de bajo uso no tiene el mismo impacto que una falla de autorización que permite leer datos de todos los clientes.

## Riesgo

Formula mental:

```text
Riesgo = amenaza + vulnerabilidad + impacto
```

Versión práctica:

```text
Riesgo = probabilidad de que ocurra x impacto si ocurre
```

Ejemplo:

- Activo: servidor web.
- Amenaza: atacante externo.
- Vulnerabilidad: panel admin sin MFA.
- Impacto: acceso no autorizado a administracion.
- Riesgo: compromiso del panel y posible modificacion de datos.
- Controles: MFA, restriccion por IP, monitoreo, logs, alertas y revisiones.

## Riesgo Inherente y Riesgo Residual

### Riesgo inherente

Es el riesgo antes de aplicar controles.

Ejemplo:

Un panel administrativo expuesto a internet sin MFA tiene riesgo inherente alto.

### Riesgo residual

Es el riesgo que queda después de aplicar controles.

Ejemplo:

El mismo panel con MFA, IP allowlist, logs, alertas y cuentas nominales sigue teniendo riesgo, pero menor.

La meta no siempre es riesgo cero. La meta es riesgo aceptable y controlado.

## Controles

Un control es una medida para reducir riesgo. No todos los controles hacen lo mismo.

### Preventivos

Intentan evitar que el problema ocurra.

Ejemplos:

- MFA;
- Hardening;
- Segmentación de red;
- Validación de entrada;
- Políticas de mínimo privilegio;
- Parches;
- Configuraciones seguras.

### Detectivos

Ayudan a descubrir que algo ocurrio o está ocurriendo.

Ejemplos:

- Logs;
- Alertas SIEM;
- EDR;
- Monitoreo de integridad;
- Detección de anomalias;
- Reglas Sigma;
- Auditoria de cambios.

### Correctivos

Ayudan a recuperarse o reducir dano después del evento.

Ejemplos:

- Backups;
- Rotación de credenciales;
- Restauracion de sistemas;
- Bloqueo de indicadores;
- Parches;
- Contención de host;
- Revocacion de sesiones.

## Defensa en Profundidad

Defensa en profundidad significa no depender de un solo control.

Ejemplo para una cuenta crítica:

- Contraseña fuerte;
- MFA;
- Mínimo privilegio;
- Alertas de inicio de sesión;
- Revisión periodica de accesos;
- Bloqueo por riesgo;
- Logs retenidos;
- Proceso de recuperación.

Si un control falla, otros reducen impacto.

## Evidencia

En seguridad, una afirmacion sin evidencia es débil.

Ejemplos de evidencia:

- Captura de configuración;
- Log de acceso;
- Resultado de escaneo autorizado;
- Política aplicada;
- Alerta generada;
- Ticket de remediación;
- Hash de archivo;
- Reporte de backup restaurado;
- Prueba de MFA habilitado.

Decir "tenemos backups" no basta. Mejor pregunta:

- Cuándo fue el ultimo backup exitoso?
- Dónde está guardado?
- Está cifrado?
- Quién puede restaurarlo?
- Se ha probado restauracion?

## Ejemplo Completo

Escenario:

- Una empresa pequeña tiene una aplicación web con panel administrativo.
- El panel usa usuario y contraseña.
- No tiene MFA.
- Los administradores acceden desde cualquier IP.
- Los logs solo se guardan 24 horas.

Análisis:

| Elemento | Ejemplo |
| --- | --- |
| Activo | Panel administrativo |
| Amenaza | Robo de credenciales por phishing |
| Vulnerabilidad | Falta de MFA y acceso abierto |
| Impacto | Modificacion de datos, fraude, fuga de información |
| Riesgo | Acceso no autorizado al panel |
| Control preventivo | MFA, mínimo privilegio, IP allowlist |
| Control detectivo | Alertas de login raro, logs retenidos |
| Control correctivo | Rotación de credenciales, revocacion de sesiones, restauracion |

Prioridad:

El MFA seria una prioridad alta porque reduce directamente la probabilidad de abuso de credenciales. La retención de logs también es importante porque sin evidencia no se puede investigar bien.

## Cómo Priorizar

No todo puede arreglarse al mismo tiempo. Prioriza con preguntas:

- El activo es crítico?
- La vulnerabilidad es explotable?
- La amenaza es realista?
- Hay exposición a internet?
- Hay datos sensibles?
- Hay controles compensatorios?
- El impacto seria alto?
- Existe explotación activa?
- El arreglo es rápido o complejo?

Un hallazgo técnico se vuelve más fuerte cuando puedes explicar impacto y prioridad.

## Errores Comunes

- Confundir amenaza con vulnerabilidad.
- Pensar que una herramienta equivale a seguridad.
- Proponer controles sin entender el activo.
- Reportar hallazgos sin impacto.
- No diferenciar entre riesgo teorico y riesgo explotable.
- No guardar evidencia.
- Tratar todos los riesgos como urgentes.
- Ignorar usuarios, procesos y negocio.
- Hablar solo de ataques y no de controles.

## Ejemplo de Análisis

Tres activos comunes para razonar seguridad pueden ser:

- Una laptop;
- Una cuenta de correo;
- Un servidor web imaginario.

Para cada uno se debe distinguir:

- Activo;
- Amenaza;
- Vulnerabilidad;
- Impacto;
- Control preventivo;
- Control detectivo;
- Control correctivo;
- Evidencia esperada.

El objetivo no es llenar una tabla por llenar. El objetivo es entrenar el razonamiento.

## Autoevaluacion

Puedes responder sin memorizar?

- Qué diferencia hay entre amenaza y vulnerabilidad?
- Por qué un activo puede ser no técnico?
- Qué control detectivo pondrias para una cuenta comprometida?
- Qué control correctivo pondrias ante ransomware?
- Por qué el impacto ayuda a priorizar?
- Qué significa riesgo residual?
- Por qué MFA no elimina todo el riesgo?
- Qué evidencia pedirias para comprobar qué un backup sirve?

## Criterio de Dominio

Dominas este tema cuando puedes:

- Explicar confidencialidad, integridad y disponibilidad con ejemplos;
- Identificar activos técnicos y no técnicos;
- Diferenciar amenaza, vulnerabilidad, impacto y riesgo;
- Proponer controles preventivos, detectivos y correctivos;
- Justificar prioridades con impacto y evidencia;
- Distinguir riesgo inherente y residual;
- Explicar por que seguridad no es absoluta;
- Analizar un escenario simple sin depender de herramientas.
