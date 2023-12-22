// # 1 Get your dataset
const url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson';
// # 2 Import and Visualize
// Create the tile layer that will be the background of our map
let streets = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});
// create the map object
// Using the Permian Basin as the center
var myMap = L.map("map", {
    center: [31.99, -102.07],
    zoom: 15,
    layers: [streets]
});
// define basemaps as the streetmap
let baseMaps = {
    "streets": streets
};
// define the earthquake layergroup and tectonic plate layergroups for the map
let earthquake_data = new L.LayerGroup();
let tectonics = new L.LayerGroup();
// define the overlays and link the layergroups to separate overlays
let overlays = {
    "Earthquakes": earthquake_data,
    "Tectonic Plates": tectonics
};
//add a control layer and pass in baseMaps and overlays
L.control.layers(baseMaps, overlays).addTo(myMap);
//this styleInfo function will dictate the stying for all of the earthquake points on the map
function styleInfo(feature) {
    return {
        color: chooseColor(feature.geometry.coordinates[2]),
        radius: chooseRadius(feature.properties.mag),
        fillClor: chooseColor(feature.geometry.coordinates[2])
    }
};
// add color to markers based on radius
function chooseColor(depth) {
    if (depth <= 10) return "green";
    else if (depth > 10 & depth <= 25) return "yellow";
    else if (depth > 25 & depth <= 40) return "orange";
    else if (depth > 40 & depth <= 55) return "blue";
    else if (depth > 55 & depth <= 70) return "purple";
    else return "red";
};
//define a function to determine the radius of each earthquake marker
function chooseRadius(magnitude) {
    return magnitude*5;
};
function chooseRadius(magnitude) {
    if (magnitude <= 1) return 5;
    else if (magnitude > 1 & magnitude <= 2) return 10;
    else if (magnitude > 2 & magnitude <= 3) return 15;
    else if (magnitude > 3 & magnitude <= 4) return 20;
    else if (magnitude > 4 & magnitude <= 5) return 25;
    else if (magnitude > 5 & magnitude <= 6) return 30;
    else if (magnitude > 6 & magnitude <= 7) return 35;
    else if (magnitude > 7 & magnitude <= 8) return 40;
    else return 45;
};
// add earthquake data into overlay
d3.json(url).then(function (data) {
    L.geoJson(data, {
        pointToLayer: function (feature, latlon) {
            return L.circleMarker(latlon).bindPopup(feature.id);
        },
        style: styleInfo
    }).addTo(earthquake_data);
    earthquake_data.addTo(myMap);
});
// create a legend
var legend = L.control({ position: "bottomright" });
legend.onAdd = function(myMap) {
    var div = L.DomUtil.create("div", "legend");
       div.innerHTML += "<h4>Depth Color Legend</h4>";
       div.innerHTML += '<i style="background: red"></i><span>(Depth < 10)</span><br>';
       div.innerHTML += '<i style="background: orange"></i><span>(10 < Depth <= 25)</span><br>';
       div.innerHTML += '<i style="background: yellow"></i><span>(25 < Depth <= 40)</span><br>';
       div.innerHTML += '<i style="background: pink"></i><span>(40 < Depth <= 55)</span><br>';
       div.innerHTML += '<i style="background: blue"></i><span>(55 < Depth <= 70)</span><br>';
       div.innerHTML += '<i style="background: green"></i><span>(Depth > 70)</span><br>';
    return div;
  };
  //add the legend to the map
  legend.addTo(myMap);