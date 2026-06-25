# Preguntas Blue Team, Web y Cloud

Estas preguntas están pensadas para medir criterio. Responde con causa, impacto, evidencia y mitigacion cuando aplique.

## Blue Team

1. Qué es un SIEM?
2. Qué es un IOC?
3. Qué es una alerta accionable?
4. Diferencia entre evidencia e hipótesis.
5. Qué es MITRE ATT&CK?
6. Diferencia entre tactica y técnica.
7. Qué es Sigma?
8. Qué es YARA?
9. Qué es threat hunting?
10. Qué debe incluir una detección bien documentada?

### Casos

1. Hay 20 logins fallidos y luego uno exitoso desde la misma IP. Qué hipótesis tienes?
2. Una alerta dispara cada vez qué alguien usa PowerShell. Por qué puede ser mala detección?
3. Un usuario descarga muchos archivos después de login inusual. Qué evidencia revisas?

## Respuesta a Incidentes

1. Cuales son fases comunes de respuesta?
2. Diferencia entre contención y erradicacion.
3. Qué debe incluir una linea de tiempo?
4. Qué haces ante una cuenta posiblemente comprometida?
5. Qué evidencia preservas?

### Casos

1. Cómo separas contención de erradicacion en una cuenta comprometida?
2. Qué acciones tomas en los primeros 15 minutos de un incidente?
3. Qué debe incluir la lección aprendida?

## Web

1. Diferencia entre autenticación y autorización.
2. Qué es Broken Access Control?
3. Qué es SQL Injection?
4. Qué mitiga SQL Injection?
5. Qué es XSS?
6. Diferencia entre reflected y stored XSS.
7. Qué es CSRF?
8. Qué es SSRF?
9. Qué riesgo tiene file upload?
10. Qué es CORS?

### Casos

1. Un usuario cambia `/invoices/1001` por `/invoices/1002` y ve datos ajenos. Clasifica el riesgo.
2. Una app usa query SQL concatenada. Qué control propones?
3. Una app permite subir imágenes. Qué controles mínimos aplicas?
4. Una acción cambia email sin token CSRF. Qué riesgo hay?

## API

1. Qué es BOLA?
2. Qué es mass assignment?
3. Para qué sirve rate limiting?
4. Qué logs debe tener una API?
5. Qué riesgo tiene un token sin expiracion?

### Casos

1. Disena matriz de permisos para `GET /notes/{id}` y `DELETE /notes/{id}`.
2. Una API acepta `role=admin` en el body. Qué falla podria ser?
3. Qué respuesta esperas si falta autenticación vs si falta permiso?

## Cloud

1. Explica responsabilidad compartida.
2. Qué es IAM?
3. Riesgos de storage público.
4. Qué logs de auditoria revisarias?
5. Qué es una service account?
6. Qué riesgo tienen access keys antiguas?
7. Qué controles aplicarias a secretos?

### Casos

1. Un bucket público contiene respaldos. Qué impacto tiene y cómo lo remedias?
2. Una identidad tiene `Action:* Resource:*`. Qué preguntas haces?
3. Un security group permite SSH desde `0.0.0.0/0`. Qué riesgo y controles propones?

## Kubernetes

1. Qué es un pod?
2. Qué es un namespace?
3. Qué controla RBAC?
4. Por qué es riesgoso un pod privilegiado?
5. Para qué sirven Network Policies?
6. Qué riesgo tienen secrets mal protegidos?

### Casos

1. Un deployment corre cómo root. Qué recomendarias?
2. Una service account tiene permisos `cluster-admin`. Qué riesgo hay?
3. No hay Network Policies. Qué puede pasar si un pod se compromete?

## Evaluación Práctica

Elige uno:

1. Explica como analizarias una cuenta comprometida.
2. Explica como revisarias riesgos OWASP en una app de notas.
3. Explica como revisarias IAM en una cuenta cloud ficticia.
4. Explica una detección conceptual con MITRE y falsos positivos.

## Criterio

Si fallas preguntas, refuerza:

- Blue Team.
- Seguridad web.
- Seguridad de APIs.
- Seguridad cloud.
- IAM.
- Logging y detección.

## Autoevaluacion

- 0 puntos: no respondo.
- 1 punto: definicion.
- 2 puntos: ejemplo.
- 3 puntos: impacto.
- 4 puntos: mitigacion.
- 5 puntos: evidencia, detección o reporte.
