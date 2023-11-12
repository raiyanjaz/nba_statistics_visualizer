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
    var table = '<table border="1">';
    table += '<tr><th>Year</th><th>PPG</th><th>APG</th><th>RPG</th></tr>';

    stats.forEach(function(row) {
        table += `<tr><td>${row.Year}</td><td>${row.PPG}</td><td>${row.APG}</td><td>${row.RPG}</td></tr>`;
    });

    table += '</table>';

    $('#statsTable').html(table);
}
