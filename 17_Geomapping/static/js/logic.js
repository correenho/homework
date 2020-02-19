var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.light",
  accessToken: API_KEY
});

var satellitemap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.satellite",
    accessToken: API_KEY
  });
    
    
var baseMaps = {
    "Satellite Map": satellitemap,
    "Light Map": lightmap
  };
    
var map = L.map("map", {
  center: [34, -30],
  zoom: 3,
  layers: [satellitemap]
});

L.control.layers(baseMaps).addTo(map);
    
function createColor(eqdata) {
    if (eqdata >= 6) {
        return "#cc0000";
        }
    else if (eqdata >= 5) {
        return "#ff0000";
        }
    else if (eqdata >= 4) {
        return "#ff6600";
        }
    else if (eqdata >= 3) {
        return "#ffcc00";
          }
    else if (eqdata >= 2) {
        return "#ffff00";
          }
    else if (eqdata >= 1) {
        return "#ccff33";
          }
    else {
        return "#00cc00";
          }
}

var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson";

d3.json(url, function(response) {

    console.log(response);
    
    response.features.forEach((data) => {
        L.circle([data.geometry.coordinates[0], data.geometry.coordinates[1]], 
        {
        radius: data.properties.mag*20000,
        color: createColor(data.properties.mag),
        fillColor: createColor(data.properties.mag),
        fillOpacity: 0.7
        }).addTo(map);
})
    
})