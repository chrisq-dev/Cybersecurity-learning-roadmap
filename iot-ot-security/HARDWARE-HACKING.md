---
title: "Hardware Hacking: Destripando Circuitos"
level: "intermedio"
content_type: "guia"
updated: "2026-06-29"
---
# Hardware Hacking: Destripando Circuitos

## Objetivo de esta Guía

Bajar de la nube de software y ensuciarnos las manos con el cobre y el silicio.
El Hardware Hacking es el arte de vulnerar sistemas físicos interactuando directamente con sus componentes electrónicos, sus ondas de radio o sus memorias locales. Es donde la ciberseguridad se cruza con la ingeniería electrónica.

---

## 1. El Peligro del Acceso Físico

aquí hay una ley universal en ciberseguridad que pocos entienden al principio: **Si un atacante tiene acceso físico sin restricciones a tu computadora, ya no es tu computadora**.

los desarrolladores asumen que los atacantes están a 5,000 kilómetros de distancia atacando por Wi-Fi. Pero Cuando compraste una caja fuerte electrónica china, el atacante la desenrosca, le saca la placa verde (Motherboard), y conecta un cable directamente al chip de memoria para leer el PIN maestro? Las barreras de software caen cuando manipulas la electricidad.

**Por qué esto importa:** Todo lo que construyas en software se puede romper si alguien toca el metal. Es como poner una alarma ultrasónica en tu casa pero dejar la puerta de atrás abierta de par en par.

---

## 2. Puertos Ocultos de Diagnóstico (UART y JTAG)

Cuando los ingenieros diseñan un Smart TV o un Router de internet, necesitan una forma de probarlo en la fábrica antes de venderlo. Para eso, dejan pequeños "puntos de soldadura" expuestos en la placa base llamados **Puertos de Diagnóstico (UART o JTAG)**.

* **El Error:** Las fábricas casi nunca bloquean estos puertos antes de enviar el producto a la tienda.
* **El Hack:** Un Hardware Hacker compra el router, lo desatornilla, conecta unos pequeños cables con pinzas (Jumpers) a esos puntitos de metal, y los conecta a su laptop mediante un adaptador USB (como el famoso *Bus Pirate* o un adaptador FTDI).

¡Magia! Al conectarse, la laptop del hacker recibe una terminal de Linux (`root@router:~#`) con acceso total al procesador del router. No tuvo que adivinar contraseñas web; simplemente entró por la "puerta trasera" que dejaron los ingenieros de fábrica.

**Por qué esto importa:** Estos pines grátis que ves en la placa son el talón de Aquiles de cualquier dispositivo. Si puedes soldar cuatro cables, puedes tener acceso root.

### UART (Universal Asynchronous Receiver-Transmitter)

UART es un protocolo de comunicación serial simple. Se identifica en la placa buscando pines de 4 puntos (generalmente):

| Pin | Función | Color típico | Notas |
|-----|---------|-------------|-------|
| TX (Transmit) | Envía datos desde el dispositivo | Verde | Se conecta al RX del adaptador |
| RX (Receive) | Recibe datos hacia el dispositivo | Blanco | Se conecta al TX del adaptador |
| GND (Ground) | Referencia de voltaje | Negro | Obligatorio para la comunicación |
| VCC (Power) | Alimentación (3.3V o 5V) | Rojo | **No conectar** si el dispositivo ya tiene alimentación |

**Identificación de Pines UART:**
1. Usar un multímetro en modo de voltaje DC. Con el dispositivo encendido:
   - GND = 0V (continuidad con la tierra del circuito).
   - VCC = 3.3V o 5V constante.
   - TX = ~3.3V con fluctuaciones (datos saliendo).
   - RX = ~3.3V sin fluctuaciones (esperando datos).
2. Usar un **Bus Pirate** o **Saleae Logic Analyzer** para detectar actividad en los pines.
3. Herramienta `uart-baud-rate-detector` para identificar la velocidad de transmisión.

