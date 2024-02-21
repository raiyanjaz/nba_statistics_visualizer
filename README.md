# NBA Statistics Visualizer

## Overview

The NBA Statistics Visualizer is an interactive web application designed to bring basketball statistics to life. Utilizing Flask, JavaScript, and modern data processing technologies, this application allows users to explore and compare the performance of basketball players through dynamic visualizations.

## Features

- **Dynamic Charts**: Interactive charts to visualize players' career statistics, including points per game (PPG), assists per game (APG), and rebounds per game (RPG).
- **Player Comparison**: Compare the performance of multiple players across different seasons.
- **Data Rich**: Powered by BeautifulSoup for web scraping, ensuring a comprehensive dataset.
- **Real-Time Updates**: AJAX-based data fetching for up-to-the-minute statistics.

## Technologies Used

- **Backend**: Flask (Python)
- **Frontend**: HTML, CSS, JavaScript (AJAX, Chart.js)
- **Data Processing**: BeautifulSoup, Pandas (Python)

## Getting Started

### Prerequisites

- Python 3.x
- Pip

### Installation

1. Clone the repository:

   ````sh
   git clone https://github.com/yourusername/basketball-statistics-visualizer.git```

   ````

2. Install the required packages:
   `pip install -r requirements.txt`

3. Run the Flask application
   `flask run`

4. Access the web application at `http://127.0.0.1:5000/`.

## Usage

Navigate through the application to view and compare player statistics. Use the interactive charts to visualize players' performance over their careers.

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Acknowledgements

- [Chart.js](https://www.chartjs.org/)
- [Flask](https://flask.palletsprojects.com/)
- [BeautifulSoup](https://www.crummy.com/software/BeautifulSoup/bs4/doc/)
