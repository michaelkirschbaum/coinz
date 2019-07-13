import React, { useRef, useEffect, useContext } from 'react'
import * as d3 from 'd3'
import { UserContext } from '../App'
import PropTypes from 'prop-types'

const History = ({ transactions }) => {
  const ref = useRef(null)
  useEffect(() => {
    if (transactions) drawChart()

    return function cleanup() {
      d3.selectAll('svg').remove()
      d3.selectAll('div.tooltip').remove()
    }
  })
  const user = useContext(UserContext)

  const drawChart = () => {
    // create graph container
    const svg = d3.select(ref.current)
      .append('svg')
      .attr('width', 800)
      .attr('height', 500)
      .style('border', '1px solid lightgrey')
      .append('g')
      .attr("transform", "translate(" + 20 + "," + 20 + ")");

    const xScale = d3.scaleTime()
        .domain(d3.extent(transactions, (d) => new Date(d.timestamp)))
        .range([0, ref.current.clientWidth - 45])

    const yScale = d3.scaleLinear()
        .domain([0, 100])
        .range([ref.current.clientHeight - 45, 0])

    // x axis
    svg.append('g')
      .attr('transform', `translate(0, ${ref.current.clientHeight - 45})`)
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

    // tooltip
    const div = d3.select('body')
      .append('div')
      .attr('class', 'tooltip')
      .style('position', 'absolute')
      .style('text-align', 'center')
      .style('min-width', '60px')
      .style('height', '30px')
      .style('font', '10px sans-serif')
      .style('border-radius', '8px')
      .style('padding', '2px')
      .style('background', '#e6e6e6')

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
      .on('mouseover', (d) => {
        div.transition()
          .duration(500)
          .style('opacity', 0.9)
        div.html(`${d.fromAddress ? d.fromAddress === user 
            ? '- ' + d.amount + '<br/>To: ' + d.toAddress 
            : '+ ' + d.amount + '<br/>From ' + d.fromAddress : d.amount + '<br/>initial'}`)
          .style("left", (d3.event.pageX - 30) + "px")
          .style("top", (d3.event.pageY - 45) + "px");
      })
      .on('mouseout', () => {
        div.transition()
          .duration(500)
          .style('opacity', 0)
      })
  }

  return (
    <div ref={ref} />
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