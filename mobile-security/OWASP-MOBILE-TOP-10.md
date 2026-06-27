---
title: "OWASP Mobile Top 10 y Frida"
---
# OWASP Mobile Top 10 y Frida

## Objetivo de esta Guía

Entender las fallas de seguridad más catastróficas que ocurren al programar para móviles y descubrir el arma definitiva del Pentester Móvil: La instrumentación dinámica.

Al igual que en las páginas web, la organización OWASP tiene un estándar global para aplicaciones móviles.

---

## 1. El OWASP Mobile Top 10 (Los Errores Capitales)

de las 10 vulnerabilidades, estas son las tres que todo profesional debe conocer a la perfección. si dominas estas tres, ya estas por encima del 90% de los devs mobile:

### M1: Uso Inadecuado de Credenciales / Hardcoding
(Como vimos en la guía de Ingeniería Inversa). Dejar llaves secretas incrustadas en el código fuente. Es como esconder la llave de tu casa debajo del tapete... pero publicando un mapa en internet de donde está el tapete.

Patrones comunes de hardcoding:
* Claves de API de servicios cloud (AWS_ACCESS_KEY_ID, Firebase API Key, Google Maps API).
* Tokens OAuth estáticos o client_secret embebidos.
* Credenciales de bases de datos o servicios backend.
* Keys criptográficas (AES, RSA) en el código.
* URLs de endpoints internos (staging, development, producción).

**Detección estática:** MobSF, semgrep o grep con patrones como `AKIA[0-9A-Z]{16}`, `-----BEGIN RSA PRIVATE KEY-----`, `password\s*=\s*["'][^"']+["']`.

### M2: Almacenamiento Inseguro de Datos
Este es el error móvil más común del mundo. Es TAN fácil de evitar que da vergüenza ajena.
Un desarrollador guarda el usuario y la contraseña del cliente para que no tenga que escribirla cada vez que abre la app. En lugar de usar el Almacenamiento Seguro del sistema operativo (El "Keychain" en iOS o el "Keystore" en Android), el desarrollador guarda la contraseña en un archivo de texto simple o en una base de datos local SQLite (`misdatos.db`).

Si a la víctima le roban físicamente el celular, o si descarga un malware, el atacante simplemente lee ese archivo SQLite y roba la contraseña del banco en texto claro.

**Almacenamiento inseguro identificado comúnmente:**

| Ubicación | Riesgo | Ejemplo |
|-----------|--------|---------|
| SharedPreferences (XML) | Root/malware puede leer | `/data/data/com.app/shared_prefs/` |
| SQLite sin cifrar | Accesible con root | `/data/data/com.app/databases/` |
| SD card externa | Cualquier app con READ_EXTERNAL_STORAGE | `storage/emulated/0/` |
| Logcat | Cualquier app con READ_LOGS | `adb logcat` |
| NSUserDefaults | Backup iCloud extraíble | `/var/mobile/Containers/Data/.../Library/Preferences/` |
| CoreData SQLite iOS | Backup iCloud sin cifrar | `~/Library/Application Support/` |
| Plist files | Backup iTunes | `Library/Preferences/*.plist` |

**Solución correcta:** Android Keystore (con respaldo hardware TEE) para claves, y EncryptedSharedPreferences para datos persistentes. En iOS, Keychain con acceso `kSecAttrAccessibleWhenUnlockedThisDeviceOnly`.

**Por qué esto importa:** Es como si el banco te diera una billetera con la contraseña escrita en un papelito pegado adentro. Literalmente estas regalando los datos.

### M3: Comunicación Insegura (La Intercepción)
Cuando te conectas al Wi-Fi de un Starbucks y abres la app del banco? Si la app no esta bien hecha, alguien en la mesa de al lado puede verte el saldo.
Cuando la App Móvil se comunica con los servidores del Banco a través del Wi-Fi de un Starbucks, la comunicación debe estar fuertemente cifrada (HTTPS/SSL).
Si la aplicación no obliga a usar cifrado, el atacante sentado en la mesa de al lado puede hacer un ataque *Man-in-the-Middle (MitM)* y capturar todas las transacciones financieras flotando en el aire.

