import React from 'react'
import { mount } from 'enzyme'
import Login from 'components/Login'

describe('Login', () => {
  let login
  beforeEach(() => {
    const context = { user: '' }
    const setUser = jest.fn().mockImplementation(user => {
      context.user = user
    })
    const location = { state: {} }

    login = mount(
      <Login.WrappedComponent setUser={setUser} location={location} />,
      { context }
    )

    global.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve({})
    }))
  })

  afterEach(() => {
    global.fetch.mockClear()
  })

  it('should match the snapshot', () => {
    expect(login).toMatchSnapshot()
  })

  it('should display error when address is invalid', () => {
    const form = login.find('form').first()
    form.find('input').first().simulate('change', {
      target: {
        value: ''
      }
    })
    form.simulate('submit')
    expect(form.text()).toContain('field must be provided')
  })

  it('should authenticate on click', () => {
    const form = login.find('form').first()
    form.find('input').first().simulate('change', {
      target: {
        value: 'Alice'
      }
    })
    form.simulate('submit')
    expect(login.context().user).toEqual('Alice')

    setUser.mockClear()
  })
})