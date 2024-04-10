import React, { useState } from 'react';
import Select from 'react-select';

function Transfers() {
    const [transferTarget, setTransferTarget] = useState('');
    const [transferAmount, setTransferAmount] = useState('');
    const [balanceValid, setBalanceValid] = useState('');
    const [transferAccountType, setAccountType] = useState('1');
    const [switchForms, setForm] = useState('True');
    let UserID1 = "660ada17b519fd0339d106b3";

    const selectForm = () => {
        setForm(!switchForms)
    }

    const handleChange = (option) => {
        setAccountType(option)
        console.log(transferAccountType)
    }

    const options = [
        { value: 1, label: "From Checking, To Savings" },
        { value: 2, label: "From Savings, to Checking" }
    ]

    const CompleteTransfer = async event => {
        event.preventDefault();
        let obj = { "UserID1": UserID1, "Username": transferTarget, "Money": transferAmount };
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
            console.log(e.toString());
        }
    };

    const CheckTransferValidity = async event => {
        event.preventDefault();
        let obj = { "AccountType": "Checking", "UserID": UserID1 };
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
            if (transferAmount <= res.balance) {
                setBalanceValid('True');
                console.log('Balance valid.')
            } else {
                setBalanceValid('False')
                console.log('Balance invalid.')
            }
        }
        catch (e) {
            console.log(e.toString());
        }
        if (balanceValid === 'True') {
            CompleteTransfer(event);
        }
    };

    const TransferUser = async event => {
        event.preventDefault();
        setAccountType(document.getElementById("selectAccount").value)
        console.log(transferAccountType)
        console.log(transferAmount)
        let obj = { "UserID": UserID1, "Type": transferAccountType, "Money": transferAmount };
        let js = JSON.stringify(obj);
        try {
            const response = await
                fetch('http://localhost:5000/api/transferMoneyAccount',
                    {
                        method: 'POST', body: js, headers: {
                            'Content-Type':
                                'application/json'
                        }
                    });
            let txt = await response.text();
            let res = JSON.parse(txt);
            console.log(res)
        }
        catch(e){
            console.log(e.toString())
        }
    }
    return (
            <div className="w-screen h-screen bg-teal-800 flex flex-col items-center justify-evenly">
                {switchForms ? (
                    <div>
                        <h1>Transfers</h1>
                        <h2>Transfer Users</h2>
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
                    </div>
                ) : (
                    <div>
                        <h2>Transfer Accounts</h2>
                        <Select id="selectAccount"
                            options={options}
                            onChange={handleChange}
                            defaultValue={options[0]}
                        />
                        <p>Amount</p>
                        <input
                            value={transferAmount}
                            onChange={e => setTransferAmount(e.target.value)}
                        />
                        <button onClick={TransferUser}>Send</button>
                    </div>
                )
                }
                <button onClick={selectForm}>Toggle Form</button>
            </div>
        );
    };

    export default Transfers;