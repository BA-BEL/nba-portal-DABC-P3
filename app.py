#Imports dependencies
import numpy as np
import datetime as dt
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from flask import Flask, jsonify, render_template

#Database setup
engine = create_engine("sqlite:///data/player_stats.sqlite")
Base = automap_base()
Base.prepare(autoload_with=engine)

# **Sets up our tables**
player_stats = Base.classes.player_stats


# Flask Setup
app = Flask(__name__)

# Flask Routes
@app.route("/")
def home():
    return (
        f"Welcome to the NBA API!<br/>"
        f"Available Routes:<br/>"
        f"/api/v1.0/players<br/>"
    )

@app.route("/api/v1.0/players", methods = ['GET','POST'])
def get_player_stats():
    
    session = Session(engine)
    playerquery = session.query(player_stats.Player,player_stats.Age,player_stats.Team,player_stats.Position).all()
    players_dict_list = []
    for player in playerquery:
        player_dict = {}
        player_dict['Name']=player[0]
        player_dict['Age']=player[1]
        player_dict['Team']=player[2]
        player_dict['Position']=player[3]
        players_dict_list.append(player_dict)

    response = jsonify(players_dict_list)

    response.headers.add('Access-Control-Allow-Origin', '*')

    return response
    
    



if __name__ == "__main__":
    app.run(debug=True, port = 8000)