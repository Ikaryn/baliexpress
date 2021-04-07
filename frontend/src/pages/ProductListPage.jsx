import { Paper, Typography, Grid, TextField, Divider, MenuItem } from '@material-ui/core';
import React from 'react';
import { useParams } from 'react-router';
import ProductCard from '../components/ProductCard';
import Checkbox from '@material-ui/core/Checkbox';
import API from '../util/API';

const api = new API();

const sortTypes = ['Popularity', 'Price-High', 'Price-Low'];

const ProductListPage = () => {
    
    const [products, setProducts] = React.useState([]);
    const [filteredProducts, setFilteredProducts] = React.useState([]);
    const [nameFilter, setNameFilter] = React.useState("");
    const [sortType, setSortType] = React.useState(sortTypes[0]);
    const [brandSet, setBrandSet] = React.useState([]);
    const [checkBoxState, setCheckBoxState] = React.useState({});
    let {category} = useParams();
    React.useEffect(() => {
        (async () => {
            const p = await api.get(`product?category=${category}`);
            if (p.products) {
                setProducts(p.products);
                setFilteredProducts(p.products);
            }
            var set = [];
            var dict = {};
            for(const i in p.products){
                console.log(p.products[i].brand);
                if(!set.includes(p.products[i].brand)){
                    set.push(p.products[i].brand);
                    dict[p.products[i].brand] = false;
                }
            }
            console.log(set);
            setBrandSet(set);
            setCheckBoxState(dict);
            console.log(dict);
        })();
    },[category]);

    React.useEffect(() => {
        (async () => {
            var newProducts = [...products];
            const x = nameFilter.split(" ");

            function test(string){
                for(var i in x){
                    if(string.toLowerCase().includes(x[i].toLowerCase())){
                        return true;
                    }
                }
                return false;
            }
            if(nameFilter !== ""){
                newProducts = [...newProducts].filter(product => test(product.name));
            }

            if(sortType === "Popularity"){
                newProducts.sort((a, b) => a.stock - b.stock);
            }else if(sortType === "Price-High"){
                newProducts.sort((a, b) => b.price - a.price);
            }else if(sortType === "Price-Low"){
                newProducts.sort((a, b) => a.price - b.price);
            }

            setFilteredProducts(newProducts);
        })();
    },[sortType, nameFilter]);

    function changeCheckBox(s){
        var dict = checkBoxState;
        dict[s] = !dict[s];
        var string = "";
        var first = false;
        for(var x in dict){
            if(dict[x]){
                if(!first){
                    string += x;
                    first = true;
                }else{
                    string += " " + x; 
                }
            }
        }
        setNameFilter(string);
        setCheckBoxState(dict);
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
                                    <Typography>
                                        <Checkbox
                                            onChange={() => {changeCheckBox(s)}}
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
                    <Grid container item direction="row" spacing={3}>
                        {filteredProducts.map((p) => (
                            <Grid item xs={3}>
                                <ProductCard 
                                    pid={p.id}
                                    name={p.name}
                                    price={p.price}
                                    image={p.image}
                                    category={p.category}
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