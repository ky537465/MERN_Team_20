import React, { useState, useEffect } from 'react';

function UserAccount() {
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState('');

    const handleEditProfile = () => {
        window.location.href = '/edit-profile';
    };

    useEffect(() => {
        const editSucessful = localStorage.getItem('editSuccess');
        if (editSucessful) {
            // Clear the localStorage item once retrieved
            localStorage.removeItem('editSuccess');
            setError('Your changes have been saved Succesfully!');
        }
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const storedUserData = JSON.parse(localStorage.getItem('user_data'));
            if (storedUserData && storedUserData.Username) {
                try {
                    const response = await fetch('http://localhost:5000/api/searchUsers', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ SearchKey: storedUserData.Username}),
                    });

                    if (!response.ok) {
                        throw new Error('Error fetching user data');
                    }

                    const data = await response.json();
                    setUserData(data[0]);
                } catch (error) {
                    setError('Error fetching user data');
                    console.error(error);
                }
            }
        };

        fetchData();
    }, []);

    return (
        <div className="user-account">
            {userData ? (
                <>
                    <h2>Profile</h2>
                    <p>{error ? error : ''}</p>
                    <div className="profile-info">
                        <div className="avatar">{userData.FirstName[0]}{userData.LastName[0]}</div>
                        <div className="name">{userData.FirstName} {userData.LastName}</div>
                        <div className="username">{userData.Username}</div>
                        <div className="phone">{userData.PhoneNumber}</div>
                        <div className="email">{userData.Email}</div>
                    </div>
                    <button onClick={handleEditProfile}>Edit</button>
                </>
            ) : (
                <p>{error ? error : 'Loading...'}</p>
            )}
        </div>
    );
}

export default UserAccount;
