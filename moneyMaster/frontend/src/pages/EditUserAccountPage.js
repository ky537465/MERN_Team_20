import React from 'react';

import SidePanel from '../components/SidePanel';
import EditProfile from '../components/EditProfile';

const EditUserAccountPage = () =>
{
    return(
        <div>
            <SidePanel/>
            <EditProfile />
        </div>
    );
};

export default EditUserAccountPage;