const fs = require("fs");
const archivo = "./Productos.json";

class ProductManager {
  static id = 0;
  products = [];

  constructor() {
    this.consultarProductos();
  }

  consultarProductos() {
    try {
      const contenido = fs.readFileSync(archivo, "utf-8");
      this.products = JSON.parse(contenido);
    } catch (error) {
      this.products = [];
    }
  }

  guardarProductos() {
    fs.writeFileSync(archivo, JSON.stringify(this.products, null, "\t"));
  }

  async crearProducto(title, description, price, thumbnail, code, stock) {
    const producto = {
      id: ProductManager.id++,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };

    if (
      !title ||
      !description ||
      !price ||
      !thumbnail ||
      !code ||
      stock === undefined ||
      stock === null
    ) {
      console.log("Todos los campos son obligatorios");
      return;
    }

    if (this.products.some((product) => product.code === code)) {
      console.log("Ya existe un producto con el mismo código");
      return;
    }

    this.products.push(producto);
    this.guardarProductos();
    console.log("Producto agregado:", producto);
  }

  async consultarProductosById(id) {
    const producto = this.products.find((product) => product.id === id);
    if (producto) {
      return producto;
    } else {
      console.log("Producto no encontrado");
    }
  }

  async actualizarProducto(id, fieldToUpdate, newValue) {
    const productoAct = this.products.find((product) => product.id === id);

    if (productoAct) {
      productoAct[fieldToUpdate] = newValue;
      this.guardarProductos();
      console.log(`Producto con ID ${id} actualizado`);
    } else {
      console.log(`Producto con ID ${id} no encontrado`);
    }
  }

  async eliminarProducto(id) {
    this.products = this.products.filter((product) => product.id !== id);
    this.guardarProductos();
    console.log(`Producto con ID ${id} eliminado`);
  }
}

const asyncFunction = async () => {
  const productManager = new ProductManager();

  await productManager.crearProducto(
    "Kimcha",
    "Rokybalboa",
    49,
    "Saturno",
    478,
    10
  );
  await productManager.crearProducto(
    "Kimcha",
    "Rokybalboa",
    49,
    "Saturno",
    479,
    10
  );

  const productos = await productManager.consultarProductos();
};

asyncFunction();

module.exports = ProductManager;
