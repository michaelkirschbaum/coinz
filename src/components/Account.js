import React, { useState, useEffect } from 'react'
import Send from 'components/Send'
import History from 'components/History'
/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { api_url } from '../constants'

const account = '1234'

const Account = () => {
  const [balance, setBalance] = useState(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    setError(false)

    {/* fetch jobcoin balance */}
    const fetchData = async () => {
      try {
        const result = await fetch(api_url + '/addresses/' + account)
        const data = await result.json()
        setBalance(data.balance)
      } catch (error) {
        setError(true)
      }
    }

    fetchData()
  }, [])

  return (
    <React.Fragment>
      <div
        css={css`
          display: grid;
        `}
      >
        Jobcoin Balance<br></br>
        {error
          ? <div>Unable to get balance...</div>
          : balance}
      </div>
      <Send />
      <History balance={balance} />
    </React.Fragment>
  )
}

export default Account