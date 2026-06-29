---
title: "SCADA y OT: Hackeando el Mundo Físico"
level: "intermedio"
content_type: "guia"
updated: "2026-06-29"
---
# SCADA y OT: Hackeando el Mundo Físico

## Objetivo de esta Guía

Entender la gigantesca diferencia entre Tecnología de la Información (IT) y Tecnología de las Operaciones (OT).
Aquí no hackeamos bases de datos para robar números de tarjeta; aquí hackeamos turbinas, trenes y acueductos. Las reglas de la ciberseguridad convencional se invierten por completo.

---

## 1. La Diferencia entre IT y OT

aqui esta el primer concepto que cambia la forma de pensar:

* **IT (Information Technology):** Maneja **Datos**. Son tus servidores Windows, bases de datos SQL, la nube y los empleados usando Word.
* **OT (Operational Technology):** Maneja **Física**. Son los sistemas que abren y cierran válvulas de presión en una refinería de petróleo, los brazos robóticos que arman autos, y el sistema que cambia la luz del semáforo a verde.

### La Triada CIA invertida
En ciberseguridad clásica (IT), la regla de oro es la Triada CIA: **Confidencialidad**, Integridad y Disponibilidad. Lo más importante es que nadie robe los datos. Si hay un virus, apagas el servidor inmediatamente para proteger la base de datos (pierdes disponibilidad para salvar la confidencialidad).

En el mundo industrial (OT), la triada es AIC: **Disponibilidad (Availability)**, Integridad y Confidencialidad.
Si una planta de fundición de acero está operando a 2,000 grados Celsius, **no puedes apagar la computadora de control por un virus**. Si la apagas (pierdes disponibilidad), el acero se solidifica en las tuberías, causando una explosión que matará a los obreros.

En OT, **el software no puede fallar, ni siquiera para protegerse de un hacker, porque las personas mueren**.

**Por qué esto importa:** Todo lo que aprendiste en IT sobre "apagar y prender" no sirve aqui. En OT, si apagas el sistema, la gente muere. Así de simple.

---

## 2. Los Componentes del Mundo OT

No encontrarás Macbooks operando trenes de carga. Encontrarás estos equipos especializados:

### A. PLC (Programmable Logic Controller)
Es el "músculo y cerebro básico". Es una caja de metal indestructible atornillada a la pared de la fábrica. Su único trabajo es ejecutar un código en bucle infinito: *"Si el sensor de temperatura pasa de 100°, abre la válvula de agua fría"*.
Los PLCs son confiables por décadas, pero tienen **cero seguridad criptográfica**. Si les mandas la orden de abrir la válvula por la red, la abren ciegamente sin pedir contraseña.

**Fabricantes principales:** Allen-Bradley (Rockwell), Siemens, Schneider Electric (Modicon), Mitsubishi, Omron, GE, Beckhoff, Wago.

### B. RTU (Remote Terminal Unit)
Similar al PLC pero diseñado para ubicaciones remotas y comunicaciones de largo alcance. Típicamente utilizado en oil & gas, eléctrico, agua. Se comunica vía radio, satélite o línea telefónica.

### C. HMI (Human Machine Interface)
Pantallas táctiles que permiten a los operadores humanos monitorear y controlar los procesos. Ejecutan Windows Embedded o sistemas propietarios. Son el punto de entrada más común para atacantes en OT.

### D. SCADA (Supervisory Control and Data Acquisition)
Es el "centro de mando". Es una sala llena de pantallas gigantes donde los operadores humanos ven los gráficos de toda la refinería. El SCADA envía las órdenes a los miles de PLCs repartidos por kilómetros.

### E. DCS (Distributed Control System)
Sistema de control distribuido para procesos continuos (refinerías, plantas químicas). Similar a SCADA pero con control más distribuido y redundancia incorporada.

