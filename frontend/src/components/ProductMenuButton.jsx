import { Button, ClickAwayListener, Grow, MenuItem, MenuList, Paper, Popper } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router';
import { convertCategoryName } from '../util/helpers';

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
'Wifi Adapters',
];

const ProductMenuButton = () => {
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    const history = useHistory();

    const handleToggle = () => {
        open ? setOpen(false) : setOpen(true);
    }

    const handleMenuButtonclick = (category) => {
        handleToggle()
        history.push(`/product/${convertCategoryName(category)}`);
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
                                        <MenuItem key={c} onClick={() => handleMenuButtonclick(c)}>{c}</MenuItem>
                                    ))}
                                    <MenuItem color="secondary" onClick={() => history.push('/sales')}>On Sale</MenuItem>
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