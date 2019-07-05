/** @jsx jsx */
import React from 'react'
import { css, jsx } from '@emotion/core'

class Send extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      address: '',
      amount: '',
    }

    this.handleChange = this.handleChange.bind(thish)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({
      address: event.target.address,
      amount: event.target.amount,
    })
  }

  handleSubmit(event) {
    event.preventDefault()
  }

  render() {
    return (
      <div
        css={css`
        
        `}
      >
        <div>Send Jobcoin</div>
        <form>
          <label>
            Destination Address
            <input type='text' name='address' />
          </label>
          <label>
            Amount
            <input type='text' name='amout' />
          </label>
          <input type='submit' value='Send' />
        </form>
      </div>
    )
  }
}

export default Send