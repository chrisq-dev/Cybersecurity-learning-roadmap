---
title: "Fundamentos de AppSec: El Corrector y las Pruebas de Choque"
level: "inicial"
content_type: "guia"
updated: "2026-06-29"
---

# Fundamentos de AppSec: El Corrector y las Pruebas de Choque

## Objetivo de esta Guía

Aprender como auditar el código fuente que escriben los programadores de tu empresa para encontrar vulnerabilidades antes de que lleguen a producción.

La Seguridad de Aplicaciones (AppSec) parte de una premisa realista: los programadores estudian para hacer que las cosas funcionen rápido, no para hacerlas seguras. Si un programador de tu empresa construye una Base de Datos y la conecta a la página web, es altamente probable que el código tenga agujeros por donde un hacker puede pasar.

El equipo de Seguridad no puede leer millones de líneas de código manualmente. Necesitamos herramientas automatizadas que nos ayuden a encontrar los problemas antes de que los encuentren los atacantes. AppSec es la disciplina que combina procesos, herramientas y conocimiento para integrar la seguridad en el ciclo de vida del desarrollo de software.

Esta guía cubre las herramientas principales (SAST, DAST, SCA), como usarlas en conjunto, y los errores más comunes que cometen los equipos al implementarlas.

## El Problema de Fondo: La Falta de Saneamiento

Una parte importante de los fallos web aparece cuando datos no confiables cruzan límites de confianza sin validación ni tratamiento contextual. No existe un único error que explique por sí solo la mayoría de los ataques.

**El Error:** El programador pone un cuadro de texto que dice "Escribe tu Nombre". El usuario escribe `Juan`. La Base de Datos guarda `Juan`.

**El Ataque:** El Hacker no escribe su nombre. Escribe una orden destructiva en código SQL: `' OR 1=1; DROP TABLE usuarios; --`.

**La Consecuencia:** Como el programador fue perezoso y no le enseñó a la página web a diferenciar entre "Nombres humanos" y "Código de computadora", la Base de Datos obedece la orden del hacker y se borra a si misma por completo.

Para evitar que esto llegue a producción, usamos herramientas de seguridad integradas en el proceso de desarrollo.

## SAST: El Corrector Ortográfico (Análisis Estático)

SAST significa Static Application Security Testing. Es el análisis de seguridad de aplicaciones en estado estático.

### La Analogía

Cuando escribes un documento en Microsoft Word y escribes mal una palabra, Word le pone una raya roja por debajo inmediatamente. Word no necesita que imprimas el documento para saber que te equivocaste. Esta leyendo el texto (Estático) mientras escribes.

### En Programación

SAST es un robot que lee el código fuente que el programador acaba de escribir en su computadora sin ejecutarlo. Examina el código en busca de patrones conocidos de vulnerabilidades.

**Lo que Atrapa:**
- Concatenación de strings en consultas SQL (SQL Injection potencial)
- Uso de funciones peligrosas (`eval`, `exec`, `system`, `innerHTML`)
- Contraseñas o claves hardcodeadas en el código
 - Desbordamiento de buffer en lenguajes como C/C++
 - Fugas de información en mensajes de error
 - Funciones de hash débiles (MD5, SHA1)
 - Generación de números aleatorios insegura
 - Falta de validación de entrada en puntos de entrada

**Herramientas SAST populares:**
- SonarQube / SonarCloud (multi-lenguaje, open source)
- Checkmarx (comercial, líder en el mercado)
- Fortify (Micro Focus, comercial)
- Snyk Code (multi-lenguaje, integración CI/CD)
- Semgrep (open source, reglas personalizables)
- CodeQL (GitHub, utilizado en GitHub Security Lab)
- Bandit (Python, open source)
- Brakeman (Ruby on Rails, open source)
- FindSecBugs (Java, open source)

**La Ventaja:** Encuentra el error en el momento exacto en que se cometió, meses antes de que el programa salga al mercado.

**La Desventaja:** SAST produce falsos positivos. No todo lo que marca es realmente una vulnerabilidad explotable. Requiere configuración y ajuste para ser útil.

### Como Funciona Técnicamente

SAST construye un árbol de sintaxis abstracta (AST) del código fuente y luego aplica reglas de búsqueda de patrones sobre ese árbol. Las reglas más avanzadas hacen análisis de flujo de datos (taint analysis): siguen el camino de los datos desde que entran al sistema (input) hasta que se usan en una función peligrosa (sink).

**Ejemplo de análisis de flujo:**
```python
# Entrada del usuario (source)
nombre = request.GET['nombre']

# El dato viaja sin sanitizar
consulta = "SELECT * FROM usuarios WHERE nombre = '" + nombre + "'"

# Uso en funcion peligrosa (sink)
db.execute(consulta)
```

SAST detecta que el dato de entrada del usuario llega a una función de base de datos sin pasar por un proceso de sanitización, y marca la vulnerabilidad.

## DAST: El Muñeco de Pruebas de Choque (Análisis Dinámico)

SAST es muy bueno leyendo texto, pero a veces, los errores de seguridad solo aparecen cuando las piezas del programa se conectan entre si y el motor arranca. Aquí entra DAST (Dynamic Application Security Testing).

