(function (React, ReactDOM) {
  'use strict';

  var React__default = 'default' in React ? React['default'] : React;
  ReactDOM = ReactDOM && Object.prototype.hasOwnProperty.call(ReactDOM, 'default') ? ReactDOM['default'] : ReactDOM;

  const width = 960;
  const height = 500;
  const circleRadius = 30;
  const initialMousePosition = { x: width / 2, y: height / 2 };

  const App = () => {
    const [mousePosition, setMousePosition] = React.useState(initialMousePosition);
    
    const handleMouseMove = React.useCallback(event => {
      const { clientX, clientY } = event;
      setMousePosition({ x: clientX, y: clientY });
  	}, [setMousePosition]);
    return (
    	React__default.createElement( 'svg', { width: width, height: height, onMouseMove: handleMouseMove },  
          React__default.createElement( 'circle', { 
            cx: mousePosition.x, cy: mousePosition.y, r: circleRadius })
      )
    );
  };

  const rootElement = document.getElementById('root');
  ReactDOM.render(React__default.createElement( App, null ), rootElement);

}(React, ReactDOM));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSwgdXNlQ2FsbGJhY2sgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcblxuY29uc3Qgd2lkdGggPSA5NjA7XG5jb25zdCBoZWlnaHQgPSA1MDA7XG5jb25zdCBjaXJjbGVSYWRpdXMgPSAzMDtcbmNvbnN0IGluaXRpYWxNb3VzZVBvc2l0aW9uID0geyB4OiB3aWR0aCAvIDIsIHk6IGhlaWdodCAvIDIgfTtcblxuY29uc3QgQXBwID0gKCkgPT4ge1xuICBjb25zdCBbbW91c2VQb3NpdGlvbiwgc2V0TW91c2VQb3NpdGlvbl0gPSB1c2VTdGF0ZShpbml0aWFsTW91c2VQb3NpdGlvbik7XG4gIFxuICBjb25zdCBoYW5kbGVNb3VzZU1vdmUgPSB1c2VDYWxsYmFjayhldmVudCA9PiB7XG4gICAgY29uc3QgeyBjbGllbnRYLCBjbGllbnRZIH0gPSBldmVudDtcbiAgICBzZXRNb3VzZVBvc2l0aW9uKHsgeDogY2xpZW50WCwgeTogY2xpZW50WSB9KTtcblx0fSwgW3NldE1vdXNlUG9zaXRpb25dKTtcbiAgcmV0dXJuIChcbiAgXHQ8c3ZnIHdpZHRoPXt3aWR0aH0gaGVpZ2h0PXtoZWlnaHR9IG9uTW91c2VNb3ZlPXtoYW5kbGVNb3VzZU1vdmV9PiBcbiAgICAgICAgPGNpcmNsZSBcbiAgICAgICAgICBjeD17bW91c2VQb3NpdGlvbi54fSBcbiAgICAgICAgICBjeT17bW91c2VQb3NpdGlvbi55fVxuICAgICAgICAgIHI9e2NpcmNsZVJhZGl1c30gXG4gICAgICAgIC8+XG4gICAgPC9zdmc+XG4gICk7XG59O1xuXG5jb25zdCByb290RWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyb290Jyk7XG5SZWFjdERPTS5yZW5kZXIoPEFwcCAvPiwgcm9vdEVsZW1lbnQpOyJdLCJuYW1lcyI6WyJ1c2VTdGF0ZSIsInVzZUNhbGxiYWNrIiwiUmVhY3QiXSwibWFwcGluZ3MiOiI7Ozs7OztFQUdBLE1BQU0sS0FBSyxHQUFHLEdBQUcsQ0FBQztFQUNsQixNQUFNLE1BQU0sR0FBRyxHQUFHLENBQUM7RUFDbkIsTUFBTSxZQUFZLEdBQUcsRUFBRSxDQUFDO0VBQ3hCLE1BQU0sb0JBQW9CLEdBQUcsRUFBRSxDQUFDLEVBQUUsS0FBSyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDO0FBQzdEO0VBQ0EsTUFBTSxHQUFHLEdBQUcsTUFBTTtFQUNsQixFQUFFLE1BQU0sQ0FBQyxhQUFhLEVBQUUsZ0JBQWdCLENBQUMsR0FBR0EsY0FBUSxDQUFDLG9CQUFvQixDQUFDLENBQUM7RUFDM0U7RUFDQSxFQUFFLE1BQU0sZUFBZSxHQUFHQyxpQkFBVyxDQUFDLEtBQUssSUFBSTtFQUMvQyxJQUFJLE1BQU0sRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLEdBQUcsS0FBSyxDQUFDO0VBQ3ZDLElBQUksZ0JBQWdCLENBQUMsRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDO0VBQ2pELEVBQUUsRUFBRSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQztFQUN4QixFQUFFO0VBQ0YsR0FBR0MsdUNBQUssT0FBTyxLQUFNLEVBQUMsUUFBUSxNQUFPLEVBQUMsYUFBYTtFQUNuRCxRQUFRQTtFQUNSLFVBQVUsSUFBSSxhQUFhLENBQUMsQ0FBRSxFQUNwQixJQUFJLGFBQWEsQ0FBQyxDQUFFLEVBQ3BCLEdBQUcsY0FBYSxDQUNoQjtFQUNWLEtBQVU7RUFDVixJQUFJO0VBQ0osQ0FBQyxDQUFDO0FBQ0Y7RUFDQSxNQUFNLFdBQVcsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0VBQ3BELFFBQVEsQ0FBQyxNQUFNLENBQUNBLDhCQUFDLFNBQUcsRUFBRyxFQUFFLFdBQVcsQ0FBQzs7OzsifQ==