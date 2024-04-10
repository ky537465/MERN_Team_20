import React, { useState } from 'react';
import Transfers from '../components/Transfers'
import SidePanel from '../components/SidePanel';

function TransferPage()
{
    const [isPanelExpanded, setIsPanelExpanded] = useState(true);

    const togglePanel = () => {
        setIsPanelExpanded(!isPanelExpanded);
    };

    return(
        <div>
            <SidePanel isPanelExpanded={isPanelExpanded} togglePanel={togglePanel}/>
            <Transfers isPanelExpanded={isPanelExpanded}/>
        </div>
    );
}

export default TransferPage;