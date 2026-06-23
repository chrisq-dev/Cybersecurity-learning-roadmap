# Cheatsheet Python para Seguridad

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

## Contador

```python
from collections import Counter

counter = Counter()
counter["admin"] += 1
```

## CSV

```python
import csv

with open("assets.csv") as f:
    reader = csv.DictReader(f)
    for row in reader:
        print(row["hostname"])
```

## JSON

```python
import json

data = json.loads('{"user": "admin"}')
print(data["user"])
```

## SHA256

```python
from hashlib import sha256
from pathlib import Path

digest = sha256(Path("archivo.txt").read_bytes()).hexdigest()
print(digest)
```
