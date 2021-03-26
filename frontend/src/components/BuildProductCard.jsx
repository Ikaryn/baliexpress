import { Button, Card, Divider, Grid, Modal, Typography } from '@material-ui/core';
import React from 'react';
import InfoIcon from '@material-ui/icons/Info';
import SelectBuildProductModal from './SelectBuildProductModal';

const BuildProductCard = ({type, product}) => {
    
    const [open, setOpen] = React.useState(false);
    
    return (
        <Card>
            <Grid container item direction="row">
                <Grid container item xs={2} direction="column" alignItems="center" alignContent="center">
                    <Grid item>
                        <Typography variant="h5">{type}</Typography>
                    </Grid>
                    <Grid item>
                        <InfoIcon />
                    </Grid>
                </Grid>
                <Grid item xs={1}>
                    <Divider orientation="vertical" />
                </Grid>
                {product === '' ? 
                <Grid item xs={6}>
                    <Button variant="contained" onClick={() => {setOpen(true)}}>Select a Part</Button>
                </Grid>
                :
                ''    
                }
            </Grid>
            <Modal open={open} handleClose={() => {setOpen(false)}}>
                <SelectBuildProductModal category={type} />
            </Modal>
        </Card>
    
    );

}

export default BuildProductCard;