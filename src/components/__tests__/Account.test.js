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

  it('should display balance', () => {
    const account = shallow(
      <Account />,
    )
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