**Técnicas de interceptación:**
* ARP Spoofing + ettercap para redirigir tráfico.
* Proxy como Burp Suite o mitmproxy con certificado CA instalado en el dispositivo.
* SSLSplit para tráfico que no pasa por el proxy.
* DNS Spoofing para redirigir dominios.

**Vulnerabilidades comunes:**
* HTTP en lugar de HTTPS para tráfico de API.
* TLS versión insegura (SSLv3, TLS 1.0) permitida.
* Verificación de certificado TLS deshabilitada (`ALLOW_ALL_HOSTNAME_VERIFIER`).
* Chain de certificados no validada (trust-all).
* Mezcla de contenido HTTP y HTTPS (Mixed Content).
* WebViews que cargan URLs HTTP.

### M4: Autenticación y Autorización Insegura

La autenticación móvil tiene particularidades que la web no enfrenta:

* **Biométricos mal implementados:** Usar `BiometricPrompt` de Android sin fallback a PIN, o Face ID sin `LABDeviceFallback` en iOS.
* **Tokens de sesión sin expiración:** JWTs con `exp` a 30 días o sin `iat` ni `jti`.
* **OAuth2 misconfiguration:** Uso de `implicit grant` en lugar de `authorization code + PKCE`.
* **Local authentication bypass:** Implementaciones que solo verifican en el cliente (`if (pin == "1234")`) en lugar de delegar al servidor.
* **IDOR (Insecure Direct Object Reference):** Parámetros como `user_id=1234` en la URL de API que pueden modificarse para acceder a datos de otros usuarios.
* **Session fixation:** El servidor acepta un token de sesión proporcionado por el cliente.

**Detección:** Interceptar tráfico con Burp Suite y modificar parámetros de autenticación, verificar respuesta sin token, probar con tokens expirados.

### M5: Criptografía Insuficiente

| Error | Ejemplo | Impacto |
|-------|---------|---------|
| Algoritmo débil | DES, RC4, MD5, SHA1 | Fácil de forzar |
| Modo inseguro | AES-ECB (mismo texto cifrado produce mismo cifrado) | Análisis de patrones |
| IV fijo | IV hardcodeado en código | Misma clave + mismo IV = idéntico cifrado |
| Clave derivada débil | `PBKDF2` con 1 iteración | Fuerza bruta de la clave |
| Clave en código | `private static final byte[] KEY = "1234567890123456".getBytes()` | Extraíble con Jadx |
| Random inseguro | `java.util.Random` en lugar de `SecureRandom` | Predecible |
| Custom crypto | Algoritmo de cifrado implementado por el equipo | Errores catastróficos |

**Referencia:** Usar siempre AES-256-GCM para cifrado simétrico, RSA-OAEP para cifrado asimétrico, SHA-256/512 para hashing. Almacenar claves en Android Keystore / iOS Keychain.

### M6: Autorización Insegura en el Lado del Servidor

Incluso con autenticación correcta, los endpoints de API móviles pueden no validar permisos por recurso:

* Un usuario normal puede acceder a endpoints de administrador modificando headers (`role: admin`) o IDs en URL.
* APIs GraphQL sin restricciones de profundidad de consulta (batching attacks).
* Rate limiting insuficiente permite fuerza bruta de endpoints.
* La app móvil confía en la ocultación de UI (botón invisible) como control de acceso.

### M7: Calidad del Código del Lado del Cliente

* **Buffer overflow** en módulos nativos (C/C++) que procesan entrada del usuario.
* **Format string vulnerabilities** en logs que exponen datos sensibles en Logcat.
* **Memory leaks** que mantienen datos sensibles en RAM sin limpiar.
* **WebView JavaScript injection** por no sanitizar entrada.
* **Zip path traversal** al descomprimir archivos descargados.
* **Leakage through background screenshots:** Apps sin `FLAG_SECURE` en la ventana pueden mostrar datos bancarios en el switcher de tareas.

