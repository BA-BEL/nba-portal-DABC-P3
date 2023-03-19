
// API endpoint
const url = "http://127.0.0.1:8000/api/v1.0/games"

main();


function main(){

    d3.json(url).then(function(data){

    //Initialize array
    let r15 = []

    for(let i = 0; i < 15; i++){
        let rng = Math.floor(Math.random()*data.length);
        r15.push(rng);
    };


    // Initialize datasets array
    let datasets = [];

    // Using a for of loop, iterate through the r15 array to grab 15 random samples
    for(let i of r15){
        dataset_used = {
            label: `Game: ${data[i].game_id}`,
            data: [data[i].fgm_home, data[i].fgm_away],
            backgroundColor: ["rgb(255, 0, 0)","rgb(0, 0, 255)"]
        };
        datasets.push(dataset_used);
    };


    // plot data
    const data_to_plot = {
        labels: ["Home","Away"],
        datasets:datasets,
        hoverOffset: 4
    };

    const config = {
        type: 'doughnut',
        data: data_to_plot,
        options:{
            responsive: true,
            plugins:{
                legend: {
                    position: 'top',
                },
            title: {
                display: true,
                text: "Home and Away Field Goals"
                }   
            }
        }
    };

    let ctx = document.getElementById("testmap").getContext('2d');

    donut = new Chart(ctx, config);

        console.log("Plotted data");
    })
};
    
function randomize(){

    console.log("Randomizing data...");

    d3.select("#loadingtext1").text("Loading...");

    d3.json(url).then(function (data){
        //Initialize array
        let r15 = []

        for(let i = 0; i < 15; i++){
            let rng = Math.floor(Math.random()*data.length);
            r15.push(rng);
        };


        // Initialize datasets array
        let datasets = [];

        // Using a for of loop, iterate through the r15 array to grab 15 random samples
        for(let i of r15){
            dataset_used = {
                label: `Game: ${data[i].game_id}`,
                data: [data[i].fgm_home, data[i].fgm_away],
                backgroundColor: ["rgb(255, 0, 0)","rgb(0, 0, 255)"]
            };
            datasets.push(dataset_used);
        };

        donut.data.datasets = datasets;
        donut.update();

        d3.select("#loadingtext1").text("");
    });
    // donut.destroy();
    // main();




}
    





















