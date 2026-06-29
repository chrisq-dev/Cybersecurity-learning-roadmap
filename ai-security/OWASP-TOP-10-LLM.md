---
title: "OWASP Top 10 para LLMs: Hackeando el Lenguaje"
level: "inicial"
content_type: "guia"
updated: "2026-06-29"
reviewed: "2026-06-28"
reviewed_against: "OWASP Top 10 for LLM Applications 2025 y OWASP GenAI Security Project 2026"
official_sources:
  - title: "OWASP — Top 10 for LLM Applications 2025"
    url: "https://genai.owasp.org/llm-top-10/"
  - title: "OWASP — Top 10 for Agentic Applications"
    url: "https://genai.owasp.org/2025/12/09/owasp-genai-security-project-releases-top-10-risks-and-mitigations-for-agentic-ai-security/"
  - title: "NIST — AI Risk Management Framework"
    url: "https://www.nist.gov/itl/ai-risk-management-framework"
---
# OWASP Top 10 para LLMs: Hackeando el Lenguaje

## Objetivo de esta Guía

El OWASP Top 10 para LLMs es uno de los recursos más prácticos para cualquier profesional que trabaje con IA en una empresa. Esta guía explora las vulnerabilidades más críticas y modernas que afectan a las aplicaciones basadas en Inteligencia Artificial, según el estándar del proyecto OWASP para LLMs.

Cuando hablamos de "hackear una IA", no hablamos de romper criptografía o explotar un desbordamiento de búfer. Hablamos de engañar psicológicamente a un modelo de lenguaje, envenenar sus fuentes de datos o aprovechar los permisos excesivos que un desarrollador le otorgó de forma imprudente. A continuación, desglosaremos los principales ataques que todo profesional de ciberseguridad debe conocer hoy.

**Por qué esto importa:** Si tu empresa está conectando un LLM a su base de datos (y lo está haciendo o lo va a hacer pronto), este top 10 es tu checklist de seguridad. Ignorarlo es como tener un servidor web sin firewall.

---

## Lista Vigente: OWASP Top 10 para Aplicaciones LLM 2025

Esta clasificación sigue siendo la referencia de OWASP para aplicaciones LLM en 2026. OWASP también publica una lista separada para aplicaciones agénticas; no deben mezclarse sus identificadores.

### LLM01:2025 Prompt Injection

Una entrada directa o indirecta altera el comportamiento del modelo de forma no prevista. RAG y fine-tuning no eliminan el riesgo. Los controles deterministas, la separación de datos e instrucciones, el mínimo privilegio y la confirmación de acciones reducen el impacto.

### LLM02:2025 Sensitive Information Disclosure

El modelo o la aplicación revela datos personales, secretos, información privada de entrenamiento o contexto de otros usuarios. Se deben minimizar datos, aplicar controles de acceso fuera del modelo, redactar información sensible y revisar salidas.

### LLM03:2025 Supply Chain

Modelos, datasets, adaptadores, paquetes, plantillas y servicios externos pueden estar manipulados o ser vulnerables. Se necesita inventario, procedencia, verificación de integridad, evaluación de proveedores y monitoreo de dependencias.

### LLM04:2025 Data and Model Poisoning

Datos de preentrenamiento, ajuste, evaluación o embeddings son manipulados para introducir sesgos, puertas traseras o comportamientos controlados. La mitigación exige procedencia, validación, separación de funciones y pruebas antes del despliegue.

### LLM05:2025 Improper Output Handling

La salida del modelo se trata como contenido confiable y llega sin validación a navegadores, bases de datos, shells o herramientas. Toda salida debe considerarse no confiable y validarse según el intérprete de destino.

### LLM06:2025 Excessive Agency

El sistema concede al modelo herramientas, permisos o autonomía mayores de los necesarios. Deben limitarse capacidades, identidad, alcance, número de acciones y efectos; las operaciones sensibles requieren autorización y confirmación independientes.

### LLM07:2025 System Prompt Leakage

