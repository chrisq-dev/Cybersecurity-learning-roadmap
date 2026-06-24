# Fundamentos de GRC

## Objetivo

Entender que la ciberseguridad tambien es proceso, gobierno, riesgo y evidencia.

GRC no es burocracia por si misma. Bien aplicado ayuda a decidir que proteger, quien responde, que riesgos aceptar y como demostrar que los controles existen.

## Mapa Mental

```text
politica -> control -> evidencia -> riesgo -> decision -> mejora
```

Si no hay evidencia, el control es dificil de defender.

## Que es GRC

GRC significa:

- Governance: direccion, politicas y responsabilidades.
- Risk: identificar y tratar riesgos.
- Compliance: cumplir requisitos internos, legales o regulatorios.

## Politica, Estandar, Procedimiento y Control

- Politica: regla general aprobada.
- Estandar: requisito especifico.
- Procedimiento: pasos para cumplir.
- Control: medida que reduce riesgo.
- Evidencia: prueba de que el control existe o funciono.

Ejemplo:

| Elemento | Ejemplo |
| --- | --- |
| Politica | Todos los admins usan MFA |
| Estandar | MFA resistente a phishing para cuentas criticas |
| Procedimiento | Como enrolar MFA |
| Control | MFA obligatorio |
| Evidencia | Reporte de cuentas con MFA |

## Gobernanza

Define:

- Quien decide.
- Quien aprueba.
- Quien opera.
- Que politicas existen.
- Que se mide.

Ejemplos:

- Politica de contraseñas.
- Politica de acceso.
- Politica de backups.
- Politica de respuesta a incidentes.

## Roles

- Owner del riesgo: acepta o trata el riesgo.
- Owner del activo: conoce el sistema.
- Owner del control: implementa o mantiene control.
- Auditor: revisa evidencia.
- Seguridad: asesora y valida.

## Riesgo

Riesgo combina:

- Activo.
- Amenaza.
- Vulnerabilidad.
- Impacto.
- Probabilidad.

Ejemplo:

```text
Activo: base de datos de clientes
Amenaza: acceso no autorizado
Vulnerabilidad: permisos excesivos
Impacto: exposicion de datos
Control: minimo privilegio y monitoreo
```

## Tratamiento de Riesgo

Opciones:

- Mitigar: aplicar controles.
- Transferir: seguro o proveedor.
- Aceptar: documentar decision.
- Evitar: dejar de hacer la actividad.

Aceptar riesgo no significa ignorarlo. Debe tener owner, razon, fecha y revision.

## Cumplimiento

Cumplimiento significa demostrar que se siguen controles o requisitos.

Puede venir de:

- Leyes.
- Regulaciones.
- Contratos.
- Estándares.
- Politicas internas.

## Evidencia Buena

Debe ser:

- fechada;
- trazable;
- entendible;
- suficiente;
- relacionada con el control;
- protegida si contiene datos sensibles.

## Evidencia

Sin evidencia, el control es dificil de demostrar.

Ejemplos:

- Capturas de configuracion.
- Logs.
- Reportes.
- Tickets.
- Aprobaciones.
- Resultados de pruebas.

## Practica Guiada

Una politica simple puede verse asi:

```md
# Politica de MFA

## Objetivo

## Alcance

## Reglas

## Excepciones

## Evidencia Requerida

## Revision
```

## Mini Laboratorio: Registro de Riesgos

Crea `registro-riesgos-basico.md`:

| Riesgo | Activo | Impacto | Probabilidad | Tratamiento | Owner | Evidencia |
| --- | --- | --- | --- | --- | --- | --- |

Incluye al menos:

- cuenta admin sin MFA;
- backups no probados;
- bucket publico;
- logs insuficientes;
- dependencia vulnerable.

## Errores Comunes

- Crear politicas que nadie puede cumplir.
- No asignar owner.
- Aceptar riesgos sin fecha de revision.
- Confundir evidencia con opinion.
- Medir controles que no reducen riesgo.

## Criterio de Dominio

Puedes avanzar cuando puedas:

- Explicar GRC.
- Explicar politica vs control.
- Explicar evidencia.
- Relacionar riesgo con impacto.
- Crear un registro simple de riesgos con owners y tratamiento.
