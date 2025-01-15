const express = require('express');
const app = express();
const connectDB = require('./DB/db.DB');
const dotenv = require('dotenv');
dotenv.config();

// DB connection
connectDB();

// middlewares

// routes

// export
module.exports = app;