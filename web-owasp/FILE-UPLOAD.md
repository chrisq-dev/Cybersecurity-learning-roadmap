# File Upload Vulnerabilities

## Objetivo

Entender riesgos de carga de archivos y como reducirlos.

Subir archivos parece una funcion simple, pero combina datos no confiables, almacenamiento, permisos, procesamiento y descarga posterior. Cada paso debe tener controles.

## Mapa Mental

```text
archivo -> validacion -> renombrado -> almacenamiento -> procesamiento -> descarga -> monitoreo
```

La pregunta clave:

```text
Que podria pasar si el archivo no es lo que dice ser?
```

## Que es

Una vulnerabilidad de file upload ocurre cuando una aplicacion acepta archivos sin controles adecuados.

## Riesgos

- Subir archivos ejecutables.
- Sobrescribir archivos.
- Subir malware.
- Almacenar contenido peligroso.
- Exponer datos.
- Denegacion de servicio por archivos enormes.

## Superficie de Riesgo

- Nombre del archivo.
- Extension.
- Tipo MIME.
- Contenido real.
- Tamaño.
- Metadatos.
- Ubicacion de almacenamiento.
- Permisos.
- Procesamiento posterior.
- Descarga por otros usuarios.

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

## Validacion Correcta

Combina controles:

- allowlist de extensiones;
- validacion de magic bytes cuando aplique;
- limite de tamaño;
- limite de dimensiones en imagenes;
- renombrado con ID generado por servidor;
- almacenamiento fuera del webroot;
- antivirus/sandbox si el riesgo lo justifica;
- permisos minimos;
- procesamiento seguro.

## Almacenamiento

Preferible:

```text
usuario sube -> app valida -> storage privado -> descarga controlada por backend
```

Evita:

```text
usuario sube -> archivo queda ejecutable en ruta publica
```

## Error Comun

Validar solo extension:

```text
foto.jpg
```

El nombre no prueba que el contenido sea imagen.

Otros errores:

- confiar en `Content-Type`;
- conservar nombre original;
- permitir doble extension;
- servir desde mismo dominio con cookies;
- no limitar tamaño;
- procesar archivos con librerias vulnerables;
- no controlar quien descarga.

## Preguntas de Analisis

- Donde se guarda el archivo?
- Puede ejecutarse?
- Quien puede descargarlo?
- Hay limite de tamaño?
- Se valida contenido?
- Se renombra?
- Hay logs?

## Logs Importantes

- usuario que sube;
- nombre original;
- nombre interno;
- tamaño;
- tipo detectado;
- resultado de validacion;
- razon de rechazo;
- IP;
- hash;
- descargas sensibles.

## Practica Conceptual Guiada

Diseña una funcion segura de upload para imagenes de perfil:

- Extensiones permitidas.
- Tamaño maximo.
- Validacion de contenido.
- Nombre generado por servidor.
- Ubicacion de almacenamiento.
- Permisos.

Agrega:

- flujo de rechazo;
- logs;
- quien puede ver la imagen;
- que pasa si se detecta malware;
- como borrarias archivos antiguos.

## Mini Laboratorio Defensivo

Crea `diseno-upload-seguro.md`:

1. Caso de uso.
2. Tipos permitidos.
3. Validaciones.
4. Almacenamiento.
5. Permisos.
6. Logs.
7. Manejo de errores.
8. Riesgos residuales.

## Checklist

- [ ] Allowlist de tipos.
- [ ] Tamaño maximo.
- [ ] Nombre generado por servidor.
- [ ] Storage no ejecutable.
- [ ] Permisos minimos.
- [ ] Descarga autorizada.
- [ ] Escaneo si aplica.
- [ ] Logs suficientes.

## Criterio de Dominio

Puedes avanzar cuando puedas:

- Explicar riesgos de upload.
- Explicar por que extension no basta.
- Proponer controles.
- Entender almacenamiento fuera de webroot.
- Diseñar un flujo completo de carga segura.
