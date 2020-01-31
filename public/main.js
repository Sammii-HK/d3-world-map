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
       .style("fill", "steelblue");
    update(geojson)
  })

  d3.json('/assets/place-names.json', function(err, json) {
    
  })

  var projection = d3.geoEquirectangular()
                      // .scale(100)
                      // .center([0, 0])
                      // .translate([0, 0])
                      // .fitSize([w, h], geojson)
                      // .fitExtent([[0, 0], [w, h]], geojson)
                      .translate([w/2, h/2])
                      // .scale([200]);

  //Define path generator, using the Albers USA projection
	var path = d3.geoPath()
    			 		 .projection(projection)


	//Create SVG element
	var svg = d3.select("body")
    					.append("svg")
    					.attr("width", w)
    					.attr("height", h)


})
