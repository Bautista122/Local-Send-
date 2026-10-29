const adjetivos = ['Alegre', 'Veloz', 'Tranquilo', 'Brillante', 'Curioso', 'Valiente']
const sustantivos = ['Manzana', 'Naranja', 'Delfín', 'Cometa', 'Zorro', 'Nube']

function elegirAlAzar(opciones: string[]): string {
  return opciones[Math.floor(Math.random() * opciones.length)]
}

export function generarAliasAmigable(): string {
  return `${elegirAlAzar(sustantivos)} ${elegirAlAzar(adjetivos)}`
}
