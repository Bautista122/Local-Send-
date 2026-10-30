import { Pressable, StyleSheet, Text, View } from 'react-native'
import { useColores } from '../../tema/useColores'
import type { TipoDeDispositivo } from '../../compartido/tipos'

const iconosPorTipo: Record<TipoDeDispositivo, string> = {
  pc: '🖥️',
  laptop: '💻',
  celular: '📱'
}

type Props = {
  alias: string
  ip: string
  tipo: TipoDeDispositivo
  alPresionar: () => void
}

export function TarjetaParaDispositivo({ alias, ip, tipo, alPresionar }: Props) {
  const colores = useColores()

  return (
    <Pressable
      onPress={alPresionar}
      style={[estilos.tarjeta, { backgroundColor: colores.tarjeta }]}
    >
      <Text style={estilos.icono}>{iconosPorTipo[tipo]}</Text>
      <View>
        <Text style={[estilos.alias, { color: colores.texto }]}>{alias}</Text>
        <Text style={{ color: colores.textoSecundario }}>{ip}</Text>
      </View>
    </Pressable>
  )
}

const estilos = StyleSheet.create({
  tarjeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    padding: 16,
    borderRadius: 16,
    marginBottom: 12
  },
  icono: { fontSize: 32 },
  alias: { fontSize: 18, fontWeight: '600' }
})
