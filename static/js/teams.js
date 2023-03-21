
// API endpoint
const url = "http://127.0.0.1:8000/api/v1.0/games"

summary();

explore15();


// Plot and summarize 15 random samples 
function explore15() {

    d3.json(url).then(function (data) {

        //Initialize array
        let r15 = []

        for (let i = 0; i < 15; i++) {
            let rng = Math.floor(Math.random() * data.length);
            r15.push(rng);
        };


        // Initialize datasets array
        let datasets = [];

        //  Initialize panel Summary stats objects
        let home_wins = 0;
        let away_wins = 0;
        let home_fgm = [];
        let away_fgm = [];
        let home_ftm = [];
        let away_ftm = [];
        let home_pts = [];
        let away_pts = [];

        // Using a for of loop, iterate through the r15 array to grab 15 random samples
        for (let i of r15) {

            // Fill datasets
            dataset_used = {
                label: `Game: ${data[i].game_id}`,
                data: [data[i].pts_home, data[i].pts_away],
                backgroundColor: ["rgb(255, 0, 0)", "rgb(0, 0, 255)"]
            };
            datasets.push(dataset_used);

            // Fill summary stats
            if (data[i].wl_home == "W") {
                home_wins += 1;
            } else if (data[i].wl_away == "W") {
                away_wins += 1;
            }
            home_fgm.push(data[i].fgm_home);
            home_ftm.push(data[i].ftm_home);
            home_pts.push(data[i].pts_home);
            away_fgm.push(data[i].fgm_away);
            away_ftm.push(data[i].ftm_away);
            away_pts.push(data[i].pts_away);

        };

        // Calculate Arithmetic averages for summary arrays
        let avg_home_fgm = avg(home_fgm);
        let avg_away_fgm = avg(away_fgm);
        let avg_home_ftm = avg(home_ftm);
        let avg_away_ftm = avg(away_ftm);
        let avg_home_pts = avg(home_pts);
        let avg_away_pts = avg(away_pts);

        // Calculate home win rate, formatted in units of percent
        home_win_rate = Math.round((home_wins / (home_wins + away_wins)) * 100)

        // Populate summary stats panel
        d3.select("#sample-summary-stats").append("p").append("strong").text(`Home win rate: ${home_win_rate}%`)
        d3.select("#sample-summary-stats").append("p").text(`Home wins: ${home_wins}`);
        d3.select("#sample-summary-stats").append("p").text(`Away wins: ${away_wins}`);
        d3.select("#sample-summary-stats").append("p").text(`Average home FGM: ${avg_home_fgm}`);
        d3.select("#sample-summary-stats").append("p").text(`Average away FGM: ${avg_away_fgm}`);
        d3.select("#sample-summary-stats").append("p").text(`Average home FTM: ${avg_home_ftm}`);
        d3.select("#sample-summary-stats").append("p").text(`Average away FTM: ${avg_away_ftm}`);
        d3.select("#sample-summary-stats").append("p").text(`Average home Points: ${avg_home_pts}`);
        d3.select("#sample-summary-stats").append("p").text(`Average away Points: ${avg_away_pts}`);



        // plot data
        const data_to_plot = {
            labels: ["Home", "Away"],
            datasets: datasets,
            hoverOffset: 4
        };


        const config = {
            type: 'doughnut',
            data: data_to_plot,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: "Home and Away Points"
                    }
                }
            }
        };

        let ctx = document.getElementById("doughnutmap1").getContext('2d');

        donut = new Chart(ctx, config);

        console.log("Plotted doughnut data");
    })
};

