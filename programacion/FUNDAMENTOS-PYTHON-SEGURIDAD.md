# Python para Ciberseguridad

## Objetivo

Usar Python para automatizar tareas simples de seguridad.

## Casos de Uso

- Leer logs.
- Contar eventos.
- Calcular hashes.
- Leer JSON y CSV.
- Consultar APIs.
- Generar reportes.

## Conceptos Base

- Variables.
- Listas.
- Diccionarios.
- Condiciones.
- Loops.
- Funciones.
- Manejo de archivos.
- Manejo de errores.

## Mini Script: Leer un Archivo

```python
from pathlib import Path

path = Path("ejemplo.log")

for line in path.read_text().splitlines():
    if "failed" in line.lower():
        print(line)
```

## Mini Script: Hash SHA256

```python
from hashlib import sha256
from pathlib import Path

path = Path("archivo.txt")
digest = sha256(path.read_bytes()).hexdigest()
print(digest)
```

## Practica

Crea un script que:

- Lea un archivo de texto.
- Cuente lineas.
- Busque una palabra.
- Genere un resumen.

Despues mejoralo para:

- Aceptar el nombre del archivo como argumento.
- Manejar errores si el archivo no existe.
- Guardar resultado en Markdown.

## Criterio de Dominio

Puedes avanzar cuando puedas:

- Leer archivos.
- Usar diccionarios.
- Contar eventos.
- Manejar errores simples.
- Explicar tu script linea por linea.
