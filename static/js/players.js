// Get the endpoint
const url = "http://127.0.0.1:8000/api/v1.0/players";

// Initialize the function 
function init() {

  // Use D3 to get the options for drop down Menu
  d3.json(url).then((data) => {
    let playersdata = data.map(item => item.Name);
    let playerids = data.map(item => item.id)
    console.log(data)
    // console.log(playersdata)
    // console.log(playerids)
    // console.log(data)
    // fill drop down with data
    fillDrowpDown(playersdata, playerids, data);

  });
};

function fillDrowpDown(playersdata, playerids, data) {
  
  // Set a variable for the players name
  let names = playersdata;
  let ids = playerids; 
  // console.log(playersname);
  
  let dropdownMenu = d3.select("#selDataset");
  
  let option;

  // Add  players name to dropdown menu
  for(let i = 0; i < ids.length; i++){
    
    option = dropdownMenu.append("option");
    option_value = option.attr("value",ids[i]);
    option_text = option.text(names[i]);

  }



    // console.log(id);

  // Set the first player from the list
  let player = names[0];

  // buildDashboard(player_one, data);
  buildMetadata(player, data);
  buildGaugeChart(player, data);
}
// Function that populates players metadata info
function buildMetadata(player, data) {

  // Retrieve all metadata
  let metadata = data;

  // Filter based on the value of the sample
  let value = metadata.filter(result => result.Name == player);

  console.log(value)

  // Get the first index from the array
  let valueData = value[0];

  // Clear out metadata
  d3.select("#sample-metadata").html("");

  // Use Object.entries to add each key/value pair to the panel

  Object.entries(valueData).forEach(([key, value]) => {

    // Log the individual key/value pairs as they are being appended to the metadata panel
    // console.log(key, value);

    d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);
  });

};


// Function that builds the Gauge chart
function buildGaugeChart(player, data) {

  let playerinfo = data;
  // Filter based on the value of the name
  let value = playerinfo.find(result => result.Name == player);
  console.log(value), value.Played;
  let freq = value.Played
  let trace2 = [{
    domain: { x: [0, 1], y: [0, 1] },
    value: freq,
    title: '<b> 82 NBA Games In A Regular Season </b> <br></br> Games played per season',
    type: "indicator",
    mode: "gauge+number",
    gauge: {
      axis: { range: [null, 82] },
      steps: [
        { range: [0, 20], color: "darkblue"},
        { range: [20, 40], color: "blue"},
        { range: [40, 60], color: "darkred",},
        { range: [60, 82], color: "red",}
      ]
    }
  }];

  let layout = { width: 600, height: 450, paper_bgcolor: "transparent", font: { color: "black", family: "Arial" }, margin: { t: 0, b: 0 } };
  Plotly.newPlot('gauge', trace2, layout);

}

function polar(value ) {

  let index = parseInt(value);

  d3.json(url).then(function (data) {

    // assign values to object for indentified player (default id = index = 0) 
    // let fg2pct = data[index].2p%;
    // let fg3pct = data[index].3p%;
    // let ast = data[index].Assists;
    // let ftpct = data[index].Free%;
    // let stl = data[index].Steals
    // let blk = data[index].Blocks;
    // let tov = data[index].Turnovers;
    // let reb = data[index].Rebounds;
    // let pf = data[index].Fouls;
    // let pts = data[index].Points_pg;

    let fg2pct = data[index]["2p%"];
    let fg3pct = data[index]["3p%"];
    let ast = data[index].Assists;
    let ftpct = data[index]["Free%"];
    let stl = data[index].Steals;
    let blk = data[index].Blocks;
    let reb = data[index].Rebounds;
    let pf = data[index].Fouls;
    let ppg = data[index].Points_pg;
    let turn = data[index].Turnovers
    ;

    // create array for this
    let datarray = [fg2pct, fg3pct, ast, ftpct, stl, blk, reb, pf, ppg, turn];

    let bgcolors = ["rgba(255, 0, 0, 1)", 
                        "rgba(0, 128, 0, 1)", 
                        "rgba(0, 0, 255, 1)",
                        "rgba(0, 0, 0, 1)",
                        "rgba(128, 128, 128, 1)",
                        "rgba(255, 255, 0, 1)",
                        "rgba(255, 165, 0, 1)",
                        "rgba(128, 0, 128, 1)",
                        "rgba(255, 192, 203, 1)",
                        "rgba(173, 216, 230, 1)"                     
                        ]

    const data_to_plot = {
      labels: [
        '2 points %',
        '3 points %',
        'Assists',
        'Free throw %',
        'Steals',
        'Blocks',
        'Rebounds',
        'Fouls',
        'Points per Game',
        'Turnovers'
      ],
      datasets: [
        {
          label: 'Player stats',
          data: datarray,
          fill: true,
          backgroundColor: bgcolors,
          borderColor: 'rgba(175, 175, 175, 0.5)',
          pointBackgroundColor: 'rgb(255, 99, 132)',
          pointHoverBorderColor: 'rgb(255, 99, 132)'
        }
      ]
    };

    const config = {
      type: 'polarArea',
      data: data_to_plot,
      options: {
        responsive: true,
        maintainAspectRatio: true,
        elements: {
          line: {
            borderWidth: 3
          }
        },
        plugins:{
          legend:{
            position:"right",
            align: "start",
            labels:{color:"black"}

          }

        }
      },
    };

    let ctx = document.getElementById("polar").getContext('2d');

    polarchart = new Chart(ctx, config);

    console.log("Plotted polar chart");
  });
}

function polarUpdate(value) {

  let index = parseInt(value);

  d3.json(url).then(function (data) {

    // assign values to object for indentified player (default id = index = 0) 
    // let fg2pct = data[index].2p%;
    // let fg3pct = data[index].3p%;
    // let ast = data[index].Assists;
    // let ftpct = data[index].Free%;
    // let stl = data[index].Steals
    // let blk = data[index].Blocks;
    // let tov = data[index].Turnovers;
    // let reb = data[index].Rebounds;
    // let pf = data[index].Fouls;
    // let pts = data[index].Points_pg;

    let fg2pct = data[index]["2p%"];
    let fg3pct = data[index]["3p%"];
    let ast = data[index].Assists;
    let ftpct = data[index]["Free%"];
    let stl = data[index].Steals
    let blk = data[index].Blocks;
    let reb = data[index].Rebounds;
    let pf = data[index].Fouls;

    // create array for this
    let datarray = [fg2pct, fg3pct, ast, ftpct, stl, blk, reb, pf];

    polarchart.data.datasets[0].data = (datarray);
    polarchart.update()
  });
}

// Function that updates dashboard when sample is changed
function optionChanged(value) {

  // console.log(value);

  d3.json(url).then(function(data) {
    console.log(data[value].id);
    console.log("TEST", data);
    let playersdata = data;
    // let playerdata = data[value];
    // Log the new value
    // console.log(value);
    // Plot with the new sample 
    
    buildMetadata(data[value].Name, playersdata);
    buildGaugeChart(data[value].Name, playersdata);
    polarUpdate(value);
    
  })
};

// Call the initialize function
init();

polar(0);
