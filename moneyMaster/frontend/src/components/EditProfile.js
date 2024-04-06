import React, { useState, useEffect } from 'react';

function EditProfile() {
    const [userData, setUserData] = useState(null);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        // Fetch user data from localStorage
        const storedUserData = JSON.parse(localStorage.getItem('user_data'));
        if (storedUserData) {
            setUserData(storedUserData);
            setFirstName(storedUserData.FirstName);
            setLastName(storedUserData.LastName);
            // Fetch phone number and email using searchUser API
            fetchUserData(storedUserData.Username);
        }
    }, []);

    const fetchUserData = async (username) => {
        try {
            const response = await fetch('http://localhost:5000/api/searchUsers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    SearchKey: username,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to fetch user data');
            }

            const userData = await response.json();
            if (userData.length > 0) {
                const user = userData[0];
                setPhoneNumber(user.PhoneNumber);
                setEmail(user.Email);
            }
        } catch (error) {
            setError(error.message);
        }
    };

    const handleSave = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/updateUser', {
                method: 'PUT', // Change method to PUT for updating user
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Username: userData.Username, // Add Username field to identify the user
                    FirstName: firstName,
                    LastName: lastName,
                    PhoneNumber: phoneNumber,
                    Email: email,
                }),
            });
    
            if (!response.ok) {
                throw new Error('Failed to update profile');
            }
    
            // Update user data in localStorage
            const updatedUserData = { ...userData, FirstName: firstName, LastName: lastName, PhoneNumber: phoneNumber, Email: email };
            localStorage.setItem('user_data', JSON.stringify(updatedUserData));
    
            localStorage.setItem('editSuccess', 'true');
            window.location.href = '/profile';
        } catch (error) {
            setError(error.message);
        }
    };
    

    const handleCancel = () => {
        window.location.href = '/profile';
    };

    return (
        <div className="edit-profile">
            <h2>Edit Profile</h2>
            {userData && (
                <div className="profile-info">
                    <div className="input-group">
                        <label>First Name:</label>
                        <input
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>
                    <div className="input-group">
                        <label>Last Name:</label>
                        <input
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>
                    <div className="input-group">
                        <label>Phone Number:</label>
                        <input
                            type="text"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                    </div>
                    <div className="input-group">
                        <label>Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <button onClick={handleSave}>Save</button>
                    <button onClick={handleCancel}>Cancel</button>
                    {error && <p className="error">{error}</p>}
                </div>
            )}
        </div>
    );
}

export default EditProfile;
