import React from 'react'
import { shallow } from 'enzyme'
import Account from './Account'

describe('Account', () => {
  it('should match the snapshot', () => {
    const account = shallow(
      <Account />,
    )

    expect(account).toMatchSnapshot()
  })
})