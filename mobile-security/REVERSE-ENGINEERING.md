---
title: "Ingeniería Inversa: Destripando el APK"
---
# Ingeniería Inversa: Destripando el APK

## Objetivo de esta Guía

Entender cómo los Pentesters desmantelan el código ensamblado de una aplicación móvil para revelar sus secretos.
Descubrirás que el código de la aplicación de tu empresa es un libro abierto para cualquier adolescente con una computadora, a menos que tomes medidas drásticas.

---

## 1. El Concepto de Ingeniería Inversa (Reverse Engineering)

la Ingeniería Inversa suena a algo de la NASA, pero es más sencillo de lo que parece. Imagina que alguien te entrega un pastel horneado de chocolate delicioso.
* **Programar:** Es tener la receta (huevos, harina, cacao), mezclarlos y meterlos al horno para crear el pastel.
* **Ingeniería Inversa:** Es recibir el pastel ya horneado y someterlo a procesos químicos para separar los huevos, la harina y el cacao, hasta descubrir exactamente cuál era la receta secreta del chef.

En el desarrollo de software (Android/iOS), los programadores escriben código legible (Java/Swift), lo "hornean" (lo compilan) para convertirlo en código máquina ilegible y lo suben a la App Store.
La **Ingeniería Inversa** es el proceso de tomar la aplicación de la App Store y des-compilarla para volver a leer el código humano original.

Cuando entiendes esto? Que te das cuenta que ninguna app en tu celular es realmente privada. Todo se puede revertir.

---

## 2. El Proceso en Android (Jadx)

El ecosistema de Android es notoriamente fácil de revertir porque el código Java no se compila hasta nivel de hardware absoluto.

### El Flujo de Trabajo del Hacker:
1. **Descarga el APK:** El atacante ni siquiera necesita un celular. Descarga el archivo de la app del banco directo a su laptop.
2. **Descompilación (Jadx-GUI):** Abre una herramienta gratuita llamada `Jadx`. Arrastra el archivo del banco ahí dentro.
3. **Lectura (Código Fuente Expuesto):** En 10 segundos, Jadx reconstruye el proyecto y le entrega al atacante todo el código fuente original escrito por los programadores del banco.

### ¿Qué busca el atacante en ese código? (Hardcoded Secrets)
Los programadores flojos cometen este error mortal todos los días: Escriben contraseñas "incrustadas" (Hardcoded) directamente en el código de la aplicación móvil.
* Llaves secretas de la base de datos de Amazon (AWS Keys).
* Contraseñas maestras de administrador.
* Direcciones IP de los servidores de prueba privados de la empresa.

el atacante solo usa `Control+F`, busca la palabra "password", roba la llave y ataca a los servidores centrales de la empresa directamente. Así de simple, no necesita ser un genio.

**Por qué esto importa:** Es como si dejaras la combinación de la caja fuerte de la empresa escrita en un post-it pegado en la puerta de entrada. Cualquiera que pase la ve.

---

## 3. Profundizando en la Descompilación Android

### Smali: El Ensamblador de Dalvik

No todas las herramientas devuelven Java legible. APKTool descompila `classes.dex` a **smali**, un lenguaje ensamblador legible para humanos del bytecode Dalvik. Smali es útil cuando:

* Jadx produce código Java incorrecto o incompleto.
* Se necesita parchear la aplicación y recompilarla (patcheo binario).
* Hay ofuscación pesada que hace el código Java ilegible pero el flujo smali aún es interpretable.

Ejemplo de smali (método simple):
```smali
.method public validatePassword(Ljava/lang/String;)Z
    .registers 3
    const-string v0, "supersecret"
    invoke-virtual {p1, v0}, Ljava/lang/String;->equals(Ljava/lang/Object;)Z
    move-result v0
    return v0
.end method
```

### Herramientas del Pipeline Android RE

| Herramienta | Función |
|------------|---------|
| `apktool d app.apk` | Decompila el APK a smali y recursos |
| `dex2jar` + `JD-GUI` | Convierte DEX a JAR y lo abre en GUI (método antiguo) |
| `enjarify` | Alternativa a dex2jar de Google, más precisa |
| `apkeditor` | Edita el manifiesto y recursos sin decompilar |
| `keytool` / `jarsigner` | Manipulación de certificados y re-firmado |
| `zipalign` | Alineación de APK para optimización |
| `adb install` | Instalación del APK modificado |

### Bypass de Firma (Re-signing)

Una vez modificado el APK, debe re-firmarse para instalarse en el dispositivo:
1. Generar un keystore: `keytool -genkey -v -keystore debug.keystore -alias debug -keyalg RSA -keysize 2048 -validity 10000`
2. Firmar el APK: `apksigner sign --ks debug.keystore app-modified.apk`
3. Verificar: `apksigner verify app-modified.apk`
4. Instalar: `adb install app-modified.apk`

