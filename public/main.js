let geojson
const w = 1500
const h = 500

document.addEventListener('DOMContentLoaded', () => {
  console.log("JS loaded")


  d3.json('/assets/world.json', function(err, json) {
    //Bind data and create one path per GeoJSON feature
		svg.selectAll("path")
		   .data(json.features)
		   .enter()
		   .append("path")
		   .attr("d", path)
       .style("fill", "steelblue")
  })

  d3.json('/assets/place-names.json', function(data) {
    console.log("data:", data.features[0])
    console.log("data:", data.features[0].geometry.coordinates)
    svg.selectAll("circle")
		   .data(data)
		   .enter()
		   .append("circle")
		   .attr("cx", function(d) {
			   return projection([d.geometry.coordinates[1], d.geometry.coordinates[0]])[0]
		   })
		   .attr("cy", function(d) {
			   return projection([d.geometry.coordinates[1], d.geometry.coordinates[0]])[1]
		   })
		   .attr("r", 5)
		   .style("fill", "yellow")
		   .style("stroke", "gray")
		   .style("stroke-width", 0.25)
		   .style("opacity", 0.75)
		   .append("title")			//Simple tooltip
		   .text(function(d) {
				return d.geometry.coordinates
		   })
  })

  var projection = d3.geoEquirectangular()
                      // .scale(100)
                      // .center([0, 0])
                      // .translate([0, 0])
                      // .fitSize([w, h], geojson)
                      // .fitExtent([[0, 0], [w, h]], geojson)
                      .translate([w/2, h/2])
                      // .scale([200])

  //Define path generator, using the Albers USA projection
	var path = d3.geoPath()
    			 		 .projection(projection)


	//Create SVG element
	var svg = d3.select("body")
    					.append("svg")
    					.attr("width", w)
    					.attr("height", h)

  //Define what to do when dragging
	var dragging = function(d) {

		//Log out d3.event, so you can see all the goodies inside
		//console.log(d3.event);

		//Get the current (pre-dragging) translation offset
		var offset = projection.translate();

		//Augment the offset, following the mouse movement
		offset[0] += d3.event.dx;
		offset[1] += d3.event.dy;

		//Update projection with new offset
		projection.translate(offset);

		//Update all paths and circles
		svg.selectAll("path")
			.attr("d", path);

		// svg.selectAll("circle")
		// 	.attr("cx", function(d) {
		// 		return projection([d.lon, d.lat])[0];
		// 	})
		// 	.attr("cy", function(d) {
		// 		return projection([d.lon, d.lat])[1];
		// 	});

	}

	//Then define the drag behavior
	var drag = d3.drag()
      				 .on("drag", dragging);

	//Create a container in which all pan-able elements will live
	var map = svg.append("g")
				.attr("id", "map")
				.call(drag);  //Bind the dragging behavior


})
