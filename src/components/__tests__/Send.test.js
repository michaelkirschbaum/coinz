import React from 'react'
import {shallow} from 'enzyme/build';
import Send from 'components/Send';

describe('Send', () => {
  it('should match the snapshot', () => {
    const send = shallow(
      <Send />,
    )
    expect(send).toMatchSnapshot()
  })
})