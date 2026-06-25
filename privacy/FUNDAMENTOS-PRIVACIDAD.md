# Fundamentos de Privacidad

## Objetivo

Entender como proteger datos personales y por que privacidad importa en ciberseguridad.

Privacidad y seguridad se cruzan constantemente. Seguridad protege sistemas y datos; privacidad exige que los datos personales se recolecten, usen, compartan, retengan y eliminen con criterio.

## Mapa Mental

```text
dato -> proposito -> base de uso -> acceso -> retencion -> eliminacion -> evidencia
```

La pregunta central:

```text
Necesitamos este dato, quién lo usa, por cuanto tiempo y cómo lo protegemos?
```

## Dato Personal

Información que identifica o puede identificar a una persona.

Ejemplos:

- Nombre.
- Correo.
- Telefono.
- Dirección.
- Identificador de usuario.
- IP en ciertos contextos.

## Identificadores Directos e Indirectos

Directos:

- Nombre;
- Correo;
- Telefono;
- Documento oficial.

Indirectos:

- IP;
- Device ID;
- Ubicación;
- Combinaciones de atributos.

Un dato aislado puede parecer no sensible, pero combinado con otros puede identificar a una persona.

## Dato Sensible

Datos que pueden causar mayor impacto si se exponen.

Ejemplos:

- Salud.
- Biometria.
- Datos financieros.
- Credenciales.
- Documentos oficiales.

## Principios

### Minimizacion

Recolectar solo lo necesario.

### Limitacion de Uso

Usar datos solo para el propósito definido.

### Retención

No guardar datos más tiempo del necesario.

### Seguridad

Proteger datos con controles técnicos y organizacionales.

### Transparencia

Explicar como se usan los datos.

## Ciclo de Vida del Dato

1. Recoleccion.
2. Uso.
3. Almacenamiento.
4. Comparticion.
5. Retención.
6. Eliminación.

En cada fase pregunta:

- Que datos;
- Quien accede;
- Donde se guardan;
- Como se protegen;
- Cuando se eliminan.

## Controles de Seguridad

- Clasificación de datos.
- Cifrado.
- Control de acceso.
- Logging.
- DLP.
- Backups seguros.
- Eliminación segura.
- Revisión de terceros.

## Privacidad en Logs

Los logs ayudan a seguridad, pero pueden exponer datos.

Buenas prácticas:

- No registrar contraseñas ni tokens;
- Evitar datos personales innecesarios;
- Truncar o anonimizar cuando aplique;
- Restringir acceso;
- Definir retención;
- Proteger exportaciones.

## Riesgos Comunes

- Logs con datos sensibles.
- Buckets públicos.
- Exportaciones CSV sin control.
- Permisos excesivos.
- Retención indefinida.
- Datos de produccion en ambientes de prueba.

## Ejemplo de Clasificación

Esta tabla muestra como clasificar datos y elegir controles:

| Dato | Personal | Sensible | Control recomendado |
| --- | --- | --- | --- |
| correo | Si | No | Cifrado en transito |
| contraseña | No | Si | Hashing fuerte |
| dirección IP | Depende | No | Anonimizacion de logs |
| historial medico | Si | Si | Cifrado y RBAC estricto |
| ID interno de usuario | No | No | Monitoreo |

## Criterios Para Mapear Datos

Un mapa de datos ayuda a entender que información existe, para que se usa, donde vive y quien puede acceder.

| Dato | Propósito | Donde vive | Quien accede | Retención | Control |
| --- | --- | --- | --- | --- | --- |

Conviene considerar datos como:

- Correo;
- Password hash;
- IP;
- Logs de login;
- Archivo subido;
- Token de API.

## Errores Comunes

- Guardar datos "por si acaso".
- Usar datos reales en desarrollo.
- No tener retención.
- Dar acceso amplio a exportaciones.
- Registrar secretos en logs.
- No revisar terceros.

## Criterio de Dominio

Puedes avanzar cuando puedas:

- Explicar dato personal.
- Explicar minimizacion.
- Identificar datos sensibles.
- Proponer controles.
- Explicar por que logs pueden exponer datos.
- Crear un mapa simple de datos con retención y acceso.
