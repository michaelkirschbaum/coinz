/** @jsx jsx */
import React, { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import { css, jsx } from '@emotion/core'
import * as d3 from 'd3'

const History = ({ transactions }) => {
  const ref = useRef(null)
  useEffect(() => {
    if (transactions) drawChart()
  })

  const drawChart = () => {
    const xScale = d3.scaleTime()
      .domain(d3.extent(transactions, (d) => new Date(d.timestamp)))
      .range([0, 600])

    const yScale = d3.scaleLinear()
      .domain([0, 100])
      .range([300, 0])

    // create graph container
    const svg = d3.select(ref.current)
      .append('g')
      .attr("transform", "translate(" + 20 + "," + 20 + ")");

    // x axis
    svg.append('g')
      .attr('transform', `translate(0, 300)`)
      .call(d3.axisBottom(xScale))

    // y axis
    svg.append('g')
      .call(d3.axisLeft(yScale))

    // generate line
    const line = d3.line()
      .x(d => xScale(new Date(d.timestamp)))
      .y(d => yScale(d.amount))

    // bind data
    svg.append('path')
      .datum(transactions)
      .style('stroke','black')
      .style('stroke-width', 1)
      .style('fill', 'none')
      .attr('d', line)

    // add data points
    svg.selectAll('circle')
      .data(transactions)
      .enter()
      .append('circle')
      .attr('cx', d => xScale(new Date(d.timestamp)))
      .attr('cy', d => yScale(d.amount))
      .attr('r', 4)
      .style('fill', '#EF7293')
      .style('stroke', 'black')
      .style('stroke-width', 1)
  }

  return (
    <svg
      css={css`
        height: 450px;
        width: 100%;
        border: 1px solid lightgrey;
      `}
      ref={ref}
    />
  )
}

History.propTypes = {
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      timestamp: PropTypes.string,
      toAddress: PropTypes.string,
      fromAddress: PropTypes.string,
      amount: PropTypes.string,
    })
  )
}

export default History