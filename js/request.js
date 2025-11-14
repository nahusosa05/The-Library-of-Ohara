export async function getProducts() {
  try {
    const response = await fetch("./products.json");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener los datos: ", error);
  }
}
