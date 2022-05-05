
(function() { 
//iife - this wraps the code in a function so it isn't accidentally exposed 
//to other javascript in other files. It is not required.

    var margin = {top: 20, right: 30, bottom: 20, left: 30},
      width = 2700 - margin.left - margin.right,
      height = 600 - margin.top - margin.bottom;

    //read in our csv file 
    d3.json("./love-actually.json").then((data) => {
        const svg = d3.select("#arcDiagram");

        //create an svg g element and add 50px of padding
        const chart = svg.append("g")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

        console.log(data)

          //Node names

          var allNodes = data.nodes.map(function(d){return d.name})

          //Linear Scale for x position
          var x = d3.scalePoint()
            .range([0, width])
            .domain(allNodes)

            //Adding circles for nodes
            chart
              .selectAll("circle")
                .data(data.nodes)
                //.enter()
                .join("circle")
                //.append("circle") //map data attributes to channels
                    .attr("cx", function (d) { return(x(d.name)) } )
                    .attr("cy", height-30 )
                    .attr("r", 8)
                    .style("opacity", 1.0)
                    .style("fill", "red");

            chart
            .selectAll("text")
            .data(data.nodes)
            .enter()
            .append("text")
              .attr("x", function(d){ return(x(d.name))})
              .attr("y", height-10)
              .text(function(d){ return(d.name)})
              .style("text-anchor", "middle")

            var idToNode = {};
              data.nodes.forEach(function (n) {
                idToNode[n.id] = n;
              });

      function buildArc(d) {
      let start = x(idToNode[d.source].name);
      let end = x(idToNode[d.target].name);
//      const arcPath = ['M', margin.left+300, start, 'A', Math.abs(start - end)/2, ',', Math.abs(start-end)/2, 0,0,",",
//                  start < end ? 1: 0, margin.left+300, end].join(' ');
//      return arcPath;
        return ['M', start, height-30,    // the arc starts at the coordinate x=start, y=height-30 (where the starting node is)
                        'A',                            // This means we're gonna build an elliptical arc
                        (start - end)/2, ',',    // Next 2 lines are the coordinates of the inflexion point. Height of this point is proportional with start - end distance
                        (start - end)/2, 0, 0, ',',
                        start < end ? 1 : 0, end, ',', height-30] // We always want the arc on top. So if end is before start, putting 0 here turn the arc upside down.
                        .join(' ');
  }

        // create the arcs
    const arcs = chart.selectAll("arcs")
    .data(data.links)
    .enter().append("path")
    .attr("d", d => buildArc(d))
    .style('opacity', 1.0)
     .style("fill", "none")
     .attr("stroke", "black");
//           //Add links
//            chart
//               .selectAll("line")
//               .data(data.links)
//               .join("line")
//               .attr('d', function (d) {
//                      start = x(idToNode[d.source].name)    // X position of start node on the X axis
//                      end = x(idToNode[d.target].name)      // X position of end node
//                      return ['M', start, height-30,    // the arc starts at the coordinate x=start, y=height-30 (where the starting node is)
//                        'A',                            // This means we're gonna build an elliptical arc
//                        (start - end)/2, ',',    // Next 2 lines are the coordinates of the inflexion point. Height of this point is proportional with start - end distance
//                        (start - end)/2, 0, 0, ',',
//                        start < end ? 1 : 0, end, ',', height-30] // We always want the arc on top. So if end is before start, putting 0 here turn the arc upside down.
//                        .join(' ');
//                    })
//               .style('opacity', 1.0)
//               .style("fill", "white")
//               .style("stroke", "black");

 });

})();
