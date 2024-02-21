var globalStats1 = []; // To store fetched stats data for player 1
var globalStats2 = []; // To store fetched stats data for player 2

function fetchStats() {
    var playerName1 = $('#playerName1').val();
    var playerName2 = $('#playerName2').val();

    $.ajax({
        url: '/get_stats1/' + playerName1,
        type: 'GET',
        dataType: 'json',
        success: function(data) {
            globalStats1 = data; // Store the fetched data globally
            displayStats('PPG', playerName1, playerName2); // Default display to PPG
        },
        error: function(error) {
            console.log('Error:', error);
        }
    });
    $.ajax({
        url: '/get_stats2/' + playerName2,
        type: 'GET',
        dataType: 'json',
        success: function(data) {
            globalStats2 = data; // Store the fetched data globally
            displayStats('PPG', playerName1, playerName2); // Default display to PPG
        },
        error: function(error) {
            console.log('Error:', error);
        }
    });
}

function displayStats(statType, playerName1, playerName2) {

    var labels1 = globalStats1.map((row, index) => index + 1);
    var data1 = globalStats1.map(row => parseFloat(row[statType]));

    var labels2 = globalStats2.map((row, index) => index + 1);
    var data2 = globalStats2.map(row => parseFloat(row[statType]));

    // Assuming you want to use the same labels for both, but adjust based on your data
    var labels = labels1.length > labels2.length ? labels1 : labels2; // Use the longer set of labels

    var ctx = document.getElementById('myChart').getContext('2d');
    if(window.myChart instanceof Chart) {
        window.myChart.destroy(); // Destroy the existing chart instance before creating a new one
    }
    window.myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: `${statType + playerName1}`,
                data: data1,
                borderColor: "red",
                borderWidth: 3,
                fill: false
            },{
                label: `${statType} ${playerName2}`,
                data: data2,
                borderColor: "blue",
                borderWidth: 3,
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

// Event listeners for buttons
$('#togglePPG').click(function() { displayStats('PPG'); });
$('#toggleAPG').click(function() { displayStats('APG'); });
$('#toggleRPG').click(function() { displayStats('RPG'); });
$('#toggleFG').click(function() { displayStats('FG%'); });
$('#toggle3PT').click(function() { displayStats('3PT%'); });