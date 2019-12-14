// from data.js
var tableData = data;

// YOUR CODE HERE!

var button = d3.select("#filter-btn")



button.on("click",function(){
  var inputElement=d3.select(".form-control");
  
  var inputDate = inputElement.property("value");
  
  console.log(inputDate);

  var filteredData = tableData.filter(sightings => sightings.datetime === inputDate);

//  console.log(filteredData);
//  console.log(tableData);

  var date = filteredData.map(sightings => sightings.datetime);  
  
  var city = filteredData.map(sightings => sightings.city);
    
  var state = filteredData.map(sightings => sightings.state);
    
  var country = filteredData.map(sightings => sightings.country);
    
  var shape = filteredData.map(sightings => sightings.shape);
    
  var duration = filteredData.map(sightings => sightings.durationMinutes);

  var comment = filteredData.map(sightings => sightings.comments);
    
//  console.log(shape);
    
  var table = d3.select("#ufo-table").select("tbody");
    
  table.html("");
    
  filteredData.forEach(function(d,i) {
    table.append("tr");
    table.selectAll("tr").append("td").text(`${date[i]}`);
    table.selectAll("tr").append("td").text(`${city[i]}`);
    table.selectAll("tr").append("td").text(`${state[i]}`);
    table.selectAll("tr").append("td").text(`${country[i]}`);
    table.selectAll("tr").append("td").text(`${shape[i]}`);
    table.selectAll("tr").append("td").text(`${duration[i]}`);
    table.selectAll("tr").append("td").text(`${comment[i]}`);

});

})