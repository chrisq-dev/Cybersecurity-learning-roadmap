# Labs Guiados de Fundamentos

Estos laboratorios son para practicar sin tocar sistemas de terceros.

## Cómo Leer Estos Labs

Cada lab muestra una forma de convertir comandos y observaciones en explicaciones útiles. No basta con ejecutar comandos; lo importante es entender que demuestra cada salida.

Una buena nota de estudio puede contener:

- Objetivo;
- Comandos o pasos;
- Salida relevante;
- Explicación con tus palabras;
- Errores encontrados;
- Conclusión;
- Dudas pendientes.

Si quieres guardar notas personales, usa un nombre claro para encontrarlas después:

```text
tema-fecha-notas
```

## Reglas

- No escanees redes ajenas.
- No pruebes sistemas de terceros.
- Usa dominios de ejemplo, tu equipo local o laboratorios autorizados.
- Si un comando falla, documenta el error; también es aprendizaje.

## Lab 1: Flujo Web Básico

### Objetivo

Entender que ocurre al visitar una página web.

### Herramientas

- Terminal.
- `curl`.
- `dig` o `nslookup`.
- Navegador con DevTools.

### Pasos

1. Resolver DNS:

```bash
dig example.com
```

2. Consultar headers:

```bash
curl -I https://example.com
```

3. Ver detalle de conexión:

```bash
curl -v https://example.com
```

4. Abrir DevTools y revisar pestaña Network.

### Preguntas

- Qué IP resolvio el dominio?
- Qué código HTTP recibiste?
- Qué headers aparecen?
- Se usa HTTPS?
- Qué parte corresponde a DNS, TCP/TLS y HTTP?
- Qué headers ayudan a entender el servidor?
- Que diferencia hay entre `curl -I` y `curl -v`?

### Ejemplo de resultado

Un ejemplo de reporte puede incluir:

- Comandos.
- Resultados.
- Explicación.
- Dudas.
- Diagrama simple del flujo.

### Criterio de Éxito

- Explicas DNS, TCP/TLS y HTTP por separado.
- Identificas código de respuesta y headers.
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

### Criterio de Éxito

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

- Quién puede leer cada archivo?
- Quién puede escribir?
- Quién puede ejecutar?
- Qué archivo es más sensible?

### Ejemplo de resultado

Tabla:

| Archivo | Permisos | Owner puede | Grupo puede | Otros pueden |
| --- | --- | --- | --- | --- |

### Observación Adicional

Estos comandos muestran un archivo con permisos más restrictivos:

```bash
echo "secreto" > secreto.txt
chmod 600 secreto.txt
ls -l secreto.txt
```

Explica por que un archivo sensible no debería ser legible por todos.

### Criterio de Éxito

- Interpretas `rwx`.
- Explicas owner, group y others.
- Justificas permisos para archivo público, privado y ejecutable.

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
- Por qué?
- Para qué sirve esto en seguridad?

### Ejemplo de resultado

Explicación de hashing vs cifrado.

### Extension

Ejemplo con dos archivos de contenido casi igual para comparar hashes:

```bash
echo "transferencia=100" > a.txt
echo "transferencia=101" > b.txt
sha256sum a.txt b.txt
```

### Criterio de Éxito

- Explicas que hash no cifra.
- Explicas por que un cambio pequeño altera el resultado.
- Das un ejemplo de integridad en seguridad.

## Lab 5: Análisis de Logs Ficticios

### Objetivo

Practicar investigación sin necesitar logs reales.

### Datos

```text
2026-06-23T10:00:01 host=linux01 user=admin src_ip=203.0.113.10 action=login result=failed
2026-06-23T10:00:05 host=linux01 user=admin src_ip=203.0.113.10 action=login result=failed
2026-06-23T10:00:09 host=linux01 user=admin src_ip=203.0.113.10 action=login result=failed
2026-06-23T10:02:30 host=linux01 user=admin src_ip=203.0.113.10 action=login result=success
```

### Preguntas

- Qué evidencia existe?
- Qué hipótesis tienes?
- Qué buscarias después?
- Qué acción recomendarias?

### Ejemplo de resultado

Mini reporte de investigación.

### Criterio de Éxito

- Separas evidencia de hipótesis.
- Creas una linea de tiempo.
- Propones al menos una acción defensiva.
- Indicas que información falta.

## Lab 6: Inventario Básico de Activos

### Objetivo

Entender que no puedes proteger lo que no conoces.

### Datos

Una tabla informativa con activos ficticios puede verse asi:

| Activo | Owner | Criticidad | Exposición | Datos | Control principal |
| --- | --- | --- | --- | --- | --- |
| laptop-personal | yo | media | privada | notas, llaves | cifrado, backups |
| app-web-demo | dev | alta | internet | usuarios | MFA, logs |
| db-demo | data | crítica | interna | datos sensibles | acceso restringido |

### Preguntas

- Cuál activo atenderias primero?
- Qué activo tiene más impacto?
- Qué activo necesita mejores logs?
- Qué control preventivo aplicarias?
- Qué control detectivo aplicarias?

### Ejemplo de resultado

Una tabla con priorización y una conclusión breve sobre que activo atender primero.

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

## Rúbrica Rapida

| Nivel | Evidencia |
| --- | --- |
| Básico | Ejecutaste comandos y pegaste salidas |
| Bueno | Explicaste resultados con tus palabras |
| Fuerte | Relacionaste resultados con riesgo y control |
| Portafolio | Reporte claro, reproducible y con conclusión |
