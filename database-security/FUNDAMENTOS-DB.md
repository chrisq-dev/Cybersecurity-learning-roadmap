# Fundamentos de Database Security

## Objetivo

Entender riesgos comunes en bases de datos y controles basicos.

## Que Protege una Base de Datos

Puede contener:

- Usuarios.
- Contraseñas hasheadas.
- Datos personales.
- Datos financieros.
- Logs.
- Configuraciones.
- Informacion de negocio.

La base de datos suele ser uno de los activos mas importantes porque concentra datos que tienen valor operativo, legal y economico. Una aplicacion puede reconstruirse, pero una fuga de datos personales, credenciales o informacion financiera puede afectar clientes, reputacion, cumplimiento y continuidad del negocio.

En seguridad conviene pensar la base de datos como un sistema completo:

- Motor de base de datos.
- Usuarios y roles.
- Red desde donde se accede.
- Aplicaciones que consultan.
- Backups.
- Logs.
- Administradores.
- Datos copiados a desarrollo o pruebas.

## Riesgos Comunes

- Credenciales debiles.
- Usuarios con permisos excesivos.
- Base expuesta a internet.
- Backups sin cifrar.
- Logs con datos sensibles.
- Falta de auditoria.
- Datos de produccion en ambientes de prueba.
- SQL Injection desde aplicaciones.

## Tipos de Datos Sensibles

No todos los datos tienen el mismo riesgo. Clasificarlos ayuda a decidir controles.

| Tipo de dato | Riesgo principal | Controles comunes |
| --- | --- | --- |
| Credenciales | Toma de cuentas | Hash fuerte, sal, rotacion, acceso restringido |
| Datos personales | Privacidad y cumplimiento | Minimizacion, cifrado, auditoria |
| Datos financieros | Fraude | Segregacion de funciones, monitoreo, permisos estrictos |
| Tokens/API keys | Acceso no autorizado | Secret manager, rotacion, no logs |
| Logs | Exposicion indirecta | Redaccion, retencion, acceso limitado |
| Backups | Fuga masiva | Cifrado, aislamiento, pruebas de restore |

## Principios

- Minimo privilegio.
- Cifrado en transito.
- Cifrado en reposo cuando aplique.
- Backups protegidos.
- Auditoria.
- Separacion de ambientes.
- Parches.

## Superficie de Ataque en Bases de Datos

Una base de datos puede ser atacada por varios caminos:

- Aplicacion vulnerable que ejecuta consultas inseguras.
- Credenciales filtradas en codigo, logs o repositorios.
- Puerto expuesto a internet.
- Panel de administracion sin MFA.
- Cuenta de servicio con permisos excesivos.
- Backup descargable sin autenticacion fuerte.
- Replicas, dumps o ambientes de prueba sin proteccion.

Por eso no basta con "poner contraseña". La defensa debe cubrir identidad, red, aplicacion, datos, monitoreo y recuperacion.

## Exposicion

Una base de datos normalmente no deberia exponerse publicamente.

Mejor diseño:

```text
Internet -> App -> Database
```

No:

```text
Internet -> Database
```

## Capas de Defensa

### Red

- La base vive en una red privada.
- Solo la aplicacion o hosts autorizados pueden conectarse.
- Los puertos administrativos no estan abiertos a usuarios normales.
- Las reglas de firewall tienen owner, justificacion y expiracion.

### Identidad

- Cuentas separadas por funcion.
- MFA para administradores cuando el motor/plataforma lo permita.
- Rotacion de credenciales.
- Preferir roles temporales o secret managers cuando sea posible.

### Permisos

- La aplicacion no usa cuenta DBA.
- Lectura y escritura se separan si el sistema lo permite.
- Las tareas de backup tienen permisos especificos.
- Los analistas tienen acceso read-only y preferentemente a vistas limitadas.

### Datos

- Cifrado en transito con TLS.
- Cifrado en reposo cuando el riesgo o regulacion lo requiere.
- Hash fuerte para contraseñas, no cifrado reversible.
- Mascaramiento o tokenizacion en datos sensibles cuando aplique.

### Monitoreo

- Logins fallidos y exitosos.
- Cambios de permisos.
- Accesos a tablas sensibles.
- Exportaciones grandes.
- Consultas inusuales por horario, volumen o origen.

### Recuperacion

- Backups cifrados.
- Backups aislados de la cuenta principal.
- Pruebas reales de restore.
- RPO/RTO definidos.

## Errores Comunes

| Error | Por que importa | Mejor enfoque |
| --- | --- | --- |
| Usar root/admin en la app | Si la app cae, cae toda la DB | Cuenta limitada por tablas y acciones |
| Exponer puerto de DB | Aumenta fuerza bruta y explotacion | DB privada detras de la app |
| Guardar dumps en carpetas publicas | Fuga completa de datos | Storage privado, cifrado y expiracion |
| Copiar produccion a dev | Datos reales quedan sin controles | Datos sinteticos o anonimizados |
| No probar restore | Backup puede ser inutil | Simulacros periodicos |
| Loggear consultas con secretos | El log se vuelve sensible | Redactar tokens, passwords y PII |

## Relacion con SQL Injection

SQL Injection ocurre en la aplicacion, pero el impacto depende mucho de la base de datos. Si la app usa una cuenta con permisos excesivos, una inyeccion puede leer muchas tablas, modificar datos o ejecutar funciones peligrosas. Si la cuenta tiene permisos minimos, el dano se reduce.

Ejemplo:

```text
App vulnerable + cuenta DBA = impacto critico
App vulnerable + cuenta limitada = impacto acotado
```

La mitigacion principal de SQL Injection sigue siendo usar consultas parametrizadas, validacion y diseno seguro. Los permisos de DB son una capa adicional para limitar impacto.

## Ejemplo de Controles

Una base de datos de clientes usada por una app web requiere controles sobre:

```text
Base de datos de clientes usada por una app web.
```

Define:

- Quien accede.
- Desde donde.
- Que permisos tiene la app.
- Que logs se guardan.
- Como se respaldan datos.

## Preguntas de Comprension

- Que datos de la base tendrian mayor impacto si se filtran?
- Que cuentas existen y por que permisos necesitan?
- La base es accesible desde internet o solo desde red privada?
- Donde se guardan backups y quien puede leerlos?
- Que eventos quedarian registrados si alguien exporta miles de registros?
- Que pasaria si la app web es vulnerable a SQL Injection?

## Criterio de Dominio

Puedes avanzar cuando puedas:

- Explicar minimo privilegio en DB.
- Explicar riesgo de exposicion publica.
- Explicar backups protegidos.
- Relacionar SQL Injection con permisos de DB.
- Diferenciar cifrado, hashing, mascaramiento y backups.
- Proponer una arquitectura basica app -> DB con controles defensivos.
