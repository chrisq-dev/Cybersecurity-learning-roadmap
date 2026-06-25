# Fundamentos de GRC

## Objetivo

Entender que la ciberseguridad también es proceso, gobierno, riesgo y evidencia.

GRC no es burocracia por si misma. Bien aplicado ayuda a decidir que proteger, quien responde, que riesgos aceptar y como demostrar que los controles existen.

## Mapa Mental

```text
política -> control -> evidencia -> riesgo -> decision -> mejora
```

Si no hay evidencia, el control es difícil de defender.

## Qué es GRC

GRC significa:

- Governance: dirección, políticas y responsabilidades.
- Risk: identificar y tratar riesgos.
- Compliance: cumplir requisitos internos, legales o regulatorios.

## Política, Estandar, Procedimiento y Control

- Política: regla general aprobada.
- Estandar: requisito especifico.
- Procedimiento: pasos para cumplir.
- Control: medida que reduce riesgo.
- Evidencia: prueba de que el control existe o funciono.

Ejemplo:

| Elemento | Ejemplo |
| --- | --- |
| Política | Todos los admins usan MFA |
| Estandar | MFA resistente a phishing para cuentas críticas |
| Procedimiento | Como enrolar MFA |
| Control | MFA obligatorio |
| Evidencia | Reporte de cuentas con MFA |

## Gobernanza

Define:

- Quien decide.
- Quien aprueba.
- Quien opera.
- Que políticas existen.
- Que se mide.

Ejemplos:

- Política de contraseñas.
- Política de acceso.
- Política de backups.
- Política de respuesta a incidentes.

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
Impacto: exposición de datos
Control: minimo privilegio y monitoreo
```

## Tratamiento de Riesgo

Opciones:

- Mitigar: aplicar controles.
- Transferir: seguro o proveedor.
- Aceptar: documentar decisión.
- Evitar: dejar de hacer la actividad.

Aceptar riesgo no significa ignorarlo. Debe tener owner, razon, fecha y revisión.

## Cumplimiento

Cumplimiento significa demostrar que se siguen controles o requisitos.

Puede venir de:

- Leyes.
- Regulaciones.
- Contratos.
- Estándares.
- Políticas internas.

## Evidencia Buena

Debe ser:

- Fechada;
- Trazable;
- Entendible;
- Suficiente;
- Relacionada con el control;
- Protegida si contiene datos sensibles.

## Evidencia

Sin evidencia, el control es difícil de demostrar.

Ejemplos:

- Capturas de configuración.
- Logs.
- Reportes.
- Tickets.
- Aprobaciones.
- Resultados de pruebas.

## Ejemplo de Política

Una política simple puede verse asi:

```md
# Política de MFA

## Objetivo

## Alcance

## Reglas

## Excepciones

## Evidencia Requerida

## Revisión
```

## Criterios Para un Registro de Riesgos

Un registro de riesgos ayuda a conectar activos, impacto, probabilidad, tratamiento y evidencia.

| Riesgo | Activo | Impacto | Probabilidad | Tratamiento | Owner | Evidencia |
| --- | --- | --- | --- | --- | --- | --- |

Ejemplos de riesgos que ayudan a entender el formato:

- Cuenta admin sin MFA;
- Backups no probados;
- Bucket público;
- Logs insuficientes;
- Dependencia vulnerable.

## Errores Comunes

- Crear políticas que nadie puede cumplir.
- No asignar owner.
- Aceptar riesgos sin fecha de revisión.
- Confundir evidencia con opinion.
- Medir controles que no reducen riesgo.

## Criterio de Dominio

Puedes avanzar cuando puedas:

- Explicar GRC.
- Explicar política vs control.
- Explicar evidencia.
- Relacionar riesgo con impacto.
- Crear un registro simple de riesgos con owners y tratamiento.