### La Analogía

SAST revisa que el diseño de los frenos del auto en papel sea correcto. DAST pone a un Muñeco de Pruebas de Choque adentro del auto real, lo arranca a 100 km/h y lo choca contra la pared para ver si el conductor sobrevive.

### En Programación

DAST no tiene acceso al código fuente. Trata a la página web como una "Caja Negra" (igual que un hacker). Se conecta a la aplicación mientras esta corriendo y la ataca automáticamente.

**Lo que Atrapa:**
- Inyecciones SQL (enviando comillas y comandos SQL en formularios)
- Cross-Site Scripting (inyectando scripts en campos de texto)
- Problemas de autenticación y sesión
- Exposición de información sensible en respuestas
- Vulnerabilidades en la configuración del servidor
- Problemas en la lógica de autorización (simplificados)
- Fallos en la configuración TLS/SSL

**Herramientas DAST populares:**
- OWASP ZAP (Zed Attack Proxy) -- Gratuito, open source, muy completo
- Burp Suite Professional -- Comercial, el estándar de la industria
- Acunetix -- Comercial
- Netsparker -- Comercial
- Qualys Web Application Scanning -- Comercial, SaaS
- Detectify -- Comercial, basado en la nube

**La Diferencia Clave con SAST:**
- SAST analiza el código fuente (caja blanca)
- DAST analiza la aplicación corriendo (caja negra)
- SAST encuentra el problema temprano en el desarrollo
- DAST encuentra problemas que solo aparecen en tiempo de ejecución

### Cuando Usar Cada Uno

SAST se usa temprano (en el IDE del programador o en el commit). DAST se usa más tarde (en el ambiente de pruebas o staging).

**No es uno u otro. Son complementarios.** Necesitas ambos para tener una cobertura completa.

## SCA: Análisis de Composición de Software

SCA (Software Composition Analysis) es el tercer pilar de AppSec. Analiza las dependencias de código abierto que usa tu aplicación en busca de vulnerabilidades conocidas.

### El Problema

Las aplicaciones modernas usan cientos de dependencias. Un programador puede escribir 1,000 líneas de código seguro, pero si incluye una librería vulnerable (como Log4j en 2021), toda la aplicación es vulnerable.

Se estima que el 90% del código de una aplicación moderna es código de terceros (librerías, frameworks, módulos npm, paquetes pip, gemas de Ruby, etc.).

### Lo que Atrapa SCA

- Librerías con CVE (Common Vulnerabilities and Exposures) conocidas
- Versiones de librerías que tienen parches de seguridad disponibles
- Licencias incompatibles con el uso que le das (riesgo legal)
- Dependencias transitivas (dependencias de tus dependencias)

### Herramientas SCA populares:

- Snyk (open source y comercial)
- GitHub Dependabot (integrado en GitHub)
- OWASP Dependency-Check (gratuito)
- Black Duck (Synopsys, comercial)
- WhiteSource (comercial)
- npm audit / pip audit / cargo audit (herramientas del ecosistema)

### El Caso Log4Shell (2021)

Por qué esto importa: Log4j nos enseñó que tu aplicación puede ser segura, pero una librería que ni sabias que tenías te puede tumbar la empresa.

Log4j es una librería de logging para Java. En diciembre de 2021, se descubrió una vulnerabilidad (CVE-2021-44228) que permitía ejecución remota de código. La librería estaba en millones de servidores.

Una herramienta SCA detectaría que tu aplicación usa Log4j versión 2.14.1 y que hay una vulnerabilidad crítica. Te diría que actualices a 2.17.0 (la versión parcheada).

Sin SCA, el equipo de seguridad no sabría que tiene Log4j en su stack, porque los programadores no siempre documentan las dependencias que agregan.

## IAST y RASP: Las Generaciones Siguientes

AppSec ha evolucionado más allá de SAST y DAST.

### IAST (Interactive Application Security Testing)

Combina SAST y DAST. Se ejecuta dentro de la aplicación (como un agente) y analiza el código en tiempo real mientras las pruebas funcionales se ejecutan.

**Ventaja:** Menos falsos positivos. Ve exactamente que código se ejecuta y con que datos.

**Herramientas:** Contrast Security, Seeker (Synopsys), Hdiv.

### RASP (Runtime Application Self-Protection)

Es como tener un guardia de seguridad dentro de la aplicación en producción. Analiza las peticiones en tiempo real y bloquea ataques.

**Ventaja:** Protege la aplicación aunque tenga vulnerabilidades conocidas, hasta que se aplique el parche.

**Herramientas:** Contrast Protect, Imperva RASP, Signal Sciences.

## Proceso de AppSec en la Vida Real

En la práctica, AppSec no es solo instalar herramientas. Es un proceso.

### Fase 1: Entrenamiento

Los desarrolladores deben entender las vulnerabilidades básicas (OWASP Top 10) antes de que se les exija usar herramientas. Sin entrenamiento, las herramientas generan ruido que nadie sabe interpretar.

### Fase 2: Establecer el Pipeline

