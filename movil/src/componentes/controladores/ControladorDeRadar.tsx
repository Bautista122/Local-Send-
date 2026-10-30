import { useState } from 'react'
import { generarAliasAmigable } from '../../configuracion/generarAliasAmigable'
import { useDispositivos } from '../../hooks/useDispositivos'
import { useRedWifi } from '../../hooks/useRedWifi'
import { ContenedorDeRadar } from '../contenedores/ContenedorDeRadar'
import type { Dispositivo } from '../../compartido/tipos'

export function ControladorDeRadar() {
  const [aliasPropio] = useState(generarAliasAmigable)
  const { estaEnWifi } = useRedWifi()
  const { dispositivos } = useDispositivos(aliasPropio, estaEnWifi)

  function elegirDispositivo(dispositivo: Dispositivo): void {
    console.log('Dispositivo elegido:', dispositivo.alias, dispositivo.ip)
  }

  return (
    <ContenedorDeRadar
      aliasPropio={aliasPropio}
      estaEnWifi={estaEnWifi}
      dispositivos={dispositivos}
      alElegirDispositivo={elegirDispositivo}
    />
  )
}
