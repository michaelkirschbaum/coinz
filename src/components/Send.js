/** @jsx jsx */
import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import { UserContext } from '../App'
import { css, jsx } from '@emotion/core'
import { API_URL } from '../constants'

const Send = ({ balance }) => {
  const [destinationAddress, setDestinationAddress] = useState('')
  const [amount, setAmount] = useState('')
  const user = useContext(UserContext)
  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const result = await fetch(API_URL + '/transactions', {
        method: 'POST',
        body: {
          fromAddress: user,
          toAddress: destinationAddress,
          amount: amount
        },
      })
    } catch (error) {
      console.log(error)
    }
    alert('Transaction submitted.')
  }

  return (
    <div
      css={css`
        display: grid;
      `}
    >
      <div>Send Jobcoin</div>
      <form onSubmit={handleSubmit}>
        <label>
          Destination Address
          <input
            type='text'
            name='address'
            onChange={e => setDestinationAddress(e.target.value)}
            required
          />
        </label>
        <label>
          Amount
          <input
            type='text'
            name='amout'
            onChange={e => setAmount(e.target.value)}
            required
          />
        </label>
        <input type='submit' value='Send' />
      </form>
    </div>
  )
}

Send.propTypes = {
  balance: PropTypes.string.isRequired,
}

export default Send