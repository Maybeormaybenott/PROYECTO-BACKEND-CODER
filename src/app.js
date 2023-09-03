import express from "express";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import cartRouter from "./routes/cartRouter.js";
import productsRouter from "./routes/productsRouter.js";
import viewsRouter from "./routes/viewsRouter.js";

const app = express();
const httpServer = app.listen(8080, () => console.log("ON"));
const socketServer = new Server(httpServer);

app.engine("handlebars", handlebars.engine());
app.set("views", "./src/views");
app.set("view engine", "handlebars");
app.use(express.static("./src/public"));

app.use((req, res, next) => {
  req.context = { socketServer };
  next();
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", viewsRouter);
app.use("/api/products", productsRouter);
app.use("/api/carts/", cartRouter);
