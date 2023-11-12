import requests

from bs4 import BeautifulSoup
import pandas as pd

def stat_scraper(first_name, formatted_name):
    url = f"https://www.basketball-reference.com/players/{formatted_name[0]}/{formatted_name}.html"

    response = requests.get(url)

    soup = BeautifulSoup(response.content, 'html.parser')

    stats = []

    for year in range(2004, 2025):
        id_selector = f'tr#per_game\\.{year}'
        for row in soup.select(f'tbody {id_selector}'):
            ppg = row.find('td', {'data-stat': 'pts_per_g'})
            apg = row.find('td', {'data-stat': 'ast_per_g'})
            rpg = row.find('td', {'data-stat': 'trb_per_g'})
            stats.append([year, ppg.text, apg.text, rpg.text])

    player_stats = pd.DataFrame(stats, columns=['Year', 'PPG', 'APG', 'RPG'])
    player_stats.set_index('Year', inplace=True)

    print(first_name)
    print(player_stats)

def main():
    player_name = input('Enter the name of the player: ').lower()
    first_name, last_name = player_name.split()

    # Extract the first two letters of the first name and the first five letters of the last name
    formatted_name = last_name[:5] + first_name[:2] + '01'

    stat_scraper(first_name, formatted_name)

main()