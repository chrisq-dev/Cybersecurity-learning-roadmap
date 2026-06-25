# Permisos y Usuarios en Linux

## Objetivo

Entender usuarios, grupos y permisos. Esto es esencial para hardening, administracion y privilege escalation en laboratorios.

## Usuarios y Grupos

Cada proceso corre bajo un usuario.

Cada archivo tiene:

- Owner.
- Group.
- Permisos para owner.
- Permisos para group.
- Permisos para others.

Ver identidad:

```bash
whoami
id
```

## Permisos rwx

```text
r = read
w = write
x = execute
```

Ejemplo:

```text
-rwxr-x---
```

Interpretacion:

- `-`: archivo normal.
- `rwx`: owner puede leer, escribir y ejecutar.
- `r-x`: grupo puede leer y ejecutar.
- `---`: otros no tienen permisos.

## Chmod

Cambia permisos.

Modo simbolico:

```bash
chmod u+x script.sh
chmod g-w archivo.txt
chmod o-r secreto.txt
```

Modo numerico:

```bash
chmod 755 script.sh
chmod 644 publico.txt
chmod 600 secreto.txt
```

Numeros:

- 4 = read.
- 2 = write.
- 1 = execute.

Ejemplos:

- 7 = 4+2+1 = rwx.
- 6 = 4+2 = rw-.
- 5 = 4+1 = r-x.

## Chown

Cambia owner o grupo.

```bash
chown usuario archivo.txt
chown usuario:grupo archivo.txt
```

## Sudo

Permite ejecutar comandos con privilegios elevados si el usuario está autorizado.

Riesgo:

- Dar sudo sin control permite cambios críticos en el sistema.

## Archivos Sensibles

Ejemplos:

- `/etc/passwd`: información de usuarios.
- `/etc/shadow`: hashes de contraseñas, requiere privilegios.
- `/etc/sudoers`: permisos sudo.
- Llaves SSH privadas.
- Archivos `.env`.

## Observación Segura

```bash
mkdir permisos-lab
cd permisos-lab
touch publico.txt secreto.txt script.sh
chmod 644 publico.txt
chmod 600 secreto.txt
chmod 750 script.sh
ls -l
```

Explica:

- Quién puede leer `publico.txt`.
- Quién puede leer `secreto.txt`.
- Quién puede ejecutar `script.sh`.

## Criterio de Dominio

Puedes avanzar cuando puedas:

- Leer permisos `rwx`.
- Usar `chmod`.
- Explicar 755, 644 y 600.
- Entender sudo.
- Identificar archivos sensibles.
