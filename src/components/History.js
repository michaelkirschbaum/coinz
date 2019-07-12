/** @jsx jsx */
import React, { useRef, useEffect, useContext } from 'react'
import * as d3 from 'd3'
import { UserContext } from '../App'
import PropTypes from 'prop-types'
import { css, jsx } from '@emotion/core'

const History = ({ transactions }) => {
  const ref = useRef(null)
  useEffect(() => {
    if (transactions) {
      // clear previous
      d3.selectAll("svg > *").remove();

      drawChart()
    }
  })
  const user = useContext(UserContext)

  const drawChart = () => {
    const xScale = d3.scaleTime()
      .domain(d3.extent(transactions, (d) => new Date(d.timestamp)))
      .range([0, 835.422])

    const yScale = d3.scaleLinear()
      .domain([0, 100])
      .range([441, 0])

    // create graph container
    const svg = d3.select(ref.current)
      .append('g')
      .attr("transform", "translate(" + 20 + "," + 20 + ")");

    // x axis
    svg.append('g')
      .attr('transform', `translate(0, 441)`)
      .call(d3.axisBottom(xScale))

    // y axis
    svg.append('g')
      .call(d3.axisLeft(yScale))

    // add balance to data
    let balance = 0
    transactions.map((entry) => {
      if (entry.toAddress === user)
        balance += parseFloat(entry.amount)
      else
        balance -= parseFloat(entry.amount)

      entry.balance = balance
    })

    // generate line
    const line = d3.line()
      .x(d => xScale(new Date(d.timestamp)))
      .y(d => yScale(d.balance))

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
      .attr('cy', d => yScale(d.balance))
      .attr('r', 4)
      .style('fill', '#EF7293')
      .style('stroke', 'black')
      .style('stroke-width', 1)
  }

  return (
    <svg
      css={css`
        height: 100vh;
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