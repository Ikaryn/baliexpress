import { Paper, Typography, Grid, TextField, Divider, MenuItem } from '@material-ui/core';
import React from 'react';
import { useParams } from 'react-router';
import ProductCard from '../components/ProductCard';
import Checkbox from '@material-ui/core/Checkbox';
import API from '../util/API';
import { StoreContext } from '../util/store';
import { filterProducts, categoryFilters } from '../components/FilterProducts'

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
    const [labels, setLabels] = React.useState(null);
    const [sortType, setSortType] = React.useState(sortTypes[0]);
    const [filterBoxes, setFilterBoxes] = React.useState(null);
    let {category, search} = useParams();
    
    React.useEffect(() => {
        (async () => {
            let products = [];
            // set the products determined by if viewing sale products or just normal products
            if(!category) {
                if(search) {
                    console.log('search')
                    const res = await api.get(`search?query=${search}`);
                    console.log(res.results);
                    products = res.results;
                } else {
                    console.log('sale')
                    // loop through each sale 
                    sales.forEach((sale) => {
                        sale.productList.forEach((product) => {
                            products.push(product);
                        })
                    })
                }
            } else {
                const p = await api.get(`product?category=${category}`);
                console.log(p);
                if (p.products) {
                    products = p.products;
                }
            }

            let fieldFilters = categoryFilters(category ? category : 'Sales');

            // Set up the filter boxes
            let filterLabels = {'stock': ['In stock', 'Out of stock'],
                                'price': fieldFilters['price'],
                                };
            
            // Get the specific filters for the category
            let sets = {'brand': []};
            fieldFilters['specs'].forEach(field => sets[field] = []);
            
            // Map from db variables to labels
            let filterNames =   {   
                                'stock': 'Stock',
                                'price': 'Price',
                                'brand': 'Brand'
                                }
        
            for (let i in fieldFilters['specs']) {
                filterNames[fieldFilters['specs'][i]] = fieldFilters['names'][i]
            }

            // For each product, if they have a unique value for the filter, add it to the set
            for(const i in products){
                Object.keys(sets).forEach(field => {
                    if (field === 'brand') {
                        if (!sets['brand'].includes(products[i].brand)) sets['brand'].push(products[i].brand);
                    } else if (field === 'category') {
                        if (!sets['category'].includes(products[i].category)) sets['category'].push(products[i].category);
                    } else if (!sets[field].includes(products[i]['specs'][field])) {
                        sets[field].push(products[i]['specs'][field]);
                    }

                });
            }

            Object.keys(sets).forEach(field => {
                filterLabels[field] = sets[field].sort();
            })

            let filterBoxes = {};
            console.log(filterLabels);

            Object.keys(filterLabels).forEach((filter, label) => {
                let checkBoxes = {};
                filterLabels[filter].forEach(value => checkBoxes[value] = false);
                filterBoxes[filter] = checkBoxes;
            });

            console.log(filterBoxes);
            
            setFilterBoxes(filterBoxes);
            setFilteredProducts(products);
            setProducts(products);
            setLabels(filterNames);
        })();
        
    },[category, sales, search]);

    React.useEffect(() => {
        (async () => {
            let newProducts = [...products];

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
                default:
                    break;
            }

            setFilteredProducts(newProducts);
        })();
    },[sortType, products]);

    function handleFilterChange (filter, value) {

        // Get the current check box state and change it
        let filters = filterBoxes;
        filters[filter][value] = !filters[filter][value];

        // Get the chosen/ticked filters
        let fields = [];
        let queries = [];
        Object.keys(filters).forEach(filter => {
            fields.push(filter);
            let query = []
            Object.keys(filters[filter]).forEach(value => {
                if (filters[filter][value]) query.push(value);
            })
            queries.push(query);
        })

        // Apply the filters and refresh
        let filtered = filterProducts(fields, queries, products);
        setFilteredProducts(filtered);
        setFilterBoxes(filters);
    }
    
    const generateHeader = () => {
        if(category) {
            return "Product category: " + category
        }
        if(search) {
            return "Search results for: "+ search;
        }
        return 'On sale products'
    
    }

    return (
        <div className="root">
            <Grid container direction="row">
                <Grid container item direction="column" wrap='nowrap' xs={3}>
                    <Grid className="product-list-filter-container">
                        <Grid item>
                                <Typography variant="h4">Narrow your search</Typography>
                                <Divider />
                        </Grid>
                        <Grid item container direction="column">
                            {filterBoxes && labels && Object.keys(filterBoxes).map((filter) => 
                                <Grid item>
                                    <Typography variant="h5">{labels[filter]}:</Typography>
                                    {Object.keys(filterBoxes[filter]).map((value) =>
                                        <Typography>
                                            <Checkbox onChange={() => handleFilterChange(filter, value)} />
                                            {value}
                                        </Typography>)
                                    }
                                </Grid>
                            )}
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container item direction="column" xs={8}>
                    <Grid container item>
                        <Paper className="product-list-sort-tab">
                            <Grid container item direction="row" spacing={1} alignItems="center">
                                <Grid container item direction="row" xs={4} spacing={2}>
                                    <Grid item>
                                        <Typography variant="h6">Sort by:</Typography>
                                    </Grid>
                                    <Grid item>
                                        <TextField 
                                            select
                                            value={sortType} 
                                            onChange={(event) =>{setSortType(event.target.value)}}
                                        >
                                            {sortTypes.map((type) => (
                                                <MenuItem key={type} value={type}>
                                                    {type}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>
                                </Grid>
                                    <Grid item>
                                        <Typography variant="h3">{generateHeader()}</Typography>
                                    </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid container item direction="row" spacing={3} alignItems="flex-start" className="parent-product-card">
                        {filteredProducts.map((p) => (
                            <Grid container item xs={3} key={p.name + p.id}>
                                <ProductCard 
                                    pid={p.id}
                                    name={p.name}
                                    price={p.price}
                                    image={p.image}
                                    category={p.category}
                                    sale={p.sale}
                                    stock={p.stock}
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