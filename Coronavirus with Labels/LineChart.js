import React, {
  useCallback,
  useState,
  useMemo,
} from 'react';
import {
  scaleTime,
  scaleLog,
  timeFormat,
  extent,
  max,
  line,
  format,
} from 'd3';
import { XAxis } from './XAxis';
import { YAxis } from './YAxis';
import { VoronoiOverlay } from './VoronoiOverlay';

const xValue = (d) => d.date;
const yValue = (d) => d.deathTotal;

const margin = { top: 40, right: 40, bottom: 30, left: 60 };

const formatDate = timeFormat('%b %d, %Y');
const formatComma = format(',');

const Tooltip = ({ activeRow, className }) => (
  <text
    className={className}
    x={-10}
    y={-10}
    text-anchor={'end'}
  >
    {activeRow.countryName}:
    {formatComma(activeRow.deathTotal)} death
    {activeRow.deathTotal > 1 ? 's' : ''} as of{' '}
    {formatDate(activeRow.date)}
  </text>
);

export const LineChart = ({ data, width, height }) => {
  const [activeRow, setActiveRow] = useState();

  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const allData = useMemo(
    () =>
      data.reduce(
        (accumulator, countryTimeSeries) =>
          accumulator.concat(countryTimeSeries),
        []
      ),
    [data]
  );

  const epsilon = 1;

  const xScale = useMemo(
    () =>
      scaleTime()
        .domain(extent(allData, xValue))
        .range([0, innerWidth]),
    [allData, xValue]
  );

  const yScale = useMemo(
    () =>
      scaleLog()
        .domain([epsilon, max(allData, yValue)])
        .range([innerHeight, 0]),
    [epsilon, allData, yValue]
  );

  const lineGenerator = useMemo(
    () =>
      line()
        .x((d) => xScale(xValue(d)))
        .y((d) => yScale(epsilon + yValue(d))),
    [xScale, xValue, yScale, yValue, epsilon]
  );

  const mostRecentDate = xScale.domain()[1];

  const handleVoronoiHover = useCallback(setActiveRow, []);

  console.log(activeRow);

  return (
    <svg width={width} height={height}>
      <g
        transform={`translate(${margin.left},${margin.top})`}
      >
        <XAxis xScale={xScale} innerHeight={innerHeight} />
        <YAxis yScale={yScale} innerWidth={innerWidth} />
        {data.map((countryTimeseries) => {
          return (
            <path
              className="marker-line"
              d={lineGenerator(countryTimeseries)}
            />
          );
        })}
        {activeRow ? (
          <>
            <path
              className="marker-line active"
              d={lineGenerator(
                data.find(
                  (countryTimeseries) =>
                    countryTimeseries.countryName ===
                    activeRow.countryName
                )
              )}
            />
            <g
              transform={`translate(${lineGenerator.x()(
                activeRow
              )},${lineGenerator.y()(activeRow)})`}
            >
              <circle r={10} />
              <Tooltip
                activeRow={activeRow}
                className="tooltip-stroke"
              />
              <Tooltip
                activeRow={activeRow}
                className="tooltip"
              />
            </g>
          </>
        ) : null}

        <text
          className="title"
          transform={`translate(0, -10)`}
        >
          Coronavirus Global Deaths Over Time
        </text>
        <text
          className="axis-label"
          transform={`translate(-30,${
            innerHeight / 2
          }) rotate(-90)`}
          text-anchor="middle"
        >
          Cumulative Deaths
        </text>
        <VoronoiOverlay
          margin={margin}
          onHover={handleVoronoiHover}
          innerHeight={innerHeight}
          innerWidth={innerWidth}
          allData={allData}
          lineGenerator={lineGenerator}
          xScale={xScale}
          xValue={xValue}
          yScale={yScale}
          yValue={yValue}
        />
      </g>
    </svg>
  );
};
