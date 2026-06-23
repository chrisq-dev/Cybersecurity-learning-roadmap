# Windows Basico para Ciberseguridad

## Objetivo

Entender Windows como sistema operativo empresarial. Muchos incidentes ocurren en endpoints Windows, servidores Windows o dominios Active Directory.

## Componentes Importantes

### Usuarios Locales

Son cuentas que existen en una maquina especifica.

Ejemplos:

- Usuario normal.
- Administrador local.
- Cuenta de servicio local.

Riesgo:

- Usuarios locales con contraseñas debiles.
- Administradores locales compartidos.
- Cuentas antiguas activas.

### Grupos Locales

Agrupan permisos.

Grupos importantes:

- Administrators.
- Remote Desktop Users.
- Event Log Readers.
- Backup Operators.

Riesgo:

- Usuarios innecesarios en grupos privilegiados.

### Servicios

Procesos que corren en segundo plano.

Ejemplos:

- Windows Update.
- Defender.
- Servicios de aplicaciones.

Riesgo:

- Servicios corriendo con cuentas privilegiadas.
- Servicios innecesarios expuestos.
- Servicios con rutas o permisos inseguros.

### Registro de Windows

Base de datos de configuracion del sistema.

Riesgo:

- Persistencia de malware.
- Configuraciones inseguras.
- Cambios no autorizados.

## Herramientas Basicas

- Task Manager: procesos y consumo.
- Services: servicios.
- Event Viewer: logs.
- Windows Defender: proteccion.
- Windows Firewall: reglas de red.
- PowerShell: automatizacion y administracion.

## Eventos Importantes

En seguridad debes revisar:

- Logon exitoso.
- Logon fallido.
- Creacion de usuarios.
- Cambios de grupo.
- Ejecucion de procesos.
- Cambios de servicios.
- Alertas de Defender.

## Practica

Si tienes Windows:

1. Abre Task Manager.
2. Revisa procesos activos.
3. Abre Services.
4. Identifica 5 servicios.
5. Abre Event Viewer.
6. Busca eventos de seguridad.

Si no tienes Windows:

1. Crea una nota con los conceptos.
2. Investiga que son los Event IDs 4624, 4625 y 4688.
3. Explica por que importan.

## Criterio de Dominio

Puedes avanzar cuando puedas:

- Diferenciar usuario local y administrador local.
- Explicar que es un servicio.
- Explicar por que Event Viewer es importante.
- Nombrar eventos utiles para seguridad.
