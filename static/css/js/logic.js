    // Create the tile layer that will be the background of our map
 var URL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson";
 var mapboxURL = "https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}?"
 var mapboxKey = "pk.eyJ1IjoicmdhbGluZG8xMjUiLCJhIjoiY2syNnRnc2E1MDNoNTNvcm9ycWZud2p3bSJ9.k8nKqQB9fW4ADBRsdS054Q"

d3.json(URL, function(data) {
    createFeatures(data.features);
});
function createFeatures(earthquakeData) {

function chooseColor(magnitude) {
    if (magnitude < 1) {
        return "orange"
    }
    else if (magnitude < 2) {
        return "gold"
    }
    else if (magnitude < 3) {
        return "yellow"
    }
    else if (magnitude < 4) {
        return "green"
    }
    else if (magnitude < 5) {
        return "orangered"
    }
    else if (magnitude < 6) {
        return "maroon"
    }
    else {
        return "red"
    };

function createFeatures(earthquakeData) {
    function onEachFeature(feature, layer){
        layer.bindPopup(feature.properties.place)
    };

    var earthquakes =l.geoJSON(earthquakeData, {
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, {
                radius: feature.properties.mag * 2,
             fillColor: chooseColor(feature.properties.mag),
                opacity: 1,
                fillOpacity: 0.5
            });
         },
        onEachFeature: onEachFeature
    });
    createMap(earthquakes);
}
function createMap(earthquakes) {

var map = L.tileLayer(`${mapboxURL}pk.eyJ1IjoicmdhbGluZG8xMjUiLCJhIjoiY2syNnRnc2E1MDNoNTNvcm9ycWZud2p3bSJ9.k8nKqQB9fW4ADBRsdS054Q${mapboxKey}`);
var myMap = l.map("map"), {
   center: [
    37.09, -95.71
    ],
    zoom: 3.25,
    layers: [streetmap, earthquakes]
}
L.control.layers(baseMaps,overlayMaps, {
    collapsed: false
 }).addTo(myMap);
}