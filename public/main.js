let geojson
const w = 1500
const h = 500

document.addEventListener('DOMContentLoaded', () => {
  console.log("JS loaded")


  d3.json('/assets/world.json', function(err, json) {
    // createMap(json)
    // geojson = json
    // console.log(geojson)
    // update(geojson)
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
    // createMap(json)
    // namesjson = json
    // console.log(namesjson)
    // updatePlaces(namesjson)
  })

  // var context = d3.select('body')
  //                 .append('canvas')
  //                 .attr("width", w)
  //                 .attr("height", h)
  //                 .node()
  //                 .getContext('2d')

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

  // var placeNames = d3.selectAll('places')
  //                     .data(namesjson)
  //                     .enter()
  //                     .append('')


  // var geoGenerator = d3.geoPath()
  //   .projection(projection)
  //   .context(context)
  //
  // function update(geojson) {
  //   projection.fitExtent([[0, 0], [w, h]], geojson)
  //
  //   context.lineWidth = 0.5
  //   context.strokeStyle = '#333'
  //
  //   context.beginPath()
  //   geoGenerator({type: 'FeatureCollection', features: geojson.features})
  //   context.stroke()
  // }

  function update(geojson) {
    projection.fitExtent([[0, 0], [w, h]], geojson)
  }

  // function updatePlaces(geojson) {
  //   projection.fitExtent([[0, 0], [w, h]], geojson)
  //
  //   context.lineWidth = 0.1
  //   context.strokeStyle = '#475'
  //
  //   context.beginPath()
  //   geoGenerator({type: 'FeatureCollection', features: geojson.features})
  //   context.stroke()
  // }

})
