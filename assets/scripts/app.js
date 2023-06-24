class Product {
    title = 'DEFAULT';
    imageUrl;
    description;
    price;

    constructor(title, image, desc, price) { // accepts parameters and assigns to class fields
        this.title = title; // this refers to the oject being created. initializes objects values
        this.imageUrl = image;
        this.description = desc;
        this.price = price
    }
}


const productList = {
    products: [
        new Product( //calls constructor and returns new object instance of Product Class
            'A Pillow',
            'http://tiny.cc/en48vz',
            'The Pillow Of Manifestation',
            19.99
        ), 
        new Product(
            'A Rug',
            'http://tiny.cc/co48vz',
            'Like Walking On A Cloud',
            89.99
        )
    ],
    render() {
        const renderHook = document.getElementById('app'); // app Hppk
        const prodList = document.createElement('ul'); // ul to append to app Hook
        prodList.className = 'product-list';
        for (const prod of this.products) { //iterates through products array and stors objects to prod
            const prodEl = document.createElement('li');
            prodEl.className = 'product-item';
            prodEl.innerHTML = `
                <div>
                    <img src='${prod.imageUrl}' alt='${prod.title}'>
                    <div class='product-item__content'>
                        <h2>${prod.title}</h2>
                        <h3>\$${prod.price}</h3>
                        <p>${prod.description}</p>
                        <button>Add To Cart</button>
                    </div>
                </div>
            `;
            prodList.append(prodEl); // appends li to ul
        }
        renderHook.append(prodList); // appends ul to app Hook 
    }
};

productList.render() // calls method for rendering the products to web page