require('dotenv').config();
const axios = require('axios');

// Function to get the location of visitor based on their ip
const get_ip_location = async (ip) => {
    try {
        const API_KEY = process.env.IPINFO_API_KEY;
        const API_URL = `https://ipinfo.io/${ip}?token=${API_KEY}`;
        const response = await axios.get(API_URL);
        if (response) {
            const [lat, lon] = response.data.loc.split(',');
            return {
                city: response.data.city,
                lat: parseInt(lat),
                lon: parseInt(lon)
            }
        }
    } catch(err) {
        console.log(err)
    }
};

// Function to get the weather based on location (latitude and longitude)
const get_location_temperature = async (lat, lon) => {
    try {
        const API_KEY = process.env.WEATHER_API_KEY;
        const API_URL = `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&key=${API_KEY}`
        const response = await axios.get(API_URL);
        return response.data.data[0].temp;
    } catch (err) {
        console.log(err.message);
    }
}

module.exports = {
    get_location_temperature,
    get_ip_location
}