El prompt de sistema puede ser revelado. No debe contener secretos ni funcionar como control de autorización. Las reglas críticas deben aplicarse en código o infraestructura determinista fuera del modelo.

### LLM08:2025 Vector and Embedding Weaknesses

Un sistema RAG puede mezclar tenants, recuperar contenido no autorizado o indexar datos manipulados. Se requieren permisos durante recuperación, aislamiento, validación de fuentes y protección del almacén vectorial.

### LLM09:2025 Misinformation

El modelo genera información falsa o no sustentada que puede provocar decisiones incorrectas. Se deben comunicar límites, proporcionar trazabilidad, verificar afirmaciones críticas y mantener supervisión humana proporcional al impacto.

### LLM10:2025 Unbounded Consumption

Solicitudes sin límites pueden causar denegación de servicio, consumo económico, degradación o extracción funcional del modelo. Se mitiga con cuotas, límites de entrada y salida, timeouts, presupuestos, monitoreo y degradación controlada.

## Aplicaciones Agénticas en 2026

OWASP publicó una clasificación independiente para aplicaciones agénticas. Esta amplía el análisis hacia identidad de agentes, uso de herramientas, ejecución inesperada, memoria y cadenas de suministro agénticas. Una aplicación que permite al modelo planificar y ejecutar acciones debe consultar ambas clasificaciones.

## 7. El Ángulo del Hacker: Cómo Armar un Ataque Completo

Pongamos todo junto. Si yo quisiera atacar una empresa que usa un LLM, haría esto:

### Paso 1: Reconocimiento del Sistema
Busco entender qué modelo usan, qué plugins tiene, y qué datos puede acceder. Pregunto cosas inocentes como "¿Qué plugins tienes disponibles?" o "¿A qué sistemas estás conectado?"

### Paso 2: Inyección por Cadena de Suministro
Si el modelo usa plugins de terceros, busco uno vulnerable. Por ejemplo, un plugin de cálculo matemático que no valida inputs.

### Paso 3: Envenenamiento de Contexto
Si el modelo tiene acceso a documentos compartidos, subo un documento con instrucciones ocultas de prompt injection.

### Paso 4: Ataque de Agencia
Una vez que el modelo ejecuta mis instrucciones, uso los permisos excesivos para exfiltrar datos. Si tiene acceso a la API de correo, le pido que me mande un email con datos sensibles.

### Paso 5: Borrado de Huellas
Le pido al modelo que borre los logs de mi interacción y que confirme que la operación fue exitosa.

Todo esto sin escribir una sola línea de código malicioso. Solo hablando.

---

## Criterio de Dominio (Autoevaluación)

1. Estás diseñando un bot de Slack corporativo que usa IA para leer y resumir los tickets de soporte. ¿Qué vulnerabilidad estarías introduciendo si le das a la IA acceso con la cuenta de administrador general de la base de datos de tickets?

2. Un atacante esconde instrucciones maliciosas en un archivo PDF para que, cuando el Asistente Virtual de Recursos Humanos lo lea, cambie el número de cuenta bancaria del empleado. ¿De qué tipo específico de Inyección de Prompt estamos hablando?

3. Explica por qué el "Data Poisoning" es una vulnerabilidad que afecta directamente la etapa de diseño y entrenamiento, a diferencia del Prompt Injection que afecta la etapa de interacción con el usuario.

4. Una empresa implementa un asistente de IA con capacidad de ejecutar comandos en la base de datos. El desarrollador le da permisos de "lectura y escritura" para que pueda actualizar registros. ¿Qué principio de seguridad se está violando y cómo podría explotarlo un atacante mediante prompt injection?

5. Un competidor quiere replicar el modelo de lenguaje de tu empresa sin pagar por el entrenamiento. Describe dos técnicas que podría usar y cómo mitigarlas.

6. Durante una auditoría de seguridad, descubres que el equipo de desarrollo descargó un modelo open-source de internet sin verificar su origen. ¿Qué riesgos específicos introduces al no auditar la cadena de suministro del modelo?

---
