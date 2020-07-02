/* Global Variables */
let zip_code;
const api_key = 'd00c322fdf629b33b42279052c8f1710';
let url = `api.openweathermap.org/data/2.5/weather?zip=${zip_code},CH&appid=${api_key}`;

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Async GET request to OWM API
const getData = async (url) => {
    zip_code = document.querySelector('#zip').value;
    console.log(zip_code);
    url = `api.openweathermap.org/data/2.5/weather?zip=${zip_code},CH&appid=${api_key}`;
    console.log(url);
    const res = await fetch(url)
    try {
        const data = await res.json();
        console.log(data);
        return data;
    } catch(error) {
        console.log('error', error);
    }
}

// event listener for Generate button
// select the zip_code text input element and generate button element
const generateButton = document.querySelector('#generate');
// add event listener for generate button
generateButton.addEventListener('click', function getWeatherData() {
    getData(url);
})