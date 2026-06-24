# Logs, JSON, CSV y APIs

## Objetivo

Trabajar con formatos comunes en seguridad. Muchos datos vienen como logs de texto, JSON de APIs o CSV de inventarios.

Un analista que sabe transformar datos trabaja mejor: convierte logs sueltos en evidencia, inventarios en prioridades y respuestas de APIs en reportes.

## Mapa Mental

```text
log/json/csv/api -> parseo -> normalizacion -> conteo -> hallazgo -> reporte
```

La clave es no perder contexto: usuario, host, IP, hora, accion y resultado.

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

## Parseo Simple de Campos

Para logs tipo `key=value`:

```python
def parse_line(line):
    event = {}
    for part in line.split():
        if "=" in part:
            key, value = part.split("=", 1)
            event[key] = value
    return event

event = parse_line("user=admin src_ip=203.0.113.10 result=failed")
print(event["user"])
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

## Agrupar Eventos

```python
from collections import Counter

users = Counter()

for line in Path("auth.log").read_text().splitlines():
    event = parse_line(line)
    if event.get("result") == "failed":
        users[event.get("user", "unknown")] += 1

print(users)
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

Buenas practicas:

- usa `.get()` si un campo puede faltar;
- valida tipos;
- captura errores de JSON invalido;
- no asumas que todas las APIs responden igual.

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

Preguntas utiles:

- que filas no tienen owner;
- que activos son criticos;
- que activos estan expuestos;
- que campos faltan;
- que datos no deberian estar en CSV sin proteccion.

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

## Tokens y Variables de Entorno

Ejemplo conceptual:

```python
import os

token = os.environ.get("API_TOKEN")

if not token:
    raise SystemExit("Falta API_TOKEN")
```

Nunca pegues tokens en el repositorio.

## Manejo de Respuestas

Revisa:

- status code;
- timeout;
- errores;
- paginacion;
- limites de rate;
- campos faltantes.

Ejemplo:

```python
import requests

response = requests.get("https://api.github.com", timeout=10)

if response.status_code != 200:
    raise SystemExit(f"Error API: {response.status_code}")
```

## Reporte Markdown

```python
from pathlib import Path

reporte = """# Reporte

## Resultado

Se encontraron 3 eventos fallidos.
"""

Path("reporte.md").write_text(reporte)
```

## Practica Guiada

Un script de ejemplo puede:

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

## Mini Laboratorio: Inventario a Reporte

Entrada:

```csv
hostname,owner,criticality,exposure
web01,team-web,high,internet
test01,,low,internal
db01,team-data,critical,internal
vpn01,infra,critical,internet
```

Salida esperada:

- total de activos;
- activos sin owner;
- activos criticos;
- activos expuestos a internet;
- recomendaciones.

## Ejemplo de resultado

`reporte-inventario.md` con:

1. resumen;
2. tabla de hallazgos;
3. riesgos;
4. recomendaciones;
5. limitaciones del script.

## Errores Comunes

- Asumir que todos los campos existen.
- No manejar CSV mal formado.
- No usar timeout en APIs.
- Guardar tokens en codigo.
- No documentar version o fuente de datos.

## Criterio de Dominio

Puedes avanzar cuando puedas:

- Leer logs.
- Contar eventos.
- Leer JSON.
- Leer CSV.
- Consultar una API simple.
- Generar reporte Markdown.
- Manejar errores de formato, API y campos faltantes.
