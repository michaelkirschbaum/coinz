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
    global.fetch = jest.fn().mockImplementationOnce(() => Promise.resolve({
      json: () => Promise.resolve({ data: { balance: "10" } })
    }))

    account = shallow(
      <Account accountID = {'Alice'}/>,
    )
    expect(account.text()).toContain('10')

    global.fetch.mockClear()
  })

  it('should update balance', () => {

  })

  it('should show error when balance request fails', () => {
    global.fetch = jest.fn().mockImplementationOnce(() => Promise.reject(
      new Error('Fetch failed')
    ))

    account = shallow(
      <Account accountID = {'Alice'}/>,
    )
    expect(account.text()).toContain('unable to get balance')

    global.fetch.mockClear()
  })

  it('should render Send widget', () => {
    expect(account.find(Send)).toHaveLength(1)
  })

  it('should render history graph', () => {
    expect(account.find(History)).toHaveLength(1)
  })
})