// import {  } from 'd3';
import React from 'react';
import ReactDOM from 'react-dom';
import { scaleSqrt, max } from 'd3';
import { useWorldAtlas } from './useWorldAtlas';
import { useCities } from './useCities';
import { Marks } from './Marks';


const width = 960;
const height = 500;

const App = () => {
  const worldAtlas = useWorldAtlas();
  const cities = useCities();

  if (!worldAtlas || !cities) {
    return <pre>Loading...</pre>;
  }
  
  const sizeValue = d => d.population;
  const maxRadius = 12;
  
  const sizeScale = scaleSqrt()
  	.domain([0, max(cities, sizeValue)])
  	.range ([0, maxRadius])

  return (
    <svg width={width} height={height}>
      <Marks worldAtlas={worldAtlas} cities={cities} sizeScale={sizeScale} sizeValue={sizeValue}/>
    </svg>
  );
};
const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
