---
title: "Cuentas, contraseñas y passkeys"
level: "inicial"
content_type: "guia"
updated: "2026-06-29"
reviewed: "2026-06-29"
reviewed_against: "NIST SP 800-63B, CISA Secure Our World, FIDO Alliance passkeys"
official_sources:
  - title: "NIST SP 800-63B: Authentication and Lifecycle Management"
    url: "https://pages.nist.gov/800-63-4/sp800-63b.html"
  - title: "FIDO Alliance Passkeys"
    url: "https://fidoalliance.org/passkeys/"
  - title: "CISA Secure Our World"
    url: "https://www.cisa.gov/secure-our-world"
---

# Cuentas, contraseñas y passkeys

La mayoría de ataques contra usuarios no empieza con una técnica avanzada. Empieza con contraseñas reutilizadas, phishing, robo de sesiones o engaños para compartir códigos.

Esta guía explica cómo proteger cuentas importantes con criterios actuales: contraseñas únicas, gestores de contraseñas, passkeys, MFA y recuperación segura.

## La idea central

Una cuenta segura no depende de una sola barrera. Debe combinar:

1. contraseña única o passkey;
2. MFA cuando aplique;
3. recuperación protegida;
4. sesiones revisadas;
5. alertas de actividad.

Si la recuperación es débil, la cuenta sigue siendo débil aunque la contraseña sea buena.

## Qué cuentas proteger primero

Prioriza así:

| Prioridad | Cuenta | Por qué importa |
|---|---|---|
| 1 | Correo principal | Recupera casi todo lo demás |
| 2 | Banco y tarjetas | Impacto financiero directo |
| 3 | Apple ID, Google, Microsoft | Controlan celular, nube, correo y sesiones |
| 4 | Gestor de contraseñas | Guarda acceso al resto |
| 5 | WhatsApp y redes sociales | Suplantación y estafas a contactos |
| 6 | Trabajo o escuela | Puede afectar a terceros |
| 7 | Cripto e inversiones | Recuperación difícil o imposible |

Empieza por las cuentas con más impacto, no por las que usas para entretenimiento.

## Contraseñas modernas

Una buena contraseña debe ser:

- única;
- larga;
- no reutilizada;
- no basada en datos públicos;
- guardada en un gestor.

No necesitas crear reglas raras como cambiar `a` por `@` o poner `2026!` al final. Los atacantes conocen esos patrones.

Mejor:

```text
frase larga generada por gestor o contraseña aleatoria única
```

Peor:

```text
NombreMascota2026!
Empresa2026!
MismaClaveBanco!
```

## Gestor de contraseñas

Un gestor de contraseñas sirve para:

- crear contraseñas largas;
- guardar una contraseña distinta por cuenta;
- detectar contraseñas repetidas;
- autocompletar solo en dominios correctos;
- guardar notas seguras y códigos de recuperación.

Protege el gestor con:

- contraseña maestra fuerte;
- passkey o MFA;
- recuperación configurada;
- dispositivos confiables;
- cierre de sesión en equipos compartidos.

## Passkeys

Una passkey permite iniciar sesión usando criptografía y el desbloqueo de tu dispositivo, como huella, rostro, PIN o contraseña local. A diferencia de una contraseña, la passkey no se escribe en una página falsa.

Ventajas:

- reduce phishing;
- evita reutilización de contraseñas;
- no tienes que memorizar secretos largos;
- funciona bien con dispositivos modernos;
- puede sincronizarse con ecosistemas como Apple, Google o Microsoft.

Úsala primero en:

- Google;
- Apple ID;
- Microsoft;
- gestor de contraseñas;
- GitHub;
- cuentas bancarias si lo permiten.

## Passkey no significa descuidar recuperación

Una cuenta con passkey puede seguir en riesgo si:

- el correo de recuperación está comprometido;
- el teléfono de recuperación pertenece a una SIM vulnerable;
- dejas sesiones abiertas en equipos ajenos;
- pierdes todos tus dispositivos sin códigos de recuperación;
- alguien tiene acceso físico a tu celular desbloqueado.

Por eso debes guardar códigos de recuperación y revisar métodos de recuperación.

## MFA: no todos los métodos son iguales

Orden recomendado:

| Método | Recomendación |
|---|---|
| Llave física de seguridad | Mejor opción para cuentas críticas |
| Passkey | Muy buena opción para usuarios modernos |
| App autenticadora | Buena opción general |
| Notificación push con número | Mejor que aprobar a ciegas |
| SMS | Úsalo solo si no hay alternativa |

Nunca compartas códigos MFA. Ningún banco, soporte técnico o plataforma legítima necesita que le dictes tu código.

## MFA fatigue

Un atacante puede intentar iniciar sesión muchas veces para que apruebes una notificación por cansancio.

Señales:

- recibes aprobaciones que no pediste;
- llegan varios códigos seguidos;
- alguien te llama diciendo que debes aprobar para "bloquear el intento".

Qué hacer:

1. no apruebes;
2. cambia contraseña;
3. cierra sesiones;
4. revisa actividad;
5. cambia a passkey o método con número si está disponible.

## Recuperación de cuentas

Revisa en cada cuenta importante:

- correo de recuperación;
- teléfono de recuperación;
- dispositivos confiables;
- códigos de recuperación;
- apps conectadas;
- preguntas de seguridad si aún existen.

Las preguntas de seguridad son débiles si usan información pública como mascota, escuela, ciudad o fecha de nacimiento.

## Qué hacer si una contraseña aparece filtrada

1. Cambia la contraseña afectada.
2. Si la reutilizaste, cambia todas las cuentas donde era igual o parecida.
3. Cierra sesiones activas.
4. Activa MFA o passkey.
5. Revisa correo y teléfono de recuperación.
6. Revisa si hay reglas de reenvío o apps conectadas.
7. Vigila alertas de inicio de sesión.

## Checklist para una cuenta crítica

- [ ] Contraseña única o passkey.
- [ ] MFA activo.
- [ ] Códigos de recuperación guardados.
- [ ] Correo de recuperación correcto.
- [ ] Teléfono de recuperación correcto.
- [ ] Sesiones activas revisadas.
- [ ] Apps conectadas revisadas.
- [ ] Alertas de seguridad activadas.

## Errores comunes

- Cambiar contraseñas cada mes, pero usar patrones predecibles.
- Guardar contraseñas en notas sin protección.
- Compartir cuentas personales.
- Usar la misma contraseña con variaciones mínimas.
- Confiar en SMS como único factor para todo.
- Aprobar notificaciones MFA por cansancio.
- No guardar códigos de recuperación.
- Proteger una cuenta, pero dejar débil el correo que la recupera.

## Recomendación práctica

Si solo puedes hacer tres cosas hoy:

1. protege tu correo con passkey o app autenticadora;
2. instala un gestor de contraseñas;
3. cambia contraseñas repetidas empezando por correo, banco y redes sociales.

Después continúa con cuentas de nube, trabajo, escuela, redes sociales y compras.
