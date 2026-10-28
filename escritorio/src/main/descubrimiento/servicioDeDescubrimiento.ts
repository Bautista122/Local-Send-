import dgram from 'dgram'
import { obtenerConfiguracion } from '../configuracion/almacenConfiguracion'
import { idDeEsteDispositivo } from './generarIdDeDispositivo'
import {
  registrarDispositivo,
  eliminarDispositivosVencidos,
  obtenerDispositivos
} from './listaDeDispositivos'
import type { Baliza, Dispositivo } from '../../compartido/tipos'

const PUERTO_DE_DESCUBRIMIENTO = 53317
const PUERTO_DE_TRANSFERENCIA = 53318
const DIRECCION_DE_BROADCAST = '255.255.255.255'
const INTERVALO_DE_BALIZA_EN_MS = 2000

type AlCambiarLaLista = (dispositivos: Dispositivo[]) => void

const socket = dgram.createSocket({ type: 'udp4', reuseAddr: true })

function armarBaliza(): Baliza {
  return {
    id: idDeEsteDispositivo,
    alias: obtenerConfiguracion().alias,
    tipo: 'laptop',
    puerto: PUERTO_DE_TRANSFERENCIA
  }
}

function enviarBaliza(): void {
  const mensaje = Buffer.from(JSON.stringify(armarBaliza()))
  socket.send(mensaje, PUERTO_DE_DESCUBRIMIENTO, DIRECCION_DE_BROADCAST)
}

function interpretarBaliza(datos: Buffer): Baliza | null {
  try {
    return JSON.parse(datos.toString()) as Baliza
  } catch {
    return null
  }
}

export function iniciarDescubrimiento(alCambiarLaLista: AlCambiarLaLista): void {
  socket.on('message', (datos, remitente) => {
    const baliza = interpretarBaliza(datos)
    if (!baliza || baliza.id === idDeEsteDispositivo) return

    const eraNuevo = registrarDispositivo({
      ...baliza,
      ip: remitente.address,
      ultimaVezVisto: Date.now()
    })
    if (eraNuevo) alCambiarLaLista(obtenerDispositivos())
  })

  socket.bind(PUERTO_DE_DESCUBRIMIENTO, () => {
    socket.setBroadcast(true)
    enviarBaliza()
    setInterval(enviarBaliza, INTERVALO_DE_BALIZA_EN_MS)
    setInterval(() => {
      if (eliminarDispositivosVencidos()) alCambiarLaLista(obtenerDispositivos())
    }, INTERVALO_DE_BALIZA_EN_MS)
  })
}