from nba_api.stats.endpoints import playercareerstats, commonplayerinfo
from nba_api.stats.static import players
import pandas as pd
import datetime

def get_player_id(player_name):
    player = players.find_players_by_full_name(player_name)
    return player[0]['id']

def get_player_stats(player_id):
    career_stats = playercareerstats.PlayerCareerStats(player_id, per_mode36="PerGame")
    career_stats = career_stats.get_normalized_dict()
    return career_stats["SeasonTotalsRegularSeason"]