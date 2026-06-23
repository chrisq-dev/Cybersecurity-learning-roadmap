# Phishing

## Objetivo

Aprender a analizar correos sospechosos y proponer controles.

## Que es Phishing

Phishing busca engañar a una persona para que:

- Entregue credenciales.
- Abra un adjunto.
- Visite una pagina falsa.
- Autorice un pago.
- Ejecute una accion insegura.

## Business Email Compromise

BEC ocurre cuando un atacante se hace pasar por una persona de confianza para lograr fraude o cambios financieros.

Ejemplos:

- Cambio de cuenta bancaria.
- Solicitud urgente de pago.
- Suplantacion de proveedor.
- Mensaje falso de directivo.

## Indicadores

- Remitente parecido pero no igual.
- Dominio sospechoso.
- Urgencia artificial.
- Errores de redaccion.
- Adjuntos inesperados.
- Links con dominios raros.
- Solicitud de credenciales.
- Cambio de cuenta o pago.

## Analisis Seguro

No abras enlaces ni adjuntos sospechosos en tu maquina principal.

Revisa:

- Remitente.
- Reply-To.
- Headers.
- URL real.
- Adjuntos.
- Contexto.
- SPF/DKIM/DMARC si tienes headers.

## Controles

- Filtros de correo.
- SPF/DKIM/DMARC.
- MFA.
- Report button.
- Concientizacion.
- Simulaciones controladas.
- Verificacion fuera de banda para pagos.
- Bloqueo de macros.
- Sandboxing de adjuntos.

## Practica

Analiza este correo ficticio:

```text
From: soporte@micros0ft-security.example
Subject: Cuenta bloqueada urgente
Body: Inicia sesion ahora para evitar cierre de cuenta: http://login-security.example
```

Responde:

- Que indicadores ves?
- Que riesgo existe?
- Que controles ayudan?
- Que recomendarias al usuario?

## Criterio de Dominio

Puedes avanzar cuando puedas:

- Identificar indicadores.
- Explicar BEC.
- Proponer controles.
- Escribir una recomendacion clara.
