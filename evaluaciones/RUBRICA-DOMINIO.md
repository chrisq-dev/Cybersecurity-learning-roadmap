# Rúbrica de Dominio

Esta rúbrica sirve para decidir si realmente dominas un tema o si solo lo reconoces cuando lo lees. Usala antes de marcar avances en el checklist.

## Principio

No marques un tema como dominado por haberlo leido. Un tema está dominado cuando puedes explicarlo, practicarlo, analizarlo, defenderlo y documentarlo con evidencia.

La evidencia vale más que la sensacion de avance.

## Niveles

### Nivel 0: Lo He Escuchado

Puedes reconocer el termino, pero no explicarlo con claridad.

Ejemplo: sabes que existe "Kerberos", pero no puedes explicar para que sirve.

Acción:

- Leer introducción.
- Crear definicion simple.
- Anotar 3 terminos relacionados.

### Nivel 1: Lo Puedo Explicar

Puedes explicarlo con tus palabras, sin depender de copiar una definicion.

Debes poder responder:

- Qué es?
- Para qué sirve?
- Dónde aparece en sistemas reales?
- Qué problema resuelve?

Ejemplo: explicas que DNS traduce nombres a direcciones IP y que se consulta antes de conectarte a muchos servicios.

### Nivel 2: Lo Puedo Practicar

Puedes usar comandos, herramientas o configuraciones básicas relacionadas con el tema.

Debes tener evidencia:

- Comandos ejecutados.
- Capturas o salidas relevantes.
- Notas de errores encontrados.
- Resultado esperado vs resultado real.

Ejemplo: usas `dig`, identificas registros A, MX y TXT, y explicas la diferencia.

### Nivel 3: Lo Puedo Analizar

Puedes interpretar información y detectar problemas comunes.

Debes poder:

- Leer logs o salidas de herramientas.
- Separar sintomas de causa probable.
- Identificar falsos positivos o contexto faltante.
- Explicar impacto de seguridad.

Ejemplo: revisas intentos fallidos de login y diferencias error normal, fuerza bruta y cuenta mal configurada.

### Nivel 4: Lo Puedo Defender o Corregir

Puedes proponer mitigaciones, controles y buenas prácticas.

Debes poder explicar:

- Riesgo.
- Impacto.
- Control preventivo.
- Control detectivo.
- Validación de que el arreglo funciona.

Ejemplo: ante SSH expuesto, propones llaves, desactivar root login, MFA si aplica, allowlist, logs y alertas.

### Nivel 5: Lo Puedo Ensenar o Documentar Profesionalmente

Puedes convertir el tema en una nota, reporte, lab o explicación que otra persona pueda seguir.

Puede demostrarlo con:

- Resumen claro.
- Pasos reproducibles.
- Evidencia.
- Errores comunes.
- Remediación.
- Preguntas de repaso.

Este es el nivel ideal para temas importantes del portafolio.

## Checklist Por Tema

Una forma de evaluar dominio es revisar estos niveles:

## Dominio del Tema

- Nivel 1: lo puedo explicar.
- Nivel 2: lo puedo practicar.
- Nivel 3: lo puedo analizar.
- Nivel 4: lo puedo defender o corregir.
- Nivel 5: lo puedo documentar profesionalmente.

Señales que lo demuestran:

Dudas pendientes:

Próxima práctica:

## Cómo Usarla Con El Roadmap

- Para fundamentos, apunta mínimo a Nivel 3.
- Para temas laborales importantes, apunta a Nivel 4.
- Para proyectos de portafolio, apunta a Nivel 5.
- Para temas secundarios, Nivel 2 puede ser suficiente al inicio.

No necesitas llevar todo a Nivel 5. La estrategia correcta es profundidad en temas clave y base suficiente en temas relacionados.

## Temas Que Merecen Nivel 5

- HTTP y sesiones.
- SQL Injection.
- XSS.
- Logs de autenticación.
- Linux permisos y servicios.
- Active Directory conceptual.
- IAM cloud.
- Respuesta a incidentes.
- Comunicación técnica clara.
- Un proyecto completo de portafolio.

## Matriz de Evidencia

| Tipo de evidencia | Sirve para probar |
| --- | --- |
| Nota explicativa | Comprensión conceptual |
| Comando con salida | Práctica técnica |
| Tabla de análisis | Capacidad de comparar y priorizar |
| Timeline | Investigación |
| Checklist aplicado | Defensa o hardening |
| Reporte | Comunicación profesional |
| Script simple | Automatización |
| Detección conceptual | Blue Team |
| Matriz de permisos | AppSec/API |
| Diagrama | Arquitectura y claridad |

## Rúbrica de Reporte

| Criterio | Básico | Bueno | Fuerte |
| --- | --- | --- | --- |
| Alcance | Menciona el tema | Define sistema/lab | Define límites y supuestos |
| Evidencia | Pega salidas | Explica salidas | Relaciona evidencia con conclusión |
| Análisis | Opina | Identifica causa | Separa hechos, hipótesis e impacto |
| Remediación | General | Acción concreta | Acción verificable y priorizada |
| Claridad | Incompleto | Comprensible | Reproducible por otra persona |

## Gates por Ruta

### Fundamentos

Antes de avanzar a temas complejos:

- Explicar CIA, riesgo y controles;
- Resolver subnetting básico;
- Interpretar permisos Linux;
- Explicar DNS, HTTP y TLS;
- Crear un mini reporte de logs.

### Web/AppSec

Antes de decir que sabes AppSec:

- Explicar authn vs authz;
- Crear matriz de permisos;
- Explicar SQLi, XSS, CSRF y SSRF;
- Proponer mitigaciones;
- Comunicar una revisión OWASP con causa, impacto y mitigacion.

### Blue Team

Antes de decir que sabes Blue Team:

- Reconstruir una linea de tiempo;
- Separar evidencia de hipótesis;
- Mapear un caso a MITRE;
- Proponer contención;
- Escribir una detección conceptual.

### Cloud

Antes de decir que sabes cloud security:

- Explicar responsabilidad compartida;
- Revisar IAM conceptual;
- Detectar storage público como riesgo;
- Proponer logs y alertas;
- Justificar mínimo privilegio.

## Regla de Repeticion

Un tema importante debe practicarse al menos tres veces:

1. Una vez guiado;
2. Una vez con variacion;
3. Una vez documentado como si fuera para otra persona.
