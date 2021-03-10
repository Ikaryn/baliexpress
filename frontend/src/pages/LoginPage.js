import React from 'react';
import API from '../../../../../comp6080/ass3/frontend/src/utils/api';

const Login = () => {
    
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    

    async function fetchLogin() {
        const response = await API.get('login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password,
            })
        });
        console.log(response);
        
    }

    return (
        <div>
            <h1>Login Placeholder</h1>
            <form>
                <label for="username">Username:</label>
                <input type="text" id="username" onChange={event => setUsername(event.target.value)}></input>
                <label for="password">Password:</label>
                <input type="password" id="password" onChange={event => setPassword(event.target.value)}></input>
                <button onClick={() => {fetchLogin();} }>Submit</button>
            </form>
        </div>
        
    )

}

export default Login;