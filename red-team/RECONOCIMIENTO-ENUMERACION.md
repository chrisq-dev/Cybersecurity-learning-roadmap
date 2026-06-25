# Reconocimiento y Enumeración

## Objetivo

Entender como se recolecta información en un entorno autorizado. Esta fase busca conocer el sistema antes de hacer cualquier validación de seguridad.

## Reconocimiento

Reconocimiento es recolectar información general.

En laboratorios puede incluir:

- Identificar IP del objetivo.
- Identificar dominio de prueba.
- Revisar tecnologia visible.
- Revisar documentacion del lab.

En entornos reales solo debe hacerse con permiso.

## Enumeración

Enumeración es obtener información más detallada de servicios, usuarios, rutas, versiones o configuraciones.

Ejemplos en un lab:

- Que puertos están abiertos.
- Que servicios responden.
- Que versión aparente tiene un servicio.
- Que rutas web existen.
- Que banners aparecen.

## Preguntas Clave

- Qué sistema estoy evaluando?
- Qué servicios expone?
- Qué versiones se observan?
- Qué superficie de ataque existe?
- Qué información es confiable y cuál es suposicion?

## Herramientas Conceptuales

Herramientas comunmente usadas en laboratorios:

- `ping` para conectividad.
- `curl` para HTTP.
- `dig` para DNS.
- `ss` para revisar servicios locales.
- Wireshark para tráfico.
- Escaneres de puertos solo en entornos autorizados.

## Banners

Un banner es información que un servicio puede mostrar.

Ejemplo:

```text
Server: nginx
```

Riesgo:

- Puede revelar tecnologia o versión.

Mitigacion:

- Reducir banners innecesarios.
- Mantener servicios actualizados.

## Enumeración Web Básica

En una aplicación web autorizada:

- Revisar paginas visibles.
- Revisar headers.
- Revisar cookies.
- Revisar métodos HTTP.
- Revisar robots.txt si existe.
- Revisar errores.

## Observación Segura

Usa solo `example.com` o una app local propia para practicar HTTP:

```bash
curl -I https://example.com
curl -v https://example.com
```

Observa:

- Código HTTP.
- Headers.
- Servidor si aparece.
- Redirecciones.
- Cookies si existen.

## Criterio de Dominio

Puedes avanzar cuando puedas:

- Diferenciar reconocimiento y enumeración.
- Explicar superficie de ataque.
- Documentar hallazgos sin exagerar.
- Proponer mitigaciones para información expuesta.
