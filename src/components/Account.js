/** @jsx jsx */
import React, {
  useState,
  useEffect,
  useContext
} from 'react'
import axios from 'axios'
import Send from 'components/Send'
import History from 'components/History'
import axios from 'axios'
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
        const res = await axios.get(API_URL + '/api/addresses/' + user)
        const { data } = res

        // set balance if first render
        if (!balance) setBalance(data.balance)

        // append running balance to data
        let tempBalance = 0
        const transactionsWithBalance = data.transactions.map(transaction => ({
          ...transaction,
          balance: transaction.toAddress === user
            ? tempBalance += parseFloat(transaction.amount)
            : tempBalance -= parseFloat(transaction.amount)
        }))

        setTransactions(transactionsWithBalance)
      } catch (error) {
        setError(true)
      }
    }
    fetchData()

    // refetch to update balance
    const refreshInterval = 60000
    const id = setInterval(() => fetchData(), refreshInterval)
    setIntervalId(id)

    return () => {
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