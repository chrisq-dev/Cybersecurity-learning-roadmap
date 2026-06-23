# Cheatsheet Linux

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

## Busqueda

```bash
find . -name "*.log"
grep -i "failed" archivo.log
grep -R "error" .
```

## Usuarios y Permisos

```bash
whoami
id
ls -l
chmod 600 archivo
chmod 755 script.sh
chown usuario:grupo archivo
```

## Procesos y Servicios

```bash
ps aux
top
systemctl status ssh
systemctl list-units --type=service
```

## Red

```bash
ip addr
ip route
ss -tuln
curl -I https://example.com
dig example.com
```

## Logs

```bash
journalctl -n 50
journalctl -u ssh
ls -la /var/log
```
