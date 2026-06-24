---
title: "Comandos Básicos de Linux"
description: "Aprende a sobrevivir en la terminal: navegación, archivos y redes."
tiempo_estimado: "30 min"
dificultad: "Principiante"
---

> [!IMPORTANT]
> **Objetivo de esta lección:** 
> Perderle el miedo a la pantalla negra. Aprenderás a moverte, inspeccionar archivos, buscar información y entender qué está pasando en el sistema sin necesidad de interfaz gráfica.

## 1. Navegación de Supervivencia

Antes de correr, hay que saber dónde estamos parados. La terminal no tiene botones de "Atrás", así que usaremos estos comandos:

```bash
pwd        # "Print Working Directory": ¿Dónde estoy ahora mismo?
ls -la     # "List": Muéstrame todo lo que hay aquí, incluyendo archivos ocultos.
cd /var    # "Change Directory": Llévame a la carpeta /var.
cd ..      # Sube un nivel (a la carpeta padre).
cd ~       # Llévame de vuelta a mi casa (Directorio Home).
```

## 2. Leer Archivos como un Hacker

No usamos Word ni el Bloc de Notas. Para ver qué hay dentro de un archivo rápidamente:

```bash
cat archivo.txt      # Escupe todo el texto de golpe.
less archivo.txt     # Ábrelo modo lectura (usa flechas para bajar, 'q' para salir).
head archivo.txt     # Lee solo las primeras líneas.
tail archivo.txt     # Lee solo las últimas líneas.
tail -f archivo.log  # ¡Súper útil! Muestra en tiempo real lo que se añade al archivo.
```

> [!TIP]
> **El caso de uso real:** `tail -f` es el comando que más usarás cuando estés buscando errores en un servidor web o analizando logs del sistema durante un ataque.

## 3. Búsqueda de Información

Cuando un servidor tiene miles de archivos, encontrar algo a mano es imposible.

```bash
find /var -name "*.log"      # Busca archivos que terminen en .log dentro de /var
grep "error" archivo.log     # Busca la palabra "error" dentro del archivo
grep -i "failed" archivo.log # Busca ignorando mayúsculas y minúsculas (-i)
grep -R "password" .         # Busca la palabra en TODOS los archivos de esta carpeta
```

## 4. Diagnóstico del Sistema y Red

¿Quién soy? ¿Dónde estoy? ¿Tengo internet?

```bash
whoami                       # ¿Con qué usuario estoy ejecutando comandos?
id                           # Muestra mi usuario y los grupos a los que pertenezco
uname -a                     # Muestra la versión del kernel y del sistema
df -h                        # Muestra el espacio libre en el disco
free -h                      # Muestra la memoria RAM libre
ip addr                      # Muestra mi dirección IP local
curl -I https://google.com   # Hace un ping web para ver si hay conexión
```

---

## Observacion Practica

Para entender comandos de Linux conviene observarlos en un entorno propio, como una maquina virtual, WSL o un laboratorio local. Estos comandos muestran ubicacion, usuario, archivos, procesos y conectividad:

- `pwd` muestra la ruta actual.
- `cd /tmp` cambia a un directorio temporal.
- `ls -la` lista archivos visibles y ocultos.
- `whoami` confirma el usuario actual.
- `curl -I https://google.com` muestra si hay respuesta HTTP.

---

## Criterio de Dominio

Puedes considerar dominado este bloque cuando puedas hacer lo siguiente sin mirar la guia:

- Volver a tu directorio principal.
- Buscar la palabra `password` dentro de un archivo de texto.
- Leer las ultimas 10 lineas de un log.
- Ver tu direccion IP actual.

> [!NOTE]
> El objetivo no es memorizar comandos aislados. El objetivo es saber que informacion te da cada comando y cuando usarla.
