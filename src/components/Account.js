/** @jsx jsx */
import React, { useState, useEffect } from 'react'
import Send from 'components/Send'
import History from 'components/History'
import { css, jsx } from '@emotion/core'
import { api } from '../constants'

const Account = () => {
  const account = '1234' // TODO: remove value
  const [balance, setBalance] = useState(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    setError(false)

    {/* fetch jobcoin balance */}
    const fetchData = async () => {
      try {
        const result = await fetch(api + '/addresses/' + account)
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
          display: grid;
        `}
      >
        <div>Jobcoin Balance</div>
        {error
          ? <div>Unable to get balance...</div>
          : balance}
      </div>
      <Send />
      <History balance={balance} />
    </>
  )
}

export default Account