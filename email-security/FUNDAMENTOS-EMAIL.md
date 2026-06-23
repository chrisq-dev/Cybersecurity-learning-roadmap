# Fundamentos de Email Security

## Objetivo

Entender como funciona el correo y que controles ayudan a reducir phishing, spoofing y abuso.

## SMTP

SMTP es el protocolo usado para enviar correo.

El correo moderno tambien involucra:

- DNS.
- Servidores de envio.
- Servidores de recepcion.
- Filtros antispam.
- Autenticacion de dominio.

## Problema Principal

El correo fue diseñado en una epoca con menos controles de identidad. Por eso existen mecanismos para verificar si un correo realmente esta autorizado por un dominio.

## SPF

SPF define que servidores pueden enviar correo para un dominio.

Pregunta que responde:

```text
Esta IP autorizada para enviar correo de este dominio?
```

## DKIM

DKIM firma correos con criptografia.

Pregunta que responde:

```text
El mensaje fue firmado por una llave asociada al dominio y no fue alterado?
```

## DMARC

DMARC indica que hacer si SPF o DKIM fallan y genera reportes.

Politicas:

- `none`: monitorear.
- `quarantine`: enviar a spam/cuarentena.
- `reject`: rechazar.

## Riesgos Comunes

- Dominio sin SPF.
- Dominio sin DKIM.
- DMARC en `none` para siempre.
- Correos spoofeados.
- Usuarios sin entrenamiento.
- Adjuntos peligrosos.
- URLs acortadas o engañosas.

## Practica

Elige un dominio publico y consulta registros TXT:

```bash
dig TXT example.com
```

Documenta:

- Si aparece SPF.
- Si entiendes la politica.
- Que dudas tienes.

## Criterio de Dominio

Puedes avanzar cuando puedas:

- Explicar SPF.
- Explicar DKIM.
- Explicar DMARC.
- Entender por que phishing usa correo.
