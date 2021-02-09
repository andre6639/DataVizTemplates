import vl from 'vega-lite-api';
export const viz = vl
	.markCircle({  
    size: 9000, 
    opacity: 0.02, 
  })
  .encode(
    vl.x().fieldN('origin'),
    vl.y().fieldQ('horsepower'),
    vl.tooltip().fieldN('name')
  );

// .scale({ zero: false }),