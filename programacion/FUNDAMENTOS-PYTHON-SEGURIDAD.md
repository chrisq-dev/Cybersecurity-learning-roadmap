# Python para Ciberseguridad

## Objetivo

Usar Python para automatizar tareas simples de seguridad.

Python no te hace buen analista por si solo. Te vuelve más eficiente si lo usas para repetir menos trabajo manual, procesar evidencia, validar datos y comunicar resultados reproducibles.

## Mapa Mental

```text
entrada -> validación -> procesamiento -> resumen -> conclusión -> límites
```

Antes de escribir código pregunta:

- Que dato entra;
- Que formato tiene;
- Que errores pueden ocurrir;
- Que resultado necesito;
- Como voy a documentarlo;
- Que no debo exponer.

## Casos de Uso

- Leer logs.
- Contar eventos.
- Calcular hashes.
- Leer JSON y CSV.
- Consultar APIs.
- Comunicar resultados.

## Buenas Prácticas

- No pongas secretos en el código.
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

## Estructura de Script Útil

```text
1. Leer argumentos.
2. Validar entradas.
3. Procesar datos.
4. Generar resumen.
5. Escribir salida clara.
6. Devolver código de salida claro.
```

## Ejemplo: Leer un Archivo

```python
from pathlib import Path

path = Path("ejemplo.log")

for line in path.read_text().splitlines():
    if "failed" in line.lower():
        print(line)
```

## Ejemplo: Argumentos

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

## Ejemplo: Hash SHA256

```python
from hashlib import sha256
from pathlib import Path

path = Path("archivo.txt")
digest = sha256(path.read_bytes()).hexdigest()
print(digest)
```

## Ejemplo de Salida Legible

```python
from pathlib import Path

total = 12
fallos = 5

report = f"""# Resumen de Log

## Resultado

- Total de eventos: {total}
- Fallos: {fallos}
"""

Path("resumen.txt").write_text(report)
```

## Manejo de Errores

Errores esperados:

- Archivo no existe;
- Permisos insuficientes;
- Formato incorrecto;
- Campo faltante;
- API no responde;
- JSON invalido.

No ignores errores. Conviertelos en mensajes útiles.

## Seguridad al Programar

Evita:

- Imprimir tokens;
- Subir archivos sensibles;
- Ejecutar comandos con input no validado;
- Sobrescribir evidencia;
- Mezclar datos reales con pruebas;
- Guardar passwords en scripts.

## Ejemplo de Automatización

Un script de ejemplo puede:

- Leer un archivo de texto.
- Contar lineas.
- Buscar una palabra.
- Generar un resumen.

Para hacerlo más robusto conviene considerar:

- Aceptar el nombre del archivo como argumento.
- Manejar errores si el archivo no existe.
- Guardar resultado en un formato legible.

## Ejemplo de Parser de Log

Un parser de log puede leer eventos como estos:

```text
2026-06-23 user=admin src_ip=203.0.113.10 result=failed
2026-06-23 user=admin src_ip=203.0.113.10 result=success
```

El resultado esperado debería resumir:

- Total de lineas;
- Total de `failed`;
- Total de `success`;
- Usuarios vistos;
- IPs vistas;
- Resumen legible.

## Ejemplo de resultado

Un resumen de parser de logs debe explicar:

1. Objetivo;
2. Comando usado;
3. Salida;
4. Errores encontrados;
5. Explicación del código;
6. Mejora futura.

## Errores Comunes

- Escribir scripts que solo funcionan en tu máquina.
- No manejar archivos inexistentes.
- No documentar uso.
- No validar formato.
- Mezclar credenciales con código.
- No explicar resultados.

## Criterio de Dominio

Puedes avanzar cuando puedas:

- Leer archivos.
- Usar diccionarios.
- Contar eventos.
- Manejar errores simples.
- Explicar tu script linea por linea.
- Generar un reporte reproducible sin exponer secretos.
