---
title: "Cadena de Custodia: El Rastro Inquebrantable"
level: "avanzado"
content_type: "guia"
updated: "2026-06-29"
---

# Cadena de Custodia: El Rastro Inquebrantable

## Objetivo de esta Guía

Aprender como documentar cada paso de la evidencia digital para que el caso sobreviva al tribunal.

el forensic informático no es solo extraer datos. Es asegurar que esos datos sean aceptados como prueba en un juicio. Y La Cadena de Custodia es el proceso que documenta cada manipulación, transferencia, y análisis de la evidencia. Sin una cadena de custodia impecable, la evidencia es inadmisible. No importa si encontraste 10TB de evidencia comprometedora o los correos del fraude financiero: si la cadena se rompe, el fiscal pierde, el acusado gana.

No. Es lo que separa un caso ganado de uno perdido.

## La Analogía: La Bolsa de Pruebas de la Escena del Crimen

La policía encuentra una pistola. No la tocan con las manos. Usan guantes. La meten en una bolsa sellada, la etiquetan: fecha, hora, oficial, número de caso, contenido. Esa bolsa viaja al laboratorio con un recibo de transferencia. El técnico abre la bolsa, la examina, la re-sella. Cada paso queda documentado.

La evidencia digital no es diferente. El archivo no se distingue de la pistola. el principio es exactamente el mismo: si no hay registro de que nadie la tocó, para el juez no existe.

## Principios Fundamentales

Estos cuatro principios son el piso. Si falla uno, la defensa te destruye en el estrado. No es solo teoría, es lo que te van a preguntar.

### Integridad

La evidencia no debe modificarse. En lo digital, esto significa:
- Hash criptográfico (SHA-256) de la evidencia original.
- Verificar el hash antes y después de cada operación.
- Cualquier cambio en el hash indica alteración.

### Autenticidad

La evidencia debe ser exactamente lo que se recolecto. No puede ser fabricada o modificada después de la recolección.

### Reproducibilidad

Cada paso debe ser documentado para que otro perito pueda repetir exactamente el mismo proceso y obtener el mismo resultado.

### Preservación

La evidencia debe mantenerse en un estado que evite deterioro o alteración accidental.

## El Registro de Cadena de Custodia

### Elementos de Cada Entrada

- ID único de evidencia
- Descripción detallada
- Hash (SHA-256 u otro) — por qué esto importa: es la única forma de demostrar que la evidencia no cambio
- Fecha y hora (UTC, sincronizada con NTP)
- Nombre y firma de quien entrega
- Nombre y firma de quien recibe
- Propósito de la transferencia
- Método de transferencia (USB cifrado, red, etc.)
- Número de caso

### Plantilla Básica

```
ItemID: EVID-001
Descripcion: imagen forense SSD Samsung 1TB
Hash Original (SHA-256): a3f5b8c1...
Fecha Recoleccion: 2025-03-15 14:30 UTC
Recolector: Juan Perez, Perito Forense
Entregado a: Maria Garcia, Analista Lab
Fecha Entrega: 2025-03-15 16:00 UTC
Proposito: Analisis de volumenes
Hash Verificacion: a3f5b8c1... [COINCIDE]
```

## Fases del Proceso

Cada fase tiene su riesgo. pasa si salteas un paso? El abogado defensor lo va a notar. Y no necesita probar que alteraste algo, solo mostrar que pudiste haberlo hecho.

### Identificación

Identificar que dispositivos contienen evidencia. Esto incluye equipos encendidos, apagados, en reposo, móviles, NAS, cloud.

Decisiones en esta fase:
- Apagar o no apagar (depende del estado del sistema).
- Extraer en vivo o hacer imagen.
- Que puertos conectar, que no.

### Recolección

aquí hay un error que se ve todo el tiempo: alguien hace "copiar y pegar" los archivos y cree que ya tiene la evidencia. No.

Crear una imagen forense bit a bit del dispositivo. No copiar archivos: la copia de archivos no preserva metadatos, espacio no asignado, ni archivos eliminados.

Herramientas de imagen: `dcfldd` (Linux), FTK Imager (Windows), Guymager (Linux), `dd` con hashing.

