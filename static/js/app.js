//----------------------------------------------
// Choropleth begin
//----------------------------------------------
console.log(L)
// state boundaries geojson
var stateURL = "../static/data/states.json"
var medIncome = "/medincome";
var foodAvai;
var foodCons;
d3.json(medIncome, function(data){
  var new_income = [];
  function state_income(state, income) {
        this.state = state
        this.income = income
      }
     // console.log(income_data)
      var states = data[0].State.map((item, i) => {
        return item
      })
    
      var income = data[0]["2007 MHI"].map(income => {
        return income
      });
      // console.log(states)
      // console.log(income)
    
      for (var i=0; i < states.length; i++) {
        new_income.push(new state_income(states[i], income[i]))
      } 
      var stringed_data = JSON.stringify(new_income)
      d3.json(medIncome, function(data){
        console.log(data);
      })
  

})

// d3.json(stateURL, function(error, stateData) {
//   if (error) throw error;
//   console.log(stateData.features);

//     // Once we get a response, send the data.features object to the createFeatures function
//     stateFeatures(stateData.features);
//   });

//   function stateFeatures(stateData) {

//     function onEachFeature(feature, layer) {
//       layer.bindPopup("<h3>" + feature.properties.NAME + "</h3>")
//     }

// var statelines = L.geoJson(stateData, {
//   onEachFeature: onEachFeature,
//   pointToLayer : function(latlng) {
//     return L.polygon(features.geometry.coordinates);
//   }
// });
// stateFeatures(statelines);


//mouseover events
// function resetHighlightInc(e) {
//   medIncome.resetStyle(e.target);
//   info.update();
// };

// function resetHighlightAvai(e) {
//   foodAvai.resetStyle(e.target);
//   info.update();
// };

// function resetHighlightCons(e) {
//   foodCons.resetStyle(e.target);
//   info.update();
// };

// function onEachFeatureInc(feature, layer) {
//   layer.on({
//     mouseover: highlightFeature,
//     mouseout: resetHighlightInc
//   });
//   layer.bindPopup('<h3>' + feature.properties.NAME + '</h3>');
// };

// function onEachFeatureCons(feature, layer) {
//   layer.on({
//     mouseover: highlightFeature,
//     mouseout: resetHighlightCons
//   });
//   layer.bindPopup('<h3>' + feature.properties.NAME + '</h3>');
// };

// function onEachFeatureAvai(feature, layer) {
//   layer.on({
//     mouseover: highlightFeature,
//     mouseout: resetHighlightAvai
//   });
//   layer.bindPopup('<h3>' + feature.properties.NAME + '</h3>');
// };

// // data from flask server
// var medIncomeURL = "/medincome";
// var foodConsURL = "/foodcons";
// var foodTableURL = "/foodtable";

// var new_income = [];
// var new_cons = [];
// var new_veg = [];
// // var nums = [1, 2, 3];

// // console.log(nums)

// //income data

// d3.json(medIncomeURL, function(income_data) {
//   function state_income(state, income) {
//     this.state = state
//     this.income = income
//   }
//  // console.log(income_data)
//   var states = income_data[0].State.map((item, i) => {
//     return item
//   })

//   var income = income_data[0]["2007 MHI"].map(income => {
//     return income
//   });
//   // console.log(states)
//   // console.log(income)

//   // states.forEach((state, i) => {
//   //   new_income.push(new state_income(state, income[i]))
//   // });

//   for (var i=0; i < states.length; i++) {
//     new_income.push(new state_income(states[i], income[i]))
//   }

//   //return new_income;
//   console.log(new_income)

//   console.log(json_data)
  
//   var results = {};
//   results["new_income"] = new_income
//   var json_data = JSON.stringify(results.new_income)
//   console.log(json_data)
  
// alert("chelsea")

// d3.json(medIncomeURL, function(data) {
//   console.log(data)
//   var json_medIncome = L.choropleth(data, {
//     valueProperty: "income",
//     scale: ['#ECE2F0', '#1C9099'],
//     steps: 10,
//     // q for quartile, e for equideistant, k for k-means
//     mode: 'q',
//     style: {
//       color: '#000',
//       weight: 1,
//       fillOpacity: 0.75
//     },
//     onEachFeature: onEachFeatureInc
//   })
// // Define streetmap and darkmap layers
// var satelitemap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
//   attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
//   maxZoom: 18,
//   id: "mapbox.streets-basic",
//   accessToken: API_KEY
// })

// var darkMap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
//   attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
//   maxZoom: 18,
//   id: "mapbox.dark",
//   accessToken: API_KEY
// })

