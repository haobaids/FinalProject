var gender_input='All';
var age_input='All';
var edu_input='All';


function init() {
  var data = [{
    x: ['Your Estimated Salary', 'Median Salary of All Data Science Jobs'],
    y: [0, 95000],
    text: [0, 95000],
    textposition: 'auto',
    type: "bar"
  }];

  var layout = {
    height: 400,
    width: 800,
    'yaxis': {'title': 'Annual Salary'}
  };

  Plotly.plot("salaryestbarchart", data, layout);
}

init();

// Update the plot with new data
function updatePlotly(newdata) {
  var BARCHART = document.getElementById("salaryestbarchart");
  var useit = [newdata, 95000];
  console.log('data use to update bar chart ', useit)
  if (newdata>0) {
    Plotly.restyle(BARCHART, "y", [useit]);
    Plotly.restyle(BARCHART, "text", [useit]);
  }
  else {
    var no_data_found = ["No Data", 95000];
    useit = [100, 95000];
    Plotly.restyle(BARCHART, "y", [useit]);
    Plotly.restyle(BARCHART, "text", [no_data_found]);

  }
}



function buildCharts(sample) {
  console.log('input data for gender age education: ', sample);
  var datause;
  var data_not_find = true;

  d3.json("static/dataset/salary_median_data.json", function(data) {
    // console.log('gender: ', data['Gender'])
    // console.log('age: ', data['Age'])
    // console.log('education: ', data['FormalEducation'])
    // console.log('salary: ', data['Salary'])

    // console.log('key length: ', Object.keys(data['Salary']).length)

    for (let i = 0; i <  Object.keys(data['Salary']).length; i++) {
      console.log('i:', i)
      console.log('i edu:', data["FormalEducation"][i])
      console.log('right edu:', sample[2])
      if (data["Gender"][i] === sample[0] && data["Age"][i] === sample[1] && data["FormalEducation"][i].substring(0, 4) === sample[2].substring(0, 4)) {
        console.log('right salary:', data['Salary'][i])
        datause = data['Salary'][i];
        data_not_find = false;

        break;
    }
    if (data_not_find) {
      datause = -1
    }
  }
  console.log("salary estimate is", datause);
  updatePlotly(datause);

  });
}


function getGenderData(dataset) {
  var datause = [];
  console.log("gender is ", dataset);
  if (dataset === 'defaultvalue') {
    console.log("gender is not selected")
  }
  else {
    console.log("next step should be getting gender input");
    switch(dataset) {
      case '0':
        gender_input = 'Female';
        break;
      case '1':
        gender_input = 'Male';
        break;
    }
  }
  datause.push(gender_input);
  datause.push(age_input);
  datause.push(edu_input);
  console.log("current input", datause);
  buildCharts(datause);
  
}

function getAgeData(dataset) {
  // Fetch new data each time a new sample is selected
  var datause = [];
  console.log("age is ", dataset);
  if (dataset === 'defaultvalue') {
    console.log("age is not selected")
  }
  else {
    console.log("next step should be getting age input");
    switch(dataset) {
      case '0':
        age_input = '18 - 24 years old';
        break;
      case '1':
        age_input = '25 - 34 years old';
        break;
      case '2':
        age_input = '35 - 44 years old';
        break;
      case '3':
        age_input = '45 - 54 years old';
        break;
      case '4':
        age_input = '55 - 64 years old';
        break;
      case '5':
        age_input = '65 years or older';
        break;
      case '6':
        age_input = 'Under 18 years old';
        break;
    }
  }
  datause.push(gender_input);
  datause.push(age_input);
  datause.push(edu_input);
  console.log("current input", datause);
  buildCharts(datause);
  
}

function getEduData(dataset) {
  // Fetch new data each time a new sample is selected
  var datause = [];
  console.log("education is ", dataset);
  if (dataset === 'defaultvalue') {
    console.log("education is not selected")
  }
  else {
    console.log("next step should be getting education input");
    switch(dataset) {
      case '0':
        edu_input = 'Associate degree';
        break;
      case '1':
        edu_input = "Bachelor's degree (BA, BS, B.Eng., etc.)";
        break;
      case '2':
        edu_input = 'I never completed any formal education';
        break;
      case '3':
        edu_input = "Master's degree (MA, MS, M.Eng., MBA, etc.)";
        break;
      case '4':
        edu_input = 'Other doctoral degree (Ph.D, Ed.D., etc.)';
        break;
      case '5':
        edu_input = 'Primary/elementary school';
        break;
      case '6':
        edu_input = 'Professional degree (JD, MD, etc.)';
        break;
      case '7':
        edu_input = 'Secondary school (e.g. American high school, German Realschule or Gymnasium, etc.)';
        break;
      case '8':
        edu_input = 'Some college/university study without earning a degree';
        break;

    }
  }
  datause.push(gender_input);
  datause.push(age_input);
  datause.push(edu_input);
  console.log("current input", datause);
  buildCharts(datause);
}