La imagen se guarda en un dispositivo de almacenamiento forense (limpio, formateado, con hash verificado antes de usar).

### Transporte

La evidencia física se transporta en bolsas anti-estática, en un contenedor sellado, con registro de temperatura si es necesario.

La evidencia digital viaja en discos cifrados con bitlocker o LUKS, registrando cada transferencia.

### Almacenamiento

Evidencia en armario con acceso restringido, con registro de entrada/salida, cámaras, y control de temperatura.

Para evidencia digital: almacenamiento en discos dedicados, en repositorio de acceso controlado, con logs de acceso.

### Análisis

Cada vez que se accede a la imagen, se registra: quien, cuando, que herramienta, que se busco, que se encontró.

Resultados parciales se documentan. El análisis debe ser reproducible por otro perito.

### Presentación

Informe final que incluye: resumen, metodología, hallazgos, cadenas de custodia, hashes, herramientas, fechas.

## Herramientas Recomendadas

No es lo mismo. `dd` te hace la copia. `dcfldd` te hace la copia Y te calcula el hash mientras copia. Usa las herramientas correctas.

### Para Creación de Imagen

`dcfldd` con hashing integrado. `guymager` con interfaz gráfica. `FTK Imager` para Windows. `dd` con `tee` para hashing.

### Para Documentación

Guías oficiales NIST SP 800-86, ISO 27037. Plantillas de cadena de custodia en Excel/CSV con control de versiones.

### Para Verificación

Hash verificador SHA-256 integrado. Checksums MD5 adicional por redundancia.

## Tipos de Evidencia Digital

Por qué esto importa: saber si un dato es volátil o no determina que agarras primero cuando entras a la escena. Si apagas el equipo antes de capturar la RAM, esa evidencia se fue para siempre.

### Volátil

Registros en memoria RAM, caché CPU, tabla de procesos. Desaparece al apagar. Debe recolectarse en vivo.

### No Volátil

Discos duros, SSD, USB, SD cards, discos ópticos. Persiste sin energía.

### Semi-Volátil

Estado del sistema, archivos temporales, hiberfil, pagefile. Se pierde con el tiempo.

### Evidencia de Red

Logs de firewall, IDS, servidores DHCP, DNS. Volátil en memoria, persistente en logs.

## Errores Comunes que Rompen la Cadena

Estos errores los comete todo el mundo al principio, incluso peritos con experiencia. La clave es conocerlos para no caer.

### Error 1: Trabajar sobre el Original

Nunca analizar el disco original. Siempre hacer una imagen forense y trabajar sobre la copia.

### Error 2: No Documentar Inmediatamente

Esperar "después" para documentar. Se olvidan detalles cruciales. Documentar en el momento.

### Error 3: Almacenamiento Inseguro

Evidencia en escritorio de PC compartida. Cualquier persona puede modificar. Debe estar en repositorio controlado.

### Error 4: Usar Herramientas sin Verificar

Herramienta forense con bug modifica evidencia. Verificar que las herramientas sean forenses (no alteran datos originales).

### Error 5: No Sincronizar Hora

Reloj del sistema incorrecto. La evidencia de tiempo es clave para la línea de tiempo. Todos los sistemas deben sincronizar con NTP.

### Error 6: Confundir Cadena Física y Digital

La cadena de custodia aplica a ambos mundos. El disco físico tiene una cadena, la imagen digital tiene otra. Deben enlazarse.

### Error 7: Transferencias sin Verificación

Pasar evidencia de mano no documentada. Cada entrega debe registrarse y verificarse.

## Formas de Falla

la mayoría de las fallas no son técnicas. Son de procedimiento. Y el problema es que no te das cuenta hasta que estas en el estrado.

Confiar en que nadie impugnará la cadena: La defensa siempre impugnará la cadena. Preparar para el peor escenario.

Procedimiento oral no escrito: "Siempre hacemos así" no sirve en el estrado.

Jefe de IT como perito: El jefe quiere ayudar pero no conoce protocolos. Mezcla roles: investigador y custodio.

Evidencia abierta "solo para ver": Cada apertura cuenta. Siempre trabajar sobre imagen.

No preparar al testigo perito: El perito debe explicar la cadena en términos simples al juez.

