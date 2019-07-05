import React from 'react'
import { shallow } from 'enzyme'
import Account from 'components/Account'
import Send from 'components/Send'
import History from 'components/History'

describe('Account', () => {
  let account
  beforeEach(() => {
    account = shallow(
      <Account accountID={'Alice'} />,
    )
  })

  it('should match the snapshot', () => {
    expect(account).toMatchSnapshot()
  })

  it('should render balance', () => {
    expect(account.contains(<div>37.5</div>)).toEqual(true)
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