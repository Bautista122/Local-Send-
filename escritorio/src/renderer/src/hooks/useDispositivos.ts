import { useEffect, useState } from 'react'
import type { Dispositivo } from '../../../compartido/tipos'

export function useDispositivos() {
  const [dispositivos, setDispositivos] = useState<Dispositivo[]>([])

  useEffect(() => {
    window.api.obtenerDispositivos().then(setDispositivos)
    return window.api.alCambiarDispositivos(setDispositivos)
  }, [])

  return { dispositivos }
}