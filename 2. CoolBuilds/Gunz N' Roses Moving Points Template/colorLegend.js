export const colorLegend = (selection, props) => {
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
}