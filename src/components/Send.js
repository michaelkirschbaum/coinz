/** @jsx jsx */
import React, { useState, useContext } from 'react'
import { UserContext } from '../App'
import { css, jsx } from '@emotion/core'
import styled from '@emotion/styled'

const Error = styled.span`
  color: #eb516d
`

const Send = () => {
  const [destinationAddress, setDestinationAddress] = useState('')
  const [amount, setAmount] = useState('')
  const [errors, setErrors] = useState({})
  const user = useContext(UserContext)

  const validate = (address, amount) => {
    let inputErrors = {}

    if (!address) inputErrors.address = 'field must be provided'

    if (!amount) inputErrors.amount = 'field must be provided'
    else if (isNaN(amount) || amount < 0) inputErrors.amount = 'amount is not valid'

    return inputErrors
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    // clear errors
    setErrors({})

    const inputErrors = validate(destinationAddress, amount)
    if (Object.entries(inputErrors).length) {
      setErrors(inputErrors)
      alert('Transaction not submitted. Please correct below errors.')

      return
    }

    const body = {
      fromAddress: user,
      toAddress: destinationAddress,
      amount: amount,
    }
    try {
      // send jobcoin
      const result = await fetch('/api/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })
      const response = await result.json()

      if (response.status && response.status === 'OK')
        alert(response.response)
      else if (response.error)
        throw response.error
    } catch (error) {
      alert(error)
    }
  }

  return (
    <div
      css={css`

      `}
    >
      <div>Send Jobcoin</div>
      <form onSubmit={handleSubmit}>
        <label>
          Destination Address
          <input
            type='text'
            name='address'
            onChange={e => setDestinationAddress(e.target.value)}
          />
        </label>
        {errors.address &&
          <Error>{errors.address}</Error>
        }
        <label>
          Amount
          <input
            type='text'
            name='amount'
            onChange={e => setAmount(e.target.value)}
          />
        </label>
        {errors.amount &&
          <Error>{errors.amount}</Error>
        }
        <input type='submit' value='Send' />
      </form>
    </div>
  )
}

export default Send