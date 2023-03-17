
d3.json("http://127.0.0.1:8000/api/v1.0/games").then(function(data){console.log(data)});


let data_to_plot = {
    labels: [
      'Red',
      'Blue',
      'Yellow'
    ],
    datasets: [{
      label: 'My First Dataset',
      data: [300, 50, 100],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)'
      ],
      hoverOffset: 4
    }]
  };

let config = {
    type: 'doughnut',
    data: data_to_plot,
    options:{}
  };

  let ctx = document.getElementById("testmap").getContext('2d');

  const testplot = new Chart(ctx, config);