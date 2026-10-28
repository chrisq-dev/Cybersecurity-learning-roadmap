---
title: "Python Básico: primeros scripts para seguridad"
level: "inicial"
content_type: "guia"
updated: "2026-06-29"
reviewed: "2026-10-27"
reviewed_against: "Python 3 documentation, OWASP Secure Coding Practices, NIST SP 800-53"
official_sources:
  - title: "Python 3 documentation"
    url: "https://docs.python.org/3/"
  - title: "OWASP Secure Coding Practices"
    url: "https://owasp.org/www-project-secure-coding-practices-quick-reference-guide/"
  - title: "NIST SP 800-53"
    url: "https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final"
---

# Python Básico: primeros scripts para seguridad

## Objetivo de esta guía

El objetivo es perder el miedo a la programación. No necesitas ser ingeniero de software para escribir código útil en seguridad. La programación permite automatizar tareas repetitivas: leer registros, validar configuraciones, procesar listas de direcciones y ordenar evidencia.

En ciberseguridad, muchos scripts son pequeños y específicos. No necesitan interfaz gráfica ni miles de líneas. Un script puede resolver un problema concreto en pocos segundos, siempre que se ejecute sobre sistemas propios o con autorización explícita.

**Por qué importa:** no necesitas construir una aplicación completa para aportar valor. A veces basta con una herramienta pequeña, clara y bien probada.

---

## 1. La analogía: una receta para un asistente literal

Programar no exige ser experto en matemáticas. Exige dar instrucciones claras y comprobar que se ejecutan como esperas.

Imagina un asistente de cocina que sigue instrucciones al pie de la letra. Si le dices “prepara la cena” sin detallar ingredientes, cantidades y pasos, el resultado será impredecible. Si le das una receta precisa, el resultado será reproducible.

Aprender Python consiste en aprender el vocabulario y la estructura para escribir esas instrucciones.

---

## 2. Variables: guardar valores con un nombre

Una variable es un nombre asociado a un valor. Sirve para reutilizar datos sin repetirlos y para que el código sea más legible.

```python
# Variables de ejemplo en un entorno de laboratorio
host_autorizado = "192.0.2.10"
puerto_http = 443
servicio = "https"

print(host_autorizado)
```

El símbolo `=` no significa “igual matemático”. Significa **asignación**: toma el valor de la derecha y asígnalo al nombre de la izquierda. La comparación se hace con `==`.

Los textos van entre comillas. Los números pueden escribirse sin comillas. Si necesitas operar matemáticamente con un valor, guárdalo como número; si necesitas conservar ceros a la izquierda o un formato, probablemente convenga tratarlo como texto.

---

## 3. Condicionales `if` / `else`: tomar decisiones

Un script suele necesitar decisiones. Con `if` ejecutas un bloque cuando se cumple una condición; con `else` ejecutas la alternativa.

```python
estado_puerto = "abierto"

if estado_puerto == "abierto":
    print("El servicio está disponible. Registrar el hallazgo.")
else:
    print("El servicio no está disponible. No hay nada que revisar.")
```

Python usa la indentación para delimitar bloques. Después de `if` o `else` se escriben dos puntos `:` y el bloque interior va indentado. Si la indentación es incorrecta, el programa no se ejecuta.

A diferencia de lenguajes como C o Java, que usan llaves `{ }`, Python depende de los espacios al inicio de cada línea. Es una regla sintáctica, no un detalle estético.

---

## 4. Bucles `for` y `while`: repetir tareas

Un bucle permite repetir una acción sobre varios elementos. Úsalo cuando la tarea sea mecánica y el conjunto de datos sea conocido.

```python
hosts_autorizados = ["192.0.2.10", "192.0.2.11", "192.0.2.12"]

for host in hosts_autorizados:
    print("Revisando configuración de " + host)
```

El bucle `for` recorre la lista y ejecuta el bloque una vez por elemento. Un bucle `while` repite mientras se cumpla una condición; requiere especial cuidado para evitar bucles infinitos.

Antes de automatizar una comprobación, confirma que tienes autorización para ejecutarla. La comodidad de un script no elimina las obligaciones legales ni éticas.

---

## 5. Buenas prácticas iniciales

- Escribe nombres de variables descriptivos: `host_autorizado` es mejor que `x`.
- Mantén los scripts pequeños y con una responsabilidad clara.
- Valida las entradas antes de usarlas.
- No guardes contraseñas, tokens ni claves en el código.
- Prueba primero en un entorno de laboratorio.
- Documenta el propósito y el alcance del script.
- Revisa los registros para detectar errores de forma temprana.

---

## 6. Criterio de dominio

1. Lees `if temperatura = 100:` en el código de un colega. ¿Por qué Python devuelve un error de sintaxis? *(Pista: diferencia entre asignación y comparación).*
2. Escribes un bucle `for` y recibes un error de indentación. ¿Qué debes revisar en el bloque que sigue a los dos puntos `:`?
3. Necesitas guardar el puerto `443` para sumarlo después. ¿Conviene guardarlo como `"443"` o como `443`? Justifica.
4. ¿Por qué un equipo defensivo prefiere una lista y un bucle `for` para revisar 50 correos sospechosos en lugar de crear 50 variables?
5. ¿Qué controles aplicarías antes de ejecutar un script de reconocimiento en una red?
