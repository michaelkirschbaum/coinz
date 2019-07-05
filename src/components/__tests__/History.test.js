import React from 'react'
import {shallow} from 'enzyme/build';
import History from 'components/History';

describe('History', () => {
  it('should match the snapshot', () => {
    const history = shallow(
      <History />,
    )
    expect(history).toMatchSnapshot()
  })
})