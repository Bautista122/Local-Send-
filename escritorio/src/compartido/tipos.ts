export type Configuracion = {
  alias: string
  carpetaDeDescargas: string
}

export type TipoDeDispositivo = 'pc' | 'laptop' | 'celular'

export type Dispositivo = {
  id: string
  alias: string
  tipo: TipoDeDispositivo
  ip: string
  puerto: number
  ultimaVezVisto: number
}

export type Baliza = {
  id: string
  alias: string
  tipo: TipoDeDispositivo
  puerto: number
}