// Toggle dropdown visibility
function toggleDropdown() {
    var dropdownContent = document.getElementById("dropdownContent");
    dropdownContent.style.display = dropdownContent.style.display === "block" ? "none" : "block";
}

// Logout function (example, replace with actual logout logic)
function logout() {
    // Add your logout logic here (e.g., redirect to logout endpoint)
    alert("Logged out successfully!");
}

// Function to handle search input
function handleSearch() {
    var searchInput = document.querySelector('.search-bar input').value.toLowerCase();
    var cards = document.querySelectorAll('.card');

    cards.forEach(function(card) {
        var cardTitle = card.querySelector('h3').innerText.toLowerCase();
        if (cardTitle.includes(searchInput)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Event listener for search button click
document.querySelector('.search-bar button').addEventListener('click', handleSearch);

// Event listener for pressing enter in the search input field
document.querySelector('.search-bar input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        handleSearch();
    }
});

// Function to update dynamic data (simulated)
function updateDashboardData() {
    // Update Active Deliveries Pie Chart
    var activeDeliveriesPieChart = document.getElementById('activeDeliveriesPieChart').getContext('2d');
    var activeDeliveriesData = {
        labels: ['In Transit', 'Assigned', 'Completed'],
        datasets: [{
            label: 'Active Deliveries',
            data: [25, 10, 15], // Example data (replace with actual dynamic data)
            backgroundColor: [
                'rgba(255, 99, 132, 0.5)',
                'rgba(54, 162, 235, 0.5)',
                'rgba(255, 206, 86, 0.5)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)'
            ],
            borderWidth: 1
        }]
    };
    var activeDeliveriesPieChartInstance = new Chart(activeDeliveriesPieChart, {
        type: 'pie',
        data: activeDeliveriesData,
        options: {
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.label + ': ' + context.raw.toFixed(2) + '%';
                        }
                    }
                }
            }
        }
    });

    // Update Past Deliveries Bar Chart
    var pastDeliveriesBarChart = document.getElementById('pastDeliveriesBarChart').getContext('2d');
    var pastDeliveriesData = {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        datasets: [{
            label: 'Past Deliveries',
            data: [150, 180, 200, 190], // Example data (replace with actual dynamic data)
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
        }]
    };
    var pastDeliveriesBarChartInstance = new Chart(pastDeliveriesBarChart, {
        type: 'bar',
        data: pastDeliveriesData,
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Update Pending Deliveries
    var pendingDeliveriesList = document.getElementById('pendingDeliveriesList');
    pendingDeliveriesList.innerHTML = '<li>Delivery 4</li><li>Delivery 5</li>';

    // Update SBAG Inventory
    var sbagInventoryList = document.getElementById('sbagInventoryList');
    sbagInventoryList.innerHTML = '<li>SBAG 1</li><li>SBAG 2</li><li>SBAG 3</li>';

    // Update Driver Roster
    var driverRosterList = document.getElementById('driverRosterList');
    driverRosterList.innerHTML = '<li>Driver 1</li><li>Driver 2</li><li>Driver 3</li>';

    // Simulate system status updates
    var systemStatusCard = document.querySelector('.card.large:nth-child(8) p');
    systemStatusCard.innerText = 'System is operational.';

    // Simulate alerts
    var alertsContainer = document.getElementById('alertsContainer');
    alertsContainer.innerHTML = ''; // Clear previous alerts

    var alerts = [
        { type: 'danger', message: 'SBAG threshold exceeded!' },
        { type: 'warning', message: 'Internet connectivity unstable.' },
        { type: 'success', message: 'All deliveries completed successfully.' }
    ];

    // Update alert icon and count
    var alertIconContainer = document.getElementById('alertIconContainer');
    alertIconContainer.innerHTML = '<i class="fas fa-bell"></i><span id="alertCount">' + alerts.length + '</span>';

    alerts.forEach(function(alert) {
        var alertElement = document.createElement('div');
        alertElement.classList.add('alert', alert.type);
        alertElement.innerHTML = '<h4>' + alert.type.toUpperCase() + '</h4><p>' + alert.message + '</p>';
        alertsContainer.appendChild(alertElement);
    });

    // Simulate data update every 10 seconds
    setTimeout(updateDashboardData, 10000);
}

// Function to initialize the map and add markers
// Function to initialize the map and add markers
function initializeMap() {
    var map = L.map('map').setView([25.276987, 51.520008], 12);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 18
    }).addTo(map);

    // Example delivery markers (replace with dynamic data)
    var deliveryMarkers = [
        { coords: [25.276987, 51.520008], driverId: 'Driver 1' },
        { coords: [25.280282, 51.517408], driverId: 'Driver 2' },
        { coords: [25.270045, 51.515467], driverId: 'Driver 3' }
    ];

    deliveryMarkers.forEach(function(marker) {
        L.marker(marker.coords).addTo(map)
            .bindPopup('Active Delivery Vehicle<br>' + marker.driverId)
            .openPopup();
    });

}
document.addEventListener("DOMContentLoaded", function() {
    function updateStatusMeter(value) {
        const meter = document.getElementById("status-meter");
        const percentage = value / 100;
        const circumference = 2 * Math.PI * 40;
        const offset = circumference * percentage;
        meter.style.strokeDasharray = `${offset}, ${circumference}`;
        
        const statusValue = document.querySelector(".system-status-value");
        statusValue.textContent = `${value}%`;
    }

    // Example usage:
    updateStatusMeter(75); // Change this value to update the meter
});

// Function to initialize the advanced line chart with default data (weeks)
function initAdvancedLineChart() {
    var ctx = document.getElementById('deliveryLineChart').getContext('2d');
    var deliveryLineChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
                label: 'Deliveries',
                data: [12, 19, 3, 5, 2, 3, 9],
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 2,
                pointBackgroundColor: 'rgba(54, 162, 235, 1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(54, 162, 235, 1)',
                pointRadius: 5,
                pointHoverRadius: 7,
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return value.toFixed(0); // format y-axis labels
                        }
                    }
                },
                x: {
                    grid: {
                        display: false // remove x-axis grid lines
                    }
                }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(tooltipItem) {
                            return tooltipItem.raw.toFixed(0); // format tooltip labels
                        }
                    }
                }
            }
        }
    });

    return deliveryLineChart;
}

// Function to change graph data based on selection (weeks or months)
function changeGraph(selection) {
    var chart = initAdvancedLineChart();
    var newData, newLabels;

    if (selection === 'weeks') {
        newLabels = ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'];
        newData = [30, 45, 25, 35, 50];
    } else if (selection === 'months') {
        newLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        newData = [200, 210, 190, 180, 220, 230, 250, 260, 240, 230, 220, 210];
    }

    chart.data.labels = newLabels;
    chart.data.datasets[0].data = newData;
    chart.update();
}

// Initialize the advanced line chart on page load
document.addEventListener('DOMContentLoaded', function() {
    initAdvancedLineChart();
});

// Initial call to populate dashboard data and initialize map
updateDashboardData();

// Call initializeMap function when DOM content is loaded
document.addEventListener("DOMContentLoaded", function() {
    initializeMap();
});

