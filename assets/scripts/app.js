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

class ShoppingCart { //template for product Cart
    items = []; 

    render() {
       const cartEl = document.createElement('section') 
       cartEl.innerHTML = `
            <h2>Total: \$${0}</h2>
            <button>Order Now!</button>
       `;
       cartEl.className = 'cart'
       return cartEl;
    }   
}

class ProductItem {
    constructor(product) { // parameter to recieves ProductList instance objects
        this.product = product; //adds new product property to store ProductList instances
    }

    addToCart() {
        console.log('Adding product to cart...');
        console.log(this.product)
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
        const addCartButton = prodEl.querySelector('button'); // selects button from instance
        addCartButton.addEventListener('click', this.addToCart.bind(this)) //bind(this) is added to tie button to instance
        return prodEl; //returns prodEl to prodItem render call below
    }
}

class ProductList{
    products = [ //default array property for storing future objects
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
        
        const prodList = document.createElement('ul'); // ul to append to app Hook
        prodList.className = 'product-list';
        for (const prod of this.products) { //iterates through products array and stors objects to prod
            const productItem = new ProductItem(prod)//calls and passes ProductList Objects to ProductItem Class to create new object
            const prodEl = productItem.render() // calls render method in newly created productItem object. Store in prodEl-li
            prodList.append(prodEl); // appends li to ul
        }
        return prodList
    }
}

class Shop {
    render() {
        const renderHook = document.getElementById('app'); // app Hook where code will be rendered 
        const cart = new ShoppingCart(); //calls shopping cart and recievs new instance
        const cartEl = cart.render()//calls render method in the new cart instance of ShoppingCart
        const productList = new ProductList(); // calls ProductList Class and recievs new instance objscts
        const prodListEl = productList.render() //calls render method in the new productList intance of ProductList 

        renderHook.append(cartEl)//appends cart to app Hok
        renderHook.append(prodListEl); // appends ul to app Hook 
    }
}

const shop = new Shop()
shop.render()