### M8: Manipulación de Código (Code Tampering)

La naturaleza del código en el dispositivo permite:

* **Repackaging:** El atacante descarga el APK, lo decompila, modifica el código malicioso (por ejemplo, quitar la verificación de PIN), lo recompila y lo redistribuye.
* **Runtime manipulation:** Frida/Objection modifican el comportamiento en tiempo real sin modificar el APK.
* **Method swizzling (iOS):** Reemplazar implementaciones de métodos Objective-C en tiempo de ejecución.
* **Pirateado:** Eliminar licencias, verificación de compra in-app, suscripciones.

**Defensas:**
* Integrity checks: verificar checksum de `classes.dex` y recursos.
* Firma de APK: Android verifica la firma en instalación.
* Código ofuscado y con anti-tamper (DexGuard evalúa integridad).
* Root/jailbreak detection para evitar entornos de análisis.

### M9: Ingeniería Inversa (Reverse Engineering)

Expuesto en detalle en la guía de RE. La capacidad del atacante de entender el código de la app permite:
* Descubrir lógica de negocio propietaria.
* Extraer secretos y claves (M1).
* Identificar endpoints de API y parámetros.
* Encontrar vulnerabilidades para explotar.
* Robar propiedad intelectual.

**Defensas:**
* Ofuscación multi-capa (ProGuard + DexGuard + O-LLVM).
* Cifrado de strings en runtime.
* Detección de depuración y emulador.
* Eliminación de metadata de debug (`debuggable=false`).
* Minificación del código (`minifyEnabled=true`).

### M10: Funcionalidad Extrania (Extraneous Functionality)

Los desarrolladores dejan puertas abiertas accidentalmente:

* **Debug endpoints:** URLs como `/api/v1/debug/simulate-payment` activas en producción.
* **Menús ocultos:** Actividades Android exportadas con lógica administrativa.
* **Logs excesivos:** `Log.d()` y `NSLog()` que exponen datos en producción.
* **Backdoors:** Credenciales de administrador hardcodeadas para testing.
* **Console logs:** Mensajes de consola en JavaScript (React Native / Cordova) que exponen claves.
* **Flagger / Feature flags:** Funcionalidades incompletas accesibles en producción.

**Detección:** Inspección del AndroidManifest.xml para actividades exportadas innecesarias. Análisis de logs con `adb logcat`. Revisión manual del código decompilado.

---

## 2. La Defensa del Banco: El "Pinning" (Anclaje)

Para evitar que los atacantes de cafeterías lean el tráfico Wi-Fi, los bancos implementaron el **SSL Pinning**.
Esto es una regla extrema de paranoia codificada en la app del banco que dice:
*"No me importa lo que diga el celular. Solo, absoluta y únicamente, voy a confiar si el servidor al que me conecto tiene el Certificado de Seguridad oficial de mi Banco. Si detecto cualquier otro certificado intermediario (como el de un hacker), cerraré la conexión inmediatamente y mostraré un error"*.

El SSL Pinning hace casi imposible para los Pentesters interceptar el tráfico para buscar vulnerabilidades. ¿Cómo hace el equipo de ciberseguridad (Red Team) para hackear su propia app entonces?

### Tipos de Pinning

| Tipo | Descripción | Bypass |
|------|-------------|--------|
| **Certificate Pinning** | La app verifica que el certificado del servidor coincida exactamente con una copia del certificado público embebido en la app. | Reemplazar el certificado embebido en el APK/IPA y re-firmar. |
| **Public Key Pinning** | Verifica solo la clave pública del certificado. Más flexible (el certificado puede renovarse pero la clave pública sigue siendo la misma). | Similar: reemplazar la clave pública embarrada y re-firmar. |
| **SPKI Hash Pinning** | Almacena el hash de la Subject Public Key Info (SPKI) del certificado. | Calcular el hash del certificado del proxy y reemplazar el hash embebido. |

