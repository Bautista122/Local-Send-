import { ipcMain } from 'electron'
import { obtenerConfiguracion, guardarConfiguracion } from '../configuracion/almacenConfiguracion'
import { obtenerDispositivos } from '../descubrimiento/listaDeDispositivos'
import type { Configuracion } from '../../compartido/tipos'

export function registrarManejadoresIpc(): void {
  ipcMain.handle('configuracion:obtener', () => obtenerConfiguracion())

  ipcMain.handle('configuracion:guardar', (_evento, cambios: Partial<Configuracion>) =>
    guardarConfiguracion(cambios)
  )

  ipcMain.handle('dispositivos:obtener', () => obtenerDispositivos())
}