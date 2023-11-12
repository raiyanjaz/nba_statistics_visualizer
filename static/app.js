function fetchStats() {
    var playerName = $('#playerName').val();

    $.ajax({
        url: '/get_stats/' + playerName,
        type: 'GET',
        dataType: 'json',
        success: function(data) {
            displayStats(data);
        },
        error: function(error) {
            console.log('Error:', error);
        }
    });
}

function displayStats(stats) {
    var labels = stats.map(row => row.Year);
    var ppgData = stats.map(row => parseFloat(row.PPG));
    var apgData = stats.map(row => parseFloat(row.APG));
    var rpgData = stats.map(row => parseFloat(row.RPG));

    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'PPG',
                    data: ppgData,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                    fill: false
                },
                {
                    label: 'APG',
                    data: apgData,
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1,
                    fill: false
                },
                {
                    label: 'RPG',
                    data: rpgData,
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1,
                    fill: false
                }
            ]
        },
        options: {
            scales: {
                x: {
                    type: 'linear',
                    position: 'bottom'
                }
            }
        }
    });
}
