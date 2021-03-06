(function (React, ReactDOM, d3) {
  'use strict';

  React = React && Object.prototype.hasOwnProperty.call(React, 'default') ? React['default'] : React;
  ReactDOM = ReactDOM && Object.prototype.hasOwnProperty.call(ReactDOM, 'default') ? ReactDOM['default'] : ReactDOM;

  const width = 960;
  const height = 500;
  const centerX = width / 2;
  const centerY = height / 2;
  const strokeWidth = 6;
  const eyeOffsetX = 90;
  const eyeOffsetY = 100;
  const eyeRadius = 50;
  const mouthWidth = 50;
  const mouthRadius = 140;

  const mouthArc = d3.arc()
      .innerRadius(mouthRadius)
      .outerRadius(mouthRadius + mouthWidth)
      .startAngle(Math.PI / 2)
      .endAngle(Math.PI * 3/2);

  const App = () => (
    React.createElement( 'svg', { width: width, height: height },  
      React.createElement( 'g', { transform: `translate(${centerX},${centerY})` },
        React.createElement( 'circle', { 
          r: centerY - strokeWidth / 2, fill: "yellow", stroke: "black", 'stroke-width': strokeWidth }),
        React.createElement( 'circle', { 
          cx: -eyeOffsetX, cy: -eyeOffsetY, r: eyeRadius }),
        React.createElement( 'circle', { 
          cx: eyeOffsetX, cy: -eyeOffsetY, r: eyeRadius }),
        React.createElement( 'path', { d: mouthArc() })
      )
    )
  );


  const rootElement = document.getElementById('root');
  ReactDOM.render(React.createElement( App, null ), rootElement);

}(React, ReactDOM, d3));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcbmltcG9ydCB7IGFyYyB9IGZyb20gJ2QzJztcblxuY29uc3Qgd2lkdGggPSA5NjA7XG5jb25zdCBoZWlnaHQgPSA1MDA7XG5jb25zdCBjZW50ZXJYID0gd2lkdGggLyAyO1xuY29uc3QgY2VudGVyWSA9IGhlaWdodCAvIDI7XG5jb25zdCBzdHJva2VXaWR0aCA9IDY7XG5jb25zdCBleWVPZmZzZXRYID0gOTA7XG5jb25zdCBleWVPZmZzZXRZID0gMTAwO1xuY29uc3QgZXllUmFkaXVzID0gNTA7XG5jb25zdCBtb3V0aFdpZHRoID0gNTA7XG5jb25zdCBtb3V0aFJhZGl1cyA9IDE0MDtcblxuY29uc3QgbW91dGhBcmMgPSBhcmMoKVxuICAgIC5pbm5lclJhZGl1cyhtb3V0aFJhZGl1cylcbiAgICAub3V0ZXJSYWRpdXMobW91dGhSYWRpdXMgKyBtb3V0aFdpZHRoKVxuICAgIC5zdGFydEFuZ2xlKE1hdGguUEkgLyAyKVxuICAgIC5lbmRBbmdsZShNYXRoLlBJICogMy8yKTtcblxuY29uc3QgQXBwID0gKCkgPT4gKFxuICA8c3ZnIHdpZHRoPXt3aWR0aH0gaGVpZ2h0PXtoZWlnaHR9PiBcbiAgICA8ZyB0cmFuc2Zvcm09e2B0cmFuc2xhdGUoJHtjZW50ZXJYfSwke2NlbnRlcll9KWB9PlxuICAgICAgPGNpcmNsZSBcbiAgICAgICAgcj17Y2VudGVyWSAtIHN0cm9rZVdpZHRoIC8gMn0gXG4gICAgICAgIGZpbGw9XCJ5ZWxsb3dcIlxuICAgICAgICBzdHJva2U9XCJibGFja1wiXG4gICAgICAgIHN0cm9rZS13aWR0aD17c3Ryb2tlV2lkdGh9XG4gICAgICAvPlxuICAgICAgPGNpcmNsZSBcbiAgICAgICAgY3g9ey1leWVPZmZzZXRYfSBcbiAgICAgICAgY3k9ey1leWVPZmZzZXRZfVxuICAgICAgICByPXtleWVSYWRpdXN9IFxuICAgICAgLz5cbiAgICAgIDxjaXJjbGUgXG4gICAgICAgIGN4PXtleWVPZmZzZXRYfSBcbiAgICAgICAgY3k9ey1leWVPZmZzZXRZfVxuICAgICAgICByPXtleWVSYWRpdXN9IFxuICAgICAgLz5cbiAgICAgIDxwYXRoIGQ9e21vdXRoQXJjKCl9Lz5cbiAgICA8L2c+XG4gIDwvc3ZnPlxuKTtcblxuXG5jb25zdCByb290RWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyb290Jyk7XG5SZWFjdERPTS5yZW5kZXIoPEFwcCAvPiwgcm9vdEVsZW1lbnQpOyJdLCJuYW1lcyI6WyJhcmMiXSwibWFwcGluZ3MiOiI7Ozs7OztFQUlBLE1BQU0sS0FBSyxHQUFHLEdBQUcsQ0FBQztFQUNsQixNQUFNLE1BQU0sR0FBRyxHQUFHLENBQUM7RUFDbkIsTUFBTSxPQUFPLEdBQUcsS0FBSyxHQUFHLENBQUMsQ0FBQztFQUMxQixNQUFNLE9BQU8sR0FBRyxNQUFNLEdBQUcsQ0FBQyxDQUFDO0VBQzNCLE1BQU0sV0FBVyxHQUFHLENBQUMsQ0FBQztFQUN0QixNQUFNLFVBQVUsR0FBRyxFQUFFLENBQUM7RUFDdEIsTUFBTSxVQUFVLEdBQUcsR0FBRyxDQUFDO0VBQ3ZCLE1BQU0sU0FBUyxHQUFHLEVBQUUsQ0FBQztFQUNyQixNQUFNLFVBQVUsR0FBRyxFQUFFLENBQUM7RUFDdEIsTUFBTSxXQUFXLEdBQUcsR0FBRyxDQUFDO0FBQ3hCO0VBQ0EsTUFBTSxRQUFRLEdBQUdBLE1BQUcsRUFBRTtFQUN0QixLQUFLLFdBQVcsQ0FBQyxXQUFXLENBQUM7RUFDN0IsS0FBSyxXQUFXLENBQUMsV0FBVyxHQUFHLFVBQVUsQ0FBQztFQUMxQyxLQUFLLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztFQUM1QixLQUFLLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUM3QjtFQUNBLE1BQU0sR0FBRyxHQUFHO0VBQ1osRUFBRSw4QkFBSyxPQUFPLEtBQU0sRUFBQyxRQUFRO0VBQzdCLElBQUksNEJBQUcsV0FBVyxDQUFDLFVBQVUsRUFBRSxPQUFPLENBQUMsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0VBQ25ELE1BQU07RUFDTixRQUFRLEdBQUcsT0FBTyxHQUFHLFdBQVcsR0FBRyxDQUFFLEVBQzdCLE1BQUssUUFBUSxFQUNiLFFBQU8sT0FBTyxFQUNkLGdCQUFjLGFBQVk7RUFFbEMsTUFBTTtFQUNOLFFBQVEsSUFBSSxDQUFDLFVBQVcsRUFDaEIsSUFBSSxDQUFDLFVBQVcsRUFDaEIsR0FBRyxXQUFVO0VBRXJCLE1BQU07RUFDTixRQUFRLElBQUksVUFBVyxFQUNmLElBQUksQ0FBQyxVQUFXLEVBQ2hCLEdBQUcsV0FBVTtFQUVyQixNQUFNLCtCQUFNLEdBQUcsUUFBUSxJQUFHLENBQUU7RUFDNUIsS0FBUTtFQUNSLEdBQVE7RUFDUixDQUFDLENBQUM7QUFDRjtBQUNBO0VBQ0EsTUFBTSxXQUFXLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQztFQUNwRCxRQUFRLENBQUMsTUFBTSxDQUFDLHFCQUFDLFNBQUcsRUFBRyxFQUFFLFdBQVcsQ0FBQzs7OzsifQ==