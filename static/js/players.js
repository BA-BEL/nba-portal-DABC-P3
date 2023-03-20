// Get the endpoint
const url = "http://127.0.0.1:8000/api/v1.0/players";

// Declare playersdata variable
var playersdata;

// Initialize the function 
function init() {

  // Use D3 to get the options for drop down Menu
  d3.json(url).then((data) => {
    playersdata = data;  
    console.log(data)
    // fill drop down with data
    fillDrowpDown(playersdata);

  });
};

function fillDrowpDown(data){
  let dropdownMenu = d3.select("#selDataset");
    
  // Set a variable for the players name
  let playersname = data.map(obj => obj.Name);
console.log(playersname);
  
// Add  players name to dropdown menu
  playersname.forEach((id) => {

      console.log(id);

      dropdownMenu.append("option")
      .text(id)
      .property("value",id);
  });

  // Set the first player from the list
  let player_one = playersname[0];
  buildDashboard(player_one, data);
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

  Object.entries(valueData).forEach(([key,value]) => {

      // Log the individual key/value pairs as they are being appended to the metadata panel
      console.log(key,value);

      d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);
  });

};

// Function that builds the Gauge chart

function buildGaugeChart(player, data) {
 
  let playerinfo = data;
  // Filter based on the value of the sample
  let value = playerinfo.find(result => result.Name == player);
  console.log(value), value.Played;  
  let freq=value.Played
  let trace2 = [{
    domain: { x: [0, 1], y: [0, 1] },
    value: freq,
    title: '<b> 82 NBA Games In A Regular Season </b> <br></br> Games played per season',
    type: "indicator",
    mode: "gauge+number",
    gauge: {
    axis: { range: [null, 82] },
    steps: [
    { range: [0, 20], color: "darkblue",text:"benchwarmer" },
    { range: [20, 40], color: "blue",text:"consistant" },
    { range: [40, 60], color: "darkred",text:"core player" },
    { range: [60, 82], color: "red",text:"main man!" }
    ]
    }
  }];
    let layout = { width: 600, height: 450, margin: { t: 0, b: 0 } };
    Plotly.newPlot('gauge', trace2, layout);

}

// // Function that updates dashboard when sample is changed
// function buildDashboard(value) { 

//   // Log the new value
//   console.log(value); 

//   // Call all functions 
//   buildMetadata(value, playersdata);
//   buildGaugeChart(value, playersdata);
// };

// Function that updates dashboard when sample is changed
function optionChanged(value) { 

  // Log the new value
  console.log(value); 

  // Plot with the new sample 

  buildMetadata(value, playersdata);
  buildGaugeChart(value, playersdata);

};

// Call the initialize function
init();