**Baud Rate Brute Force:**
```bash
# Probar velocidades comunes con screen
for baud in 9600 19200 38400 57600 115200 230400; do
    screen /dev/ttyUSB0 $baud
done

# Usar baudrate.py
python baudrate.py /dev/ttyUSB0
```

### JTAG (Joint Test Action Group) y SWD (Serial Wire Debug)

JTAG es un estándar IEEE 1149.1 para probar PCBs y depurar microcontroladores. Requiere 4-5 pines:

| Pin | Función |
|-----|---------|
| TCK | Clock |
| TMS | Mode Select |
| TDI | Data In |
| TDO | Data Out |
| (TRST) | Reset opcional |
| GND | Tierra |

SWD es la alternativa de ARM (2 pines): SWDIO (data) y SWCLK (clock).

**Herramientas para JTAG/SWD:**
* **OpenOCD:** Software open-source para debugging y programación vía JTAG/SWD.
  ```bash
  openocd -f interface/jlink.cfg -f target/stm32f4x.cfg
  # Conectarse vía telnet a localhost:4444
  # halt, flash read_bank 0 firmware.bin 0 0x100000
  ```
* **J-Link (Segger):** Depurador comercial standard de la industria ARM.
* **Bus Blaster:** Alternativa open-source económica.
* **STM32 ST-Link:** Depurador integrado en placas de desarrollo STM32.

**Ataques vía JTAG:**
* Lectura completa de firmware (dumping de flash).
* Lectura de OTP (One-Time Programmable) memory.
* Bybass de Read-Out Protection (RDP) en microcontroladores ARM.
* Inyección de breakpoints hardware para extraer claves en runtime.

---

## 3. Lectura de Memoria Flash (SPI / I2C)

Cuando UART y JTAG están bloqueados o soldados, el siguiente paso es leer directamente el chip de memoria flash.

### SPI Flash

La mayoría de los routers, smart TVs y dispositivos IoT almacenan el firmware en chips de memoria flash SPI (Serial Peripheral Interface).

**Pines comunes de SPI Flash:**

| Pin | Función |
|-----|---------|
| CS (Chip Select) | Selección del chip |
| MOSI (Master Out Slave In) | Datos del programador al chip |
| MISO (Master In Slave Out) | Datos del chip al programador |
| CLK (Clock) | Señal de reloj |
| VCC | Alimentación (3.3V típicamente) |
| GND | Tierra |

**Técnica de Dumping con SOIC Clip:**
1. Identificar el chip en la PCB (marcas: Winbond, Macronix, GigaDevice, etc.).
2. Conectar pinzas SOIC-8 (test clip) al chip SIN desoldarlo (en vivo o con alimentación externa).
3. Usar un programador (CH341A, FT232H, Bus Pirate, Raspberry Pi).
4. Leer el contenido completo:

```bash
# Con flashrom
flashrom -p ch341a_spi -r firmware.bin

# Con Raspberry Pi GPIO
flashrom -p linux_spi:dev=/dev/spidev0.0 -r firmware.bin

# Verificar integridad
sha256sum firmware.bin
```

**Análisis del Firmware Extraído:**
```bash
# Identificar el tipo de firmware
binwalk firmware.bin
# Extraer sistemas de archivos
binwalk -Me firmware.bin
# Buscar strings y claves
strings firmware.bin | grep -E "password|key|secret|token|admin"
# Identificar versión del kernel
strings firmware.bin | grep "Linux version"
# Extraer initramfs
dd if=firmware.bin bs=1 skip=<OFFSET> | zcat | cpio -idmv
```

### I2C (Inter-Integrated Circuit)

Protocolo de 2 hilos (SDA-data, SCL-clock) usado para comunicarse con sensores, EEPROMs y chips de gestión de energía.

