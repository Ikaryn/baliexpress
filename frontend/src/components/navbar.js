import React from 'react';
import './styles/navbar.css';
import '../App.css';
import { AppBar, Button, Grid, InputBase, Paper, Typography } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { useHistory } from 'react-router';
import { StoreContext } from '../util/store';

const NavBar = () => {
    
    const context = React.useContext(StoreContext);
    
    const {userId : [userId]} = context;
    
    const history = useHistory();
    
    // handle click of the profile icon
    // if user isnt logged in redirect to login page, otherwise send them to profile page
    const handleProfileClick = () => {
        if(userId === 0){
            history.push('login');
        } else {
            console.log(`user id is ${userId}`);
            history.push(`profile/${userId}`);
        }
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
                            <Button>Product categories</Button>
                        </Grid>
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
                            <AccountCircleIcon onClick={() => handleProfileClick} class="icon-button" fontSize="default"/>
                        </Grid>
                        <Grid item xs={1}>
                            <ShoppingCartIcon class="icon-button" fontSize="default" />
                            <Typography>(0)</Typography>
                        </Grid>
                </Grid>
            </AppBar>
        </header>
    )
}

export default NavBar;