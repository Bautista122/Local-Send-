import type { Dispositivo } from '../../compartido/tipos'

const TIEMPO_DE_VIDA_EN_MS = 6000

const dispositivosPorId = new Map<string, Dispositivo>()

export function registrarDispositivo(dispositivo: Dispositivo): boolean {
  const eraNuevo = !dispositivosPorId.has(dispositivo.id)
  dispositivosPorId.set(dispositivo.id, dispositivo)
  return eraNuevo
}

export function eliminarDispositivosVencidos(): boolean {
  const ahora = Date.now()
  let huboCambios = false

  for (const [id, dispositivo] of dispositivosPorId) {
    if (ahora - dispositivo.ultimaVezVisto > TIEMPO_DE_VIDA_EN_MS) {
      dispositivosPorId.delete(id)
      huboCambios = true
    }
  }
  return huboCambios
}

export function obtenerDispositivos(): Dispositivo[] {
  return Array.from(dispositivosPorId.values())
}