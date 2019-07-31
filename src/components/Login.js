/** @jsx jsx */
import React, { useState } from 'react'
import { Redirect, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { css, jsx } from '@emotion/core'
import styled from '@emotion/styled'
// import logo from '../../public/logo.jpg'

const Error = styled.span`
  color: #eb516d
`

const Login = ({ setUser, location }) => {
  const [address, setAddress] = useState('')
  const [redirectToReferrer, setRedirectToReferrer] = useState(false)
  const [errors, setErrors] = useState({})

  const validate = (address) => {
    let inputErrors = {}
    if (!address) inputErrors.address = 'field must be provided'

    return inputErrors
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    // clear errors
    setErrors({})

    // if error exists, exit submit
    const inputErrors = validate(address)
    if (Object.entries(inputErrors).length) {
      setErrors(inputErrors)

      return
    }

    // set fields
    setUser(address)

    setRedirectToReferrer(true)
  }

  if (redirectToReferrer)
    return <Redirect to={location.state.from} />

  return (
    <div css={css`
      position: absolute;
      margin: auto;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      height: 150px;
      width: 200px;
    `}>
      <div css={css`text-align: center;`}>
        {/* <img src={logo} alt='logo' /> */}
        <p>Welcome to Jobcoin! Sign in using your address.</p>
      </div>
      <form onSubmit={handleSubmit}>
        <label>
          <div>Jobcoin Address</div>
          <input
            type='text'
            name='address'
            onChange={e => setAddress(e.target.value)}
          />
        </label>
        <input type='submit' value='Sign In' />
        {errors.address &&
          <Error>{errors.address}</Error>
        }
      </form>
    </div>
  )
}

Login.propTypes = {
  setUser: PropTypes.func.isRequired,
  location: React.PropTypes.shape({
    pathname: React.PropTypes.string.isRequired,
  }).isRequired,
}

export default withRouter(Login)