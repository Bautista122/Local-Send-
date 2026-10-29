import dgram from 'react-native-udp'
import { Buffer } from 'buffer'
import { idDeEsteDispositivo } from './generarIdDeDispositivo'
import {
  registrarDispositivo,
  eliminarDispositivosVencidos,
  obtenerDispositivos,
  vaciarDispositivos
} from './listaDeDispositivos'
import type { Baliza, Dispositivo } from '../compartido/tipos'

const PUERTO_DE_DESCUBRIMIENTO = 53317
const PUERTO_DE_TRANSFERENCIA = 53318
const DIRECCION_DE_BROADCAST = '255.255.255.255'
const INTERVALO_DE_BALIZA_EN_MS = 2000

type AlCambiarLaLista = (dispositivos: Dispositivo[]) => void

function interpretarBaliza(datos: Buffer): Baliza | null {
  try {
    return JSON.parse(datos.toString()) as Baliza
  } catch {
    return null
  }
}

export function iniciarDescubrimiento(
  alias: string,
  alCambiarLaLista: AlCambiarLaLista
): () => void {
  const socket = dgram.createSocket({ type: 'udp4', reuseAddr: true })

  function enviarBaliza(): void {
    const baliza: Baliza = {
      id: idDeEsteDispositivo,
      alias,
      tipo: 'celular',
      puerto: PUERTO_DE_TRANSFERENCIA
    }
    const mensaje = Buffer.from(JSON.stringify(baliza))
    socket.send(
      mensaje,
      0,
      mensaje.length,
      PUERTO_DE_DESCUBRIMIENTO,
      DIRECCION_DE_BROADCAST,
      () => {}
    )
  }

  socket.on('message', (datos: Buffer, remitente: { address: string }) => {
    const baliza = interpretarBaliza(datos)
    if (!baliza || baliza.id === idDeEsteDispositivo) return

    const eraNuevo = registrarDispositivo({
      ...baliza,
      ip: remitente.address,
      ultimaVezVisto: Date.now()
    })
    if (eraNuevo) alCambiarLaLista(obtenerDispositivos())
  })

  let temporizadorDeBaliza: ReturnType<typeof setInterval>
  let temporizadorDeLimpieza: ReturnType<typeof setInterval>

  socket.bind(PUERTO_DE_DESCUBRIMIENTO, () => {
    socket.setBroadcast(true)
    enviarBaliza()
    temporizadorDeBaliza = setInterval(enviarBaliza, INTERVALO_DE_BALIZA_EN_MS)
    temporizadorDeLimpieza = setInterval(() => {
      if (eliminarDispositivosVencidos()) alCambiarLaLista(obtenerDispositivos())
    }, INTERVALO_DE_BALIZA_EN_MS)
  })

  return () => {
    clearInterval(temporizadorDeBaliza)
    clearInterval(temporizadorDeLimpieza)
    socket.close()
    vaciarDispositivos()
  }
}
