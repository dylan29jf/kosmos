let opciones = ["fill", "contain", "cover", "none", "scale-down"];

export const randomObject = () => {
  const indiceAleatorio = Math.floor(Math.random() * opciones.length);

  return opciones[indiceAleatorio];
};
