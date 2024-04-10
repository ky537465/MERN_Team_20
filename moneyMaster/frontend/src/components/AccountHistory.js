import React, { useState, useEffect } from 'react'

function AccountHistory() {
    const [transactions, setTransactions] = useState([])
    let key = "C"
    let uid = "660ada17b519fd0339d106b3"

    useEffect(() => {
        const LoadHistory = async event => {
            let obj = { "SearchKey": "C", "UserID": "660ada17b519fd0339d106b3" };
            let js = JSON.stringify(obj);
            try {
                const response = await
                    fetch('http://localhost:5000/api/searchTransactions',
                        {
                            method: 'POST', body: js, headers: {
                                'Content-Type':
                                    'application/json'
                            }
                        });
                let txt = await response.text();
                let res = JSON.parse(txt);
                console.log(res.length)
                let historyLength = res.length
                console.log(historyLength);
                let transArray = res.map(obj => Object.values(obj))
                setTransactions(transArray)
                console.log(transArray)
            }
            catch (e) {
                console.log(e)
            }
        };
        LoadHistory()
    }, [])


    return (
        <div>
            History
            <div>
                {transactions.map((item, index) => (
                    <p key={index}>{item}</p>
                ))}
            </div>
        </div>
    );
};

export default AccountHistory