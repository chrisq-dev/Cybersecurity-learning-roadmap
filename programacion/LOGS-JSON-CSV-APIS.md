# Logs, JSON, CSV y APIs

## Objetivo

Trabajar con formatos comunes en seguridad. Muchos datos vienen como logs de texto, JSON de APIs o CSV de inventarios.

## Logs de Texto

Ejemplo:

```text
2026-06-23 user=admin src_ip=203.0.113.10 result=failed
```

Leer y buscar:

```python
from pathlib import Path

for line in Path("auth.log").read_text().splitlines():
    if "result=failed" in line:
        print(line)
```

## Contar Eventos

```python
from pathlib import Path

count = 0

for line in Path("auth.log").read_text().splitlines():
    if "result=failed" in line:
        count += 1

print(f"Fallos: {count}")
```

## JSON

JSON es comun en APIs y logs modernos.

Ejemplo:

```json
{
  "user": "admin",
  "src_ip": "203.0.113.10",
  "result": "failed"
}
```

Leer JSON:

```python
import json
from pathlib import Path

data = json.loads(Path("evento.json").read_text())
print(data["user"])
```

## CSV

CSV es comun en inventarios y reportes.

Ejemplo:

```csv
hostname,owner,criticality
web01,team-web,high
db01,team-data,critical
test01,,low
```

Leer CSV:

```python
import csv
from pathlib import Path

with Path("assets.csv").open() as f:
    reader = csv.DictReader(f)
    for row in reader:
        print(row["hostname"], row["owner"])
```

## APIs

Una API permite consultar o enviar datos entre sistemas.

Ejemplo con `requests`:

```python
import requests

response = requests.get("https://api.github.com")
print(response.status_code)
print(response.json())
```

Nota: evita poner tokens directamente en codigo.

## Reporte Markdown

```python
from pathlib import Path

reporte = """# Reporte

## Resultado

Se encontraron 3 eventos fallidos.
"""

Path("reporte.md").write_text(reporte)
```

## Practica

Crea un script que:

- Lea un CSV de activos.
- Detecte filas sin owner.
- Genere un reporte Markdown.

Campos sugeridos:

```csv
hostname,owner,criticality
web01,team-web,high
test01,,low
db01,team-data,critical
```

## Criterio de Dominio

Puedes avanzar cuando puedas:

- Leer logs.
- Contar eventos.
- Leer JSON.
- Leer CSV.
- Consultar una API simple.
- Generar reporte Markdown.
