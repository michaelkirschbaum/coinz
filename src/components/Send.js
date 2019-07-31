/** @jsx jsx */
import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { css, jsx } from '@emotion/core'
import styled from '@emotion/styled'
import { UserContext } from '../App'

const Error = styled.span`
  color: #eb516d
`

const Send = ({ deductBalance }) => {
  const [destinationAddress, setDestinationAddress] = useState('')
  const [amount, setAmount] = useState('')
  const [errors, setErrors] = useState({})
  const user = useContext(UserContext)

  const validateInput = (address, amount) => {
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

    const inputErrors = validateInput(destinationAddress, amount)
    if (Object.entries(inputErrors).length) {
      setErrors(inputErrors)
      alert('Transaction not submitted. Please correct below errors.')
      return
    }

    try {
      // send jobcoin
      const res = await axios.post(API_URL + '/api/transactions', {
        fromAddress: user,
        toAddress: destinationAddress,
        amount: amount,
      })
      const { data } = res

      if (data.status && data.status === 'OK') {
        // rerender data
        deductBalance(amount)

        // clear input
        setDestinationAddress('')
        setAmount('')

        alert('Transaction was successful')
      } else if (data.error)
        throw data.error
    } catch (error) {
      alert(error)
    }
  }

  return (
    <div
      css={css`
        padding: 0 10px 10px 10px;
        border: 1px solid lightgrey;
        overflow: hidden;
      `}
    >
      <h4>Send Jobcoin</h4>
      <form onSubmit={handleSubmit}>
        <label>
          <div>Destination Address</div>
          <input
            type='text'
            name='address'
            value={destinationAddress}
            css={css`width: 100%; box-sizing: border-box;`}
            onChange={e => setDestinationAddress(e.target.value)}
          />
        </label>
        {errors.address &&
          <Error>{errors.address}</Error>
        }
        <label>
          <div>Amount</div>
          <input
            type='text'
            name='amount'
            value={amount}
            css={css`width: 100%; box-sizing: border-box;`}
            onChange={e => setAmount(e.target.value)}
          />
        </label>
        {errors.amount &&
          <Error>{errors.amount}</Error>
        }
        <div css={css`margin-top: 5px; float: right;`}>
          <input type='submit' value='Send' />
        </div>
      </form>
    </div>
  )
}

Send.propTypes = {
  deductBalance: PropTypes.func.isRequired,
}

export default Send