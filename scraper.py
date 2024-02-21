import requests

from bs4 import BeautifulSoup
import pandas as pd
import datetime

def stat_scraper(formatted_name):
    url = f"https://www.basketball-reference.com/players/{formatted_name[0]}/{formatted_name}.html"

    response = requests.get(url)

    soup = BeautifulSoup(response.content, 'html.parser')

    stats = []

    today = datetime.date.today()

    last_year = today.year

    for year in range(1950, last_year):
        id_selector = f'tr#per_game\\.{year}'
        for row in soup.select(f'tbody {id_selector}'):
            ppg = row.find('td', {'data-stat': 'pts_per_g'})
            apg = row.find('td', {'data-stat': 'ast_per_g'})
            rpg = row.find('td', {'data-stat': 'trb_per_g'})
            fg_pct = row.find('td', {'data-stat': 'fg_pct'}).text if row.find('td', {'data-stat': 'fg_pct'}) else '0'
            fg3_pct = row.find('td', {'data-stat': 'fg3_pct'}).text if row.find('td', {'data-stat': 'fg3_pct'}) else '0'
            
            fg_pct = float(fg_pct) if fg_pct != '0' else 0.0
            fg3_pct = float(fg3_pct) if fg3_pct != '0' else 0.0

            stats.append([year, ppg.text, apg.text, rpg.text, fg_pct, fg3_pct])


    

    player_stats = pd.DataFrame(stats, columns=['YEAR', 'PPG', 'APG', 'RPG', 'FG%', '3PT%'])
    
    return player_stats