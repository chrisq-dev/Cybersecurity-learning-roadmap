# Sigma y YARA

## Objetivo

Entender dos formatos comunes de deteccion: Sigma para eventos/logs y YARA para archivos o patrones.

## Sigma

Sigma es un formato generico para escribir reglas de deteccion sobre logs.

Idea:

```text
Si ves estos eventos o campos, genera una alerta.
```

Ejemplo conceptual:

```yaml
title: Multiples Logins Fallidos
logsource:
  product: windows
  service: security
detection:
  selection:
    EventID: 4625
  condition: selection
level: medium
```

## Campos de una Regla Sigma

- `title`: nombre.
- `description`: que detecta.
- `logsource`: fuente.
- `detection`: logica.
- `condition`: condicion.
- `level`: severidad.
- `falsepositives`: falsos positivos esperados.

## Buenas Preguntas para Sigma

- Que comportamiento quiero detectar?
- Que logs necesito?
- Que campos lo prueban?
- Que falsos positivos espero?
- Que tan grave es?

## YARA

YARA se usa para identificar archivos o patrones, comunmente en malware analysis.

Ejemplo simple:

```yara
rule Archivo_Sospechoso_Demo
{
    strings:
        $a = "powershell"
        $b = "download"

    condition:
        all of them
}
```

## Campos de una Regla YARA

- Nombre de regla.
- Metadata opcional.
- Strings.
- Condicion.

## Diferencia Sigma vs YARA

| Herramienta | Se usa para | Ejemplo |
| --- | --- | --- |
| Sigma | Logs/eventos | Logins fallidos |
| YARA | Archivos/patrones | Archivo con cadenas sospechosas |

## Practica Sigma

Escribe una regla conceptual para:

```text
Detectar 5 logins fallidos para el mismo usuario en poco tiempo.
```

Incluye:

- Fuente.
- Campo usuario.
- Campo resultado.
- Falsos positivos.
- Severidad.

## Practica YARA

Escribe una regla conceptual que busque:

- La palabra `powershell`.
- La palabra `encodedcommand`.

Explica por que podria ser sospechoso y por que tambien podria ser legitimo.

## Criterio de Dominio

Puedes avanzar cuando puedas:

- Explicar Sigma.
- Explicar YARA.
- Decir que datos necesita una deteccion.
- Mencionar falsos positivos.
