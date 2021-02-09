import { useState, useEffect } from 'react';
import { csv } from 'd3';

const csvUrl =
  'https://gist.githubusercontent.com/andre6639/d9c674f2833eddf18885db0f88276c76/raw/8d276caf72686ba783c16882b8db523c168810a7/worldcities_+50,000pop_conicse.csv';

console.log(csvUrl)

export const useCities = () => {
  const [data, setData] = useState(null);

  const row = (d) => {
    d.lat = +d.lat;
    d.lng = +d.lng;
    d.population = +d.population;
    return d;
  };

  useEffect(() => {
    csv(csvUrl, row).then(setData);
  }, []);

  return data;
};
