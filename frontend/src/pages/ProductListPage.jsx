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
<<<<<<< HEAD
            const products = await api.get(`product/${category}`,{category: category});
=======
            // const products = await api.get(`product/${category}`,{catergory: category});
>>>>>>> 90a998d318b356072209c2bbfe2c0dc744d28578
            if (products.products) {
                setProducts(products.products);
            }
        
        })();
    
    
    },[])
    
    // return (
        
    // )

}

export default ProductListPage;