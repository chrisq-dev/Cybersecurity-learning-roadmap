# Labs Guiados de Fundamentos

Estos laboratorios son para practicar sin tocar sistemas de terceros.

## Como Leer Estos Labs

Cada lab muestra una forma de convertir comandos y observaciones en explicaciones utiles. No basta con ejecutar comandos; lo importante es entender que demuestra cada salida.

Una buena nota de estudio puede contener:

- objetivo;
- comandos o pasos;
- salida relevante;
- explicacion con tus palabras;
- errores encontrados;
- conclusion;
- dudas pendientes.

Si quieres guardar notas personales, usa un nombre claro para encontrarlas despues:

```text
tema-fecha-notas
```

## Reglas

- No escanees redes ajenas.
- No pruebes sistemas de terceros.
- Usa dominios de ejemplo, tu equipo local o laboratorios autorizados.
- Si un comando falla, documenta el error; tambien es aprendizaje.

## Lab 1: Flujo Web Basico

### Objetivo

Entender que ocurre al visitar una pagina web.

### Herramientas

- Terminal.
- `curl`.
- `dig` o `nslookup`.
- navegador con DevTools.

### Pasos

1. Resolver DNS:

```bash
dig example.com
```

2. Consultar headers:

```bash
curl -I https://example.com
```

3. Ver detalle de conexion:

```bash
curl -v https://example.com
```

4. Abrir DevTools y revisar pestaña Network.

### Preguntas

- Que IP resolvio el dominio?
- Que codigo HTTP recibiste?
- Que headers aparecen?
- Se usa HTTPS?
- Que parte corresponde a DNS, TCP/TLS y HTTP?
- Que headers ayudan a entender el servidor?
- Que diferencia hay entre `curl -I` y `curl -v`?

### Ejemplo de resultado

Un ejemplo de reporte puede incluir:

- Comandos.
- Resultados.
- Explicacion.
- Dudas.
- Diagrama simple del flujo.

### Criterio de Exito

- Explicas DNS, TCP/TLS y HTTP por separado.
- Identificas codigo de respuesta y headers.
- Puedes explicar que evidencia obtuvo cada comando.

## Lab 2: Subnetting Manual

### Objetivo

Practicar red, rango usable y broadcast.

### Ejemplos Para Razonar

Estos bloques sirven para practicar el calculo manual de mascara, rango usable, broadcast y cantidad de hosts:

```text
192.168.1.0/24
Mascara:
Primera usable:
Ultima usable:
Broadcast:
Hosts:
```

```text
192.168.1.0/26
Mascara:
Primera usable:
Ultima usable:
Broadcast:
Hosts:
```

```text
10.10.10.0/28
Mascara:
Primera usable:
Ultima usable:
Broadcast:
Hosts:
```

### Ejemplo de resultado

Explica como calculaste cada resultado.

### Criterio de Exito

- Identificas red, broadcast y rango usable.
- Explicas por que una IP pertenece o no pertenece a una subred.
- No dependes solo de calculadoras.

## Lab 3: Permisos Linux

### Objetivo

Entender `chmod`, permisos y lectura de `ls -l`.

### Pasos

```bash
mkdir permisos-lab
cd permisos-lab
touch publico.txt secreto.txt ejecutar.sh
chmod 644 publico.txt
chmod 600 secreto.txt
chmod 750 ejecutar.sh
ls -l
```

### Preguntas

- Quien puede leer cada archivo?
- Quien puede escribir?
- Quien puede ejecutar?
- Que archivo es mas sensible?

### Ejemplo de resultado

Tabla:

| Archivo | Permisos | Owner puede | Grupo puede | Otros pueden |
| --- | --- | --- | --- | --- |

### Observacion Adicional

Estos comandos muestran un archivo con permisos mas restrictivos:

```bash
echo "secreto" > secreto.txt
chmod 600 secreto.txt
ls -l secreto.txt
```

