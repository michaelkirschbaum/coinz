import React from 'react'
import { shallow } from 'enzyme'
import Header from 'components/Header'

describe('Header', () => {
  let header
  let setUser
  beforeEach(() => {
    const context = { user: 'Alice' }
    setUser = jest.fn().mockImplementation(user => context.user = user)
    header = shallow(
      <Header setUser={setUser} />, {
        context: { context }
      }
    )
  })

  it('should match the snapshot', () => {
    expect(header).toMatchSnapshot()
  })

  it('should render account address', () => {
    expect(header.text()).toContain('Alice')
  })

  it('should sign out user when clicked', () => {
    header.find('button').simulate('click')
    expect(setUser).toHaveBeenCalled()
    expect(header.context().user).toEqual('')
  })
})