### Implementación Técnica en Android

```java
// OkHttp Certificate Pinner
CertificatePinner pinner = new CertificatePinner.Builder()
    .add("api.banco.com", "sha256/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=")
    .build();

// TrustManager personalizado (anti-proxy)
TrustManager tm = new X509TrustManager() {
    @Override
    public void checkServerTrusted(X509Certificate[] chain, String authType) {
        // Comparar certificado contra hardcoded
    }
};
```

### Implementación Técnica en iOS

```objc
// NSURLSession con desafío de autenticación
- (void)URLSession:(NSURLSession *)session
    didReceiveChallenge:(NSURLAuthenticationChallenge *)challenge
    completionHandler:(void (^)(NSURLSessionAuthChallengeDisposition, NSURLCredential *))completionHandler
{
    // Extraer SecTrust, comparar certificado público embebido
}
```

---

## 3. El Arma Secreta: FRIDA (Instrumentación Dinámica)

Cuando la Ingeniería Inversa y los Proxys de red fallan porque la aplicación está demasiado ofuscada y tiene SSL Pinning, entra **Frida**.

Frida es un framework de instrumentación dinámica, y es el estándar de oro del Mobile Pentesting.
* **¿Qué hace?** En lugar de descompilar el código muerto de la app, Frida inyecta código de JavaScript **directamente en la memoria RAM del celular mientras la aplicación se está ejecutando**.
* **¿Cómo funciona?** Frida utiliza `ptrace` (Linux) o Mach API (iOS) para inyectar el motor V8 de Google (JavaScript) dentro del espacio de memoria del proceso de la aplicación objetivo. Una vez dentro, el motor JavaScript puede llamar a cualquier función nativa del proceso.

### El Salto de la Matrix

: Abres la app del banco. La app ejecuta su función `checkSSLPinning` para ver si el hacker la está interceptando. La función arroja `True` (hay un hacker) y la app se va a cerrar.
En esa micro-fracción de segundo en la Memoria RAM, Frida intercepta la función y **fuerza al sistema a cambiar el resultado de `True` a `False`**.

La aplicación queda hipnotizada, asume que no hay ningún hacker interceptando y envía todas las contraseñas al atacante felizmente.

**Por qué esto importa:** Es como si un ladrón pudiera convencer al guardia de seguridad de que él es el dueño del banco, justo en el momento en que el guardia va a dar la alarma. En la RAM todo se puede cambiar.

Con Frida, los pentesters pueden:
* Destruir la protección SSL Pinning en tiempo real.
* Saltarse los avisos de "Celular Rooteado/Jailbreakeado" (`Root Detection Bypass`).
* Robar variables de memoria antes de que se cifren.
* Rastrear todas las llamadas a funciones de cifrado.
* Modificar parámetros de funciones en tiempo real.

### Casos de Uso Avanzados de Frida

**1. Bypass de Biometric Authentication:**
```javascript
Java.perform(function() {
    var BiometricManager = Java.use("android.hardware.biometrics.BiometricManager");
    BiometricManager.canAuthenticate.implementation = function() {
        return 0; // BIOMETRIC_SUCCESS
    };
});
```

**2. Dump de Base de Datos SQLite en Tiempo Real:**
```javascript
Java.perform(function() {
    var File = Java.use("java.io.File");
    var FileInputStream = Java.use("java.io.FileInputStream");
    var dbPath = "/data/data/com.banco.app/databases/misdatos.db";
    // Leer contenido y exfiltrar
});
```

**3. Interceptar Cifrado y Capturar Claves y Datos:**
```javascript
Java.perform(function() {
    var Cipher = Java.use("javax.crypto.Cipher");
    Cipher.doFinal.overload('[B').implementation = function(input) {
        console.log("Cipher.doFinal llamado. Input:", bytesToHex(input));
        var result = this.doFinal(input);
        console.log("Cipher.doFinal output:", bytesToHex(result));
        return result;
    };
});
```

