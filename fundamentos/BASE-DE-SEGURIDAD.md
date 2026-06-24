# Base de Seguridad

## Objetivo

Entender los conceptos que aparecen en casi cualquier area de ciberseguridad y aprender a razonar sobre riesgo.

Esta guia no busca que memorices definiciones aisladas. Busca que puedas mirar un sistema real y responder:

- que queremos proteger;
- de quien o de que lo protegemos;
- que podria fallar;
- que impacto tendria;
- que controles reducen el riesgo;
- que evidencia demuestra que el control funciona.

La ciberseguridad no es instalar herramientas. Es tomar decisiones para reducir riesgo sin destruir la operacion del sistema.

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

Un error comun es pensar que algo es "seguro" o "inseguro" de forma absoluta. En realidad, seguridad depende de contexto.

Ejemplo:

- Un servidor SSH expuesto puede ser aceptable si tiene MFA, llaves, monitoreo y restricciones.
- El mismo SSH expuesto con contrasena debil y sin logs es un riesgo alto.

La pregunta correcta no es solo:

```text
Es vulnerable?
```

La pregunta madura es:

```text
Que riesgo crea, para que activo, bajo que amenaza, con que impacto y con que controles?
```

## CIA Triad

La triada CIA resume tres objetivos basicos: confidencialidad, integridad y disponibilidad.

### Confidencialidad

La informacion solo debe ser accesible para personas o sistemas autorizados.

Ejemplos:

- cifrado;
- control de acceso;
- MFA;
- clasificacion de datos;
- segmentacion;
- mascaramiento de informacion.

Preguntas utiles:

- Quien deberia leer esta informacion?
- Quien no deberia leerla?
- Donde esta guardada?
- Como viaja por la red?
- Que pasa si se filtra?
- Hay datos personales, financieros, tecnicos o secretos?

Incidentes de confidencialidad:

- fuga de base de datos;
- repositorio publico con credenciales;
- correo sensible enviado al destinatario incorrecto;
- bucket cloud publico;
- empleado con acceso a datos que no necesita.

### Integridad

La informacion no debe ser modificada sin autorizacion.

Ejemplos:

- hashes;
- firmas digitales;
- control de cambios;
- permisos;
- revision de codigo;
- logs de auditoria.

Preguntas utiles:

- Como sabemos que el dato no fue alterado?
- Quien puede modificarlo?
- Existe historial de cambios?
- Se puede detectar una modificacion indebida?
- Que pasa si el dato es incorrecto?

Incidentes de integridad:

- atacante modifica una factura;
- malware altera archivos;
- usuario cambia permisos sin autorizacion;
- actualizacion manipulada;
- datos de inventario alterados.

### Disponibilidad

Los sistemas deben estar funcionando cuando se necesitan.

Ejemplos:

- backups;
- redundancia;
- monitoreo;
- proteccion contra DoS;
- planes de recuperacion;
- capacidad suficiente.

Preguntas utiles:

- Cuanto tiempo puede estar caido?
- Que usuarios o procesos dependen de el?
- Existe respaldo?
- Existe procedimiento de recuperacion?
- Cual es el impacto por hora de caida?

Incidentes de disponibilidad:

- ransomware;
- caida de servidor;
- saturacion por trafico;
- error de despliegue;
- dependencia externa fuera de servicio.

## Activos

Un activo es cualquier cosa que tenga valor para una persona u organizacion.

Ejemplos:

- datos de clientes;
- codigo fuente;
- cuenta de administrador;
- servidor web;
- laptop de trabajo;
- token de API;
- reputacion;
- continuidad del negocio;
- configuracion de infraestructura;
- secretos de CI/CD;
- documentacion interna.

En seguridad, no todo activo es tecnico. Una credencial, un contrato, una marca, una relacion con clientes o la confianza publica tambien pueden ser activos.

## Clasificacion de Activos

Clasificar activos ayuda a decidir donde invertir esfuerzo.

Ejemplo simple:

| Nivel | Descripcion | Ejemplo |
| --- | --- | --- |
| Publico | Puede compartirse sin dano | Blog, landing publica |
| Interno | Uso dentro de la organizacion | Procedimientos internos |
| Confidencial | Acceso limitado | Datos de clientes |
| Critico | Alto impacto si se pierde o altera | Llaves maestras, produccion, backups |

No todos los activos merecen el mismo nivel de control. Proteger todo como si fuera critico suele ser caro e impracticable; proteger lo critico como si fuera publico es peligroso.

## Amenaza

Una amenaza es quien o que podria causar dano.

Ejemplos:

- atacante externo;
- malware;
- empleado negligente;
- empleado malicioso;
- error humano;
- proveedor comprometido;
- falla electrica;
- desastre natural;
- bot automatizado;
- credencial filtrada.

La amenaza no siempre es una persona. Puede ser un evento, una condicion o un fallo.

## Vulnerabilidad

Una vulnerabilidad es una debilidad que permite que algo salga mal.

Ejemplos:

- contrasena debil;
- software sin parche;
- permiso excesivo;
- validacion de entrada deficiente;
- bucket publico;
- falta de MFA;
- logs desactivados;
- red sin segmentacion.

Una vulnerabilidad sin amenaza o sin impacto puede no ser prioridad. Una vulnerabilidad con amenaza activa e impacto alto debe atenderse rapido.

## Impacto

Impacto es la consecuencia si el riesgo se materializa.

Puede ser:

