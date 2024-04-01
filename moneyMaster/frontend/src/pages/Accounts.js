import React, { useState, } from 'react'

function Accounts() {
    const [message, setMessage] = useState('');
    // repeat for savings..
    let checkingID = '';
    // let checkingName = '';
    // let checkingNumber = '';
    // let checkingValue = '';
    // let savingsID = '';
    // let savingsName = '';
    // let savingsNumber = '';
    // let savingsValue = '';
    // let savingsInterest = '';


    const SearchCheckingAccounts = async event => {
        event.preventDefault();
        let obj = { "SearchKey": "C", "UserID": 2 };
        let js = JSON.stringify(obj);
        try {
            const response = await
                fetch('http://localhost:5000/api/SearchCheckingAccounts',
                    {
                        method: 'POST', body: js, headers: {
                            'Content-Type':
                                'application/json'
                        }
                    });
            let txt = await response.text();
            let res = JSON.parse(txt);
            if (res.error.length > 0) {
                setMessage("API Error:" + res.error);
            }
            else {
                setMessage('Checking Account Found');
            }
        }
        catch (e) {
            setMessage(e.toString());
        }
    };

        const SearchSavingsAccounts = async event => {
            event.preventDefault();
            let obj = { "SearchKey": "S", "UserID": 2 };
            let js = JSON.stringify(obj);
            try {
                const response = await
                    fetch('http://localhost:5000/api/SearchSavingsAccounts',
                        {
                            method: 'POST', body: js, headers: {
                                'Content-Type':
                                    'application/json'
                            }
                        });
                let txt = await response.text();
                let res = JSON.parse(txt);
                if (res.error.length > 0) {
                    setMessage("API Error:" + res.error);
                }
                else {
                    setMessage('Checking Account Found');
                }
            }
            catch (e) {
                setMessage(e.toString());
            }
        };
    return (
        <div>
            <h2 id='checkingDiv' onLoad={SearchCheckingAccounts}>Checking</h2>
            <h2 id='savingsDiv' onLoad={SearchSavingsAccounts}>Savings</h2>
        </div>
    );
}
export default Accounts;