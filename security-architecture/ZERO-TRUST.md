# Zero Trust

## Objetivo

Entender Zero Trust sin marketing: verificar explicitamente, usar minimo privilegio y asumir compromiso.

## Idea Principal

No confiar automaticamente por estar "dentro de la red".

Antes:

```text
Dentro de la red = confiable
```

Mejor:

```text
Cada acceso debe validarse con identidad, contexto y permisos.
```

Zero Trust no significa "no confiar en nadie" de forma absoluta. Significa no usar la ubicacion de red como prueba suficiente de confianza. Cada solicitud debe evaluarse con senales verificables.

## Principios

### Verificar Explicitamente

Validar:

- Usuario.
- Dispositivo.
- Ubicacion.
- Riesgo.
- MFA.
- Estado del dispositivo.

### Minimo Privilegio

Dar solo acceso necesario.

### Asumir Compromiso

Diseñar pensando que alguna cuenta o equipo puede estar comprometido.

Esto cambia el diseno:

- Si un usuario cae en phishing, no debe poder acceder a todo.
- Si una laptop se infecta, debe haber deteccion y aislamiento.
- Si una app se compromete, la base de datos debe limitar impacto.
- Si una llave se filtra, debe rotarse y tener permisos acotados.

## Controles Relacionados

- MFA.
- Conditional Access.
- Device compliance.
- Segmentacion.
- Just-in-time access.
- Logging.
- EDR.
- DLP.

## Senales Para Tomar Decisiones

| Senal | Pregunta |
| --- | --- |
| Identidad | Quien solicita acceso? |
| Dispositivo | Esta administrado y saludable? |
| Ubicacion | Es una ubicacion esperada o riesgosa? |
| Recurso | Que tan sensible es lo que pide? |
| Accion | Solo lee o modifica datos? |
| Riesgo | Hay alertas recientes de esa cuenta o equipo? |
| Tiempo | Es un horario normal? |

Zero Trust combina estas senales para permitir, negar, pedir MFA, limitar sesion o registrar con mayor detalle.

## Ejemplos Practicos

### Acceso a Correo

```text
Usuario + password + MFA + dispositivo conocido -> permitir
Usuario + password sin MFA desde pais inusual -> bloquear o desafiar
```

### Acceso a Panel Administrativo

```text
Admin -> MFA fuerte -> dispositivo administrado -> acceso JIT -> logs de sesion
```

### Acceso de Servicio a Base de Datos

```text
Backend -> rol especifico -> red privada -> puerto necesario -> queries auditadas
```

## Zero Trust y Segmentacion

Zero Trust no elimina la necesidad de segmentar. La refuerza.

Antes:

```text
Una vez dentro de VPN, acceso amplio.
```

Mejor:

```text
VPN/ZTNA valida identidad, dispositivo y rol.
Cada segmento acepta solo trafico necesario.
Cada app valida autorizacion propia.
```

## Error Comun

Pensar que Zero Trust es una herramienta. Es un enfoque de arquitectura.

Otros errores:

- Comprar una solucion y no cambiar permisos.
- Mantener cuentas admin permanentes.
- No monitorear cuentas de servicio.
- Confiar solo en MFA sin revisar autorizacion.
- No inventariar recursos y flujos.
- Implementar controles tan molestos que usuarios buscan saltarlos.

## Camino de Implementacion

Orden razonable:

1. Inventariar identidades, dispositivos, apps y datos.
2. Activar MFA en cuentas importantes.
3. Separar cuentas admin y cuentas normales.
4. Revisar permisos excesivos.
5. Centralizar logs de identidad y acceso.
6. Segmentar recursos criticos.
7. Aplicar acceso condicional.
8. Medir, ajustar y documentar excepciones.

No se implementa Zero Trust en una tarde. Se madura por etapas.

## Ejemplo de Acceso Condicional

Caso:

```text
Empleado remoto quiere acceder a panel administrativo.
```

El analisis debe definir:

- Que verificas.
- Que permisos das.
- Que logs guardas.
- Que haces si el dispositivo no cumple.

## Preguntas de Comprension

- Que senales usarias antes de permitir acceso a un recurso sensible?
- Por que MFA no es suficiente por si solo?
- Como limitarias impacto si una cuenta de usuario cae en phishing?
- Que diferencia hay entre VPN tradicional y acceso con controles Zero Trust?
- Que cuentas de servicio requieren revision en una empresa?

## Criterio de Dominio

Puedes avanzar cuando puedas:

- Explicar Zero Trust.
- Explicar minimo privilegio.
- Explicar acceso condicional.
- Diseñar acceso con validaciones.
- Proponer etapas realistas de adopcion.
- Explicar por que red interna no equivale a confianza.
