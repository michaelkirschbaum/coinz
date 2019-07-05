/** @jsx jsx */
import React, { useState } from 'react'
import { css, jsx } from '@emotion/core'

const Login = () => {
  const [address, setAddress] = useState('')

  return (
    <>
      <div>Sign In</div>
      <form>
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
    </>
  )
}

export default Login