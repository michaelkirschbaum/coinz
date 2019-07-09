/** @jsx jsx */
import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { css, jsx } from '@emotion/core'
import { UserContext } from '../App'

const Header = ({ setUser }) => {
  const user = useContext(UserContext)

  return (
    <div css={css`
    
    `}>
      <div>{user} Signed In</div>
      <button onClick={setUser('')}>Sign Out</button>
    </div>
  )
}

Header.propTypes = {
  setUser: PropTypes.func.isRequired,
}

export default Header