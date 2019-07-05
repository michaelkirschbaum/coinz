import React, { useState, useEffect } from 'react'
import Send from 'components/Send'
import History from 'components/History'

const Account = () => {
  const [balance, setBalance] = useState(null)

  useEffect(async () => {
    const result = await fetch(
      'http://jobcoin.gemini.com/customary/api/addresses/1234'
    )
    const data = await result.json()
    setBalance(data.balance)
  }, [])

  return (
    <React.Fragment>
      <div>{balance}</div>
      <Send />
      <History />
    </React.Fragment>
  )
}

export default Account