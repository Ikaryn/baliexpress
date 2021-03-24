import { Button, Grid, InputBase, Typography } from '@material-ui/core';
import React from 'react';
import API from '../util/API';
import SearchIcon from '@material-ui/icons/Search';
const api = new API();
const SearchBar = ({}) => {
    const [search, setSearch] = React.useState("");
    const [productOutput, setProductOutput] = React.useState([]);
    React.useEffect(() => {
        (async () => {
            const options = {
                method: 'GET',
                headers: { 
                    'Content-Type': 'application/json',
                    'Request-Type': 'quick search',
                },
            }
            const userId = localStorage.getItem('userId');
            const res = await api.makeAPIRequest(`search/${userId}?query=${search}`, options);
            console.log(res)
        })();
    },[search])
    /*
    React.useEffect(() => {
        (async () => {
            const options = {
                method: 'GET',
                headers: { 
                    'Content-Type': 'application/json',
                    'Request-Type': 'all users',
                },
            }
            const userId = localStorage.getItem('userId');
            const res = await api.makeAPIRequest(`profile/${userId}?userId=${userId}`, options);
            console.log(res)
            setUsers(res.users);
        })();
    },[])
    */
    return(
        <div>
            <Grid container item direction="row" justify="space-between" alignItems="center">
                <Grid item>
                    <InputBase placeholder="Search products..." onChange={(event) => {setSearch(event.target.value)}}/>
                </Grid>
                <Grid item>
                    <SearchIcon/>
                </Grid>
            </Grid>
            {search}

        </div>
    )
}

export default SearchBar;