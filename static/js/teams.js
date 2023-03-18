
d3.json("http://127.0.0.1:8000/api/v1.0/games").then(function(data){console.log(data)});

d3.json("http://127.0.0.1:8000/api/v1.0/games").then(function(data){console.log(
    data.length
    
    )});

// d3.json("http://127.0.0.1:8000/api/v1.0/games").then(doughnut);

// function doughnut(data){



//     // datasets = data.map(item =>

//     //     {
//     //     "label": `Game: ${item.game_id}`,
//     //     "data": [item.fgm_home, item.fgm_away],
//     //     "backgroundColor": ["rgb(255, 0, 0)","rgb(0, 0, 255)"]       
//     //     }
//     // );

//     console.log(datasets);

//     const data_to_plot = {
//         labels: ["Home","Away"],
//         datasets:datasets,
//         hoverOffset: 4
//     };

//     const config = {
//         type: 'doughnut',
//         data: data_to_plot,
//         options:{
//             responsive: true,
//             plugins:{
//                 legend: {
//                     position: 'top',
//                 },
//             title: {
//                 display: true,
//                 text: "Home and Away Field Goals"
//                 }   
//             }
//         }
// };

//     let ctx = document.getElementById("testmap").getContext('2d');

//     new Chart(ctx, config);

// }

d3.json("http://127.0.0.1:8000/api/v1.0/games").then(testfunc2)

function testfunc(data){

    const data_to_plot = {
        labels: ["Home","Away"],
        datasets:[{
            label: `Game: ${data[0].game_id}`,
            data: [data[0].fgm_home, data[0].fgm_away],
            backgroundColor: ["rgb(255, 0, 0)","rgb(0, 0, 255)"]
        },
        {
            label: `Game: ${data[1].game_id}`,
            data: [data[1].fgm_home, data[1].fgm_away],
            backgroundColor: ["rgb(255, 0, 0)","rgb(0, 0, 255)"]
        }],
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

    new Chart(ctx, config);
}

function testfunc2(data){

    let datasets = [];

    for(let i = 0; i < 20; i++){
        dataset_used = {
            label: `Game: ${data[i].game_id}`,
            data: [data[i].fgm_home, data[i].fgm_away],
            backgroundColor: ["rgb(255, 0, 0)","rgb(0, 0, 255)"]
        };
        datasets.push(dataset_used);
    };


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

    new Chart(ctx, config);

    console.log("finished running function");
}

function ptsplot(data){

    // let dates = [];
    // let pts_home = [];
    // let pts_away = [];

    // for(let i = 0; i < data.length; i++){



    //     dates.push(data[i].game_date);
    //     pts_home.push(data[i].pts_home);
    //     pts_away.push(data[i].pts_away);
    // }

    const home_data = data.map(item => {
        return {
            x:moment(item.game_date, "YYYY-MM-DD"),
            y:item.pts_home
        };
    });

    const away_data = data.map(item => {
        return {
            x:moment(item.game_date, "YYYY-MM-DD"),
            y:item.pts_away
        };
    });

    const data_to_plot = {
        datasets:[{
            label:"Home Points",
            data:home_data,
            fill:false,
            borderColor: 'rgb(255, 0, 0)',
            tension: 0.1
        },
        {
            label:"Away Points",
            data:away_data,
            fill:false,
            borderColor: 'rgb(0, 0, 255)',
            tension: 0.1
        }],
        hoverOffset: 4
    };

    const config = {
        type: 'line',
        data: data_to_plot,
        options:{
            responsive: true,
            interaction: {
                mode: "index",
                intersect: false
            },
            stacked:false,
            plugins:{
                legend: {
                    position: 'top',
                },
            title: {
                display: true,
                text: "Home and Away Points over Time"
                }   
            },
            scales: {
                x: {
                    type: 'time',
                    time: {
                      unit: 'month',
                      displayFormats: {month:"MMM YYYY"}
                    },
                    title: {
                      display: true,
                      text: 'Date'
                    }
                },
                y: {
                  type: 'linear',
                  display: true,
                  position: 'left',
                },
                y1: {
                  type: 'linear',
                  display: true,
                  position: 'right',
                  grid: {
                    drawOnChartArea: false
                  }
                }
            }
        }

    };

    let ctx = document.getElementById("pts_line").getContext('2d');

    new Chart(ctx, config);

    console.log("finished running function");
}




