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
        console.log(data);
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

    try {
        const newData = res;
        console.log(newData);
		return newData;
	} catch (error) {
		console.log('error', error);
	}
}

// async GET request to the server to get the most recent data and display it in the app
const updateUI = async () => {
    const request = await fetch('http://localhost:8000/', {
		method: 'GET',
		credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json',
		},
    });

    try{
        const allData = await request.json();
        // select elements in the HTML and update its content
        document.getElementById('date').innerHTML = allData[0].date;
        document.getElementById('temp').innerHTML = allData[0].temperature;
        document.getElementById('content').innerHTML = allData[0].userResponse;
    } catch(error) {
        console.log('error', error);
    }
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
        postData('http://localhost:8000/', {temperature:data.main.temp, date:newDate, userResponse:userResponse})
    })
    // after successful entering of the data to the server, get the latest data and update the DOM
    .then(
        updateUI()
    )
})