### F. SIS (Safety Instrumented System)
Sistema de seguridad independiente diseñado para llevar la planta a un estado seguro si los sistemas principales fallan. DEBE ser independiente del PLC/DCS (no compartir red, no compartir hardware). SIL (Safety Integrity Level) define el nivel de confiabilidad (SIL1-SIL4).

---

## 3. Protocolos Industriales

### Modbus (El Protocolo Universal)

Creado por Modicon en 1979. Es el protocolo industrial más extendido por su simplicidad.

* **Modbus RTU:** Serial (RS-232/RS-485), binario, maestro-esclavo.
* **Modbus TCP/IP:** Sobre TCP puerto 502, sin cifrado ni autenticación.
* **Funciones:** Read Coils (0x01), Read Input Registers (0x04), Write Single Coil (0x05), Write Multiple Registers (0x10).

**Seguridad en Modbus:**
```
| Característica | Estado |
|----------------|--------|
| Autenticación | Ninguna |
| Cifrado | Ninguno |
| Integridad | Checksum CRC-16 (RTU) o TCP checksum |
| Anti-replay | Ninguno |
| Autorización | Ninguna (cualquier comando es aceptado) |
```

**Ataques a Modbus:**
```bash
# Escaneo de dispositivos Modbus
nmap -sV -p 502 192.168.1.0/24 --script modbus-discover

# Leer registros (encontrar valores de sensores)
python -c "
from pymodbus.client import ModbusTcpClient
client = ModbusTcpClient('192.168.1.100', port=502)
rr = client.read_holding_registers(0, 10, unit=1)
print(rr.registers)
"

# Escribir en una bobina (abrir/cerrar válvula)
client.write_coil(0, True, unit=1)  # Encender
client.write_register(100, 0, unit=1)  # Cero RPM (detener motor)
```

**Recomendación de seguridad:** Modbus debe ejecutarse solo en redes OT aisladas. Nunca exponer Modbus TCP a redes IT. Usar Modbus/TCP Security (MBTS) o Modbus con VPN/Gateway de seguridad.

### DNP3 (Distributed Network Protocol)

Protocolo predominante en el sector eléctrico (subestaciones, smart grid). Más sofisticado que Modbus.

* **Puerto:** 20000 TCP/UDP.
* **Características de seguridad (DNP3 Secure Authentication v5):**
  - Autenticación de mensajes HMAC-SHA256.
  - Secuencia de números para anti-replay.
  - Cifrado opcional (AES-GCM-128/256).
* **Funciones:** Unsolicited responses (el esclavo puede enviar datos sin que el maestro pregunte), time-stamping, event buffers.
* **Vulnerabilidades históricas:** Muchas implementaciones no usan Secure Authentication v5. El tráfico es legible en texto plano si no se implementa.

### OPC-UA (Open Platform Communications - Unified Architecture)

Estándar moderno multiplataforma para comunicación industrial, diseñado con seguridad incorporada.

* **Puerto:** 4840 TCP por defecto.
* **Modelo de seguridad:**
  - Autenticación: X.509 certificados cliente/servidor.
  - Cifrado: AES-128/256, RSA-OAEP.
  - Integridad: HMAC-SHA256.
  - Autorización basada en roles.
* **Modelo de información:** Describe datos con tipo, metadatos, historial (no solo registros numéricos).

### Profinet / Profibus

* **Profinet:** Ethernet industrial de Siemens, tiempo real (RT/IRT). Puertos: 34964, 49153-49156.
* **Profibus:** Serial RS-485, ampliamente usado en manufactura alemana.
* **Seguridad:** Ambos carecen de seguridad nativa. Profinet usa DCP (Discovery and Configuration Protocol) que permite reconfigurar dispositivos sin autenticación.

---

## 4. El Modelo Purdue (Arquitectura de Red OT)

El modelo de referencia para segmentación de redes OT/ICS (ISA-99 / IEC 62443):

