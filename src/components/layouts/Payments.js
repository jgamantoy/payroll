import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';

const Payments = () => {
    const [ transactionList, setTransactionList ] = useState([]);
    const [ showPayed, setShowPayed ] = useState(false);
    const transactionHeader = () => {
        return (
            <div className="transactionItem">
                <div className="transactionItem__id">
                    <h4>Trans ID</h4>
                </div>
                <div className="transactionItem__row">
                    <h4>Pay Date</h4>
                </div>
                <div className="transactionItem__row">
                    <h4>Project Name</h4>
                </div>
                <div className="transactionItem__row">
                    <h4>Employee Name</h4>
                </div>
                <div className="transactionItem__row">
                    <h4>Amount</h4>
                </div>
                <div className="transactionItem__row status">
                    <h4>Status</h4>
                </div>
            </div>
        )
    }
    const transactionItem = (item) => {
        console.log(item)
        if (item.status === 'payed' && showPayed === false){
            return ""
        }
        return (
            <div className="transactionItem">
                <div className="transactionItem__id">
                    <p>{item.trans_id}</p>
                </div>
                <div className="transactionItem__row">
                <   p>{item.pay_date}</p>
                </div>
                <div className="transactionItem__row">
                    <p>{item.project_name}</p>
                </div>
                <div className="transactionItem__row">
                    <p>{item.name}</p>
                </div>
                <div className="transactionItem__row">
                    <p>Php {item.pay_amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
                </div>
                <div className="transactionItem__row status">
                    <p> {item.status} </p>
                </div>
                {item.status === 'unpayed' ? 
                    <button onClick={() => {
                        handleUpdate(item.trans_id)
                    }}>
                    Update
                    </button>
                :
                <div className="transactionItem__row transNo">
                    <p>{item.transaction_no} </p>
                </div>
                }
                
            </div>
        )
    }
    const handleUpdate = (id) => {
        console.log(id)
        let passTCode = prompt(`Enter Transaction Code ${id}`)
        if (passTCode !== null) {
            if (passTCode.length > 0 ) {
                axios.put(`http://localhost:3001/api/update/transactions/${id}`,{transCode: passTCode}).then(()=> {
                })
                window.location.reload();
            } else {
                alert('Please put a transaction code')
            }
            
        }
    }
    useEffect(() => {
        axios.get('http://localhost:3001/api/transactions').then((res) => {
            const data = res.data.sort((a, b) =>  -(new Date(a.pay_date) - new Date(b.pay_date)))
            setTransactionList(data)
        })
    }, [])
    return(
        <div className="Payments">
            <div className="Payments__main">
                <div style={{display: 'flex'}}>
                <h1>Transactions</h1>
                <button onClick={() => setShowPayed(!showPayed)}>{showPayed ? 'Hide Payed' : 'Show Payed'}</button>
                </div>
                
                {transactionHeader()}
                {transactionList.map((item)=> {
                    return transactionItem(item)
                })}
            </div>
        </div>
    )
}

export default Payments;