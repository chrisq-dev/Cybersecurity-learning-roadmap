# Rubrica de Dominio

Esta rubrica sirve para decidir si realmente dominas un tema o si solo lo reconoces cuando lo lees. Usala antes de marcar avances en el checklist.

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

Debes producir:

- Resumen claro.
- Pasos reproducibles.
- Evidencia.
- Errores comunes.
- Remediacion.
- Preguntas de repaso.

Este es el nivel ideal para temas importantes del portafolio.

## Checklist Por Tema

Copia esto al final de tus notas cuando estudies un tema:

```md
## Dominio del Tema

- [ ] Nivel 1: Lo puedo explicar.
- [ ] Nivel 2: Lo puedo practicar.
- [ ] Nivel 3: Lo puedo analizar.
- [ ] Nivel 4: Lo puedo defender o corregir.
- [ ] Nivel 5: Lo puedo documentar profesionalmente.

Evidencia:

Dudas pendientes:

Proxima practica:
```

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
- Reportes tecnicos.
- Un proyecto completo de portafolio.

