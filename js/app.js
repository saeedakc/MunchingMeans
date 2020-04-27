//----------------------------------------------
// Choropleth begin
//----------------------------------------------

// state boundaries geojson
var stateURL = "../data/states.json"
var medIncome;
var foodAvai;
var foodCons;

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


//mouseover events
function resetHighlightInc(e) {
  medIncome.resetStyle(e.target);
  info.update();
};

function resetHighlightAvai(e) {
  foodAvai.resetStyle(e.target);
  info.update();
};

function resetHighlightCons(e) {
  foodCons.resetStyle(e.target);
  info.update();
};

function onEachFeatureInc(feature, layer) {
  layer.on({
    mouseover: highlightFeature,
    mouseout: resetHighlightInc
  });
  layer.bindPopup('<h3>' + feature.properties.NAME + '</h3>');
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

// data from flask server
var medIncomeURL = "/medIncome";
var foodTableURL = "/foodtable";
var foodConsURL = "/foodcons";

var new_data;

d3.json(medIncomeURL, function(income_data) {
  for (i=0; i < new_data.length; i++) {
    Object.defineProperties(income_data.State).forEach(([key,value]) => {
      if (key == new_data.State[i]) {
        new_data.features[i].properties.INCOME = value;
      };
    });
  };

d3.json(foodConsURL, function(consum_data) {
  for (i=0; i < new_data.length; i++) {
    Object.defineProperties(consum_data['State Name']).forEach(([key,value]) => {
      if (key == new_data.State[i]) {
        new_data.features[i].properties.FOODCONSUMPTION = value;
      };
    });
  };

  d3.json(foodTableURL, function(veggie_data) {
    for (i=0; i < new_data.length; i++) {
      Object.defineProperties(veggie_data['State Name']).forEach(([key,value]) => {
        if (key == new_data.State[i]) {
          new_data.features[i].properties.VEGCONSUMPTION = value;
        };
      });
    };

    json_medIncome = L.choropleth(new_data, {
      valueProperty: "INCOME",
      scale: ['#ECE2F0', '#1C9099'],
      steps: 5,
      // q for quartile, e for equideistant, k for k-means
      mode: 'q',
      style: {
        color: '#000',
        weight: 1,
        fillOpacity: 0.75
      },
      onEachFeature: onEachFeatureInc
    });

    json_foodCons = L.choropleth(new_data, {
      valueProperty: "FOODCONSUMPTION",
      scale: ['#FDE0DD', '#C51B8A'],
      steps: 5,
      // q for quartile, e for equideistant, k for k-means
      mode: 'q',
      style: {
        color: '#000',
        weight: 1,
        fillOpacity: 0.75
      },
      onEachFeature: onEachFeatureAvai
    });

    json_vegCons = L.choropleth(new_data, {
      valueProperty: "VEGCONSUMPTION",
      scale: ['#F7FCB9', '#31A354'],
      steps: 5,
      // q for quartile, e for equideistant, k for k-means
      mode: 'q',
      style: {
        color: '#000',
        weight: 1,
        fillOpacity: 0.75
      },
      onEachFeature: onEachFeatureCons

    }).addTo(myMap);


  // Define streetmap and darkmap layers
  var satelitemap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets-basic",
    accessToken: API_KEY
  })

  var darkMap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.dark",
    accessToken: API_KEY
  })

    // Define a baseMaps object to hold our base layers
    var baseMaps = {"Satelite Map": satelitemap,
    "Dark Map": darkMap};

    // Create overlay object to hold our overlay layer
    var overlayMaps = {
      MedianIncome: json_medIncome,
      FoodConsumption: json_foodCons,
      VegConsumption: json_vegCons
    };


      // div object will be located in top right corner and have additional info

      info.onAdd = function(map) {
        this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
        this.update();
        return this._div;
    };

    info.update = function(props) {
        this._div.innerHTML = '<h4>State Info</h4>' + (props ?
            '<b>' + props.STATE + '</b><br />Median Income: $' + props.INCOME + '<br>Food Consumption:' + (props.FoodConsumption).toFixed(2) + '%' + '<br>Vegetable Consumption:' + props.VegConsumption :
            'Hover over a state');
    };

    info.addTo(myMap);



    // Pass our map layers into our layer control
    // Add the layer control to the map
    L.control.layers(baseMaps, overlayMaps, { collapsed: false, position: 'bottomright' }).addTo(myMap);
});
});
});
};



//---------------------------------------------
// End Choropleth; begin bar chart
//---------------------------------------------


// Set up our chart
var svgWidth = innerWidth - 250;
var svgHeight = innerHeight;

var margin = {
  top: 50,
  right: 50,
  bottom: 120,
  left: 120
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

var svg = d3
  .select("#barchart")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight)
  .classed("chart", true);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);


  
  var foodAvailURL = "/foodAvail";


