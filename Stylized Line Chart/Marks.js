import { line, curveNatural } from 'd3';
export const Marks = ({
  data,
  xScale,
  yScale,
  xValue,
  yValue,
  tooltipFormat,
  circleRadius,
}) => (
  <g className="marks">
    <path
      fill="none"
      stroke="black"
      d={line()
        .x((d) => xScale(xValue(d)))
        .curve(curveNatural)
        .y((d) => yScale(yValue(d)))(data)
        }
    />
    {
     // data.map((d) => (
     // <circle cx={xScale(xValue(d))} cy={yScale(yValue(d))} r={circleRadius}>
     //  <title>{tooltipFormat(xValue(d))}</title>
     // </circle>))
    } 
  </g>
);
