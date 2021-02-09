(function (d3$1) {
  'use strict';

  const colorLegend = (selection, props) => {
    const {
      colorScale,
      circleRadius,
      spacing,
      textOffset,
      onClick,
      selectedColorValue
    } = props;
    

    const groups = selection.selectAll('g')
      .data(colorScale.domain());
    const groupsEnter = groups
      .enter().append('g')
        .attr('class', 'tick');
    groupsEnter
      .merge(groups)
        .attr('transform', (d, i) =>
          `translate(0, ${i * spacing})`
        )
    		.attr('opacity', d =>
          (colorScale(d) === selectedColorValue || !selectedColorValue)  
          	? 1
            : 0.2
        	)
  //  		 .on('click', d => console.log(selectedColorValue))
    		.on('click', d => onClick(
    			(colorScale(d) === selectedColorValue) 
    		? null
    		: d
    		));
    groups.exit().remove();

    groupsEnter.append('circle')
      .merge(groups.select('circle'))
        .attr('r', circleRadius)
        .attr('fill', colorScale);

    groupsEnter.append('text')
      .merge(groups.select('text'))
        .text(d => toTitleCase(d))
        .attr('dy', '0.32em')
        .attr('x', textOffset);
    
    function toTitleCase(str) {
          return str.replace(
              /\w\S*/g,
              function(txt) {
                  return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
              }
          );
      }
  };

  const svg = d3$1.select('svg');

  const width = +svg.attr('width');
  const height = +svg.attr('height');

  const formatTime = d3$1.timeFormat("%b %d");

  const title = 'Gunz N\' Roses';

  const jsonX0Value = 'date';
  const jsonX1Value = 'item';
  const jsonYValue = 'value';

  const xValue = d => formatTime(d[jsonX0Value]); 
  const xAxisLabel = toTitleCase(jsonX0Value);

  const yValue = d => d[jsonYValue];
  const yAxisLabel = toTitleCase(jsonYValue);

  const colorValue = d => d[jsonX1Value];

  const margin = { top: 60, right: 160, bottom: 88, left: 120 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  let yZeroPos = innerHeight;

  const xScale0 = d3$1.scaleBand()
    .rangeRound([0, innerWidth])
    .padding(0.1);

  const xScale1 = d3$1.scaleBand();

  const yScale = d3$1.scaleLinear()
    .rangeRound([innerHeight, 0]);



  const colorScale = d3$1.scaleOrdinal(d3$1.schemeCategory10);
  let dataByGroup = [];
  let lineNestedData = [];

  const g = svg.append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);

  const xAxis = d3$1.axisBottom(xScale0)
    .tickPadding(15);

  var yAxis = d3$1.axisLeft(yScale)
    .tickSize(-innerWidth)
    .tickPadding(10);

  let upperLimit = 0;
  let lowerLimit = 0;

  const render = () => {
    var maxValue = d3$1.max(dataByGroup, d => d3$1.max(d.values, a => a[jsonYValue])); 
    var minValue = d3$1.min(dataByGroup, d => d3$1.min(d.values, a => a[jsonYValue])); 
    if (upperLimit < maxValue || upperLimit * 0.9 > maxValue) { 
      upperLimit = maxValue * 1.1;
      yScale
    		.domain([lowerLimit, upperLimit]);
      yAxis = d3$1.axisLeft(yScale)
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
    		.domain([lowerLimit, upperLimit]);
      yAxis = d3$1.axisLeft(yScale)
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
    ));
    
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
    
    const lineGenerator = d3$1.line() 
    	.x(d => xScale0(xValue(d.values[i])))
    	.y(d => yScale(yValue(d.values[i])));
    
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
      .attr("class", "innerGroup");
    

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
      .text(d => `${yValue(d)}`);
     

    function barSelect(actual, i) {
      d3.selectAll('.value')
        .attr('opacity', 0);

      d3.select(this)
        .transition()
        .duration(300)
        .attr('opacity', 0.6);

      const y = yScale(yValue(actual));

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
          const divergence = (yValue(a) - yValue(actual)).toFixed(0); 

          let text = '';
          if (divergence > 0) text += '+';
          text += `${divergence}`;

          return a !== actual ? text : '';
       });
    }
    
    function barDeSelect() {
       d3.selectAll('.value')
      	 .attr('opacity',  d => colorStatementSelector(colorScale(d[jsonX1Value]), 1, 0));

       d3.select(this)
         .transition()
         .duration(300)
         .attr('opacity', d => colorStatementSelector(colorScale(d[jsonX1Value]), 1, 0.2));


       g.selectAll('#limit').remove();
       g.selectAll('.divergence').remove();
     }


    function colorStatementSelector(color, trueStatement, falseStatement) {
      var returnValue;
      (color === selectedColorValue || !selectedColorValue)
          ? returnValue = trueStatement
          : returnValue = falseStatement;
      return returnValue;
    }
          
    // Function to handle what happens when drag is started
    function dragstarted(d) {
      d3.select(this).raise().classed("active", true); 
      d3.select(this).attr("y", d3.mouse(this)[1]);  
      g.selectAll('#limit').remove();
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
        );   
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
      selectedColorValue = null;
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
    const nested = d3$1.nest()
    	.key(xValue);
  	dataByGroup = nested.entries(data);

    lineNestedData = d3$1.nest()
    	.key(colorValue)
    	.entries(data);
      
    
  	xScale0
    	.domain(dataByGroup.map(d => d.key));

  	xScale1
      .domain(dataByGroup[0].values.map(colorValue))
      .rangeRound([0, xScale0.bandwidth()])
      .padding(0.01);

  	yScale
    	.domain([d3$1.min(data, yValue), d3$1.max(data, yValue)]);
    
    colorScale
    	.domain(dataByGroup[0].values.map(colorValue));

    
    g.append('text')
      .attr('class', 'title')
      .attr('y', -10)
      .attr('x', innerWidth / 2)
      .attr('text-anchor', 'middle')
      .text(title);
   

      render();
    });

}(d3));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbImNvbG9yTGVnZW5kLmpzIiwiaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IGNvbG9yTGVnZW5kID0gKHNlbGVjdGlvbiwgcHJvcHMpID0+IHtcbiAgY29uc3Qge1xuICAgIGNvbG9yU2NhbGUsXG4gICAgY2lyY2xlUmFkaXVzLFxuICAgIHNwYWNpbmcsXG4gICAgdGV4dE9mZnNldCxcbiAgICBvbkNsaWNrLFxuICAgIHNlbGVjdGVkQ29sb3JWYWx1ZVxuICB9ID0gcHJvcHM7XG4gIFxuXG4gIGNvbnN0IGdyb3VwcyA9IHNlbGVjdGlvbi5zZWxlY3RBbGwoJ2cnKVxuICAgIC5kYXRhKGNvbG9yU2NhbGUuZG9tYWluKCkpO1xuICBjb25zdCBncm91cHNFbnRlciA9IGdyb3Vwc1xuICAgIC5lbnRlcigpLmFwcGVuZCgnZycpXG4gICAgICAuYXR0cignY2xhc3MnLCAndGljaycpO1xuICBncm91cHNFbnRlclxuICAgIC5tZXJnZShncm91cHMpXG4gICAgICAuYXR0cigndHJhbnNmb3JtJywgKGQsIGkpID0+XG4gICAgICAgIGB0cmFuc2xhdGUoMCwgJHtpICogc3BhY2luZ30pYFxuICAgICAgKVxuICBcdFx0LmF0dHIoJ29wYWNpdHknLCBkID0+XG4gICAgICAgIChjb2xvclNjYWxlKGQpID09PSBzZWxlY3RlZENvbG9yVmFsdWUgfHwgIXNlbGVjdGVkQ29sb3JWYWx1ZSkgIFxuICAgICAgICBcdD8gMVxuICAgICAgICAgIDogMC4yXG4gICAgICBcdClcbi8vICBcdFx0IC5vbignY2xpY2snLCBkID0+IGNvbnNvbGUubG9nKHNlbGVjdGVkQ29sb3JWYWx1ZSkpXG4gIFx0XHQub24oJ2NsaWNrJywgZCA9PiBvbkNsaWNrKFxuICBcdFx0XHQoY29sb3JTY2FsZShkKSA9PT0gc2VsZWN0ZWRDb2xvclZhbHVlKSBcbiAgXHRcdD8gbnVsbFxuICBcdFx0OiBkXG4gIFx0XHQpKTtcbiAgZ3JvdXBzLmV4aXQoKS5yZW1vdmUoKTtcblxuICBncm91cHNFbnRlci5hcHBlbmQoJ2NpcmNsZScpXG4gICAgLm1lcmdlKGdyb3Vwcy5zZWxlY3QoJ2NpcmNsZScpKVxuICAgICAgLmF0dHIoJ3InLCBjaXJjbGVSYWRpdXMpXG4gICAgICAuYXR0cignZmlsbCcsIGNvbG9yU2NhbGUpO1xuXG4gIGdyb3Vwc0VudGVyLmFwcGVuZCgndGV4dCcpXG4gICAgLm1lcmdlKGdyb3Vwcy5zZWxlY3QoJ3RleHQnKSlcbiAgICAgIC50ZXh0KGQgPT4gdG9UaXRsZUNhc2UoZCkpXG4gICAgICAuYXR0cignZHknLCAnMC4zMmVtJylcbiAgICAgIC5hdHRyKCd4JywgdGV4dE9mZnNldCk7XG4gIFxuICBmdW5jdGlvbiB0b1RpdGxlQ2FzZShzdHIpIHtcbiAgICAgICAgcmV0dXJuIHN0ci5yZXBsYWNlKFxuICAgICAgICAgICAgL1xcd1xcUyovZyxcbiAgICAgICAgICAgIGZ1bmN0aW9uKHR4dCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0eHQuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyB0eHQuc3Vic3RyKDEpLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgfVxufSIsImltcG9ydCB7XG4gIHNlbGVjdCxcbiAgc2NhbGVMaW5lYXIsXG4gIHNjYWxlUG9pbnQsXG4gIHNjYWxlQmFuZCxcbiAgc2NhbGVPcmRpbmFsLFxuICBheGlzTGVmdCxcbiAgYXhpc0JvdHRvbSxcbiAgbGluZSxcbiAgbmVzdCxcbiAgc2NoZW1lQ2F0ZWdvcnkxMCxcbiAgdGltZUZvcm1hdCxcbiAgbWF4LCBcbiAgbWluLCBcbiAgem9vbVxufSBmcm9tICdkMyc7IFxuIFxuXG5pbXBvcnQgeyBjb2xvckxlZ2VuZCB9IGZyb20gJy4vY29sb3JMZWdlbmQnOyBcbmNvbnN0IHN2ZyA9IHNlbGVjdCgnc3ZnJyk7XG5cbmNvbnN0IHdpZHRoID0gK3N2Zy5hdHRyKCd3aWR0aCcpO1xuY29uc3QgaGVpZ2h0ID0gK3N2Zy5hdHRyKCdoZWlnaHQnKTtcblxuY29uc3QgZm9ybWF0VGltZSA9IHRpbWVGb3JtYXQoXCIlYiAlZFwiKTtcblxuY29uc3QgdGl0bGUgPSAnR3VueiBOXFwnIFJvc2VzJztcblxuY29uc3QganNvblgwVmFsdWUgPSAnZGF0ZSdcbmNvbnN0IGpzb25YMVZhbHVlID0gJ2l0ZW0nXG5jb25zdCBqc29uWVZhbHVlID0gJ3ZhbHVlJ1xuXG5jb25zdCB4VmFsdWUgPSBkID0+IGZvcm1hdFRpbWUoZFtqc29uWDBWYWx1ZV0pOyBcbmNvbnN0IHhBeGlzTGFiZWwgPSB0b1RpdGxlQ2FzZShqc29uWDBWYWx1ZSk7XG5cbmNvbnN0IHlWYWx1ZSA9IGQgPT4gZFtqc29uWVZhbHVlXTtcbmNvbnN0IHlBeGlzTGFiZWwgPSB0b1RpdGxlQ2FzZShqc29uWVZhbHVlKTtcblxuY29uc3QgY29sb3JWYWx1ZSA9IGQgPT4gZFtqc29uWDFWYWx1ZV07XG5cbmNvbnN0IGNpcmNsZVJhZGl1cyA9IDY7XG5cbmNvbnN0IG1hcmdpbiA9IHsgdG9wOiA2MCwgcmlnaHQ6IDE2MCwgYm90dG9tOiA4OCwgbGVmdDogMTIwIH07XG5jb25zdCBpbm5lcldpZHRoID0gd2lkdGggLSBtYXJnaW4ubGVmdCAtIG1hcmdpbi5yaWdodDtcbmNvbnN0IGlubmVySGVpZ2h0ID0gaGVpZ2h0IC0gbWFyZ2luLnRvcCAtIG1hcmdpbi5ib3R0b207XG5cbmxldCB5WmVyb1BvcyA9IGlubmVySGVpZ2h0O1xuXG5jb25zdCB4U2NhbGUwID0gc2NhbGVCYW5kKClcbiAgLnJhbmdlUm91bmQoWzAsIGlubmVyV2lkdGhdKVxuICAucGFkZGluZygwLjEpO1xuXG5jb25zdCB4U2NhbGUxID0gc2NhbGVCYW5kKClcblxuY29uc3QgeVNjYWxlID0gc2NhbGVMaW5lYXIoKVxuICAucmFuZ2VSb3VuZChbaW5uZXJIZWlnaHQsIDBdKTtcblxuXG5cbmNvbnN0IGNvbG9yU2NhbGUgPSBzY2FsZU9yZGluYWwoc2NoZW1lQ2F0ZWdvcnkxMCk7XG5sZXQgZGF0YUJ5R3JvdXAgPSBbXTtcbmxldCBsaW5lTmVzdGVkRGF0YSA9IFtdO1xuXG5jb25zdCBnID0gc3ZnLmFwcGVuZCgnZycpXG4gIC5hdHRyKCd0cmFuc2Zvcm0nLCBgdHJhbnNsYXRlKCR7bWFyZ2luLmxlZnR9LCR7bWFyZ2luLnRvcH0pYCk7XG5cbmNvbnN0IHhBeGlzID0gYXhpc0JvdHRvbSh4U2NhbGUwKVxuICAudGlja1BhZGRpbmcoMTUpO1xuXG52YXIgeUF4aXMgPSBheGlzTGVmdCh5U2NhbGUpXG4gIC50aWNrU2l6ZSgtaW5uZXJXaWR0aClcbiAgLnRpY2tQYWRkaW5nKDEwKTtcblxubGV0IHVwcGVyTGltaXQgPSAwO1xubGV0IGxvd2VyTGltaXQgPSAwO1xuXG5jb25zdCByZW5kZXIgPSAoKSA9PiB7XG4gIHZhciBtYXhWYWx1ZSA9IG1heChkYXRhQnlHcm91cCwgZCA9PiBtYXgoZC52YWx1ZXMsIGEgPT4gYVtqc29uWVZhbHVlXSkpOyBcbiAgdmFyIG1pblZhbHVlID0gbWluKGRhdGFCeUdyb3VwLCBkID0+IG1pbihkLnZhbHVlcywgYSA9PiBhW2pzb25ZVmFsdWVdKSk7IFxuICBpZiAodXBwZXJMaW1pdCA8IG1heFZhbHVlIHx8IHVwcGVyTGltaXQgKiAwLjkgPiBtYXhWYWx1ZSkgeyBcbiAgICB1cHBlckxpbWl0ID0gbWF4VmFsdWUgKiAxLjE7XG4gICAgeVNjYWxlXG4gIFx0XHQuZG9tYWluKFtsb3dlckxpbWl0LCB1cHBlckxpbWl0XSlcbiAgICB5QXhpcyA9IGF4aXNMZWZ0KHlTY2FsZSlcbiAgICAgIC50aWNrU2l6ZSgtaW5uZXJXaWR0aClcbiAgICAgIC50aWNrUGFkZGluZygxMCk7ICAgXG4gIH1cbiAgaWYgKGxvd2VyTGltaXQgPiBtaW5WYWx1ZSB8fCBsb3dlckxpbWl0ICogMS4yIDwgbWluVmFsdWUpIHsgXG4gICAgaWYgKG1pblZhbHVlID4gMCkge1xuICAgICAgbG93ZXJMaW1pdCA9IDA7XG4gICAgICB5WmVyb1BvcyA9IGlubmVySGVpZ2h0O1xuICAgIH1cbiAgICBlbHNlIHtcbiAgIFx0XHRsb3dlckxpbWl0ID0gbWluVmFsdWUgKiAxLjI7XG4gICAgfVxuICAgIHlTY2FsZVxuICBcdFx0LmRvbWFpbihbbG93ZXJMaW1pdCwgdXBwZXJMaW1pdF0pXG4gICAgeUF4aXMgPSBheGlzTGVmdCh5U2NhbGUpXG4gICAgICAudGlja1NpemUoLWlubmVyV2lkdGgpXG4gICAgICAudGlja1BhZGRpbmcoMTApOyAgIFxuICB9XG5cbiAgc3ZnLmFwcGVuZCgnZycpXG4gIC5hdHRyKCdjbGFzcycsICdsZWdlbmQnKVxuICAuYXR0cigndHJhbnNmb3JtJywgYHRyYW5zbGF0ZSg4MzAsMTIxKWApXG4gIC5jYWxsKGNvbG9yTGVnZW5kLCB7XG4gICAgY29sb3JTY2FsZSxcbiAgICBjaXJjbGVSYWRpdXM6IDEzLFxuICAgIHNwYWNpbmc6IDMwLFxuICAgIHRleHRPZmZzZXQ6IDE1LFxuICAgIG9uQ2xpY2ssXG4gICAgc2VsZWN0ZWRDb2xvclZhbHVlXG4gIH0pO1xuICAgXG4gIHZhciB5QXhpc0cgPSBnLmFwcGVuZCgnZycpXG4gICAgICAuYXR0cignY2xhc3MnLCAneS1heGlzJylcbiAgXHRcdC5jYWxsKHlBeGlzKTsgXG4gIFxuICB5QXhpc0cuYXBwZW5kKCd0ZXh0JylcbiAgICAgIC5hdHRyKCdjbGFzcycsICdheGlzLWxhYmVsJylcbiAgICAgIC5hdHRyKCd5JywgLTYwKVxuICAgICAgLmF0dHIoJ3gnLCAtaW5uZXJIZWlnaHQgLyAyKVxuICAgICAgLmF0dHIoJ2ZpbGwnLCAnYmxhY2snKVxuICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsIGByb3RhdGUoLTkwKWApXG4gICAgICAuYXR0cigndGV4dC1hbmNob3InLCAnbWlkZGxlJylcbiAgICAgIC50ZXh0KHlBeGlzTGFiZWwpO1xuICBcbiAgKChkMy5zZWxlY3QoXCJnXCIpKS5zZWxlY3QoXCJnXCIpLnNlbGVjdEFsbCgnLnRpY2snKS5fZ3JvdXBzWzBdLmZvckVhY2goZCA9PiBcbiAgICAoZC50ZXh0Q29udGVudCA9PT0gJzAnKVxuICAgIFx0PyB5WmVyb1BvcyA9IGQudHJhbnNmb3JtLmFuaW1WYWxbMF0ubWF0cml4LmZcbiAgICBcdDogbnVsbFxuICApKVxuICBcbiAgdmFyIHhBeGlzRyA9IGcuYXBwZW5kKCdnJykuY2FsbCh4QXhpcylcbiAgICAgIC5hdHRyKCdjbGFzcycsICd4LWF4aXMnKVxuICAgIFx0LmF0dHIoJ3RyYW5zZm9ybScsIGB0cmFuc2xhdGUoMCwke2lubmVySGVpZ2h0fSlgKTtcbiAgXG4gIHhBeGlzRy5zZWxlY3QoJy5kb21haW4nKS5yZW1vdmUoKTtcbiAgXG4gIHhBeGlzRy5hcHBlbmQoJ3RleHQnKVxuICAgICAgLmF0dHIoJ2NsYXNzJywgJ2F4aXMtbGFiZWwnKVxuICAgICAgLmF0dHIoJ3knLCA4MClcbiAgICAgIC5hdHRyKCd4JywgaW5uZXJXaWR0aCAvIDIpXG4gICAgICAuYXR0cignZmlsbCcsICdibGFjaycpXG4gICAgICAudGV4dCh4QXhpc0xhYmVsKTtcbiAgXG4gIGNvbnN0IGxpbmVHZW5lcmF0b3IgPSBsaW5lKCkgXG4gIFx0LngoZCA9PiB4U2NhbGUwKHhWYWx1ZShkLnZhbHVlc1tpXSkpKVxuICBcdC55KGQgPT4geVNjYWxlKHlWYWx1ZShkLnZhbHVlc1tpXSkpKVxuICBcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCB4U2NhbGUxLmRvbWFpbigpLmxlbmd0aDsgaSsrKXtcbiAgXHRnLmFwcGVuZCgncGF0aCcpLmRhdGEoZGF0YUJ5R3JvdXApXG4gICAgICAuYXR0cignY2xhc3MnLCAnbGluZS1wYXRoJylcbiAgICAgIC5hdHRyKCdzdHJva2UnLCBjb2xvclNjYWxlKGNvbG9yVmFsdWUoZGF0YUJ5R3JvdXBbMF0udmFsdWVzW2ldKSkpXG4gICAgICAuYXR0cignZCcsIGxpbmVHZW5lcmF0b3IoZGF0YUJ5R3JvdXAsIGkpKVxuICAgIFx0LmF0dHIoJ29wYWNpdHknLCAgZCA9PlxuICAgICAgICAoY29sb3JTY2FsZShjb2xvclZhbHVlKGRhdGFCeUdyb3VwWzBdLnZhbHVlc1tpXSkpID09PSBzZWxlY3RlZENvbG9yVmFsdWUgfHwgIXNlbGVjdGVkQ29sb3JWYWx1ZSlcbiAgICAgICAgXHQ/IDFcbiAgICAgICAgICA6IDAuMlxuICAgICAgXHQpXG4gICAgXHQuYXR0cihcInRyYW5zZm9ybVwiLCBkID0+IFwidHJhbnNsYXRlKFwiKyAoeFNjYWxlMC5iYW5kd2lkdGgoKS8yKSArIFwiLDApXCIpO1x0XG4gIH1cbiAgXG4gIHZhciBncm91cCA9IGcuc2VsZWN0QWxsKClcbiAgICAuZGF0YShkYXRhQnlHcm91cClcbiAgICAuZW50ZXIoKS5hcHBlbmQoXCJnXCIpXG4gICAgLmF0dHIoXCJjbGFzc1wiLCBcImdyb3VwXCIpXG4gICAgLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgZnVuY3Rpb24oZCkgeyByZXR1cm4gXCJ0cmFuc2xhdGUoXCIrICh4U2NhbGUwKGQua2V5KSArIHhTY2FsZTAuYmFuZHdpZHRoKCkvMikgKyBcIiwwKVwiOyB9KTtcbiAgICBcbiAgdmFyIGlubmVyR3JvdXAgPSBncm91cC5zZWxlY3RBbGwoJ2lubmVyR3JvdXAnKVxuICBcdC5kYXRhKGQgPT4gZC52YWx1ZXMpXG4gIFx0LmVudGVyKCkuYXBwZW5kKCdnJylcbiAgICAuYXR0cihcImNsYXNzXCIsIFwiaW5uZXJHcm91cFwiKVxuICBcblxuICBpbm5lckdyb3VwXG5cdFx0LmFwcGVuZCgnY2lyY2xlJylcbiAgXHQuYXR0cignY2xhc3MnLCAnaXRlbS12YWx1ZScpXG5cdCBcdC5hdHRyKCdjeScsIGQgPT4geVNjYWxlKGRbanNvbllWYWx1ZV0pKVxuICBcdC5hdHRyKCdyJywgOCkgXG4gICBcdC5hdHRyKCdmaWxsJywgZCA9PiBjb2xvclNjYWxlKGRbanNvblgxVmFsdWVdKSlcbiAgICAuYXR0cignb3BhY2l0eScsICBkID0+IGNvbG9yU3RhdGVtZW50U2VsZWN0b3IoY29sb3JTY2FsZShkW2pzb25YMVZhbHVlXSksIDEsIDAuMikpXG4gICAgLy8gLmF0dHIoJ29wYWNpdHknLCAgZCA9PlxuICAgIC8vIChjb2xvclNjYWxlKGRbanNvblgxVmFsdWVdKSA9PT0gc2VsZWN0ZWRDb2xvclZhbHVlIHx8ICFzZWxlY3RlZENvbG9yVmFsdWUpXG4gICAgLy8gICA/IDFcbiAgICAvLyAgIDogMC4yXG4gICAgLy8gKVxuICBcdC5hdHRyKCdwb2ludGVyLWV2ZW50cycsIGQgPT4gY29sb3JTdGF0ZW1lbnRTZWxlY3Rvcihjb2xvclNjYWxlKGRbanNvblgxVmFsdWVdKSwnYXV0bycsICdub25lJykpXG4gICAgLm9uKCdtb3VzZWVudGVyJywgYmFyU2VsZWN0KVxuICAgXHQub24oJ21vdXNlbGVhdmUnLCBiYXJEZVNlbGVjdClcbiAgXHQuY2FsbChkMy5kcmFnKClcbiAgICAgIC5vbihcInN0YXJ0XCIsIGRyYWdzdGFydGVkKVxuICAgICAgLm9uKFwiZHJhZ1wiLCBkcmFnZ2VkKVxuICAgICAgLm9uKFwiZW5kXCIsIGRyYWdlbmRlZCkpO1xuICBcbiAgIGlubmVyR3JvdXBcbiAgICAuYXBwZW5kKCd0ZXh0JylcbiAgICAuYXR0cignY2xhc3MnLCAndmFsdWUnKVxuICAgIC5hdHRyKCdvcGFjaXR5JywgIGQgPT4gY29sb3JTdGF0ZW1lbnRTZWxlY3Rvcihjb2xvclNjYWxlKGRbanNvblgxVmFsdWVdKSwgMSwgMCkpXG4gICAgLmF0dHIoJ3knLCBkID0+IHlTY2FsZShkW2pzb25ZVmFsdWVdKSAtIDE1KSBcbiAgICAudGV4dChkID0+IGAke3lWYWx1ZShkKX1gKVxuICAgXG5cbiAgZnVuY3Rpb24gYmFyU2VsZWN0KGFjdHVhbCwgaSkge1xuICAgIGQzLnNlbGVjdEFsbCgnLnZhbHVlJylcbiAgICAgIC5hdHRyKCdvcGFjaXR5JywgMClcblxuICAgIGQzLnNlbGVjdCh0aGlzKVxuICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgLmR1cmF0aW9uKDMwMClcbiAgICAgIC5hdHRyKCdvcGFjaXR5JywgMC42KVxuXG4gICAgY29uc3QgeSA9IHlTY2FsZSh5VmFsdWUoYWN0dWFsKSlcblxuICAgIGxldCBsaW5lID0gZy5hcHBlbmQoJ2xpbmUnKVxuICAgICAgLmF0dHIoJ2lkJywgJ2xpbWl0JylcbiAgICAgIC5hdHRyKCd4MScsIDApXG4gICAgICAuYXR0cigneTEnLCB5KVxuICAgICAgLmF0dHIoJ3gyJywgaW5uZXJXaWR0aClcbiAgICAgIC5hdHRyKCd5MicsIHkpOyBcblxuICAgIGQzLnNlbGVjdEFsbCgnLmlubmVyR3JvdXAnKS5hcHBlbmQoJ3RleHQnKVxuICAgICAgLmF0dHIoJ2NsYXNzJywgJ2RpdmVyZ2VuY2UnKVxuICAgICAgLmF0dHIoJ3RleHQtYW5jaG9yJywgJ21pZGRsZScpXG4gXHQgICAgLmF0dHIoJ29wYWNpdHknLCAgZCA9PiBjb2xvclN0YXRlbWVudFNlbGVjdG9yKGNvbG9yU2NhbGUoZFtqc29uWDFWYWx1ZV0pLCAxLCAwKSlcbiAgICAgIC5hdHRyKCd5JywgZCA9PiB5U2NhbGUoZFtqc29uWVZhbHVlXSkgLSAxNSlcbiAgICAgIC50ZXh0KChhLCBpZHgpID0+IHtcbiAgICAgICAgY29uc3QgZGl2ZXJnZW5jZSA9ICh5VmFsdWUoYSkgLSB5VmFsdWUoYWN0dWFsKSkudG9GaXhlZCgwKSBcblxuICAgICAgICBsZXQgdGV4dCA9ICcnXG4gICAgICAgIGlmIChkaXZlcmdlbmNlID4gMCkgdGV4dCArPSAnKydcbiAgICAgICAgdGV4dCArPSBgJHtkaXZlcmdlbmNlfWBcblxuICAgICAgICByZXR1cm4gYSAhPT0gYWN0dWFsID8gdGV4dCA6ICcnO1xuICAgICB9KVxuICB9XG4gIFxuICBmdW5jdGlvbiBiYXJEZVNlbGVjdCgpIHtcbiAgICAgZDMuc2VsZWN0QWxsKCcudmFsdWUnKVxuICAgIFx0IC5hdHRyKCdvcGFjaXR5JywgIGQgPT4gY29sb3JTdGF0ZW1lbnRTZWxlY3Rvcihjb2xvclNjYWxlKGRbanNvblgxVmFsdWVdKSwgMSwgMCkpXG5cbiAgICAgZDMuc2VsZWN0KHRoaXMpXG4gICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgIC5kdXJhdGlvbigzMDApXG4gICAgICAgLmF0dHIoJ29wYWNpdHknLCBkID0+IGNvbG9yU3RhdGVtZW50U2VsZWN0b3IoY29sb3JTY2FsZShkW2pzb25YMVZhbHVlXSksIDEsIDAuMikpXG5cblxuICAgICBnLnNlbGVjdEFsbCgnI2xpbWl0JykucmVtb3ZlKClcbiAgICAgZy5zZWxlY3RBbGwoJy5kaXZlcmdlbmNlJykucmVtb3ZlKClcbiAgIH1cblxuXG4gIGZ1bmN0aW9uIGNvbG9yU3RhdGVtZW50U2VsZWN0b3IoY29sb3IsIHRydWVTdGF0ZW1lbnQsIGZhbHNlU3RhdGVtZW50KSB7XG4gICAgdmFyIHJldHVyblZhbHVlO1xuICAgIChjb2xvciA9PT0gc2VsZWN0ZWRDb2xvclZhbHVlIHx8ICFzZWxlY3RlZENvbG9yVmFsdWUpXG4gICAgICAgID8gcmV0dXJuVmFsdWUgPSB0cnVlU3RhdGVtZW50XG4gICAgICAgIDogcmV0dXJuVmFsdWUgPSBmYWxzZVN0YXRlbWVudFxuICAgIHJldHVybiByZXR1cm5WYWx1ZTtcbiAgfVxuICAgICAgICBcbiAgLy8gRnVuY3Rpb24gdG8gaGFuZGxlIHdoYXQgaGFwcGVucyB3aGVuIGRyYWcgaXMgc3RhcnRlZFxuICBmdW5jdGlvbiBkcmFnc3RhcnRlZChkKSB7XG4gICAgZDMuc2VsZWN0KHRoaXMpLnJhaXNlKCkuY2xhc3NlZChcImFjdGl2ZVwiLCB0cnVlKTsgXG4gICAgZDMuc2VsZWN0KHRoaXMpLmF0dHIoXCJ5XCIsIGQzLm1vdXNlKHRoaXMpWzFdKTsgIFxuICAgIGcuc2VsZWN0QWxsKCcjbGltaXQnKS5yZW1vdmUoKVxuICAgIC8vZy5zZWxlY3RBbGwoJy5kaXZlcmdlbmNlJykucmVtb3ZlKClcbiAgfVxuXG4gIC8vIEZ1bmN0aW9uIHRvIGhhbmRsZSB3aGF0IGhhcHBlbnMgd2hlbiBkcmFnIGlzIGluIHByb2dyZXNzXG4gIGZ1bmN0aW9uIGRyYWdnZWQoZCkge1xuICAgIGQzLnNlbGVjdCh0aGlzKS5hdHRyKFwieVwiLCBkMy5tb3VzZSh0aGlzKVsxXSk7ICBcbiAgICBkMy5zZWxlY3QodGhpcy5wYXJlbnROb2RlKS5zZWxlY3QoJy52YWx1ZScpLnJlbW92ZSgpOyAgICBcbiAgICBcbiAgICBkMy5zZWxlY3QodGhpcy5wYXJlbnROb2RlKVxuICAgIFx0LmFwcGVuZCgndGV4dCcpXG4gICAgICAuYXR0cignY2xhc3MnLCAndmFsdWUnKVxuICAgICAgLmF0dHIoJ3knLCBkMy5tb3VzZSh0aGlzKVsxXSAtIDE1KVxuICAgICAgLnRleHQoYmFyVmFsdWUpO1xuICAgIFxuICAgIGQzLnNlbGVjdCh0aGlzLnBhcmVudE5vZGUpLnNlbGVjdCgnLml0ZW0tdmFsdWUnKSBcbiAgXHQgIC5hdHRyKCdjeScsICBkMy5tb3VzZSh0aGlzKVsxXSkgXG4gICAgICAuYXR0cignb3BhY2l0eScsICBkID0+XG4gICAgICAoY29sb3JTY2FsZShkW2pzb25YMVZhbHVlXSkgPT09IHNlbGVjdGVkQ29sb3JWYWx1ZSB8fCAhc2VsZWN0ZWRDb2xvclZhbHVlKVxuICAgICAgICA/IDFcbiAgICAgICAgOiAwLjJcbiAgICAgICkgICBcbiAgICAvLyBjb25zb2xlLmxvZyhkMy5zZWxlY3QodGhpcy5wYXJlbnROb2RlKSlcbiAgICAvLyBcdC8vIC5jYWxsKGQzLmRyYWcoKVxuICAgIC8vIFx0Ly8gXHQub24oJ3N0YXJ0JywgZHJhZ3N0YXJ0ZWQpXG4gICAgLy8gXHQvLyBcdC5vbignZHJhZycsIGJhclNlbGVjdClcbiAgICAvLyBcdC8vIFx0Lm9uKCdlbmQnLCBkcmFnZW5kZWQpKVxuICB9XG4gICBcbiAgLy8gRnVuY3Rpb24gdG8gaGFuZGxlIHdoYXQgaGFwcGVucyB3aGVuIGRyYWcgaXMgZW5kZWQgXG4gIGZ1bmN0aW9uIGRyYWdlbmRlZChkKSB7ICAgICAgXG4gICAgZDMuc2VsZWN0KHRoaXMpLmNsYXNzZWQoXCJhY3RpdmVcIiwgZmFsc2UpOyAgIFxuICAgIGQzLnNlbGVjdCh0aGlzKS5hdHRyKFwieVwiLCBkLnkgPSAwKTsgIFxuICAgICAgICAgXG5cdCAgc3ZnLnNlbGVjdEFsbCgnLmxlZ2VuZCcpLnJlbW92ZSgpO1xuICAgIGcuc2VsZWN0QWxsKCcuZ3JvdXAnKS5yZW1vdmUoKTtcbiAgICBnLnNlbGVjdEFsbCgnLmxpbmUtcGF0aCcpLnJlbW92ZSgpOyBcbiAgICB5QXhpc0cucmVtb3ZlKCk7ICAgIFxuICAgIHhBeGlzRy5yZW1vdmUoKTsgICBcblx0XHRyZW5kZXIoKTtcbiAgfVxuICBcbiAgZnVuY3Rpb24gYmFyVmFsdWUoZCkge1xuICAgIGxldCB2YWxQZXJQeCA9ICh1cHBlckxpbWl0IC0gbG93ZXJMaW1pdCkgLyBpbm5lckhlaWdodDsgICBcbiAgICBkLnZhbHVlID0gKygoeVplcm9Qb3MgLSBkMy5tb3VzZSh0aGlzKVsxXSkgKiB2YWxQZXJQeCkudG9GaXhlZCgwKTsgIFxuICBcdHJldHVybiBkLnZhbHVlO1xuICB9XG59O1xuXG4vLyBwYXJzZSBhIGRhdGUgaW4geXl5eS1tbS1kZCBmb3JtYXRcbmZ1bmN0aW9uIHBhcnNlRGF0ZShpbnB1dCkgeyBcbiAgbGV0IHBhcnRzID0gaW5wdXQuc3BsaXQoJy0nKTtcbiAgLy8gbmV3IERhdGUoeWVhciwgbW9udGggWywgZGF5IFssIGhvdXJzWywgbWludXRlc1ssIHNlY29uZHNbLCBtc11dXV1dKVxuICByZXR1cm4gbmV3IERhdGUocGFydHNbMF0sIHBhcnRzWzFdLTEsIHBhcnRzWzJdKTsgLy8gTm90ZTogbW9udGhzIGFyZSAwLWJhc2VkXG59XG5cbiAgZnVuY3Rpb24gdG9UaXRsZUNhc2Uoc3RyKSB7XG4gICAgICAgIHJldHVybiBzdHIucmVwbGFjZShcbiAgICAgICAgICAgIC9cXHdcXFMqL2csXG4gICAgICAgICAgICBmdW5jdGlvbih0eHQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHh0LmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgdHh0LnN1YnN0cigxKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgIH1cblxubGV0IHNlbGVjdGVkQ29sb3JWYWx1ZTsgXG5cbmNvbnN0IG9uQ2xpY2sgPSBkID0+IHtcbiAgaWYgKGQgIT09IG51bGwpXG5cdFx0c2VsZWN0ZWRDb2xvclZhbHVlID0gY29sb3JTY2FsZShkKTtcbiAgZWxzZVxuICAgIHNlbGVjdGVkQ29sb3JWYWx1ZSA9IG51bGxcbiAgc3ZnLnNlbGVjdEFsbCgnLmxlZ2VuZCcpLnJlbW92ZSgpO1xuICBnLnNlbGVjdEFsbCgnLmdyb3VwJykucmVtb3ZlKCk7XG4gIGcuc2VsZWN0QWxsKCcubGluZS1wYXRoJykucmVtb3ZlKCk7XG4gIGcuc2VsZWN0KCcueS1heGlzJykucmVtb3ZlKCk7ICAgICBcbiAgZy5zZWxlY3QoJy54LWF4aXMnKS5yZW1vdmUoKTsgICAgIFxuICByZW5kZXIoKTtcbn07XG5cblxuZDMuanNvbignR3Vuek5Sb3Nlc0RhdGEuanNvbicpXG4gIC50aGVuKGRhdGEgPT4ge1xuICAgIGRhdGEuZm9yRWFjaChkID0+IHtcbiAgICAgIGRbanNvblgwVmFsdWVdID0gcGFyc2VEYXRlKGRbanNvblgwVmFsdWVdKTsgIFxuICAgICAgZFtqc29uWVZhbHVlXSA9ICtkW2pzb25ZVmFsdWVdO1xuICAgIH0pO1xuICBjb25zdCBuZXN0ZWQgPSBuZXN0KClcbiAgXHQua2V5KHhWYWx1ZSk7XG5cdGRhdGFCeUdyb3VwID0gbmVzdGVkLmVudHJpZXMoZGF0YSk7XG5cbiAgbGluZU5lc3RlZERhdGEgPSBuZXN0KClcbiAgXHQua2V5KGNvbG9yVmFsdWUpXG4gIFx0LmVudHJpZXMoZGF0YSk7XG4gICAgXG4gIFxuXHR4U2NhbGUwXG4gIFx0LmRvbWFpbihkYXRhQnlHcm91cC5tYXAoZCA9PiBkLmtleSkpXG5cblx0eFNjYWxlMVxuICAgIC5kb21haW4oZGF0YUJ5R3JvdXBbMF0udmFsdWVzLm1hcChjb2xvclZhbHVlKSlcbiAgICAucmFuZ2VSb3VuZChbMCwgeFNjYWxlMC5iYW5kd2lkdGgoKV0pXG4gICAgLnBhZGRpbmcoMC4wMSk7XG5cblx0eVNjYWxlXG4gIFx0LmRvbWFpbihbbWluKGRhdGEsIHlWYWx1ZSksIG1heChkYXRhLCB5VmFsdWUpXSlcbiAgXG4gIGNvbG9yU2NhbGVcbiAgXHQuZG9tYWluKGRhdGFCeUdyb3VwWzBdLnZhbHVlcy5tYXAoY29sb3JWYWx1ZSkpXG5cbiAgXG4gIGcuYXBwZW5kKCd0ZXh0JylcbiAgICAuYXR0cignY2xhc3MnLCAndGl0bGUnKVxuICAgIC5hdHRyKCd5JywgLTEwKVxuICAgIC5hdHRyKCd4JywgaW5uZXJXaWR0aCAvIDIpXG4gICAgLmF0dHIoJ3RleHQtYW5jaG9yJywgJ21pZGRsZScpXG4gICAgLnRleHQodGl0bGUpO1xuIFxuXG4gICAgcmVuZGVyKCk7XG4gIH0pOyJdLCJuYW1lcyI6WyJzZWxlY3QiLCJ0aW1lRm9ybWF0Iiwic2NhbGVCYW5kIiwic2NhbGVMaW5lYXIiLCJzY2FsZU9yZGluYWwiLCJzY2hlbWVDYXRlZ29yeTEwIiwiYXhpc0JvdHRvbSIsImF4aXNMZWZ0IiwibWF4IiwibWluIiwibGluZSIsIm5lc3QiXSwibWFwcGluZ3MiOiI7OztFQUFPLE1BQU0sV0FBVyxHQUFHLENBQUMsU0FBUyxFQUFFLEtBQUssS0FBSztFQUNqRCxFQUFFLE1BQU07RUFDUixJQUFJLFVBQVU7RUFDZCxJQUFJLFlBQVk7RUFDaEIsSUFBSSxPQUFPO0VBQ1gsSUFBSSxVQUFVO0VBQ2QsSUFBSSxPQUFPO0VBQ1gsSUFBSSxrQkFBa0I7RUFDdEIsR0FBRyxHQUFHLEtBQUssQ0FBQztFQUNaO0FBQ0E7RUFDQSxFQUFFLE1BQU0sTUFBTSxHQUFHLFNBQVMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDO0VBQ3pDLEtBQUssSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO0VBQy9CLEVBQUUsTUFBTSxXQUFXLEdBQUcsTUFBTTtFQUM1QixLQUFLLEtBQUssRUFBRSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUM7RUFDeEIsT0FBTyxJQUFJLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0VBQzdCLEVBQUUsV0FBVztFQUNiLEtBQUssS0FBSyxDQUFDLE1BQU0sQ0FBQztFQUNsQixPQUFPLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQztFQUM5QixRQUFRLENBQUMsYUFBYSxFQUFFLENBQUMsR0FBRyxP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