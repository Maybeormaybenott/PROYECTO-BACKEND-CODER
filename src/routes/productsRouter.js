import { Router } from "express";
import ProductManager from "../ProductManager.js";

const router = Router();
const products = [];

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

  // if(!req.body.title, !req.body.description, !)

  await productManager.crearProducto(product);
  res.status(200).send();
});

router.put("/:pid", async (req, res) => {
  if (req.body.id) {
    return res.status(400).send("No deberias enviar un ID");
  }

  await productManager.actualizarProducto(
    parseInt(req.params.pid, 10),
    req.body
  );
  res.status(200).send();
});

router.delete("/:pid", async (req, res) => {
  await productManager.eliminarProducto(parseInt(req.params.pid, 10));
  res.status(200).send();
});

export default router;
