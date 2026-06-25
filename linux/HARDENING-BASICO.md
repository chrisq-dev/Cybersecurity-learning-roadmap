# Hardening Básico de Linux

## Objetivo

Reducir superficie de ataque en un sistema Linux con controles básicos y verificables.

## Qué es Hardening

Hardening es configurar un sistema para reducir riesgo.

No es un solo comando. Es un conjunto de decisiones:

- Menos servicios expuestos.
- Menos privilegios.
- Más visibilidad.
- Configuraciones más seguras.
- Actualizaciones.

## Control 1: Actualizaciones

Riesgo:

- Software antiguo puede tener vulnerabilidades conocidas.

Práctica:

```bash
sudo apt update
sudo apt list --upgradable
```

Validación:

- Lista de paquetes actualizada.
- Parches aplicados según política.

## Control 2: Usuarios y Sudo

Riesgo:

- Usuarios innecesarios o sudo excesivo aumentan impacto.

Revisión:

```bash
cat /etc/passwd
getent group sudo
```

Buenas prácticas:

- Usuarios individuales.
- No compartir cuentas.
- Sudo solo a quien lo necesita.
- Cuentas antiguas deshabilitadas.

## Control 3: SSH Seguro

Riesgo:

- SSH expuesto con contraseña débil puede facilitar acceso no autorizado.

Archivo común:

```text
/etc/ssh/sshd_config
```

Controles:

- Deshabilitar login root por SSH.
- Preferir llaves.
- Restringir usuarios.
- Mantener logs.

Validación:

```bash
ss -tuln | grep :22
journalctl -u ssh
```

## Control 4: Firewall Local

Riesgo:

- Servicios innecesarios expuestos.

Comandos según distro:

```bash
sudo ufw status
sudo firewall-cmd --list-all
```

Buenas prácticas:

- Permitir solo puertos necesarios.
- Documentar excepciones.

## Control 5: Servicios

Riesgo:

- Servicios innecesarios aumentan superficie.

Revisión:

```bash
systemctl list-units --type=service
ss -tuln
```

Preguntas:

- Este servicio es necesario?
- Escucha en red?
- Bajo qué usuario corre?

## Control 6: Logs

Riesgo:

- Sin logs no puedes investigar.

Revisión:

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

## Criterios de Revisión

Una revisión de hardening debe considerar:

- Sistema actualizado;
- Usuarios revisados;
- Sudo revisado;
- SSH revisado;
- Firewall revisado;
- Servicios revisados;
- Logs disponibles;
- Cambios documentados.

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
