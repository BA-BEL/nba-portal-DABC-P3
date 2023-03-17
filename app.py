#Imports dependencies
import numpy as np
import datetime as dt
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from flask import Flask, jsonify, render_template
import datetime as dt

#Player database setup
engine1 = create_engine("sqlite:///data/player_stats.sqlite")
Base = automap_base()
Base.prepare(autoload_with=engine1)

# #Teams database setup
# engine2 = create_engine("sqlite:///data/Bel-db/NBA.sqlite")
# Base2 = automap_base()
# Base2.prepare(autoload_with=engine2)

# **Sets up our tables**
player_stats = Base.classes.player_stats
games = Base2.classes.games

# Flask Setup
app = Flask(__name__)
app.config['JSON_SORT_KEYS'] = False

# Flask Routes
@app.route("/")
def home():
<<<<<<< HEAD
    return render_template('index.html')
=======
    return (
        f"Welcome to the NBA API!<br/>"
        f"Available Routes:<br/>"
        f"/api/v1.0/players<br/>"
        f"/api/v1.0/games<br/>"
    )
>>>>>>> 339dbbbe915c933c72982d367e4f81a6d0e60abe

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

@app.route("/api/v1.0/games", methods = ['GET','POST'])
def get_team_stats():
    
    session2 = Session(engine2)
    gamesquery = session2.query(games.game_id, games.game_date, games.arena, games.arena_lat, games.arena_lon, games.attendance,
                              games.team_id_home, games.team_id_away, games.team_name_home, games.team_abbreviation_home,
                              games.team_name_away, games.team_abbreviation_away, games.matchup_home, games.wl_home, games.wl_away,
                              games.fgm_home, games.fga_home, games.fg_pct_home, games.ftm_home, games.fta_home, games.ft_pct_home, games.pts_home,
                              games.fgm_away, games.fga_away, games.fg_pct_away, games.ftm_away, games.fta_away, games.ft_pct_away, games.pts_away).all()

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
        game_dict['fga_home']=game[16]
        game_dict['fg_pct_home']=game[17]
        game_dict['ftm_home']=game[18]
        game_dict['fta_home']=game[19]
        game_dict['ft_pct_home']=game[20]
        game_dict['pts_home']=game[21]
        game_dict['fgm_away']=game[22]
        game_dict['fga_away']=game[23]
        game_dict['fg_pct_away']=game[24]
        game_dict['ftm_away']=game[25]
        game_dict['fta_away']=game[26]
        game_dict['ft_pct_away']=game[27]
        game_dict['pts_away']=game[28]


        games_dict_list.append(game_dict)

    response = jsonify(games_dict_list)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response
    
    
if __name__ == "__main__":
    app.run(debug=True, port=8000)