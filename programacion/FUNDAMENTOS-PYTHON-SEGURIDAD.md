# Python para Ciberseguridad

## Objetivo

Usar Python para automatizar tareas simples de seguridad.

Python no te hace buen analista por si solo. Te vuelve mas eficiente si lo usas para repetir menos trabajo manual, procesar evidencia, validar datos y generar reportes reproducibles.

## Mapa Mental

```text
entrada -> validacion -> procesamiento -> resumen -> reporte -> evidencia
```

Antes de escribir codigo pregunta:

- que dato entra;
- que formato tiene;
- que errores pueden ocurrir;
- que resultado necesito;
- como voy a documentarlo;
- que no debo exponer.

## Casos de Uso

- Leer logs.
- Contar eventos.
- Calcular hashes.
- Leer JSON y CSV.
- Consultar APIs.
- Generar reportes.

## Buenas Practicas

- No pongas secretos en el codigo.
- Maneja errores esperados.
- No modifiques evidencia original.
- Escribe salidas claras.
- Usa nombres entendibles.
- Documenta como ejecutar el script.
- Valida datos antes de confiar en ellos.
- Guarda reportes en formatos simples como Markdown o CSV.

## Conceptos Base

- Variables.
- Listas.
- Diccionarios.
- Condiciones.
- Loops.
- Funciones.
- Manejo de archivos.
- Manejo de errores.

## Estructura de Script Util

```text
1. Leer argumentos.
2. Validar entradas.
3. Procesar datos.
4. Generar resumen.
5. Escribir reporte.
6. Devolver codigo de salida claro.
```

## Mini Script: Leer un Archivo

```python
from pathlib import Path

path = Path("ejemplo.log")

for line in path.read_text().splitlines():
    if "failed" in line.lower():
        print(line)
```

## Mini Script: Argumentos

```python
import argparse
from pathlib import Path

parser = argparse.ArgumentParser(description="Cuenta eventos en un log")
parser.add_argument("logfile", help="Ruta del archivo de log")
parser.add_argument("--word", default="failed", help="Palabra a buscar")
args = parser.parse_args()

path = Path(args.logfile)

if not path.exists():
    raise SystemExit(f"No existe el archivo: {path}")

count = 0
for line in path.read_text().splitlines():
    if args.word.lower() in line.lower():
        count += 1

print(f"Coincidencias: {count}")
```

## Mini Script: Hash SHA256

```python
from hashlib import sha256
from pathlib import Path

path = Path("archivo.txt")
digest = sha256(path.read_bytes()).hexdigest()
print(digest)
```

## Mini Script: Reporte Markdown

```python
from pathlib import Path

total = 12
fallos = 5

report = f"""# Resumen de Log

## Resultado

- Total de eventos: {total}
- Fallos: {fallos}
"""

Path("reporte.md").write_text(report)
```

## Manejo de Errores

Errores esperados:

- archivo no existe;
- permisos insuficientes;
- formato incorrecto;
- campo faltante;
- API no responde;
- JSON invalido.

No ignores errores. Conviertelos en mensajes utiles.

## Seguridad al Programar

Evita:

- imprimir tokens;
- subir archivos sensibles;
- ejecutar comandos con input no validado;
- sobrescribir evidencia;
- mezclar datos reales con pruebas;
- guardar passwords en scripts.

## Practica Guiada

Un script de ejemplo puede:

- Lea un archivo de texto.
- Cuente lineas.
- Busque una palabra.
- Genere un resumen.

Despues mejoralo para:

- Aceptar el nombre del archivo como argumento.
- Manejar errores si el archivo no existe.
- Guardar resultado en Markdown.

## Mini Laboratorio: Parser de Log

Crea `log_summary.py` que lea:

```text
2026-06-23 user=admin src_ip=203.0.113.10 result=failed
2026-06-23 user=admin src_ip=203.0.113.10 result=success
```

Debe generar:

- total de lineas;
- total de `failed`;
- total de `success`;
- usuarios vistos;
- IPs vistas;
- reporte Markdown.

## Ejemplo de resultado

`reporte-parser-log.md` con:

1. objetivo;
2. comando usado;
3. salida;
4. errores encontrados;
5. explicacion del codigo;
6. mejora futura.

## Errores Comunes

- Escribir scripts que solo funcionan en tu maquina.
- No manejar archivos inexistentes.
- No documentar uso.
- No validar formato.
- Mezclar credenciales con codigo.
- No explicar resultados.

## Criterio de Dominio

Puedes avanzar cuando puedas:

- Leer archivos.
- Usar diccionarios.
- Contar eventos.
- Manejar errores simples.
- Explicar tu script linea por linea.
- Generar un reporte reproducible sin exponer secretos.
