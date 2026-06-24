# Fundamentos de Email Security

## Objetivo

Entender como funciona el correo y que controles ayudan a reducir phishing, spoofing y abuso.

El correo es una de las principales puertas de entrada a incidentes. Entender SPF, DKIM, DMARC y el flujo de mensajes ayuda a investigar phishing y reducir suplantacion.

## Mapa Mental

```text
dominio -> DNS -> servidor emisor -> autenticacion -> filtro -> buzon -> usuario
```

La pregunta clave:

```text
Este correo esta autorizado por el dominio que dice enviarlo?
```

## SMTP

SMTP es el protocolo usado para enviar correo.

El correo moderno tambien involucra:

- DNS.
- Servidores de envio.
- Servidores de recepcion.
- Filtros antispam.
- Autenticacion de dominio.

## Headers Basicos

En una investigacion revisa:

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

El correo fue diseñado en una epoca con menos controles de identidad. Por eso existen mecanismos para verificar si un correo realmente esta autorizado por un dominio.

## SPF

SPF define que servidores pueden enviar correo para un dominio.

Pregunta que responde:

```text
Esta IP autorizada para enviar correo de este dominio?
```

Limitacion: SPF valida el envelope sender, no siempre lo que el usuario ve en `From`.

## DKIM

DKIM firma correos con criptografia.

Pregunta que responde:

```text
El mensaje fue firmado por una llave asociada al dominio y no fue alterado?
```

DKIM ayuda a integridad y autenticidad del dominio firmante.

## DMARC

DMARC indica que hacer si SPF o DKIM fallan y genera reportes.

Politicas:

- `none`: monitorear.
- `quarantine`: enviar a spam/cuarentena.
- `reject`: rechazar.

DMARC tambien depende de alineacion: que el dominio autenticado coincida con el dominio visible o relacionado.

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
- filtros antiphishing.
- sandbox de adjuntos.
- rewriting o inspeccion de URLs.
- report button.
- entrenamiento.
- verificacion fuera de banda para pagos.
- bloqueo de macros.

## Practica Guiada

Elige un dominio publico y consulta registros TXT:

```bash
dig TXT example.com
```

Documenta:

- Si aparece SPF.
- Si entiendes la politica.
- Que dudas tienes.

## Mini Laboratorio: Revision de Dominio

Crea `revision-email-domain.md`:

1. Dominio revisado.
2. Registro SPF.
3. Registro DMARC.
4. Interpretacion.
5. Riesgos.
6. Recomendaciones.

No hagas pruebas intrusivas. Solo consulta DNS publico.

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
- Leer headers basicos y Authentication-Results.
