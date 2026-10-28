import { contextBridge, ipcRenderer } from 'electron'
import type { Configuracion, Dispositivo } from '../compartido/tipos'

const api = {
  obtenerConfiguracion: (): Promise<Configuracion> =>
    ipcRenderer.invoke('configuracion:obtener'),

  guardarConfiguracion: (cambios: Partial<Configuracion>): Promise<Configuracion> =>
    ipcRenderer.invoke('configuracion:guardar', cambios),

  obtenerDispositivos: (): Promise<Dispositivo[]> =>
    ipcRenderer.invoke('dispositivos:obtener'),

  alCambiarDispositivos: (funcion: (dispositivos: Dispositivo[]) => void): (() => void) => {
    const escucha = (_evento: unknown, dispositivos: Dispositivo[]): void => funcion(dispositivos)
    ipcRenderer.on('dispositivos:cambiaron', escucha)
    return () => ipcRenderer.removeListener('dispositivos:cambiaron', escucha)
  }
}

contextBridge.exposeInMainWorld('api', api)

export type ApiExpuesta = typeof api