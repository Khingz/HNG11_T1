const { get_ip_location, get_location_temperature } = require("../services/apiService");

// visitors greetings route information
const client_info = async (req, res) => {
    try {
        const {visitor_name} = req.query;
        if (visitor_name) {
            let visitor_ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
            if (visitor_ip === '::1' || visitor_ip.startsWith('::fff')) { // Handles cases of loopback network ip
                visitor_ip = '127.0.0.1';
                return res.status(200).json({
                    client_ip: visitor_ip,
                    location: "localhost",
                    greeting: `Hello, ${visitor_name}!, We cannot proccess temperature for your location, you are using a loopback ip`
                })
            }
            const visitor_location = await get_ip_location(visitor_ip);
            if (!visitor_location) {
                return res.status(404).json({error: `Hello ${visitor_name}!, We could not find your location`})
            }
            const visitor_temp = await get_location_temperature(visitor_location.lat, visitor_location.lon);
            if (!visitor_location) {
                return res.status(404).json({error: `Hello ${visitor_name}!, We could not find the current temperature of your city`})
            }
            res.status(200).json({
                client_ip: visitor_ip,
                location: visitor_location.city,
                greeting: `Hello, ${visitor_name}!, the temperature is ${visitor_temp} degrees Celcuis in ${visitor_location.city}`
            })
        }
    } catch(err) {
        console.log(err);
        res.status(500).json({error: 'Something went wrong'})
    }
}

module.exports = {
    client_info
}