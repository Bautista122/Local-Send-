import { FlatList, StyleSheet, Text, View } from 'react-native'
import { useColores } from '../../tema/useColores'
import { RadarDeBusqueda } from '../contenidos/RadarDeBusqueda'
import { TarjetaParaDispositivo } from '../contenidos/TarjetaParaDispositivo'
import type { Dispositivo } from '../../compartido/tipos'

type Props = {
  aliasPropio: string
  estaEnWifi: boolean
  dispositivos: Dispositivo[]
  alElegirDispositivo: (dispositivo: Dispositivo) => void
}

export function ContenedorDeRadar({
  aliasPropio,
  estaEnWifi,
  dispositivos,
  alElegirDispositivo
}: Props) {
  const colores = useColores()

  return (
    <View style={[estilos.pantalla, { backgroundColor: colores.fondo }]}>
      <Text style={[estilos.titulo, { color: colores.texto }]}>LocalSend</Text>
      <Text style={{ color: colores.textoSecundario }}>Sos: {aliasPropio}</Text>

      {!estaEnWifi ? (
        <Text style={[estilos.aviso, { color: colores.texto }]}>
          Conectate a una red Wi-Fi para buscar dispositivos.
        </Text>
      ) : (
        <>
          <RadarDeBusqueda />
          <FlatList
            data={dispositivos}
            keyExtractor={(dispositivo) => dispositivo.id}
            ListEmptyComponent={
              <Text style={[estilos.aviso, { color: colores.textoSecundario }]}>
                Buscando dispositivos cercanos...
              </Text>
            }
            renderItem={({ item }) => (
              <TarjetaParaDispositivo
                alias={item.alias}
                ip={item.ip}
                tipo={item.tipo}
                alPresionar={() => alElegirDispositivo(item)}
              />
            )}
          />
        </>
      )}
    </View>
  )
}

const estilos = StyleSheet.create({
  pantalla: { flex: 1, paddingTop: 64, paddingHorizontal: 20 },
  titulo: { fontSize: 32, fontWeight: '700' },
  aviso: { textAlign: 'center', marginTop: 24, fontSize: 16 }
})