//   // Define a baseMaps object to hold our base layers
//   var baseMaps = {"Satelite Map": satelitemap,
//   "Dark Map": darkMap};

//   // Create overlay object to hold our overlay layer
//   var overlayMaps = {
//     "Median Income": json_medIncome,
//     // "Food Scarcity Rank": json_foodCons,
//     // "Veggie Consumption RAnk": json_vegCons
//   };

//   var myMap = L.map("map", {
//     center: [34.0522, -118.2437],
//     zoom: 8,
//     layers: [satelitemap, json_medIncome]

//   })
  
//   L.control.layers(baseMaps, overlayMaps, {
//     collapsed: false
//   }).addTo(myMap)


// });
// });

// //console.log(new_income)


//  //new food security data
//  d3.json(foodTableURL, function(secu_data) {
//   function state_secu(state, security) {
//     this.state = state
//     this.security = security
//   }
//   //console.log(secu_data)
//   var states = secu_data[0]['State Name'].map(state => {
//     return state
//   })

//   var rank = secu_data[0].Rank.map(rank => {
//     return rank
//   });
//   // console.log(states)
//   // console.log(income)

//   states.forEach((state, i) => {
//     new_cons.push(new state_secu(state, rank[i]))
//   });

// });

//  // console.log(new_data)


//  // veggie rank data

//  d3.json(foodConsURL, function(veg_data) {
//   function state_veg(state, veg) {
//     this.state = state
//     this.veg = veg
//   }
//   //console.log(veg_data)
//   var states = veg_data[0]['State Name'].map(state => {
//     return state
//   })

//   var rank = veg_data[0].Rank.map(rank => {
//     return rank
//   });
//   // console.log(states)
//   // console.log(income)

//   states.forEach((state, i) => {
//     new_veg.push(new state_veg(state, rank[i]))
//   });
// });
//  //console.log(new_veg)


//  // create choropleth layers
// var json_data = JSON.stringify([...new_income])
// // console.log(JSON.stringify(new_income))

// var new_income2 = new Set(...new_income)
// new_income.forEach(item => {
//   new_income2.push(item)
// })

//console.log(new_income)

// d3.json(json_data, function(data) {
//   console.log(json_data)
  //   json_medIncome = L.choropleth(new_income, {
  //     valueProperty: "income",
  //     scale: ['#ECE2F0', '#1C9099'],
  //     steps: 10,
  //     // q for quartile, e for equideistant, k for k-means
  //     mode: 'q',
  //     style: {
  //       color: '#000',
  //       weight: 1,
  //       fillOpacity: 0.75
  //     },
  //     onEachFeature: onEachFeatureInc
  //   })
  // // Define streetmap and darkmap layers
  // var satelitemap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  //   attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  //   maxZoom: 18,
  //   id: "mapbox.streets-basic",
  //   accessToken: API_KEY
  // })

  // var darkMap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  //   attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  //   maxZoom: 18,
  //   id: "mapbox.dark",
  //   accessToken: API_KEY
  // })

  //   // Define a baseMaps object to hold our base layers
  //   var baseMaps = {"Satelite Map": satelitemap,
  //   "Dark Map": darkMap};

  //   // Create overlay object to hold our overlay layer
  //   var overlayMaps = {
  //     "Median Income": new_income,
  //     // "Food Scarcity Rank": json_foodCons,
  //     // "Veggie Consumption RAnk": json_vegCons
  //   };

  //   var myMap = L.map("map", {
  //     center: [34.0522, -118.2437],
  //     zoom: 8,
  //     layers: [satelitemap, new_income]

  //   })
    
  //   L.control.layers(baseMaps, overlayMaps, {
  //     collapsed: false
  //   }).addTo(myMap)


// d3.json(new_cons, function(data) {
//   json_foodCons = L.choropleth(data, {
//     valueProperty: "rank",
//     scale: ['#ECE2F0', '#1C9099'],
//     steps: 10,
//     // q for quartile, e for equideistant, k for k-means
//     mode: 'q',
//     style: {
//       color: '#000',
//       weight: 1,
//       fillOpacity: 0.75
//     },
//     onEachFeature: onEachFeatureCons
//   }).addTo(myMap);
// });

