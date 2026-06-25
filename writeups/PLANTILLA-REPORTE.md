# Plantilla de Reporte

Usa está plantilla para laboratorios, writeups permitidos o análisis técnicos.

## Reglas

- No incluyas secretos reales.
- No incluyas datos personales innecesarios.
- No publiques evidencia de sistemas sin autorización.
- Explica alcance y límites.
- Separa hechos de hipótesis.
- Escribe remediaciones verificables.

## Resumen

Descripcion breve del ejercicio o hallazgo.

## Alcance

Sistema, laboratorio, máquina o aplicación evaluada.

## Objetivo

Que se buscaba aprender o validar.

## Metodología

Pasos generales realizados.

Incluye:

- Herramientas;
- Comandos relevantes;
- Fuentes de datos;
- Supuestos;
- Limitaciones.

## Evidencia

Comandos, capturas, logs o respuestas relevantes.

Formato recomendado:

```text
[timestamp] [fuente] [evento] [observacion]
```

## Hallazgos

Lista de observaciones técnicas importantes.

Para cada hallazgo:

- Titulo;
- Severidad;
- Evidencia;
- Impacto;
- Recomendación.

## Impacto

Explicación de por que importa el hallazgo.

Divide cuando aplique:

- Impacto técnico;
- Impacto para usuario;
- Impacto para negocio;
- Impacto operacional.

## Remediación

Acciones recomendadas para corregir o reducir el riesgo.

Debe ser accionable:

```text
Mal: mejorar seguridad.
Bien: habilitar MFA para cuentas admin y revisar logs de inicio de sesion de los ultimos 30 dias.
```

## Validación

Como comprobarias que la remediación funciono.

Ejemplos:

- Re-ejecutar prueba;
- Revisar configuración;
- Revisar versión;
- Consultar logs;
- Verificar permiso.

## Lecciones Aprendidas

Que aprendi y que haria diferente la próxima vez.

## Referencias

Documentacion consultada.

## Criterios Finales

Antes de considerar que un reporte está claro, revisa si:

- El alcance está claro;
- La evidencia no expone secretos;
- Hay timeline cuando aplica;
- Los hallazgos explican impacto;
- Las remediaciones son verificables;
- Hay conclusión;
- Otra persona podria seguir el razonamiento.
