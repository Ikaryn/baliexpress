import API from '../../util/API';
import React from 'react';
import { Grid, CircularProgress, makeStyles, Divider, TableSortLabel, List, ListItem, Table, LinearProgress, TableContainer, TableRow, TableHead, TableCell, Button, TableBody, Paper, Typography, unstable_createMuiStrictModeTheme } from '@material-ui/core';
// import LoadingComponent from '../LoadingComponent'

const useStyles = makeStyles(() => ({

    noOrder: {
        'margin-top': '2em'
    },

}))

const OrderTable = ({orders, setOrderSelected, setOrderId}) => {

    const classes = useStyles();
    const [order, setOrder] = React.useState();
    const [orderBy, setOrderBy] = React.useState();
    const [orderList, setOrderList] = React.useState(orders);
    const [sortedOrders, setSortedOrders] = React.useState(null);

    React.useEffect(() => {
        setOrderList(orders);
        setSortedOrders(orders);
    },[orders]);

    const handleSortRequest = (cellId) => {
        const isAsc = orderBy === cellId && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(cellId);

        const sorted = JSON.parse(JSON.stringify(orderList));

        switch (orderBy) {
            case "orderId":
                sorted.sort((a, b) => !isAsc ? a.id - b.id : b.id - a.id);
                break;
            case "orderDate":
                sorted.sort((a, b) => !isAsc ? Date.parse(a.date) - Date.parse(b.date) : Date.parse(b.date) - Date.parse(a.date));
                break;
            case "orderTotal":
                sorted.sort((a, b) => !isAsc ? a.total - b.total : b.total - a.total);
                break;
            default:
                break;
        }

        setSortedOrders(sorted);       
    };

    const headCells = [
        {id:'orderId', numeric: true, label:'Order Number'},
        {id:'orderDate', numeric: false, label:'Order Date'},
        {id:'orderTotal', numeric: true, label:'Total Cost'}
    ];

    return (
        <Grid>
            <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {headCells.map((headCell) => (
                                    <TableCell
                                        key={headCell.id}
                                        sortDirection={orderBy === headCell.id ? order : false}
                                    >
                                        <TableSortLabel
                                            active={orderBy === headCell.id}
                                            direction={orderBy === headCell.id ? order : 'asc'}
                                            onClick={() => handleSortRequest(headCell.id)}
                                        >
                                            {headCell.label}
                                        </TableSortLabel>
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {sortedOrders && sortedOrders.map((order) => (
                                <TableRow hover onClick={(event) => {setOrderSelected(true); setOrderId(order.id)}}>
                                    <TableCell align="left">{order.id}</TableCell>
                                    <TableCell align="left">{order.date}</TableCell>
                                    <TableCell align="left">${order.total}</TableCell>
                                </TableRow> 
                            ))}
                        </TableBody>
                    </Table>
                    {!sortedOrders &&<LinearProgress />}
            </TableContainer>
            {orders && orders.length === 0 && <Typography align="center" className={classes.noOrder}>You have no orders yet</Typography>}
        </Grid>
    )
}

export default OrderTable;