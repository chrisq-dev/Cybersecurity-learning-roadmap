# Seguridad en Contenedores

## Objetivo

Entender que es un contenedor y que riesgos de seguridad existen.

## Que es un Contenedor

Un contenedor empaqueta una aplicacion con sus dependencias y la ejecuta de forma aislada.

No es una maquina virtual completa. Comparte el kernel del host.

## Imagen vs Contenedor

- Imagen: plantilla.
- Contenedor: instancia en ejecucion.

## Dockerfile

Archivo que define como construir una imagen.

Riesgos comunes:

- Usar imagen base vulnerable.
- Ejecutar como root.
- Copiar secretos.
- Instalar paquetes innecesarios.
- No fijar versiones.

## Buenas Practicas

- Usar imagenes oficiales o confiables.
- Mantener imagenes actualizadas.
- Ejecutar como usuario no root.
- No incluir secretos en imagen.
- Reducir paquetes.
- Escanear imagenes.
- Firmar/verificar imagenes cuando aplique.

## Secrets

No guardar secretos en:

- Dockerfile.
- Codigo.
- Variables comprometidas.
- Imagenes.

Usar gestores de secretos o mecanismos del orquestador.

## Logs

Los contenedores deben enviar logs a salida estandar o a una plataforma de logs.

## Ejemplo de Revision

Este Dockerfile muestra decisiones que deben revisarse:

```dockerfile
FROM ubuntu:latest
COPY . /app
WORKDIR /app
RUN apt update && apt install -y python3
CMD ["python3", "app.py"]
```

Preguntas:

- Que riesgos ves?
- Que mejorarias?
- Ejecuta como root?
- La imagen base es especifica?

## Criterio de Dominio

Puedes avanzar cuando puedas:

- Diferenciar imagen y contenedor.
- Explicar riesgo de root.
- Explicar por que no guardar secretos.
- Nombrar controles de imagen.
