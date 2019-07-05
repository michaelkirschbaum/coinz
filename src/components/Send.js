/** @jsx jsx */
import React, { useState } from 'react'
import { css, jsx } from '@emotion/core'

const Send = () => {
  const [sendAddress, setSendAddress] = useState('')
  const [amount, setAmount] = useState('')

  return (
    <div
      css={css`
        display: grid;
      `}
    >
      <div>Send Jobcoin</div>
      <form>
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