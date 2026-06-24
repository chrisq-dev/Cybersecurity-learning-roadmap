# Plantilla de Reporte

Usa esta plantilla para laboratorios, writeups permitidos o analisis tecnicos.

## Reglas

- No incluyas secretos reales.
- No incluyas datos personales innecesarios.
- No publiques evidencia de sistemas sin autorizacion.
- Explica alcance y limites.
- Separa hechos de hipotesis.
- Escribe remediaciones verificables.

## Resumen

Descripcion breve del ejercicio o hallazgo.

## Alcance

Sistema, laboratorio, maquina o aplicacion evaluada.

## Objetivo

Que se buscaba aprender o validar.

## Metodologia

Pasos generales realizados.

Incluye:

- herramientas;
- comandos relevantes;
- fuentes de datos;
- supuestos;
- limitaciones.

## Evidencia

Comandos, capturas, logs o respuestas relevantes.

Formato recomendado:

```text
[timestamp] [fuente] [evento] [observacion]
```

## Hallazgos

Lista de observaciones tecnicas importantes.

Para cada hallazgo:

- titulo;
- severidad;
- evidencia;
- impacto;
- recomendacion.

## Impacto

Explicacion de por que importa el hallazgo.

Divide cuando aplique:

- impacto tecnico;
- impacto para usuario;
- impacto para negocio;
- impacto operacional.

## Remediacion

Acciones recomendadas para corregir o reducir el riesgo.

Debe ser accionable:

```text
Mal: mejorar seguridad.
Bien: habilitar MFA para cuentas admin y revisar logs de inicio de sesion de los ultimos 30 dias.
```

## Validacion

Como comprobarias que la remediacion funciono.

Ejemplos:

- re-ejecutar prueba;
- revisar configuracion;
- revisar version;
- consultar logs;
- verificar permiso.

## Lecciones Aprendidas

Que aprendi y que haria diferente la proxima vez.

## Referencias

Documentacion consultada.

## Criterios Finales

Antes de considerar que un reporte esta claro, revisa si:

- el alcance esta claro;
- la evidencia no expone secretos;
- hay timeline cuando aplica;
- los hallazgos explican impacto;
- las remediaciones son verificables;
- hay conclusion;
- otra persona podria seguir el razonamiento.
