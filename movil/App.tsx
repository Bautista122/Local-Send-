import { StatusBar } from 'expo-status-bar'
import { ControladorDeRadar } from './src/componentes/controladores/ControladorDeRadar'

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <ControladorDeRadar />
    </>
  )
}