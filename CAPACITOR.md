# Documentación de Capacitor - PC Fútbol Remake 📱

Esta guía describe cómo trabajar con Capacitor para crear builds nativos de Android (e iOS en el futuro) del proyecto PC Fútbol Remake.

## 📋 Tabla de Contenidos

- [Requisitos Previos](#requisitos-previos)
- [Instalación Inicial](#instalación-inicial)
- [Configuración](#configuración)
- [Desarrollo en Android](#desarrollo-en-android)
- [Build para Producción](#build-para-producción)
- [Solución de Problemas](#solución-de-problemas)

---

## 🔧 Requisitos Previos

### Para Android

- **Node.js** (v16 o superior)
- **Android Studio** (última versión estable)
- **JDK 11 o superior**
- **Android SDK** (API Level 22 o superior)
- Al menos **8GB de RAM** disponible

### Configuración del Entorno Android

1. **Instalar Android Studio**: Descarga desde [developer.android.com](https://developer.android.com/studio)

2. **Configurar Variables de Entorno**:
   ```bash
   # Windows (PowerShell)
   $env:ANDROID_HOME = "C:\Users\TU_USUARIO\AppData\Local\Android\Sdk"
   $env:Path += ";$env:ANDROID_HOME\platform-tools"
   $env:Path += ";$env:ANDROID_HOME\tools"
   ```

3. **Verificar Instalación**:
   ```bash
   adb --version
   javac -version
   ```

---

## 📦 Instalación Inicial

Si ya tienes el proyecto clonado, las dependencias de Capacitor ya están instaladas. Si no:

```bash
# Instalar dependencias del proyecto
npm install

# Las dependencias de Capacitor están en package.json:
# @capacitor/core
# @capacitor/cli
# @capacitor/android
```

---

## ⚙️ Configuración

El proyecto ya está configurado con Capacitor. El archivo [`capacitor.config.json`](capacitor.config.json) contiene la configuración principal:

```json
{
  "appId": "com.pcfutbol.remake",
  "appName": "PC Fútbol Remake",
  "webDir": "dist",
  "bundledWebRuntime": false
}
```

### Parámetros Importantes

- **`appId`**: Identificador único de la app en las tiendas (com.pcfutbol.remake)
- **`appName`**: Nombre visible de la aplicación
- **`webDir`**: Carpeta donde se generan los assets web (dist/)
- **`bundledWebRuntime`**: false para usar el WebView del sistema

---

## 🔨 Desarrollo en Android

### 1. Build del Proyecto Web

Antes de sincronizar con Capacitor, necesitas generar los assets web:

```bash
npm run build
```

Esto genera la carpeta `dist/` con todos los archivos compilados.

### 2. Sincronizar con Capacitor

Copia los assets web a la plataforma Android:

```bash
npx cap sync
```

Este comando:
- Copia los archivos de `dist/` a `android/app/src/main/assets/public`
- Actualiza plugins nativos
- Sincroniza la configuración

### 3. Abrir en Android Studio

```bash
npx cap open android
```

Esto abre el proyecto en Android Studio donde puedes:
- Ejecutar en un emulador o dispositivo físico
- Depurar la aplicación
- Generar APK o AAB para producción

### 4. Ejecutar en Emulador

Desde Android Studio:
1. Ve a **Device Manager** (ícono de teléfono en la barra superior)
2. Crea un nuevo dispositivo virtual si no tienes uno
3. Presiona el botón **Run** (▶️) o `Shift + F10`

### 5. Ejecutar en Dispositivo Físico

1. Habilita **Opciones de Desarrollador** en tu dispositivo Android
2. Activa **Depuración USB**
3. Conecta el dispositivo por USB
4. Autoriza la conexión en el dispositivo
5. Selecciona el dispositivo en Android Studio y ejecuta

---

## 📱 Desarrollo en Vivo (Live Reload)

Para desarrollo con recarga en vivo:

1. **Inicia el servidor de desarrollo**:
   ```bash
   npm run dev
   ```

2. **Configura la URL en capacitor.config.json** (temporal):
   ```json
   {
     "server": {
       "url": "http://192.168.1.X:5173",
       "cleartext": true
     }
   }
   ```
   Reemplaza `192.168.1.X` con tu IP local.

3. **Sincroniza y ejecuta**:
   ```bash
   npx cap sync
   npx cap open android
   ```

⚠️ **Importante**: Remueve la configuración `server` antes de crear builds de producción.

---

## 🎨 Personalizar Iconos y Splash Screens

### Generar Assets Automáticamente

El proyecto incluye iconos personalizados. Para regenerarlos o crear nuevos:

1. **Coloca tu icono fuente** en `resources/icon.png`:
   - Tamaño mínimo: 512x512 px
   - Tamaño recomendado: 1024x1024 px
   - Formato: PNG con fondo transparente o de color

2. **Opcionalmente, añade splash screen** en `resources/splash.png`:
   - Tamaño recomendado: 2732x2732 px
   - El logo debe estar centrado con margen
   - Formato: PNG

3. **Genera los assets**:
   ```bash
   # Instalar la herramienta (si no está instalada)
   npm install --save-dev @capacitor/assets

   # Generar assets para Android
   npx @capacitor/assets generate --android

   # O para todas las plataformas
   npx @capacitor/assets generate
   ```

Esto generará automáticamente:
- ✅ Iconos en todas las densidades (ldpi, mdpi, hdpi, xhdpi, xxhdpi, xxxhdpi)
- ✅ Iconos adaptativos (adaptive icons) para Android 8+
- ✅ Splash screens en todas las orientaciones
- ✅ Versiones para modo claro y oscuro

### Personalización Manual

Si prefieres personalizar manualmente:

**Iconos**: Coloca tus iconos en las carpetas:
- `android/app/src/main/res/mipmap-mdpi/ic_launcher.png` (48x48)
- `android/app/src/main/res/mipmap-hdpi/ic_launcher.png` (72x72)
- `android/app/src/main/res/mipmap-xhdpi/ic_launcher.png` (96x96)
- `android/app/src/main/res/mipmap-xxhdpi/ic_launcher.png` (144x144)
- `android/app/src/main/res/mipmap-xxxhdpi/ic_launcher.png` (192x192)

**Splash Screens**: Coloca tus splash screens en:
- `android/app/src/main/res/drawable/splash.png`
- `android/app/src/main/res/drawable-port-*/splash.png` (portrait)
- `android/app/src/main/res/drawable-land-*/splash.png` (landscape)

---

## 🚀 Build para Producción

### Generar APK (Debug)

1. Build del proyecto web:
   ```bash
   npm run build
   npx cap sync
   ```

2. Desde Android Studio:
   - **Build → Build Bundle(s) / APK(s) → Build APK(s)**
   - El APK se genera en: `android/app/build/outputs/apk/debug/`

### Generar APK/AAB Firmado (Release)

1. **Crear Keystore** (solo una vez):
   ```bash
   keytool -genkey -v -keystore pcfutbol-release-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias pcfutbol
   ```

2. **Configurar Firma** en `android/app/build.gradle`:
   ```gradle
   android {
       signingConfigs {
           release {
               storeFile file('../../pcfutbol-release-key.jks')
               storePassword 'TU_PASSWORD'
               keyAlias 'pcfutbol'
               keyPassword 'TU_PASSWORD'
           }
       }
       buildTypes {
           release {
               signingConfig signingConfigs.release
           }
       }
   }
   ```

3. **Generar Build**:
   ```bash
   npm run build
   npx cap sync
   ```

4. Desde Android Studio:
   - **Build → Generate Signed Bundle / APK**
   - Selecciona **Android App Bundle (AAB)** para Google Play Store
   - O **APK** para distribución directa

Los archivos se generan en `android/app/build/outputs/`.

---

## 🔍 Comandos Útiles

```bash
# Ver estado de Capacitor
npx cap doctor

# Actualizar Capacitor
npm install @capacitor/core@latest @capacitor/cli@latest @capacitor/android@latest

# Limpiar y reconstruir
npx cap sync android

# Ver logs en tiempo real
npx cap run android -l

# Listar dispositivos conectados
adb devices
```

---

## 🐛 Solución de Problemas

### Error: "Could not find the web assets directory"

**Solución**: Ejecuta `npm run build` antes de `npx cap sync`.

### Error: "SDK location not found"

**Solución**: Crea el archivo `android/local.properties`:
```properties
sdk.dir=C:\\Users\\TU_USUARIO\\AppData\\Local\\Android\\Sdk
```

### Error: Gradle Build Failed

**Solución**: 
1. Abre Android Studio
2. **File → Invalidate Caches / Restart**
3. Espera a que se descarguen las dependencias

### Error: No se encuentra el dispositivo

**Solución**:
```bash
# Reiniciar ADB
adb kill-server
adb start-server
adb devices
```

### La app se ve en blanco

**Solución**:
1. Verifica que `npm run build` haya completado sin errores
2. Ejecuta `npx cap sync` nuevamente
3. Limpia y reconstruye desde Android Studio: **Build → Clean Project** luego **Build → Rebuild Project**

---

## 📚 Recursos Adicionales

- [Documentación Oficial de Capacitor](https://capacitorjs.com/docs)
- [Guía de Android Studio](https://developer.android.com/studio/intro)
- [Distribución en Google Play](https://developer.android.com/distribute/best-practices/launch)

---

## 🤝 Contribuir

Si encuentras problemas con la configuración de Capacitor o tienes mejoras, por favor:
1. Abre un [Issue](https://github.com/mapiedra/pcfutbol-remake/issues)
2. O envía un Pull Request con las mejoras a este documento

---

**Última actualización**: 18 de febrero de 2026
