# Computacion Basica

## Objetivo

Entender que pasa dentro de una computadora. En ciberseguridad, muchas fallas tienen relacion con procesos, memoria, archivos, permisos, red o configuraciones del sistema operativo.

## Componentes Principales

### CPU

La CPU ejecuta instrucciones. Cuando abres un programa, la CPU procesa instrucciones del programa y del sistema operativo.

En seguridad importa porque:

- Un malware tambien es un programa con instrucciones.
- Un proceso malicioso consume CPU.
- Algunas vulnerabilidades ocurren por como un programa maneja instrucciones o memoria.

### RAM

La RAM es memoria temporal. Guarda datos que los programas necesitan mientras se ejecutan.

En seguridad importa porque:

- Credenciales o tokens pueden quedar temporalmente en memoria.
- Un volcado de memoria puede contener informacion sensible.
- Algunos ataques intentan leer o corromper memoria.

### Disco

El disco guarda archivos de forma persistente.

En seguridad importa porque:

- Aqui viven configuraciones, logs, binarios, documentos y secretos.
- Permisos incorrectos pueden exponer informacion.
- Malware puede persistir escribiendo archivos en ubicaciones estrategicas.

### Red

La interfaz de red permite comunicacion con otros equipos.

En seguridad importa porque:

- Muchos ataques entran o salen por red.
- Los logs de red ayudan a investigar incidentes.
- Firewalls, puertos y protocolos definen superficie de ataque.

## Programa, Proceso y Servicio

### Programa

Archivo ejecutable o conjunto de instrucciones guardadas en disco.

Ejemplo:

- `python`
- `nginx`
- `chrome`

### Proceso

Programa en ejecucion. Tiene memoria, PID, usuario propietario y recursos.

Ejemplo en Linux:

```bash
ps aux
```

### Servicio

Proceso pensado para ejecutarse en segundo plano y ofrecer una funcion.

Ejemplos:

- Servidor SSH.
- Servidor web.
- Base de datos.

## Archivos y Directorios

Un sistema operativo organiza informacion en archivos y carpetas.

En seguridad debes preguntarte:

- Quien puede leer este archivo?
- Quien puede modificarlo?
- Quien puede ejecutarlo?
- Contiene secretos?
- Deberia estar expuesto?

## Usuarios y Privilegios

No todos los usuarios deben tener los mismos permisos.

Tipos comunes:

- Usuario normal: permisos limitados.
- Administrador/root: control amplio del sistema.
- Usuario de servicio: usado por una aplicacion o servicio.

Principio importante:

```text
Minimo privilegio: dar solo los permisos necesarios, no mas.
```

## Ejemplo de Riesgo

Escenario:

- Una aplicacion web corre como root.
- Tiene una vulnerabilidad de carga de archivos.
- Un atacante logra ejecutar comandos.

Problema:

- Como la app corre como root, el atacante podria obtener control total.

Mitigacion:

- Ejecutar la app con usuario limitado.
- Restringir permisos.
- Validar uploads.
- Monitorear logs.
- Usar contenedores o aislamiento.

## Practica

Responde con tus palabras:

1. Diferencia entre programa y proceso.
2. Por que no conviene ejecutar servicios como root.
3. Que tipo de informacion podria aparecer en logs.
4. Que podria pasar si todos los usuarios son administradores.

## Mini Lab

En Linux o WSL:

```bash
whoami
id
ps aux | head
pwd
ls -la
```

Documenta:

- Usuario actual.
- Un proceso que este corriendo.
- Directorio actual.
- Un archivo y sus permisos.

## Criterio de Dominio

Puedes avanzar cuando puedas explicar:

- CPU, RAM, disco y red a nivel basico.
- Programa vs proceso vs servicio.
- Usuario normal vs administrador.
- Minimo privilegio.
- Por que los permisos importan en seguridad.
