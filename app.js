// Set up for nodejs, express, and JOI
// This is just an entry page. The main page redirects you to read the documentation to learn how to use the service.
// Uses port 8080 by default
const Joi = require('joi');
const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const transactionHistory = require("./api/transactions");
const balance = require('./api/balance');
const spend = require('./api/spend');

app.use(express.json());
app.use("/api/transactions", transactionHistory);
app.use("/api/balance", balance);
app.use("/api/spend", spend);

app.get('/', (req,res) => {
    res.send("Welcome to the points main page. Read the documentation to understand how to make requests to the service.");
});

app.listen(port, () => console.log(`Listening on port ${port}`));
