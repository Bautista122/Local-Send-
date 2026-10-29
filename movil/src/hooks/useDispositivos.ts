import { useEffect, useState } from 'react'
import { iniciarDescubrimiento } from '../descubrimiento/servicioDeDescubrimiento'
import type { Dispositivo } from '../compartido/tipos'

export function useDispositivos(alias: string, activo: boolean) {
  const [dispositivos, setDispositivos] = useState<Dispositivo[]>([])

  useEffect(() => {
    if (!activo) {
      setDispositivos([])
      return
    }
    return iniciarDescubrimiento(alias, setDispositivos)
  }, [alias, activo])

  return { dispositivos }
}
