# Cheatsheet Linux

Referencia rapida para moverse, revisar evidencia y entender estado basico de un sistema Linux.

## Navegacion

```bash
pwd
ls -la
cd /ruta
cd ..
```

## Archivos

```bash
cat archivo
less archivo
head archivo
tail archivo
tail -f archivo.log
```

## Archivos y Espacio

```bash
file archivo
stat archivo
du -sh *
df -h
wc -l archivo.log
sort archivo
uniq -c
```

## Busqueda

```bash
find . -name "*.log"
grep -i "failed" archivo.log
grep -R "error" .
grep -E "failed|error|denied" archivo.log
```

## Usuarios y Permisos

```bash
whoami
id
ls -l
chmod 600 archivo
chmod 755 script.sh
chown usuario:grupo archivo
groups
sudo -l
```

## Interpretar Permisos

```text
-rwxr-x---
 |  |  |
 |  |  others
 |  group
 owner
```

| Permiso | Significado |
| --- | --- |
| `r` | leer |
| `w` | escribir |
| `x` | ejecutar |

## Procesos y Servicios

```bash
ps aux
top
systemctl status ssh
systemctl list-units --type=service
systemctl list-units --type=service --state=running
journalctl -u ssh
```

## Procesos Sospechosos

Revisa:

- usuario que ejecuta el proceso;
- ruta del binario;
- proceso padre;
- consumo anormal;
- conexiones de red;
- argumentos raros.

## Red

```bash
ip addr
ip route
ss -tuln
curl -I https://example.com
dig example.com
```

## Logs Comunes

| Ruta | Uso |
| --- | --- |
| `/var/log/auth.log` | autenticacion Debian/Ubuntu |
| `/var/log/secure` | autenticacion RHEL/CentOS |
| `/var/log/syslog` | sistema |
| `journalctl` | systemd journal |

## Logs

```bash
journalctl -n 50
journalctl -u ssh
ls -la /var/log
tail -f /var/log/auth.log
```

## Seguridad Basica

- servicios innecesarios apagados;
- SSH sin root login directo;
- permisos restrictivos en archivos sensibles;
- usuarios con minimo privilegio;
- logs disponibles;
- actualizaciones aplicadas;
- backups definidos.

## Errores Comunes

- Ejecutar todo con `sudo`.
- Copiar comandos destructivos sin leer.
- No revisar en que directorio estas.
- Borrar evidencia al investigar.
- Confundir proceso, servicio y puerto.
