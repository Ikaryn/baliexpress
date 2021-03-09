import React from 'react';
import NavBar from '../components/navbar';
import API from '../util/API.js';


const api = new API();

const HomePage = () => {
    const [header, setHeader] = React.useState('HomePage');
    
    React.useEffect(() => {
        (async () => {
            const test = await api.get('', 
            {
                method: 'GET', 
                headers: {'Content-Type' : 'application/json'}
            });
            console.log(test);
            setHeader(test.test);
        })();
    }, []);

    return (
        <div>
            <NavBar />
            <h1>hello</h1>;
        </div>
        )
};

export default HomePage;