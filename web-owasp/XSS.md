# Cross-Site Scripting

## Objetivo

Entender XSS, por que ocurre y como prevenirlo.

## Que es

XSS ocurre cuando una aplicacion permite que contenido no confiable se ejecute como JavaScript en el navegador de otros usuarios.

## Tipos

### Reflected XSS

La entrada aparece inmediatamente en la respuesta.

Ejemplo conceptual:

```text
/search?q=texto
```

Si `q` se refleja sin escape, puede ser peligroso.

### Stored XSS

El payload queda guardado en la aplicacion.

Ejemplos:

- Comentarios.
- Perfil.
- Mensajes.

### DOM XSS

La falla ocurre por JavaScript del cliente que procesa datos inseguros.

## Impacto

Puede permitir:

- Robo de informacion visible en la pagina.
- Acciones en nombre del usuario.
- Manipulacion de contenido.
- Redireccion a phishing.
- Robo de tokens si estan mal protegidos.

## Mitigacion

- Escapar salida segun contexto.
- Sanitizar HTML cuando se permita HTML.
- Usar frameworks correctamente.
- Content Security Policy.
- Cookies `HttpOnly` y `Secure`.
- Validacion de entrada como control adicional, no unico.

## Contextos

El escape depende del lugar:

- HTML.
- Atributo HTML.
- JavaScript.
- URL.
- CSS.

Escapar mal puede dejar bypasses.

## Señales de Alerta

- Parametros reflejados.
- Campos de comentario sin sanitizar.
- HTML permitido sin controles.
- JavaScript que usa `innerHTML` con datos no confiables.

## Practica Segura

Usa labs autorizados. Documenta:

- Donde entra el dato.
- Donde se renderiza.
- Que contexto usa.
- Impacto.
- Mitigacion.

## Criterio de Dominio

Puedes avanzar cuando puedas:

- Diferenciar reflected, stored y DOM XSS.
- Explicar escape por contexto.
- Explicar CSP a nivel basico.
- Explicar por que `HttpOnly` ayuda.
