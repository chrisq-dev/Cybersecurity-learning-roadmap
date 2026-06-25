---
title: "Proyectos y Portafolio: El Arquitecto vs El Albañil"
---
# Proyectos y Portafolio: El Arquitecto vs El Albañil

## Objetivo del Módulo

Aprender a romper la paradoja de *"No me contratan porque no tengo experiencia, y no tengo experiencia porque no me contratan"*.

En Recursos Humanos hay un secreto a voces: Un candidato que ha leído 100 libros sobre cómo funciona un SIEM (El Arquitecto Teórico) siempre perderá la entrevista técnica contra el candidato que instaló un SIEM gratuito en una computadora vieja en su casa y lo rompió intentando configurarlo (El Albañil Práctico).
**La experiencia no se obtiene solo en un trabajo pagado. La experiencia se construye en el laboratorio de tu casa.**

---

## 1. El Laboratorio Casero (Home Lab)

Un "Home Lab" es tu currículum vivo. Es la demostración física de que la Ciberseguridad no es solo un pasatiempo teórico para ti.

### ¿Qué necesitas?
No necesitas comprar servidores de $5,000 dólares.
*   Una computadora personal con 16GB de RAM.
*   VirtualBox o VMware Player (Gratis).
*   Una cuenta en AWS, Azure o Google Cloud (Tienen capas gratuitas o "Free Tiers").

### Proyecto Nivel 1: El Radar del SOC (Blue Team)
*   **La Tarea:** Instala una Máquina Virtual con Ubuntu Linux (Fase 3). Instala un software de SIEM de código abierto como **Wazuh** o **Splunk** (Versión gratuita).
*   **La Acción:** Conecta la laptop de tu hermano menor al SIEM. Configura reglas para que te llegue una alerta a tu celular cada vez que tu hermano falle 5 veces seguidas la contraseña de Windows.
*   **El Impacto en Entrevista:** Cuando el CISO te pregunte si tienes experiencia, le responderás: *"No he trabajado en una empresa, pero en mi casa administro un SIEM que ingiere logs en tiempo real y detecta ataques de fuerza bruta usando reglas personalizadas"*. Estás contratado.

### Proyecto Nivel 2: La Nube Cifrada (Arquitectura)
*   **La Tarea:** Crea una cuenta gratuita en AWS (Fase 10). Crea una Máquina Virtual (EC2) y expón una página web básica a Internet.
*   **La Acción:** Configura un Firewall Perimetral (Security Group) para que solo tú puedas conectarte por SSH. Configura un Balanceador de Carga y un Certificado SSL para forzar HTTPS (Fase 11).
*   **El Impacto en Entrevista:** Demuestras que sabes desplegar infraestructura segura en la Nube aplicando "Defensa en Profundidad" (Fase 23).

---

## 2. Documentación Pública (GitHub)

Hacer el laboratorio en tu casa no sirve de nada si el Reclutador no puede verlo.
*   **El Repositorio:** Crea una cuenta de GitHub. Por cada proyecto que hagas en tu Home Lab, escribe un artículo en Markdown explicando el problema, los pasos que seguiste y capturas de pantalla del resultado.
*   **El Pitch:** Pon el enlace de tu GitHub hasta arriba en tu CV (Fase 24). Recursos Humanos probablemente no lo lea, pero cuando tu CV llegue al Director Técnico (CISO), él hará clic en el enlace, verá tus capturas de pantalla de Splunk y sabrá que eres material de élite.

---

## 3. Criterio de Dominio (Autoevaluación)

Revisa si tu portafolio está listo para el mundo real:

1. El concepto de "Home Lab" (Laboratorio Casero) rompe la paradoja de la experiencia laboral. Utilizando la analogía del "Arquitecto Teórico vs el Albañil Práctico", explica por qué un Director Técnico valorará más a un candidato con un repositorio de GitHub lleno de capturas de pantalla de servidores configurados en su casa, que a un candidato con 3 certificaciones teóricas sin experiencia práctica.
2. Un estudiante decide hacer un proyecto instalando un software EDR (Fase 14) en la computadora de su familia. Si el estudiante omite publicar este proceso en un "Repositorio de GitHub", ¿Por qué este esfuerzo será financieramente inútil al momento de buscar empleo?
3. En el Proyecto Nivel 1 (El Radar del SOC), el estudiante configura una alerta para intentos fallidos de contraseña. Explica cómo este proyecto casero demuestra entendimiento directo de la **Fase 15 (Gestión de Identidades - IAM)** y la detección de ataques de Fuerza Bruta.
4. Un reclutador técnico (CISO) entra a tu perfil de LinkedIn y ve una publicación donde relatas cómo intentaste configurar un Firewall en tu cuenta gratuita de AWS, pero cometiste un error y perdiste acceso a tu propio servidor durante 3 horas antes de poder arreglarlo. ¿Por qué documentar y publicar tus **fracasos técnicos** en un Home Lab te hace un candidato mucho más atractivo para las empresas que alguien que finge saberlo todo?
