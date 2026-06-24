# IAM Avanzado

## Objetivo

Profundizar en identidad y permisos cloud, una de las causas mas comunes de incidentes.

IAM es el plano de control de la nube. Si una identidad tiene permisos excesivos o credenciales expuestas, un atacante puede crear recursos, leer datos, modificar logs o escalar privilegios sin tocar servidores tradicionales.

## Mapa Mental

```text
identidad -> politica -> accion -> recurso -> condicion -> log -> revision
```

Cada permiso deberia poder explicarse:

- quien lo necesita;
- para que accion;
- sobre que recurso;
- bajo que condicion;
- por cuanto tiempo;
- como se audita.

## Identidades Humanas y No Humanas

Humanas:

- Administradores.
- Desarrolladores.
- Analistas.

No humanas:

- Apps.
- Service accounts.
- Roles.
- Pipelines CI/CD.
- Funciones serverless.

## Problema Comun

Permisos amplios por comodidad.

Ejemplo conceptual:

```text
admin para todo porque asi funciona rapido
```

Riesgo:

- Si esa identidad se compromete, el impacto es enorme.

## Principios

### Minimo Privilegio

Dar solo los permisos necesarios.

### Just-in-Time

Elevar permisos solo cuando se necesitan y por tiempo limitado.

### Separacion de Funciones

Evitar que una sola identidad pueda hacer todo el flujo critico sin revision.

### Deny por Defecto

Permitir explicitamente lo necesario. Bloquear lo demas.

## Politicas

Una politica debe responder:

- Quien?
- Puede hacer que accion?
- Sobre que recurso?
- Bajo que condicion?

## Anatomia Conceptual de una Politica

```json
{
  "Effect": "Allow",
  "Action": ["storage:GetObject"],
  "Resource": ["bucket/reportes/*"],
  "Condition": {
    "MFA": true
  }
}
```

Lo importante no es memorizar sintaxis de un proveedor. Lo importante es entender:

- efecto: permite o niega;
- accion: que puede hacer;
- recurso: sobre que;
- condicion: cuando aplica.

## Condiciones

Ejemplos de condiciones:

- Solo desde cierta red.
- Solo con MFA.
- Solo para ciertos recursos.
- Solo durante cierto flujo.

Condiciones utiles:

- MFA presente.
- IP corporativa.
- region permitida.
- tags del recurso.
- tiempo de sesion.
- identidad asumida por servicio especifico.

## Access Keys

Riesgos:

- Llaves antiguas.
- Llaves en repositorios.
- Llaves en laptops.
- Llaves sin rotacion.

Controles:

- Usar roles cuando sea posible.
- Rotacion.
- Secret scanning.
- Alertas de uso anomalo.
- Eliminar llaves no usadas.

## Roles vs Llaves Permanentes

Siempre que sea posible, prefiere roles temporales sobre llaves permanentes.

Ventajas:

- credenciales con expiracion;
- menor riesgo si se filtran;
- mejor integracion con servicios;
- auditoria mas clara;
- menos secretos en laptops y repositorios.

## Privilege Escalation en IAM

Puede ocurrir cuando una identidad puede otorgarse permisos, asumir roles amplios o modificar politicas.

Preguntas:

- Esta identidad puede cambiar sus propios permisos?
- Puede crear llaves?
- Puede asumir roles privilegiados?
- Puede modificar politicas?
- Puede desactivar logs?

## Rutas Conceptuales de Escalacion

Sin entrar en abuso operativo, estas son clases de riesgo que debes reconocer:

- una identidad puede adjuntar politicas admin;
- una identidad puede crear o rotar llaves de otra cuenta;
- una identidad puede asumir un rol mas privilegiado;
- una identidad puede modificar funciones o pipelines que corren con permisos altos;
- una identidad puede desactivar logs o borrar evidencia;
- una identidad puede leer secretos usados por servicios criticos.

## Logging Importante

Monitorea:

- creacion de access keys;
- uso de root/admin;
- cambios de politicas;
- roles asumidos;
- cambios de trust policy;
- desactivacion de logs;
- cambios de MFA;
- acceso a secretos;
- permisos agregados a identidades.

## Revision Periodica

Preguntas:

- Que identidades no se usan?
- Que llaves estan viejas?
- Que cuentas no tienen MFA?
- Que permisos wildcard existen?
- Que roles pueden asumir humanos?
- Que identidades pueden modificar IAM?
- Que secretos no tienen owner?

## Ejemplo de Analisis de Politica

Esta politica representa privilegios excesivos:

```text
Identity: app-prod
Actions: *
Resource: *
Condition: none
```

El analisis debe explicar:

- Que riesgo tiene?
- Que permisos probablemente necesita una app normal?
- Como reducirias privilegios?
- Que logs activarias?

## Criterios de Revision IAM

Una revision IAM avanzada debe razonar sobre:

- identidades humanas y no humanas;
- permisos minimos para cada identidad;
- permisos peligrosos;
- condiciones como origen, recurso, MFA o tiempo;
- logs y alertas;
- alternativas menos permisivas que `Action: * Resource: *`.

## Controles Que Deben Entenderse

- MFA en identidades humanas sensibles reduce abuso de credenciales.
- Evitar uso diario de root reduce impacto operativo.
- Roles temporales son preferibles a llaves permanentes.
- Llaves viejas aumentan superficie de compromiso.
- Permisos wildcard deben estar justificados y limitados.
- Logs protegidos evitan que un atacante borre evidencia.
- Secretos fuera del codigo reducen fugas accidentales.
- Revision periodica de accesos reduce privilegios acumulados.

## Errores Comunes

- Dar admin para resolver rapido.
- No distinguir identidad humana y no humana.
- Dejar llaves en repositorios.
- No revisar rutas de escalacion.
- No proteger logs contra modificacion.
- No tener owner de cada identidad.

## Criterio de Dominio

Puedes avanzar cuando puedas:

- Diferenciar identidad humana y no humana.
- Explicar riesgo de access keys.
- Explicar minimo privilegio en IAM.
- Identificar rutas de escalacion de privilegios conceptuales.
- Diseñar una revision IAM con logs, condiciones y remediacion.
