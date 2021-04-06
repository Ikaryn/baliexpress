import React from 'react';
import API from '../util/API';
import SearchIcon from '@material-ui/icons/Search';
import SmallProductView from './SmallProductView';
import { Button, ClickAwayListener, Grow, MenuItem, MenuList, Paper, Popper, Grid, InputBase, Typography } from '@material-ui/core';
import { useHistory } from 'react-router';
import './styles/search.css';
const api = new API();
const SearchBar = ({}) => {
    const [search, setSearch] = React.useState("");
    const [productOutput, setProductOutput] = React.useState([]);

    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    const history = useHistory();
    
    const handleToggle = (str) => {
        setOpen(str != "")
        setSearch(str);
    }

    function searchMore(){
        var searchStringTransform = search != "" ? search.split(" ").join("+") : "";
        history.push(`/search/${searchStringTransform}`);
    }

    React.useEffect(() => {
        (async () => {
            if(search == ""){
                setProductOutput([]);
                return;
            }
            // const options = {
            //     method: 'GET',
            //     headers: { 
            //         'Content-Type': 'application/json',
            //         'Request-Type': 'quick search',
            //     },
            // }
            var searchStringTransform = search != "" ? search.split(" ").join("+") : "";
            console.log(searchStringTransform);
            const res = await api.get(`search?query=${searchStringTransform}&quickSearch=${true}`);
            setProductOutput(res.results);
            console.log(res.results);
        })();
    },[search])
    return(
        <div>
            <Grid container item direction="row" justify="space-between" alignItems="center">
                <Grid item>
                    <InputBase ref={anchorRef} placeholder="Search products..." 
                        onClick={() => {setOpen(true)}} 
                        onChange={(event) => {handleToggle(event.target.value)}}
                    />
                </Grid>
                <Grid item>
                    <SearchIcon/>
                </Grid>
            </Grid>
            <div>
                <Popper className="search-popper" open={open} anchorEl={anchorRef.current} transition disablePortal>
                    {({TransitionProps}) => (
                        <Grow
                        {...TransitionProps}
                        style={{transformOrigin: 'center top', getContentAnchorEl: 'null'}}
                        >
                            <Paper>
                                <ClickAwayListener onClickAway={() => setOpen(false)}>
                                    <MenuList autoFocusItem={false}>
                                        {productOutput.map((x) => (
                                            <SmallProductView 
                                                pid = {x.id}
                                                name = {x.name}
                                                price = {x.price}
                                                image = {x.image}
                                                category = {x.category}
                                            />
                                        ))}
                                        {productOutput.length == 0 &&
                                            <Typography className="search-button">
                                                {search == "" ? "Please enter your search query." : "Product not found."}
                                            </Typography>
                                        }
                                        {productOutput.length >= 5 && 
                                            <div className="search-button">
                                                <Button onClick={() => {searchMore()}}>
                                                    See more products...
                                                </Button>
                                            </div>
                                        }
                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
            </div>
        </div>
    )
}

export default SearchBar;