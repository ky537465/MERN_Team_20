import React, { useState } from 'react'

function Accounts() {
    const [message, setMessage] = useState('');
    const [checkingName, setCheckingName] = useState('');
    const [checkingAmount, setCheckingAmount] = useState('');
    const [savingsName, setSavingsName] = useState('');
    const [savingsAmount, setSavingsAmount] = useState('');

    const loadAccounts = async event => {
        event.preventDefault();
        let objC = { "SearchKey": "C", "UserID": "660ada17b519fd0339d106b3" };
        let jsC = JSON.stringify(objC);
        try {
            const response = await
                fetch('http://localhost:5000/api/searchCheckingAccounts',
                    {
                        method: 'POST', body: jsC, headers: {
                            'Content-Type':
                                'application/json'
                        }
                    });
            let txt = await response.text();
            console.log(txt);
            let res = JSON.parse(txt);
            console.log(res);
            setMessage('Checking Account Found');
            setCheckingName(res[0].AccountName);
            setCheckingAmount(res[0].AccountValue);
            console.log(message);
        }
        catch (e) {
            setMessage(e.toString());
        }

        let objS = { "SearchKey": "S", "UserID": "660ada17b519fd0339d106b3" };
        let jsS = JSON.stringify(objS);
        try {
            const response = await
                fetch('http://localhost:5000/api/searchSavingsAccounts',
                    {
                        method: 'POST', body: jsS, headers: {
                            'Content-Type':
                                'application/json'
                        }
                    });
            let txt = await response.text();
            console.log(txt);
            let res = JSON.parse(txt);
            console.log(res);
            setMessage('Savings Account Found');
            setSavingsName(res[0].AccountName);
            setSavingsAmount(res[0].AccountValue);
            console.log(message);
        }
        catch (e) {
            setMessage(e.toString());
        }
};
// <button onClick={SearchCheckingAccounts}>Load</button>
// <button onClick={SearchSavingsAccounts}>Load</button>
//  <button onClick={loadAccounts}>Load</button>
return (
    <div>
        <button onClick={loadAccounts}>Load</button>
        <h2 id='checkingDiv'>Checking</h2>
        <div>

            <p>Account Type: {checkingName}</p>
            <p>Amount: {checkingAmount}</p>
        </div>
        <h2 id='savingsDiv'>Savings</h2>
        <div>

            <p>Account Type: {savingsName}</p>
            <p>Amount: {savingsAmount}</p>
        </div>
    </div>
);
}
export default Accounts;