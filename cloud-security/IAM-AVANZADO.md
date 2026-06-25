# IAM Avanzado

## Objetivo

Profundizar en identidad y permisos cloud, una de las causas más comunes de incidentes.

IAM es el plano de control de la nube. Si una identidad tiene permisos excesivos o credenciales expuestas, un atacante puede crear recursos, leer datos, modificar logs o escalar privilegios sin tocar servidores tradicionales.

## Mapa Mental

```text
identidad -> política -> acción -> recurso -> condicion -> log -> revisión
```

Cada permiso debería poder explicarse:

- Quien lo necesita;
- Para que acción;
- Sobre que recurso;
- Bajo que condicion;
- Por cuanto tiempo;
- Como se audita.

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

## Problema Común

Permisos amplios por comodidad.

Ejemplo conceptual:

```text
admin para todo porque asi funciona rápido
```

Riesgo:

- Si esa identidad se compromete, el impacto es enorme.

## Principios

### Mínimo Privilegio

Dar solo los permisos necesarios.

### Just-in-Time

Elevar permisos solo cuando se necesitan y por tiempo limitado.

### Separación de Funciones

Evitar que una sola identidad pueda hacer todo el flujo crítico sin revisión.

### Deny por Defecto

Permitir explicitamente lo necesario. Bloquear lo demas.

## Políticas

Una política debe responder:

- Quién?
- Puede hacer qué acción?
- Sobre qué recurso?
- Bajo qué condicion?

## Anatomia Conceptual de una Política

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

- Efecto: permite o niega;
- Acción: que puede hacer;
- Recurso: sobre que;
- Condicion: cuando aplica.

## Condiciones

Ejemplos de condiciones:

- Solo desde cierta red.
- Solo con MFA.
- Solo para ciertos recursos.
- Solo durante cierto flujo.

Condiciones útiles:

- MFA presente.
- IP corporativa.
- Region permitida.
- Tags del recurso.
- Tiempo de sesión.
- Identidad asumida por servicio especifico.

## Access Keys

Riesgos:

- Llaves antiguas.
- Llaves en repositorios.
- Llaves en laptops.
- Llaves sin rotación.

Controles:

- Usar roles cuando sea posible.
- Rotación.
- Secret scanning.
- Alertas de uso anomalo.
- Eliminar llaves no usadas.

## Roles vs Llaves Permanentes

Siempre que sea posible, prefiere roles temporales sobre llaves permanentes.

Ventajas:

- Credenciales con expiracion;
- Menor riesgo si se filtran;
- Mejor integración con servicios;
- Auditoria más clara;
- Menos secretos en laptops y repositorios.

## Privilege Escalation en IAM

Puede ocurrir cuando una identidad puede otorgarse permisos, asumir roles amplios o modificar políticas.

Preguntas:

- Esta identidad puede cambiar sus propios permisos?
- Puede crear llaves?
- Puede asumir roles privilegiados?
- Puede modificar políticas?
- Puede desactivar logs?

## Rutas Conceptuales de Escalacion

Sin entrar en abuso operativo, estas son clases de riesgo que debes reconocer:

- Una identidad puede adjuntar políticas admin;
- Una identidad puede crear o rotar llaves de otra cuenta;
- Una identidad puede asumir un rol más privilegiado;
- Una identidad puede modificar funciones o pipelines que corren con permisos altos;
- Una identidad puede desactivar logs o borrar evidencia;
- Una identidad puede leer secretos usados por servicios críticos.

## Logging Importante

Monitorea:

- Creación de access keys;
- Uso de root/admin;
- Cambios de políticas;
- Roles asumidos;
- Cambios de trust policy;
- Desactivación de logs;
- Cambios de MFA;
- Acceso a secretos;
- Permisos agregados a identidades.

## Revisión Periodica

Preguntas:

- Qué identidades no se usan?
- Qué llaves están viejas?
- Qué cuentas no tienen MFA?
- Qué permisos wildcard existen?
- Qué roles pueden asumir humanos?
- Qué identidades pueden modificar IAM?
- Qué secretos no tienen owner?

## Ejemplo de Análisis de Política

Esta política representa privilegios excesivos:

```text
Identity: app-prod
Actions: *
Resource: *
Condition: none
```

El análisis debe explicar:

- Qué riesgo tiene?
- Qué permisos probablemente necesita una app normal?
- Cómo reducirias privilegios?
- Qué logs activarias?

## Criterios de Revisión IAM

Una revisión IAM avanzada debe razonar sobre:

- Identidades humanas y no humanas;
- Permisos mínimos para cada identidad;
- Permisos peligrosos;
- Condiciones como origen, recurso, MFA o tiempo;
- Logs y alertas;
- Alternativas menos permisivas que `Action: * Resource: *`.

## Controles Que Deben Entenderse

- MFA en identidades humanas sensibles reduce abuso de credenciales.
- Evitar uso diario de root reduce impacto operativo.
- Roles temporales son preferibles a llaves permanentes.
- Llaves viejas aumentan superficie de compromiso.
- Permisos wildcard deben estar justificados y limitados.
- Logs protegidos evitan que un atacante borre evidencia.
- Secretos fuera del código reducen fugas accidentales.
- Revisión periodica de accesos reduce privilegios acumulados.

## Errores Comunes

- Dar admin para resolver rápido.
- No distinguir identidad humana y no humana.
- Dejar llaves en repositorios.
- No revisar rutas de escalacion.
- No proteger logs contra modificacion.
- No tener owner de cada identidad.

## Criterio de Dominio

Puedes avanzar cuando puedas:

- Diferenciar identidad humana y no humana.
- Explicar riesgo de access keys.
- Explicar mínimo privilegio en IAM.
- Identificar rutas de escalacion de privilegios conceptuales.
- Diseñar una revisión IAM con logs, condiciones y remediación.
