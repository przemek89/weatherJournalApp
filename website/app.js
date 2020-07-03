/* Global Variables */
let zip_code;
const api_key = 'd00c322fdf629b33b42279052c8f1710';
let url = `https://api.openweathermap.org/data/2.5/weather?zip=${zip_code},CH&appid=${api_key}`;

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Async GET request to OWM API
const getData = async (url) => {
    const res = await fetch(url)
    try {
        const data = await res.json();
        return data;
    } catch(error) {
        console.log('error', error);
    }
}

// Async POST request to add a new data to the server
const postData = async (serverUrl = '', data = {}) => {
    const res = await fetch(serverUrl, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
}

// event listener for Generate button
// select the generate button element
const generateButton = document.querySelector('#generate');

// add event listener for generate button
generateButton.addEventListener('click', function getWeatherData() {
    zip_code = document.querySelector('#zip').value;
    url = `https://api.openweathermap.org/data/2.5/weather?zip=${zip_code},CH&appid=${api_key}`;
    getData(url)
    // after successful retrieval of data post the data to the server
    .then(function(data){
        let userResponse = document.getElementById('feelings').value;
        postData('/', {temperature: data.main.temp, date: newDate, userResponse: userResponse })
    })
    // after successful entering of the data to the server, get the latest data and update the DOM
})
