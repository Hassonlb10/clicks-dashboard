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

    // Example delivery markers (replace with dynamic data if available)
    var deliveryMarkers = [
        { coords: [25.276987, 51.520008], driverId: 'Driver_ABC123', color: 'blue' },
        { coords: [25.280282, 51.517408], driverId: 'Driver_DEF456', color: 'red' },
        { coords: [25.270045, 51.515467], driverId: 'Driver_GHI789', color: 'blue' },
        { coords: [25.285432, 51.522345], driverId: 'Driver_JKL012', color: 'red' },
        { coords: [25.263421, 51.531234], driverId: 'Driver_MNO345', color: 'blue' },
        { coords: [25.279876, 51.513567], driverId: 'Driver_PQR678', color: 'blue' },
        { coords: [25.290123, 51.514789], driverId: 'Driver_STU901', color: 'blue' },
        { coords: [25.272345, 51.529012], driverId: 'Driver_VWX234', color: 'blue' },
        { coords: [25.281234, 51.526789], driverId: 'Driver_YZAB56', color: 'blue' },
        { coords: [25.277890, 51.510123], driverId: 'Driver_CDE789', color: 'blue' },
        { coords: [25.284567, 51.521345], driverId: 'Driver_FGH012', color: 'blue' },
        { coords: [25.271234, 51.517890], driverId: 'Driver_IJK345', color: 'blue' },
        { coords: [25.278901, 51.524567], driverId: 'Driver_MNO678', color: 'blue' },
        { coords: [25.275678, 51.515678], driverId: 'Driver_PQR901', color: 'blue' },
        { coords: [25.283456, 51.512345], driverId: 'Driver_STU234', color: 'blue' }
    ];

    deliveryMarkers.forEach(function(marker) {
        L.marker(marker.coords, { icon: createMarkerIcon(marker.color) }).addTo(map)
            .bindPopup('Active Delivery Vehicle<br>' + marker.driverId)
            .openPopup();
    });

    // Optionally, you can update the map size to ensure it displays correctly
    map.invalidateSize();
}

// Function to create a custom marker icon
function createMarkerIcon(color) {
    return L.icon({
        iconUrl: `https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-${color}.png`,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        tooltipAnchor: [16, -28],
        shadowSize: [41, 41]
    });
}

// Call initializeMap function when DOM content is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeMap();
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
                borderColor: '#4F46E5', // Digital blue color for the line
                backgroundColor: 'rgba(79, 70, 229, 0.2)', // Light shade color filling
                borderWidth: 3,
                pointBackgroundColor: '#4F46E5', // Digital blue points
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: '#4F46E5', // Digital blue on hover
                pointRadius: 6,
                pointHoverRadius: 8,
            }]
        },
        options: {
            scales: {
                y: {
                    display: false, // Hide y-axis completely
                },
                x: {
                    display: false, // Hide x-axis completely
                }
            },
            plugins: {
                legend: {
                    display: false, // Hide legend
                },
                tooltip: {
                    enabled: false, // Disable tooltips
                }
            },
            layout: {
                padding: {
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0 // Remove padding around the chart
                }
            },
            elements: {
                line: {
                    tension: 0.4 // Adjust line tension for a more digital look
                }
            },
            responsive: true, // Make the chart responsive
            maintainAspectRatio: false // Allow the chart to scale to parent container
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

