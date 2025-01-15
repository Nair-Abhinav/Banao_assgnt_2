const express = require('express');
const { fetchCryptoPrice } = require('../Services/cryptoService.service');
const router = express.Router();

router.get('/price/:currency', async (req, res) => {
    const { currency } = req.params;
    const price = await fetchCryptoPrice(currency);
    res.json({ currency, price });
});

module.exports = router;
