
## Folder Contents

#### Database 1: Games
This folder contains a database and dataset imported from [this kaggle dataset](https://www.kaggle.com/datasets/wyattowalsh/basketball) by Wyatt Walsh.

- This database is updated daily as of writing this (13/03/2023)

    * This file locally contains a directory called `data/csv` which contains CSV files imported from the above link and also an `nba.sqlite` file for the relational database
    
    * The directory and database is ignored in the `.gitignore` because of its size
    
    * Instead, `data/Bel-db` contains a smaller subset of this database and includes the csvs in addition to a `data/Bel-db/NBA.sqlite` file; this is the database used in the portal for the games data.

#### Database 2: Players



#### Database 3: Teams
    
Data was sourced from the [SeatGeak API](https://platform.seatgeek.com/)

- API Returns geocoordinates of each team in the NBA, in addition to information about upcoming home games and the average price for those games.
    
    * API data is merged with team establishment data in team_info_common.csv (from first database) and written to merge_df.csv, which is where the team profile information is derived.
