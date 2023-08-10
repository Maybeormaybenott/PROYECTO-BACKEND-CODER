class ProductManager {
    
    constructor(){
        this.products = [];
        this.nextProductId = 1;
    }

    addProduct(title, description, price, thumbnail, code, stock){

        if (!title || !description || !price || !thumbnail || !code || stock === undefined) {
            console.log("Todos los campos son obligatorios");
            return;
        }

        if (this.products.some(product => product.code === code)) {
            console.log("Ya existe un producto con el mismo código");
            return;
        }

        const product = {
            id: this.nextProductId++,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        };
        this.products.push(product);
    }


    getProductById(id) {
        const product = this.products.find((product) => product.id === id);
        if (product) {
            return product;
        } else {
            console.log("Not found"); 
        }
    }

    getProducts() {
        return this.products;
    }

  
}

//  Not Found ( no hay objeto creado )

const productManager = new ProductManager();

const productById = productManager.getProductById(1);
console.log("Por ID:", productById);

// Found ( hay objeto creado )

productManager.addProduct ("Coco y vainilla", "Difusor aromatizante, excelente calidad", 24, "cocoyvainilla.jpg", "A-1", 15);
console.log(productManager.getProducts());