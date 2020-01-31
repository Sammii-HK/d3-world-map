let geojson

document.addEventListener('DOMContentLoaded', () => {
  console.log("JS loaded")


  d3.json('/assets/world.json', function(err, json) {
    // createMap(json);
    geojson = json
    console.log(geojson);
    update(geojson);
  })

  var context = d3.select('body')
                  .append('canvas')
                  .node()
                  .getContext('2d');

  var projection = d3.geoEquirectangular()
    .scale(200)
    .translate([200, 150]);

  var geoGenerator = d3.geoPath()
    .projection(projection)
    .context(context);

  function update(geojson) {
    context.lineWidth = 0.5;
    context.strokeStyle = '#aaa';

    context.beginPath();
    geoGenerator({type: 'FeatureCollection', features: geojson.features})
    context.stroke();
  }

})
