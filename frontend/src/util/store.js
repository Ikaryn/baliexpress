import React from 'react';


export const StoreContext = React.createContext(null);

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ children }) => {
    
    
    const [build, setBuild] = React.useState({
        'id': 0,
        'name': 'Your Custom Built PC',
        'desc': '',
        'parts': {
                    'Cases': '', 
                    'Motherboards':'', 
                    'CPU':'',
                    'Graphics_Cards':'', 
                    'Memory': '',
                    'Storage': '',
                    'PSU': '', 
                    'CPU_Cooling':'',
                },
        'price': 0,
        });
        
    const [cart, setCart] = React.useState([]);
    const [comparedProduct, setComparedProduct] = React.useState({});
    const [userType, setUserType] = React.useState('guest');
    const [count, setCount] = React.useState(0);
    const [sales, setSales] = React.useState([]);
    const store = {
        build: [build, setBuild],
        cart: [cart, setCart],
        comparedProduct: [comparedProduct, setComparedProduct],
        userType: [userType, setUserType],
        sales: [sales, setSales],
        count: [count, setCount],
    };
    return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>

};