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

## Riesgos Comunes

- Credenciales debiles.
- Usuarios con permisos excesivos.
- Base expuesta a internet.
- Backups sin cifrar.
- Logs con datos sensibles.
- Falta de auditoria.
- Datos de produccion en ambientes de prueba.
- SQL Injection desde aplicaciones.

## Principios

- Minimo privilegio.
- Cifrado en transito.
- Cifrado en reposo cuando aplique.
- Backups protegidos.
- Auditoria.
- Separacion de ambientes.
- Parches.

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

## Practica Conceptual

Diseña controles para:

```text
Base de datos de clientes usada por una app web.
```

Define:

- Quien accede.
- Desde donde.
- Que permisos tiene la app.
- Que logs se guardan.
- Como se respaldan datos.

## Criterio de Dominio

Puedes avanzar cuando puedas:

- Explicar minimo privilegio en DB.
- Explicar riesgo de exposicion publica.
- Explicar backups protegidos.
- Relacionar SQL Injection con permisos de DB.