**Ataques comunes en I2C:**
* Lectura de EEPROM que contiene configuración de red, credenciales Wi-Fi.
* Interceptación de comunicación entre microcontrolador y chip de seguridad.
* Escritura forzada en chips de configuración para modificar comportamiento.

**Herramientas I2C:**
```bash
# i2c-tools en Linux
i2cdetect -y 1          # Escanear bus I2C en busca de dispositivos
i2cdump -y 1 0x50       # Dumpear contenido de EEPROM en 0x50
i2cget -y 1 0x50 0x00   # Leer byte en dirección 0x00
```

---

## 4. Radiofrecuencia (SDR)

Cuando crees que tu control remoto es seguro? no todos los dispositivos usan Wi-Fi. Millones de aparatos usan ondas de radio simples: controles de garaje, llaves de automóviles modernos, sensores de temperatura de aviones, y timbres de casas.

Para hackearlos, usamos **SDR (Software Defined Radio - Radio Definida por Software)**.
Con un receptor SDR compatible o un transceptor autorizado para la banda, un analista puede observar señales de radio. Capturar o retransmitir comunicaciones puede estar regulado; verifica la legislación y trabaja solo con sistemas propios o autorizados.

### El Ataque de Repetición (Replay Attack)
Imagina que tú aprietas el botón de las llaves de tu auto para abrir la puerta. Tu llave envía un sonido (onda de radio) que dice `101010`.
El hacker, escondido detrás de un árbol con su antena SDR, "graba" ese sonido en su laptop.
A la noche, cuando estás durmiendo, el hacker va a tu auto y "reproduce" el mismo sonido `101010`. El auto escucha el sonido válido y abre las puertas de par en par.

> **Defensa (Rolling Codes):** Para evitar esto, los autos modernos usan códigos rodantes. Cada vez que presionas la llave, la contraseña cambia matemáticamente y el `101010` viejo queda invalidado para siempre. (Aunque incluso eso puede ser hackeado con herramientas como el *RollJam*).

### SDR en la Práctica

**Flujo de trabajo con SDR:**

1. **Reconocimiento de frecuencias:**
   ```bash
   # Escaneo de espectro con GQRX o rtl_power
   rtl_power -f 300M:450M:100k -i 10 -e 30 scan.csv

   # Detectar señales ASK/OOK (controles remotos comunes)
   rtl_433 -f 315M -f 433.92M -f 868M
   ```

2. **Captura de señal:**
   ```bash
   # Capturar muestra IQ de una frecuencia específica
   rtl_sdr -f 433920000 -s 250000 -n 25000000 capture.iq
   ```

3. **Análisis y demodulación:**
   ```python
   # Usando GNU Radio Companion para demodular ASK/FSK
   # O usando inspectrum para análisis visual de la forma de onda
   inspectrum capture.iq
   ```

4. **Replay de señal:**
   ```bash
   # Con HackRF One
   hackrf_transfer -t captured_signal.iq -f 433920000 -s 250000 -x 40
   ```

**Herramientas SDR:**
| Herramienta | Cobertura aproximada | Capacidad |
|------------|----------------------|-----------|
| RTL-SDR | Depende del sintonizador del modelo | Solo recepción |
| HackRF One | 1 MHz–6 GHz | Tx + Rx, *half-duplex* |
| LimeSDR | Depende de la variante | Tx + Rx, *full-duplex* |
| bladeRF | Depende de la variante | Tx + Rx y FPGA programable |
| USRP B200 | 70 MHz–6 GHz | Transceptor de alto rendimiento |

Verifica cobertura, potencia permitida, accesorios y precio en la ficha oficial del modelo antes de comprar.

**Modulaciones Comunes en IoT:**
| Modulación | Uso típico | Herramientas de decodificación |
|------------|------------|-------------------------------|
| OOK (On-Off Keying) | Controles remotos, garajes, timbres | rtl_433, Audacity |
| ASK (Amplitude Shift Keying) | Sensores de temperatura, estaciones meteorológicas | rtl_433, GQRX |
| FSK (Frequency Shift Keying) | Llaves de autos, algunos sensores | GNU Radio, inspectrum |
| GFSK (Gaussian FSK) | Bluetooth Low Energy, Zigbee | GNU Radio |
| MSK (Minimum Shift Keying) | Comunicaciones satelitales | GNU Radio |

