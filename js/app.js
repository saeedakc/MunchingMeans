// Build initialized map (interactive)
// code heavily referenced from:
// https://observablehq.com/@d3/bivariate-choropleth

function choroChart(data) {
  const svg = d3.create("svg")
      .attr("viewBox", [0, 0, 975, 610]);

  svg.append(legend)
      .attr("transform", "translate(870,450)");

  svg.append("g")
    .selectAll("path")
    .data(topojson.feature(us, us.objects.counties).features)
    .join("path")
      .attr("fill", d => color(data.get(d.id)))
      .attr("d", path)
    .append("title")
      .text(d => `${d.properties.name}, ${states.get(d.id.slice(0, 2)).name}
${format(data.get(d.id))}`);

  svg.append("path")
      .datum(topojson.mesh(us, us.objects.states, (a, b) => a !== b))
      .attr("fill", "none")
      .attr("stroke", "white")
      .attr("stroke-linejoin", "round")
      .attr("d", path);

  return svg.node();
}; 

legend = () => {
  const k = 24;
  const arrow = DOM.uid();
  return svg`<g font-family=sans-serif font-size=10>
  <g transform="translate(-${k * n / 2},-${k * n / 2}) rotate(-45 ${k * n / 2},${k * n / 2})">
    <marker id="${arrow.id}" markerHeight=10 markerWidth=10 refX=6 refY=3 orient=auto>
      <path d="M0,0L9,3L0,6Z" />
    </marker>
    ${d3.cross(d3.range(n), d3.range(n)).map(([i, j]) => svg`<rect width=${k} height=${k} x=${i * k} y=${(n - 1 - j) * k} fill=${colors[j * n + i]}>
      <title>${data.title[0]}${labels[j] && ` (${labels[j]})`}
${data.title[1]}${labels[i] && ` (${labels[i]})`}</title>
    </rect>`)}
    <line marker-end="${arrow}" x1=0 x2=${n * k} y1=${n * k} y2=${n * k} stroke=black stroke-width=1.5 />
    <line marker-end="${arrow}" y2=0 y1=${n * k} stroke=black stroke-width=1.5 />
    <text font-weight="bold" dy="0.71em" transform="rotate(90) translate(${n / 2 * k},6)" text-anchor="middle">${data.title[0]}</text>
    <text font-weight="bold" dy="0.71em" transform="translate(${n / 2 * k},${n * k + 6})" text-anchor="middle">${data.title[1]}</text>
  </g>
</g>`;
};

data = Object.assign(new Map(d3.csvParse(await FileAttachment("cdc-diabetes-obesity.csv").text(), ({county, diabetes, obesity}) => [county, [+diabetes, +obesity]])), {title: ["Diabetes", "Obesity"]})

schema =  { 
  colors: [
    "#e8e8e8", "#ace4e4", "#5ac8c8",
    "#dfb0d6", "#a5add3", "#5698b9", 
    "#be64ac", "#8c62aa", "#3b4994"
  ]
}
labels = ["low", "", "high"]
n = Math.floor(Math.sqrt(colors.length))

x = d3.scaleQuantile(Array.from(data.values(), d => d[0]), d3.range(n))
y = d3.scaleQuantile(Array.from(data.values(), d => d[1]), d3.range(n))
path = d3.geoPath()

color = {
  return: value => {
    if (!value) return "#ccc";
    let [a, b] = value;
    return colors[y(b) + x(a) * n];
  }
};

format = (value) => {
  if (!value) return "N/A";
  let [a, b] = value;
  return `${a}% ${data.title[0]}${labels[x(a)] && ` (${labels[x(a)]})`}
${b}% ${data.title[1]}${labels[y(b)] && ` (${labels[y(b)]})`}`;
};

states = new Map(us.objects.states.geometries.map(d => [d.id, d.properties]))

us = FileAttachment("counties-albers-10m.json").json()

topojson = require("topojson-client@3")

d3 = require("d3@5")

d3.select("map").append(choroChart());

