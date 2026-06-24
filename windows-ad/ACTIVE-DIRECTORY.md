# Active Directory

## Objetivo

Entender Active Directory como sistema central de identidad en muchas empresas.

Active Directory es una de las tecnologias mas importantes para seguridad corporativa. Si AD cae, muchas veces cae la empresa: usuarios, equipos, permisos, acceso a servidores, politicas y autenticacion dependen de el.

## Mapa Mental

```text
dominio -> domain controllers -> usuarios/equipos -> grupos -> permisos -> GPO -> logs
```

Cuando analices AD, piensa:

- Quien tiene privilegios?
- Que equipos son criticos?
- Que politicas se aplican?
- Que cuentas estan viejas o mal protegidas?
- Que eventos muestran cambios sensibles?

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

## NTLM

NTLM es otro mecanismo de autenticacion historico en entornos Windows.

En seguridad importa porque:

- Puede aparecer en ambientes legacy.
- Puede ser objetivo de relay.
- Debe reducirse cuando sea posible.
- Puede indicar configuraciones antiguas.

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

## Cuentas de Servicio

Son cuentas usadas por aplicaciones o servicios.

Riesgos:

- Passwords que nunca rotan.
- Permisos excesivos.
- Uso interactivo no necesario.
- SPNs mal gestionados.
- Secretos guardados en scripts.

Controles:

- Minimo privilegio.
- Rotacion.
- gMSA cuando aplique.
- Monitoreo de uso anomalo.
- Documentacion de propietario.

## Riesgos Comunes

- Usuarios con privilegios excesivos.
- Contraseñas debiles.
- Cuentas antiguas activas.
- Cuentas de servicio mal protegidas.
- GPOs inseguras.
- Falta de monitoreo.
- Admins usando cuentas privilegiadas para tareas diarias.

## Eventos que Deben Importarte

Ejemplos conceptuales:

- Logins exitosos y fallidos.
- Creacion de usuarios.
- Cambios de grupos privilegiados.
- Cambios de GPO.
- Bloqueos de cuenta.
- Uso de cuentas admin.
- Cambios en Domain Controllers.

No memorices IDs al inicio. Primero entiende que comportamiento quieres detectar.

## Buenas Practicas

- Minimo privilegio.
- MFA donde aplique.
- Separar cuentas admin y normales.
- Revisar grupos privilegiados.
- Desactivar cuentas antiguas.
- Monitorear cambios de grupo.
- Auditar GPOs.
- Proteger Domain Controllers.

## Errores Comunes

- Usar cuentas Domain Admin para tareas diarias.
- No separar cuentas admin y normales.
- Dejar usuarios antiguos activos.
- No revisar membresias de grupos.
- No monitorear cambios de GPO.
- No proteger Domain Controllers como activos criticos.

## Ejemplo de Dominio

Un dominio basico puede representarse con:

- 1 Domain Controller.
- 3 usuarios.
- 2 grupos.
- 2 equipos.
- 1 OU.
- 1 GPO.

El analisis debe explicar:

- Quien autentica.
- Donde viven los usuarios.
- Como se asignan permisos.
- Que pasaria si un usuario entra a Domain Admins.

## Ejemplo de Auditoria AD en Papel

Escenario:

```text
Dominio empresa.local
2 Domain Controllers
240 usuarios
25 usuarios con permisos administrativos
18 cuentas deshabilitadas pero aun en grupos
4 cuentas de servicio con password sin rotar
GPO antigua aplica scripts de inicio
```

Una auditoria basica de AD debe explicar:

- riesgos principales;
- preguntas para el administrador;
- evidencia necesaria;
- controles inmediatos;
- detecciones recomendadas.

## Criterio de Dominio

Puedes avanzar cuando puedas:

- Explicar dominio.
- Explicar Domain Controller.
- Explicar GPO.
- Explicar Kerberos a nivel basico.
- Identificar riesgos de grupos privilegiados.
- Proponer controles para cuentas admin y cuentas de servicio.
