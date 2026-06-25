---
title: "Ingeniería Inversa: Destripando el APK"
---
# Ingeniería Inversa: Destripando el APK

## Objetivo de esta Guía

Entender cómo los Pentesters desmantelan el código ensamblado de una aplicación móvil para revelar sus secretos. 
Descubrirás que el código de la aplicación de tu empresa es un libro abierto para cualquier adolescente con una computadora, a menos que tomes medidas drásticas.

---

## 1. El Concepto de Ingeniería Inversa (Reverse Engineering)

Imagina que alguien te entrega un pastel horneado de chocolate delicioso.
* **Programar:** Es tener la receta (huevos, harina, cacao), mezclarlos y meterlos al horno para crear el pastel.
* **Ingeniería Inversa:** Es recibir el pastel ya horneado y someterlo a procesos químicos para separar los huevos, la harina y el cacao, hasta descubrir exactamente cuál era la receta secreta del chef.

En el desarrollo de software (Android/iOS), los programadores escriben código legible (Java/Swift), lo "hornean" (lo compilan) para convertirlo en código máquina ilegible y lo suben a la App Store.
La **Ingeniería Inversa** es el proceso de tomar la aplicación de la App Store y des-compilarla para volver a leer el código humano original.

---

## 2. El Proceso en Android (Jadx)

El ecosistema de Android es notoriamente fácil de revertir porque el código Java no se compila hasta nivel de hardware absoluto.

### El Flujo de Trabajo del Hacker:
1. **Descarga el APK:** El atacante ni siquiera necesita un celular. Descarga el archivo de la app del banco directo a su laptop.
2. **Descompilación (Jadx-GUI):** Abre una herramienta gratuita llamada `Jadx`. Arrastra el archivo del banco ahí dentro.
3. **Lectura (Código Fuente Expuesto):** En 10 segundos, Jadx reconstruye el proyecto y le entrega al atacante todo el código fuente original escrito por los programadores del banco.

### ¿Qué busca el atacante en ese código? (Hardcoded Secrets)
Los programadores flojos cometen este error mortal todos los días: Escriben contraseñas "incrustadas" (Hardcoded) directamente en el código de la aplicación móvil.
* Llaves secretas de la base de datos de Amazon (AWS Keys).
* Contraseñas maestras de administrador.
* Direcciones IP de los servidores de prueba privados de la empresa.

El atacante usa `Control+F`, busca la palabra "password", roba la llave y ataca a los servidores centrales de la empresa directamente.

---

## 3. La Defensa: Ofuscación (El Lenguaje Cifrado)

Si descompilar aplicaciones es tan fácil, ¿Cómo se protegen los bancos reales? 
Usando **Ofuscación**.

La ofuscación (Ej: ProGuard en Android) es un proceso automatizado que se corre justo antes de publicar la app en la tienda.
Lo que hace es renombrar absolutamente todas las variables lógicas por nombres incomprensibles.

* *Código Original (Vulnerable):* `funcion validarTarjeta(numeroTarjeta, contrasena)`
* *Código Ofuscado (Protegido):* `funcion a(x, y)`

El código sigue funcionando igual para la computadora, pero cuando el hacker lo descompila usando Jadx, se encuentra con miles de archivos llamados `a`, `b`, `c` y funciones llamadas `x(z, j)`.
La ingeniería inversa se vuelve una tortura mental, obligando al atacante a renunciar por frustración.

---

## Criterio de Dominio (Autoevaluación)

1. Un programador junior te sugiere: *"Como la aplicación móvil ya se compiló y está en la App Store, podemos escribir la contraseña de la base de datos de producción dentro del código porque los usuarios normales no pueden leerla"*. Basado en esta guía, ¿Cómo destruirías técnicamente su argumento?
2. ¿Qué es la Ofuscación de código y por qué no impide que el software se ejecute normalmente en el celular de los clientes?
3. Nombra la herramienta gráfica estándar de la industria (gratuita) que se usa para descompilar archivos de Android de vuelta a código fuente Java.
