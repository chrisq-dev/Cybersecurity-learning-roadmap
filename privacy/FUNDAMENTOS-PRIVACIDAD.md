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
Necesitamos este dato, quien lo usa, por cuanto tiempo y como lo protegemos?
```

## Dato Personal

Informacion que identifica o puede identificar a una persona.

Ejemplos:

- Nombre.
- Correo.
- Telefono.
- Direccion.
- Identificador de usuario.
- IP en ciertos contextos.

## Identificadores Directos e Indirectos

Directos:

- nombre;
- correo;
- telefono;
- documento oficial.

Indirectos:

- IP;
- device ID;
- ubicacion;
- combinaciones de atributos.

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

Usar datos solo para el proposito definido.

### Retencion

No guardar datos mas tiempo del necesario.

### Seguridad

Proteger datos con controles tecnicos y organizacionales.

### Transparencia

Explicar como se usan los datos.

## Ciclo de Vida del Dato

1. Recoleccion.
2. Uso.
3. Almacenamiento.
4. Comparticion.
5. Retencion.
6. Eliminacion.

En cada fase pregunta:

- que datos;
- quien accede;
- donde se guardan;
- como se protegen;
- cuando se eliminan.

## Controles de Seguridad

- Clasificacion de datos.
- Cifrado.
- Control de acceso.
- Logging.
- DLP.
- Backups seguros.
- Eliminacion segura.
- Revision de terceros.

## Privacidad en Logs

Los logs ayudan a seguridad, pero pueden exponer datos.

Buenas practicas:

- no registrar contrasenas ni tokens;
- evitar datos personales innecesarios;
- truncar o anonimizar cuando aplique;
- restringir acceso;
- definir retencion;
- proteger exportaciones.

## Riesgos Comunes

- Logs con datos sensibles.
- Buckets publicos.
- Exportaciones CSV sin control.
- Permisos excesivos.
- Retencion indefinida.
- Datos de produccion en ambientes de prueba.

## Ejemplo de Clasificacion

Esta tabla muestra como clasificar datos y elegir controles:

| Dato | Personal | Sensible | Control recomendado |
| --- | --- | --- | --- |
| correo | Si | No | Cifrado en transito |
| contraseña | No | Si | Hashing fuerte |
| direccion IP | Depende | No | Anonimizacion de logs |
| historial medico | Si | Si | Cifrado y RBAC estricto |
| ID interno de usuario | No | No | Monitoreo |

## Criterios Para Mapear Datos

Un mapa de datos ayuda a entender que informacion existe, para que se usa, donde vive y quien puede acceder.

| Dato | Proposito | Donde vive | Quien accede | Retencion | Control |
| --- | --- | --- | --- | --- | --- |

Conviene considerar datos como:

- correo;
- password hash;
- IP;
- logs de login;
- archivo subido;
- token de API.

## Errores Comunes

- Guardar datos "por si acaso".
- Usar datos reales en desarrollo.
- No tener retencion.
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
- Crear un mapa simple de datos con retencion y acceso.
