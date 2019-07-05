import React from 'react'
import { shallow } from 'enzyme'
import Account from '../Account'
import Send from 'components/Send'
import History from 'components/History'

describe('Account', () => {
  let account
  beforeEach(() => {
    account = shallow(
      <Account />,
    )
  })

  it('should match the snapshot', () => {
    expect(account).toMatchSnapshot()
  })

  it('should render balance', () => {
    expect(false).toBe(true)
  })

  it('should update balance', () => {
    expect(false).toBe(true)
  })

  it('should show error when balance request fails', () => {
    expect(false).toBe(true)
  })

  it('should render Send widget', () => {
    expect(account.find(Send)).toHaveLength(1)
  })

  it('should render history graph', () => {
    expect(account.find(History)).toHaveLength(1)
  })
})