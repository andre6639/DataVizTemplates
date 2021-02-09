(function (vega, vegaLite, vl, vegaTooltip, d3) {
  'use strict';

  vega = vega && Object.prototype.hasOwnProperty.call(vega, 'default') ? vega['default'] : vega;
  vegaLite = vegaLite && Object.prototype.hasOwnProperty.call(vegaLite, 'default') ? vegaLite['default'] : vegaLite;
  vl = vl && Object.prototype.hasOwnProperty.call(vl, 'default') ? vl['default'] : vl;

  // Appearance customization to improve readability.
  // See https://vega.github.io/vega-lite/docs/
  const dark = '#3e3c38';
  const config = {
    axis: {
      domain: false,
      tickColor: 'lightGray'
    },
    style: {
      "guide-label": {
        fontSize: 20,
        fill: dark
      },
      "guide-title": {
        fontSize: 30,
        fill: dark
      }
    }
  };

  const csvUrl = 'https://gist.githubusercontent.com/curran/8c131a74b85d0bb0246233de2cff3f52/raw/194c2fc143790b937c42bf086a5a44cb3c55340e/auto-mpg.csv';

  const getData = async () => {
    const data = await d3.csv(csvUrl);
    
    // Have a look at the attributes available in the console!
    console.log(data[0]);

    return data;
  };

  const viz = vl
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

  vl.register(vega, vegaLite, {
    view: { renderer: 'svg' },
    init: view => { view.tooltip(new vegaTooltip.Handler().call); }
  });

  const run = async () => {
    const marks = viz
      .data(await getData())
      .width(window.innerWidth)
      .height(window.innerHeight)
      .autosize({ type: 'fit', contains: 'padding' })
      .config(config);
    
    document.body.appendChild(await marks.render());
  };
  run();

}(vega, vegaLite, vl, vegaTooltip, d3));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbImNvbmZpZy5qcyIsImdldERhdGEuanMiLCJ2aXouanMiLCJpbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBBcHBlYXJhbmNlIGN1c3RvbWl6YXRpb24gdG8gaW1wcm92ZSByZWFkYWJpbGl0eS5cbi8vIFNlZSBodHRwczovL3ZlZ2EuZ2l0aHViLmlvL3ZlZ2EtbGl0ZS9kb2NzL1xuY29uc3QgZGFyayA9ICcjM2UzYzM4JztcbmV4cG9ydCBjb25zdCBjb25maWcgPSB7XG4gIGF4aXM6IHtcbiAgICBkb21haW46IGZhbHNlLFxuICAgIHRpY2tDb2xvcjogJ2xpZ2h0R3JheSdcbiAgfSxcbiAgc3R5bGU6IHtcbiAgICBcImd1aWRlLWxhYmVsXCI6IHtcbiAgICAgIGZvbnRTaXplOiAyMCxcbiAgICAgIGZpbGw6IGRhcmtcbiAgICB9LFxuICAgIFwiZ3VpZGUtdGl0bGVcIjoge1xuICAgICAgZm9udFNpemU6IDMwLFxuICAgICAgZmlsbDogZGFya1xuICAgIH1cbiAgfVxufTsiLCJpbXBvcnQgeyBjc3YgfSBmcm9tICdkMyc7XG5cbmNvbnN0IGNzdlVybCA9ICdodHRwczovL2dpc3QuZ2l0aHVidXNlcmNvbnRlbnQuY29tL2N1cnJhbi84YzEzMWE3NGI4NWQwYmIwMjQ2MjMzZGUyY2ZmM2Y1Mi9yYXcvMTk0YzJmYzE0Mzc5MGI5MzdjNDJiZjA4NmE1YTQ0Y2IzYzU1MzQwZS9hdXRvLW1wZy5jc3YnO1xuXG5leHBvcnQgY29uc3QgZ2V0RGF0YSA9IGFzeW5jICgpID0+IHtcbiAgY29uc3QgZGF0YSA9IGF3YWl0IGNzdihjc3ZVcmwpO1xuICBcbiAgLy8gSGF2ZSBhIGxvb2sgYXQgdGhlIGF0dHJpYnV0ZXMgYXZhaWxhYmxlIGluIHRoZSBjb25zb2xlIVxuICBjb25zb2xlLmxvZyhkYXRhWzBdKTtcblxuICByZXR1cm4gZGF0YTtcbn07IiwiaW1wb3J0IHZsIGZyb20gJ3ZlZ2EtbGl0ZS1hcGknO1xuZXhwb3J0IGNvbnN0IHZpeiA9IHZsXG5cdC5tYXJrQ2lyY2xlKHsgIFxuICAgIHNpemU6IDkwMDAsIFxuICAgIG9wYWNpdHk6IDAuMDIsIFxuICB9KVxuICAuZW5jb2RlKFxuICAgIHZsLngoKS5maWVsZE4oJ29yaWdpbicpLFxuICAgIHZsLnkoKS5maWVsZFEoJ2hvcnNlcG93ZXInKSxcbiAgICB2bC50b29sdGlwKCkuZmllbGROKCduYW1lJylcbiAgKTtcblxuLy8gLnNjYWxlKHsgemVybzogZmFsc2UgfSksIiwiaW1wb3J0IHZlZ2EgZnJvbSAndmVnYSc7XG5pbXBvcnQgdmVnYUxpdGUgZnJvbSAndmVnYS1saXRlJztcbmltcG9ydCB2bCBmcm9tICd2ZWdhLWxpdGUtYXBpJztcbmltcG9ydCB7IEhhbmRsZXIgfSBmcm9tICd2ZWdhLXRvb2x0aXAnO1xuaW1wb3J0IHsgY29uZmlnIH0gZnJvbSAnLi9jb25maWcnO1xuaW1wb3J0IHsgZ2V0RGF0YSB9IGZyb20gJy4vZ2V0RGF0YSc7XG5pbXBvcnQgeyB2aXogfSBmcm9tICcuL3Zpeic7XG5cbnZsLnJlZ2lzdGVyKHZlZ2EsIHZlZ2FMaXRlLCB7XG4gIHZpZXc6IHsgcmVuZGVyZXI6ICdzdmcnIH0sXG4gIGluaXQ6IHZpZXcgPT4geyB2aWV3LnRvb2x0aXAobmV3IEhhbmRsZXIoKS5jYWxsKTsgfVxufSk7XG5cbmNvbnN0IHJ1biA9IGFzeW5jICgpID0+IHtcbiAgY29uc3QgbWFya3MgPSB2aXpcbiAgICAuZGF0YShhd2FpdCBnZXREYXRhKCkpXG4gICAgLndpZHRoKHdpbmRvdy5pbm5lcldpZHRoKVxuICAgIC5oZWlnaHQod2luZG93LmlubmVySGVpZ2h0KVxuICAgIC5hdXRvc2l6ZSh7IHR5cGU6ICdmaXQnLCBjb250YWluczogJ3BhZGRpbmcnIH0pXG4gICAgLmNvbmZpZyhjb25maWcpO1xuICBcbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChhd2FpdCBtYXJrcy5yZW5kZXIoKSk7XG59O1xucnVuKCk7Il0sIm5hbWVzIjpbImNzdiIsIkhhbmRsZXIiXSwibWFw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