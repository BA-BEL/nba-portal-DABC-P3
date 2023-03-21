#Imports dependencies
import numpy as np
import datetime as dt
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from flask import Flask, url_for, jsonify, render_template, request, abort, make_response,redirect
import datetime as dt
import requests

#Player database setup
engine1 = create_engine("sqlite:///data/player_stats.sqlite")
Base = automap_base()
# Base.prepare(autoload_with=engine1)
Base.prepare(engine1, reflect=True)

# #Games database setup
engine2 = create_engine("sqlite:///data/Bel-db/NBA.sqlite")
Base2 = automap_base()
# Base2.prepare(autoload_with=engine2)
Base2.prepare(engine2, reflect=True)

#teams database setup
engine3 = create_engine("sqlite:///data/teams.sqlite")
Base3 = automap_base()
# Base3.prepare(autoload_with=engine3)
Base3.prepare(engine3, reflect=True)

# **Stores our tables into variable for querying below**
player_stats = Base.classes.player_stats
games = Base2.classes.games
Teams = Base3.classes.teams

# Flask Setup
app = Flask(__name__, static_folder='static')
app.config['JSON_SORT_KEYS'] = False

# A. FLASK HOMEROUTE
@app.route("/",methods=['GET','POST'])
def home():
    return render_template('index.html')

# B. API ENDPOINT FOR ALL PLAYER STATS FOR DROPDOWN PAGE
@app.route("/api/v1.0/players", methods = ['GET','POST'])
def get_player_stats():
    
    session = Session(engine1)
    playerquery = session.query(player_stats.Player,player_stats.Age,player_stats.Team,
    player_stats.Position,player_stats.Games_played,player_stats.Minutes_played_per_game,player_stats.Points_per_game,
    player_stats.two_point_field_goal_percentage,player_stats.three_point_field_goal_percentage,
    player_stats.Effective_field_goal_percentage,player_stats.Free_throw_percentage,
    player_stats.Total_rebounds_per_game,player_stats.Assists_per_game,player_stats.Steals_per_game,
    player_stats.Blocks_per_game,player_stats.Turnovers_per_game,player_stats.Personal_fouls_per_game).all()
    players_dict_list = []

    for player in playerquery:
        player_dict = {}
        player_dict['Name']=player[0]
        player_dict['Age']=player[1]
        player_dict['Team']=player[2]
        player_dict['Position']=player[3]
        player_dict['Played']=player[4]
        player_dict['Minutes']=player[5]
        player_dict['Points_pg']=player[6]
        player_dict['2p%']=round(player[7],3)
        player_dict['3p%']=round(player[8],3)
        player_dict['Effective%']=round(player[9],3)
        player_dict['Free%']=round(player[10],3)
        player_dict['Rebounds']=player[11]
        player_dict['Assists']=player[12]
        player_dict['Steals']=player[13]
        player_dict['Blocks']=player[14]
        player_dict['Turnovers']=player[15]
        player_dict['Fouls']=player[16]
        players_dict_list.append(player_dict)

    response = jsonify(players_dict_list)
    response.headers.add('Access-Control-Allow-Origin', '*')
    
    return response

# C. API ENDPOINT FOR HOMEPAGE USER-INPUTTED PLAYER INFORMATION
team_dict = {
    'Atlanta Hawks': 'ATL','Boston Celtics': 'BOS','Brooklyn Nets': 'BKN','Charlotte Hornets': 'CHA','Chicago Bulls': 'CHI',
    'Cleveland Cavaliers': 'CLE','Dallas Mavericks': 'DAL','Denver Nuggets': 'DEN','Detroit Pistons': 'DET',
    'Golden State Warriors': 'GSW','Houston Rockets': 'HOU','Indiana Pacers': 'IND','Los Angeles Clippers': 'LAC','Los Angeles Lakers': 'LAL',
    'Memphis Grizzlies': 'MEM','Miami Heat': 'MIA','Milwaukee Bucks': 'MIL','Minnesota Timberwolves': 'MIN','New Orleans Pelicans': 'NOP',
    'New York Knicks': 'NYK','Oklahoma City Thunder': 'OKC','Orlando Magic': 'ORL','Philadelphia 76ers': 'PHI','Phoenix Suns': 'PHX',
    'Portland Trail Blazers': 'POR','Sacramento Kings': 'SAC','San Antonio Spurs': 'SAS','Toronto Raptors': 'TOR','Utah Jazz': 'UTA',
    'Washington Wizards': 'WAS'
}
@app.route("/api/v1.0/players/team/<team_code>",methods=['GET'])
def get_players_by_team(team_code):
    session = Session(engine1)
    teamplayerquery = session.query(player_stats.Player, 
    player_stats.Position, 
    player_stats.Age).filter(player_stats.Team == team_code).all()
    
    if not teamplayerquery:
        abort(404)
    
    teamplayers = []
    for player in teamplayerquery:
        teamplayer={}
        teamplayer['Name']=player[0]
        teamplayer['Position']=player[1]
        teamplayer['Age']=player[2]
        teamplayers.append(teamplayer)
    response = make_response(jsonify({f"{team_code}'s Roster":teamplayers}))
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.set_data(response.get_data(as_text=True).replace('},', '},\n'))
    return response

