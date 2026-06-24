# Hardening Basico de Linux

## Objetivo

Reducir superficie de ataque en un sistema Linux con controles basicos y verificables.

## Que es Hardening

Hardening es configurar un sistema para reducir riesgo.

No es un solo comando. Es un conjunto de decisiones:

- Menos servicios expuestos.
- Menos privilegios.
- Mas visibilidad.
- Configuraciones mas seguras.
- Actualizaciones.

## Control 1: Actualizaciones

Riesgo:

- Software antiguo puede tener vulnerabilidades conocidas.

Practica:

```bash
sudo apt update
sudo apt list --upgradable
```

Validacion:

- Lista de paquetes actualizada.
- Parches aplicados segun politica.

## Control 2: Usuarios y Sudo

Riesgo:

- Usuarios innecesarios o sudo excesivo aumentan impacto.

Revision:

```bash
cat /etc/passwd
getent group sudo
```

Buenas practicas:

- Usuarios individuales.
- No compartir cuentas.
- Sudo solo a quien lo necesita.
- Cuentas antiguas deshabilitadas.

## Control 3: SSH Seguro

Riesgo:

- SSH expuesto con contraseña debil puede facilitar acceso no autorizado.

Archivo comun:

```text
/etc/ssh/sshd_config
```

Controles:

- Deshabilitar login root por SSH.
- Preferir llaves.
- Restringir usuarios.
- Mantener logs.

Validacion:

```bash
ss -tuln | grep :22
journalctl -u ssh
```

## Control 4: Firewall Local

Riesgo:

- Servicios innecesarios expuestos.

Comandos segun distro:

```bash
sudo ufw status
sudo firewall-cmd --list-all
```

Buenas practicas:

- Permitir solo puertos necesarios.
- Documentar excepciones.

## Control 5: Servicios

Riesgo:

- Servicios innecesarios aumentan superficie.

Revision:

```bash
systemctl list-units --type=service
ss -tuln
```

Preguntas:

- Este servicio es necesario?
- Escucha en red?
- Bajo que usuario corre?

## Control 6: Logs

Riesgo:

- Sin logs no puedes investigar.

Revision:

```bash
journalctl -n 50
ls -la /var/log
```

Eventos importantes:

- Login.
- Sudo.
- SSH.
- Servicios reiniciados.
- Errores repetidos.

## Criterios de Revision

Una revision de hardening debe considerar:

- sistema actualizado;
- usuarios revisados;
- sudo revisado;
- SSH revisado;
- firewall revisado;
- servicios revisados;
- logs disponibles;
- cambios documentados.

## Ejemplo de resultado

```md
# Hardening Linux

## Sistema

## Controles Revisados

## Riesgos Encontrados

## Cambios Aplicados

## Evidencia

## Mejoras Recomendadas
```

## Criterio de Dominio

Puedes avanzar cuando puedas:

- Explicar superficie de ataque.
- Revisar servicios y puertos.
- Revisar sudo.
- Explicar hardening SSH.
- Documentar evidencia.
