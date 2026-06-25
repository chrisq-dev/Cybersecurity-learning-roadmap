# Fundamentos de Wi-Fi Security

## Objetivo

Entender riesgos y controles básicos de redes Wi-Fi.

## Conceptos

### SSID

Nombre visible de la red Wi-Fi.

### Access Point

Dispositivo que permite conexión inalámbrica.

### WPA2/WPA3

Protocolos de seguridad para Wi-Fi.

### PSK

Pre-shared key. Una contraseña compartida para la red.

### Enterprise

Usa autenticación individual, normalmente con 802.1X/RADIUS.

## Cómo Pensar una Red Wi-Fi

Wi-Fi no es solo "internet sin cable". Es una puerta de entrada a la red. Si una red inalámbrica está mal disenada, un visitante, un equipo infectado o un atacante cercano puede intentar llegar a sistemas internos.

Preguntas base:

- Quién se conecta?
- Cómo se autentica?
- A qué segmento entra?
- Qué puede alcanzar?
- Cómo se detectan APs no autorizados?
- Qué pasa si se comparte la clave?

## Modos de Seguridad

| Modo | Uso común | Riesgo | Comentario |
| --- | --- | --- | --- |
| Open | Invitados muy controlados | Cualquiera entra | Debe estar aislada y con portal/política si aplica |
| WEP | Obsoleto | Inseguro | No debe usarse |
| WPA/WPA2 Personal | Hogar/oficina pequeña | Clave compartida | Si alguien sale, hay que rotar clave |
| WPA2/WPA3 Enterprise | Empresa | Requiere infraestructura | Mejor trazabilidad por usuario |
| WPA3 | Redes modernas | Compatibilidad | Mejoras frente a WPA2, pero no reemplaza segmentación |

## Riesgos Comunes

- Contraseña Wi-Fi compartida por todos.
- Red de invitados sin aislamiento.
- AP no autorizado.
- Evil twin.
- WPA/WEP obsoleto.
- Contraseñas debiles.
- Equipos internos en la misma red que invitados.

## Amenazas Importantes

### Rogue AP

Un access point conectado sin autorización a la red interna. Puede aparecer por comodidad de un empleado o por actividad maliciosa.

Riesgo:

- Crea una entrada no controlada.
- Puede no tener cifrado fuerte.
- Puede saltarse políticas de red.

### Evil Twin

Un atacante crea una red con nombre parecido o igual al SSID legitimo para enganar usuarios.

Riesgo:

- Robo de credenciales.
- Intercepcion de tráfico.
- Redireccion a portales falsos.

### Clave Compartida Filtrada

En WPA Personal, muchas personas usan la misma clave. Si se comparte por chat, foto o con ex empleados, se pierde control individual.

### Red Invitados Mal Aislada

Una red guest que puede llegar a impresoras, paneles internos o servidores deja de ser guest. Debe tener salida a internet y muy poco más.

## Controles

- WPA2/WPA3.
- Contraseñas fuertes.
- Red de invitados separada.
- Segmentación por VLAN.
- 802.1X en empresas.
- Monitoreo de APs no autorizados.
- Cambiar credenciales default.
- Actualizar firmware.

## Segmentación Sugerida

| Red | Usuarios | Acceso permitido | Acceso bloqueado |
| --- | --- | --- | --- |
| Corporativa | Empleados | Recursos internos necesarios | Admin, servidores sensibles si no aplica |
| Invitados | Visitantes | Internet | LAN interna, impresoras internas, paneles |
| IoT | Camaras, TVs, sensores | Servicios especificos | Usuarios, administracion, bases de datos |
| Administracion | TI/Admin | Gestion de APs y equipos | Navegación general si no es necesaria |

Separar SSIDs sin separar VLANs o reglas reales no aporta mucho. La separación debe existir en la red y en las políticas.

## Guest Wi-Fi

Debe estar separado de:

- Servidores.
- Equipos administrativos.
- Sistemas internos.
- Paneles de gestion.

## 802.1X y RADIUS

En redes empresariales, 802.1X permite autenticar usuarios o dispositivos de forma individual. En lugar de una sola clave compartida, cada identidad puede tener acceso según su rol.

Ventajas:

- Baja de usuarios sin cambiar la clave de todos.
- Mejor auditoria.
- Políticas por grupo.
- Integración con directorio corporativo.

Riesgos si se configura mal:

- Validación débil de certificados.
- Usuarios aceptando redes falsas.
- Políticas demasiado amplias.

## Monitoreo

Eventos útiles:

- Nuevos APs detectados.
- Muchos intentos fallidos.
- Conexiones desde dispositivos desconocidos.
- Cambios de configuración en controladora.
- Dispositivos conectados a redes incorrectas.
- Tráfico entre guest e interno.

## Errores Comunes

- Usar la misma clave Wi-Fi por años.
- Compartir la red corporativa con invitados.
- Administrar APs desde la misma red de usuarios.
- No actualizar firmware.
- Creer que ocultar SSID es seguridad suficiente.
- No tener inventario de APs autorizados.
- Permitir que IoT vea toda la red.

## Ejemplo de Diseño Wi-Fi

Una red Wi-Fi de oficina debería separar:

- Red corporativa.
- Red invitados.
- Red administracion.

El diseño debe aclarar:

- Quien entra a cada red.
- Que VLAN usa.
- Que tráfico permites.
- Que logs revisas.

## Preguntas de Comprensión

- Qué diferencia hay entre WPA Personal y Enterprise?
- Por qué una red de invitados debe estar aislada?
- Qué evidencia indicaria un rogue AP?
- Qué controles reducen el impacto de una clave compartida filtrada?
- Qué dispositivos no deberian estar en la red corporativa principal?

## Criterio de Dominio

Puedes avanzar cuando puedas:

- Explicar WPA2/WPA3.
- Explicar red invitado.
- Explicar rogue AP.
- Proponer segmentación Wi-Fi.
- Diferenciar PSK y 802.1X.
- Explicar por que IoT requiere aislamiento.
