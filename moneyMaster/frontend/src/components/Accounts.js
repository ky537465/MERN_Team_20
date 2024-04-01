import React, { useState} from 'react'

function Accounts() {
    const [message, setMessage] = useState('');
    const [checkingName, setCheckingName] = useState('');
    const [checkingAmount, setCheckingAmount] = useState('');
    const [savingsName, setSavingsName] = useState('');
    const [savingsAmount, setSavingsAmount] = useState('');

    const SearchCheckingAccounts = async (event) => {
        event.preventDefault();
        let obj = { "SearchKey": "C", "UserID": "660ada17b519fd0339d106b3" };
        let js = JSON.stringify(obj);
        try {
            const response = await
                fetch('http://localhost:5000/api/searchCheckingAccounts',
                    {
                        method: 'POST', body: js, headers: {
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
    };

    const SearchSavingsAccounts = async (event) => {
        event.preventDefault();
        let obj = { "SearchKey": "S", "UserID": "660ada17b519fd0339d106b3" };
        let js = JSON.stringify(obj);
        try {
            const response = await
                fetch('http://localhost:5000/api/searchSavingsAccounts',
                    {
                        method: 'POST', body: js, headers: {
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

    return (
        <div>
            <h2 id='checkingDiv'>Checking</h2>
            <div>
                <button onClick={SearchCheckingAccounts}>Load</button>
                <p>Account Type: {checkingName}</p>
                <p>Amount: {checkingAmount}</p>
            </div>
            <h2 id='savingsDiv'>Savings</h2>
            <div>
                <button onClick={SearchSavingsAccounts}>Load</button>
                <p>Account Type: {savingsName}</p>
                <p>Amount: {savingsAmount}</p>
            </div>
        </div>
    );
}
export default Accounts;