import React from 'react';

import PageTitle from '../components/PageTitle';
import LoggedInName from '../components/LoggedInName';
import Accounts from '../components/Accounts';
import SidePanel from '../components/SidePanel';

const LoggedInPage = () =>
{
    return(
        <div>
            <SidePanel />
            <PageTitle />
            <LoggedInName />
            <Accounts />
        </div>
    );
}

export default LoggedInPage;