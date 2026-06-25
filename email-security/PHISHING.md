# Phishing

## Objetivo

Aprender a analizar correos sospechosos y proponer controles.

Phishing no es solo "correos mal escritos". Muchos ataques son creibles, oportunos y adaptados al negocio. El objetivo es evaluar indicadores, contexto e impacto.

## Mapa Mental

```text
mensaje -> identidad -> enlace/adjunto -> intencion -> usuarios afectados -> contencion
```

## Qué es Phishing

Phishing busca engañar a una persona para que:

- Entregue credenciales.
- Abra un adjunto.
- Visite una página falsa.
- Autorice un pago.
- Ejecute una acción insegura.

## Business Email Compromise

BEC ocurre cuando un atacante se hace pasar por una persona de confianza para lograr fraude o cambios financieros.

Ejemplos:

- Cambio de cuenta bancaria.
- Solicitud urgente de pago.
- Suplantacion de proveedor.
- Mensaje falso de directivo.

## Tipos Comunes

- Credential phishing.
- Malware por adjunto.
- BEC.
- Smishing.
- QR phishing.
- Suplantacion de soporte.
- Falso proveedor.

## Indicadores

- Remitente parecido pero no igual.
- Dominio sospechoso.
- Urgencia artificial.
- Errores de redaccion.
- Adjuntos inesperados.
- Links con dominios raros.
- Solicitud de credenciales.
- Cambio de cuenta o pago.

## Indicadores Técnicos

- SPF/DKIM/DMARC fallidos.
- Reply-To distinto.
- Dominio recien creado.
- URL con subdominios engañosos.
- Adjunto con macros.
- Archivo comprimido con password.
- Acortadores.
- Login falso.

## Análisis Seguro

No abras enlaces ni adjuntos sospechosos en tu máquina principal.

Revisa:

- Remitente.
- Reply-To.
- Headers.
- URL real.
- Adjuntos.
- Contexto.
- SPF/DKIM/DMARC si tienes headers.

## Preguntas de Contexto

- El usuario esperaba este correo?
- El remitente es proveedor real?
- La solicitud tiene urgencia artificial?
- Pide saltar proceso normal?
- Pide pago, credenciales o MFA?
- Otros usuarios lo recibieron?

## Controles

- Filtros de correo.
- SPF/DKIM/DMARC.
- MFA.
- Report button.
- Concientizacion.
- Simulaciones controladas.
- Verificación fuera de banda para pagos.
- Bloqueo de macros.
- Sandboxing de adjuntos.

## Ejemplo de Análisis

Este correo ficticio muestra indicadores comunes de phishing:

```text
From: soporte@micros0ft-security.example
Subject: Cuenta bloqueada urgente
Body: Inicia sesion ahora para evitar cierre de cuenta: http://login-security.example
```

El análisis debe cubrir:

- Qué indicadores ves?
- Qué riesgo existe?
- Qué controles ayudan?
- Qué recomendarias al usuario?

## Criterios Para Analizar Phishing

Un análisis de phishing debe explicar:

- Resumen;
- Indicadores;
- Análisis de remitente;
- Análisis de URL o adjunto;
- Usuarios afectados si aplica;
- Contención;
- Recomendación al usuario;
- Controles preventivos.

## Errores Comunes

- Abrir adjuntos sospechosos.
- Culpar al usuario en vez de mejorar controles.
- No buscar otros destinatarios.
- No revisar clics o logins posteriores.
- No comunicar claramente.
- No convertir el caso en aprendizaje.

## Criterio de Dominio

Puedes avanzar cuando puedas:

- Identificar indicadores.
- Explicar BEC.
- Proponer controles.
- Escribir una recomendación clara.
- Hacer un reporte de phishing con evidencia y contención.
