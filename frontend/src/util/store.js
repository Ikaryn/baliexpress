import React from 'react';

export const StoreContext = React.createContext(null);

// eslint-disable-next-line import/no-anonymous-default-export
export default ({children}) => {
    
    const [userId, setUserId] = React.useState(0);
    
    
    const store = {
        userId : [userId, setUserId]
    }
    
    return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
}