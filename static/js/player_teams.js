document.addEventListener('DOMContentLoaded', function() {

  // Use D3 to load data from the API
  d3.json(`http://127.0.0.1:8000/api/v1.0/players/team/${teamName}`, function(error, data) {

    // Log any errors that occurred during the request
    if (error) {
      console.error(error);
      return;
    }

    // Print the data to the console
    console.log(data);

    // Create an HTML table to display the data
    var table = d3.select('body').append('table');
    var headerRow = table.append('thead').append('tr');
    headerRow.selectAll('th')
      .data(['Name', 'Position', 'Age'])
      .enter()
      .append('th')
      .text(function(d) { return d; });

    var bodyRows = table.append('tbody').selectAll('tr')
      .data(data.team_players)
      .enter()
      .append('tr');

    bodyRows.selectAll('td')
      .data(function(row) { return [row.Name, row.Position, row.Age]; })
      .enter()
      .append('td')
      .text(function(d) { return d; });

    // Set the team name in the HTML
    document.getElementById('team-name').textContent = data.team_name;

  });

});







