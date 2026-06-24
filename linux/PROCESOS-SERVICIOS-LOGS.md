# Procesos, Servicios y Logs

## Objetivo

Aprender a observar que esta pasando en Linux: procesos activos, servicios, puertos y eventos registrados.

## Procesos

Un proceso es un programa en ejecucion.

Comandos:

```bash
ps aux
top
htop
pgrep nombre
```

Columnas importantes de `ps aux`:

- USER: usuario que ejecuta el proceso.
- PID: identificador.
- CPU/MEM: recursos.
- COMMAND: comando ejecutado.

## Servicios

Un servicio es un proceso de larga duracion administrado por el sistema.

Con systemd:

```bash
systemctl status ssh
systemctl list-units --type=service
systemctl is-enabled ssh
```

Acciones:

```bash
sudo systemctl start servicio
sudo systemctl stop servicio
sudo systemctl restart servicio
```

## Puertos

Un servicio puede escuchar en un puerto.

```bash
ss -tuln
```

Opciones:

- `t`: TCP.
- `u`: UDP.
- `l`: listening.
- `n`: numeros, no resolver nombres.

## Logs

Ubicaciones comunes:

```text
/var/log/auth.log
/var/log/syslog
/var/log/secure
/var/log/nginx/
/var/log/apache2/
```

Con journalctl:

```bash
journalctl
journalctl -u ssh
journalctl -xe
```

## Que Buscar en Logs

- Login fallido.
- Login exitoso fuera de horario.
- Uso de sudo.
- Servicio reiniciado.
- Error repetido.
- Conexion desde IP desconocida.

## Observacion Segura

En un entorno propio, estos comandos permiten observar procesos, puertos y logs:

```bash
ps aux | head
ss -tuln
journalctl -n 20
```

Si no tienes permisos para logs:

- Identifica que permiso falta.
- Revisa que logs son accesibles para tu usuario.
- Evita elevar privilegios sin entender que informacion estas consultando.

## Criterios de Revision

Una revision basica de sistema Linux debe cubrir:

```md
Procesos observados.
Puertos escuchando.
Logs revisados.
Eventos interesantes.


## Conclusion

```

## Criterio de Dominio

Puedes avanzar cuando puedas:

- Ver procesos.
- Ver servicios.
- Ver puertos.
- Leer logs basicos.
- Explicar un evento de autenticacion.
