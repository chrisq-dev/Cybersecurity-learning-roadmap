# Rubrica de Dominio

Esta rubrica sirve para decidir si realmente dominas un tema o si solo lo reconoces cuando lo lees. Usala antes de marcar avances en el checklist.

## Principio

No marques un tema como dominado por haberlo leido. Un tema esta dominado cuando puedes explicarlo, practicarlo, analizarlo, defenderlo y documentarlo con evidencia.

La evidencia vale mas que la sensacion de avance.

## Niveles

### Nivel 0: Lo He Escuchado

Puedes reconocer el termino, pero no explicarlo con claridad.

Ejemplo: sabes que existe "Kerberos", pero no puedes explicar para que sirve.

Accion:

- Leer introduccion.
- Crear definicion simple.
- Anotar 3 terminos relacionados.

### Nivel 1: Lo Puedo Explicar

Puedes explicarlo con tus palabras, sin depender de copiar una definicion.

Debes poder responder:

- Que es?
- Para que sirve?
- Donde aparece en sistemas reales?
- Que problema resuelve?

Ejemplo: explicas que DNS traduce nombres a direcciones IP y que se consulta antes de conectarte a muchos servicios.

### Nivel 2: Lo Puedo Practicar

Puedes usar comandos, herramientas o configuraciones basicas relacionadas con el tema.

Debes tener evidencia:

- Comandos ejecutados.
- Capturas o salidas relevantes.
- Notas de errores encontrados.
- Resultado esperado vs resultado real.

Ejemplo: usas `dig`, identificas registros A, MX y TXT, y explicas la diferencia.

### Nivel 3: Lo Puedo Analizar

Puedes interpretar informacion y detectar problemas comunes.

Debes poder:

- Leer logs o salidas de herramientas.
- Separar sintomas de causa probable.
- Identificar falsos positivos o contexto faltante.
- Explicar impacto de seguridad.

Ejemplo: revisas intentos fallidos de login y diferencias error normal, fuerza bruta y cuenta mal configurada.

### Nivel 4: Lo Puedo Defender o Corregir

Puedes proponer mitigaciones, controles y buenas practicas.

Debes poder explicar:

- Riesgo.
- Impacto.
- Control preventivo.
- Control detectivo.
- Validacion de que el arreglo funciona.

Ejemplo: ante SSH expuesto, propones llaves, desactivar root login, MFA si aplica, allowlist, logs y alertas.

### Nivel 5: Lo Puedo Ensenar o Documentar Profesionalmente

Puedes convertir el tema en una nota, reporte, lab o explicacion que otra persona pueda seguir.

Puede demostrarlo con:

- Resumen claro.
- Pasos reproducibles.
- Evidencia.
- Errores comunes.
- Remediacion.
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

Senales que lo demuestran:

Dudas pendientes:

Proxima practica:

## Como Usarla Con El Roadmap

- Para fundamentos, apunta minimo a Nivel 3.
- Para temas laborales importantes, apunta a Nivel 4.
- Para proyectos de portafolio, apunta a Nivel 5.
- Para temas secundarios, Nivel 2 puede ser suficiente al inicio.

No necesitas llevar todo a Nivel 5. La estrategia correcta es profundidad en temas clave y base suficiente en temas relacionados.

## Temas Que Merecen Nivel 5

- HTTP y sesiones.
- SQL Injection.
- XSS.
- Logs de autenticacion.
- Linux permisos y servicios.
- Active Directory conceptual.
- IAM cloud.
- Respuesta a incidentes.
- Comunicacion tecnica clara.
- Un proyecto completo de portafolio.

## Matriz de Evidencia

| Tipo de evidencia | Sirve para probar |
| --- | --- |
| Nota explicativa | Comprension conceptual |
| Comando con salida | Practica tecnica |
| Tabla de analisis | Capacidad de comparar y priorizar |
| Timeline | Investigacion |
| Checklist aplicado | Defensa o hardening |
| Reporte | Comunicacion profesional |
| Script simple | Automatizacion |
| Deteccion conceptual | Blue Team |
| Matriz de permisos | AppSec/API |
| Diagrama | Arquitectura y claridad |

## Rubrica de Reporte

| Criterio | Basico | Bueno | Fuerte |
| --- | --- | --- | --- |
| Alcance | Menciona el tema | Define sistema/lab | Define limites y supuestos |
| Evidencia | Pega salidas | Explica salidas | Relaciona evidencia con conclusion |
| Analisis | Opina | Identifica causa | Separa hechos, hipotesis e impacto |
| Remediacion | General | Accion concreta | Accion verificable y priorizada |
| Claridad | Incompleto | Comprensible | Reproducible por otra persona |

## Gates por Ruta

### Fundamentos

Antes de avanzar a temas complejos:

- explicar CIA, riesgo y controles;
- resolver subnetting basico;
- interpretar permisos Linux;
- explicar DNS, HTTP y TLS;
- crear un mini reporte de logs.

### Web/AppSec

Antes de decir que sabes AppSec:

- explicar authn vs authz;
- crear matriz de permisos;
- explicar SQLi, XSS, CSRF y SSRF;
- proponer mitigaciones;
- comunicar una revision OWASP con causa, impacto y mitigacion.

### Blue Team

Antes de decir que sabes Blue Team:

- reconstruir una linea de tiempo;
- separar evidencia de hipotesis;
- mapear un caso a MITRE;
- proponer contencion;
- escribir una deteccion conceptual.

### Cloud

Antes de decir que sabes cloud security:

- explicar responsabilidad compartida;
- revisar IAM conceptual;
- detectar storage publico como riesgo;
- proponer logs y alertas;
- justificar minimo privilegio.

## Regla de Repeticion

Un tema importante debe practicarse al menos tres veces:

1. una vez guiado;
2. una vez con variacion;
3. una vez documentado como si fuera para otra persona.
