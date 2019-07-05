import React, { useState, useEffect } from 'react'
import Send from 'components/Send'
import History from 'components/History'
/** @jsx jsx */
import { css, jsx } from '@emotion/core'

const url = 'https://jobcoin.gemini.com/customary/api'
const account = '1234'

const Account = () => {
  const [balance, setBalance] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(url + '/addresses/' + account)
      const data = await result.json()
      setBalance(data.balance)
    }

    fetchData()
  }, [account])

  return (
    <React.Fragment>
      <div
        css={css``}
      >
        {balance}
      </div>
      <Send />
      <History />
    </React.Fragment>
  )
}

export default Account