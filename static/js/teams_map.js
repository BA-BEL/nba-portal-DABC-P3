let myMap = L.map("map-id",{
  center: [37.8, -96],
  zoom: 4
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

    let divColors = {
      "Southeast":"crimson",
      "Central":"greenyellow",
      "Southwest":"dodgerblue",
      "Northwest":"purple",
      "Pacific":"aqua",
      "Atlantic":"darkorange"
    };


    data.forEach(function(team){
      let circle = L.circle([team.Latitude, team.Longitude],{
        radius: 80000,
        color: "black",
        weight: 2,
        fillColor:divColors[team.Division],
        fillOpacity:0.5
      });
      
      let popupContent = "<h3>"+team.Franchise+"</h3><hr>Established: "+team.Established+"<br>Division: "+
      team.Division+"<br>Current Conference Ranking: "+team.Current_Conference_Rank+"<hr>Next Home Game: "+team.Next_Homegame+
      "<br>Average ticket price next home: $"+team.Current_Average_Price;

      let popup=L.popup().setLatLng([team.Latitude,team.Longitude]).setContent(popupContent)

      circle.bindTooltip(popupContent).openTooltip();

      circle.on('click',function(e){
        if (openPopup) {
          myMap.closePopup(openPopup)
        }
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
    northwestLayer.addTo(myMap);
    pacificLayer.addTo(myMap);
    southeastLayer.addTo(myMap);
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



