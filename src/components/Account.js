/** @jsx jsx */
import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from '../App'
import Send from 'components/Send'
import History from 'components/History'
import { css, jsx } from '@emotion/core'

const Account = () => {
  const [balance, setBalance] = useState('')
  const [transactions, setTransactions] = useState([])
  const [error, setError] = useState(false)
  const user = useContext(UserContext)
  const deductBalance = (amount) => {
    setBalance((parseFloat(balance) - parseFloat(amount)).toString())
  }

  useEffect(() => {
    setError(false)

    {/* fetch jobcoin balance */}
    const fetchData = async () => {
      try {
        const result = await fetch('/api/addresses/' + user)
        const data = await result.json()

        setBalance(data.balance)
        setTransactions(data.transactions)
      } catch (error) {
        setError(true)
      }
    }
    fetchData()
  }, [balance])

  return (
    <div css={css`
      display: flex;
      flex-direction: row;
      margin: 25px 25px 25px 25px;
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
            : <p>{balance}</p>}
        </div>
        <Send deductBalance={deductBalance} />
      </div>
      <History transactions={transactions} />
    </div>
  )
}

export default Account