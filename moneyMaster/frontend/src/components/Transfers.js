import React, { useState } from 'react';

function Transfers() {
    const [transferTarget, setTransferTarget] = useState('');
    const [transferAmount, setTransferAmount] = useState('');
    const [balanceValid, setBalanceValid] = useState('');
    const [message, setMessage] = useState('');
    let _id1 = "65da935af876f612b5b77023";
    let _id2 = "65da9340f876f612b5b77022"

    const MakeTransfer = async event => {
        event.preventDefault();
        let obj = { "_id": _id1, "_id2": _id2, "Money": transferAmount };
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
            if (res.error.length > 0) {
                setMessage("API Error:" + res.error);
            }
            else {
                setMessage('');
            }
        }
        catch (e) {
            setMessage(e.toString());
        }
    };

    const CheckTransferValidity = async event => {
        event.preventDefault();
        let obj = { "_id": _id1 };
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
            if (res.error.length > 0) {
                setMessage("API Error:" + res.error);
            }
            else {
                setBalanceValid('Valid Transfer');
                MakeTransfer();
            }
        }
        catch (e) {
            setMessage(e.toString());
        }
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
            <button onclick={CheckTransferValidity}>Send</button>
            <p>Sent: {transferAmount}</p>
            <p>To: {transferTarget}</p>
            <p>{balanceValid}</p>
            <p>{message}</p>
        </div>
    );
};

export default Transfers;