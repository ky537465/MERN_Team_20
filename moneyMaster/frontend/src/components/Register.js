import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';

function Register() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordRequirements, setPasswordRequirements] = useState([]);
    const [error, setError] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);

    const validatePassword = (value) => {
        const requirements = [];
        if (value.length < 8) {
            requirements.push('Password must be at least 8 characters long');
        }
        if (!/[A-Z]/.test(value)) {
            requirements.push('Password must contain at least one uppercase letter');
        }
        if (!/[a-z]/.test(value)) {
            requirements.push('Password must contain at least one lowercase letter');
        }
        if (!/\d/.test(value)) {
            requirements.push('Password must contain at least one number');
        }
        if (!/[@$!%*?&]/.test(value)) {
            requirements.push('Password must contain at least one symbol');
        }
        setPasswordRequirements(requirements);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        validatePassword(e.target.value);
    };

    const handlePasswordBlur = () => {
        setPasswordRequirements([]);
    };

    const doRegister = async (event) => {
        event.preventDefault();

        try {
            // Validate all fields
            if (!firstName || !lastName || !username || !phoneNumber || !email || !password || !confirmPassword) {
                throw new Error('All fields are required');
            }

            // Validate password complexity
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
            if (!passwordRegex.test(password)) {
                throw new Error('Password must meet all requirements');
            }

            // Basic validation for password match
            if (password !== confirmPassword) {
                throw new Error('Passwords do not match');
            }

            // Send registration request
            const response = await fetch('http://localhost:5000/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    FirstName: firstName,
                    LastName: lastName,
                    Username: username,
                    PhoneNumber: phoneNumber,
                    Email: email,
                    Password: password,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message);
            }

            setLoggedIn(true);
            console.log('Registration successful');
        } catch (error) {
            setError(error.message);
        }
    };

    if(loggedIn){
        return <Redirect to="/account" />;
    }

    return (
        <div id="registerDiv">
            <div>
                <span id="inner-title">Register</span><br />
                <input
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                /><br />
                <input
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                /><br />
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                /><br />
                <input
                    type="text"
                    placeholder="Phone Number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                /><br />
                <input
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                /><br />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={handlePasswordChange}
                    onBlur={handlePasswordBlur}
                /><br />
                {passwordRequirements.length > 0 && (
                    <ul>
                        {passwordRequirements.map((requirement, index) => (
                            <li key={index}>{requirement}</li>
                        ))}
                    </ul>
                )}
                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                /><br />
                <button type="submit" onClick={doRegister}>Register</button>
            </div>
            {error && <p>{error}</p>}
            <p>Already have an account? <a onClick={() => {window.location.href="/"}}>Login</a></p>
        </div>
    );
};

export default Register;