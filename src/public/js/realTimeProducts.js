import ProductManager from "../../ProductManager.js";

const socket = io();

function actualizarLista(productosActualizados) {
  const productList = document.getElementById("product-list");
  productList.innerHTML = "";

  productosActualizados.forEach((producto) => {
    const listItem = document.createElement("li");
    listItem.textContent = producto.title;
    productList.appendChild(listItem);
  });
}

socket.on("actualizarProductos", (productosActualizados) => {
  actualizarLista(productosActualizados);
});

socket.on("productoEliminado", (productId) => {
  ProductManager.eliminarProducto(productId).then(() => {
    socket.emit("actualizarProductos");
  });
});

const productForm = document.getElementById("product-form");
const productTitleInput = document.getElementById("product-title");

productForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const nuevoProducto = {
    title: productTitleInput.value,
  };

  socket.emit("productoAgregado", nuevoProducto);
  productTitleInput.value = "";
});