Si la aplicación verifica su propia firma en tiempo de ejecución (comprobación de integridad), esta técnica fallará y requerirá parchear la lógica de verificación.

---

## 4. El Proceso en iOS

El ecosistema iOS es significativamente más difícil de revertir:

### Mach-O Binary Format

El binario principal de una app iOS está en formato **Mach-O**, no ELF ni PE. Sus segmentos principales:

* **`__TEXT`:** Código ejecutable de solo lectura. Incluye `__text` (código compilado), `__const` (constantes), `__cstring` (strings literales), `__objc_methname` (nombres de métodos Objective-C).
* **`__DATA`:** Datos modificables. Incluye `__objc_ivar` (variables de instancia), `__objc_selrefs` (referencias a selectores), `__cfstring` (strings CF/NSString).
* **`__LINKEDIT`:** Información de enlace: símbolos, tablas de cadenas, etc.
* **`__RESTRICT`:** Segmento de restricción, puede contener la bandera `__restrict` que deshabilita la carga de variables de entorno DYLD_INSERT_LIBRARIES (anti-debug).

### Extracción del IPA

1. Obtener el IPA: desde iTunes (deprecado), Apple Configurator 2, o herramientas como `ipatool` que descargan desde la App Store.
2. Descomprimir: `unzip App.ipa`
3. El binario Mach-O está en `Payload/App.app/App`
4. Ejecutar `file Payload/App.app/App` para ver la arquitectura (arm64, armv7, arm64e).

### Herramientas iOS RE

| Herramienta | Función |
|------------|---------|
| **class-dump** | Extrae declaraciones de interfaces Objective-C desde el Mach-O. Revela todas las clases, métodos y propiedades. |
| **Hopper Disassembler** | Descompilador y decompilador gráfico para Mach-O. Produce pseudo-código. |
| **Ghidra** | RE multiplataforma de la NSA. Soportes para Mach-O y ARM64 desde 2020. |
| **otool** | Herramienta de línea de comandos para inspeccionar Mach-O (librerías, segmentos, símbolos). |
| **nm** | Lista los símbolos exportados del binario. |
| **strings** | Extrae cadenas de texto del binario (URLs, claves, IPs). |
| **lldb** | Depurador de iOS (con dispositivo jailbreak). |

### Objective-C vs Swift

* **Objective-C:** Altamente reflectivo. `class-dump` revela casi toda la API. Los nombres de métodos son legibles y pueden ser hookeados fácilmente con Method Swizzling o Frida.
* **Swift:** No expone nombres de métodos de la misma manera. El compilador elimina metadatos de reflexión en builds release. Las funciones Swift no tienen el patrón de nomenclatura Objective-C (`-[ClassName methodName:]`), lo que hace más difícil el reversing.

### Cracking de iOS (App Cracking)

El cracking de apps iOS (eliminación de protección DRM de la App Store) sigue estos pasos:
1. **Decrypt:** Usar `Clutch`, `dumpdecrypted` o `bfinject` para extraer la versión descifrada del binario desde la RAM (App Store distribuye binarios cifrados con FairPlay DRM).
2. **Rebundle:** Re-empaquetar como IPA descifrado.
3. Estos IPA crackeados se distribuyen en repositorios piratas como iOSGods, AppDB.

---

## 5. Reversing de Código Nativo (.so / .dylib)

Tanto Android como iOS permiten ejecutar código nativo. En Android son archivos `.so` (ELF), en iOS son `.dylib` (Mach-O). Aquí se esconde la lógica más sensible: algoritmos criptográficos, ofuscación pesada, emuladores de código.

### Técnicas

1. **Extraer el binario:** Desde `lib/armeabi-v7a/libnative.so` o desde el framework embebido.
2. **Identificar el tipo:** `file libnative.so` → ELF 32-bit LSB ARM.
3. **Analizar con Ghidra/IDA Pro:** Cargar el binario, identificar funciones exportadas (JNI_OnLoad, Java_com_banco_método), analizar el flujo.
4. **Encontrar strings:** Ejecutar `strings libnative.so` para buscar URLs, claves AES, tokens de API.

### JNI (Java Native Interface)

Las funciones nativas siguen una convención de nomenclatura específica:
`Java_com_banco_app_MainActivity_validatePIN(JNIEnv*, jobject, jstring)`

Un atacante puede:
* Llamar a estas funciones directamente desde un programa C sin pasar por la lógica Java.
* Re-implementar la lógica nativa en Python para entender el algoritmo.

### ARM64 Assembly para Pentesters

Conceptos básicos de ARM64 que aparecen en reversing:

