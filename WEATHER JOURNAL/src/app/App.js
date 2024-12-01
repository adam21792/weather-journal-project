// Personal API Key for OpenWeatherMap API
const apiKey = 'your_actual_api_key&units=imperial';

// Event listener for the 'Generate' button
const generateBtn = document.getElementById('generate');
generateBtn.addEventListener('click', performAction);

// Function to perform the action when the button is clicked
function performAction() {
  const zip = document.getElementById('zip').value;
  const feelings = document.getElementById('feelings').value;

  getWeather(apiKey, zip)
    .then((data) => {
      const weatherData = {
        date: new Date().toLocaleDateString(),
        temp: data.main.temp,
        feel: feelings
      };
      return postData('/add', weatherData);
    })
    .then(() => updateUI())
    .catch(error => {
      console.error("Error:", error);
      alert("An error occurred while fetching weather data.");
    });
}

// Function to GET weather data from the OpenWeatherMap API
const getWeather = async (apiKey, zip) => {
  const url = `http://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${apiKey}&units=imperial`;
  const res = await fetch(url);
  try {
    const data = await res.json();
    if (data.main) {
      return data; // Return data if the response is valid
    } else {
      throw new Error('Invalid data from OpenWeatherMap');
    }
  } catch (error) {
    throw new Error("Failed to fetch weather data: " + error.message);
  }
};

// Function to POST data to the server
const postData = async (url = '', data = {}) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  try {
    const newData = await response.json();
    return newData;
  } catch (error) {
    throw new Error("Failed to post data: " + error.message);
  }
};

// Function to GET project data and update the UI
const updateUI = async () => {
  const request = await fetch('/all');
  try {
    const allData = await request.json();
    document.getElementById('date').innerHTML = allData.date;
    document.getElementById('temp').innerHTML = Math.round(allData.temp) + '°F';
    document.getElementById('content').innerHTML = allData.feel;
  } catch (error) {
    console.log("Error:", error);
    alert("Failed to update the UI with project data.");
  }
};