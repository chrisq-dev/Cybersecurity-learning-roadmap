---
title: "Fundamentos de Bases de Datos: El Maletín y La Bóveda"
---
# Fundamentos de Bases de Datos: El Maletín y La Bóveda

## Objetivo de esta Guía

Aprender la diferencia exacta entre proteger los datos cuando están viajando y protegerlos cuando están guardados.

Anteriormente (Criptografía) y Fase 6 (Web) aprendimos que el protocolo HTTPS (TLS) cifra la información para que los hackers no puedan robar contraseñas desde el Wi-Fi de un café. A esto se le llama **Cifrado en Tránsito**. 

El problema es que muchos ingenieros asumen que con HTTPS ya están seguros. Eso es un error catastrófico. HTTPS solo protege el viaje. ¿Qué pasa cuando el viaje termina?

---

## 1. La Analogía: El Transporte de Valores

### Cifrado en Tránsito (El Maletín Blindado)
Imagina que eres un banco y necesitas enviar 1 millón de dólares a otra sucursal.
* Pones el dinero en un **Maletín Blindado** y contratas un Camión de Valores (Este camión es el HTTPS / TLS).
* El camión conduce por la autopista (El Internet). Si una banda de asaltantes (Hackers) ataca el camión a mitad del camino, no podrán abrir el maletín de titanio. El dinero está seguro *durante el viaje*.

### El Problema de la Llegada (Data in Use)
El camión llega sano y salvo a la sucursal de destino. El guardia saca el dinero del maletín blindado y... **lo tira en el piso del banco**.
El viaje terminó. El camión blindado ya no sirve de nada. Si un empleado malicioso de limpieza está caminando por el banco, puede simplemente agacharse y robarse el millón de dólares.

* **En Informática:** Tu usuario escribe su contraseña en la página web usando HTTPS. Viaja encriptada y segura. Pero cuando llega al servidor web, el servidor le quita la encriptación para poder leerla, y la guarda en la Base de Datos en texto completamente plano (`contraseña123`). Si un hacker logra entrar a la red interna y copia la Base de Datos, se lleva todo.

---

## 2. Cifrado en Reposo (La Bóveda de Titanio)

Para arreglar el error de dejar el dinero tirado en el piso, inventamos el **Cifrado en Reposo (Encryption at Rest)**. La tecnología más común para esto se llama **TDE (Transparent Data Encryption)**.

* **La Analogía:** Cuando el camión blindado llega al banco, el dinero no se tira al piso. Se mete inmediatamente dentro de una Bóveda Subterránea que pesa 50 toneladas y tiene cerraduras matemáticas.
* **En Informática:** El Disco Duro físico donde la Base de Datos guarda su información (Los archivos `.mdf` o `/var/lib/mysql`) se encripta matemáticamente usando AES-256.

### El Escenario Definitivo (Zero Trust)
La empresa es hackeada. El hacker salta el Firewall. El hacker vulnera el Servidor Web. El hacker logra descargar el archivo físico gigantesco que contiene la Base de Datos de Clientes y se lo lleva a su computadora en Rusia.

El hacker abre el archivo esperando ver 5 millones de tarjetas de crédito. En su lugar, el hacker solo ve basura ilegible (`x9$Lp@...`). 
Como la base de datos tenía "Cifrado en Reposo", y el hacker no tiene la Llave Maestra (que está guardada en un HSM o Bóveda PAM, como vimos Anteriormente), el botín que robó es matemáticamente inútil. La empresa se salvó de la multa millonaria.

---

## 3. Criterio de Dominio (Autoevaluación)

Revisa si puedes diseñar la defensa final:

1. El Arquitecto de Software de tu empresa argumenta: "No necesitamos cifrar los discos duros de la base de datos (Cifrado en Reposo) porque nuestra página web ya tiene un certificado HTTPS muy seguro". Usando la analogía del "Camión de Valores", explica por qué este argumento es técnicamente incorrecto y peligroso.
2. Un empleado del Centro de Datos entra físicamente a la sala de servidores de la empresa a las 3:00 AM, roba físicamente el Disco Duro del servidor de Base de Datos principal, y se lo lleva a su casa. Si la base de datos estaba configurada con **TDE (Transparent Data Encryption)**, ¿Qué verá el empleado cuando conecte el disco duro robado en su computadora personal?
3. Sabiendo que el Cifrado en Reposo protege contra el robo físico de los discos, ¿Por qué un ataque de Inyección SQL (Visto en AppSec Fase 17) ejecutado a través de la página web sí lograría extraer los datos de forma legible a pesar de que el disco duro esté encriptado con TDE? (Pista: Piensa en quién está "leyendo" legalmente los datos y entregándoselos al atacante).
4. El equipo de seguridad decide implementar Cifrado en Reposo (AES-256) en la Base de Datos. Matemáticamente, esto requiere una "Llave Maestra de Encriptación". Basándote en lo aprendido Anteriormente, ¿Por qué guardar esta Llave Maestra en un archivo de texto plano en el mismo servidor web anula completamente todo el propósito del cifrado?
