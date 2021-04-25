import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment'
const Payments = () => {
    const [ transactionList, setTransactionList ] = useState([]);
    const [ showPayed, setShowPayed ] = useState(false);
    const [ sortSettings, setSortSettings ] = useState('nto')
    const [ searchInput, setSearchInput ] = useState('')
    const [ searchSetting, setSearchSetting] = useState('emp')
    console.log(searchInput)
    const transactionHeader = () => {
        return (
            <div className="transactionItem">
                <div className="transactionItem__id header">
                    <h4>Trans ID</h4>
                </div>
                <div className="transactionItem__row header">
                    <h4>Pay Date</h4>
                </div>
                <div className="transactionItem__row header">
                    <h4>Project Name</h4>
                </div>
                <div className="transactionItem__row header">
                    <h4>Employee Name</h4>
                </div>
                <div className="transactionItem__row header">
                    <h4>Amount</h4>
                </div>
                <div className="transactionItem__row header status">
                    <h4>Status</h4>
                </div>
                <div className="transactionItem__row transNo header">
                    
                </div>
            </div>
        )
    }
    const transactionItem = (item) => {
        if (item.status === 'payed' && showPayed === false){
            return ""
        }
        return (
            <div className="transactionItem">
                <div className="transactionItem__id">
                    <p>{item.trans_id}</p>
                </div>
                <div className="transactionItem__row">
                <   p>{moment(item.pay_date).format("MMMM DD, YYYY")}</p>
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
    const handleSearch = (text) => {
        setSearchInput(text)
    }
    const emptyList = () => {
        const unpayedList = transactionList.filter((item) => {return item.status === 'unpayed'} )
        const payedList = transactionList.filter((item) => {return item.status === 'payed'})
        if (unpayedList.length ===  0 && !showPayed){
            return (
                <div className = "emptyList">
                    <h4>Nothing to show...</h4>
                </div>
                )
        }
        if (payedList.length === 0 && unpayedList.length === 0 && showPayed){
            return (
                <div className="emptyList">
                    <h4>Nothing to show...</h4>
                </div>
                )
        }
    }
    useEffect(() => {
        axios.get('http://localhost:3001/api/transactions').then((res) => {
            let data = res.data.sort((a, b) =>  -(new Date(a.pay_date) - new Date(b.pay_date)))
            setTransactionList(data)
        })
    }, [])
    useEffect(() => {
        const data = transactionList
        if (sortSettings === 'nto'){
            data.sort((a, b) =>  -(new Date(a.pay_date) - new Date(b.pay_date)))
            setSortSettings(data)
        }
        if (sortSettings === 'otn') {
            data.sort((a, b) =>  (new Date(a.pay_date) - new Date(b.pay_date)))
            setSortSettings(data)
        }
    }, [sortSettings])
    return(
        <div className="Payments">
            <div className="Payments__main">
                <div className="Payments__main__header">
                    <h1>Transactions</h1>
                    <button 
                        id="showPayed" 
                        onClick={() => setShowPayed(!showPayed)}>{showPayed ? 'Hide Payed' : 'Show Payed'}
                    </button>
                    <select> Sort By
                        <option onClick={() => setSortSettings('nto')}>Newest to Oldest</option>
                        <option onClick={() => setSortSettings('otn')}>Oldest to Newest</option>
                    </select>
                    <div className="Payments__main__header__search">
                        <input
                            type="text"
                            value={searchInput}
                            placeholder="Search by ..."
                            onChange={(e) => handleSearch(e.target.value)}
                        />
                        <select>
                            <option>> Employee</option>
                            <option>> Project</option>
                        </select>
                    </div>
                </div>
                {transactionHeader()}
                {emptyList()}
                {transactionList.map((item)=> {
                    return transactionItem(item)
                })}
            </div>
        </div>
    )
}

export default Payments;