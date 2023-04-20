
// scripts.js
document.addEventListener("DOMContentLoaded", () => {
  const dropdown = document.getElementById("dropdown");

  // Fetch flight data from API
  d3.json("http://127.0.0.1:5000/api/flights").then(data => {

    // Create the charts
    createCharts(data, dropdown.value);

    // Update charts on dropdown change
    dropdown.addEventListener("change", (e) => {
      createCharts(data, e.target.value);
    });
  });
});

function createCharts(data, selectedDestination) {
  // Filter data based on selected date
  const filteredData = data.filter(d => d.DEST === selectedDestination);

  // Clear previous charts
  d3.selectAll(".chart-container svg").remove();

  // Create charts
  createChart1(filteredData);
  createChart2(filteredData);
  createChart3(filteredData);
  createChart4(filteredData);
}


//Bar chart of departure delays by carrier

function createChart1(data) {
  const margin = { top: 20, right: 40, bottom: 60, left: 40 };
  const width = 400 - margin.left - margin.right;
  const height = 300 - margin.top - margin.bottom;

  const x = d3.scaleBand().rangeRound([0, width]).padding(0.1);
  const y = d3.scaleLinear().rangeRound([height, 0]);
  const color = d3.scaleOrdinal(d3.schemeCategory10);

  const svg = d3.select("#chart1")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  const delaysByCarrier = d3.rollups(data, v => d3.mean(v, d => d.DEP_DELAY), d => d.OP_UNIQUE_CARRIER);
  x.domain(delaysByCarrier.map(d => d[0]));
  y.domain([0, d3.max(delaysByCarrier, d => d[1])]);

  svg.append("g")
    .attr("class", "axis axis--x")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  svg.append("g")
    .attr("class", "axis axis--y")
    .call(d3.axisLeft(y).ticks(10, "s"))
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", "0.71em")
    .attr("text-anchor", "end")
    .text("Delay (min)");

    // Add y-axis label
  svg.append("text")
  .attr("class", "axis-label")
  .attr("text-anchor", "middle")
  .attr("transform", "rotate(-90)")
  .attr("y", 0 - margin.left)
  .attr("x", 0 - (height / 2))
  .text("Average Departure Delays (min)");

    svg.append("text")
    .attr("transform", "translate(" + (width / 2) + "," + (height + margin.bottom) + ")")
    .style("text-anchor", "middle")
    .text("Carrier");

  svg.selectAll(".bar")
    .data(delaysByCarrier)
    .enter().append("rect")
    .attr("class", "bar")
    .attr("fill", (d, i) => color(i))
    .attr("x", d => x(d[0]))
    .attr("y", d => y(d[1]))
    .attr("width", x.bandwidth())
    .attr("height", d => height - y(d[1]));
}

 //Line chart of air time by year of manufacture

 function createChart2(data) {
  const margin = { top: 20, right: 40, bottom: 60, left: 40 };
  const width = 400 - margin.left - margin.right;
  const height = 300 - margin.top - margin.bottom;

  const x = d3.scaleLinear().range([0, width]);
  const y = d3.scaleLinear().range([height, 0]);

  const svg = d3.select("#chart2")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  const filteredData = data.filter(d => d.AIR_TIME > 0);

  x.domain(d3.extent(filteredData, d => d.YEAR_OF_MANUFACTURE));
  y.domain(d3.extent(filteredData, d => d.AIR_TIME));

  const color = d3.scaleOrdinal(d3.schemeCategory10);


  svg.append("g")
    .attr("class", "axis axis--x")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

    svg.append("text")
    .attr("transform", "translate(" + (width / 2) + "," + (height + margin.bottom) + ")")
    .style("text-anchor", "middle")
    .text("Year of Manufacture");

    // Add y-axis label
svg.append("text")
.attr("class", "axis-label")
.attr("text-anchor", "middle")
.attr("transform", "rotate(-90)")
.attr("y", 0 - margin.left)
.attr("x", 0 - (height / 2))
.text("Air Time (min)");

  svg.append("g")
    .attr("class", "axis axis--y")
    .call(d3.axisLeft(y).ticks(10, "s"))
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", "0.71em")
    .attr("text-anchor", "end")
    .text("Air Time (min)");

  svg.selectAll(".dot")
    .data(filteredData)
    .enter().append("circle")
    .attr("class", "dot")
    .attr("cx", d => x(d.YEAR_OF_MANUFACTURE))
    .attr("cy", d => y(d.AIR_TIME))
    .attr("r", 3.5)
    .style("fill", d => color(d.OP_UNIQUE_CARRIER));
}
  
  //Pie chart of flights by aircraft manufacturer

  function createChart3(data) {
    const width = 300;
    const height = 300;
    const radius = Math.min(width, height) / 2;
  
    const color = d3.scaleOrdinal(d3.schemeCategory10);
  
    const arc = d3.arc()
      .outerRadius(radius - 10)
      .innerRadius(0);
  
    const labelArc = d3.arc()
      .outerRadius(radius - 40)
      .innerRadius(radius - 40);
  
    const pie = d3.pie()
      .sort(null)
      .value(d => d[1]);
  
    const svg = d3.select("#chart3")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
  
    const flightsByManufacturer = d3.rollups(data, v => v.length, d => d.MANUFACTURER);
  
    const g = svg.selectAll(".arc")
      .data(pie(flightsByManufacturer))
      .enter().append("g")
      .attr("class", "arc");
  
    g.append("path")
      .attr("d", arc)
      .style("fill", d => color(d.data[0]));
  
    g.append("text")
      .attr("transform", d => "translate(" + labelArc.centroid(d) + ")")
      .attr("dy", ".35em")
      .text(d => d.data[0]);
  }

    //Scatterplot of departure hour vs. taxi out time

  function createChart4(data) {
    const margin = { top: 20, right: 40, bottom: 60, left: 40 };
    const width = 400 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;
  
    const x = d3.scaleLinear().range([0, width]);
    const y = d3.scaleLinear().range([height, 0]);
    const color = d3.scaleOrdinal(d3.schemeCategory10);
  
    const svg = d3.select("#chart4")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
    x.domain(d3.extent(data, d => d.DEP_HOUR));
    y.domain(d3.extent(data, d => d.TAXI_OUT));
  
    svg.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

      svg.append("text")
      .attr("transform", "translate(" + (width / 2) + "," + (height + margin.bottom) + ")")
      .style("text-anchor", "middle")
      .text("Hour of Departure");

      svg.append("g")
      .attr("class", "axis axis--y")
      .call(d3.axisLeft(y).ticks(10, "s"))
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "0.71em")
      .attr("text-anchor", "end")
      .text("Taxi Out (min)");
      
      svg.selectAll(".dot")
      .data(data)
      .enter().append("circle")
      .attr("class", "dot")
      .attr("cx", d => x(d.DEP_HOUR))
      .attr("cy", d => y(d.TAXI_OUT))
      .style("fill", d => color(d.OP_UNIQUE_CARRIER))
      .attr("r", 3.5);
      }


// Header Changer

function updateHeaderText(destination) {
  const header = document.getElementById("header-text");
  header.textContent = `Analysis of Flight Data Between JFK and ${destination}`;
}

document.getElementById("dropdown").addEventListener("change", (event) => {
  // Fetch data and render charts based on the selected option
  const destination = event.target.value;
  console.log(destination);
  updateHeaderText(destination);

  //Update Charts
  createCharts(data, destination)
});

// Initialize the header text with the default selected destination
updateHeaderText(document.getElementById("dropdown").value);