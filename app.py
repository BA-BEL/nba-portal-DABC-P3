#Imports dependencies
import numpy as np
import datetime as dt
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from flask import Flask, jsonify, render_template

#Database setup
engine = create_engine("sqlite:///**our-db-here**")
Base = automap_base()
Base.prepare(autoload_with=engine)

# **Sets up our tables**
# players = Base.classes.players
# teams = Base.classes.teams

# Flask Setup
app = Flask(__name__)

# Flask Routes
@app.route("/")
def home():
    return render_template("index.html")

@app.route("/api/v1.0/players")
def player_stats():
    return 

@app.route("/api/v1.0/teams")
def team_stats():
    return


if __name__ == "__main__":
    app.run(debug=True)