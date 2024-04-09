import React from 'react';

import UserAccount from '../components/UserAccount';
import SidePanel from '../components/SidePanel';

const UserAccountPage = () =>
{
    return(
        <div>
            <SidePanel/>
            <UserAccount />
        </div>
    );
};

export default UserAccountPage;