**4. Objection para Exploración sin Scripting:**
```
objection -g com.banco.app explore
android hooking list activities
android intent launch_activity com.banco.app.activities.AdminActivity
ios jailbreak disable
ios sslpinning disable
```

**5. Frida en iOS:**
```javascript
// Objective-C hook
var className = "SSLPinningManager";
var funcName = "- checkSSLPinning:";
var hook = ObjC.classes[className][funcName];
hook.implementation = function() {
    console.log("SSL Pinning check bypassed");
    return false;
};
```

**6. Frida-trace:** Permite tracear todas las llamadas a una API específica sin escribir scripts:
```bash
frida-trace -U -i "open" com.banco.app   # Traza todas las llamadas a open()
frida-trace -U -i "java.*" com.banco.app # Traza todas las funciones Java
```

### Frida + Burp Suite: El Flujo Completo

1. Iniciar Burp Suite como proxy en la PC (192.168.1.100:8080).
2. Configurar el proxy HTTP del dispositivo Android hacia Burp.
3. Ejecutar Frida script que deshabilita SSL Pinning y TrustManager.
4. El tráfico ahora fluye: App → Frida (bypass pinning) → Proxy Burp → Internet.
5. Burp puede inspeccionar y modificar todas las requests/responses.

### Limitaciones de Frida

* **Anti-Frida detection:** Apps modernas detectan Frida buscando el puerto 27042, el proceso `frida-server`, la biblioteca `frida-agent` en memoria, o nombres de hilos.
* **iOS sin jailbreak:** En iOS moderno sin jailbreak, Frida no puede inyectarse a menos que la app esté firmada con un certificado de desarrollador.
* **TiW (Trusted Internet Wrapper):** Algunas apps financieras coreanas usan contenedores que bloquean Frida.
* **Detectan ptrace:** Usando `ptrace(PT_DENY_ATTACH)` para prevenir la depuración, que Frida puede eludir pero es detectable.

---

## 4. Herramientas Complementarias

| Herramienta | Propósito | Uso típico |
|-------------|-----------|------------|
| **Burp Suite** | Proxy de interceptación | Análisis de tráfico API |
| **mitmproxy** | Proxy programable en Python | Automatización de manipulación de tráfico |
| **Drozer** | Exploración de superficie de ataque Android | Intent fuzzing, content provider probing |
| **MobSF** | Análisis SAST+DAST automatizado | CI/CD scanning |
| **QARK** | Quick Android Review Kit | Análisis de vulnerabilidades Android |
| **AndroBugs** | Escáner de vulnerabilidades Android | Análisis de seguridad estático |
| **Needle** | Framework de pentesting iOS | Automatización de pruebas iOS |
| **Objection** | Frida wrapper | Exploración runtime sin scripting |

---

## Criterio de Dominio (Autoevaluación)

1. Un banco guarda las contraseñas de sesión de los clientes en un archivo local SQLite dentro de la memoria interna del celular "porque el usuario no tiene acceso a esa carpeta". Explica por qué esto viola el principio OWASP M2 y cómo un malware podría acceder a esa base de datos.
2. ¿Qué es el SSL Pinning y por qué es una pesadilla para los atacantes (o pentesters) que intentan hacer un ataque de intermediario (Man-in-the-Middle) en una red Wi-Fi pública?
3. En tus propias palabras, ¿Por qué la herramienta `Frida` se considera instrumentación "dinámica" en contraste con el uso de herramientas como `Jadx` (que es análisis "estático")?
4. Enumera tres tipos de ofuscación que protegen contra M9 (Reverse Engineering) y explica brevemente cómo funciona cada uno.
5. El OWASP M8 (Code Tampering) describe ataques de repackaging de APK. Explica cómo una app puede detectar que ha sido manipulada.
