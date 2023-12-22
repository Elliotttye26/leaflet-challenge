# leaflet-challenge

Below are the primary steps taken during this task. For #2 after the point shown below, it becomes much more open with how someone can structure the visualization. One of the fun aspects of this assignment is how customizable the entire thing becomes once you get the basics of the map in place. I did not touch part 2, the optional portion so I could save some time and work with my team on Project 3.

# Your first task is to visualize an earthquake dataset.
# 1 
const url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson';

# 2 
Import and visualize the data by doing the following
/ Create the tile layer that will be the background of our map
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


# useful links utilized during this assignment:

https://stackoverflow.com/questions/2508704/draw-a-circle-with-a-radius-and-points-around-the-edge
https://leafletjs.com/reference.html
https://git.bootcampcontent.com/University-of-Texas-at-Austin/UTA-VIRT-DATA-PT-08-2023-U[…]Leaflet/Solved/Advanced/static/js/logic.js?ref_type=heads
https://leafletjs.com/examples/layers-control/
