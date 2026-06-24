# Roadmap de Ciberseguridad

Guia publica en espanol para estudiar ciberseguridad de forma estructurada, practica y etica.

Este repositorio combina apuntes, rutas, laboratorios, preguntas, playbooks, proyectos y una web local para leer el contenido como una plataforma de aprendizaje.

## Como Estudiar

Empieza aqui:

1. [INICIO-AQUI.md](INICIO-AQUI.md): ruta inicial y orden recomendado.
2. [COMO-ESTUDIAR.md](COMO-ESTUDIAR.md): metodo diario y semanal.
3. [GUIA-DE-ESTUDIO.md](GUIA-DE-ESTUDIO.md): sistema completo de avance.
4. [TEMARIO-MAESTRO.md](TEMARIO-MAESTRO.md): mapa general de temas.

Para configurar la descripcion, topics y datos del repositorio en GitHub, revisa [PUBLICACION-GITHUB.md](PUBLICACION-GITHUB.md).

Para publicar la web con Docker/Easypanel, revisa [DEPLOY-EASYPANEL.md](DEPLOY-EASYPANEL.md).

La idea no es leer todo de golpe. La idea es avanzar por ciclos:

```text
leer -> practicar -> documentar -> evaluar -> repetir
```

## Web Interactiva Local

El contenido puede leerse desde una web hecha con Next.js.

```bash
cd web
npm install
npm run dev
```

Despues abre:

```text
http://localhost:3000
```

La web incluye:

- lectura ordenada de los Markdown;
- busqueda por titulo y categoria;
- busqueda por contenido;
- filtros por nivel;
- rutas sugeridas por perfil;
- tabla de contenido por leccion;
- navegacion anterior/siguiente;
- marcadores locales de lectura;
- soporte para contenido en subcarpetas.

Healthcheck de produccion:

```text
/api/health
```

## Modulos Principales

- Fundamentos de seguridad.
- Redes y Cisco.
- Linux.
- Windows y Active Directory.
- Programacion para seguridad.
- Web y OWASP.
- Blue Team.
- Cloud Security.
- AppSec y DevSecOps.
- Vulnerability Management.
- GRC.
- API Security.
- Contenedores y Kubernetes.
- Forense.
- Malware basico.
- Red Team etico.
- Labs, playbooks, writeups y evaluaciones.
- Empleabilidad y portafolio.

## Estructura de una Buena Leccion

Los temas deben evolucionar hacia este formato:

- objetivo claro;
- mapa mental;
- conceptos clave explicados;
- errores comunes;
- practica guiada;
- evidencia sugerida;
- puntos a observar;
- autoevaluacion;
- criterio de dominio.

Una leccion esta lista cuando una persona puede estudiarla sola, entender por que importa el tema, practicar algo concreto y reconocer evidencia de aprendizaje sin sentir que la pagina es una lista de tareas obligatorias.

## Estado del Proyecto

Este proyecto esta en crecimiento. Ya existe una base amplia de temas, pero el objetivo es convertir cada modulo importante en una leccion mas completa, practica y evaluable.

Prioridad actual:

1. Profundizar los fundamentos.
2. Mejorar la experiencia web para alumnos.
3. Agregar ejercicios y evaluaciones por modulo.
4. Documentar labs con evidencia.
5. Convertir el repo en portafolio publico de aprendizaje.

## Reglas Eticas

Todo el contenido de este repositorio es estrictamente educativo.

Cualquier prueba, escaneo, explotacion o analisis debe realizarse unicamente en:

- sistemas propios;
- laboratorios locales;
- plataformas de practica autorizadas;
- entornos donde exista permiso explicito.

No uses este material contra terceros, redes publicas, empresas, usuarios o sistemas sin autorizacion.

## Contribuciones

Las contribuciones son bienvenidas si respetan el enfoque educativo, defensivo y etico del proyecto.

Antes de proponer contenido, revisa [CONTRIBUTING.md](CONTRIBUTING.md).
