async function fetchData() {
  const response = await fetch('/api/flights');
  const data = await response.json();
  return data;
}
  
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