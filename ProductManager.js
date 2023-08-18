const { error } = require('console');
const fs = require('fs')
const archivo = './Productos.json';

class ProductManager {
    static id = 0;
    products = [];
    
    
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

        if (!title || !description || !price || !thumbnail || !code || stock === undefined || stock === null) {
            console.log("Todos los campos son obligatorios");
            return;
        }

        if (this.products.some(product => product.code === code)) {
            console.log("Ya existe un producto con el mismo código");
            return;
        };
         
            try {
                if (!fs.existsSync(archivo)){
                const listaVacia = [];
                listaVacia.push(producto);

                await fs.promises.writeFile(
                    archivo,
                    JSON.stringify(listaVacia, null, '\t')
                );
            } else {
                const contenidoObj = await this.consultarProductos();
                contenidoObj.push(producto);
                await fs.promises.writeFile(
                    archivo,
                    JSON.stringify(contenidoObj, null, '\t')
                );
                }
        } catch (error){
            console.log(error);
        }
    }
        
        async consultarProductos() {
            try{
                const contenido = await fs.promises.readFile(archivo, 'utf-8')
                const contenidoObj = JSON.parse(contenido)
                return contenidoObj;
        } catch (error){
            console.log(error);
        }

    }

    async consultarProductosById(id) {
        const productos = await this.consultarProductos();
        const producto = productos.find(producto => producto.id === id);
        if (producto){
            return producto;
        }else{
            console.log("Producto no encontrado")
        }
    }

    async actualizarProducto (id, fieldToUpdate, newValue){
        try {
            const productos = await this.consultarProductos();
            const productoAct = productos.find(producto => producto.id === id);

            if (productoAct){
                productoAct[fieldToUpdate] = newValue;
                await fs.promises.writeFile(archivo, JSON.stringify(productos, null, '\t'));
                console.log(`Producto con ID ${id} actualizado`);
            }else{
                console.log(`Producto con ID ${id} no encontrado`)
            }
            } catch (error) {
                console.log(error);
            }

        }

        async eliminarProducto(id){
            try {
                let productos = await this.consultarProductos();
                productos = productos.filter(producto => producto.id !== id);
                await fs.promises.writeFile(archivo, JSON.stringify(productos, null, '\t'));
                console.log(`Producto con ID ${id} eliminado`);

            }catch (error) {
                console.log(error);
            }
        }
    }

const productManager = new ProductManager();
productManager.crearProducto('Kimcha', 'Rokybalboa', 49, 'Saturno', 37, 10)

const asyncFunction = async () => {
    const productManager = new ProductManager();
    
    await productManager.crearProducto('Kimcha', 'Rokybalboa', 49, 'Saturno', 'thumbnail', 478, 10)
    await productManager.crearProducto('Kimcha', 'Rokybalboa', 49, 'Saturno', 'thumbnail', 478, 10)
    await productManager.crearProducto('Kimcha', 'Rokybalboa', 49, 'Saturno', 'thumbnail', 478, 10)
    await productManager.crearProducto('Kimcha', 'Rokybalboa', 49, 'Saturno', 'thumbnail', 478, 10)
    
    await productManager.actualizarProducto(2,'price', 4000);

    await productManager.eliminarProducto(3);

    const productos = await productManager.consultarProductos();
    console.log(productos)
};

asyncFunction();
