# Pendientes

Archivo para registrar mejoras reales del proyecto. No es una lista de temas por memorizar; es una lista de decisiones pendientes para que la guia sea mas clara, util y publica.

## Web

- [x] Agregar rutas por perfil: Fundamentos, Blue Team, AppSec, Cloud, GRC y Empleabilidad.
- [x] Agregar filtros por nivel: inicial, intermedio, avanzado y referencia.
- [x] Mejorar busqueda para incluir contenido del Markdown, no solo titulo y categoria.
- [x] Agregar resumen de progreso por categoria.
- [x] Crear pagina "Como usar esta guia" dentro de la web.
- [x] Evaluar si el boton de progreso debe mantenerse o quitarse para que la experiencia sea mas informativa.
- [ ] Probar deploy publico con Dockerfile en Easypanel.

## Contenido por Reforzar

- [x] Cheatsheets: convertirlos en referencias mas completas y consistentes.
- [x] Endpoint Security: profundizar telemetria, EDR, hardening y casos de investigacion.
- [x] Database Security: ampliar permisos, auditoria, backups y errores comunes.
- [x] Wireless Security: ampliar fundamentos Wi-Fi, WPA, segmentacion y riesgos.
- [x] Network Security: ampliar firewalls, IDS/IPS, VPN, proxy y segmentacion.
- [x] Security Architecture: profundizar Zero Trust y arquitectura defensiva.
- [x] Empleabilidad: mejorar CV, entrevistas, proyectos y mapa de habilidades.

## Limpieza Tecnica

- [x] Reparar o reinicializar Git local; la carpeta `.git` actual no funciona como repositorio valido.
- [x] Quitar o justificar archivos de agente dentro de `web/` si no deben publicarse.
- [x] Revisar warnings de `<img>` en `MarkdownRenderer.jsx`.
- [x] Revisar warning de Turbopack por lectura dinamica de Markdown.
- [x] Confirmar que `.next/`, `.turbo/` y `node_modules/` no se suban al repositorio.

## Calidad Editorial

- [x] Mantener tono informativo, no de tareas obligatorias.
- [x] Evitar secciones de evidencia obligatoria.
- [x] Usar "Ejemplo", "Estructura sugerida", "Criterio de comprension" o "Puntos a observar".
- [x] Revisar ortografia tecnica en archivos principales.
- [x] Unificar nombres: ciberseguridad, AppSec, Blue Team, Cloud Security, GRC.
- [x] Auditar enlaces internos de Markdown y corregir rutas rotas.

## Publicacion

- [x] Proponer nombre final del repo.
- [x] Proponer descripcion y tags de GitHub.
- [ ] Agregar screenshot o preview de la web cuando este deployada.
- [x] Agregar instrucciones claras para ejecutar localmente y con Docker.
- [x] Decidir licencia y reglas de contribucion visibles.
