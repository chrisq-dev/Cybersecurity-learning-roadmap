# Capstone: Secure Small Business

## Objetivo

Disenar un plan de seguridad realista para una pequena empresa con recursos limitados.

Este proyecto demuestra criterio practico: priorizar controles que reducen riesgo real sin proponer soluciones imposibles para el contexto.

## Escenario

Empresa de 25 personas:

- correos corporativos;
- laptops de empleados;
- Wi-Fi de oficina;
- sistema POS o SaaS critico;
- sitio web;
- backups incompletos;
- no hay equipo de seguridad dedicado.

## Alcance

Incluido:

- inventario;
- identidades;
- endpoints;
- red;
- backups;
- correo;
- politicas minimas;
- respuesta a incidentes;
- roadmap de 90 dias.

Fuera de alcance:

- pentest ofensivo;
- compra de herramientas empresariales costosas;
- cambios sin autorizacion;
- datos reales.

## Fase 1: Inventario y Riesgo

Tabla:

| Activo | Owner | Riesgo | Impacto | Control actual | Control recomendado |
| --- | --- | --- | --- | --- | --- |

Incluye:

- correo;
- laptops;
- Wi-Fi;
- sistema critico;
- sitio web;
- backups;
- proveedor SaaS;
- cuentas admin.

## Fase 2: Controles Minimos

Prioriza:

- MFA en correo y sistemas criticos;
- backups probados;
- bloqueo de dispositivos;
- actualizaciones;
- password manager;
- antivirus/EDR razonable;
- separacion Wi-Fi invitados;
- cuentas admin separadas;
- politicas basicas;
- plan de respuesta.

## Fase 3: Amenazas Principales

Cubre:

- phishing;
- ransomware;
- perdida de laptop;
- cuenta comprometida;
- fuga de datos;
- caida de sistema critico;
- proveedor SaaS comprometido.

Para cada amenaza:

- impacto;
- controles preventivos;
- controles detectivos;
- controles correctivos;
- evidencia de implementacion.

## Fase 4: Arquitectura Simple

Describe una red realista:

```text
internet -> router/firewall -> red empleados
                         -> Wi-Fi invitados
                         -> sistemas criticos/SaaS
```

Explica:

- que separarias;
- que monitorearias;
- que no intentarias sobrecomplicar;
- que dependeria de proveedores.

## Fase 5: Playbooks Minimos

Incluye al menos:

- phishing reportado;
- laptop perdida;
- cuenta comprometida;
- ransomware sospechado;
- caida de sistema critico.

Cada playbook debe tener:

- senales;
- primeras acciones;
- a quien avisar;
- evidencia;
- recuperacion;
- prevencion futura.

## Fase 6: Plan 30-60-90

Ejemplo:

| Periodo | Accion | Riesgo que reduce | Evidencia |
| --- | --- | --- | --- |
| 30 dias | MFA en correo | cuenta comprometida | reporte MFA |
| 60 dias | backups probados | ransomware | prueba de restore |
| 90 dias | playbook phishing | respuesta lenta | simulacro |

## Estructura sugerida

```md
# Secure Small Business

## Resumen Ejecutivo

## Contexto

## Inventario

## Top Riesgos

## Controles Recomendados

## Arquitectura

## Playbooks Minimos

## Plan 30-60-90

## Metricas
```

## Criterio de Exito

- Controles razonables para empresa pequena.
- No depende de herramientas caras.
- Incluye riesgo, impacto y prioridad.
- Incluye plan medible.
- Incluye respuesta a incidentes basica.

## Rubrica

| Nivel | Evidencia |
| --- | --- |
| Basico | Lista controles |
| Bueno | Relaciona controles con riesgos |
| Fuerte | Prioriza por impacto y costo |
| Portafolio | Plan realista, medible y defendible |
