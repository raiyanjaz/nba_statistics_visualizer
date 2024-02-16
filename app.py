from flask import Flask, render_template, jsonify
from scraper import stat_scraper

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/get_stats/<player_name>')
def get_stats(player_name):
    first_name, last_name = player_name.split()

    # Extract the first two letters of the first name and the first five letters of the last name
    formatted_name = last_name[:5] + first_name[:2] + '01'
    formatted_name = formatted_name.lower()
    player_stat = stat_scraper(formatted_name)
    
    return jsonify(player_stat.to_dict(orient='records'))

if __name__ == '__main__':
    app.run(debug=True)
