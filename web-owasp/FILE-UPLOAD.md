# File Upload Vulnerabilities

## Objetivo

Entender riesgos de carga de archivos y como reducirlos.

Subir archivos parece una función simple, pero combina datos no confiables, almacenamiento, permisos, procesamiento y descarga posterior. Cada paso debe tener controles.

## Mapa Mental

```text
archivo -> validación -> renombrado -> almacenamiento -> procesamiento -> descarga -> monitoreo
```

La pregunta clave:

```text
Qué podria pasar si el archivo no es lo qué dice ser?
```

## Qué es

Una vulnerabilidad de file upload ocurre cuando una aplicación acepta archivos sin controles adecuados.

## Riesgos

- Subir archivos ejecutables.
- Sobrescribir archivos.
- Subir malware.
- Almacenar contenido peligroso.
- Exponer datos.
- Denegación de servicio por archivos enormes.

## Superficie de Riesgo

- Nombre del archivo.
- Extension.
- Tipo MIME.
- Contenido real.
- Tamaño.
- Metadatos.
- Ubicación de almacenamiento.
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

## Validación Correcta

Combina controles:

- Allowlist de extensiones;
- Validación de magic bytes cuando aplique;
- Límite de tamaño;
- Límite de dimensiones en imágenes;
- Renombrado con ID generado por servidor;
- Almacenamiento fuera del webroot;
- Antivirus/sandbox si el riesgo lo justifica;
- Permisos mínimos;
- Procesamiento seguro.

## Almacenamiento

Preferible:

```text
usuario sube -> app valida -> storage privado -> descarga controlada por backend
```

Evita:

```text
usuario sube -> archivo queda ejecutable en ruta pública
```

## Error Común

Validar solo extension:

```text
foto.jpg
```

El nombre no prueba que el contenido sea imagen.

Otros errores:

- Confiar en `Content-Type`;
- Conservar nombre original;
- Permitir doble extension;
- Servir desde mismo dominio con cookies;
- No limitar tamaño;
- Procesar archivos con librerías vulnerables;
- No controlar quien descarga.

## Preguntas de Análisis

- Dónde se guarda el archivo?
- Puede ejecutarse?
- Quién puede descargarlo?
- Hay límite de tamaño?
- Se valida contenido?
- Se renombra?
- Hay logs?

## Logs Importantes

- Usuario que sube;
- Nombre original;
- Nombre interno;
- Tamaño;
- Tipo detectado;
- Resultado de validación;
- Razon de rechazo;
- IP;
- Hash;
- Descargas sensibles.

## Ejemplo de Upload Seguro

Una función segura de upload para imágenes de perfil debe considerar:

- Extensiones permitidas.
- Tamaño máximo.
- Validación de contenido.
- Nombre generado por servidor.
- Ubicación de almacenamiento.
- Permisos.

En una revisión informativa conviene considerar:

- Flujo de rechazo;
- Logs;
- Quien puede ver la imagen;
- Que pasa si se detecta malware;
- Como borrarias archivos antiguos.

## Criterios de Revisión

Un flujo de upload seguro debe explicar:

- Caso de uso real;
- Tipos permitidos;
- Validaciones;
- Almacenamiento;
- Permisos;
- Logs;
- Manejo de errores;
- Riesgos residuales.

## Controles Que Deben Entenderse

- Allowlist de tipos reduce archivos inesperados.
- Tamaño máximo reduce abuso de almacenamiento y DoS.
- Nombre generado por servidor evita abuso de rutas o nombres peligrosos.
- Storage no ejecutable reduce riesgo de ejecucion remota.
- Permisos mínimos reducen impacto si algo falla.
- Descarga autorizada evita fuga de archivos privados.
- Escaneo puede agregar defensa si el contexto lo justifica.
- Logs suficientes permiten investigar abuso sin exponer datos sensibles.

## Criterio de Dominio

Puedes avanzar cuando puedas:

- Explicar riesgos de upload.
- Explicar por que extension no basta.
- Proponer controles.
- Entender almacenamiento fuera de webroot.
- Diseñar un flujo completo de carga segura.
