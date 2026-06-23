# Sistema de Estudio para TDAH

Esta guia no reemplaza apoyo medico o profesional. Es un sistema practico para estudiar ciberseguridad con menos friccion, menos saturacion y mas practica.

## Principios

- Estudia en bloques cortos.
- Reduce decisiones antes de empezar.
- Deja tareas pequenas y claras.
- Practica mas de lo que lees.
- Documenta poco, pero documenta siempre.
- Usa checklists visibles.
- Mide progreso por evidencias, no por horas.

## Regla 25-5

Una sesion base:

1. 25 minutos de enfoque.
2. 5 minutos de descanso.
3. Escribir 3 lineas de resumen.
4. Marcar una accion completada.

Si 25 minutos es demasiado, usa 10-3:

1. 10 minutos de enfoque.
2. 3 minutos de descanso.
3. Una nota corta.

Lo importante es iniciar y cerrar el ciclo.

## Plantilla de Sesion

Antes de empezar:

```md
Tema:
Objetivo de 25 min:
Archivo donde voy a escribir:
Comando/lab que voy a probar:
```

Al terminar:

```md
Que aprendi:
Que no entendi:
Proxima accion pequena:
```

## Regla de Una Sola Pestaña Mental

Durante una sesion solo se permite:

- Un tema.
- Una nota.
- Un lab.
- Una pregunta.

Si aparece una idea nueva, no la sigas. Escribela en `notes/PENDIENTES.md` y vuelve al tema.

## Como Evitar Abandono

Cuando te atasques:

- Baja el nivel: busca una version mas simple.
- Cambia de modo: de lectura a practica o de practica a dibujo.
- Escribe exactamente que no entiendes.
- Pide una explicacion con analogia.
- Haz un lab mas pequeno.

No cambies de area completa solo porque algo se puso dificil.

## Rutina Semanal Recomendada

### Dia 1: Teoria Corta

- Leer 20-30 minutos.
- Escribir resumen de 5 puntos.
- Anotar 3 dudas.

### Dia 2: Practica Guiada

- Hacer un lab pequeno.
- Guardar comandos y resultados.
- Escribir que salio mal.

### Dia 3: Repaso Activo

- Explicar el tema sin ver notas.
- Crear flashcards o preguntas.
- Corregir huecos.

### Dia 4: Practica Libre

- Repetir el lab sin guia.
- Cambiar una variable.
- Documentar diferencia.

### Dia 5: Mini Reporte

- Escribir un reporte corto.
- Agregar evidencia.
- Agregar remediacion si aplica.

### Dia 6: Portafolio

- Limpiar notas.
- Subir cambios.
- Mejorar README o checklist.

### Dia 7: Descanso o Repaso Ligero

- No meter tema nuevo pesado.
- Revisar glosario.
- Planear la siguiente semana.

## Metodo 3-2-1

Para cada tema importante:

- 3 conceptos que entendiste.
- 2 comandos, tecnicas o ejemplos.
- 1 duda concreta.

Ejemplo:

```md
Tema: DNS

3 conceptos:
- DNS traduce nombres a IPs.
- Existen registros A, AAAA, MX, TXT, CNAME.
- La resolucion puede usar cache.

2 ejemplos:
- dig example.com
- nslookup example.com

1 duda:
- Como funciona DNSSEC?
```

## Sistema Anti-Saturacion

Si el tema se siente demasiado grande, dividelo asi:

1. Que es.
2. Para que sirve.
3. Como funciona.
4. Como se rompe.
5. Como se protege.
6. Como lo practico.
7. Como lo explico en un reporte.

## Senales de Progreso Real

Estas avanzando cuando:

- Puedes explicar con tus palabras.
- Puedes repetir un lab sin mirar todos los pasos.
- Puedes leer logs basicos sin perderte.
- Puedes decir "no se" y formular una pregunta concreta.
- Puedes documentar impacto y mitigacion.

## Senales de Alerta

Necesitas bajar velocidad cuando:

- Solo consumes videos y no practicas.
- Cambias de herramienta cada dia.
- Lees temas avanzados sin fundamentos.
- No puedes explicar lo que hiciste ayer.
- Tus notas son copiadas y no entendidas.

## Archivo de Pendientes

Usa `notes/PENDIENTES.md` para capturar ideas sin distraerte.

Formato:

```md
- [ ] Tema o duda
  - Por que importa:
  - Donde lo voy a estudiar:
```
