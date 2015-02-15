//1. This determines the bar space by heights and width as well as the surround space of each bar
var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

//2. x and y represents the x axis and y axis of the bar chart that we will draw
var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

var y = d3.scale.linear()
    .range([height, 0]);

//3. .Orient determine how x and y axis got drawn. XAxis got draw with argument from bottom and YAxis got drawn with argument from left 
var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

//4. Ticks and scale specified the value of Y axis will be drawn
var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(10, "%");

//5. It specified the presenting format of the data.  In this case, it chose chart with the inserting content from width, height, transform the data, remap the data, and get the data from .json file
var svg = d3.select(".chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.json("js/Assignment_1_baseball_player_Tsai.json", function(error, data) {
  
      console.log(data);

//6. It determines what kind of statistical data to be selected and defined to be displayed on the x and y domains. In X domain, it it by year. In Y domain, it is by number of hits
  x.domain(data.stats.map(function(d) { return d.year; }));
  y.domain([0, d3.max(data.stats, function(d) { return d.H; })]);

//7. It inserts the data and formats the x and y element on the canvas.  In x axis, there's no remap on the canvas. in y axis, it transform the bar by rotating it in 90 degree
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Frequency");

//8. It calls all the functions and data to draw the scalable vector graphics
  svg.selectAll(".bar")
      .data(data.stats)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.year); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.H); })
      .attr("height", function(d) { return height - y(d.H); });

});







