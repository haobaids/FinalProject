// Store API cityLink
const cityLink = "/static/dataset/full-data-geojson.js"
const hospitalLink = "/static/dataset/hospitals.js"

var cityDataLoaded = false;
var hospDataLoaded = false;

// AJAX GET request to the query City URL
let cityData;
$.ajax({
  dataType: "json",
  url: cityLink,
  async: false,
  success: function(data){
    cityData = Array.from(data.features)

    cityData.forEach((el) => {
      el.properties['what-am-i'] = 'city'
    });

    cityDataLoaded = true;
    isLoaded();
  }
});


let hospData;
$.ajax({
  dataType: "json",
  url: hospitalLink,
  async: false,
  success: function(data){
    hospData = Array.from(data.features)

    hospData.forEach((el) => {
      el.properties['what-am-i'] = 'hospital'
    });

    hospDataLoaded = true;
    isLoaded();
  }
});

function isLoaded(){
    if (cityDataLoaded && hospDataLoaded){
        //great
        
        let combinedData = cityData.concat(hospData)

        console.log("[City Data]", cityData)
        console.log("[Hospital Data]", hospData)
        console.log("[Combined Data]", combinedData)

        combinedFeatures(combinedData);
    }
    else {
        //not done yet
    }
}

function combinedFeatures(combinedData) {

  //   // Creates a red marker with the coffee icon
  var cityIcon = L.ExtraMarkers.icon({
    icon: 'fa-number',
    shape: 'square',
    number: 'CITY',
    markerColor: 'green',
    prefix: 'fa',   
  });

  var hospitalIcon = L.icon({
    iconUrl: "/static/dataset/redHospital.png",
    iconSize: [25, 25],    
  });

  var allPoints = L.geoJSON(combinedData, {
        // Define a function we want to run once for each feature in the features array
        // Give each feature a popup describing the place and time of the earthquake
        onEachFeature : function (feature, layer) {
                if (feature.properties["what-am-i"] === "city"){
                    layer.bindPopup(
                        "<h3>" + "Nearest Airport " + feature.properties.airportdist + " miles" +
                        "</h3><hr><p>" + "Avg Income " + (feature.properties.inccyavehh) + "</p>" +
                        "<p> Avg Cummute: " +  feature.properties.trwave + " min"+ "</p>" + 
                        "<p> Crime Score: " +  feature.properties.crmcytotc + "</p>");
                }
                else if (feature.properties["what-am-i"] === "hospital"){
                    layer.bindPopup(
                        "<h3>" + "Hospital Name: " + feature.properties.NAME +
                        "</h3><hr><p>" + "Type Facility: " + (feature.properties.TYPE) + "</p>" +
                        "<p> Address: " +  feature.properties.ADDRESS + "</p>" +
                        "<p> Number of Beds: " +  feature.properties.BEDS + "</p>" + 
                        "<p>URL: " + "<a href='" + feature.properties.WEBSITE + "' target='_blank'>Website</a></p>");                        
                }

                else {
                    alert("something is wrong");
                }
            },            
            pointToLayer: function (feature, latlng) {
            if (feature.properties["what-am-i"] === "city"){
              return new L.marker(latlng,                
                {icon: cityIcon
            });
            }
            else if (feature.properties["what-am-i"] === "hospital"){
              return new L.marker(latlng,
                {icon: hospitalIcon
            });
            }
            else {
              alert("something is wrong");
          }
        }
    });

  // Sending our allPoints layer to the createMap function
  createMap(allPoints);
}

function createMap(citypoints) {

  // Add map layers
 let darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 20,
    id: "mapbox.dark",
    accessToken: API_KEY
  });


  let lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
  maxZoom: 30,
  id: "mapbox.light",
  accessToken: API_KEY
  }); // what goes here?

 // Create our map, giving it the darkmap and citypoints layers to display on load
 var myMap = L.map("map-id", {
  center: [39.8283, -98.5795],
  zoom: 5,
  layers: [darkmap, citypoints]
  });

  // Define a baseMaps object
  var baseMaps = {
    "Dark Map": darkmap,       
    "Light Map": lightmap
  };

  // Create overlay object 
  var overlayMaps = {
    "citypoints": citypoints
    // "hospitalpoints": hospitalpoints
  };


  // Create a layer control
  // Pass in our baseMaps and overlayMaps
  // Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);

}