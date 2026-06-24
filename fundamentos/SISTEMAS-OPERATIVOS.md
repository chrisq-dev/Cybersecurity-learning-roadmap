# Sistemas Operativos

## Objetivo

Entender que hace un sistema operativo y por que es una pieza central en ciberseguridad.

## Que es un Sistema Operativo

Un sistema operativo administra recursos de hardware y permite que los programas funcionen.

Ejemplos:

- Linux.
- Windows.
- macOS.
- Android.

## Funciones Principales

### Gestion de Procesos

El sistema operativo decide que procesos se ejecutan, con que prioridad y bajo que usuario.

En seguridad importa porque:

- Un proceso desconocido puede ser sospechoso.
- Un proceso con privilegios altos puede ser peligroso.
- La relacion padre-hijo de procesos ayuda a investigar actividad.

### Gestion de Memoria

El sistema operativo asigna memoria a procesos.

En seguridad importa porque:

- Errores de memoria pueden causar vulnerabilidades.
- Credenciales pueden quedar en memoria.
- Aislamiento de memoria reduce impacto entre procesos.

### Gestion de Archivos

El sistema operativo controla archivos, carpetas y permisos.

En seguridad importa porque:

- Configuraciones inseguras exponen secretos.
- Permisos incorrectos permiten modificacion no autorizada.
- Logs son evidencia.

### Gestion de Usuarios

El sistema operativo controla identidades locales y permisos.

En seguridad importa porque:

- Cada accion deberia atribuirse a una identidad.
- Usuarios compartidos dificultan auditoria.
- Privilegios excesivos aumentan impacto.

### Gestion de Red

El sistema operativo permite comunicacion por red.

En seguridad importa porque:

- Servicios escuchando en puertos abren superficie de ataque.
- Firewall local puede reducir exposicion.
- Conexiones salientes sospechosas pueden indicar compromiso.

## Kernel

El kernel es el nucleo del sistema operativo. Controla hardware, memoria, procesos y llamadas del sistema.

En seguridad importa porque:

- Una vulnerabilidad en kernel puede comprometer todo el sistema.
- Drivers inseguros pueden causar problemas graves.
- El aislamiento depende mucho del kernel.

## Logs

Los logs son registros de eventos.

Ejemplos:

- Login exitoso.
- Login fallido.
- Servicio iniciado.
- Error de aplicacion.
- Conexion bloqueada.

En seguridad, los logs ayudan a responder:

- Que paso?
- Cuando paso?
- Que usuario estuvo involucrado?
- Desde donde ocurrio?
- Fue normal o sospechoso?

## Hardening

Hardening significa reducir superficie de ataque configurando el sistema de forma mas segura.

Ejemplos:

- Desactivar servicios innecesarios.
- Aplicar actualizaciones.
- Configurar firewall.
- Usar MFA cuando aplique.
- Limitar privilegios.
- Revisar permisos.
- Activar logging.

## Observacion

Para entender un sistema operativo conviene saber donde observar:

- procesos;
- servicios;
- usuarios;
- red;
- logs.

La idea no es llenar un archivo, sino reconocer que cada sistema operativo ofrece mecanismos para ver que esta ocurriendo y que evidencia deja.

## Tabla Comparativa

| Concepto | Linux | Windows |
| --- | --- | --- |
| Usuario admin | root / sudo | Administrator |
| Procesos | `ps`, `top` | Task Manager, PowerShell |
| Servicios | `systemctl` | Services.msc, PowerShell |
| Logs | `/var/log`, `journalctl` | Event Viewer |
| Firewall | ufw, firewalld, iptables | Windows Defender Firewall |

## Criterio de Dominio

Puedes avanzar cuando puedas explicar:

- Que hace un sistema operativo.
- Que es el kernel.
- Por que los logs son evidencia.
- Que es hardening.
- Por que servicios innecesarios aumentan riesgo.
