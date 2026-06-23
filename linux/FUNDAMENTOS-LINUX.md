# Fundamentos de Linux

## Objetivo

Usar Linux con suficiente comodidad para administrar sistemas, ejecutar herramientas y analizar problemas de seguridad.

## Comandos Base

```bash
pwd
ls -la
cd
cat
less
head
tail
find
grep
whoami
id
ps aux
ss -tuln
ip addr
```

## Permisos

Ejemplo:

```text
rwxr-x---
```

Significa:

- Owner: read, write, execute.
- Group: read, execute.
- Others: sin permisos.

## Logs

Ubicaciones comunes:

- `/var/log/auth.log`
- `/var/log/syslog`
- `/var/log/secure`
- `journalctl`

## Practica

1. Crear una carpeta de laboratorio.
2. Crear tres archivos.
3. Cambiar permisos.
4. Buscar texto con `grep`.
5. Revisar procesos.
6. Revisar puertos abiertos.

Comandos sugeridos:

```bash
mkdir linux-lab
cd linux-lab
touch publico.txt privado.txt script.sh
chmod 644 publico.txt
chmod 600 privado.txt
chmod 750 script.sh
ls -l
```

## Criterio de Dominio

Puedes avanzar cuando puedas:

- Explicar permisos.
- Buscar archivos.
- Leer logs.
- Ver procesos.
- Ver puertos.
- Crear un script pequeno.
