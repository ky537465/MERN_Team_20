import React, { useState } from 'react';

function SidePanel()
{
    const[isPanelExpanded, setIsPanelExpanded] = useState(true);

    const togglePanel = () => {
        setIsPanelExpanded(!isPanelExpanded);
    };

    const doLogout = async (event) => {
        event.preventDefault();
        localStorage.removeItem('user_data');
        window.location.href = '/';
    };


    return(
      <div className={`sidePanel ${isPanelExpanded ? 'expanded' :'collapased'}`}>
        <div className='toggleButton' onClick={togglePanel}>
            {isPanelExpanded ? 'Collapse Panel' : 'Expand Panel'}
        </div>
        <div className='logo'>
            <img src="logo.png" alt="Logo" />
            <span>Money Master</span> 
        </div>

        <nav className='navigation'>
            <ul>
                <li>
                    <a href='/account'>
                        Dashboard
                    </a>
                </li>
                <li>
                    <a href='/transfer'>
                        Transfer
                    </a>
                </li>
                <li>
                    <a href='/profile'>
                        User Account
                    </a>
                </li>
            </ul>
        </nav>

        <button onClick={doLogout}>Log out</button>
     </div>
    );
}

export default SidePanel;
