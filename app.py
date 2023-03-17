#Imports dependencies
import numpy as np
import datetime as dt
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from flask import Flask, jsonify, render_template

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

# Flask Setup
app = Flask(__name__)
app.config['JSON_SORT_KEYS'] = False

# Flask Routes
@app.route("/")
def home():
    return render_template('index.html')

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
    
    
if __name__ == "__main__":
    app.run(debug=True, port=8000)