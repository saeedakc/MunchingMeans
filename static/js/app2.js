// Connect to Flask route
//var foodtableURL = "/foodtbl";
var foodtableA = data[0][Food_group]
var foodtableB = data[1][Total]

// Emoji chart code
var food_table = {
  "$schema": "https://vega.github.io/schema/vega-lite/v4.json",
  "config": {"view": {"stroke": ""}},
  "width": 800,
  "height": 200,
  "data": {
    "values": [
      {foodtableA},
      {foodtableB}
    ]
  },
  "transform": [
    {
      "calculate": "{'Fruits Low': '🥥', 'Fruits High': '🍇', 'Veggies Low': '🧅', 'Veggies High': '🥗', 'Dairy Low': '🥛', 'Dairy High': '🍦', 'Grains Low': '🍣', 'Grains High': '🍚', 'Protein Low': '🍖', 'Protein High': '🥩', 'Oils Low': '🧈', 'Oils High': '🥣', 'Fats Low': '🍰', 'Fats High': '🎂'}[datum.animal]",
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