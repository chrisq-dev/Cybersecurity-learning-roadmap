# Python Basico para Seguridad

## Objetivo

Aprender Python suficiente para automatizar tareas de ciberseguridad: leer archivos, analizar logs, calcular hashes, consumir APIs y generar reportes.

## Variables

```python
usuario = "admin"
intentos = 5
activo = True
```

## Listas

```python
ips = ["10.0.0.1", "10.0.0.2", "203.0.113.5"]

for ip in ips:
    print(ip)
```

## Diccionarios

```python
evento = {
    "usuario": "admin",
    "ip": "203.0.113.5",
    "resultado": "failed"
}

print(evento["usuario"])
```

## Condiciones

```python
resultado = "failed"

if resultado == "failed":
    print("Login fallido")
else:
    print("Otro resultado")
```

## Funciones

```python
def es_login_fallido(linea):
    return "failed" in linea.lower()

print(es_login_fallido("login failed for admin"))
```

## Archivos

```python
from pathlib import Path

path = Path("ejemplo.log")
contenido = path.read_text()

print(contenido)
```

Leer linea por linea:

```python
from pathlib import Path

path = Path("ejemplo.log")

for line in path.read_text().splitlines():
    print(line)
```

## Errores

```python
from pathlib import Path

path = Path("no-existe.log")

try:
    print(path.read_text())
except FileNotFoundError:
    print("El archivo no existe")
```

## Practica

Un archivo de ejemplo, `ejemplo.log`, puede contener:

```text
login failed user=admin ip=203.0.113.10
login success user=maria ip=10.0.0.5
login failed user=root ip=203.0.113.10
```

Un script de ejemplo puede:

- Lea el archivo.
- Imprima solo lineas con `failed`.
- Cuente cuantas fallas hay.

## Criterio de Dominio

Puedes avanzar cuando puedas:

- Usar listas.
- Usar diccionarios.
- Leer archivos.
- Usar condiciones.
- Crear funciones.
- Manejar error de archivo inexistente.
