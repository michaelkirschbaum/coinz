/** @jsx jsx */
import React, { useState, useEffect, useContext } from 'react'
import Send from 'components/Send'
import History from 'components/History'
import { css, jsx } from '@emotion/core'
import { UserContext } from '../App'

const Account = () => {
  const [balance, setBalance] = useState('')
  const [transactions, setTransactions] = useState([])
  const [error, setError] = useState(false)
  const [intervalId, setIntervalId] = useState('')
  const user = useContext(UserContext)
  const deductBalance = (amount) => {
    setBalance((parseFloat(balance) - parseFloat(amount)).toString())
  }

  useEffect(() => {
    setError(false)

    {/* fetch jobcoin balance */}
    const fetchData = async () => {
      try {
        const result = await fetch(API_URL + '/api/addresses/' + user)
        const data = await result.json()

        setBalance(data.balance)
        setTransactions(data.transactions)
      } catch (error) {
        setError(true)
      }
    }

    fetchData()

    // refetch to update balance
    const id = setInterval(() => fetchData(), 60000)
    setIntervalId(id)

    // cleanup
    return function cleanup() {
      clearInterval(intervalId)
    }
  }, [balance])

  return (
    <div css={css`
      display: flex;
      flex-direction: row;
      position: absolute;
      top: 0px;
      right: 0px;
      bottom: 0px;
      left: 0px;
      margin-top: 40px;
      padding: 25px 25px 25px 25px;
      box-sizing: border-box;
    `}>
      <div css={css`
        width: 300px;
        margin-right: 25px;
      `}>
        <div css={css`
          border: 1px solid lightgrey;
          margin-bottom: 10px;
          padding: 0 10px 0 10px;
        `}>
          <h4>Jobcoin Balance</h4>
          {error
            ? <p>unable to get balance...</p>
            : <p>{balance ? parseFloat(balance).toFixed(2) : null}</p>}
        </div>
        <Send deductBalance={deductBalance} />
      </div>
      <History transactions={transactions} />
    </div>
  )
}

export default Account