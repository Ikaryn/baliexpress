import { Paper, Typography, Grid, TextField, Divider, MenuItem } from '@material-ui/core';
import React from 'react';
import { useParams } from 'react-router';
import ProductCard from '../components/ProductCard';
import Checkbox from '@material-ui/core/Checkbox';
import API from '../util/API';
import { StoreContext } from '../util/store';
import filterProducts from '../components/FilterProducts'

const api = new API();

const sortTypes = [ 'Popularity', 
                    'Price-High', 
                    'Price-Low', 
                    'Newest', 
                    'Product Name: A-Z',
                    'Product Name: Z-A',
                    '% Sale'];

const ProductListPage = () => {
    const context = React.useContext(StoreContext);
    const { sales: [sales] } = context;
    const [products, setProducts] = React.useState([]);
    const [filteredProducts, setFilteredProducts] = React.useState([]);
    const [nameFilter, setNameFilter] = React.useState("");
    const [sortType, setSortType] = React.useState(sortTypes[0]);
    const [brandSet, setBrandSet] = React.useState([]);
    const [checkBoxState, setCheckBoxState] = React.useState({});
    let {category} = useParams();
    
    React.useEffect(() => {
        (async () => {
            let products = [];
            // set the products determined by if viewing sale products or just normal products
            if(!category) {
                // loop through each sale 
                sales.forEach((sale) => {
                    sale.productList.forEach((product) => {
                        products.push(product);
                    })
                })
            } else {
                const p = await api.get(`product?category=${category}`);
                console.log(p);
                if (p.products) {
                    products = p.products;
                }
            }

            let set = [];
            let brandDict = {};
            
            for(const i in products){
                if(!set.includes(products[i].brand)){
                    set.push(products[i].brand);
                    brandDict[products[i].brand] = false;
                }
            }
            
            setBrandSet(set);
            setCheckBoxState(brandDict);
            setFilteredProducts(products);
            setProducts(products);
        })();
        
    },[category, sales]);

    React.useEffect(() => {
        (async () => {
            let newProducts = [...products];
            // const x = nameFilter.split(" ");

            // function test(string){
            //     for(let i in x){
            //         if(string.toLowerCase().includes(x[i].toLowerCase())){
            //             return true;
            //         }
            //     }
            //     return false;
            // }

            // if(nameFilter !== ""){
            //     newProducts = [...newProducts].filter(product => test(product.name));
            // }

            switch (sortType) {
                case "Popularity":
                    newProducts.sort((a, b) => a.sold - b.sold);
                    break;
                case "Price-High":
                    newProducts.sort((a, b) => b.price - a.price);
                    break;
                case "Price-Low":
                    newProducts.sort((a, b) => a.price - b.price);
                    break;
                case "Newest":
                    newProducts.sort((a, b) => Date.parse(b.release_date) - Date.parse(a.release_date));
                    break;
                case "Product Name: A-Z":
                    newProducts.sort((a, b) => {
                        let textA = a.name.toUpperCase();
                        let textB = b.name.toUpperCase();
                        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;});
                    break;
                case "Product Name: Z-A":
                    newProducts.sort((a, b) => {
                        let textA = a.name.toUpperCase();
                        let textB = b.name.toUpperCase();
                        return (textA > textB) ? -1 : (textA < textB) ? 1 : 0;});
                    break;
                case "% Sale":
                    newProducts.sort((a, b) => {
                        if (a.sale == null && b.sale != null) return 1;
                        if (a.sale != null && b.sale == null) return -1;
                        if (a.sale == null || b.sale == null) return 0;
                        return (a.sale.salepercent > b.sale.salepercent);
                    });
                    break;
            }

            setFilteredProducts(newProducts);
        })();
    },[sortType, nameFilter, products]);

    // function changeCheckBox(s){
    //     let dict = checkBoxState;
    //     dict[s] = !dict[s];
    //     let string = "";
    //     let first = false;
    //     for(let x in dict){
    //         if(dict[x]){
    //             if(!first){
    //                 string += x;
    //                 first = true;
    //             }else{
    //                 string += " " + x; 
    //             }
    //         }
    //     }
    //     setNameFilter(string);
    //     setCheckBoxState(dict);
    // }

    function handleBrandFilter (brand) {

        // Get the current check box state and change it
        let brands = checkBoxState;
        brands[brand] = !brands[brand];

        // Get the chosen/ticked filters
        let chosen = [];
        Object.keys(brands).forEach(brand => {if(brands[brand]) chosen.push(brand)});

        // Apply the filters and refresh
        let filtered = filterProducts('brand', chosen, products);
        setFilteredProducts(filtered);
        setCheckBoxState(brands);
    }

    function handleStockFilter (field) {
        
    }

    return (
        <div className="root">
            <Grid container direction="row" className='product-list-page-container'>
                <Grid container item direction="column" wrap='nowrap' xs={3}>
                    <div className="product-list-filter-container">
                        <Grid item>
                                <Typography variant="h4">Narrow your search</Typography>
                                <Divider />
                        </Grid>
                        <Grid item>
                            <Typography variant="h5">Brand:
                                {brandSet.map((s) => (
                                    <Typography key={s}>
                                        <Checkbox
                                            onChange={() => {handleBrandFilter(s)}}
                                        />
                                        {s}
                                    </Typography>
                                ))}
                            </Typography>
                        </Grid>
                    </div>
                </Grid>
                <Grid container item direction="column"  xs={9}>
                    <Grid container item>
                        <Paper className="product-list-sort-tab">
                            <Grid container item direction="row">
                                <Grid item>
                                    <Typography variant="h6">Sort by:</Typography>
                                </Grid>
                                <Grid item>
                                    <TextField 
                                        select
                                        value={sortType} 
                                        onChange={(event) =>{setSortType(event.target.value)}}
                                    >
                                        {sortTypes.map((s) => (
                                            <MenuItem key={s} value={s}>
                                                {s}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid container item direction="row" spacing={3} xs>
                        {filteredProducts.map((p) => (
                            <Grid container item xs={3} style={{display: 'flex'}} key={p.name + p.id}>
                                <ProductCard 
                                    pid={p.id}
                                    name={p.name}
                                    price={p.price}
                                    image={p.image}
                                    category={p.category}
                                    sale={p.sale}
                                    />
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </div>
            
    )

}

export default ProductListPage;