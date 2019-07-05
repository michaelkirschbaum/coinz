/** @jsx jsx */
import React from 'react'
import { css, jsx } from '@emotion/core'

const Header = ({ user, isAuthenticated }) => (
  <>
    <div css={css``}>{user}</div>
    {isAuthenticated
      ? <div>Signed In</div>
      : null}
    <button>Sign Out</button>
  </>
);
 export default Header