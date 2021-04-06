import React from 'react';
import NavBar from '../components/navbar';
import API from '../util/API.js';
import {
    useHistory,
  } from 'react-router-dom';
import NewProductFeature from '../components/featuredProductComponents/NewProductFeature';
import { Button, CardActionArea, CircularProgress, Grid, makeStyles, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@material-ui/core';
import BuildPcImage from '../assets/BuildPcImage.png';
import MinorFeaturedProductCards from '../components/featuredProductComponents/MinorFeaturedProductCards';
import BuildModalForm from '../components/buildPageComponents/BuildModalForm';
import LoadingComponent from '../components/LoadingComponent';


const api = new API();

const useStyles = makeStyles(() => ({
    menuContainer: {
        backgroundColor: 'rgb(66,66,66)',
        marginLeft: '2em',
        height: '100%',
    },
    majorFeatureContainer: {
        width: '79%',
    },
    minorProductTable: {
        width: '100%',
        marginBottom: '5em',
    },
    minorProductTableCard: {
        width: '30%',
        height: '20%',
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
    'Wifi Adaptors'
];
    
    

const HomePage = () => {
    const history = useHistory();
    const classes = useStyles();
    const [products, setProducts] = React.useState(null);
    const [buildOpen, setBuildOpen] = React.useState(false);

    React.useEffect(() => {
        (async () => {
            const response = await api.get('featured');
            setProducts(response);

        })();
    },[])

    return (
        <Grid container direction="column" alignItems="center">
            <Grid container item direction="row" spacing={1} justify="center">
                <Grid container item direction="column" xs={2} className={classes.menuContainer}>
                    {categories.map((category) => (
                        <Button key={`${category} button`} onClick={()=> {history.push(`/product/${category}`)}}>{category}</Button>
                    ))}
                </Grid>
                <Grid item xs={5}>
                    {products ? <NewProductFeature feature={products['major_features']}/> : <LoadingComponent/>}
                </Grid>
                <Grid item xs={4}>
                    <CardActionArea onClick={() => {setBuildOpen(true)}}>
                        <img className={classes.majorFeatureContainer} src={BuildPcImage} alt="buildPCLink"/>
                    </CardActionArea>
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