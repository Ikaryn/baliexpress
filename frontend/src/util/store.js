import React from 'react';
import API from './API';

export const StoreContext = React.createContext(null);

const api = new API();
// eslint-disable-next-line import/no-anonymous-default-export
export default ({ children }) => {
    
    // React.useEffect(() => {
        
    // },[])
    
    const [build, setBuild] = React.useState({
        'name': 'Your Custom Built PC',
        'desc': '',
        'Cases': '', 
        'Motherboards':'', 
        'CPU':'',
        'Graphics_Cards':'', 
        'Memory': '',
        'Storage': '',
        'PSU': '', 
        'CPU_Cooling':'',
        'price': 0,
        });
    const [cart, setCart] = React.useState([]);
    const [comparedProduct, setComparedProduct] = React.useState({});
    const [userType, setUserType] = React.useState('guest');
    
    const store = {
        build: [build, setBuild],
        cart: [cart, setCart],
        comparedProduct: [comparedProduct, setComparedProduct],
        userType: [userType, setUserType],
    };
    return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>

};