| Nivel | Nombre | Descripción | Equipos |
|-------|--------|-------------|---------|
| **Nivel 5** | Enterprise IT / Cloud | Red corporativa, internet | Servidores Exchange, SAP, ERP |
| **Nivel 4** | Site Business Planning & Logistics | Planificación del sitio | Historiadores, servidores de producción |
| **Nivel 3** | Site Operations & Control | Supervisión de toda la planta | SCADA, DCS, servidores de ingeniería |
| **Nivel 2** | Area Supervisory Control | Control de área específica | HMI, alarmas, estaciones de ingeniería |
| **Nivel 1** | Basic Control | Control directo de proceso | PLCs, RTUs, DCS controllers, drives |
| **Nivel 0** | Process / Field | Sensores y actuadores | Sensores de temperatura, válvulas, motores |

**Reglas de segmentación Purdue:**
* **El tráfico nunca debe saltar niveles** (ej: Nivel 0 no debe comunicarse directamente con Nivel 4).
* **DMZ entre IT y OT:** Zona desmilitarizada con jump servers, réplicas de datos unidireccionales (data diodes), firewalls.
* **Unidirectional gateways (Data Diodes):** Hardware que permite físicamente que los datos viajen en una sola dirección (de OT a IT, nunca al revés).

---

## 5. Superficie de Ataque en OT

### Vectores de Entrada Comunes

1. **Remotes Access Solutions:** Soluciones de acceso remoto como VPN, RDP, TeamViewer en estaciones HMI con credenciales débiles.
2. **USB drives:** Stuxnet demostró que el USB sigue siendo el vector más efectivo en entornos air-gapped.
3. **Laptops de Mantenimiento:** Técnicos que conectan sus laptops directamente a PLCs sin verificar si están limpias (sin malware).
4. **Firewalls mal configurados:** Puertos industriales (Modbus 502, DNP3 20000, OPC 135) expuestos a redes IT o internet.
5. **Vulnerabilidades en Windows embebido:** HMIs ejecutando Windows XP, Windows 7, o Windows Embedded sin parches.
6. **Ingeniería social:** Operadores de planta que abren correos de phishing en estaciones HMI conectadas a la red de control.

### Vulnerabilidades Críticas en ICS (CVEs)

| CVE | Año | Sistema | Impacto |
|-----|-----|---------|---------|
| CVE-2015-5374 | 2015 | Schneider Electric Modicon M340/M580 | Bypass de autenticación, RCE en PLC |
| CVE-2017-7921 | 2017 | Hikvision cameras (usadas en ICS) | Bypass de autenticación, backdoor account |
| CVE-2018-16527 | 2018 | Emerson DeltaV DCS | DoS, RCE |
| CVE-2021-22718 | 2021 | Schneider Electric EcoStruxure | RCE sin autenticación via SOAP |
| CVE-2020-15369 | 2020 | Rockwell Automation FactoryTalk | Path traversal, RCE |
| CVE-2021-22204 | 2021 | ExifTool (procesamiento de imágenes DICOM) | RCE en estaciones de ingeniería |
| CVE-2023-3595 | 2023 | Múltiples PLCs Rockwell | RCE via PCCC protocol |
| CVE-2022-1161 | 2022 | CODESYS (runtime de PLC) | Stack buffer overflow, RCE |
| CVE-2021-33044 | 2021 | Moxa (routers industriales) | RCE sin autenticación |
| CVE-2019-10981 | 2019 | Beckhoff TwinCAT | RCE via ADS protocol |

### Herramientas de Evaluación OT

| Herramienta | Propósito |
|------------|-----------|
| **Shodan** | Búsqueda de dispositivos ICS expuestos en internet (filtro: port:502, port:20000) |
| **Modbuspal** | Herramienta gráfica para interactuar con dispositivos Modbus |
| **gr-scan** | Escaneo de dispositivos Guardian/PLC Rockwell |
| **Nmap scripts NSE** | `modbus-discover`, `enip-info`, `s7-info`, `bacnet-info` |
| **Metasploit ICS modules** | Reliable modules para explotación de PLCs (auxiliary/scanner/scada/) |
| **Wireshark** | Análisis de tráfico industrial con dissectores Modbus, DNP3, Profinet |
| **ISF (Industrial Exploitation Framework)** | Framework Python para ataque a ICS |
| **OpenPLC** | PLC software para emulación y pruebas |
| **GRASSMARLIN** | Herramienta de NSA para mapeo de redes ICS vía análisis pasivo |

