import React from 'react';
import API from '../util/API.js';
import {
    useHistory,
  } from 'react-router-dom';
import NewProductFeature from '../components/featuredProductComponents/NewProductFeature';
import { Button, CardActionArea, Grid, makeStyles, Modal,
        Paper, Table, TableBody, TableCell, TableContainer,
        TableRow, Typography }
        from '@material-ui/core';
import BuildPcImage from '../assets/BuildPcImage.png';
import MinorFeaturedProductCards from '../components/featuredProductComponents/MinorFeaturedProductCards';
import BuildModalForm from '../components/buildPageComponents/BuildModalForm';
import LoadingComponent from '../components/LoadingComponent';
import { StoreContext } from '../util/store';
import Carousel from 'react-material-ui-carousel';
import BaliexpressBanner from '../assets/BaliexpressBanner.png'
import { convertCategoryName } from '../util/helpers.js';

const api = new API();

const useStyles = makeStyles(() => ({
    menuContainer: {
        backgroundColor: 'rgb(66,66,66)',
        margin: '0 0.5em',
    },
    upperContentContainer: {
        width: '80%',
    },
    majorFeatureContainer: {
        width: '100%',
        height: 'auto'
    },
    minorProductTable: {
        width: '100%',
        marginBottom: '5em',
    },
    minorProductTableCard: {
        width: '30%',
        height: '20%',
    },
    contentHeaders: {
        margin: '0 0.5em',
    },
    aboutUsContainer: {
        padding: '0.5em',
    }
}));

const categories = [
    'CPU',
    'Motherboards',
    'Storage',
    'Power Supplies',
    'CPU Cooling',
    'PC Cooling',
    'Memory',
    'Graphics Cards',
    'Cases',
    'Monitors',
    'Mouses',
    'Keyboards',
    'Wifi Adapters'
];



const HomePage = () => {
    const history = useHistory();
    const classes = useStyles();
    const context = React.useContext(StoreContext);

    const [products, setProducts] = React.useState(null);
    const [buildOpen, setBuildOpen] = React.useState(false);
    const { sales: [sales, setSales] } = context;

    // get featured products
    React.useEffect(() => {
        (async () => {
            const response = await api.get('featured');
            setProducts(response);
        })();
    },[])

    // get sales
    React.useEffect(() => {
        api.get('sales?all=false')
        .then((data) => {
            setSales(data.sales);
        })
    },[setSales])

    // if there are no sales currently, this should just be the banner.
    const generateAdvertisements = () => {
        const ads = [<img src={BaliexpressBanner} alt="baliexpress-banner"/>];
        sales.forEach((sale, index) => {
            ads.push(
                <CardActionArea key={'sale-'+index} onClick={() => {history.push(`/sales`)}}>
                    <img src={"data:image/jpeg;base64,"+sale.image} alt={sale.name} />
                </CardActionArea>
            )
        })

        return ads;
    }

    return (
        <Grid container direction="column" alignItems="center" justify="center">
            <Grid container item className={classes.upperContentContainer} justify="center">
                {sales.length === 0 ?
                    <Grid item>
                        <img src={BaliexpressBanner} alt="baliexpress-banner"/>
                    </Grid>
                :
                <Grid item>
                    <Carousel
                        autoPlay={true}
                        interval={4000}
                        indicatorContainerProps={{style: {position: 'absolute', bottom: '0.5em'}}}
                    >
                        {generateAdvertisements()}
                    </Carousel>
                </Grid>
                }
            </Grid>
            <Grid container item direction="row"  justify="center" className={classes.upperContentContainer}>
                <Paper className={classes.menuContainer}>
                    <Grid container item direction="column" xs={1}>
                            {categories.map((category) => (
                                <Button size="medium" key={`${category} button`} onClick={()=> {history.push(`/product/${convertCategoryName(category)}`)}}>{category}</Button>
                            ))}
                            <Button size="medium" color="secondary" onClick={() => {history.push(`/sales`)}}>On Sale</Button>
                    </Grid>
                </Paper>
                <Grid item xs={6} className={classes.contentHeaders}>
                    {products ? <NewProductFeature feature={products['major_features']}/> : <LoadingComponent/>}
                </Grid>
                <Grid item xs={3} className={classes.contentHeaders}>
                    <CardActionArea onClick={() => {setBuildOpen(true)}}>
                        <img className={classes.majorFeatureContainer} src={BuildPcImage} alt="buildPCLink"/>
                    </CardActionArea>
                    <Paper className={classes.aboutUsContainer}>
                        <Typography>About us. We are an Australian based E-Commerse website that specialises in Computer Parts and accessories. Please don't hesitate to reach out to us if you have any questions or need any help!</Typography>
                    </Paper>
                </Grid>
            </Grid>
            <Grid item>
                <Typography className="light-text" variant="h3">Recommended Items</Typography>
            </Grid>
            <TableContainer className={classes.minorProductTable}>
                <Table>
                    <TableBody>
                        <TableRow className={classes.minorProductTableCard}>
                            {products ? products['minor_features'].map((product) => (
                                <TableCell key={product.name}>
                                    <MinorFeaturedProductCards productInfo={product} />
                                </TableCell>
                            )) : <LoadingComponent />}
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <Modal
                open={buildOpen}
                onClose={() => {setBuildOpen(false)}}
            >
                <BuildModalForm handleToggle={setBuildOpen} setOpen={setBuildOpen}/>
            </Modal>
        </Grid>
        )
};

export default HomePage;