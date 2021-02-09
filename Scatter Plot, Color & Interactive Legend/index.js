import React, { useState, useCallback, useEffect } from 'react';
import ReactDOM from 'react-dom';
import {
  csv,
  scaleOrdinal,
  scaleLinear,
  max,
  format,
  tooltip,
  extent,
} from 'd3';
import { useData } from './useData';
import { AxisBottom } from './AxisBottom';
import { AxisLeft } from './AxisLeft';
import { Marks } from './Marks';
import { ColorLegend } from './ColorLegend';

const width = 960;
const height = 500;
const margin = { top: 20, right: 180, bottom: 70, left: 90 };
const xAxisLabelOffset = 50;
const yAxisLabelOffset = 40;
const fadeOpacity = 0.2;

const App = () => {
  const data = useData();
  const [hoveredValue, setHoveredValue] = useState(null);
  console.log(hoveredValue);

  if (!data) {
    return <pre>Loading...</pre>;
  }

  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  const xValue = (d) => d.petal_length;
  const xAxisLabel = 'Petal Length';
  const yValue = (d) => d.sepal_width;
  const yAxisLabel = 'Sepal Width';

  const colorValue = (d) => d.species;
  const colorLegendLabel = 'Species';

  const filteredData = data.filter((d) => hoveredValue === colorValue(d));

  const circleRadius = 7;

  const siFormat = format('.2s');
  const xAxisTickFormat = (tickValue) => siFormat(tickValue).replace('G', 'B');

  const xScale = scaleLinear()
    .domain(extent(data, xValue))
    .range([0, innerWidth])
    .nice();

  const yScale = scaleLinear()
    .domain(extent(data, yValue))
    .range([0, innerHeight]);

  const colorScale = scaleOrdinal()
    .domain(data.map(colorValue))
    .range(['#E6842A', '#137B80', '#8E6C8A']);

  console.log(colorScale.range());

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left},${margin.top})`}>
        <AxisBottom
          xScale={xScale}
          innerHeight={innerHeight}
          tickFormat={xAxisTickFormat}
          tickOffset={5}
        />
        <text
          className="axis-label"
          textAnchor="middle"
          transform={`translate(${-yAxisLabelOffset}, 
          ${innerHeight / 2}) rotate(-90)`}
        >
          {yAxisLabel}
        </text>
        <AxisLeft yScale={yScale} innerWidth={innerWidth} tickOffset={5} />
        <text
          className="axis-label"
          x={innerWidth / 2}
          y={innerHeight + xAxisLabelOffset}
          textAnchor="middle"
        >
          {xAxisLabel}
        </text>
        <g transform={`translate(${innerWidth + 60}, 60)`}>
          <text x={35} y={-25} className="axis-label" textAnchor="middle">
            {colorLegendLabel}
          </text>
          <g>
            <ColorLegend
              tickSpacing={25}
              tickSize={10}
              tickTextOffset={20}
              tickSize={circleRadius}
              colorScale={colorScale}
              onHover={setHoveredValue}
              hoveredValue={hoveredValue}
              fadeOpacity={fadeOpacity}
            />
          </g>
          <ColorLegend
            tickSpacing={25}
            tickSize={10}
            tickTextOffset={20}
            tickSize={circleRadius}
            colorScale={colorScale}
            onHover={setHoveredValue}
          />
        </g>
        <g opacity={hoveredValue ? fadeOpacity : 1}>
          <Marks
            data={data}
            xScale={xScale}
            yScale={yScale}
            xValue={xValue}
            yValue={yValue}
            colorScale={colorScale}
            colorValue={colorValue}
            tooltipFormat={xAxisTickFormat}
            circleRadius={circleRadius}
          />
        </g>
        <Marks
          data={filteredData}
          xScale={xScale}
          yScale={yScale}
          xValue={xValue}
          yValue={yValue}
          colorScale={colorScale}
          colorValue={colorValue}
          tooltipFormat={xAxisTickFormat}
          circleRadius={circleRadius}
        />
      </g>
    </svg>
  );
};
const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);

// for doing arcs
//(data).map((d, i) => (
//        <path fill={d['RGB hex value']} d={pieArc({
//              startAngle: i / data.length * 2 * Math.PI,
//  					  endAngle: (i+1) / data.length * 2 * Math.PI
//            })}/>
