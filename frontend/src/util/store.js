import React from 'react';

export const StoreContext = React.createContext(null);

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ children }) => {
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
    const [sales, setSales] = React.useState([]);
    const store = {
        build: [build, setBuild],
        cart: [cart, setCart],
        comparedProduct: [comparedProduct, setComparedProduct],
        sales: [sales, setSales],
    };
    return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>

};