# File Upload Vulnerabilities

## Objetivo

Entender riesgos de carga de archivos y como reducirlos.

## Que es

Una vulnerabilidad de file upload ocurre cuando una aplicacion acepta archivos sin controles adecuados.

## Riesgos

- Subir archivos ejecutables.
- Sobrescribir archivos.
- Subir malware.
- Almacenar contenido peligroso.
- Exponer datos.
- Denegacion de servicio por archivos enormes.

## Controles

- Validar tipo real de archivo.
- Limitar extensiones.
- Limitar tamaño.
- Renombrar archivos.
- Guardar fuera del webroot.
- Servir archivos desde dominio separado.
- Escanear malware cuando aplique.
- Restringir permisos.
- No confiar solo en `Content-Type`.

## Error Comun

Validar solo extension:

```text
foto.jpg
```

El nombre no prueba que el contenido sea imagen.

## Preguntas de Analisis

- Donde se guarda el archivo?
- Puede ejecutarse?
- Quien puede descargarlo?
- Hay limite de tamaño?
- Se valida contenido?
- Se renombra?
- Hay logs?

## Practica Conceptual

Diseña una funcion segura de upload para imagenes de perfil:

- Extensiones permitidas.
- Tamaño maximo.
- Validacion de contenido.
- Nombre generado por servidor.
- Ubicacion de almacenamiento.
- Permisos.

## Criterio de Dominio

Puedes avanzar cuando puedas:

- Explicar riesgos de upload.
- Explicar por que extension no basta.
- Proponer controles.
- Entender almacenamiento fuera de webroot.
