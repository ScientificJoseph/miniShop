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

class ElementAttribute { // Used to assign name (id) and value (prod-list) to ul for list items to append to
    constructor(attrName, attrValue) {
        this.name = attrName;
        this.value = attrValue;
    }
}

class Component {
    constructor(renderHookId) { // hook received from super constructord
        this.hookId = renderHookId; // provides created elemts the hookid to append to
    }

    craterRootElement(tag, cssClasses, attributes) { // receives pearameters 
        const rootElement = document.createElement(tag); //creates the elements that hold the content of the web page
        // console.log('rootElement',rootElement)
        // console.log('attributes',attributes)
        if(cssClasses) { 
            rootElement.className = cssClasses; // applies classes if applicable
        }
        if(attributes && attributes.length > 0){
            for (const attr of attributes) {
            //    console.log('attr',attr)
                rootElement.setAttribute(attr.name, attr.value) // sets id 0ttribute for ul that li uses to append to
            }
        }
        document.getElementById(this.hookId).append(rootElement) // newly created elemet elements get appended to the hook elements id
        // console.log('this id',this.hookId)
        return rootElement;
    }
}

class ShoppingCart extends Component { //template for product Cart
    items = []; //receives objects from cartItems 

    set cartItems(value) { // used to set cart new cart total. receives prod from addProduct() below
        this.items = value; //overwrites items array with values from updatedItems below
        console.log(this.items)
        this.totalOutput.innerHTML = `<h2>Total: \$${this.totalAmount.toFixed(2)}</h2>`; //calls totalAmount() to get total amount
    }

    get totalAmount() { //used to calculate the value of the items in the cart
        const sum = this.items.reduce((prevVal, curItem) => { //iterates through array
            return prevVal + curItem.price
        },0);
        return sum;
    }

    constructor(renderHookId) { // Gets called by ShopingCart instantiation. Receives app hook from ShoppingCart instantiation.
        super(renderHookId) // passes app hook to Component constructor.
        console.log('SCS', renderHookId)

    }

    addProduct(product) { // called from App where prod is received from
        const updatedItems = [...this.items]; //copies item array with spread operator
        updatedItems.push(product) // pushes producte to updatedItems
        this.cartItems = updatedItems; //triggers the setter & passes updatedItems to cartItems
    }

    render() {
       const cartEl = this.craterRootElement('section', 'cart')
       cartEl.innerHTML = `
            <h2>Total: \$${0}</h2>
            <button>Order Now!</button>
       `;
       
       this.totalOutput = cartEl.querySelector('h2') //
    }   
}

class ProductItem  extends Component{
    constructor(product, renderHookId) { // parameter to recieves ProductList (prod) instance objects. Receives hook id prod-list on Product item instantiation
        super(renderHookId)// paasses prod-list to Component constuctor
        console.log('PIS', renderHookId) 
        this.product = product; //adds new product property to store ProductList instances
    }

    addToCart() { // called from eventListener click event
        App.addProductToCart(this.product)//calls static addProductToCart() in App where addProduct() is called & receives prod instances 
    }

    render() {
        const prodEl = this.craterRootElement('li', 'product-item'); // passes li and class to constructor
        // console.log('prodEl',prodEl)
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
    }
}

class ProductList extends Component{
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
    constructor(renderHookId) { // receives hook id app Class instantiation
        super(renderHookId) //Passes hook id app to Component Constructor
        console.log('PLS',renderHookId) //app
    };
    render() {
        
        this.craterRootElement('ul', 'product-list',[new ElementAttribute('id', 'prod-list')]); //used to create ul, give it a class and id to append to
        for (const prod of this.products) { //iterates through products array and stors objects to prod
            const productItem = new ProductItem(prod, 'prod-list')//calls & passes products objects (prod) to ProductItem Class to create new objects & recieves id to render to
            productItem.render() // calls render method in newly created productItem object. Store in prodEl-li
            // console.log(productItem)
        }
    }
}

class Shop {
    render() {

        this.cart = new ShoppingCart('app'); //creates instance of ShoppingCart. Passes app hook to super constuctor 
        this.cart.render();//calls render method in the new cart instance of ShoppingCart
        const productList = new ProductList('app'); // calls and creates instance of ProductList and receivs props and methods
        productList.render() //calls render() in the new productList intance of ProductList 
    }
}

class App {
    static cart; //refered to by this.cart below

    static init() {
        const shop = new Shop();//instance of Shop who's props and methods can be shared among all objects created from the same class
        shop.render(); //calls render method in the the new instamce of Shop (shop)
        this.cart = shop.cart //refers to new App object property shop which provides access to addProduct() in ShoppingCart
    }

    static addProductToCart(product) { //static method receives product from call of event listener in ProducItem addToCart()
        this.cart.addProduct(product)//calls addProduct method from this.cart and passes product to addProduct method in ShoppingCart
    }
}

App.init();