//creat the new date by js
let dat = new Date();
let newDate = dat.getMonth() + '.' + dat.getDate() + '.' + dat.getFullYear();

// Personal API Key for OpenWeatherMap API
const keyWord = '1a09117c381d7902dc386c387ce1ec07';
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';



//add Event listener 
const element=document.getElementById('generate');
element.addEventListener('click', result);

//calling the function to work in add event listener
function result() {
  const zip= document.getElementById('zip').value;
  const userResponse = document.getElementById('feelings').value;

  getWeatherData(baseURL, zip, keyWord)
    .then(function(data) {
      let date = new Date(data.dt * 1000)
      let date_str = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
      postData('/add', { temperature: data.main.temp, date: date_str, userResponse: userResponse });
      updateUI('/all');
    })
};


const WeatherData = async (baseURL, zip, keyWord) => {
  const response= await fetch(baseURL + zipCode + '&appid=' + ID + '&units=imperial');
  try {
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("warning!" +error);
  };
};

// Function to POST data 
const postData = async (url = '', data = {}) => {
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(data),
  });

  try {
    const newData = await response.json();
    return newData;
  } catch (error) {
    console.log('warning!'+ error);
  };
};

// GET Project Data
const updateUI = async (url = '') => {
  const request = await fetch(url);
  try {
    const allData = await request.json();
    document.getElementById('date').innerHTML = allData[0].date;
        document.getElementById('content').innerHTML = allData[0].userResponse;

    document.getElementById('temp').innerHTML = allData[0].temperature;
  } catch (error) {
    console.log('warning!'+ error);
  };
};
