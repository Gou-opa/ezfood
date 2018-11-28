var ctx = document.getElementById('myChart').getContext('2d');
        var chart = new Chart(ctx, {
            // The type of chart we want to create
            type: 'line',

            // The data for our dataset
            data: {
                labels: ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "Chủ Nhật"],
                datasets: [{
                    label: 'Doanh thu',
                    backgroundColor: "#ef3447",
                    borderColor: '#ffc107',
                    data: [35, 10, 35, 42, 36, 66, 69],
                }]
            },

            // Configuration options go here
            options: {}
        });