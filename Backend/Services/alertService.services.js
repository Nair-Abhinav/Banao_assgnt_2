const nodemailer = require('nodemailer');
const Alert = require('../Models/alert.models');

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

const checkAlerts = async (currency, currentPrice) => {
    const alerts = await Alert.find({ currency });
    for (const alert of alerts) {
        if ((alert.condition === '>' && currentPrice > alert.targetPrice) ||
            (alert.condition === '<' && currentPrice < alert.targetPrice)) {
            await sendEmail(alert.email, currency, currentPrice);
        }
    }
};

const sendEmail = async (email, currency, price) => {
    await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: email,
        subject: `Crypto Alert: ${currency}`,
        text: `The price of ${currency} is now $${price}`,
    });
};

module.exports = { checkAlerts };
