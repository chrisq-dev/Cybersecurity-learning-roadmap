# Guía editorial

Esta guía define el estándar de publicación de cbsdev.lat. El objetivo es informar con claridad, trazabilidad y lenguaje accesible; no convertir cada tema en un curso o laboratorio.

## Frontmatter obligatorio

```yaml
---
title: "Título descriptivo"
level: "inicial | intermedio | avanzado | referencia"
content_type: "guia | ruta | playbook | glosario | recurso | articulo"
updated: "AAAA-MM-DD"
---
```

`updated` indica la última modificación editorial comprobable. Usa `reviewed` y `reviewed_against` únicamente cuando el contenido haya sido contrastado con una versión concreta de una fuente primaria.

```yaml
reviewed: "2026-06-28"
reviewed_against: "Nombre y versión del estándar"
```

## Niveles

- **Inicial:** presenta vocabulario, propósito y relaciones fundamentales sin asumir experiencia previa.
- **Intermedio:** explica arquitectura, riesgos, controles y decisiones que requieren fundamentos previos.
- **Avanzado:** trata casos especializados, límites, interacciones complejas o conocimiento profundo del dominio.
- **Referencia:** sirve para consultar términos, comparaciones, recursos o datos puntuales; no representa dificultad.

## Estructura recomendada

1. Objetivo de la guía.
2. Conceptos y contexto.
3. Riesgos, límites o modos de fallo.
4. Controles o criterios de decisión.
5. Conexiones con otras guías.
6. Fuentes oficiales y referencias.

Las preguntas de autoevaluación son opcionales. Los laboratorios guiados no son obligatorios; si una guía incluye ejercicios, deben ser conceptuales, seguros y realizarse en entornos propios o autorizados.

## Fuentes y actualidad

- Prioriza fuentes primarias: documentación oficial, estándares, RFC, organismos públicos y publicaciones del proyecto citado.
- Identifica siempre la edición cuando una clasificación cambia: por ejemplo, OWASP Top 10:2025 o CVSS 4.0.
- No presentes cifras, multas, incidentes o citas textuales sin una fuente que permita verificarlos.
- Distingue un caso documentado de un escenario ilustrativo.
- Evita palabras como `siempre`, `nunca`, `imposible` o `garantiza` cuando existan excepciones operativas.
- Revisa al menos cada seis meses las guías sobre estándares, certificaciones, productos cloud, IA y herramientas.

## Español y terminología

- Escribe en español neutro y conserva las tildes: `qué`, `cómo`, `por qué`, `está`, `código`, `diseño`.
- Presenta el término español primero y el inglés entre paréntesis cuando ayude: `control de acceso (access control)`.
- Conserva nombres oficiales, siglas y marcas: OWASP, NIST, MITRE ATT&CK, DevSecOps.
- Usa estilo de oración en títulos; evita mayúsculas en cada palabra.
- Explica una sigla la primera vez que aparezca en cada guía.

## Tono

Usa analogías para facilitar la comprensión, pero no como evidencia técnica. Evita lenguaje sensacionalista, descalificaciones y afirmaciones de autoridad personal. Una guía debe permitir que el lector diferencie hechos, interpretación y recomendación.

No presentes ataques, malware o abuso como hazañas. Describe impacto, legalidad, controles y mitigaciones. En ejemplos, usa hosts de documentación (`192.0.2.0/24`) y nombres genéricos en lugar de personas o víctimas reales.
