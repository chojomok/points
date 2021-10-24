/*
    Route for balance
*/
const express = require('express');
const router = express.Router();
const PayerBalance = require('../payerBalance');


// GET request: Returns all the payer's balance.
router.get('/', (req,res) => {
    res.send(PayerBalance);
});

module.exports = router;