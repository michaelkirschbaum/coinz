import React from 'react'
import { shallow } from 'enzyme'
import Header from 'components/Header'

describe('Header', () => {
  it('should match the snapshot', () => {
    const header = shallow(
      <Header />,
    )
    expect(header).toMatchSnapshot()
  })

  it('should render account address', () => {
    expect(false).toBe(true)
  })

  it('should display whether user is signed in', () => {
    expect(false).toBe(true)
  })

  it('should sign out user when clicked', () => {
    expect(false).toBe(true)
  })
})