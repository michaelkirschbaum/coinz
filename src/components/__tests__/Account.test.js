import React from 'react'
import { shallow } from 'enzyme'
import Account from '../Account'
import Send from 'components/Send'
import History from 'components/History'

describe('Account', () => {
  it('should match the snapshot', () => {
    const account = shallow(
      <Account />,
    )
    expect(account).toMatchSnapshot()
  })

  it('should render balance', () => {
    const account = shallow(
      <Account />,
    )
    expect(false).toBe(true)
  })

  it('should update balance', () => {
    expect(false).toBe(true)
  })

  it('should show error when balance request fails', () => {
    expect(false).toBe(true)
  })

  it('should render Send widget', () => {
    const account = shallow(
      <Account />,
    )
    expect(account.find(Send)).toHaveLength(1)
  })

  it('should render history graph', () => {
    const account = shallow(
      <Account />,
    )
    expect(account.find(History)).toHaveLength(1)
  })
})