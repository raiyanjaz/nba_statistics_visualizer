var globalStats1 = []; // To store fetched stats data for player 1

var globalPlayerName1 = ''; // To store player 1's name

function fetchStats() {
    globalPlayerName1 = $('#playerName').val();
    $.ajax({
        url: '/get_stats/' + globalPlayerName1,
        type: 'GET',
        dataType: 'json',
        success: function(data) {
            console.log(data);
            globalStats1 = data; // Store the fetched data globally
            displayStats('PPG', globalPlayerName1); // Default display to PPG
        },
        error: function(error) {
            console.log('Error:', error);
        }
    });
}

function displayStats(statType, playerName1) {

    var labels1 = globalStats1.map((row, index) => index + 1);
    
    var data1 = [];
    
    for (let i = 0; i < labels1.length; i++) {
        data1.push(globalStats1[i]["PTS"]);
    }

    var ctx = document.getElementById('myChart').getContext('2d');
    if(window.myChart instanceof Chart) {
        window.myChart.destroy(); // Destroy the existing chart instance before creating a new one
    }
    window.myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels1,
            datasets: [{
                label: `${statType} ${playerName1}`,
                data: data1,
                borderColor: "red",
                borderWidth: 3,
                fill: false
            }]
        },
        options: {
            responsive: false,
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

// Event listeners for buttons
// $('#togglePPG').click(function() { displayStats('PPG', globalPlayerName1, globalPlayerName2); });
// $('#toggleAPG').click(function() { displayStats('APG', globalPlayerName1, globalPlayerName2); });
// $('#toggleRPG').click(function() { displayStats('RPG', globalPlayerName1, globalPlayerName2); });
// $('#toggleFG').click(function() { displayStats('FG%', globalPlayerName1, globalPlayerName2); });
// $('#toggle3PT').click(function() { displayStats('3PT%', globalPlayerName1, globalPlayerName2); });