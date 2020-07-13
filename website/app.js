/* Global Variables */
const baseURL = 'https://api.openweathermap.org/data/2.5/weather';
const apiKey	= 'c483574ba8e976a42cb7fdd2a19f4a3f';

// Create a new date instance dynamically with JS
let d = new Date();
// increment month by 1 to get the current month
let newDate = (d.getMonth() + 1) + '.' + d.getDate()+'.'+ d.getFullYear();


document.getElementById('generate').addEventListener('click', (e) => {
	const zipCode   = document.getElementById('zip').value;
	const userFeels = document.getElementById('feelings').value;
	
	// Use getWeatherInfo() Async Function to return the data from OpenWeatherMap API
	getWeatherInfo(baseURL, zipCode, apiKey)
	
	// use .then() so I can use postData() Async function to send the data i got to the server(project's end point)
	.then((data) => {
		// get the temperature from OpenWeatherMap API's returned data and store it in a variable 'temp'
		const mainData = data.main;
		const temp     = `${mainData.temp}°C`; 
		
		postData('/api/weather', {temp: temp, date: newDate, feels: userFeels})
		
		// Display data on website
		updateUI();
	})
	
});

// Async function to fetch Weather Web API
const getWeatherInfo = async (baseURL, zipCode, key) => {
	
	const response = await fetch(`${baseURL}?zip=${zipCode},us&units=metric&appid=${key}`)
	
	try {
		const data = await response.json();
		// console.log(data);
		return data;
	}catch(error) {
	console.log('error', error);
	}
}

// Async Function to fetch POST route
const postData = async (url = '', data = {}) => {
	// console.log(data);
	const response = await fetch(url, {
		method: 'POST',
		credentials: 'same-origin',
		headers: {
			'content-type': 'application/json'
		},
		body: JSON.stringify(data),
	});
	
	try {
		const newData = await response.json();
		// console.log(newData);
		return newData;
	}catch(error) {
		console.log('error', error);
	}
}

const updateUI = async () => {
	const request = await fetch('/api/weather')
	
	try {
		const allData =  await request.json();		
		// console.log(allData);
		
		document.getElementById('temp').innerHTML    = allData.temp;
		document.getElementById('date').innerHTML    = allData.date;
		document.getElementById('content').innerHTML = allData.feels;
	}catch(error) {
		console.log('error', error);
	}
}