Integrar SAST en el IDE del desarrollador (como plugin) y en el pipeline CI/CD. El commit que introduzca una vulnerabilidad crítica debe fallar automáticamente.

### Fase 3: Escaneo Periódico con DAST

El DAST se ejecuta semanalmente o diariamente contra el ambiente de staging. Los hallazgos se reportan al equipo de desarrollo.

### Fase 4: Gestión de Dependencias

SCA se ejecuta en cada build para detectar vulnerabilidades en dependencias. Las dependencias con vulnerabilidades críticas bloquean el deploy.

### Fase 5: Revisión Manual

Ninguna herramienta automática encuentra todas las vulnerabilidades. Las revisiones manuales de código (code review) y las pruebas de penetración (pentest) son necesarias para encontrar problemas de lógica de negocio y vulnerabilidades complejas.

### Fase 6: Gestión de Hallazgos

No todas las vulnerabilidades se arreglan inmediatamente. El equipo AppSec debe priorizar:
- Críticas (explotables, impacto alto) -> Arreglo inmediato
- Altas (posiblemente explotables) -> Arreglo en el siguiente sprint
- Medias (requieren condiciones específicas) -> Planificar
- Bajas (difíciles de explotar) -> Aceptar riesgo o arreglar cuando haya tiempo

## Falsos Positivos y Fatiga de Alertas

El problema más grande de AppSec no es técnico, es humano. Las herramientas generan cientos de alertas, muchas de ellas falsos positivos. Los desarrolladores se frustran, ignoran las alertas, y las vulnerabilidades reales se pierden en el ruido.

### Como Reducir Falsos Positivos

1. **Configurar las herramientas correctamente.** No uses las reglas por defecto; ajústalas a tu stack tecnológico.
2. **Suprimir falsos positivos conocidos.** Si una regla siempre marca un falso positivo en un contexto específico, suprímela.
3. **Establecer una línea base.** Primero escanea el código existente y clasifica los hallazgos. Luego solo revisa los nuevos hallazgos en los commits nuevos.
4. **Formar a los desarrolladores.** Que entiendan que es un falso positivo y que no. Que sepan interpretar los reportes.
5. **Tener un equipo AppSec dedicado.** Los desarrolladores no deberían ser los únicos responsables de interpretar los escaneos de seguridad.

## Modos de Falla en AppSec

**Depender solo de una herramienta.** SAST sin DAST deja huecos. DAST sin SCA deja huecos. SCA sin SAST deja huecos. Necesitas las tres.

**Escaneo solo al final del desarrollo.** Encontrar una vulnerabilidad el día antes del lanzamiento es carisimo. El escaneo debe ser continuo.

**No ajustar las herramientas.** Usar SonarQube con reglas por defecto produce demasiados falsos positivos. Las herramientas deben configurarse para tu proyecto.

**Ignorar las dependencias transitivas.** La librería A que usas directamente puede tener una dependencia B que es vulnerable. SCA debe analizar todo el árbol de dependencias.

**No priorizar los hallazgos.** Reportar 500 vulnerabilidades sin prioridad es inútil. El equipo no sabe por donde empezar.

## Autoevaluación

1. Un desarrollador escribe una aplicación en Java. Mientras programa, accidentalmente deja la "Llave Secreta de Amazon AWS" escrita en la línea 45 de su código. Cual de las herramientas (SAST o DAST) es la ideal para encontrar este error específico, y por qué?

2. Explica el concepto de "Falta de Saneamiento de Entradas" (Input Sanitization) usando el ejemplo clásico de una Inyección SQL, y describe como un simple cuadro de "Buscar Usuario" se convierte en un arma letal si el desarrollador omite este paso.

3. El equipo de Seguridad contrata un sistema DAST para escanear la página web de la empresa todas las noches. A diferencia de un SAST, por qué el DAST necesita que la página web y la base de datos estén completamente operativas para poder hacer su trabajo?

4. El robot SAST reporto 50 "Falsos Positivos" (marcó como error algo que en realidad es seguro), lo que hizo que los programadores se enojaran y apagaran la herramienta. Que proceso de ajuste debe realizar el Arquitecto de Seguridad para que la herramienta SAST sea útil?

5. Explica la diferencia entre SAST, DAST y SCA. En que fase del ciclo de desarrollo debería usarse cada uno y que tipo de vulnerabilidades detecta cada uno?

6. Tu empresa usa una librería Open Source llamada "FastXML" que tiene una vulnerabilidad conocida CVE-2024-1234. El equipo de desarrollo no sabe que usa esa librería. Que herramienta de AppSec revelaría esta dependencia oculta?

7. Un desarrollador argumenta: "Hacemos escaneo SAST en cada commit, no necesitamos DAST." Por qué esta afirmación es incorrecta? Da un ejemplo de vulnerabilidad que DAST encontraría pero SAST no.

8. Durante una auditoría, el equipo AppSec descubre que el pipeline CI/CD no bloquea los builds cuando SCA encuentra una vulnerabilidad crítica en una dependencia. Que riesgos introduce esta falta de bloqueo y como debería configurarse el pipeline correctamente?
