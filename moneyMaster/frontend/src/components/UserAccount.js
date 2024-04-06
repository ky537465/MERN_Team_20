import React, { useState, useEffect } from 'react';

function UserAccount() {
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState('');

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
                    <div className="profile-info">
                        <div className="avatar">{userData.FirstName[0]}{userData.LastName[0]}</div>
                        <div className="name">{userData.FirstName} {userData.LastName}</div>
                        <div className="username">{userData.Username}</div>
                        <div className="phone">{userData.PhoneNumber}</div>
                        <div className="email">{userData.Email}</div>
                    </div>
                    <button>Edit</button>
                </>
            ) : (
                <p>{error ? error : 'Loading...'}</p>
            )}
        </div>
    );
}

export default UserAccount;
