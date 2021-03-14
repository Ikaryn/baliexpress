import { Button, ClickAwayListener, Grow, MenuItem, MenuList, Paper, Popper } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router';


const ProductMenuButton = () => {
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    const history = useHistory();
    
    const handleToggle = () => {
        open ? setOpen(false) : setOpen(true);
    }
    const categories = ['CPU', 'Motherboards', 'Storage'];

    const handleMenuButtonclick = (category) => {
        // history.push(`/product/${category}`);
        history.push(`profile/${category}`);
    }

    return (
        <div>
            <Button ref={anchorRef} onClick={() => handleToggle()}>Product Categories</Button>
            <Popper open={open} anchorEl={anchorRef.current} transition disablePortal>
                {({TransitionProps}) => (
                    <Grow
                    {...TransitionProps}
                    style={{transformOrigin: 'center top', getContentAnchorEl: 'null'}}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={handleToggle}>
                                <MenuList autoFocusItem={open}>
                                    {categories.map((c) => (
                                        <MenuItem onClick={() => handleMenuButtonclick(c)}>{c}</MenuItem>
                                    ))}
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </div>
    )
}

export default ProductMenuButton;