Explica por que un archivo sensible no deberia ser legible por todos.

### Criterio de Exito

- Interpretas `rwx`.
- Explicas owner, group y others.
- Justificas permisos para archivo publico, privado y ejecutable.

## Lab 4: Hash e Integridad

### Objetivo

Comprobar que un cambio pequeño altera el hash.

### Pasos

```bash
echo "hola" > archivo.txt
sha256sum archivo.txt
echo "hola!" > archivo.txt
sha256sum archivo.txt
```

### Preguntas

- Cambia el hash?
- Por que?
- Para que sirve esto en seguridad?

### Ejemplo de resultado

Explicacion de hashing vs cifrado.

### Extension

Ejemplo con dos archivos de contenido casi igual para comparar hashes:

```bash
echo "transferencia=100" > a.txt
echo "transferencia=101" > b.txt
sha256sum a.txt b.txt
```

### Criterio de Exito

- Explicas que hash no cifra.
- Explicas por que un cambio pequeño altera el resultado.
- Das un ejemplo de integridad en seguridad.

## Lab 5: Analisis de Logs Ficticios

### Objetivo

Practicar investigacion sin necesitar logs reales.

### Datos

```text
2026-06-23T10:00:01 host=linux01 user=admin src_ip=203.0.113.10 action=login result=failed
2026-06-23T10:00:05 host=linux01 user=admin src_ip=203.0.113.10 action=login result=failed
2026-06-23T10:00:09 host=linux01 user=admin src_ip=203.0.113.10 action=login result=failed
2026-06-23T10:02:30 host=linux01 user=admin src_ip=203.0.113.10 action=login result=success
```

### Preguntas

- Que evidencia existe?
- Que hipotesis tienes?
- Que buscarias despues?
- Que accion recomendarias?

### Ejemplo de resultado

Mini reporte de investigacion.

### Criterio de Exito

- Separas evidencia de hipotesis.
- Creas una linea de tiempo.
- Propones al menos una accion defensiva.
- Indicas que informacion falta.

## Lab 6: Inventario Basico de Activos

### Objetivo

Entender que no puedes proteger lo que no conoces.

### Datos

Una tabla informativa con activos ficticios puede verse asi:

| Activo | Owner | Criticidad | Exposicion | Datos | Control principal |
| --- | --- | --- | --- | --- | --- |
| laptop-personal | yo | media | privada | notas, llaves | cifrado, backups |
| app-web-demo | dev | alta | internet | usuarios | MFA, logs |
| db-demo | data | critica | interna | datos sensibles | acceso restringido |

### Preguntas

- Cual activo atenderias primero?
- Que activo tiene mas impacto?
- Que activo necesita mejores logs?
- Que control preventivo aplicarias?
- Que control detectivo aplicarias?

### Ejemplo de resultado

Una tabla con priorizacion y una conclusion breve sobre que activo atender primero.

## Lab 7: Mini Hardening Checklist

### Objetivo

Practicar pensamiento defensivo sobre un sistema Linux ficticio.

### Escenario

```text
Servidor Linux expuesto a internet.
SSH abierto.
Usuario admin con password.
No hay backups.
Logs locales.
Servicio web en puerto 80.
```

### Puntos a observar

1. Identifica riesgos.
2. Propone controles preventivos.
3. Propone controles detectivos.
4. Propone controles correctivos.
5. Define evidencia para verificar cada control.

### Ejemplo de resultado

Tabla:

| Riesgo | Impacto | Control | Tipo | Como verificar |
| --- | --- | --- | --- | --- |

## Rubrica Rapida

| Nivel | Evidencia |
| --- | --- |
| Basico | Ejecutaste comandos y pegaste salidas |
| Bueno | Explicaste resultados con tus palabras |
| Fuerte | Relacionaste resultados con riesgo y control |
| Portafolio | Reporte claro, reproducible y con conclusion |
