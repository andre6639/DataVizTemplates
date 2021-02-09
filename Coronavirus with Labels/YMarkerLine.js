export const YMarkerLine = ({value, yScale, innerWidth}) => {
    const markerLineY = yScale(value);
    const markerLineX1 = 0;
    const markerLineX2 = innerWidth;
    return (
      <>
        {' '}
        <line
          class="marker-line"
          x1={markerLineX1}
          y1={markerLineY}
          x2={markerLineX2}
          y2={markerLineY}
        />
        <text
          text-anchor="middle"
          alignment-baseline="hanging"
          x={markerLineX1 - 12}
          y={markerLineY + 5}
        >
          1,000,000
        </text>
      </>
    );
  };