console.log(d3.Delaunay);
import { useMemo } from 'react';
export const VoronoiOverlay = ({
  margin,
  innerWidth,
  innerHeight,
  allData,
  lineGenerator,
  xScale,
  xValue,
  yScale,
  yValue,
  onHover,
}) => {
  // useMemo(() => {
  //       console.log('memoizing')
  // }, [lineGenerator]);// innerWidth, innerHeight, onHover]);
  
  return useMemo(() => {
    console.log('memoizing');
    const points = allData.map((d) => [
      lineGenerator.x()(d),
      lineGenerator.y()(d),
    ]);
    const delaunay = d3.Delaunay.from(points);
    const voronoi = delaunay.voronoi([0, 0, innerWidth + 100, innerHeight]);
    return (
      <g className="voronoi">
        {points.map((point, i) => (
          <path
            onMouseEnter={() => onHover(allData[i])}
            d={voronoi.renderCell(i)}
          />
        ))}
      </g>
    );
  }, [allData, lineGenerator, innerWidth, innerHeight, onHover]);
};

//  const handleMouseEnter = (event) => {
//			console.log(event).target;
//	};
