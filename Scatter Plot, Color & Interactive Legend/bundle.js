(function (React$1, ReactDOM, d3) {
  'use strict';

  var React$1__default = 'default' in React$1 ? React$1['default'] : React$1;
  ReactDOM = ReactDOM && Object.prototype.hasOwnProperty.call(ReactDOM, 'default') ? ReactDOM['default'] : ReactDOM;

  const csvUrl =
    'https://gist.githubusercontent.com/curran/a08a1080b88344b0c8a7/raw/639388c2cbc2120a14dcf466e85730eb8be498bb/iris.csv';

  const useData = () => {
    const [data, setData] = React$1.useState(null);

    React$1.useEffect(() => {
      const row = (d) => {
        d.sepal_length = +d.sepal_length;
        d.sepal_width = +d.sepal_width;
        d.petal_length = +d.petal_length;
        d.petal_width = +d.petal_width;
        return d;
      };
      d3.csv(csvUrl, row).then(setData);
    }, []);

    return data;
  };

  const AxisBottom = ({ xScale, innerHeight, tickFormat, tickOffset = 3 }) =>
    xScale.ticks().map(tickValue => (
      React.createElement( 'g', {
        className: "tick", key: tickValue, transform: `translate(${xScale(tickValue)},0)` },
        React.createElement( 'line', { y2: innerHeight }),
        React.createElement( 'text', { style: { textAnchor: 'middle' }, dy: ".71em", y: innerHeight + tickOffset },
          tickFormat(tickValue)
        )
      )
    ));

  const AxisLeft = ({ yScale, innerWidth, tickValue, tickOffset = 3 }) =>
    yScale.ticks().map((tickValue) => (
      React.createElement( 'g', { className: "tick", transform: `translate(0,${yScale(tickValue)})` },
        React.createElement( 'line', { x2: innerWidth }),
        React.createElement( 'text', {
          key: tickValue, style: { textAnchor: 'end' }, x: -tickOffset, dy: ".32em" },
          tickValue
        )
      )
    ));

  const Marks = ({
    data,
    xScale,
    yScale,
    xValue,
    yValue,
    colorScale,
    colorValue,
    tooltipFormat,
    circleRadius
  }) =>
    data.map((d) => (
      React.createElement( 'circle', {
        className: "mark", cx: xScale(xValue(d)), cy: yScale(yValue(d)), fill: colorScale(colorValue(d)), r: circleRadius },
        React.createElement( 'title', null, tooltipFormat(xValue(d)) )
      )
    ));

  const ColorLegend = ({
    colorScale,
    tickSpacing = 20,
    tickSize = 10,
    tickTextOffset = 20,
    onHover,
    hoveredValue,
    fadeOpacity
  }) =>
    colorScale.domain().map((domainValue, i) => (
      React.createElement( 'g', {
        className: "tick", transform: `translate(0,${i * tickSpacing})`, onMouseEnter: () => { onHover(domainValue); }, onMouseOut: () => { onHover(null); }, opacity: hoveredValue && domainValue !== hoveredValue ? fadeOpacity : 1 },
        React.createElement( 'circle', { fill: colorScale(domainValue), r: tickSize }),
        React.createElement( 'text', { x: tickTextOffset, dy: ".32em" },
          domainValue
        )
      )
    ));

  const width = 960;
  const height = 500;
  const margin = { top: 20, right: 180, bottom: 70, left: 90 };
  const xAxisLabelOffset = 50;
  const yAxisLabelOffset = 40;
  const fadeOpacity = 0.2;

  const App = () => {
    const data = useData();
    const [hoveredValue, setHoveredValue] = React$1.useState(null);
    console.log(hoveredValue);

    if (!data) {
      return React$1__default.createElement( 'pre', null, "Loading..." );
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

    const siFormat = d3.format('.2s');
    const xAxisTickFormat = (tickValue) => siFormat(tickValue).replace('G', 'B');

    const xScale = d3.scaleLinear()
      .domain(d3.extent(data, xValue))
      .range([0, innerWidth])
      .nice();

    const yScale = d3.scaleLinear()
      .domain(d3.extent(data, yValue))
      .range([0, innerHeight]);

    const colorScale = d3.scaleOrdinal()
      .domain(data.map(colorValue))
      .range(['#E6842A', '#137B80', '#8E6C8A']);

    console.log(colorScale.range());

    return (
      React$1__default.createElement( 'svg', { width: width, height: height },
        React$1__default.createElement( 'g', { transform: `translate(${margin.left},${margin.top})` },
          React$1__default.createElement( AxisBottom, {
            xScale: xScale, innerHeight: innerHeight, tickFormat: xAxisTickFormat, tickOffset: 5 }),
          React$1__default.createElement( 'text', {
            className: "axis-label", textAnchor: "middle", transform: `translate(${-yAxisLabelOffset}, 
          ${innerHeight / 2}) rotate(-90)` },
            yAxisLabel
          ),
          React$1__default.createElement( AxisLeft, { yScale: yScale, innerWidth: innerWidth, tickOffset: 5 }),
          React$1__default.createElement( 'text', {
            className: "axis-label", x: innerWidth / 2, y: innerHeight + xAxisLabelOffset, textAnchor: "middle" },
            xAxisLabel
          ),
          React$1__default.createElement( 'g', { transform: `translate(${innerWidth + 60}, 60)` },
            React$1__default.createElement( 'text', { x: 35, y: -25, className: "axis-label", textAnchor: "middle" },
              colorLegendLabel
            ),
            React$1__default.createElement( 'g', null,
              React$1__default.createElement( ColorLegend, {
                tickSpacing: 25, tickSize: 10, tickTextOffset: 20, tickSize: circleRadius, colorScale: colorScale, onHover: setHoveredValue, hoveredValue: hoveredValue, fadeOpacity: fadeOpacity })
            ),
            React$1__default.createElement( ColorLegend, {
              tickSpacing: 25, tickSize: 10, tickTextOffset: 20, tickSize: circleRadius, colorScale: colorScale, onHover: setHoveredValue })
          ),
          React$1__default.createElement( 'g', { opacity: hoveredValue ? fadeOpacity : 1 },
            React$1__default.createElement( Marks, {
              data: data, xScale: xScale, yScale: yScale, xValue: xValue, yValue: yValue, colorScale: colorScale, colorValue: colorValue, tooltipFormat: xAxisTickFormat, circleRadius: circleRadius })
          ),
          React$1__default.createElement( Marks, {
            data: filteredData, xScale: xScale, yScale: yScale, xValue: xValue, yValue: yValue, colorScale: colorScale, colorValue: colorValue, tooltipFormat: xAxisTickFormat, circleRadius: circleRadius })
        )
      )
    );
  };
  const rootElement = document.getElementById('root');
  ReactDOM.render(React$1__default.createElement( App, null ), rootElement);

  // for doing arcs
  //(data).map((d, i) => (
  //        <path fill={d['RGB hex value']} d={pieArc({
  //              startAngle: i / data.length * 2 * Math.PI,
  //  					  endAngle: (i+1) / data.length * 2 * Math.PI
  //            })}/>

}(React, ReactDOM, d3));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbInVzZURhdGEuanMiLCJBeGlzQm90dG9tLmpzIiwiQXhpc0xlZnQuanMiLCJNYXJrcy5qcyIsIkNvbG9yTGVnZW5kLmpzIiwiaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjc3YgfSBmcm9tICdkMyc7XG5jb25zdCBjc3ZVcmwgPVxuICAnaHR0cHM6Ly9naXN0LmdpdGh1YnVzZXJjb250ZW50LmNvbS9jdXJyYW4vYTA4YTEwODBiODgzNDRiMGM4YTcvcmF3LzYzOTM4OGMyY2JjMjEyMGExNGRjZjQ2NmU4NTczMGViOGJlNDk4YmIvaXJpcy5jc3YnO1xuXG5leHBvcnQgY29uc3QgdXNlRGF0YSA9ICgpID0+IHtcbiAgY29uc3QgW2RhdGEsIHNldERhdGFdID0gdXNlU3RhdGUobnVsbCk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCByb3cgPSAoZCkgPT4ge1xuICAgICAgZC5zZXBhbF9sZW5ndGggPSArZC5zZXBhbF9sZW5ndGg7XG4gICAgICBkLnNlcGFsX3dpZHRoID0gK2Quc2VwYWxfd2lkdGg7XG4gICAgICBkLnBldGFsX2xlbmd0aCA9ICtkLnBldGFsX2xlbmd0aDtcbiAgICAgIGQucGV0YWxfd2lkdGggPSArZC5wZXRhbF93aWR0aDtcbiAgICAgIHJldHVybiBkO1xuICAgIH07XG4gICAgY3N2KGNzdlVybCwgcm93KS50aGVuKHNldERhdGEpO1xuICB9LCBbXSk7XG5cbiAgcmV0dXJuIGRhdGE7XG59O1xuIiwiZXhwb3J0IGNvbnN0IEF4aXNCb3R0b20gPSAoeyB4U2NhbGUsIGlubmVySGVpZ2h0LCB0aWNrRm9ybWF0LCB0aWNrT2Zmc2V0ID0gMyB9KSA9PlxuICB4U2NhbGUudGlja3MoKS5tYXAodGlja1ZhbHVlID0+IChcbiAgICA8Z1xuICAgICAgY2xhc3NOYW1lPVwidGlja1wiXG4gICAgICBrZXk9e3RpY2tWYWx1ZX1cbiAgICAgIHRyYW5zZm9ybT17YHRyYW5zbGF0ZSgke3hTY2FsZSh0aWNrVmFsdWUpfSwwKWB9XG4gICAgPlxuICAgICAgPGxpbmUgeTI9e2lubmVySGVpZ2h0fSAvPlxuICAgICAgPHRleHQgc3R5bGU9e3sgdGV4dEFuY2hvcjogJ21pZGRsZScgfX0gZHk9XCIuNzFlbVwiIHk9e2lubmVySGVpZ2h0ICsgdGlja09mZnNldH0+XG4gICAgICAgIHt0aWNrRm9ybWF0KHRpY2tWYWx1ZSl9XG4gICAgICA8L3RleHQ+XG4gICAgPC9nPlxuICApKTtcbiIsImV4cG9ydCBjb25zdCBBeGlzTGVmdCA9ICh7IHlTY2FsZSwgaW5uZXJXaWR0aCwgdGlja1ZhbHVlLCB0aWNrT2Zmc2V0ID0gMyB9KSA9PlxuICB5U2NhbGUudGlja3MoKS5tYXAoKHRpY2tWYWx1ZSkgPT4gKFxuICAgIDxnIGNsYXNzTmFtZT1cInRpY2tcIiB0cmFuc2Zvcm09e2B0cmFuc2xhdGUoMCwke3lTY2FsZSh0aWNrVmFsdWUpfSlgfT5cbiAgICAgIDxsaW5lIHgyPXtpbm5lcldpZHRofSAvPlxuICAgICAgPHRleHRcbiAgICAgICAga2V5PXt0aWNrVmFsdWV9XG4gICAgICAgIHN0eWxlPXt7IHRleHRBbmNob3I6ICdlbmQnIH19XG4gICAgICAgIHg9ey10aWNrT2Zmc2V0fVxuICAgICAgICBkeT1cIi4zMmVtXCJcbiAgICAgID5cbiAgICAgICAge3RpY2tWYWx1ZX1cbiAgICAgIDwvdGV4dD5cbiAgICA8L2c+XG4gICkpO1xuIiwiZXhwb3J0IGNvbnN0IE1hcmtzID0gKHtcbiAgZGF0YSxcbiAgeFNjYWxlLFxuICB5U2NhbGUsXG4gIHhWYWx1ZSxcbiAgeVZhbHVlLFxuICBjb2xvclNjYWxlLFxuICBjb2xvclZhbHVlLFxuICB0b29sdGlwRm9ybWF0LFxuICBjaXJjbGVSYWRpdXNcbn0pID0+XG4gIGRhdGEubWFwKChkKSA9PiAoXG4gICAgPGNpcmNsZVxuICAgICAgY2xhc3NOYW1lPVwibWFya1wiXG4gICAgICBjeD17eFNjYWxlKHhWYWx1ZShkKSl9XG4gICAgICBjeT17eVNjYWxlKHlWYWx1ZShkKSl9XG4gICAgICBmaWxsPXtjb2xvclNjYWxlKGNvbG9yVmFsdWUoZCkpfVxuICAgICAgcj17Y2lyY2xlUmFkaXVzfVxuICAgID5cbiAgICAgIDx0aXRsZT57dG9vbHRpcEZvcm1hdCh4VmFsdWUoZCkpfTwvdGl0bGU+XG4gICAgPC9jaXJjbGU+XG4gICkpO1xuIiwiZXhwb3J0IGNvbnN0IENvbG9yTGVnZW5kID0gKHtcbiAgY29sb3JTY2FsZSxcbiAgdGlja1NwYWNpbmcgPSAyMCxcbiAgdGlja1NpemUgPSAxMCxcbiAgdGlja1RleHRPZmZzZXQgPSAyMCxcbiAgb25Ib3ZlcixcbiAgaG92ZXJlZFZhbHVlLFxuICBmYWRlT3BhY2l0eVxufSkgPT5cbiAgY29sb3JTY2FsZS5kb21haW4oKS5tYXAoKGRvbWFpblZhbHVlLCBpKSA9PiAoXG4gICAgPGdcbiAgICAgIGNsYXNzTmFtZT1cInRpY2tcIlxuICAgICAgdHJhbnNmb3JtPXtgdHJhbnNsYXRlKDAsJHtpICogdGlja1NwYWNpbmd9KWB9XG4gICAgICBvbk1vdXNlRW50ZXI9eygpID0+IHsgb25Ib3Zlcihkb21haW5WYWx1ZSk7IH19XG4gICAgICBvbk1vdXNlT3V0PXsoKSA9PiB7IG9uSG92ZXIobnVsbCk7IH19XG4gICAgICBvcGFjaXR5PXtob3ZlcmVkVmFsdWUgJiYgZG9tYWluVmFsdWUgIT09IGhvdmVyZWRWYWx1ZSA/IGZhZGVPcGFjaXR5IDogMSB9XG4gICAgPlxuICAgICAgPGNpcmNsZSBmaWxsPXtjb2xvclNjYWxlKGRvbWFpblZhbHVlKX0gcj17dGlja1NpemV9IC8+XG4gICAgICA8dGV4dCB4PXt0aWNrVGV4dE9mZnNldH0gZHk9XCIuMzJlbVwiPlxuICAgICAgICB7ZG9tYWluVmFsdWV9XG4gICAgICA8L3RleHQ+XG4gICAgPC9nPlxuICApKTtcbiIsImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSwgdXNlQ2FsbGJhY2ssIHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xuaW1wb3J0IHtcbiAgY3N2LFxuICBzY2FsZU9yZGluYWwsXG4gIHNjYWxlTGluZWFyLFxuICBtYXgsXG4gIGZvcm1hdCxcbiAgdG9vbHRpcCxcbiAgZXh0ZW50LFxufSBmcm9tICdkMyc7XG5pbXBvcnQgeyB1c2VEYXRhIH0gZnJvbSAnLi91c2VEYXRhJztcbmltcG9ydCB7IEF4aXNCb3R0b20gfSBmcm9tICcuL0F4aXNCb3R0b20nO1xuaW1wb3J0IHsgQXhpc0xlZnQgfSBmcm9tICcuL0F4aXNMZWZ0JztcbmltcG9ydCB7IE1hcmtzIH0gZnJvbSAnLi9NYXJrcyc7XG5pbXBvcnQgeyBDb2xvckxlZ2VuZCB9IGZyb20gJy4vQ29sb3JMZWdlbmQnO1xuXG5jb25zdCB3aWR0aCA9IDk2MDtcbmNvbnN0IGhlaWdodCA9IDUwMDtcbmNvbnN0IG1hcmdpbiA9IHsgdG9wOiAyMCwgcmlnaHQ6IDE4MCwgYm90dG9tOiA3MCwgbGVmdDogOTAgfTtcbmNvbnN0IHhBeGlzTGFiZWxPZmZzZXQgPSA1MDtcbmNvbnN0IHlBeGlzTGFiZWxPZmZzZXQgPSA0MDtcbmNvbnN0IGZhZGVPcGFjaXR5ID0gMC4yO1xuXG5jb25zdCBBcHAgPSAoKSA9PiB7XG4gIGNvbnN0IGRhdGEgPSB1c2VEYXRhKCk7XG4gIGNvbnN0IFtob3ZlcmVkVmFsdWUsIHNldEhvdmVyZWRWYWx1ZV0gPSB1c2VTdGF0ZShudWxsKTtcbiAgY29uc29sZS5sb2coaG92ZXJlZFZhbHVlKTtcblxuICBpZiAoIWRhdGEpIHtcbiAgICByZXR1cm4gPHByZT5Mb2FkaW5nLi4uPC9wcmU+O1xuICB9XG5cbiAgY29uc3QgaW5uZXJIZWlnaHQgPSBoZWlnaHQgLSBtYXJnaW4udG9wIC0gbWFyZ2luLmJvdHRvbTtcbiAgY29uc3QgaW5uZXJXaWR0aCA9IHdpZHRoIC0gbWFyZ2luLmxlZnQgLSBtYXJnaW4ucmlnaHQ7XG5cbiAgY29uc3QgeFZhbHVlID0gKGQpID0+IGQucGV0YWxfbGVuZ3RoO1xuICBjb25zdCB4QXhpc0xhYmVsID0gJ1BldGFsIExlbmd0aCc7XG4gIGNvbnN0IHlWYWx1ZSA9IChkKSA9PiBkLnNlcGFsX3dpZHRoO1xuICBjb25zdCB5QXhpc0xhYmVsID0gJ1NlcGFsIFdpZHRoJztcblxuICBjb25zdCBjb2xvclZhbHVlID0gKGQpID0+IGQuc3BlY2llcztcbiAgY29uc3QgY29sb3JMZWdlbmRMYWJlbCA9ICdTcGVjaWVzJztcblxuICBjb25zdCBmaWx0ZXJlZERhdGEgPSBkYXRhLmZpbHRlcigoZCkgPT4gaG92ZXJlZFZhbHVlID09PSBjb2xvclZhbHVlKGQpKTtcblxuICBjb25zdCBjaXJjbGVSYWRpdXMgPSA3O1xuXG4gIGNvbnN0IHNpRm9ybWF0ID0gZm9ybWF0KCcuMnMnKTtcbiAgY29uc3QgeEF4aXNUaWNrRm9ybWF0ID0gKHRpY2tWYWx1ZSkgPT4gc2lGb3JtYXQodGlja1ZhbHVlKS5yZXBsYWNlKCdHJywgJ0InKTtcblxuICBjb25zdCB4U2NhbGUgPSBzY2FsZUxpbmVhcigpXG4gICAgLmRvbWFpbihleHRlbnQoZGF0YSwgeFZhbHVlKSlcbiAgICAucmFuZ2UoWzAsIGlubmVyV2lkdGhdKVxuICAgIC5uaWNlKCk7XG5cbiAgY29uc3QgeVNjYWxlID0gc2NhbGVMaW5lYXIoKVxuICAgIC5kb21haW4oZXh0ZW50KGRhdGEsIHlWYWx1ZSkpXG4gICAgLnJhbmdlKFswLCBpbm5lckhlaWdodF0pO1xuXG4gIGNvbnN0IGNvbG9yU2NhbGUgPSBzY2FsZU9yZGluYWwoKVxuICAgIC5kb21haW4oZGF0YS5tYXAoY29sb3JWYWx1ZSkpXG4gICAgLnJhbmdlKFsnI0U2ODQyQScsICcjMTM3QjgwJywgJyM4RTZDOEEnXSk7XG5cbiAgY29uc29sZS5sb2coY29sb3JTY2FsZS5yYW5nZSgpKTtcblxuICByZXR1cm4gKFxuICAgIDxzdmcgd2lkdGg9e3dpZHRofSBoZWlnaHQ9e2hlaWdodH0+XG4gICAgICA8ZyB0cmFuc2Zvcm09e2B0cmFuc2xhdGUoJHttYXJnaW4ubGVmdH0sJHttYXJnaW4udG9wfSlgfT5cbiAgICAgICAgPEF4aXNCb3R0b21cbiAgICAgICAgICB4U2NhbGU9e3hTY2FsZX1cbiAgICAgICAgICBpbm5lckhlaWdodD17aW5uZXJIZWlnaHR9XG4gICAgICAgICAgdGlja0Zvcm1hdD17eEF4aXNUaWNrRm9ybWF0fVxuICAgICAgICAgIHRpY2tPZmZzZXQ9ezV9XG4gICAgICAgIC8+XG4gICAgICAgIDx0ZXh0XG4gICAgICAgICAgY2xhc3NOYW1lPVwiYXhpcy1sYWJlbFwiXG4gICAgICAgICAgdGV4dEFuY2hvcj1cIm1pZGRsZVwiXG4gICAgICAgICAgdHJhbnNmb3JtPXtgdHJhbnNsYXRlKCR7LXlBeGlzTGFiZWxPZmZzZXR9LCBcbiAgICAgICAgICAke2lubmVySGVpZ2h0IC8gMn0pIHJvdGF0ZSgtOTApYH1cbiAgICAgICAgPlxuICAgICAgICAgIHt5QXhpc0xhYmVsfVxuICAgICAgICA8L3RleHQ+XG4gICAgICAgIDxBeGlzTGVmdCB5U2NhbGU9e3lTY2FsZX0gaW5uZXJXaWR0aD17aW5uZXJXaWR0aH0gdGlja09mZnNldD17NX0gLz5cbiAgICAgICAgPHRleHRcbiAgICAgICAgICBjbGFzc05hbWU9XCJheGlzLWxhYmVsXCJcbiAgICAgICAgICB4PXtpbm5lcldpZHRoIC8gMn1cbiAgICAgICAgICB5PXtpbm5lckhlaWdodCArIHhBeGlzTGFiZWxPZmZzZXR9XG4gICAgICAgICAgdGV4dEFuY2hvcj1cIm1pZGRsZVwiXG4gICAgICAgID5cbiAgICAgICAgICB7eEF4aXNMYWJlbH1cbiAgICAgICAgPC90ZXh0PlxuICAgICAgICA8ZyB0cmFuc2Zvcm09e2B0cmFuc2xhdGUoJHtpbm5lcldpZHRoICsgNjB9LCA2MClgfT5cbiAgICAgICAgICA8dGV4dCB4PXszNX0geT17LTI1fSBjbGFzc05hbWU9XCJheGlzLWxhYmVsXCIgdGV4dEFuY2hvcj1cIm1pZGRsZVwiPlxuICAgICAgICAgICAge2NvbG9yTGVnZW5kTGFiZWx9XG4gICAgICAgICAgPC90ZXh0PlxuICAgICAgICAgIDxnPlxuICAgICAgICAgICAgPENvbG9yTGVnZW5kXG4gICAgICAgICAgICAgIHRpY2tTcGFjaW5nPXsyNX1cbiAgICAgICAgICAgICAgdGlja1NpemU9ezEwfVxuICAgICAgICAgICAgICB0aWNrVGV4dE9mZnNldD17MjB9XG4gICAgICAgICAgICAgIHRpY2tTaXplPXtjaXJjbGVSYWRpdXN9XG4gICAgICAgICAgICAgIGNvbG9yU2NhbGU9e2NvbG9yU2NhbGV9XG4gICAgICAgICAgICAgIG9uSG92ZXI9e3NldEhvdmVyZWRWYWx1ZX1cbiAgICAgICAgICAgICAgaG92ZXJlZFZhbHVlPXtob3ZlcmVkVmFsdWV9XG4gICAgICAgICAgICAgIGZhZGVPcGFjaXR5PXtmYWRlT3BhY2l0eX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9nPlxuICAgICAgICAgIDxDb2xvckxlZ2VuZFxuICAgICAgICAgICAgdGlja1NwYWNpbmc9ezI1fVxuICAgICAgICAgICAgdGlja1NpemU9ezEwfVxuICAgICAgICAgICAgdGlja1RleHRPZmZzZXQ9ezIwfVxuICAgICAgICAgICAgdGlja1NpemU9e2NpcmNsZVJhZGl1c31cbiAgICAgICAgICAgIGNvbG9yU2NhbGU9e2NvbG9yU2NhbGV9XG4gICAgICAgICAgICBvbkhvdmVyPXtzZXRIb3ZlcmVkVmFsdWV9XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9nPlxuICAgICAgICA8ZyBvcGFjaXR5PXtob3ZlcmVkVmFsdWUgPyBmYWRlT3BhY2l0eSA6IDF9PlxuICAgICAgICAgIDxNYXJrc1xuICAgICAgICAgICAgZGF0YT17ZGF0YX1cbiAgICAgICAgICAgIHhTY2FsZT17eFNjYWxlfVxuICAgICAgICAgICAgeVNjYWxlPXt5U2NhbGV9XG4gICAgICAgICAgICB4VmFsdWU9e3hWYWx1ZX1cbiAgICAgICAgICAgIHlWYWx1ZT17eVZhbHVlfVxuICAgICAgICAgICAgY29sb3JTY2FsZT17Y29sb3JTY2FsZX1cbiAgICAgICAgICAgIGNvbG9yVmFsdWU9e2NvbG9yVmFsdWV9XG4gICAgICAgICAgICB0b29sdGlwRm9ybWF0PXt4QXhpc1RpY2tGb3JtYXR9XG4gICAgICAgICAgICBjaXJjbGVSYWRpdXM9e2NpcmNsZVJhZGl1c31cbiAgICAgICAgICAvPlxuICAgICAgICA8L2c+XG4gICAgICAgIDxNYXJrc1xuICAgICAgICAgIGRhdGE9e2ZpbHRlcmVkRGF0YX1cbiAgICAgICAgICB4U2NhbGU9e3hTY2FsZX1cbiAgICAgICAgICB5U2NhbGU9e3lTY2FsZX1cbiAgICAgICAgICB4VmFsdWU9e3hWYWx1ZX1cbiAgICAgICAgICB5VmFsdWU9e3lWYWx1ZX1cbiAgICAgICAgICBjb2xvclNjYWxlPXtjb2xvclNjYWxlfVxuICAgICAgICAgIGNvbG9yVmFsdWU9e2NvbG9yVmFsdWV9XG4gICAgICAgICAgdG9vbHRpcEZvcm1hdD17eEF4aXNUaWNrRm9ybWF0fVxuICAgICAgICAgIGNpcmNsZVJhZGl1cz17Y2lyY2xlUmFkaXVzfVxuICAgICAgICAvPlxuICAgICAgPC9nPlxuICAgIDwvc3ZnPlxuICApO1xufTtcbmNvbnN0IHJvb3RFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jvb3QnKTtcblJlYWN0RE9NLnJlbmRlcig8QXBwIC8+LCByb290RWxlbWVudCk7XG5cbi8vIGZvciBkb2luZyBhcmNzXG4vLyhkYXRhKS5tYXAoKGQsIGkpID0+IChcbi8vICAgICAgICA8cGF0aCBmaWxsPXtkWydSR0IgaGV4IHZhbHVlJ119IGQ9e3BpZUFyYyh7XG4vLyAgICAgICAgICAgICAgc3RhcnRBbmdsZTogaSAvIGRhdGEubGVuZ3RoICogMiAqIE1hdGguUEksXG4vLyAgXHRcdFx0XHRcdCAgZW5kQW5nbGU6IChpKzEpIC8gZGF0YS5sZW5ndGggKiAyICogTWF0aC5QSVxuLy8gICAgICAgICAgICB9KX0vPlxuIl0sIm5hbWVzIjpbInVzZVN0YXRlIiwidXNlRWZmZWN0IiwiY3N2IiwiUmVhY3QiLCJmb3JtYXQiLCJzY2FsZUxpbmVh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