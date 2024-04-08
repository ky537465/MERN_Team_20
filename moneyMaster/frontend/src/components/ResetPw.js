import React, { useState,useEffect } from 'react';

function ResetPw() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [token, setToken] = useState(null); 
    const [passwordRequirements, setPasswordRequirements] = useState([]);
    const [passwordMatch, setPasswordMatch] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
      const queryParams = new URLSearchParams(window.location.search);
      const urlToken = queryParams.get('token');
      if (urlToken) {
          setToken(urlToken);
      } else {
          setError('Error: Token is missing.');
      }
  }, []);

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
        const newPassword = e.target.value;
        setPassword(newPassword);
        validatePassword(newPassword);
        // Check if passwords match
        setPasswordMatch(newPassword === confirmPassword);
    };

    const handleConfirmPasswordChange = (e) => {
        const newConfirmPassword = e.target.value;
        setConfirmPassword(newConfirmPassword);
        // Check if passwords match
        setPasswordMatch(password === newConfirmPassword);
    };

    const handlePasswordBlur = () => {
        setPasswordRequirements([]);
    };

    const doReset = async (event) => {
        event.preventDefault();

        try {
            setError('');
            
            // Validate all fields
            if (!password || !confirmPassword) {
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
            const response = await fetch('http://localhost:5000/api/updatePassword', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  Token: token,
                  Password: password,
                }),
            });

            if (response.ok) {
              alert('Your password has been reset successfully. Please log in with your new password.');
              localStorage.setItem('passwordResetSuccess', 'true'); 
              window.location.href = '/login';
              
          } else {
              const errorData = await response.json();
              throw new Error(errorData.message);
          }


            console.log('Password has been successfully reset.')
            window.location.href = '/login';
        } catch (error) {
            setError(error.message);
        }
    };


    return (
        <form id="resetPwDiv">
            <div>
                <span id="inner-title">Reset Your Password</span><br />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={handlePasswordChange}
                    onBlur={handlePasswordBlur}
                    required /><br />
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
                    onChange={(e) => handleConfirmPasswordChange(e)}
                    required /><br />
                {!passwordMatch && <p>* Passwords do not match</p>} {/* Display password match indication */}
                <button type="submit" onClick={doReset}>Change Password</button>
            </div>
            {error && <p>{error}</p>}
        </form>
    );
};

export default ResetPw;