---

## 5. RFID y Clonación de Tarjetas

¿Has usado una tarjeta plástica blanca para abrir la puerta de tu oficina o la habitación del hotel? Eso es tecnología **RFID** (Radio Frequency Identification).

### Baja Frecuencia (125 kHz) - HID / EM4102

La mayoría de los sistemas antiguos (como las tarjetas HID de 125 kHz) son increíblemente estúpidos. La tarjeta no tiene un microprocesador ni hace criptografía; simplemente tiene un número de identificación grabado a fuego y lo "grita" al aire apenas la acercas al lector.

**El Hack:**
El atacante esconde un lector-clonador poderoso en su mochila (como el famoso *Proxmark3* o un *Flipper Zero*). Se acerca a un empleado de la empresa en el tren, frota la mochila contra el bolsillo del empleado durante 1 segundo, y **copia** exactamente el número de tarjeta.
Al día siguiente, el atacante usa una tarjeta en blanco, le inyecta el número copiado, y entra al edificio del banco por la puerta principal, saludando al guardia de seguridad.

```
# Clonación con Proxmark3
proxmark3> lf search             # Buscar señal LF (125kHz)
proxmark3> lf hid read            # Leer tarjeta HID
proxmark3> lf hid clone <FC> <CN> # Clonar en tarjeta T55x7
```

### Alta Frecuencia (13.56 MHz) - Mifare Classic

Mifare Classic es el estándar más común en tarjetas de transporte público y control de acceso moderno. Usa cifrado Crypto-1, que fue roto en 2008.

**Vulnerabilidades de Mifare Classic:**
* **Crypto-1 cipher:** Algoritmo de cifrado propietario, reversible con ~200 samples de keystream conocidos.
* **Nested authentication attack:** Una vez autenticado a un sector, se puede derivar la clave de otros sectores.
* **DarkSide attack:** Recupera la clave de todos los sectores en segundos con un Proxmark3.
* **Magic cards (UID writable):** Tarjetas chinas que permiten escribir el UID (normalmente bloqueado en tarjetas originales).

```bash
# Ataque a Mifare Classic con Proxmark3
proxmark3> hf mf search         # Buscar y enumerar sectores
proxmark3> hf mf mifare         # Autenticación con claves por defecto
proxmark3> hf mf nested         # Ataque nested authentication
proxmark3> hf mf hardnested     # Ataque de fuerza bruta acelerado
proxmark3> hf mf dump           # Volcar todo el contenido de la tarjeta
proxmark3> hf mf restore        # Clonar en tarjeta blanka (magic card)
```

---

## 6. Ataques Avanzados

### Fault Injection (Inyección de Fallos)

Consiste en introducir fallos controlados en el hardware para alterar el comportamiento del software:

* **Voltage Glitching:** Bajar el voltaje momentáneamente en el momento exacto en que el procesador está comprobando un PIN o una clave. Esto hace que la CPU omita una instrucción (skip fault) o ejecute una instrucción incorrecta.
* **Clock Glitching:** Inyectar pulsos de reloj extra o saltarse pulsos para corromper la ejecución.
* **EMFI (Electromagnetic Fault Injection):** Usar una sonda electromagnética para inducir corrientes parásitas en el chip, causando errores de ejecución.

**Herramientas de Fault Injection:**
* **ChipWhisperer:** Plataforma open-source para glitching y side-channel.
* **PicoEMP:** EM fault injection tool de bajo costo.
* **GlitchKit:** Voltage glitcher open-source.

### Side-Channel Attacks (Ataques de Canal Lateral)

