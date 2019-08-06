/** @jsx jsx */
import React, {
  useState,
  useRef,
  useEffect,
  useContext
} from 'react'
import PropTypes from 'prop-types'
import * as d3 from 'd3'
import { css, jsx } from '@emotion/core'
import { UserContext } from '../App'

// window size hook
const useWindowSize = () => {
  const getSize = () => {
    return {
      width: window.innerWidth,
      height: window.innerHeight
    }
  }
  const [windowSize, setWindowSize] = useState(getSize)

  useEffect(() => {
    const handleResize = () => {
      setWindowSize(getSize())
    }

    // set window dimensions on size event
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return windowSize
}

const History = ({ transactions }) => {
  const ref = useRef(null)
  const windowSize = useWindowSize()
  const user = useContext(UserContext)

  useEffect(() => {
    const drawChart = () => {
      const pointsColor = '#EF7293'
      const tooltipColor = '#e6e6e6'

      // create graph container
      const svg = d3.select(ref.current)
          .append('svg')
          .attr('width', ref.current.clientWidth)
          .attr('height', ref.current.clientHeight)
          .style('border', '1px solid lightgrey')
          .append('g')
          .attr("transform", "translate(30, 30)")

      const xScale = d3.scaleTime()
          .domain(d3.extent(transactions, (d) => new Date(d.timestamp)))
          .range([0, ref.current.clientWidth - 60])

      const yScale = d3.scaleLinear()
          .domain([0, d3.max(transactions, (d) => d.balance) * 1.33])
          .range([ref.current.clientHeight - 60, 0])

      // x axis
      svg.append('g')
          .attr('transform', `translate(0, ${ref.current.clientHeight - 60})`)
          .call(d3.axisBottom(xScale))

      // y axis
      svg.append('g')
          .call(d3.axisLeft(yScale))

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
          .style('background', tooltipColor)
          .style('opacity', 0)
          .style('left', 0)
          .style('top', 0)

      // add data points
      svg.selectAll('circle')
          .data(transactions)
          .enter()
          .append('circle')
          .attr('cx', d => xScale(new Date(d.timestamp)))
          .attr('cy', d => yScale(d.balance))
          .attr('r', 4)
          .style('fill', pointsColor)
          .style('stroke', 'black')
          .style('stroke-width', 1)
          .on('mouseover', (d) => {
            div.transition()
                .duration(500)
                .style('opacity', 0.9)
            div.html(`${d.fromAddress ? d.fromAddress === user
                ? '- ' + d.amount + '<br/>To: ' + d.toAddress
                : '+ ' + d.amount + '<br/>From ' + d.fromAddress : d.amount + '<br/>initial'}`)
                .style('left', (d3.event.pageX - 30) + "px")
                .style('top', (d3.event.pageY - 45) + "px")
          })
          .on('mouseout', () => {
            div.transition()
                .duration(500)
                .style('opacity', 0)
          })
    }
    drawChart()

    return () => {
      d3.selectAll('svg').remove()
      d3.selectAll('div.tooltip').remove()
    }
  }, [windowSize, transactions])

  return (
    <div css={css`width: 100%;`} ref={ref}/>
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