// Import data
d3.csv(cctblURL).then(function(cctbl) {

  // Format the data
  cctbl.forEach(function(data) {
    data.food_group;
    data['Total'] = +data.total;
  });

  var barSpacing = 10; // desired space between each bar

  // Create a 'barWidth' variable so that the bar chart spans the entire chartWidth.
  var barWidth = (chartWidth - (barSpacing * (food_group.length - 1))) / food_group.length;

  // Create code to build the bar chart using the tvData.
  chartGroup.selectAll(".bar")
    .data(foodTable)
    .enter()
    .append("rect")
    .classed("bar", true)
    .attr("width", d => barWidth)
    .attr("height", d => d.total)
    .attr("x", (d, i) => i * (barWidth + barSpacing))
    .attr("y", d => chartHeight - d.total);
}).catch(function(error) {
  console.log(error);
});

    // Step 6: Initialize tool tip
    // ==============================
    var toolTip = d3.tip()
      .attr("class", "d3-tip")
      .offset([80, -60])
      .html(d => (`Food Group: ${d.food_group}<br>Consumed: ${d.total}`));

    // Step 7: Create tooltip in the chart
    // ==============================
    chartGroup.call(toolTip);

    // Step 8: Create event listeners to display and hide the tooltip
    // ==============================
    chartGroup.on("mouseover", function(data) {
      toolTip.show(data, this);
    })
      // onmouseout event
      .on("mouseout", function(data, index) {
        toolTip.hide(data);
      });

    // Create axes labels
    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left + 50)
      .attr("x", 0 - (height / 2)-50)
      .attr("dy", "1em")
      .attr("class", "axisText")
      .text("Food Group");

    chartGroup.append("text")
      .attr("transform", `translate(${width / 2 - 50}, ${height + margin.top + 10})`)
      .attr("class", "axisText")
      .text("Food Consumption");







//-----------------------------------------------
// End bar chart; begin lowVhigh bar charts
//-----------------------------------------------




var cctblURL = "/commoditycons";


d3.json(cctblURL).then(function(data) {
  // Grab values from the response json object to build the plots
  var foodGroup = data['Food Group'];
  var low_income = data['li_2007-08'];
  var high_income = data['hi_2007-08'];


var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = event.target.getBounds(),
    height = event.target.getBounds();

var x0 = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

var x1 = d3.scale.ordinal();

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x0)
    .tickSize(0)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var color = d3.scale.ordinal()
    .range(["#ca0020","#0571b0"]);

var svg = d3.select('groupBar').append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.json("data.json", function(error, data) {

  var categoriesNames = data.map(function(d) { return d.food_group; });
  var rateNames = data.map(function(d) { return d.rate; });

  x0.domain(categoriesNames);
  x1.domain(rateNames).rangeRoundBands([0, x0.rangeBand()]);
  y.domain([0, d3.max(data, function(categorie) { return d3.max(categorie.values, function(d) { return d.value; }); })]);

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .style('opacity','0')
      .call(yAxis)
  .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .style('font-weight','bold')
      .text("Value");

  svg.select('.y').transition().duration(500).delay(1300).style('opacity','1');

  var slice = svg.selectAll(".slice")
      .data(data)
      .enter().append("g")
      .attr("class", "g")
      .attr("transform",function(d) { return "translate(" + x0(d.categorie) + ",0)"; });

  slice.selectAll("rect")
      .data(function(d) { return d.values; })
  .enter().append("rect")
      .attr("width", x1.rangeBand())
      .attr("x", function(d) { return x1(d.rate); })
      .style("fill", function(d) { return color(d.rate) })
      .attr("y", function(d) { return y(0); })
      .attr("height", function(d) { return height - y(0); })
      .on("mouseover", function(d) {
          d3.select(this).style("fill", d3.rgb(color(d.rate)).darker(2));
      })
      .on("mouseout", function(d) {
          d3.select(this).style("fill", color(d.rate));
      });

  slice.selectAll("rect")
      .transition()
      .delay(function (d) {return Math.random()*1000;})
      .duration(1000)
      .attr("y", function(d) { return y(d.value); })
      .attr("height", function(d) { return height - y(d.value); });

  //Legend
  var legend = svg.selectAll(".legend")
      .data(data[0].values.map(function(d) { return d.rate; }).reverse())
  .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function(d,i) { return "translate(0," + i * 20 + ")"; })
      .style("opacity","0");

  legend.append("rect")
      .attr("x", width - 18)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", function(d) { return color(d); });

  legend.append("text")
      .attr("x", width - 24)
      .attr("y", 9)
      .attr("dy", ".35em")
      .style("text-anchor", "end")
      .text(function(d) {return d; });

  legend.style("opacity","1");

});



  // console.log(amt_food);

  var trace1 = {
    type: "line",
    mode: "lines",
    name: foodGroup,
    x: amt_food,
    y: items,
    line: {
      color: "#17BECF"
    }
  };

  var data = [trace1];

  var layout = {
    title: `${stock} Consumption Survey Totals`,
    xaxis: {
      range: [year],
      type: "date"
    },
    yaxis: {
      autorange: true,
      type: "linear"
    }
  };

  Plotly.newPlot("lineplot", data, layout);
