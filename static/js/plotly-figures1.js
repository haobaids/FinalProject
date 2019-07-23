
// For position chart
function initpositionchart() {

    var data = [{
        x: ['1','2','3','4','5'],
        y: [1,1,1,1,1],
        text: [0,0,0,0,0],
        textposition: 'auto',
        type: "bar"
    }];

    var layout = {
        height: 400,
        width: 600,
        'yaxis': {'title': 'Number of Companies'}
    };

    var BARCHART = document.getElementById("positionchart");

    Plotly.plot(BARCHART, data, layout);

    d3.json("static/dataset/role_wanted_data.json", function(data) {
        // console.log("newdata", data);
        // console.log("position", data['position']);
        // console.log("count", data['company']);

        // console.log("getting role_wanted_data.json");
        const datacount = []
        const dataposition = [];
        
        for (let i = 0; i <  Object.keys(data['position']).length; i++) {
            // console.log("loop", i, data['company'][i])
            datacount.push(data['company'][i]);
            dataposition.push(data['position'][i]);
        }
        
        // console.log("datacount", datacount);        
        // console.log("dataposition", dataposition);

        Plotly.restyle(BARCHART, "x", [dataposition]);
        Plotly.restyle(BARCHART, "y", [datacount]);
        Plotly.restyle(BARCHART, "text", [datacount]);
    });

};

  
// For company chart
function initcompanychart() {

    var data = [{
        x: ['1','2','3','4','5','6','7','8','9','10'],
        y: [1,1,1,1,1,1,1,1,1,1],
        text: [0,0,0,0,0,0,0,0,0,0],
        textposition: 'auto',
        type: "bar"
    }];

    var layout = {
        height: 400,
        width: 600,
        'yaxis': {'title': 'Number of Positions'}
    };

    var BARCHART = document.getElementById("companychart");

    Plotly.plot(BARCHART, data, layout);

    d3.json("static/dataset/company_vacancy_data.json", function(data) {
        // console.log("newdata", data);
        // console.log("positioncount", data['position']);
        // console.log("company", data['company']);

        // console.log("getting role_wanted_data.json");
        const positioncount = []
        const companyposition = [];
        
        for (let i = 0; i <  Object.keys(data['company']).length; i++) {
            // console.log("loop", i, data['company'][i])
            companyposition.push(data['company'][i]);
            positioncount.push(data['position'][i]);
        }
        
        // console.log("positioncount", positioncount);        
        // console.log("dataposition", companyposition);

        Plotly.restyle(BARCHART, "x", [companyposition]);
        Plotly.restyle(BARCHART, "y", [positioncount]);
        Plotly.restyle(BARCHART, "text", [positioncount]);
    });

};


// For age range salary chart
function initagesalarychart() {

    var data = [{
        x: ['1','2','3','4','5','6','7'],
        y: [1,1,1,1,1,1,1],
        text: [0,0,0,0,0,0,0],
        textposition: 'auto',
        type: "bar"
    }];

    var layout = {
        height: 400,
        width: 600,
        'yaxis': {'title': 'Median Salary (Annually)'}
    };

    var BARCHART = document.getElementById("salaryagechart");

    Plotly.plot(BARCHART, data, layout);

    d3.json("static/dataset/salary_age_data.json", function(data) {
        // console.log("newdata", data);
        // console.log("age", data['Age']);
        // console.log("salary", data['Salary']);

        // console.log("getting role_wanted_data.json");
        const agerange = []
        const salary = [];
        
        for (let i = 0; i <  Object.keys(data['Age']).length; i++) {
            // console.log("loop", i, data['Age'][i])
            agerange.push(data['Age'][i]);
            salary.push(data['Salary'][i]);
        }

        Plotly.restyle(BARCHART, "x", [agerange]);
        Plotly.restyle(BARCHART, "y", [salary]);
        Plotly.restyle(BARCHART, "text", [salary]);
    });

};

// For gender salary chart
function initgendersalarychart() {

    var data = [{
        x: ['1','2'],
        y: [1,1],
        text: [0,0],
        textposition: 'auto',
        type: "bar"
    }];

    var layout = {
        height: 400,
        width: 600,
        'yaxis': {'title': 'Median Salary (Annually)'}
    };

    var BARCHART = document.getElementById("salarygenderchart");

    Plotly.plot(BARCHART, data, layout);

    d3.json("static/dataset/salary_gender_data.json", function(data) {
        // console.log("newdata", data);
        // console.log("gender", data['Gender']);
        // console.log("salary", data['Salary']);

        console.log("getting role_wanted_data.json");
        const gender = []
        const salary = [];
        
        for (let i = 0; i <  Object.keys(data['Gender']).length; i++) {
            console.log("loop", i, data['Gender'][i])
            gender.push(data['Gender'][i]);
            salary.push(data['Salary'][i]);
        }

        Plotly.restyle(BARCHART, "x", [gender]);
        Plotly.restyle(BARCHART, "y", [salary]);
        Plotly.restyle(BARCHART, "text", [salary]);
    });

};

// Initialize the dashboard
initpositionchart();

initcompanychart();

initagesalarychart();

initgendersalarychart();

