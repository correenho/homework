function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel

  // Use `d3.json` to fetch the metadata for a sample
    // Use d3 to select the panel with id of `#sample-metadata`

    // Use `.html("") to clear any existing metadata

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new tags for each key-value in the metadata.

    d3.json(`/metadata/${sample}`).then((metadata) => {
        console.log(metadata);
        var selection = d3.select("#sample-metadata");
        selection.html("");
         Object.entries(metadata).forEach(([key, value]) => {
            selection.append("p").append("strong").text(`${key}: ${value}`)
        })  

        // BONUS: Build the Gauge Chart
        // buildGauge(data.WFREQ); 
        var gauge_data = [{
            type: "indicator",
            mode: "gauge+number",
            value: metadata.WFREQ,
            title: { text: "<b>Belly Button Scrub Frequency</b><br>Scrubs per Week", font: { size: 24, color: "black" } },
            gauge: {
                axis: { range: [null, 9], ticks: "inside", visible: true },
                bar: { color: "darkgrey" },
                bgcolor: "white",
                steps: [
                    { range: [0,1], color: "cornsilk" },
                    { range: [1,2], color: "rgb(237,248,233)" },
                    { range: [2,3], color: "rgb(199,232,192)"},
                    { range: [3,4], color: "rgb(161,217,155)"},
                    { range: [4,5], color: "rgb(116,196,118)"},
                    { range: [5,6], color: "rgb(65,171,93)"},
                    { range: [6,7], color: "rgb(35,139,69)"},
                    { range: [7,8], color: "rgb(0,104,55)"},
                    { range: [8,9], color: "rgb(0,90,50)"}
                ]
            }
        }];

        var gauge_layout = {
          width: 500,
          height: 400,
          margin: { t: 25, r: 25, l: 25, b: 25 },
          paper_bgcolor: "white",
          font: { color: "darkgrey", family: "Arial" }
        };

        Plotly.newPlot("gauge", gauge_data, gauge_layout);
    });    
}


function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots

    // @TODO: Build a Bubble Chart using the sample data

    d3.json(`/samples/${sample}`).then((data) => {
        console.log(data);
        var trace_bubble = {
            x: data.otu_ids,
            y: data.sample_values,
            mode: "markers",
            marker: {
                size: data.sample_values,
                color: data.otu_ids
            },
            type: "scatter",
            text: data.otu_labels,
        }
        
        var bubble_data = [trace_bubble];
        
        var bubble_layout = {
            showlegend: true
        }
        
        Plotly.newPlot("bubble", bubble_data, bubble_layout);
  
    
    // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values, otu_ids, and labels (10 each). 
    // Q: top 10 means the first 10, or the highest 10 values? need to rank the data first? 
    
               
        var trace_pie = {
            labels: data.otu_ids.slice(0,10),
            values: data.sample_values.slice(0,10),
            hovertext: data.otu_labels.slice(0,10),
            hoverinfo: "text",
            type: "pie"
        };
    
        var pie_data = [trace_pie];
        
        var pie_layout = {
            showlegend: true
        }
    
        Plotly.newPlot("pie", pie_data, pie_layout);
    
    })

    

}

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
