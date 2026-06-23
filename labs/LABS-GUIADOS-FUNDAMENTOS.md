# Labs Guiados de Fundamentos

Estos laboratorios son para practicar sin tocar sistemas de terceros.

## Lab 1: Flujo Web Basico

### Objetivo

Entender que ocurre al visitar una pagina web.

### Herramientas

- Terminal.
- `curl`.
- `dig` o `nslookup`.

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

### Preguntas

- Que IP resolvio el dominio?
- Que codigo HTTP recibiste?
- Que headers aparecen?
- Se usa HTTPS?
- Que parte corresponde a DNS, TCP/TLS y HTTP?

### Entregable

Crea un reporte corto con:

- Comandos.
- Resultados.
- Explicacion.
- Dudas.

## Lab 2: Subnetting Manual

### Objetivo

Practicar red, rango usable y broadcast.

### Ejercicios

Completa:

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

### Entregable

Explica como calculaste cada resultado.

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

### Entregable

Tabla:

| Archivo | Permisos | Owner puede | Grupo puede | Otros pueden |
| --- | --- | --- | --- | --- |

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

### Entregable

Explicacion de hashing vs cifrado.

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

### Entregable

Mini reporte de investigacion.
