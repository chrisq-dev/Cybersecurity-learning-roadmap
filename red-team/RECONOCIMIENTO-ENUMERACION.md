# Reconocimiento y Enumeracion

## Objetivo

Entender como se recolecta informacion en un entorno autorizado. Esta fase busca conocer el sistema antes de hacer cualquier validacion de seguridad.

## Reconocimiento

Reconocimiento es recolectar informacion general.

En laboratorios puede incluir:

- Identificar IP del objetivo.
- Identificar dominio de prueba.
- Revisar tecnologia visible.
- Revisar documentacion del lab.

En entornos reales solo debe hacerse con permiso.

## Enumeracion

Enumeracion es obtener informacion mas detallada de servicios, usuarios, rutas, versiones o configuraciones.

Ejemplos en un lab:

- Que puertos estan abiertos.
- Que servicios responden.
- Que version aparente tiene un servicio.
- Que rutas web existen.
- Que banners aparecen.

## Preguntas Clave

- Que sistema estoy evaluando?
- Que servicios expone?
- Que versiones se observan?
- Que superficie de ataque existe?
- Que informacion es confiable y cual es suposicion?

## Herramientas Conceptuales

Herramientas comunmente usadas en laboratorios:

- `ping` para conectividad.
- `curl` para HTTP.
- `dig` para DNS.
- `ss` para revisar servicios locales.
- Wireshark para trafico.
- Escaneres de puertos solo en entornos autorizados.

## Banners

Un banner es informacion que un servicio puede mostrar.

Ejemplo:

```text
Server: nginx
```

Riesgo:

- Puede revelar tecnologia o version.

Mitigacion:

- Reducir banners innecesarios.
- Mantener servicios actualizados.

## Enumeracion Web Basica

En una aplicacion web autorizada:

- Revisar paginas visibles.
- Revisar headers.
- Revisar cookies.
- Revisar metodos HTTP.
- Revisar robots.txt si existe.
- Revisar errores.

## Practica Segura

Usa solo `example.com` o una app local propia para practicar HTTP:

```bash
curl -I https://example.com
curl -v https://example.com
```

Documenta:

- Codigo HTTP.
- Headers.
- Servidor si aparece.
- Redirecciones.
- Cookies si existen.

## Criterio de Dominio

Puedes avanzar cuando puedas:

- Diferenciar reconocimiento y enumeracion.
- Explicar superficie de ataque.
- Documentar hallazgos sin exagerar.
- Proponer mitigaciones para informacion expuesta.
