
// For position bar chart
var datacount = [];
var dataposition = [];

function initpositionchart() {

    

    d3.json("static/dataset/role_wanted_data.json", function(data) {
        // console.log("newdata", data);
        // console.log("position", data['position']);
        // console.log("count", data['company']);

        console.log("getting role_wanted_data.json");
        datacount.push(data['company'][0]);
        datacount.push(data['company'][1]);
        datacount.push(data['company'][2]);
        datacount.push(data['company'][3]);
        datacount.push(data['company'][4]);
        
        console.log("datacount", datacount);

        dataposition.push(data['position'][0]);
        dataposition.push(data['position'][1]);
        dataposition.push(data['position'][2]);
        dataposition.push(data['position'][3]);
        dataposition.push(data['position'][4]);
        
        console.log("dataposition", dataposition);

        var data = [{
            x: dataposition,
            y: datacount,
            text: datacount,
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
        Plotly.restyle(BARCHART, "y", datacount);
        Plotly.restyle(BARCHART, "text", datacount);
    });

    console.log("datacount", datacount);
};

  

// Initialize the dashboard
initpositionchart();


