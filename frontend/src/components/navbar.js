import React from 'react';
import './styles/navbar.css';
import '../App.css';
import { AppBar, Button, Grid, IconButton, InputBase, Paper, Typography } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { useHistory } from 'react-router';
import { StoreContext } from '../util/store';
import ProductMenuButton from './ProductMenuButton';

const NavBar = () => {
    
    const context = React.useContext(StoreContext);
    
    const {userId : [userId]} = context;
    
    const history = useHistory();
    
    // handle click of the profile icon
    // if user isnt logged in redirect to login page, otherwise send them to profile page
    const handleProfileClick = () => {
        console.log(userId);
        if(userId === 0){
            history.push('login');
        } else {
            console.log(`user id is ${userId}`);
            history.push(`profile/${userId}`);
        }
    }
    
    
    const test = () => {
    
        history.push('login');
    }
    


    return (
        <header>
            <AppBar color="secondary">
                <Grid
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                >
                        <Grid item xs={1}>
                            {/* <Button>Product categories</Button> */}
                            <ProductMenuButton/>
                        </Grid>
                        <Button onClick={() => test()}>test</Button>
                        <Grid item xs={1}>
                            <Button>Build-A-PC</Button>
                        </Grid>
                        <Grid item xs={4}>
                            <Paper>
                                <InputBase placeholder="Search products..."/>
                                <SearchIcon/>
                            </Paper>
                        </Grid>
                        <Grid item xs={1}>
                            <IconButton>
                                <AccountCircleIcon onClick={() => handleProfileClick} class="icon-button" fontSize="large"/>
                            </IconButton>
                        </Grid>
                        {/* <Grid item xs={1}>
                            <ShoppingCartIcon class="icon-button" fontSize="large" />
                            <Typography>(0)</Typography>
                        </Grid> */}
                </Grid>
            </AppBar>
        </header>
    )
}

export default NavBar;