import './styles.css';

let input = document.getElementById('Loc');
let search = document.querySelector('.Search');
let location;
const key = 'BCE7ESE9SXLGLGPQH56C9L43V';

let MainForcast = document.querySelector('.MainForcast');
let Location = document.querySelector('.Location');
let Forcast = document.getElementsByClassName('Forcast'); 

search.addEventListener('click', (event) => {
    event.preventDefault();
    location = input.value;
    console.log(location);
    getData();
});

async function getData() {
    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${key}`);
    const data = await response.json()
    console.log(data);
    updateData(data);
}

function updateData(data) {
    // main part 
    MainForcast.textContent = data.days[0].conditions;
    Location.textContent = data.resolvedAddress;
}