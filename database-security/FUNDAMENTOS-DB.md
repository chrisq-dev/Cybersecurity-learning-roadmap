# Fundamentos de Database Security

## Objetivo

Entender riesgos comunes en bases de datos y controles básicos.

## Qué Protege una Base de Datos

Puede contener:

- Usuarios.
- Contraseñas hasheadas.
- Datos personales.
- Datos financieros.
- Logs.
- Configuraciones.
- Información de negocio.

La base de datos suele ser uno de los activos más importantes porque concentra datos que tienen valor operativo, legal y economico. Una aplicación puede reconstruirse, pero una fuga de datos personales, credenciales o información financiera puede afectar clientes, reputación, cumplimiento y continuidad del negocio.

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
| Credenciales | Toma de cuentas | Hash fuerte, sal, rotación, acceso restringido |
| Datos personales | Privacidad y cumplimiento | Minimizacion, cifrado, auditoria |
| Datos financieros | Fraude | Segregacion de funciones, monitoreo, permisos estrictos |
| Tokens/API keys | Acceso no autorizado | Secret manager, rotación, no logs |
| Logs | Exposición indirecta | Redaccion, retención, acceso limitado |
| Backups | Fuga masiva | Cifrado, aislamiento, pruebas de restore |

## Principios

- Mínimo privilegio.
- Cifrado en transito.
- Cifrado en reposo cuando aplique.
- Backups protegidos.
- Auditoria.
- Separación de ambientes.
- Parches.

## Superficie de Ataque en Bases de Datos

Una base de datos puede ser atacada por varios caminos:

- Aplicación vulnerable que ejecuta consultas inseguras.
- Credenciales filtradas en código, logs o repositorios.
- Puerto expuesto a internet.
- Panel de administracion sin MFA.
- Cuenta de servicio con permisos excesivos.
- Backup descargable sin autenticación fuerte.
- Replicas, dumps o ambientes de prueba sin protección.

Por eso no basta con "poner contraseña". La defensa debe cubrir identidad, red, aplicación, datos, monitoreo y recuperación.

## Exposición

Una base de datos normalmente no debería exponerse publicamente.

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
- Solo la aplicación o hosts autorizados pueden conectarse.
- Los puertos administrativos no están abiertos a usuarios normales.
- Las reglas de firewall tienen owner, justificacion y expiracion.

### Identidad

- Cuentas separadas por función.
- MFA para administradores cuando el motor/plataforma lo permita.
- Rotación de credenciales.
- Preferir roles temporales o secret managers cuando sea posible.

### Permisos

- La aplicación no usa cuenta DBA.
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

### Recuperación

- Backups cifrados.
- Backups aislados de la cuenta principal.
- Pruebas reales de restore.
- RPO/RTO definidos.

## Errores Comunes

| Error | Por que importa | Mejor enfoque |
| --- | --- | --- |
| Usar root/admin en la app | Si la app cae, cae toda la DB | Cuenta limitada por tablas y acciones |
| Exponer puerto de DB | Aumenta fuerza bruta y explotación | DB privada detras de la app |
| Guardar dumps en carpetas públicas | Fuga completa de datos | Storage privado, cifrado y expiracion |
| Copiar produccion a dev | Datos reales quedan sin controles | Datos sinteticos o anonimizados |
| No probar restore | Backup puede ser inutil | Simulacros periodicos |
| Loggear consultas con secretos | El log se vuelve sensible | Redactar tokens, passwords y PII |

## Relacion con SQL Injection

SQL Injection ocurre en la aplicación, pero el impacto depende mucho de la base de datos. Si la app usa una cuenta con permisos excesivos, una inyección puede leer muchas tablas, modificar datos o ejecutar funciones peligrosas. Si la cuenta tiene permisos mínimos, el dano se reduce.

Ejemplo:

```text
App vulnerable + cuenta DBA = impacto critico
App vulnerable + cuenta limitada = impacto acotado
```

La mitigacion principal de SQL Injection sigue siendo usar consultas parametrizadas, validación y diseño seguro. Los permisos de DB son una capa adicional para limitar impacto.

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

## Preguntas de Comprensión

- Qué datos de la base tendrian mayor impacto si se filtran?
- Qué cuentas existen y por qué permisos necesitan?
- La base es accesible desde internet o solo desde red privada?
- Dónde se guardan backups y quién puede leerlos?
- Qué eventos quedarian registrados si alguien exporta miles de registros?
- Qué pasaria si la app web es vulnerable a SQL Injection?

## Criterio de Dominio

Puedes avanzar cuando puedas:

- Explicar mínimo privilegio en DB.
- Explicar riesgo de exposición pública.
- Explicar backups protegidos.
- Relacionar SQL Injection con permisos de DB.
- Diferenciar cifrado, hashing, mascaramiento y backups.
- Proponer una arquitectura básica app -> DB con controles defensivos.
