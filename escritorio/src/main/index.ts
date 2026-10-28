import { app, shell, BrowserWindow } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import { registrarManejadoresIpc } from './ipc/registrarManejadoresIpc'
import { iniciarDescubrimiento } from './descubrimiento/servicioDeDescubrimiento'

function crearVentana(): void {
  const ventanaPrincipal = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  ventanaPrincipal.on('ready-to-show', () => {
    ventanaPrincipal.show()
  })

  ventanaPrincipal.webContents.setWindowOpenHandler((detalles) => {
    shell.openExternal(detalles.url)
    return { action: 'deny' }
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    ventanaPrincipal.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    ventanaPrincipal.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

function avisarCambioDeDispositivosATodasLasVentanas(dispositivos: unknown): void {
  BrowserWindow.getAllWindows().forEach((ventana) => {
    ventana.webContents.send('dispositivos:cambiaron', dispositivos)
  })
}

app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.localsend.escritorio')

  app.on('browser-window-created', (_evento, ventana) => {
    optimizer.watchWindowShortcuts(ventana)
  })

  registrarManejadoresIpc()
  iniciarDescubrimiento(avisarCambioDeDispositivosATodasLasVentanas)
  crearVentana()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) crearVentana()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})