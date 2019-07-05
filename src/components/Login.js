/** @jsx jsx */
import React, { useState } from 'react'
import { css, jsx } from '@emotion/core'

const Login = () => {
  const [address, setAddress] = useState('')
  const handleSubmit = (event) => {
    event.preventDefault()
  }

  return (
    <div css={css``}>
      <div>Sign In</div>
      <form onSubmit={handleSubmit}>
        <label>
          Jobcoin Address
          <input
            type='text'
            name='address'
            onChange={e => setAddress(e.target.value)}
            required
          />
        </label>
        <input type='submit' value='Sign In' />
      </form>
    </div>
  )
}

export default Login