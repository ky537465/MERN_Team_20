import React, { useState, useEffect } from 'react';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        const registrationSuccess = localStorage.getItem('registrationSuccess');
        if (registrationSuccess) {
            // Clear the localStorage item once retrieved
            localStorage.removeItem('registrationSuccess');
            setError('Registration Successful! You can now login.');
        }
    }, []);

    const doLogin = async (event) => {
        event.preventDefault();

        try {
            const lowerCaseUsername = username.toLowerCase();
            
            const response = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Username: lowerCaseUsername,
                    Password: password,
                }),
            });

            if (!response.ok) {
                console.log('Login not successful');
                const errorData = await response.json();
                throw new Error(errorData.error);
            }

            const data = await response.json();
            localStorage.setItem('user_data', JSON.stringify(data));

            setLoggedIn(true);

            console.log('Login successful:', data);
        } catch (error) {
            setError(error.message);
        }
    };

    if(loggedIn){
        window.location.href = '/account';
    }

    return (
        <div id="loginDiv">
            {error && <p>{error}</p>}
            <div>
                <span id="inner-title">LOG IN</span><br />
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                /><br />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                /><br />
                <button type="submit" onClick={doLogin}>Login</button>
            </div>
            <p>Not registered? <button onClick={() => {window.location.href="/register"}}>Register</button></p>
        </div>
    );
};

export default Login;
