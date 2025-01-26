from flask import Flask, render_template, jsonify, request
from scraper import stat_scraper
from data import get_player_id, get_player_stats
import os

app = Flask(__name__)
app.secret_key = os.urandom(24) # Required for session storage

# Temporary storage for player stats
session_data = {}

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/radar_chart')
def radar_chart():
    return render_template('radar_chart.html')

@app.route('/get_stats/<player_name>')
def get_stats(player_name):
    print(player_name)
    player_id = get_player_id(player_name)
    player_stats = get_player_stats(player_id)
    return jsonify(player_stats)

if __name__ == '__main__':
    app.run(debug=True)
