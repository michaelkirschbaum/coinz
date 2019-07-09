/** @jsx jsx */
import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from '../App'
import Send from 'components/Send'
import History from 'components/History'
import { css, jsx } from '@emotion/core'

const Account = () => {
  const [balance, setBalance] = useState('')
  const [error, setError] = useState(false)
  const user = useContext(UserContext)
  useEffect(() => {
    setError(false)

    {/* fetch jobcoin balance */}
    const fetchData = async () => {
      try {
        const result = await fetch('/api/addresses/' + user)
        const data = await result.json()
        setBalance(data.balance)
      } catch (error) {
        setError(true)
      }
    }
    fetchData()
  }, [])

  return (
    <>
      <div
        css={css`

        `}
      >
        <div>Balance</div>
        {error
          ? <div>unable to get balance...</div>
          : <div>{balance}</div>}
      </div>
      <Send />
      <History />
    </>
  )
}

export default Account