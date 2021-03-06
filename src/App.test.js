import React from 'react'
import { shallow } from 'enzyme'
import App from './App'

describe('App', () => {
  it('should match the snapshot', () => {
    const app = shallow(
      <App />,
    )
    expect(app).toMatchSnapshot()
  })

  it('should render login when not authenticated', () => {
    throw new Error('to do')
  })

  it('should sign out user', () => {
    throw new Error('to do')
  })
})