# Active Directory

## Objetivo

Entender Active Directory como sistema central de identidad en muchas empresas.

## Que es Active Directory

Active Directory es una tecnologia de Microsoft para administrar identidades, equipos, grupos, politicas y acceso en una organizacion.

En vez de tener usuarios separados en cada maquina, una empresa puede centralizar identidades en un dominio.

## Conceptos Principales

### Dominio

Agrupacion logica de usuarios, equipos y recursos.

Ejemplo:

```text
empresa.local
```

### Domain Controller

Servidor que administra el dominio y participa en autenticacion.

Si un Domain Controller cae o es comprometido, el impacto puede ser alto.

### Usuario

Identidad de una persona o servicio.

### Equipo

Objeto que representa una computadora unida al dominio.

### Grupo

Conjunto de usuarios o equipos.

Se usa para asignar permisos.

### OU

Organizational Unit. Contenedor para organizar objetos y aplicar politicas.

### GPO

Group Policy Object. Politicas que se aplican a usuarios o equipos.

Ejemplos:

- Politica de contraseñas.
- Configuracion de firewall.
- Scripts de inicio.
- Restricciones de seguridad.

## Kerberos

Kerberos es un protocolo de autenticacion usado en Active Directory.

Idea simplificada:

1. Usuario demuestra identidad.
2. Recibe tickets.
3. Usa tickets para acceder a servicios.

Importa porque:

- Reduce envio repetido de contraseñas.
- Los tickets son objetivo en ataques.
- Muchos eventos de seguridad dependen de autenticacion Kerberos.

## LDAP

LDAP permite consultar el directorio.

Ejemplo de informacion:

- Usuarios.
- Grupos.
- Equipos.
- Atributos.

## Grupos Privilegiados

Ejemplos:

- Domain Admins.
- Enterprise Admins.
- Administrators.
- Account Operators.
- Backup Operators.

Riesgo:

- Un usuario en grupo privilegiado puede afectar gran parte del dominio.

## Riesgos Comunes

- Usuarios con privilegios excesivos.
- Contraseñas debiles.
- Cuentas antiguas activas.
- Cuentas de servicio mal protegidas.
- GPOs inseguras.
- Falta de monitoreo.
- Admins usando cuentas privilegiadas para tareas diarias.

## Buenas Practicas

- Minimo privilegio.
- MFA donde aplique.
- Separar cuentas admin y normales.
- Revisar grupos privilegiados.
- Desactivar cuentas antiguas.
- Monitorear cambios de grupo.
- Auditar GPOs.
- Proteger Domain Controllers.

## Practica Conceptual

Dibuja un dominio con:

- 1 Domain Controller.
- 3 usuarios.
- 2 grupos.
- 2 equipos.
- 1 OU.
- 1 GPO.

Explica:

- Quien autentica.
- Donde viven los usuarios.
- Como se asignan permisos.
- Que pasaria si un usuario entra a Domain Admins.

## Criterio de Dominio

Puedes avanzar cuando puedas:

- Explicar dominio.
- Explicar Domain Controller.
- Explicar GPO.
- Explicar Kerberos a nivel basico.
- Identificar riesgos de grupos privilegiados.
