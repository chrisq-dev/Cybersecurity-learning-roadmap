# Fundamentos de Windows y Active Directory

## Objetivo

Entender Windows y Active Directory lo suficiente para investigar eventos, comprender identidad empresarial y prepararte para roles SOC o seguridad corporativa.

## Windows Basico

Temas:

- Usuarios locales.
- Grupos locales.
- Servicios.
- Procesos.
- Event Viewer.
- PowerShell.
- Firewall.
- Windows Defender.

## PowerShell Inicial

Comandos utiles:

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
- GPO: politica aplicada a usuarios o equipos.
- Kerberos: protocolo de autenticacion.
- LDAP: protocolo usado para consultar directorios.

## Eventos Importantes

- Logon exitoso.
- Logon fallido.
- Creacion de usuario.
- Cambio de grupo.
- Cambio de contraseña.
- Ejecucion de procesos sospechosos.

## Observacion Segura

Si tienes Windows:

- Abre Event Viewer.
- Busca eventos de seguridad.
- Ejecuta comandos basicos de PowerShell.
- Observa que eventos aparecen y que significan dentro del sistema.

Si no tienes Windows:

- Estudia capturas o ejemplos de eventos.
- Nota explicativa sobre Kerberos.
- Un mapa de conceptos puede mostrar de AD.

## Criterio de Dominio

Puedes avanzar cuando puedas explicar:

- Usuario local vs usuario de dominio.
- Que hace un Domain Controller.
- Que es una GPO.
- Por que los logs de Windows importan.
