/** @jsx jsx */
import React, { useState, useContext } from 'react'
import { UserContext } from '../App'
import { css, jsx } from '@emotion/core'

const Send = () => {
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

export default Send