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

    const inputErrors = validate(address)
    if (Object.entries(inputErrors).length) {
      setErrors(inputErrors)

      return
    }

    setUser(address)
    setRedirectToReferrer(true)
  }

  if (redirectToReferrer)
    return <Redirect to={location.state.from} />

  return (
    <div css={css`
      display: grid;
      text-align: center;
      position: absolute;
      margin: auto;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      height: 150px;
      width: 200px;
    `}>
      <img alt='logo' />
      <div>Welcome to Jobcoin! Sign in using your address.</div>
      <form onSubmit={handleSubmit}>
        <label>
          <div>Jobcoin Address</div>
          <input
            type='text'
            name='address'
            onChange={e => setAddress(e.target.value)}
          />
        </label>
        {errors.address &&
          <Error>{errors.address}</Error>
        }
        <input type='submit' value='Sign In' />
      </form>
    </div>
  )
}

Login.propTypes = {
  setUser: PropTypes.func.isRequired,
}

export default withRouter(Login)