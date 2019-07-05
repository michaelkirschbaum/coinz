/** @jsx jsx */
import React from 'react'
import { css, jsx } from '@emotion/core'

class Send = () => (
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

export default Send