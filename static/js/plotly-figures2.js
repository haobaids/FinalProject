var gender_input;
var age_input;



// For Graph 1

function init() {
  age_input = 'city1';
  var data = [{
    x: ['Dallas, TX', 'Jackson, MS', 'San Francisco, CA'],
    y: [0, 0, 0],
    text: [0, 0, 0],
    textposition: 'auto',
    type: "bar"
  }];

  var layout = {
    height: 400,
    width: 600,
    'yaxis': {'title': 'Averaged Across Zip Codes'}
  };

  Plotly.plot("barchart", data, layout);
}

// Update the plot with new data
function updatePlotly(newdata) {
  var BARCHART = document.getElementById("barchart");
  Plotly.restyle(BARCHART, "y", [newdata]);
  Plotly.restyle(BARCHART, "text", [newdata]);
}

// Get new data whenever the dropdown selection changes
function getData(dataset) {
  console.log("parameter is selected", dataset);
  if (dataset === 'defaultvalue') {
    var datause = [0, 0, 0];
    updatePlotly(datause);
    initBubble();
  }
  else {
    gender_input = dataset;
    var datause = [];
    console.log("next step should be getting citydata.json");
    d3.json("static/dataset/citydata.json", function(data) {
      console.log("newdata is ready");
      console.log("newdata", data[dataset]);
      datause.push(data[dataset]['Dallas']);
      datause.push(data[dataset]['Jackson']);
      datause.push(data[dataset]['San Francisco']);
      updatePlotly(datause);
      initBubble();
    });
  }
  
}

init();


// For Graph 2
function buildCharts(sample) {
  console.log('sample: ', sample);

  switch(sample) {
    case 'city1':
      usecity = 'Dallas';
      break;
    case 'city2':
      usecity = 'Jackson';
      break;
    case 'city3':
      usecity = 'San Francisco';
      break;
  }
  console.log('selected city: ', usecity);
  d3.json("static/dataset/alldata.json", function(data) {
    console.log('data: ', data)
    // console.log("parameter: ", gender_input);
    console.log("bubbledata", data[gender_input]);
    // console.log("bubbledata", data[`geo_key`]);
    const otu_ids = []
    const otu_labels = []
    const sample_values = [];

    // console.log('key length: ', Object.keys(data[gender_input]).length)

    for (let i = 0; i <  Object.keys(data[gender_input]).length; i++) {
      // console.log('i:', i)
      // console.log('current city:', data["county name"][i])
      if (data["county name"][i] === usecity) {
        // console.log('right city:', data["county name"][i])
        otu_ids.push(data['geo_key'][i]);
        otu_labels.push(data['geo_key'][i]);
        sample_values.push(data[gender_input][i]);
    }
  }
  // console.log(otu_ids);
  // console.log(otu_labels);
  // console.log(sample_values);
  // console.log('max: ', Math.max.apply(null, sample_values));
  var maxSample = Math.max.apply(null, sample_values);

    // Build a Bubble Chart
    var bubbleData = [
      {
        x: otu_ids,
        y: sample_values,
        text: otu_labels,
        mode: "markers",
        marker: {
          size: sample_values.map(function(x) { return x * 80.0 / maxSample }),
          color: otu_ids,
          colorscale: "Earth"
        }
      }
    ];
    var bubbleLayout = {
      height: 400,
      width: 600,
      margin: { t: 0 },
      hovermode: "closest",
      xaxis: { title: "City Zipcodes" }
    };

    Plotly.newPlot("bubble", bubbleData, bubbleLayout);

  });
}

function initBubble() {
  // var firstSample = 'city1';
  var firstSample = age_input;
  buildCharts(firstSample);
}

function getcityData(newSample) {
  // Fetch new data each time a new sample is selected
  age_input = newSample;
  buildCharts(newSample);
}

// Initialize the dashboard
initBubble();
