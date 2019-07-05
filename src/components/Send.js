/** @jsx jsx */
import React, { useState } from 'react'
import { css, jsx } from '@emotion/core'

const Send = () => {
  const sendAddress = useState(null)
  const amount = useState(null)

  return (
    <div
      css={css`
        display: grid;
      `}
    >
      <div>Send Jobcoin</div>
      <div>
        Destination Address
        <input />
      </div>
      <div>
        Amount
        <input />
      </div>
      <button>Send</button>
    </div>
  )
}

export default Send