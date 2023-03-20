

let myMap = L.map("map-id",{
  center: [37.8, -96],
  zoom: 5
});

let atlanticLayer = L.layerGroup();
let centralLayer = L.layerGroup();
let northwestLayer = L.layerGroup();
let pacificLayer = L.layerGroup();
let southeastLayer = L.layerGroup();
let southwestLayer = L.layerGroup();

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(myMap);

  let openPopup = null;

  d3.json('http://127.0.0.1:8000/api/v1.0/teams').then(function(data){
    console.log(data);

    // let divColors = {
    //   "Southeast":"blue",
    //   "Central":"navy",
    //   "Southwest":"crimson",
    //   "Northwest":"tomato",
    //   "Pacific":"red",
    //   "Atlantic":"deepskyblue"
    // };

    let teamColors = {
      "Atlanta Hawks":"red",
      "Boston Celtics": "green",
      "Cleveland Cavaliers": "maroon",
      "New Orleans Pelicans":"navy",
      "Chicago Bulls":"firebrick",
      "Dallas Mavericks":"mediumblue",
      "Denver Nuggets":"navy",
      "Golden State Warriors":"blue",
      "Houston Rockets":"red",
      "Los Angeles Clippers":"white",
      "Los Angeles Lakers":"gold",
      "Miami Heat":"black",
      "Milwaukee Bucks":"darkgreen",
      "Minnesota Timberwolves":"steelblue",
      "Brooklyn Nets":"black",
      "New York Knicks":"blue",
      "Orlando Magic":"blue",
      "Indiana Pacers":"gold",
      "Philadelphia 76ers":"white",
      "Phoenix Suns":"purple",
      "Portland Trail Blazers":"red",
      "Sacramento Kings":"purple",
      "San Antonio Spurs":"silver",
      "Oklahoma City Thunder":"dodgerblue",
      "Washington Wizards":"navy",
      "Detroit Pistons": "dodgerblue",
      "Charlotte Hornets":"teal",
      "Toronto Raptors":"purple",
      "Memphis Grizzlies":"lightsteelblue",
      "Utah Jazz":"yellow"
    }

    let teamOuters = {
      "Atlanta Hawks":"gold",
      "Boston Celtics": "white",
      "Cleveland Cavaliers": "darkgoldenrod",
      "New Orleans Pelicans":"darkgoldenrod",
      "Chicago Bulls":"black",
      "Dallas Mavericks":"grey",
      "Denver Nuggets":"lightblue",
      "Golden State Warriors":"gold",
      "Houston Rockets":"grey",
      "Los Angeles Clippers":"darkblue",
      "Los Angeles Lakers":"purple",
      "Miami Heat":"red",
      "Milwaukee Bucks":"beige",
      "Minnesota Timberwolves":"grey",
      "Brooklyn Nets":"white",
      "New York Knicks":"orange",
      "Orlando Magic":"grey",
      "Indiana Pacers":"navy",
      "Philadelphia 76ers":"mediumblue",
      "Phoenix Suns":"orange",
      "Portland Trail Blazers":"black",
      "Sacramento Kings":"silver",
      "San Antonio Spurs":"black",
      "Oklahoma City Thunder":"orange",
      "Washington Wizards":"red",
      "Detroit Pistons": "crimson",
      "Charlotte Hornets":"purple",
      "Toronto Raptors":"red",
      "Memphis Grizzlies":"grey",
      "Utah Jazz":"navy"
    }


    data.forEach(function(team){
      let circle = L.circle([team.Latitude, team.Longitude],{
        radius: 50000,
        color: teamOuters[team.Franchise],
        weight: 5,
        fillColor:teamColors[team.Franchise],
        fillOpacity:0.9
      });
      
      let popupContent = "<h3>"+team.Franchise+"</h3><hr>Established: "+team.Established+"<br>Division: "+
      team.Division+"<br>Current Conference Ranking: "+team.Current_Conference_Rank+"<hr>Next Home Game: "+team.Next_Homegame+
      "<br>Average ticket price next home: $"+team.Current_Average_Price;

      let popup=L.popup().setLatLng([team.Latitude,team.Longitude]).setContent(popupContent)

      circle.bindTooltip(popupContent).openTooltip();

      circle.on('click',function(e){
        if (openPopup) {
          myMap.closePopup(openPopup)
        };
        myMap.flyTo(e.latlng,myMap.getZoom()+4);
        popup.openOn(myMap);
        openpOPUP = popup;
      });

      circle.on('mouseover',onMouseOver);
      
      
      myMap.on('click',function(e){
        if (openPopup) {
          myMap.closePopup(openPopup);
          myMap.setView([37.8, -96], 3);
          openPopup = null;
        }
      });

      if (team.Division === "Atlantic") {
        atlanticLayer.addLayer(circle);
      } else if (team.Division === "Central") {
        centralLayer.addLayer(circle);
      } else if (team.Division === "Northwest") {
        northwestLayer.addLayer(circle);
      } else if (team.Division === "Pacific") {
        pacificLayer.addLayer(circle);
      } else if (team.Division === "Southeast") {
        southeastLayer.addLayer(circle);
      } else if (team.Division === "Southwest") {
        southwestLayer.addLayer(circle);
      }
    });

    atlanticLayer.addTo(myMap);
    centralLayer.addTo(myMap);
    southeastLayer.addTo(myMap);
    northwestLayer.addTo(myMap);
    pacificLayer.addTo(myMap);
    southwestLayer.addTo(myMap);
  
    var overlayMaps = {
      "Atlantic": atlanticLayer,
      "Central": centralLayer,
      "Northwest": northwestLayer,
      "Pacific": pacificLayer,
      "Southeast": southeastLayer,
      "Southwest": southwestLayer
    };
    
    L.control.layers(null, overlayMaps).addTo(myMap);

    function onMouseOver(e) {
      var layer = e.target;
      layer.openTooltip();
    }

  });



