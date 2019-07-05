import React from 'react'
import { shallow } from 'enzyme'
import Login from '../Login'

describe('Login', () => {
  it('should match the snapshot', () => {
    const login = shallow(
      <Login />,
    )
    expect(login).toMatchSnapshot()
  })

  it('should authenticate when address is valid', () => {
    expect(false).toBe(true)
  })

  it('should display error when address is invalid or not provided', () => {
    expect(false).toBe(true)
  })
})