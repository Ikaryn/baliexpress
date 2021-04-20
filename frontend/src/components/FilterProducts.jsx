import { string } from "prop-types"

function filterProducts (field, query, products) {

    let filtered = [];

    switch (field) {
        case 'brand':
            console.log(query.length);
            if ((query.length) === 0) return products;
            filtered = [...products].filter(product => {
                for (let i in query) {
                    if (product.name.toUpperCase().includes(query[i].toUpperCase())) {
                        return true;
                    }
                }
                return false;
            });
            break;
        case 'stock':
            filtered = [...products].filter(product => {
                for (let i in query) {
                    if (query[i] === 'In stock' && product.stock > 0) return true;
                    if (query[i] === 'Out of stock' && product.stock === 0) return true;
                    return false;
                }
            })
    }

    return filtered;

}

export default filterProducts;
