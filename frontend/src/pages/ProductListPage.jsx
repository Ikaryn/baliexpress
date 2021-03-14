import React from 'react';
import { useParams } from 'react-router';
import API from '../util/API';

const api = new API();

const ProductListPage = () => {
    
    const [products, setProducts] = React.useState([]);
    
    let {category} = useParams();
    console.log(category);
    React.useEffect(() => {
        (async () => {
            const products = await api.get(`product/${category}`,{category: category});
            if (products.products) {
                setProducts(products.products);
            }
        
        })();
    
    
    },[])
    
    // return (
        
    // )

}

export default ProductListPage;