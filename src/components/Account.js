/** @jsx jsx */
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Send from 'components/Send'
import History from 'components/History'
import { css, jsx } from '@emotion/core'

const API_URL = 'https://jobcoin.gemini.com/customary/api' // TODO: remove

const Account = ({ accountID }) => {
  const [balance, setBalance] = useState('')
  const [error, setError] = useState(false)

  useEffect(() => {
    setError(false)

    {/* fetch jobcoin balance */}
    const fetchData = async () => {
      try {
        const result = await fetch(API_URL + '/addresses/' + accountID)
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
          ? <div>unable to get balance...</div>
          : <div>{balance}</div>}
      </div>
      <Send />
      <History balance={balance} />
    </>
  )
}

Account.defaultProps = {
  accountID: 'Alice',
}

Account.propTypes = {
  accountID: PropTypes.string.isRequired,
}

export default Account