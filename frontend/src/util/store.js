import React from 'react';

export const StoreContext = React.createContext(null);

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ children }) => {
    const [build, setBuild] = React.useState({
        'Cases': '', 
        'Motherboards':'', 
        'CPU':'',
        'Graphics_Cards':'', 
        'Memory': '',
        'Storage': '',
        'PSU': '', 
        'CPU_Cooling':''
        });
    const store = {
        build: [build, setBuild],
    };
    return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>

};