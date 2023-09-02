import { Router } from "express";
import fs from "fs/promises";

const router = Router();
router.post("/", async (req, res) => {
  try {
    const newCartId = Date.now().toString();
    const newCart = {
      id: newCartId,
      products: [],
    };

    await fs.appendFile("carrito.json", JSON.stringify(newCart) + "\n");

    res.status(200).json(newCart);
  } catch (error) {
    console.error("Error al crear el carrito:", error);
    res.status(500).json({ error: "No se pudo crear el carrito" });
  }
});

router.get("/:cid", async (req, res) => {
  const cartId = req.params.cid;
  const cartData = await fs.readFile("carrito.json", "utf-8");
  const carts = cartData.split("\n").filter((line) => line.trim() !== "");
  const cart = carts.find((line) => {
    const parsedCart = JSON.parse(line);
    return parsedCart.id === cartId;
  });

  if (cart) {
    res.json(JSON.parse(cart));
  } else {
    res.status(404).json({ error: "Carrito no encontrado" });
  }
});

router.post("/:cid/product/:pid", async (req, res) => {
  const cartId = req.params.cid;
  const productId = req.params.pid;
  const { quantity } = req.body;

  const cartData = await fs.readFile("carrito.json", "utf-8");
  const carts = cartData.split("\t").filter((line) => line.trim() !== "");
  const cartIndex = carts.findIndex((line) => {
    const parsedCart = JSON.parse(line);
    return parsedCart.id === cartId;
  });

  if (cartIndex === -1) {
    res.status(404).json({ error: "Carrito no encontrado" });
    return;
  }

  const cart = JSON.parse(carts[cartIndex]);

  const existingProduct = cart.products.find((p) => p.product === productId);

  if (existingProduct) {
    existingProduct.quantity += quantity;
  } else {
    cart.products.push({ product: productId, quantity });
  }

  carts[cartIndex] = JSON.stringify(cart);
  await fs.writeFile("carrito.json", carts.join("\t"));

  res.status(200).json(cart);
});

export default router;