@app.route('/search',methods=['POST'])
def search_players_by_team():
    team_name = request.form['team_name']
    team_code = team_dict.get(team_name)
    if not team_code:
        abort(404)
    players = get_players_by_team(team_code)
    if not players:
        abort(404)
    else:
        return players


# D. API ENDPOINT FOR BEL'S GAME DATA ANALYSIS:
@app.route("/api/v1.0/games", methods = ['GET','POST'])
def get_team_stats():
    
    session2 = Session(engine2)
    gamesquery = session2.query(games.game_id, games.game_date, games.arena, games.arena_lat, games.arena_lon, games.attendance,
                              games.team_id_home, games.team_id_away, games.team_name_home, games.team_abbreviation_home,
                              games.team_name_away, games.team_abbreviation_away, games.matchup_home, games.wl_home, games.wl_away,
                              games.fgm_home, games.fg2m_home, games.fg3m_home, games.fga_home, games.fg_pct_home, games.ftm_home, games.fta_home, games.ft_pct_home,games.ast_home,games.stl_home, games.blk_home, games.tov_home,games.pts_home,
                              games.fgm_away, games.fg2m_away, games.fg3m_away, games.fga_away, games.fg_pct_away, games.ftm_away, games.fta_away, games.ft_pct_away, games.ast_away,games.stl_away,games.blk_away,games.tov_away, games.pts_away).all()

    games_dict_list = []

    for game in gamesquery:
        game_dict = {}
        game_dict['game_id']=game[0]
        game_dict['game_date']=dt.datetime.strftime(game[1].date(), "%Y-%m-%d")
        game_dict['arena']=game[2]
        game_dict['arena_lat']=game[3]
        game_dict['arena_lon']=game[4]
        game_dict['attendance']=game[5]
        game_dict['team_id_home']=game[6]
        game_dict['team_id_away']=game[7]
        game_dict['team_name_home']=game[8]
        game_dict['team_abbreviation_home']=game[9]
        game_dict['team_name_away']=game[10]
        game_dict['team_abbreviation_away']=game[11]
        game_dict['matchup_home']=game[12]
        game_dict['wl_home']=game[13]
        game_dict['wl_away']=game[14]
        game_dict['fgm_home']=game[15]
        game_dict['fg2m_home']=game[16]
        game_dict['fg3m_home']=game[17]
        game_dict['fga_home']=game[18]
        game_dict['fg_pct_home']=game[19]
        game_dict['ftm_home']=game[20]
        game_dict['fta_home']=game[21]
        game_dict['ft_pct_home']=game[22]
        game_dict['ast_home']=game[23]
        game_dict['stl_home']=game[24]
        game_dict['blk_home']=game[25]
        game_dict['tov_home']=game[26]
        game_dict['pts_home']=game[27]
        game_dict['fgm_away']=game[28]
        game_dict['fg2m_away']=game[29]
        game_dict['fg3m_away']=game[30]
        game_dict['fga_away']=game[31]
        game_dict['fg_pct_away']=game[32]
        game_dict['ftm_away']=game[33]
        game_dict['fta_away']=game[34]
        game_dict['ft_pct_away']=game[35]
        game_dict['ast_away']=game[36]
        game_dict['stl_away']=game[37]
        game_dict['blk_away']=game[38]
        game_dict['tov_away']=game[39]
        game_dict['pts_away']=game[40]


        games_dict_list.append(game_dict)

    response = jsonify(games_dict_list)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response
    
@app.route('/api/v1.0/teams')
def get_teams():
    session = Session(engine3)
    teaminfoquery = session.query(Teams.team_name,Teams.established,Teams.team_conference, 
    Teams.team_division,Teams.conf_rank,Teams.lat, Teams.lon, Teams.next_homegame, 
    Teams.avg_price_next_homegame).all()

    teaminfo = []
    for team in teaminfoquery:
        teaminfo_dict = {}
        teaminfo_dict["Franchise"] = team[0]
        teaminfo_dict["Established"] = team[1]
        teaminfo_dict["Conference"] = team[2]
        teaminfo_dict["Division"] = team[3]
        teaminfo_dict["Current_Conference_Rank"] = team[4]
        teaminfo_dict["Latitude"] = team[5]
        teaminfo_dict["Longitude"] = team[6]
        teaminfo_dict["Next_Homegame"] = team[7]
        teaminfo_dict["Current_Average_Price"] = team[8]

        teaminfo.append(teaminfo_dict)
    
    response = jsonify(teaminfo)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response
@app.route('/api/v1.0/teamsmap')
def showMap():
    return render_template('teams_map.html')

if __name__ == "__main__":
    app.run(debug=True, port=8000)