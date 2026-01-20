/**
 * Configuración centralizada por entorno
 * Soporta: local, development, staging, production
 */

export const CONFIG = {
  // 🌍 Entorno actual
  env: import.meta.env.VITE_APP_ENV || 'development',
  
  // 🔗 URLs de API
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  
  // 📊 Logging
  logLevel: import.meta.env.VITE_LOG_LEVEL || 'debug',
  
  // 🔧 Flags automáticos de Vite
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,
  
  // 🎯 Flags derivados
  isLocal: import.meta.env.VITE_APP_ENV === 'development',
  isStaging: import.meta.env.VITE_APP_ENV === 'staging',
  isProduction: import.meta.env.VITE_APP_ENV === 'production',
  
  // ✨ Features por entorno
  enableDebug: import.meta.env.DEV || import.meta.env.VITE_APP_ENV === 'staging',
  enableAnalytics: import.meta.env.VITE_APP_ENV === 'production',
  enableTimeTravel: import.meta.env.DEV,
  
  // 📱 App info
  version: '0.1.0',
  name: 'PC Futbol 7 Remake',
}

/**
 * Logger con soporte a niveles
 * Niveles: debug > info > warn > error
 */
export const Logger = {
  debug: (msg, data) => {
    if (CONFIG.logLevel === 'debug') {
      console.log(`%c[DEBUG] ${msg}`, 'color: #888; font-size: 11px', data)
    }
  },
  
  info: (msg, data) => {
    if (['debug', 'info'].includes(CONFIG.logLevel)) {
      console.log(`%c[INFO] ${msg}`, 'color: #0066cc; font-weight: bold', data)
    }
  },
  
  warn: (msg, data) => {
    if (['debug', 'info', 'warn'].includes(CONFIG.logLevel)) {
      console.warn(`%c[WARN] ${msg}`, 'color: #ff9800; font-weight: bold', data)
    }
  },
  
  error: (msg, data) => {
    console.error(`%c[ERROR] ${msg}`, 'color: #d32f2f; font-weight: bold', data)
  },
}

/**
 * Helper para detectar navegador
 */
export const Browser = {
  isChrome: /Chrome/.test(navigator.userAgent),
  isFirefox: /Firefox/.test(navigator.userAgent),
  isSafari: /Safari/.test(navigator.userAgent),
  isEdge: /Edg/.test(navigator.userAgent),
}

/**
 * Helper para detectar dispositivo
 */
export const Device = {
  isMobile: /Mobile|Android|iPhone/.test(navigator.userAgent),
  isTablet: /iPad|Android/.test(navigator.userAgent),
  isDesktop: !/Mobile|Android|iPhone|iPad/.test(navigator.userAgent),
}

// 🔍 Debug en consola
if (CONFIG.enableDebug) {
  window.__CONFIG__ = CONFIG
  window.__LOGGER__ = Logger
  console.log('%cPC Futbol 7 Remake - Debug Mode', 'color: #2c3e50; font-size: 16px; font-weight: bold')
  console.table(CONFIG)
}
