# PowerShell y Eventos de Windows

## Objetivo

Usar PowerShell para inspeccionar Windows y entender eventos utiles para investigacion.

## Que es PowerShell

PowerShell es una shell y lenguaje de scripting orientado a administracion.

En seguridad sirve para:

- Consultar procesos.
- Consultar servicios.
- Revisar usuarios.
- Leer eventos.
- Automatizar tareas.
- Investigar actividad.

Tambien puede ser abusado por atacantes, por eso se monitorea.

## Comandos Basicos

```powershell
Get-Process
Get-Service
Get-LocalUser
Get-LocalGroup
Get-NetIPAddress
Get-Command
Get-Help Get-Process
```

## Procesos

```powershell
Get-Process
Get-Process powershell
```

Preguntas:

- Que proceso se ejecuto?
- Bajo que usuario?
- Desde que ruta?
- Es esperado?

## Servicios

```powershell
Get-Service
Get-Service | Where-Object {$_.Status -eq "Running"}
```

Preguntas:

- Que servicios estan corriendo?
- Hay servicios desconocidos?
- Alguno corre con privilegios altos?

## Eventos

Comando moderno:

```powershell
Get-WinEvent -LogName Security -MaxEvents 10
```

Filtrar por Event ID:

```powershell
Get-WinEvent -FilterHashtable @{LogName='Security'; Id=4625} -MaxEvents 10
```

## Event IDs Importantes

| Event ID | Significado |
| --- | --- |
| 4624 | Logon exitoso |
| 4625 | Logon fallido |
| 4634 | Logoff |
| 4648 | Logon con credenciales explicitas |
| 4672 | Privilegios especiales asignados |
| 4688 | Proceso creado |
| 4720 | Usuario creado |
| 4728 | Usuario agregado a grupo global |
| 4732 | Usuario agregado a grupo local |
| 4740 | Cuenta bloqueada |

## Investigacion: Logins Fallidos

Preguntas:

- Que usuario fallo?
- Desde que IP o equipo?
- Cuantas veces?
- En que horario?
- Despues hubo login exitoso?
- Es un usuario real o cuenta de servicio?

## Observacion Segura

Si tienes Windows:

```powershell
Get-WinEvent -FilterHashtable @{LogName='Security'; Id=4624} -MaxEvents 5
Get-WinEvent -FilterHashtable @{LogName='Security'; Id=4625} -MaxEvents 5
Get-LocalUser
Get-LocalGroup
```

Al revisar estos comandos, enfocate en entender:

- Que consulta hace cada comando.
- Que informacion devuelve.
- Que significa un inicio de sesion exitoso frente a uno fallido.
- Que usuarios y grupos existen localmente.
- Que riesgo existiria si el resultado mostrara actividad fuera de horario, usuarios inesperados o muchos fallos de autenticacion.

## Criterio de Dominio

Puedes avanzar cuando puedas:

- Usar `Get-Process`.
- Usar `Get-Service`.
- Consultar eventos.
- Explicar 4624, 4625 y 4688.
- Formular hipotesis con eventos.
