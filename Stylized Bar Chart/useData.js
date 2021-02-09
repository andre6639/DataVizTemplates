import React, { useState, useEffect } from 'react';
import { csv } from 'd3';
const csvUrl =
  'https://gist.githubusercontent.com/andre6639/584864fb9c49f0f36bc5d93d6da8f6fe/raw/39503c6a2382fea24fa4d396f3c66842ef482972/UN_population_2019.csv';

export const useData = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const row = (d) => {
      d.Population = +d['2020'] * 1000;
      return d;
    };
    csv(csvUrl, row).then((data) => {
      setData(data.slice(0, 10));
    });
  }, []);

  return data;
};
