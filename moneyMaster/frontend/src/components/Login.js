import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const doLogin = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Username: username,
                    Password: password,
                }),
            });

            if (!response.ok) {
                console.log('Login not successful');
                const errorData = await response.json();
                throw new Error(errorData.error);
            }

            const data = await response.json();

            console.log('Login successful:', data);
        } catch (error) {
            setError(error.message);
        }

        window.location.href = '/account';
    };

    return (
        <div id="loginDiv">
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
            {error && <p>{error}</p>}
            <p>Not registered? <Link to="/register">Register here</Link></p>
        </div>
    );
};

export default Login;
