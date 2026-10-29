import { useColorScheme } from 'react-native'

const coloresClaros = {
  fondo: '#F4F6F8',
  tarjeta: '#FFFFFF',
  texto: '#14181F',
  textoSecundario: '#5C6672',
  acento: '#1E88E5'
}

const coloresOscuros = {
  fondo: '#121418',
  tarjeta: '#1E2229',
  texto: '#F1F3F5',
  textoSecundario: '#9AA4B0',
  acento: '#4DA3FF'
}

export function useColores() {
  const esquema = useColorScheme()
  return esquema === 'dark' ? coloresOscuros : coloresClaros
}
