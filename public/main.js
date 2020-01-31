let geojson
const w = 1500
const h = 500

document.addEventListener('DOMContentLoaded', () => {
  console.log("JS loaded")


  d3.json('/assets/world.json', function(err, json) {
    // createMap(json)
    geojson = json
    console.log(geojson)
    update(geojson)
  })

  d3.json('/assets/place-names.json', function(err, json) {
    // createMap(json)
    namesjson = json
    console.log(namesjson)
    update(namesjson)
  })

  var context = d3.select('body')
                  .append('canvas')
                  .attr("width", w)
                  .attr("height", h)
                  .node()
                  .getContext('2d')

  var projection = d3.geoEquirectangular()
    // .scale(100)
    // .center([0, 0])
    .translate([0, 0])
    // .fitSize([900, 500], geojson)


  var geoGenerator = d3.geoPath()
    .projection(projection)
    .context(context)

  function update(geojson) {
    projection.fitExtent([[0, 0], [w, h]], geojson)

    context.lineWidth = 0.5
    context.strokeStyle = '#333'

    context.beginPath()
    geoGenerator({type: 'FeatureCollection', features: geojson.features})
    context.stroke()
  }

})
