import { Router } from "express";
import ProductManager from "../ProductManager.js";

const router = Router();
const productManager = new ProductManager("./products.json");

router.get("/", async (req, res) => {
  req.context.socketServer.emit();
  const products = await productManager.consultarProductos();
  res.render("home", { products });
});

router.get("/realtimeproducts", async (req, res) => {
  req.context.socketServer.emit();
  const products = await productManager.consultarProductos();
  res.render("realTimeProducts", { products });
});

export default router;
