// Connect to Flask route
var foodtableURL = "/foodAvail";
// var foodtableA = data[0][Food_group]
// var foodtableB = data[1][Total]

d3.json(foodtableURL, function(data) {
  console.log(data[0])

  var foodtableA = data[0]['Food group'];
  var foodtableB = data[0].Total;

  console.log(foodtableA)
  console.log(foodtableB)

var barbody = d3.select("#vis")

// Emoji chart code
var food_table = {
  "$schema": "https://vega.github.io/schema/vega-lite/v4.json",
  "config": {"view": {"stroke": ""}},
  "width": barbody.innerwidth,
  "height": barbody.innerheight,
  "data": {
    "values": [
      {"country":'Fruits Low', "animal": 'Fruits Low'},
      {"country":foodtableA[1], "animal": foodtableB[1]}

      // {foodtableB}
    ]
  },
  "transform": [
    {
      "calculate": "{'Fruits Low': '🥥', 'Fruits High': '🍇', 'Veggies Low': '🧅', 'Veggies High': '🥗', 'Dairy Low': '🥛', 'Dairy High': '🍦', 'Grains Low': '🍣', 'Grains High': '🍚', 'Protein Low': '🍖', 'Protein High': '🥩', 'Oils Low': '🧈', 'Oils High': '🥣', 'Fats Low': '🍰', 'Fats High': '🎂'}[datum.foodtableB]",
      "as": "emoji"
    },
    {"window": [{"op": "rank", "as": "rank"}], "groupby": ["country", "animal"]}
  ],
  "mark": {"type": "text", "baseline": "middle"},
  "encoding": {
    "x": {"field": "rank", "type": "ordinal", "axis": null},
    "y": {"field": "animal", "type": "nominal", "axis": null, "sort": null},
    "row": {"field": "country", "type": "nominal", "header": {"title": ""}},
    "text": {"field": "emoji", "type": "nominal"},
    "size": {"value": 65}
  }
}
vegaEmbed('#vis', food_table);

});