function randomize() {

    console.log("Randomizing data...");

    d3.select("#loadingtext1").text("Loading...");

    d3.json(url).then(function (data) {
        //Initialize array
        let r15 = []

        for (let i = 0; i < 15; i++) {
            let rng = Math.floor(Math.random() * data.length);
            r15.push(rng);
        };


        // Initialize datasets array
        let datasets = [];

        //  Initialize panel Summary stats objects
        let home_wins = 0;
        let away_wins = 0;
        let home_fgm = [];
        let away_fgm = [];
        let home_ftm = [];
        let away_ftm = [];
        let home_pts = [];
        let away_pts = [];

        // Using a for of loop, iterate through the r15 array to grab 15 random samples
        for (let i of r15) {

            // Fill datasets
            dataset_used = {
                label: `Game: ${data[i].game_id}`,
                data: [data[i].pts_home, data[i].pts_away],
                backgroundColor: ["rgb(255, 0, 0)", "rgb(0, 0, 255)"]
            };
            datasets.push(dataset_used);

            // Fill summary stats
            if (data[i].wl_home == "W") {
                home_wins += 1;
            } else if (data[i].wl_away == "W") {
                away_wins += 1;
            }
            home_fgm.push(data[i].fgm_home);
            home_ftm.push(data[i].ftm_home);
            home_pts.push(data[i].pts_home);
            away_fgm.push(data[i].fgm_away);
            away_ftm.push(data[i].ftm_away);
            away_pts.push(data[i].pts_away);

        };

        // Calculate Arithmetic averages for summary arrays
        let avg_home_fgm = avg(home_fgm);
        let avg_away_fgm = avg(away_fgm);
        let avg_home_ftm = avg(home_ftm);
        let avg_away_ftm = avg(away_ftm);
        let avg_home_pts = avg(home_pts);
        let avg_away_pts = avg(away_pts);

        // Calculate home win rate, formatted in units of percent
        home_win_rate = Math.round((home_wins / (home_wins + away_wins)) * 10000)/100

        // Update summary stats panel
        d3.select("#sample-summary-stats").html("")
        d3.select("#sample-summary-stats").append("p").append("strong").text(`Home win rate: ${home_win_rate}%`)
        d3.select("#sample-summary-stats").append("p").text(`Home wins: ${home_wins}`);
        d3.select("#sample-summary-stats").append("p").text(`Away wins: ${away_wins}`);
        d3.select("#sample-summary-stats").append("p").text(`Average home FGM: ${avg_home_fgm}`);
        d3.select("#sample-summary-stats").append("p").text(`Average away FGM: ${avg_away_fgm}`);
        d3.select("#sample-summary-stats").append("p").text(`Average home FTM: ${avg_home_ftm}`);
        d3.select("#sample-summary-stats").append("p").text(`Average away FTM: ${avg_away_ftm}`);
        d3.select("#sample-summary-stats").append("p").text(`Average home Points: ${avg_home_pts}`);
        d3.select("#sample-summary-stats").append("p").text(`Average away Points: ${avg_away_pts}`);

        // Update datasets for plot
        donut.data.datasets = datasets;
        donut.update();

        d3.select("#loadingtext1").text("");
    });
    // donut.destroy();
    // main();

}


// Function to summary charts and panel

