# Fundamentos de Email Security

## Objetivo

Entender como funciona el correo y que controles ayudan a reducir phishing, spoofing y abuso.

El correo es una de las principales puertas de entrada a incidentes. Entender SPF, DKIM, DMARC y el flujo de mensajes ayuda a investigar phishing y reducir suplantacion.

## Mapa Mental

```text
dominio -> DNS -> servidor emisor -> autenticación -> filtro -> buzón -> usuario
```

La pregunta clave:

```text
Este correo está autorizado por el dominio qué dice enviarlo?
```

## SMTP

SMTP es el protocolo usado para enviar correo.

El correo moderno también involucra:

- DNS.
- Servidores de envio.
- Servidores de recepcion.
- Filtros antispam.
- Autenticación de dominio.

## Headers Básicos

En una investigación revisa:

- From;
- Reply-To;
- Return-Path;
- Received;
- Message-ID;
- Authentication-Results;
- SPF;
- DKIM;
- DMARC.

## Problema Principal

El correo fue diseñado en una época con menos controles de identidad. Por eso existen mecanismos para verificar si un correo realmente está autorizado por un dominio.

## SPF

SPF define que servidores pueden enviar correo para un dominio.

Pregunta que aclara:

```text
Esta IP autorizada para enviar correo de este dominio?
```

Limitacion: SPF valida el envelope sender, no siempre lo que el usuario ve en `From`.

## DKIM

DKIM firma correos con criptografia.

Pregunta que aclara:

```text
El mensaje fue firmado por una llave asociada al dominio y no fue alterado?
```

DKIM ayuda a integridad y autenticidad del dominio firmante.

## DMARC

DMARC indica que hacer si SPF o DKIM fallan y genera reportes.

Políticas:

- `none`: monitorear.
- `quarantine`: enviar a spam/cuarentena.
- `reject`: rechazar.

DMARC también depende de alineacion: que el dominio autenticado coincida con el dominio visible o relacionado.

## Riesgos Comunes

- Dominio sin SPF.
- Dominio sin DKIM.
- DMARC en `none` para siempre.
- Correos spoofeados.
- Usuarios sin entrenamiento.
- Adjuntos peligrosos.
- URLs acortadas o engañosas.

## Controles Complementarios

- MFA.
- Filtros antiphishing.
- Sandbox de adjuntos.
- Rewriting o inspeccion de URLs.
- Report button.
- Entrenamiento.
- Verificación fuera de banda para pagos.
- Bloqueo de macros.

## Observación Segura

Un dominio público permite observar registros TXT:

```bash
dig TXT example.com
```

Observa:

- Si aparece SPF.
- Si entiendes la política.
- Que dudas tienes.

## Criterios Para Revisar un Dominio

Una revisión básica de dominio debe considerar:

- Dominio revisado;
- Registro SPF;
- Registro DMARC;
- Interpretacion;
- Riesgos;
- Recomendaciones.

No hagas pruebas intrusivas. Solo consulta DNS público.

## Errores Comunes

- Pensar que SPF por si solo detiene phishing.
- Dejar DMARC en `none` para siempre.
- No revisar alineacion.
- Ignorar Reply-To.
- No entrenar a usuarios.
- No tener proceso de reporte.

## Criterio de Dominio

Puedes avanzar cuando puedas:

- Explicar SPF.
- Explicar DKIM.
- Explicar DMARC.
- Entender por que phishing usa correo.
- Leer headers básicos y Authentication-Results.
