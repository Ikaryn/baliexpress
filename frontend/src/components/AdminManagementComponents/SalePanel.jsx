import { Button, Divider, Typography } from '@material-ui/core';
import React from 'react';
import SaleForm from './SaleForm';
import SaleInformation from './SaleInformation';
import SalesTable from './SalesTable';
import API from '../../util/API';

const api = new API();

const SalePanel = () => {
    const [saleComponent, setSaleComponent] = React.useState('table');
    const [sales, setSales] = React.useState([{}]);
    
    //used to pass in relevant sale data to saleInformation
    const [saleIndex, setSaleIndex] = React.useState(0);

    React.useEffect(() => {
        (async () => {
            const response = await api.get('sales');
            console.log(response);
            setSales(response.sales);
        })();
    },[]);
    
    
    const renderSaleComponent = () => {
        if (saleComponent === 'table') {
            return <SalesTable sales={sales} setSaleComponent={redirectSaleDetails}/>
        } else if (saleComponent === 'form') { 
            return <SaleForm setSaleComponent={setSaleComponent} setSales={setSales}/>
        }
        
        return <SaleInformation saleInfo={sales[saleIndex]}/>
    }
    
    const redirectSaleDetails = (index) => {
        setSaleIndex(index);
        setSaleComponent('details')
    
    }
    
    const handleButtonRedirect = () => {
        if (saleComponent === 'table') {
            setSaleComponent('form');
        } else {
            setSaleComponent('table');    
        }
    }
    
    const generateButtonText = () => {
        if (saleComponent === 'table') {
            return 'Create Sale';
        } else {
            return 'Back';
        }
        
    }
    return (
        <div>
            <Typography variant="h3">Manage Sales</Typography>
            <Button 
                variant="contained" 
                color="primary" 
                onClick={() => {handleButtonRedirect()}}
                >
                {generateButtonText()}
            </Button>
            <Divider />
            {renderSaleComponent()}
        </div>
    )
}

export default SalePanel;