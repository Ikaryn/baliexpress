import { Button, ClickAwayListener, Grow, Paper, Popper } from '@material-ui/core';
import React from 'react';


const ProductMenuButton = () => {
    const [open, setOpen] = React.useState(false);

    const handleToggle = () => {
        open ? setOpen(false) : setOpen(true);
    
    }
    // const [categories, setCategories] = React.useState(['','','']);
    const categories = ['CPU', 'Motherboards', 'Storage'];

    React.useEffect(() => {
        
    
    },[])

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