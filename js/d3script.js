const svg = d3.select(".responsive-svg-container")
  .append("svg")
  .attr("viewBox", "0 0 550 1500")
  .style("border", "1px solid black");

const createBarChart = data => {
  const xScale = d3.scaleLinear()
    .domain([0, 1310])
    .range([0, 500]);

  const yScale = d3.scaleBand()
    .domain(data.map(d => d.brand))
    .range([0, 1450])
    .padding(0.1);

  const barAndLabel = svg
    .selectAll("g")
    .data(data)
    .join("g")
    .attr("transform", d => `translate(0, ${yScale(d.brand)})`);

  barAndLabel
    .append("rect")
    .attr("class", d => `bar bar-${d.count}`)
    .attr("x", 150)
    .attr("y", 0)
    .attr("width", d => xScale(d.count))
    .attr("height", yScale.bandwidth())
    .attr("fill", "blue");

  barAndLabel
    .append("text")
    .text(d => d.brand)
    .attr("x", 140)
    .attr("y", 15)
    .attr("text-anchor", "end")
    .style("font-family", "sans-serif")
    .style("font-size", "10px");

  barAndLabel
    .append("text")
    .text(d => d.count)
    .attr("x", d => 150 + xScale(d.count) + 4)
    .attr("y", 12)
    .style("font-family", "sans-serif")
    .style("font-size", "10px");
};

d3.csv("data/task4data.csv", d => {
  return {
    brand: d.brand,
    count: +d.count
  };
}).then(data => {
  data.sort((a, b) => d3.descending(a.count, b.count));
  console.log(data);
  console.log(data.length);
  console.log(d3.max(data, d => d.count));
  console.log(d3.min(data, d => d.count));
  console.log(d3.extent(data, d => d.count));
  createBarChart(data);
});
