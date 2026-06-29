---
title: "OWASP Mobile Top 10 y Frida"
level: "intermedio"
content_type: "guia"
updated: "2026-06-29"
reviewed: "2026-06-28"
reviewed_against: "OWASP Mobile Top 10:2024 Final Release"
official_sources:
  - title: "OWASP Mobile Top 10:2024"
    url: "https://owasp.org/www-project-mobile-top-10/2023-risks/"
  - title: "OWASP Mobile Application Security"
    url: "https://mas.owasp.org/"
  - title: "Android Security"
    url: "https://source.android.com/docs/security"
---
# OWASP Mobile Top 10 y Frida

## Objetivo de esta Guía

Entender las fallas de seguridad más catastróficas que ocurren al programar para móviles y descubrir el arma definitiva del Pentester Móvil: La instrumentación dinámica.

Al igual que en las páginas web, la organización OWASP tiene un estándar global para aplicaciones móviles.

---

## 1. OWASP Mobile Top 10:2024

La edición final 2024 es la versión vigente en 2026. La numeración cambió de forma importante frente a 2016, por lo que un informe debe indicar siempre el año de la clasificación.

### M1: Improper Credential Usage

Uso incorrecto de credenciales: secretos incrustados, tokens expuestos, credenciales reutilizadas o gestión deficiente durante almacenamiento y transmisión.

### M2: Inadequate Supply Chain Security

Riesgos introducidos por SDK, bibliotecas, procesos de construcción, tiendas, firmas y proveedores. Requiere inventario, procedencia, integridad y mantenimiento de dependencias.

### M3: Insecure Authentication/Authorization

Autenticación o autorización que confía en decisiones del cliente, sesiones débiles o controles incompletos del servidor. Los permisos críticos deben validarse en un componente confiable.

### M4: Insufficient Input/Output Validation

Entradas y salidas no validadas cruzan WebViews, deep links, IPC, archivos o servicios backend y pueden producir inyección, navegación insegura o ejecución no prevista.

### M5: Insecure Communication

La aplicación transmite información sin protección suficiente, valida incorrectamente certificados o utiliza protocolos y configuraciones débiles.

### M6: Inadequate Privacy Controls

La aplicación recopila, utiliza, comparte o conserva más datos personales de los necesarios o no aplica consentimiento y transparencia adecuados.

### M7: Insufficient Binary Protections

El binario carece de controles proporcionales contra manipulación, reempaquetado, instrumentación o análisis. La ofuscación aumenta esfuerzo, pero no reemplaza controles del servidor.

### M8: Security Misconfiguration

Permisos, componentes exportados, backups, logs, modos de depuración o configuraciones de plataforma exponen capacidades y datos.

### M9: Insecure Data Storage

Datos sensibles quedan en bases locales, preferencias, cachés, logs, capturas, portapapeles o backups sin controles suficientes.

### M10: Insufficient Cryptography

Algoritmos, parámetros, generación de aleatoriedad o gestión de claves no proporcionan la protección esperada.

El Top 10 es una referencia de concienciación. Para requisitos y pruebas más detalladas conviene usar OWASP MASVS y MASTG.

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

1. Un banco guarda las contraseñas de sesión de los clientes en un archivo local SQLite dentro de la memoria interna del celular "porque el usuario no tiene acceso a esa carpeta". Explica por qué esto se relaciona con OWASP M9:2024 y cómo un malware podría acceder a esa base de datos.
2. ¿Qué es el SSL Pinning y por qué es una pesadilla para los atacantes (o pentesters) que intentan hacer un ataque de intermediario (Man-in-the-Middle) en una red Wi-Fi pública?
3. En tus propias palabras, ¿Por qué la herramienta `Frida` se considera instrumentación "dinámica" en contraste con el uso de herramientas como `Jadx` (que es análisis "estático")?
4. Enumera tres tipos de ofuscación que protegen frente al riesgo M7:2024 (Insufficient Binary Protections) y explica brevemente cómo funciona cada uno.
5. El reempaquetado de APK se relaciona con M7:2024 (Insufficient Binary Protections). Explica cómo una app puede detectar que ha sido manipulada.
