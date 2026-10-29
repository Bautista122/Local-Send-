function generarTramoAleatorio(): string {
  return Math.random().toString(36).slice(2, 10)
}

export const idDeEsteDispositivo = `${generarTramoAleatorio()}-${generarTramoAleatorio()}-${Date.now()}`
