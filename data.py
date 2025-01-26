from nba_api.stats.endpoints import playercareerstats, commonplayerinfo
from nba_api.stats.static import players
import pandas as pd
import datetime

def get_player_id(player_name):
    player = players.find_players_by_full_name(player_name)
    return player[0]['id']

def stat_scraper(player_id):
    career_stats = playercareerstats.PlayerCareerStats(player_id, per_mode36="PerGame")
    return career_stats.get_data_frames()[0]

player_id = get_player_id("Lebron James")
print(stat_scraper(player_id))