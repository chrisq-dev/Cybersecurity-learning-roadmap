# Comandos Basicos de Linux

## Objetivo

Usar la terminal para moverte, inspeccionar archivos, buscar informacion y entender el sistema.

## Navegacion

```bash
pwd
ls
ls -la
cd /ruta
cd ..
cd ~
```

Explicacion:

- `pwd`: muestra donde estas.
- `ls`: lista archivos.
- `ls -la`: lista archivos con detalles y ocultos.
- `cd`: cambia de directorio.

## Leer Archivos

```bash
cat archivo.txt
less archivo.txt
head archivo.txt
tail archivo.txt
tail -f archivo.log
```

Uso:

- `cat`: ver archivo completo.
- `less`: navegar archivo grande.
- `head`: primeras lineas.
- `tail`: ultimas lineas.
- `tail -f`: seguir logs en tiempo real.

## Buscar

```bash
find /ruta -name "*.log"
grep "error" archivo.log
grep -i "failed" archivo.log
grep -R "password" .
```

Uso:

- `find`: buscar archivos.
- `grep`: buscar texto.
- `-i`: ignorar mayusculas/minusculas.
- `-R`: buscar recursivamente.

## Sistema

```bash
whoami
id
hostname
uname -a
df -h
free -h
```

Uso:

- Ver usuario actual.
- Ver grupos.
- Ver hostname.
- Ver version del sistema.
- Ver disco.
- Ver memoria.

## Red

```bash
ip addr
ip route
ss -tuln
curl -I https://example.com
dig example.com
```

Uso:

- Ver IPs.
- Ver gateway.
- Ver puertos escuchando.
- Probar HTTP.
- Consultar DNS.

## Practica

Crea una nota con:

```md
# Comandos Basicos

## Navegacion

Comando usado:
Resultado:
Que significa:

## Busqueda

Comando usado:
Resultado:
Que significa:

## Red

Comando usado:
Resultado:
Que significa:
```

## Criterio de Dominio

Puedes avanzar cuando puedas:

- Moverte por carpetas.
- Leer archivos.
- Buscar texto.
- Ver usuario actual.
- Ver IP y puertos.
- Explicar que hace cada comando sin copiar.
