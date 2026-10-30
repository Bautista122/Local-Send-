import { useEffect, useRef } from 'react'
import { Animated, Easing, StyleSheet, Text, View } from 'react-native'
import { useColores } from '../../tema/useColores'

const TAMANO_DEL_RADAR = 220
const DURACION_DE_ONDA_EN_MS = 2400

function useOnda(retrasoEnMs: number) {
  const progreso = useRef(new Animated.Value(0)).current

  useEffect(() => {
    const animacion = Animated.loop(
      Animated.sequence([
        Animated.delay(retrasoEnMs),
        Animated.timing(progreso, {
          toValue: 1,
          duration: DURACION_DE_ONDA_EN_MS,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true
        })
      ])
    )
    animacion.start()
    return () => animacion.stop()
  }, [progreso, retrasoEnMs])

  return {
    opacity: progreso.interpolate({ inputRange: [0, 1], outputRange: [0.6, 0] }),
    transform: [{ scale: progreso.interpolate({ inputRange: [0, 1], outputRange: [0.2, 1] }) }]
  }
}

export function RadarDeBusqueda() {
  const colores = useColores()
  const primeraOnda = useOnda(0)
  const segundaOnda = useOnda(DURACION_DE_ONDA_EN_MS / 2)

  return (
    <View style={estilos.radar}>
      <Animated.View style={[estilos.onda, { borderColor: colores.acento }, primeraOnda]} />
      <Animated.View style={[estilos.onda, { borderColor: colores.acento }, segundaOnda]} />
      <Text style={estilos.centro}>📡</Text>
    </View>
  )
}

const estilos = StyleSheet.create({
  radar: {
    width: TAMANO_DEL_RADAR,
    height: TAMANO_DEL_RADAR,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center'
  },
  onda: {
    position: 'absolute',
    width: TAMANO_DEL_RADAR,
    height: TAMANO_DEL_RADAR,
    borderRadius: TAMANO_DEL_RADAR / 2,
    borderWidth: 3
  },
  centro: { fontSize: 44 }
})
