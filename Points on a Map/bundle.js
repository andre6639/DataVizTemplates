(function (React$1, ReactDOM, d3$1, topojson) {
  'use strict';

  var React$1__default = 'default' in React$1 ? React$1['default'] : React$1;
  ReactDOM = ReactDOM && Object.prototype.hasOwnProperty.call(ReactDOM, 'default') ? ReactDOM['default'] : ReactDOM;

  const jsonUrl =
    'https://unpkg.com/world-atlas@2.0.2/countries-50m.json';

  const useWorldAtlas = () => {
    const [data, setData] = React$1.useState(null);


    React$1.useEffect(() => {
      d3$1.json(jsonUrl).then(topology => {
        const { countries, land } = topology.objects;
      	setData({
          land: topojson.feature(topology, land),
        	interiors: topojson.mesh(topology, countries, (a, b) => a !== b)
        });
      });
    }, []);
    
    return data;
  };

  const csvUrl =
    'https://gist.githubusercontent.com/andre6639/d9c674f2833eddf18885db0f88276c76/raw/8d276caf72686ba783c16882b8db523c168810a7/worldcities_+50,000pop_conicse.csv';

  console.log(csvUrl);

  const useCities = () => {
    const [data, setData] = React$1.useState(null);

    const row = (d) => {
      d.lat = +d.lat;
      d.lng = +d.lng;
      d.population = +d.population;
      return d;
    };

    React$1.useEffect(() => {
      d3$1.csv(csvUrl, row).then(setData);
    }, []);

    return data;
  };

  const projection = d3.geoEqualEarth();
  const path = d3.geoPath(projection);
  const graticule = d3$1.geoGraticule();

  const Marks = ({
    worldAtlas: { land, interiors },
    cities,
    sizeScale,
    sizeValue,
  }) => (
    React.createElement( 'g', { className: "marks" },
      React.createElement( 'path', { className: "sphere", d: path({ type: 'Sphere' }) }),
      React.createElement( 'path', { className: "graticules", d: path(graticule()) }),
      land.features.map((feature) => (
        React.createElement( 'path', { className: "land", d: path(feature) })
      )),
      React.createElement( 'path', { className: "interiors", d: path(interiors) }),
      cities.map((d) => {
        const [x, y] = projection([d.lng, d.lat]);
        return React.createElement( 'circle', { cx: x, cy: y, r: sizeScale(sizeValue(d)) })
      })
    )
  );

  // import {  } from 'd3';


  const width = 960;
  const height = 500;

  const App = () => {
    const worldAtlas = useWorldAtlas();
    const cities = useCities();

    if (!worldAtlas || !cities) {
      return React$1__default.createElement( 'pre', null, "Loading..." );
    }
    
    const sizeValue = d => d.population;
    const maxRadius = 12;
    
    const sizeScale = d3$1.scaleSqrt()
    	.domain([0, d3$1.max(cities, sizeValue)])
    	.range ([0, maxRadius]);

    return (
      React$1__default.createElement( 'svg', { width: width, height: height },
        React$1__default.createElement( Marks, { worldAtlas: worldAtlas, cities: cities, sizeScale: sizeScale, sizeValue: sizeValue })
      )
    );
  };
  const rootElement = document.getElementById('root');
  ReactDOM.render(React$1__default.createElement( App, null ), rootElement);

}(React, ReactDOM, d3, topojson));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbInVzZVdvcmxkQXRsYXMuanMiLCJ1c2VDaXRpZXMuanMiLCJNYXJrcy5qcyIsImluZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsganNvbiB9IGZyb20gJ2QzJztcbmltcG9ydCB7IGZlYXR1cmUsIG1lc2ggfSBmcm9tICd0b3BvanNvbic7XG5cbmNvbnN0IGpzb25VcmwgPVxuICAnaHR0cHM6Ly91bnBrZy5jb20vd29ybGQtYXRsYXNAMi4wLjIvY291bnRyaWVzLTUwbS5qc29uJztcblxuZXhwb3J0IGNvbnN0IHVzZVdvcmxkQXRsYXMgPSAoKSA9PiB7XG4gIGNvbnN0IFtkYXRhLCBzZXREYXRhXSA9IHVzZVN0YXRlKG51bGwpO1xuXG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBqc29uKGpzb25VcmwpLnRoZW4odG9wb2xvZ3kgPT4ge1xuICAgICAgY29uc3QgeyBjb3VudHJpZXMsIGxhbmQgfSA9IHRvcG9sb2d5Lm9iamVjdHM7XG4gICAgXHRzZXREYXRhKHtcbiAgICAgICAgbGFuZDogZmVhdHVyZSh0b3BvbG9neSwgbGFuZCksXG4gICAgICBcdGludGVyaW9yczogbWVzaCh0b3BvbG9neSwgY291bnRyaWVzLCAoYSwgYikgPT4gYSAhPT0gYilcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9LCBbXSk7XG4gIFxuICByZXR1cm4gZGF0YTtcbn07IiwiaW1wb3J0IHsgdXNlU3RhdGUsIHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNzdiB9IGZyb20gJ2QzJztcblxuY29uc3QgY3N2VXJsID1cbiAgJ2h0dHBzOi8vZ2lzdC5naXRodWJ1c2VyY29udGVudC5jb20vYW5kcmU2NjM5L2Q5YzY3NGYyODMzZWRkZjE4ODg1ZGIwZjg4Mjc2Yzc2L3Jhdy84ZDI3NmNhZjcyNjg2YmE3ODNjMTY4ODJiOGRiNTIzYzE2ODgxMGE3L3dvcmxkY2l0aWVzXys1MCwwMDBwb3BfY29uaWNzZS5jc3YnO1xuXG5jb25zb2xlLmxvZyhjc3ZVcmwpXG5cbmV4cG9ydCBjb25zdCB1c2VDaXRpZXMgPSAoKSA9PiB7XG4gIGNvbnN0IFtkYXRhLCBzZXREYXRhXSA9IHVzZVN0YXRlKG51bGwpO1xuXG4gIGNvbnN0IHJvdyA9IChkKSA9PiB7XG4gICAgZC5sYXQgPSArZC5sYXQ7XG4gICAgZC5sbmcgPSArZC5sbmc7XG4gICAgZC5wb3B1bGF0aW9uID0gK2QucG9wdWxhdGlvbjtcbiAgICByZXR1cm4gZDtcbiAgfTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNzdihjc3ZVcmwsIHJvdykudGhlbihzZXREYXRhKTtcbiAgfSwgW10pO1xuXG4gIHJldHVybiBkYXRhO1xufTtcbiIsImltcG9ydCB7IGdlb1BhdGgsIGdlb05hdHVyYWxFYXJ0aDEsIGdlb0dyYXRpY3VsZSB9IGZyb20gJ2QzJztcblxuY29uc3QgcHJvamVjdGlvbiA9IGQzLmdlb0VxdWFsRWFydGgoKTtcbmNvbnN0IHBhdGggPSBkMy5nZW9QYXRoKHByb2plY3Rpb24pO1xuY29uc3QgZ3JhdGljdWxlID0gZ2VvR3JhdGljdWxlKCk7XG5cbmV4cG9ydCBjb25zdCBNYXJrcyA9ICh7XG4gIHdvcmxkQXRsYXM6IHsgbGFuZCwgaW50ZXJpb3JzIH0sXG4gIGNpdGllcyxcbiAgc2l6ZVNjYWxlLFxuICBzaXplVmFsdWUsXG59KSA9PiAoXG4gIDxnIGNsYXNzTmFtZT1cIm1hcmtzXCI+XG4gICAgPHBhdGggY2xhc3NOYW1lPVwic3BoZXJlXCIgZD17cGF0aCh7IHR5cGU6ICdTcGhlcmUnIH0pfSAvPlxuICAgIDxwYXRoIGNsYXNzTmFtZT1cImdyYXRpY3VsZXNcIiBkPXtwYXRoKGdyYXRpY3VsZSgpKX0gLz5cbiAgICB7bGFuZC5mZWF0dXJlcy5tYXAoKGZlYXR1cmUpID0+IChcbiAgICAgIDxwYXRoIGNsYXNzTmFtZT1cImxhbmRcIiBkPXtwYXRoKGZlYXR1cmUpfSAvPlxuICAgICkpfVxuICAgIDxwYXRoIGNsYXNzTmFtZT1cImludGVyaW9yc1wiIGQ9e3BhdGgoaW50ZXJpb3JzKX0gLz5cbiAgICB7Y2l0aWVzLm1hcCgoZCkgPT4ge1xuICAgICAgY29uc3QgW3gsIHldID0gcHJvamVjdGlvbihbZC5sbmcsIGQubGF0XSk7XG4gICAgICByZXR1cm4gPGNpcmNsZSBjeD17eH0gY3k9e3l9IHI9e3NpemVTY2FsZShzaXplVmFsdWUoZCkpfSAvPlxuICAgIH0pfVxuICA8L2c+XG4pO1xuIiwiLy8gaW1wb3J0IHsgIH0gZnJvbSAnZDMnO1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xuaW1wb3J0IHsgc2NhbGVTcXJ0LCBtYXggfSBmcm9tICdkMyc7XG5pbXBvcnQgeyB1c2VXb3JsZEF0bGFzIH0gZnJvbSAnLi91c2VXb3JsZEF0bGFzJztcbmltcG9ydCB7IHVzZUNpdGllcyB9IGZyb20gJy4vdXNlQ2l0aWVzJztcbmltcG9ydCB7IE1hcmtzIH0gZnJvbSAnLi9NYXJrcyc7XG5cblxuY29uc3Qgd2lkdGggPSA5NjA7XG5jb25zdCBoZWlnaHQgPSA1MDA7XG5cbmNvbnN0IEFwcCA9ICgpID0+IHtcbiAgY29uc3Qgd29ybGRBdGxhcyA9IHVzZVdvcmxkQXRsYXMoKTtcbiAgY29uc3QgY2l0aWVzID0gdXNlQ2l0aWVzKCk7XG5cbiAgaWYgKCF3b3JsZEF0bGFzIHx8ICFjaXRpZXMpIHtcbiAgICByZXR1cm4gPHByZT5Mb2FkaW5nLi4uPC9wcmU+O1xuICB9XG4gIFxuICBjb25zdCBzaXplVmFsdWUgPSBkID0+IGQucG9wdWxhdGlvbjtcbiAgY29uc3QgbWF4UmFkaXVzID0gMTI7XG4gIFxuICBjb25zdCBzaXplU2NhbGUgPSBzY2FsZVNxcnQoKVxuICBcdC5kb21haW4oWzAsIG1heChjaXRpZXMsIHNpemVWYWx1ZSldKVxuICBcdC5yYW5nZSAoWzAsIG1heFJhZGl1c10pXG5cbiAgcmV0dXJuIChcbiAgICA8c3ZnIHdpZHRoPXt3aWR0aH0gaGVpZ2h0PXtoZWlnaHR9PlxuICAgICAgPE1hcmtzIHdvcmxkQXRsYXM9e3dvcmxkQXRsYXN9IGNpdGllcz17Y2l0aWVzfSBzaXplU2NhbGU9e3NpemVTY2FsZX0gc2l6ZVZhbHVlPXtzaXplVmFsdWV9Lz5cbiAgICA8L3N2Zz5cbiAgKTtcbn07XG5jb25zdCByb290RWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyb290Jyk7XG5SZWFjdERPTS5yZW5kZXIoPEFwcCAvPiwgcm9vdEVsZW1lbnQpO1xuIl0sIm5hbWVzIjpbInVzZVN0YXRlIiwidXNlRWZmZWN0IiwianNvbiIsImZlYXR1cmUiLCJtZXNoIiwiY3N2IiwiZ2VvR3JhdGljdWxlIiwiUmVhY3QiLCJzY2FsZVNxcnQiLCJtYXgiXSwibWFwcGluZ3MiOiI7Ozs7OztFQUlBLE1BQU0sT0FBTztFQUNiLEVBQUUsd0RBQXdELENBQUM7QUFDM0Q7RUFDTyxNQUFNLGFBQWEsR0FBRyxNQUFNO0VBQ25DLEVBQUUsTUFBTSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsR0FBR0EsZ0JBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN6QztBQUNBO0VBQ0EsRUFBRUMsaUJBQVMsQ0FBQyxNQUFNO0VBQ2xCLElBQUlDLFNBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJO0VBQ25DLE1BQU0sTUFBTSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDO0VBQ25ELEtBQUssT0FBTyxDQUFDO0VBQ2IsUUFBUSxJQUFJLEVBQUVDLGdCQUFPLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQztFQUNyQyxPQUFPLFNBQVMsRUFBRUMsYUFBSSxDQUFDLFFBQVEsRUFBRSxTQUFTLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7RUFDOUQsT0FBTyxDQUFDLENBQUM7RUFDVCxLQUFLLENBQUMsQ0FBQztFQUNQ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