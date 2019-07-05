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
})