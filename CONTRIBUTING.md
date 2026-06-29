# Contribuir

Este repositorio es una web pública de recursos de ciberseguridad en español. La meta es mantener una biblioteca informativa clara, verificable y ética para personas que quieren comprender la ciberseguridad con orden.

## Qué tipo de contribuciones sirven

- Correcciones de errores técnicos.
- Mejoras de claridad.
- Nuevas guías y rutas temáticas.
- Preguntas de autoevaluación opcionales.
- Hojas de referencia.
- Plantillas de reportes.
- Recursos gratuitos y legales.
- Mejoras de estructura.

## Reglas

- Mantener el contenido educativo y ético.
- No agregar técnicas para daño real o abuso.
- No subir credenciales, tokens, datos personales o información privada.
- No subir spoilers prohibidos por plataformas de práctica.
- No usar datos de sistemas reales sin permiso.
- Explicar riesgos y mitigaciones cuando se hable de vulnerabilidades.

## Estilo

Lee [STYLE-GUIDE.md](STYLE-GUIDE.md) antes de modificar contenido.

- Escribir en español.
- Usar un tono profesional, accesible y directo.
- Explicar los términos técnicos la primera vez que aparecen.
- Preferir ejemplos claros y entornos controlados.
- Distinguir hechos, hipótesis y opiniones.
- Respaldar cifras, estándares y casos reales con fuentes confiables.
- Incluir riesgos, controles y práctica segura cuando el tema lo requiera.
- Mantener rutas y enlaces relativos.
- Evitar afirmaciones absolutas que no puedan demostrarse.

## Cómo publicar una guía en la web

1. Crea el archivo dentro de una carpeta temática, no en la raíz del repositorio.
2. Usa un nombre descriptivo en mayúsculas y separado por guiones, por ejemplo `MODELO-DE-AMENAZAS.md`.
3. Agrega el frontmatter editorial obligatorio.
4. Repite el mismo título como encabezado H1.
5. Usa encabezados H2 y H3 para que la tabla de contenido funcione correctamente.

Los Markdown colocados dentro de una carpeta temática se publican automáticamente. Las páginas conocidas siguen el orden didáctico definido en `web/lib/markdown.js`; las nuevas aparecen después, ordenadas alfabéticamente por título.

`README.md`, `CONTRIBUTING.md` y los documentos internos de la raíz no se publican como guías.

## Ejemplo completo

```md
---
title: "Modelado de amenazas"
level: "intermedio"
content_type: "guia"
updated: "2026-06-28"
---

# Modelado de amenazas

## Objetivo de esta guía

Explica qué aprenderá la persona y cómo se conecta el tema con la ciberseguridad.

## Conceptos fundamentales

Define los conceptos con lenguaje claro antes de introducir herramientas o técnicas.

## Cómo funciona

Desarrolla el proceso paso a paso y agrega un ejemplo comprensible.

## Riesgos y controles

Explica qué puede fallar, cuál sería el impacto y qué controles reducen el riesgo.

## Errores comunes

- Error frecuente y por qué ocurre.
- Forma correcta de evitarlo.

## Autoevaluación

1. ¿Cómo explicarías el concepto con tus propias palabras?
2. ¿Qué evidencia revisarías para detectar un problema?
3. ¿Qué control aplicarías primero y por qué?

## Fuentes

- [Documentación oficial](https://example.com)
```

La plantilla es una base, no una obligación rígida. Las guías culturales, glosarios y playbooks pueden usar una estructura distinta, siempre que mantengan claridad, contexto y navegación.

## Enlaces e imágenes

- Usa enlaces relativos para otras guías: `[Fundamentos de redes](redes-cisco/FUNDAMENTOS-REDES.md)`.
- Coloca imágenes compartidas en `assets/`.
- Incluye texto alternativo descriptivo.
- No dependas de imágenes para explicar información esencial.

## Antes de proponer cambios

Revisa:

- [README.md](README.md)
- [INICIO-AQUI.md](INICIO-AQUI.md)
- [STYLE-GUIDE.md](STYLE-GUIDE.md)

Después valida la web:

```bash
cd web
npm run check
```

Confirma también que:

- El Markdown tiene frontmatter válido.
- El título del frontmatter coincide con el H1.
- Los bloques de código están cerrados.
- Los enlaces internos funcionan.
- No se eliminó profundidad de una guía existente.