// Reference the button actions (change in data)
d3.json("flask_url").then(function(data) {
  return data;
});

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

      import {swatches} from "@d3/color-legend"

  //Fig 3 (static)
//code heavily referenced from
// https://observablehq.com/@d3/radial-stacked-bar-chart
function barChart(data)  {
  const svg = d3.select(DOM.svg(width, height))
      .attr("viewBox", `${-width / 2} ${-height / 2} ${width} ${height}`)
      .style("width", "100%")
      .style("height", "auto")
      .style("font", "10px sans-serif");

  svg.append("g")
    .selectAll("g")
    .data(d3.stack().keys(data.columns.slice(1))(data))
    .join("g")
      .attr("fill", d => z(d.key))
    .selectAll("path")
    .data(d => d)
    .join("path")
      .attr("d", arc);

  svg.append("g")
      .call(xAxis);

  svg.append("g")
      .call(yAxis);

  svg.append("g")
      .call(legend);

  return svg.node();
}

data = d3.csvParse(await FileAttachment("data-2.csv").text(), (d, _, columns) => {
  let total = 0;
  for (let i = 1; i < columns.length; ++i) total += d[columns[i]] = +d[columns[i]];
  d.total = total;
  return d;
})

arc = d3.arc()
    .innerRadius(d => y(d[0]))
    .outerRadius(d => y(d[1]))
    .startAngle(d => x(d.data.State))
    .endAngle(d => x(d.data.State) + x.bandwidth())
    .padAngle(0.01)
    .padRadius(innerRadius);

x = d3.scaleBand()
    .domain(data.map(d => d.State))
    .range([0, 2 * Math.PI])
    .align(0);

y = {
    // This scale maintains area proportionality of radial bars!
  const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.total)])
        .range([innerRadius * innerRadius, outerRadius * outerRadius]);

    return Object.assign(d => Math.sqrt(y(d)), y);
  };

  z = d3.scaleOrdinal()
  .domain(data.columns.slice(1))
  .range(["#98abc5", "#8a89a6", "#7b6888", 
    "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

xAxis = g => g
.attr("text-anchor", "middle")
.call(g => g.selectAll("g")
  .data(data)
  .join("g")
    .attr("transform", d => `
      rotate(${((x(d.State) + x.bandwidth() / 2) * 180 / Math.PI - 90)})
      translate(${innerRadius},0)
    `)
    .call(g => g.append("line")
        .attr("x2", -5)
        .attr("stroke", "#000"))
    .call(g => g.append("text")
        .attr("transform", d => (x(d.State) + x.bandwidth() / 2 + Math.PI / 2) % (2 * Math.PI) < Math.PI
            ? "rotate(90)translate(0,16)"
            : "rotate(-90)translate(0,-9)")
        .text(d => d.State)))
  
yAxis = g => g
.attr("text-anchor", "middle")
.call(g => g.append("text")
    .attr("y", d => -y(y.ticks(5).pop()))
    .attr("dy", "-1em")
    .text("Population"))
.call(g => g.selectAll("g")
  .data(y.ticks(5).slice(1))
  .join("g")
    .attr("fill", "none")
    .call(g => g.append("circle")
        .attr("stroke", "#000")
        .attr("stroke-opacity", 0.5)
        .attr("r", y))
    .call(g => g.append("text")
        .attr("y", d => -y(d))
        .attr("dy", "0.35em")
        .attr("stroke", "#fff")
        .attr("stroke-width", 5)
        .text(y.tickFormat(5, "s"))
      .clone(true)
        .attr("fill", "#000")
        .attr("stroke", "none")))

legend = g => g.append("g")
.selectAll("g")
.data(data.columns.slice(1).reverse())
.join("g")
  .attr("transform", (d, i) => `translate(-40,${(i - (data.columns.length - 1) / 2) * 20})`)
  .call(g => g.append("rect")
      .attr("width", 18)
      .attr("height", 18)
      .attr("fill", z))
  .call(g => g.append("text")
      .attr("x", 24)
      .attr("y", 9)
      .attr("dy", "0.35em")
      .text(d => d))
