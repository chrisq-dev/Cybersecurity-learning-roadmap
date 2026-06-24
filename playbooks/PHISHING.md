# Playbook: Phishing

## Objetivo

Investigar y contener un correo sospechoso.

## Severidad Inicial

Sube severidad si:

- varios usuarios recibieron el correo;
- alguien hizo clic;
- hubo captura de credenciales;
- hay adjunto malicioso;
- involucra pagos o BEC;
- suplanta a directivo o proveedor critico.

## Señales

- Dominio parecido.
- Urgencia.
- Link sospechoso.
- Adjunto inesperado.
- Solicitud de credenciales.
- Cambio de pago.

## Evidencia a Recolectar

- Remitente.
- Reply-To.
- Subject.
- Headers.
- URL real.
- Adjuntos.
- Usuarios afectados.
- Hora de recepcion.

## Primeros 15 Minutos

1. Confirmar muestra del correo.
2. Identificar remitente, asunto y hora.
3. Evitar abrir links o adjuntos en maquina principal.
4. Buscar si otros usuarios lo recibieron.
5. Bloquear URL/dominio si el riesgo es claro.
6. Preservar headers.

## Pasos

1. Confirmar si el correo fue reportado por usuario o herramienta.
2. Revisar headers y autenticacion SPF/DKIM/DMARC.
3. Revisar URL sin abrirla directamente en maquina principal.
4. Verificar si otros usuarios recibieron el correo.
5. Bloquear remitente, dominio o URL si aplica.
6. Buscar clics o descargas.
7. Resetear credenciales si hubo captura.
8. Comunicar recomendacion a usuarios.

## Analisis

Revisa:

- SPF/DKIM/DMARC.
- dominio real de enlaces.
- diferencias entre From y Reply-To.
- adjuntos y tipo de archivo.
- urgencia o solicitud financiera.
- usuarios que hicieron clic.

## Contencion

- Bloquear URL.
- Retirar correo de buzones si la plataforma lo permite.
- Reset de credenciales.
- Revocar sesiones.
- Forzar MFA si aplica.

## Recuperacion

- Confirmar usuarios afectados.
- Resetear credenciales si hubo interaccion.
- Revisar reglas de correo.
- Monitorear logins posteriores.
- Comunicar cierre a usuarios.

## Reporte

Incluye:

- Tipo de phishing.
- Usuarios impactados.
- Evidencia.
- Acciones tomadas.
- Recomendaciones.

## Cierre

Puedes cerrar cuando:

- correo retirado o bloqueado;
- usuarios afectados identificados;
- clics/credenciales revisados;
- sesiones sospechosas revocadas;
- indicadores bloqueados;
- aprendizaje comunicado.
