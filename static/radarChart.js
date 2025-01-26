// Assuming global variables to store player names and stats
var globalPlayerName1 = '';
var globalStats1 = [];

function fetchNewStats() {
    globalPlayerName1 = $('#playerName1').val();

    // Wait for both AJAX calls to complete
    $.when(
        $.ajax({
            url: '/get_stats1/' + playerName1,
            type: 'GET',
            dataType: 'json'
        }),
        $.ajax({
            url: '/get_stats2/' + playerName2,
            type: 'GET',
            dataType: 'json'
        })
    ).then(function(response1, response2) {
        // Update global stats with the response data
        globalStats1 = response1[0]; // Assuming the data is the first item in the response array
        globalStats2 = response2[0]; // Adjust if your data structure is different
        globalStats1[0]['FG%'] = globalStats1[0]['FG%'] * 100
        globalStats1[0]['3PT%'] = globalStats1[0]['3PT%'] * 100
        globalStats2[0]['FG%'] = globalStats2[0]['FG%'] * 100
        globalStats2[0]['3PT%'] = globalStats2[0]['3PT%'] * 100
        createRadarChart(); // Now it's safe to create the radar chart
    }, function(err) {
        console.log('Error fetching stats:', err);
    });
}


function createRadarChart() {
    // Assuming data structure for radar chart
    // Example data for radar chart
    var data = {
        labels: ['PPG', 'APG', 'RPG', 'FG%', '3PT%'], // Example stat categories
        datasets: [
            {
                label: globalPlayerName1,
                data: [globalStats1[0].PPG, globalStats1[0].APG, globalStats1[0].RPG, globalStats1[0]['FG%'], globalStats1[0]['3PT%']], // Map your stats accordingly
                backgroundColor: "rgba(255,99,132,0.2)",
                borderColor: "rgba(255,99,132,1)",
                pointBackgroundColor: "rgba(255,99,132,1)",
            },
            {
                label: globalPlayerName2,
                data: [globalStats2[0].PPG, globalStats2[0].APG, globalStats2[0].RPG, globalStats2[0]['FG%'], globalStats2[0]['3PT%']], // Map your stats accordingly
                backgroundColor: "rgba(54,162,235,0.2)",
                borderColor: "rgba(54,162,235,1)",
                pointBackgroundColor: "rgba(54,162,235,1)",
            }
        ]
    };

    var ctx = document.getElementById("radarChart").getContext("2d");
    window.radarChart = new Chart(ctx, {
        type: 'radar',
        data: data,
        options: {
            responsive: false,
            scale: {
                angleLines: {
                    display: true
                },
                ticks: {
                    beginAtZero: true
                }
            }
        }
    });
}