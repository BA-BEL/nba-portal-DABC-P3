@app.route('/player_teams/',methods=['GET'])
def player_teams():
    team_name = request.args.get('team_name')
    response=requests.get(f'http://127.0.0.1:8000/api/v1.0/players/team/{team_name}')
    data = response.json()
    return render_template('player_teams.html',team_name=data['team_name'],players=data['team_players'])