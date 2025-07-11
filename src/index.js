import './styles.css';

let input = document.getElementById('Loc');
let search = document.querySelector('.Search');
let location;
const key = 'BCE7ESE9SXLGLGPQH56C9L43V';

let MainForcast = document.querySelector('.MainForcast');
let Location = document.querySelector('.Location');
let Forcast = document.getElementsByClassName('Forcast');
let MainCelcius = document.querySelector('.MainCelcius');
let MainFahrenheit = document.querySelector('.MainFahrenheit');
let MainHumidity = document.querySelector('.MainHumidity');
let MainWind = document.querySelector('.MainWind');
let mainIcon = document.getElementById('mainIcon');

search.addEventListener('click', (event) => {
    event.preventDefault();
    location = input.value;
    console.log(location);
    getData();
});

async function getData() {
    try {
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${key}`);
        const data = await response.json();
        console.log(data);
        updateData(data);
    } catch (error) {
        alert(`City not found: ${error}`);
    }
}

 async function updateData(data) {
    // main
    MainForcast.textContent = data.days[0].conditions;
    Location.textContent = data.resolvedAddress;
    MainCelcius.innerHTML = `${((data.days[0].temp - 32) * 5 / 9).toFixed(1)} °C`;
    MainFahrenheit.innerHTML = `${data.days[0].temp} °F`;
    MainHumidity.innerHTML = `Humidity: ${data.days[0].humidity}`;
    MainWind.innerHTML = `Windspeed: ${data.days[0].windspeed}`;
    try {
        const icon = await import(`./assets/${data.days[0].icon}.svg`);
        mainIcon.src = icon.default;
    } catch (err) {
        console.warn(`Main icon not found: ${data.days[0].icon}`, err);
        mainIcon.src = './assets/default.svg';
    }

    // focasts
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    for (let i = 0; i < 4; i++) {
        Forcast[i].querySelector('.Day').textContent = days[new Date(data.days[i+1].datetime).getDay()];
        Forcast[i].querySelector('.Description').textContent = data.days[i+1].conditions;
        Forcast[i].querySelector('.Fahrenheit').innerHTML = `${data.days[i+1].temp} °F`;
        Forcast[i].querySelector('.Celcius').innerHTML = `${((data.days[i+1].temp - 32) * 5 / 9).toFixed(1)} °C`;
        
        let iconName = data.days[i+1].icon;
        try {
            const icon = await import(`./assets/${iconName}.svg`);
            Forcast[i].querySelector('img').src = icon.default;
        } catch (err) {
            console.warn(`Icon not found: ${iconName}`, err);
            Forcast[i].querySelector('img').src = './assets/default.svg';
        }

    }
}