aquí va un caso real para que veas que no es joda.

### Caso Real: Casey Anthony (2011)

La defensa impugno exitosamente evidencia digital porque los oficiales no documentaron correctamente la cadena de custodia de los dispositivos. La evidencia de búsquedas en internet "muerte" fue cuestionada por falta de integridad en la recolección.

### Caso Real: Silk Road (2013-2015)

El FBI clono el servidor de Silk Road en Islandia sin orden judicial. Aunque tenían evidencia sólida, la defensa impugno la cadena de custodia de los discos. El caso dependió de testimonios de peritos sobre la integridad de las imágenes forenses.

## El Ángulo del Hacker

aquí cambia la perspectiva. No solo tienes que proteger la evidencia, tienes que anticipar como te la van a atacar.

### Como se Impugna una Cadena de Custodia

Demostrar que la evidencia pudo haber sido alterada. No se necesita probar alteración, solo posibilidad.

Errores comunes que los abogados buscaran:
- Periodo sin documentación.
- Persona no autorizada accedió al repositorio.
- Hash no coincide.
- Almacenamiento incorrecto.

### Ataques a la Cadena

Destruir evidencia física (golpear disco). Modificar metadatos. Inyectar evidencia falsa antes de la recolección.

El atacante sofisticado:
1. Sabe que va a ser investigado.
2. Planta evidencia falsa antes.
3. Deja logs que apuntan a otro sospechoso.
4. Modifica timestamps del sistema.

### Anti-Forense

Cifrado completo del disco (FDE) impide acceso a evidencia. Borrado seguro con shred. Esteganografia para ocultar archivos.

El perito debe anticipar anti-forense y tener métodos de recuperación.

## Documentación para el Tribunal

De nada sirve tener la evidencia perfecta si no la puedes explicar. Y cuando digo explicar me refiero a que un juez que no sabe que es un hash entienda por qué tus datos son confiables.

### El Informe Pericial

El informe pericial debe ser:
- Comprensible para un juez sin conocimientos técnicos.
- Riguroso en tecnicismos cuando sea necesario, explicados.
- Completamente reproducible por otro perito.

### Estructura del Informe

1. Resumen ejecutivo: Que se encontró, en pocas palabras.
2. Alcance: Que se investigo, que dispositivos.
3. Metodología: Herramientas, procedimientos.
4. Cadena de custodia: Cada transferencia, cada acceso.
5. Hallazgos: Que se encontró, en orden cronológico.
6. Conclusión: Opinión del perito.
7. Anexos: Hashes, capturas, logs.

### Declaración como Perito

El perito debe:
- Explicar términos técnicos en lenguaje claro.
- Demostrar que la cadena de custodia no se rompió.
- Admitir limitaciones: lo que no se pudo recuperar.
- No opinar sobre culpabilidad. Solo sobre evidencia.

## Almacenamiento a Largo Plazo

La evidencia digital debe preservarse años. Discos duros se degradan. Migrar a nuevos medios periódicamente.

Formato de almacenamiento: EWF (Expert Witness Format), AFF (Advanced Forensic Format), o raw (.dd).

Verificar integridad anualmente con hash.

## Cadena de Custodia en la Nube

Esto se pone complicado. Ya no controlas el hardware. Dependes de que el proveedor no haya modificado nada. pasa si el servidor esta en otro país? Ahora tienes problemas de jurisdicción también.

### Desafíos

- No hay acceso físico a discos.
- Proveedor puede modificar datos.
- Múltiples jurisdicciones.
- Logs del proveedor como evidencia.

### Soluciones

- Orden judicial al proveedor.
- Preservación forense vía API (snapshots).
- Documentación del proveedor sobre su propia cadena.

### Ejemplo: Google Takeout vs Forense

Takeout da acceso a datos pero no preserva metadatos forenses. Solicitar datos vía orden legal que incluya preservación de metadatos.

## Control de Acceso a Evidencia

Quien puede acceder:
- Perito asignado al caso.
- Supervisores con autorización.
- Defensa (con orden judicial).

Registro de acceso: Sistema de tickets, logs de autenticación, cámaras.

## Destrucción de Evidencia