* **Registros:** X0-X7 (argumentos de función), X0 (valor de retorno), X29 (frame pointer), X30 (link register).
* **Instrucciones clave:** `LDR` (cargar), `STR` (guardar), `B`/`BL` (branch/branch-link), `CMP` (comparar), `ADD`/`SUB`.
* **Convención de llamadas:** Los primeros 8 argumentos enteros van en X0-X7. Los argumentos adicionales van en la pila.

---

## 6. Ofuscación Avanzada (El Lenguaje Cifrado)

si descompilar aplicaciones es tan fácil, ¿Cómo se protegen los bancos reales?
Usando **Ofuscación**.

La ofuscación (Ej: ProGuard en Android) es un proceso automatizado que se corre justo antes de publicar la app en la tienda.
Lo que hace es renombrar absolutamente todas las variables lógicas por nombres incomprensibles.

* *Código Original (Vulnerable):* `funcion validarTarjeta(numeroTarjeta, contrasena)`
* *Código Ofuscado (Protegido):* `funcion a(x, y)`

El código sigue funcionando igual para la computadora, pero cuando el hacker lo descompila usando Jadx, se encuentra con miles de archivos llamados `a`, `b`, `c` y funciones llamadas `x(z, j)`.
La ingeniería inversa se vuelve una tortura mental, obligando al atacante a renunciar por frustración.

### Tipos de Ofuscación

| Tipo | Descripción | Herramientas |
|------|-------------|-------------|
| **Renombrado** | Cambia nombres de clases, métodos y variables a `a`, `b`, `c` | ProGuard, R8, DexGuard |
| **Ofuscación de Strings** | Cifra cadenas literales (URLs, claves) y las descifra en runtime | DexGuard, Stringer |
| **Control Flow Flattening** | Reestructura el flujo del programa con un switch central que oculta la lógica real | Obfuscator-LLVM |
| **Opaque Predicates** | Añade condiciones que siempre son verdaderas/falsas para desorientar al decompilador | DashO, Allatori |
| **Reflection** | Reemplaza llamadas directas a métodos por invocaciones reflectivas | Custom, Zelix KlassMaster |
| **Resource Encryption** | Cifra assets y recursos del APK | DexGuard, Appdome |
| **Native code** | Mueve lógica crítica a bibliotecas nativas `.so` | NDK, Obfuscator-LLVM |
| **JNI Call Indirection** | Ofusca los nombres JNI para ocultar qué función nativa corresponde a qué funcionalidad | Custom |

### Obfuscator-LLVM (O-LLVM)

O-LLVM es una bifurcación del compilador LLVM que aplica ofuscación a nivel de compilación de código nativo (C/C++). Sus pasadas principales:

* **Bogus Control Flow (BCF):** Inyecta bloques de código basura que nunca se ejecutan pero confunden al decompilador.
* **Control Flow Flattening (CFF):** Transforma el grafo de flujo en una máquina de estados con un dispatcher central.
* **Instructions Substitution (ISB):** Reemplaza operaciones simples (`a = b + c`) por equivalentes más complejas (`a = (b ^ c) + 2*(b & c)`).

### Herramientas de De-ofuscación

* **Simplify:** Ejecuta la app en un entorno controlado y registra el flujo real de ejecución para reconstruir el código original.
* **deguard:** De-ofuscación de ProGuard basada en heurísticas de patrones de código.
* **Uncipher (Frida script):** Extrae strings descifradas en runtime gancheando la función de descifrado.
* **Tracer / Frida-trace:** Traza todas las llamadas a funciones de la API para entender el comportamiento sin leer el código.

---

## 7. Análisis Estático Automatizado con MobSF

**MobSF (Mobile Security Framework)** es la herramienta de referencia para análisis estático automatizado. Escanea APK, IPA y AAB (Android App Bundle).

### Capacidades de MobSF:

* **Análisis de permisos:** Identifica permisos peligrosos (INTERNET, READ_CONTACTS, CAMERA, RECORD_AUDIO) y genera alertas de abuso.
* **Hardcoded Secrets:** Busca patrones regex de claves API (AWS, Google, Firebase), tokens OAuth, URLs internas.
* **Vulnerabilidades WebView:** Detecta `setJavaScriptEnabled(true)`, `setAllowFileAccess(true)`, `addJavascriptInterface`.
* **Manifest Analysis:** Verifica si `android:allowBackup`, `android:debuggable`, `android:exported` están mal configurados.
* **Certificate Analysis:** Analiza la cadena de certificados y validez de la firma.
* **Binary Analysis:** Extrae strings, URLs, direcciones IP del binario nativo.
* **Análisis de librerías de terceros:** Detecta SDKs de terceros con vulnerabilidades conocidas.

### Comandos Básicos MobSF

```bash
# Análisis estático desde CLI
python manage.py api_scan --scan-type apk --file /path/to/app.apk
python manage.py api_scan --scan-type ipa --file /path/to/app.ipa

# Inicio del servidor web
python manage.py runserver 0.0.0.0:8000
```

