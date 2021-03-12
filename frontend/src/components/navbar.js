import React from 'react';
import './styles/navbar.css';
import '../App.css';
import { AppBar, Button, Grid, InputBase, Paper, Typography } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

const NavBar = () => {

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
                            <AccountCircleIcon class="icon-button" fontSize="large"/>
                        </Grid>
                        <Grid item xs={1}>
                            <ShoppingCartIcon class="icon-button" fontSize="large" />
                            <Typography>(0)</Typography>
                        </Grid>
                </Grid>
            </AppBar>
        </header>
    )
}

export default NavBar;