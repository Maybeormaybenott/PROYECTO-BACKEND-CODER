import fs from "fs";

class ProductManager {
  path;

  constructor(path) {
    this.path = path;
  }

  async crearProducto(newProduct) {
    const productsText = await fs.promises.readFile(this.path, "utf-8");
    const products = JSON.parse(productsText);

    if (products.find((product) => product.code === newProduct.code)) {
      return "Error, código ya existente en la base de datos.";
    }

    const id = products.reduce(
      (idFinal, product) => (product.id > idFinal ? product.id : idFinal),
      0
    );

    const productFinal = { id: id + 1, ...newProduct };
    products.push(productFinal);

    await fs.promises.writeFile(
      this.path,
      JSON.stringify(products, null, "\t")
    );

    ProductManager.id++;
  }

  async consultarProductos() {
    const productsText = await fs.promises.readFile(this.path, "utf-8");
    const products = JSON.parse(productsText);
    return products;
  }

  async consultarProductosById(productId) {
    const productsText = await fs.promises.readFile(this.path, "utf-8");
    const products = JSON.parse(productsText);
    const product = products.find((product) => product.id === productId);
    if (product === undefined) {
      return product;
    }
  }

  async actualizarProducto(productId, newProduct) {
    const productsText = await fs.promises.readFile(this.path, "utf-8");
    const products = JSON.parse(productsText);
    const productIndex = products.findIndex(
      (product) => product.id === productId
    );
    products[productIndex] = { id: products[productIndex].id, ...newProduct };
    await fs.promises.writeFile(
      this.path,
      JSON.stringify(products, null, "\t")
    );
  }

  async eliminarProducto(productId) {
    const productsText = await fs.promises.readFile(this.path, "utf-8");
    const products = JSON.parse(productsText);
    const productIndex = products.findIndex(
      (product) => product.id === productId
    );
    delete products[productIndex];

    await fs.promises.writeFile(
      this.path,
      JSON.stringify(products, null, "\t")
    );
  }
}

export default ProductManager;
