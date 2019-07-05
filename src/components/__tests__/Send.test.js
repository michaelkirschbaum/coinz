import React from 'react'
import {shallow} from 'enzyme/build';
import Send from 'components/Send';

describe('Send', () => {
  it('should match the snapshot', () => {
    const send = shallow(
      <Send />,
    )
    expect(send).toMatchSnapshot()
  })

  it('should display error if send address is invalid or not provided', () => {
    expect(false).toBe(true)
  })

  it('should display error if jobcoin amount is invalid or not provided', () => {
    expect(false).toBe(true)
  })

  it('should display error if jobcoin amount is not available', () => {
    expect(false).toBe(true)
  })

  it('should display error when submitted with invalid input', () => {
    expect(false).toBe(true)
  })

  it('show success when input submitted', () => {
    expect(false).toBe(true)
  })
})