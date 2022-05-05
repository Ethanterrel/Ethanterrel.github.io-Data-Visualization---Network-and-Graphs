
(function() { 
//iife - this wraps the code in a function so it isn't accidentally exposed 
//to other javascript in other files. It is not required.

    var width=800, height=600

    //read in our csv file 
    d3.json("./love-actually.json").then((data) => {
        const svg = d3.select("#scatterplot");

        //create an svg g element and add 50px of padding
        const chart = svg.append("g")
        .attr("transform", `translate(50, 50)`);
        console.log(data)
       // const chart1 = chart.append("g")

        var links = data.links;
        //var links = d3.map(data, function(d){ return data.links});
        var nodes = data.nodes;

        var simulation = d3
         .forceSimulation(nodes)
         .force("charge", d3.forceManyBody().strength(-10.0))
         .force("center", d3.forceCenter(width / 2, height / 2))
         .force("link", d3.forceLink().links(links))
         .on("tick", ticked);

        function link(){
            chart
            //chart = d3.select('.links')
               .selectAll("line")
               .data(links)
               .join("line")
               .attr("x1", function (d) {
                //console.log(d);
                 return d.source.x
             //    console.log(d);
               })
               .attr("y1", function (d) {
                 return d.source.y
               })
               .attr("x2", function (d) {
                 return d.target.x
               })
               .attr("y2", function (d) {
                 return d.target.y
               })
               .style('opacity', 1.0)
               .style("fill", "white")
               .style("stroke", "black");

       }

        function node() {
        chart
            //chart = d3.select('.nodes')
              .selectAll("circle")
                .data(nodes)
                //.enter()
                .join("circle")
                //.append("circle") //map data attributes to channels
                    .attr("cx", function (d) { return d.x; } )
                    .attr("cy", function (d) {return d.y; } )
                    .attr("r", 3)
                    .style("opacity", 1.0)
                    .style("fill", "red");
        }
        function ticked() {
            link()
            node()
        }

 });

})();
