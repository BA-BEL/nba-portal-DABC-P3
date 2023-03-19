@app.route('/api/v1.0/teamsmap')
def showMap():
    return render_template('teams_map.html')