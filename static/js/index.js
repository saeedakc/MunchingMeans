//------------------------------------------------------------------
// Median income map #1
//------------------------------------------------------------------


var medIncome = "/medincome";
var new_income = [];
var income2 = [];
var state2 = [];

d3.json(medIncome, function(data){
//console.log(data[0].State)
    function state(state) {
          this.state = state
          //this.income = income
        }
       // console.log(income_data)
        var states = data[0].State.map((item, i) => {
          state2.push(item)
        })
      
        var income = data[0]["2008 MHI"].map(item => {
          income2.push(item)
        });

       // for (var i=0; i < state2.length; i++) {
            // new_income = state2.concat(income2)
            // console.log(new_income)
       // }
        // console.log(states)
        // console.log(income)
      
        // for (var i=0; i < states.length; i++) {
        //   new_income.push(new state_income(states[i], income[i]))
        // } 

var stateInit = [ 'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY' ];
//console.log(stateInit.length)
  

var barbody = d3.select("#map1")
var intIncome = [];
for (var i=0; i<income2.length; i++) {
    intIncome.push(parseInt(income2[i]))
}
//console.log(intIncome)

var data = [{
    type: "choroplethmapbox", name: "Median Income", locations: stateInit, z: intIncome,
    geojson: "https://raw.githubusercontent.com/python-visualization/folium/master/examples/data/us-states.json",
    colorscale: "YlGnBu", colorbar: {y: 0, yanchor: "bottom", title: {text: "Median Income 2008", side: "right"}}}];

  var layout = {mapbox: {style: "dark", center: {lon: -100, lat: 37}, zoom: 2},
                width: barbody.width, height: barbody.height, margin: {t: 0, b: 0, l: 0}};
  
  var config = {mapboxAccessToken: API_KEY};
  
  Plotly.newPlot('map1', data, layout, config);

});

//-----------------------------------------------------------------------
// Food Security Map #2
//-----------------------------------------------------------------------

var foodConsURL = "/foodcons";
var consume = [];
var state3 = [];

d3.json(foodConsURL, function(data){
//console.log(data[0].State)
    function state(state) {
          this.state = state
          //this.income = income
        }
       // console.log(income_data)
        var states = data[0]['State Name'].map((item, i) => {
          state2.push(item)
        })
      
        var consum = data[0].Rank.map(item => {
          consume.push(item)
        });

var stateInit = [ 'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY' ];
//console.log(consume.length)
  

var barbody = d3.select("#map2")
var intConsume = [];
for (var i=0; i<consume.length; i++) {
    intConsume.push(parseInt(consume[i]))
}
//console.log(intIncome)

var data = [{
    type: "choroplethmapbox", name: "Veggie Consumption Rank", locations: stateInit, z: intConsume,
    geojson: "https://raw.githubusercontent.com/python-visualization/folium/master/examples/data/us-states.json",
    colorscale: "Blues", colorbar: {y: 0, yanchor: "bottom", title: {text: "Food Security by State", side: "right"}}}];

  var layout = {mapbox: {style: "dark", center: {lon: -100, lat: 37}, zoom: 2},
                width: barbody.width, height: barbody.height, margin: {t: 0, b: 0, l: 0}};
  
  var config = {mapboxAccessToken: API_KEY};
  
  Plotly.newPlot('map2', data, layout, config);

});


//----------------------------------------------------------------------
// Veggie Consumption map #3
//----------------------------------------------------------------------

var foodtable = "/foodtable";
var consume = [];
var state3 = [];

d3.json(foodtable, function(data){
//console.log(data[0].State)
    function state(state) {
          this.state = state
          //this.income = income
        }
       // console.log(income_data)
        var states = data[0]['State Name'].map((item, i) => {
          state2.push(item)
        })
      
        var consum = data[0].Rank.map(item => {
          consume.push(item)
        });

var stateInit = [ 'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY' ];
//console.log(consume.length)
  

var barbody = d3.select("#map3")
var intConsume = [];
for (var i=0; i<consume.length; i++) {
    intConsume.push(parseInt(consume[i]))
}
//console.log(intIncome)

var data = [{
    type: "choroplethmapbox", name: "Veggie Consumption Rank", locations: stateInit, z: intConsume,
    geojson: "https://raw.githubusercontent.com/python-visualization/folium/master/examples/data/us-states.json",
    colorscale: "Greens", colorbar: {y: 0, yanchor: "bottom", title: {text: "Vegetable Consumption by State", side: "right"}}}];

  var layout = {mapbox: {style: "dark", center: {lon: -100, lat: 37}, zoom: 2},
                width: barbody.width, height: barbody.height, margin: {t: 0, b: 0, l: 0}};
  
  var config = {mapboxAccessToken: API_KEY};
  
  Plotly.newPlot('map3', data, layout, config);

});
