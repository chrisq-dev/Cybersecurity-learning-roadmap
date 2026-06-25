---
title: "Fundamentos de Correo Electrónico: El Sello de Cera Real"
---
# Fundamentos de Correo Electrónico: El Sello de Cera Real

## Objetivo del Módulo

Aprender la falla técnica más grande del internet antiguo, y cómo tres protocolos matemáticos intentan salvar el mundo corporativo.

En la Fase 21 (Ingeniería Social), aprendimos sobre el Phishing.
Pero la pregunta técnica que todo Ingeniero debe hacerse es: **¿Cómo es posible que un hacker pueda enviar un correo desde la dirección `facturacion@netflix.com` si el hacker no trabaja en Netflix?**

La respuesta es que el protocolo base del correo electrónico (SMTP), inventado en 1982, fue diseñado asumiendo que "nadie mentiría" en internet.

---

## 1. El Problema: Escribir en el Remitente

*   **La Analogía (El Correo Postal):** Toma un sobre en blanco. Mete un papel adentro. Toma una pluma y escribe en la esquina superior izquierda del sobre: *"Remitente: El Presidente de la Nación"*. Ponle un sello postal y entrégaselo al cartero.
*   **La Falla:** El cartero no tiene la autoridad ni la capacidad de verificar si el Presidente de la Nación realmente te dio permiso para escribir su nombre en ese sobre. El cartero simplemente lo entrega en el destino.
*   **En Informática:** Esto se llama *Email Spoofing* (Falsificación de Identidad). Un servidor de correo (El Cartero) de forma predeterminada no verifica si tú eres el dueño del dominio `netflix.com`. Simplemente obedece. Esto hizo que el Phishing corporativo se saliera de control.

Para arreglar esta falla masiva, la industria de Ciberseguridad no destruyó el sistema de correo antiguo, sino que le agregó tres capas de "Seguridad con Criptografía" encima: **SPF, DKIM y DMARC**.

---

## 2. Los Tres Guardianes del Dominio

Si tu empresa no tiene configurados estos tres protocolos, tus correos se irán a la bandeja de "Spam" automáticamente, y los hackers podrán enviar correos falsos fingiendo ser tu CEO.

### 1. SPF (Sender Policy Framework): La Lista de Carteros Autorizados
*   **La Analogía:** El CEO de la empresa pública una lista oficial pegada en la puerta que dice: *"Solamente Juan y María están autorizados para enviar cartas a mi nombre. Si reciben una carta de mi parte entregada por Pedro, es falsa"*.
*   **La Función:** SPF es un registro público en los servidores de internet (DNS). Le dice al mundo cuáles son las Direcciones IP específicas que la empresa Microsoft ha autorizado para que envíen correos desde `@microsoft.com`. Si llega un correo desde una IP en Rusia, el receptor mira la lista pública, ve que Rusia no está en la lista de Carteros Oficiales, y sospecha.

### 2. DKIM (DomainKeys Identified Mail): El Sello de Cera Real
SPF es bueno, pero las cartas pueden ser alteradas en el camino por un Hombre en el Medio (Visto en la Fase 22 con Wi-Fi).
*   **La Analogía:** El Rey sella el sobre con cera caliente y le pone su Anillo Real.
*   **La Función:** Usando Criptografía Asimétrica (Visto en la Fase 11), el servidor de tu empresa firma matemáticamente el correo *antes* de que salga a internet. El servidor receptor (Ej. Google o Yahoo) toma la firma matemática del correo y la verifica. Si alguien alteró una sola letra del correo en el tránsito, el sello matemático "se rompe" y la verificación falla espectacularmente. Demuestra integridad.

### 3. DMARC: El Ejecutor de Órdenes
Tengo la lista de carteros (SPF) y tengo el sello (DKIM). Pero, ¿Qué hago si una carta falla la prueba?
*   **La Función:** DMARC es la regla final de Gobierno (Fase 20) que el dueño del dominio pública para el mundo:
    1.  *Política "None":* "Si falla la prueba, déjalo pasar de todas formas" (Inútil).
    2.  *Política "Quarantine":* "Si falla la prueba, mándalo a la carpeta de SPAM del usuario".
    3.  *Política "Reject":* (El objetivo corporativo supremo): "Si el correo no tiene mi Sello DKIM y no viene de mi Cartero SPF... **Destrúyelo inmediatamente. No dejes que el usuario lo vea ni siquiera en su carpeta de SPAM**".

---

## 3. Criterio de Dominio (Autoevaluación)

Revisa si puedes blindar el correo corporativo:

1. Un hacker envía un correo altamente convincente a todos los empleados de tu empresa, pero la dirección del remitente es `ceo-tuempresa@gmail.com` en lugar de `@tuempresa.com`. ¿Por qué los protocolos SPF, DKIM y DMARC **no** sirven para detener absolutamente nada en este escenario de ataque específico? (Pista: Analiza a quién le pertenece el dominio "gmail.com").
2. Explica la falla fundamental de arquitectura que tiene el protocolo original SMTP (Simple Mail Transfer Protocol) y por qué se compara con "enviar una carta por correo postal sin que nadie verifique la identidad del remitente".
3. Durante una migración corporativa, la empresa contrata un nuevo servicio en la nube para enviar correos de marketing masivos (Ej. MailChimp). Al día siguiente, todos los correos de la empresa hacia los clientes empiezan a rebotar y a ser marcados como SPAM por Gmail. Sabiendo cómo funciona el protocolo **SPF**, ¿Qué paso crítico olvidó el equipo de IT de tu empresa y por qué Gmail rechazó los correos genuinos?
4. El equipo de Seguridad de la empresa ha configurado correctamente SPF y DKIM, pero configuraron el protocolo **DMARC** con la política `p=none`. Usando la analogía del "Ejecutor de Órdenes", ¿Por qué esta configuración deja a la empresa completamente vulnerable a los ataques de falsificación de identidad (Spoofing) a pesar de tener los candados puestos?
