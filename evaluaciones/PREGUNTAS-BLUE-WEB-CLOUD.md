# Preguntas Blue Team, Web y Cloud

Estas preguntas estan pensadas para medir criterio. Responde con causa, impacto, evidencia y mitigacion cuando aplique.

## Blue Team

1. Que es un SIEM?
2. Que es un IOC?
3. Que es una alerta accionable?
4. Diferencia entre evidencia e hipotesis.
5. Que es MITRE ATT&CK?
6. Diferencia entre tactica y tecnica.
7. Que es Sigma?
8. Que es YARA?
9. Que es threat hunting?
10. Que debe incluir una deteccion bien documentada?

### Casos

1. Hay 20 logins fallidos y luego uno exitoso desde la misma IP. Que hipotesis tienes?
2. Una alerta dispara cada vez que alguien usa PowerShell. Por que puede ser mala deteccion?
3. Un usuario descarga muchos archivos despues de login inusual. Que evidencia revisas?

## Respuesta a Incidentes

1. Cuales son fases comunes de respuesta?
2. Diferencia entre contencion y erradicacion.
3. Que debe incluir una linea de tiempo?
4. Que haces ante una cuenta posiblemente comprometida?
5. Que evidencia preservas?

### Casos

1. Como separas contencion de erradicacion en una cuenta comprometida?
2. Que acciones tomas en los primeros 15 minutos de un incidente?
3. Que debe incluir la leccion aprendida?

## Web

1. Diferencia entre autenticacion y autorizacion.
2. Que es Broken Access Control?
3. Que es SQL Injection?
4. Que mitiga SQL Injection?
5. Que es XSS?
6. Diferencia entre reflected y stored XSS.
7. Que es CSRF?
8. Que es SSRF?
9. Que riesgo tiene file upload?
10. Que es CORS?

### Casos

1. Un usuario cambia `/invoices/1001` por `/invoices/1002` y ve datos ajenos. Clasifica el riesgo.
2. Una app usa query SQL concatenada. Que control propones?
3. Una app permite subir imagenes. Que controles minimos aplicas?
4. Una accion cambia email sin token CSRF. Que riesgo hay?

## API

1. Que es BOLA?
2. Que es mass assignment?
3. Para que sirve rate limiting?
4. Que logs debe tener una API?
5. Que riesgo tiene un token sin expiracion?

### Casos

1. Disena matriz de permisos para `GET /notes/{id}` y `DELETE /notes/{id}`.
2. Una API acepta `role=admin` en el body. Que falla podria ser?
3. Que respuesta esperas si falta autenticacion vs si falta permiso?

## Cloud

1. Explica responsabilidad compartida.
2. Que es IAM?
3. Riesgos de storage publico.
4. Que logs de auditoria revisarias?
5. Que es una service account?
6. Que riesgo tienen access keys antiguas?
7. Que controles aplicarias a secretos?

### Casos

1. Un bucket publico contiene respaldos. Que impacto tiene y como lo remedias?
2. Una identidad tiene `Action:* Resource:*`. Que preguntas haces?
3. Un security group permite SSH desde `0.0.0.0/0`. Que riesgo y controles propones?

## Kubernetes

1. Que es un pod?
2. Que es un namespace?
3. Que controla RBAC?
4. Por que es riesgoso un pod privilegiado?
5. Para que sirven Network Policies?
6. Que riesgo tienen secrets mal protegidos?

### Casos

1. Un deployment corre como root. Que recomendarias?
2. Una service account tiene permisos `cluster-admin`. Que riesgo hay?
3. No hay Network Policies. Que puede pasar si un pod se compromete?

## Evaluacion Practica

Elige uno:

1. Escribe un reporte SOC de una cuenta comprometida.
2. Escribe una revision OWASP de una app de notas.
3. Escribe una revision IAM de una cuenta cloud ficticia.
4. Escribe una deteccion conceptual con MITRE y falsos positivos.

## Criterio

Si fallas preguntas, vuelve a:

- `blue-team/`
- `web-owasp/`
- `api-security/`
- `cloud-security/`

## Autoevaluacion

- 0 puntos: no respondo.
- 1 punto: definicion.
- 2 puntos: ejemplo.
- 3 puntos: impacto.
- 4 puntos: mitigacion.
- 5 puntos: evidencia, deteccion o reporte.
