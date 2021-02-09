import {bumps} from './testdata.js';

const svg = d3.select("svg");
const margin = ({top: 30, right: 0, bottom: 10, left: 0});
const height = 500;
const width = 900;
const m = 58; // number of values per series
const n = 5; // number of series
const z = d3.scaleOrdinal(d3.schemeCategory10);
const xz = d3.range(m); // the x-values shared by all series
const yz = d3.range(n).map(() => bumps(m)); // the y-values of each of the n series
const tooltipData = d3.transpose(yz).map(series => series.map(value => value.toPrecision(2)).reverse());
const y01z = d3.stack()
    .keys(d3.range(n))
  (d3.transpose(yz)) // stacked yz
  .map((data, i) => data.map(([y0, y1]) => [y0, y1, i]));
const x = d3.scaleBand()
    .domain(xz)
    .rangeRound([margin.left, width - margin.right])
    .padding(0.12);
const xAxis = svg => svg.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x).tickSizeOuter(0).tickFormat(() => ""));
const yMax = d3.max(yz, y => d3.max(y));
const y1Max = d3.max(y01z, y => d3.max(y, d => d[1]));
const y = d3.scaleLinear()
    .domain([0, y1Max])
    .range([height - margin.bottom, margin.top]);

const tooltip = d3.select('#chartContainer').append('div');

tooltip
    .attr("id", "test")
    .style("position", "absolute")
    .style("visibility", "hidden")
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "1px")
    .style("border-radius", "5px")
    .style("padding", "10px");

const tooltipContent = tooltip.append("svg");
let elementWidths = [];


export function chart() {

  const rect = svg.selectAll("g")
    .data(y01z)
    .join("g")
      .attr("fill", (d, i) => z(i))
    .selectAll("rect")
    .data(d => d)
    .join("rect")
      .attr("x", (d, i) => x(i))
      .attr("y", height - margin.bottom)
      .attr("width", x.bandwidth())
      .attr("height", 0)
  		.on("mouseover", (data, i) => setTooltipContent(data, i))
      .on("mousemove", function(){return tooltip.style("top", (event.pageY-20)+"px").style("left",(event.pageX+40)+"px");})
      .on("mouseout", function(){return tooltip.style("visibility", "hidden");});

  svg.append("g")
    .call(xAxis);
  
  const layoutButtons = svg.append("g")
  	.attr("transform", "translate(15, 15)");
  
	layoutButtons.selectAll("g")
  	.data([["Grouped", "black", [0,0]],["Stacked", "black", [100,0]]])
  	.join("g")
  		.each(makeButtons);
  let buttonState = "off";
  
  function makeButtons(data) {
    const [text, color, position] = data;
    const selection = d3.select(this);
    selection.attr("transform", `translate(${position[0]},${position[1]})`);
  	selection.append("circle")
    	.attr("cy", -6)
  		.attr("r", 6)
  		.attr("stroke", color)
    	.attr("stroke-width", 3)
  		.attr("fill", "none");
    selection.append("text")
  		.attr("x", 9)
    	.text(text);
    elementWidths.push(selection.node().getBBox().width);
  }
  
  function positionButtons(widths, height, alignment, maxWidth) {
  	let rows = [];
    let i = 0;
    let x = 0;
    while(i<widths.length && x <= maxWidth) {
    	rows.push(x);
      x += widths[i] + 20;
      i++;
    }
    if(x > maxWidth) {
      let tempRows = rows;
      let j = 0;
      while(i < widths.length) {
      
      }
    }
  }
  
  function toggleState() {
		if(buttonState === "off") {
     buttonStacked.select("circle").attr("fill", "black");
     buttonState = "on";
  	} else {
  	 buttonStacked.select("circle").attr("fill", "none");
     buttonState = "off";
  	}
	}

  function transitionGrouped() {
    y.domain([0, yMax]);

    rect.transition()
        .duration(500)
        .delay((d, i) => i * 20)
        .attr("x", (d, i) => x(i) + x.bandwidth() / n * d[2])
        .attr("width", x.bandwidth() / n)
      .transition()
        .attr("y", d => y(d[1] - d[0]))
        .attr("height", d => y(0) - y(d[1] - d[0]));
  }

  function transitionStacked() {
    y.domain([0, y1Max]);

    rect.transition()
        .duration(500)
        .delay((d, i) => i * 20)
        .attr("y", d => y(d[1]))
        .attr("height", d => y(d[0]) - y(d[1]))
      .transition()
        .attr("x", (d, i) => x(i))
        .attr("width", x.bandwidth());
  }

  function update(layout) {
    if (layout === "stacked") transitionStacked();
    else transitionGrouped();
  }
  
  return Object.assign(svg.node(), {update});
}

function setTooltipContent(event, datapoint) {
  const data = tooltipData[y01z[datapoint[2]].indexOf(datapoint)]
  tooltipContent.selectAll("circle")
    .data(data)
    .join("circle")
      .attr("cx", 12)
      .attr("cy", (d, i) => i*20+10)
      .attr("fill", (d, i) => z(n-1-i))
      .attr("r", 8);

  tooltipContent.selectAll("text")
    .data(data)
    .join("text")
      .text(d => d)
      .attr("x", 25)
      .attr("y", (d, i) => i*20+16);

  const bbox = tooltipContent.node().getBBox();

  tooltipContent.attr("width", bbox.width+bbox.x).attr("height", bbox.height+bbox.y);
  
  tooltip.style("visibility", "visible");
}