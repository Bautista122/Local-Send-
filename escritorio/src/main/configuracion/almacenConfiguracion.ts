import Store from 'electron-store'
import { app } from 'electron'
import { join } from 'path'
import { generarAliasAmigable } from './generarAliasAmigable'
import type { Configuracion } from '../../compartido/tipos'

const almacen = new Store<Configuracion>({
  name: 'configuracion',
  defaults: {
    alias: generarAliasAmigable(),
    carpetaDeDescargas: join(app.getPath('downloads'), 'LocalSend')
  }
})

export function obtenerConfiguracion(): Configuracion {
  return {
    alias: almacen.get('alias'),
    carpetaDeDescargas: almacen.get('carpetaDeDescargas')
  }
}

export function guardarConfiguracion(cambios: Partial<Configuracion>): Configuracion {
  almacen.set(cambios)
  return obtenerConfiguracion()
}