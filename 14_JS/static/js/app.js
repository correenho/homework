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
    
  console.log(filteredData[0]);
    
  var table = d3.select("#ufo-table").select("tbody");
    
  table.html("");
  
  console.log(date[0]);
    
  filteredData.forEach(function(d,i) {
    table.append("tr").attr("id","row"+i);
//     console.log(city[i]);
    var selection = table.select("#row"+i);
    selection.append("td").text(`${date[i]}`);
    selection.append("td").text(`${city[i]}`);
    selection.append("td").text(`${state[i]}`);
    selection.append("td").text(`${country[i]}`);
    selection.append("td").text(`${shape[i]}`);
    selection.append("td").text(`${duration[i]}`);
    selection.append("td").text(`${comment[i]}`);

  })        
    
});

