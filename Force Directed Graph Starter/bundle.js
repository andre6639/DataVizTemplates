(function (d3) {
  'use strict';

  const nodes = [
    { id: 'Alice' },
    { id: 'Bob' },
    { id: 'Carol' },
  ];

  const links = [
    { source: 0, target: 1 }, // Alice → Bob
    { source: 1, target: 2 }, // Bob → Carol
  ];

  const svg = d3.select('#container');
  const width = +svg.attr('width');
  const height = +svg.attr('height');
  const centerX = width / 2;
  const centerY = height / 2;

  const simulation = d3.forceSimulation(nodes)
    .force('charge', d3.forceManyBody())
    .force('link', d3.forceLink(links))
    .force('center', d3.forceCenter(centerX, centerY));

  const circles = svg
    .selectAll('circle')
    .data(nodes)
    .enter()
    .append('circle')
    .attr('r', 10);

  const lines = svg
    .selectAll('line')
    .data(links)
    .enter()
    .append('line')
    .attr('stroke', 'black');
    // .attr('x1', (link) => {
    //   console.log(link.source);
    //   // nodes[link.source].x;
    // });

  // console.log(nodes[0]);

  simulation.on('tick', () => {
    circles
      .attr('cx', (node) => node.x)
      .attr('cy', (node) => node.y);
    lines
      .attr('x1', link => link.source.x)
      .attr('y1', link => link.source.y)
      .attr('x2', link => link.target.x)
      .attr('y2', link => link.target.y);
  });

}(d3));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIHNlbGVjdCxcbiAgZm9yY2VTaW11bGF0aW9uLFxuICBmb3JjZU1hbnlCb2R5LFxuICBmb3JjZUxpbmssXG4gIGZvcmNlQ2VudGVyLFxufSBmcm9tICdkMyc7XG5cbmNvbnN0IG5vZGVzID0gW1xuICB7IGlkOiAnQWxpY2UnIH0sXG4gIHsgaWQ6ICdCb2InIH0sXG4gIHsgaWQ6ICdDYXJvbCcgfSxcbl07XG5cbmNvbnN0IGxpbmtzID0gW1xuICB7IHNvdXJjZTogMCwgdGFyZ2V0OiAxIH0sIC8vIEFsaWNlIMOiwobCkiBCb2JcbiAgeyBzb3VyY2U6IDEsIHRhcmdldDogMiB9LCAvLyBCb2Igw6LChsKSIENhcm9sXG5dO1xuXG5jb25zdCBzdmcgPSBzZWxlY3QoJyNjb250YWluZXInKTtcbmNvbnN0IHdpZHRoID0gK3N2Zy5hdHRyKCd3aWR0aCcpO1xuY29uc3QgaGVpZ2h0ID0gK3N2Zy5hdHRyKCdoZWlnaHQnKTtcbmNvbnN0IGNlbnRlclggPSB3aWR0aCAvIDI7XG5jb25zdCBjZW50ZXJZID0gaGVpZ2h0IC8gMjtcblxuY29uc3Qgc2ltdWxhdGlvbiA9IGZvcmNlU2ltdWxhdGlvbihub2RlcylcbiAgLmZvcmNlKCdjaGFyZ2UnLCBmb3JjZU1hbnlCb2R5KCkpXG4gIC5mb3JjZSgnbGluaycsIGZvcmNlTGluayhsaW5rcykpXG4gIC5mb3JjZSgnY2VudGVyJywgZm9yY2VDZW50ZXIoY2VudGVyWCwgY2VudGVyWSkpO1xuXG5jb25zdCBjaXJjbGVzID0gc3ZnXG4gIC5zZWxlY3RBbGwoJ2NpcmNsZScpXG4gIC5kYXRhKG5vZGVzKVxuICAuZW50ZXIoKVxuICAuYXBwZW5kKCdjaXJjbGUnKVxuICAuYXR0cigncicsIDEwKTtcblxuY29uc3QgbGluZXMgPSBzdmdcbiAgLnNlbGVjdEFsbCgnbGluZScpXG4gIC5kYXRhKGxpbmtzKVxuICAuZW50ZXIoKVxuICAuYXBwZW5kKCdsaW5lJylcbiAgLmF0dHIoJ3N0cm9rZScsICdibGFjaycpXG4gIC8vIC5hdHRyKCd4MScsIChsaW5rKSA9PiB7XG4gIC8vICAgY29uc29sZS5sb2cobGluay5zb3VyY2UpO1xuICAvLyAgIC8vIG5vZGVzW2xpbmsuc291cmNlXS54O1xuICAvLyB9KTtcblxuLy8gY29uc29sZS5sb2cobm9kZXNbMF0pO1xuXG5zaW11bGF0aW9uLm9uKCd0aWNrJywgKCkgPT4ge1xuICBjaXJjbGVzXG4gICAgLmF0dHIoJ2N4JywgKG5vZGUpID0+IG5vZGUueClcbiAgICAuYXR0cignY3knLCAobm9kZSkgPT4gbm9kZS55KTtcbiAgbGluZXNcbiAgICAuYXR0cigneDEnLCBsaW5rID0+IGxpbmsuc291cmNlLngpXG4gICAgLmF0dHIoJ3kxJywgbGluayA9PiBsaW5rLnNvdXJjZS55KVxuICAgIC5hdHRyKCd4MicsIGxpbmsgPT4gbGluay50YXJnZXQueClcbiAgICAuYXR0cigneTInLCBsaW5rID0+IGxpbmsudGFyZ2V0LnkpO1xufSk7XG4iXSwibmFtZXMiOlsic2VsZWN0IiwiZm9yY2VTaW11bGF0aW9uIiwiZm9yY2VNYW55Qm9keSIsImZvcmNlTGluayIsImZvcmNlQ2VudGVyIl0sIm1hcHBpbmdzIjoiOzs7RUFRQSxNQUFNLEtBQUssR0FBRztFQUNkLEVBQUUsRUFBRSxFQUFFLEVBQUUsT0FBTyxFQUFFO0VBQ2pCLEVBQUUsRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFO0VBQ2YsRUFBRSxFQUFFLEVBQUUsRUFBRSxPQUFPLEVBQUU7RUFDakIsQ0FBQyxDQUFDO0FBQ0Y7RUFDQSxNQUFNLEtBQUssR0FBRztFQUNkLEVBQUUsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUU7RUFDMUIsRUFBRSxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRTtFQUMxQixDQUFDLENBQUM7QUFDRjtFQUNBLE1BQU0sR0FBRyxHQUFHQSxTQUFNLENBQUMsWUFBWSxDQUFDLENBQUM7RUFDakMsTUFBTSxLQUFLLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0VBQ2pDLE1BQU0sTUFBTSxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztFQUNuQyxNQUFNLE9BQU8sR0FBRyxLQUFLLEdBQUcsQ0FBQyxDQUFDO0VBQzFCLE1BQU0sT0FBTyxHQUFHLE1BQU0sR0FBRyxDQUFDLENBQUM7QUFDM0I7RUFDQSxNQUFNLFVBQVUsR0FBR0Msa0JBQWUsQ0FBQyxLQUFLLENBQUM7RUFDekMsR0FBRyxLQUFLLENBQUMsUUFBUSxFQUFFQyxnQkFBYSxFQUFFLENBQUM7RUFDbkMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFQyxZQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7RUFDbEMsR0FBRyxLQUFLLENBQUMsUUFBUSxFQUFFQyxjQUFXLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUM7QUFDbEQ7RUFDQSxNQUFNLE9BQU8sR0FBRyxHQUFHO0VBQ25CLEdBQUcsU0FBUyxDQUFDLFFBQVEsQ0FBQztFQUN0QixHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7RUFDZCxHQUFHLEtBQUssRUFBRTtFQUNWLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQztFQUNuQixHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDakI7RUFDQSxNQUFNLEtBQUssR0FBRyxHQUFHO0VBQ2pCLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQztFQUNwQixHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7RUFDZCxHQUFHLEtBQUssRUFBRTtFQUNWLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQztFQUNqQixHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsT0FBTyxFQUFDO0VBQzFCO0VBQ0E7RUFDQTtFQUNBO0FBQ0E7RUFDQTtBQUNBO0VBQ0EsVUFBVSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsTUFBTTtFQUM1QixFQUFFLE9BQU87RUFDVCxLQUFLLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQztFQUNqQyxLQUFLLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2xDLEVBQUUsS0FBSztFQUNQLEtBQUssSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7RUFDdEMsS0FBSyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztFQUN0QyxLQUFLLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0VBQ3RDLEtBQUssSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUN2QyxDQUFDLENBQUM7Ozs7