// d3.json(new_veg, function(data) {
//   json_vegCons = L.choropleth(data, {
//     valueProperty: "rank",
//     scale: ['#ECE2F0', '#1C9099'],
//     steps: 10,
//     // q for quartile, e for equideistant, k for k-means
//     mode: 'q',
//     style: {
//       color: '#000',
//       weight: 1,
//       fillOpacity: 0.75
//     },
//     onEachFeature: onEachFeatureAvai
//   }).addTo(myMap);
// });


  // // Define streetmap and darkmap layers
  // var satelitemap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  //   attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  //   maxZoom: 18,
  //   id: "mapbox.streets-basic",
  //   accessToken: API_KEY
  // })

  // var darkMap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  //   attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  //   maxZoom: 18,
  //   id: "mapbox.dark",
  //   accessToken: API_KEY
  // })

  //   // Define a baseMaps object to hold our base layers
  //   var baseMaps = {"Satelite Map": satelitemap,
  //   "Dark Map": darkMap};

  //   // Create overlay object to hold our overlay layer
  //   var overlayMaps = {
  //     "Median Income": json_medIncome,
  //     "Food Scarcity Rank": json_foodCons,
  //     "Veggie Consumption RAnk": json_vegCons
  //   };

  //   var myMap = L.map("map", {
  //     center: [34.0522, -118.2437],
  //     zoom: 8,
  //     layers: [satelitemap, json_medIncome]
  //   });

    // L.control.layers(baseMaps, overlayMaps, {
    //   collapsed: false
    // }).addTo(myMap);

      // div object will be located in top right corner and have additional info

  
    // legend.addTo(myMap);






//---------------------------------------------
// End Choropleth; begin bar chart
//---------------------------------------------




// // Set up our chart
// var barbody = d3.select("#barchart")

// var svgWidth = barbody.innerWidth - 250;
// var svgHeight = barbody.innerHeight;

// var margin = {
//   top: 50,
//   right: 50,
//   bottom: 120,
//   left: 120
// };

// var width = svgWidth - margin.left - margin.right;
// var height = svgHeight - margin.top - margin.bottom;

// var svg = barbody
//   .append("svg")
//   .attr("width", barbody.innerWidth)
//   .attr("height", barbody.innerHeight)
//   .classed("chart", true);

// var chartGroup = svg.append("g")
//   .attr("transform", `translate(${margin.left}, ${margin.top})`);


  
//   var foodAvailURL = "/foodAvail";
//   var new_group = [];

// // Import data
// d3.csv(foodAvailURL, function(food_data) {
// console.log(food_data[0])
//   // Format the data
//  //new food security data
//   function food_cons(food_group, total) {
//     this.food_group = food_group
//     this.total = total
//   }
//   //console.log(secu_data)
//   var food_group = food_data['Food Group'].map(food_group => {
//     return food_group
//   })

//   var total = food_data.Total.map(total => {
//     return total
//   });
//   console.log(food_group)
//   // console.log(income)

//   states.forEach((state, i) => {
//     new_cons.push(new state_secu(state, rank[i]))
//   });

//   var barSpacing = 10; // desired space between each bar

//   // Create a 'barWidth' variable so that the bar chart spans the entire chartWidth.
//   var barWidth = (width - (barSpacing * (food_data.length - 1))) / food_data.length;

//   // Create code to build the bar chart using the Data.
//   chartGroup.selectAll(".bar")
//     .data(food_data)
//     .enter()
//     .append("rect")
//     .classed("bar", true)
//     .attr("width", d => barWidth)
//     .attr("height", d => d.total)
//     .attr("x", (d, i) => i * (barWidth + barSpacing))
//     .attr("y", d => height - d.total);
// });

//     // Step 6: Initialize tool tip
//     // ==============================
//     var toolTip = d3.tip()
//       .attr("class", "tooltip")
//       .offset([80, -60])
//       .html(d => (`Food Group: ${d.food_group}<br>Consumed: ${d.total}`));


      
//     // Step 7: Create tooltip in the chart
//     // ==============================
//     chartGroup.call(toolTip);

//     // Step 8: Create event listeners to display and hide the tooltip
//     // ==============================
//     chartGroup.on("mouseover", function(data) {
//       toolTip.show(data, this);
//     })
//       // onmouseout event
//       .on("mouseout", function(data, index) {
//         toolTip.hide(data);
//       });

//     // Create axes labels
//     chartGroup.append("text")
//       .attr("transform", "rotate(-90)")
//       .attr("y", 0 - margin.left + 50)
//       .attr("x", 0 - (height / 2)-50)
//       .attr("dy", "1em")
//       .attr("class", "axisText")
//       .text("Food Group");

//     chartGroup.append("text")
//       .attr("transform", `translate(${width / 2 - 50}, ${height + margin.top + 10})`)
//       .attr("class", "axisText")
//       .text("Food Consumption");



  



