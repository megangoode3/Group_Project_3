fetch('http://127.0.0.1:5000/api/flights')
  .then(response => response.json())
  .then(data => {
    console.log(data);

    // Pull out data from data
    const destinations = data.map((flight) => flight.departure);
    console.log(destinations);


  });
  
  // Example function to render a chart using Chart.js
  function renderChart(elementId, chartData) {
    const ctx = document.getElementById(elementId).getContext('2d');
    const chart = new Chart(ctx, {
      // Chart configuration goes here
    });
  }
  
  // Add event listener for dropdown and render charts based on the selected option
  document.getElementById('dropdown').addEventListener('change', (event) => {
    // Fetch data and render charts based on the selected option
    console.log(event.target.value)
  });

// Header Changer

function updateHeaderText(destination) {
  const header = document.getElementById("header-text");
  header.textContent = `Analysis of Flight Data Between JFK and ${destination}`;
}

document.getElementById("dropdown").addEventListener("change", (event) => {
  // Fetch data and render charts based on the selected option
  const destination = event.target.value;
  console.log(destination);
  updateHeaderText(destination);
});

// Initialize the header text with the default selected destination
updateHeaderText(document.getElementById("dropdown").value);





 // Test Bar Chart Data
  const data = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
      label: 'Weekly Sales',
      data: [18, 12, 6, 9, 12, 3, 9],
      backgroundColor:
        'rgba(255, 26, 104, 0.2)',
      borderColor:
        'rgba(255, 26, 104, 1)',
      borderWidth: 1
    }]
  };


  // config
  const config = {
    type: 'bar',
    data,
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  };
  // render init block
  const myChart = new Chart(
    document.getElementById('chart3'),
    config
  );
  




// Pie Chart Data
const piedata = {
  labels: ['Red', 'Blue', 'Yellow'],
  datasets: [{
    label: 'Color Distribution',
    data: [10, 20, 30],
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

// Pie Chart Configuration
const pieconfig = {
  type: 'pie',
  data: piedata
};

// Render Pie Chart
const myPieChart = new Chart(
  document.getElementById('chart1'),
  pieconfig
);








  