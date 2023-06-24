class Product {
    title = 'DEFAULT';
    imageUrl;
    description;
    price;
}

console.log(new Product())

const productList = {
    products: [
        // new Product() // cals constructor and returns new product object
        {
            title: 'A Pillow',
            imageUrl: 'http://tiny.cc/en48vz',
            price: 19.99,
            description: 'The Pillow Of Manifestation'
        },
        {
            title: 'A Rug',
            imageUrl: 'http://tiny.cc/co48vz',
            price: 89.99,
            description: 'Like Walking On A Cloud'
        }
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