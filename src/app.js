const express = require("express");
const ProductManager = require("./ProductManager.js");
const productManager = new ProductManager();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/productos", async (req, res) => {
  const productos = await productManager.consultarProductos();
  const limit = req.query.limit;

  if (limit) {
    return res.send(productos.slice(0, limit));
  } else {
    res.send(productos);
  }
});

app.get("/productos/:productoId", async (req, res) => {
  const productoId = parseInt(req.params.productoId, 10);
  const producto = await productManager.consultarProductosById(productoId);

  if (producto) {
    res.send(producto);
  } else {
    res.status(404).send({ error: "Producto no encontrado" });
  }
});

app.listen(8080, () => console.log("holanda"));