//-----------------------------------------------
// End bar chart; begin lowVhigh bar charts
//-----------------------------------------------
// heavily referenced from 
//https://medium.com/@vaibhavkumar_19430/how-to-create-a-grouped-bar-chart-in-d3-js-232c54f85894


// var barbody = d3.select("#lowVhigh")

// var svgWidth = barbody.innerWidth - 250;
// var svgHeight = barbody.innerHeight;

// var margin = {
//   top: 50,
//   right: 50,
//   bottom: 120,
//   left: 120
// };

// var width = svgWidth - margin.left - margin.right;
// var height = svgHeight - margin.top - margin.bottom;

// var svg = barbody
//   .append("svg")
//   .attr("width", barbody.innerWidth)
//   .attr("height", barbody.innerHeight)
//   .append("g")
//   .classed("chart", true)
//   .attr("transform", `translate(${margin.left},${margin.top})`);

// var xScale0 = d3.scaleBand().range([0, width - margin.left - margin.right]).padding(0.2)

// var xScale1 = d3.scaleBand()

// var yScale = d3.scaleLinear().range([height - margin.top - margin.bottom, 0])



// // var xAxis = d3.axisBottom(xScale0).tickSizeOuter(axisTicks.outerSize);

// // var yAxis = d3.axisLeft(yScale).ticks(axisTicks.qty).tickSizeOuter(axisTicks.outerSize);


// // xScale0.domain(models.map(d => d.food_group))
// // xScale1.domain(['low income', 'high income']).range([0, xScale0.bandwidth()])
// // yScale.domain([0, d3.max(models, d => d.low_income > d.high_income ? d.low_income : d.high_income)])


// var cctblURL = "../static/data/CC_mongodb.json";

// var group_table = [];

// d3.csv(cctblURL, function(group_data) {
//   console.log(group_data)
//     // Format the data
//    //new food security data
//     function food_cons(food_group, total) {
//       this.food_group = food_group
//       this.total = total
//     }
//     //console.log(secu_data)
//     var food_group = group_data['Food Group'].map(food_group => {
//       return food_group
//     })
  
//     var total = food_data.Total.map(total => {
//       return total
//     });
//     console.log(food_group)
//     // console.log(income)
  
//     states.forEach((state, i) => {
//       new_cons.push(new state_secu(state, rank[i]))
//     });




//   var food_group = svg.selectAll(".food_group")
//   .data(models)
//   .enter().append("g")
//   .attr("class", "food_group")
//   .attr("transform", d => `translate(${xScale0(d.foodGroup)},0)`);

// /* Add low income bars */
// food_group.selectAll(".bar.low_income")
//   .data(d => [d])
//   .enter()
//   .append("rect")
//   .attr("class", "bar low_income")
//   .style("fill","#ca0020")
//   .attr("x", d => xScale1('low_income'))
//   .attr("y", d => yScale(d.low_income))
//   .attr("width", xScale1.bandwidth())
//   .attr("height", d => {
//     return height - margin.top - margin.bottom - yScale(d.low_income)
//   });
  
// /* Add high income bars */
// food_group.selectAll(".bar.high_income")
//   .data(d => [d])
//   .enter()
//   .append("rect")
//   .attr("class", "bar high_income")
//   .style("fill","#0571b0")
//   .attr("x", d => xScale1('high_income'))
//   .attr("y", d => yScale(d.high_income))
//   .attr("width", xScale1.bandwidth())
//   .attr("height", d => {
//     return height - margin.top - margin.bottom - yScale(d.high_income)
//   });

// // Add the X Axis
// svg.append("g")
//      .attr("class", "x axis")
//      .attr("transform", `translate(0,${height - margin.top - margin.bottom})`)
//      .call(xAxis);
// // Add the Y Axis
// svg.append("g")
//      .attr("class", "y axis")
//      .call(yAxis);

// // Step 6: Initialize tool tip
// // ==============================
// var toolTip = d3.tip()
//   .attr("class", "tooltip")
//   .offset([80, -60])
//   .html(d => (`Food Group: ${d.foodGroup}`));

// // Step 7: Create tooltip in the chart
// // ==============================
// chartGroup.call(toolTip);

// // Step 8: Create event listeners to display and hide the tooltip
// // ==============================
// chartGroup.on("mouseover", function(data) {
//   toolTip.show(data, this);
// })
//   // onmouseout event
//   .on("mouseout", function(data, index) {
//     toolTip.hide(data);
//   });
// });