function summary() {
    d3.json(url).then(function(data){
        

        // Initialize summary stats
        let home_wins = 0;
        let away_wins = 0;

        // initialize arrays that will be averaged for statistics
        let home_fg2m = [];
        let home_fg3m = [];
        let home_ftm = [];
        let home_ast = [];
        let home_stl = [];
        let home_blk = [];
        let home_tov = [];

        let home_pts = [];

        let away_fg2m = [];
        let away_fg3m = [];
        let away_ftm = [];
        let away_ast = [];
        let away_stl = [];
        let away_blk = [];
        let away_tov = [];
        
        let away_pts = [];

        for(let i = 0; i < data.length; i++){

            // Fill summary stats
            if (data[i].wl_home == "W") {
                home_wins += 1;
            } else if (data[i].wl_away == "W") {
                away_wins += 1;
            }

            home_fg2m.push(data[i].fg2m_home);
            home_fg3m.push(data[i].fg3m_home);
            home_ftm.push(data[i].ftm_home);
            home_ast.push(data[i].ast_home);
            home_stl.push(data[i].stl_home);
            home_blk.push(data[i].blk_home);
            home_tov.push(data[i].tov_home);

            home_pts.push(data[i].pts_home);

            away_fg2m.push(data[i].fg2m_away);
            away_fg3m.push(data[i].fg3m_away);
            away_ftm.push(data[i].ftm_away);
            away_ast.push(data[i].ast_away)
            away_stl.push(data[i].stl_away);
            away_blk.push(data[i].blk_away);
            away_tov.push(data[i].tov_away)

            away_pts.push(data[i].pts_away);
            
        }


        // Calculate Arithmetic averages for summary arrays
        let avg_home_fg2m = avg(home_fg2m);
        let avg_home_fg3m = avg(home_fg3m);
        let avg_home_ftm = avg(home_ftm);
        let avg_home_ast = avg(home_ast);
        let avg_home_stl = avg(home_stl);
        let avg_home_blk = avg(home_blk);
        let avg_home_tov = avg(home_tov);

        let avg_away_fg2m = avg(away_fg2m);
        let avg_away_fg3m = avg(away_fg3m);
        let avg_away_ftm = avg(away_ftm);
        let avg_away_ast = avg(away_ast);
        let avg_away_stl = avg(away_stl);
        let avg_away_blk = avg(away_blk);
        let avg_away_tov = avg(away_tov);
        
        let avg_home_pts = avg(home_pts);
        let avg_away_pts = avg(away_pts);


        // create Two radar charts:


        //  1
        // Create dataset arrays

        let home_performance_summary1 = [avg_home_fg3m, avg_home_stl, avg_home_blk]
        let away_performance_summary1 = [avg_away_fg3m, avg_away_stl, avg_away_blk]


        // Data setup

        const labels1 = ["FG3M", "STL","BLK"]

        const data_to_plot1 = {
            labels:labels1,
            datasets:[
                {
                    label: "Home",
                    data: home_performance_summary1,
                    borderColor:"rgb(255, 0, 0, 0.9)",
                    backgroundColor:"rgb(255, 0, 0, 0.5)"
                },
                {
                    label: "Away",
                    data: away_performance_summary1,
                    borderColor:"rgb(0, 0, 255, 0.9)",
                    backgroundColor:"rgb(0, 0, 255, 0.5)"
                }
            ]
        }


        // Config
        const config1 = {
            type:"radar",
            data:data_to_plot1,
            options:{
                responsive:true,
                plugins:{
                    title:{
                        display:true,
                        text:"Performance Summary 1: Home v Away"
                    }
                }
            }
        }

        
        let ctx = document.getElementById("radar1").getContext('2d');

        radar1 = new Chart(ctx, config1);

        console.log("Plotted radar1 data");

        //  2
        // Create dataset arrays

        let home_performance_summary2 = [avg_home_fg2m, avg_home_ftm, avg_home_ast]
        let away_performance_summary2 = [avg_away_fg2m, avg_away_ftm, avg_away_ast]


        // Data setup

        const labels2 = ["FG2M", "FTM","AST"]

        const data_to_plot2 = {
            labels:labels2,
            datasets:[
                {
                    label: "Home",
                    data: home_performance_summary2,
                    borderColor:"rgb(255, 0, 0, 0.9)",
                    backgroundColor:"rgb(255, 0, 0, 0.5)"
                },
                {
                    label: "Away",
                    data: away_performance_summary2,
                    borderColor:"rgb(0, 0, 255, 0.9)",
                    backgroundColor:"rgb(0, 0, 255, 0.5)"
                }
            ]
        }


        // Config
        const config2 = {
            type:"radar",
            data:data_to_plot2,
            options:{
                responsive:true,
                plugins:{
                    title:{
                        display:true,
                        text:"Performance Summary 2: Home v Away"
                    }
                }
            }
        }

        
        ctx = document.getElementById("radar2").getContext('2d');

        radar2 = new Chart(ctx, config2);

        console.log("Plotted radar2 data");



        ///INSERT BARCHART CODE HERE
        // Create dataset arrays

        let home_performance_summary3 = [home_fg2m, home_fg3m, home_ftm, home_ast, home_stl, home_blk, home_tov]
        let away_performance_summary3 = [away_fg2m, away_fg3m, away_ftm, away_ast, away_stl, away_blk, away_tov]


        // Data setup

        const labels3 = ["FG2M", "FG3M", "FTM","AST", "BLK", "TOV"]

        const data_to_plot3 = {
            labels:labels3,
            datasets:[
                {
                    label: "Home",
                    data: home_performance_summary3,
                    borderColor:"rgb(255, 0, 0, 0.9)",
                    backgroundColor:"rgb(255, 0, 0, 0.2)",
                    outlierColor:"rgb(255, 0, 0, 0.2)",
                    padding:10,
                },
                {
                    label: "Away",
                    data: away_performance_summary3,
                    borderColor:"rgb(0, 0, 255, 0.9)",
                    backgroundColor:"rgb(0, 0, 255, 0.2)",
                    outlierColor:"rgb(0, 0, 255, 0.2)",
                    padding:10,

                }
            ]
        }


        // Config
        const config3 = {
            type:"boxplot",
            data:data_to_plot3,
            options:{
                responsive:true,
                plugins:{
                    title:{
                        display:true,
                        text:"Performance Summary 3: Home v Away"
                    }
                }
            }
        }

        
        ctx = document.getElementById("box1").getContext('2d');

        box1 = new Chart(ctx, config3);

        console.log("Plotted box1 data");
        

        // Calculate home win rate, formatted in units of percent
        home_win_rate = Math.round((home_wins / (home_wins + away_wins)) * 10000)/100

        // Populate summary stats panel
        d3.select("#summary-stats").append("p").append("strong").text(`Home win rate: ${home_win_rate}%`)
        d3.select("#summary-stats").append("p").text(`Home wins: ${home_wins}`);
        d3.select("#summary-stats").append("p").text(`Away wins: ${away_wins}`);
        d3.select("#summary-stats").append("p").text(`Average home FG2M: ${avg_home_fg2m}`);
        d3.select("#summary-stats").append("p").text(`Average away FG2M: ${avg_away_fg2m}`);
        d3.select("#summary-stats").append("p").text(`Average home FG3M: ${avg_home_fg3m}`);
        d3.select("#summary-stats").append("p").text(`Average away FG3M: ${avg_away_fg3m}`);
        d3.select("#summary-stats").append("p").text(`Average home FTM: ${avg_home_ftm}`);
        d3.select("#summary-stats").append("p").text(`Average away FTM: ${avg_away_ftm}`);
        d3.select("#summary-stats").append("p").text(`Average home Points: ${avg_home_pts}`);
        d3.select("#summary-stats").append("p").text(`Average away Points: ${avg_away_pts}`);
        
        
    });
}

        // Config
        const config = {
            type:"radar",
            data:data_to_plot,
            options:{
                responsive:true,
                plugins:{
                    title:{
                        display:true,
                        text:"Performance Summary 2: Home v Away"
                    }
                }
            }
        }


function avg(array) {
    let sum = 0;
    for (let i = 0; i < array.length; i++) {
        sum += array[i]
    }
    let avg = (sum / array.length)
    return Math.round(avg * 100) / 100
}














