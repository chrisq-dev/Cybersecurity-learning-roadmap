# Capstone: Secure Small Business

## Objetivo

Disenar un plan de seguridad realista para una pequeña empresa con recursos limitados.

Este proyecto demuestra criterio práctico: priorizar controles que reducen riesgo real sin proponer soluciones imposibles para el contexto.

## Escenario

Empresa de 25 personas:

- Correos corporativos;
- Laptops de empleados;
- Wi-Fi de oficina;
- Sistema POS o SaaS crítico;
- Sitio web;
- Backups incompletos;
- No hay equipo de seguridad dedicado.

## Alcance

Incluido:

- Inventario;
- Identidades;
- Endpoints;
- Red;
- Backups;
- Correo;
- Políticas mínimas;
- Respuesta a incidentes;
- Roadmap de 90 días.

Fuera de alcance:

- Pentest ofensivo;
- Compra de herramientas empresariales costosas;
- Cambios sin autorización;
- Datos reales.

## Fase 1: Inventario y Riesgo

Tabla:

| Activo | Owner | Riesgo | Impacto | Control actual | Control recomendado |
| --- | --- | --- | --- | --- | --- |

Incluye:

- Correo;
- Laptops;
- Wi-Fi;
- Sistema crítico;
- Sitio web;
- Backups;
- Proveedor SaaS;
- Cuentas admin.

## Fase 2: Controles Mínimos

Prioriza:

- MFA en correo y sistemas críticos;
- Backups probados;
- Bloqueo de dispositivos;
- Actualizaciones;
- Password manager;
- Antivirus/EDR razonable;
- Separación Wi-Fi invitados;
- Cuentas admin separadas;
- Políticas básicas;
- Plan de respuesta.

## Fase 3: Amenazas Principales

Cubre:

- Phishing;
- Ransomware;
- Pérdida de laptop;
- Cuenta comprometida;
- Fuga de datos;
- Caida de sistema crítico;
- Proveedor SaaS comprometido.

Para cada amenaza:

- Impacto;
- Controles preventivos;
- Controles detectivos;
- Controles correctivos;
- Evidencia de implementacion.

## Fase 4: Arquitectura Simple

Describe una red realista:

```text
internet -> router/firewall -> red empleados
                         -> Wi-Fi invitados
                         -> sistemas criticos/SaaS
```

Explica:

- Que separarias;
- Que monitorearias;
- Que no intentarias sobrecomplicar;
- Que dependeria de proveedores.

## Fase 5: Playbooks Mínimos

Incluye al menos:

- Phishing reportado;
- Laptop pérdida;
- Cuenta comprometida;
- Ransomware sospechado;
- Caida de sistema crítico.

Cada playbook debe tener:

- Señales;
- Primeras acciones;
- A quien avisar;
- Evidencia;
- Recuperación;
- Prevencion futura.

## Fase 6: Plan 30-60-90

Ejemplo:

| Periodo | Acción | Riesgo que reduce | Evidencia |
| --- | --- | --- | --- |
| 30 días | MFA en correo | cuenta comprometida | reporte MFA |
| 60 días | backups probados | ransomware | prueba de restore |
| 90 días | playbook phishing | respuesta lenta | simulacro |

## Estructura sugerida

```md
# Secure Small Business

## Resumen Ejecutivo

## Contexto

## Inventario

## Top Riesgos

## Controles Recomendados

## Arquitectura

## Playbooks Mínimos

## Plan 30-60-90

## Metricas
```

## Criterio de Éxito

- Controles razonables para empresa pequeña.
- No depende de herramientas caras.
- Incluye riesgo, impacto y prioridad.
- Incluye plan medible.
- Incluye respuesta a incidentes básica.

## Rúbrica

| Nivel | Evidencia |
| --- | --- |
| Básico | Lista controles |
| Bueno | Relaciona controles con riesgos |
| Fuerte | Prioriza por impacto y costo |
| Portafolio | Plan realista, medible y defendible |
