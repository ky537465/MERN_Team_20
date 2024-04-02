import React, { useState, useEffect } from 'react';

function Transfers() {
    const [transferTarget, setTransferTarget] = useState('');
    const [transferTargetUserID, setTransferTargetUserID] = useState('');
    const [transferAmount, setTransferAmount] = useState('');
    const [balanceValid, setBalanceValid] = useState('');
    const [message, setMessage] = useState('');
    let UserID1 = "660ada17b519fd0339d106b3";
    let UserID2 = "660afe5d252908ef4e28e49a";

    const CompleteTransfer = async event => {
        event.preventDefault();
        let obj = { "UserID1": UserID1, "UserID2": UserID2, "Money": transferAmount };
        let js = JSON.stringify(obj);
        try {
            const response = await
                fetch('http://localhost:5000/api/transferMoney',
                    {
                        method: 'POST', body: js, headers: {
                            'Content-Type':
                                'application/json'
                        }
                    });
            let txt = await response.text();
            let res = JSON.parse(txt);
            console.log(res);
        }
        catch (e) {
            setMessage(e.toString());
        }
    };

    const CheckTransferValidity = async event => {
        event.preventDefault();
        let obj = { "AccountType":"Checking", "UserID": UserID1 };
        let js = JSON.stringify(obj);
        try {
            const response = await
                fetch('http://localhost:5000/api/checkBalance',
                    {
                        method: 'POST', body: js, headers: {
                            'Content-Type':
                                'application/json'
                        }
                    });
            let txt = await response.text();
            let res = JSON.parse(txt);
            console.log(res.balance);
            if (transferAmount <= res.balance){
                setBalanceValid('True');
                console.log('valid');
            } else {
                setBalanceValid('False')
                console.log('invalid');
            } 
        }
        catch (e) {
            setMessage(e.toString());
        }
        // useEffect(() => {
        //     if (balanceValid == 'True') {
        //         console.log('Transfer completed.');
        //     } else {
        //         console.log('Transfer not completed.');
        //     }
        //   }, [balanceValid]);
    };
    return (
        <div>
            <h1>Transfers</h1>
            <p>Target</p>
            <input
                value={transferTarget}
                onChange={e => setTransferTarget(e.target.value)}
            />
            <p>Amount</p>
            <input
                value={transferAmount}
                onChange={e => setTransferAmount(e.target.value)}
            />
            <button onClick={CheckTransferValidity}>Send</button>
            <p>Sent: {transferAmount}</p>
            <p>To: {transferTarget}</p>
            <p>{balanceValid}</p>
            <p>{message}</p>
        </div>
    );
};

export default Transfers;