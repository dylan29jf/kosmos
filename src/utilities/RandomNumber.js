// Creamos un array entre 0 y 5000 para hacer peticiones al endpoint
let numeros = Array.from({ length: 5000 }, (_, i) => i);

// Función para seleccionar un número aleatorio sin repetir
export function randomNumber() {
  // Verificar si quedan elementos en el array
  if (numeros.length === 0) {
    console.log("No quedan números disponibles");
    return;
  }

  // Generar un número aleatorio dentro del rango
  const indiceAleatorio = Math.floor(Math.random() * numeros.length);

  // Obtener el número seleccionado
  const numeroSeleccionado = numeros[indiceAleatorio];

  // Eliminar el número seleccionado del array
  numeros.splice(indiceAleatorio, 1);

  // Devolver el número seleccionado
  return numeroSeleccionado;
}
