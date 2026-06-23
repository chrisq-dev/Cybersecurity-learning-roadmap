# Logs y Alertas

## Objetivo

Aprender a leer eventos y convertirlos en conclusiones utiles. Blue Team empieza con visibilidad.

## Que es un Log

Un log es un registro de un evento.

Ejemplos:

- Usuario inicio sesion.
- Usuario fallo contraseña.
- Servicio se reinicio.
- Firewall bloqueo conexion.
- Servidor web respondio 500.
- Archivo fue ejecutado.

## Campos Comunes

Un log puede incluir:

- Timestamp.
- Host.
- Usuario.
- IP origen.
- IP destino.
- Puerto.
- Proceso.
- Accion.
- Resultado.
- Mensaje.

## Que es una Alerta

Una alerta es un evento o correlacion que requiere revision.

Ejemplo:

```text
10 logins fallidos para el usuario admin desde la misma IP en 5 minutos.
```

## Evidencia vs Suposicion

Evidencia:

```text
El usuario admin tuvo 10 fallos de login desde 203.0.113.10 entre 10:00 y 10:05.
```

Suposicion:

```text
Es un atacante.
```

Conclusion razonable:

```text
La actividad es consistente con intento de fuerza bruta, pero falta validar si la IP pertenece a un servicio interno o a un usuario legitimo.
```

## Flujo de Analisis

1. Entender la alerta.
2. Identificar entidades: usuario, host, IP, proceso.
3. Revisar tiempo.
4. Buscar eventos relacionados.
5. Comparar contra comportamiento normal.
6. Determinar severidad.
7. Recomendar accion.

## Preguntas Iniciales

- Que paso?
- Cuando paso?
- Donde paso?
- Quien estuvo involucrado?
- Desde donde?
- Cuantas veces?
- Antes o despues hubo algo relacionado?
- Hay impacto?

## Practica

Analiza este evento ficticio:

```text
2026-06-23T10:15:22 host=web01 user=admin src_ip=203.0.113.50 action=login result=failed
2026-06-23T10:15:28 host=web01 user=admin src_ip=203.0.113.50 action=login result=failed
2026-06-23T10:15:35 host=web01 user=admin src_ip=203.0.113.50 action=login result=failed
2026-06-23T10:16:02 host=web01 user=admin src_ip=203.0.113.50 action=login result=success
```

Responde:

- Que evidencia hay?
- Que hipotesis tienes?
- Que buscarias despues?
- Que accion recomendarias?

## Criterio de Dominio

Puedes avanzar cuando puedas:

- Identificar campos importantes.
- Diferenciar evidencia y suposicion.
- Formular hipotesis.
- Escribir una conclusion breve.