---

## 6. El Caso de Estudio: Stuxnet (El Arma Digital)

Cuando un país decide hackear a otro país con código? Pasa Stuxnet. el ejemplo definitivo de por qué la ciberseguridad industrial es un asunto de guerra internacional es el virus **Stuxnet (2010)**.

**El Objetivo:** La planta secreta de enriquecimiento de Uranio nuclear de Natanz, en Irán.
**El Problema:** La planta estaba "Air-gapped" (Totalmente desconectada de internet). No había forma de hackearla remotamente.

**El Ataque (Atribuido a EE. UU. e Israel):**
1. Infectaron memorias USB de proveedores civiles que trabajaban en la planta nuclear iraní.
2. Cuando un empleado conectó el USB infectado a la red interna (aislada de internet), Stuxnet despertó.
3. El virus no robó datos ni cifró archivos. Silenciosamente, buscó un modelo hiperespecífico de **PLC Siemens S7-315** (los que controlaban las centrífugas nucleares IR-1).
4. **El sabotaje físico:** Stuxnet manipuló las centrífugas haciéndolas girar al máximo de velocidad (de 30Hz a 1410Hz) hasta que los motores se destrozaran físicamente, pero... al mismo tiempo, el virus le enviaba información falsa a las pantallas de la sala SCADA diciendo: *"Todo está normal a 50 revoluciones por minuto"*.
5. Los operadores humanos veían luces verdes en sus pantallas mientras escuchaban las máquinas explotar en el piso de abajo.

**Técnicamente, Stuxnet:**
* Explotó **4 vulnerabilidades de día cero** (MS10-046, MS10-061, MS08-067, CVE-2010-2772 en Siemens WinCC).
* Usaba **certificados digitales robados** de Realtek y JMicron para firmar sus drivers.
* Se propagaba por la red vía vulnerabilidades de Windows (MS10-061 Print Spooler).
* Modificaba el código ladder del PLC (bloques OB1, OB35) a través de la comunicación Step 7.
* Grababa y reproducía señales de entrada/salida reales (ataque de "replay" a nivel físico).

Stuxnet fue la primera "Arma Cibernética" de la historia. Retrasó el programa nuclear de Irán por años, usando únicamente código.

Es como en las películas de espías cuando el agente secreto envenena al guardia, pero aqui todo pasó con unos y unos y ceros.

---

## 7. Defensa en Profundidad para OT (IEC 62443)

La familia de estándares **IEC 62443** define los requisitos de seguridad para sistemas de control industrial.

### Principios Clave:

1. **Segmentación de red estricta** (Modelo Purdue).
2. **DMZ OT/IT:** Zona intermedia con servidores de parcheo, antivirus, actualizaciones, replicación de datos.
3. **Control de acceso basado en roles:** No compartir cuentas, MFA en accesos de ingeniería.
4. **Bastion Hosts / Jump Boxes:** Único punto de acceso a la red OT, con logging completo de sesiones.
5. **Monitorización continua:** IDS industrial (Nozomi, Dragos, Claroty, Microsoft Defender for IoT).
6. **Gestión de parches en OT:**
   - Los parches no se aplican directamente (pueden romper el proceso).
   - Se prueban en un entorno de laboratorio gemelo (digital twin).
   - Se aplican en ventanas de mantenimiento programadas.
7. **Respuesta a incidentes OT:** No es igual que IT. La contención no significa apagar. Significa aislar el segmento afectado manteniendo la producción.

### ODVA / CIP Security

