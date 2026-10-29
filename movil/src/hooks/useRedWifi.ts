import { useEffect, useState } from 'react'
import * as Network from 'expo-network'

const INTERVALO_DE_REVISION_EN_MS = 3000

export function useRedWifi() {
  const [estaEnWifi, setEstaEnWifi] = useState(false)

  useEffect(() => {
    let sigueMontado = true

    async function revisarRed(): Promise<void> {
      const estado = await Network.getNetworkStateAsync()
      if (sigueMontado) setEstaEnWifi(estado.type === Network.NetworkStateType.WIFI)
    }

    revisarRed()
    const temporizador = setInterval(revisarRed, INTERVALO_DE_REVISION_EN_MS)

    return () => {
      sigueMontado = false
      clearInterval(temporizador)
    }
  }, [])

  return { estaEnWifi }
}
