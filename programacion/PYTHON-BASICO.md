# Python Básico para Seguridad

## Objetivo

Aprender Python suficiente para automatizar tareas de ciberseguridad: leer archivos, analizar logs, calcular hashes, consumir APIs y comunicar resultados.

Para seguridad no necesitas empezar con programación avanzada. Lo primero es entender tipos de datos, control de flujo, lectura de archivos y manejo de errores. Con eso ya puedes razonar sobre logs, inventarios, respuestas de API y pequeñas transformaciones de datos.

La prioridad es escribir código claro. Un script confuso puede producir una conclusión equivocada y hacer que un analista persiga ruido. Siempre importa saber que entra, que se procesa, que se ignora y que límite tiene el resultado.

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

## Ejemplo de Archivo

Un archivo de ejemplo, `ejemplo.log`, puede contener:

```text
login failed user=admin ip=203.0.113.10
login success user=maria ip=10.0.0.5
login failed user=root ip=203.0.113.10
```

Un script de ejemplo puede:

- Leer el archivo.
- Imprimir solo lineas con `failed`.
- Contar cuantas fallas hay.

## Lectura de Datos de Seguridad

Muchos datos de seguridad vienen como texto, JSON o CSV. Antes de procesarlos conviene identificar campos como usuario, IP, hora, acción, resultado y sistema origen. Si falta un campo importante, el análisis debe reconocer esa limitacion.

No todo lo que coincide con una palabra es malicioso. Por ejemplo, `failed` puede indicar ataque, error de usuario, prueba interna o servicio mal configurado. Python ayuda a contar y filtrar, pero la interpretacion sigue siendo responsabilidad del analista.

## Errores Comunes

- No manejar archivos inexistentes.
- Asumir que todas las lineas tienen el mismo formato.
- Imprimir secretos o datos personales sin necesidad.
- Mezclar datos reales con ejemplos públicos.
- Confundir conteo alto con incidente confirmado.
- No explicar limitaciones del análisis.

## Criterio de Dominio

Puedes avanzar cuando puedas:

- Usar listas.
- Usar diccionarios.
- Leer archivos.
- Usar condiciones.
- Crear funciones.
- Manejar error de archivo inexistente.
