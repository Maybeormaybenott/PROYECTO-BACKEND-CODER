import express from "express";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import cartRouter from "./routes/cartRouter.js";
import productsRouter from "./routes/productsRouter.js";

const app = express();
const httpServer = app.listen(8080, () => console.log("Sabe"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/products", productsRouter);
app.use("/api/carts/", cartRouter);
