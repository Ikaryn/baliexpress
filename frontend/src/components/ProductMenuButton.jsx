import { Button, ClickAwayListener, Grow, MenuItem, Paper, Popper } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router';


const ProductMenuButton = () => {
    const [open, setOpen] = React.useState(false);
    const history = useHistory();
    const handleToggle = () => {
        open ? setOpen(false) : setOpen(true);
    
    }
    // const [categories, setCategories] = React.useState(['','','']);
    const categories = ['CPU', 'Motherboards', 'Storage'];

    const handleMenuButtonclick = (category) => {
        history.push(`product/${category}`);
    }

    return (
        <div>
            <Button>Product Categories</Button>
            <Popper open={open} transition>
                {({TransitionProps}) => (
                    <Grow
                    {...TransitionProps}
                    style={{transformOrigin: 'center top'}}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={handleToggle}>
                                <menuList autoFocusItem={open}>
                                    {categories.map((c) => (
                                        <MenuItem onClick={() => handleMenuButtonclick(c)}>{c}</MenuItem>
                                    ))}
                                </menuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </div>
    )
}

export default ProductMenuButton;