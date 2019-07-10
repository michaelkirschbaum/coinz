/** @jsx jsx */
import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { css, jsx } from '@emotion/core'
import { UserContext } from '../App'
// import logo from '../../public/logo.jpg'

const Header = ({ setUser }) => {
  const user = useContext(UserContext)

  return (
    <div css={css`
      display: flex;
      justify-content: space-between;
      height: 40px;
      line-height: 40px;
      border-bottom: 1px solid lightgrey;
    `}>
      <div>
        <img alt='logo' />
        {user}
      </div>
      <div>
        Signed In
        <button onClick={() => setUser('')}>Sign Out</button>
      </div>
    </div>
  )
}

Header.propTypes = {
  setUser: PropTypes.func.isRequired,
}

export default Header