---

## 8. Análisis Dinámico con Frida

Frida es el estándar de oro para la instrumentación dinámica. A diferencia del análisis estático (leer código), el análisis dinámico observa y modifica el comportamiento de la app en tiempo real.

### Instalación y Setup

```bash
# Instalar Frida tools en la PC
pip install frida-tools

# Descargar frida-server para el dispositivo
wget https://github.com/frida/frida/releases/download/X.X.X/frida-server-X.X.X-android-arm64.xz
adb push frida-server /data/local/tmp/
adb shell chmod 755 /data/local/tmp/frida-server
adb shell /data/local/tmp/frida-server &

# Verificar conexión
frida-ps -U
```

### Scripts Comunes de Frida

**Bypass de Root Detection:**
```javascript
Java.perform(function() {
    var RootDetection = Java.use("com.banco.security.RootDetection");
    RootDetection.isRooted.implementation = function() {
        return false;
    };
});
```

**Bypass de SSL Pinning:**
```javascript
Java.perform(function() {
    var SSLPinning = Java.use("javax.net.ssl.HttpsURLConnection");
    SSLPinning.setDefaultHostnameVerifier.implementation = function(v) {
        return null;
    };
});
```

**Dump de memoria en busca de credenciales:**
```javascript
Java.perform(function() {
    var String = Java.use("java.lang.String");
    var Runtime = Java.use("java.lang.Runtime");
    Runtime.gc();
    Java.choose("com.banco.ui.LoginActivity", {
        onMatch: function(instance) {
            console.log("Instancia encontrada:", instance);
            console.log("Password field:", instance.mPasswordField.value());
        },
        onComplete: function() {}
    });
});
```

### Objection (Frida Wrapper)

Objection simplifica tareas comunes de pentesting móvil sin escribir scripts:

```bash
# Explorar entorno de la app
objection -g com.banco.app explore
# Deshabilitar SSL Pinning
android sslpinning disable
# Buscar contraseñas en memoria
android memory search "password"
# Listar clases y métodos
android hooking list classes
# Hookear un método específico
android hooking watch class_method com.banco.auth.Login.authenticate
```

---

## 9. Tecnologías Híbridas: Flutter y React Native

### Flutter (Google)

Flutter compila a código nativo (Dart → ARM) usando el motor Skia. No produce bytecode DEX tradicional para la lógica de UI.

* **El binario Dart** está en `lib/libapp.so` o en `lib/armeabi-v7a/libflutter.so`.
* **Reversing Flutter:** Herramientas como `reFlutter` o `flutter_inject` parchean el binario para habilitar debugging.
* **snapshot:** Flutter almacena el estado de la app en snapshots que pueden contener datos sensibles.

### React Native (Meta/Facebook)

* **JavaScript bundle:** Generalmente en `assets/index.android.bundle` o dentro de `res/raw/`.
* **Reversing RN:** El bundle JS no está ofuscado por defecto. Se puede leer con un editor de texto o extraer con react-native-decompiler.
* **Hermes engine:** Si usa Hermes, el bundle está precompilado a bytecode, requiriendo `hbctool` para decompilar.

---

## 10. Defensa Contra Reverse Engineering

| Defensa | Propósito | Bypass |
|---------|-----------|--------|
| ProGuard/R8 | Renombrar clases/métodos | Frida para hookear comportamiento |
| DexGuard | Cifrado de strings + anti-tamper | Uncipher + parcheo |
| O-LLVM | Ofuscación de código nativo | Tracer + análisis de escritura/lectura de memoria |
| SSL Pinning | Evitar MitM | Frida + objection unanchored |
| Root Detection | Detectar entornos no seguros | Magisk Hide + Frida bypass |
| Emulator Detection | Prevenir análisis automatizado | Dispositivo físico |
| Integrity Check | Verificar firma del APK | Parchear checksum en smali |
| Anti-Frida | Detectar instrumentación | Frida script con puerto oculto |

---

## Criterio de Dominio (Autoevaluación)

1. Un programador junior te sugiere: *"Como la aplicación móvil ya se compiló y está en la App Store, podemos escribir la contraseña de la base de datos de producción dentro del código porque los usuarios normales no pueden leerla"*. Basado en esta guía, ¿Cómo destruirías técnicamente su argumento?
2. ¿Qué es la Ofuscación de código y por qué no impide que el software se ejecute normalmente en el celular de los clientes?
3. Nombra la herramienta gráfica estándar de la industria (gratuita) que se usa para descompilar archivos de Android de vuelta a código fuente Java.
4. Explica la diferencia entre un análisis estático y dinámico. ¿Qué ventaja tiene Frida sobre Jadx?
5. ¿Qué es el formato Smali y en qué casos un pentester necesitaría editarlo directamente en lugar de usar Jadx?
