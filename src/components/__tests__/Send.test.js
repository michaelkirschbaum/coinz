import React from 'react'
import { shallow } from 'enzyme/build';
import Send from 'components/Send';

describe('Send', () => {
  it('should match the snapshot', () => {
    const send = shallow(
      <Send />,
    )
    expect(send).toMatchSnapshot()
  })

  it('should display error if send address is invalid', () => {
    expect(false).toBe(true)
  })

  it('should display error if jobcoin amount is invalid', () => {
    expect(false).toBe(true)
  })

  it('should display error if insufficient funds for amount', () => {
    expect(false).toBe(true)
  })

  it('should display error if unable to retrieve balance', () => {
    expect(false).toBe(true)
  })

  it('show success when button clicked', () => {
    expect(false).toBe(true)
  })
})