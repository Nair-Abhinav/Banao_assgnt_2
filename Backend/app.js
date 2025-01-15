require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const redisClient = require('./config/redis');
const cryptoRoutes = require('./routes/cryptoRoutes');
const alertRoutes = require('./routes/alertRoutes');
const { checkAlerts } = require('./services/alertService');
const { fetchCryptoPrice } = require('./services/cryptoService');
const app = express();

connectDB();

app.use(bodyParser.json());

app.use('/api/crypto', cryptoRoutes);
app.use('/api', alertRoutes);

const monitorPrices = async () => {
    const currencies = ['bitcoin', 'ethereum'];
    for (const currency of currencies) {
        const price = await fetchCryptoPrice(currency);
        if (price) await checkAlerts(currency, price);
    }
};

setInterval(monitorPrices, 60 * 1000); 

module.exports = app;