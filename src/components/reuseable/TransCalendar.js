import React, { useState, useEffect } from 'react';
import moment from 'moment';
import axios from 'axios';

const TransCalendar = ({projName = 'all'}) => {
  const [transactions, setTransactions] = useState([])
  const currentDate = moment().format("YYYY-MM-DD")
  const nextDate = moment().add(1, 'week').format("YYYY-MM-DD")

  useEffect(() => {
    axios.get('http://localhost:3001/api/transactions').then((res) => {
      const transactionList = res.data.filter((date) => moment(date.pay_date).isAfter(currentDate) && moment(date.pay_date).isSameOrBefore(nextDate) && date.status !== 'payed') //Gets all payments due within a week and is not payed
      if (projName === 'all'){
        setTransactions(transactionList)
      }
      else {
        setTransactions(transactionList.filter((trans) => trans.project_name === projName && trans.status !== 'payed'))
      }
  })
  }, [])
  return(
    <div className="TransCalendar">
      {transactions.length > 0 ? 
        transactions.map((item) => {
          return (
            <div className="TransCalendar__item">
              <div className="TransCalendar__item__date">{item.pay_date}</div>
              {projName === 'all' ? <div className="TransCalendar__item__proj">{item.project_name}</div>: ''}
              <div className="TransCalendar__item__name">{item.name}</div>
              <div className="TransCalendar__item__date">Php {item.pay_amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
            </div>
          )
      }): <h5>No upcoming payments</h5>}
    </div>
  )
}

export default TransCalendar;