Cuando el caso termina, la evidencia debe destruirse de forma segura (shredding, borrado criptográfico).

Documentar la destrucción: fecha, método, autorización, testigos.

## Errores Comunes en el Estrado

Decir "no se" sin explicación: "No se como funciona el hash." El abogado desacredita.

Exagerar capacidades: "Recuperamos todos los datos." No es cierto, la defensa lo demostrara.

No tener notas: El perito testifica de memoria. Se contradice.

Confundir roles: El perito no es fiscal. No debe opinar sobre culpabilidad.

## Formación del Perito

Certificaciones reconocidas: GCFA (GIAC Certified Forensic Analyst), GCFE (GIAC Certified Forensic Examiner), CHFI (Computer Hacking Forensic Investigator), CCFP (Certified Cyber Forensic Professional).

Experiencia práctica: Laboratorios, casos reales, testimonio en corte.

## Evidencia en la Nube: Desafíos Adicionales

### Falta de Control Físico

No puedes asegurar que el disco no fue modificado por el proveedor. Dependes de los logs del proveedor. La información puede estar en múltiples jurisdicciones.

### Soluciones

Orders judiciales específicas. Preservación forense vía snapshot. Cadena de custodia documentada por el proveedor.

### Ejemplo: AWS

AWS permite tomar snapshots de volúmenes EBS para preservación. Los logs de CloudTrail documentan acceso a recursos.

## Checklist de Cadena de Custodia

### Antes de la Recolección

Preparar dispositivo de almacenamiento limpio. Verificar hash del dispositivo. Documentar estado del sistema. Fotografiar escena.

### Durante la Recolección

Documentar cada comando ejecutado. Verificar hash de la imagen inmediatamente. Almacenar en dispositivo forense sellado.

### Después de la Recolección

Transferir con registro firmado. Almacenar en repositorio controlado. Documentar cada acceso posterior.

## Procedimientos por Tipo de Evidencia

### Disco Duro

Etiquetar con número de caso y fecha. Almacenar en bolsa antiestatica. Transportar en caja acolchada.

### Dispositivo Móvil

Modo avión inmediato para evitar borrado remoto. Bolsa Faraday si es necesario. Documentar IMEI, modelo, estado.

### Captura de Red

Timestamp sincronizado con NTP. Formato PCAP estándar. Hash del archivo de captura.

### Logs

Preservar logs originales. Copia firmada. Documentar periodo de retención.

## Estándares y Certificaciones

ISO 27037: Guía para identificación, recolección y preservación de evidencia digital. NIST SP 800-86: Guía de forensic techniques.

## Responsabilidades del Perito

Conocimiento técnico actualizado. Independencia e imparcialidad. Confidencialidad de la información. Capacidad de explicar al juez.

## Documentación Avanzada

### Logs de Acceso

Cada acceso a la evidencia registrado automáticamente. Sistema de tickets con permisos.

### Fotos y Videos

Fotografiar la escena antes de tocar nada. Video del proceso de recolección.

### Notas del Perito

Notas contemporáneas al evento. Manuscritas o digitales con timestamp. No modificar después.

## Autoevaluación

1. Juan, técnico de soporte, encuentra un disco con evidencia. Lo conecta a su PC y examina archivos. Que errores comete?

2. Explica que es un hash y por qué es crítico en la cadena de custodia.

3. Un abogado en juicio pregunta: "Pudo alguien más haber accedido a esta evidencia?" Como respondes si documentaste cada acceso?

4. Cual es la diferencia entre evidencia volátil y no volátil? Como afecta el orden de recolección?

5. El jefe de IT dice: "Conectamos el disco sospechoso a nuestro servidor y copiamos los archivos importantes." Que problemas ves?

6. Por qué no es suficiente confiar en que "nadie impugnará la cadena"?

7. Un perito extrae evidencia, la analiza, y meses después descubre que olvido documentar un paso. Que ocurre?

8. Cual es el primer paso en la escena antes de tocar cualquier dispositivo?

9. La defensa alega que transferiste evidencia a un USB no cifrado. Como defiendes la integridad?

10. Por qué la cadena de custodia es más compleja en ambientes cloud que en locales?
