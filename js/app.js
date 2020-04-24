// state boundaries geojson
var stateURL = "../data/states.json"
var json_medIncome;
var json_foodAvai;
var json_foodCons;

var myMap = L.map("map", {
  center: [34.0522, -118.2437],
  zoom: 8
});

d3.json(stateURL, function(error, stateData) {
  if (error) throw error;
  //console.log(stateData.features);

    // Once we get a response, send the data.features object to the createFeatures function
    stateFeatures(stateData.features);
  });

  function stateFeatures(stateData) {

    function onEachFeature(feature, layer) {
      layer.bindPopup("<h3>" + feature.properties.NAME + "</h3>")
    }

var statelines = L.geoJson(stateData, {
  onEachFeature: onEachFeature,
  pointToLayer : function(latlng) {
    return L.polygon(features.geometry.coordinates);
  }
});
createMap(statelines);


//connect from flask
function drawBoundaries(points) {
  var boundaryLayer = points.target;
  info.update(boundaryLayer.feature.properties);

  layer.setStyle({
    weight: 2,
    color: 'black',
    fillOpacity: 0.75
  });
}

//mouseover events
function resetHighlightAvai(e) {
  json_foodAvai.resetStyle(e.target);
  info.update();
};

function resetHighlightCons(e) {
  json_foodCons.resetStyle(e.target);
  info.update();
};

function onEachFeatureCons(feature, layer) {
  layer.on({
    mouseover: highlightFeature,
    mouseout: resetHighlightCons
  });
  layer.bindPopup('<h3>' + feature.properties.NAME + '</h3>');
};

function onEachFeatureAvai(feature, layer) {
  layer.on({
    mouseover: highlightFeature,
    mouseout: resetHighlightAvai
  });
  layer.bindPopup('<h3>' + feature.properties.NAME + '</h3>');
};

var url = ""

// data from flask server
d3.json(url, function(data) {

  var medIncomeURL = "/medIncome";
  var foodAvailURL = "/foodAvail";
  var foodConsURL = "/foodCons";

  d3.json(medIncomeURL, function(income_data) {
    for (i=0; i < data.features.length; i++) {
      Object.defineProperties(income_data).forEach(([key,value]) => {
        if (key == data.features[i].properties.NAME) {
          data.features[i].properties.INCOME = value;
        };
      });
    };

  d3.json(foodAvailURL, function(avail_data) {
    for (i=0; i < data.features.length; i++) {
      Object.defineProperties(avail_data).forEach(([key,value]) => {
        if (key == data.features[i].properties.NAME) {
          data.features[i].properties.AVAILABILITY = value;
        };
      });
    };

    d3.json(foodConsURL, function(consum_data) {
      for (i=0; i < data.features.length; i++) {
        Object.defineProperties(consum_data).forEach(([key,value]) => {
          if (key == data.features[i].properties.NAME) {
            data.features[i].properties.CONSUMPTION = value;
          };
        });
      };

      json_medIncome = L.choropleth(data, {
        valueProperty: "INCOME",

      })



  })

  // Define streetmap and darkmap layers
  var satelitemap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets-basic",
    accessToken: API_KEY
  })

  var streetMap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.dark",
    accessToken: API_KEY
  })

    // Define a baseMaps object to hold our base layers
    var baseMaps = {"Satelite Map": satelitemap,
    "Dark Map": streetMap};

    // Create overlay object to hold our overlay layer
    var overlayMaps = {
      MedianIncome: medIncome,
      FoodAvailability: foodAvail,
      FoodConsumption: foodCons
    };


  // Create a layer control
  // Pass in our baseMaps and overlayMaps
  // Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);

// Grab data with d3
d3.json(incomeData, function(data) {

  // Create a new choropleth layer
  geojson = L.choropleth(data, {

    // Define what  property in the features to use
    valueProperty: "xxx",

    // Set color scale
    colors: [
        "#e8e8e8", "#ace4e4", "#5ac8c8",
        "#dfb0d6", "#a5add3", "#5698b9", 
        "#be64ac", "#8c62aa", "#3b4994"
      ],

    // Number of breaks in step range
    steps: 10,

    // q for quartile, e for equidistant, k for k-means
    mode: "q",
    style: {
      // Border color
      color: "#fff",
      weight: 1,
      fillOpacity: 0.8
    },

    // Binding a pop-up to each layer
    onEachFeature: function(feature, layer) {
      layer.bindPopup("Zip Code: " + feature.properties.ZIP + "<br>Median Household Income:<br>" +
        "$" + feature.properties.MHI2016);
    }
  }).addTo(myMap);

  function createFeatures(earthquakeData) {

    function onEachFeature(feature, layer) {
      layer.bindPopup("<h3>" + feature.properties.place +
        "</h3><hr><p>" + new Date(feature.properties.time) + "</p><p>Magnitude: " + 
        feature.properties.mag + "</p>")}
  
    // Define a function we want to run once for each feature in the features array
    // Give each feature a popup describing the place and time of the earthquake
    var earthquakes = L.geoJSON(earthquakeData, {
      
    //map the description for each point
    onEachFeature : onEachFeature,
    // map the marker color and size
    pointToLayer : function(feature, latlng) {
      return L.circleMarker(latlng,
        {radius: circleSize(feature.properties.mag),
        fillColor: circleColor(feature.properties.mag),
        fillOpacity: 0.75,
        stroke: false,
        bubblingMouseEvent: true}
        );
      }
    });

  // Set up the legend
  var legend = L.control({ position: "bottomright" });
  legend.onAdd = function() {
    var div = L.DomUtil.create("div", "info legend");
    var limits = geojson.options.limits;
    var colors = geojson.options.colors;
    var labels = [];

    // Add min & max
    var legendInfo = "<h1>Median Income</h1>" +
      "<div class=\"labels\">" +
        "<div class=\"min\">" + limits[0] + "</div>" +
        "<div class=\"max\">" + limits[limits.length - 1] + "</div>" +
      "</div>";

    div.innerHTML = legendInfo;

    limits.forEach(function(limit, index) {
      labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
    });

    div.innerHTML += "<ul>" + labels.join("") + "</ul>";
    return div;
  };

  // Adding legend to the map
  legend.addTo(myMap);

});


// --------------------------------------------------------
// Above is useable code; below is copied code from D3.js
// --------------------------------------------------------



// Change the map to reflect the new map data


// Include Fig 2 (static)
// diverging stacked bar chart for food type consumption
// from https://observablehq.com/@d3/diverging-stacked-bar-chart
chart = {
  const svg = d3.create("svg")
      .attr("viewBox", [0, 0, width, height]);

  svg.append("g")
    .selectAll("g")
    .data(series)
    .join("g")
      .attr("fill", d => color(d.key))
    .selectAll("rect")
    .data(d => d.map(v => Object.assign(v, {key: d.key})))
    .join("rect")
      .attr("x", d => x(d[0]))
      .attr("y", ({data: [name]}) => y(name))
      .attr("width", d => x(d[1]) - x(d[0]))
      .attr("height", y.bandwidth())
    .append("title")
      .text(({key, data: [name, value]}) => `${name}
${formatValue(value.get(key))} ${key}`);

  svg.append("g")
      .call(xAxis);

  svg.append("g")
      .call(yAxis);

  return svg.node();
}

data = {
  const categories = {
    "pants-fire": "Pants on fire!",
    "false": "False",
    "mostly-false": "Mostly false",
    "barely-true": "Mostly false", // recategorized
    "half-true": "Half true",
    "mostly-true": "Mostly true",
    "true": "True"
  };

  const data = d3.csvParse(await FileAttachment("politifact.csv").text(), ({speaker: name, ruling: category, count: value}) => categories[category] ? {name, category: categories[category], value: +value} : null);

  // Normalize absolute values to percentage.
  d3.rollup(data, group => {
    const sum = d3.sum(group, d => d.value);
    for (const d of group) d.value /= sum;
  }, d => d.name);

  return Object.assign(data, {
    format: ".0%",
    negative: "← More falsehoods",
    positive: "More truths →",
    negatives: ["Pants on fire!", "False", "Mostly false"],
    positives: ["Half true", "Mostly true", "True"]
  });
}

signs = new Map([].concat(
  data.negatives.map(d => [d, -1]),
  data.positives.map(d => [d, +1])
))

bias = d3.rollups(data, v => d3.sum(v, d => d.value * Math.min(0, signs.get(d.category))), d => d.name)
  .sort(([, a], [, b]) => d3.ascending(a, b))bias = d3.rollups(data, v => d3.sum(v, d => d.value * Math.min(0, signs.get(d.category))), d => d.name)
  .sort(([, a], [, b]) => d3.ascending(a, b))

x = d3.scaleLinear()
  .domain(d3.extent(series.flat(2)))
  .rangeRound([margin.left, width - margin.right])

y = d3.scaleBand()
  .domain(bias.map(([name]) => name))
  .rangeRound([margin.top, height - margin.bottom])
  .padding(2 / 33)

color = d3.scaleOrdinal()
  .domain([].concat(data.negatives, data.positives))
  .range(d3.schemeSpectral[data.negatives.length + data.positives.length])

  xAxis = g => g
  .attr("transform", `translate(0,${margin.top})`)
  .call(d3.axisTop(x)
      .ticks(width / 80)
      .tickFormat(formatValue)
      .tickSizeOuter(0))
  .call(g => g.select(".domain").remove())
  .call(g => g.append("text")
      .attr("x", x(0) + 20)
      .attr("y", -24)
      .attr("fill", "currentColor")
      .attr("text-anchor", "start")
      .text(data.positive))
  .call(g => g.append("text")
      .attr("x", x(0) - 20)
      .attr("y", -24)
      .attr("fill", "currentColor")
      .attr("text-anchor", "end")
      .text(data.negative))

      yAxis = g => g
      .call(d3.axisLeft(y).tickSizeOuter(0))
      .call(g => g.selectAll(".tick").data(bias).attr("transform", ([name, min]) => `translate(${x(min)},${y(name) + y.bandwidth() / 2})`))
      .call(g => g.select(".domain").attr("transform", `translate(${x(0)},0)`))

      formatValue = {
        const format = d3.format(data.format || "");
        return x => format(Math.abs(x));
      }


  //Fig 3 (static)

