const axios = require('axios');
const { setCache, getCache } = require('./cacheService.services');

const fetchCryptoPrice = async (currency) => {
    const cachedPrice = await getCache(currency);
    if (cachedPrice) return cachedPrice;

    const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${currency}&vs_currencies=usd`);
    const price = response.data[currency]?.usd;

    if (price) setCache(currency, price, 60); // Cache for 60 seconds
    return price;
};

module.exports = { fetchCryptoPrice };
