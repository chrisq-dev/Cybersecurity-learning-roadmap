# Fundamentos de Windows y Active Directory

## Objetivo

Entender Windows y Active Directory lo suficiente para investigar eventos, comprender identidad empresarial y prepararte para roles SOC o seguridad corporativa.

## Windows Básico

Temas:

- Usuarios locales.
- Grupos locales.
- Servicios.
- Procesos.
- Event Viewer.
- PowerShell.
- Firewall.
- Windows Defender.

Windows es importante en ciberseguridad porque muchas empresas lo usan para estaciones de trabajo, servidores, identidad y administracion. Un analista debe entender que ocurre en el endpoint: procesos, servicios, usuarios, grupos, sesiones, eventos y controles defensivos.

## PowerShell Inicial

Comandos útiles:

```powershell
Get-Process
Get-Service
Get-LocalUser
Get-LocalGroup
Get-EventLog -LogName Security -Newest 10
Get-NetIPAddress
```

## Active Directory

Conceptos:

- Dominio: agrupacion centralizada de identidades y recursos.
- Domain Controller: servidor que autentica y administra el dominio.
- Usuario: identidad.
- Grupo: conjunto de usuarios.
- GPO: política aplicada a usuarios o equipos.
- Kerberos: protocolo de autenticación.
- LDAP: protocolo usado para consultar directorios.

Active Directory centraliza identidad. Si AD falla o se compromete, el impacto puede alcanzar usuarios, servidores, permisos, políticas y autenticación. Por eso los Domain Controllers deben tratarse como activos críticos, no como servidores normales.

## Identidad en Windows

Una cuenta local existe solo en un equipo. Una cuenta de dominio existe en AD y puede acceder a recursos según permisos. Los grupos simplifican administracion, pero también pueden concentrar demasiado privilegio. Un cambio pequeño en membresias puede dar acceso amplio si el grupo tiene permisos sensibles.

## Eventos Importantes

- Logon exitoso.
- Logon fallido.
- Creación de usuario.
- Cambio de grupo.
- Cambio de contraseña.
- Ejecucion de procesos sospechosos.

Los eventos no prueban un incidente por si solos. Un logon fallido puede ser error de contraseña, password spraying o un servicio mal configurado. La lectura correcta combina usuario, hora, equipo, IP, resultado y actividad posterior.

## Observación Segura

Si tienes Windows:

- Abre Event Viewer.
- Busca eventos de seguridad.
- Ejecuta comandos básicos de PowerShell.
- Observa que eventos aparecen y que significan dentro del sistema.

Si no tienes Windows:

- Estudia capturas o ejemplos de eventos.
- Nota explicativa sobre Kerberos.
- Un mapa de conceptos puede mostrar de AD.

## Errores Comunes

- Confundir usuario local con usuario de dominio.
- Pensar que todo administrador tiene el mismo alcance.
- Ignorar cambios de grupos privilegiados.
- No revisar actividad posterior a un login exitoso.
- No diferenciar servicio, proceso y evento.

## Criterio de Dominio

Puedes avanzar cuando puedas explicar:

- Usuario local vs usuario de dominio.
- Que hace un Domain Controller.
- Que es una GPO.
- Por que los logs de Windows importan.