- financiero;
- legal;
- operativo;
- reputacional;
- tecnico;
- humano;
- contractual.

Ejemplo:

Una vulnerabilidad XSS en una pagina interna de bajo uso no tiene el mismo impacto que una falla de autorizacion que permite leer datos de todos los clientes.

## Riesgo

Formula mental:

```text
Riesgo = amenaza + vulnerabilidad + impacto
```

Version practica:

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

Es el riesgo que queda despues de aplicar controles.

Ejemplo:

El mismo panel con MFA, IP allowlist, logs, alertas y cuentas nominales sigue teniendo riesgo, pero menor.

La meta no siempre es riesgo cero. La meta es riesgo aceptable y controlado.

## Controles

Un control es una medida para reducir riesgo. No todos los controles hacen lo mismo.

### Preventivos

Intentan evitar que el problema ocurra.

Ejemplos:

- MFA;
- hardening;
- segmentacion de red;
- validacion de entrada;
- politicas de minimo privilegio;
- parches;
- configuraciones seguras.

### Detectivos

Ayudan a descubrir que algo ocurrio o esta ocurriendo.

Ejemplos:

- logs;
- alertas SIEM;
- EDR;
- monitoreo de integridad;
- deteccion de anomalias;
- reglas Sigma;
- auditoria de cambios.

### Correctivos

Ayudan a recuperarse o reducir dano despues del evento.

Ejemplos:

- backups;
- rotacion de credenciales;
- restauracion de sistemas;
- bloqueo de indicadores;
- parches;
- contencion de host;
- revocacion de sesiones.

## Defensa en Profundidad

Defensa en profundidad significa no depender de un solo control.

Ejemplo para una cuenta critica:

- contrasena fuerte;
- MFA;
- minimo privilegio;
- alertas de inicio de sesion;
- revision periodica de accesos;
- bloqueo por riesgo;
- logs retenidos;
- proceso de recuperacion.

Si un control falla, otros reducen impacto.

## Evidencia

En seguridad, una afirmacion sin evidencia es debil.

Ejemplos de evidencia:

- captura de configuracion;
- log de acceso;
- resultado de escaneo autorizado;
- politica aplicada;
- alerta generada;
- ticket de remediacion;
- hash de archivo;
- reporte de backup restaurado;
- prueba de MFA habilitado.

Decir "tenemos backups" no basta. Mejor pregunta:

- cuando fue el ultimo backup exitoso?
- donde esta guardado?
- esta cifrado?
- quien puede restaurarlo?
- se ha probado restauracion?

## Ejemplo Completo

Escenario:

- Una empresa pequena tiene una aplicacion web con panel administrativo.
- El panel usa usuario y contrasena.
- No tiene MFA.
- Los administradores acceden desde cualquier IP.
- Los logs solo se guardan 24 horas.

Analisis:

| Elemento | Ejemplo |
| --- | --- |
| Activo | Panel administrativo |
| Amenaza | Robo de credenciales por phishing |
| Vulnerabilidad | Falta de MFA y acceso abierto |
| Impacto | Modificacion de datos, fraude, fuga de informacion |
| Riesgo | Acceso no autorizado al panel |
| Control preventivo | MFA, minimo privilegio, IP allowlist |
| Control detectivo | Alertas de login raro, logs retenidos |
| Control correctivo | Rotacion de credenciales, revocacion de sesiones, restauracion |

Prioridad:

El MFA seria una prioridad alta porque reduce directamente la probabilidad de abuso de credenciales. La retencion de logs tambien es importante porque sin evidencia no se puede investigar bien.

## Como Priorizar

No todo puede arreglarse al mismo tiempo. Prioriza con preguntas:

- El activo es critico?
- La vulnerabilidad es explotable?
- La amenaza es realista?
- Hay exposicion a internet?
- Hay datos sensibles?
- Hay controles compensatorios?
- El impacto seria alto?
- Existe explotacion activa?
- El arreglo es rapido o complejo?

Un hallazgo tecnico se vuelve mas fuerte cuando puedes explicar impacto y prioridad.

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

## Ejemplo de Analisis

Tres activos comunes para razonar seguridad pueden ser:

- una laptop;
- una cuenta de correo;
- un servidor web imaginario.

Para cada uno se debe distinguir:

- activo;
- amenaza;
- vulnerabilidad;
- impacto;
- control preventivo;
- control detectivo;
- control correctivo;
- evidencia esperada.

El objetivo no es llenar una tabla por llenar. El objetivo es entrenar el razonamiento.

## Autoevaluacion

Puedes responder sin memorizar?

- Que diferencia hay entre amenaza y vulnerabilidad?
- Por que un activo puede ser no tecnico?
- Que control detectivo pondrias para una cuenta comprometida?
- Que control correctivo pondrias ante ransomware?
- Por que el impacto ayuda a priorizar?
- Que significa riesgo residual?
- Por que MFA no elimina todo el riesgo?
- Que evidencia pedirias para comprobar que un backup sirve?

## Criterio de Dominio

Dominas este tema cuando puedes:

- explicar confidencialidad, integridad y disponibilidad con ejemplos;
- identificar activos tecnicos y no tecnicos;
- diferenciar amenaza, vulnerabilidad, impacto y riesgo;
- proponer controles preventivos, detectivos y correctivos;
- justificar prioridades con impacto y evidencia;
- distinguir riesgo inherente y residual;
- explicar por que seguridad no es absoluta;
- analizar un escenario simple sin depender de herramientas.
