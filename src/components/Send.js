/** @jsx jsx */
import React, { useState } from 'react'
import { css, jsx } from '@emotion/core'

const API_URL = 'https://jobcoin.gemini.com/customary/api' // TODO: remove
const route = '/transactions'

const Send = () => {
  const [sendAddress, setSendAddress] = useState('')
  const [amount, setAmount] = useState('')
  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const result = await fetch(API_URL, {
        method: 'POST',
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
            onChange={e => setSendAddress(e.target.value)}
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