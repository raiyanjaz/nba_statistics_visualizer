var globalStats = []; // To store fetched stats data

function fetchStats() {
    var playerName = $('#playerName1').val();

    $.ajax({
        url: '/get_stats/' + playerName,
        type: 'GET',
        dataType: 'json',
        success: function(data) {
            globalStats = data; // Store the fetched data globally
            displayStats('PPG'); // Default display to PPG
        },
        error: function(error) {
            console.log('Error:', error);
        }
    });
}

function displayStats(statType) {
    var labels = globalStats.map((row, index) => index + 1);
    var data = globalStats.map(row => parseFloat(row[statType]));

    var ctx = document.getElementById('myChart').getContext('2d');
    if(window.myChart instanceof Chart) {
        window.myChart.destroy(); // Destroy the existing chart instance before creating a new one
    }
    window.myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: statType,
                data: data,
                borderColor: getBorderColor(statType),
                borderWidth: 1,
                fill: false
            }]
        },
        options: {
            scales: {
                x: {
                    type: 'linear', // Use 'linear' to ensure numbers are treated as continuous values
                    ticks: {
                        stepSize: 1, // Ensure ticks are shown at every integer value
                        autoSkip: false, // Show every tick
                    },
                    title: {
                        display: true,
                        text: 'Year', // Title for the x-axis
                    }
                }
            }
        }
    });
}

function getBorderColor(statType) {
    switch(statType) {
        case 'PPG': return 'rgba(75, 192, 192, 1)';
        case 'APG': return 'rgba(255, 99, 132, 1)';
        case 'RPG': return 'rgba(54, 162, 235, 1)';
        default: return 'rgba(0, 0, 0, 1)';
    }
}

// Event listeners for buttons
$('#ppgButton').click(function() { displayStats('PPG'); });
$('#apgButton').click(function() { displayStats('APG'); });
$('#rpgButton').click(function() { displayStats('RPG'); });

