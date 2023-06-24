class Product { //template for building instance objects of Product class
    // title = 'DEFAULT';
    // imageUrl;
    // description;
    // price;

    constructor(title, image, desc, price) { // accepts parameters, assigns to class fields, returns object
        this.title = title; // this refers to the oject being created. initializes objects values
        this.imageUrl = image; //defines properties for class
        this.description = desc;
        this.price = price
    }
}

class ProductItem {
    constructor(product) { // parameter to recieves ProductList instance objects
        this.product = product; //adds new product property to store ProductList instances
    }

    render() {
        const prodEl = document.createElement('li');
        prodEl.className = 'product-item';
        prodEl.innerHTML = `
            <div>
                <img src='${this.product.imageUrl}' alt='${this.product.title}'>
                <div class='product-item__content'>
                    <h2>${this.product.title}</h2>
                    <h3>\$${this.product.price}</h3>
                    <p>${this.product.description}</p>
                    <button>Add To Cart</button>
                </div>
            </div>
        `;
        return prodEl;
    }
}

class ProductList{
    products = [ //default array property for future objects
        new Product(//calls constructor passes parameters and receives a new object instance of Product Class
            'A Pillow',
            'http://tiny.cc/en48vz',
            'The Pillow Of Manifestation',
            19.99
        ), 
        new Product(//calls constructor passes parameters and receives a new object instance of Product Class
            'A Rug',
            'http://tiny.cc/co48vz',
            'Like Walking On A Cloud',
            89.99
        )
    ];
    // constructor() {};
    render() {
        const renderHook = document.getElementById('app'); // app Hppk
        const prodList = document.createElement('ul'); // ul to append to app Hook
        prodList.className = 'product-list';
        for (const prod of this.products) { //iterates through products array and stors objects to prod
            const productItem = new ProductItem(prod) //calls and passed ProductList Obhects to ProductItem Class. creates new object
            const prodEl = productItem.render() // calls render method in newly created productItem object. Store in prodEl-li
            prodList.append(prodEl); // appends li to ul
        }
        renderHook.append(prodList); // appends ul to app Hook 
    }
}


const productList = new ProductList(); // calls ProductList Class and recievs new instance objscts
productList.render() //calls render method in the new productList intance of ProductList 