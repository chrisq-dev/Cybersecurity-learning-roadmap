# Playbook: Phishing

## Objetivo

Investigar y contener un correo sospechoso.

## Severidad Inicial

Sube severidad si:

- Varios usuarios recibieron el correo;
- Alguien hizo clic;
- Hubo captura de credenciales;
- Hay adjunto malicioso;
- Involucra pagos o BEC;
- Suplanta a directivo o proveedor crítico.

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
3. Evitar abrir links o adjuntos en máquina principal.
4. Buscar si otros usuarios lo recibieron.
5. Bloquear URL/dominio si el riesgo es claro.
6. Preservar headers.

## Pasos

1. Confirmar si el correo fue reportado por usuario o herramienta.
2. Revisar headers y autenticación SPF/DKIM/DMARC.
3. Revisar URL sin abrirla directamente en máquina principal.
4. Verificar si otros usuarios recibieron el correo.
5. Bloquear remitente, dominio o URL si aplica.
6. Buscar clics o descargas.
7. Resetear credenciales si hubo captura.
8. Comunicar recomendación a usuarios.

## Análisis

Revisa:

- SPF/DKIM/DMARC.
- Dominio real de enlaces.
- Diferencias entre From y Reply-To.
- Adjuntos y tipo de archivo.
- Urgencia o solicitud financiera.
- Usuarios que hicieron clic.

## Contención

- Bloquear URL.
- Retirar correo de buzones si la plataforma lo permite.
- Reset de credenciales.
- Revocar sesiones.
- Forzar MFA si aplica.

## Recuperación

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

- Correo retirado o bloqueado;
- Usuarios afectados identificados;
- Clics/credenciales revisados;
- Sesiones sospechosas revocadas;
- Indicadores bloqueados;
- Aprendizaje comunicado.
