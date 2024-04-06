import React from 'react';
import Transfers from '../components/Transfers'
import SidePanel from '../components/SidePanel';

function TransferPage()
{
    return(
        <div>
            <SidePanel/>
            <h1>Transfer Page</h1>
            <Transfers />
        </div>
    );
}

export default TransferPage;