Analizan las emisiones físicas del dispositivo durante el procesamiento criptográfico:

* **SPA (Simple Power Analysis):** Observar el consumo de energía. Diferentes operaciones (multiplicación, suma) tienen diferentes perfiles de consumo.
* **DPA (Differential Power Analysis):** Análisis estadístico de múltiples trazas de energía para recuperar claves criptográficas.
* **Timing Attack:** Medir el tiempo que tarda el dispositivo en procesar ciertas operaciones para inferir información sobre la clave.
* **Acoustic Cryptanalysis:** Analizar el sonido emitido por los componentes electrónicos durante el cifrado.

```bash
# Captura de trazas de potencia con ChipWhisperer
cw capture -p STM32F3 -n 1000 -o traces/
cw analyze -t traces/ -p STM32F3        # Análisis DPA
```

### Chip Decapping y Microprobing

Cuando el firmware está protegido en un microcontrolador con Read-Out Protection (RDP), se puede:

1. **Decap:** Disolver la resina epóxica del chip con ácido nítrico fumante (HNO3).
2. **Microprobing:** Usar un microprobador piezoeléctrico con puntas de tungsteno de 10nm para leer señales directamente de los buses internos del chip.
3. **Laser Fault Injection:** Usar un láser para inducir fallos en celdas de memoria específicas (bit flipping).

**Herramientas:**
* **Microscopía electrónica y microprobing:** infraestructura especializada, normalmente disponible en laboratorios de investigación.
* **Estaciones de inyección láser:** equipos especializados sujetos a procedimientos de seguridad y autorización.

---

## 7. Herramientas del Hardware Hacker

| Herramienta | Función | Limitación que debes revisar |
|------------|---------|-----------------------------|
| **Bus Pirate** | Interfaz para buses como UART, SPI e I2C | Voltajes y velocidad compatibles |
| **Analizador lógico** | Captura de señales digitales | Canales, frecuencia de muestreo y sondas |
| **Proxmark3** | Análisis RFID/NFC | Variante de hardware y bandas |
| **Herramienta multiprotocolo** | RFID, NFC, GPIO, IR o radio según modelo | Regulación y capacidades reales |
| **ChipWhisperer** | Análisis de canal lateral y *glitching* | Placa objetivo y módulos incluidos |
| **SDR** | Recepción o transmisión de radio | Rango, potencia, filtros y licencia |
| **Depurador JTAG/SWD** | Depuración de microcontroladores | Arquitecturas y licencias soportadas |
| **Programador SPI Flash** | Lectura y escritura de memorias | Voltaje y adaptadores |
| **Estación de aire caliente** | Soldadura y desoldadura SMD | Control térmico y seguridad |
| **Multímetro** | Voltaje, continuidad y resistencia | Categoría de seguridad y precisión |
| **Osciloscopio** | Visualización de señales | Ancho de banda, muestreo y sondas |

Los modelos y precios cambian. Compara fichas oficiales y distribuidores autorizados cuando exista una necesidad concreta.

---

## Criterio de Dominio (Autoevaluación)

1. Estás auditando una cámara de seguridad física y has intentado hackearla por red (IP/HTTP) durante días sin éxito. Decides desatornillar la carcasa y mirar la placa verde. ¿Qué nombres reciben los pequeños puertos metálicos de prueba de fábrica que podrías buscar para conectarte directamente al procesador?
2. Explica brevemente cómo funciona un ataque de repetición (Replay Attack) usando SDR contra la puerta de un garaje antiguo.
3. ¿Por qué las tarjetas de acceso de oficina antiguas (RFID de baja frecuencia) son tan vulnerables a ser clonadas por alguien caminando muy cerca de ti en la calle?
4. ¿Qué diferencia hay entre UART y JTAG y cuándo usarías cada uno en un pentest de hardware?
5. Explica qué es un ataque de "Voltage Glitching" y cómo puede usarse para eludir la protección de un PIN en un dispositivo embebido.
