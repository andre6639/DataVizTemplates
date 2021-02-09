import {
  select,
  forceSimulation,
  forceManyBody,
  forceLink,
  forceCenter,
} from 'd3';

const nodes = [
  { id: 'Alice' },
  { id: 'Bob' },
  { id: 'Carol' },
];

const links = [
  { source: 0, target: 1 }, // Alice → Bob
  { source: 1, target: 2 }, // Bob → Carol
];

const svg = select('#container');
const width = +svg.attr('width');
const height = +svg.attr('height');
const centerX = width / 2;
const centerY = height / 2;

const simulation = forceSimulation(nodes)
  .force('charge', forceManyBody())
  .force('link', forceLink(links))
  .force('center', forceCenter(centerX, centerY));

const circles = svg
  .selectAll('circle')
  .data(nodes)
  .enter()
  .append('circle')
  .attr('r', 10);

const lines = svg
  .selectAll('line')
  .data(links)
  .enter()
  .append('line')
  .attr('stroke', 'black')
  // .attr('x1', (link) => {
  //   console.log(link.source);
  //   // nodes[link.source].x;
  // });

// console.log(nodes[0]);

simulation.on('tick', () => {
  circles
    .attr('cx', (node) => node.x)
    .attr('cy', (node) => node.y);
  lines
    .attr('x1', link => link.source.x)
    .attr('y1', link => link.source.y)
    .attr('x2', link => link.target.x)
    .attr('y2', link => link.target.y);
