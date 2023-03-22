
## Folder Contents

### Database 1: Games

- This is the database used in the portal for the games data.

This folder locally contains a database and dataset sourced from [this kaggle dataset](https://www.kaggle.com/datasets/wyattowalsh/basketball) by Wyatt Walsh.

- This database is updated daily as of writing this (13/03/2023)

    * This file locally contains a directory called `data/csv` which contains CSV files imported from the above link and also an `nba.sqlite` file for the relational database
    
    * The directory and database is ignored in the `.gitignore` because of its size.
    
    * Instead, `data/Bel-db` contains a smaller subset of this database and includes their csvs after transformation in addition to a `data/Bel-db/NBA.sqlite` database.

### Database 2: Players

- This is the database used in the portal for the players data.

The dataset was sourced from [Vivo Vanco's kaggle dataset](https://www.kaggle.com/datasets/vivovinco/20222023-nba-player-stats-regular) on 2022-2023 NBA Player Stats. 

- This dataset was cleaned and transformed for storage in the `data/player_stats.sqlite` database.


### Database 3: Teams

- This is the database used in the portal for the teams data.
    
Data was sourced from the [SeatGeak API](https://platform.seatgeek.com/)

- API Returns geocoordinates of each team in the NBA, in addition to information about upcoming home games and the average price for those games.
    
    * API data is merged with team establishment data in team_info_common.csv (from first database) and written to merge_df.csv, which is where the team profile information is derived.
