# Playbook: Phishing

## Objetivo

Investigar y contener un correo sospechoso.

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

## Pasos

1. Confirmar si el correo fue reportado por usuario o herramienta.
2. Revisar headers y autenticacion SPF/DKIM/DMARC.
3. Revisar URL sin abrirla directamente en maquina principal.
4. Verificar si otros usuarios recibieron el correo.
5. Bloquear remitente, dominio o URL si aplica.
6. Buscar clics o descargas.
7. Resetear credenciales si hubo captura.
8. Comunicar recomendacion a usuarios.

## Contencion

- Bloquear URL.
- Retirar correo de buzones si la plataforma lo permite.
- Reset de credenciales.
- Revocar sesiones.
- Forzar MFA si aplica.

## Reporte

Incluye:

- Tipo de phishing.
- Usuarios impactados.
- Evidencia.
- Acciones tomadas.
- Recomendaciones.
