import React, { useState } from 'react';

function ForgotPw() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    // regular expression to validate email format
    const isValidEmailFormat = (email) => {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(email);
    };

    // handles email submission
    const submitText = async () => {
        if (isValidEmailFormat(email)) {
            try {
                const responses = await fetch('http://localhost:5000/api/searchUsers', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ SearchKey: email }),
                });

                const users = await responses.json();
                
                // check if any user matches the email
                if (users.length > 0) {
                    // TODO: implement the process to send a verification code
                    console.log("in users.length > 0 ")
                    setMessage('Verification code has been sent to your email.');
                } else {
                    // no user found with email
                    console.log("in else");

                    setMessage('No account found with that email. Please try again.');
                }
            } catch (error) {
                console.log("in error");
                setMessage('An error occurred. Please try again later.');
            }
            // reset input
            setEmail('');


        } else {
            // invalid email message
            setMessage('Invalid email format. Please enter a valid email address.');
        }
    };

    return (
        <div id="forgotPwDiv">
            <p>Enter your email, and we'll send you a verification code you can use to get back in your account.</p>
            <p>
                <input
                    type="text"
                    id="verificationCode"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                ></input>
            </p>
            <button onClick={submitText}>Submit</button>
            {message && <p>{message}</p>}
            <p>Don't have an account? <button onClick={() => {window.location.href="/register"}}>Register</button></p>
        </div>
    );
}

export default ForgotPw;
