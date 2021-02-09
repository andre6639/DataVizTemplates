import {
  select,
  scaleLinear,
  scalePoint,
  scaleBand,
  scaleOrdinal,
  axisLeft,
  axisBottom,
  line,
  nest,
  schemeCategory10,
  timeFormat,
  max, 
  min, 
  zoom
} from 'd3'; 
 

import { colorLegend } from './colorLegend'; 
const svg = select('svg');

const width = +svg.attr('width');
const height = +svg.attr('height');

const formatTime = timeFormat("%b %d");

const title = 'Gunz N\' Roses';

const jsonX0Value = 'date'
const jsonX1Value = 'item'
const jsonYValue = 'value'

const xValue = d => formatTime(d[jsonX0Value]); 
const xAxisLabel = toTitleCase(jsonX0Value);

const yValue = d => d[jsonYValue];
const yAxisLabel = toTitleCase(jsonYValue);

const colorValue = d => d[jsonX1Value];

const circleRadius = 6;

const margin = { top: 60, right: 160, bottom: 88, left: 120 };
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;

let yZeroPos = innerHeight;

const xScale0 = scaleBand()
  .rangeRound([0, innerWidth])
  .padding(0.1);

const xScale1 = scaleBand()

const yScale = scaleLinear()
  .rangeRound([innerHeight, 0]);



const colorScale = scaleOrdinal(schemeCategory10);
let dataByGroup = [];
let lineNestedData = [];

const g = svg.append('g')
  .attr('transform', `translate(${margin.left},${margin.top})`);

const xAxis = axisBottom(xScale0)
  .tickPadding(15);

var yAxis = axisLeft(yScale)
  .tickSize(-innerWidth)
  .tickPadding(10);

let upperLimit = 0;
let lowerLimit = 0;

const render = () => {
  var maxValue = max(dataByGroup, d => max(d.values, a => a[jsonYValue])); 
  var minValue = min(dataByGroup, d => min(d.values, a => a[jsonYValue])); 
  if (upperLimit < maxValue || upperLimit * 0.9 > maxValue) { 
    upperLimit = maxValue * 1.1;
    yScale
  		.domain([lowerLimit, upperLimit])
    yAxis = axisLeft(yScale)
      .tickSize(-innerWidth)
      .tickPadding(10);   
  }
  if (lowerLimit > minValue || lowerLimit * 1.2 < minValue) { 
    if (minValue > 0) {
      lowerLimit = 0;
      yZeroPos = innerHeight;
    }
    else {
   		lowerLimit = minValue * 1.2;
    }
    yScale
  		.domain([lowerLimit, upperLimit])
    yAxis = axisLeft(yScale)
      .tickSize(-innerWidth)
      .tickPadding(10);   
  }

  svg.append('g')
  .attr('class', 'legend')
  .attr('transform', `translate(830,121)`)
  .call(colorLegend, {
    colorScale,
    circleRadius: 13,
    spacing: 30,
    textOffset: 15,
    onClick,
    selectedColorValue
  });
   
  var yAxisG = g.append('g')
      .attr('class', 'y-axis')
  		.call(yAxis); 
  
  yAxisG.append('text')
      .attr('class', 'axis-label')
      .attr('y', -60)
      .attr('x', -innerHeight / 2)
      .attr('fill', 'black')
      .attr('transform', `rotate(-90)`)
      .attr('text-anchor', 'middle')
      .text(yAxisLabel);
  
  ((d3.select("g")).select("g").selectAll('.tick')._groups[0].forEach(d => 
    (d.textContent === '0')
    	? yZeroPos = d.transform.animVal[0].matrix.f
    	: null
  ))
  
  var xAxisG = g.append('g').call(xAxis)
      .attr('class', 'x-axis')
    	.attr('transform', `translate(0,${innerHeight})`);
  
  xAxisG.select('.domain').remove();
  
  xAxisG.append('text')
      .attr('class', 'axis-label')
      .attr('y', 80)
      .attr('x', innerWidth / 2)
      .attr('fill', 'black')
      .text(xAxisLabel);
  
  const lineGenerator = line() 
  	.x(d => xScale0(xValue(d.values[i])))
  	.y(d => yScale(yValue(d.values[i])))
  
  for (var i = 0; i < xScale1.domain().length; i++){
  	g.append('path').data(dataByGroup)
      .attr('class', 'line-path')
      .attr('stroke', colorScale(colorValue(dataByGroup[0].values[i])))
      .attr('d', lineGenerator(dataByGroup, i))
    	.attr('opacity',  d =>
        (colorScale(colorValue(dataByGroup[0].values[i])) === selectedColorValue || !selectedColorValue)
        	? 1
          : 0.2
      	)
    	.attr("transform", d => "translate("+ (xScale0.bandwidth()/2) + ",0)");	
  }
  
  var group = g.selectAll()
    .data(dataByGroup)
    .enter().append("g")
    .attr("class", "group")
    .attr("transform", function(d) { return "translate("+ (xScale0(d.key) + xScale0.bandwidth()/2) + ",0)"; });
    
  var innerGroup = group.selectAll('innerGroup')
  	.data(d => d.values)
  	.enter().append('g')
    .attr("class", "innerGroup")
  

  innerGroup
		.append('circle')
  	.attr('class', 'item-value')
	 	.attr('cy', d => yScale(d[jsonYValue]))
  	.attr('r', 8) 
   	.attr('fill', d => colorScale(d[jsonX1Value]))
    .attr('opacity',  d => colorStatementSelector(colorScale(d[jsonX1Value]), 1, 0.2))
    // .attr('opacity',  d =>
    // (colorScale(d[jsonX1Value]) === selectedColorValue || !selectedColorValue)
    //   ? 1
    //   : 0.2
    // )
  	.attr('pointer-events', d => colorStatementSelector(colorScale(d[jsonX1Value]),'auto', 'none'))
    .on('mouseenter', barSelect)
   	.on('mouseleave', barDeSelect)
  	.call(d3.drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended));
  
   innerGroup
    .append('text')
    .attr('class', 'value')
    .attr('opacity',  d => colorStatementSelector(colorScale(d[jsonX1Value]), 1, 0))
    .attr('y', d => yScale(d[jsonYValue]) - 15) 
    .text(d => `${yValue(d)}`)
   

  function barSelect(actual, i) {
    d3.selectAll('.value')
      .attr('opacity', 0)

    d3.select(this)
      .transition()
      .duration(300)
      .attr('opacity', 0.6)

    const y = yScale(yValue(actual))

    let line = g.append('line')
      .attr('id', 'limit')
      .attr('x1', 0)
      .attr('y1', y)
      .attr('x2', innerWidth)
      .attr('y2', y); 

    d3.selectAll('.innerGroup').append('text')
      .attr('class', 'divergence')
      .attr('text-anchor', 'middle')
 	    .attr('opacity',  d => colorStatementSelector(colorScale(d[jsonX1Value]), 1, 0))
      .attr('y', d => yScale(d[jsonYValue]) - 15)
      .text((a, idx) => {
        const divergence = (yValue(a) - yValue(actual)).toFixed(0) 

        let text = ''
        if (divergence > 0) text += '+'
        text += `${divergence}`

        return a !== actual ? text : '';
     })
  }
  
  function barDeSelect() {
     d3.selectAll('.value')
    	 .attr('opacity',  d => colorStatementSelector(colorScale(d[jsonX1Value]), 1, 0))

     d3.select(this)
       .transition()
       .duration(300)
       .attr('opacity', d => colorStatementSelector(colorScale(d[jsonX1Value]), 1, 0.2))


     g.selectAll('#limit').remove()
     g.selectAll('.divergence').remove()
   }


  function colorStatementSelector(color, trueStatement, falseStatement) {
    var returnValue;
    (color === selectedColorValue || !selectedColorValue)
        ? returnValue = trueStatement
        : returnValue = falseStatement
    return returnValue;
  }
        
  // Function to handle what happens when drag is started
  function dragstarted(d) {
    d3.select(this).raise().classed("active", true); 
    d3.select(this).attr("y", d3.mouse(this)[1]);  
    g.selectAll('#limit').remove()
    //g.selectAll('.divergence').remove()
  }

  // Function to handle what happens when drag is in progress
  function dragged(d) {
    d3.select(this).attr("y", d3.mouse(this)[1]);  
    d3.select(this.parentNode).select('.value').remove();    
    
    d3.select(this.parentNode)
    	.append('text')
      .attr('class', 'value')
      .attr('y', d3.mouse(this)[1] - 15)
      .text(barValue);
    
    d3.select(this.parentNode).select('.item-value') 
  	  .attr('cy',  d3.mouse(this)[1]) 
      .attr('opacity',  d =>
      (colorScale(d[jsonX1Value]) === selectedColorValue || !selectedColorValue)
        ? 1
        : 0.2
      )   
    // console.log(d3.select(this.parentNode))
    // 	// .call(d3.drag()
    // 	// 	.on('start', dragstarted)
    // 	// 	.on('drag', barSelect)
    // 	// 	.on('end', dragended))
  }
   
  // Function to handle what happens when drag is ended 
  function dragended(d) {      
    d3.select(this).classed("active", false);   
    d3.select(this).attr("y", d.y = 0);  
         
	  svg.selectAll('.legend').remove();
    g.selectAll('.group').remove();
    g.selectAll('.line-path').remove(); 
    yAxisG.remove();    
    xAxisG.remove();   
		render();
  }
  
  function barValue(d) {
    let valPerPx = (upperLimit - lowerLimit) / innerHeight;   
    d.value = +((yZeroPos - d3.mouse(this)[1]) * valPerPx).toFixed(0);  
  	return d.value;
  }
};

