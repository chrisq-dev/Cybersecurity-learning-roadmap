# Fundamentos de Wi-Fi Security

## Objetivo

Entender riesgos y controles basicos de redes Wi-Fi.

## Conceptos

### SSID

Nombre visible de la red Wi-Fi.

### Access Point

Dispositivo que permite conexion inalambrica.

### WPA2/WPA3

Protocolos de seguridad para Wi-Fi.

### PSK

Pre-shared key. Una contraseña compartida para la red.

### Enterprise

Usa autenticacion individual, normalmente con 802.1X/RADIUS.

## Como Pensar una Red Wi-Fi

Wi-Fi no es solo "internet sin cable". Es una puerta de entrada a la red. Si una red inalambrica esta mal disenada, un visitante, un equipo infectado o un atacante cercano puede intentar llegar a sistemas internos.

Preguntas base:

- Quien se conecta?
- Como se autentica?
- A que segmento entra?
- Que puede alcanzar?
- Como se detectan APs no autorizados?
- Que pasa si se comparte la clave?

## Modos de Seguridad

| Modo | Uso comun | Riesgo | Comentario |
| --- | --- | --- | --- |
| Open | Invitados muy controlados | Cualquiera entra | Debe estar aislada y con portal/politica si aplica |
| WEP | Obsoleto | Inseguro | No debe usarse |
| WPA/WPA2 Personal | Hogar/oficina pequena | Clave compartida | Si alguien sale, hay que rotar clave |
| WPA2/WPA3 Enterprise | Empresa | Requiere infraestructura | Mejor trazabilidad por usuario |
| WPA3 | Redes modernas | Compatibilidad | Mejoras frente a WPA2, pero no reemplaza segmentacion |

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

Un access point conectado sin autorizacion a la red interna. Puede aparecer por comodidad de un empleado o por actividad maliciosa.

Riesgo:

- Crea una entrada no controlada.
- Puede no tener cifrado fuerte.
- Puede saltarse politicas de red.

### Evil Twin

Un atacante crea una red con nombre parecido o igual al SSID legitimo para enganar usuarios.

Riesgo:

- Robo de credenciales.
- Intercepcion de trafico.
- Redireccion a portales falsos.

### Clave Compartida Filtrada

En WPA Personal, muchas personas usan la misma clave. Si se comparte por chat, foto o con ex empleados, se pierde control individual.

### Red Invitados Mal Aislada

Una red guest que puede llegar a impresoras, paneles internos o servidores deja de ser guest. Debe tener salida a internet y muy poco mas.

## Controles

- WPA2/WPA3.
- Contraseñas fuertes.
- Red de invitados separada.
- Segmentacion por VLAN.
- 802.1X en empresas.
- Monitoreo de APs no autorizados.
- Cambiar credenciales default.
- Actualizar firmware.

## Segmentacion Sugerida

| Red | Usuarios | Acceso permitido | Acceso bloqueado |
| --- | --- | --- | --- |
| Corporativa | Empleados | Recursos internos necesarios | Admin, servidores sensibles si no aplica |
| Invitados | Visitantes | Internet | LAN interna, impresoras internas, paneles |
| IoT | Camaras, TVs, sensores | Servicios especificos | Usuarios, administracion, bases de datos |
| Administracion | TI/Admin | Gestion de APs y equipos | Navegacion general si no es necesaria |

Separar SSIDs sin separar VLANs o reglas reales no aporta mucho. La separacion debe existir en la red y en las politicas.

## Guest Wi-Fi

Debe estar separado de:

- Servidores.
- Equipos administrativos.
- Sistemas internos.
- Paneles de gestion.

## 802.1X y RADIUS

En redes empresariales, 802.1X permite autenticar usuarios o dispositivos de forma individual. En lugar de una sola clave compartida, cada identidad puede tener acceso segun su rol.

Ventajas:

- Baja de usuarios sin cambiar la clave de todos.
- Mejor auditoria.
- Politicas por grupo.
- Integracion con directorio corporativo.

Riesgos si se configura mal:

- Validacion debil de certificados.
- Usuarios aceptando redes falsas.
- Politicas demasiado amplias.

## Monitoreo

Eventos utiles:

- Nuevos APs detectados.
- Muchos intentos fallidos.
- Conexiones desde dispositivos desconocidos.
- Cambios de configuracion en controladora.
- Dispositivos conectados a redes incorrectas.
- Trafico entre guest e interno.

## Errores Comunes

- Usar la misma clave Wi-Fi por anos.
- Compartir la red corporativa con invitados.
- Administrar APs desde la misma red de usuarios.
- No actualizar firmware.
- Creer que ocultar SSID es seguridad suficiente.
- No tener inventario de APs autorizados.
- Permitir que IoT vea toda la red.

## Ejemplo de Diseno Wi-Fi

Una red Wi-Fi de oficina deberia separar:

- Red corporativa.
- Red invitados.
- Red administracion.

El diseno debe aclarar:

- Quien entra a cada red.
- Que VLAN usa.
- Que trafico permites.
- Que logs revisas.

## Preguntas de Comprension

- Que diferencia hay entre WPA Personal y Enterprise?
- Por que una red de invitados debe estar aislada?
- Que evidencia indicaria un rogue AP?
- Que controles reducen el impacto de una clave compartida filtrada?
- Que dispositivos no deberian estar en la red corporativa principal?

## Criterio de Dominio

Puedes avanzar cuando puedas:

- Explicar WPA2/WPA3.
- Explicar red invitado.
- Explicar rogue AP.
- Proponer segmentacion Wi-Fi.
- Diferenciar PSK y 802.1X.
- Explicar por que IoT requiere aislamiento.
