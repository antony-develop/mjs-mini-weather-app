const storage = new Storage();
const weatherLocation = storage.getLocationData();

const weather = new Weather(weatherLocation.city, weatherLocation.state);
const ui = new UI();

document.addEventListener('DOMContentLoaded', displayWeather);

document.getElementById('w-change-location-btn').addEventListener('click', (e) => {
    const state = document.forms['w-form'].state.value;
    const city = document.forms['w-form'].city.value;

    weather.changeLocation(city, state);

    storage.setLocationData(city, state);

    displayWeather();

    // Close Bootstrap modal window with some jquery
    $('#location-modal').modal('hide');
});

function displayWeather() {
    weather.getWeather()
        .then(results => {
            console.log(results);
            ui.showWeather(results);
        })
        .catch(error => console.log(error));
}

