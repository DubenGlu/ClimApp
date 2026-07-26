require("dotenv").config();
const axios = require("axios");
const urlBaseWeatherStack = "http://api.weatherstack.com/current"
const API_KEY = process.env.API_KEY;

async function getWeather(city) {

    try {

        const url = `${urlBaseWeatherStack}?access_key=${API_KEY}&query=${encodeURIComponent(city)}`;

        const response = await axios.get(url);

        if (response.data.success === false) {

            return {
                error: response.data.error.type
            };

        }

        return {

            weatherCode: response.data.current.weather_code,

            city: response.data.location.name,

            country: response.data.location.country,

            region: response.data.location.region,

            localtime: response.data.location.localtime,

            temperature: response.data.current.temperature,

            feelsLike: response.data.current.feelslike,

            humidity: response.data.current.humidity,

            wind: response.data.current.wind_speed,

            pressure: response.data.current.pressure,

            visibility: response.data.current.visibility,

            description: response.data.current.weather_descriptions[0],

            icon: response.data.current.weather_icons[0]

        };

    } catch (error) {

        return {
            error: "City not found."
        };

    }

}

module.exports = getWeather;