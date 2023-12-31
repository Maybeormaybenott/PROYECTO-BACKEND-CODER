import { Router } from "express";
import ProductManager from "../ProductManager.js";

const router = Router();
const productManager = new ProductManager("./products.json");

router.get("/", async (req, res) => {
  const products = await productManager.consultarProductos();
  const limit = req.query.limit;

  if (limit) {
    return res.send(products.slice(0, limit));
  }
  res.send(products);
});

router.get("/:pid", async (req, res) => {
  const productId = parseInt(req.params.productId, 10);
  const product = await productManager.consultarProductosById(productId);

  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ error: "Producto no encontrado" });
  }
});

router.post("/", async (req, res) => {
  const product = req.body;
  if (product.status === undefined) {
    product.status = true;
  }

  if (
    !req.body.title ||
    !req.body.description ||
    !req.body.code ||
    !req.body.price ||
    !req.body.stock ||
    !req.body.category ||
    !req.body.thumbnails
  ) {
    return res.status(400).send("Todos los campos son obligatorios");
  }

  await productManager.crearProducto(product);
  req.context.socketServer.emit("productoAgregado", nuevoProducto);
  res.status(200).send("Producto agregado exitosamente");
});

router.put("/:pid", async (req, res) => {
  if (req.body.id) {
    return res.status(400).send("No envíes un ID");
  }

  await productManager.actualizarProducto(
    parseInt(req.params.pid, 10),
    req.body
  );
  res.status(200).send();
});

router.delete("/:pid", async (req, res) => {
  await productManager.eliminarProducto(parseInt(req.params.pid, 10));
  req.context.socketServer.emit("productoAgregado", nuevoProducto);
  res.status(200).send("Producto eliminado");
});

export default router;
