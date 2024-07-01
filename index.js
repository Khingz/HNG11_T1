require('dotenv').config();
const express = require('express');
const { client_info } = require('./controllers/controller');

const PORT = process.env.PORT || 5001

const app = express()

app.get('/', (req, res) => {
    return res.json({msg: "Hello world"})
})

app.get('/api/hello', client_info);

app.listen(PORT, () => {
    console.log('Server connected on ' + PORT)
})