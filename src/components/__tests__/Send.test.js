import React from 'react'
import { mount } from 'enzyme/build'
import Send from 'components/Send'

describe('Send', () => {
  let send
  beforeEach(() => {
    send = mount(
      <Send/ >,
    )
    global.fetch = jest.fn()
    window.alert = jest.fn()
  })

  afterEach(() => {
    global.fetch.mockClear()
  })

  it('should match the snapshot', () => {
    expect(send).toMatchSnapshot()
  })

  it('should display error if send address is invalid', () => {
    const form = send.find('form').first()
    form.find('input').first().simulate('change', {
      target: {
        value: ''
      }
    })
    form.find('input').at(1).simulate('change', {
      target: {
        value: '10'
      }
    })
    form.simulate('submit')
    expect(form.text()).toContain('field must be provided')

    // form should not be submitted
    expect(window.alert).toHaveBeenCalled()
    expect(global.fetch).toHaveBeenCalledTimes(0)
  })

  it('should display error if jobcoin amount is invalid', () => {
    const form = send.find('form').first()
    form.find('input').first().simulate('change', {
      target: {
        value: 'fakeAddress'
      }
    })
    form.find('input').at(1).simulate('change', {
      target: {
        value: ''
      }
    })
    form.simulate('submit')
    expect(form.text()).toContain('field must be provided')

    form.find('input').at(1).simulate('change', {
      target: {
        value: 'string'
      }
    })
    form.simulate('submit')
    expect(form.text()).toContain('amount is not valid')

    form.find('input').at(1).simulate('change', {
      target: {
        value: '-10.00'
      }
    })
    form.simulate('submit')
    expect(form.text()).toContain('amount is not valid')

    // form should not be submitted
    expect(window.alert).toHaveBeenCalled()
    expect(global.fetch).toHaveBeenCalledTimes(0);
  })

  it('should throw error if insufficient funds for amount', () => {
    global.fetch = jest.fn().mockImplementationOnce(() => Promise.resolve({
      json: () => Promise.resolve({ error: "Insufficient Funds" })
    }))

    const form = send.find('form').first()
    form.find('input').first().simulate('change', {
      target: {
        value: 'Bob'
      }
    })
    form.find('input').at(1).simulate('change', {
      target: {
        value: '1000000'
      }
    })
    form.simulate('submit')

    // calls endpoint with correct data
    const api_url = '/api/transactions'
    const options = {
      method: 'POST',
      body: JSON.stringify({
        fromAddress: 'Alice',
        toAddress: 'Bob',
        amount: '1000000',
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }
    expect(global.fetch).toHaveBeenCalledWith(api_url, options)
    process.nextTick(() => expect(window.alert).toHaveBeenCalled())
  })

  it('show success when submitted', () => {
    global.fetch = jest.fn().mockImplementationOnce(() => Promise.resolve({
      json: () => Promise.resolve({ status: "OK" })
    }))

    const form = send.find('form').first()
    form.find({name: 'address'}).simulate('change', {
      target: {
        value: 'Bob'
      }
    })
    form.find({name: 'amount'}).simulate('change', {
      target: {
        value: '10'
      }
    })
    form.simulate('submit')

    // calls endpoint with correct data
    const api_url = '/api/transactions'
    const options = {
      method: 'POST',
      body: JSON.stringify({
        fromAddress: 'Alice',
        toAddress: 'Bob',
        amount: '10',
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }
    expect(global.fetch).toHaveBeenCalledWith(api_url, options)
    process.nextTick(() => expect(window.alert).toHaveBeenCalled())
  })
})