El protocolo EtherNet/IP (Common Industrial Protocol) ahora incluye CIP Security:
* Autenticación de dispositivos.
* Cifrado de sesiones.
* Roles y permisos por dispositivo.

### Virtual Patching (Parcheo Virtual)

Como los parches oficiales tardan meses en certificarse, las defensas alternativas incluyen:
* Reglas de firewall específicas para protocolo industrial (deep packet inspection).
* Snort/Suricata rules para ICS.
```text
# Snort rule para detectar escritura no autorizada en Modbus
alert tcp any any -> any 502 (msg:"Modbus Write Coil detected";
    content:"|00 00 00 00 00 05|"; depth:6;
    content:"|05|"; within:1; distance:7;
    sid:1000001;)
```

---

## 8. ¿Por qué no actualizamos el SCADA?

el analista novato siempre pregunta: *"¿Por qué la planta de agua usa Windows XP en 2026? ¡Deberían actualizar a Windows 11!"*. Y uno entiende la confusión, la lógica dice que lo nuevo es mejor.

Pero En OT, si un sistema físico lleva 15 años funcionando perfectamente sin matar a nadie, **no lo tocas**.
Actualizar el sistema operativo podría introducir un retraso de 3 milisegundos en el procesamiento de la computadora. En una fábrica, ese micro-retraso podría hacer que un brazo robótico choque contra la pared. El costo de certificar que un nuevo sistema operativo es 100% seguro para vidas humanas cuesta millones de dólares, así que las empresas prefieren aislar el viejo Windows XP en una red privada y no tocarlo nunca.

**Estrategias para Sistemas Heredados (Legacy):**
1. **Air Gap:** Desconexión física de la red corporativa/internet.
2. **Application Whitelisting:** Solo ejecutables aprobados pueden correr (AppLocker, Carbon Black).
3. **Network Micro-segmentation:** El sistema legacy solo puede hablar con los dispositivos específicos que necesita.
4. **One-way data diode:** Los datos pueden salir para monitoreo pero nada puede entrar.
5. **Virtualización:** Migrar el viejo Windows XP a una VM con snapshots para recuperación rápida.
6. **Reemplazo gradual:** Migrar a hardware moderno en ventanas de mantenimiento (cada 5-10 años).

**Por qué esto importa:** Es como tener un auto clásico que funciona perfecto desde hace 30 años. No le vas a cambiar el motor por uno nuevo solo porque salió el modelo 2026, porque podría dejar de funcionar y te quedas a pie.

---

## 9. Herramientas de Monitoreo OT

| Herramienta | Función |
|------------|---------|
| **Nozomi Guardian** | Monitoreo de red OT en tiempo real, detección de anomalías de protocolo industrial |
| **Dragos Platform** | Threat intelligence + detección de amenazas en entornos ICS |
| **Claroty Continuous Threat Detection** | Visibilidad de assets OT sin agentes |
| **Microsoft Defender for IoT** | Agente de monitoreo OT integrado con Microsoft Sentinel |
| **Tenable OT Security** | Gestión de vulnerabilidades específicas ICS |
| **Wireshark + disectores ICS** | Análisis de tráfico industrial open-source |

---

## Criterio de Dominio (Autoevaluación)

1. En el mundo IT corporativo, si detectas un Ransomware en la computadora financiera, desconectas el cable de red y la apagas (Contención). Explica por qué hacer esto mismo en el mundo OT (Una planta química) es una pésima decisión.
2. ¿Qué es un PLC y cuál es su mayor debilidad de ciberseguridad histórica?
3. En tus propias palabras, ¿Cómo logró Stuxnet engañar a los operadores humanos mientras destruía las máquinas físicas de la planta nuclear?
4. Explica el Modelo Purdue de segmentación de red OT. ¿Por qué es crítico que los niveles 0 y 1 nunca se comuniquen directamente con los niveles 4 y 5?
5. ¿Qué diferencia hay entre Modbus RTU y Modbus TCP, y por qué ambos son inseguros para comunicaciones industriales modernas?
