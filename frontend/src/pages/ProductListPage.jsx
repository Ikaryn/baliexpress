import React from 'react';
import API from '../util/API';

const api = new API();

const ProductListPage = () => {
    
    const [products, setProducts] = React.useState([]);
    
    React.useEffect(() => {
        (async () => {
            const products = await api.get(`product/${category}`);
            if (products.products) {
                setProducts(products.products);
            }
        
        })();
    
    
    },[])
    
    // return (
        
    // )

}

export default ProductListPage;