# Cheatsheet Python para Seguridad

Referencia rapida para procesar logs, CSV, JSON, hashes y reportes simples.

## Leer Archivo

```python
from pathlib import Path

text = Path("archivo.log").read_text()
```

## Leer Lineas

```python
for line in Path("archivo.log").read_text().splitlines():
    print(line)
```

## Manejo Seguro de Archivo

```python
from pathlib import Path

path = Path("archivo.log")

if not path.exists():
    raise SystemExit(f"No existe: {path}")
```

## Contador

```python
from collections import Counter

counter = Counter()
counter["admin"] += 1
```

## Parsear key=value

```python
def parse_line(line):
    event = {}
    for part in line.split():
        if "=" in part:
            key, value = part.split("=", 1)
            event[key] = value
    return event
```

## CSV

```python
import csv

with open("assets.csv") as f:
    reader = csv.DictReader(f)
    for row in reader:
        print(row["hostname"])
```

## CSV con Campos Faltantes

```python
owner = row.get("owner") or "SIN_OWNER"
```

## JSON

```python
import json

data = json.loads('{"user": "admin"}')
print(data["user"])
```

## API con Timeout

```python
import requests

response = requests.get("https://api.github.com", timeout=10)
print(response.status_code)
```

## Token desde Entorno

```python
import os

token = os.environ.get("API_TOKEN")
if not token:
    raise SystemExit("Falta API_TOKEN")
```

## SHA256

```python
from hashlib import sha256
from pathlib import Path

digest = sha256(Path("archivo.txt").read_bytes()).hexdigest()
print(digest)
```

## Salida Legible

```python
from pathlib import Path

report = """# Reporte

## Resumen

Eventos analizados: 10
"""

Path("resumen.txt").write_text(report)
```

## Errores Comunes

- guardar tokens en codigo;
- no usar timeout en APIs;
- asumir que todos los campos existen;
- sobrescribir evidencia;
- no documentar como ejecutar el script;
- no manejar archivos inexistentes.
