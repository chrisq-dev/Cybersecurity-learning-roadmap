---
title: "Python Básico: Escribiéndole al Robot"
---
# Python Básico: Escribiéndole al Robot

## Objetivo de esta Guía

Perderle el terror a la palabra "Programación".
A diferencia de los Ingenieros de Software, que construyen aplicaciones gigantescas de millones de líneas de código durante meses (como WhatsApp o Excel), en Ciberseguridad usamos la programación para crear **Scripts Tácticos**.

Un script es simplemente un programa pequeñito, feo (sin botones ni ventanas bonitas), que resuelve un problema crítico en menos de 5 segundos, como escanear si 1,000 puertos están abiertos. Y para eso, Python es el rey absoluto.

---

## 1. La Analogía: La Receta de Cocina y el Robot Idiota

Mucha gente cree que programar requiere ser un genio de las matemáticas. Falso. **Programar es saber dar instrucciones.**

Imagina que te regalo un Robot Cocinero de 10 millones de dólares. El problema es que el Robot es literalmente idiota. No sabe qué es un "Huevo" o una "Sartén" a menos que tú se lo definas. Si le dices *"Hazme un huevo frito"*, el robot explotará por confusión. Tienes que darle una **Receta exacta paso a paso**.

Aprender Python es simplemente aprender el vocabulario para escribirle esa receta al robot.

---

## 2. Variables (Las Cajas de Cartón)

Antes de cocinar, el robot necesita ingredientes. En programación, a los ingredientes los guardamos en Cajas con etiquetas. Estas cajas se llaman **Variables**.

Si quieres decirle al robot que la edad del objetivo a hackear es 25, creas una caja llamada `edad` y le metes el número 25.

```python
# Así se crea una variable en Python:
edad_victima = 25
nombre_victima = "Juan Perez"
ip_victima = "192.168.1.55"

# Nota: El texto (como el nombre o la IP) siempre va entre comillas. Los números van desnudos.
```

> **Importante:**
> En Python, el símbolo `=` no significa "igual matemático". Significa **Asignación** (Toma lo de la derecha y mételo en la caja de la izquierda).

---

## 3. Condicionales If/Else (El Poder de Decisión)

Un script que solo avanza en línea recta es inútil. El robot necesita tomar decisiones basado en lo que está viendo en tiempo real. Para eso usamos `if` (Si pasa esto) y `else` (De lo contrario, haz esto otro).

**Escenario Hacker:** Estás escaneando un puerto. Quieres que el robot decida qué hacer dependiendo de si la puerta está abierta o cerrada.

```python
puerto = "abierto"

if puerto == "abierto":
 print("¡Bingo! Lanza el ataque.")
else:
 print("Maldición, está cerrado. Abortar misión.")
```

**La Magia de los Dos Puntos y los Espacios:**
A diferencia de lenguajes viejos y horribles como C o Java que usan docenas de llaves `{ }` para confundirte, Python obliga a usar el "Indented" (Sangría o espacios). 
Nota que después del `if`, puse dos puntos `:`, y la siguiente línea está **metida hacia la derecha**. Así es como Python sabe que la orden de "lanzar el ataque" solo le pertenece al `if`. Si no dejas el espacio, Python lanzará un error y no arrancará.

---

## 4. Bucles For / While (La Máquina Infinita)

Aquí es donde la programación justifica su existencia. Si quieres intentar adivinar 3 contraseñas, puedes escribirlas a mano. Si quieres intentar adivinar **50,000 contraseñas**, usarás un Bucle (Loop).

Un Bucle es decirle al Robot: *"Repite esta acción hasta que se acaben los ingredientes, o hasta que yo te diga que pares"*.

### Bucle FOR (Para listas finitas)
Imagina que tienes una lista de IPs sospechosas y quieres analizarlas una por una.

```python
# Esto es una Lista (una caja que adentro tiene muchas cosas separadas por comas)
lista_ips = ["192.168.1.5", "10.0.0.8", "8.8.8.8"]

# El bucle FOR: Por cada 'ip' dentro de la 'lista_ips', haz esto:
for ip in lista_ips:
 print("Escaneando la IP número: " + ip)
```
El robot tomará la primera IP, la analizará, volverá arriba, tomará la segunda IP, la analizará, y así hasta que la lista se quede vacía.

---

## 5. Criterio de Dominio (Autoevaluación)

¿Tu cerebro ya entiende la lógica del Robot?

1. Lees el código de un colega y ves esto: `if temperatura = 100:`. ¿Por qué Python explotará arrojando un error de sintaxis en esa línea? *(Pista: Piensa en la diferencia entre el `=` de asignación y el `==` matemático)*.
2. Escribes un bucle `for` pero tu código no corre porque te marca un error de *Indentation*. ¿Qué olvidaste poner en la línea de abajo después de los dos puntos `:`?
3. En la receta de cocina, tienes que guardar el puerto de ataque `443` en una caja. ¿Deberías guardar ese valor entre comillas (`"443"`) o desnudo (`443`) si más adelante planeas hacer una suma matemática con ese valor?
4. ¿Por qué el Blue Team (Defensores) prefiere usar listas (cajas grandes con muchos elementos adentro) y bucles `for` en lugar de crear 50 variables diferentes para guardar 50 correos electrónicos sospechosos?
