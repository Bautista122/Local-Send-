import { useEffect, useState } from 'react'
import type { Configuracion } from '../../../compartido/tipos'

export function useConfiguracion() {
  const [configuracion, setConfiguracion] = useState<Configuracion | null>(null)

  useEffect(() => {
    window.api.obtenerConfiguracion().then(setConfiguracion)
  }, [])

  return { configuracion }
}