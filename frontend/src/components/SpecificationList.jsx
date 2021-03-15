import react from 'react';
import { Grid, Typography, Divider } from '@material-ui/core';

const SpecificationList = ({specs}) => {
    return (
        <Grid container direction="column">
            {Object.keys(specs).map((key) => (
                <Grid container item direction="row" justify="space-between">
                    <Grid item>
                        <Typography>{key + ':'}</Typography>
                    </Grid>
                    <Grid item>
                        <Typography>{specs[key]}</Typography>
                    </Grid>
                    <Divider />
                </Grid>
            ))}
        </Grid>
    )
}

export default SpecificationList;