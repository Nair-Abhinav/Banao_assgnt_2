require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./DB/db.DB');
const redisClient = require('./Config/redis.config');
const cryptoRoutes = require('./Routes/crypto.routes');
const alertRoutes = require('./Routes/alert.routes');
const { checkAlerts } = require('./Services/alertService.services');
const { fetchCryptoPrice } = require('./Services/cryptoService.service');
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