// parse a date in yyyy-mm-dd format
function parseDate(input) { 
  let parts = input.split('-');
  // new Date(year, month [, day [, hours[, minutes[, seconds[, ms]]]]])
  return new Date(parts[0], parts[1]-1, parts[2]); // Note: months are 0-based
}

  function toTitleCase(str) {
        return str.replace(
            /\w\S*/g,
            function(txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            }
        );
    }

let selectedColorValue; 

const onClick = d => {
  if (d !== null)
		selectedColorValue = colorScale(d);
  else
    selectedColorValue = null
  svg.selectAll('.legend').remove();
  g.selectAll('.group').remove();
  g.selectAll('.line-path').remove();
  g.select('.y-axis').remove();     
  g.select('.x-axis').remove();     
  render();
};


d3.json('GunzNRosesData.json')
  .then(data => {
    data.forEach(d => {
      d[jsonX0Value] = parseDate(d[jsonX0Value]);  
      d[jsonYValue] = +d[jsonYValue];
    });
  const nested = nest()
  	.key(xValue);
	dataByGroup = nested.entries(data);

  lineNestedData = nest()
  	.key(colorValue)
  	.entries(data);
    
  
	xScale0
  	.domain(dataByGroup.map(d => d.key))

	xScale1
    .domain(dataByGroup[0].values.map(colorValue))
    .rangeRound([0, xScale0.bandwidth()])
    .padding(0.01);

	yScale
  	.domain([min(data, yValue), max(data, yValue)])
  
  colorScale
  	.domain(dataByGroup[0].values.map(colorValue))

  
  g.append('text')
    .attr('class', 'title')
    .attr('y', -10)
    .attr('x', innerWidth / 2)
    .attr('text-anchor', 'middle')
    .text(title);
 

    render();
  });