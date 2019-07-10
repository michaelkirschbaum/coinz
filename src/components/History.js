/** @jsx jsx */
import React, { Component } from 'react'
import { css, jsx } from '@emotion/core'
import * as d3 from 'd3'

class History extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  componentDidMount() {
    this.drawChart()
  }

  drawChart() {
    const svg = d3.select('body')
  }

  render() {
    return (
      <div css={css`
        height: 100vh;
        width: 100%;
        border: 1px solid lightgrey;
      `}></div>
    )
  }
}

export default History