import { useConfiguracion } from './hooks/useConfiguracion'
import { useDispositivos } from './hooks/useDispositivos'

function App(): React.JSX.Element {
  const { configuracion } = useConfiguracion()
  const { dispositivos } = useDispositivos()

  return (
    <main>
      <h1>LocalSend</h1>
      <p>Alias: {configuracion?.alias}</p>
      <h2>Dispositivos encontrados ({dispositivos.length})</h2>
      <ul>
        {dispositivos.map((dispositivo) => (
          <li key={dispositivo.id}>
            {dispositivo.alias} - {dispositivo.ip}
          </li>
        ))}
      </ul>
    </main>
  )
}

export default App