# Fundamentos de Linux

## Objetivo

Usar Linux con suficiente comodidad para administrar sistemas, ejecutar herramientas y analizar problemas de seguridad.

Linux aparece en servidores, contenedores, herramientas de seguridad, cloud, logs, laboratorios y appliances. No necesitas memorizar todos los comandos; necesitas poder orientarte, leer evidencia y modificar el sistema con cuidado.

## Mapa Mental

```text
usuario -> permisos -> procesos -> servicios -> red -> logs -> evidencia
```

Cuando investigues Linux, piensa en estas preguntas:

- Quien soy en el sistema?
- Que permisos tengo?
- Que procesos estan corriendo?
- Que servicios escuchan en red?
- Que logs explican lo que paso?
- Que archivo o configuracion cambio?

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
ip route
df -h
du -sh *
chmod
chown
journalctl
```

## Navegacion y Lectura

Comandos esenciales:

```bash
pwd                 # Donde estoy
ls -la              # Que hay aqui
cd /ruta            # Cambiar de directorio
less archivo.log    # Leer sin cargar todo en pantalla
tail -f archivo.log # Ver cambios en vivo
find . -name "*.log"
grep -i "error" archivo.log
```

Regla practica: antes de cambiar algo, mira donde estas y guarda evidencia.

## Permisos

Ejemplo:

```text
rwxr-x---
```

Significa:

- Owner: read, write, execute.
- Group: read, execute.
- Others: sin permisos.

Interpretacion:

```text
- rwx r-x ---
|  |   |   |
|  |   |   others
|  |   group
|  owner
tipo de archivo
```

Comandos:

```bash
chmod 600 secreto.txt
chmod 755 script.sh
chown usuario:grupo archivo.txt
id
groups
```

En seguridad, permisos incorrectos pueden permitir lectura de secretos, escritura en archivos criticos o ejecucion no autorizada.

## Usuarios y Privilegios

Comandos utiles:

```bash
whoami
id
sudo -l
cat /etc/passwd
cat /etc/group
```

Puntos clave:

- `root` tiene control total.
- `sudo` permite ejecutar comandos con privilegios elevados.
- Un usuario con demasiados permisos aumenta el impacto de una cuenta comprometida.
- Las llaves SSH deben protegerse con permisos restrictivos.

## Procesos y Servicios

```bash
ps aux
top
systemctl status ssh
systemctl list-units --type=service --state=running
ss -tuln
```

Preguntas:

- Que proceso esta consumiendo recursos?
- Que servicio escucha en red?
- Que usuario ejecuta el proceso?
- El servicio deberia estar activo?

## Logs

Ubicaciones comunes:

- `/var/log/auth.log`
- `/var/log/syslog`
- `/var/log/secure`
- `journalctl`

Comandos:

```bash
journalctl -xe
journalctl -u ssh
sudo tail -n 50 /var/log/auth.log
sudo grep -i "failed" /var/log/auth.log
```

## Errores Comunes de Principiante

- Ejecutar todo con `sudo` sin entender impacto.
- Copiar comandos destructivos sin leerlos.
- No revisar permisos despues de crear archivos sensibles.
- No diferenciar proceso, servicio y puerto.
- Borrar logs o evidencia durante una investigacion.

## Practica Guiada

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

Agrega:

```bash
echo "login failed example" > auth-demo.log
grep -i "failed" auth-demo.log
ps aux | head
ss -tuln
```

## Mini Laboratorio: Auditoria Local Basica

Una nota de ejemplo, `auditoria-linux-basica.md`, puede incluir:

1. Usuario actual y grupos.
2. Directorio de trabajo.
3. Permisos de tres archivos.
4. Cinco procesos observados.
5. Puertos escuchando.
6. Una conclusion: que seria normal y que te llamaria la atencion.

## Checklist de Seguridad Basica

- Usuarios sin necesidad de privilegios elevados.
- Servicios innecesarios apagados.
- Puertos expuestos conocidos.
- Logs disponibles.
- Archivos sensibles con permisos restrictivos.
- Paquetes actualizados.

## Criterio de Dominio

Puedes avanzar cuando puedas:

- Explicar permisos.
- Buscar archivos.
- Leer logs.
- Ver procesos.
- Ver puertos.
- Crear un script pequeno.
- Explicar que evidencia mirarias ante un login sospechoso.
