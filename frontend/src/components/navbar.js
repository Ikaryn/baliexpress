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
import BaliExpress from '../assets/BaliExpress.png';

const NavBar = () => {
    
    
    const history = useHistory();
    
    // handle click of the profile icon
    // if user isnt logged in redirect to login page, otherwise send them to profile page
    const handleProfileClick = () => {
        const userId = localStorage.getItem('userId');
        if(!userId){
            history.push('/login');
        } else {
            console.log(`user id is ${userId}`);
            history.push(`/profile/${userId}`);
        }
    }
    const redirectHomepage = () => {
        history.push('/');
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
                    <img 
                        src={BaliExpress} 
                        alt="logo" 
                        className="navbar-logo"
                        onClick={() => redirectHomepage()}
                    />
                    <Grid item xs={1}>
                        <ProductMenuButton/>
                    </Grid>
                    <Grid item xs={1}>
                        <Button>Build-A-PC</Button>
                    </Grid>
                    <Grid item xs={3}>
                        <Paper>
                            <Grid container item direction="row" justify="space-between" alignItems="center">
                                    <Grid item>
                                        <InputBase placeholder="Search products..."/>
                                    </Grid>
                                    <Grid item>
                                        <SearchIcon/>
                                    </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid item xs={1}>
                        <IconButton>
                            <AccountCircleIcon onClick={() => handleProfileClick()} fontSize="large"/>
                        </IconButton>
                    </Grid>
                    <Grid item xs={1}>
                        <ShoppingCartIcon fontSize="large" />
                        <Typography>(0)</Typography>
                    </Grid>
                </Grid>
            </AppBar>
        </header>
    )
}

export default NavBar;