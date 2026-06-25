---
title: "Parseo de Logs y APIs: El Analista de Datos"
tiempo_estimado: "3 min"
minutos_lectura: 3
secciones: 5
---
# Parseo de Logs y APIs: El Analista de Datos

## Objetivo del Módulo

Aprender la habilidad número uno de un analista de seguridad defensiva (Blue Team): Leer, filtrar y entender archivos de texto gigantescos de forma automática.

Un Firewall de nivel empresarial no genera "un par" de alertas al día. Genera **20 millones de líneas de texto diarias** anotando cada paquete de red que entró o salió. Nadie en el mundo lee eso con sus propios ojos. Tu trabajo es escribir un script en Python que lea el archivo, separe la basura de la evidencia real, y te entregue un reporte de 5 líneas con las Direcciones IP de los verdaderos atacantes. A esto se le llama **Parseo (Parsing)**.

---

## 1. Archivos CSV: La Hoja de Excel Fea

Un archivo CSV (Comma-Separated Values) es simplemente una tabla de Excel, pero guardada como texto puro donde las columnas están separadas por comas. Es el formato favorito de los firewalls antiguos para exportar sus bitácoras.

**Ejemplo de log.csv:**
```text
Fecha,Hora,IP_Origen,Puerto_Destino,Accion
2024-10-12,14:30:21,192.168.1.5,443,Permitido
2024-10-12,14:30:22,8.8.8.8,22,Denegado
2024-10-12,14:30:23,45.2.1.9,22,Denegado
```

### Parseando el CSV con Python
Si quieres saber todas las IPs que fueron "Denegadas", no abres Excel. Usas Python:

```python
import csv # Librería oficial de Python para leer CSVs

# Abrimos el archivo
with open('log.csv', mode='r') as archivo:
    lector = csv.DictReader(archivo)
    
    print("Las siguientes IPs fueron bloqueadas por intentar entrar:")
    for fila in lector: # Un Bucle FOR para leer fila por fila
        if fila['Accion'] == "Denegado":
            print(fila['IP_Origen']) 
```
**Resultado en pantalla:**
`8.8.8.8`
`45.2.1.9`

En menos de 5 líneas de código, Python acaba de hacer el trabajo que a un humano le tomaría tres horas si el archivo tuviera 100,000 líneas.

---

## 2. JSON: El Idioma Universal de Internet

CSV es viejo. Hoy en día, casi todos los sistemas modernos (AWS, Azure, APIs web) se comunican enviándose archivos en formato **JSON** (JavaScript Object Notation). 

JSON parece un diccionario de la vida real. Tiene una "Llave" (La palabra) y un "Valor" (La definición).

**Ejemplo de un log de AWS en JSON:**
```json
{
  "usuario": "juan.perez",
  "ip_conexion": "187.20.10.5",
  "exito": false,
  "razon": "Contrasena incorrecta"
}
```

En Python, trabajar con JSON es un sueño porque se convierte automáticamente en un **Diccionario** (Otra "caja" de almacenamiento, como las Listas). Si quieres saber la IP del atacante, simplemente le preguntas al diccionario por su llave: `print(log["ip_conexion"])`.

---

## 3. APIs: Hablando con otros Robots (VirusTotal)

Una **API (Application Programming Interface)** es un enchufe o un puerto de servicio. Es la forma en que un robot (tu script de Python) le habla a otro robot en internet sin necesidad de interfaces gráficas.

### El Caso Práctico: Threat Intelligence
Usando el script de la sección 1, acabas de aislar 500 IPs que fueron "Denegadas" por tu Firewall hoy. El problema es que no sabes si son simples errores de empleados, o si son hackers rusos reales.

La solución es preguntarle a la base de datos de malware más grande del mundo: **VirusTotal**. Pero no vas a entrar a la página web 500 veces. Vas a usar su API y tu librería `requests`.

```python
import requests

# Supongamos que esta IP salió de nuestro archivo CSV
ip_sospechosa = "45.2.1.9"

# La URL mágica de la API de VirusTotal para revisar IPs
url_api = "https://www.virustotal.com/api/v3/ip_addresses/" + ip_sospechosa

# Nuestra contraseña de acceso (API Key) para que VirusTotal nos deje pasar
headers = {
    "x-apikey": "tu_codigo_secreto_aqui12345"
}

# Hacemos la pregunta a internet (usando requests)
respuesta = requests.get(url_api, headers=headers)

# VirusTotal siempre responde en formato JSON (El idioma universal).
# Así que usamos .json() para leerlo
datos = respuesta.json()

# Parseamos la respuesta para ver cuántos antivirus mundiales marcaron esta IP como "Maliciosa"
votos_maliciosos = datos['data']['attributes']['last_analysis_stats']['malicious']

print("Esta IP fue marcada como virus por " + str(votos_maliciosos) + " empresas de seguridad.")
```

> **El Ángulo de Ciberseguridad (SOAR):**
> Lo que acabas de ver arriba es el principio de lo que en el mundo corporativo se llama **SOAR (Security Orchestration, Automation, and Response)**. Las empresas de un billón de dólares no usan analistas humanos para revisar IPs; conectan Firewalls, Python y APIs (como la de VirusTotal o CrowdStrike) para que los sistemas se defiendan, bloqueen atacantes y se manden reportes entre ellos de forma 100% automatizada.

---

## 4. Criterio de Dominio (Autoevaluación)

Revisa si tu mente ya piensa como un Analista de Datos de Seguridad:

1. ¿Cuál es la diferencia visual y de estructura básica entre un archivo CSV (viejo) y un archivo JSON (moderno)?
2. En el script de VirusTotal, ¿para qué sirve la variable secreta llamada `API Key` y qué pasaría si no la enviaras en la petición web?
3. Tienes un archivo JSON gigante de un servidor web. El archivo contiene un diccionario con la llave `"user_agent"` que guarda qué navegador usó el usuario (Ej. Chrome, Firefox). Estás buscando un atacante que usó una herramienta hacker llamada "Nmap". ¿Cómo usarías un bucle `for` y una condicional `if` mentalmente para cazarlo?
4. ¿Por qué es infinitamente más valioso para un analista *Junior* de ciberseguridad aprender a parsear JSONs y CSVs que aprender a desarrollar videojuegos en C++?
