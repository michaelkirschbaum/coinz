import React from 'react'
import { shallow } from 'enzyme'
import Login from 'components/Login'

describe('Login', () => {
  it('should match the snapshot', () => {
    const login = shallow(
      <Login />,
    )
    expect(login).toMatchSnapshot()
  })

  it('should authenticate on click', () => {
    expect(false).toBe(true)
  })

  it('should display error when address is not correct format', () => {
    login.find('form')
    expect(false).toBe(true)
  })

  it('should display error when address is not present', () => {
    expect(false).toBe(true)
  })
})